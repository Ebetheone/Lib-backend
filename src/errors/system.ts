import { getError } from "."

export const SystemErrorMap = {
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Сэрвэртэй холбоотой алдаа гарлаа.",
    systemLog: true,
  },
  UNPROCESSABLE_ENTITY: {
    code: "UNPROCESSABLE_ENTITY",
    message: "Оруулсан утга буруу байна.",
    systemLog: true,
  },
}

export const SystemErrors = {
  INTERNAL_SERVER_ERROR: () => getError("INTERNAL_SERVER_ERROR"),
  UNPROCESSABLE_ENTITY: () => getError("UNPROCESSABLE_ENTITY"),
}
