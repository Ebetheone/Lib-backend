import { arg, mutationField, nonNull } from "nexus"
import { Errors } from "src/errors"
import { signPhoneToken } from "src/utils/tokenGenerator"
import { sendCodeServer, smsServerMongolia } from "lib/sms-sender/smsSender"
import { AuthPhoneVerifyTokenSenderInputType } from "../inputTypes"

export const AuthPhoneVerifyTokenSender = mutationField(
  "authPhoneVerifyTokenSender",
  {
    type: "Boolean",
    args: {
      input: nonNull(arg({ type: AuthPhoneVerifyTokenSenderInputType })),
    },
    resolve: async (_root, { input }, ctx) => {
      const code = Math.floor(100000 + Math.random() * 900000).toString()

      const user = await ctx.prisma.user.findUnique({
        where: {
          countryCode_phone: {
            phone: input.phone,
            countryCode: input.countryCode,
          },
        },
      })

      if (user) {
        const phoneVerifyToken = signPhoneToken({
          phone: input.phone,
          code,
        })
        await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            phoneConfirmCode: phoneVerifyToken,
          },
        })
        const result = await smsServerMongolia({
          phone: input.phone,
          content: code,
        })
        if (!result) throw Errors.Auth.SEND_CODE_FAILED()

        const codeSend = await sendCodeServer(input.phone, input.countryCode)
        if (!codeSend) throw Errors.Auth.SEND_CODE_FAILED()
      } else {
        throw Errors.Auth.LOGIN_USER_NOT_FOUND()
      }
      return true
    },
  },
)
