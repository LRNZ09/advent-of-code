import PartSymbol from '../models/part-symbol'
import Part from '../types/part'

const isPartSymbol = (part: Part): part is PartSymbol =>
  part instanceof PartSymbol

export default isPartSymbol
