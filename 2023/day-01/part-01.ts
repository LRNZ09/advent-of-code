const input = Bun.file('./day-01/input.txt')

const lines = await input.text()

const result = lines
  .split('\n')
  .map((line) => {
    const digits = line.split('').filter((value) => value.match(/\d/))
    return Number(`${digits[0]}${digits[digits.length - 1]}`)
  })
  .reduce((acc, value) => acc + value)

console.log(result)
