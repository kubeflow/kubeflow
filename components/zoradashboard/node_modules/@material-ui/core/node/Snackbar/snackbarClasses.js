"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnackbarUtilityClass = getSnackbarUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSnackbarUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSnackbar', slot);
}

const snackbarClasses = (0, _unstyled.generateUtilityClasses)('MuiSnackbar', ['root', 'anchorOriginTopCenter', 'anchorOriginBottomCenter', 'anchorOriginTopRight', 'anchorOriginBottomRight', 'anchorOriginTopLeft', 'anchorOriginBottomLeft']);
var _default = snackbarClasses;
exports.default = _default;