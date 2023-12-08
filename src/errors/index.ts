import { AuthErrorMap, AuthErrors } from "./auth"
import { UserErrorMap, UserErrors } from "./user"
import { GraphQLError } from "graphql"

const ErrorMap = {
  ...AuthErrorMap,
  ...UserErrorMap,
}

export const Errors = {
  Auth: AuthErrors,
  User: UserErrors,
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
