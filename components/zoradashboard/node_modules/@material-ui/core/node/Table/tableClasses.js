"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableUtilityClass = getTableUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTableUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTable', slot);
}

const tableClasses = (0, _unstyled.generateUtilityClasses)('MuiTable', ['root', 'stickyHeader']);
var _default = tableClasses;
exports.default = _default;