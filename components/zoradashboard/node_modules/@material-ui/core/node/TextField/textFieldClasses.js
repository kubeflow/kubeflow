"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextFieldUtilityClass = getTextFieldUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTextFieldUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTextField', slot);
}

const textFieldClasses = (0, _unstyled.generateUtilityClasses)('MuiTextField', ['root']);
var _default = textFieldClasses;
exports.default = _default;