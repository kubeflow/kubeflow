"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaginationUtilityClass = getPaginationUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getPaginationUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiPagination', slot);
}

const paginationClasses = (0, _unstyled.generateUtilityClasses)('MuiPagination', ['root', 'ul', 'outlined', 'text']);
var _default = paginationClasses;
exports.default = _default;