'use strict';

var firebase = require('@firebase/app');
var component = require('@firebase/component');
var tslib = require('tslib');
var util = require('@firebase/util');
var logger$1 = require('@firebase/logger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var firebase__default = /*#__PURE__*/_interopDefaultLegacy(firebase);

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
var _a;
var ERRORS = (_a = {},
    _a["already-activated" /* ALREADY_ACTIVATED */] = 'You are trying to activate AppCheck for FirebaseApp {$appName}, ' +
        'while it is already activated. ' +
        'AppCheck can only be activated once.',
    _a["use-before-activation" /* USE_BEFORE_ACTIVATION */] = 'AppCheck is being used before activate() is called for FirebaseApp {$appName}. ' +
        'Please make sure you call activate() before instantiating other Firebase services.',
    _a["fetch-network-error" /* FETCH_NETWORK_ERROR */] = 'Fetch failed to connect to a network. Check Internet connection. ' +
        'Original error: {$originalErrorMessage}.',
    _a["fetch-parse-error" /* FETCH_PARSE_ERROR */] = 'Fetch client could not parse response.' +
        ' Original error: {$originalErrorMessage}.',
    _a["fetch-status-error" /* FETCH_STATUS_ERROR */] = 'Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.',
    _a["storage-open" /* STORAGE_OPEN */] = 'Error thrown when opening storage. Original error: {$originalErrorMessage}.',
    _a["storage-get" /* STORAGE_GET */] = 'Error thrown when reading from storage. Original error: {$originalErrorMessage}.',
    _a["storage-set" /* STORAGE_WRITE */] = 'Error thrown when writing to storage. Original error: {$originalErrorMessage}.',
    _a["recaptcha-error" /* RECAPTCHA_ERROR */] = 'ReCAPTCHA error.',
    _a);
var ERROR_FACTORY = new util.ErrorFactory('appCheck', 'AppCheck', ERRORS);

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
var APP_CHECK_STATES = new Map();
var DEFAULT_STATE = {
    activated: false,
    tokenObservers: []
};
var DEBUG_STATE = {
    enabled: false
};
function getState(app) {
    return APP_CHECK_STATES.get(app) || DEFAULT_STATE;
}
function setState(app, state) {
    APP_CHECK_STATES.set(app, state);
}
function getDebugState() {
    return DEBUG_STATE;
}

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
function getRecaptcha() {
    return self.grecaptcha;
}
function ensureActivated(app) {
    if (!getState(app).activated) {
        throw ERROR_FACTORY.create("use-before-activation" /* USE_BEFORE_ACTIVATION */, {
            appName: app.name
        });
    }
}
/**
 * Copied from https://stackoverflow.com/a/2117523
 */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

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
var RECAPTCHA_URL = 'https://www.google.com/recaptcha/api.js';
function initialize(app, siteKey) {
    var state = getState(app);
    var initialized = new util.Deferred();
    setState(app, tslib.__assign(tslib.__assign({}, state), { reCAPTCHAState: { initialized: initialized } }));
    var divId = "fire_app_check_" + app.name;
    var invisibleDiv = document.createElement('div');
    invisibleDiv.id = divId;
    invisibleDiv.style.display = 'none';
    document.body.appendChild(invisibleDiv);
    var grecaptcha = getRecaptcha();
    if (!grecaptcha) {
        loadReCAPTCHAScript(function () {
            var grecaptcha = getRecaptcha();
            if (!grecaptcha) {
                // it shouldn't happen.
                throw new Error('no recaptcha');
            }
            grecaptcha.ready(function () {
                // Invisible widgets allow us to set a different siteKey for each widget, so we use them to support multiple apps
                renderInvisibleWidget(app, siteKey, grecaptcha, divId);
                initialized.resolve(grecaptcha);
            });
        });
    }
    else {
        grecaptcha.ready(function () {
            renderInvisibleWidget(app, siteKey, grecaptcha, divId);
            initialized.resolve(grecaptcha);
        });
    }
    return initialized.promise;
}
function getToken$2(app) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var reCAPTCHAState, recaptcha;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ensureActivated(app);
                    reCAPTCHAState = getState(app).reCAPTCHAState;
                    return [4 /*yield*/, reCAPTCHAState.initialized.promise];
                case 1:
                    recaptcha = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, _reject) {
                            // Updated after initialization is complete.
                            var reCAPTCHAState = getState(app).reCAPTCHAState;
                            recaptcha.ready(function () {
                                resolve(
                                // widgetId is guaranteed to be available if reCAPTCHAState.initialized.promise resolved.
                                recaptcha.execute(reCAPTCHAState.widgetId, {
                                    action: 'fire_app_check'
                                }));
                            });
                        })];
            }
        });
    });
}
/**
 *
 * @param app
 * @param container - Id of a HTML element.
 */
