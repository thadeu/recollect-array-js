import isFunction from 'lodash.isfunction'
import get from 'lodash.get'

const isNullOrUndefined = (value) => [undefined, null].includes(value)

const equals = (data, field, value) => get(data, field) == value

const contains = (data, field, value) => {
  const target = get(data, field)

  let startRegex = /^([^*])(\w*)([*])$/
  let endRegex = /^([*])(\w*)([^*])$/
  let includeRegex = /^\*\w*\*$/

  if (value.match(startRegex)) {
    return target.startsWith(value.replace(/\*$/, ''))
  } else if (value.match(endRegex)) {
    return target.endsWith(value.replace(/^\*/, ''))
  } else if (value.match(includeRegex)) {
    return target.includes(value.replace(/^\*/, '').replace(/\*$/, ''))
  } else {
    return false
  }
}

export class Predicate {
  static PREDICATES = ['eq', 'not_eq', 'gte', 'lte', 'gt', 'lt', 'matches', 'not_matches', 'in', 'not_in', 'cont', 'not_cont']

  static factory(predicate, field, value) {
    if (!this.PREDICATES.includes(predicate)) return undefined
    if (!this[predicate]) return undefined

    if (isFunction(value)) {
      value = value()
    }

    return this[predicate](field, value)
  }

  static matches(field, value) {
    return function (data) {
      let target = [get(data, field)].flatMap((o) => o)
      value = [value].flatMap((o) => o)

      return value.some((o: any) => target.includes(o))
    }
  }

  static not_matches(field, value) {
    return !this.matches(field, value)
  }

  static in(field, value) {
    return this.matches(field, value)
  }

  static not_in(field, value) {
    return !this.in(field, value)
  }

  static eq(field, value) {
    return function (data) {
      return equals(data, field, value)
    }
  }

  static not_eq(field, value) {
    return function (data) {
      return !equals(data, field, value)
    }
  }

  static gte(field, value) {
    return function (data) {
      const target = get(data, field)

      return target >= value
    }
  }

  static gt(field, value) {
    return function (data) {
      const target = get(data, field)

      return target > value
    }
  }

  static lte(field, value) {
    return function (data) {
      const target = get(data, field)

      return target <= value
    }
  }

  static lt(field, value) {
    return function (data) {
      const target = get(data, field)

      return target < value
    }
  }

  static cont(field, value) {
    return function (data) {
      return contains(data, field, value)
    }
  }

  static not_cont(field, value) {
    return function (data) {
      return !contains(data, field, value)
    }
  }
}

export default Predicate
