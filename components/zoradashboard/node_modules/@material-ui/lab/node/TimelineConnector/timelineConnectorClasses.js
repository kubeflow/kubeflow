"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimelineConnectorUtilityClass = getTimelineConnectorUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTimelineConnectorUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTimelineConnector', slot);
}

const timelineConnectorClasses = (0, _unstyled.generateUtilityClasses)('MuiTimelineConnector', ['root']);
var _default = timelineConnectorClasses;
exports.default = _default;