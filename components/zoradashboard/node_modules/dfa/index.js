'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _slicedToArray = _interopDefault(require('babel-runtime/helpers/slicedToArray'));
var _getIterator = _interopDefault(require('babel-runtime/core-js/get-iterator'));
var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));
var _regeneratorRuntime = _interopDefault(require('babel-runtime/regenerator'));
var _Symbol$iterator = _interopDefault(require('babel-runtime/core-js/symbol/iterator'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));

var INITIAL_STATE = 1;
var FAIL_STATE = 0;

/**
 * A StateMachine represents a deterministic finite automaton.
 * It can perform matches over a sequence of values, similar to a regular expression.
 */

var StateMachine = function () {
  function StateMachine(dfa) {
    _classCallCheck(this, StateMachine);

    this.stateTable = dfa.stateTable;
    this.accepting = dfa.accepting;
    this.tags = dfa.tags;
  }

  /**
   * Returns an iterable object that yields pattern matches over the input sequence.
   * Matches are of the form [startIndex, endIndex, tags].
   */


  _createClass(StateMachine, [{
    key: 'match',
    value: function match(str) {
      var self = this;
      return _defineProperty({}, _Symbol$iterator, _regeneratorRuntime.mark(function _callee() {
        var state, startRun, lastAccepting, lastState, p, c;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = INITIAL_STATE;
                startRun = null;
                lastAccepting = null;
                lastState = null;
                p = 0;

              case 5:
                if (!(p < str.length)) {
                  _context.next = 21;
                  break;
                }

                c = str[p];


                lastState = state;
                state = self.stateTable[state][c];

                if (!(state === FAIL_STATE)) {
                  _context.next = 15;
                  break;
                }

                if (!(startRun != null && lastAccepting != null && lastAccepting >= startRun)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return [startRun, lastAccepting, self.tags[lastState]];

              case 13:

                // reset the state as if we started over from the initial state
                state = self.stateTable[INITIAL_STATE][c];
                startRun = null;

              case 15:

                // start a run if not in the failure state
                if (state !== FAIL_STATE && startRun == null) {
                  startRun = p;
                }

                // if accepting, mark the potential match end
                if (self.accepting[state]) {
                  lastAccepting = p;
                }

                // reset the state to the initial state if we get into the failure state
                if (state === FAIL_STATE) {
                  state = INITIAL_STATE;
                }

              case 18:
                p++;
                _context.next = 5;
                break;

              case 21:
                if (!(startRun != null && lastAccepting != null && lastAccepting >= startRun)) {
                  _context.next = 24;
                  break;
                }

                _context.next = 24;
                return [startRun, lastAccepting, self.tags[state]];

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }

    /**
     * For each match over the input sequence, action functions matching
     * the tag definitions in the input pattern are called with the startIndex,
     * endIndex, and sub-match sequence.
     */

  }, {
    key: 'apply',
    value: function apply(str, actions) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(this.match(str)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 3);

          var start = _step$value[0];
          var end = _step$value[1];
          var tags = _step$value[2];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _getIterator(tags), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var tag = _step2.value;

              if (typeof actions[tag] === 'function') {
                actions[tag](start, end, str.slice(start, end + 1));
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return StateMachine;
}();

module.exports = StateMachine;
//# sourceMappingURL=index.js.map
