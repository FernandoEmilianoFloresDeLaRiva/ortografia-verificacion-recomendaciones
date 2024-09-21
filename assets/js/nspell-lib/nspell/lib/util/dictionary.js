'use strict'

import parseCodes from './rule-codes.js'
import add from './add.js'

export default parse

// Expressions.
const whiteSpaceExpression = /\s/g

// Parse a dictionary.
function parse(buf, options, dict) {
  // Parse as lines (ignoring the first line).
  const value = buf.toString('utf8')
  let last = value.indexOf('\n') + 1
  let index = value.indexOf('\n', last)

  while (index > -1) {
    // Some dictionaries use tabs as comments.
    if (value.charCodeAt(last) !== 9 /* `\t` */) {
      parseLine(value.slice(last, index), options, dict)
    }

    last = index + 1
    index = value.indexOf('\n', last)
  }

  parseLine(value.slice(last), options, dict)
}

// Parse a line in dictionary.
function parseLine(line, options, dict) {
  let slashOffset = line.indexOf('/')
  const hashOffset = line.indexOf('#')
  let codes = ''
  let word
  let result

  // Find offsets.
  while (
    slashOffset > -1 &&
    line.charCodeAt(slashOffset - 1) === 92 /* `\` */
  ) {
    line = line.slice(0, slashOffset - 1) + line.slice(slashOffset)
    slashOffset = line.indexOf('/', slashOffset)
  }

  // Handle hash and slash offsets.
  // Note that hash can be a valid flag, so we should not just discard
  // everything after it.
  if (hashOffset > -1) {
    if (slashOffset > -1 && slashOffset < hashOffset) {
      word = line.slice(0, slashOffset)
      whiteSpaceExpression.lastIndex = slashOffset + 1
      result = whiteSpaceExpression.exec(line)
      codes = line.slice(slashOffset + 1, result ? result.index : undefined)
    } else {
      word = line.slice(0, hashOffset)
    }
  } else if (slashOffset > -1) {
    word = line.slice(0, slashOffset)
    codes = line.slice(slashOffset + 1)
  } else {
    word = line
  }

  word = word.trim()

  if (word) {
    add(dict, word, parseCodes(options.flags, codes.trim()), options)
  }
}
