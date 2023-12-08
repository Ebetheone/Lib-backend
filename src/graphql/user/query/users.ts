import { Prisma, UserStatusEnum } from "@prisma/client"
import { accessibleBy } from "lib/casl"
import { arg, intArg, nonNull, nullable, queryField, stringArg } from "nexus"
import { UsersType } from "../types"
import { UserWhereInputType } from "../whereInputTypes"
import { buildOrderBy } from "utils/buildOrderBy"

export const Users = queryField("users", {
  type: UsersType,
  args: {
    input: nullable(arg({ type: UserWhereInputType })),
    orderBy: stringArg(),
    take: nonNull(intArg()),
    skip: nonNull(intArg()),
  },
  resolve: async (_, { input, orderBy, take, skip }, ctx) => {
    accessibleBy(ctx.ability, "read", "User")

    const _where: Prisma.UserWhereInput = {}

    if (input?.id) _where.id = input?.id
    if (input?.phone) _where.phone = input?.phone
    if (input?.email) _where.email = input?.email
    if (input?.status) _where.status = input?.status as UserStatusEnum
    if (input?.search)
      _where.OR = [
        { profile: { firstName: { contains: input.search } } },
        { profile: { lastName: { contains: input.search } } },
        { email: input.search },
        { phone: { contains: input.search } },
      ]

    const users = await ctx.prisma.user.findMany({
      where: { ..._where, ...accessibleBy(ctx.ability, "read", "User") },
      include: {
        profile: true,
      },
      orderBy: buildOrderBy(orderBy || null || undefined),
      take,
      skip,
    })

    const count = await ctx.prisma.user.count({
      where: { ..._where, ...accessibleBy(ctx.ability, "read", "User") },
    })

    return { data: users, count }
  },
})
