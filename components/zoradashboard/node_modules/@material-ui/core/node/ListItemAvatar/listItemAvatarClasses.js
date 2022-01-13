"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListItemAvatarUtilityClass = getListItemAvatarUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getListItemAvatarUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiListItemAvatar', slot);
}

const listItemAvatarClasses = (0, _unstyled.generateUtilityClasses)('MuiListItemAvatar', ['root', 'alignItemsFlexStart']);
var _default = listItemAvatarClasses;
exports.default = _default;