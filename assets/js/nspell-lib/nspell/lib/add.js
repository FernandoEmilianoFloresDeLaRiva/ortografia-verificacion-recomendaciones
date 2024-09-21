'use strict'

import push from './util/add.js'

const NO_CODES = []

// Add `value` to the checker.
function add(value, model) {
  const self = this

  push(self.data, value, self.data[model] || NO_CODES, self)

  return self
}

export default add
