import { verify } from "jsonwebtoken"
import { arg, mutationField, nonNull, nullable } from "nexus"
import { ENV } from "src/config"
import { Errors } from "src/errors"
import {
  createResetToken,
  createUserTokens,
  PhoneTokenType,
} from "src/utils/tokenGenerator"
import { AuthPhoneVerifyTokenInputType } from "../inputTypes"
import { AuthVerifyTokenType } from "../types"
import { getExpiresDate } from "utils/dateFounder"
import { TokenVerifyEnum } from "generated"

export const AuthPhoneVerifyToken = mutationField("authPhoneVerifyToken", {
  type: nullable(AuthVerifyTokenType),
  args: {
    input: nonNull(arg({ type: AuthPhoneVerifyTokenInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        phone: input.phone,
        countryCode: input.countryCode,
      },
    })

    let accessToken, refreshToken, deviceId, resetToken, isPhoneConfirmed

    if (user && user.phoneConfirmCode) {
      try {
        const data = verify(
          user.phoneConfirmCode,
          ENV.JWT_SECRET,
        ) as unknown as PhoneTokenType
        if (data.code === input.code) {
          await ctx.prisma.user.update({
            where: { id: user.id },
            data: { isPhoneConfirmed: true },
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
            const tokens = createUserTokens(user.id, device.deviceType)
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
    return { accessToken, refreshToken, deviceId, isPhoneConfirmed }
  },
})
