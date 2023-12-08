import { Prisma, UserRoleEnum } from "@prisma/client"

export const userData: Prisma.UserCreateInput[] = [
  {
    id: "e19bc875-1ab7-453a-87c4-999f5cc33dcc",
    userId: "UI87654321",
    email: "admin@flight.mn",
    userName: "Admin",
    password: "A123456",
    status: "ACTIVE",
    countryCode: "976",
    phone: "99999999",
    role: UserRoleEnum.ADMIN,
    isEmailConfirmed: true,
    isPhoneConfirmed: true,
  },
  {
    id: "7d236f88-fbdc-424a-b02c-13abe8507bc7",
    userId: "UE87654321",
    email: "member@flight.mn",
    userName: "Member",
    password: "A123456",
    status: "ACTIVE",
    countryCode: "976",
    phone: "99999998",
    role: UserRoleEnum.MEMBER,
    isEmailConfirmed: true,
    isPhoneConfirmed: true,
  },
]
