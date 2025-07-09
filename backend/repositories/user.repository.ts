import { prisma } from "../prismaClient"


export const findUserByEmail = async (email: string) => {
    return prisma.users.findFirst({ where: { email: email } })
}