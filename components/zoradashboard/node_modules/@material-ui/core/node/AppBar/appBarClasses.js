"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppBarUtilityClass = getAppBarUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAppBarUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAppBar', slot);
}

const appBarClasses = (0, _unstyled.generateUtilityClasses)('MuiAppBar', ['root', 'positionFixed', 'positionAbsolute', 'positionSticky', 'positionStatic', 'positionRelative', 'colorDefault', 'colorPrimary', 'colorSecondary', 'colorInherit', 'colorTransparent']);
var _default = appBarClasses;
exports.default = _default;