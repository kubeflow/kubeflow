"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBottomNavigationActionUtilityClass = getBottomNavigationActionUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getBottomNavigationActionUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiBottomNavigationAction', slot);
}

const bottomNavigationActionClasses = (0, _unstyled.generateUtilityClasses)('MuiBottomNavigationAction', ['root', 'iconOnly', 'selected', 'label']);
var _default = bottomNavigationActionClasses;
exports.default = _default;