import get from 'lodash.get'

export const WILDCARD = '*'

const INDEX = /^\d+$/

const BRACKET = /\[(\d+)\]/g

export type Resolved = {
  fanned: boolean
  values: any[]
}

const segmentize = (path: any): string[] => String(path).replace(BRACKET, '.$1').split('.')

export const resolve = (data: any, path: any): Resolved => {
  const segments = segmentize(path)

  let fanned = segments.includes(WILDCARD)
  let cursors: any[] = [data]

  for (const segment of segments) {
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
        fanned = true

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

  if (!fanned) return { fanned: false, values: [get(data, path)] }

  return { fanned: true, values: cursors }
}

export const somewhere = (data: any, path: any, matcher: (target: any) => boolean): boolean => {
  const { fanned, values } = resolve(data, path)

  if (!fanned) return matcher(values[0])

  return values.some(matcher)
}

export default resolve
