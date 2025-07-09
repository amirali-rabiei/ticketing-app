import { randomBytes } from "crypto";
import { prisma } from "../prismaClient";
import { sendMailForCode } from "./mailSender";

export const sendVerificationCode = async (email: string) => {
    try {

        const code = randomBytes(2).toString('hex')
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

        await prisma.verificationCode.create({
            data: {
                email: email,
                code: code,
                expiresAt: expiresAt
            }
        })

        await sendMailForCode(email, code)

    } catch (error) {
        console.error(error)
    }
}