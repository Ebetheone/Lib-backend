import { DateTimeResolver, JSONResolver } from "graphql-scalars"
import { asNexusMethod } from "nexus"

export const DateTime = asNexusMethod(DateTimeResolver, "DateTime")
export const Json = asNexusMethod(JSONResolver, "JSON")
