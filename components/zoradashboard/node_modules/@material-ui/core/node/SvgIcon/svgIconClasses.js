"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSvgIconUtilityClass = getSvgIconUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSvgIconUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSvgIcon', slot);
}

const svgIconClasses = (0, _unstyled.generateUtilityClasses)('MuiSvgIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);
var _default = svgIconClasses;
exports.default = _default;