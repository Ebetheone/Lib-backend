import { Prisma, UserRoleEnum } from "@prisma/client"

export const userData: Prisma.UserCreateInput[] = [
  // {
  //   email: "admin@lib.mn",
  //   userId: "UI87654321",
  //   password: "A123456",
  //   status: "ACTIVE",
  //   countryCode: "976",
  //   phone: "99999999",
  //   role: UserRoleEnum.ADMIN,
  //   isEmailConfirmed: true,
  //   isPhoneConfirmed: true,
  // },
  // {
  //   email: "user@lib.mn",
  //   userId: "UE87654321",
  //   password: "A123456",
  //   status: "ACTIVE",
  //   countryCode: "976",
  //   phone: "99999998",
  //   role: UserRoleEnum.USER,
  //   isEmailConfirmed: true,
  //   isPhoneConfirmed: true,
  // },
  {
    email: "elbeg@lib.mn",
    userId: "UO87654321",
    password: "A123456",
    status: "ACTIVE",
    countryCode: "976",
    phone: "99464130",
    role: UserRoleEnum.ADMIN,
    isEmailConfirmed: true,
    isPhoneConfirmed: true,
  },
]