function renderInvisibleWidget(app, siteKey, grecaptcha, container) {
    var widgetId = grecaptcha.render(container, {
        sitekey: siteKey,
        size: 'invisible'
    });
    var state = getState(app);
    setState(app, tslib.__assign(tslib.__assign({}, state), { reCAPTCHAState: tslib.__assign(tslib.__assign({}, state.reCAPTCHAState), { // state.reCAPTCHAState is set in the initialize()
            widgetId: widgetId }) }));
}
function loadReCAPTCHAScript(onload) {
    var script = document.createElement('script');
    script.src = "" + RECAPTCHA_URL;
    script.onload = onload;
    document.head.appendChild(script);
}

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
var BASE_ENDPOINT = 'https://content-firebaseappcheck.googleapis.com/v1beta';
var EXCHANGE_RECAPTCHA_TOKEN_METHOD = 'exchangeRecaptchaToken';
var EXCHANGE_DEBUG_TOKEN_METHOD = 'exchangeDebugToken';
var TOKEN_REFRESH_TIME = {
    /**
     * The offset time before token natural expiration to run the refresh.
     * This is currently 5 minutes.
     */
    OFFSET_DURATION: 5 * 60 * 1000,
    /**
     * This is the first retrial wait after an error. This is currently
     * 30 seconds.
     */
    RETRIAL_MIN_WAIT: 30 * 1000,
    /**
     * This is the maximum retrial wait, currently 16 minutes.
     */
    RETRIAL_MAX_WAIT: 16 * 60 * 1000
};

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
 * Port from auth proactiverefresh.js
 *
 */
