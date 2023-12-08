export function generateRandomPassword(length: number) {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz"
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const digits = "0123456789"

  let password = ""
  password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)]
  password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]
  password += digits[Math.floor(Math.random() * digits.length)]

  const allChars = lowerCaseChars + upperCaseChars + digits

  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")

  return password
}
