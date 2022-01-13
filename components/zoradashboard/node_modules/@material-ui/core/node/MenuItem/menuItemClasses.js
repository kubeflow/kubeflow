"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuItemUtilityClass = getMenuItemUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getMenuItemUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiMenuItem', slot);
}

const menuItemClasses = (0, _unstyled.generateUtilityClasses)('MuiMenuItem', ['root', 'focusVisible', 'dense', 'disabled', 'divider', 'gutters', 'selected']);
var _default = menuItemClasses;
exports.default = _default;