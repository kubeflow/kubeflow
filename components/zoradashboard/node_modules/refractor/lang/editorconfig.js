'use strict'

module.exports = editorconfig
editorconfig.displayName = 'editorconfig'
editorconfig.aliases = []
function editorconfig(Prism) {
  Prism.languages.editorconfig = {
    // https://editorconfig-specification.readthedocs.io/en/latest/
    comment: /[;#].*/,
    section: {
      pattern: /(^[ \t]*)\[.+\]/m,
      lookbehind: true,
      alias: 'keyword',
      inside: {
        regex: /\\\\[\[\]{},!?.*]/,
        // Escape special characters with '\\'
        operator: /[!?]|\.\.|\*{1,2}/,
        punctuation: /[\[\]{},]/
      }
    },
    property: {
      pattern: /(^[ \t]*)[^\s=]+(?=[ \t]*=)/m,
      lookbehind: true
    },
    value: {
      pattern: /=.*/,
      alias: 'string',
      inside: {
        punctuation: /^=/
      }
    }
  }
}
