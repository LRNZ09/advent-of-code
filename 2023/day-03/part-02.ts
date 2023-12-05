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
      // Get the gears among the symbols
      .filter((partSymbol) => partSymbol.isGear())
      // Get the part numbers that are valid for the gear
      .map((partGear) =>
        getSymbolRelatedPartNumbersInRange(parts, partsLineIndex, partGear),
      )
      // Filter by the min to get the gear ratio
      .filter((partNumbers) => partNumbers.length >= 2)
      // Calculate the gear ratio from them
      .map((partNumbers) =>
        partNumbers
          .map(({ value }) => value)
          .reduce((acc, value) => acc * value),
      ),
  )
  .reduce((acc, value) => acc + value)

// Should be 81166799
console.log(result)
