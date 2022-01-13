'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var firebase = require('@firebase/app');
require('@firebase/installations');
var logger$1 = require('@firebase/logger');
var util = require('@firebase/util');
var component = require('@firebase/component');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var firebase__default = /*#__PURE__*/_interopDefaultLegacy(firebase);

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Key to attach FID to in gtag params.
var GA_FID_KEY = 'firebase_id';
var ORIGIN_KEY = 'origin';
var FETCH_TIMEOUT_MILLIS = 60 * 1000;
var DYNAMIC_CONFIG_URL = 'https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig';
var GTAG_URL = 'https://www.googletagmanager.com/gtag/js';
var GtagCommand;
(function (GtagCommand) {
    GtagCommand["EVENT"] = "event";
    GtagCommand["SET"] = "set";
    GtagCommand["CONFIG"] = "config";
})(GtagCommand || (GtagCommand = {}));
/**
 * Officially recommended event names for gtag.js
 * Any other string is also allowed.
 *
 * @public
 */
var EventName;
(function (EventName) {
    EventName["ADD_SHIPPING_INFO"] = "add_shipping_info";
    EventName["ADD_PAYMENT_INFO"] = "add_payment_info";
    EventName["ADD_TO_CART"] = "add_to_cart";
    EventName["ADD_TO_WISHLIST"] = "add_to_wishlist";
    EventName["BEGIN_CHECKOUT"] = "begin_checkout";
    /**
     * @deprecated
     * This event name is deprecated and is unsupported in updated
     * Enhanced Ecommerce reports.
     */
    EventName["CHECKOUT_PROGRESS"] = "checkout_progress";
    EventName["EXCEPTION"] = "exception";
    EventName["GENERATE_LEAD"] = "generate_lead";
    EventName["LOGIN"] = "login";
    EventName["PAGE_VIEW"] = "page_view";
    EventName["PURCHASE"] = "purchase";
    EventName["REFUND"] = "refund";
    EventName["REMOVE_FROM_CART"] = "remove_from_cart";
    EventName["SCREEN_VIEW"] = "screen_view";
    EventName["SEARCH"] = "search";
    EventName["SELECT_CONTENT"] = "select_content";
    EventName["SELECT_ITEM"] = "select_item";
    EventName["SELECT_PROMOTION"] = "select_promotion";
    /** @deprecated */
    EventName["SET_CHECKOUT_OPTION"] = "set_checkout_option";
    EventName["SHARE"] = "share";
    EventName["SIGN_UP"] = "sign_up";
    EventName["TIMING_COMPLETE"] = "timing_complete";
    EventName["VIEW_CART"] = "view_cart";
    EventName["VIEW_ITEM"] = "view_item";
    EventName["VIEW_ITEM_LIST"] = "view_item_list";
    EventName["VIEW_PROMOTION"] = "view_promotion";
    EventName["VIEW_SEARCH_RESULTS"] = "view_search_results";
})(EventName || (EventName = {}));

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Logs an analytics event through the Firebase SDK.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param eventName Google Analytics event name, choose from standard list or use a custom string.
 * @param eventParams Analytics event parameters.
 */
function logEvent(gtagFunction, initializationPromise, eventName, eventParams, options) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var measurementId, params;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(options && options.global)) return [3 /*break*/, 1];
                    gtagFunction(GtagCommand.EVENT, eventName, eventParams);
                    return [2 /*return*/];
                case 1: return [4 /*yield*/, initializationPromise];
                case 2:
                    measurementId = _a.sent();
                    params = tslib.__assign(tslib.__assign({}, eventParams), { 'send_to': measurementId });
                    gtagFunction(GtagCommand.EVENT, eventName, params);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Set screen_name parameter for this Google Analytics ID.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param screenName Screen name string to set.
 */
