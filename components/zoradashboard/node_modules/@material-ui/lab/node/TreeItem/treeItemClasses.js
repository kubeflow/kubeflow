"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTreeItemUtilityClass = getTreeItemUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTreeItemUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTreeItem', slot);
}

const treeItemClasses = (0, _unstyled.generateUtilityClasses)('MuiTreeItem', ['root', 'group', 'content', 'expanded', 'selected', 'focused', 'disabled', 'iconContainer', 'label']);
var _default = treeItemClasses;
exports.default = _default;