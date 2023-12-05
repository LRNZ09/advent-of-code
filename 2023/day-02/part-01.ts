const input = Bun.file('./day-02/input.txt')

const lines = await input.text()

const maxRed = 12
const maxGreen = 13
const maxBlue = 14

const getMaxOfArrayByColor = (
  values: string[],
  color: 'red' | 'green' | 'blue',
) => {
  const digits = values
    .filter((value) => value.includes(color))
    .map((value) => {
      const [digit] = value.split(' ')
      return Number(digit)
    })
  return Math.max(...digits)
}

const result = lines
  .replaceAll(/Game \d+\:\s/g, '')
  .split('\n')
  .map((line) => line.split('; ').flatMap((draw) => draw.split(', ')))
  .map((values, index) => {
    const red = getMaxOfArrayByColor(values, 'red')
    const green = getMaxOfArrayByColor(values, 'green')
    const blue = getMaxOfArrayByColor(values, 'blue')
    return { id: index + 1, red, green, blue }
  })
  .filter(
    ({ red, green, blue }) =>
      red <= maxRed && green <= maxGreen && blue <= maxBlue,
  )
  .reduce((acc, { id }) => acc + id, 0)

console.log(result)
