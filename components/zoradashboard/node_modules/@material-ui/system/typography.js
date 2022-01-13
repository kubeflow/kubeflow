"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.typographyVariant = exports.textAlign = exports.lineHeight = exports.letterSpacing = exports.fontWeight = exports.fontStyle = exports.fontSize = exports.fontFamily = void 0;

var _style = _interopRequireDefault(require("./style"));

var _compose = _interopRequireDefault(require("./compose"));

const fontFamily = (0, _style.default)({
  prop: 'fontFamily',
  themeKey: 'typography'
});
exports.fontFamily = fontFamily;
const fontSize = (0, _style.default)({
  prop: 'fontSize',
  themeKey: 'typography'
});
exports.fontSize = fontSize;
const fontStyle = (0, _style.default)({
  prop: 'fontStyle',
  themeKey: 'typography'
});
exports.fontStyle = fontStyle;
const fontWeight = (0, _style.default)({
  prop: 'fontWeight',
  themeKey: 'typography'
});
exports.fontWeight = fontWeight;
const letterSpacing = (0, _style.default)({
  prop: 'letterSpacing'
});
exports.letterSpacing = letterSpacing;
const lineHeight = (0, _style.default)({
  prop: 'lineHeight'
});
exports.lineHeight = lineHeight;
const textAlign = (0, _style.default)({
  prop: 'textAlign'
});
exports.textAlign = textAlign;
const typographyVariant = (0, _style.default)({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography'
});
exports.typographyVariant = typographyVariant;
const typography = (0, _compose.default)(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign);
var _default = typography;
exports.default = _default;