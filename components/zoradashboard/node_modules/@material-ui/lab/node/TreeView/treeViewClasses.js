"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTreeViewUtilityClass = getTreeViewUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTreeViewUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTreeView', slot);
}

const treeViewClasses = (0, _unstyled.generateUtilityClasses)('MuiTreeView', ['root']);
var _default = treeViewClasses;
exports.default = _default;