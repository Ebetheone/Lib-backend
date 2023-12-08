import axios from "axios"

export const SendCodeMobicom = async (phone: string, text: string) => {
  try {
    const result = await axios.get(
      `http://27.123.214.168/smsmt/mt?servicename=Oneday&username=Job&from=130715&to=${phone}&msg=${text}`,
    )
    if (result.status === 200 && result.data === "Sent") return true
    return false
  } catch (error) {
    console.log("SendCodeMobicom === error", error)
    return false
  }
}