function setCurrentScreen(gtagFunction, initializationPromise, screenName, options) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var measurementId;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(options && options.global)) return [3 /*break*/, 1];
                    gtagFunction(GtagCommand.SET, { 'screen_name': screenName });
                    return [2 /*return*/, Promise.resolve()];
                case 1: return [4 /*yield*/, initializationPromise];
                case 2:
                    measurementId = _a.sent();
                    gtagFunction(GtagCommand.CONFIG, measurementId, {
                        update: true,
                        'screen_name': screenName
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Set user_id parameter for this Google Analytics ID.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param id User ID string to set
 */
function setUserId(gtagFunction, initializationPromise, id, options) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var measurementId;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(options && options.global)) return [3 /*break*/, 1];
                    gtagFunction(GtagCommand.SET, { 'user_id': id });
                    return [2 /*return*/, Promise.resolve()];
                case 1: return [4 /*yield*/, initializationPromise];
                case 2:
                    measurementId = _a.sent();
                    gtagFunction(GtagCommand.CONFIG, measurementId, {
                        update: true,
                        'user_id': id
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Set all other user properties other than user_id and screen_name.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param properties Map of user properties to set
 */
function setUserProperties(gtagFunction, initializationPromise, properties, options) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var flatProperties, _i, _a, key, measurementId;
        return tslib.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(options && options.global)) return [3 /*break*/, 1];
                    flatProperties = {};
                    for (_i = 0, _a = Object.keys(properties); _i < _a.length; _i++) {
                        key = _a[_i];
                        // use dot notation for merge behavior in gtag.js
                        flatProperties["user_properties." + key] = properties[key];
                    }
                    gtagFunction(GtagCommand.SET, flatProperties);
                    return [2 /*return*/, Promise.resolve()];
                case 1: return [4 /*yield*/, initializationPromise];
                case 2:
                    measurementId = _b.sent();
                    gtagFunction(GtagCommand.CONFIG, measurementId, {
                        update: true,
                        'user_properties': properties
                    });
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Set whether collection is enabled for this ID.
 *
 * @param enabled If true, collection is enabled for this ID.
 */
function setAnalyticsCollectionEnabled(initializationPromise, enabled) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var measurementId;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initializationPromise];
                case 1:
                    measurementId = _a.sent();
                    window["ga-disable-" + measurementId] = !enabled;
                    return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logger = new logger$1.Logger('@firebase/analytics');

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Inserts gtag script tag into the page to asynchronously download gtag.
 * @param dataLayerName Name of datalayer (most often the default, "_dataLayer").
 */
function insertScriptTag(dataLayerName, measurementId) {
    var script = document.createElement('script');
    script.src = GTAG_URL + "?l=" + dataLayerName + "&id=" + measurementId;
    script.async = true;
    document.head.appendChild(script);
}
/**
 * Get reference to, or create, global datalayer.
 * @param dataLayerName Name of datalayer (most often the default, "_dataLayer").
 */
function getOrCreateDataLayer(dataLayerName) {
    // Check for existing dataLayer and create if needed.
    var dataLayer = [];
    if (Array.isArray(window[dataLayerName])) {
        dataLayer = window[dataLayerName];
    }
    else {
        window[dataLayerName] = dataLayer;
    }
    return dataLayer;
}
/**
 * Wrapped gtag logic when gtag is called with 'config' command.
 *
 * @param gtagCore Basic gtag function that just appends to dataLayer.
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
 * @param measurementId GA Measurement ID to set config for.
 * @param gtagParams Gtag config params to set.
 */
function gtagOnConfig(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, measurementId, gtagParams) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var correspondingAppId, dynamicConfigResults, foundConfig, e_1;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    correspondingAppId = measurementIdToAppId[measurementId];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (!correspondingAppId) return [3 /*break*/, 3];
                    return [4 /*yield*/, initializationPromisesMap[correspondingAppId]];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, Promise.all(dynamicConfigPromisesList)];
                case 4:
                    dynamicConfigResults = _a.sent();
                    foundConfig = dynamicConfigResults.find(function (config) { return config.measurementId === measurementId; });
                    if (!foundConfig) return [3 /*break*/, 6];
                    return [4 /*yield*/, initializationPromisesMap[foundConfig.appId]];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    logger.error(e_1);
                    return [3 /*break*/, 8];
                case 8:
                    gtagCore(GtagCommand.CONFIG, measurementId, gtagParams);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Wrapped gtag logic when gtag is called with 'event' command.
 *
 * @param gtagCore Basic gtag function that just appends to dataLayer.
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementId GA Measurement ID to log event to.
 * @param gtagParams Params to log with this event.
 */
