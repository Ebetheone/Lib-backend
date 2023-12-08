import type { CodegenConfig } from "@graphql-codegen/cli"
import fetch from "node-fetch"

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/generated/schema.graphql",
  generates: {
    "src/generated/index.ts": {
      plugins: ["typescript"],
      config: {
        fetcher: fetch,
        contextType: "src/lib/context#Context",
        hooksImportFrom: "@apollo/client",
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: "change-case-all#upperCase",
        },
      },
    },
    "src/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write", "eslint --fix"],
  },
}

export default config
