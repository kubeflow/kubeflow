"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'no-manual-cleanup';
var CLEANUP_LIBRARY_REGEX = /(@testing-library\/(preact|react|svelte|vue))|@marko\/testing-library/;
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow the use of `cleanup`',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            noManualCleanup: "`cleanup` is performed automatically by your test runner, you don't need manual cleanups.",
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        var defaultImportFromTestingLibrary;
        var defaultRequireFromTestingLibrary;
        function reportImportReferences(references) {
            if (references && references.length > 0) {
                references.forEach(function (reference) {
                    var utilsUsage = reference.identifier.parent;
                    if (node_utils_1.isMemberExpression(utilsUsage) &&
                        node_utils_1.isIdentifier(utilsUsage.property) &&
                        utilsUsage.property.name === 'cleanup') {
                        context.report({
                            node: utilsUsage.property,
                            messageId: 'noManualCleanup',
                        });
                    }
                });
            }
        }
        return _a = {
                ImportDeclaration: function (node) {
                    var value = node.source.value;
                    var testingLibraryWithCleanup = value.match(CLEANUP_LIBRARY_REGEX);
                    if (!testingLibraryWithCleanup) {
                        return;
                    }
                    if (node_utils_1.isImportDefaultSpecifier(node.specifiers[0])) {
                        defaultImportFromTestingLibrary = node;
                    }
                    var cleanupSpecifier = node.specifiers.find(function (specifier) {
                        return node_utils_1.isImportSpecifier(specifier) &&
                            specifier.imported &&
                            specifier.imported.name === 'cleanup';
                    });
                    if (cleanupSpecifier) {
                        context.report({
                            node: cleanupSpecifier,
                            messageId: 'noManualCleanup',
                        });
                    }
                }
            },
            _a["VariableDeclarator > CallExpression > Identifier[name=\"require\"]"] = function (node) {
                var args = node.parent.arguments;
                var literalNodeCleanupModuleName = args.find(function (args) {
                    return node_utils_1.isLiteral(args) &&
                        typeof args.value === 'string' &&
                        args.value.match(CLEANUP_LIBRARY_REGEX);
                });
                if (!literalNodeCleanupModuleName) {
                    return;
                }
                var declaratorNode = node.parent
                    .parent;
                if (node_utils_1.isObjectPattern(declaratorNode.id)) {
                    var cleanupProperty = declaratorNode.id.properties.find(function (property) {
                        return node_utils_1.isProperty(property) &&
                            node_utils_1.isIdentifier(property.key) &&
                            property.key.name === 'cleanup';
                    });
                    if (cleanupProperty) {
                        context.report({
                            node: cleanupProperty,
                            messageId: 'noManualCleanup',
                        });
                    }
                }
                else {
                    defaultRequireFromTestingLibrary = declaratorNode.id;
                }
            },
            _a['Program:exit'] = function () {
                if (defaultImportFromTestingLibrary) {
                    var references = context.getDeclaredVariables(defaultImportFromTestingLibrary)[0].references;
                    reportImportReferences(references);
                }
                if (defaultRequireFromTestingLibrary) {
                    var references = context
                        .getDeclaredVariables(defaultRequireFromTestingLibrary.parent)[0]
                        .references.slice(1);
                    reportImportReferences(references);
                }
            },
            _a;
    },
});
