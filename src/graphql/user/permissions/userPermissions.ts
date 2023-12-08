import { CanType, CannotType, CaslContextType } from "src/lib/casl/ability"

export const userPermissions = (
  ctx: CaslContextType,
  can: CanType,
  cannot: CannotType,
) => {
  const { user } = ctx

  if (user?.role === "ADMIN") {
    can(["read", "create", "update", "delete"], "User")
  } else if (user?.role === "MEMBER") {
    can(["read", "update"], "User", { id: user.id })
    cannot(["create", "delete"], "User")
  } else {
    cannot(["read", "create", "update", "delete"], "User")
  }
}
