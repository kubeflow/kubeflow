"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClosestBeforeHook = exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'no-render-in-setup';
function findClosestBeforeHook(node, testingFrameworkSetupHooksToFilter) {
    if (node === null)
        return null;
    if (node_utils_1.isCallExpression(node) &&
        node_utils_1.isIdentifier(node.callee) &&
        testingFrameworkSetupHooksToFilter.includes(node.callee.name)) {
        return node.callee;
    }
    return findClosestBeforeHook(node.parent, testingFrameworkSetupHooksToFilter);
}
exports.findClosestBeforeHook = findClosestBeforeHook;
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow the use of `render` in setup functions',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            noRenderInSetup: 'Move `render` out of `{{name}}` and into individual tests.',
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                properties: {
                    renderFunctions: {
                        type: 'array',
                    },
                    allowTestingFrameworkSetupHook: {
                        enum: utils_1.TESTING_FRAMEWORK_SETUP_HOOKS,
                    },
                },
                anyOf: [
                    {
                        required: ['renderFunctions'],
                    },
                    {
                        required: ['allowTestingFrameworkSetupHook'],
                    },
                ],
            },
        ],
    },
    defaultOptions: [
        {
            renderFunctions: [],
            allowTestingFrameworkSetupHook: '',
        },
    ],
    create: function (context, _a) {
        var _b;
        var _c = _a[0], renderFunctions = _c.renderFunctions, allowTestingFrameworkSetupHook = _c.allowTestingFrameworkSetupHook;
        var renderImportedFromTestingLib = false;
        var wildcardImportName = null;
        return _b = {
                'ImportDeclaration[source.value=/testing-library/] ImportNamespaceSpecifier': function (node) {
                    wildcardImportName = node.local && node.local.name;
                },
                'ImportDeclaration[source.value=/testing-library/]': function (node) {
                    renderImportedFromTestingLib = node.specifiers.some(function (specifier) {
                        return (node_utils_1.isImportSpecifier(specifier) && specifier.local.name === 'render');
                    });
                }
            },
            _b["VariableDeclarator > CallExpression > Identifier[name=\"require\"]"] = function (node) {
                var callExpressionArgs = node.parent.arguments;
                var testingLibImport = callExpressionArgs.find(function (args) {
                    return node_utils_1.isLiteral(args) &&
                        typeof args.value === 'string' &&
                        RegExp(/testing-library/, 'g').test(args.value);
                });
                if (!testingLibImport) {
                    return;
                }
                var declaratorNode = node.parent
                    .parent;
                renderImportedFromTestingLib =
                    node_utils_1.isObjectPattern(declaratorNode.id) &&
                        declaratorNode.id.properties.some(function (property) {
                            return node_utils_1.isProperty(property) &&
                                node_utils_1.isIdentifier(property.key) &&
                                property.key.name === 'render';
                        });
            },
            _b.CallExpression = function (node) {
                var testingFrameworkSetupHooksToFilter = utils_1.TESTING_FRAMEWORK_SETUP_HOOKS;
                if (allowTestingFrameworkSetupHook.length !== 0) {
                    testingFrameworkSetupHooksToFilter = utils_1.TESTING_FRAMEWORK_SETUP_HOOKS.filter(function (hook) { return hook !== allowTestingFrameworkSetupHook; });
                }
                var beforeHook = findClosestBeforeHook(node, testingFrameworkSetupHooksToFilter);
                var disallowedRenderFns = renderImportedFromTestingLib || wildcardImportName
                    ? __spreadArray(['render'], renderFunctions) : renderFunctions;
                if (node_utils_1.isRenderFunction(node, disallowedRenderFns) && beforeHook) {
                    context.report({
                        node: node,
                        messageId: 'noRenderInSetup',
                        data: {
                            name: beforeHook.name,
                        },
                    });
                }
            },
            _b;
    },
});
