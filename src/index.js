import { parse } from './parser/index.js'
import getDiff from './getDiff.js'
import { getJSONFormat, getPlainFormat, getStylishFormat } from './formatter/index.js'

const genDiff = (filepath1, filepath2, style = 'stylish') => {
  const file1 = parse(filepath1)
  const file2 = parse(filepath2)

  const diff = getDiff(file1, file2)

  switch (style) {
    case 'stylish':
      return getStylishFormat(diff)
    case 'plain':
      return getPlainFormat(diff)
    case 'json':
      return getJSONFormat(diff)
  }
}

export default genDiff