// TODO: move it to @firebase/util?
// TODO: allow to config whether refresh should happen in the background
var Refresher = /** @class */ (function () {
    function Refresher(operation, retryPolicy, getWaitDuration, lowerBound, upperBound) {
        this.operation = operation;
        this.retryPolicy = retryPolicy;
        this.getWaitDuration = getWaitDuration;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.pending = null;
        this.nextErrorWaitInterval = lowerBound;
        if (lowerBound > upperBound) {
            throw new Error('Proactive refresh lower bound greater than upper bound!');
        }
    }
    Refresher.prototype.start = function () {
        this.nextErrorWaitInterval = this.lowerBound;
        this.process(true).catch(function () {
            /* we don't care about the result */
        });
    };
    Refresher.prototype.stop = function () {
        if (this.pending) {
            this.pending.reject('cancelled');
            this.pending = null;
        }
    };
    Refresher.prototype.isRunning = function () {
        return !!this.pending;
    };
    Refresher.prototype.process = function (hasSucceeded) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.stop();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this.pending = new util.Deferred();
                        return [4 /*yield*/, sleep(this.getNextRun(hasSucceeded))];
                    case 2:
                        _a.sent();
                        // Why do we resolve a promise, then immediate wait for it?
                        // We do it to make the promise chain cancellable.
                        // We can call stop() which rejects the promise before the following line execute, which makes
                        // the code jump to the catch block.
                        // TODO: unit test this
                        this.pending.resolve();
                        return [4 /*yield*/, this.pending.promise];
                    case 3:
                        _a.sent();
                        this.pending = new util.Deferred();
                        return [4 /*yield*/, this.operation()];
                    case 4:
                        _a.sent();
                        this.pending.resolve();
                        return [4 /*yield*/, this.pending.promise];
                    case 5:
                        _a.sent();
                        this.process(true).catch(function () {
                            /* we don't care about the result */
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        if (this.retryPolicy(error_1)) {
                            this.process(false).catch(function () {
                                /* we don't care about the result */
                            });
                        }
                        else {
                            this.stop();
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Refresher.prototype.getNextRun = function (hasSucceeded) {
        if (hasSucceeded) {
            // If last operation succeeded, reset next error wait interval and return
            // the default wait duration.
            this.nextErrorWaitInterval = this.lowerBound;
            // Return typical wait duration interval after a successful operation.
            return this.getWaitDuration();
        }
        else {
            // Get next error wait interval.
            var currentErrorWaitInterval = this.nextErrorWaitInterval;
            // Double interval for next consecutive error.
            this.nextErrorWaitInterval *= 2;
            // Make sure next wait interval does not exceed the maximum upper bound.
            if (this.nextErrorWaitInterval > this.upperBound) {
                this.nextErrorWaitInterval = this.upperBound;
            }
            return currentErrorWaitInterval;
        }
    };
    return Refresher;
}());
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

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
function exchangeToken(_a, platformLoggerProvider) {
    var url = _a.url, body = _a.body;
    return tslib.__awaiter(this, void 0, void 0, function () {
        var headers, platformLogger, options, response, originalError_1, responseBody, originalError_2, match, timeToLiveAsNumber, now;
        return tslib.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    headers = {
                        'Content-Type': 'application/json'
                    };
                    platformLogger = platformLoggerProvider.getImmediate({
                        optional: true
                    });
                    if (platformLogger) {
                        headers['X-Firebase-Client'] = platformLogger.getPlatformInfoString();
                    }
                    options = {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: headers
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url, options)];
                case 2:
                    response = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    originalError_1 = _b.sent();
                    throw ERROR_FACTORY.create("fetch-network-error" /* FETCH_NETWORK_ERROR */, {
                        originalErrorMessage: originalError_1.message
                    });
                case 4:
                    if (response.status !== 200) {
                        throw ERROR_FACTORY.create("fetch-status-error" /* FETCH_STATUS_ERROR */, {
                            httpStatus: response.status
                        });
                    }
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, response.json()];
                case 6:
                    // JSON parsing throws SyntaxError if the response body isn't a JSON string.
                    responseBody = _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    originalError_2 = _b.sent();
                    throw ERROR_FACTORY.create("fetch-parse-error" /* FETCH_PARSE_ERROR */, {
                        originalErrorMessage: originalError_2.message
                    });
                case 8:
                    match = responseBody.ttl.match(/^([\d.]+)(s)$/);
                    if (!match || !match[2] || isNaN(Number(match[1]))) {
                        throw ERROR_FACTORY.create("fetch-parse-error" /* FETCH_PARSE_ERROR */, {
                            originalErrorMessage: "ttl field (timeToLive) is not in standard Protobuf Duration " +
                                ("format: " + responseBody.ttl)
                        });
                    }
                    timeToLiveAsNumber = Number(match[1]) * 1000;
                    now = Date.now();
                    return [2 /*return*/, {
                            token: responseBody.attestationToken,
                            expireTimeMillis: now + timeToLiveAsNumber,
                            issuedAtTimeMillis: now
                        }];
            }
        });
    });
}
function getExchangeRecaptchaTokenRequest(app, reCAPTCHAToken) {
    var _a = app.options, projectId = _a.projectId, appId = _a.appId, apiKey = _a.apiKey;
    return {
        url: BASE_ENDPOINT + "/projects/" + projectId + "/apps/" + appId + ":" + EXCHANGE_RECAPTCHA_TOKEN_METHOD + "?key=" + apiKey,
        body: {
            // eslint-disable-next-line
            recaptcha_token: reCAPTCHAToken
        }
    };
}
function getExchangeDebugTokenRequest(app, debugToken) {
    var _a = app.options, projectId = _a.projectId, appId = _a.appId, apiKey = _a.apiKey;
    return {
        url: BASE_ENDPOINT + "/projects/" + projectId + "/apps/" + appId + ":" + EXCHANGE_DEBUG_TOKEN_METHOD + "?key=" + apiKey,
        body: {
            // eslint-disable-next-line
            debug_token: debugToken
        }
    };
}

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
var DB_NAME = 'firebase-app-check-database';
var DB_VERSION = 1;
var STORE_NAME = 'firebase-app-check-store';
var DEBUG_TOKEN_KEY = 'debug-token';
var dbPromise = null;
function getDBPromise() {
    if (dbPromise) {
        return dbPromise;
    }
    dbPromise = new Promise(function (resolve, reject) {
        try {
            var request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
            request.onerror = function (event) {
                var _a;
                reject(ERROR_FACTORY.create("storage-open" /* STORAGE_OPEN */, {
                    originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
                }));
            };
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                // We don't use 'break' in this switch statement, the fall-through
                // behavior is what we want, because if there are multiple versions between
                // the old version and the current version, we want ALL the migrations
                // that correspond to those versions to run, not only the last one.
                // eslint-disable-next-line default-case
                switch (event.oldVersion) {
                    case 0:
                        db.createObjectStore(STORE_NAME, {
                            keyPath: 'compositeKey'
                        });
                }
            };
        }
        catch (e) {
            reject(ERROR_FACTORY.create("storage-open" /* STORAGE_OPEN */, {
                originalErrorMessage: e.message
            }));
        }
    });
    return dbPromise;
}
function readTokenFromIndexedDB(app) {
    return read(computeKey(app));
}
function writeTokenToIndexedDB(app, token) {
    return write(computeKey(app), token);
}
function writeDebugTokenToIndexedDB(token) {
    return write(DEBUG_TOKEN_KEY, token);
}
function readDebugTokenFromIndexedDB() {
    return read(DEBUG_TOKEN_KEY);
}
function write(key, value) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var db, transaction, store, request;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDBPromise()];
                case 1:
                    db = _a.sent();
                    transaction = db.transaction(STORE_NAME, 'readwrite');
                    store = transaction.objectStore(STORE_NAME);
                    request = store.put({
                        compositeKey: key,
                        value: value
                    });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            request.onsuccess = function (_event) {
                                resolve();
                            };
                            transaction.onerror = function (event) {
                                var _a;
                                reject(ERROR_FACTORY.create("storage-set" /* STORAGE_WRITE */, {
                                    originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
                                }));
                            };
                        })];
            }
        });
    });
}
function read(key) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var db, transaction, store, request;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDBPromise()];
                case 1:
                    db = _a.sent();
                    transaction = db.transaction(STORE_NAME, 'readonly');
                    store = transaction.objectStore(STORE_NAME);
                    request = store.get(key);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            request.onsuccess = function (event) {
                                var result = event.target.result;
                                if (result) {
                                    resolve(result.value);
                                }
                                else {
                                    resolve(undefined);
                                }
                            };
                            transaction.onerror = function (event) {
                                var _a;
                                reject(ERROR_FACTORY.create("storage-get" /* STORAGE_GET */, {
                                    originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
                                }));
                            };
                        })];
            }
        });
    });
}
function computeKey(app) {
    return app.options.appId + "-" + app.name;
}

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
var logger = new logger$1.Logger('@firebase/app-check');

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
 * Always resolves. In case of an error reading from indexeddb, resolve with undefined
 */
