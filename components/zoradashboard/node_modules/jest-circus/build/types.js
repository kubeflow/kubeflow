'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.TEST_TIMEOUT_SYMBOL = exports.RETRY_TIMES = exports.STATE_SYM = void 0;

var _expect = _interopRequireDefault(require('expect'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
const STATE_SYM = Symbol('JEST_STATE_SYMBOL');
exports.STATE_SYM = STATE_SYM;
const RETRY_TIMES = Symbol.for('RETRY_TIMES'); // To pass this value from Runtime object to state we need to use global[sym]

exports.RETRY_TIMES = RETRY_TIMES;
const TEST_TIMEOUT_SYMBOL = Symbol.for('TEST_TIMEOUT_SYMBOL');
exports.TEST_TIMEOUT_SYMBOL = TEST_TIMEOUT_SYMBOL;
