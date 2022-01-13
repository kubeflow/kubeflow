import firebase from '@firebase/app';
import { Component } from '@firebase/component';

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
/**
 * Standard error codes for different ways a request can fail, as defined by:
 * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
 *
 * This map is used primarily to convert from a backend error code string to
 * a client SDK error code string, and make sure it's in the supported set.
 */
const errorCodeMap = {
    OK: 'ok',
    CANCELLED: 'cancelled',
    UNKNOWN: 'unknown',
    INVALID_ARGUMENT: 'invalid-argument',
    DEADLINE_EXCEEDED: 'deadline-exceeded',
    NOT_FOUND: 'not-found',
    ALREADY_EXISTS: 'already-exists',
    PERMISSION_DENIED: 'permission-denied',
    UNAUTHENTICATED: 'unauthenticated',
    RESOURCE_EXHAUSTED: 'resource-exhausted',
    FAILED_PRECONDITION: 'failed-precondition',
    ABORTED: 'aborted',
    OUT_OF_RANGE: 'out-of-range',
    UNIMPLEMENTED: 'unimplemented',
    INTERNAL: 'internal',
    UNAVAILABLE: 'unavailable',
    DATA_LOSS: 'data-loss'
};
/**
 * An explicit error that can be thrown from a handler to send an error to the
 * client that called the function.
 */
class HttpsErrorImpl extends Error {
    constructor(code, message, details) {
        super(message);
        // This is a workaround for a bug in TypeScript when extending Error:
        // tslint:disable-next-line
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, HttpsErrorImpl.prototype);
        this.code = code;
        this.details = details;
    }
}
/**
 * Takes an HTTP status code and returns the corresponding ErrorCode.
 * This is the standard HTTP status code -> error mapping defined in:
 * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
 *
 * @param status An HTTP status code.
 * @return The corresponding ErrorCode, or ErrorCode.UNKNOWN if none.
 */
function codeForHTTPStatus(status) {
    // Make sure any successful status is OK.
    if (status >= 200 && status < 300) {
        return 'ok';
    }
    switch (status) {
        case 0:
            // This can happen if the server returns 500.
            return 'internal';
        case 400:
            return 'invalid-argument';
        case 401:
            return 'unauthenticated';
        case 403:
            return 'permission-denied';
        case 404:
            return 'not-found';
        case 409:
            return 'aborted';
        case 429:
            return 'resource-exhausted';
        case 499:
            return 'cancelled';
        case 500:
            return 'internal';
        case 501:
            return 'unimplemented';
        case 503:
            return 'unavailable';
        case 504:
            return 'deadline-exceeded';
    }
    return 'unknown';
}
/**
 * Takes an HTTP response and returns the corresponding Error, if any.
 */
function _errorForResponse(status, bodyJSON, serializer) {
    let code = codeForHTTPStatus(status);
    // Start with reasonable defaults from the status code.
    let description = code;
    let details = undefined;
    // Then look through the body for explicit details.
    try {
        const errorJSON = bodyJSON && bodyJSON.error;
        if (errorJSON) {
            const status = errorJSON.status;
            if (typeof status === 'string') {
                if (!errorCodeMap[status]) {
                    // They must've included an unknown error code in the body.
                    return new HttpsErrorImpl('internal', 'internal');
                }
                code = errorCodeMap[status];
                // TODO(klimt): Add better default descriptions for error enums.
                // The default description needs to be updated for the new code.
                description = status;
            }
            const message = errorJSON.message;
            if (typeof message === 'string') {
                description = message;
            }
            details = errorJSON.details;
            if (details !== undefined) {
                details = serializer.decode(details);
            }
        }
    }
    catch (e) {
        // If we couldn't parse explicit error data, that's fine.
    }
    if (code === 'ok') {
        // Technically, there's an edge case where a developer could explicitly
        // return an error code of OK, and we will treat it as success, but that
        // seems reasonable.
        return null;
    }
    return new HttpsErrorImpl(code, description, details);
}

