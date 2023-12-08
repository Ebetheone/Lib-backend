import { Context } from "lib/context"
import { Errors } from "src/errors"
import { getExpiresDate } from "utils/dateFounder"

export const userIncludeDevice = {
  devices: {
    where: {
      isActive: true,
    },
  },
}

export const CheckSessions = async (
  ctx: Context,
  user: any,
  deviceId: string,
) => {
  let deviceList
  const expiresDate = getExpiresDate(14)

  if (!ctx.device.osName || !ctx.device.deviceType || !ctx.device.name) {
    throw Errors.Auth.NOT_AUTHORIZED()
  }

  const existingUserDevice = user?.devices?.find(
    (e: any) =>
      e.id === deviceId &&
      e.deviceName === ctx.device.name &&
      e.deviceOs === ctx.device.osName &&
      e.deviceType === ctx.device.deviceType,
  )

  if (!user?.devices || user?.devices?.length < 1) {
    const device = await ctx.prisma.userDevice.create({
      data: {
        deviceName: ctx.device.name,
        deviceOs: ctx.device.osName,
        deviceType: ctx.device.deviceType,
        isActive: true,
        userId: user?.id,
        sessions: {
          create: {
            userId: user?.id,
            isActive: true,
            expires: expiresDate,
          },
        },
      },
    })
    return (deviceId = device.id)
  } else if (existingUserDevice) {
    const device = await ctx.prisma.userDevice.update({
      where: {
        id: existingUserDevice.id,
      },
      data: {
        isActive: true,
        sessions: {
          create: {
            userId: user?.id,
            isActive: true,
            expires: expiresDate,
          },
          updateMany: {
            where: { deviceId: existingUserDevice.id },
            data: { isActive: false },
          },
        },
      },
    })

    return (deviceId = device.id)
  } else if (user.devices.length < 2) {
    const device = await ctx.prisma.userDevice.create({
      data: {
        deviceOs: ctx.device.osName,
        deviceType: ctx.device.deviceType,
        deviceName: ctx.device.name,
        isActive: true,
        userId: user.id,
        sessions: {
          create: {
            userId: user?.id,
            isActive: true,
            expires: expiresDate,
          },
        },
      },
    })
    return (deviceId = device.id)
  } else {
    deviceList =
      user?.devices?.map((e: any) => ({
        id: e.id,
        deviceName: e.deviceName,
        deviceOs: e.deviceOs,
        deviceType: e.deviceType,
      })) || []
    return { deviceList }
  }
}
