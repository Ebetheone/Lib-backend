import { mutationField, nonNull, stringArg } from "nexus"

export const DeleteBook = mutationField("deleteBook", {
  type: "Boolean",
  args: { bookId: nonNull(stringArg()) },
  resolve: async (_, { bookId }, ctx) => {
    const data = await ctx.prisma.book.delete({
      where: { id: bookId },
      select: { id: true },
    })

    return !!data.id
  },
})
