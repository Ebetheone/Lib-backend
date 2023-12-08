import { inputObjectType } from "nexus"
import { Book } from "nexus-prisma"

export const BookInputType = inputObjectType({
  name: "BookInput",
  definition(t) {
    t.nonNull.field(Book.name)
    t.nonNull.field(Book.limit)
    t.nonNull.field(Book.category)
    t.nonNull.field(Book.price)
    t.nonNull.field(Book.publisher)
    t.nullable.field(Book.image)
    t.nullable.field(Book.bestSeller)
  },
})
