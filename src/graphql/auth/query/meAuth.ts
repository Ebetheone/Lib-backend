import { queryField } from "nexus"
import { Context } from "src/lib/context"
import { AuthUserType } from "../types"

// eslint-disable-next-line @typescript-eslint/ban-types
export const meAuth = (__: {}, ctx: Context) => {
  return ctx.user
}

export const MeAuth = queryField("meAuth", {
  type: AuthUserType,
  resolve: async (_, __, ctx) => {
    return meAuth(__, ctx)
  },
})