function gtagOnEvent(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementId, gtagParams) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var initializationPromisesToWaitFor, gaSendToList, dynamicConfigResults, _loop_1, _i, gaSendToList_1, sendToId, state_1, e_2;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    initializationPromisesToWaitFor = [];
                    if (!(gtagParams && gtagParams['send_to'])) return [3 /*break*/, 2];
                    gaSendToList = gtagParams['send_to'];
                    // Make it an array if is isn't, so it can be dealt with the same way.
                    if (!Array.isArray(gaSendToList)) {
                        gaSendToList = [gaSendToList];
                    }
                    return [4 /*yield*/, Promise.all(dynamicConfigPromisesList)];
                case 1:
                    dynamicConfigResults = _a.sent();
                    _loop_1 = function (sendToId) {
                        // Any fetched dynamic measurement ID that matches this 'send_to' ID
                        var foundConfig = dynamicConfigResults.find(function (config) { return config.measurementId === sendToId; });
                        var initializationPromise = foundConfig && initializationPromisesMap[foundConfig.appId];
                        if (initializationPromise) {
                            initializationPromisesToWaitFor.push(initializationPromise);
                        }
                        else {
                            // Found an item in 'send_to' that is not associated
                            // directly with an FID, possibly a group.  Empty this array,
                            // exit the loop early, and let it get populated below.
                            initializationPromisesToWaitFor = [];
                            return "break";
                        }
                    };
                    for (_i = 0, gaSendToList_1 = gaSendToList; _i < gaSendToList_1.length; _i++) {
                        sendToId = gaSendToList_1[_i];
                        state_1 = _loop_1(sendToId);
                        if (state_1 === "break")
                            break;
                    }
                    _a.label = 2;
                case 2:
                    // This will be unpopulated if there was no 'send_to' field , or
                    // if not all entries in the 'send_to' field could be mapped to
                    // a FID. In these cases, wait on all pending initialization promises.
                    if (initializationPromisesToWaitFor.length === 0) {
                        initializationPromisesToWaitFor = Object.values(initializationPromisesMap);
                    }
                    // Run core gtag function with args after all relevant initialization
                    // promises have been resolved.
                    return [4 /*yield*/, Promise.all(initializationPromisesToWaitFor)];
                case 3:
                    // Run core gtag function with args after all relevant initialization
                    // promises have been resolved.
                    _a.sent();
                    // Workaround for http://b/141370449 - third argument cannot be undefined.
                    gtagCore(GtagCommand.EVENT, measurementId, gtagParams || {});
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    logger.error(e_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Wraps a standard gtag function with extra code to wait for completion of
 * relevant initialization promises before sending requests.
 *
 * @param gtagCore Basic gtag function that just appends to dataLayer.
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
 */
function wrapGtag(gtagCore, 
/**
 * Allows wrapped gtag calls to wait on whichever intialization promises are required,
 * depending on the contents of the gtag params' `send_to` field, if any.
 */
initializationPromisesMap, 
/**
 * Wrapped gtag calls sometimes require all dynamic config fetches to have returned
 * before determining what initialization promises (which include FIDs) to wait for.
 */
dynamicConfigPromisesList, 
/**
 * Wrapped gtag config calls can narrow down which initialization promise (with FID)
 * to wait for if the measurementId is already fetched, by getting the corresponding appId,
 * which is the key for the initialization promises map.
 */
measurementIdToAppId) {
    /**
     * Wrapper around gtag that ensures FID is sent with gtag calls.
     * @param command Gtag command type.
     * @param idOrNameOrParams Measurement ID if command is EVENT/CONFIG, params if command is SET.
     * @param gtagParams Params if event is EVENT/CONFIG.
     */
    function gtagWrapper(command, idOrNameOrParams, gtagParams) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var e_3;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(command === GtagCommand.EVENT)) return [3 /*break*/, 2];
                        // If EVENT, second arg must be measurementId.
                        return [4 /*yield*/, gtagOnEvent(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, idOrNameOrParams, gtagParams)];
                    case 1:
                        // If EVENT, second arg must be measurementId.
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(command === GtagCommand.CONFIG)) return [3 /*break*/, 4];
                        // If CONFIG, second arg must be measurementId.
                        return [4 /*yield*/, gtagOnConfig(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, idOrNameOrParams, gtagParams)];
                    case 3:
                        // If CONFIG, second arg must be measurementId.
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        // If SET, second arg must be params.
                        gtagCore(GtagCommand.SET, idOrNameOrParams);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_3 = _a.sent();
                        logger.error(e_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    return gtagWrapper;
}
/**
 * Creates global gtag function or wraps existing one if found.
 * This wrapped function attaches Firebase instance ID (FID) to gtag 'config' and
 * 'event' calls that belong to the GAID associated with this Firebase instance.
 *
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
 * @param dataLayerName Name of global GA datalayer array.
 * @param gtagFunctionName Name of global gtag function ("gtag" if not user-specified).
 */
function wrapOrCreateGtag(initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, dataLayerName, gtagFunctionName) {
    // Create a basic core gtag function
    var gtagCore = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        // Must push IArguments object, not an array.
        window[dataLayerName].push(arguments);
    };
    // Replace it with existing one if found
    if (window[gtagFunctionName] &&
        typeof window[gtagFunctionName] === 'function') {
        // @ts-ignore
        gtagCore = window[gtagFunctionName];
    }
    window[gtagFunctionName] = wrapGtag(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId);
    return {
        gtagCore: gtagCore,
        wrappedGtag: window[gtagFunctionName]
    };
}
/**
 * Returns first script tag in DOM matching our gtag url pattern.
 */
