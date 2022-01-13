"use strict";

exports.__esModule = true;
exports.default = void 0;

var renderGlyphs = function renderGlyphs(ctx, glyphs, positions, x, y, options) {
  if (options === void 0) {
    options = {};
  }

  var scale = 1000 / ctx._fontSize;
  var unitsPerEm = ctx._font.font.unitsPerEm || 1000;
  var advanceWidthScale = 1000 / unitsPerEm; // Glyph encoding and positioning

  var encodedGlyphs = ctx._font.encodeGlyphs(glyphs);

  var encodedPositions = positions.map(function (pos, i) {
    return {
      xAdvance: pos.xAdvance * scale,
      yAdvance: pos.yAdvance * scale,
      xOffset: pos.xOffset,
      yOffset: pos.yOffset,
      advanceWidth: glyphs[i].advanceWidth * advanceWidthScale
    };
  });
  return ctx._glyphs(encodedGlyphs, encodedPositions, x, y, options);
};

var _default = renderGlyphs;
exports.default = _default;