'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = compose;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _arityN = require('arity-n');

var _arityN2 = _interopRequireDefault(_arityN);

var compose2 = function compose2(f, g) {
  return function () {
    return f(g.apply(undefined, arguments));
  };
};

function compose() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  var funcs = functions.filter(function (fn) {
    return typeof fn === 'function';
  });

  var lastIdx = funcs.length - 1;
  var arity = 0;

  if (funcs.length <= 0) {
    throw new Error('No funcs passed');
  }

  if (lastIdx >= 0 && funcs[lastIdx]) {
    arity = funcs[lastIdx].length;
  }

  return (0, _arityN2['default'])(funcs.reduce(compose2), arity);
}

module.exports = exports['default'];