function findGtagScriptOnPage() {
    var scriptTags = window.document.getElementsByTagName('script');
    for (var _i = 0, _a = Object.values(scriptTags); _i < _a.length; _i++) {
        var tag = _a[_i];
        if (tag.src && tag.src.includes(GTAG_URL)) {
            return tag;
        }
    }
    return null;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
var ERRORS = (_a = {},
    _a["already-exists" /* ALREADY_EXISTS */] = 'A Firebase Analytics instance with the appId {$id} ' +
        ' already exists. ' +
        'Only one Firebase Analytics instance can be created for each appId.',
    _a["already-initialized" /* ALREADY_INITIALIZED */] = 'Firebase Analytics has already been initialized.' +
        'settings() must be called before initializing any Analytics instance' +
        'or it will have no effect.',
    _a["interop-component-reg-failed" /* INTEROP_COMPONENT_REG_FAILED */] = 'Firebase Analytics Interop Component failed to instantiate: {$reason}',
    _a["invalid-analytics-context" /* INVALID_ANALYTICS_CONTEXT */] = 'Firebase Analytics is not supported in this environment. ' +
        'Wrap initialization of analytics in analytics.isSupported() ' +
        'to prevent initialization in unsupported environments. Details: {$errorInfo}',
    _a["indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */] = 'IndexedDB unavailable or restricted in this environment. ' +
        'Wrap initialization of analytics in analytics.isSupported() ' +
        'to prevent initialization in unsupported environments. Details: {$errorInfo}',
    _a["fetch-throttle" /* FETCH_THROTTLE */] = 'The config fetch request timed out while in an exponential backoff state.' +
        ' Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',
    _a["config-fetch-failed" /* CONFIG_FETCH_FAILED */] = 'Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}',
    _a["no-api-key" /* NO_API_KEY */] = 'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field to' +
        'contain a valid API key.',
    _a["no-app-id" /* NO_APP_ID */] = 'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field to' +
        'contain a valid app ID.',
    _a);
var ERROR_FACTORY = new util.ErrorFactory('analytics', 'Analytics', ERRORS);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Backoff factor for 503 errors, which we want to be conservative about
 * to avoid overloading servers. Each retry interval will be
 * BASE_INTERVAL_MILLIS * LONG_RETRY_FACTOR ^ retryCount, so the second one
 * will be ~30 seconds (with fuzzing).
 */
var LONG_RETRY_FACTOR = 30;
/**
 * Base wait interval to multiplied by backoffFactor^backoffCount.
 */
var BASE_INTERVAL_MILLIS = 1000;
/**
 * Stubbable retry data storage class.
 */
var RetryData = /** @class */ (function () {
    function RetryData(throttleMetadata, intervalMillis) {
        if (throttleMetadata === void 0) { throttleMetadata = {}; }
        if (intervalMillis === void 0) { intervalMillis = BASE_INTERVAL_MILLIS; }
        this.throttleMetadata = throttleMetadata;
        this.intervalMillis = intervalMillis;
    }
    RetryData.prototype.getThrottleMetadata = function (appId) {
        return this.throttleMetadata[appId];
    };
    RetryData.prototype.setThrottleMetadata = function (appId, metadata) {
        this.throttleMetadata[appId] = metadata;
    };
    RetryData.prototype.deleteThrottleMetadata = function (appId) {
        delete this.throttleMetadata[appId];
    };
    return RetryData;
}());
var defaultRetryData = new RetryData();
/**
 * Set GET request headers.
 * @param apiKey App API key.
 */
function getHeaders(apiKey) {
    return new Headers({
        Accept: 'application/json',
        'x-goog-api-key': apiKey
    });
}
/**
 * Fetches dynamic config from backend.
 * @param app Firebase app to fetch config for.
 */
function fetchDynamicConfig(appFields) {
    var _a;
    return tslib.__awaiter(this, void 0, void 0, function () {
        var appId, apiKey, request, appUrl, response, errorMessage, jsonResponse;
        return tslib.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    appId = appFields.appId, apiKey = appFields.apiKey;
                    request = {
                        method: 'GET',
                        headers: getHeaders(apiKey)
                    };
                    appUrl = DYNAMIC_CONFIG_URL.replace('{app-id}', appId);
                    return [4 /*yield*/, fetch(appUrl, request)];
                case 1:
                    response = _b.sent();
                    if (!(response.status !== 200 && response.status !== 304)) return [3 /*break*/, 6];
                    errorMessage = '';
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, response.json()];
                case 3:
                    jsonResponse = (_b.sent());
                    if ((_a = jsonResponse.error) === null || _a === void 0 ? void 0 : _a.message) {
                        errorMessage = jsonResponse.error.message;
                    }
                    return [3 /*break*/, 5];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 5: throw ERROR_FACTORY.create("config-fetch-failed" /* CONFIG_FETCH_FAILED */, {
                    httpStatus: response.status,
                    responseMessage: errorMessage
                });
                case 6: return [2 /*return*/, response.json()];
            }
        });
    });
}
/**
 * Fetches dynamic config from backend, retrying if failed.
 * @param app Firebase app to fetch config for.
 */
