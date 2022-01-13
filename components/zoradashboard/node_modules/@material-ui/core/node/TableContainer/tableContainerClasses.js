"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableContainerUtilityClass = getTableContainerUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTableContainerUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTableContainer', slot);
}

const tableContainerClasses = (0, _unstyled.generateUtilityClasses)('MuiTableContainer', ['root']);
var _default = tableContainerClasses;
exports.default = _default;