"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFindByQueryVariant = exports.WAIT_METHODS = exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var node_utils_1 = require("../node-utils");
var utils_1 = require("../utils");
exports.RULE_NAME = 'prefer-find-by';
exports.WAIT_METHODS = ['waitFor', 'waitForElement', 'wait'];
function getFindByQueryVariant(queryMethod) {
    return queryMethod.includes('All') ? 'findAllBy' : 'findBy';
}
exports.getFindByQueryVariant = getFindByQueryVariant;
function findRenderDefinitionDeclaration(scope, query) {
    if (!scope) {
        return null;
    }
    var variable = scope.variables.find(function (v) { return v.name === query; });
    if (variable) {
        var def = variable.defs.find(function (_a) {
            var name = _a.name;
            return name.name === query;
        });
        return def.name;
    }
    return findRenderDefinitionDeclaration(scope.upper, query);
}
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Suggest using find* instead of waitFor to wait for elements',
            category: 'Best Practices',
            recommended: 'warn',
        },
        messages: {
            preferFindBy: 'Prefer {{queryVariant}}{{queryMethod}} method over using await {{fullQuery}}',
        },
        fixable: 'code',
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var sourceCode = context.getSourceCode();
        function reportInvalidUsage(node, _a) {
            var queryVariant = _a.queryVariant, queryMethod = _a.queryMethod, fix = _a.fix;
            context.report({
                node: node,
                messageId: 'preferFindBy',
                data: {
                    queryVariant: queryVariant,
                    queryMethod: queryMethod,
                    fullQuery: sourceCode.getText(node),
                },
                fix: fix,
            });
        }
        return {
            'AwaitExpression > CallExpression': function (node) {
                if (!node_utils_1.isIdentifier(node.callee) ||
                    !exports.WAIT_METHODS.includes(node.callee.name)) {
                    return;
                }
                var argument = node.arguments[0];
                if (!node_utils_1.isArrowFunctionExpression(argument)) {
                    return;
                }
                if (!node_utils_1.isCallExpression(argument.body)) {
                    return;
                }
                if (node_utils_1.isMemberExpression(argument.body.callee) &&
                    node_utils_1.isIdentifier(argument.body.callee.property) &&
                    node_utils_1.isIdentifier(argument.body.callee.object) &&
                    utils_1.SYNC_QUERIES_COMBINATIONS.includes(argument.body.callee.property.name)) {
                    var fullQueryMethod = argument.body.callee.property.name;
                    var caller_1 = argument.body.callee.object.name;
                    var queryVariant_1 = getFindByQueryVariant(fullQueryMethod);
                    var callArguments_1 = argument.body.arguments;
                    var queryMethod_1 = fullQueryMethod.split('By')[1];
                    reportInvalidUsage(node, {
                        queryMethod: queryMethod_1,
                        queryVariant: queryVariant_1,
                        fix: function (fixer) {
                            var newCode = caller_1 + "." + queryVariant_1 + queryMethod_1 + "(" + callArguments_1
                                .map(function (node) { return sourceCode.getText(node); })
                                .join(', ') + ")";
                            return fixer.replaceText(node, newCode);
                        },
                    });
                    return;
                }
                if (node_utils_1.isIdentifier(argument.body.callee) &&
                    utils_1.SYNC_QUERIES_COMBINATIONS.includes(argument.body.callee.name)) {
                    var fullQueryMethod_1 = argument.body.callee.name;
                    var queryMethod_2 = fullQueryMethod_1.split('By')[1];
                    var queryVariant_2 = getFindByQueryVariant(fullQueryMethod_1);
                    var callArguments_2 = argument.body.arguments;
                    reportInvalidUsage(node, {
                        queryMethod: queryMethod_2,
                        queryVariant: queryVariant_2,
                        fix: function (fixer) {
                            var findByMethod = "" + queryVariant_2 + queryMethod_2;
                            var allFixes = [];
                            var newCode = findByMethod + "(" + callArguments_2
                                .map(function (node) { return sourceCode.getText(node); })
                                .join(', ') + ")";
                            allFixes.push(fixer.replaceText(node, newCode));
                            var definition = findRenderDefinitionDeclaration(context.getScope(), fullQueryMethod_1);
                            if (!definition) {
                                return allFixes;
                            }
                            if (node_utils_1.isObjectPattern(definition.parent.parent)) {
                                var allVariableDeclarations = definition.parent.parent;
                                if (allVariableDeclarations.properties.some(function (p) {
                                    return node_utils_1.isProperty(p) &&
                                        node_utils_1.isIdentifier(p.key) &&
                                        p.key.name === findByMethod;
                                })) {
                                    return allFixes;
                                }
                                var textDestructuring = sourceCode.getText(allVariableDeclarations);
                                var text = textDestructuring.substring(0, textDestructuring.length - 2) +
                                    (", " + findByMethod + " }");
                                allFixes.push(fixer.replaceText(allVariableDeclarations, text));
                            }
                            return allFixes;
                        },
                    });
                    return;
                }
            },
        };
    },
});
