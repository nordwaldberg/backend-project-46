import * as path from 'node:path'
import { parseJson, parseYaml } from './parsers.js'
import { program } from 'commander'

const VALID_FILE_EXTENSIONS = {
  JSON: ['.json'],
  YAML: ['.yaml', '.yml'],
}

export const parse = (filepath) => {
  const fileExtension = path.extname(filepath)

  switch (true) {
    case VALID_FILE_EXTENSIONS.JSON.includes(fileExtension):
      return parseJson(filepath)
    case VALID_FILE_EXTENSIONS.YAML.includes(fileExtension):
      return parseYaml(filepath)
    default:
      program.error(`Error: Unsupported file extension: ${fileExtension}`)
  }
}
