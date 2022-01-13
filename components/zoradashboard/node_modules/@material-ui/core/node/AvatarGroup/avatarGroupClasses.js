"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvatarGroupUtilityClass = getAvatarGroupUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAvatarGroupUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAvatarGroup', slot);
}

const avatarGroupClasses = (0, _unstyled.generateUtilityClasses)('MuiAvatarGroup', ['root', 'avatar']);
var _default = avatarGroupClasses;
exports.default = _default;