function fetchDynamicConfigWithRetry(app, 
// retryData and timeoutMillis are parameterized to allow passing a different value for testing.
retryData, timeoutMillis) {
    if (retryData === void 0) { retryData = defaultRetryData; }
    return tslib.__awaiter(this, void 0, void 0, function () {
        var _a, appId, apiKey, measurementId, throttleMetadata, signal;
        var _this = this;
        return tslib.__generator(this, function (_b) {
            _a = app.options, appId = _a.appId, apiKey = _a.apiKey, measurementId = _a.measurementId;
            if (!appId) {
                throw ERROR_FACTORY.create("no-app-id" /* NO_APP_ID */);
            }
            if (!apiKey) {
                if (measurementId) {
                    return [2 /*return*/, {
                            measurementId: measurementId,
                            appId: appId
                        }];
                }
                throw ERROR_FACTORY.create("no-api-key" /* NO_API_KEY */);
            }
            throttleMetadata = retryData.getThrottleMetadata(appId) || {
                backoffCount: 0,
                throttleEndTimeMillis: Date.now()
            };
            signal = new AnalyticsAbortSignal();
            setTimeout(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    // Note a very low delay, eg < 10ms, can elapse before listeners are initialized.
                    signal.abort();
                    return [2 /*return*/];
                });
            }); }, timeoutMillis !== undefined ? timeoutMillis : FETCH_TIMEOUT_MILLIS);
            return [2 /*return*/, attemptFetchDynamicConfigWithRetry({ appId: appId, apiKey: apiKey, measurementId: measurementId }, throttleMetadata, signal, retryData)];
        });
    });
}
/**
 * Runs one retry attempt.
 * @param appFields Necessary app config fields.
 * @param throttleMetadata Ongoing metadata to determine throttling times.
 * @param signal Abort signal.
 */
function attemptFetchDynamicConfigWithRetry(appFields, _a, signal, retryData // for testing
) {
    var throttleEndTimeMillis = _a.throttleEndTimeMillis, backoffCount = _a.backoffCount;
    if (retryData === void 0) { retryData = defaultRetryData; }
    return tslib.__awaiter(this, void 0, void 0, function () {
        var appId, measurementId, e_1, response, e_2, backoffMillis, throttleMetadata;
        return tslib.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    appId = appFields.appId, measurementId = appFields.measurementId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, setAbortableTimeout(signal, throttleEndTimeMillis)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    if (measurementId) {
                        logger.warn("Timed out fetching this Firebase app's measurement ID from the server." +
                            (" Falling back to the measurement ID " + measurementId) +
                            (" provided in the \"measurementId\" field in the local Firebase config. [" + e_1.message + "]"));
                        return [2 /*return*/, { appId: appId, measurementId: measurementId }];
                    }
                    throw e_1;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, fetchDynamicConfig(appFields)];
                case 5:
                    response = _b.sent();
                    // Note the SDK only clears throttle state if response is success or non-retriable.
                    retryData.deleteThrottleMetadata(appId);
                    return [2 /*return*/, response];
                case 6:
                    e_2 = _b.sent();
                    if (!isRetriableError(e_2)) {
                        retryData.deleteThrottleMetadata(appId);
                        if (measurementId) {
                            logger.warn("Failed to fetch this Firebase app's measurement ID from the server." +
                                (" Falling back to the measurement ID " + measurementId) +
                                (" provided in the \"measurementId\" field in the local Firebase config. [" + e_2.message + "]"));
                            return [2 /*return*/, { appId: appId, measurementId: measurementId }];
                        }
                        else {
                            throw e_2;
                        }
                    }
                    backoffMillis = Number(e_2.customData.httpStatus) === 503
                        ? util.calculateBackoffMillis(backoffCount, retryData.intervalMillis, LONG_RETRY_FACTOR)
                        : util.calculateBackoffMillis(backoffCount, retryData.intervalMillis);
                    throttleMetadata = {
                        throttleEndTimeMillis: Date.now() + backoffMillis,
                        backoffCount: backoffCount + 1
                    };
                    // Persists state.
                    retryData.setThrottleMetadata(appId, throttleMetadata);
                    logger.debug("Calling attemptFetch again in " + backoffMillis + " millis");
                    return [2 /*return*/, attemptFetchDynamicConfigWithRetry(appFields, throttleMetadata, signal, retryData)];
                case 7: return [2 /*return*/];
            }
        });
    });
}
/**
 * Supports waiting on a backoff by:
 *
 * <ul>
 *   <li>Promisifying setTimeout, so we can set a timeout in our Promise chain</li>
 *   <li>Listening on a signal bus for abort events, just like the Fetch API</li>
 *   <li>Failing in the same way the Fetch API fails, so timing out a live request and a throttled
 *       request appear the same.</li>
 * </ul>
 *
 * <p>Visible for testing.
 */
