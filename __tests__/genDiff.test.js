import { expect, test } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'node:fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixtureFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

const stylish = readFixtureFile('stylish-result.txt')

test('Should compare JSON files with stylish option', () => {
  const file1 = getFixturePath('file1.json').trim()
  const file2 = getFixturePath('file2.json').trim()

  expect(genDiff(file1, file2)).toEqual(stylish)
})

test('Should compare YAML files (with different file ext) with stylish option', () => {
  const file1 = getFixturePath('file1.yaml').trim()
  const file2 = getFixturePath('file2.yml').trim()

  expect(genDiff(file1, file2)).toEqual(stylish)
})
