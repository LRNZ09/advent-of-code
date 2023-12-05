const input = Bun.file('./day-02/input.txt')

const lines = await input.text()

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
  .map((values) => {
    const red = getMaxOfArrayByColor(values, 'red')
    const green = getMaxOfArrayByColor(values, 'green')
    const blue = getMaxOfArrayByColor(values, 'blue')
    return red * green * blue
  })
  .reduce((acc, value) => acc + value)

console.log(result)
