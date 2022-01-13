"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMobileStepperUtilityClass = getMobileStepperUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getMobileStepperUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiMobileStepper', slot);
}

const mobileStepperClasses = (0, _unstyled.generateUtilityClasses)('MuiMobileStepper', ['root', 'positionBottom', 'positionTop', 'positionStatic', 'dots', 'dot', 'dotActive', 'progress']);
var _default = mobileStepperClasses;
exports.default = _default;