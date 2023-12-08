import { Errors } from "src/errors"
import jwt from "jsonwebtoken"
import { ENV } from "src/config"

type signAccessTokenType = {
  userId: string
  deviceType: string | null
  refreshToken: string
}

export type signRefreshTokenType = {
  userId: string
  deviceType: string | null
}

type signSessionTokenType = {
  deviceId: string
  deviceType: string | null
}

type signResetTokenType = {
  userId: string
  deviceType: string | null
}

export type EmailTokenType = {
  email: string
  code: string
}

export type PhoneTokenType = {
  phone: string
  code: string
}

export const signAccessToken = ({
  userId,
  deviceType,
  refreshToken,
}: signAccessTokenType) => {
  if (!refreshToken || !userId) throw Errors.Auth.NOT_AUTHENTICATED()
  try {
    const accessToken = jwt.sign(
      {
        userId,
        deviceType,
        refreshToken,
      },
      ENV.JWT_SECRET,
      {
        expiresIn:
          deviceType === "desktop"
            ? ENV.USER_ACCESS_TOKEN_EXPIRE
            : ENV.ADMIN_ACCESS_TOKEN_EXPIRE,
      },
    )
    return accessToken
  } catch (error) {
    throw Errors.System.INTERNAL_SERVER_ERROR()
  }
}

export const signRefreshToken = ({
  userId,
  deviceType,
}: signRefreshTokenType) => {
  try {
    const refreshToken = jwt.sign(
      {
        userId,
        deviceType,
      },
      ENV.JWT_SECRET,
      {
        expiresIn:
          deviceType === "desktop"
            ? ENV.ADMIN_REFRESH_TOKEN_EXPIRE
            : ENV.USER_REFRESH_TOKEN_EXPIRE,
      },
    )
    return refreshToken
  } catch (error) {
    throw Errors.System.INTERNAL_SERVER_ERROR()
  }
}

export const signSessionToken = ({
  deviceId,
  deviceType,
}: signSessionTokenType) => {
  try {
    const sessionToken = jwt.sign(
      {
        deviceId,
        deviceType,
      },
      ENV.JWT_SECRET,
      {
        expiresIn:
          deviceType === "desktop"
            ? ENV.ADMIN_REFRESH_TOKEN_EXPIRE
            : ENV.USER_REFRESH_TOKEN_EXPIRE,
      },
    )
    return sessionToken
  } catch (error) {
    throw Errors.System.INTERNAL_SERVER_ERROR()
  }
}

export const signResetToken = ({ userId, deviceType }: signResetTokenType) => {
  try {
    const resetToken = jwt.sign(
      {
        userId,
        deviceType,
      },
      ENV.JWT_SECRET,
      {
        expiresIn:
          deviceType === "desktop"
            ? ENV.ADMIN_RESET_TOKEN_EXPIRE
            : ENV.USER_RESET_TOKEN_EXPIRE,
      },
    )
    return resetToken
  } catch (error) {
    throw Errors.System.INTERNAL_SERVER_ERROR()
  }
}

export const createUserTokens = (userId: string, deviceType: string | null) => {
  const refreshToken = signRefreshToken({
    userId,
    deviceType,
  })
  const accessToken = signAccessToken({
    userId,
    refreshToken,
    deviceType,
  })
  return { accessToken, refreshToken }
}

export const createSessionToken = (deviceId: string, deviceType: string) => {
  const sessionToken = signSessionToken({
    deviceId,
    deviceType,
  })
  return { sessionToken }
}

export const createResetToken = (userId: string, deviceType: string) => {
  const resetToken = signResetToken({
    userId,
    deviceType,
  })
  return { resetToken }
}

export const signEmailToken = ({ email, code }: EmailTokenType) => {
  const signToken = jwt.sign(
    {
      email,
      code,
    },
    ENV.JWT_SECRET,
    {
      expiresIn: ENV.VERIFY_TOKEN_EXPIRE,
    },
  )
  return signToken
}

export const signPhoneToken = ({ phone, code }: PhoneTokenType) => {
  const signToken = jwt.sign(
    {
      phone,
      code,
    },
    ENV.JWT_SECRET,
    {
      expiresIn: ENV.VERIFY_TOKEN_EXPIRE,
    },
  )
  return signToken
}
