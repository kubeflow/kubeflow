"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Slice block at given height
 *
 * @param  {number}  height
 * @param  {Object}  paragraph block
 * @return {number} sliced paragraph block
 */
var sliceAtHeight = function sliceAtHeight(height) {
  return function (block) {
    var newBlock = [];
    var counter = 0;

    for (var i = 0; i < block.length; i += 1) {
      var line = block[i];
      counter += line.box.height;

      if (counter < height) {
        newBlock.push(line);
      } else {
        break;
      }
    }

    return newBlock;
  };
};

var _default = sliceAtHeight;
exports.default = _default;