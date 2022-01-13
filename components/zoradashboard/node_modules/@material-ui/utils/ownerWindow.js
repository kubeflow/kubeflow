"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ownerWindow;

var _ownerDocument = _interopRequireDefault(require("./ownerDocument"));

function ownerWindow(node) {
  const doc = (0, _ownerDocument.default)(node);
  return doc.defaultView || window;
}