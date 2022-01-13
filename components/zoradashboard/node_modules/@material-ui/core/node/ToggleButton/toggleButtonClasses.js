"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToggleButtonUtilityClass = getToggleButtonUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getToggleButtonUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiToggleButton', slot);
}

const toggleButtonClasses = (0, _unstyled.generateUtilityClasses)('MuiToggleButton', ['root', 'disabled', 'selected', 'standard', 'primary', 'secondary', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
var _default = toggleButtonClasses;
exports.default = _default;