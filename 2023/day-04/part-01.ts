const input = Bun.file('./day-04/input.txt')
const text = await input.text()

const result = text
  .split('\n')
  .map((line) => {
    const [, numbers] = line.split(/\:\s+/)
    if (numbers === undefined) return

    const [winningNumbers, drawNumbers] = numbers
      .split(' | ')
      .map((numbers) => numbers.split(/\s+/).map(Number))

    if (drawNumbers && winningNumbers) {
      return winningNumbers.filter((number) => drawNumbers.includes(number))
    }
  })
  .filter(Boolean)
  .map((matchingNumbers) => {
    if (matchingNumbers.length === 0) return 0
    return 2 ** matchingNumbers.length / 2
  })
  .reduce((acc, value) => acc + value)

// Should be 21088
console.log(result)
