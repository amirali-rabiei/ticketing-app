import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'lion44pro44@gmail.com',
        pass: 'bvwt rzgj gjis qoyz'
    }
})



export const sendMailForCode = async (email: string, code: string) => {
    const mailOption = {
        from: 'lion44pro44@gmail.com',
        to: email,
        subject: 'AllTix',
        html: `
        <h2 style='text-align:center; background:#007ea7; color:white; border-radius:5px; padding:4px;'>Thank you for singing up with AllTix!</h2>
        <p>To complete your registeration, please use the veritifcation code below:</p>
        Your verification code: <b>${code}</b>
        <hr>
        <p>This code is valid for 5 minutes</p>
        <p>If you didn't request this, you can safely ignore this email</p>

        <p>Best regards
        The AllTix
        </p>
        `
    }

    transporter.sendMail(mailOption, (err: Error | null) => {
        if (err) throw new Error(`${err}`)
    })
}

export const sendMailForForgetPassword = async (email: string, resetToken: string) => {
    const mailOption = {
        from: 'lion44pro44@gmail.com',
        to: email,
        subject: 'AllTix',
        html: `
        <h2 style='text-align:center; background:#007ea7; color:white; border-radius:5px; padding:4px;'>Dear user</h2>
        <p>Click the link below to reset your password:</p>
        <a href="http://localhost:5173/reset/${resetToken}">Reset Link</a>
        <hr>
        <p>This link is valid for 5 minutes</p>
        <p>If you didn't request this, you can safely ignore this email</p>

        <p>Thanks</p>
        `
    }

    transporter.sendMail(mailOption, (err: Error | null) => {
        if (err) throw new Error(`${err}`)
    })
}
