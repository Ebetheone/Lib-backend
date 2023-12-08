import {
  AccountProviderEnumType,
  UserRoleEnumType,
  UserStatusEnumType,
} from "src/graphql/enumTypes"
import { objectType } from "nexus"
import {
  User,
  UserAccount,
  UserSession,
  UserProfile,
  UserDevice,
} from "nexus-prisma"

export const UsersType = objectType({
  name: "UsersType",
  definition: t => {
    t.list.nonNull.field("data", { type: UserType })
    t.int("count")
  },
})

export const UserType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id)

    t.field(User.userId)

    t.field(User.role.name, { type: UserRoleEnumType })
    t.field(User.status.name, { type: UserStatusEnumType })

    t.list.nonNull.field(User.accounts.name, {
      type: UserAccountType,
    })
    t.list.nonNull.field(User.devices.name, {
      type: UserDeviceType,
    })
    t.list.nonNull.field(User.sessions.name, {
      type: UserSessionType,
    })
    t.field(User.profile.name, {
      type: UserProfileType,
    })

    t.field(User.email)
    t.field(User.phone)
    t.field(User.countryCode)

    t.field(User.createdAt)
    t.field(User.updatedAt)
  },
})

export const UserAccountType = objectType({
  name: UserAccount.$name,
  description: UserAccount.$description,
  definition(t) {
    t.field(UserAccount.id)

    t.field(UserAccount.userId)
    t.field(UserAccount.userUid)

    t.field(UserAccount.providerName)
    t.field(UserAccount.providerType.name, { type: AccountProviderEnumType })
    t.field(UserAccount.providerId)
    t.field(UserAccount.providerAccountId)

    t.field(UserAccount.user.name, { type: UserType })

    t.field(UserAccount.refreshToken)
    t.field(UserAccount.accessToken)
    t.field(UserAccount.accessTokenExpires)

    t.field(UserAccount.signedIn)
    t.field(UserAccount.createdAt)
    t.field(UserAccount.updatedAt)
  },
})

export const UserDeviceType = objectType({
  name: UserDevice.$name,
  description: UserDevice.$description,
  definition: t => {
    t.field(UserDevice.id)

    t.field(UserDevice.deviceName)
    t.field(UserDevice.deviceOs)
    t.field(UserDevice.deviceType)

    t.list.nonNull.field(UserDevice.sessions.name, { type: UserSessionType })
  },
})

export const UserSessionType = objectType({
  name: UserSession.$name,
  description: UserSession.$description,
  definition(t) {
    t.field(UserSession.id)
    t.field(UserSession.userId)

    t.field(UserSession.fcmToken)

    t.field(UserSession.isActive)
    t.field(UserSession.expires)

    t.field(UserSession.createdAt)
    t.field(UserSession.updatedAt)

    t.field(UserSession.device.name, { type: UserDeviceType })
  },
})

export const UserProfileType = objectType({
  name: UserProfile.$name,
  description: UserProfile.$description,
  definition(t) {
    t.field(UserProfile.id)
    t.field(UserProfile.userId)

    t.field(UserProfile.firstName)
    t.field(UserProfile.lastName)

    t.field(UserProfile.gender)
    t.field(UserProfile.birthday)

    t.field(UserProfile.user.name, { type: UserType })
  },
})
