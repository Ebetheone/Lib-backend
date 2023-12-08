import { PrismaClient } from "@prisma/client"
import ms from "ms"
import logger from "./winstonLogger"

function createPrismaClient(): PrismaClient {
  const prismaLogger = logger.child({ source: "PrismaClient" })
  const prisma = new PrismaClient({
    log: [
      { emit: "event", level: "query" },
      { emit: "event", level: "info" },
      { emit: "event", level: "warn" },
      { emit: "event", level: "error" },
    ],
  })

  const createLogObj = (e: {
    timestamp?: Date
    target?: string
    params?: string
    duration?: number
    message?: string
  }) => {
    return {
      timestamp:
        e.timestamp && e.timestamp.toISOString
          ? e.timestamp.toISOString
          : e.timestamp,
      target: e.target,
      duration: e.duration ? ms(e.duration, { long: true }) : undefined,
      params: e.params,
    }
  }

  prisma.$on("warn", (e: any) => {
    prismaLogger.warn(e.message, createLogObj(e))
  })

  prisma.$on("error", (e: any) => {
    prismaLogger.error(e.message, createLogObj(e))
  })

  prisma.$use(async (params: any, next: any) => {
    try {
      const result = await next(params)
      return result
    } catch (err) {
      console.log("=== GLOBAL PRISMA ERROR HANDLE === ", err)
      throw err
    }
  })

  return prisma
}

export const prisma = createPrismaClient()
