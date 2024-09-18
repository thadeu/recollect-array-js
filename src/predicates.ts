import isFunction from 'lodash.isfunction'
import get from 'lodash.get'

const equals = (data, field, value) => get(data, field) == value

const contains = (data, field, value) => {
  const target = get(data, field)

  let startRegex = /^([^*])(\w*)([*])$/
  let endRegex = /^([*])(\w*)([^*])$/
  let includeRegex = /^\*\w*\*$/

  if (value.match(startRegex)) {
    return String(target).startsWith(value.replace(/\*$/, ''))
  } else if (value.match(endRegex)) {
    return String(target).endsWith(value.replace(/^\*/, ''))
  } else if (value.match(includeRegex)) {
    return String(target).includes(value.replace(/^\*/, '').replace(/\*$/, ''))
  } else {
    return false
  }
}

export class Predicate {
  static PREDICATES = [
    'eq',
    'not_eq',
    'gte',
    'lte',
    'gt',
    'lt',
    'matches',
    'not_matches',
    'in',
    'not_in',
    'cont',
    'not_cont',
    'starts_with',
    'not_starts_with',
    'st',
    'not_st',
    'exists',
    'not_exists',
    'ex',
    'not_ex'
  ]

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

  static exists(field, value) {
    return (data) => {
      if (String(value) == 'true') {
        return this.not_in(field, ['', null, undefined])(data)
      } else {
        return this.in(field, ['', null, undefined])(data)
      }
    }
  }

  static not_exists(field, value) {
    return (data) => {
      return this.exists(field, false)(data)
    }
  }

  static ex(field, value) {
    return (data) => {
      return this.exists(field, true)(data)
    }
  }

  static not_ex(field, value) {
    return (data) => {
      return this.exists(field, false)(data)
    }
  }

  static in(field, value) {
    return (data) => {
      return this.matches(field, value)(data)
    }
  }

  static not_in(field, value) {
    return (data) => {
      return !this.matches(field, value)(data)
    }
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

  static starts_with(field, value) {
    return function(data) {
      return contains(data, field, `${value}*`)
    }
  }

  static not_starts_with(field, value) {
    return function(data) {
      return !contains(data, field, `${value}*`)
    }
  }

  static st(field, value) {
    return function(data) {
      return contains(data, field, `${value}*`)
    }
  }

  static not_st(field, value) {
    return function(data) {
      return !contains(data, field, `${value}*`)
    }
  }
}

export default Predicate
