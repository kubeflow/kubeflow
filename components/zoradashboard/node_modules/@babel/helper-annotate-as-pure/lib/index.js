"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = annotateAsPure;

var t = require("@babel/types");

const PURE_ANNOTATION = "#__PURE__";

const isPureAnnotated = ({
  leadingComments
}) => !!leadingComments && leadingComments.some(comment => /[@#]__PURE__/.test(comment.value));

function annotateAsPure(pathOrNode) {
  const node = pathOrNode["node"] || pathOrNode;

  if (isPureAnnotated(node)) {
    return;
  }

  t.addComment(node, "leading", PURE_ANNOTATION);
}