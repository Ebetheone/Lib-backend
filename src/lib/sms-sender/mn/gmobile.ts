import axios from "axios"

export const SendCodeGMobile = async (phone: string, text: string) => {
  try {
    const result = await axios.get(
      `http://203.91.114.131/cgi-bin/sendsms?username=van_job&password=vande_07_15&from=130715&to=${phone}&text=${text}`,
    )
    if (result.status === 200) return true
    return false
  } catch (error) {
    console.log("SendCodeGMobile === error", error)
    return false
  }
}
