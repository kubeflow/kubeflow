"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnackbarContentUtilityClass = getSnackbarContentUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSnackbarContentUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSnackbarContent', slot);
}

const snackbarContentClasses = (0, _unstyled.generateUtilityClasses)('MuiSnackbarContent', ['root', 'message', 'action']);
var _default = snackbarContentClasses;
exports.default = _default;