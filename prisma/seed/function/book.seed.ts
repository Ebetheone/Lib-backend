import { PrismaClient } from "@prisma/client"
import { bookData } from "../sourceData/bookData.json"
import { getRandomImageUrl } from "../../../src/utils/generateRandomImage"

const prisma = new PrismaClient()

export const bookSeed = async () => {
  try {
    for (const a of bookData) {
      const imageUrl = getRandomImageUrl()
      console.log("imageUrl", imageUrl)
      const book = await prisma.book.create({
        data: { ...a, image: imageUrl },
      })
      console.log(`Created book with id: ${book.id}`)
    }

    console.log("-----------------------------------")
  } catch (error) {
    console.error("A SEED ERROR!!! - BOOK", error)
  }
}
