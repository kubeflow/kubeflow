"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableSortLabelUtilityClass = getTableSortLabelUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTableSortLabelUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTableSortLabel', slot);
}

const tableSortLabelClasses = (0, _unstyled.generateUtilityClasses)('MuiTableSortLabel', ['root', 'active', 'icon', 'iconDirectionDesc', 'iconDirectionAsc']);
var _default = tableSortLabelClasses;
exports.default = _default;