"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormGroupUtilityClass = getFormGroupUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getFormGroupUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiFormGroup', slot);
}

const formGroupClasses = (0, _unstyled.generateUtilityClasses)('MuiFormGroup', ['root', 'row']);
var _default = formGroupClasses;
exports.default = _default;