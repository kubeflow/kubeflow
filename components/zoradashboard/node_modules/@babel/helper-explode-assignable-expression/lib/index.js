"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var t = require("@babel/types");

function getObjRef(node, nodes, scope) {
  let ref;

  if (t.isIdentifier(node)) {
    if (scope.hasBinding(node.name)) {
      return node;
    } else {
      ref = node;
    }
  } else if (t.isMemberExpression(node)) {
    ref = node.object;

    if (t.isSuper(ref) || t.isIdentifier(ref) && scope.hasBinding(ref.name)) {
      return ref;
    }
  } else {
    throw new Error(`We can't explode this node type ${node["type"]}`);
  }

  const temp = scope.generateUidIdentifierBasedOnNode(ref);
  scope.push({
    id: temp
  });
  nodes.push(t.assignmentExpression("=", t.cloneNode(temp), t.cloneNode(ref)));
  return temp;
}

function getPropRef(node, nodes, scope) {
  const prop = node.property;

  if (t.isPrivateName(prop)) {
    throw new Error("We can't generate property ref for private name, please install `@babel/plugin-proposal-class-properties`");
  }

  const key = t.toComputedKey(node, prop);
  if (t.isLiteral(key) && t.isPureish(key)) return key;
  const temp = scope.generateUidIdentifierBasedOnNode(prop);
  scope.push({
    id: temp
  });
  nodes.push(t.assignmentExpression("=", t.cloneNode(temp), t.cloneNode(prop)));
  return temp;
}

function _default(node, nodes, file, scope, allowedSingleIdent) {
  let obj;

  if (t.isIdentifier(node) && allowedSingleIdent) {
    obj = node;
  } else {
    obj = getObjRef(node, nodes, scope);
  }

  let ref, uid;

  if (t.isIdentifier(node)) {
    ref = t.cloneNode(node);
    uid = obj;
  } else {
    const prop = getPropRef(node, nodes, scope);
    const computed = node.computed || t.isLiteral(prop);
    uid = t.memberExpression(t.cloneNode(obj), t.cloneNode(prop), computed);
    ref = t.memberExpression(t.cloneNode(obj), t.cloneNode(prop), computed);
  }

  return {
    uid: uid,
    ref: ref
  };
}