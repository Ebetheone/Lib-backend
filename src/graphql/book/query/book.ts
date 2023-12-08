import { accessibleBy } from "lib/casl"
import { nonNull, queryField, stringArg } from "nexus"
import { BookType } from "../types"

export const Book = queryField("book", {
  type: BookType,
  args: { id: nonNull(stringArg()) },
  resolve: async (_, { id }, ctx) => {
    accessibleBy(ctx.ability, "read", "Book")

    const book = await ctx.prisma.book.findFirst({
      where: { id, ...accessibleBy(ctx.ability, "read", "Book") },
    })

    return book
  },
})
