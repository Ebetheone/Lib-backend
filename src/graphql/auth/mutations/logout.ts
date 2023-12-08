import { mutationField, nullable, stringArg } from "nexus"

export const Logout = mutationField("logout", {
  type: "Boolean",
  args: { deviceId: nullable(stringArg()) },
  resolve: async (_, { deviceId }, ctx) => {
    let device
    if (deviceId) {
      device = await ctx.prisma.userDevice.update({
        where: { id: deviceId },
        data: {
          isActive: false,
          sessions: {
            updateMany: {
              where: { deviceId },
              data: { isActive: false },
            },
          },
        },
        select: { id: true },
      })
      if (!device?.id) console.log("logout deviceId", deviceId)
    }
    return true
  },
})
