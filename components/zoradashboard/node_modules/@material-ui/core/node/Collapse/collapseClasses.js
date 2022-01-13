"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCollapseUtilityClass = getCollapseUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getCollapseUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiCollapse', slot);
}

const collapseClasses = (0, _unstyled.generateUtilityClasses)('MuiCollapse', ['root', 'horizontal', 'vertical', 'entered', 'hidden', 'wrapper', 'wrapperInner']);
var _default = collapseClasses;
exports.default = _default;