const input = Bun.file('./day-01/input.txt')

const lines = await input.text()

// Mapping words to corresponding digits
const wordDigitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const

const result = lines
  .split('\n')
  .map((line) => {
    // Cannot use `replaceAll` because substrings may overlap
    const matches = line.matchAll(
      /(?=(one|two|three|four|five|six|seven|eight|nine|\d{1}))/g,
    )

    const digits = Array.from(matches, ([, group]) => {
      if (group && group in wordDigitMap)
        return wordDigitMap[group as keyof typeof wordDigitMap]

      return group
    })

    return Number(`${digits[0]}${digits[digits.length - 1]}`)
  })
  .reduce((acc, value) => acc + value)

console.log(result)
