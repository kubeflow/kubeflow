"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageListUtilityClass = getImageListUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getImageListUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiImageList', slot);
}

const imageListClasses = (0, _unstyled.generateUtilityClasses)('MuiImageList', ['root', 'masonry', 'quilted', 'standard', 'woven']);
var _default = imageListClasses;
exports.default = _default;