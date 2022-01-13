"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTooltipUtilityClass = getTooltipUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTooltipUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTooltip', slot);
}

const tooltipClasses = (0, _unstyled.generateUtilityClasses)('MuiTooltip', ['popper', 'popperInteractive', 'popperArrow', 'popperClose', 'tooltip', 'tooltipArrow', 'touch', 'tooltipPlacementLeft', 'tooltipPlacementRight', 'tooltipPlacementTop', 'tooltipPlacementBottom', 'arrow']);
var _default = tooltipClasses;
exports.default = _default;