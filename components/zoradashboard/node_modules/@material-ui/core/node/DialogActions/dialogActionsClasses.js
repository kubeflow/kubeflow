"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDialogActionsUtilityClass = getDialogActionsUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getDialogActionsUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiDialogActions', slot);
}

const dialogActionsClasses = (0, _unstyled.generateUtilityClasses)('MuiDialogActions', ['root', 'spacing']);
var _default = dialogActionsClasses;
exports.default = _default;