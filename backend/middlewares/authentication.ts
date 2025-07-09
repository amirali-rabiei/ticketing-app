import { Request, Response, NextFunction } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';
const SECRECT = 'f6bd908d8e40215c597da2f3eed22904de8a01d78c7b84deaa174532abf9af2b'

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload
    }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies.token

        if (!token) {
            res.status(401).json({ message: 'token is not found' })
            return
        }

        const decoded = Jwt.verify(token, SECRECT as string) as JwtPayload
        req.user = decoded
        if (decoded.verified == true) {

            return next()
        }
        res.status(401).json({ message: 'please verify your email' })
        return

    } catch (error) {
        console.error(error)
    }
}

export const authorizeRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req.user as JwtPayload).role

        if (userRole === role) {
            return next()
        }
        res.status(403).json({ message: 'Access denied!' })
        return
    }
}