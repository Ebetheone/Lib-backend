import { getError } from "."

export const UserErrorMap = {
  USER_NOT_FOUND: {
    key: "USER_NOT_FOUND",
    message: "Хэрэглэгч олдсонгүй.",
  },
  EMAIL_ALREADY_USED: {
    key: "EMAIL_ALREADY_USED",
    message: "Таны и-мэйл хаяг ашиглагдсан байна.",
  },
  PHONE_NUMBER_ALREADY_USED: {
    key: "PHONE_NUMBER_ALREADY_USED",
    message: "Таны утасны дугаар ашиглагдсан байна.",
  },
  TOKEN_EXPIRED_ERROR: {
    key: "TOKEN_EXPIRED_ERROR",
    message: "Дахин нэвтэрнэ үү.",
  },
  FACEBOOK_DATA_TRANSFER_WRONG: {
    key: "FACEBOOK_DATA_TRANSFER_WRONG",
    message:
      "Фейсбүүкийн серверээс дата авах үед алдаа гарлаа. Дахин оролдоно уу.",
  },
  LOGIN_USER_TRY_AGAIN: {
    key: "LOGIN_USER_TRY_AGAIN",
    message: "Дахин оролдоно уу.",
  },
  AUTH_EMAIL_NOT_FOUND: {
    key: "AUTH_EMAIL_NOT_FOUND",
    message: "И-мэйл хаяг олдсонгүй.",
  },
  AUTH_PASSWORD_WRONG: {
    key: "AUTH_PASSWORD_WRONG",
    message: "Нууц үг дутуу байна.",
  },
  USER_PASSWORD_MATCH: {
    key: "USER_PASSWORD_MATCH",
    message: "Нууц үг давхцаж байна.",
  },
  USER_PASSWORD_NOT_MATCH: {
    key: "USER_PASSWORD_NOT_MATCH",
    message: "Таны оруулсан нууц үг буруу байна.",
  },
  USER_OLD_PASSWORD: {
    key: "USER_OLD_PASSWORD",
    message: "Хуучин нууц үгээ оруулна уу.",
  },
  USER_ALREADY_HOST: {
    key: "USER_ALREADY_HOST",
    message: "Аль хэдийн хост болсон байна.",
  },
  USER_REQUESTED_HOST: {
    key: "USER_REQUESTED_HOST",
    message: "Хүсэлт илгээсэн байна.",
  },
  USER_AGE_WRONG: {
    key: "USER_AGE_WRONG",
    message: "Оруулсан нас буруу байна.",
  },
  USER_ALREADY_INVITED: {
    key: "USER_ALREADY_INVITED",
    message: "Хэрэглэгчийг аль хэдийн урьсан байна.",
  },
}

export const UserErrors = {
  EMAIL_ALREADY_USED: () => getError("EMAIL_ALREADY_USED"),
  PHONE_NUMBER_ALREADY_USED: () => getError("PHONE_NUMBER_ALREADY_USED"),
  USER_NOT_FOUND: () => getError("USER_NOT_FOUND"),
  TOKEN_EXPIRED_ERROR: () => getError("TOKEN_EXPIRED_ERROR"),
  FACEBOOK_DATA_TRANSFER_WRONG: () => getError("FACEBOOK_DATA_TRANSFER_WRONG"),
  LOGIN_USER_TRY_AGAIN: () => getError("LOGIN_USER_TRY_AGAIN"),
  AUTH_EMAIL_NOT_FOUND: () => getError("AUTH_EMAIL_NOT_FOUND"),
  AUTH_PASSWORD_WRONG: () => getError("AUTH_PASSWORD_WRONG"),
  USER_PASSWORD_MATCH: () => getError("USER_PASSWORD_MATCH"),
  USER_PASSWORD_NOT_MATCH: () => getError("USER_PASSWORD_NOT_MATCH"),
  USER_OLD_PASSWORD: () => getError("USER_OLD_PASSWORD"),
  USER_ALREADY_HOST: () => getError("USER_ALREADY_HOST"),
  USER_REQUESTED_HOST: () => getError("USER_REQUESTED_HOST"),
  USER_AGE_WRONG: () => getError("USER_AGE_WRONG"),
  USER_ALREADY_INVITED: () => getError("USER_ALREADY_INVITED"),
}
