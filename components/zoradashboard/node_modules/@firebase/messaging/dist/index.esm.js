import '@firebase/installations';
import { Component } from '@firebase/component';
import { ErrorFactory } from '@firebase/util';
import { __spreadArray, __read, __awaiter, __generator, __assign, __values } from 'tslib';
import { deleteDb, openDb } from 'idb';
import firebase from '@firebase/app';

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
var _a;
var ERROR_MAP = (_a = {},
    _a["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */] = 'Missing App configuration value: "{$valueName}"',
    _a["only-available-in-window" /* AVAILABLE_IN_WINDOW */] = 'This method is available in a Window context.',
    _a["only-available-in-sw" /* AVAILABLE_IN_SW */] = 'This method is available in a service worker context.',
    _a["permission-default" /* PERMISSION_DEFAULT */] = 'The notification permission was not granted and dismissed instead.',
    _a["permission-blocked" /* PERMISSION_BLOCKED */] = 'The notification permission was not granted and blocked instead.',
    _a["unsupported-browser" /* UNSUPPORTED_BROWSER */] = "This browser doesn't support the API's required to use the firebase SDK.",
    _a["failed-service-worker-registration" /* FAILED_DEFAULT_REGISTRATION */] = 'We are unable to register the default service worker. {$browserErrorMessage}',
    _a["token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */] = 'A problem occurred while subscribing the user to FCM: {$errorInfo}',
    _a["token-subscribe-no-token" /* TOKEN_SUBSCRIBE_NO_TOKEN */] = 'FCM returned no token when subscribing the user to push.',
    _a["token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */] = 'A problem occurred while unsubscribing the ' +
        'user from FCM: {$errorInfo}',
    _a["token-update-failed" /* TOKEN_UPDATE_FAILED */] = 'A problem occurred while updating the user from FCM: {$errorInfo}',
    _a["token-update-no-token" /* TOKEN_UPDATE_NO_TOKEN */] = 'FCM returned no token when updating the user to push.',
    _a["use-sw-after-get-token" /* USE_SW_AFTER_GET_TOKEN */] = 'The useServiceWorker() method may only be called once and must be ' +
        'called before calling getToken() to ensure your service worker is used.',
    _a["invalid-sw-registration" /* INVALID_SW_REGISTRATION */] = 'The input to useServiceWorker() must be a ServiceWorkerRegistration.',
    _a["invalid-bg-handler" /* INVALID_BG_HANDLER */] = 'The input to setBackgroundMessageHandler() must be a function.',
    _a["invalid-vapid-key" /* INVALID_VAPID_KEY */] = 'The public VAPID key must be a string.',
    _a["use-vapid-key-after-get-token" /* USE_VAPID_KEY_AFTER_GET_TOKEN */] = 'The usePublicVapidKey() method may only be called once and must be ' +
        'called before calling getToken() to ensure your VAPID key is used.',
    _a);
var ERROR_FACTORY = new ErrorFactory('messaging', 'Messaging', ERROR_MAP);

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
var DEFAULT_SW_PATH = '/firebase-messaging-sw.js';
var DEFAULT_SW_SCOPE = '/firebase-cloud-messaging-push-scope';
var DEFAULT_VAPID_KEY = 'BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4';
var ENDPOINT = 'https://fcmregistrations.googleapis.com/v1';
// Key of FCM Payload in Notification's data field.
var FCM_MSG = 'FCM_MSG';
var TAG = 'FirebaseMessaging: ';
// Set to '1' if Analytics is enabled for the campaign
var CONSOLE_CAMPAIGN_ANALYTICS_ENABLED = 'google.c.a.e';
var CONSOLE_CAMPAIGN_ID = 'google.c.a.c_id';
var CONSOLE_CAMPAIGN_TIME = 'google.c.a.ts';
var CONSOLE_CAMPAIGN_NAME = 'google.c.a.c_l';
// Due to the fact that onBackgroundMessage can't be awaited (to support rxjs), a silent push
// warning might be shown by the browser if the callback fails to completes by the end of onPush.
// Experiments were ran to determine the majority onBackground message clock time. This brief
// blocking time would allow majority of the onBackgroundMessage callback to finish.
var BACKGROUND_HANDLE_EXECUTION_TIME_LIMIT_MS = 1000;
// Preparation time for client to initialize and set up the message handler.
var FOREGROUND_HANDLE_PREPARATION_TIME_MS = 3000;

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
var MessageType;
(function (MessageType) {
    MessageType["PUSH_RECEIVED"] = "push-received";
    MessageType["NOTIFICATION_CLICKED"] = "notification-clicked";
})(MessageType || (MessageType = {}));

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
function arrayToBase64(array) {
    var uint8Array = new Uint8Array(array);
    var base64String = btoa(String.fromCharCode.apply(String, __spreadArray([], __read(uint8Array))));
    return base64String.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function base64ToArray(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
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
var OLD_DB_NAME = 'fcm_token_details_db';
/**
 * The last DB version of 'fcm_token_details_db' was 4. This is one higher, so that the upgrade
 * callback is called for all versions of the old DB.
 */
var OLD_DB_VERSION = 5;
var OLD_OBJECT_STORE_NAME = 'fcm_token_object_Store';
function migrateOldDatabase(senderId) {
    return __awaiter(this, void 0, void 0, function () {
        var databases, dbNames, tokenDetails, db;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!('databases' in indexedDB)) return [3 /*break*/, 2];
                    return [4 /*yield*/, indexedDB.databases()];
                case 1:
                    databases = _a.sent();
                    dbNames = databases.map(function (db) { return db.name; });
                    if (!dbNames.includes(OLD_DB_NAME)) {
                        // old DB didn't exist, no need to open.
                        return [2 /*return*/, null];
                    }
                    _a.label = 2;
                case 2:
                    tokenDetails = null;
                    return [4 /*yield*/, openDb(OLD_DB_NAME, OLD_DB_VERSION, function (db) { return __awaiter(_this, void 0, void 0, function () {
                            var objectStore, value, oldDetails, oldDetails, oldDetails;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (db.oldVersion < 2) {
                                            // Database too old, skip migration.
                                            return [2 /*return*/];
                                        }
                                        if (!db.objectStoreNames.contains(OLD_OBJECT_STORE_NAME)) {
                                            // Database did not exist. Nothing to do.
                                            return [2 /*return*/];
                                        }
                                        objectStore = db.transaction.objectStore(OLD_OBJECT_STORE_NAME);
                                        return [4 /*yield*/, objectStore.index('fcmSenderId').get(senderId)];
                                    case 1:
                                        value = _b.sent();
                                        return [4 /*yield*/, objectStore.clear()];
                                    case 2:
                                        _b.sent();
                                        if (!value) {
                                            // No entry in the database, nothing to migrate.
                                            return [2 /*return*/];
                                        }
                                        if (db.oldVersion === 2) {
                                            oldDetails = value;
                                            if (!oldDetails.auth || !oldDetails.p256dh || !oldDetails.endpoint) {
                                                return [2 /*return*/];
                                            }
                                            tokenDetails = {
                                                token: oldDetails.fcmToken,
                                                createTime: (_a = oldDetails.createTime) !== null && _a !== void 0 ? _a : Date.now(),
                                                subscriptionOptions: {
                                                    auth: oldDetails.auth,
                                                    p256dh: oldDetails.p256dh,
                                                    endpoint: oldDetails.endpoint,
                                                    swScope: oldDetails.swScope,
                                                    vapidKey: typeof oldDetails.vapidKey === 'string'
                                                        ? oldDetails.vapidKey
                                                        : arrayToBase64(oldDetails.vapidKey)
                                                }
                                            };
                                        }
                                        else if (db.oldVersion === 3) {
                                            oldDetails = value;
                                            tokenDetails = {
                                                token: oldDetails.fcmToken,
                                                createTime: oldDetails.createTime,
                                                subscriptionOptions: {
                                                    auth: arrayToBase64(oldDetails.auth),
                                                    p256dh: arrayToBase64(oldDetails.p256dh),
                                                    endpoint: oldDetails.endpoint,
                                                    swScope: oldDetails.swScope,
                                                    vapidKey: arrayToBase64(oldDetails.vapidKey)
                                                }
                                            };
                                        }
                                        else if (db.oldVersion === 4) {
                                            oldDetails = value;
                                            tokenDetails = {
                                                token: oldDetails.fcmToken,
                                                createTime: oldDetails.createTime,
                                                subscriptionOptions: {
                                                    auth: arrayToBase64(oldDetails.auth),
                                                    p256dh: arrayToBase64(oldDetails.p256dh),
                                                    endpoint: oldDetails.endpoint,
                                                    swScope: oldDetails.swScope,
                                                    vapidKey: arrayToBase64(oldDetails.vapidKey)
                                                }
                                            };
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    db = _a.sent();
                    db.close();
                    // Delete all old databases.
                    return [4 /*yield*/, deleteDb(OLD_DB_NAME)];
                case 4:
                    // Delete all old databases.
                    _a.sent();
                    return [4 /*yield*/, deleteDb('fcm_vapid_details_db')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, deleteDb('undefined')];
                case 6:
                    _a.sent();
                    return [2 /*return*/, checkTokenDetails(tokenDetails) ? tokenDetails : null];
            }
        });
    });
}
function checkTokenDetails(tokenDetails) {
    if (!tokenDetails || !tokenDetails.subscriptionOptions) {
        return false;
    }
    var subscriptionOptions = tokenDetails.subscriptionOptions;
    return (typeof tokenDetails.createTime === 'number' &&
        tokenDetails.createTime > 0 &&
        typeof tokenDetails.token === 'string' &&
        tokenDetails.token.length > 0 &&
        typeof subscriptionOptions.auth === 'string' &&
        subscriptionOptions.auth.length > 0 &&
        typeof subscriptionOptions.p256dh === 'string' &&
        subscriptionOptions.p256dh.length > 0 &&
        typeof subscriptionOptions.endpoint === 'string' &&
        subscriptionOptions.endpoint.length > 0 &&
        typeof subscriptionOptions.swScope === 'string' &&
        subscriptionOptions.swScope.length > 0 &&
        typeof subscriptionOptions.vapidKey === 'string' &&
        subscriptionOptions.vapidKey.length > 0);
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
// Exported for tests.
var DATABASE_NAME = 'firebase-messaging-database';
var DATABASE_VERSION = 1;
var OBJECT_STORE_NAME = 'firebase-messaging-store';
var dbPromise = null;
function getDbPromise() {
    if (!dbPromise) {
        dbPromise = openDb(DATABASE_NAME, DATABASE_VERSION, function (upgradeDb) {
            // We don't use 'break' in this switch statement, the fall-through behavior is what we want,
            // because if there are multiple versions between the old version and the current version, we
            // want ALL the migrations that correspond to those versions to run, not only the last one.
            // eslint-disable-next-line default-case
            switch (upgradeDb.oldVersion) {
                case 0:
                    upgradeDb.createObjectStore(OBJECT_STORE_NAME);
            }
        });
    }
    return dbPromise;
}
/** Gets record(s) from the objectStore that match the given key. */
function dbGet(firebaseDependencies) {
    return __awaiter(this, void 0, void 0, function () {
        var key, db, tokenDetails, oldTokenDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(firebaseDependencies);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db
                            .transaction(OBJECT_STORE_NAME)
                            .objectStore(OBJECT_STORE_NAME)
                            .get(key)];
                case 2:
                    tokenDetails = _a.sent();
                    if (!tokenDetails) return [3 /*break*/, 3];
                    return [2 /*return*/, tokenDetails];
                case 3: return [4 /*yield*/, migrateOldDatabase(firebaseDependencies.appConfig.senderId)];
                case 4:
                    oldTokenDetails = _a.sent();
                    if (!oldTokenDetails) return [3 /*break*/, 6];
                    return [4 /*yield*/, dbSet(firebaseDependencies, oldTokenDetails)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, oldTokenDetails];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/** Assigns or overwrites the record for the given key with the given value. */
function dbSet(firebaseDependencies, tokenDetails) {
    return __awaiter(this, void 0, void 0, function () {
        var key, db, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(firebaseDependencies);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME).put(tokenDetails, key)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tx.complete];
                case 3:
                    _a.sent();
                    return [2 /*return*/, tokenDetails];
            }
        });
    });
}
/** Removes record(s) from the objectStore that match the given key. */
function dbRemove(firebaseDependencies) {
    return __awaiter(this, void 0, void 0, function () {
        var key, db, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(firebaseDependencies);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME).delete(key)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tx.complete];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getKey(_a) {
    var appConfig = _a.appConfig;
    return appConfig.appId;
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
function requestGetToken(firebaseDependencies, subscriptionOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, body, subscribeOptions, responseData, response, err_1, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHeaders(firebaseDependencies)];
                case 1:
                    headers = _a.sent();
                    body = getBody(subscriptionOptions);
                    subscribeOptions = {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(body)
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch(getEndpoint(firebaseDependencies.appConfig), subscribeOptions)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    responseData = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    throw ERROR_FACTORY.create("token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */, {
                        errorInfo: err_1
                    });
                case 6:
                    if (responseData.error) {
                        message = responseData.error.message;
                        throw ERROR_FACTORY.create("token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */, {
                            errorInfo: message
                        });
                    }
                    if (!responseData.token) {
                        throw ERROR_FACTORY.create("token-subscribe-no-token" /* TOKEN_SUBSCRIBE_NO_TOKEN */);
                    }
                    return [2 /*return*/, responseData.token];
            }
        });
    });
}
function requestUpdateToken(firebaseDependencies, tokenDetails) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, body, updateOptions, responseData, response, err_2, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHeaders(firebaseDependencies)];
                case 1:
                    headers = _a.sent();
                    body = getBody(tokenDetails.subscriptionOptions);
                    updateOptions = {
                        method: 'PATCH',
                        headers: headers,
                        body: JSON.stringify(body)
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch(getEndpoint(firebaseDependencies.appConfig) + "/" + tokenDetails.token, updateOptions)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    responseData = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _a.sent();
                    throw ERROR_FACTORY.create("token-update-failed" /* TOKEN_UPDATE_FAILED */, {
                        errorInfo: err_2
                    });
                case 6:
                    if (responseData.error) {
                        message = responseData.error.message;
                        throw ERROR_FACTORY.create("token-update-failed" /* TOKEN_UPDATE_FAILED */, {
                            errorInfo: message
                        });
                    }
                    if (!responseData.token) {
                        throw ERROR_FACTORY.create("token-update-no-token" /* TOKEN_UPDATE_NO_TOKEN */);
                    }
                    return [2 /*return*/, responseData.token];
            }
        });
    });
}
function requestDeleteToken(firebaseDependencies, token) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, unsubscribeOptions, response, responseData, message, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHeaders(firebaseDependencies)];
                case 1:
                    headers = _a.sent();
                    unsubscribeOptions = {
                        method: 'DELETE',
                        headers: headers
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch(getEndpoint(firebaseDependencies.appConfig) + "/" + token, unsubscribeOptions)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    responseData = _a.sent();
                    if (responseData.error) {
                        message = responseData.error.message;
                        throw ERROR_FACTORY.create("token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */, {
                            errorInfo: message
                        });
                    }
                    return [3 /*break*/, 6];
                case 5:
                    err_3 = _a.sent();
                    throw ERROR_FACTORY.create("token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */, {
                        errorInfo: err_3
                    });
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getEndpoint(_a) {
    var projectId = _a.projectId;
    return ENDPOINT + "/projects/" + projectId + "/registrations";
}
function getHeaders(_a) {
    var appConfig = _a.appConfig, installations = _a.installations;
    return __awaiter(this, void 0, void 0, function () {
        var authToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, installations.getToken()];
                case 1:
                    authToken = _b.sent();
                    return [2 /*return*/, new Headers({
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            'x-goog-api-key': appConfig.apiKey,
                            'x-goog-firebase-installations-auth': "FIS " + authToken
                        })];
            }
        });
    });
}
function getBody(_a) {
    var p256dh = _a.p256dh, auth = _a.auth, endpoint = _a.endpoint, vapidKey = _a.vapidKey;
    var body = {
        web: {
            endpoint: endpoint,
            auth: auth,
            p256dh: p256dh
        }
    };
    if (vapidKey !== DEFAULT_VAPID_KEY) {
        body.web.applicationPubKey = vapidKey;
    }
    return body;
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
/** UpdateRegistration will be called once every week. */
var TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
function getToken(firebaseDependencies, swRegistration, vapidKey) {
    return __awaiter(this, void 0, void 0, function () {
        var pushSubscription, tokenDetails, subscriptionOptions, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Notification.permission !== 'granted') {
                        throw ERROR_FACTORY.create("permission-blocked" /* PERMISSION_BLOCKED */);
                    }
                    return [4 /*yield*/, getPushSubscription(swRegistration, vapidKey)];
                case 1:
                    pushSubscription = _a.sent();
                    return [4 /*yield*/, dbGet(firebaseDependencies)];
                case 2:
                    tokenDetails = _a.sent();
                    subscriptionOptions = {
                        vapidKey: vapidKey,
                        swScope: swRegistration.scope,
                        endpoint: pushSubscription.endpoint,
                        auth: arrayToBase64(pushSubscription.getKey('auth')),
                        p256dh: arrayToBase64(pushSubscription.getKey('p256dh'))
                    };
                    if (!!tokenDetails) return [3 /*break*/, 3];
                    // No token, get a new one.
                    return [2 /*return*/, getNewToken(firebaseDependencies, subscriptionOptions)];
                case 3:
                    if (!!isTokenValid(tokenDetails.subscriptionOptions, subscriptionOptions)) return [3 /*break*/, 8];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, requestDeleteToken(firebaseDependencies, tokenDetails.token)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    // Suppress errors because of #2364
                    console.warn(e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, getNewToken(firebaseDependencies, subscriptionOptions)];
                case 8:
                    if (Date.now() >= tokenDetails.createTime + TOKEN_EXPIRATION_MS) {
                        // Weekly token refresh
                        return [2 /*return*/, updateToken({
                                token: tokenDetails.token,
                                createTime: Date.now(),
                                subscriptionOptions: subscriptionOptions
                            }, firebaseDependencies, swRegistration)];
                    }
                    else {
                        // Valid token, nothing to do.
                        return [2 /*return*/, tokenDetails.token];
                    }
                case 9: return [2 /*return*/];
            }
        });
    });
}
/**
 * This method deletes the token from the database, unsubscribes the token from FCM, and unregisters
 * the push subscription if it exists.
 */
