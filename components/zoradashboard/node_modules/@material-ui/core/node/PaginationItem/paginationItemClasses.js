"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaginationItemUtilityClass = getPaginationItemUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getPaginationItemUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiPaginationItem', slot);
}

const paginationItemClasses = (0, _unstyled.generateUtilityClasses)('MuiPaginationItem', ['root', 'page', 'sizeSmall', 'sizeLarge', 'text', 'textPrimary', 'textSecondary', 'outlined', 'outlinedPrimary', 'outlinedSecondary', 'rounded', 'ellipsis', 'firstLast', 'previousNext', 'focusVisible', 'disabled', 'selected', 'icon']);
var _default = paginationItemClasses;
exports.default = _default;