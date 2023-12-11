import { chunk } from 'remeda'
import getPlantMaps from './helpers/get-plant-maps'
import getMinLocation from './helpers/get-min-location'

const input = Bun.file('./day-05/example.txt')
const text = await input.text()

const [seedsText, ...mapTexts] = text.split('\n\n')
if (!seedsText) throw new Error('Bad input.')

const seedsWithRange = seedsText.split(' ').splice(1).map(Number)

const seeds = chunk(seedsWithRange, 2).flatMap(([start, count = 1]) =>
  Array.from({ length: count }, (_value, index) => start + index),
)

const plantMaps = getPlantMaps(mapTexts)
const minLocation = getMinLocation(seeds, plantMaps)

console.log(minLocation)