function deleteToken(firebaseDependencies, swRegistration) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenDetails, pushSubscription;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbGet(firebaseDependencies)];
                case 1:
                    tokenDetails = _a.sent();
                    if (!tokenDetails) return [3 /*break*/, 4];
                    return [4 /*yield*/, requestDeleteToken(firebaseDependencies, tokenDetails.token)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dbRemove(firebaseDependencies)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, swRegistration.pushManager.getSubscription()];
                case 5:
                    pushSubscription = _a.sent();
                    if (pushSubscription) {
                        return [2 /*return*/, pushSubscription.unsubscribe()];
                    }
                    // If there's no SW, consider it a success.
                    return [2 /*return*/, true];
            }
        });
    });
}
function updateToken(tokenDetails, firebaseDependencies, swRegistration) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedToken, updatedTokenDetails, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 5]);
                    return [4 /*yield*/, requestUpdateToken(firebaseDependencies, tokenDetails)];
                case 1:
                    updatedToken = _a.sent();
                    updatedTokenDetails = __assign(__assign({}, tokenDetails), { token: updatedToken, createTime: Date.now() });
                    return [4 /*yield*/, dbSet(firebaseDependencies, updatedTokenDetails)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, updatedToken];
                case 3:
                    e_2 = _a.sent();
                    return [4 /*yield*/, deleteToken(firebaseDependencies, swRegistration)];
                case 4:
                    _a.sent();
                    throw e_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getNewToken(firebaseDependencies, subscriptionOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var token, tokenDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestGetToken(firebaseDependencies, subscriptionOptions)];
                case 1:
                    token = _a.sent();
                    tokenDetails = {
                        token: token,
                        createTime: Date.now(),
                        subscriptionOptions: subscriptionOptions
                    };
                    return [4 /*yield*/, dbSet(firebaseDependencies, tokenDetails)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, tokenDetails.token];
            }
        });
    });
}
/**
 * Gets a PushSubscription for the current user.
 */
