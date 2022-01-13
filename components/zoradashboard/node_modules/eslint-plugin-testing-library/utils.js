"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABSENCE_MATCHERS = exports.PRESENCE_MATCHERS = exports.LIBRARY_MODULES = exports.TESTING_FRAMEWORK_SETUP_HOOKS = exports.SYNC_EVENTS = exports.ASYNC_UTILS = exports.ALL_QUERIES_COMBINATIONS = exports.ASYNC_QUERIES_COMBINATIONS = exports.SYNC_QUERIES_COMBINATIONS = exports.ALL_QUERIES_METHODS = exports.ALL_QUERIES_VARIANTS = exports.ASYNC_QUERIES_VARIANTS = exports.SYNC_QUERIES_VARIANTS = exports.getDocsUrl = void 0;
var combineQueries = function (variants, methods) {
    var combinedQueries = [];
    variants.forEach(function (variant) {
        var variantPrefix = variant.replace('By', '');
        methods.forEach(function (method) {
            combinedQueries.push("" + variantPrefix + method);
        });
    });
    return combinedQueries;
};
var getDocsUrl = function (ruleName) {
    return "https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/" + ruleName + ".md";
};
exports.getDocsUrl = getDocsUrl;
var LIBRARY_MODULES = [
    '@testing-library/dom',
    '@testing-library/angular',
    '@testing-library/react',
    '@testing-library/preact',
    '@testing-library/vue',
    '@testing-library/svelte',
];
exports.LIBRARY_MODULES = LIBRARY_MODULES;
var SYNC_QUERIES_VARIANTS = ['getBy', 'getAllBy', 'queryBy', 'queryAllBy'];
exports.SYNC_QUERIES_VARIANTS = SYNC_QUERIES_VARIANTS;
var ASYNC_QUERIES_VARIANTS = ['findBy', 'findAllBy'];
exports.ASYNC_QUERIES_VARIANTS = ASYNC_QUERIES_VARIANTS;
var ALL_QUERIES_VARIANTS = __spreadArray(__spreadArray([], SYNC_QUERIES_VARIANTS), ASYNC_QUERIES_VARIANTS);
exports.ALL_QUERIES_VARIANTS = ALL_QUERIES_VARIANTS;
var ALL_QUERIES_METHODS = [
    'ByLabelText',
    'ByPlaceholderText',
    'ByText',
    'ByAltText',
    'ByTitle',
    'ByDisplayValue',
    'ByRole',
    'ByTestId',
];
exports.ALL_QUERIES_METHODS = ALL_QUERIES_METHODS;
var SYNC_QUERIES_COMBINATIONS = combineQueries(SYNC_QUERIES_VARIANTS, ALL_QUERIES_METHODS);
exports.SYNC_QUERIES_COMBINATIONS = SYNC_QUERIES_COMBINATIONS;
var ASYNC_QUERIES_COMBINATIONS = combineQueries(ASYNC_QUERIES_VARIANTS, ALL_QUERIES_METHODS);
exports.ASYNC_QUERIES_COMBINATIONS = ASYNC_QUERIES_COMBINATIONS;
var ALL_QUERIES_COMBINATIONS = __spreadArray(__spreadArray([], SYNC_QUERIES_COMBINATIONS), ASYNC_QUERIES_COMBINATIONS);
exports.ALL_QUERIES_COMBINATIONS = ALL_QUERIES_COMBINATIONS;
var ASYNC_UTILS = [
    'waitFor',
    'waitForElementToBeRemoved',
    'wait',
    'waitForElement',
    'waitForDomChange',
];
exports.ASYNC_UTILS = ASYNC_UTILS;
var SYNC_EVENTS = [
    'fireEvent',
    'userEvent',
];
exports.SYNC_EVENTS = SYNC_EVENTS;
var TESTING_FRAMEWORK_SETUP_HOOKS = ['beforeEach', 'beforeAll'];
exports.TESTING_FRAMEWORK_SETUP_HOOKS = TESTING_FRAMEWORK_SETUP_HOOKS;
var PRESENCE_MATCHERS = ['toBeInTheDocument', 'toBeTruthy', 'toBeDefined'];
exports.PRESENCE_MATCHERS = PRESENCE_MATCHERS;
var ABSENCE_MATCHERS = ['toBeNull', 'toBeFalsy'];
exports.ABSENCE_MATCHERS = ABSENCE_MATCHERS;
