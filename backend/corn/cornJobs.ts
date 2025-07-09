import corn from "node-cron"
import { prisma } from "../prismaClient"

export const deleteCodeCorn = () => {
    corn.schedule(('*/5 * * * *'), async () => {
        await prisma.verificationCode.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date()
                }
            }
        })
        console.log('expires codes are removed')
    })
}