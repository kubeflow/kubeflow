"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDialogContentTextUtilityClass = getDialogContentTextUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getDialogContentTextUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiDialogContentText', slot);
}

const dialogContentTextClasses = (0, _unstyled.generateUtilityClasses)('MuiDialogContentText', ['root']);
var _default = dialogContentTextClasses;
exports.default = _default;