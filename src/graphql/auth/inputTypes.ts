import { TokenVerifyEnumType } from "graphql/enumTypes"
import { inputObjectType } from "nexus"
import { User, UserAccount, UserDevice, UserProfile } from "nexus-prisma"

export const LoginPhoneInputType = inputObjectType({
  name: "LoginPhoneInput",
  definition(t) {
    t.nullable.string("deviceId")
    t.field(User.countryCode)
    t.nonNull.field(User.phone)
    t.nonNull.field(User.password)
  },
})
export const LoginEmailInputType = inputObjectType({
  name: "LoginEmailInput",
  definition(t) {
    t.nullable.string("deviceId")
    t.nonNull.field(User.email)
    t.nonNull.field(User.password)
  },
})

export const AccountEliminateInputType = inputObjectType({
  name: "AccountEliminateInputType",
  definition(t) {
    t.nonNull.field(UserDevice.id.name, { type: UserDevice.id.type })
    t.nonNull.field(User.email)
    t.nonNull.field(User.password)
  },
})

export const RegisterPhoneInputType = inputObjectType({
  name: "RegisterPhoneInput",
  definition(t) {
    t.field(User.countryCode)
    t.nonNull.field(User.phone)
    t.nonNull.field(User.password)
  },
})
export const RegisterEmailInputType = inputObjectType({
  name: "RegisterEmailInput",
  definition(t) {
    t.nonNull.field(User.email)
    t.nonNull.field(User.password)
  },
})

export const ExternalAuthInputType = inputObjectType({
  name: "ExternalAuthInput",
  definition(t) {
    t.nonNull.string("accessToken")
  },
})

export const ExternalAuthAppleInputType = inputObjectType({
  name: "ExternalAuthAppleInput",
  definition(t) {
    t.nonNull.string("providerId")
    t.nonNull.string("providerName")
    t.nullable.string("email")
  },
})

export const AuthPhoneVerifyTokenSenderInputType = inputObjectType({
  name: "AuthPhoneVerifyTokenSenderInput",
  definition(t) {
    t.nonNull.field(User.phone)
    t.nonNull.field(User.countryCode)
  },
})

export const AuthEmailVerifyTokenSenderInputType = inputObjectType({
  name: "AuthEmailVerifyTokenSenderInput",
  definition(t) {
    t.nonNull.field(User.email)
  },
})

export const AuthPhoneVerifyTokenInputType = inputObjectType({
  name: "AuthPhoneVerifyTokenInput",
  definition(t) {
    t.nonNull.field("type", { type: TokenVerifyEnumType })
    t.nonNull.field(User.phone)
    t.nonNull.field(User.countryCode)
    t.nonNull.string("code")
  },
})

export const AuthEmailVerifyTokenInputType = inputObjectType({
  name: "AuthEmailVerifyTokenInput",
  definition(t) {
    t.nonNull.field("type", { type: TokenVerifyEnumType })
    t.nonNull.field(User.email)
    t.nonNull.string("code")
  },
})

export const AuthPhoneResetPasswordInputType = inputObjectType({
  name: "AuthPhoneResetPasswordInput",
  definition(t) {
    t.nonNull.field(User.phone)
    t.nonNull.field(User.countryCode)
    t.nonNull.field(User.password)
  },
})

export const AuthEmailResetPasswordInputType = inputObjectType({
  name: "AuthEmailResetPasswordInput",
  definition(t) {
    t.nonNull.field(User.email)
    t.nonNull.field(User.password)
  },
})

export const ExternalWebAuthInput = inputObjectType({
  name: "ExternalWebAuthInput",
  definition(t) {
    t.nonNull.string("accessToken")

    t.field(User.email)
    t.field(User.phone)
    t.field(User.image)
    t.field(User.userName)

    t.field(UserProfile.firstName)
    t.field(UserProfile.lastName)
    t.field(UserProfile.registerNumber)
    t.field(UserProfile.passportNumber)

    t.field(UserAccount.userUid)
    t.field(UserAccount.providerId)
    t.field(UserAccount.providerName)
  },
})

export const RefreshToAccessTokenInputType = inputObjectType({
  name: "RefreshToAccessTokenInput",
  definition(t) {
    t.nonNull.string("refreshToken")
  },
})
