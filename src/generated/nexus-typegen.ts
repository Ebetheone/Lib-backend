/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../lib/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    DateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    JSON<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSON";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    DateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    JSON<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSON";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AccountEliminateInputType: { // input type
    email: string; // String!
    id: string; // ID!
    password: string; // String!
  }
  AuthEmailResetPasswordInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  AuthEmailVerifyTokenInput: { // input type
    code: string; // String!
    email: string; // String!
    type: NexusGenEnums['TokenVerifyEnum']; // TokenVerifyEnum!
  }
  AuthEmailVerifyTokenSenderInput: { // input type
    email: string; // String!
  }
  AuthPhoneResetPasswordInput: { // input type
    countryCode: string; // String!
    password: string; // String!
    phone: string; // String!
  }
  AuthPhoneVerifyTokenInput: { // input type
    code: string; // String!
    countryCode: string; // String!
    phone: string; // String!
    type: NexusGenEnums['TokenVerifyEnum']; // TokenVerifyEnum!
  }
  AuthPhoneVerifyTokenSenderInput: { // input type
    countryCode: string; // String!
    phone: string; // String!
  }
  BookInput: { // input type
    bestSeller: boolean; // Boolean!
    category: string; // String!
    image?: string | null; // String
    limit: number; // Int!
    name: string; // String!
    price: number; // Int!
    publisher: string; // String!
  }
  BookWhereInput: { // input type
    bestSeller?: boolean | null; // Boolean
    bookId?: string | null; // String
    category?: string | null; // String
    id?: string | null; // String
    limit?: number | null; // Int
    name?: string | null; // String
    price?: number | null; // Int
    publisher?: string | null; // String
    search?: string | null; // String
  }
  ExternalAuthAppleInput: { // input type
    email?: string | null; // String
    providerId: string; // String!
    providerName: string; // String!
  }
  ExternalAuthInput: { // input type
    accessToken: string; // String!
  }
  ExternalWebAuthInput: { // input type
    accessToken: string; // String!
    email?: string | null; // String
    firstName?: string | null; // String
    lastName?: string | null; // String
    phone?: string | null; // String
    providerId?: string | null; // String
    providerName?: string | null; // String
    userUid?: string | null; // String
  }
  LoginEmailInput: { // input type
    deviceId?: string | null; // String
    email: string; // String!
    password: string; // String!
  }
  LoginPhoneInput: { // input type
    countryCode?: string | null; // String
    deviceId?: string | null; // String
    password: string; // String!
    phone: string; // String!
  }
  RefreshToAccessTokenInput: { // input type
    refreshToken: string; // String!
  }
  RegisterEmailInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  RegisterPhoneInput: { // input type
    countryCode?: string | null; // String
    password: string; // String!
    phone: string; // String!
  }
  UserChangePasswordInput: { // input type
    newPassword: string; // String!
    newPasswordConfirm?: string | null; // String
    password?: string | null; // String
  }
  UserInput: { // input type
    address1: string; // String!
    address2: string; // String!
    birthday?: NexusGenScalars['DateTime'] | null; // DateTime
    city: string; // String!
    countryCode?: string | null; // String
    district: string; // String!
    email?: string | null; // String
    firstName?: string | null; // String
    gender?: NexusGenEnums['Gender'] | null; // Gender
    lastName?: string | null; // String
    password?: string | null; // String
    phone?: string | null; // String
  }
  UserStatusUpdateInput: { // input type
    status?: NexusGenEnums['UserStatusEnum'] | null; // UserStatusEnum
  }
  UserWhereInput: { // input type
    email?: string | null; // String
    firstName?: string | null; // String
    id?: string | null; // String
    lastName?: string | null; // String
    phone?: string | null; // String
    search?: string | null; // String
    status?: string | null; // String
  }
}

export interface NexusGenEnums {
  AccountProviderTypeEnum: "APPLE" | "EMAIL" | "FACEBOOK" | "GOOGLE" | "NONE" | "PHONE" | "TWITTER"
  FileSizeEnum: "MEDIUM" | "NATIVE" | "SMALL" | "THUMB"
  Gender: "FEMALE" | "MALE" | "NONE"
  SortOrder: "asc" | "desc"
  TokenVerifyEnum: "AUTH" | "RESET"
  UserRoleEnum: "ADMIN" | "USER"
  UserStatusEnum: "ACTIVE" | "INACTIVE"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSON: any
}

