"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilledInputUtilityClass = getFilledInputUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getFilledInputUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiFilledInput', slot);
}

const filledInputClasses = (0, _unstyled.generateUtilityClasses)('MuiFilledInput', ['root', 'colorSecondary', 'underline', 'focused', 'disabled', 'adornedStart', 'adornedEnd', 'error', 'sizeSmall', 'multiline', 'hiddenLabel', 'input', 'inputSizeSmall', 'inputHiddenLabel', 'inputMultiline', 'inputAdornedStart', 'inputAdornedEnd']);
var _default = filledInputClasses;
exports.default = _default;