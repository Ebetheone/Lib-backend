import { accessibleBy } from "lib/casl"
import { mutationField, nonNull, stringArg } from "nexus"

export const DeleteBook = mutationField("deleteBook", {
  type: "Boolean",
  args: { bookId: nonNull(stringArg()) },
  resolve: async (_, { bookId }, ctx) => {
    accessibleBy(ctx.ability, "delete", "Book")

    const data = await ctx.prisma.book.delete({
      where: {
        id: bookId,
        ...accessibleBy(ctx.ability, "delete", "Book"),
      },
      select: { id: true },
    })

    return !!data.id
  },
})
