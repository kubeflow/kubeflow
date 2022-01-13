"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContainerUtilityClass = getContainerUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getContainerUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiContainer', slot);
}

const containerClasses = (0, _unstyled.generateUtilityClasses)('MuiContainer', ['root', 'disableGutters', 'fixed', 'maxWidthXs', 'maxWidthSm', 'maxWidthMd', 'maxWidthLg', 'maxWidthXl']);
var _default = containerClasses;
exports.default = _default;