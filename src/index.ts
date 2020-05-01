import { readFileSync } from 'fs'
import candidates from './assets/candidates.json'
import { hash, number, resolve } from './utils'

if (!process.argv[2]) {
  console.error('usage:  node dist/index.js <path>')
  process.exit(4096)
}

const path = resolve(process.argv[2])
const seed = readFileSync(path, { encoding: 'utf8'})
const standard = number(seed)
const results = candidates
  .map(name => ({ name, number: number(name) }))
  .map(({ name, number }) => ({ name, distance: number > standard ? number - standard : standard - number }))

console.log('standard: %s', hash(seed))
console.table(results.sort((p, n) => p.distance > n.distance ? 1 : -1))
