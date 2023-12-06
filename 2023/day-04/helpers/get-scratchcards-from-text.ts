const getScratchcardsFromText = (text: string) =>
  text
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
    .map((matchingNumbers) => matchingNumbers.length)

export default getScratchcardsFromText