function setAbortableTimeout(signal, throttleEndTimeMillis) {
    return new Promise(function (resolve, reject) {
        // Derives backoff from given end time, normalizing negative numbers to zero.
        var backoffMillis = Math.max(throttleEndTimeMillis - Date.now(), 0);
        var timeout = setTimeout(resolve, backoffMillis);
        // Adds listener, rather than sets onabort, because signal is a shared object.
        signal.addEventListener(function () {
            clearTimeout(timeout);
            // If the request completes before this timeout, the rejection has no effect.
            reject(ERROR_FACTORY.create("fetch-throttle" /* FETCH_THROTTLE */, {
                throttleEndTimeMillis: throttleEndTimeMillis
            }));
        });
    });
}
/**
 * Returns true if the {@link Error} indicates a fetch request may succeed later.
 */
function isRetriableError(e) {
    if (!(e instanceof util.FirebaseError) || !e.customData) {
        return false;
    }
    // Uses string index defined by ErrorData, which FirebaseError implements.
    var httpStatus = Number(e.customData['httpStatus']);
    return (httpStatus === 429 ||
        httpStatus === 500 ||
        httpStatus === 503 ||
        httpStatus === 504);
}
/**
 * Shims a minimal AbortSignal (copied from Remote Config).
 *
 * <p>AbortController's AbortSignal conveniently decouples fetch timeout logic from other aspects
 * of networking, such as retries. Firebase doesn't use AbortController enough to justify a
 * polyfill recommendation, like we do with the Fetch API, but this minimal shim can easily be
 * swapped out if/when we do.
 */
var AnalyticsAbortSignal = /** @class */ (function () {
    function AnalyticsAbortSignal() {
        this.listeners = [];
    }
    AnalyticsAbortSignal.prototype.addEventListener = function (listener) {
        this.listeners.push(listener);
    };
    AnalyticsAbortSignal.prototype.abort = function () {
        this.listeners.forEach(function (listener) { return listener(); });
    };
    return AnalyticsAbortSignal;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function validateIndexedDB() {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var e_1;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!util.isIndexedDBAvailable()) return [3 /*break*/, 1];
                    logger.warn(ERROR_FACTORY.create("indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */, {
                        errorInfo: 'IndexedDB is not available in this environment.'
                    }).message);
                    return [2 /*return*/, false];
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, util.validateIndexedDBOpenable()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    logger.warn(ERROR_FACTORY.create("indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */, {
                        errorInfo: e_1
                    }).message);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/, true];
            }
        });
    });
}
/**
 * Initialize the analytics instance in gtag.js by calling config command with fid.
 *
 * NOTE: We combine analytics initialization and setting fid together because we want fid to be
 * part of the `page_view` event that's sent during the initialization
 * @param app Firebase app
 * @param gtagCore The gtag function that's not wrapped.
 * @param dynamicConfigPromisesList Array of all dynamic config promises.
 * @param measurementIdToAppId Maps measurementID to appID.
 * @param installations FirebaseInstallations instance.
 *
 * @returns Measurement ID.
 */
function initializeIds(app, dynamicConfigPromisesList, measurementIdToAppId, installations, gtagCore, dataLayerName) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var dynamicConfigPromise, fidPromise, _a, dynamicConfig, fid, configProperties;
        var _b;
        return tslib.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    dynamicConfigPromise = fetchDynamicConfigWithRetry(app);
                    // Once fetched, map measurementIds to appId, for ease of lookup in wrapped gtag function.
                    dynamicConfigPromise
                        .then(function (config) {
                        measurementIdToAppId[config.measurementId] = config.appId;
                        if (app.options.measurementId &&
                            config.measurementId !== app.options.measurementId) {
                            logger.warn("The measurement ID in the local Firebase config (" + app.options.measurementId + ")" +
                                (" does not match the measurement ID fetched from the server (" + config.measurementId + ").") +
                                " To ensure analytics events are always sent to the correct Analytics property," +
                                " update the" +
                                " measurement ID field in the local config or remove it from the local config.");
                        }
                    })
                        .catch(function (e) { return logger.error(e); });
                    // Add to list to track state of all dynamic config promises.
                    dynamicConfigPromisesList.push(dynamicConfigPromise);
                    fidPromise = validateIndexedDB().then(function (envIsValid) {
                        if (envIsValid) {
                            return installations.getId();
                        }
                        else {
                            return undefined;
                        }
                    });
                    return [4 /*yield*/, Promise.all([
                            dynamicConfigPromise,
                            fidPromise
                        ])];
                case 1:
                    _a = _c.sent(), dynamicConfig = _a[0], fid = _a[1];
                    // Detect if user has already put the gtag <script> tag on this page.
                    if (!findGtagScriptOnPage()) {
                        insertScriptTag(dataLayerName, dynamicConfig.measurementId);
                    }
                    // This command initializes gtag.js and only needs to be called once for the entire web app,
                    // but since it is idempotent, we can call it multiple times.
                    // We keep it together with other initialization logic for better code structure.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    gtagCore('js', new Date());
                    configProperties = (_b = {},
                        // guard against developers accidentally setting properties with prefix `firebase_`
                        _b[ORIGIN_KEY] = 'firebase',
                        _b.update = true,
                        _b);
                    if (fid != null) {
                        configProperties[GA_FID_KEY] = fid;
                    }
                    // It should be the first config command called on this GA-ID
                    // Initialize this GA-ID and set FID on it using the gtag config API.
                    // Note: This will trigger a page_view event unless 'send_page_view' is set to false in
                    // `configProperties`.
                    gtagCore(GtagCommand.CONFIG, dynamicConfig.measurementId, configProperties);
                    return [2 /*return*/, dynamicConfig.measurementId];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Maps appId to full initialization promise. Wrapped gtag calls must wait on
 * all or some of these, depending on the call's `send_to` param and the status
 * of the dynamic config fetches (see below).
 */
