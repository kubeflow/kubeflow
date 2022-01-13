'use strict'

module.exports = squirrel
squirrel.displayName = 'squirrel'
squirrel.aliases = []
function squirrel(Prism) {
  Prism.languages.squirrel = Prism.languages.extend('clike', {
    comment: [
      Prism.languages.clike['comment'][0],
      {
        pattern: /(^|[^\\:])(?:\/\/|#).*/,
        lookbehind: true,
        greedy: true
      }
    ],
    string: [
      {
        pattern: /(^|[^\\"'@])(?:@"(?:[^"]|"")*"(?!")|"(?:[^\\\r\n"]|\\.)*")/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\"'])'(?:[^\\']|\\(?:[xuU][0-9a-fA-F]{0,8}|[\s\S]))'/,
        lookbehind: true,
        greedy: true
      }
    ],
    'class-name': {
      pattern: /(\b(?:class|enum|extends|instanceof)\s+)\w+(?:\.\w+)*/,
      lookbehind: true,
      inside: {
        punctuation: /\./
      }
    },
    keyword:
      /\b(?:base|break|case|catch|class|clone|const|constructor|continue|default|delete|else|enum|extends|for|foreach|function|if|in|instanceof|local|null|resume|return|static|switch|this|throw|try|typeof|while|yield|__LINE__|__FILE__)\b/,
    number: /\b(?:0x[0-9a-fA-F]+|\d+(?:\.(?:\d+|[eE][+-]?\d+))?)\b/,
    operator: /\+\+|--|<=>|<[-<]|>>>?|&&?|\|\|?|[-+*/%!=<>]=?|[~^]|::?/,
    punctuation: /[(){}\[\],;.]/
  })
  Prism.languages.insertBefore('squirrel', 'operator', {
    'attribute-punctuation': {
      pattern: /<\/|\/>/,
      alias: 'important'
    },
    lambda: {
      pattern: /@(?=\()/,
      alias: 'operator'
    }
  })
}
