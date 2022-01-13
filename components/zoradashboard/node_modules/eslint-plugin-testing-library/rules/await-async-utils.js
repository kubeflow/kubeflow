"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'await-async-utils';
var ASYNC_UTILS_REGEXP = new RegExp("^(" + utils_1.ASYNC_UTILS.join('|') + ")$");
function isPromiseAll(node) {
    return node_utils_1.isMemberExpression(node.callee) && node_utils_1.isIdentifier(node.callee.object) && node.callee.object.name === 'Promise' && node_utils_1.isIdentifier(node.callee.property) && node.callee.property.name === 'all';
}
function isInPromiseAll(node) {
    var parent = node.parent;
    return node_utils_1.isCallExpression(parent) && node_utils_1.isArrayExpression(parent.parent) && node_utils_1.isCallExpression(parent.parent.parent) && isPromiseAll(parent.parent.parent);
}
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce async utils to be awaited properly',
            category: 'Best Practices',
            recommended: 'warn',
        },
        messages: {
            awaitAsyncUtil: 'Promise returned from `{{ name }}` must be handled',
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        var asyncUtilsUsage = [];
        var importedAsyncUtils = [];
        return _a = {
                'ImportDeclaration > ImportSpecifier,ImportNamespaceSpecifier': function (node) {
                    var parent = node.parent;
                    if (!utils_1.LIBRARY_MODULES.includes(parent.source.value.toString()))
                        return;
                    if (node_utils_1.isImportSpecifier(node)) {
                        importedAsyncUtils.push(node.imported.name);
                    }
                    if (node_utils_1.isImportNamespaceSpecifier(node)) {
                        importedAsyncUtils.push(node.local.name);
                    }
                }
            },
            _a["CallExpression > Identifier[name=" + ASYNC_UTILS_REGEXP + "]"] = function (node) {
                asyncUtilsUsage.push({ node: node, name: node.name });
            },
            _a["CallExpression > MemberExpression > Identifier[name=" + ASYNC_UTILS_REGEXP + "]"] = function (node) {
                var memberExpression = node.parent;
                var identifier = memberExpression.object;
                var memberExpressionName = identifier.name;
                asyncUtilsUsage.push({
                    node: memberExpression,
                    name: memberExpressionName,
                });
            },
            _a['Program:exit'] = function () {
                var testingLibraryUtilUsage = asyncUtilsUsage.filter(function (usage) {
                    if (node_utils_1.isMemberExpression(usage.node)) {
                        var object = usage.node.object;
                        return importedAsyncUtils.includes(object.name);
                    }
                    return importedAsyncUtils.includes(usage.name);
                });
                testingLibraryUtilUsage.forEach(function (_a) {
                    var node = _a.node, name = _a.name;
                    var references = node_utils_1.getVariableReferences(context, node.parent.parent);
                    if (references &&
                        references.length === 0 &&
                        !node_utils_1.isAwaited(node.parent.parent) &&
                        !node_utils_1.isPromiseResolved(node) &&
                        !isInPromiseAll(node)) {
                        context.report({
                            node: node,
                            messageId: 'awaitAsyncUtil',
                            data: {
                                name: name,
                            },
                        });
                    }
                    else {
                        for (var _i = 0, references_1 = references; _i < references_1.length; _i++) {
                            var reference = references_1[_i];
                            var referenceNode = reference.identifier;
                            if (!node_utils_1.isAwaited(referenceNode.parent) &&
                                !node_utils_1.isPromiseResolved(referenceNode)) {
                                context.report({
                                    node: node,
                                    messageId: 'awaitAsyncUtil',
                                    data: {
                                        name: name,
                                    },
                                });
                                break;
                            }
                        }
                    }
                });
            },
            _a;
    },
});
