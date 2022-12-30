const capitalize = (string) => {
  let word = string.toLowerCase()
  let firstLetter = string[0].toUpperCase()
  return word.replace(word[0], firstLetter)
}

export { capitalize }