import jwt from 'jsonwebtoken';
import { sendMailForForgetPassword } from './mailSender';
const SECRECT = 'f6bd908d8e40215c597da2f3eed22904de8a01d78c7b84deaa174532abf9af2b'


export const sendresetPassword = async (email: string) => {
    try {

        const payload = {
            email: email
        }
        const resetToken = jwt.sign(payload, SECRECT, { expiresIn: '15m' })
        console.log(resetToken)
        await sendMailForForgetPassword(email, resetToken)

    } catch (error) {
        console.error(error)
    }
}