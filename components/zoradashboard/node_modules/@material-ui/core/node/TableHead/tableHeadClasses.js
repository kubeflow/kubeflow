"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableHeadUtilityClass = getTableHeadUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTableHeadUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTableHead', slot);
}

const tableHeadClasses = (0, _unstyled.generateUtilityClasses)('MuiTableHead', ['root']);
var _default = tableHeadClasses;
exports.default = _default;