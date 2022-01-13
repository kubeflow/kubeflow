"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPopoverUtilityClass = getPopoverUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getPopoverUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiPopover', slot);
}

const popoverClasses = (0, _unstyled.generateUtilityClasses)('MuiPopover', ['root', 'paper']);
var _default = popoverClasses;
exports.default = _default;