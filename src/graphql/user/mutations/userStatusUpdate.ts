import { arg, mutationField, nonNull, stringArg } from "nexus"
import { UserStatusUpdateInputType } from "../inputTypes"

export const UserStatusUpdate = mutationField("userStatusUpdate", {
  type: "Boolean",
  args: {
    id: nonNull(stringArg()),
    input: nonNull(arg({ type: UserStatusUpdateInputType })),
  },
  resolve: async (_, { id, input }, ctx) => {
    const user = await ctx.prisma.user.update({
      where: { id },
      data: input,
      select: { id: true },
    })

    return !!user.id
  },
})
