"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBadgeUtilityClass = getBadgeUtilityClass;
exports.default = void 0;

var _generateUtilityClasses = _interopRequireDefault(require("../generateUtilityClasses"));

var _generateUtilityClass = _interopRequireDefault(require("../generateUtilityClass"));

function getBadgeUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiBadge', slot);
}

const badgeUnstyledClasses = (0, _generateUtilityClasses.default)('MuiBadge', ['root', 'badge', 'dot', 'standard', 'anchorOriginTopLeftCircular', 'anchorOriginTopLeftRectangular', 'anchorOriginTopRightCircular', 'anchorOriginTopRightRectangular', 'anchorOriginBottomLeftCircular', 'anchorOriginBottomLeftRectangular', 'anchorOriginBottomRightCircular', 'anchorOriginBottomRightRectangular', 'invisible']);
var _default = badgeUnstyledClasses;
exports.default = _default;