'use strict'

import form from './util/form.js'

// Check spelling of `value`.
function correct(value) {
  return Boolean(form(this, value))
}

export default correct
