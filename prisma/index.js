// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")

const onFiles = function (dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(fileName => {
    if (!fileName.includes(".t.prisma")) {
      const filePath = dir + "/" + fileName
      const fileStat = fs.statSync(filePath)
      if (fileStat && fileStat.isDirectory())
        results = results.concat(onFiles(filePath))
      else results.push(filePath)
    }
  })
  return results
}

const merge = path => {
  const fileList = onFiles(path)

  const baseModal = fs.readFileSync("prisma/_base.prisma").toString()
  let schemaModel = baseModal
  fileList.forEach(item => (schemaModel += fs.readFileSync(item).toString()))
  fs.writeFileSync("prisma/schema.prisma", schemaModel)
}

;(() => {
  try {
    merge("prisma/models")
    console.log("Models merged successfully.")
  } catch (error) {
    console.log("Failed to merge models: ", error.message)
  }
})()
