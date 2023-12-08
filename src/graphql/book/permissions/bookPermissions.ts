import { CanType, CannotType, CaslContextType } from "src/lib/casl/ability"

export const bookPermissions = (
  ctx: CaslContextType,
  can: CanType,
  cannot: CannotType,
) => {
  const { user } = ctx

  if (user?.role === "ADMIN") {
    can(["read", "create", "update", "delete"], "Book")
  } else if (user?.role === "USER") {
    can("read", "Book")
    cannot(["create", "update", "delete"], "Book")
  } else {
    can("read", "Book")
    cannot(["create", "update", "delete"], "Book")
  }
}
