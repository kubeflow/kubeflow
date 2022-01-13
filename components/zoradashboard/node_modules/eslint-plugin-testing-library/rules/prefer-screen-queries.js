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
exports.RULE_NAME = 'prefer-screen-queries';
var ALLOWED_RENDER_PROPERTIES_FOR_DESTRUCTURING = [
    'container',
    'baseElement',
];
var ALL_QUERIES_COMBINATIONS_REGEXP = utils_1.ALL_QUERIES_COMBINATIONS.join('|');
function usesContainerOrBaseElement(node) {
    var secondArgument = node.arguments[1];
    return (node_utils_1.isObjectExpression(secondArgument) &&
        secondArgument.properties.some(function (property) {
            return node_utils_1.isProperty(property) &&
                node_utils_1.isIdentifier(property.key) &&
                ALLOWED_RENDER_PROPERTIES_FOR_DESTRUCTURING.includes(property.key.name);
        }));
}
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Suggest using screen while using queries',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            preferScreenQueries: 'Use screen to query DOM elements, `screen.{{ name }}`',
        },
        fixable: null,
        schema: [],
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        function reportInvalidUsage(node) {
            context.report({
                node: node,
                messageId: 'preferScreenQueries',
                data: {
                    name: node.name,
                },
            });
        }
        var queriesRegex = new RegExp(ALL_QUERIES_COMBINATIONS_REGEXP);
        var queriesDestructuredInWithinDeclaration = [];
        var withinDeclaredVariables = [];
        return _a = {
                VariableDeclarator: function (node) {
                    if (!node_utils_1.isCallExpression(node.init) || !node_utils_1.isIdentifier(node.init.callee)) {
                        return;
                    }
                    var isWithinFunction = node.init.callee.name === 'within';
                    var usesRenderOptions = node.init.callee.name === 'render' &&
                        usesContainerOrBaseElement(node.init);
                    if (!isWithinFunction && !usesRenderOptions) {
                        return;
                    }
                    if (node_utils_1.isObjectPattern(node.id)) {
                        var identifiers = node.id.properties
                            .filter(function (property) {
                            return node_utils_1.isProperty(property) &&
                                node_utils_1.isIdentifier(property.key) &&
                                queriesRegex.test(property.key.name);
                        })
                            .map(function (property) {
                            return property.key.name;
                        });
                        queriesDestructuredInWithinDeclaration.push.apply(queriesDestructuredInWithinDeclaration, identifiers);
                        return;
                    }
                    if (node_utils_1.isIdentifier(node.id)) {
                        withinDeclaredVariables.push(node.id.name);
                    }
                }
            },
            _a["CallExpression > Identifier[name=/^" + ALL_QUERIES_COMBINATIONS_REGEXP + "$/]"] = function (node) {
                if (!queriesDestructuredInWithinDeclaration.some(function (queryName) { return queryName === node.name; })) {
                    reportInvalidUsage(node);
                }
            },
            _a["MemberExpression > Identifier[name=/^" + ALL_QUERIES_COMBINATIONS_REGEXP + "$/]"] = function (node) {
                function isIdentifierAllowed(name) {
                    return __spreadArray(['screen'], withinDeclaredVariables).includes(name);
                }
                if (node_utils_1.isIdentifier(node) &&
                    node_utils_1.isMemberExpression(node.parent) &&
                    node_utils_1.isCallExpression(node.parent.object) &&
                    node_utils_1.isIdentifier(node.parent.object.callee) &&
                    node.parent.object.callee.name !== 'within' &&
                    node.parent.object.callee.name === 'render' &&
                    !usesContainerOrBaseElement(node.parent.object)) {
                    reportInvalidUsage(node);
                    return;
                }
                if (node_utils_1.isMemberExpression(node.parent) &&
                    node_utils_1.isIdentifier(node.parent.object) &&
                    !isIdentifierAllowed(node.parent.object.name)) {
                    reportInvalidUsage(node);
                }
            },
            _a;
    },
});
