"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTouchRippleUtilityClass = getTouchRippleUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTouchRippleUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTouchRipple', slot);
}

const touchRippleClasses = (0, _unstyled.generateUtilityClasses)('MuiTouchRipple', ['root', 'ripple', 'rippleVisible', 'ripplePulsate', 'child', 'childLeaving', 'childPulsate']);
var _default = touchRippleClasses;
exports.default = _default;