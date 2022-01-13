var codegen = require('escodegen')
var esprima = require('esprima')
var through = require('through')

module.exports = astTransform

function astTransform(transform, opts) {
  opts = opts || {}

  return function(file) {
    var stream = through(write, flush)
    var tr     = transform(file)
    var buffer = []

    if (!tr) return through()

    return stream

    function write(data) { buffer.push(data) }
    function flush() {
      buffer = buffer.join('')

      try {
        var ast = esprima.parse(buffer, opts)
      } catch(e) {
        return stream.emit('error', e)
      }

      tr(ast, function(err, updated) {
        if (err) return stream.emit('error', err)

        try {
          var code = codegen.generate(updated || ast)
        } catch(e) {
          return stream.emit('error', e)
        }

        stream.queue(code.code || code)
        stream.queue(null)
      })
    }
  }
}
