"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableCellUtilityClass = getTableCellUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTableCellUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTableCell', slot);
}

const tableCellClasses = (0, _unstyled.generateUtilityClasses)('MuiTableCell', ['root', 'head', 'body', 'footer', 'sizeSmall', 'sizeMedium', 'paddingCheckbox', 'paddingNone', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'stickyHeader']);
var _default = tableCellClasses;
exports.default = _default;