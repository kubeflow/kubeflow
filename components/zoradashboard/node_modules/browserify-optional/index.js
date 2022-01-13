var astTransform = require('ast-transform');
var astTypes = require('ast-types');
var path = require('path');
var resolve = require('browser-resolve');

module.exports = astTransform(function (file) {
  if (path.extname(file) !== '.js') return;

  return function(ast, next) {
    astTypes.visit(ast, {
      visitCallExpression: function(path) {
        var node = path.value;
        if (node.callee.type !== 'Identifier'
         || node.callee.name !== 'require'
         || node.arguments.length < 1
         || node.arguments[0].type !== 'Literal')
          return this.traverse(path);

        var module = node.arguments[0].value;
        var p = path;

        while (p = p.parent) {
          var parent = p.value;
          if (parent.type === 'CatchClause')
            break;

          if (parent.type === 'TryStatement') {
            try {
              resolve.sync(module, { filename: file });
            } catch (e) {
              path.replace({
                type: 'CallExpression',
                arguments: [],
                callee: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [{
                      type: 'ThrowStatement',
                      argument: {
                        type: 'NewExpression',
                        callee: {
                          type: 'Identifier',
                          name: 'Error'
                        },
                        arguments: [{
                          type: 'Literal',
                          value: e.message
                        }]
                      }
                    }]
                  }
                }
              });
            }

            break;
          }
        }

        return false;
      }
    });

    next(null, ast);
  }
});
