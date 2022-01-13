"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepButtonUtilityClass = getStepButtonUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getStepButtonUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiStepButton', slot);
}

const stepButtonClasses = (0, _unstyled.generateUtilityClasses)('MuiStepButton', ['root', 'horizontal', 'vertical', 'touchRipple']);
var _default = stepButtonClasses;
exports.default = _default;