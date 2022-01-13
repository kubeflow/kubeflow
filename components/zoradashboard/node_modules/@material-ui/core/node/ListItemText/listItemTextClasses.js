"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListItemTextUtilityClass = getListItemTextUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getListItemTextUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiListItemText', slot);
}

const listItemTextClasses = (0, _unstyled.generateUtilityClasses)('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']);
var _default = listItemTextClasses;
exports.default = _default;