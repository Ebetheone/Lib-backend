import { arg, nullable, queryField } from "nexus"
import { UserType } from "../types"
import { Prisma } from "@prisma/client"
import { UserWhereInputType } from "../whereInputTypes"

export const User = queryField("user", {
  type: UserType,
  args: {
    input: nullable(arg({ type: UserWhereInputType })),
  },
  resolve: async (_, { input }, ctx) => {
    const _where: Prisma.UserWhereInput = {}

    if (input?.id) {
      _where.id = input?.id
    } else {
      _where.id = ctx.user?.id
    }

    if (input?.phone) _where.phone = input?.phone
    if (input?.email) _where.email = input?.email
    if (input?.search)
      _where.OR = [
        { profile: { firstName: { contains: input.search } } },
        { profile: { lastName: { contains: input.search } } },
        { email: input.search },
        { phone: { contains: input.search } },
      ]

    const user = await ctx.prisma.user.findFirst({
      where: { ..._where },
      include: { profile: true, address: true },
    })

    return user
  },
})