function readTokenFromStorage(app) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var token, e_1;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!util.isIndexedDBAvailable()) return [3 /*break*/, 5];
                    token = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, readTokenFromIndexedDB(app)];
                case 2:
                    token = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    // swallow the error and return undefined
                    logger.warn("Failed to read token from indexeddb. Error: " + e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, token];
                case 5: return [2 /*return*/, undefined];
            }
        });
    });
}
/**
 * Always resolves. In case of an error writing to indexeddb, print a warning and resolve the promise
 */
function writeTokenToStorage(app, token) {
    if (util.isIndexedDBAvailable()) {
        return writeTokenToIndexedDB(app, token).catch(function (e) {
            // swallow the error and resolve the promise
            logger.warn("Failed to write token to indexeddb. Error: " + e);
        });
    }
    return Promise.resolve();
}
function readOrCreateDebugTokenFromStorage() {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var existingDebugToken, newToken;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    existingDebugToken = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, readDebugTokenFromIndexedDB()];
                case 2:
                    existingDebugToken = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 4:
                    if (!existingDebugToken) {
                        newToken = uuidv4();
                        // We don't need to block on writing to indexeddb
                        // In case persistence failed, a new debug token will be generated everytime the page is refreshed.
                        // It renders the debug token useless because you have to manually register(whitelist) the new token in the firebase console again and again.
                        // If you see this error trying to use debug token, it probably means you are using a browser that doesn't support indexeddb.
                        // You should switch to a different browser that supports indexeddb
                        writeDebugTokenToIndexedDB(newToken).catch(function (e) {
                            return logger.warn("Failed to persist debug token to indexeddb. Error: " + e);
                        });
                        // Not using logger because I don't think we ever want this accidentally hidden?
                        console.log("AppCheck debug token: " + newToken + ". You will need to whitelist it in the Firebase console for it to work");
                        return [2 /*return*/, newToken];
                    }
                    else {
                        return [2 /*return*/, existingDebugToken];
                    }
            }
        });
    });
}

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
function isDebugMode() {
    var debugState = getDebugState();
    return debugState.enabled;
}
function getDebugToken() {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var state;
        return tslib.__generator(this, function (_a) {
            state = getDebugState();
            if (state.enabled && state.token) {
                return [2 /*return*/, state.token.promise];
            }
            else {
                // should not happen!
                throw Error("\n            Can't get debug token in production mode.\n        ");
            }
        });
    });
}
function initializeDebugMode() {
    var globals = util.getGlobal();
    if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== 'string' &&
        globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== true) {
        return;
    }
    var debugState = getDebugState();
    debugState.enabled = true;
    var deferredToken = new util.Deferred();
    debugState.token = deferredToken;
    if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN === 'string') {
        deferredToken.resolve(globals.FIREBASE_APPCHECK_DEBUG_TOKEN);
    }
    else {
        deferredToken.resolve(readOrCreateDebugTokenFromStorage());
    }
}

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
// Initial hardcoded value agreed upon across platforms for initial launch.
// Format left open for possible dynamic error values and other fields in the future.
var defaultTokenErrorData = { error: 'UNKNOWN_ERROR' };
/**
 * Stringify and base64 encode token error data.
 *
 * @param tokenError Error data, currently hardcoded.
 */
