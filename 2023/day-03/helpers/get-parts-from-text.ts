import PartNumber from '../models/part-number'
import PartSymbol from '../models/part-symbol'
import Part from '../types/part'

const getPartsFromText = (text: string) =>
  text.split('\n').map((line) =>
    line
      .split('')
      // Preserve original index
      .map((value, index) => ({ value, index }))
      // Removes invalid symbols such as `.`
      .filter(({ value }) => value !== '.')
      // Converts to `PartNumber` or `PartSymbol`
      .reduce<Part[]>((acc, { value, index }) => {
        // Matches a digit
        if (/\d/.test(value)) {
          const previousPart = acc[acc.length - 1]
          const nextPartNumber = new PartNumber(Number(value), index)

          if (
            previousPart instanceof PartNumber &&
            previousPart.isAdjacentWith(nextPartNumber)
          ) {
            previousPart.mergeWith(nextPartNumber)
          } else {
            acc.push(nextPartNumber)
          }
        } else {
          const nextPartSymbol = new PartSymbol(value, index)
          acc.push(nextPartSymbol)
        }

        return acc
      }, []),
  )

export default getPartsFromText
