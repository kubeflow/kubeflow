"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToggleButtonGroupUtilityClass = getToggleButtonGroupUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getToggleButtonGroupUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiToggleButtonGroup', slot);
}

const toggleButtonGroupClasses = (0, _unstyled.generateUtilityClasses)('MuiToggleButtonGroup', ['root', 'selected', 'vertical', 'grouped', 'groupedHorizontal', 'groupedVertical']);
var _default = toggleButtonGroupClasses;
exports.default = _default;