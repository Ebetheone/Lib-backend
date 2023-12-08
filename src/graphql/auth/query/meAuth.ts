import { queryField } from "nexus"
import { Context } from "src/lib/context"
import { AuthUserType } from "../types"
import { accessibleBy } from "lib/casl"

// eslint-disable-next-line @typescript-eslint/ban-types
export const meAuth = (__: {}, ctx: Context) => {
  return ctx.user
}

export const MeAuth = queryField("meAuth", {
  type: AuthUserType,
  resolve: async (_, __, ctx) => {
    accessibleBy(ctx.ability, "read", "User")
    return meAuth(__, ctx)
  },
})
