import { inputObjectType } from "nexus"
import { Book } from "nexus-prisma"

export const BookWhereInputType = inputObjectType({
  name: "BookWhereInput",
  definition(t) {
    t.nullable.string("search")
    t.nullable.string(Book.id.name)
    t.nullable.string(Book.bookId.name)
    t.nullable.string(Book.name.name)
    t.nullable.int(Book.limit.name)
    t.nullable.string(Book.category.name)
    t.nullable.int(Book.price.name)
    t.nullable.boolean(Book.bestSeller.name)
  },
})
