"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableFooterUtilityClass = getTableFooterUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTableFooterUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTableFooter', slot);
}

const tableFooterClasses = (0, _unstyled.generateUtilityClasses)('MuiTableFooter', ['root']);
var _default = tableFooterClasses;
exports.default = _default;