function formatDummyToken(tokenErrorData) {
    return util.base64.encodeString(JSON.stringify(tokenErrorData), 
    /* webSafe= */ false);
}
/**
 * This function will always resolve.
 * The result will contain an error field if there is any error.
 * In case there is an error, the token field in the result will be populated with a dummy value
 */
function getToken$1(app, platformLoggerProvider, forceRefresh) {
    if (forceRefresh === void 0) { forceRefresh = false; }
    return tslib.__awaiter(this, void 0, void 0, function () {
        var state, token, error, cachedToken, tokenFromDebugExchange, _a, _b, _c, customToken, issuedAtTimeSeconds, issuedAtTimeMillis, attestedClaimsToken, e_1, interopTokenResult;
        return tslib.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    ensureActivated(app);
                    state = getState(app);
                    token = state.token;
                    error = undefined;
                    if (!!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, readTokenFromStorage(app)];
                case 1:
                    cachedToken = _d.sent();
                    if (cachedToken && isValid(cachedToken)) {
                        token = cachedToken;
                        setState(app, tslib.__assign(tslib.__assign({}, state), { token: token }));
                        // notify all listeners with the cached token
                        notifyTokenListeners(app, { token: token.token });
                    }
                    _d.label = 2;
                case 2:
                    // Return the cached token (from either memory or indexedDB) if it's valid
                    if (!forceRefresh && token && isValid(token)) {
                        return [2 /*return*/, {
                                token: token.token
                            }];
                    }
                    if (!isDebugMode()) return [3 /*break*/, 6];
                    _a = exchangeToken;
                    _b = getExchangeDebugTokenRequest;
                    _c = [app];
                    return [4 /*yield*/, getDebugToken()];
                case 3: return [4 /*yield*/, _a.apply(void 0, [_b.apply(void 0, _c.concat([_d.sent()])), platformLoggerProvider])];
                case 4:
                    tokenFromDebugExchange = _d.sent();
                    // Write debug token to indexedDB.
                    return [4 /*yield*/, writeTokenToStorage(app, tokenFromDebugExchange)];
                case 5:
                    // Write debug token to indexedDB.
                    _d.sent();
                    // Write debug token to state.
                    setState(app, tslib.__assign(tslib.__assign({}, state), { token: tokenFromDebugExchange }));
                    return [2 /*return*/, { token: tokenFromDebugExchange.token }];
                case 6:
                    _d.trys.push([6, 12, , 13]);
                    if (!state.customProvider) return [3 /*break*/, 8];
                    return [4 /*yield*/, state.customProvider.getToken()];
                case 7:
                    customToken = _d.sent();
                    issuedAtTimeSeconds = util.issuedAtTime(customToken.token);
                    issuedAtTimeMillis = issuedAtTimeSeconds !== null &&
                        issuedAtTimeSeconds < Date.now() &&
                        issuedAtTimeSeconds > 0
                        ? issuedAtTimeSeconds * 1000
                        : Date.now();
                    token = tslib.__assign(tslib.__assign({}, customToken), { issuedAtTimeMillis: issuedAtTimeMillis });
                    return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, getToken$2(app).catch(function (_e) {
                        // reCaptcha.execute() throws null which is not very descriptive.
                        throw ERROR_FACTORY.create("recaptcha-error" /* RECAPTCHA_ERROR */);
                    })];
                case 9:
                    attestedClaimsToken = _d.sent();
                    return [4 /*yield*/, exchangeToken(getExchangeRecaptchaTokenRequest(app, attestedClaimsToken), platformLoggerProvider)];
                case 10:
                    token = _d.sent();
                    _d.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    e_1 = _d.sent();
                    // `getToken()` should never throw, but logging error text to console will aid debugging.
                    logger.error(e_1);
                    error = e_1;
                    return [3 /*break*/, 13];
                case 13:
                    if (!!token) return [3 /*break*/, 14];
                    // if token is undefined, there must be an error.
                    // we return a dummy token along with the error
                    interopTokenResult = makeDummyTokenResult(error);
                    return [3 /*break*/, 16];
                case 14:
                    interopTokenResult = {
                        token: token.token
                    };
                    // write the new token to the memory state as well as the persistent storage.
                    // Only do it if we got a valid new token
                    setState(app, tslib.__assign(tslib.__assign({}, state), { token: token }));
                    return [4 /*yield*/, writeTokenToStorage(app, token)];
                case 15:
                    _d.sent();
                    _d.label = 16;
                case 16:
                    notifyTokenListeners(app, interopTokenResult);
                    return [2 /*return*/, interopTokenResult];
            }
        });
    });
}
function addTokenListener(app, platformLoggerProvider, type, listener, onError) {
    var state = getState(app);
    var tokenListener = {
        next: listener,
        error: onError,
        type: type
    };
    var newState = tslib.__assign(tslib.__assign({}, state), { tokenObservers: tslib.__spreadArray(tslib.__spreadArray([], state.tokenObservers), [tokenListener]) });
    /**
     * Invoke the listener with the valid token, then start the token refresher
     */
    if (!newState.tokenRefresher) {
        var tokenRefresher = createTokenRefresher(app, platformLoggerProvider);
        newState.tokenRefresher = tokenRefresher;
    }
    // Create the refresher but don't start it if `isTokenAutoRefreshEnabled`
    // is not true.
    if (!newState.tokenRefresher.isRunning() &&
        state.isTokenAutoRefreshEnabled === true) {
        newState.tokenRefresher.start();
    }
    // invoke the listener async immediately if there is a valid token
    if (state.token && isValid(state.token)) {
        var validToken_1 = state.token;
        Promise.resolve()
            .then(function () { return listener({ token: validToken_1.token }); })
            .catch(function () {
            /** Ignore errors in listeners. */
        });
    }
    setState(app, newState);
}
function removeTokenListener(app, listener) {
    var state = getState(app);
    var newObservers = state.tokenObservers.filter(function (tokenObserver) { return tokenObserver.next !== listener; });
    if (newObservers.length === 0 &&
        state.tokenRefresher &&
        state.tokenRefresher.isRunning()) {
        state.tokenRefresher.stop();
    }
    setState(app, tslib.__assign(tslib.__assign({}, state), { tokenObservers: newObservers }));
}
function createTokenRefresher(app, platformLoggerProvider) {
    var _this = this;
    return new Refresher(
    // Keep in mind when this fails for any reason other than the ones
    // for which we should retry, it will effectively stop the proactive refresh.
    function () { return tslib.__awaiter(_this, void 0, void 0, function () {
        var state, result;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = getState(app);
                    if (!!state.token) return [3 /*break*/, 2];
                    return [4 /*yield*/, getToken$1(app, platformLoggerProvider)];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, getToken$1(app, platformLoggerProvider, true)];
                case 3:
                    result = _a.sent();
                    _a.label = 4;
                case 4:
                    // getToken() always resolves. In case the result has an error field defined, it means the operation failed, and we should retry.
                    if (result.error) {
                        throw result.error;
                    }
                    return [2 /*return*/];
            }
        });
    }); }, function () {
        // TODO: when should we retry?
        return true;
    }, function () {
        var state = getState(app);
        if (state.token) {
            // issuedAtTime + (50% * total TTL) + 5 minutes
            var nextRefreshTimeMillis = state.token.issuedAtTimeMillis +
                (state.token.expireTimeMillis - state.token.issuedAtTimeMillis) *
                    0.5 +
                5 * 60 * 1000;
            // Do not allow refresh time to be past (expireTime - 5 minutes)
            var latestAllowableRefresh = state.token.expireTimeMillis - 5 * 60 * 1000;
            nextRefreshTimeMillis = Math.min(nextRefreshTimeMillis, latestAllowableRefresh);
            return Math.max(0, nextRefreshTimeMillis - Date.now());
        }
        else {
            return 0;
        }
    }, TOKEN_REFRESH_TIME.RETRIAL_MIN_WAIT, TOKEN_REFRESH_TIME.RETRIAL_MAX_WAIT);
}
function notifyTokenListeners(app, token) {
    var observers = getState(app).tokenObservers;
    for (var _i = 0, observers_1 = observers; _i < observers_1.length; _i++) {
        var observer = observers_1[_i];
        try {
            if (observer.type === "EXTERNAL" /* EXTERNAL */ && token.error != null) {
                // If this listener was added by a 3P call, send any token error to
                // the supplied error handler. A 3P observer always has an error
                // handler.
                observer.error(token.error);
            }
            else {
                // If the token has no error field, always return the token.
                // If this is a 2P listener, return the token, whether or not it
                // has an error field.
                observer.next(token);
            }
        }
        catch (ignored) {
            // Errors in the listener function itself are always ignored.
        }
    }
}
function isValid(token) {
    return token.expireTimeMillis - Date.now() > 0;
}
function makeDummyTokenResult(error) {
    return {
        token: formatDummyToken(defaultTokenErrorData),
        error: error
    };
}

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
 *
 * @param app
 * @param siteKeyOrProvider - optional custom attestation provider
 * or reCAPTCHA siteKey
 * @param isTokenAutoRefreshEnabled - if true, enables auto refresh
 * of appCheck token.
 */
