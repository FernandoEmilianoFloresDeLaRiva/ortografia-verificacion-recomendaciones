'use strict'

export default casing

// Get the casing of `value`.
function casing(value) {
  const head = exact(value.charAt(0))
  const rest = value.slice(1)

  if (!rest) {
    return head
  }

  const restCasing = exact(rest)

  if (head === restCasing) {
    return head
  }

  if (head === 'u' && restCasing === 'l') {
    return 's'
  }

  return null
}

function exact(value) {
  return value === value.toLowerCase()
    ? 'l'
    : value === value.toUpperCase()
    ? 'u'
    : null
}
