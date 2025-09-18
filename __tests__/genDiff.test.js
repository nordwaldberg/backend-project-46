import { describe, expect, test } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'node:fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixtureFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

const stylish = readFixtureFile('stylish-result.txt')
const plain = readFixtureFile('plain-result.txt')
const json = readFixtureFile('json-result.txt')

describe('Should support JSON files', () => {
  test('Should compare without style option', () => {
    const file1 = getFixturePath('file1.json').trim()
    const file2 = getFixturePath('file2.json').trim()

    expect(genDiff(file1, file2)).toEqual(stylish)
  })

  test('Should compare with \'stylish\' style option', () => {
    const file1 = getFixturePath('file1.json').trim()
    const file2 = getFixturePath('file2.json').trim()
    const result = genDiff(file1, file2, 'stylish')
    console.log(result)
    expect(result).toEqual(stylish)
  })

  test('Should compare with \'plain\' style option', () => {
    const file1 = getFixturePath('file1.json').trim()
    const file2 = getFixturePath('file2.json').trim()

    expect(genDiff(file1, file2, 'plain')).toEqual(plain)
  })

  test('Should compare with \'json\' style option', () => {
    const file1 = getFixturePath('file1.json').trim()
    const file2 = getFixturePath('file2.json').trim()

    expect(genDiff(file1, file2, 'json')).toEqual(json)
  })
})

describe('Should support YAML files (+ with \'different\' file extensions)', () => {
  test('Should compare without style option', () => {
    const file1 = getFixturePath('file1.yaml').trim()
    const file2 = getFixturePath('file2.yml').trim()

    expect(genDiff(file1, file2)).toEqual(stylish)
  })

  test('Should compare with \'stylish\' style option', () => {
    const file1 = getFixturePath('file1.yaml').trim()
    const file2 = getFixturePath('file2.yml').trim()

    expect(genDiff(file1, file2, 'stylish')).toEqual(stylish)
  })

  test('Should compare with \'plain\' style option', () => {
    const file1 = getFixturePath('file1.yaml').trim()
    const file2 = getFixturePath('file2.yml').trim()
    console.log(plain)
    expect(genDiff(file1, file2, 'plain')).toEqual(plain)
  })

  test('Should compare with \'json\' style option', () => {
    const file1 = getFixturePath('file1.yaml').trim()
    const file2 = getFixturePath('file2.yml').trim()
    console.log(plain)
    expect(genDiff(file1, file2, 'json')).toEqual(json)
  })
})

describe('Should support files with different extensions', () => {
  test('Should compare without style option', () => {
    const file1 = getFixturePath('file1.json').trim()
    const file2 = getFixturePath('file2.yml').trim()

    expect(genDiff(file1, file2)).toEqual(stylish)
  })

  test('Should compare with \'stylish\' style option', () => {
    const file1 = getFixturePath('file1.json').trim()
    const file2 = getFixturePath('file2.yml').trim()
    const result = genDiff(file1, file2, 'stylish')
    console.log(result)
    expect(result).toEqual(stylish)
  })

  test('Should compare with \'plain\' style option', () => {
    const file1 = getFixturePath('file1.json').trim()
    const file2 = getFixturePath('file2.yml').trim()

    expect(genDiff(file1, file2, 'plain')).toEqual(plain)
  })

  test('Should compare with \'json\' style option', () => {
    const file1 = getFixturePath('file1.json').trim()
    const file2 = getFixturePath('file2.yml').trim()

    expect(genDiff(file1, file2, 'json')).toEqual(json)
  })
})
