"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepperUtilityClass = getStepperUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getStepperUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiStepper', slot);
}

const stepperClasses = (0, _unstyled.generateUtilityClasses)('MuiStepper', ['root', 'horizontal', 'vertical', 'alternativeLabel']);
var _default = stepperClasses;
exports.default = _default;