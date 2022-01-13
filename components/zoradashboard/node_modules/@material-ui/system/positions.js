"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.left = exports.bottom = exports.right = exports.top = exports.zIndex = exports.position = void 0;

var _style = _interopRequireDefault(require("./style"));

var _compose = _interopRequireDefault(require("./compose"));

const position = (0, _style.default)({
  prop: 'position'
});
exports.position = position;
const zIndex = (0, _style.default)({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
exports.zIndex = zIndex;
const top = (0, _style.default)({
  prop: 'top'
});
exports.top = top;
const right = (0, _style.default)({
  prop: 'right'
});
exports.right = right;
const bottom = (0, _style.default)({
  prop: 'bottom'
});
exports.bottom = bottom;
const left = (0, _style.default)({
  prop: 'left'
});
exports.left = left;

var _default = (0, _compose.default)(position, zIndex, top, right, bottom, left);

exports.default = _default;