/**
 * Helper class to get metadata that should be included with a function call.
 */
class ContextProvider {
    constructor(authProvider, messagingProvider) {
        this.auth = null;
        this.messaging = null;
        this.auth = authProvider.getImmediate({ optional: true });
        this.messaging = messagingProvider.getImmediate({
            optional: true
        });
        if (!this.auth) {
            authProvider.get().then(auth => (this.auth = auth), () => {
                /* get() never rejects */
            });
        }
        if (!this.messaging) {
            messagingProvider.get().then(messaging => (this.messaging = messaging), () => {
                /* get() never rejects */
            });
        }
    }
    async getAuthToken() {
        if (!this.auth) {
            return undefined;
        }
        try {
            const token = await this.auth.getToken();
            if (!token) {
                return undefined;
            }
            return token.accessToken;
        }
        catch (e) {
            // If there's any error when trying to get the auth token, leave it off.
            return undefined;
        }
    }
    async getInstanceIdToken() {
        if (!this.messaging ||
            !('Notification' in self) ||
            Notification.permission !== 'granted') {
            return undefined;
        }
        try {
            return await this.messaging.getToken();
        }
        catch (e) {
            // We don't warn on this, because it usually means messaging isn't set up.
            // console.warn('Failed to retrieve instance id token.', e);
            // If there's any error when trying to get the token, leave it off.
            return undefined;
        }
    }
    async getContext() {
        const authToken = await this.getAuthToken();
        const instanceIdToken = await this.getInstanceIdToken();
        return { authToken, instanceIdToken };
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
const LONG_TYPE = 'type.googleapis.com/google.protobuf.Int64Value';
const UNSIGNED_LONG_TYPE = 'type.googleapis.com/google.protobuf.UInt64Value';
function mapValues(
// { [k: string]: unknown } is no longer a wildcard assignment target after typescript 3.5
// eslint-disable-next-line @typescript-eslint/no-explicit-any
o, f) {
    const result = {};
    for (const key in o) {
        if (o.hasOwnProperty(key)) {
            result[key] = f(o[key]);
        }
    }
    return result;
}
class Serializer {
    // Takes data and encodes it in a JSON-friendly way, such that types such as
    // Date are preserved.
    encode(data) {
        if (data == null) {
            return null;
        }
        if (data instanceof Number) {
            data = data.valueOf();
        }
        if (typeof data === 'number' && isFinite(data)) {
            // Any number in JS is safe to put directly in JSON and parse as a double
            // without any loss of precision.
            return data;
        }
        if (data === true || data === false) {
            return data;
        }
        if (Object.prototype.toString.call(data) === '[object String]') {
            return data;
        }
        if (data instanceof Date) {
            return data.toISOString();
        }
        if (Array.isArray(data)) {
            return data.map(x => this.encode(x));
        }
        if (typeof data === 'function' || typeof data === 'object') {
            return mapValues(data, x => this.encode(x));
        }
        // If we got this far, the data is not encodable.
        throw new Error('Data cannot be encoded in JSON: ' + data);
    }
    // Takes data that's been encoded in a JSON-friendly form and returns a form
    // with richer datatypes, such as Dates, etc.
    decode(json) {
        if (json == null) {
            return json;
        }
        if (json['@type']) {
            switch (json['@type']) {
                case LONG_TYPE:
                // Fall through and handle this the same as unsigned.
                case UNSIGNED_LONG_TYPE: {
                    // Technically, this could work return a valid number for malformed
                    // data if there was a number followed by garbage. But it's just not
                    // worth all the extra code to detect that case.
                    const value = Number(json['value']);
                    if (isNaN(value)) {
                        throw new Error('Data cannot be decoded from JSON: ' + json);
                    }
                    return value;
                }
                default: {
                    throw new Error('Data cannot be decoded from JSON: ' + json);
                }
            }
        }
        if (Array.isArray(json)) {
            return json.map(x => this.decode(x));
        }
        if (typeof json === 'function' || typeof json === 'object') {
            return mapValues(json, x => this.decode(x));
        }
        // Anything else is safe to return.
        return json;
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
/**
 * Returns a Promise that will be rejected after the given duration.
 * The error will be of type HttpsErrorImpl.
 *
 * @param millis Number of milliseconds to wait before rejecting.
 */
function failAfter(millis) {
    let timer;
    const promise = new Promise((_, reject) => {
        timer = setTimeout(() => {
            reject(new HttpsErrorImpl('deadline-exceeded', 'deadline-exceeded'));
        }, millis);
    });
    return {
        timer,
        promise
    };
}
/**
 * The main class for the Firebase Functions SDK.
 */
class Service {
    /**
     * Creates a new Functions service for the given app and (optional) region or custom domain.
     * @param app_ The FirebaseApp to use.
     * @param regionOrCustomDomain_ one of:
     *   a) A region to call functions from, such as us-central1
     *   b) A custom domain to use as a functions prefix, such as https://mydomain.com
     */
    constructor(app_, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain_ = 'us-central1', fetchImpl) {
        this.app_ = app_;
        this.appCheckProvider = appCheckProvider;
        this.fetchImpl = fetchImpl;
        this.serializer = new Serializer();
        this.emulatorOrigin = null;
        this.INTERNAL = {
            delete: () => {
                return Promise.resolve(this.deleteService());
            }
        };
        this.contextProvider = new ContextProvider(authProvider, messagingProvider);
        // Cancels all ongoing requests when resolved.
        this.cancelAllRequests = new Promise(resolve => {
            this.deleteService = () => {
                return resolve();
            };
        });
        // Resolve the region or custom domain overload by attempting to parse it.
        try {
            const url = new URL(regionOrCustomDomain_);
            this.customDomain = url.origin;
            this.region = 'us-central1';
        }
        catch (e) {
            this.customDomain = null;
            this.region = regionOrCustomDomain_;
        }
    }
    get app() {
        return this.app_;
    }
    /**
     * Returns the URL for a callable with the given name.
     * @param name The name of the callable.
     */
    _url(name) {
        const projectId = this.app_.options.projectId;
        if (this.emulatorOrigin !== null) {
            const origin = this.emulatorOrigin;
            return `${origin}/${projectId}/${this.region}/${name}`;
        }
        if (this.customDomain !== null) {
            return `${this.customDomain}/${name}`;
        }
        return `https://${this.region}-${projectId}.cloudfunctions.net/${name}`;
    }
    /**
     * Modify this instance to communicate with the Cloud Functions emulator.
     *
     * Note: this must be called before this instance has been used to do any operations.
     *
     * @param host The emulator host (ex: localhost)
     * @param port The emulator port (ex: 5001)
     */
    useEmulator(host, port) {
        this.emulatorOrigin = `http://${host}:${port}`;
    }
    /**
     * Changes this instance to point to a Cloud Functions emulator running
     * locally. See https://firebase.google.com/docs/functions/local-emulator
     *
     * @deprecated Prefer the useEmulator(host, port) method.
     * @param origin The origin of the local emulator, such as
     * "http://localhost:5005".
     */
    useFunctionsEmulator(origin) {
        this.emulatorOrigin = origin;
    }
    /**
     * Returns a reference to the callable https trigger with the given name.
     * @param name The name of the trigger.
     */
    httpsCallable(name, options) {
        return data => {
            return this.call(name, data, options || {});
        };
    }
    /**
     * Does an HTTP POST and returns the completed response.
     * @param url The url to post to.
     * @param body The JSON body of the post.
     * @param headers The HTTP headers to include in the request.
     * @return A Promise that will succeed when the request finishes.
     */
    async postJSON(url, body, headers) {
        headers['Content-Type'] = 'application/json';
        const appCheckToken = await this.getAppCheckToken();
        if (appCheckToken !== null) {
            headers['X-Firebase-AppCheck'] = appCheckToken;
        }
        let response;
        try {
            response = await this.fetchImpl(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            });
        }
        catch (e) {
            // This could be an unhandled error on the backend, or it could be a
            // network error. There's no way to know, since an unhandled error on the
            // backend will fail to set the proper CORS header, and thus will be
            // treated as a network error by fetch.
            return {
                status: 0,
                json: null
            };
        }
        let json = null;
        try {
            json = await response.json();
        }
        catch (e) {
            // If we fail to parse JSON, it will fail the same as an empty body.
        }
        return {
            status: response.status,
            json
        };
    }
    async getAppCheckToken() {
        const appCheck = this.appCheckProvider.getImmediate({ optional: true });
        if (appCheck) {
            const result = await appCheck.getToken();
            // If getToken() fails, it will still return a dummy token that also has
            // an error field containing the error message. We will send any token
            // provided here and show an error if/when it is rejected by the functions
            // endpoint.
            return result.token;
        }
        return null;
    }
    /**
     * Calls a callable function asynchronously and returns the result.
     * @param name The name of the callable trigger.
     * @param data The data to pass as params to the function.s
     */
    async call(name, data, options) {
        const url = this._url(name);
        // Encode any special types, such as dates, in the input data.
        data = this.serializer.encode(data);
        const body = { data };
        // Add a header for the authToken.
        const headers = {};
        const context = await this.contextProvider.getContext();
        if (context.authToken) {
            headers['Authorization'] = 'Bearer ' + context.authToken;
        }
        if (context.instanceIdToken) {
            headers['Firebase-Instance-ID-Token'] = context.instanceIdToken;
        }
        // Default timeout to 70s, but let the options override it.
        const timeout = options.timeout || 70000;
        const { timer, promise: failAfterPromise } = failAfter(timeout);
        const response = await Promise.race([
            clearTimeoutWrapper(timer, this.postJSON(url, body, headers)),
            failAfterPromise,
            clearTimeoutWrapper(timer, this.cancelAllRequests)
        ]);
        // If service was deleted, interrupted response throws an error.
        if (!response) {
            throw new HttpsErrorImpl('cancelled', 'Firebase Functions instance was deleted.');
        }
        // Check for an error status, regardless of http status.
        const error = _errorForResponse(response.status, response.json, this.serializer);
        if (error) {
            throw error;
        }
        if (!response.json) {
            throw new HttpsErrorImpl('internal', 'Response is not valid JSON object.');
        }
        let responseData = response.json.data;
        // TODO(klimt): For right now, allow "result" instead of "data", for
        // backwards compatibility.
        if (typeof responseData === 'undefined') {
            responseData = response.json.result;
        }
        if (typeof responseData === 'undefined') {
            // Consider the response malformed.
            throw new HttpsErrorImpl('internal', 'Response is missing data field.');
        }
        // Decode any special types, such as dates, in the returned data.
        const decodedData = this.serializer.decode(responseData);
        return { data: decodedData };
    }
}
async function clearTimeoutWrapper(timer, promise) {
    const result = await promise;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearTimeout(timer);
    return result;
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
 * Type constant for Firebase Functions.
 */
const FUNCTIONS_TYPE = 'functions';
function registerFunctions(instance, fetchImpl) {
    const namespaceExports = {
        // no-inline
        Functions: Service
    };
    function factory(container, { instanceIdentifier: regionOrCustomDomain }) {
        // Dependencies
        const app = container.getProvider('app').getImmediate();
        const authProvider = container.getProvider('auth-internal');
        const appCheckProvider = container.getProvider('app-check-internal');
        const messagingProvider = container.getProvider('messaging');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Service(app, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain, fetchImpl);
    }
    instance.INTERNAL.registerComponent(new Component(FUNCTIONS_TYPE, factory, "PUBLIC" /* PUBLIC */)
        .setServiceProps(namespaceExports)
        .setMultipleInstances(true));
}

const name = "@firebase/functions";
const version = "0.6.13";

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
registerFunctions(firebase, fetch.bind(self));
firebase.registerVersion(name, version);
//# sourceMappingURL=index.esm2017.js.map
