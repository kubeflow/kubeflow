"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDividerUtilityClass = getDividerUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getDividerUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiDivider', slot);
}

const dividerClasses = (0, _unstyled.generateUtilityClasses)('MuiDivider', ['root', 'absolute', 'fullWidth', 'inset', 'middle', 'flexItem', 'light', 'vertical', 'withChildren', 'withChildrenVertical', 'textAlignRight', 'textAlignLeft', 'wrapper', 'wrapperVertical']);
var _default = dividerClasses;
exports.default = _default;