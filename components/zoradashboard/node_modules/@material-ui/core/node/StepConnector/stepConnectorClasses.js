"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepConnectorUtilityClass = getStepConnectorUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getStepConnectorUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiStepConnector', slot);
}

const stepConnectorClasses = (0, _unstyled.generateUtilityClasses)('MuiStepConnector', ['root', 'horizontal', 'vertical', 'alternativeLabel', 'active', 'completed', 'disabled', 'line', 'lineHorizontal', 'lineVertical']);
var _default = stepConnectorClasses;
exports.default = _default;