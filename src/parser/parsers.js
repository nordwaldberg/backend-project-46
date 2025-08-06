import * as fs from 'node:fs'
import * as YAML from 'yaml'

const parseJson = data => JSON.parse(fs.readFileSync(data, 'utf8'))

const parseYaml = data => YAML.parse(fs.readFileSync(data, 'utf8'))

export {
  parseJson,
  parseYaml,
}
