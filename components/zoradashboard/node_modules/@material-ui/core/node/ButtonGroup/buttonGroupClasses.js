"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonGroupUtilityClass = getButtonGroupUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getButtonGroupUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiButtonGroup', slot);
}

const buttonGroupClasses = (0, _unstyled.generateUtilityClasses)('MuiButtonGroup', ['root', 'contained', 'outlined', 'text', 'disableElevation', 'disabled', 'fullWidth', 'vertical', 'grouped', 'groupedHorizontal', 'groupedVertical', 'groupedText', 'groupedTextHorizontal', 'groupedTextVertical', 'groupedTextPrimary', 'groupedTextSecondary', 'groupedOutlined', 'groupedOutlinedHorizontal', 'groupedOutlinedVertical', 'groupedOutlinedPrimary', 'groupedOutlinedSecondary', 'groupedContained', 'groupedContainedHorizontal', 'groupedContainedVertical', 'groupedContainedPrimary', 'groupedContainedSecondary']);
var _default = buttonGroupClasses;
exports.default = _default;