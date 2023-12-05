class PartSymbol {
  constructor(
    readonly value: string,
    readonly index: number,
  ) {}

  isGear() {
    return this.value === '*'
  }
}

export default PartSymbol
