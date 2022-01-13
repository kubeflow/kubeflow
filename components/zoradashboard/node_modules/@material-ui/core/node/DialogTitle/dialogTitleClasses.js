"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDialogTitleUtilityClass = getDialogTitleUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getDialogTitleUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiDialogTitle', slot);
}

const dialogTitleClasses = (0, _unstyled.generateUtilityClasses)('MuiDialogTitle', ['root']);
var _default = dialogTitleClasses;
exports.default = _default;