var initializationPromisesMap = {};
/**
 * List of dynamic config fetch promises. In certain cases, wrapped gtag calls
 * wait on all these to be complete in order to determine if it can selectively
 * wait for only certain initialization (FID) promises or if it must wait for all.
 */
var dynamicConfigPromisesList = [];
/**
 * Maps fetched measurementIds to appId. Populated when the app's dynamic config
 * fetch completes. If already populated, gtag config calls can use this to
 * selectively wait for only this app's initialization promise (FID) instead of all
 * initialization promises.
 */
var measurementIdToAppId = {};
/**
 * Name for window global data layer array used by GA: defaults to 'dataLayer'.
 */
var dataLayerName = 'dataLayer';
/**
 * Name for window global gtag function used by GA: defaults to 'gtag'.
 */
var gtagName = 'gtag';
/**
 * Reproduction of standard gtag function or reference to existing
 * gtag function on window object.
 */
var gtagCoreFunction;
/**
 * Wrapper around gtag function that ensures FID is sent with all
 * relevant event and config calls.
 */
var wrappedGtagFunction;
/**
 * Flag to ensure page initialization steps (creation or wrapping of
 * dataLayer and gtag script) are only run once per page load.
 */
var globalInitDone = false;
/**
 * For testing
 */
function resetGlobalVars(newGlobalInitDone, newInitializationPromisesMap, newDynamicPromises) {
    if (newGlobalInitDone === void 0) { newGlobalInitDone = false; }
    if (newInitializationPromisesMap === void 0) { newInitializationPromisesMap = {}; }
    if (newDynamicPromises === void 0) { newDynamicPromises = []; }
    globalInitDone = newGlobalInitDone;
    initializationPromisesMap = newInitializationPromisesMap;
    dynamicConfigPromisesList = newDynamicPromises;
    dataLayerName = 'dataLayer';
    gtagName = 'gtag';
}
/**
 * For testing
 */
function getGlobalVars() {
    return {
        initializationPromisesMap: initializationPromisesMap,
        dynamicConfigPromisesList: dynamicConfigPromisesList
    };
}
/**
 * This must be run before calling firebase.analytics() or it won't
 * have any effect.
 * @param options Custom gtag and dataLayer names.
 */
function settings(options) {
    if (globalInitDone) {
        throw ERROR_FACTORY.create("already-initialized" /* ALREADY_INITIALIZED */);
    }
    if (options.dataLayerName) {
        dataLayerName = options.dataLayerName;
    }
    if (options.gtagName) {
        gtagName = options.gtagName;
    }
}
/**
 * Returns true if no environment mismatch is found.
 * If environment mismatches are found, throws an INVALID_ANALYTICS_CONTEXT
 * error that also lists details for each mismatch found.
 */
