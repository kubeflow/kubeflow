"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineUtilityClass = getTimelineUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTimelineUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTimeline', slot);
}

const timelineClasses = (0, _unstyled.generateUtilityClasses)('MuiTimeline', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineClasses;
exports.default = _default;