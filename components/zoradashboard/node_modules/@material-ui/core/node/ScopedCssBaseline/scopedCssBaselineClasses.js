"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScopedCssBaselineUtilityClass = getScopedCssBaselineUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getScopedCssBaselineUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiScopedCssBaseline', slot);
}

const scopedCssBaselineClasses = (0, _unstyled.generateUtilityClasses)('MuiScopedCssBaseline', ['root']);
var _default = scopedCssBaselineClasses;
exports.default = _default;