"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'no-debug';
function isRenderVariableDeclarator(node, renderFunctions) {
    if (node.init) {
        if (node_utils_1.isAwaitExpression(node.init)) {
            return (node.init.argument &&
                node_utils_1.isRenderFunction(node.init.argument, __spreadArray([
                    'render'
                ], renderFunctions)));
        }
        else {
            return (node_utils_1.isCallExpression(node.init) &&
                node_utils_1.isRenderFunction(node.init, __spreadArray(['render'], renderFunctions)));
        }
    }
    return false;
}
function hasTestingLibraryImportModule(importDeclarationNode) {
    var literal = importDeclarationNode.source;
    return utils_1.LIBRARY_MODULES.some(function (module) { return module === literal.value; });
}
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow unnecessary debug usages in the tests',
            category: 'Best Practices',
            recommended: 'warn',
        },
        messages: {
            noDebug: 'Unexpected debug statement',
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                properties: {
                    renderFunctions: {
                        type: 'array',
                    },
                },
            },
        ],
    },
    defaultOptions: [
        {
            renderFunctions: [],
        },
    ],
    create: function (context, _a) {
        var _b;
        var options = _a[0];
        var hasDestructuredDebugStatement = false;
        var renderVariableDeclarators = [];
        var renderFunctions = options.renderFunctions;
        var hasImportedScreen = false;
        var wildcardImportName = null;
        return _b = {
                VariableDeclarator: function (node) {
                    if (isRenderVariableDeclarator(node, renderFunctions)) {
                        if (node_utils_1.isObjectPattern(node.id) &&
                            node.id.properties.some(function (property) {
                                return node_utils_1.isProperty(property) &&
                                    node_utils_1.isIdentifier(property.key) &&
                                    property.key.name === 'debug';
                            })) {
                            hasDestructuredDebugStatement = true;
                        }
                        if (node.id.type === 'Identifier') {
                            renderVariableDeclarators.push(node);
                        }
                    }
                }
            },
            _b["VariableDeclarator > CallExpression > Identifier[name=\"require\"]"] = function (node) {
                var args = node.parent.arguments;
                var literalNodeScreenModuleName = args.find(function (args) {
                    return node_utils_1.isLiteral(args) &&
                        typeof args.value === 'string' &&
                        utils_1.LIBRARY_MODULES.includes(args.value);
                });
                if (!literalNodeScreenModuleName) {
                    return;
                }
                var declaratorNode = node.parent
                    .parent;
                hasImportedScreen =
                    node_utils_1.isObjectPattern(declaratorNode.id) &&
                        declaratorNode.id.properties.some(function (property) {
                            return node_utils_1.isProperty(property) &&
                                node_utils_1.isIdentifier(property.key) &&
                                property.key.name === 'screen';
                        });
            },
            _b.ImportDeclaration = function (node) {
                if (!hasTestingLibraryImportModule(node))
                    return;
                hasImportedScreen = node.specifiers.some(function (s) { return node_utils_1.isImportSpecifier(s) && s.imported.name === 'screen'; });
            },
            _b['ImportDeclaration ImportNamespaceSpecifier'] = function (node) {
                var importDeclarationNode = node.parent;
                if (!hasTestingLibraryImportModule(importDeclarationNode))
                    return;
                wildcardImportName = node.local && node.local.name;
            },
            _b["CallExpression > Identifier[name=\"debug\"]"] = function (node) {
                if (hasDestructuredDebugStatement) {
                    context.report({
                        node: node,
                        messageId: 'noDebug',
                    });
                }
            },
            _b["CallExpression > MemberExpression > Identifier[name=\"debug\"]"] = function (node) {
                var memberExpression = node.parent;
                var identifier = memberExpression.object;
                var memberExpressionName = identifier.name;
                var isScreenDebugUsed = hasImportedScreen && memberExpressionName === 'screen';
                var isNamespaceDebugUsed = wildcardImportName && memberExpressionName === wildcardImportName;
                if (isScreenDebugUsed || isNamespaceDebugUsed) {
                    context.report({
                        node: node,
                        messageId: 'noDebug',
                    });
                }
            },
            _b['Program:exit'] = function () {
                renderVariableDeclarators.forEach(function (renderVar) {
                    var renderVarReferences = context
                        .getDeclaredVariables(renderVar)[0]
                        .references.slice(1);
                    renderVarReferences.forEach(function (ref) {
                        var parent = ref.identifier.parent;
                        if (node_utils_1.isMemberExpression(parent) &&
                            node_utils_1.isIdentifier(parent.property) &&
                            parent.property.name === 'debug' &&
                            node_utils_1.isCallExpression(parent.parent)) {
                            context.report({
                                node: parent.property,
                                messageId: 'noDebug',
                            });
                        }
                    });
                });
            },
            _b;
    },
});
