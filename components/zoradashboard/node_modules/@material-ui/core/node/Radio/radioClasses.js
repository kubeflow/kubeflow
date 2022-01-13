"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRadioUtilityClass = getRadioUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getRadioUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiRadio', slot);
}

const radioClasses = (0, _unstyled.generateUtilityClasses)('MuiRadio', ['root', 'checked', 'disabled', 'colorPrimary', 'colorSecondary']);
var _default = radioClasses;
exports.default = _default;