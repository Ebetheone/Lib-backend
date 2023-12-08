import { arg, mutationField, nonNull } from "nexus"
import { Errors } from "src/errors"
import { generateUniqueId } from "utils/generateUniqueId"
import { accessibleBy } from "lib/casl"
import { BookType } from "../types"
import { BookInputType } from "../inputTypes"

export const CreateBook = mutationField("createBook", {
  type: BookType,
  args: {
    input: nonNull(arg({ type: BookInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    accessibleBy(ctx.ability, "create", "Book")

    if (!ctx.user?.id) throw Errors.User.USER_NOT_FOUND()

    const data = await ctx.prisma.book.create({
      data: {
        bookId: generateUniqueId("B"),
        name: input.name,
        limit: input.limit,
        category: input.category,
        price: input.price,
        publisher: input.publisher,
        image: input.image || "",
        bestSeller: input?.bestSeller || false,
        user: { connect: { id: ctx.user.id } },
        createdUserId: ctx.user.id,
        updatedUserId: ctx.user.id,
      },
    })

    return data
  },
})
