import { arg, mutationField, nonNull, stringArg } from "nexus"
import { UserInputType } from "../inputTypes"
import { UserType } from "../types"
import { Gender } from "@prisma/client"

export const UpdateUser = mutationField("updateUser", {
  type: UserType,
  args: {
    id: nonNull(stringArg()),
    input: nonNull(arg({ type: UserInputType })),
  },
  resolve: async (_, { id, input }, ctx) => {
    const updateUser = await ctx.prisma.user.update({
      where: { id },
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
        address: {
          upsert: {
            where: { userId: id },
            create: {
              city: input?.city,
              district: input?.district,
              address1: input?.address1,
              address2: input?.address2,
            },
            update: {
              city: input?.city,
              district: input?.district,
              address1: input?.address1,
              address2: input?.address2,
            },
          },
        },
      },
    })

    return updateUser
  },
})
