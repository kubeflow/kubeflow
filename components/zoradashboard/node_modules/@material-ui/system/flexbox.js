"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.justifySelf = exports.justifyItems = exports.alignSelf = exports.flexShrink = exports.flexGrow = exports.flex = exports.order = exports.alignContent = exports.alignItems = exports.justifyContent = exports.flexWrap = exports.flexDirection = exports.flexBasis = void 0;

var _style = _interopRequireDefault(require("./style"));

var _compose = _interopRequireDefault(require("./compose"));

const flexBasis = (0, _style.default)({
  prop: 'flexBasis'
});
exports.flexBasis = flexBasis;
const flexDirection = (0, _style.default)({
  prop: 'flexDirection'
});
exports.flexDirection = flexDirection;
const flexWrap = (0, _style.default)({
  prop: 'flexWrap'
});
exports.flexWrap = flexWrap;
const justifyContent = (0, _style.default)({
  prop: 'justifyContent'
});
exports.justifyContent = justifyContent;
const alignItems = (0, _style.default)({
  prop: 'alignItems'
});
exports.alignItems = alignItems;
const alignContent = (0, _style.default)({
  prop: 'alignContent'
});
exports.alignContent = alignContent;
const order = (0, _style.default)({
  prop: 'order'
});
exports.order = order;
const flex = (0, _style.default)({
  prop: 'flex'
});
exports.flex = flex;
const flexGrow = (0, _style.default)({
  prop: 'flexGrow'
});
exports.flexGrow = flexGrow;
const flexShrink = (0, _style.default)({
  prop: 'flexShrink'
});
exports.flexShrink = flexShrink;
const alignSelf = (0, _style.default)({
  prop: 'alignSelf'
});
exports.alignSelf = alignSelf;
const justifyItems = (0, _style.default)({
  prop: 'justifyItems'
});
exports.justifyItems = justifyItems;
const justifySelf = (0, _style.default)({
  prop: 'justifySelf'
});
exports.justifySelf = justifySelf;
const flexbox = (0, _compose.default)(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var _default = flexbox;
exports.default = _default;