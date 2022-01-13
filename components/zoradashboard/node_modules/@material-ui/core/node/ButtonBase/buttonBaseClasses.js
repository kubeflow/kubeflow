"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonBaseUtilityClass = getButtonBaseUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getButtonBaseUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiButtonBase', slot);
}

const buttonBaseClasses = (0, _unstyled.generateUtilityClasses)('MuiButtonBase', ['root', 'disabled', 'focusVisible']);
var _default = buttonBaseClasses;
exports.default = _default;