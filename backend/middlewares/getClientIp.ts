import { prisma } from "../prismaClient"

export const getClientIp = async (ip: string | undefined, userEmail: string) => {

    try {

        const user = await prisma.users.findUnique({ where: { email: userEmail } })
        if (user?.last_ip !== ip) {
            await prisma.users.update({
                where: {
                    email: userEmail,
                },
                data: {
                    last_ip: ip
                }
            })

        }


    } catch (error) {
        console.error(error)
    }
}