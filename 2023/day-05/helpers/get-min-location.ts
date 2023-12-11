interface PlantMapRange {
  sourceRangeStart: number
  sourceRangeEnd: number
  destinationRangeStart: number
  destinationRangeEnd: number
  rangeLength: number
}

const getMinLocation = (
  seeds: number[],
  plantMaps: PlantMapRange[][],
): number => {
  const result = seeds.map((numSeed) =>
    plantMaps.reduce<number>((acc, plantMap) => {
      const matchedMapRange = plantMap.find(
        (plantMapRange) =>
          acc >= plantMapRange.sourceRangeStart &&
          acc <= plantMapRange.sourceRangeEnd,
      )

      if (matchedMapRange) {
        const diff =
          matchedMapRange.sourceRangeStart -
          matchedMapRange.destinationRangeStart
        return (acc -= diff)
      }

      return acc
    }, numSeed),
  )

  return Math.min(...result)
}

export default getMinLocation
