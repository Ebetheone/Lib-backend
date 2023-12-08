import dotenv from "dotenv"

dotenv.config()

export const isProd = process.env.NODE_ENV === "production"
export const isDev = process.env.NODE_ENV === "development"

export const NODE_ENV = process.env.NODE_ENV || "development"

const ENV = {
  ACCESS_TOKEN_KEY: "access-token",
  REFRESH_TOKEN_KEY: "refresh-token",
  RESET_TOKEN_KEY: "reset-token",
  SESSION_TOKEN_KEY: "session-token",
  CSRF_TOKEN_KEY: "x-csrf-token",
  DEVICE_TYPE: "device-type",
  JWT_SECRET: process.env.JWT_SECRET || "flight-secret",
  ADMIN_ACCESS_TOKEN_EXPIRE: "14d",
  USER_ACCESS_TOKEN_EXPIRE: "30d",
  ADMIN_REFRESH_TOKEN_EXPIRE: "14d",
  USER_REFRESH_TOKEN_EXPIRE: "60d",
  ADMIN_SESSION_TOKEN_EXPIRE: "5m",
  USER_SESSION_TOKEN_EXPIRE: "30m",
  ADMIN_RESET_TOKEN_EXPIRE: "30m",
  USER_RESET_TOKEN_EXPIRE: "30m",

  VERIFY_TOKEN_EXPIRE: 2 * 60,

  CORS_DOMAIN: process.env.CORS_DOMAIN?.split(",") || ["http://localhost:3014"],
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
}

export { ENV }

export const DATABASE_URL = process.env.DATABASE_URL

export const APP_PORT =
  typeof process.env.APP_PORT === "string"
    ? parseInt(process.env.APP_PORT, 10)
    : process.env.NODE_ENV === "production"
    ? 8080
    : 4000

export const APP_PATH = process.env.APP_PATH || "/graphql"

export const APP_LOG_LEVEL = process.env.APP_LOG_LEVEL || "debug"
