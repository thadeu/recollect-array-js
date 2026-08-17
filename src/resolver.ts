import get from 'lodash.get'

export const WILDCARD = '*'

const INDEX = /^\d+$/

const BRACKET = /\[(\d+)\]/g

const CACHE = new Map<string, string[]>()

export type Resolved = {
  fanned: boolean
  values: any[]
}

const segmentize = (path: any): string[] => {
  const key = String(path)
  const cached = CACHE.get(key)

  if (cached) return cached

  const segments = key.replace(BRACKET, '.$1').split('.')

  CACHE.set(key, segments)

  return segments
}

const spread = (data: any, segments: string[], from: number): any[] => {
  let cursors: any[] = [data]

  for (let i = from; i < segments.length; i++) {
    const segment = segments[i]
    const next: any[] = []

    for (const cursor of cursors) {
      if (cursor === null || cursor === undefined) continue

      if (segment === WILDCARD) {
        if (Array.isArray(cursor)) {
          next.push(...cursor)
        } else {
          next.push(cursor)
        }

        continue
      }

      if (Array.isArray(cursor) && !INDEX.test(segment)) {
        for (const element of cursor) {
          if (element === null || element === undefined) continue

          next.push(element[segment])
        }

        continue
      }

      next.push(cursor[segment])
    }

    cursors = next
  }

  return cursors
}

export const resolve = (data: any, path: any): Resolved => {
  const segments = segmentize(path)

  // lodash resolves a key that literally contains a dot against the object
  // itself, before ever splitting the path
  if (segments.length > 1 && data !== null && data !== undefined && path in Object(data)) {
    return { fanned: false, values: [data[path]] }
  }

  let cursor = data
  let index = 0
  let fanned = false

  for (; index < segments.length; index++) {
    const segment = segments[index]

    if (segment === WILDCARD) {
      fanned = true
      break
    }

    if (Array.isArray(cursor) && !INDEX.test(segment)) {
      fanned = true
      break
    }

    if (cursor === null || cursor === undefined) {
      cursor = undefined
      break
    }

    cursor = cursor[segment]
  }

  if (fanned) return { fanned: true, values: spread(cursor, segments, index) }

  if (index === segments.length && cursor !== undefined) return { fanned: false, values: [cursor] }

  return { fanned: false, values: [get(data, path)] }
}

export const somewhere = (data: any, path: any, matcher: (target: any) => boolean): boolean => {
  const { fanned, values } = resolve(data, path)

  if (!fanned) return matcher(values[0])

  return values.some(matcher)
}

export default resolve
