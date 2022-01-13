"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _style = _interopRequireDefault(require("./style"));

const boxShadow = (0, _style.default)({
  prop: 'boxShadow',
  themeKey: 'shadows'
});
var _default = boxShadow;
exports.default = _default;