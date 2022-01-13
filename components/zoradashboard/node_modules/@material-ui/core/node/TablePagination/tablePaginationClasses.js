"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTablePaginationUtilityClass = getTablePaginationUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTablePaginationUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTablePagination', slot);
}

const tablePaginationClasses = (0, _unstyled.generateUtilityClasses)('MuiTablePagination', ['root', 'toolbar', 'spacer', 'selectLabel', 'selectRoot', 'select', 'selectIcon', 'input', 'menuItem', 'displayedRows', 'actions']);
var _default = tablePaginationClasses;
exports.default = _default;