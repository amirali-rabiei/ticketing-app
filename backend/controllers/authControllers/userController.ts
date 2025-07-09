import { Request, Response } from 'express';
import { prisma } from "../../prismaClient"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { findUserByEmail } from '../../repositories/user.repository';
import { sendMailForForgetPassword } from '../../services/mailSender';
import { sendresetPassword } from '../../services/sendResetPassword';
import { hashPassword } from '../../services/hashPassword';

const SECRECT = 'f6bd908d8e40215c597da2f3eed22904de8a01d78c7b84deaa174532abf9af2b'


export const fetchUsers = async (req: Request, res: Response) => {
    try {

        const users = await prisma.users.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                created_at: true,
                verified: true
            }
        })

        if (!users) {
            res.status(404).json({ message: "no users found" })
            return
        }

        res.status(200).json({ users })
        return

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'failed to fetch users' })
        return
    }
}

export const forgetPassword = async (req: Request, res: Response) => {
    try {
       

        const email = (req.user as JwtPayload).email

        const existsUser = await findUserByEmail(email)
        if (!existsUser) {
            res.status(404).json({ message: 'user with this id not found' })
            return
        }

        await sendresetPassword(email)
        res.status(200).json({ message: 'we send a reset link for your email' })

    } catch (error) {
        console.error(error)
    }
}

export const resetPassword = async (req: Request, res: Response) => {

    const { newPassword } = req.body

    try {
        const token = req.params.token
        const decoded = jwt.verify(token, SECRECT) as JwtPayload

        const user = await findUserByEmail(decoded.email)
        const hashedPassword = await hashPassword(newPassword, 10)
        if (!user) {
            res.status(404).json({ message: 'user not found' })
            return
        }

        await prisma.users.updateMany({
            where: { email: decoded.email },
            data: {
                password: hashedPassword
            }
        })

        res.status(200).json({ message: 'Password has benn reset successfully' })

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            res.status(400).json({ message: 'token is expired' })
            return
        } else {
            res.status(400).json({ message: 'token is expired or another error', error })
            return
        }
    }
}