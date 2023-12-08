import { arg, mutationField, nonNull } from "nexus"
import { AuthEmailVerifyTokenSenderInputType } from "../inputTypes"
import { Errors } from "src/errors"

export const AuthEmailForgetPassword = mutationField(
  "authEmailForgetPassword",
  {
    type: "Boolean",
    args: {
      input: nonNull(arg({ type: AuthEmailVerifyTokenSenderInputType })),
    },
    resolve: async (_root, { input }, ctx) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
      if (!user) {
        throw Errors.Auth.LOGIN_USER_NOT_FOUND()
      }
      return true
    },
  },
)
