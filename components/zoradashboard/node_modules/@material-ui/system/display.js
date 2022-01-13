"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.whiteSpace = exports.visibility = exports.textOverflow = exports.overflow = exports.displayRaw = exports.displayPrint = void 0;

var _style = _interopRequireDefault(require("./style"));

var _compose = _interopRequireDefault(require("./compose"));

const displayPrint = (0, _style.default)({
  prop: 'displayPrint',
  cssProperty: false,
  transform: value => ({
    '@media print': {
      display: value
    }
  })
});
exports.displayPrint = displayPrint;
const displayRaw = (0, _style.default)({
  prop: 'display'
});
exports.displayRaw = displayRaw;
const overflow = (0, _style.default)({
  prop: 'overflow'
});
exports.overflow = overflow;
const textOverflow = (0, _style.default)({
  prop: 'textOverflow'
});
exports.textOverflow = textOverflow;
const visibility = (0, _style.default)({
  prop: 'visibility'
});
exports.visibility = visibility;
const whiteSpace = (0, _style.default)({
  prop: 'whiteSpace'
});
exports.whiteSpace = whiteSpace;

var _default = (0, _compose.default)(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);

exports.default = _default;