import { arg, mutationField, nonNull, stringArg } from "nexus"
import { UserInputType } from "../inputTypes"
import { UserType } from "../types"
import { accessibleBy } from "lib/casl"
import { Gender } from "@prisma/client"

export const UpdateUser = mutationField("updateUser", {
  type: UserType,
  args: {
    id: nonNull(stringArg()),
    input: nonNull(arg({ type: UserInputType })),
  },
  resolve: async (_, { id, input }, ctx) => {
    accessibleBy(ctx.ability, "update", "User")

    const updateUser = await ctx.prisma.user.update({
      where: { id, ...accessibleBy(ctx.ability, "update", "User") },
      data: {
        email: input?.email,
        phone: input?.phone,
        countryCode: input?.countryCode,
        updatedUserId: ctx.user?.id,
        profile: {
          upsert: {
            where: { userId: id },
            create: {
              firstName: input?.firstName,
              lastName: input?.lastName,
              birthday: input?.birthday,
              gender: input?.gender as Gender,
              createdUserId: ctx.user?.id,
              updatedUserId: ctx.user?.id,
            },
            update: {
              firstName: input?.firstName,
              lastName: input?.lastName,
              birthday: input?.birthday,
              gender: input?.gender as Gender,
              updatedUserId: ctx.user?.id,
            },
          },
        },
      },
    })

    return updateUser
  },
})
