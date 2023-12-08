import { AuthErrorMap, AuthErrors } from "./auth"
import { UserErrorMap, UserErrors } from "./user"
import { SystemErrorMap, SystemErrors } from "./system"
import { GraphQLError } from "graphql"

const ErrorMap = {
  ...AuthErrorMap,
  ...UserErrorMap,
  ...SystemErrorMap,
}

export const Errors = {
  Auth: AuthErrors,
  User: UserErrors,
  System: SystemErrors,
}

export const getError = (code: string) => {
  if (code in ErrorMap) {
    throw new GraphQLError(Object(ErrorMap)[code].message, {
      extensions: { ...Object(ErrorMap)[code] },
    })
  }
  throw new GraphQLError(Object(ErrorMap)["INTERNAL_SERVER_ERROR"].message, {
    extensions: { ...Object(ErrorMap)["INTERNAL_SERVER_ERROR"] },
  })
}
