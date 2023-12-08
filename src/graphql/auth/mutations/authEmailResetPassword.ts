import { arg, mutationField, nonNull } from "nexus"
import { AuthVerifyTokenType } from "../types"
import { AuthEmailResetPasswordInputType } from "../inputTypes"
import { Errors } from "src/errors"
import { createUserTokens } from "src/utils/tokenGenerator"
import bcrypt from "bcrypt"
import { get } from "lodash"
import { ENV } from "src/config"
import { verify } from "jsonwebtoken"
import { Authorization, getUser } from "utils/auth"

export const AuthEmailResetPassword = mutationField("authEmailResetPassword", {
  type: AuthVerifyTokenType,
  args: {
    input: nonNull(arg({ type: AuthEmailResetPasswordInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    let accessToken, refreshToken
    const token = get(ctx.req, `headers.${ENV.RESET_TOKEN_KEY}`) as string

    const verifiedToken =
      (verify(token, ENV.JWT_SECRET) as Authorization) || null
    const verifiedUser = await getUser(verifiedToken.userId)

    if (!verifiedUser) throw Errors.User.USER_NOT_FOUND()

    const passwordHash = await bcrypt.hash(input.password, 10)

    if (input.email !== verifiedUser.email)
      throw Errors.User.AUTH_EMAIL_NOT_FOUND()

    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    })

    if (user) {
      await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: passwordHash,
        },
      })

      const tokens = createUserTokens(user.id, ctx.device.deviceType || null)

      accessToken = tokens.accessToken
      refreshToken = tokens.refreshToken
    } else {
      throw Errors.Auth.LOGIN_USER_NOT_FOUND()
    }
    return { accessToken, refreshToken }
  },
})
