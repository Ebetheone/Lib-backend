import { Errors } from "src/errors"
import bcrypt from "bcrypt"
import { arg, mutationField, nonNull, nullable } from "nexus"
import { createUserTokens, signEmailToken } from "src/utils/tokenGenerator"
import { LoginEmailInputType } from "../inputTypes"
import { AuthVerifyTokenType } from "../types"
import { CheckSessions, userIncludeDevice } from "utils/sessionCheck"
import { User, UserDevice } from "generated"
import { sendCodeMail } from "lib/mail-sender/template"

interface AuthVerifyTokenType {
  accessToken?: string
  refreshToken?: string
  isPhoneConfirmed?: boolean
  isEmailConfirmed?: boolean
  deviceId?: string
  devices?: UserDevice[]
}

export const LoginEmail = mutationField("loginEmail", {
  type: nullable(AuthVerifyTokenType),
  args: {
    input: nonNull(arg({ type: LoginEmailInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        email: input.email,
      },
      include: userIncludeDevice,
    })

    if (!user?.id) throw Errors.Auth.LOGIN_USER_NOT_FOUND()

    if (!user.isEmailConfirmed) {
      const code = Math.floor(100000 + Math.random() * 900000).toString()

      const emailVerifyToken = signEmailToken({ email: input.email, code })

      const userCode = await ctx.prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          emailConfirmCode: emailVerifyToken,
        },
      })
      if (userCode.email) {
        sendCodeMail(userCode.email, code)
      }

      return { isEmailConfirmed: false }
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
      user.id,
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
