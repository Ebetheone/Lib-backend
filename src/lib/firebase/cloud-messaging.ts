import { PrismaClient } from "@prisma/client"
import * as admin from "firebase-admin"
import { MessagingPayload } from "firebase-admin/lib/messaging/messaging-api"
import notificationConfig from "lib/firebase/firebaseConfig"

const prisma = new PrismaClient()

const serviceAccount = notificationConfig as admin.ServiceAccount

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
export const sendNotification = async (
  fcmTokens: string,
  message: MessagingPayload,
) =>
  new Promise(function (resolve) {
    if (fcmTokens) {
      admin
        .messaging()
        .sendToDevice(fcmTokens, message)
        .then(response => {
          console.log(response.successCount, response.failureCount)
          const failedTokens: string[] = []
          response.results.forEach((deviceResult, idx) => {
            if (deviceResult.error) {
              if (
                deviceResult.error.message.includes(
                  "Remove this registration token and stop using it to",
                ) ||
                deviceResult.error.message.includes(
                  "Requested entity was not found",
                ) ||
                deviceResult.error.message.includes(
                  "Invalid registration token provided. Make sure it matches the registration token the client app receives from registering with FCM.",
                )
              )
                failedTokens.push(fcmTokens[idx])
            }
          })
          if (failedTokens.length > 0) {
            prisma.userSession.deleteMany({
              where: {
                fcmToken: {
                  in: failedTokens,
                },
              },
            })
          }
          resolve({
            successCount: response.successCount,
            failureCount: response.failureCount,
          })
        })
    }
  })
