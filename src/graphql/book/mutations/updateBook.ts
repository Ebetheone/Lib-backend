import { arg, mutationField, nonNull, stringArg } from "nexus"
import { BookType } from "../types"
import { BookInputType } from "../inputTypes"
import { Errors } from "src/errors"

export const UpdateBook = mutationField("updateBook", {
  type: BookType,
  args: {
    id: nonNull(stringArg()),
    input: nonNull(arg({ type: BookInputType })),
  },
  resolve: async (_, { id, input }, ctx) => {
    if (!ctx.user?.id) throw Errors.User.USER_NOT_FOUND()

    const data = await ctx.prisma.book.update({
      where: { id },
      data: {
        name: input.name,
        limit: input.limit,
        category: input.category,
        publisher: input.publisher,
        price: input.price,
        image: input.image || "",
        bestSeller: input?.bestSeller || false,
        updatedUserId: ctx.user?.id,
      },
    })

    return data
  },
})
