"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Get glyph for a given code point
 *
 * @param  {number}  codePoint
 * @param  {Object}  font
 * @return {Object}  glyph
 * */
var fromCodePoint = function fromCodePoint(value, font) {
  return font && value ? font.glyphForCodePoint(value) : null;
};

var _default = fromCodePoint;
exports.default = _default;