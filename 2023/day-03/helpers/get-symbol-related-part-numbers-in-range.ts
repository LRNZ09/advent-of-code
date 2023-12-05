import PartSymbol from '../models/part-symbol'
import Part from '../types/part'
import isPartNumber from '../utils/is-part-number'

const getSymbolRelatedPartNumbersInRange = (
  parts: Part[][],
  partsLineIndex: number,
  partSymbol: PartSymbol,
) => {
  const previousPartsLine = parts[partsLineIndex - 1]
  const currentPartsLine = parts[partsLineIndex]
  const nextPartsLine = parts[partsLineIndex + 1]

  const partNumbers = [previousPartsLine, currentPartsLine, nextPartsLine]
    .filter(Boolean)
    // Get all the part numbers for each line
    .map((partsLine) => partsLine.filter(isPartNumber))
    // Flat the results among all the lines
    .flatMap((partsLine) =>
      // Filter the part numbers that are within the gear range
      partsLine.filter(
        (partNumber) =>
          partSymbol.index >= partNumber.startIndex - 1 &&
          partSymbol.index <= partNumber.endIndex + 1,
      ),
    )

  return partNumbers
}

export default getSymbolRelatedPartNumbersInRange
