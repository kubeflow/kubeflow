"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFabUtilityClass = getFabUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getFabUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiFab', slot);
}

const fabClasses = (0, _unstyled.generateUtilityClasses)('MuiFab', ['root', 'primary', 'secondary', 'extended', 'circular', 'focusVisible', 'disabled', 'colorInherit', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
var _default = fabClasses;
exports.default = _default;