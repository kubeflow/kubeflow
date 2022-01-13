"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepContentUtilityClass = getStepContentUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getStepContentUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiStepContent', slot);
}

const stepContentClasses = (0, _unstyled.generateUtilityClasses)('MuiStepContent', ['root', 'last', 'transition']);
var _default = stepContentClasses;
exports.default = _default;