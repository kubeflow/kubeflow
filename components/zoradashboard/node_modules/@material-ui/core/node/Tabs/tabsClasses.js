"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabsUtilityClass = getTabsUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getTabsUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiTabs', slot);
}

const tabsClasses = (0, _unstyled.generateUtilityClasses)('MuiTabs', ['root', 'vertical', 'flexContainer', 'flexContainerVertical', 'centered', 'scroller', 'fixed', 'scrollableX', 'scrollableY', 'hideScrollbar', 'scrollButtons', 'scrollButtonsHideMobile', 'indicator']);
var _default = tabsClasses;
exports.default = _default;