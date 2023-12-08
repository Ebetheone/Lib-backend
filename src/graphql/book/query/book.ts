import { accessibleBy } from "lib/casl"
import { arg, nullable, queryField } from "nexus"
import { Prisma } from "@prisma/client"
import { BookType } from "../types"
import { BookWhereInputType } from "../whereInputTypes"

export const Book = queryField("book", {
  type: BookType,
  args: {
    input: nullable(arg({ type: BookWhereInputType })),
  },
  resolve: async (_, { input }, ctx) => {
    accessibleBy(ctx.ability, "read", "Book")

    const _where: Prisma.BookWhereInput = {}

    if (input?.id) _where.id = input?.id
    if (input?.bookId) _where.bookId = input?.bookId
    if (input?.name) _where.name = input?.name
    if (input?.limit) _where.limit = input?.limit
    if (input?.category) _where.category = input?.category
    if (input?.price) _where.price = input?.price
    if (input?.bestSeller) _where.bestSeller = input?.bestSeller

    const book = await ctx.prisma.book.findFirst({
      where: { ..._where, ...accessibleBy(ctx.ability, "read", "Book") },
    })

    return book
  },
})
