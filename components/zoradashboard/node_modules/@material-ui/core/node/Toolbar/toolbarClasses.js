"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToolbarUtilityClass = getToolbarUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getToolbarUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiToolbar', slot);
}

const toolbarClasses = (0, _unstyled.generateUtilityClasses)('MuiToolbar', ['root', 'gutters', 'regular', 'dense']);
var _default = toolbarClasses;
exports.default = _default;