function activate(app, siteKeyOrProvider, isTokenAutoRefreshEnabled) {
    var state = getState(app);
    if (state.activated) {
        throw ERROR_FACTORY.create("already-activated" /* ALREADY_ACTIVATED */, {
            appName: app.name
        });
    }
    var newState = tslib.__assign(tslib.__assign({}, state), { activated: true });
    if (typeof siteKeyOrProvider === 'string') {
        newState.siteKey = siteKeyOrProvider;
    }
    else {
        newState.customProvider = siteKeyOrProvider;
    }
    // Use value of global `automaticDataCollectionEnabled` (which
    // itself defaults to false if not specified in config) if
    // `isTokenAutoRefreshEnabled` param was not provided by user.
    newState.isTokenAutoRefreshEnabled =
        isTokenAutoRefreshEnabled === undefined
            ? app.automaticDataCollectionEnabled
            : isTokenAutoRefreshEnabled;
    setState(app, newState);
    // initialize reCAPTCHA if siteKey is provided
    if (newState.siteKey) {
        initialize(app, newState.siteKey).catch(function () {
            /* we don't care about the initialization result in activate() */
        });
    }
}
function setTokenAutoRefreshEnabled(app, isTokenAutoRefreshEnabled) {
    var state = getState(app);
    // This will exist if any product libraries have called
    // `addTokenListener()`
    if (state.tokenRefresher) {
        if (isTokenAutoRefreshEnabled === true) {
            state.tokenRefresher.start();
        }
        else {
            state.tokenRefresher.stop();
        }
    }
    setState(app, tslib.__assign(tslib.__assign({}, state), { isTokenAutoRefreshEnabled: isTokenAutoRefreshEnabled }));
}
/**
 * Differs from internal getToken in that it throws the error.
 */
