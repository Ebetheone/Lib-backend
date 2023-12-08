import { AbilityBuilder, PureAbility } from "@casl/ability"
import { Subjects } from "@casl/prisma"
import { User, Book } from "@prisma/client"
import { PrismaMutation, PrismaQuery, createPrismaAbility } from "lib/casl"
import { userPermissions } from "graphql/user"
import { bookPermissions } from "graphql/book"

export type Actions = "manage" | "create" | "read" | "update" | "delete"

type AppSubjects =
  | "all"
  | Subjects<{
      User: User
      Book: Book
    }>

export type AppAbility = PureAbility<
  [Actions, AppSubjects],
  PrismaMutation | PrismaQuery
>

export type CaslContextType = {
  user: User | null
}

const { can: _can, cannot: _cannot } = new AbilityBuilder<AppAbility>(
  createPrismaAbility,
)
export type CanType = typeof _can
export type CannotType = typeof _cannot

export function defineAbilitiesFor(ctx: CaslContextType) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility,
  )

  userPermissions(ctx, can, cannot)
  bookPermissions(ctx, can, cannot)

  return build()
}
