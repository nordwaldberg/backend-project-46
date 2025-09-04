import { parse } from './parser/index.js'
import getDiff from './getDiff.js'
import { getStylishFormat } from './formatter/index.js'

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1)
  const file2 = parse(filepath2)

  return getStylishFormat(getDiff(file1, file2))
}

export default genDiff
