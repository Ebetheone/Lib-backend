import axios from "axios"

export const SendCodeUnitel = async (phone: string, text: string) => {
  try {
    const result = await axios.post(
      `http://sms.unitel.mn/sendSMS.php?uname=onedayjob&upass=66S3mcaZ9E&sms=${text}&from=130715&mobile=${phone}`,
    )
    if (result.status === 200 && result.data === "SUCCESS") return true
    return false
  } catch (error) {
    console.log("SendCodeUnitel === error", error)
    return false
  }
}
