"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonUtilityClass = getButtonUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getButtonUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiButton', slot);
}

const buttonClasses = (0, _unstyled.generateUtilityClasses)('MuiButton', ['root', 'text', 'textInherit', 'textPrimary', 'textSecondary', 'outlined', 'outlinedInherit', 'outlinedPrimary', 'outlinedSecondary', 'contained', 'containedInherit', 'containedPrimary', 'containedSecondary', 'disableElevation', 'focusVisible', 'disabled', 'colorInherit', 'textSizeSmall', 'textSizeMedium', 'textSizeLarge', 'outlinedSizeSmall', 'outlinedSizeMedium', 'outlinedSizeLarge', 'containedSizeSmall', 'containedSizeMedium', 'containedSizeLarge', 'sizeMedium', 'sizeSmall', 'sizeLarge', 'fullWidth', 'startIcon', 'endIcon', 'iconSizeSmall', 'iconSizeMedium', 'iconSizeLarge']);
var _default = buttonClasses;
exports.default = _default;