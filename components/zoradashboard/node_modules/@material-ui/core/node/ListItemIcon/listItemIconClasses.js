"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListItemIconUtilityClass = getListItemIconUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getListItemIconUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiListItemIcon', slot);
}

const listItemIconClasses = (0, _unstyled.generateUtilityClasses)('MuiListItemIcon', ['root', 'alignItemsFlexStart']);
var _default = listItemIconClasses;
exports.default = _default;