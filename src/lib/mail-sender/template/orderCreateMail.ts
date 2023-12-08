import { User } from "generated"
import { mailSender } from "./../index"

export const orderCreateMail = async ({
  user,
  orderId,
}: {
  user: User | undefined
  orderId: string
}) => {
  const result = await mailSender({
    email: user?.email as string,
    subject: `${orderId || ""} дугаартай захиалга баталгаажлаа.`,
    content: `<pre>
Сайн байна уу? Эрхэм хэрэглэгч ${user?.profile?.firstName || ""} ${
      user?.profile?.lastName || ""
    }
таньд энэ өдрийн мэнд хүргэе.

Төлбөр төлөгдөсний дараа таны захиалга идэвхжихийг анхаарна уу! 
Төлбөрийг https://events.mn/ эсвэл events аппликейшинаас шилжүүлэх 
ба захиалгын BO74004813 дугаарыг гүйлгээний утга дээр бичнэ үү.

Хүндэтгэсэн: https://events.mn/

</pre>
`,
  })

  return result
}
