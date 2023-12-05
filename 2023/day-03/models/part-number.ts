class PartNumber {
  constructor(
    protected _value: number,
    readonly startIndex: number,
    protected _endIndex: number = startIndex,
  ) {}

  get value() {
    return this._value
  }

  get endIndex() {
    return this._endIndex
  }

  isAdjacentWith(other: PartNumber) {
    return this.endIndex === other.startIndex - 1
  }

  mergeWith(other: PartNumber) {
    if (!this.isAdjacentWith(other)) {
      throw new Error(
        `Cannot merge parts that are not adjacent: ${this.endIndex} !== ${
          other.startIndex - 1
        }.`,
      )
    }

    this._value = Number(`${this.value}${other.value}`)
    this._endIndex = other.startIndex

    return this
  }
}

export default PartNumber
