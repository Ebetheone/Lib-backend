import { Prisma } from "@prisma/client"

export const bookData: Prisma.BookCreateInput[] = [
  {
    name: "asfdasfd",
    category: "romance",
    limit: 20,
    price: 5000,
    publisher: "Elbeg1",
    user: {
      connect: {
        id: "6572e75a9957fad46e0718dd",
      },
    },
  },
  {
    name: "asfdasfd",
    category: "romance",
    limit: 20,
    price: 5000,
    publisher: "Elbeg2",
    user: {
      connect: {
        id: "6572e75b9957fad46e0718de",
      },
    },
  },
  {
    name: "asfdasfd",
    category: "romance",
    limit: 20,
    price: 5000,
    publisher: "Elbeg3",
    user: {
      connect: {
        id: "65733dcb25398d18d305ef7f",
      },
    },
  },
  {
    name: "asfdasfd",
    category: "romance",
    limit: 20,
    price: 5000,
    publisher: "Elbeg4",
    user: {
      connect: {
        id: "65733dcb25398d18d305ef7f",
      },
    },
  },
  {
    name: "asfdasfd",
    category: "romance",
    limit: 20,
    price: 5000,
    publisher: "Elbeg5",
    user: {
      connect: {
        id: "65733dcb25398d18d305ef7f",
      },
    },
  },
]
