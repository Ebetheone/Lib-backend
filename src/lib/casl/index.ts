/* eslint-disable @typescript-eslint/no-explicit-any */
import { PureAbility, hkt } from "@casl/ability"
import {
  ExtractModelName,
  Model,
  createAbilityFactory,
  createAccessibleByFactory,
} from "@casl/prisma/runtime"
import type { Prisma, PrismaClient } from "@prisma/client"
import { Actions } from "./ability"

/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */

type ModelName = Prisma.ModelName
type ModelWhereInput = {
  [K in Prisma.ModelName]: Uncapitalize<K> extends keyof PrismaClient
    ? Extract<
        Parameters<PrismaClient[Uncapitalize<K>]["findFirst"]>[0],
        { where?: any }
      >["where"]
    : never
}

type WhereInput<TModelName extends Prisma.ModelName> = Extract<
  ModelWhereInput[TModelName],
  Record<any, any>
>

interface PrismaQueryTypeFactory extends hkt.GenericFactory {
  produce: WhereInput<ExtractModelName<this[0], ModelName>>
}

type PrismaModel = Model<Record<string, any>, string>
// Higher Order type that allows to infer passed in Prisma Model name
export type PrismaQuery<T extends PrismaModel = PrismaModel> = WhereInput<
  ExtractModelName<T, ModelName>
> &
  hkt.Container<PrismaQueryTypeFactory>

type WhereInputPerModel = {
  [K in ModelName]: WhereInput<K>
}

// CREATE
type ModelCreateInput = {
  [K in Prisma.ModelName]: Uncapitalize<K> extends keyof PrismaClient
    ? Extract<
        Parameters<PrismaClient[Uncapitalize<K>]["create"]>[0],
        { data?: any }
      >["data"]
    : never
}

type CreateInput<TModelName extends Prisma.ModelName> = Partial<
  Extract<ModelCreateInput[TModelName], Record<any, any>>
>

interface PrismaMutationTypeFactory extends hkt.GenericFactory {
  produce: CreateInput<ExtractModelName<this[0], ModelName>>
}

// Higher Order type that allows to infer passed in Prisma Model name
export type PrismaMutation<T extends PrismaModel = PrismaModel> = Partial<
  CreateInput<ExtractModelName<T, ModelName>>
> &
  hkt.Container<PrismaMutationTypeFactory>

type CreateInputPerModel = {
  [K in ModelName]: Partial<CreateInput<K>>
}

const createPrismaAbility = createAbilityFactory<
  ModelName,
  PrismaQuery | PrismaMutation
>()

const accessibleByWhere = createAccessibleByFactory<
  WhereInputPerModel,
  PrismaQuery | PrismaMutation
>()

const accessibleByCreate = createAccessibleByFactory<
  Partial<CreateInputPerModel>,
  PrismaQuery | PrismaMutation
>()

export type PermittedIds = {
  [key: string]: {
    in: string[]
  }
}

const accessibleBy = (
  ability: PureAbility<
    any,
    PrismaQuery<PrismaModel> | PrismaMutation<PrismaModel>
  >,
  action: Actions,
  model: Prisma.ModelName,
) => {
  if (action === "create") {
    const _data = accessibleByCreate(ability, action)[model] as any
    return _data?.OR?.[0] as Partial<CreateInputPerModel>
  } else if (action === "update" || action === "delete") {
    const data = accessibleByWhere(ability, action)[model] as any
    return data?.OR?.[0] as WhereInputPerModel
  } else {
    const data = accessibleByWhere(ability, action)[model] as any
    const _data = { AND: [{ ...data?.OR?.[0] }] } as any
    return _data as WhereInputPerModel
  }
}

export { accessibleBy, createPrismaAbility }
