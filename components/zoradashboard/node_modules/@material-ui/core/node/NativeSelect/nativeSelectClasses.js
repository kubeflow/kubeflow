"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNativeSelectUtilityClasses = getNativeSelectUtilityClasses;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getNativeSelectUtilityClasses(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiNativeSelect', slot);
}

const nativeSelectClasses = (0, _unstyled.generateUtilityClasses)('MuiNativeSelect', ['root', 'select', 'filled', 'outlined', 'standard', 'disabled', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput']);
var _default = nativeSelectClasses;
exports.default = _default;