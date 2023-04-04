import { Request, Response } from "express"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

const sendEmail = (req: Request<{ studentId: string }>, res: Response) => {
    try {
        const { html } = req.body
        const { studentId } = req.params

        if (!studentId) throw new Error("No Student Email ID")

        // console.log(body)

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: "nkroshankumar@gmail.com",
                clientId:
                    "471254672993-qt4bvdeuvnljrbt7pukuf9re0f61v25c.apps.googleusercontent.com",
                clientSecret: "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",
                accessToken: process.env.MAIL_ACCESS_TOKEN,
                refreshToken: process.env.MAIL_REFRESH_TOKEN,
            },
        })

        const mailOptions: Mail.Options = {
            from: "nkroshankumar@gmail.com",
            to: studentId,
            subject: "Invitation For Classroom - OnRoom",
            html,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).send(error)
            } else {
                return res.status(200).send("Email sent: " + info.response)
            }
        })
    } catch (e: any) {
        console.log(e)
        return res.status(500).send(e.message)
    }
}

export default sendEmail
