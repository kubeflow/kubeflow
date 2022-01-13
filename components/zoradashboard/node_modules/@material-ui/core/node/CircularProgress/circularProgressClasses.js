"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCircularProgressUtilityClass = getCircularProgressUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCircularProgressUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCircularProgress', slot);
}

const circularProgressClasses = (0, _unstyled.generateUtilityClasses)('MuiCircularProgress', ['root', 'determinate', 'indeterminate', 'colorPrimary', 'colorSecondary', 'svg', 'circle', 'circleDeterminate', 'circleIndeterminate', 'circleDisableShrink']);
var _default = circularProgressClasses;
exports.default = _default;