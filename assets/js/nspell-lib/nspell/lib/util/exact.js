'use strict'

import flag from './flag.js'

export default exact

// Check spelling of `value`, exactly.
function exact(context, value) {
  let index = -1

  if (context.data[value]) {
    return !flag(context.flags, 'ONLYINCOMPOUND', context.data[value])
  }

  // Check if this might be a compound word.
  if (value.length >= context.flags.COMPOUNDMIN) {
    while (++index < context.compoundRules.length) {
      if (context.compoundRules[index].test(value)) {
        return true
      }
    }
  }

  return false
}
