"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const hasSymbol = typeof Symbol === 'function' && Symbol.for;

var _default = hasSymbol ? Symbol.for('mui.nested') : '__THEME_NESTED__';

exports.default = _default;