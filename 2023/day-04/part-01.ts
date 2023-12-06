import getScratchcardsFromText from './helpers/get-scratchcards-from-text'

const input = Bun.file('./day-04/input.txt')
const text = await input.text()

const scratchcards = getScratchcardsFromText(text)

const result = scratchcards
  .map((matches) => {
    if (matches === 0) return 0
    return 2 ** matches / 2
  })
  .reduce((acc, value) => acc + value)

// Should be 21088
console.log(result)
