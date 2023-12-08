import { getError } from "."

export const AuthErrorMap = {
  OLD_PASSWORD_WRONG: {
    code: "OLD_PASSWORD_WRONG",
    message: "Хуучин нууц үг буруу байна.",
  },
  ACCESS_TOKEN_INVALID: {
    code: "ACCESS_TOKEN_INVALID",
    message: "Дахин нэвтэрнэ үү.",
  },
  ACCESS_TOKEN_EXPIRED: {
    code: "ACCESS_TOKEN_EXPIRED",
    message: "Дахин нэвтэрнэ үү.",
  },
  ACCESS_TOKEN_MISSING: {
    code: "ACCESS_TOKEN_MISSING",
    message: "Дахин нэвтэрнэ үү.",
  },
  REFRESH_TOKEN_EXPIRED: {
    code: "REFRESH_TOKEN_EXPIRED",
    message: "Дахин нэвтэрнэ үү.",
  },
  REFRESH_TOKEN_INVALID: {
    code: "REFRESH_TOKEN_INVALID",
    message: "Дахин нэвтэрнэ үү.",
  },
  REFRESH_TOKEN_MISSING: {
    code: "REFRESH_TOKEN_MISSING",
    message: "Дахин нэвтэрнэ үү.",
  },
  NOT_AUTHENTICATED: {
    code: "NOT_AUTHENTICATED",
    message: "Нэвтэрсний дараа энэхүү үйлдлийг хийнэ үү.",
  },
  NOT_AUTHORIZED: {
    code: "NOT_AUTHORIZED",
    message: "Таны эрх хүрэлцэхгүй байна.",
  },
  LOGIN_USER_NOT_FOUND: {
    code: "LOGIN_USER_NOT_FOUND",
    message: "Хэрэглэгч олдсонгүй.",
  },
  LOGIN_PASSWORD_WRONG: {
    code: "LOGIN_PASSWORD_WRONG",
    message: "Таны нууц үг буруу байна.",
  },
  SEND_CODE_FAILED: {
    code: "SEND_CODE_FAILED",
    message: "Баталгаажуулах код илгээхэд алдаа гарлаа.",
  },
  SEND_CODE_EXPIRED: {
    code: "SEND_CODE_EXPIRED",
    message: "Баталгаажуулах кодны хугацаа дууссан байна.",
  },
  CONFIRM_CODE_WRONG: {
    code: "CONFIRM_CODE_WRONG",
    message: "Баталгаажуулах код буруу байна.",
  },
  ACCOUNT_ELIMINATE_FAILED: {
    code: "ACCOUNT_ELIMINATE_FAILED",
    message: "Төхөөрөмж хаах явцад алдаа гарлаа.",
  },
  ACTION_TRY_AGAIN: {
    code: "ACTION_TRY_AGAIN",
    message: "Дахин оролдоно уу.",
  },
}

export const AuthErrors = {
  OLD_PASSWORD_WRONG: () => getError("OLD_PASSWORD_WRONG"),
  ACCESS_TOKEN_INVALID: () => getError("ACCESS_TOKEN_INVALID"),
  ACCESS_TOKEN_EXPIRED: () => getError("ACCESS_TOKEN_EXPIRED"),
  ACCESS_TOKEN_MISSING: () => getError("ACCESS_TOKEN_MISSING"),
  REFRESH_TOKEN_EXPIRED: () => getError("REFRESH_TOKEN_EXPIRED"),
  REFRESH_TOKEN_INVALID: () => getError("REFRESH_TOKEN_INVALID"),
  REFRESH_TOKEN_MISSING: () => getError("REFRESH_TOKEN_MISSING"),
  NOT_AUTHORIZED: () => getError("NOT_AUTHORIZED"),
  NOT_AUTHENTICATED: () => getError("NOT_AUTHENTICATED"),
  LOGIN_USER_NOT_FOUND: () => getError("LOGIN_USER_NOT_FOUND"),
  LOGIN_PASSWORD_WRONG: () => getError("LOGIN_PASSWORD_WRONG"),
  SEND_CODE_FAILED: () => getError("SEND_CODE_FAILED"),
  SEND_CODE_EXPIRED: () => getError("SEND_CODE_EXPIRED"),
  CONFIRM_CODE_WRONG: () => getError("CONFIRM_CODE_WRONG"),
  ACCOUNT_ELIMINATE_FAILED: () => getError("ACCOUNT_ELIMINATE_FAILED"),
  ACTION_TRY_AGAIN: () => getError("ACTION_TRY_AGAIN"),
}
