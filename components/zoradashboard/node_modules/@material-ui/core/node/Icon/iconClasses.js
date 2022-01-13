"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconUtilityClass = getIconUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getIconUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiIcon', slot);
}

const iconClasses = (0, _unstyled.generateUtilityClasses)('MuiIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);
var _default = iconClasses;
exports.default = _default;