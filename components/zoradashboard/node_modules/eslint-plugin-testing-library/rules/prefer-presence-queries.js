"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'prefer-presence-queries';
var QUERIES_REGEXP = new RegExp("^(get|query)(All)?(" + utils_1.ALL_QUERIES_METHODS.join('|') + ")$");
function isThrowingQuery(node) {
    return node.name.startsWith('get');
}
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Ensure appropriate get*/query* queries are used with their respective matchers',
            recommended: 'error',
        },
        messages: {
            presenceQuery: 'Use `getBy*` queries rather than `queryBy*` for checking element is present',
            absenceQuery: 'Use `queryBy*` queries rather than `getBy*` for checking element is NOT present',
            expectQueryBy: 'Use `getBy*` only when checking elements are present, otherwise use `queryBy*`',
        },
        schema: [],
        type: 'suggestion',
        fixable: null,
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        return _a = {},
            _a["CallExpression Identifier[name=" + QUERIES_REGEXP + "]"] = function (node) {
                var expectCallNode = node_utils_1.findClosestCallNode(node, 'expect');
                if (expectCallNode && node_utils_1.isMemberExpression(expectCallNode.parent)) {
                    var expectStatement = expectCallNode.parent;
                    var property = expectStatement.property;
                    var matcher = property.name;
                    var isNegatedMatcher = false;
                    if (matcher === 'not' &&
                        node_utils_1.isMemberExpression(expectStatement.parent) &&
                        node_utils_1.isIdentifier(expectStatement.parent.property)) {
                        isNegatedMatcher = true;
                        matcher = expectStatement.parent.property.name;
                    }
                    var validMatchers = isThrowingQuery(node)
                        ? utils_1.PRESENCE_MATCHERS
                        : utils_1.ABSENCE_MATCHERS;
                    var invalidMatchers = isThrowingQuery(node)
                        ? utils_1.ABSENCE_MATCHERS
                        : utils_1.PRESENCE_MATCHERS;
                    var messageId = isThrowingQuery(node)
                        ? 'absenceQuery'
                        : 'presenceQuery';
                    if ((!isNegatedMatcher && invalidMatchers.includes(matcher)) ||
                        (isNegatedMatcher && validMatchers.includes(matcher))) {
                        return context.report({
                            node: node,
                            messageId: messageId,
                        });
                    }
                }
            },
            _a;
    },
});
