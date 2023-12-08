import { arg, mutationField, nonNull } from "nexus"
import { Errors } from "src/errors"
import { signEmailToken } from "src/utils/tokenGenerator"
import { AuthEmailVerifyTokenSenderInputType } from "../inputTypes"
import { sendCodeMail } from "lib/mail-sender/template"

export const AuthEmailVerifyTokenSender = mutationField(
  "authEmailVerifyTokenSender",
  {
    type: "Boolean",
    args: {
      input: nonNull(arg({ type: AuthEmailVerifyTokenSenderInputType })),
    },
    resolve: async (_root, { input }, ctx) => {
      const code = Math.floor(100000 + Math.random() * 900000).toString()

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      if (user) {
        const emailVerifyToken = signEmailToken({ email: input.email, code })
        await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailConfirmCode: emailVerifyToken,
          },
        })
        sendCodeMail(input.email, code)
      } else {
        throw Errors.Auth.LOGIN_USER_NOT_FOUND()
      }
      return true
    },
  },
)
