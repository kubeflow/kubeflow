"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAutocompleteUtilityClass = getAutocompleteUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAutocompleteUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAutocomplete', slot);
}

const autocompleteClasses = (0, _unstyled.generateUtilityClasses)('MuiAutocomplete', ['root', 'fullWidth', 'focused', 'focusVisible', 'tag', 'tagSizeSmall', 'tagSizeMedium', 'hasPopupIcon', 'hasClearIcon', 'inputRoot', 'input', 'inputFocused', 'endAdornment', 'clearIndicator', 'popupIndicator', 'popupIndicatorOpen', 'popper', 'popperDisablePortal', 'paper', 'listbox', 'loading', 'noOptions', 'option', 'groupLabel', 'groupUl']);
var _default = autocompleteClasses;
exports.default = _default;