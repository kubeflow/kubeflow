"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVariableReferences = exports.isPromiseResolved = exports.isAwaited = exports.isArrayExpression = exports.isReturnStatement = exports.isArrowFunctionExpression = exports.isAwaitExpression = exports.hasThenProperty = exports.isObjectExpression = exports.findClosestCallNode = exports.findClosestCallExpressionNode = exports.isJSXAttribute = exports.isProperty = exports.isObjectPattern = exports.isRenderFunction = exports.isVariableDeclarator = exports.isBlockStatement = exports.isImportDefaultSpecifier = exports.isImportNamespaceSpecifier = exports.isImportSpecifier = exports.isLiteral = exports.isMemberExpression = exports.isIdentifier = exports.isCallExpression = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
function isCallExpression(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.CallExpression;
}
exports.isCallExpression = isCallExpression;
function isIdentifier(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.Identifier;
}
exports.isIdentifier = isIdentifier;
function isMemberExpression(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.MemberExpression;
}
exports.isMemberExpression = isMemberExpression;
function isLiteral(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.Literal;
}
exports.isLiteral = isLiteral;
function isImportSpecifier(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.ImportSpecifier;
}
exports.isImportSpecifier = isImportSpecifier;
function isImportNamespaceSpecifier(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === experimental_utils_1.AST_NODE_TYPES.ImportNamespaceSpecifier;
}
exports.isImportNamespaceSpecifier = isImportNamespaceSpecifier;
function isImportDefaultSpecifier(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.ImportDefaultSpecifier;
}
exports.isImportDefaultSpecifier = isImportDefaultSpecifier;
function isBlockStatement(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.BlockStatement;
}
exports.isBlockStatement = isBlockStatement;
function isVariableDeclarator(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.VariableDeclarator;
}
exports.isVariableDeclarator = isVariableDeclarator;
function isRenderFunction(callNode, renderFunctions) {
    return renderFunctions.some(function (name) {
        return ((isIdentifier(callNode.callee) && name === callNode.callee.name) ||
            (isMemberExpression(callNode.callee) &&
                isIdentifier(callNode.callee.property) &&
                name === callNode.callee.property.name));
    });
}
exports.isRenderFunction = isRenderFunction;
function isObjectPattern(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.ObjectPattern;
}
exports.isObjectPattern = isObjectPattern;
function isProperty(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.Property;
}
exports.isProperty = isProperty;
function isJSXAttribute(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.JSXAttribute;
}
exports.isJSXAttribute = isJSXAttribute;
function findClosestCallExpressionNode(node) {
    if (isCallExpression(node)) {
        return node;
    }
    if (!node.parent)
        return null;
    return findClosestCallExpressionNode(node.parent);
}
exports.findClosestCallExpressionNode = findClosestCallExpressionNode;
function findClosestCallNode(node, name) {
    if (!node.parent) {
        return null;
    }
    if (isCallExpression(node) &&
        isIdentifier(node.callee) &&
        node.callee.name === name) {
        return node;
    }
    else {
        return findClosestCallNode(node.parent, name);
    }
}
exports.findClosestCallNode = findClosestCallNode;
function isObjectExpression(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === experimental_utils_1.AST_NODE_TYPES.ObjectExpression;
}
exports.isObjectExpression = isObjectExpression;
function hasThenProperty(node) {
    return (isMemberExpression(node) &&
        isIdentifier(node.property) &&
        node.property.name === 'then');
}
exports.hasThenProperty = hasThenProperty;
function isAwaitExpression(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.AwaitExpression;
}
exports.isAwaitExpression = isAwaitExpression;
function isArrowFunctionExpression(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.ArrowFunctionExpression;
}
exports.isArrowFunctionExpression = isArrowFunctionExpression;
function isReturnStatement(node) {
    return node && node.type === experimental_utils_1.AST_NODE_TYPES.ReturnStatement;
}
exports.isReturnStatement = isReturnStatement;
function isArrayExpression(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === experimental_utils_1.AST_NODE_TYPES.ArrayExpression;
}
exports.isArrayExpression = isArrayExpression;
function isAwaited(node) {
    return (isAwaitExpression(node) ||
        isArrowFunctionExpression(node) ||
        isReturnStatement(node));
}
exports.isAwaited = isAwaited;
function isPromiseResolved(node) {
    var parent = node.parent;
    if (isCallExpression(parent)) {
        return hasThenProperty(parent.parent);
    }
    return hasThenProperty(parent);
}
exports.isPromiseResolved = isPromiseResolved;
function getVariableReferences(context, node) {
    return ((isVariableDeclarator(node) &&
        context.getDeclaredVariables(node)[0].references.slice(1)) ||
        []);
}
exports.getVariableReferences = getVariableReferences;
