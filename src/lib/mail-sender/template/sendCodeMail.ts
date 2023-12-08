import { mailSender } from "../index"

export const sendCodeMail = async (email: string, code: string) => {
  if (!email) return false

  const result = await mailSender({
    email: email,
    subject: `И-мэйл баталгаажуулах код`,
    content: `<pre>
    Сайн байна уу, таны и-мэйл баталгаажуулах код: ${code}
    
    Хүндэтгэсэн: Event Planner
`,
  })

  return result
}
