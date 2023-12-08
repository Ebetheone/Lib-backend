import { arg, mutationField, nonNull } from "nexus"
import bcrypt from "bcrypt"
import { UserType } from "../types"
import { UserInputType } from "../inputTypes"
import { Errors } from "src/errors"
import { generateUniqueId } from "utils/generateUniqueId"
import { accessibleBy } from "lib/casl"
import { generateRandomPassword } from "utils/generateRandomPassword"
import { Gender } from "@prisma/client"

export const CreateUser = mutationField("createUser", {
  type: UserType,
  args: {
    input: nonNull(arg({ type: UserInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    accessibleBy(ctx.ability, "create", "User")

    const checkEmail = await ctx.prisma.user.findFirst({
      where: { email: input?.email },
      select: { id: true },
    })
    if (checkEmail?.id) throw Errors.User.EMAIL_ALREADY_USED()

    const checkPhone = await ctx.prisma.user.findFirst({
      where: { phone: input?.phone },
      select: { id: true },
    })
    if (checkPhone?.id) throw Errors.User.PHONE_NUMBER_ALREADY_USED()

    let generatedPassword
    let passwordHash
    if (input?.password) {
      passwordHash = await bcrypt.hash(input.password, 10)
    } else {
      generatedPassword = generateRandomPassword(10)
      passwordHash = await bcrypt.hash(generatedPassword, 10)
    }

    const user = await ctx.prisma.user.create({
      data: {
        userId: generateUniqueId("U"),
        email: input?.email,
        password: passwordHash,
        phone: input?.phone,
        countryCode: input?.countryCode,
        image: input?.image,
        profile: {
          create: {
            passportNumber: input?.passportNumber,
            registerNumber: input?.registerNumber,
            firstName: input?.firstName,
            lastName: input?.lastName,
            birthday: input?.birthday,
            gender: input?.gender as Gender,
          },
        },
        ...accessibleBy(ctx.ability, "create", "User"),
      },
    })

    user.password = input?.password ? input.password : generatedPassword || ""

    return user
  },
})
