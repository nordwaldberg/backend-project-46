#!/usr/bin/env node

import { program } from 'commander'
import genDiff from '../index.js'
import validateFilePath from '../src/utils/validateFilePath.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .usage('[options] <filepath1> <filepath2>')

program
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    const validFilepath1 = validateFilePath(filepath1)
    const validFilepath2 = validateFilePath(filepath2)

    console.log(genDiff(validFilepath1, validFilepath2, options.format))
  })

program.parse()
