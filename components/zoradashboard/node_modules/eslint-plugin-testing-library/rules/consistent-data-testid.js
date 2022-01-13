"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
var utils_1 = require("../utils");
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'consistent-data-testid';
var FILENAME_PLACEHOLDER = '{fileName}';
exports.default = experimental_utils_1.ESLintUtils.RuleCreator(utils_1.getDocsUrl)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures consistent usage of `data-testid`',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            invalidTestId: '`{{attr}}` "{{value}}" should match `{{regex}}`',
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                default: {},
                additionalProperties: false,
                required: ['testIdPattern'],
                properties: {
                    testIdPattern: {
                        type: 'string',
                    },
                    testIdAttribute: {
                        default: 'data-testid',
                        oneOf: [
                            {
                                type: 'string',
                            },
                            {
                                type: 'array',
                                items: {
                                    type: 'string',
                                },
                            },
                        ],
                    },
                },
            },
        ],
    },
    defaultOptions: [
        {
            testIdPattern: '',
            testIdAttribute: 'data-testid',
        },
    ],
    create: function (context, _a) {
        var _b;
        var options = _a[0];
        var getFilename = context.getFilename;
        var testIdPattern = options.testIdPattern, attr = options.testIdAttribute;
        function getFileNameData() {
            var splitPath = getFilename().split('/');
            var fileNameWithExtension = splitPath.pop();
            var parent = splitPath.pop();
            var fileName = fileNameWithExtension.split('.').shift();
            return {
                fileName: fileName === 'index' ? parent : fileName,
            };
        }
        function getTestIdValidator(fileName) {
            return new RegExp(testIdPattern.replace(FILENAME_PLACEHOLDER, fileName));
        }
        function isTestIdAttribute(name) {
            if (typeof attr === 'string') {
                return attr === name;
            }
            else {
                return attr.includes(name);
            }
        }
        return _b = {},
            _b["JSXIdentifier"] = function (node) {
                if (!node_utils_1.isJSXAttribute(node.parent) ||
                    !node_utils_1.isLiteral(node.parent.value) ||
                    !isTestIdAttribute(node.name)) {
                    return;
                }
                var value = node.parent.value.value;
                var fileName = getFileNameData().fileName;
                var regex = getTestIdValidator(fileName);
                if (value && typeof value === 'string' && !regex.test(value)) {
                    context.report({
                        node: node,
                        messageId: 'invalidTestId',
                        data: {
                            attr: node.name,
                            value: value,
                            regex: regex,
                        },
                    });
                }
            },
            _b;
    },
});
