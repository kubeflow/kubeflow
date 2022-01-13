# ast-transform [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/ast-transform&title=ast-transform&description=hughsk/ast-transform%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Convenience wrapper for performing AST transformations with
[browserify](http://browserify.org/) transform streams. Note that it doesn't
handle source maps nicely, though pull requests are welcome!

## Usage ##

[![ast-transform](https://nodei.co/npm/ast-transform.png?mini=true)](https://nodei.co/npm/ast-transform)

### `ast(transform[, opts])` ###

Where `transform` is a function that takes a filename and returns a function,
e.g.:

``` javascript
var replace = require('replace-method')
var ast = require('ast-transform')
var path = require('path')

module.exports = ast(function (file) {
  if (path.extname(file) !== '.js') return

  return function(ast, done) {
    // replace require calls with
    // strings for some reason
    replace(ast)(['require'], function(node) {
      return { type: 'Literal', value: 'replaced!' }
    })

    done()
  }
})
```

Note that you can return a falsey value instead of a function to bail the
stream early and avoid the parse/deparse overhead. Here's an example of using
the above with browserify:

``` javascript
var browserify = require('browserify')
var example = require('./example')
var fs = require('fs')

browserify('./index.js')
  .transform(example)
  .bundle()
  .pipe(fs.createWriteStream(__filename + '/bundle.js'))
```

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/ast-transform/blob/master/LICENSE.md) for details.
