"use strict";

exports.__esModule = true;
exports.default = void 0;
var DUMMY_CODEPOINT = 123;
/**
 * Resolve string indices based on glyphs code points
 *
 * @param  {Array}  glyphs
 * @return {Array} glyph indices
 */

var resolve = function resolve(glyphs) {
  if (glyphs === void 0) {
    glyphs = [];
  }

  return glyphs.reduce(function (acc, glyph) {
    var codePoints = (glyph === null || glyph === void 0 ? void 0 : glyph.codePoints) || [DUMMY_CODEPOINT];
    if (acc.length === 0) return codePoints.map(function () {
      return 0;
    });
    var last = acc[acc.length - 1];
    var next = codePoints.map(function () {
      return last + 1;
    });
    return [].concat(acc, next);
  }, []);
};

var _default = resolve;
exports.default = _default;