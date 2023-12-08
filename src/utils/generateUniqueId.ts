export const getRandomLetters = (len = 1) =>
  Array(len)
    .fill("")
    .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 65))
    .join("")

export const getRandomDigits = (len = 1) => {
  let result = ""
  for (let i = 0; i < len; i++) {
    result += Math.floor(Math.random() * 10).toString()
  }
  return result
}

export const generateUniqueId = (firstCharacter: string) => {
  return firstCharacter + getRandomLetters(1) + getRandomDigits(8)
}
