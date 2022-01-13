"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var await_async_query_1 = __importDefault(require("./rules/await-async-query"));
var await_async_utils_1 = __importDefault(require("./rules/await-async-utils"));
var await_fire_event_1 = __importDefault(require("./rules/await-fire-event"));
var consistent_data_testid_1 = __importDefault(require("./rules/consistent-data-testid"));
var no_await_sync_events_1 = __importDefault(require("./rules/no-await-sync-events"));
var no_await_sync_query_1 = __importDefault(require("./rules/no-await-sync-query"));
var no_debug_1 = __importDefault(require("./rules/no-debug"));
var no_dom_import_1 = __importDefault(require("./rules/no-dom-import"));
var no_manual_cleanup_1 = __importDefault(require("./rules/no-manual-cleanup"));
var no_render_in_setup_1 = __importDefault(require("./rules/no-render-in-setup"));
var no_wait_for_empty_callback_1 = __importDefault(require("./rules/no-wait-for-empty-callback"));
var no_wait_for_snapshot_1 = __importDefault(require("./rules/no-wait-for-snapshot"));
var prefer_explicit_assert_1 = __importDefault(require("./rules/prefer-explicit-assert"));
var prefer_presence_queries_1 = __importDefault(require("./rules/prefer-presence-queries"));
var prefer_screen_queries_1 = __importDefault(require("./rules/prefer-screen-queries"));
var prefer_wait_for_1 = __importDefault(require("./rules/prefer-wait-for"));
var prefer_find_by_1 = __importDefault(require("./rules/prefer-find-by"));
var rules = {
    'await-async-query': await_async_query_1.default,
    'await-async-utils': await_async_utils_1.default,
    'await-fire-event': await_fire_event_1.default,
    'consistent-data-testid': consistent_data_testid_1.default,
    'no-await-sync-events': no_await_sync_events_1.default,
    'no-await-sync-query': no_await_sync_query_1.default,
    'no-debug': no_debug_1.default,
    'no-dom-import': no_dom_import_1.default,
    'no-manual-cleanup': no_manual_cleanup_1.default,
    'no-render-in-setup': no_render_in_setup_1.default,
    'no-wait-for-empty-callback': no_wait_for_empty_callback_1.default,
    'no-wait-for-snapshot': no_wait_for_snapshot_1.default,
    'prefer-explicit-assert': prefer_explicit_assert_1.default,
    'prefer-find-by': prefer_find_by_1.default,
    'prefer-presence-queries': prefer_presence_queries_1.default,
    'prefer-screen-queries': prefer_screen_queries_1.default,
    'prefer-wait-for': prefer_wait_for_1.default,
};
var recommendedRules = {
    'testing-library/await-async-query': 'error',
    'testing-library/await-async-utils': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/prefer-find-by': 'error',
};
module.exports = {
    rules: rules,
    configs: {
        recommended: {
            plugins: ['testing-library'],
            rules: recommendedRules,
        },
        angular: {
            plugins: ['testing-library'],
            rules: __assign(__assign({}, recommendedRules), { 'testing-library/no-debug': 'warn', 'testing-library/no-dom-import': ['error', 'angular'] }),
        },
        react: {
            plugins: ['testing-library'],
            rules: __assign(__assign({}, recommendedRules), { 'testing-library/no-debug': 'warn', 'testing-library/no-dom-import': ['error', 'react'] }),
        },
        vue: {
            plugins: ['testing-library'],
            rules: __assign(__assign({}, recommendedRules), { 'testing-library/await-fire-event': 'error', 'testing-library/no-debug': 'warn', 'testing-library/no-dom-import': ['error', 'vue'] }),
        },
    },
};
