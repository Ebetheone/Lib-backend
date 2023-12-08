import { createResetToken } from "./../../../utils/tokenGenerator"
import { verify } from "jsonwebtoken"
import { arg, mutationField, nonNull, nullable } from "nexus"
import { ENV } from "src/config"
import { Errors } from "src/errors"
import { createUserTokens, EmailTokenType } from "src/utils/tokenGenerator"
import { AuthEmailVerifyTokenInputType } from "../inputTypes"
import { AuthVerifyTokenType } from "../types"
import { getExpiresDate } from "utils/dateFounder"
import { TokenVerifyEnum } from "generated"

export const AuthEmailVerifyToken = mutationField("authEmailVerifyToken", {
  type: nullable(AuthVerifyTokenType),
  args: {
    input: nonNull(arg({ type: AuthEmailVerifyTokenInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    })

    let deviceId, accessToken, refreshToken, resetToken, isEmailConfirmed

    if (user && user.emailConfirmCode) {
      try {
        const data = verify(
          user.emailConfirmCode,
          ENV.JWT_SECRET,
        ) as unknown as EmailTokenType
        if (data.code === input.code) {
          await ctx.prisma.user.update({
            where: { id: user.id },
            data: { isEmailConfirmed: true },
          })

          const expiresDate = getExpiresDate(14)

          if (
            !ctx.device.osName ||
            !ctx.device.deviceType ||
            !ctx.device.name
          ) {
            throw Errors.Auth.NOT_AUTHORIZED()
          }

          const device = await ctx.prisma.userDevice.create({
            data: {
              deviceOs: ctx.device.osName,
              deviceType: ctx.device.deviceType,
              deviceName: ctx.device.name,
              isActive: true,
              userId: user.id,
              sessions: {
                create: {
                  userId: user.id,
                  isActive: true,
                  expires: expiresDate,
                },
              },
            },
          })
          if (input.type === TokenVerifyEnum.AUTH) {
            const tokens = createUserTokens(user.id, ctx.device.deviceType)
            deviceId = device.id
            accessToken = tokens.accessToken
            refreshToken = tokens.refreshToken
          } else if (input.type === TokenVerifyEnum.RESET) {
            const tokens = createResetToken(user.id, device.deviceType)
            resetToken = tokens.resetToken
            return { resetToken }
          } else throw Errors.Auth.ACTION_TRY_AGAIN()
        } else {
          throw Errors.Auth.CONFIRM_CODE_WRONG()
        }
      } catch (error) {
        throw Errors.Auth.CONFIRM_CODE_WRONG()
      }
    } else {
      throw Errors.Auth.LOGIN_USER_NOT_FOUND()
    }
    return { accessToken, refreshToken, deviceId, isEmailConfirmed }
  },
})
