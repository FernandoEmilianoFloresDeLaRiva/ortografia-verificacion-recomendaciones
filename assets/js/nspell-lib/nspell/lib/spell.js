'use strict'

import form from './util/form.js'
import flag from './util/flag.js'

// Check spelling of `word`.
function spell(word) {
  const self = this
  const value = form(self, word, true)

  // Hunspell also provides `root` (root word of the input word), and `compound`
  // (whether `word` was compound).
  return {
    correct: self.correct(word),
    forbidden: Boolean(
      value && flag(self.flags, 'FORBIDDENWORD', self.data[value])
    ),
    warn: Boolean(value && flag(self.flags, 'WARN', self.data[value]))
  }
}

export default spell