function getPushSubscription(swRegistration, vapidKey) {
    return __awaiter(this, void 0, void 0, function () {
        var subscription;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, swRegistration.pushManager.getSubscription()];
                case 1:
                    subscription = _a.sent();
                    if (subscription) {
                        return [2 /*return*/, subscription];
                    }
                    return [2 /*return*/, swRegistration.pushManager.subscribe({
                            userVisibleOnly: true,
                            // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
                            // submitted to pushManager#subscribe must be of type Uint8Array.
                            applicationServerKey: base64ToArray(vapidKey)
                        })];
            }
        });
    });
}
/**
 * Checks if the saved tokenDetails object matches the configuration provided.
 */
function isTokenValid(dbOptions, currentOptions) {
    var isVapidKeyEqual = currentOptions.vapidKey === dbOptions.vapidKey;
    var isEndpointEqual = currentOptions.endpoint === dbOptions.endpoint;
    var isAuthEqual = currentOptions.auth === dbOptions.auth;
    var isP256dhEqual = currentOptions.p256dh === dbOptions.p256dh;
    return isVapidKeyEqual && isEndpointEqual && isAuthEqual && isP256dhEqual;
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
function externalizePayload(internalPayload) {
    var payload = {
        from: internalPayload.from,
        // eslint-disable-next-line camelcase
        collapseKey: internalPayload.collapse_key
    };
    propagateNotificationPayload(payload, internalPayload);
    propagateDataPayload(payload, internalPayload);
    propagateFcmOptions(payload, internalPayload);
    return payload;
}
function propagateNotificationPayload(payload, messagePayloadInternal) {
    if (!messagePayloadInternal.notification) {
        return;
    }
    payload.notification = {};
    var title = messagePayloadInternal.notification.title;
    if (!!title) {
        payload.notification.title = title;
    }
    var body = messagePayloadInternal.notification.body;
    if (!!body) {
        payload.notification.body = body;
    }
    var image = messagePayloadInternal.notification.image;
    if (!!image) {
        payload.notification.image = image;
    }
}
function propagateDataPayload(payload, messagePayloadInternal) {
    if (!messagePayloadInternal.data) {
        return;
    }
    payload.data = messagePayloadInternal.data;
}
function propagateFcmOptions(payload, messagePayloadInternal) {
    if (!messagePayloadInternal.fcmOptions) {
        return;
    }
    payload.fcmOptions = {};
    var link = messagePayloadInternal.fcmOptions.link;
    if (!!link) {
        payload.fcmOptions.link = link;
    }
    // eslint-disable-next-line camelcase
    var analyticsLabel = messagePayloadInternal.fcmOptions.analytics_label;
    if (!!analyticsLabel) {
        payload.fcmOptions.analyticsLabel = analyticsLabel;
    }
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
function isConsoleMessage(data) {
    // This message has a campaign ID, meaning it was sent using the Firebase Console.
    return typeof data === 'object' && !!data && CONSOLE_CAMPAIGN_ID in data;
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
/** Returns a promise that resolves after given time passes. */
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

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
var SwController = /** @class */ (function () {
    function SwController(firebaseDependencies) {
        var _this = this;
        this.firebaseDependencies = firebaseDependencies;
        // A boolean flag to determine wether an app is using onBackgroundMessage or
        // setBackgroundMessageHandler. onBackgroundMessage will receive a MessagePayload regardless of if
        // a notification is displayed. Whereas, setBackgroundMessageHandler will swallow the
        // MessagePayload if a NotificationPayload is included.
        this.isOnBackgroundMessageUsed = null;
        this.vapidKey = null;
        this.bgMessageHandler = null;
        self.addEventListener('push', function (e) {
            e.waitUntil(_this.onPush(e));
        });
        self.addEventListener('pushsubscriptionchange', function (e) {
            e.waitUntil(_this.onSubChange(e));
        });
        self.addEventListener('notificationclick', function (e) {
            e.waitUntil(_this.onNotificationClick(e));
        });
    }
    Object.defineProperty(SwController.prototype, "app", {
        get: function () {
            return this.firebaseDependencies.app;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @deprecated. Use onBackgroundMessage(nextOrObserver: NextFn<object> | Observer<object>):
     * Unsubscribe instead.
     *
     * Calling setBackgroundMessageHandler will opt in to some specific behaviors.
     *
     * 1.) If a notification doesn't need to be shown due to a window already being visible, then push
     * messages will be sent to the page. 2.) If a notification needs to be shown, and the message
     * contains no notification data this method will be called and the promise it returns will be
     * passed to event.waitUntil. If you do not set this callback then all push messages will let and
     * the developer can handle them in a their own 'push' event callback
     *
     * @param callback The callback to be called when a push message is received and a notification
     * must be shown. The callback will be given the data from the push message.
     */
    SwController.prototype.setBackgroundMessageHandler = function (callback) {
        this.isOnBackgroundMessageUsed = false;
        if (!callback || typeof callback !== 'function') {
            throw ERROR_FACTORY.create("invalid-bg-handler" /* INVALID_BG_HANDLER */);
        }
        this.bgMessageHandler = callback;
    };
    SwController.prototype.onBackgroundMessage = function (nextOrObserver) {
        var _this = this;
        this.isOnBackgroundMessageUsed = true;
        this.bgMessageHandler = nextOrObserver;
        return function () {
            _this.bgMessageHandler = null;
        };
    };
    // TODO: Remove getToken from SW Controller. Calling this from an old SW can cause all kinds of
    // trouble.
    SwController.prototype.getToken = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var tokenDetails;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.vapidKey) return [3 /*break*/, 2];
                        return [4 /*yield*/, dbGet(this.firebaseDependencies)];
                    case 1:
                        tokenDetails = _c.sent();
                        this.vapidKey =
                            (_b = (_a = tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.subscriptionOptions) === null || _a === void 0 ? void 0 : _a.vapidKey) !== null && _b !== void 0 ? _b : DEFAULT_VAPID_KEY;
                        _c.label = 2;
                    case 2: return [2 /*return*/, getToken(this.firebaseDependencies, self.registration, this.vapidKey)];
                }
            });
        });
    };
    // TODO: Remove deleteToken from SW Controller. Calling this from an old SW can cause all kinds of
    // trouble.
    SwController.prototype.deleteToken = function () {
        return deleteToken(this.firebaseDependencies, self.registration);
    };
    SwController.prototype.requestPermission = function () {
        throw ERROR_FACTORY.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    // TODO: Remove this together with getToken from SW Controller.
    SwController.prototype.usePublicVapidKey = function (vapidKey) {
        if (this.vapidKey !== null) {
            throw ERROR_FACTORY.create("use-vapid-key-after-get-token" /* USE_VAPID_KEY_AFTER_GET_TOKEN */);
        }
        if (typeof vapidKey !== 'string' || vapidKey.length === 0) {
            throw ERROR_FACTORY.create("invalid-vapid-key" /* INVALID_VAPID_KEY */);
        }
        this.vapidKey = vapidKey;
    };
    SwController.prototype.useServiceWorker = function () {
        throw ERROR_FACTORY.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    SwController.prototype.onMessage = function () {
        throw ERROR_FACTORY.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    SwController.prototype.onTokenRefresh = function () {
        throw ERROR_FACTORY.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    /**
     * A handler for push events that shows notifications based on the content of the payload.
     *
     * The payload must be a JSON-encoded Object with a `notification` key. The value of the
     * `notification` property will be used as the NotificationOptions object passed to
     * showNotification. Additionally, the `title` property of the notification object will be used as
     * the title.
     *
     * If there is no notification data in the payload then no notification will be shown.
     */
    SwController.prototype.onPush = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var internalPayload, clientList, isNotificationShown, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        internalPayload = getMessagePayloadInternal(event);
                        if (!internalPayload) {
                            console.debug(TAG +
                                'failed to get parsed MessagePayload from the PushEvent. Skip handling the push.');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, getClientList()];
                    case 1:
                        clientList = _a.sent();
                        if (hasVisibleClients(clientList)) {
                            return [2 /*return*/, sendMessagePayloadInternalToWindows(clientList, internalPayload)];
                        }
                        isNotificationShown = false;
                        if (!!!internalPayload.notification) return [3 /*break*/, 3];
                        return [4 /*yield*/, showNotification(wrapInternalPayload(internalPayload))];
                    case 2:
                        _a.sent();
                        isNotificationShown = true;
                        _a.label = 3;
                    case 3:
                        // MessagePayload is only passed to `onBackgroundMessage`. Skip passing MessagePayload for
                        // the legacy `setBackgroundMessageHandler` to preserve the SDK behaviors.
                        if (isNotificationShown === true &&
                            this.isOnBackgroundMessageUsed === false) {
                            return [2 /*return*/];
                        }
                        if (!!this.bgMessageHandler) {
                            payload = externalizePayload(internalPayload);
                            if (typeof this.bgMessageHandler === 'function') {
                                this.bgMessageHandler(payload);
                            }
                            else {
                                this.bgMessageHandler.next(payload);
                            }
                        }
                        // wait briefly to allow onBackgroundMessage to complete
                        return [4 /*yield*/, sleep(BACKGROUND_HANDLE_EXECUTION_TIME_LIMIT_MS)];
                    case 4:
                        // wait briefly to allow onBackgroundMessage to complete
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SwController.prototype.onSubChange = function (event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var newSubscription, tokenDetails;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newSubscription = event.newSubscription;
                        if (!!newSubscription) return [3 /*break*/, 2];
                        // Subscription revoked, delete token
                        return [4 /*yield*/, deleteToken(this.firebaseDependencies, self.registration)];
                    case 1:
                        // Subscription revoked, delete token
                        _c.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, dbGet(this.firebaseDependencies)];
                    case 3:
                        tokenDetails = _c.sent();
                        return [4 /*yield*/, deleteToken(this.firebaseDependencies, self.registration)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, getToken(this.firebaseDependencies, self.registration, (_b = (_a = tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.subscriptionOptions) === null || _a === void 0 ? void 0 : _a.vapidKey) !== null && _b !== void 0 ? _b : DEFAULT_VAPID_KEY)];
                    case 5:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SwController.prototype.onNotificationClick = function (event) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var internalPayload, link, url, originUrl, client;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        internalPayload = (_b = (_a = event.notification) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b[FCM_MSG];
                        if (!internalPayload) {
                            return [2 /*return*/];
                        }
                        else if (event.action) {
                            // User clicked on an action button. This will allow developers to act on action button clicks
                            // by using a custom onNotificationClick listener that they define.
                            return [2 /*return*/];
                        }
                        // Prevent other listeners from receiving the event
                        event.stopImmediatePropagation();
                        event.notification.close();
                        link = getLink(internalPayload);
                        if (!link) {
                            return [2 /*return*/];
                        }
                        url = new URL(link, self.location.href);
                        originUrl = new URL(self.location.origin);
                        if (url.host !== originUrl.host) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, getWindowClient(url)];
                    case 1:
                        client = _c.sent();
                        if (!!client) return [3 /*break*/, 4];
                        return [4 /*yield*/, self.clients.openWindow(link)];
                    case 2:
                        client = _c.sent();
                        // Wait three seconds for the client to initialize and set up the message handler so that it
                        // can receive the message.
                        return [4 /*yield*/, sleep(FOREGROUND_HANDLE_PREPARATION_TIME_MS)];
                    case 3:
                        // Wait three seconds for the client to initialize and set up the message handler so that it
                        // can receive the message.
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, client.focus()];
                    case 5:
                        client = _c.sent();
                        _c.label = 6;
                    case 6:
                        if (!client) {
                            // Window Client will not be returned if it's for a third party origin.
                            return [2 /*return*/];
                        }
                        internalPayload.messageType = MessageType.NOTIFICATION_CLICKED;
                        internalPayload.isFirebaseMessaging = true;
                        return [2 /*return*/, client.postMessage(internalPayload)];
                }
            });
        });
    };
    return SwController;
}());
function wrapInternalPayload(internalPayload) {
    var _a;
    var wrappedInternalPayload = __assign({}, internalPayload.notification);
    // Put the message payload under FCM_MSG name so we can identify the notification as being an FCM
    // notification vs a notification from somewhere else (i.e. normal web push or developer generated
    // notification).
    wrappedInternalPayload.data = (_a = {},
        _a[FCM_MSG] = internalPayload,
        _a);
    return wrappedInternalPayload;
}
function getMessagePayloadInternal(_a) {
    var data = _a.data;
    if (!data) {
        return null;
    }
    try {
        return data.json();
    }
    catch (err) {
        // Not JSON so not an FCM message.
        return null;
    }
}
/**
 * @param url The URL to look for when focusing a client.
 * @return Returns an existing window client or a newly opened WindowClient.
 */
