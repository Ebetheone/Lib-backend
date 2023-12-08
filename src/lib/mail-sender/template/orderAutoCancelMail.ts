import { User } from "generated"
import { mailSender } from "./../index"

export const orderAutoCancelMail = async ({
  user,
  orderId,
}: {
  user: User | undefined
  orderId: string
}) => {
  const result = await mailSender({
    email: user?.email as string,
    subject: `${orderId || ""} дугаартай захиалга цуцлагдлаа.`,
    content: `<pre>
Сайн байна уу? Эрхэм хэрэглэгч ${user?.profile?.firstName || ""} ${
      user?.profile?.lastName || ""
    }
таньд энэ өдрийн мэнд хүргэе.


Захиалга хүлээн авснаас хойш 30 минутын дотор төлбөрөө 
төлөөгүйн улмаас таны захиалга цуцлагдлаа.

Хүндэтгэсэн: https://events.mn/

</pre>
`,
  })

  return result
}
