"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepLabelUtilityClass = getStepLabelUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getStepLabelUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiStepLabel', slot);
}

const stepLabelClasses = (0, _unstyled.generateUtilityClasses)('MuiStepLabel', ['root', 'horizontal', 'vertical', 'label', 'active', 'completed', 'error', 'disabled', 'iconContainer', 'alternativeLabel', 'labelContainer']);
var _default = stepLabelClasses;
exports.default = _default;