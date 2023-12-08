import { nonNull, queryField, stringArg } from "nexus"
import { BookType } from "../types"

export const Book = queryField("book", {
  type: BookType,
  args: { id: nonNull(stringArg()) },
  resolve: async (_, { id }, ctx) => {
    const book = await ctx.prisma.book.findFirst({
      where: { id },
    })

    return book
  },
})
