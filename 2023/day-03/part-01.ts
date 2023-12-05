import getPartsFromText from './helpers/get-parts-from-text'
import getSymbolRelatedPartNumbersInRange from './helpers/get-symbol-related-part-numbers-in-range'
import isPartSymbol from './utils/is-part-symbol'

const input = Bun.file('./day-03/input.txt')
const lines = await input.text()
const parts = getPartsFromText(lines)

const result = parts
  .flatMap((currentPartsLine, partsLineIndex) =>
    currentPartsLine
      // Get all the symbols
      .filter(isPartSymbol)
      // Get the part numbers that are valid for the symbol
      .flatMap((partSymbol) =>
        getSymbolRelatedPartNumbersInRange(parts, partsLineIndex, partSymbol),
      ),
  )
  .map(({ value }) => value)
  .reduce((acc, value) => acc + value)

// Should be 549908
console.log(result)
