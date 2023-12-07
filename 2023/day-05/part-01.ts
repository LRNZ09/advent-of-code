const input = Bun.file('./day-05/input.txt')
const text = await input.text()

const [seeds, ...mapTexts] = text.split('\n\n')
if (!seeds) throw new Error('Bad input.')

const numSeeds = seeds.split(' ').splice(1).map(Number)

interface PlantMapRange {
  sourceRangeStart: number
  sourceRangeEnd: number
  destinationRangeStart: number
  destinationRangeEnd: number
  rangeLength: number
}

const plantMaps = mapTexts.map((mapText) =>
  mapText
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((map) =>
      map.split(' ').reduceRight<PlantMapRange>((acc, value, index) => {
        const numValue = Number(value)
        switch (index) {
          case 2:
            acc.rangeLength = numValue
            break
          case 1:
            acc.sourceRangeStart = numValue
            acc.sourceRangeEnd = numValue + acc.rangeLength!
            break
          case 0:
            acc.destinationRangeStart = numValue
            acc.destinationRangeEnd = numValue + acc.rangeLength!
            break
        }

        return acc
      }, {} as PlantMapRange),
    ),
)

const result = numSeeds.map((numSeed) =>
  plantMaps.reduce<number>((acc, plantMap) => {
    const matchedMapRange = plantMap.find(
      (plantMapRange) =>
        acc >= plantMapRange.sourceRangeStart &&
        acc <= plantMapRange.sourceRangeEnd,
    )

    if (matchedMapRange) {
      const diff =
        matchedMapRange.sourceRangeStart - matchedMapRange.destinationRangeStart
      return (acc -= diff)
    }

    return acc
  }, numSeed),
)

console.log(Math.min(...result))
