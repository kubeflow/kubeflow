"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSkeletonUtilityClass = getSkeletonUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSkeletonUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSkeleton', slot);
}

const skeletonClasses = (0, _unstyled.generateUtilityClasses)('MuiSkeleton', ['root', 'text', 'rectangular', 'circular', 'pulse', 'wave', 'withChildren', 'fitContent', 'heightAuto']);
var _default = skeletonClasses;
exports.default = _default;