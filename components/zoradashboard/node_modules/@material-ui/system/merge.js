"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@material-ui/utils");

function merge(acc, item) {
  if (!item) {
    return acc;
  }

  return (0, _utils.deepmerge)(acc, item, {
    clone: false // No need to clone deep, it's way faster.

  });
}

var _default = merge;
exports.default = _default;