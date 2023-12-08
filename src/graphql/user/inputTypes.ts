import { UserStatusEnumType } from "src/graphql/enumTypes"
import { inputObjectType } from "nexus"
import { User, UserProfile } from "nexus-prisma"

export const UserInputType = inputObjectType({
  name: "UserInput",
  definition(t) {
    t.field(User.email)
    t.field(User.phone)
    t.field(User.countryCode)
    t.field(UserProfile.firstName)
    t.field(UserProfile.lastName)
    t.field(UserProfile.birthday)
    t.nullable.field(UserProfile.gender)
    t.field(User.password)
  },
})

export const UserStatusUpdateInputType = inputObjectType({
  name: "UserStatusUpdateInput",
  definition(t) {
    t.field(User.status.name, { type: UserStatusEnumType })
  },
})

export const UserChangePasswordInputType = inputObjectType({
  name: "UserChangePasswordInput",
  definition(t) {
    t.nullable.field(User.password)
    t.nonNull.string("newPassword")
    t.nullable.string("newPasswordConfirm")
  },
})