function getToken(app, platformLoggerProvider, forceRefresh) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var result;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken$1(app, platformLoggerProvider, forceRefresh)];
                case 1:
                    result = _a.sent();
                    if (result.error) {
                        throw result.error;
                    }
                    return [2 /*return*/, { token: result.token }];
            }
        });
    });
}
function onTokenChanged(app, platformLoggerProvider, onNextOrObserver, onError, 
/**
 * NOTE: Although an `onCompletion` callback can be provided, it will
 * never be called because the token stream is never-ending.
 * It is added only for API consistency with the observer pattern, which
 * we follow in JS APIs.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onCompletion) {
    var nextFn = function () { };
    var errorFn = function () { };
    if (onNextOrObserver.next != null) {
        nextFn = onNextOrObserver.next.bind(onNextOrObserver);
    }
    else {
        nextFn = onNextOrObserver;
    }
    if (onNextOrObserver.error != null) {
        errorFn = onNextOrObserver.error.bind(onNextOrObserver);
    }
    else if (onError) {
        errorFn = onError;
    }
    addTokenListener(app, platformLoggerProvider, "EXTERNAL" /* EXTERNAL */, nextFn, errorFn);
    return function () { return removeTokenListener(app, nextFn); };
}

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
function factory(app, platformLoggerProvider) {
    return {
        app: app,
        activate: function (siteKeyOrProvider, isTokenAutoRefreshEnabled) { return activate(app, siteKeyOrProvider, isTokenAutoRefreshEnabled); },
        setTokenAutoRefreshEnabled: function (isTokenAutoRefreshEnabled) {
            return setTokenAutoRefreshEnabled(app, isTokenAutoRefreshEnabled);
        },
        getToken: function (forceRefresh) {
            return getToken(app, platformLoggerProvider, forceRefresh);
        },
        onTokenChanged: function (onNextOrObserver, onError, onCompletion) {
            return onTokenChanged(app, platformLoggerProvider, 
            /**
             * This can still be an observer. Need to do this casting because
             * according to Typescript: "Implementation signatures of overloads
             * are not externally visible"
             */
            onNextOrObserver, onError);
        },
        INTERNAL: {
            delete: function () {
                var tokenObservers = getState(app).tokenObservers;
                for (var _i = 0, tokenObservers_1 = tokenObservers; _i < tokenObservers_1.length; _i++) {
                    var tokenObserver = tokenObservers_1[_i];
                    removeTokenListener(app, tokenObserver.next);
                }
                return Promise.resolve();
            }
        }
    };
}
function internalFactory(app, platformLoggerProvider) {
    return {
        getToken: function (forceRefresh) {
            return getToken$1(app, platformLoggerProvider, forceRefresh);
        },
        addTokenListener: function (listener) {
            return addTokenListener(app, platformLoggerProvider, "INTERNAL" /* INTERNAL */, listener);
        },
        removeTokenListener: function (listener) { return removeTokenListener(app, listener); }
    };
}

