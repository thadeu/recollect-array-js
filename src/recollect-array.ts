import chunk from 'lodash.chunk'
import filter from 'lodash.filter'
import last from 'lodash.last'

import Predicate from '@/predicates'

export class RecollectArray {
  static apply({ conditions, data }) {
    let clone = Array.from(data)
    let entries = Object.entries(conditions).flatMap((a) => a)
    let rules = chunk(entries, 2)

    for (let rule of rules) {
      let [field, _value]: any = rule
      let fieldable = field.split('_')
      let predicate = last(fieldable)
      let attr = field.replace(`_${predicate}`, '')
      
      clone = filter(clone, Predicate.use(predicate, attr, conditions[field]))
    }

    return clone
  }
}

export default RecollectArray
