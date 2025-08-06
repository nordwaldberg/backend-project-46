import { parse } from './parser/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parse(filepath1)
  const file2 = parse(filepath2)

  console.log(file2, file1)
}

export default genDiff
