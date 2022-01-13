"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconButtonUtilityClass = getIconButtonUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getIconButtonUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiIconButton', slot);
}

const iconButtonClasses = (0, _unstyled.generateUtilityClasses)('MuiIconButton', ['root', 'disabled', 'colorInherit', 'colorPrimary', 'colorSecondary', 'edgeStart', 'edgeEnd', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
var _default = iconButtonClasses;
exports.default = _default;