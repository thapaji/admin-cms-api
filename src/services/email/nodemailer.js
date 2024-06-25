import nodemailer from "nodemailer"

const emailProcessor = async (mailBody) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        })
        const info = await transporter.sendMail(mailBody)
        console.log('Message sent:%s', info.messageId)
        console.log('Preview url:%s', nodemailer.getTestMessageUrl(info))

    } catch (error) {
        console.log(error)
    }
}

export const emailVerificationMail = ({ email, fName, url }) => {
    const obj = {
        from: '"Tech Store 👻" <maddison53@ethereal.email>',
        to: email,
        subject: "Action Required",
        text: `Hello There, please verify your email. Click ${url} to verify.`,
        html: `
            <h1>Hello ${fName}</h1>
            <br/>
            <p>Click below to verify your email.</p>
            <a href=${url}>Verify Email</a>
            <p>Regards,<br/>Tech Store</p>`,
    }
    emailProcessor(obj);
}

export const emailOTP = ({ email, fName, token }) => {
    const obj = {
        from: '"Tech Store" <maddison53@ethereal.email>',
        to: email,
        subject: "OTP for reset password",
        text: `Hello ${fName}, Here is your OTP : ${token}`,
        html: `
            <h1>Hello ${fName}</h1>
            <br/>
            <p>Here is your OTP.</p>
            <div>${token}</div>
            <p>If you did not request this OTP, dont share this with anybody.</p>
            <p>Regards,<br/>Tech Store</p>`,
    }
    emailProcessor(obj);
}