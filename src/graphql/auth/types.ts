import { objectType } from "nexus"
import { User } from "nexus-prisma"
import {
  UserAccountType,
  UserProfileType,
  UserDeviceType,
} from "graphql/user/types"
import { UserRoleEnumType } from "graphql/enumTypes"

export const AuthVerifyTokenType = objectType({
  name: "AuthVerifyTokenType",
  definition: t => {
    t.nullable.string("accessToken")
    t.nullable.string("refreshToken")
    t.nullable.string("resetToken")

    t.nullable.boolean("isPhoneConfirmed")
    t.nullable.boolean("isEmailConfirmed")

    t.nullable.string("deviceId")
    t.nullable.list.field("devices", { type: UserDeviceType })
  },
})

export const AuthUserType = objectType({
  name: "AuthUserType",
  definition: t => {
    t.field(User.id.name, { type: User.id.type })
    t.field(User.role.name, { type: UserRoleEnumType })
    t.field(User.email.name, { type: User.email.type })
    t.field(User.countryCode.name, { type: User.countryCode.type })
    t.field(User.phone.name, { type: User.phone.type })
    t.field(User.password.name, { type: User.password.type })

    t.list.nonNull.field(User.accounts.name, {
      type: UserAccountType,
    })
    t.field(User.profile.name, {
      type: UserProfileType,
    })

    t.boolean("isPassword", {
      resolve: async parent => {
        if (parent.password) {
          return true
        }
        return false
      },
    })
  },
})

export const RefreshTokenType = objectType({
  name: "RefreshTokenType",
  definition: t => {
    t.nullable.string("accessToken")
    t.nullable.string("refreshToken")
    t.nullable.string("wsToken")
  },
})
