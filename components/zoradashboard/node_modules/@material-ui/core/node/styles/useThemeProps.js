"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useThemeProps;

var _system = require("@material-ui/system");

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function useThemeProps({
  props,
  name
}) {
  return (0, _system.useThemeProps)({
    props,
    name,
    defaultTheme: _defaultTheme.default
  });
}