"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageListItemUtilityClass = getImageListItemUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getImageListItemUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiImageListItem', slot);
}

const imageListItemClasses = (0, _unstyled.generateUtilityClasses)('MuiImageListItem', ['root', 'img', 'standard', 'woven', 'masonry', 'quilted']);
var _default = imageListItemClasses;
exports.default = _default;