"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'prefer-wait-for';
var DEPRECATED_METHODS = ['wait', 'waitForElement', 'waitForDomChange'];
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Use `waitFor` instead of deprecated wait methods',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            preferWaitForMethod: '`{{ methodName }}` is deprecated in favour of `waitFor`',
            preferWaitForImport: 'import `waitFor` instead of deprecated async utils',
        },
        fixable: 'code',
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var reportImport = function (node) {
            context.report({
                node: node,
                messageId: 'preferWaitForImport',
                fix: function (fixer) {
                    var excludedImports = __spreadArray(__spreadArray([], DEPRECATED_METHODS), ['waitFor']);
                    var newImports = node.specifiers
                        .filter(function (specifier) {
                        return node_utils_1.isImportSpecifier(specifier) &&
                            !excludedImports.includes(specifier.imported.name);
                    })
                        .map(function (specifier) { return specifier.imported.name; });
                    newImports.push('waitFor');
                    var newNode = "import { " + newImports.join(',') + " } from '" + node.source.value + "';";
                    return fixer.replaceText(node, newNode);
                },
            });
        };
        var reportWait = function (node) {
            context.report({
                node: node,
                messageId: 'preferWaitForMethod',
                data: {
                    methodName: node.name,
                },
                fix: function (fixer) {
                    var callExpressionNode = node_utils_1.findClosestCallExpressionNode(node);
                    var arg = callExpressionNode.arguments[0];
                    var fixers = [];
                    if (arg) {
                        fixers.push(fixer.replaceText(node, 'waitFor'));
                        if (node.name === 'waitForDomChange') {
                            fixers.push(fixer.insertTextBefore(arg, '() => {}, '));
                        }
                    }
                    else {
                        var methodReplacement = 'waitFor(() => {})';
                        if (node_utils_1.isMemberExpression(node.parent) &&
                            node_utils_1.isIdentifier(node.parent.object)) {
                            methodReplacement = node.parent.object.name + "." + methodReplacement;
                        }
                        var newText = methodReplacement;
                        fixers.push(fixer.replaceText(callExpressionNode, newText));
                    }
                    return fixers;
                },
            });
        };
        return {
            'ImportDeclaration[source.value=/testing-library/]': function (node) {
                var deprecatedImportSpecifiers = node.specifiers.filter(function (specifier) {
                    return node_utils_1.isImportSpecifier(specifier) &&
                        specifier.imported &&
                        DEPRECATED_METHODS.includes(specifier.imported.name);
                });
                deprecatedImportSpecifiers.forEach(function (importSpecifier, i) {
                    if (i === 0) {
                        reportImport(node);
                    }
                    context
                        .getDeclaredVariables(importSpecifier)
                        .forEach(function (variable) {
                        return variable.references.forEach(function (reference) {
                            return reportWait(reference.identifier);
                        });
                    });
                });
            },
            'ImportDeclaration[source.value=/testing-library/] > ImportNamespaceSpecifier': function (node) {
                context.getDeclaredVariables(node).forEach(function (variable) {
                    return variable.references.forEach(function (reference) {
                        if (node_utils_1.isMemberExpression(reference.identifier.parent) &&
                            node_utils_1.isIdentifier(reference.identifier.parent.property) &&
                            DEPRECATED_METHODS.includes(reference.identifier.parent.property.name)) {
                            reportWait(reference.identifier.parent.property);
                        }
                    });
                });
            },
        };
    },
});
