"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpeedDialActionUtilityClass = getSpeedDialActionUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSpeedDialActionUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSpeedDialAction', slot);
}

const speedDialActionClasses = (0, _unstyled.generateUtilityClasses)('MuiSpeedDialAction', ['fab', 'fabClosed', 'staticTooltip', 'staticTooltipClosed', 'staticTooltipLabel', 'tooltipPlacementLeft', 'tooltipPlacementRight']);
var _default = speedDialActionClasses;
exports.default = _default;