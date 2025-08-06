import { parse } from './parser/index.js'
import getDiff from './getDiff.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parse(filepath1)
  const file2 = parse(filepath2)

  console.log(getDiff(file1, file2))
}

export default genDiff
