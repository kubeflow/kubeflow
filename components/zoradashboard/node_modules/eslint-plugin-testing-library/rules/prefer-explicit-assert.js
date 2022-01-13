"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'prefer-explicit-assert';
var ALL_GET_BY_QUERIES = utils_1.ALL_QUERIES_METHODS.map(function (queryMethod) { return "get" + queryMethod; });
var isValidQuery = function (node, customQueryNames) {
    return ALL_GET_BY_QUERIES.includes(node.name) ||
        customQueryNames.includes(node.name);
};
var isAtTopLevel = function (node) {
    return node.parent.parent.type === 'ExpressionStatement';
};
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Suggest using explicit assertions rather than just `getBy*` queries',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            preferExplicitAssert: 'Wrap stand-alone `getBy*` query with `expect` function for better explicit assertion',
            preferExplicitAssertAssertion: '`getBy*` queries must be asserted with `{{assertion}}`',
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                additionalProperties: false,
                properties: {
                    assertion: {
                        type: 'string',
                        enum: utils_1.PRESENCE_MATCHERS,
                    },
                    customQueryNames: {
                        type: 'array',
                    },
                },
            },
        ],
    },
    defaultOptions: [
        {
            customQueryNames: [],
        },
    ],
    create: function (context, _a) {
        var options = _a[0];
        var customQueryNames = options.customQueryNames, assertion = options.assertion;
        var getQueryCalls = [];
        return {
            'CallExpression Identifier': function (node) {
                if (isValidQuery(node, customQueryNames)) {
                    getQueryCalls.push(node);
                }
            },
            'Program:exit': function () {
                getQueryCalls.forEach(function (queryCall) {
                    var node = node_utils_1.isMemberExpression(queryCall.parent)
                        ? queryCall.parent
                        : queryCall;
                    if (isAtTopLevel(node)) {
                        context.report({
                            node: queryCall,
                            messageId: 'preferExplicitAssert',
                        });
                    }
                    else if (assertion) {
                        var expectCallNode = node_utils_1.findClosestCallNode(node, 'expect');
                        if (!expectCallNode)
                            return;
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
                        var shouldEnforceAssertion = (!isNegatedMatcher && utils_1.PRESENCE_MATCHERS.includes(matcher)) ||
                            (isNegatedMatcher && utils_1.ABSENCE_MATCHERS.includes(matcher));
                        if (shouldEnforceAssertion && matcher !== assertion) {
                            context.report({
                                node: property,
                                messageId: 'preferExplicitAssertAssertion',
                                data: {
                                    assertion: assertion,
                                },
                            });
                        }
                    }
                });
            },
        };
    },
});
