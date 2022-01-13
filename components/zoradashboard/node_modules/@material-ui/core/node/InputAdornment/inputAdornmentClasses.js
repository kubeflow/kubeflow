"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputAdornmentUtilityClass = getInputAdornmentUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getInputAdornmentUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiInputAdornment', slot);
}

const inputAdornmentClasses = (0, _unstyled.generateUtilityClasses)('MuiInputAdornment', ['root', 'filled', 'standard', 'outlined', 'positionStart', 'positionEnd', 'disablePointerEvents', 'hiddenLabel', 'sizeSmall']);
var _default = inputAdornmentClasses;
exports.default = _default;