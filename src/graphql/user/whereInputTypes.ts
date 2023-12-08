import { inputObjectType } from "nexus"
import { User, UserProfile } from "nexus-prisma"

export const UserWhereInputType = inputObjectType({
  name: "UserWhereInput",
  definition(t) {
    t.nullable.string("search")
    t.nullable.string(User.id.name)
    t.nullable.string(User.email.name)
    t.nullable.string(User.phone.name)
    t.nullable.string(User.status.name)
    t.nullable.string(UserProfile.firstName.name)
    t.nullable.string(UserProfile.lastName.name)
  },
})
