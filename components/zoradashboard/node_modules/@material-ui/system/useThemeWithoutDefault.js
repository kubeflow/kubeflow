"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _privateTheming = require("@material-ui/private-theming");

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function useTheme(defaultTheme = null) {
  const contextTheme = (0, _privateTheming.useTheme)();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

var _default = useTheme;
exports.default = _default;