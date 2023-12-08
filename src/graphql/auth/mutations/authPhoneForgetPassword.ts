import { arg, mutationField, nonNull } from "nexus"
import { AuthPhoneVerifyTokenSenderInputType } from "../inputTypes"
import { Errors } from "src/errors"

export const AuthPhoneForgetPassword = mutationField(
  "authPhoneForgetPassword",
  {
    type: "Boolean",
    args: {
      input: nonNull(arg({ type: AuthPhoneVerifyTokenSenderInputType })),
    },
    resolve: async (_root, { input }, ctx) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          countryCode_phone: {
            phone: input.phone,
            countryCode: input.countryCode,
          },
        },
      })

      if (!user) {
        throw Errors.Auth.LOGIN_USER_NOT_FOUND()
      }
      return true
    },
  },
)