function warnOnBrowserContextMismatch() {
    var mismatchedEnvMessages = [];
    if (util.isBrowserExtension()) {
        mismatchedEnvMessages.push('This is a browser extension environment.');
    }
    if (!util.areCookiesEnabled()) {
        mismatchedEnvMessages.push('Cookies are not available.');
    }
    if (mismatchedEnvMessages.length > 0) {
        var details = mismatchedEnvMessages
            .map(function (message, index) { return "(" + (index + 1) + ") " + message; })
            .join(' ');
        var err = ERROR_FACTORY.create("invalid-analytics-context" /* INVALID_ANALYTICS_CONTEXT */, {
            errorInfo: details
        });
        logger.warn(err.message);
    }
}
function factory(app, installations) {
    warnOnBrowserContextMismatch();
    var appId = app.options.appId;
    if (!appId) {
        throw ERROR_FACTORY.create("no-app-id" /* NO_APP_ID */);
    }
    if (!app.options.apiKey) {
        if (app.options.measurementId) {
            logger.warn("The \"apiKey\" field is empty in the local Firebase config. This is needed to fetch the latest" +
                (" measurement ID for this Firebase app. Falling back to the measurement ID " + app.options.measurementId) +
                " provided in the \"measurementId\" field in the local Firebase config.");
        }
        else {
            throw ERROR_FACTORY.create("no-api-key" /* NO_API_KEY */);
        }
    }
    if (initializationPromisesMap[appId] != null) {
        throw ERROR_FACTORY.create("already-exists" /* ALREADY_EXISTS */, {
            id: appId
        });
    }
    if (!globalInitDone) {
        // Steps here should only be done once per page: creation or wrapping
        // of dataLayer and global gtag function.
        getOrCreateDataLayer(dataLayerName);
        var _a = wrapOrCreateGtag(initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, dataLayerName, gtagName), wrappedGtag = _a.wrappedGtag, gtagCore = _a.gtagCore;
        wrappedGtagFunction = wrappedGtag;
        gtagCoreFunction = gtagCore;
        globalInitDone = true;
    }
    // Async but non-blocking.
    // This map reflects the completion state of all promises for each appId.
    initializationPromisesMap[appId] = initializeIds(app, dynamicConfigPromisesList, measurementIdToAppId, installations, gtagCoreFunction, dataLayerName);
    var analyticsInstance = {
        app: app,
        // Public methods return void for API simplicity and to better match gtag,
        // while internal implementations return promises.
        logEvent: function (eventName, eventParams, options) {
            logEvent(wrappedGtagFunction, initializationPromisesMap[appId], eventName, eventParams, options).catch(function (e) { return logger.error(e); });
        },
        setCurrentScreen: function (screenName, options) {
            setCurrentScreen(wrappedGtagFunction, initializationPromisesMap[appId], screenName, options).catch(function (e) { return logger.error(e); });
        },
        setUserId: function (id, options) {
            setUserId(wrappedGtagFunction, initializationPromisesMap[appId], id, options).catch(function (e) { return logger.error(e); });
        },
        setUserProperties: function (properties, options) {
            setUserProperties(wrappedGtagFunction, initializationPromisesMap[appId], properties, options).catch(function (e) { return logger.error(e); });
        },
        setAnalyticsCollectionEnabled: function (enabled) {
            setAnalyticsCollectionEnabled(initializationPromisesMap[appId], enabled).catch(function (e) { return logger.error(e); });
        },
        INTERNAL: {
            delete: function () {
                delete initializationPromisesMap[appId];
                return Promise.resolve();
            }
        }
    };
    return analyticsInstance;
}

var name = "@firebase/analytics";
var version = "0.6.15";

/**
 * Type constant for Firebase Analytics.
 */
var ANALYTICS_TYPE = 'analytics';
function registerAnalytics(instance) {
    instance.INTERNAL.registerComponent(new component.Component(ANALYTICS_TYPE, function (container) {
        // getImmediate for FirebaseApp will always succeed
        var app = container.getProvider('app').getImmediate();
        var installations = container
            .getProvider('installations')
            .getImmediate();
        return factory(app, installations);
    }, "PUBLIC" /* PUBLIC */).setServiceProps({
        settings: settings,
        EventName: EventName,
        isSupported: isSupported
    }));
    instance.INTERNAL.registerComponent(new component.Component('analytics-internal', internalFactory, "PRIVATE" /* PRIVATE */));
    instance.registerVersion(name, version);
    function internalFactory(container) {
        try {
            var analytics = container.getProvider(ANALYTICS_TYPE).getImmediate();
            return {
                logEvent: analytics.logEvent
            };
        }
        catch (e) {
            throw ERROR_FACTORY.create("interop-component-reg-failed" /* INTEROP_COMPONENT_REG_FAILED */, {
                reason: e
            });
        }
    }
}
registerAnalytics(firebase__default['default']);
/**
 * this is a public static method provided to users that wraps four different checks:
 *
 * 1. check if it's not a browser extension environment.
 * 1. check if cookie is enabled in current browser.
 * 3. check if IndexedDB is supported by the browser environment.
 * 4. check if the current browser context is valid for using IndexedDB.
 *
 */
function isSupported() {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var isDBOpenable;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (util.isBrowserExtension()) {
                        return [2 /*return*/, false];
                    }
                    if (!util.areCookiesEnabled()) {
                        return [2 /*return*/, false];
                    }
                    if (!util.isIndexedDBAvailable()) {
                        return [2 /*return*/, false];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, util.validateIndexedDBOpenable()];
                case 2:
                    isDBOpenable = _a.sent();
                    return [2 /*return*/, isDBOpenable];
                case 3:
                    _a.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}

exports.factory = factory;
exports.getGlobalVars = getGlobalVars;
exports.registerAnalytics = registerAnalytics;
exports.resetGlobalVars = resetGlobalVars;
exports.settings = settings;
//# sourceMappingURL=index.cjs.js.map
