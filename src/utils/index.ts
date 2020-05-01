import { createHash } from 'crypto'
import { homedir } from 'os'
import { join, resolve as solve } from 'path'

export function hash(content: string) {
  return createHash('sha256').update(content, 'utf8').digest('hex')
}

export function number(content: string) {
  return BigInt(`0x${hash(content)}`)
}

export function resolve(path: string) {
  return path[0] === '~'
    ? join(homedir(), path.slice(1))
    : solve(process.cwd(), path)
}
