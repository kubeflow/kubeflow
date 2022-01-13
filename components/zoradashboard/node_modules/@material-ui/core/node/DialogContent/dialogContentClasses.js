"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDialogContentUtilityClass = getDialogContentUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getDialogContentUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiDialogContent', slot);
}

const dialogContentClasses = (0, _unstyled.generateUtilityClasses)('MuiDialogContent', ['root', 'dividers']);
var _default = dialogContentClasses;
exports.default = _default;