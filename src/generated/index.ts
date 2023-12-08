export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export enum AccountProviderTypeEnum {
  APPLE = "APPLE",
  EMAIL = "EMAIL",
  FACEBOOK = "FACEBOOK",
  GOOGLE = "GOOGLE",
  NONE = "NONE",
  PHONE = "PHONE",
  TWITTER = "TWITTER",
}

export enum FileSizeEnum {
  MEDIUM = "MEDIUM",
  NATIVE = "NATIVE",
  SMALL = "SMALL",
  THUMB = "THUMB",
}

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  NONE = "NONE",
}

export type Query = {
  __typename?: "Query"
  ok: Scalars["Boolean"]
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum TokenVerifyEnum {
  AUTH = "AUTH",
  RESET = "RESET",
}

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
