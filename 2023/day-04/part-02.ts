import getScratchcardsFromText from './helpers/get-scratchcards-from-text'

const input = Bun.file('./day-04/input.txt')
const text = await input.text()

interface Instance {
  matchesIndex: number
  matches: number
}

const scratchcards = getScratchcardsFromText(text)

const result = scratchcards.reduce<Instance[]>(
  (instances, matches, matchesIndex) => {
    const { length: copiesNum } = instances.filter(
      (otherMatches) =>
        matchesIndex <= otherMatches.matchesIndex + otherMatches.matches,
    )

    const instancesNum = copiesNum + 1
    const nextInstances = Array.from({ length: instancesNum }, () => ({
      matchesIndex,
      matches,
    }))

    return [...instances, ...nextInstances]
  },
  [],
)

// Should be 6874754
console.log(result.length)
