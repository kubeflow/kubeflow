"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListItemButtonUtilityClass = getListItemButtonUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getListItemButtonUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiListItemButton', slot);
}

const listItemButtonClasses = (0, _unstyled.generateUtilityClasses)('MuiListItemButton', ['root', 'focusVisible', 'dense', 'alignItemsFlexStart', 'disabled', 'divider', 'gutters', 'selected']);
var _default = listItemButtonClasses;
exports.default = _default;