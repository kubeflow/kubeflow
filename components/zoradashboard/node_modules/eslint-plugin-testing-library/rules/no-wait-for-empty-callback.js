"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'no-wait-for-empty-callback';
var WAIT_EXPRESSION_QUERY = 'CallExpression[callee.name=/^(waitFor|waitForElementToBeRemoved)$/]';
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: "It's preferred to avoid empty callbacks in `waitFor` and `waitForElementToBeRemoved`",
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            noWaitForEmptyCallback: 'Avoid passing empty callback to `{{ methodName }}`. Insert an assertion instead.',
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        function reportIfEmpty(node) {
            if (node_utils_1.isBlockStatement(node.body) &&
                node.body.body.length === 0 &&
                node_utils_1.isCallExpression(node.parent) &&
                node_utils_1.isIdentifier(node.parent.callee)) {
                context.report({
                    node: node,
                    loc: node.body.loc.start,
                    messageId: 'noWaitForEmptyCallback',
                    data: {
                        methodName: node.parent.callee.name,
                    },
                });
            }
        }
        function reportNoop(node) {
            context.report({
                node: node,
                loc: node.loc.start,
                messageId: 'noWaitForEmptyCallback',
            });
        }
        return _a = {},
            _a[WAIT_EXPRESSION_QUERY + " > ArrowFunctionExpression"] = reportIfEmpty,
            _a[WAIT_EXPRESSION_QUERY + " > FunctionExpression"] = reportIfEmpty,
            _a[WAIT_EXPRESSION_QUERY + " > Identifier[name=\"noop\"]"] = reportNoop,
            _a;
    },
});
