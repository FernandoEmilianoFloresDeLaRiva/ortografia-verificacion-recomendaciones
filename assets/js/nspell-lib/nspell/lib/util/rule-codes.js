'use strict'

export default ruleCodes

const NO_CODES = []

// Parse rule codes.
function ruleCodes(flags, value) {
  let index = 0
  let result

  if (!value) return NO_CODES

  if (flags.FLAG === 'long') {
    // Creating an array of the right length immediately
    // avoiding resizes and using memory more efficiently
    result = new Array(Math.ceil(value.length / 2))

    while (index < value.length) {
      result[index / 2] = value.slice(index, index + 2)
      index += 2
    }

    return result
  }

  return value.split(flags.FLAG === 'num' ? ',' : '')
}
