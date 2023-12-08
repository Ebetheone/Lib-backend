import { arg, mutationField, nonNull, stringArg } from "nexus"
import { UserStatusUpdateInputType } from "../inputTypes"
import { accessibleBy } from "lib/casl"

export const UserStatusUpdate = mutationField("userStatusUpdate", {
  type: "Boolean",
  args: {
    id: nonNull(stringArg()),
    input: nonNull(arg({ type: UserStatusUpdateInputType })),
  },
  resolve: async (_, { id, input }, ctx) => {
    accessibleBy(ctx.ability, "update", "User")

    const user = await ctx.prisma.user.update({
      where: { id, ...accessibleBy(ctx.ability, "update", "User") },
      data: input,
      select: { id: true },
    })

    return !!user.id
  },
})
