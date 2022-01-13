'use strict'

module.exports = http
http.displayName = 'http'
http.aliases = []
function http(Prism) {
  ;(function (Prism) {
    Prism.languages.http = {
      'request-line': {
        pattern:
          /^(?:GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\s(?:https?:\/\/|\/)\S*\sHTTP\/[0-9.]+/m,
        inside: {
          // HTTP Method
          method: {
            pattern: /^[A-Z]+\b/,
            alias: 'property'
          },
          // Request Target e.g. http://example.com, /path/to/file
          'request-target': {
            pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
            lookbehind: true,
            alias: 'url',
            inside: Prism.languages.uri
          },
          // HTTP Version
          'http-version': {
            pattern: /^(\s)HTTP\/[0-9.]+/,
            lookbehind: true,
            alias: 'property'
          }
        }
      },
      'response-status': {
        pattern: /^HTTP\/[0-9.]+ \d+ .+/m,
        inside: {
          // HTTP Version
          'http-version': {
            pattern: /^HTTP\/[0-9.]+/,
            alias: 'property'
          },
          // Status Code
          'status-code': {
            pattern: /^(\s)\d+(?=\s)/,
            lookbehind: true,
            alias: 'number'
          },
          // Reason Phrase
          'reason-phrase': {
            pattern: /^(\s).+/,
            lookbehind: true,
            alias: 'string'
          }
        }
      },
      // HTTP header name
      'header-name': {
        pattern: /^[\w-]+:(?=.)/m,
        alias: 'keyword'
      }
    } // Create a mapping of Content-Type headers to language definitions
    var langs = Prism.languages
    var httpLanguages = {
      'application/javascript': langs.javascript,
      'application/json': langs.json || langs.javascript,
      'application/xml': langs.xml,
      'text/xml': langs.xml,
      'text/html': langs.html,
      'text/css': langs.css
    } // Declare which types can also be suffixes
    var suffixTypes = {
      'application/json': true,
      'application/xml': true
    }
    /**
     * Returns a pattern for the given content type which matches it and any type which has it as a suffix.
     *
     * @param {string} contentType
     * @returns {string}
     */
    function getSuffixPattern(contentType) {
      var suffix = contentType.replace(/^[a-z]+\//, '')
      var suffixPattern = '\\w+/(?:[\\w.-]+\\+)+' + suffix + '(?![+\\w.-])'
      return '(?:' + contentType + '|' + suffixPattern + ')'
    } // Insert each content type parser that has its associated language
    // currently loaded.
    var options
    for (var contentType in httpLanguages) {
      if (httpLanguages[contentType]) {
        options = options || {}
        var pattern = suffixTypes[contentType]
          ? getSuffixPattern(contentType)
          : contentType
        options[contentType.replace(/\//g, '-')] = {
          pattern: RegExp(
            '(content-type:\\s*' +
              pattern +
              '(?:(?:\\r\\n?|\\n).+)*)(?:\\r?\\n|\\r){2}[\\s\\S]*',
            'i'
          ),
          lookbehind: true,
          inside: httpLanguages[contentType]
        }
      }
    }
    if (options) {
      Prism.languages.insertBefore('http', 'header-name', options)
    }
  })(Prism)
}
