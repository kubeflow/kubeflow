"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("../utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'no-dom-import';
var DOM_TESTING_LIBRARY_MODULES = [
    'dom-testing-library',
    '@testing-library/dom',
];
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow importing from DOM Testing Library',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            noDomImport: 'import from DOM Testing Library is restricted, import from corresponding Testing Library framework instead',
            noDomImportFramework: 'import from DOM Testing Library is restricted, import from {{module}} instead',
        },
        fixable: 'code',
        schema: [
            {
                type: 'string',
            },
        ],
    },
    defaultOptions: [''],
    create: function (context, _a) {
        var _b;
        var framework = _a[0];
        function report(node, moduleName) {
            if (framework) {
                var isRequire_1 = node_utils_1.isIdentifier(node) && node.name === 'require';
                var correctModuleName_1 = moduleName.replace('dom', framework);
                context.report({
                    node: node,
                    messageId: 'noDomImportFramework',
                    data: {
                        module: correctModuleName_1,
                    },
                    fix: function (fixer) {
                        if (isRequire_1) {
                            var callExpression = node.parent;
                            var name_1 = callExpression.arguments[0];
                            return fixer.replaceText(name_1, name_1.raw.replace(moduleName, correctModuleName_1));
                        }
                        else {
                            var importDeclaration = node;
                            var name_2 = importDeclaration.source;
                            return fixer.replaceText(name_2, name_2.raw.replace(moduleName, correctModuleName_1));
                        }
                    },
                });
            }
            else {
                context.report({
                    node: node,
                    messageId: 'noDomImport',
                });
            }
        }
        return _b = {
                ImportDeclaration: function (node) {
                    var value = node.source.value;
                    var domModuleName = DOM_TESTING_LIBRARY_MODULES.find(function (module) { return module === value; });
                    if (domModuleName) {
                        report(node, domModuleName);
                    }
                }
            },
            _b["CallExpression > Identifier[name=\"require\"]"] = function (node) {
                var callExpression = node.parent;
                var args = callExpression.arguments;
                var literalNodeDomModuleName = args.find(function (args) {
                    return node_utils_1.isLiteral(args) &&
                        typeof args.value === 'string' &&
                        DOM_TESTING_LIBRARY_MODULES.includes(args.value);
                });
                if (literalNodeDomModuleName) {
                    report(node, literalNodeDomModuleName.value);
                }
            },
            _b;
    },
});
