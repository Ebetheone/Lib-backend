import { Prisma } from "@prisma/client"
import { arg, intArg, nonNull, nullable, queryField, stringArg } from "nexus"
import { buildOrderBy } from "utils/buildOrderBy"
import { BooksType } from "../types"
import { BookWhereInputType } from "../whereInputTypes"

export const Books = queryField("books", {
  type: BooksType,
  args: {
    input: nullable(arg({ type: BookWhereInputType })),
    orderBy: stringArg(),
    take: nonNull(intArg()),
    skip: nonNull(intArg()),
  },
  resolve: async (_, { input, orderBy, take, skip }, ctx) => {
    const _where: Prisma.BookWhereInput = {}

    if (input?.id) _where.id = input?.id
    if (input?.bookId) _where.bookId = input?.bookId
    if (input?.name) _where.name = input?.name
    if (input?.limit) _where.limit = input?.limit
    if (input?.category) _where.category = input?.category
    if (input?.publisher) _where.publisher = input?.publisher
    if (input?.price) _where.price = input?.price
    if (input?.bestSeller) _where.bestSeller = input?.bestSeller

    const books = await ctx.prisma.book.findMany({
      where: { ..._where },
      orderBy: buildOrderBy(orderBy || null || undefined),
      take,
      skip,
    })

    const count = await ctx.prisma.book.count({
      where: { ..._where },
    })

    return { data: books, count }
  },
})
