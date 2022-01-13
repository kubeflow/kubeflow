"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinearProgressUtilityClass = getLinearProgressUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getLinearProgressUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiLinearProgress', slot);
}

const linearProgressClasses = (0, _unstyled.generateUtilityClasses)('MuiLinearProgress', ['root', 'colorPrimary', 'colorSecondary', 'determinate', 'indeterminate', 'buffer', 'query', 'dashed', 'dashedColorPrimary', 'dashedColorSecondary', 'bar', 'barColorPrimary', 'barColorSecondary', 'bar1Indeterminate', 'bar1Determinate', 'bar1Buffer', 'bar2Indeterminate', 'bar2Buffer']);
var _default = linearProgressClasses;
exports.default = _default;