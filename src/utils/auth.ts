import { Request } from "express-serve-static-core"
import jwt from "jsonwebtoken"
import { get, isEmpty } from "lodash"
import { Errors } from "src/errors"
import { Context } from "src/lib/context"
import { prisma } from "src/lib/prisma"
import { ENV } from "src/config"

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export type Authorization = {
  userId: string
  email: string
}

export const getHeaderTokens = (req: Request) => {
  const accessToken: string =
    get(req, `headers.${ENV.ACCESS_TOKEN_KEY}`) ||
    get(req, `cookies.${ENV.ACCESS_TOKEN_KEY}`)
  const refreshToken: string =
    get(req, `headers.${ENV.REFRESH_TOKEN_KEY}`) ||
    get(req, `cookies.${ENV.REFRESH_TOKEN_KEY}`)
  return { accessToken, refreshToken }
}

export const getUser = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })
  if (!user) throw Errors.Auth.ACCESS_TOKEN_INVALID()
  return user
}

export async function getContextUser(req: Request) {
  const { accessToken, refreshToken } = getHeaderTokens(req)
  if (!isEmpty(accessToken)) {
    let userId = null
    jwt.verify(accessToken, ENV.JWT_SECRET, function (err, decoded) {
      if (err) {
        if (err.message === "jwt expired")
          throw Errors.Auth.ACCESS_TOKEN_EXPIRED()
        if (err.message === "invalid token") {
          throw Errors.Auth.ACCESS_TOKEN_INVALID()
        }
        if (err.message === "invalid signature") {
          throw Errors.Auth.ACCESS_TOKEN_INVALID()
        }
      }
      const tokenJson = decoded as Authorization
      if (tokenJson?.userId) {
        userId = tokenJson?.userId
      }
    })
    if (userId) {
      const user = await getUser(userId)
      return user
    }
  }
  if (isEmpty(accessToken) && !isEmpty(refreshToken))
    throw Errors.Auth.ACCESS_TOKEN_MISSING()
  return null
}

export const checkEmail = async (email: string, ctx: Context) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: email,
    },
    select: { id: true },
  })
  if (user?.id) throw Errors.User.EMAIL_ALREADY_USED()
  return false
}

export const checkPhone = async (
  phone: string,
  countryCode: string,
  ctx: Context,
) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      countryCode_phone: {
        phone: phone,
        countryCode: countryCode,
      },
    },
  })
  if (user?.id) throw Errors.User.PHONE_NUMBER_ALREADY_USED()
  return false
}
