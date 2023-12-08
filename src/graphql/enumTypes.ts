import { enumType } from "nexus"
import {
  UserRoleEnum,
  UserStatusEnum,
  AccountProviderTypeEnum,
  Gender,
  FileSizeEnum,
  TokenVerifyEnum,
} from "nexus-prisma"

export const GenderEnumType = enumType(Gender)
export const UserRoleEnumType = enumType(UserRoleEnum)
export const UserStatusEnumType = enumType(UserStatusEnum)
export const FileSizeEnumType = enumType(FileSizeEnum)
export const TokenVerifyEnumType = enumType(TokenVerifyEnum)
export const AccountProviderEnumType = enumType(AccountProviderTypeEnum)

export const SortOrder = enumType({
  members: ["asc", "desc"],
  name: "SortOrder",
})
