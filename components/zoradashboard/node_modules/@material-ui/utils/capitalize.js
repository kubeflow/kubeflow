"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalize;

var _formatMuiErrorMessage2 = _interopRequireDefault(require("./formatMuiErrorMessage"));

// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word in the sentence.
// We only handle the first word.
function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error(process.env.NODE_ENV !== "production" ? `Material-UI: \`capitalize(string)\` expects a string argument.` : (0, _formatMuiErrorMessage2.default)(7));
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}