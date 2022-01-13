"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListSubheaderUtilityClass = getListSubheaderUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getListSubheaderUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiListSubheader', slot);
}

const listSubheaderClasses = (0, _unstyled.generateUtilityClasses)('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);
var _default = listSubheaderClasses;
exports.default = _default;