"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputUtilityClass = getInputUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getInputUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiInput', slot);
}

const inputClasses = (0, _unstyled.generateUtilityClasses)('MuiInput', ['root', 'formControl', 'focused', 'disabled', 'colorSecondary', 'underline', 'error', 'sizeSmall', 'multiline', 'fullWidth', 'input', 'inputSizeSmall', 'inputMultiline', 'inputTypeSearch']);
var _default = inputClasses;
exports.default = _default;