export interface NexusGenObjects {
  Address: { // root type
    address1: string; // String!
    address2: string; // String!
    city: string; // String!
    district: string; // String!
    id: string; // ID!
  }
  AuthUserType: { // root type
    accounts?: NexusGenRootTypes['UserAccount'][] | null; // [UserAccount!]
    countryCode?: string | null; // String
    email?: string | null; // String
    id: string; // ID!
    password?: string | null; // String
    phone?: string | null; // String
    profile?: NexusGenRootTypes['UserProfile'] | null; // UserProfile
    role?: NexusGenEnums['UserRoleEnum'] | null; // UserRoleEnum
  }
  AuthVerifyTokenType: { // root type
    accessToken?: string | null; // String
    deviceId?: string | null; // String
    devices?: Array<NexusGenRootTypes['UserDevice'] | null> | null; // [UserDevice]
    isEmailConfirmed?: boolean | null; // Boolean
    isPhoneConfirmed?: boolean | null; // Boolean
    refreshToken?: string | null; // String
    resetToken?: string | null; // String
  }
  Book: { // root type
    bestSeller: boolean; // Boolean!
    bookId?: string | null; // String
    category: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    image?: string | null; // String
    limit: number; // Int!
    name: string; // String!
    price: number; // Int!
    publisher: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user?: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  BooksType: { // root type
    count?: number | null; // Int
    data?: NexusGenRootTypes['Book'][] | null; // [Book!]
  }
  Mutation: {};
  Query: {};
  RefreshTokenType: { // root type
    accessToken?: string | null; // String
    refreshToken?: string | null; // String
    wsToken?: string | null; // String
  }
  User: { // root type
    accounts?: NexusGenRootTypes['UserAccount'][] | null; // [UserAccount!]
    address?: NexusGenRootTypes['Address'] | null; // Address
    countryCode?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    devices?: NexusGenRootTypes['UserDevice'][] | null; // [UserDevice!]
    email?: string | null; // String
    id: string; // ID!
    phone?: string | null; // String
    profile?: NexusGenRootTypes['UserProfile'] | null; // UserProfile
    role?: NexusGenEnums['UserRoleEnum'] | null; // UserRoleEnum
    sessions?: NexusGenRootTypes['UserSession'][] | null; // [UserSession!]
    status?: NexusGenEnums['UserStatusEnum'] | null; // UserStatusEnum
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId?: string | null; // String
  }
  UserAccount: { // root type
    accessToken?: string | null; // String
    accessTokenExpires?: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    providerAccountId?: string | null; // String
    providerId?: string | null; // String
    providerName?: string | null; // String
    providerType?: NexusGenEnums['AccountProviderTypeEnum'] | null; // AccountProviderTypeEnum
    refreshToken?: string | null; // String
    signedIn: NexusGenScalars['DateTime']; // DateTime!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
    userUid?: string | null; // String
  }
  UserDevice: { // root type
    deviceName: string; // String!
    deviceOs: string; // String!
    deviceType: string; // String!
    id: string; // ID!
    sessions?: NexusGenRootTypes['UserSession'][] | null; // [UserSession!]
  }
  UserProfile: { // root type
    birthday?: NexusGenScalars['DateTime'] | null; // DateTime
    firstName?: string | null; // String
    gender?: NexusGenEnums['Gender'] | null; // Gender
    id: string; // ID!
    lastName?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  UserSession: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    device?: NexusGenRootTypes['UserDevice'] | null; // UserDevice
    expires: string; // String!
    fcmToken?: string | null; // String
    id: string; // ID!
    isActive: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string; // String!
  }
  UsersType: { // root type
    count?: number | null; // Int
    data?: NexusGenRootTypes['User'][] | null; // [User!]
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Address: { // field return type
    address1: string; // String!
    address2: string; // String!
    city: string; // String!
    district: string; // String!
    id: string; // ID!
  }
  AuthUserType: { // field return type
    accounts: NexusGenRootTypes['UserAccount'][] | null; // [UserAccount!]
    countryCode: string | null; // String
    email: string | null; // String
    id: string; // ID!
    isPassword: boolean | null; // Boolean
    password: string | null; // String
    phone: string | null; // String
    profile: NexusGenRootTypes['UserProfile'] | null; // UserProfile
    role: NexusGenEnums['UserRoleEnum'] | null; // UserRoleEnum
  }
  AuthVerifyTokenType: { // field return type
    accessToken: string | null; // String
    deviceId: string | null; // String
    devices: Array<NexusGenRootTypes['UserDevice'] | null> | null; // [UserDevice]
    isEmailConfirmed: boolean | null; // Boolean
    isPhoneConfirmed: boolean | null; // Boolean
    refreshToken: string | null; // String
    resetToken: string | null; // String
  }
  Book: { // field return type
    bestSeller: boolean; // Boolean!
    bookId: string | null; // String
    category: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    image: string | null; // String
    limit: number; // Int!
    name: string; // String!
    price: number; // Int!
    publisher: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  BooksType: { // field return type
    count: number | null; // Int
    data: NexusGenRootTypes['Book'][] | null; // [Book!]
  }
  Mutation: { // field return type
    accountEliminate: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    authEmailForgetPassword: boolean | null; // Boolean
    authEmailResetPassword: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    authEmailVerifyToken: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    authEmailVerifyTokenSender: boolean | null; // Boolean
    authMobile: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    authPhoneForgetPassword: boolean | null; // Boolean
    authPhoneResetPassword: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    authPhoneVerifyToken: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    authPhoneVerifyTokenSender: boolean | null; // Boolean
    authWeb: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    createBook: NexusGenRootTypes['Book'] | null; // Book
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteBook: boolean | null; // Boolean
    deleteUser: boolean | null; // Boolean
    loginEmail: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    loginPhone: NexusGenRootTypes['AuthVerifyTokenType'] | null; // AuthVerifyTokenType
    logout: boolean | null; // Boolean
    refreshAccessToken: NexusGenRootTypes['RefreshTokenType'] | null; // RefreshTokenType
    registerEmail: boolean | null; // Boolean
    registerPhone: boolean | null; // Boolean
    updateBook: NexusGenRootTypes['Book'] | null; // Book
    updateUser: NexusGenRootTypes['User'] | null; // User
    userChangePassword: boolean | null; // Boolean
    userStatusUpdate: boolean | null; // Boolean
  }
  Query: { // field return type
    book: NexusGenRootTypes['Book'] | null; // Book
    books: NexusGenRootTypes['BooksType'] | null; // BooksType
    meAuth: NexusGenRootTypes['AuthUserType'] | null; // AuthUserType
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['UsersType'] | null; // UsersType
  }
  RefreshTokenType: { // field return type
    accessToken: string | null; // String
    refreshToken: string | null; // String
    wsToken: string | null; // String
  }
  User: { // field return type
    accounts: NexusGenRootTypes['UserAccount'][] | null; // [UserAccount!]
    address: NexusGenRootTypes['Address'] | null; // Address
    countryCode: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    devices: NexusGenRootTypes['UserDevice'][] | null; // [UserDevice!]
    email: string | null; // String
    id: string; // ID!
    phone: string | null; // String
    profile: NexusGenRootTypes['UserProfile'] | null; // UserProfile
    role: NexusGenEnums['UserRoleEnum'] | null; // UserRoleEnum
    sessions: NexusGenRootTypes['UserSession'][] | null; // [UserSession!]
    status: NexusGenEnums['UserStatusEnum'] | null; // UserStatusEnum
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string | null; // String
  }
  UserAccount: { // field return type
    accessToken: string | null; // String
    accessTokenExpires: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    providerAccountId: string | null; // String
    providerId: string | null; // String
    providerName: string | null; // String
    providerType: NexusGenEnums['AccountProviderTypeEnum'] | null; // AccountProviderTypeEnum
    refreshToken: string | null; // String
    signedIn: NexusGenScalars['DateTime']; // DateTime!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
    userUid: string | null; // String
  }
  UserDevice: { // field return type
    deviceName: string; // String!
    deviceOs: string; // String!
    deviceType: string; // String!
    id: string; // ID!
    sessions: NexusGenRootTypes['UserSession'][] | null; // [UserSession!]
  }
  UserProfile: { // field return type
    birthday: NexusGenScalars['DateTime'] | null; // DateTime
    firstName: string | null; // String
    gender: NexusGenEnums['Gender'] | null; // Gender
    id: string; // ID!
    lastName: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  UserSession: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    device: NexusGenRootTypes['UserDevice'] | null; // UserDevice
    expires: string; // String!
    fcmToken: string | null; // String
    id: string; // ID!
    isActive: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string; // String!
  }
  UsersType: { // field return type
    count: number | null; // Int
    data: NexusGenRootTypes['User'][] | null; // [User!]
  }
}

export interface NexusGenFieldTypeNames {
  Address: { // field return type name
    address1: 'String'
    address2: 'String'
    city: 'String'
    district: 'String'
    id: 'ID'
  }
  AuthUserType: { // field return type name
    accounts: 'UserAccount'
    countryCode: 'String'
    email: 'String'
    id: 'ID'
    isPassword: 'Boolean'
    password: 'String'
    phone: 'String'
    profile: 'UserProfile'
    role: 'UserRoleEnum'
  }
  AuthVerifyTokenType: { // field return type name
    accessToken: 'String'
    deviceId: 'String'
    devices: 'UserDevice'
    isEmailConfirmed: 'Boolean'
    isPhoneConfirmed: 'Boolean'
    refreshToken: 'String'
    resetToken: 'String'
  }
  Book: { // field return type name
    bestSeller: 'Boolean'
    bookId: 'String'
    category: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    image: 'String'
    limit: 'Int'
    name: 'String'
    price: 'Int'
    publisher: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  BooksType: { // field return type name
    count: 'Int'
    data: 'Book'
  }
  Mutation: { // field return type name
    accountEliminate: 'AuthVerifyTokenType'
    authEmailForgetPassword: 'Boolean'
    authEmailResetPassword: 'AuthVerifyTokenType'
    authEmailVerifyToken: 'AuthVerifyTokenType'
    authEmailVerifyTokenSender: 'Boolean'
    authMobile: 'AuthVerifyTokenType'
    authPhoneForgetPassword: 'Boolean'
    authPhoneResetPassword: 'AuthVerifyTokenType'
    authPhoneVerifyToken: 'AuthVerifyTokenType'
    authPhoneVerifyTokenSender: 'Boolean'
    authWeb: 'AuthVerifyTokenType'
    createBook: 'Book'
    createUser: 'User'
    deleteBook: 'Boolean'
    deleteUser: 'Boolean'
    loginEmail: 'AuthVerifyTokenType'
    loginPhone: 'AuthVerifyTokenType'
    logout: 'Boolean'
    refreshAccessToken: 'RefreshTokenType'
    registerEmail: 'Boolean'
    registerPhone: 'Boolean'
    updateBook: 'Book'
    updateUser: 'User'
    userChangePassword: 'Boolean'
    userStatusUpdate: 'Boolean'
  }
  Query: { // field return type name
    book: 'Book'
    books: 'BooksType'
    meAuth: 'AuthUserType'
    user: 'User'
    users: 'UsersType'
  }
  RefreshTokenType: { // field return type name
    accessToken: 'String'
    refreshToken: 'String'
    wsToken: 'String'
  }
  User: { // field return type name
    accounts: 'UserAccount'
    address: 'Address'
    countryCode: 'String'
    createdAt: 'DateTime'
    devices: 'UserDevice'
    email: 'String'
    id: 'ID'
    phone: 'String'
    profile: 'UserProfile'
    role: 'UserRoleEnum'
    sessions: 'UserSession'
    status: 'UserStatusEnum'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  UserAccount: { // field return type name
    accessToken: 'String'
    accessTokenExpires: 'DateTime'
    createdAt: 'DateTime'
    id: 'ID'
    providerAccountId: 'String'
    providerId: 'String'
    providerName: 'String'
    providerType: 'AccountProviderTypeEnum'
    refreshToken: 'String'
    signedIn: 'DateTime'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
    userUid: 'String'
  }
  UserDevice: { // field return type name
    deviceName: 'String'
    deviceOs: 'String'
    deviceType: 'String'
    id: 'ID'
    sessions: 'UserSession'
  }
  UserProfile: { // field return type name
    birthday: 'DateTime'
    firstName: 'String'
    gender: 'Gender'
    id: 'ID'
    lastName: 'String'
    user: 'User'
    userId: 'String'
  }
  UserSession: { // field return type name
    createdAt: 'DateTime'
    device: 'UserDevice'
    expires: 'String'
    fcmToken: 'String'
    id: 'ID'
    isActive: 'Boolean'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  UsersType: { // field return type name
    count: 'Int'
    data: 'User'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    accountEliminate: { // args
      input: NexusGenInputs['AccountEliminateInputType']; // AccountEliminateInputType!
    }
    authEmailForgetPassword: { // args
      input: NexusGenInputs['AuthEmailVerifyTokenSenderInput']; // AuthEmailVerifyTokenSenderInput!
    }
    authEmailResetPassword: { // args
      input: NexusGenInputs['AuthEmailResetPasswordInput']; // AuthEmailResetPasswordInput!
    }
    authEmailVerifyToken: { // args
      input: NexusGenInputs['AuthEmailVerifyTokenInput']; // AuthEmailVerifyTokenInput!
    }
    authEmailVerifyTokenSender: { // args
      input: NexusGenInputs['AuthEmailVerifyTokenSenderInput']; // AuthEmailVerifyTokenSenderInput!
    }
    authMobile: { // args
      appleInput?: NexusGenInputs['ExternalAuthAppleInput'] | null; // ExternalAuthAppleInput
      input: NexusGenInputs['ExternalAuthInput']; // ExternalAuthInput!
      provider: string; // String!
    }
    authPhoneForgetPassword: { // args
      input: NexusGenInputs['AuthPhoneVerifyTokenSenderInput']; // AuthPhoneVerifyTokenSenderInput!
    }
    authPhoneResetPassword: { // args
      input: NexusGenInputs['AuthPhoneResetPasswordInput']; // AuthPhoneResetPasswordInput!
    }
    authPhoneVerifyToken: { // args
      input: NexusGenInputs['AuthPhoneVerifyTokenInput']; // AuthPhoneVerifyTokenInput!
    }
    authPhoneVerifyTokenSender: { // args
      input: NexusGenInputs['AuthPhoneVerifyTokenSenderInput']; // AuthPhoneVerifyTokenSenderInput!
    }
    authWeb: { // args
      input: NexusGenInputs['ExternalWebAuthInput']; // ExternalWebAuthInput!
    }
    createBook: { // args
      input: NexusGenInputs['BookInput']; // BookInput!
    }
    createUser: { // args
      input: NexusGenInputs['UserInput']; // UserInput!
    }
    deleteBook: { // args
      bookId: string; // String!
    }
    deleteUser: { // args
      userId: string; // String!
    }
    loginEmail: { // args
      input: NexusGenInputs['LoginEmailInput']; // LoginEmailInput!
    }
    loginPhone: { // args
      input: NexusGenInputs['LoginPhoneInput']; // LoginPhoneInput!
    }
    logout: { // args
      deviceId?: string | null; // String
    }
    refreshAccessToken: { // args
      input?: NexusGenInputs['RefreshToAccessTokenInput'] | null; // RefreshToAccessTokenInput
    }
    registerEmail: { // args
      input: NexusGenInputs['RegisterEmailInput']; // RegisterEmailInput!
    }
    registerPhone: { // args
      input: NexusGenInputs['RegisterPhoneInput']; // RegisterPhoneInput!
    }
    updateBook: { // args
      id: string; // String!
      input: NexusGenInputs['BookInput']; // BookInput!
    }
    updateUser: { // args
      id: string; // String!
      input: NexusGenInputs['UserInput']; // UserInput!
    }
    userChangePassword: { // args
      input: NexusGenInputs['UserChangePasswordInput']; // UserChangePasswordInput!
    }
    userStatusUpdate: { // args
      id: string; // String!
      input: NexusGenInputs['UserStatusUpdateInput']; // UserStatusUpdateInput!
    }
  }
  Query: {
    book: { // args
      id: string; // String!
    }
    books: { // args
      input?: NexusGenInputs['BookWhereInput'] | null; // BookWhereInput
      orderBy?: string | null; // String
      skip: number; // Int!
      take: number; // Int!
    }
    user: { // args
      input?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
    users: { // args
      input?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
      orderBy?: string | null; // String
      skip: number; // Int!
      take: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}