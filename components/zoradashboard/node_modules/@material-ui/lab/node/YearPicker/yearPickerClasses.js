"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYearPickerUtilityClass = getYearPickerUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getYearPickerUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiYearPicker', slot);
}

const yearPickerClasses = (0, _unstyled.generateUtilityClasses)('MuiYearPicker', ['root']);
var _default = yearPickerClasses;
exports.default = _default;