"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _experimentalUtils = require("@typescript-eslint/experimental-utils");

var _utils = require("./utils");

const trimFXprefix = word => ['f', 'x'].includes(word.charAt(0)) ? word.substr(1) : word;

const doesBinaryExpressionContainStringNode = binaryExp => {
  if ((0, _utils.isStringNode)(binaryExp.right)) {
    return true;
  }

  if (binaryExp.left.type === _experimentalUtils.AST_NODE_TYPES.BinaryExpression) {
    return doesBinaryExpressionContainStringNode(binaryExp.left);
  }

  return (0, _utils.isStringNode)(binaryExp.left);
};

const quoteStringValue = node => node.type === _experimentalUtils.AST_NODE_TYPES.TemplateLiteral ? `\`${node.quasis[0].value.raw}\`` : node.raw;

const compileMatcherPatterns = matchers => {
  if (typeof matchers === 'string') {
    const matcher = new RegExp(matchers, 'u');
    return {
      describe: matcher,
      test: matcher,
      it: matcher
    };
  }

  return {
    describe: matchers.describe ? new RegExp(matchers.describe, 'u') : null,
    test: matchers.test ? new RegExp(matchers.test, 'u') : null,
    it: matchers.it ? new RegExp(matchers.it, 'u') : null
  };
};

var _default = (0, _utils.createRule)({
  name: __filename,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Enforce valid titles',
      recommended: 'error'
    },
    messages: {
      titleMustBeString: 'Title must be a string',
      emptyTitle: '{{ jestFunctionName }} should not have an empty title',
      duplicatePrefix: 'should not have duplicate prefix',
      accidentalSpace: 'should not have leading or trailing spaces',
      disallowedWord: '"{{ word }}" is not allowed in test titles.',
      mustNotMatch: '{{ jestFunctionName }} should not match {{ pattern }}',
      mustMatch: '{{ jestFunctionName }} should match {{ pattern }}'
    },
    type: 'suggestion',
    schema: [{
      type: 'object',
      properties: {
        ignoreTypeOfDescribeName: {
          type: 'boolean',
          default: false
        },
        disallowedWords: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        mustNotMatch: {
          oneOf: [{
            type: 'string'
          }, {
            type: 'object',
            properties: {
              describe: {
                type: 'string'
              },
              test: {
                type: 'string'
              },
              it: {
                type: 'string'
              }
            },
            additionalProperties: false
          }]
        },
        mustMatch: {
          oneOf: [{
            type: 'string'
          }, {
            type: 'object',
            properties: {
              describe: {
                type: 'string'
              },
              test: {
                type: 'string'
              },
              it: {
                type: 'string'
              }
            },
            additionalProperties: false
          }]
        }
      },
      additionalProperties: false
    }],
    fixable: 'code'
  },
  defaultOptions: [{
    ignoreTypeOfDescribeName: false,
    disallowedWords: []
  }],

  create(context, [{
    ignoreTypeOfDescribeName,
    disallowedWords = [],
    mustNotMatch,
    mustMatch
  }]) {
    const disallowedWordsRegexp = new RegExp(`\\b(${disallowedWords.join('|')})\\b`, 'iu');
    const mustNotMatchPatterns = compileMatcherPatterns(mustNotMatch !== null && mustNotMatch !== void 0 ? mustNotMatch : {});
    const mustMatchPatterns = compileMatcherPatterns(mustMatch !== null && mustMatch !== void 0 ? mustMatch : {});
    return {
      CallExpression(node) {
        if (!(0, _utils.isDescribeCall)(node) && !(0, _utils.isTestCaseCall)(node)) {
          return;
        }

        const [argument] = node.arguments;

        if (!argument) {
          return;
        }

        if (!(0, _utils.isStringNode)(argument)) {
          if (argument.type === _experimentalUtils.AST_NODE_TYPES.BinaryExpression && doesBinaryExpressionContainStringNode(argument)) {
            return;
          }

          if (argument.type !== _experimentalUtils.AST_NODE_TYPES.TemplateLiteral && !(ignoreTypeOfDescribeName && (0, _utils.isDescribeCall)(node))) {
            context.report({
              messageId: 'titleMustBeString',
              loc: argument.loc
            });
          }

          return;
        }

        const title = (0, _utils.getStringValue)(argument);

        if (!title) {
          context.report({
            messageId: 'emptyTitle',
            data: {
              jestFunctionName: (0, _utils.isDescribeCall)(node) ? _utils.DescribeAlias.describe : _utils.TestCaseName.test
            },
            node
          });
          return;
        }

        if (disallowedWords.length > 0) {
          const disallowedMatch = disallowedWordsRegexp.exec(title);

          if (disallowedMatch) {
            context.report({
              data: {
                word: disallowedMatch[1]
              },
              messageId: 'disallowedWord',
              node: argument
            });
            return;
          }
        }

        if (title.trim().length !== title.length) {
          context.report({
            messageId: 'accidentalSpace',
            node: argument,
            fix: fixer => [fixer.replaceTextRange(argument.range, quoteStringValue(argument).replace(/^([`'"]) +?/u, '$1').replace(/ +?([`'"])$/u, '$1'))]
          });
        }

        const nodeName = trimFXprefix((0, _utils.getNodeName)(node));
        const [firstWord] = title.split(' ');

        if (firstWord.toLowerCase() === nodeName) {
          context.report({
            messageId: 'duplicatePrefix',
            node: argument,
            fix: fixer => [fixer.replaceTextRange(argument.range, quoteStringValue(argument).replace(/^([`'"]).+? /u, '$1'))]
          });
        }

        const [jestFunctionName] = nodeName.split('.');
        const mustNotMatchPattern = mustNotMatchPatterns[jestFunctionName];

        if (mustNotMatchPattern) {
          if (mustNotMatchPattern.test(title)) {
            context.report({
              messageId: 'mustNotMatch',
              node: argument,
              data: {
                jestFunctionName,
                pattern: mustNotMatchPattern
              }
            });
            return;
          }
        }

        const mustMatchPattern = mustMatchPatterns[jestFunctionName];

        if (mustMatchPattern) {
          if (!mustMatchPattern.test(title)) {
            context.report({
              messageId: 'mustMatch',
              node: argument,
              data: {
                jestFunctionName,
                pattern: mustMatchPattern
              }
            });
            return;
          }
        }
      }

    };
  }

});

exports.default = _default;