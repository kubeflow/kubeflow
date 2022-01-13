"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
exports.RULE_NAME = 'no-await-sync-query';
var SYNC_QUERIES_REGEXP = /^(get|query)(All)?By(LabelText|PlaceholderText|Text|AltText|Title|DisplayValue|Role|TestId)$/;
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow unnecessary `await` for sync queries',
            category: 'Best Practices',
            recommended: 'error',
        },
        messages: {
            noAwaitSyncQuery: '`{{ name }}` does not need `await` operator',
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        var reportError = function (node) {
            return context.report({
                node: node,
                messageId: 'noAwaitSyncQuery',
                data: {
                    name: node.name,
                },
            });
        };
        return _a = {},
            _a["AwaitExpression > CallExpression > Identifier[name=" + SYNC_QUERIES_REGEXP + "]"] = reportError,
            _a["AwaitExpression > CallExpression > MemberExpression > Identifier[name=" + SYNC_QUERIES_REGEXP + "]"] = reportError,
            _a;
    },
});
