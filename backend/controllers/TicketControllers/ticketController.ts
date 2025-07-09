import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from "express";
import { prisma } from "../../prismaClient";
import { getCategoryFromCache, storeCategoryInCache } from "../../services/cacheCategory";
import { redisClient } from "../../config/redisClient";
import { Console } from 'console';


export const addTicket = async (req: Request, res: Response) => {

    const { title, description, date, location, capacity, price, available, category } = req.body
    try {


        const Ticket = await prisma.tickets.create({
            data: {
                title: title,
                description: description,
                date: date,
                location: location,
                capacity: Number(capacity),
                price: Number(price),
                available: Number(available),
                category: category,
                isDeleted: false
            }
        })

        console.log(Ticket)

        if (Ticket) {

            res.status(200).json({ message: 'The ticket added successful' })
            return
        }


    } catch (error) {
        res.status(500).json({ message: 'faild to add ticket' })
        console.log(error)
        return
    }
}

enum categoryEnum {
    SPORT = "SPORT",
    CINEMA = "CINEMA",
    SCIENCE = "SCIENCE",
    ENTERTAINMENT = "ENTERTAINMENT",
    NEW = "LASTEST",
}

export const fetchTickets = async (req: Request, res: Response) => {

    const categoryKey = (req.params.category as string).toUpperCase()

    if (!Object.values(categoryEnum).includes(categoryKey as categoryEnum)) {
        res.status(404).json({ message: 'invalid category' })
        return
    }

    const category = categoryKey as categoryEnum

    try {

        const getCachedCatrgory = await getCategoryFromCache(category)

        if (getCachedCatrgory) {
            console.log(`Serving from cache for category: ${category}`);
            res.status(200).json(getCachedCatrgory)
            return
        }

        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)


        if (category === 'LASTEST') {

            const lastestTicket = await prisma.tickets.findMany({
                where: {
                    createdAt: {
                        gte: twoDaysAgo
                    }
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    date: true,
                    location: true,
                    capacity: true,
                    price: true,
                    available: true,
                    category: true,

                }
            })

            res.status(200).json(lastestTicket)
            return
        }


        const findWithCategory = await prisma.tickets.findMany({
            where: {
                category: category
            },
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                location: true,
                capacity: true,
                price: true,
                available: true,
                category: true,
                createdAt: true
            }
        })


        if (findWithCategory.length === 0) {
            res.status(404).json({ message: 'No tickets found in this category' })

            return
        }

        await storeCategoryInCache(category, findWithCategory)
        res.status(200).json(findWithCategory)
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'faild to fetch tickets' })
        return
    }
}

export const purchaseTicket = async (req: Request, res: Response) => {

    const { quantity } = req.body
    const ticketId = Number(req.params.ticketId)
    const userId = (req.user as JwtPayload).id

    try {

        const ticket = await prisma.tickets.findUnique({
            where: { id: ticketId }
        })


        if (!ticket || ticket.capacity <= 0) {
            res.status(400).json({ message: 'ticket unavailable' })
            return
        }

        const alreadyBought = await prisma.userTickets.findFirst({
            where: {
                userId: userId,
                ticketId: ticketId
            }
        })

        if (alreadyBought) {
            res.status(400).json({ message: 'already purchased' })
            return
        }



        await prisma.$transaction([

            prisma.tickets.update({
                where: { id: ticketId },
                data: {
                    capacity: {
                        decrement: Number(quantity)

                    }
                }
            }),

            prisma.userTickets.create({
                data: {
                    userId: userId,
                    ticketId: ticketId,
                    finalPrice: ticket.price * quantity

                }
            })

        ])

        const userTickets = await prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                userTickets: {
                    where: {
                        ticketId: ticketId

                    },
                    select: {
                        finalPrice: true,
                        ticket: {
                            select: {
                                title: true,
                                description: true,
                                date: true,
                                location: true,
                                price: true,
                                available: true,
                                capacity: true,
                                category: true,
                                createdAt: true
                            },
                        }
                    }
                },

                username: true,
                email: true,

            }
        })


        await redisClient.del(`tickets:${ticket.category}`)

        res.status(200).json({ userTickets })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal error' })
        return
    }
}

export const fetchTicketById = async (req: Request, res: Response) => {

    const ticketId = Number(req.params.ticketId)

    try {

        const ticket = await prisma.tickets.findFirst({
            where: {
                id: ticketId
            },
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                location: true,
                price: true,
                available: true,
                capacity: true,
                category: true,
                createdAt: true
            }
        })

        if (!ticket) {
            res.status(404).json({ message: 'Ticket not found!' })
            return
        }

        res.status(200).json(ticket)
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal error' })
        return
    }
}

export const deleteAllTickets = async (req: Request, res: Response) => {
    try {

        const response = await prisma.tickets.deleteMany()
        console.log(response)
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal error' })
        return
    }
}

type TicketStats = {
    month: Date;
    total: bigint;
};

export const solidTicketsByMonth = async (req: Request, res: Response) => {
    try {

        const ticket = await prisma.$queryRaw<TicketStats[]>
            `
        SELECT 
          DATE_TRUNC('month', "createdAt") AS month,
          COUNT(*) AS total
        FROM "userTickets"
        GROUP BY month
        ORDER BY month;
      `;

        const formatted = ticket.map((item) => ({
            month: item.month,
            total: Number(item.total)
        }))

        res.status(200).json(formatted);
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal error' })
        return
    }
}

export const fetchPopularTickets = async (req: Request, res: Response) => {
    try {

        const ticket = await prisma.$queryRaw<{ ticketId: number, total: bigint }[]>
            `
        SELECT "ticketId",
        COUNT(*) AS total
        FROM "userTickets"
        GROUP BY "ticketId"
        ORDER BY total DESC
        LIMIT 10
        `

        const ticketId = ticket.map(i => i.ticketId)

        const tickets = await prisma.tickets.findMany({
            where: {
                id: { in: ticketId }
            },
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                price: true,
                date: true,
                capacity: true,
                available: true,
                location: true
            }
        })

        res.status(200).json(tickets)
        return


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal error' })
        return
    }
}