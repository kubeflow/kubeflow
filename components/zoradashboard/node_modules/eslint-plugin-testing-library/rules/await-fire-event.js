"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'await-fire-event';
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce async fire event methods to be awaited',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            awaitFireEvent: 'async `fireEvent.{{ methodName }}` must be awaited',
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        return {
            'CallExpression > MemberExpression > Identifier[name=fireEvent]': function (node) {
                var memberExpression = node.parent;
                var fireEventMethodNode = memberExpression.property;
                if (node_utils_1.isIdentifier(fireEventMethodNode) &&
                    !node_utils_1.isAwaited(node.parent.parent.parent) &&
                    !node_utils_1.isPromiseResolved(fireEventMethodNode.parent)) {
                    context.report({
                        node: fireEventMethodNode,
                        messageId: 'awaitFireEvent',
                        data: {
                            methodName: fireEventMethodNode.name,
                        },
                    });
                }
            },
        };
    },
});
