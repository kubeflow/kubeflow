"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepUtilityClass = getStepUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getStepUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiStep', slot);
}

const stepClasses = (0, _unstyled.generateUtilityClasses)('MuiStep', ['root', 'horizontal', 'vertical', 'alternativeLabel', 'completed']);
var _default = stepClasses;
exports.default = _default;