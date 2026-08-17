import isFunction from 'lodash.isfunction'

import { resolve, somewhere } from '@/resolver'

const BLANK = ['', null, undefined]

const EMPTY = [null, undefined, NaN, '', ' ']

const equals = (data, field, value) => somewhere(data, field, (target) => target == value)

const matching = (target, value) => {
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

const contains = (data, field, value) => somewhere(data, field, (target) => matching(target, value))

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
    'not_ex',
    'len',
    'regex',
    'not_regex',
    'reg',
    'not_reg',
    'empty'
  ]

  static factory(predicate, field, value) {
    if (!this.PREDICATES.includes(predicate)) return undefined
    if (!this[predicate]) return undefined

    if (isFunction(value)) {
      value = value()
    }

    return this[predicate](field, value)
  }

  static empty(field, value) {
    return function (data) {
      let { fanned, values } = resolve(data, field)
      let blank = (target) => EMPTY.includes(target)
      let result = fanned ? values.length === 0 || values.some(blank) : blank(values[0])

      if (value) {
        return result
      }

      return !result
    }
  }

  static len(field, value) {
    return function (data) {
      return somewhere(data, field, (target) => value > String(target).length)
    }
  }

  static regex(field, value) {
    return function (data) {
      return somewhere(data, field, (target) => new RegExp(value, 'g').test(target))
    }
  }

  static reg(field, value) {
    return this.regex(field, value)
  }

  static not_reg(field, value) {
    return this.not_regex(field, value)
  }

  static not_regex(field, value) {
    return (data) => {
      return !this.regex(field, value)(data)
    }
  }

  static matches(field, value) {
    return function (data) {
      let { fanned, values } = resolve(data, field)
      let target = (fanned ? values : [values[0]]).flatMap((o) => o)
      let expected = [value].flatMap((o) => o)

      return expected.some((o: any) => target.includes(o))
    }
  }

  static not_matches(field, value) {
    return (data) => {
      return !this.matches(field, value)(data)
    }
  }

  static exists(field, value) {
    return (data) => {
      let wanted = String(value) == 'true'
      let { fanned, values } = resolve(data, field)

      if (fanned) {
        let present = values.some((target) => !BLANK.includes(target))

        return wanted ? present : !present
      }

      if (wanted) {
        return this.not_in(field, BLANK)(data)
      }

      return this.in(field, BLANK)(data)
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
      return somewhere(data, field, (target) => Number(target) >= value)
    }
  }

  static gt(field, value) {
    return function (data) {
      return somewhere(data, field, (target) => Number(target) > value)
    }
  }

  static lte(field, value) {
    return function (data) {
      return somewhere(data, field, (target) => Number(target) <= value)
    }
  }

  static lt(field, value) {
    return function (data) {
      return somewhere(data, field, (target) => Number(target) < value)
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
    return function (data) {
      return contains(data, field, `${value}*`)
    }
  }

  static not_starts_with(field, value) {
    return function (data) {
      return !contains(data, field, `${value}*`)
    }
  }

  static st(field, value) {
    return function (data) {
      return contains(data, field, `${value}*`)
    }
  }

  static not_st(field, value) {
    return function (data) {
      return !contains(data, field, `${value}*`)
    }
  }
}

export default Predicate
