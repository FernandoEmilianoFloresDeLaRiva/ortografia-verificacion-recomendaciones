'use strict'

import buffer from '../../is-buffer/index.js'
import affix from './util/affix.js'
import correct from './correct.js'
import suggest from './suggest.js'
import spell from './spell.js'
import add from './add.js'
import remove from './remove.js'
import wordCharacters from './word-characters.js'
import dictionary from './dictionary.js'
import personal from './personal.js'

// Construct a new spelling context.
function NSpell(aff, dic) {
  let index = -1
  let dictionaries

  if (!(this instanceof NSpell)) {
    return new NSpell(aff, dic)
  }

  if (typeof aff === 'string' || buffer(aff)) {
    if (typeof dic === 'string' || buffer(dic)) {
      dictionaries = [{ dic: dic }]
    }
  } else if (aff) {
    if ('length' in aff) {
      dictionaries = aff
      aff = aff[0] && aff[0].aff
    } else {
      if (aff.dic) {
        dictionaries = [aff]
      }

      aff = aff.aff
    }
  }

  if (!aff) {
    throw new Error('Missing `aff` in dictionary')
  }

  aff = affix(aff)

  this.data = Object.create(null)
  this.compoundRuleCodes = aff.compoundRuleCodes
  this.replacementTable = aff.replacementTable
  this.conversion = aff.conversion
  this.compoundRules = aff.compoundRules
  this.rules = aff.rules
  this.flags = aff.flags

  if (dictionaries) {
    while (++index < dictionaries.length) {
      if (dictionaries[index].dic) {
        this.dictionary(dictionaries[index].dic)
      }
    }
  }
}

// Assigning methods to the prototype
NSpell.prototype.correct = correct
NSpell.prototype.suggest = suggest
NSpell.prototype.spell = spell
NSpell.prototype.add = add
NSpell.prototype.remove = remove
NSpell.prototype.wordCharacters = wordCharacters
NSpell.prototype.dictionary = dictionary
NSpell.prototype.personal = personal

export default NSpell
