/* eslint-disable @typescript-eslint/no-unused-vars */
import { mutationField, arg, nonNull } from "nexus"
import { ExternalWebAuthInput } from "../inputTypes"
import { createUserTokens } from "src/utils/tokenGenerator"
import { generateUniqueId } from "src/utils/generateUniqueId"
import { AccountProviderTypeEnum, Prisma } from "@prisma/client"
import { AuthVerifyTokenType } from "../types"
import { Errors } from "src/errors"
import { getAuth } from "lib/firebase/get-auth"

export const AuthWeb = mutationField("authWeb", {
  type: AuthVerifyTokenType,
  args: {
    input: nonNull(arg({ type: ExternalWebAuthInput })),
  },
  resolve: async (_root, { input }, ctx) => {
    const expiresIn = 5 * 24 * 60 * 60 * 1000

    getAuth()
      .createSessionCookie(input.accessToken, { expiresIn })
      .then(
        sessionCookie => {
          const options = { maxAge: expiresIn, httpOnly: true }
          ctx.res.cookie("session", sessionCookie, options)
        },
        _error => {
          ctx.res.status(401).send("UNAUTHORIZED REQUEST!")
          throw Errors.Auth.NOT_AUTHORIZED()
        },
      )

    const resultVerify = await getAuth().verifyIdToken(input.accessToken, true)
    const userCreate = {
      email:
        resultVerify.email === input?.email
          ? resultVerify.email
          : input?.email || resultVerify.email || undefined,
      isEmailConfirmed: resultVerify.email ? true : input?.email ? true : false,
      phone: resultVerify.phone_number || input?.phone || undefined,
    } as Prisma.UserCreateInput

    let providerType: AccountProviderTypeEnum
    switch (input.providerName) {
      case "google.com":
        providerType = AccountProviderTypeEnum.GOOGLE
        break
      case "facebook.com":
        providerType = AccountProviderTypeEnum.FACEBOOK
        break
      case "apple.com":
        providerType = AccountProviderTypeEnum.APPLE
        break
      default:
        providerType = AccountProviderTypeEnum.NONE
        break
    }

    const userAccountCreate = {
      userUid: resultVerify.uid || input?.userUid,
      providerId: input.providerId,
      providerType,
      providerName:
        resultVerify.firebase.sign_in_provider || input.providerName,
    } as Prisma.UserAccountCreateInput

    const user = await ctx.prisma.user.findFirst({
      where: {
        OR: [
          { email: userCreate.email },
          { phone: userCreate.phone },
          {
            accounts: {
              some: {
                OR: [
                  { userUid: userAccountCreate?.userUid },
                  { providerId: userAccountCreate.providerId },
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
          e => e.providerId === userAccountCreate.providerId,
        )
        if (!userAccount?.id)
          await ctx.prisma.userAccount.create({
            data: {
              providerId: userAccountCreate?.providerId,
              providerName: userAccountCreate?.providerName,
              providerType: userAccountCreate?.providerType,
              userId: user.id,
            },
          })
      } else {
        await ctx.prisma.userAccount.create({
          data: {
            providerId: userAccountCreate?.providerId,
            providerName: userAccountCreate?.providerName,
            providerType: userAccountCreate?.providerType,
            userId: user.id,
          },
        })
      }
      const { accessToken, refreshToken } = createUserTokens(
        user?.id,
        ctx.device.deviceType || null,
      )

      return { accessToken, refreshToken }
    } else {
      const newUser = await ctx.prisma.user.create({
        data: {
          userId: generateUniqueId("U"),
          email: userCreate.email,
          isEmailConfirmed: userCreate.isEmailConfirmed,
          phone: userCreate.phone,
          accounts: {
            create: {
              userUid: userAccountCreate.userUid,
              providerId: userAccountCreate.providerId,
              providerName: userAccountCreate.providerName,
              providerType: userAccountCreate.providerType,
            },
          },
          profile: {
            create: {
              firstName: input?.firstName,
              lastName: input?.lastName,
            },
          },
        },
      })
      const { accessToken, refreshToken } = createUserTokens(
        newUser?.id,
        ctx.device.deviceType || null,
      )
      return { accessToken, refreshToken }
    }
  },
})
