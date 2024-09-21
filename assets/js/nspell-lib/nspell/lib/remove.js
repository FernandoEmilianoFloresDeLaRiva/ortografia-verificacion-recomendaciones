'use strict'

// Remove `value` from the checker.
function remove(value) {
  const self = this

  delete self.data[value]

  return self
}

export default remove
