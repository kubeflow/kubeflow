"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTransparentExprWrapper = isTransparentExprWrapper;
exports.skipTransparentExprWrappers = skipTransparentExprWrappers;

var t = require("@babel/types");

function isTransparentExprWrapper(node) {
  return t.isTSAsExpression(node) || t.isTSTypeAssertion(node) || t.isTSNonNullExpression(node) || t.isTypeCastExpression(node) || t.isParenthesizedExpression(node);
}

function skipTransparentExprWrappers(path) {
  while (isTransparentExprWrapper(path.node)) {
    path = path.get("expression");
  }

  return path;
}