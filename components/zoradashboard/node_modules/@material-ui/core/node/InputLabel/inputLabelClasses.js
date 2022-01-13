"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputLabelUtilityClasses = getInputLabelUtilityClasses;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getInputLabelUtilityClasses(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiInputLabel', slot);
}

const inputLabelClasses = (0, _unstyled.generateUtilityClasses)('MuiInputLabel', ['root', 'focused', 'disabled', 'error', 'required', 'asterisk', 'formControl', 'sizeSmall', 'shrink', 'animated', 'standard', 'filled', 'outlined']);
var _default = inputLabelClasses;
exports.default = _default;