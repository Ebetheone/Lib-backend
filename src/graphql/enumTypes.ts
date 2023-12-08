import { enumType } from "nexus"
import {
  UserRoleEnum,
  UserStatusEnum,
  AccountProviderTypeEnum,
  TokenVerifyEnum,
  Gender,
} from "nexus-prisma"

export const GenderEnumType = enumType(Gender)
export const UserRoleEnumType = enumType(UserRoleEnum)
export const UserStatusEnumType = enumType(UserStatusEnum)
export const AccountProviderEnumType = enumType(AccountProviderTypeEnum)
export const TokenVerifyEnumType = enumType(TokenVerifyEnum)

export const SortOrder = enumType({
  members: ["asc", "desc"],
  name: "SortOrder",
})
