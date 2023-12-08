import { arg, mutationField, nonNull } from "nexus"
import bcrypt from "bcrypt"
import { UserChangePasswordInputType } from "../inputTypes"
import { Errors } from "src/errors"

export const UserChangePassword = mutationField("userChangePassword", {
  type: "Boolean",
  args: {
    input: nonNull(arg({ type: UserChangePasswordInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    if (input.newPassword) {
      const passwordHash = await bcrypt.hash(input.newPassword, 10)
      input.newPassword = passwordHash
    } else {
      throw Errors.User.AUTH_PASSWORD_WRONG()
    }

    const ctxUserId = ctx.user?.id

    if (!ctxUserId) {
      throw Errors.User.USER_NOT_FOUND()
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctxUserId,
      },
    })

    if (user) {
      if (user.password) {
        if (input.password) {
          const oldPasswordMatch = await bcrypt.compare(
            String(input.password),
            String(input.newPassword),
          )
          if (oldPasswordMatch) {
            throw Errors.User.USER_PASSWORD_MATCH()
          } else {
            const passwordMatch = await bcrypt.compare(
              String(input.password),
              String(user.password),
            )
            if (passwordMatch) {
              await ctx.prisma.user.update({
                where: {
                  id: ctxUserId,
                },
                data: {
                  password: input.newPassword,
                },
              })
            } else {
              throw Errors.User.USER_PASSWORD_NOT_MATCH()
            }
          }
        } else {
          throw Errors.User.USER_OLD_PASSWORD()
        }
      } else {
        await ctx.prisma.user.update({
          where: {
            id: ctxUserId,
          },
          data: {
            password: input.newPassword,
          },
        })
      }
    } else {
      throw Errors.User.USER_NOT_FOUND()
    }

    return true
  },
})
