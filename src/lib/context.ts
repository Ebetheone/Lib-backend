import { PrismaClient, User } from "@prisma/client"
import DeviceDetector from "node-device-detector"
import DeviceHelper from "node-device-detector/helper"
import express from "express"
import { Request, Response } from "express-serve-static-core"
import { PubSub } from "graphql-subscriptions"
import { verify } from "jsonwebtoken"
import { isEmpty } from "lodash"
import { ENV } from "src/config"
import { AppAbility, defineAbilitiesFor } from "src/lib/casl/ability"
import { prisma } from "src/lib/prisma"
import { getContextUser, getUser } from "src/utils/auth"

export interface DeviceProps {
  osName?: string
  name?: string
  clientName?: string
  deviceType?: string | null
}

export interface Context {
  req: Request
  res: Response
  prisma: PrismaClient
  pubsub: PubSub
  user: User | null
  ability: AppAbility
  device: DeviceProps
}

export const pubsub = new PubSub()

type CreateContextParams = {
  req: express.Request
  res: express.Response
}

export async function createContext(
  params: CreateContextParams,
): Promise<Context> {
  const { req, res } = params

  const detector = new DeviceDetector()

  const device: DeviceProps = {
    osName: undefined,
    name: undefined,
    clientName: undefined,
    deviceType: undefined,
  }

  const userAgent = req.headers["user-agent"]

  if (userAgent) {
    const _detector = detector.detect(userAgent)
    device.osName = _detector.os?.name
    device.clientName = _detector.client?.name
    device.name = `${_detector.device?.brand}_${_detector.device?.type}_${_detector.client.name}`
    device.deviceType = DeviceHelper.getDeviceType(_detector)
  }
  const user =
    req?.body?.operationName !== "IntrospectionQuery"
      ? await getContextUser(req)
      : null

  const ability = defineAbilitiesFor({
    user: user,
  })

  return {
    prisma,
    pubsub,
    req,
    res,
    user,
    ability,
    device,
  }
}

interface UserToken {
  userId: string
}

export const createContextWs = async (ctx: any) => {
  if (
    ctx?.connectionParams?.authentication &&
    !isEmpty(ctx.connectionParams.authentication)
  ) {
    const verifiedToken =
      (verify(
        ctx.connectionParams.authentication,
        ENV.JWT_SECRET,
      ) as UserToken) || null
    const user = await getUser(verifiedToken.userId)
    return { prisma, pubsub, user }
  }
  return { prisma, pubsub, user: null }
}
