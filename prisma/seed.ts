import { PrismaClient } from "@prisma/client"
import { bookSeed, userSeed } from "./seed/function"

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  // await userSeed()
  await bookSeed()
  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.log(".catch", e)
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