function getWindowClient(url) {
    return __awaiter(this, void 0, void 0, function () {
        var clientList, clientList_1, clientList_1_1, client, clientUrl;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getClientList()];
                case 1:
                    clientList = _b.sent();
                    try {
                        for (clientList_1 = __values(clientList), clientList_1_1 = clientList_1.next(); !clientList_1_1.done; clientList_1_1 = clientList_1.next()) {
                            client = clientList_1_1.value;
                            clientUrl = new URL(client.url, self.location.href);
                            if (url.host === clientUrl.host) {
                                return [2 /*return*/, client];
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (clientList_1_1 && !clientList_1_1.done && (_a = clientList_1.return)) _a.call(clientList_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
/**
 * @returns If there is currently a visible WindowClient, this method will resolve to true,
 * otherwise false.
 */
function hasVisibleClients(clientList) {
    return clientList.some(function (client) {
        return client.visibilityState === 'visible' &&
            // Ignore chrome-extension clients as that matches the background pages of extensions, which
            // are always considered visible for some reason.
            !client.url.startsWith('chrome-extension://');
    });
}
function sendMessagePayloadInternalToWindows(clientList, internalPayload) {
    var e_2, _a;
    internalPayload.isFirebaseMessaging = true;
    internalPayload.messageType = MessageType.PUSH_RECEIVED;
    try {
        for (var clientList_2 = __values(clientList), clientList_2_1 = clientList_2.next(); !clientList_2_1.done; clientList_2_1 = clientList_2.next()) {
            var client = clientList_2_1.value;
            client.postMessage(internalPayload);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (clientList_2_1 && !clientList_2_1.done && (_a = clientList_2.return)) _a.call(clientList_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
function getClientList() {
    return self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
        // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
    });
}
function showNotification(notificationPayloadInternal) {
    var _a;
    // Note: Firefox does not support the maxActions property.
    // https://developer.mozilla.org/en-US/docs/Web/API/notification/maxActions
    var actions = notificationPayloadInternal.actions;
    var maxActions = Notification.maxActions;
    if (actions && maxActions && actions.length > maxActions) {
        console.warn("This browser only supports " + maxActions + " actions. The remaining actions will not be displayed.");
    }
    return self.registration.showNotification(
    /* title= */ (_a = notificationPayloadInternal.title) !== null && _a !== void 0 ? _a : '', notificationPayloadInternal);
}
function getLink(payload) {
    var _a, _b, _c;
    // eslint-disable-next-line camelcase
    var link = (_b = (_a = payload.fcmOptions) === null || _a === void 0 ? void 0 : _a.link) !== null && _b !== void 0 ? _b : (_c = payload.notification) === null || _c === void 0 ? void 0 : _c.click_action;
    if (link) {
        return link;
    }
    if (isConsoleMessage(payload.data)) {
        // Notification created in the Firebase Console. Redirect to origin.
        return self.location.origin;
    }
    else {
        return null;
    }
}

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
var WindowController = /** @class */ (function () {
    function WindowController(firebaseDependencies) {
        var _this = this;
        this.firebaseDependencies = firebaseDependencies;
        this.vapidKey = null;
        this.onMessageCallback = null;
        navigator.serviceWorker.addEventListener('message', function (e) {
            return _this.messageEventListener(e);
        });
    }
    Object.defineProperty(WindowController.prototype, "app", {
        get: function () {
            return this.firebaseDependencies.app;
        },
        enumerable: false,
        configurable: true
    });
    WindowController.prototype.messageEventListener = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var internalPayload, dataPayload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        internalPayload = event.data;
                        if (!internalPayload.isFirebaseMessaging) {
                            return [2 /*return*/];
                        }
                        // onMessageCallback is either a function or observer/subscriber.
                        // TODO: in the modularization release, have onMessage handle type MessagePayload as supposed to
                        // the legacy payload where some fields are in snake cases.
                        if (this.onMessageCallback &&
                            internalPayload.messageType === MessageType.PUSH_RECEIVED) {
                            if (typeof this.onMessageCallback === 'function') {
                                this.onMessageCallback(stripInternalFields(Object.assign({}, internalPayload)));
                            }
                            else {
                                this.onMessageCallback.next(Object.assign({}, internalPayload));
                            }
                        }
                        dataPayload = internalPayload.data;
                        if (!(isConsoleMessage(dataPayload) &&
                            dataPayload[CONSOLE_CAMPAIGN_ANALYTICS_ENABLED] === '1')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.logEvent(internalPayload.messageType, dataPayload)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    WindowController.prototype.getVapidKey = function () {
        return this.vapidKey;
    };
    WindowController.prototype.getSwReg = function () {
        return this.swRegistration;
    };
    WindowController.prototype.getToken = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Notification.permission === 'default')) return [3 /*break*/, 2];
                        return [4 /*yield*/, Notification.requestPermission()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (Notification.permission !== 'granted') {
                            throw ERROR_FACTORY.create("permission-blocked" /* PERMISSION_BLOCKED */);
                        }
                        return [4 /*yield*/, this.updateVapidKey(options === null || options === void 0 ? void 0 : options.vapidKey)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.updateSwReg(options === null || options === void 0 ? void 0 : options.serviceWorkerRegistration)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, getToken(this.firebaseDependencies, this.swRegistration, this.vapidKey)];
                }
            });
        });
    };
    WindowController.prototype.updateVapidKey = function (vapidKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!!vapidKey) {
                    this.vapidKey = vapidKey;
                }
                else if (!this.vapidKey) {
                    this.vapidKey = DEFAULT_VAPID_KEY;
                }
                return [2 /*return*/];
            });
        });
    };
    WindowController.prototype.updateSwReg = function (swRegistration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!swRegistration && !this.swRegistration)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.registerDefaultSw()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!swRegistration && !!this.swRegistration) {
                            return [2 /*return*/];
                        }
                        if (!(swRegistration instanceof ServiceWorkerRegistration)) {
                            throw ERROR_FACTORY.create("invalid-sw-registration" /* INVALID_SW_REGISTRATION */);
                        }
                        this.swRegistration = swRegistration;
                        return [2 /*return*/];
                }
            });
        });
    };
    WindowController.prototype.registerDefaultSw = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, navigator.serviceWorker.register(DEFAULT_SW_PATH, {
                                scope: DEFAULT_SW_SCOPE
                            })];
                    case 1:
                        _a.swRegistration = _b.sent();
                        // The timing when browser updates sw when sw has an update is unreliable by my experiment. It
                        // leads to version conflict when the SDK upgrades to a newer version in the main page, but sw
                        // is stuck with the old version. For example,
                        // https://github.com/firebase/firebase-js-sdk/issues/2590 The following line reliably updates
                        // sw if there was an update.
                        this.swRegistration.update().catch(function () {
                            /* it is non blocking and we don't care if it failed */
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        throw ERROR_FACTORY.create("failed-service-worker-registration" /* FAILED_DEFAULT_REGISTRATION */, {
                            browserErrorMessage: e_1.message
                        });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WindowController.prototype.deleteToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.swRegistration) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.registerDefaultSw()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, deleteToken(this.firebaseDependencies, this.swRegistration)];
                }
            });
        });
    };
    /**
     * Request permission if it is not currently granted.
     *
     * @return Resolves if the permission was granted, rejects otherwise.
     *
     * @deprecated Use Notification.requestPermission() instead.
     * https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
     */
    WindowController.prototype.requestPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permissionResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Notification.permission === 'granted') {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Notification.requestPermission()];
                    case 1:
                        permissionResult = _a.sent();
                        if (permissionResult === 'granted') {
                            return [2 /*return*/];
                        }
                        else if (permissionResult === 'denied') {
                            throw ERROR_FACTORY.create("permission-blocked" /* PERMISSION_BLOCKED */);
                        }
                        else {
                            throw ERROR_FACTORY.create("permission-default" /* PERMISSION_DEFAULT */);
                        }
                }
            });
        });
    };
    /**
     * @deprecated. Use getToken(options?: {vapidKey?: string; serviceWorkerRegistration?:
     * ServiceWorkerRegistration;}): Promise<string> instead.
     */
    WindowController.prototype.usePublicVapidKey = function (vapidKey) {
        if (this.vapidKey !== null) {
            throw ERROR_FACTORY.create("use-vapid-key-after-get-token" /* USE_VAPID_KEY_AFTER_GET_TOKEN */);
        }
        if (typeof vapidKey !== 'string' || vapidKey.length === 0) {
            throw ERROR_FACTORY.create("invalid-vapid-key" /* INVALID_VAPID_KEY */);
        }
        this.vapidKey = vapidKey;
    };
    /**
     * @deprecated. Use getToken(options?: {vapidKey?: string; serviceWorkerRegistration?:
     * ServiceWorkerRegistration;}): Promise<string> instead.
     */
    WindowController.prototype.useServiceWorker = function (swRegistration) {
        if (!(swRegistration instanceof ServiceWorkerRegistration)) {
            throw ERROR_FACTORY.create("invalid-sw-registration" /* INVALID_SW_REGISTRATION */);
        }
        if (this.swRegistration) {
            throw ERROR_FACTORY.create("use-sw-after-get-token" /* USE_SW_AFTER_GET_TOKEN */);
        }
        this.swRegistration = swRegistration;
    };
    /**
     * @param nextOrObserver An observer object or a function triggered on message.
     *
     * @return The unsubscribe function for the observer.
     */
    WindowController.prototype.onMessage = function (nextOrObserver) {
        var _this = this;
        this.onMessageCallback = nextOrObserver;
        return function () {
            _this.onMessageCallback = null;
        };
    };
    WindowController.prototype.setBackgroundMessageHandler = function () {
        throw ERROR_FACTORY.create("only-available-in-sw" /* AVAILABLE_IN_SW */);
    };
    WindowController.prototype.onBackgroundMessage = function () {
        throw ERROR_FACTORY.create("only-available-in-sw" /* AVAILABLE_IN_SW */);
    };
    /**
     * @deprecated No-op. It was initially designed with token rotation requests from server in mind.
     * However, the plan to implement such feature was abandoned.
     */
    WindowController.prototype.onTokenRefresh = function () {
        return function () { };
    };
    WindowController.prototype.logEvent = function (messageType, data) {
        return __awaiter(this, void 0, void 0, function () {
            var eventType, analytics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventType = getEventType(messageType);
                        return [4 /*yield*/, this.firebaseDependencies.analyticsProvider.get()];
                    case 1:
                        analytics = _a.sent();
                        analytics.logEvent(eventType, {
                            /* eslint-disable camelcase */
                            message_id: data[CONSOLE_CAMPAIGN_ID],
                            message_name: data[CONSOLE_CAMPAIGN_NAME],
                            message_time: data[CONSOLE_CAMPAIGN_TIME],
                            message_device_time: Math.floor(Date.now() / 1000)
                            /* eslint-enable camelcase */
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return WindowController;
}());
function getEventType(messageType) {
    switch (messageType) {
        case MessageType.NOTIFICATION_CLICKED:
            return 'notification_open';
        case MessageType.PUSH_RECEIVED:
            return 'notification_foreground';
        default:
            throw new Error();
    }
}
function stripInternalFields(internalPayload) {
    delete internalPayload.messageType;
    delete internalPayload.isFirebaseMessaging;
    return internalPayload;
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
function extractAppConfig(app) {
    var e_1, _a;
    if (!app || !app.options) {
        throw getMissingValueError('App Configuration Object');
    }
    if (!app.name) {
        throw getMissingValueError('App Name');
    }
    // Required app config keys
    var configKeys = [
        'projectId',
        'apiKey',
        'appId',
        'messagingSenderId'
    ];
    var options = app.options;
    try {
        for (var configKeys_1 = __values(configKeys), configKeys_1_1 = configKeys_1.next(); !configKeys_1_1.done; configKeys_1_1 = configKeys_1.next()) {
            var keyName = configKeys_1_1.value;
            if (!options[keyName]) {
                throw getMissingValueError(keyName);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (configKeys_1_1 && !configKeys_1_1.done && (_a = configKeys_1.return)) _a.call(configKeys_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        appName: app.name,
        projectId: options.projectId,
        apiKey: options.apiKey,
        appId: options.appId,
        senderId: options.messagingSenderId
    };
}
function getMissingValueError(valueName) {
    return ERROR_FACTORY.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */, {
        valueName: valueName
    });
}

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
var MESSAGING_NAME = 'messaging';
function factoryMethod(container) {
    // Dependencies.
    var app = container.getProvider('app').getImmediate();
    var appConfig = extractAppConfig(app);
    var installations = container.getProvider('installations').getImmediate();
    var analyticsProvider = container.getProvider('analytics-internal');
    var firebaseDependencies = {
        app: app,
        appConfig: appConfig,
        installations: installations,
        analyticsProvider: analyticsProvider
    };
    if (!isSupported()) {
        throw ERROR_FACTORY.create("unsupported-browser" /* UNSUPPORTED_BROWSER */);
    }
    if (self && 'ServiceWorkerGlobalScope' in self) {
        // Running in ServiceWorker context
        return new SwController(firebaseDependencies);
    }
    else {
        // Assume we are in the window context.
        return new WindowController(firebaseDependencies);
    }
}
var NAMESPACE_EXPORTS = {
    isSupported: isSupported
};
firebase.INTERNAL.registerComponent(new Component(MESSAGING_NAME, factoryMethod, "PUBLIC" /* PUBLIC */).setServiceProps(NAMESPACE_EXPORTS));
function isSupported() {
    if (self && 'ServiceWorkerGlobalScope' in self) {
        // Running in ServiceWorker context
        return isSWControllerSupported();
    }
    else {
        // Assume we are in the window context.
        return isWindowControllerSupported();
    }
}
/**
 * Checks to see if the required APIs exist.
 */
function isWindowControllerSupported() {
    return ('indexedDB' in window &&
        indexedDB !== null &&
        navigator.cookieEnabled &&
        'serviceWorker' in navigator &&
        'PushManager' in window &&
        'Notification' in window &&
        'fetch' in window &&
        ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
        PushSubscription.prototype.hasOwnProperty('getKey'));
}
/**
 * Checks to see if the required APIs exist within SW Context.
 */
function isSWControllerSupported() {
    return ('indexedDB' in self &&
        indexedDB !== null &&
        'PushManager' in self &&
        'Notification' in self &&
        ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
        PushSubscription.prototype.hasOwnProperty('getKey'));
}
//# sourceMappingURL=index.esm.js.map
