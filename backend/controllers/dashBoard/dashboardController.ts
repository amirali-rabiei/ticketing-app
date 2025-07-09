import { Request, Response } from 'express';
import { getClientIp } from '../../middlewares/getClientIp';
import { JwtPayload } from 'jsonwebtoken';


export const dashboard = async (req: Request, res: Response) => {
    const ip = req.ip
    const userEmail = (req.user as JwtPayload).email
    await getClientIp(ip, userEmail)
    res.status(200).json({ message: req.user })
}
