"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabUtilityClass = getTabUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTabUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTab', slot);
}

const tabClasses = (0, _unstyled.generateUtilityClasses)('MuiTab', ['root', 'labelIcon', 'textColorInherit', 'textColorPrimary', 'textColorSecondary', 'selected', 'disabled', 'fullWidth', 'wrapped']);
var _default = tabClasses;
exports.default = _default;