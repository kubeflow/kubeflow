"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'no-await-sync-events';
var SYNC_EVENTS_REGEXP = new RegExp("^(" + utils_1.SYNC_EVENTS.join('|') + ")$");
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow unnecessary `await` for sync events',
            category: 'Best Practices',
            recommended: 'error',
        },
        messages: {
            noAwaitSyncEvents: '`{{ name }}` does not need `await` operator',
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        return _a = {},
            _a["AwaitExpression > CallExpression > MemberExpression > Identifier[name=" + SYNC_EVENTS_REGEXP + "]"] = function (node) {
                var memberExpression = node.parent;
                var methodNode = memberExpression.property;
                var callExpression = memberExpression.parent;
                var lastArg = callExpression.arguments[callExpression.arguments.length - 1];
                var withDelay = node_utils_1.isObjectExpression(lastArg) &&
                    lastArg.properties.some(function (property) {
                        return node_utils_1.isProperty(property) &&
                            node_utils_1.isIdentifier(property.key) &&
                            property.key.name === 'delay';
                    });
                if (!(node.name === 'userEvent' && ['type', 'keyboard'].includes(methodNode.name) && withDelay)) {
                    context.report({
                        node: methodNode,
                        messageId: 'noAwaitSyncEvents',
                        data: {
                            name: node.name + "." + methodNode.name,
                        },
                    });
                }
            },
            _a;
    },
});
