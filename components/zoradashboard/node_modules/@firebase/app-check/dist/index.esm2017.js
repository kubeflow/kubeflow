import firebase from '@firebase/app';
import { Component } from '@firebase/component';
import { ErrorFactory, Deferred, isIndexedDBAvailable, getGlobal, issuedAtTime, base64 } from '@firebase/util';
import { Logger } from '@firebase/logger';

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
const ERRORS = {
    ["already-activated" /* ALREADY_ACTIVATED */]: 'You are trying to activate AppCheck for FirebaseApp {$appName}, ' +
        'while it is already activated. ' +
        'AppCheck can only be activated once.',
    ["use-before-activation" /* USE_BEFORE_ACTIVATION */]: 'AppCheck is being used before activate() is called for FirebaseApp {$appName}. ' +
        'Please make sure you call activate() before instantiating other Firebase services.',
    ["fetch-network-error" /* FETCH_NETWORK_ERROR */]: 'Fetch failed to connect to a network. Check Internet connection. ' +
        'Original error: {$originalErrorMessage}.',
    ["fetch-parse-error" /* FETCH_PARSE_ERROR */]: 'Fetch client could not parse response.' +
        ' Original error: {$originalErrorMessage}.',
    ["fetch-status-error" /* FETCH_STATUS_ERROR */]: 'Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.',
    ["storage-open" /* STORAGE_OPEN */]: 'Error thrown when opening storage. Original error: {$originalErrorMessage}.',
    ["storage-get" /* STORAGE_GET */]: 'Error thrown when reading from storage. Original error: {$originalErrorMessage}.',
    ["storage-set" /* STORAGE_WRITE */]: 'Error thrown when writing to storage. Original error: {$originalErrorMessage}.',
    ["recaptcha-error" /* RECAPTCHA_ERROR */]: 'ReCAPTCHA error.'
};
const ERROR_FACTORY = new ErrorFactory('appCheck', 'AppCheck', ERRORS);

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
const APP_CHECK_STATES = new Map();
const DEFAULT_STATE = {
    activated: false,
    tokenObservers: []
};
const DEBUG_STATE = {
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
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
const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api.js';
function initialize(app, siteKey) {
    const state = getState(app);
    const initialized = new Deferred();
    setState(app, Object.assign(Object.assign({}, state), { reCAPTCHAState: { initialized } }));
    const divId = `fire_app_check_${app.name}`;
    const invisibleDiv = document.createElement('div');
    invisibleDiv.id = divId;
    invisibleDiv.style.display = 'none';
    document.body.appendChild(invisibleDiv);
    const grecaptcha = getRecaptcha();
    if (!grecaptcha) {
        loadReCAPTCHAScript(() => {
            const grecaptcha = getRecaptcha();
            if (!grecaptcha) {
                // it shouldn't happen.
                throw new Error('no recaptcha');
            }
            grecaptcha.ready(() => {
                // Invisible widgets allow us to set a different siteKey for each widget, so we use them to support multiple apps
                renderInvisibleWidget(app, siteKey, grecaptcha, divId);
                initialized.resolve(grecaptcha);
            });
        });
    }
    else {
        grecaptcha.ready(() => {
            renderInvisibleWidget(app, siteKey, grecaptcha, divId);
            initialized.resolve(grecaptcha);
        });
    }
    return initialized.promise;
}
async function getToken$2(app) {
    ensureActivated(app);
    // ensureActivated() guarantees that reCAPTCHAState is set
    const reCAPTCHAState = getState(app).reCAPTCHAState;
    const recaptcha = await reCAPTCHAState.initialized.promise;
    return new Promise((resolve, _reject) => {
        // Updated after initialization is complete.
        const reCAPTCHAState = getState(app).reCAPTCHAState;
        recaptcha.ready(() => {
            resolve(
            // widgetId is guaranteed to be available if reCAPTCHAState.initialized.promise resolved.
            recaptcha.execute(reCAPTCHAState.widgetId, {
                action: 'fire_app_check'
            }));
        });
    });
}
/**
 *
 * @param app
 * @param container - Id of a HTML element.
 */
function renderInvisibleWidget(app, siteKey, grecaptcha, container) {
    const widgetId = grecaptcha.render(container, {
        sitekey: siteKey,
        size: 'invisible'
    });
    const state = getState(app);
    setState(app, Object.assign(Object.assign({}, state), { reCAPTCHAState: Object.assign(Object.assign({}, state.reCAPTCHAState), { // state.reCAPTCHAState is set in the initialize()
            widgetId }) }));
}
function loadReCAPTCHAScript(onload) {
    const script = document.createElement('script');
    script.src = `${RECAPTCHA_URL}`;
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
const BASE_ENDPOINT = 'https://content-firebaseappcheck.googleapis.com/v1beta';
const EXCHANGE_RECAPTCHA_TOKEN_METHOD = 'exchangeRecaptchaToken';
const EXCHANGE_DEBUG_TOKEN_METHOD = 'exchangeDebugToken';
const TOKEN_REFRESH_TIME = {
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
class Refresher {
    constructor(operation, retryPolicy, getWaitDuration, lowerBound, upperBound) {
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
    start() {
        this.nextErrorWaitInterval = this.lowerBound;
        this.process(true).catch(() => {
            /* we don't care about the result */
        });
    }
    stop() {
        if (this.pending) {
            this.pending.reject('cancelled');
            this.pending = null;
        }
    }
    isRunning() {
        return !!this.pending;
    }
    async process(hasSucceeded) {
        this.stop();
        try {
            this.pending = new Deferred();
            await sleep(this.getNextRun(hasSucceeded));
            // Why do we resolve a promise, then immediate wait for it?
            // We do it to make the promise chain cancellable.
            // We can call stop() which rejects the promise before the following line execute, which makes
            // the code jump to the catch block.
            // TODO: unit test this
            this.pending.resolve();
            await this.pending.promise;
            this.pending = new Deferred();
            await this.operation();
            this.pending.resolve();
            await this.pending.promise;
            this.process(true).catch(() => {
                /* we don't care about the result */
            });
        }
        catch (error) {
            if (this.retryPolicy(error)) {
                this.process(false).catch(() => {
                    /* we don't care about the result */
                });
            }
            else {
                this.stop();
            }
        }
    }
    getNextRun(hasSucceeded) {
        if (hasSucceeded) {
            // If last operation succeeded, reset next error wait interval and return
            // the default wait duration.
            this.nextErrorWaitInterval = this.lowerBound;
            // Return typical wait duration interval after a successful operation.
            return this.getWaitDuration();
        }
        else {
            // Get next error wait interval.
            const currentErrorWaitInterval = this.nextErrorWaitInterval;
            // Double interval for next consecutive error.
            this.nextErrorWaitInterval *= 2;
            // Make sure next wait interval does not exceed the maximum upper bound.
            if (this.nextErrorWaitInterval > this.upperBound) {
                this.nextErrorWaitInterval = this.upperBound;
            }
            return currentErrorWaitInterval;
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => {
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
async function exchangeToken({ url, body }, platformLoggerProvider) {
    const headers = {
        'Content-Type': 'application/json'
    };
    // If platform logger exists, add the platform info string to the header.
    const platformLogger = platformLoggerProvider.getImmediate({
        optional: true
    });
    if (platformLogger) {
        headers['X-Firebase-Client'] = platformLogger.getPlatformInfoString();
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    };
    let response;
    try {
        response = await fetch(url, options);
    }
    catch (originalError) {
        throw ERROR_FACTORY.create("fetch-network-error" /* FETCH_NETWORK_ERROR */, {
            originalErrorMessage: originalError.message
        });
    }
    if (response.status !== 200) {
        throw ERROR_FACTORY.create("fetch-status-error" /* FETCH_STATUS_ERROR */, {
            httpStatus: response.status
        });
    }
    let responseBody;
    try {
        // JSON parsing throws SyntaxError if the response body isn't a JSON string.
        responseBody = await response.json();
    }
    catch (originalError) {
        throw ERROR_FACTORY.create("fetch-parse-error" /* FETCH_PARSE_ERROR */, {
            originalErrorMessage: originalError.message
        });
    }
    // Protobuf duration format.
    // https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/Duration
    const match = responseBody.ttl.match(/^([\d.]+)(s)$/);
    if (!match || !match[2] || isNaN(Number(match[1]))) {
        throw ERROR_FACTORY.create("fetch-parse-error" /* FETCH_PARSE_ERROR */, {
            originalErrorMessage: `ttl field (timeToLive) is not in standard Protobuf Duration ` +
                `format: ${responseBody.ttl}`
        });
    }
    const timeToLiveAsNumber = Number(match[1]) * 1000;
    const now = Date.now();
    return {
        token: responseBody.attestationToken,
        expireTimeMillis: now + timeToLiveAsNumber,
        issuedAtTimeMillis: now
    };
}
function getExchangeRecaptchaTokenRequest(app, reCAPTCHAToken) {
    const { projectId, appId, apiKey } = app.options;
    return {
        url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_RECAPTCHA_TOKEN_METHOD}?key=${apiKey}`,
        body: {
            // eslint-disable-next-line
            recaptcha_token: reCAPTCHAToken
        }
    };
}
function getExchangeDebugTokenRequest(app, debugToken) {
    const { projectId, appId, apiKey } = app.options;
    return {
        url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_DEBUG_TOKEN_METHOD}?key=${apiKey}`,
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
const DB_NAME = 'firebase-app-check-database';
const DB_VERSION = 1;
const STORE_NAME = 'firebase-app-check-store';
const DEBUG_TOKEN_KEY = 'debug-token';
let dbPromise = null;
function getDBPromise() {
    if (dbPromise) {
        return dbPromise;
    }
    dbPromise = new Promise((resolve, reject) => {
        try {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onsuccess = event => {
                resolve(event.target.result);
            };
            request.onerror = event => {
                var _a;
                reject(ERROR_FACTORY.create("storage-open" /* STORAGE_OPEN */, {
                    originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
                }));
            };
            request.onupgradeneeded = event => {
                const db = event.target.result;
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
async function write(key, value) {
    const db = await getDBPromise();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({
        compositeKey: key,
        value
    });
    return new Promise((resolve, reject) => {
        request.onsuccess = _event => {
            resolve();
        };
        transaction.onerror = event => {
            var _a;
            reject(ERROR_FACTORY.create("storage-set" /* STORAGE_WRITE */, {
                originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
            }));
        };
    });
}
async function read(key) {
    const db = await getDBPromise();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
        request.onsuccess = event => {
            const result = event.target.result;
            if (result) {
                resolve(result.value);
            }
            else {
                resolve(undefined);
            }
        };
        transaction.onerror = event => {
            var _a;
            reject(ERROR_FACTORY.create("storage-get" /* STORAGE_GET */, {
                originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
            }));
        };
    });
}
function computeKey(app) {
    return `${app.options.appId}-${app.name}`;
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
const logger = new Logger('@firebase/app-check');

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
async function readTokenFromStorage(app) {
    if (isIndexedDBAvailable()) {
        let token = undefined;
        try {
            token = await readTokenFromIndexedDB(app);
        }
        catch (e) {
            // swallow the error and return undefined
            logger.warn(`Failed to read token from indexeddb. Error: ${e}`);
        }
        return token;
    }
    return undefined;
}
/**
 * Always resolves. In case of an error writing to indexeddb, print a warning and resolve the promise
 */
function writeTokenToStorage(app, token) {
    if (isIndexedDBAvailable()) {
        return writeTokenToIndexedDB(app, token).catch(e => {
            // swallow the error and resolve the promise
            logger.warn(`Failed to write token to indexeddb. Error: ${e}`);
        });
    }
    return Promise.resolve();
}
async function readOrCreateDebugTokenFromStorage() {
    /**
     * Theoretically race condition can happen if we read, then write in 2 separate transactions.
     * But it won't happen here, because this function will be called exactly once.
     */
    let existingDebugToken = undefined;
    try {
        existingDebugToken = await readDebugTokenFromIndexedDB();
    }
    catch (_e) {
        // failed to read from indexeddb. We assume there is no existing debug token, and generate a new one.
    }
    if (!existingDebugToken) {
        // create a new debug token
        const newToken = uuidv4();
        // We don't need to block on writing to indexeddb
        // In case persistence failed, a new debug token will be generated everytime the page is refreshed.
        // It renders the debug token useless because you have to manually register(whitelist) the new token in the firebase console again and again.
        // If you see this error trying to use debug token, it probably means you are using a browser that doesn't support indexeddb.
        // You should switch to a different browser that supports indexeddb
        writeDebugTokenToIndexedDB(newToken).catch(e => logger.warn(`Failed to persist debug token to indexeddb. Error: ${e}`));
        // Not using logger because I don't think we ever want this accidentally hidden?
        console.log(`AppCheck debug token: ${newToken}. You will need to whitelist it in the Firebase console for it to work`);
        return newToken;
    }
    else {
        return existingDebugToken;
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
function isDebugMode() {
    const debugState = getDebugState();
    return debugState.enabled;
}
async function getDebugToken() {
    const state = getDebugState();
    if (state.enabled && state.token) {
        return state.token.promise;
    }
    else {
        // should not happen!
        throw Error(`
            Can't get debug token in production mode.
        `);
    }
}
function initializeDebugMode() {
    const globals = getGlobal();
    if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== 'string' &&
        globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== true) {
        return;
    }
    const debugState = getDebugState();
    debugState.enabled = true;
    const deferredToken = new Deferred();
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
const defaultTokenErrorData = { error: 'UNKNOWN_ERROR' };
/**
 * Stringify and base64 encode token error data.
 *
 * @param tokenError Error data, currently hardcoded.
 */
function formatDummyToken(tokenErrorData) {
    return base64.encodeString(JSON.stringify(tokenErrorData), 
    /* webSafe= */ false);
}
/**
 * This function will always resolve.
 * The result will contain an error field if there is any error.
 * In case there is an error, the token field in the result will be populated with a dummy value
 */
async function getToken$1(app, platformLoggerProvider, forceRefresh = false) {
    ensureActivated(app);
    const state = getState(app);
    /**
     * First check if there is a token in memory from a previous `getToken()` call.
     */
    let token = state.token;
    let error = undefined;
    /**
     * If there is no token in memory, try to load token from indexedDB.
     */
    if (!token) {
        // readTokenFromStorage() always resolves. In case of an error, it resolves with `undefined`.
        const cachedToken = await readTokenFromStorage(app);
        if (cachedToken && isValid(cachedToken)) {
            token = cachedToken;
            setState(app, Object.assign(Object.assign({}, state), { token }));
            // notify all listeners with the cached token
            notifyTokenListeners(app, { token: token.token });
        }
    }
    // Return the cached token (from either memory or indexedDB) if it's valid
    if (!forceRefresh && token && isValid(token)) {
        return {
            token: token.token
        };
    }
    /**
     * DEBUG MODE
     * If debug mode is set, and there is no cached token, fetch a new App
     * Check token using the debug token, and return it directly.
     */
    if (isDebugMode()) {
        const tokenFromDebugExchange = await exchangeToken(getExchangeDebugTokenRequest(app, await getDebugToken()), platformLoggerProvider);
        // Write debug token to indexedDB.
        await writeTokenToStorage(app, tokenFromDebugExchange);
        // Write debug token to state.
        setState(app, Object.assign(Object.assign({}, state), { token: tokenFromDebugExchange }));
        return { token: tokenFromDebugExchange.token };
    }
    /**
     * request a new token
     */
    try {
        if (state.customProvider) {
            const customToken = await state.customProvider.getToken();
            // Try to extract IAT from custom token, in case this token is not
            // being newly issued. JWT timestamps are in seconds since epoch.
            const issuedAtTimeSeconds = issuedAtTime(customToken.token);
            // Very basic validation, use current timestamp as IAT if JWT
            // has no `iat` field or value is out of bounds.
            const issuedAtTimeMillis = issuedAtTimeSeconds !== null &&
                issuedAtTimeSeconds < Date.now() &&
                issuedAtTimeSeconds > 0
                ? issuedAtTimeSeconds * 1000
                : Date.now();
            token = Object.assign(Object.assign({}, customToken), { issuedAtTimeMillis });
        }
        else {
            const attestedClaimsToken = await getToken$2(app).catch(_e => {
                // reCaptcha.execute() throws null which is not very descriptive.
                throw ERROR_FACTORY.create("recaptcha-error" /* RECAPTCHA_ERROR */);
            });
            token = await exchangeToken(getExchangeRecaptchaTokenRequest(app, attestedClaimsToken), platformLoggerProvider);
        }
    }
    catch (e) {
        // `getToken()` should never throw, but logging error text to console will aid debugging.
        logger.error(e);
        error = e;
    }
    let interopTokenResult;
    if (!token) {
        // if token is undefined, there must be an error.
        // we return a dummy token along with the error
        interopTokenResult = makeDummyTokenResult(error);
    }
    else {
        interopTokenResult = {
            token: token.token
        };
        // write the new token to the memory state as well as the persistent storage.
        // Only do it if we got a valid new token
        setState(app, Object.assign(Object.assign({}, state), { token }));
        await writeTokenToStorage(app, token);
    }
    notifyTokenListeners(app, interopTokenResult);
    return interopTokenResult;
}
function addTokenListener(app, platformLoggerProvider, type, listener, onError) {
    const state = getState(app);
    const tokenListener = {
        next: listener,
        error: onError,
        type
    };
    const newState = Object.assign(Object.assign({}, state), { tokenObservers: [...state.tokenObservers, tokenListener] });
    /**
     * Invoke the listener with the valid token, then start the token refresher
     */
    if (!newState.tokenRefresher) {
        const tokenRefresher = createTokenRefresher(app, platformLoggerProvider);
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
        const validToken = state.token;
        Promise.resolve()
            .then(() => listener({ token: validToken.token }))
            .catch(() => {
            /** Ignore errors in listeners. */
        });
    }
    setState(app, newState);
}
function removeTokenListener(app, listener) {
    const state = getState(app);
    const newObservers = state.tokenObservers.filter(tokenObserver => tokenObserver.next !== listener);
    if (newObservers.length === 0 &&
        state.tokenRefresher &&
        state.tokenRefresher.isRunning()) {
        state.tokenRefresher.stop();
    }
    setState(app, Object.assign(Object.assign({}, state), { tokenObservers: newObservers }));
}
function createTokenRefresher(app, platformLoggerProvider) {
    return new Refresher(
    // Keep in mind when this fails for any reason other than the ones
    // for which we should retry, it will effectively stop the proactive refresh.
    async () => {
        const state = getState(app);
        // If there is no token, we will try to load it from storage and use it
        // If there is a token, we force refresh it because we know it's going to expire soon
        let result;
        if (!state.token) {
            result = await getToken$1(app, platformLoggerProvider);
        }
        else {
            result = await getToken$1(app, platformLoggerProvider, true);
        }
        // getToken() always resolves. In case the result has an error field defined, it means the operation failed, and we should retry.
        if (result.error) {
            throw result.error;
        }
    }, () => {
        // TODO: when should we retry?
        return true;
    }, () => {
        const state = getState(app);
        if (state.token) {
            // issuedAtTime + (50% * total TTL) + 5 minutes
            let nextRefreshTimeMillis = state.token.issuedAtTimeMillis +
                (state.token.expireTimeMillis - state.token.issuedAtTimeMillis) *
                    0.5 +
                5 * 60 * 1000;
            // Do not allow refresh time to be past (expireTime - 5 minutes)
            const latestAllowableRefresh = state.token.expireTimeMillis - 5 * 60 * 1000;
            nextRefreshTimeMillis = Math.min(nextRefreshTimeMillis, latestAllowableRefresh);
            return Math.max(0, nextRefreshTimeMillis - Date.now());
        }
        else {
            return 0;
        }
    }, TOKEN_REFRESH_TIME.RETRIAL_MIN_WAIT, TOKEN_REFRESH_TIME.RETRIAL_MAX_WAIT);
}
function notifyTokenListeners(app, token) {
    const observers = getState(app).tokenObservers;
    for (const observer of observers) {
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
        error
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
    const state = getState(app);
    if (state.activated) {
        throw ERROR_FACTORY.create("already-activated" /* ALREADY_ACTIVATED */, {
            appName: app.name
        });
    }
    const newState = Object.assign(Object.assign({}, state), { activated: true });
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
        initialize(app, newState.siteKey).catch(() => {
            /* we don't care about the initialization result in activate() */
        });
    }
}
function setTokenAutoRefreshEnabled(app, isTokenAutoRefreshEnabled) {
    const state = getState(app);
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
    setState(app, Object.assign(Object.assign({}, state), { isTokenAutoRefreshEnabled }));
}
/**
 * Differs from internal getToken in that it throws the error.
 */
async function getToken(app, platformLoggerProvider, forceRefresh) {
    const result = await getToken$1(app, platformLoggerProvider, forceRefresh);
    if (result.error) {
        throw result.error;
    }
    return { token: result.token };
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
    let nextFn = () => { };
    let errorFn = () => { };
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
    return () => removeTokenListener(app, nextFn);
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
        app,
        activate: (siteKeyOrProvider, isTokenAutoRefreshEnabled) => activate(app, siteKeyOrProvider, isTokenAutoRefreshEnabled),
        setTokenAutoRefreshEnabled: (isTokenAutoRefreshEnabled) => setTokenAutoRefreshEnabled(app, isTokenAutoRefreshEnabled),
        getToken: forceRefresh => getToken(app, platformLoggerProvider, forceRefresh),
        onTokenChanged: (onNextOrObserver, onError, onCompletion) => onTokenChanged(app, platformLoggerProvider, 
        /**
         * This can still be an observer. Need to do this casting because
         * according to Typescript: "Implementation signatures of overloads
         * are not externally visible"
         */
        onNextOrObserver, onError),
        INTERNAL: {
            delete: () => {
                const { tokenObservers } = getState(app);
                for (const tokenObserver of tokenObservers) {
                    removeTokenListener(app, tokenObserver.next);
                }
                return Promise.resolve();
            }
        }
    };
}
function internalFactory(app, platformLoggerProvider) {
    return {
        getToken: forceRefresh => getToken$1(app, platformLoggerProvider, forceRefresh),
        addTokenListener: listener => addTokenListener(app, platformLoggerProvider, "INTERNAL" /* INTERNAL */, listener),
        removeTokenListener: listener => removeTokenListener(app, listener)
    };
}

const name = "@firebase/app-check";
const version = "0.2.0";

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
const APP_CHECK_NAME = 'appCheck';
const APP_CHECK_NAME_INTERNAL = 'app-check-internal';
function registerAppCheck(firebase) {
    // The public interface
    firebase.INTERNAL.registerComponent(new Component(APP_CHECK_NAME, container => {
        // getImmediate for FirebaseApp will always succeed
        const app = container.getProvider('app').getImmediate();
        const platformLoggerProvider = container.getProvider('platform-logger');
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
        .setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
        const appCheckInternalProvider = container.getProvider(APP_CHECK_NAME_INTERNAL);
        appCheckInternalProvider.initialize();
    }));
    // The internal interface used by other Firebase products
    firebase.INTERNAL.registerComponent(new Component(APP_CHECK_NAME_INTERNAL, container => {
        // getImmediate for FirebaseApp will always succeed
        const app = container.getProvider('app').getImmediate();
        const platformLoggerProvider = container.getProvider('platform-logger');
        return internalFactory(app, platformLoggerProvider);
    }, "PUBLIC" /* PUBLIC */).setInstantiationMode("EXPLICIT" /* EXPLICIT */));
    firebase.registerVersion(name, version);
}
registerAppCheck(firebase);
initializeDebugMode();
//# sourceMappingURL=index.esm2017.js.map
