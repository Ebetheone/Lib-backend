import { Errors } from "src/errors"
import bcrypt from "bcrypt"
import { arg, mutationField, nonNull, nullable } from "nexus"
import { createUserTokens, signPhoneToken } from "src/utils/tokenGenerator"
import { LoginPhoneInputType } from "../inputTypes"
import { AuthVerifyTokenType } from "../types"
import { CheckSessions, userIncludeDevice } from "utils/sessionCheck"
import { User, UserDevice } from "generated"
import { sendCodeServer, smsServerMongolia } from "lib/sms-sender/smsSender"

interface AuthVerifyTokenType {
  accessToken?: string
  refreshToken?: string
  isPhoneConfirmed?: boolean
  isEmailConfirmed?: boolean
  deviceId?: string
  devices?: UserDevice[]
}

export const LoginPhone = mutationField("loginPhone", {
  type: nullable(AuthVerifyTokenType),
  args: {
    input: nonNull(arg({ type: LoginPhoneInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        phone: input.phone,
      },
      include: userIncludeDevice,
    })

    if (!user?.id) throw Errors.Auth.LOGIN_USER_NOT_FOUND()

    if (!user.isPhoneConfirmed) {
      const code = Math.floor(100000 + Math.random() * 900000).toString()

      const phoneVerifyCode = signPhoneToken({
        phone: input.phone,
        code,
      })

      const userCode = await ctx.prisma.user.update({
        where: {
          countryCode_phone: {
            phone: input.phone,
            countryCode: input.countryCode || "976",
          },
        },
        data: {
          phoneConfirmCode: phoneVerifyCode,
        },
      })

      if (userCode.phone) {
        const result = await smsServerMongolia({
          phone: input.phone,
          content: code,
        })
        if (!result) throw Errors.Auth.SEND_CODE_FAILED()

        const codeSend = await sendCodeServer(userCode.phone, "+976")
        if (!codeSend) throw Errors.Auth.SEND_CODE_FAILED()
      }

      return { isPhoneConfirmed: false }
    }

    const passwordMatch = await bcrypt.compare(
      String(input.password),
      String(user.password),
    )

    if (!passwordMatch) throw Errors.Auth.LOGIN_PASSWORD_WRONG()

    const deviceId: string = input.deviceId || ""

    const device = await CheckSessions(ctx, user as User, deviceId)

    if (!device) throw Errors.Auth.ACTION_TRY_AGAIN()

    const { refreshToken, accessToken } = createUserTokens(
      user?.id,
      ctx.device.deviceType || null,
    )

    const data = {
      isEmailConfirmed: user?.isEmailConfirmed,
      accessToken: null as null | string,
      refreshToken: null as null | string,
      deviceId: null as null | string,
      devices: null as null | Array<{
        id: string
        deviceName: string
        deviceOs: string
        deviceType: string
      }>,
    }

    if (typeof device === "string") {
      data.deviceId = device
      data.accessToken = accessToken
      data.refreshToken = refreshToken
    } else {
      data.devices = device.deviceList
    }

    return data as AuthVerifyTokenType
  },
})
