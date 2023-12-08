export const getRandomLetters = (len = 1) =>
  Array(len)
    .fill("")
    .map(_e => String.fromCharCode(Math.floor(Math.random() * 26) + 65))
    .join("")

export const getRandomDigits = (len = 1) =>
  parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(len)
      .toString()
      .replace(".", ""),
  )

export const generateUniqueId = (firstCharacter: string) => {
  return firstCharacter + getRandomLetters(1) + getRandomDigits(8)
}
