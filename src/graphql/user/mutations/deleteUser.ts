import { mutationField, nonNull, stringArg } from "nexus"
import { Errors } from "src/errors"

export const DeleteUser = mutationField("deleteUser", {
  type: "Boolean",
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: async (_, { userId }, ctx) => {
    const { user } = ctx

    if (user?.role === "ADMIN") {
      await ctx.prisma.user.delete({
        where: {
          id: userId,
        },
      })
    } else {
      throw Errors.Auth.NOT_AUTHORIZED()
    }

    return true
  },
})
