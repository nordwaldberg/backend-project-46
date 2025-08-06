import _ from 'lodash'

const getDiff = (objA, objB) => {
  const allKeys = [...new Set([...Object.keys(objA), ...Object.keys(objB)])].sort()

  return allKeys.map((key) => {
    switch (true) {
      case !Object.hasOwn(objA, key) && Object.hasOwn(objB, key):
        return { key, value: objB[key], status: 'added' }
      case Object.hasOwn(objA, key) && !Object.hasOwn(objB, key):
        return { key, value: objA[key], status: 'removed' }
      case _.isPlainObject(objA[key]) && _.isPlainObject(objB[key]):
        return { key, children: getDiff(objA[key], objB[key]), status: 'nested' }
      case objA[key] !== objB[key]:
        return { key, value: [objA[key], objB[key]], status: 'changed' }
      default:
        return { key, value: objB[key], status: 'unchanged' }
    }
  })
}

export default getDiff
