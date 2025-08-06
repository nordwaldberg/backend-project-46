import * as path from 'node:path'
import * as fs from 'node:fs'
import { program } from 'commander'

const validateFilePath = (input) => {
  const absolutePath = path.resolve(input)

  if (!path.extname(input)) {
    program.error(`Error: Invalid path: '${input}' must have a file extension`)
  }

  if (!fs.existsSync(absolutePath)) {
    program.error(`Error: File provided by '${input}' does not exist`)
  }

  if (!fs.statSync(absolutePath).isFile()) {
    program.error(`Error: '${input}' is not a file`)
  }

  return absolutePath
}

export default validateFilePath
