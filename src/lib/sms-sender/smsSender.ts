import axios from "axios"
import { SendCodeUnitel } from "./mn/unitel"
import { SendCodeSkytel } from "./mn/skytel"
import { SendCodeGMobile } from "./mn/gmobile"
import { SendCodeMobicom } from "./mn/mobicom"
import { CheckOperatorOCS } from "./checkOperator"

type smsProps = {
  phone: string
  content: string
}

export const sendCodeServer = async (phone: string, countryCode: string) => {
  try {
    axios.defaults.headers.common["X-Authy-API-Key"] =
      "c34qa3EgZXNpZ5tVHT8smhbJzsPNCylj"
    const result = await axios.post(
      `https://api.authy.com/protected/json/phones/verification/start?api_key=c34qa3EgZXNpZ5tVHT8smhbJzsPNCylj&via=sms&phone_number=${phone}&country_code=${countryCode}`,
    )
    if (result) return true
  } catch (error) {
    console.log("SendCodeServer:", error)
    return false
  }
}

export const smsServerMongolia = async (message: smsProps) => {
  const { phone, content } = message
  const ocs = await CheckOperatorOCS(phone)
  if (ocs) {
    if (ocs === "Unitel") {
      const result = await SendCodeUnitel(phone, content)
      return !!result
    }
    if (ocs === "Skytel") {
      const result = await SendCodeSkytel(phone, content)
      return !!result
    }
    if (ocs === "Gmobile") {
      const result = await SendCodeGMobile(phone, content)
      return !!result
    }
    if (ocs === "Mobicom") {
      const result = await SendCodeMobicom(phone, content)
      return !!result
    }
  }
  return false
}
