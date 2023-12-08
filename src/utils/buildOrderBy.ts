export const buildOrderBy = (sort?: string) => {
  const cases: any = {
    default: { createdAt: "desc" },
  }
  return cases[sort || "default"]
}
