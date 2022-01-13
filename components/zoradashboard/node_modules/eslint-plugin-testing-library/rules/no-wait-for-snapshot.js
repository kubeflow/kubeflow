"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'no-wait-for-snapshot';
var ASYNC_UTILS_REGEXP = new RegExp("^(" + utils_1.ASYNC_UTILS.join('|') + ")$");
var SNAPSHOT_REGEXP = /^(toMatchSnapshot|toMatchInlineSnapshot)$/;
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Ensures no snapshot is generated inside of a `waitFor` call',
            category: 'Best Practices',
            recommended: 'warn',
        },
        messages: {
            noWaitForSnapshot: "A snapshot can't be generated inside of a `{{ name }}` call",
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        var asyncUtilsUsage = [];
        var importedAsyncUtils = [];
        var snapshotUsage = [];
        return _a = {
                'ImportDeclaration > ImportSpecifier,ImportNamespaceSpecifier': function (node) {
                    var parent = node.parent;
                    if (!utils_1.LIBRARY_MODULES.includes(parent.source.value.toString()))
                        return;
                    var name;
                    if (node.type === 'ImportSpecifier') {
                        name = node.imported.name;
                    }
                    if (node.type === 'ImportNamespaceSpecifier') {
                        name = node.local.name;
                    }
                    importedAsyncUtils.push(name);
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
            _a["Identifier[name=" + SNAPSHOT_REGEXP + "]"] = function (node) {
                snapshotUsage.push(node);
            },
            _a['Program:exit'] = function () {
                var testingLibraryUtilUsage = asyncUtilsUsage.filter(function (usage) {
                    if (node_utils_1.isMemberExpression(usage.node)) {
                        var object = usage.node.object;
                        return importedAsyncUtils.includes(object.name);
                    }
                    return importedAsyncUtils.includes(usage.name);
                });
                function getClosestAsyncUtil(asyncUtilUsage, node) {
                    var callExpression = node_utils_1.findClosestCallExpressionNode(node);
                    while (callExpression != null) {
                        if (callExpression.callee === asyncUtilUsage.node)
                            return asyncUtilUsage;
                        callExpression = node_utils_1.findClosestCallExpressionNode(callExpression.parent);
                    }
                    return null;
                }
                snapshotUsage.forEach(function (node) {
                    testingLibraryUtilUsage.forEach(function (asyncUtilUsage) {
                        var closestAsyncUtil = getClosestAsyncUtil(asyncUtilUsage, node);
                        if (closestAsyncUtil != null) {
                            var name_1;
                            if (node_utils_1.isMemberExpression(closestAsyncUtil.node)) {
                                name_1 = closestAsyncUtil.node.property
                                    .name;
                            }
                            else {
                                name_1 = closestAsyncUtil.name;
                            }
                            context.report({
                                node: node,
                                messageId: 'noWaitForSnapshot',
                                data: { name: name_1 },
                            });
                        }
                    });
                });
            },
            _a;
    },
});
