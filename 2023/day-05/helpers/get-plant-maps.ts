import { PlantMapRange } from '../types'

const getPlantMaps = (plantMapTexts: string[]): PlantMapRange[][] =>
  plantMapTexts.map((mapText) =>
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

export default getPlantMaps
