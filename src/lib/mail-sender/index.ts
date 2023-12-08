import nodemailer from "nodemailer"

type messageProps = {
  email: string
  subject: string
  content: string
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "info@events.mn",
    pass: "Tab2023_Info@events.mn",
  },
})

export const mailSender = async (message: messageProps) => {
  try {
    console.log(message)
    const param = {
      from: "info@events.mn",
      to: message.email,
      subject: message.subject,
      html: message.content,
    }
    await transporter.sendMail(param)
    return true
  } catch (error) {
    console.log("--------MAIL.SENDER.ERROR---------", error)
    return false
  }
}
