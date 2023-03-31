import filter from 'lodash.filter'
import last from 'lodash.last'
import chunk from 'lodash.chunk'
import isPlainObject from 'lodash.isplainobject'

import Predicate from '@/predicates'

export { isPlainObject }

export const chunkArray = (array: any[], size: number) => chunk(array, size)

export const filtering = (data: [], predicate: string, field: string, value: any) => {
  return filter(data, Predicate.factory(predicate, field, value))
}

export const applyRuleObject = (data, ruleField, ruleValue) => {
  for (let [predicate, value] of Object.entries(ruleValue)) {
    data = filtering(data, predicate, ruleField, value)
  }

  return data
}

export const applyRuleValuable = (data, ruleField, ruleValue) => {
  let fieldable = ruleField.split('_')
  let predicate = last(fieldable) as string
  let attr = ruleField.replace(`_${predicate}`, '')

  return filtering(data, predicate, attr, ruleValue)
}
