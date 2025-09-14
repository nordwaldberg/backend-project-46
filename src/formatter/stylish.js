import _ from 'lodash'

const INDENT_SIZE = 4
const SIGN_LENGTH = 2
const REPLACER = ' '

const getIndentation = (depth, side) => {
  if (side === 'left') {
    return REPLACER.repeat((depth * INDENT_SIZE) - SIGN_LENGTH)
  }

  if (side === 'right') {
    return REPLACER.repeat((depth * INDENT_SIZE) - INDENT_SIZE)
  }
}

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`
  }

  const stringifiedObj = Object.entries(value).map(([key, value]) => {
    return `${getIndentation(depth, 'left')}  ${key}: ${stringify(value, depth + 1)}`
  })

  return ['{', ...stringifiedObj, `${getIndentation(depth, 'right')}}`].join('\n')
}

export const getStylishFormat = (diff) => {
  const formattingIteration = (item, depth) => {
    let formatted = ['{']
    let shift = depth + 1

    item.forEach((elem) => {
      switch (true) {
        case elem.status === 'added':
          formatted.push(`${getIndentation(depth, 'left')}+ ${elem.key}: ${stringify(elem.value, shift)}`)
          break
        case elem.status === 'removed':
          formatted.push(`${getIndentation(depth, 'left')}- ${elem.key}: ${stringify(elem.value, shift)}`)
          break
        case elem.status === 'changed':
          formatted.push(`${getIndentation(depth, 'left')}- ${elem.key}: ${stringify(elem.value[0], shift)}`)
          formatted.push(`${getIndentation(depth, 'left')}+ ${elem.key}: ${stringify(elem.value[1], shift)}`)
          break
        case elem.status === 'unchanged':
          formatted.push(`${getIndentation(depth, 'left')}  ${elem.key}: ${stringify(elem.value, shift)}`)
          break
        case elem.status === 'nested':
          formatted.push(`${getIndentation(depth, 'left')}  ${elem.key}: ${formattingIteration(elem.children, shift)}`)
          break
      }
    })

    formatted.push(`${getIndentation(depth, 'right')}}`)

    return formatted.join('\n')
  }

  return formattingIteration(diff, 1)
}
