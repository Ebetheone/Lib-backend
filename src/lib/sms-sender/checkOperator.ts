export const CheckOperatorOCS = async (phoneNumber: string) => {
  if (phoneNumber.length === 8) {
    const ocs = phoneNumber.slice(0, 2)
    if (
      ocs === "99" ||
      ocs === "95" ||
      ocs === "94" ||
      ocs === "85" ||
      ocs === "75"
    )
      return "Mobicom"
    if (ocs === "89" || ocs === "88" || ocs === "86" || ocs === "80")
      return "Unitel"
    if (
      ocs === "96" ||
      ocs === "92" ||
      ocs === "91" ||
      ocs === "90" ||
      ocs === "58" ||
      ocs === "50"
    )
      return "Skytel"
    if (
      ocs === "98" ||
      ocs === "97" ||
      ocs === "93" ||
      ocs === "83" ||
      ocs === "55" ||
      ocs === "53"
    )
      return "Gmobile"
  }
  return null
}
