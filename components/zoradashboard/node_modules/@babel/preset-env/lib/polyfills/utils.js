"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImportSource = getImportSource;
exports.getRequireSource = getRequireSource;
exports.isPolyfillSource = isPolyfillSource;

var t = require("@babel/types");

function getImportSource({
  node
}) {
  if (node.specifiers.length === 0) return node.source.value;
}

function getRequireSource({
  node
}) {
  if (!t.isExpressionStatement(node)) return;
  const {
    expression
  } = node;

  if (t.isCallExpression(expression) && t.isIdentifier(expression.callee) && expression.callee.name === "require" && expression.arguments.length === 1 && t.isStringLiteral(expression.arguments[0])) {
    return expression.arguments[0].value;
  }
}

function isPolyfillSource(source) {
  return source === "@babel/polyfill" || source === "core-js";
}