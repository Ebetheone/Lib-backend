import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { userData } from "../sourceData/userData.json"

const prisma = new PrismaClient()

export const userSeed = async () => {
  try {
    for (const u of userData) {
      const passwordHash = await bcrypt.hash(u.password || "A123456", 10)
      const user = await prisma.user.create({
        data: { ...u, password: passwordHash },
      })
      console.log(`Created user with id: ${user.id}`)
    }

    console.log("-----------------------------------")
  } catch (error) {
    console.error("A SEED ERROR!!! - USER", error)
  }
}
