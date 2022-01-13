"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMediaQueryTheme;

var _useMediaQuery = _interopRequireDefault(require("./useMediaQuery"));

// TODO v5: to deprecate in v4.x and remove in v5
function useMediaQueryTheme(...args) {
  return (0, _useMediaQuery.default)(...args);
}