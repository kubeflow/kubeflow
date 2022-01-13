"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'await-async-query';
var ASYNC_QUERIES_REGEXP = /^find(All)?By(LabelText|PlaceholderText|Text|AltText|Title|DisplayValue|Role|TestId)$/;
function hasClosestExpectResolvesRejects(node) {
    if (!node.parent) {
        return false;
    }
    if (node_utils_1.isCallExpression(node) &&
        node_utils_1.isIdentifier(node.callee) &&
        node_utils_1.isMemberExpression(node.parent) &&
        node.callee.name === 'expect') {
        var expectMatcher = node.parent.property;
        return (node_utils_1.isIdentifier(expectMatcher) &&
            (expectMatcher.name === 'resolves' || expectMatcher.name === 'rejects'));
    }
    else {
        return hasClosestExpectResolvesRejects(node.parent);
    }
}
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce async queries to have proper `await`',
            category: 'Best Practices',
            recommended: 'warn',
        },
        messages: {
            awaitAsyncQuery: '`{{ name }}` must have `await` operator',
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        var testingLibraryQueryUsage = [];
        var isQueryUsage = function (node) {
            return !node_utils_1.isAwaited(node.parent.parent) &&
                !node_utils_1.isPromiseResolved(node) &&
                !hasClosestExpectResolvesRejects(node);
        };
        var hasImportedFromTestingLibraryModule = false;
        function report(params) {
            if (hasImportedFromTestingLibraryModule) {
                context.report(params);
            }
        }
        return _a = {
                'ImportDeclaration > ImportSpecifier,ImportNamespaceSpecifier': function (node) {
                    var importDeclaration = node.parent;
                    var module = importDeclaration.source.value.toString();
                    if (utils_1.LIBRARY_MODULES.includes(module)) {
                        hasImportedFromTestingLibraryModule = true;
                    }
                }
            },
            _a["CallExpression > Identifier[name=" + ASYNC_QUERIES_REGEXP + "]"] = function (node) {
                if (isQueryUsage(node)) {
                    testingLibraryQueryUsage.push({ node: node, queryName: node.name });
                }
            },
            _a["MemberExpression > Identifier[name=" + ASYNC_QUERIES_REGEXP + "]"] = function (node) {
                var parent = node.parent;
                if (isQueryUsage(parent)) {
                    testingLibraryQueryUsage.push({ node: parent, queryName: node.name });
                }
            },
            _a['Program:exit'] = function () {
                testingLibraryQueryUsage.forEach(function (_a) {
                    var node = _a.node, queryName = _a.queryName;
                    var references = node_utils_1.getVariableReferences(context, node.parent.parent);
                    if (references && references.length === 0) {
                        report({
                            node: node,
                            messageId: 'awaitAsyncQuery',
                            data: {
                                name: queryName,
                            },
                        });
                    }
                    else {
                        for (var _i = 0, references_1 = references; _i < references_1.length; _i++) {
                            var reference = references_1[_i];
                            var referenceNode = reference.identifier;
                            if (!node_utils_1.isAwaited(referenceNode.parent) &&
                                !node_utils_1.isPromiseResolved(referenceNode)) {
                                report({
                                    node: node,
                                    messageId: 'awaitAsyncQuery',
                                    data: {
                                        name: queryName,
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
