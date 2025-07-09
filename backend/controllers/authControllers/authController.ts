import jwt, { JwtPayload } from 'jsonwebtoken';
import { ILogin, IuserRegister } from '../../types/user';
import bcrypt from "bcryptjs"
import { prisma } from '../../prismaClient';
import { Response, Request, NextFunction } from 'express';
import { hashPassword } from '../../services/hashPassword';
import { findUserByEmail } from '../../repositories/user.repository';
import { getTokenFromCache, storeTokenInCache } from '../../services/cacheToken';
import { sendVerificationCode } from '../../services/sendVerificationCode';


const SECRECT = 'f6bd908d8e40215c597da2f3eed22904de8a01d78c7b84deaa174532abf9af2b'

export const me = async (req: Request, res: Response) => {

  try {

    const userToken = req.cookies.token

    if (!userToken) {
      res.status(401).json({ message: "token not found" })
      return
    }

    const decodedToken = jwt.verify(userToken, SECRECT) as JwtPayload
    const getCachedToken = await getTokenFromCache(decodedToken.email)

    if (getCachedToken) {
      res.status(200).json({ token: getCachedToken, isVerified: decodedToken?.verified, username: decodedToken?.username, email: decodedToken?.email })
      return
    }

    await storeTokenInCache(decodedToken.email, userToken)

    res.status(200).json({ token: userToken, isVerified: decodedToken?.verified, })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'failed to get user token' })
    return
  }
}

export const RegisterUser = async (req: Request<{}, {}, IuserRegister>, res: Response) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await hashPassword(password, 10)

    const userExists = await findUserByEmail(email)

    if (userExists) {
      res.status(400).json({ message: "this user already exists" })
      return
    }

    const user = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        role: 'user',
        verified: false,
        first_ip: req.ip,
        last_ip: req.ip
      }

    })

    if (user) {
      res.status(200).json({ message: 'user created successfully', user })
      return
    }
  }

  catch (error) {
    console.log(error)
    res.status(500).json({ message: 'failed to create user' })
    return
  }
}

export const LoginUser = async (req: Request<{}, {}, ILogin>, res: Response, next: NextFunction) => {
  try {

    const { email, password } = req.body

    const user = await findUserByEmail(email)
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid password" })
      return
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      created_at: user.created_at,
      role: user.role,
      verified: user.verified
    }


    const token = jwt.sign(userPayload, SECRECT, { expiresIn: '1w' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    if (user.verified) {
      res.status(200).json({ message: "User already verified" })

      return
    }
    await sendVerificationCode(email)


    res.status(200).json({ message: "Login successful" })
    return

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'failed to login user' })
    return
  }
}

export const VerificationCode = async (req: Request, res: Response) => {

  const { code } = req.body
  const decodedToken = jwt.verify(req.cookies.token, SECRECT) as JwtPayload

  try {

    const record = await prisma.verificationCode.findFirst({
      where: {
        code: code,
        email: decodedToken.email,
        expiresAt: {
          gt: new Date()
        }
      }
    })

    if (!record) {
      res.status(404).json({ message: 'code invalid or expired code' })
      return
    }

    const user = await prisma.users.findFirst({ where: { email: decodedToken.email } })

    await prisma.users.update({
      where: {
        email: decodedToken.email
      },
      data: {
        verified: true
      }
    })


    const userPayload = {
      id: user?.id,
      email: user?.email,
      username: user?.username,
      created_at: user?.created_at,
      role: user?.role,
      verified: true
    }

    res.clearCookie('token')

    const updatedToken = jwt.sign(userPayload, SECRECT, { expiresIn: '1w' })
    res.cookie('token', updatedToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })


    res.status(200).json({ message: 'verification successful' })
    return

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'failed to verify code' })
    return
  }
}

export const LogoutUser = async (req: Request, res: Response) => {
  try {

    const token = req.cookies.token

    if (!token) {
      res.status(401).json({ message: 'token not found' })
      return
    }

    res.clearCookie('token')
    res.status(200).json({ message: 'user loguted successfully' })
    return

  } catch (error) {
    res.status(500).json({ message: 'failed to logout user' })
    console.error(error)
  }
}