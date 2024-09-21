'use strict'

function add(buf) {
  const self = this
  const lines = buf.toString('utf8').split('\n')
  let index = -1
  let line
  let forbidden
  let word
  let flag

  // Ensure there’s a key for `FORBIDDENWORD`: `false` cannot be set through an
  // affix file so it's safe to use as a magic constant.
  if (self.flags.FORBIDDENWORD === undefined) self.flags.FORBIDDENWORD = false
  flag = self.flags.FORBIDDENWORD

  while (++index < lines.length) {
    line = lines[index].trim()

    if (!line) {
      continue
    }

    line = line.split('/')
    word = line[0]
    forbidden = word.charAt(0) === '*'

    if (forbidden) {
      word = word.slice(1)
    }

    self.add(word, line[1])

    if (forbidden) {
      self.data[word].push(flag)
    }
  }

  return self
}

export default add
