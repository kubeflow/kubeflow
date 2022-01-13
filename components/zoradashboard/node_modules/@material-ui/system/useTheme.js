"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.systemDefaultTheme = void 0;

var _createTheme = _interopRequireDefault(require("./createTheme"));

var _useThemeWithoutDefault = _interopRequireDefault(require("./useThemeWithoutDefault"));

const systemDefaultTheme = (0, _createTheme.default)();
exports.systemDefaultTheme = systemDefaultTheme;

function useTheme(defaultTheme = systemDefaultTheme) {
  return (0, _useThemeWithoutDefault.default)(defaultTheme);
}

var _default = useTheme;
exports.default = _default;