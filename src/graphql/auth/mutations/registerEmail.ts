import bcrypt from "bcrypt"
import { arg, mutationField, nonNull } from "nexus"
import { signEmailToken } from "src/utils/tokenGenerator"
import { checkEmail } from "src/utils/auth"
import { RegisterEmailInputType } from "../inputTypes"
// import { getAuth } from "lib/firebase/get-auth"
import { sendCodeMail } from "lib/mail-sender/template"

export const RegisterEmail = mutationField("registerEmail", {
  type: "Boolean",
  args: {
    input: nonNull(arg({ type: RegisterEmailInputType })),
  },
  resolve: async (_root, { input }, ctx) => {
    const passwordHash = await bcrypt.hash(input.password, 10)
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    const isEmail = await checkEmail(input.email, ctx)

    if (!isEmail) {
      const emailVerifyToken = signEmailToken({ email: input.email, code })
      const createUser = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: passwordHash,
          emailConfirmCode: emailVerifyToken,
          isEmailConfirmed: false,
        },
      })

      // getAuth()
      //   .getUserByEmail(input.email)
      //   .then(userRecord => {
      //     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`)
      //     return getAuth().updateUser(userRecord.uid, {
      //       displayName: input.email.split("@")[0],
      //       email: input.email,
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
      //           displayName: input.email.split("@")[0],
      //           email: input.email,
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

      if (createUser.email) {
        sendCodeMail(createUser.email, code)
      }
    }
    return true
  },
})
