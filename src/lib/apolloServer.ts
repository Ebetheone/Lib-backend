import { ApolloServer } from "@apollo/server"

import { json } from "body-parser"
import cors from "cors"
import express from "express"
import http from "http"
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/lib/use/ws"

import { Context, createContext, createContextWs } from "lib/context"
import { expressMiddleware } from "@apollo/server/express4"

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"

import { unwrapResolverError } from "@apollo/server/errors"
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled"

import { GraphQLFormattedError } from "graphql"
import schema from "lib/schema"
import { APP_PORT, ENV, NODE_ENV } from "config"

const formatError = (formattedError: GraphQLFormattedError, error: unknown) => {
  console.log("formatError === formattedError", formattedError)
  console.log("formatError === error", error)
  const originalError = unwrapResolverError(error)
  const exception: Record<string, unknown> = {
    ...(typeof originalError === "object" ? originalError : null),
  }
  delete exception.extensions
  if (formattedError.extensions?.stacktrace) {
    exception.stacktrace = formattedError.extensions.stacktrace
  }
  const extensions: Record<string, unknown> = {
    ...formattedError.extensions,
    exception,
  }
  delete extensions.stacktrace
  return {
    ...formattedError,
    extensions,
  }
}

const corsOptions = {
  origin: ENV.CORS_DOMAIN,
  credentials: true,
}

const app = express()
const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
})

const serverCleanup = useServer(
  {
    schema: schema,
    onError(_, message, errors) {
      console.log("onError message ,errors", message, errors)
    },
    context: ctx => {
      return createContextWs(ctx)
    },
  },
  wsServer,
)

export const apolloServer = new ApolloServer<Context>({
  schema: schema,
  plugins:
    NODE_ENV === "production"
      ? [
          ApolloServerPluginLandingPageDisabled(),
          ApolloServerPluginDrainHttpServer({ httpServer }),
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanup.dispose()
                },
              }
            },
          },
        ]
      : [
          ApolloServerPluginDrainHttpServer({ httpServer }),
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanup.dispose()
                },
              }
            },
          },
        ],
  formatError,
})

export async function startApolloServer() {
  await apolloServer.start()

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(apolloServer, {
      context: ({ req, res }: any) => {
        return createContext({
          req,
          res,
        })
      },
    }),
  )

  app.get("/test", async (_, res) => {
    res.send(true)
  })

  app.get("/webhook/mn/qpay/v1", async (req, res) => {
    console.log("/webhook/mn/qpay/v1 === req?.query", req?.query)
    if (!req?.query?.order_id) {
      console.log("webhook/mn/qpay/v1 === error", req?.query)
      res.send(false)
    }
    res.send(true)
  })

  await new Promise<void>(resolve =>
    httpServer.listen({ port: APP_PORT }, resolve),
  )
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}/`)
  console.log(`⏰ Subscriptions ready at ws://localhost:${APP_PORT}/`)
}
