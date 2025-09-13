const getStylishFormat = (diff) => {
  let formatted = `{\n`

  diff.forEach((elem) => {
    switch (true) {
      case elem.status === 'added':
        formatted += `  + ${elem.key}: ${elem.value}\n`
        break
      case elem.status === 'removed':
        formatted += `  - ${elem.key}: ${elem.value}\n`
        break
      case elem.status === 'changed':
        formatted += `  - ${elem.key}: ${elem.value[0]}\n`
        formatted += `  + ${elem.key}: ${elem.value[1]}\n`
        break
      case elem.status === 'unchanged':
        formatted += `    ${elem.key}: ${elem.value}\n`
        break
    }
  })

  return formatted += `}`
}

const getPlainFormat = (diff) => {
  let formatted = []

  diff.forEach((elem) => {
    switch (true) {
      case elem.status === 'added':
        formatted.push(`Property '${elem.key}' was added with value: ${elem.value}`)
        break
      case elem.status === 'removed':
        formatted.push(`Property '${elem.key}' was removed`)
        break
      case elem.status === 'changed':
        formatted.push(`Property '${elem.key}' was updated. From ${elem.value[0]} to ${elem.value[1]}`)
        break
      case elem.status === 'unchanged':
        break
    }
  })

  return formatted.join('\n')
}

export {
  getStylishFormat,
  getPlainFormat,
}
