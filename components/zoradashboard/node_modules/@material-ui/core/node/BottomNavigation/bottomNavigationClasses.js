"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBottomNavigationUtilityClass = getBottomNavigationUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getBottomNavigationUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiBottomNavigation', slot);
}

const bottomNavigationClasses = (0, _unstyled.generateUtilityClasses)('MuiBottomNavigation', ['root']);
var _default = bottomNavigationClasses;
exports.default = _default;