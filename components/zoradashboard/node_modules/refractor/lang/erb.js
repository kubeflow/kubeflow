'use strict'
var refractorRuby = require('./ruby.js')
var refractorMarkupTemplating = require('./markup-templating.js')
module.exports = erb
erb.displayName = 'erb'
erb.aliases = []
function erb(Prism) {
  Prism.register(refractorRuby)
  Prism.register(refractorMarkupTemplating)
  ;(function (Prism) {
    Prism.languages.erb = Prism.languages.extend('ruby', {})
    Prism.languages.insertBefore('erb', 'comment', {
      delimiter: {
        pattern: /^<%=?|%>$/,
        alias: 'punctuation'
      }
    })
    Prism.hooks.add('before-tokenize', function (env) {
      var erbPattern =
        /<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/gm
      Prism.languages['markup-templating'].buildPlaceholders(
        env,
        'erb',
        erbPattern
      )
    })
    Prism.hooks.add('after-tokenize', function (env) {
      Prism.languages['markup-templating'].tokenizePlaceholders(env, 'erb')
    })
  })(Prism)
}
