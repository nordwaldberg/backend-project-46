import * as path from 'node:path'
import * as fs from 'node:fs'
import { program } from 'commander'

const validateFilePath = (input) => {
  const absolutePath = path.resolve(process.cwd(), input)

  if (!path.extname(absolutePath)) {
    program.error(`Error: Invalid path: '${absolutePath}' must have a file extension`)
  }

  if (!fs.existsSync(absolutePath)) {
    program.error(`Error: File provided by '${absolutePath}' does not exist`)
  }

  if (!fs.statSync(absolutePath).isFile()) {
    program.error(`Error: '${absolutePath}' is not a file`)
  }

  return absolutePath
}

export default validateFilePath
