import { UserType } from "graphql/user"
import { objectType } from "nexus"
import { Book } from "nexus-prisma"

export const BooksType = objectType({
  name: "BooksType",
  definition: t => {
    t.list.nonNull.field("data", { type: BookType })
    t.int("count")
  },
})

export const BookType = objectType({
  name: Book.$name,
  description: Book.$description,
  definition(t) {
    t.field(Book.id)

    t.field(Book.bookId)
    t.field(Book.name)
    t.field(Book.limit)
    t.field(Book.category)
    t.field(Book.price)
    t.field(Book.bestSeller)

    t.field(Book.userId)
    t.field(Book.user.name, { type: UserType })

    t.field(Book.createdAt)
    t.field(Book.updatedAt)
  },
})
