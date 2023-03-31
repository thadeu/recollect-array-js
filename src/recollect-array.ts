import { applyRuleObject, applyRuleValuable, isPlainObject, chunkArray } from '@/utils'

export class RecollectArray {
  static recollect = (data: any[], conditions: object): any[] => {
    let entries = Object.entries(conditions).flatMap((a) => a)
    let rules = chunkArray(entries, 2)

    for (let [ruleField, ruleValue] of rules) {
      if (isPlainObject(ruleValue)) {
        data = applyRuleObject(data, ruleField, ruleValue)
      } else {
        data = applyRuleValuable(data, ruleField, conditions[ruleField as string])
      }
    }

    return data
  }

  static filter(data: any[], conditions: object): any[] {
    let clone = Array.from(data)
    clone = this.recollect(clone, conditions)

    return clone
  }
}

export default RecollectArray
