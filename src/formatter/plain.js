import _ from 'lodash'

const getKey = (key, prefix) => {
  return prefix === '' ? `${key}` : `${prefix}.${key}`
}

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }

  return _.isObject(value) ? '[complex value]' : String(value)
}

export const getPlainFormat = (diff) => {
  const formattingIteration = (item, prefix) => {
    let formatted = []

    item.forEach((elem) => {
      switch (true) {
        case elem.status === 'added':
          formatted.push(`Property '${getKey(elem.key, prefix)}' was added with value: ${getValue(elem.value)}`)
          break
        case elem.status === 'removed':
          formatted.push(`Property '${getKey(elem.key, prefix)}' was removed`)
          break
        case elem.status === 'changed':
          formatted.push(`Property '${getKey(elem.key, prefix)}' was updated. From ${getValue(elem.value[0])} to ${getValue(elem.value[1])}`)
          break
        case elem.status === 'unchanged':
          break
        case elem.status === 'nested':
          formatted.push(formattingIteration(elem.children, getKey(elem.key, prefix)))
          break
      }
    })

    return formatted.join('\n')
  }

  return formattingIteration(diff, '')
}
