import { User } from "generated"
import { mailSender } from "./../index"

export const orderPaymentConfirmMail = async ({
  user,
  orderId,
}: {
  user: User | undefined
  orderId: string
}) => {
  const result = await mailSender({
    email: user?.email as string,
    subject: `${orderId || ""} дугаартай захиалгын төлбөр баталгаажлаа.`,
    content: `<pre>
Сайн байна уу? Эрхэм хэрэглэгч ${user?.profile?.firstName || ""} ${
      user?.profile?.lastName || ""
    }
таньд энэ өдрийн мэнд хүргэе.

Таны төлбөр амжилттай баталгаажлаа.

Хүндэтгэсэн: https://events.mn/

</pre>
`,
  })

  return result
}
