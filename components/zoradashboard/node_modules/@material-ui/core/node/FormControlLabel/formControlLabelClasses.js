"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormControlLabelUtilityClasses = getFormControlLabelUtilityClasses;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getFormControlLabelUtilityClasses(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiFormControlLabel', slot);
}

const formControlLabelClasses = (0, _unstyled.generateUtilityClasses)('MuiFormControlLabel', ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label']);
var _default = formControlLabelClasses;
exports.default = _default;