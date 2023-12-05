import PartNumber from '../models/part-number'
import Part from '../types/part'

const isPartNumber = (part: Part): part is PartNumber =>
  part instanceof PartNumber

export default isPartNumber
