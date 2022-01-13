"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepIconUtilityClass = getStepIconUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getStepIconUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiStepIcon', slot);
}

const stepIconClasses = (0, _unstyled.generateUtilityClasses)('MuiStepIcon', ['root', 'active', 'completed', 'error', 'text']);
var _default = stepIconClasses;
exports.default = _default;