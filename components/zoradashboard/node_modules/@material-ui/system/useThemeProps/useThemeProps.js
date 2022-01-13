"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useThemeProps;

var _getThemeProps = _interopRequireDefault(require("./getThemeProps"));

var _useTheme = _interopRequireDefault(require("../useTheme"));

function useThemeProps({
  props,
  name,
  defaultTheme
}) {
  const theme = (0, _useTheme.default)(defaultTheme);
  const mergedProps = (0, _getThemeProps.default)({
    theme,
    name,
    props
  });
  return mergedProps;
}