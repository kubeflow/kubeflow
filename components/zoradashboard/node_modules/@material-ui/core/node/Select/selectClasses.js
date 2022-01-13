"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectUtilityClasses = getSelectUtilityClasses;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getSelectUtilityClasses(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiSelect', slot);
}

const selectClasses = (0, _unstyled.generateUtilityClasses)('MuiSelect', ['root', 'select', 'filled', 'outlined', 'standard', 'disabled', 'focused', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput']);
var _default = selectClasses;
exports.default = _default;