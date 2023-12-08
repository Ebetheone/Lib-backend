import moment from "moment"

export const getExpiresDate = (e: number) => {
  return moment().add(e, "days").format("YYYY-MM-DD")
}
