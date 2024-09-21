/**
 * @typedef Dictionary
 *   Hunspell dictionary.
 * @property {Uint8Array} aff
 *   Data for the affix file (defines the language, keyboard, flags, and more).
 * @property {Uint8Array} dic
 *   Data for the dictionary file (contains words and flags applying to those words).
 */
// index.js
const affResponse = await fetch(new URL('index.aff', import.meta.url));
const dicResponse = await fetch(new URL('index.dic', import.meta.url));

if (!affResponse.ok || !dicResponse.ok) {
  throw new Error('Error al cargar los archivos del diccionario');
}

// Carga como texto
const aff = await affResponse.text();
const dic = await dicResponse.text();

/** @typedef {Object} Dictionary
 * @property {string} aff - Data for the affix file.
 * @property {string} dic - Data for the dictionary file.
 */
const dictionary = { aff, dic };

export default dictionary;

