"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListItemSecondaryActionClassesUtilityClass = getListItemSecondaryActionClassesUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getListItemSecondaryActionClassesUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiListItemSecondaryAction', slot);
}

const listItemSecondaryActionClasses = (0, _unstyled.generateUtilityClasses)('MuiListItemSecondaryAction', ['root', 'disableGutters']);
var _default = listItemSecondaryActionClasses;
exports.default = _default;