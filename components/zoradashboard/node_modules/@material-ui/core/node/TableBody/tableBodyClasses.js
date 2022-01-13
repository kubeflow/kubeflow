"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableBodyUtilityClass = getTableBodyUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTableBodyUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTableBody', slot);
}

const tableBodyClasses = (0, _unstyled.generateUtilityClasses)('MuiTableBody', ['root']);
var _default = tableBodyClasses;
exports.default = _default;