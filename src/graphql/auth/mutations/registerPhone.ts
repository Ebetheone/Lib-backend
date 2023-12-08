import bcrypt from "bcrypt"
import { arg, mutationField, nonNull } from "nexus"
import { Errors } from "src/errors"
import { signPhoneToken } from "src/utils/tokenGenerator"
import { checkPhone } from "src/utils/auth"
import { sendCodeServer, smsServerMongolia } from "lib/sms-sender/smsSender"
import { RegisterPhoneInputType } from "../inputTypes"
// import { getAuth } from "lib/firebase/get-auth"

export const RegisterPhone = mutationField("registerPhone", {
  type: "Boolean",
  args: {
    input: nonNull(arg({ type: RegisterPhoneInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    const passwordHash = await bcrypt.hash(input.password, 10)
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    const isPhone = await checkPhone(
      input.phone,
      input?.countryCode || "976",
      ctx,
    )

    if (!isPhone) {
      const phoneVerifyCode = signPhoneToken({
        phone: input.phone,
        code,
      })

      const createUser = await ctx.prisma.user.create({
        data: {
          phone: input.phone,
          password: passwordHash,
          phoneConfirmCode: phoneVerifyCode,
          isPhoneConfirmed: false,
        },
      })

      // const fullPhoneNumber = `+${input.countryCode}${input.phone}`

      // getAuth()
      //   .getUserByPhoneNumber(fullPhoneNumber)
      //   .then(userRecord => {
      //     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`)
      //     return getAuth().updateUser(userRecord.uid, {
      //       phoneNumber: fullPhoneNumber,
      //       password: passwordHash,
      //       emailVerified: false,
      //     })
      //   })
      //   .then(userRecord => {
      //     console.log("Successfully updated user:", userRecord.uid)
      //   })
      //   .catch(error => {
      //     if (error.code === "auth/user-not-found") {
      //       getAuth()
      //         .createUser({
      //           phoneNumber: fullPhoneNumber,
      //           password: passwordHash,
      //           emailVerified: false,
      //         })
      //         .then(userRecord => {
      //           console.log("Successfully created new user:", userRecord.uid)
      //         })
      //         .catch(error => {
      //           console.log(error.message)
      //         })
      //     } else {
      //       console.log(error.message)
      //     }
      //   })

      if (createUser.phone) {
        const result = await smsServerMongolia({
          phone: input.phone,
          content: code,
        })
        if (!result) throw Errors.Auth.SEND_CODE_FAILED()

        const codeSend = await sendCodeServer(createUser.phone, "+976")
        if (!codeSend) throw Errors.Auth.SEND_CODE_FAILED()
      }
    }
    return true
  },
})
