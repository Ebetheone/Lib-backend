import axios from "axios"

export const SendCodeSkytel = async (phone: string, text: string) => {
  try {
    const result = await axios.post(
      `http://smsgw.skytel.mn:80/SMSGW-war/pushsms?id=1000072&src=130715&dest=${phone}&text=${text}`,
    )
    if (result.status === 200 && result.data === "OK") return true
    return false
  } catch (error) {
    console.log("SendCodeSkytel === error", error)
    return false
  }
}
