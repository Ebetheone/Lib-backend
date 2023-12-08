import { arg, mutationField, nonNull, nullable } from "nexus"
import { Errors } from "src/errors"
import { AccountEliminateInputType } from "../inputTypes"
import { AuthVerifyTokenType } from "../types"
import { createUserTokens } from "utils/tokenGenerator"
import bcrypt from "bcrypt"
import { CheckSessions, userIncludeDevice } from "utils/sessionCheck"
import { User, UserDevice } from "generated"

interface AuthVerifyTokenType {
  accessToken?: string
  refreshToken?: string
  isPhoneConfirmed?: boolean
  isEmailConfirmed?: boolean
  deviceId?: string
  devices?: UserDevice[]
}

export const AccountEliminate = mutationField("accountEliminate", {
  type: nullable(AuthVerifyTokenType),
  args: {
    input: nonNull(arg({ type: AccountEliminateInputType })),
  },
  resolve: async (_, { input }, ctx) => {
    const eliminate = await ctx.prisma.userDevice.update({
      where: {
        id: input.id,
      },
      data: {
        isActive: false,
        sessions: {
          updateMany: {
            where: { deviceId: input.id },
            data: {
              isActive: false,
            },
          },
        },
      },
    })

    if (!eliminate) {
      throw Errors.Auth.ACCOUNT_ELIMINATE_FAILED()
    }

    const user = await ctx.prisma.user.findFirst({
      where: {
        email: input.email,
      },
      include: userIncludeDevice,
    })

    if (!user?.id) throw Errors.Auth.LOGIN_USER_NOT_FOUND()

    const passwordMatch = await bcrypt.compare(
      String(input.password),
      String(user.password),
    )

    if (!passwordMatch) throw Errors.Auth.LOGIN_PASSWORD_WRONG()

    const deviceId: string = input.id || ""

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
