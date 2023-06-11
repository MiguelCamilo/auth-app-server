import nodemailer from "nodemailer"
import Mailgen from "mailgen";

import ENV from "../env.config.js"

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const emailVerification = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: ENV.EMAIL,
            pass: ENV.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : username,
            intro: text || "Thank you for creating an Account with Auth App Co.",
            outro: "© Auth App LLC"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Welcome to Auth App",
        html: mail
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(201).send({ message: "Please check you email." })
        })
        .catch((error) => {
            return res.status(500).json({ error })
        })
}