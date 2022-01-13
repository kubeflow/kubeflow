'use strict'

module.exports = dataweave
dataweave.displayName = 'dataweave'
dataweave.aliases = []
function dataweave(Prism) {
  ;(function (Prism) {
    Prism.languages.dataweave = {
      url: /\b[A-Za-z]+:\/\/[\w/:.?=&-]+|\burn:[\w:.?=&-]+/,
      property: {
        pattern: /(?:\b\w+#)?(?:"(?:\\.|[^\\"\r\n])*"|\b\w+)(?=\s*[:@])/,
        greedy: true
      },
      string: {
        pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
        greedy: true
      },
      'mime-type':
        /\b(?:text|audio|video|application|multipart|image)\/[\w+-]+/,
      date: {
        pattern: /\|[\w:+-]+\|/,
        greedy: true
      },
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      regex: {
        pattern: /\/(?:[^\\\/\r\n]|\\[^\r\n])+\//,
        greedy: true
      },
      function: /\b[A-Z_]\w*(?=\s*\()/i,
      number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      punctuation: /[{}[\];(),.:@]/,
      operator: /<<|>>|->|[<>~=]=?|!=|--?-?|\+\+?|!|\?/,
      boolean: /\b(?:true|false)\b/,
      keyword:
        /\b(?:match|input|output|ns|type|update|null|if|else|using|unless|at|is|as|case|do|fun|var|not|and|or)\b/
    }
  })(Prism)
}
