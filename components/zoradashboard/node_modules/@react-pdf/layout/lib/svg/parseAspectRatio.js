"use strict";

exports.__esModule = true;
exports.default = void 0;

var parseAspectRatio = function parseAspectRatio(value) {
  var match = value.replace(/[\s\r\t\n]+/gm, ' ').replace(/^defer\s/, '').split(' ');
  var align = match[0] || 'xMidYMid';
  var meetOrSlice = match[1] || 'meet';
  return {
    align: align,
    meetOrSlice: meetOrSlice
  };
};

var _default = parseAspectRatio;
exports.default = _default;