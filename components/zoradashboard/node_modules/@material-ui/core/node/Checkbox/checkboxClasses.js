"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCheckboxUtilityClass = getCheckboxUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCheckboxUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCheckbox', slot);
}

const checkboxClasses = (0, _unstyled.generateUtilityClasses)('MuiCheckbox', ['root', 'checked', 'disabled', 'indeterminate', 'colorPrimary', 'colorSecondary']);
var _default = checkboxClasses;
exports.default = _default;