var name = "@firebase/app-check";
var version = "0.2.0";

/**
 * @license
 * Copyright 2017 Google LLC
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
var APP_CHECK_NAME = 'appCheck';
var APP_CHECK_NAME_INTERNAL = 'app-check-internal';
function registerAppCheck(firebase) {
    // The public interface
    firebase.INTERNAL.registerComponent(new component.Component(APP_CHECK_NAME, function (container) {
        // getImmediate for FirebaseApp will always succeed
        var app = container.getProvider('app').getImmediate();
        var platformLoggerProvider = container.getProvider('platform-logger');
        return factory(app, platformLoggerProvider);
    }, "PUBLIC" /* PUBLIC */)
        /**
         * AppCheck can only be initialized by explicitly calling firebase.appCheck()
         * We don't want firebase products that consume AppCheck to gate on AppCheck
         * if the user doesn't intend them to, just because the AppCheck component
         * is registered.
         */
        .setInstantiationMode("EXPLICIT" /* EXPLICIT */)
        /**
         * Because all firebase products that depend on app-check depend on app-check-internal directly,
         * we need to initialize app-check-internal after app-check is initialized to make it
         * available to other firebase products.
         */
        .setInstanceCreatedCallback(function (container, _instanceIdentifier, _instance) {
        var appCheckInternalProvider = container.getProvider(APP_CHECK_NAME_INTERNAL);
        appCheckInternalProvider.initialize();
    }));
    // The internal interface used by other Firebase products
    firebase.INTERNAL.registerComponent(new component.Component(APP_CHECK_NAME_INTERNAL, function (container) {
        // getImmediate for FirebaseApp will always succeed
        var app = container.getProvider('app').getImmediate();
        var platformLoggerProvider = container.getProvider('platform-logger');
        return internalFactory(app, platformLoggerProvider);
    }, "PUBLIC" /* PUBLIC */).setInstantiationMode("EXPLICIT" /* EXPLICIT */));
    firebase.registerVersion(name, version);
}
registerAppCheck(firebase__default['default']);
initializeDebugMode();
//# sourceMappingURL=index.cjs.js.map
