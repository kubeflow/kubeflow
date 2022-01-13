"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.slotShouldForwardProp = exports.rootShouldForwardProp = void 0;

var _system = require("@material-ui/system");

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

const rootShouldForwardProp = prop => (0, _system.shouldForwardProp)(prop) && prop !== 'classes';

exports.rootShouldForwardProp = rootShouldForwardProp;
const slotShouldForwardProp = _system.shouldForwardProp;
exports.slotShouldForwardProp = slotShouldForwardProp;
const styled = (0, _system.createStyled)({
  defaultTheme: _defaultTheme.default,
  rootShouldForwardProp
});
var _default = styled;
exports.default = _default;