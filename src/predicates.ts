import isEmpty from 'lodash.isempty'

export class Predicate {
  static PREDICATES = ['eq', 'range', 'gte', 'lte', 'gt', 'lt', 'matches', 'cont']

  static use(predicate, field, value) {
    if (isEmpty(value.toString())) return undefined
    if (!this.PREDICATES.includes(predicate)) return undefined
    if (!this[predicate]) return undefined

    return this[predicate](field, value)
  }

  static matches(field, value) {
    return function (data) {
      return value.includes(data[field])
    }
  }

  static eq(field, value) {
    return function (data) {
      return data[field] == value
    }
  }

  static range(field, value) {
    return function (data) {
      const { start, end } = value
      const target = data[field]

      return target >= start && target <= end
    }
  }

  static gte(field, value) {
    return function (data) {
      const target = data[field]

      return target >= value
    }
  }

  static gt(field, value) {
    return function (data) {
      const target = data[field]

      return target > value
    }
  }

  static lte(field, value) {
    return function (data) {
      const target = data[field]

      return target <= value
    }
  }

  static lt(field, value) {
    return function (data) {
      const target = data[field]

      return target < value
    }
  }

  static cont(field, value) {
    return function (data) {
      const target = data[field]

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
  }
}

export default Predicate
