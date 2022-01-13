"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSwitchUtilityClass = getSwitchUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSwitchUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSwitch', slot);
}

const switchClasses = (0, _unstyled.generateUtilityClasses)('MuiSwitch', ['root', 'edgeStart', 'edgeEnd', 'switchBase', 'colorPrimary', 'colorSecondary', 'sizeSmall', 'sizeMedium', 'checked', 'disabled', 'input', 'thumb', 'track']);
var _default = switchClasses;
exports.default = _default;