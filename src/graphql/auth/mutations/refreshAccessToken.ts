import jwt from "jsonwebtoken"
import { arg, mutationField, nullable } from "nexus"
import { ENV } from "src/config"
import { Errors } from "src/errors"
import { getHeaderTokens, getUser } from "utils/auth"
import { RefreshToAccessTokenInputType } from "../inputTypes"
import { RefreshTokenType } from "../types"
import { createUserTokens, signRefreshTokenType } from "utils/tokenGenerator"

export const RefreshAccessToken = mutationField("refreshAccessToken", {
  type: RefreshTokenType,
  args: {
    input: nullable(arg({ type: RefreshToAccessTokenInputType })),
  },
  resolve: async (_, { input }, ctx) => {
    let _refreshToken
    let tokenJson: signRefreshTokenType = {
      userId: "",
      deviceType: "",
    }
    const tokens = getHeaderTokens(ctx.req)

    if (input?.refreshToken) _refreshToken = input.refreshToken
    else if (tokens.refreshToken) _refreshToken = tokens.refreshToken

    if (_refreshToken)
      jwt.verify(
        _refreshToken,
        ENV.JWT_SECRET,
        function (err: any, decoded: any) {
          if (err) {
            if (err.message === "jwt expired")
              throw Errors.Auth.REFRESH_TOKEN_EXPIRED()
            if (err.message === "invalid token") {
              throw Errors.Auth.REFRESH_TOKEN_INVALID()
            }
            if (err.message === "invalid signature") {
              throw Errors.Auth.REFRESH_TOKEN_INVALID()
            }
            console.log("RefreshAccessToken === catch err", err)
          }
          tokenJson = decoded as signRefreshTokenType
        },
      )
    if (tokenJson?.userId) {
      const user = await getUser(tokenJson?.userId)
      const { refreshToken: newRefreshToken, accessToken: newAccessToken } =
        createUserTokens(user.id, ctx.device.deviceType || null)

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        wsToken: newAccessToken,
      }
    } else {
      throw Errors.Auth.REFRESH_TOKEN_MISSING()
    }
  },
})
