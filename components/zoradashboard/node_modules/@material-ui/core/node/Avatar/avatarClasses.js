"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvatarUtilityClass = getAvatarUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAvatarUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAvatar', slot);
}

const avatarClasses = (0, _unstyled.generateUtilityClasses)('MuiAvatar', ['root', 'colorDefault', 'circular', 'rounded', 'square', 'img', 'fallback']);
var _default = avatarClasses;
exports.default = _default;