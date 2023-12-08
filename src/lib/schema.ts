import { makeSchema } from "nexus"
import { join } from "path"
import * as types from "./../graphql"

const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), "./src/generated", "nexus-typegen.ts"),
    schema: join(process.cwd(), "./src/generated", "schema.graphql"),
  },
  contextType: {
    module: join(process.cwd(), "./src/lib", "/context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "PrismaClient",
      },
    ],
  },
})

export default schema
