import { mutationField, arg, nonNull, stringArg } from "nexus"
import axios from "axios"
import { AuthVerifyTokenType } from "../types"
import {
  ExternalAuthInputType,
  ExternalAuthAppleInputType,
} from "../inputTypes"
import { createUserTokens } from "src/utils/tokenGenerator"
import { Errors } from "src/errors"
import { AccountProviderTypeEnum } from "@prisma/client"

interface ProviderData {
  providerId: string
  providerName: string
  email: string
  phoneNumber?: string
  verified_email?: boolean
}

const providerGraphAsync = async (
  accessToken: string,
  providerType: AccountProviderTypeEnum,
) => {
  let result
  switch (providerType) {
    case AccountProviderTypeEnum.GOOGLE: {
      try {
        result = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
        )
      } catch (error) {
        console.log(
          "================ authGoogle graph error ======================",
        )
        console.log(error)
      }
      break
    }
    case AccountProviderTypeEnum.FACEBOOK: {
      const userFieldSet = "id,name,email,accounts,picture,photos"
      try {
        result = await axios.get(
          `https://graph.facebook.com/v2.8/me?fields=${userFieldSet}&access_token=${accessToken}`,
        )
      } catch (error) {
        console.log(
          "================ authFacebook graph error ======================",
        )
        console.log(error)
      }
      break
    }
  }
  return result ? result.data : null
}

export const AuthMobile = mutationField("authMobile", {
  type: AuthVerifyTokenType,
  args: {
    provider: nonNull(stringArg()),
    input: nonNull(arg({ type: ExternalAuthInputType })),
    appleInput: arg({ type: ExternalAuthAppleInputType }),
  },
  resolve: async (_root, { provider, input, appleInput }, ctx) => {
    let providerData: ProviderData
    switch (provider) {
      case "GOOGLE":
      case "FACEBOOK": {
        const { accessToken } = input
        const data = await providerGraphAsync(accessToken, provider)
        if (!data) {
          throw Errors.User.LOGIN_USER_TRY_AGAIN()
        }
        providerData = data
        break
      }
      case "APPLE": {
        if (!appleInput || !appleInput.email) {
          throw Errors.User.LOGIN_USER_TRY_AGAIN()
        }
        const { providerId, providerName, email } = appleInput
        providerData = {
          providerId: providerId,
          providerName: providerName,
          email: email,
        }
        break
      }
      default: {
        throw Errors.User.LOGIN_USER_TRY_AGAIN()
      }
    }

    const user = await ctx.prisma.user.findFirst({
      where: {
        OR: [
          { email: providerData.email },
          { phone: providerData?.phoneNumber },
          {
            accounts: {
              some: {
                OR: [
                  {
                    providerId: providerData.providerId,
                    providerType: provider as AccountProviderTypeEnum,
                  },
                ],
              },
            },
          },
        ],
      },
      include: {
        accounts: true,
      },
    })

    if (user?.id) {
      if (user.accounts.length > 0) {
        const userAccount = user?.accounts.find(
          e => e.providerId === providerData.providerId,
        )
        if (!userAccount?.id)
          await ctx.prisma.userAccount.create({
            data: {
              providerId: providerData.providerId,
              providerName: providerData.providerName,
              providerType: provider as AccountProviderTypeEnum,
              userId: user.id,
            },
          })
      } else {
        await ctx.prisma.userAccount.create({
          data: {
            providerId: providerData.providerId,
            providerName: providerData.providerName,
            providerType: provider as AccountProviderTypeEnum,
            userId: user.id,
          },
        })
      }

      const tokens = createUserTokens(user.id, ctx.device.deviceType || null)
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
    } else {
      const newUser = await ctx.prisma.user.create({
        data: {
          email: providerData.email,
          isEmailConfirmed:
            provider === "GOOGLE"
              ? !!(providerData.email && providerData.verified_email)
              : !!providerData.email,
          phone: providerData.phoneNumber,
          accounts: {
            create: {
              providerId: providerData.providerId,
              providerName: providerData.providerName,
              providerType: provider as AccountProviderTypeEnum,
            },
          },
        },
      })

      const tokens = createUserTokens(newUser.id, ctx.device.deviceType || null)
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
    }
  },
})
