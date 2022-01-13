"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpeedDialIconUtilityClass = getSpeedDialIconUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSpeedDialIconUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSpeedDialIcon', slot);
}

const speedDialIconClasses = (0, _unstyled.generateUtilityClasses)('MuiSpeedDialIcon', ['root', 'icon', 'iconOpen', 'iconWithOpenIconOpen', 'openIcon', 'openIconOpen']);
var _default = speedDialIconClasses;
exports.default = _default;