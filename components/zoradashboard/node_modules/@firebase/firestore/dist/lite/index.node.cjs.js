'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var app = require('@firebase/app');
var component = require('@firebase/component');
var util = require('@firebase/util');
var logger = require('@firebase/logger');
var util$1 = require('util');
var nodeFetch = require('node-fetch');
var crypto = require('crypto');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var nodeFetch__namespace = /*#__PURE__*/_interopNamespace(nodeFetch);

var version$1 = "2.3.9";
var version = "8.8.0";
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
var SDK_VERSION = version;
function setSDKVersion(version) {
    SDK_VERSION = version;
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
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
var User = /** @class */ (function () {
    function User(uid) {
        this.uid = uid;
    }
    User.prototype.isAuthenticated = function () {
        return this.uid != null;
    };
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    User.prototype.toKey = function () {
        if (this.isAuthenticated()) {
            return 'uid:' + this.uid;
        }
        else {
            return 'anonymous-user';
        }
    };
    User.prototype.isEqual = function (otherUser) {
        return otherUser.uid === this.uid;
    };
    return User;
}());
/** A user with a null UID. */
User.UNAUTHENTICATED = new User(null);
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
User.GOOGLE_CREDENTIALS = new User('google-credentials-uid');
User.FIRST_PARTY = new User('first-party-uid');
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
/** Formats an object as a JSON string, suitable for logging. */
function formatJSON(value) {
    // util.inspect() results in much more readable output than JSON.stringify()
    return util$1.inspect(value, { depth: 100 });
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
var logClient = new logger.Logger('@firebase/firestore');
/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */
function setLogLevel(logLevel) {
    logClient.setLogLevel(logLevel);
}
function logDebug(msg) {
    var obj = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        obj[_i - 1] = arguments[_i];
    }
    if (logClient.logLevel <= logger.LogLevel.DEBUG) {
        var args = obj.map(argToString);
        logClient.debug.apply(logClient, tslib.__spreadArray(["Firestore (" + SDK_VERSION + "): " + msg], args));
    }
}
function logError(msg) {
    var obj = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        obj[_i - 1] = arguments[_i];
    }
    if (logClient.logLevel <= logger.LogLevel.ERROR) {
        var args = obj.map(argToString);
        logClient.error.apply(logClient, tslib.__spreadArray(["Firestore (" + SDK_VERSION + "): " + msg], args));
    }
}
function logWarn(msg) {
    var obj = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        obj[_i - 1] = arguments[_i];
    }
    if (logClient.logLevel <= logger.LogLevel.WARN) {
        var args = obj.map(argToString);
        logClient.warn.apply(logClient, tslib.__spreadArray(["Firestore (" + SDK_VERSION + "): " + msg], args));
    }
}
/**
 * Converts an additional log parameter to a string representation.
 */
function argToString(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    else {
        try {
            return formatJSON(obj);
        }
        catch (e) {
            // Converting to JSON failed, just log the object directly
            return obj;
        }
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
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */
function fail(failure) {
    if (failure === void 0) { failure = 'Unexpected state'; }
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
    var message = "FIRESTORE (" + SDK_VERSION + ") INTERNAL ASSERTION FAILED: " + failure;
    logError(message);
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
    throw new Error(message);
}
/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */
function hardAssert(assertion, message) {
    if (!assertion) {
        fail();
    }
}
/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */
function debugCast(obj, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
constructor) {
    return obj;
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
var Code = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: 'ok',
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: 'cancelled',
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: 'unknown',
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: 'invalid-argument',
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: 'deadline-exceeded',
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: 'not-found',
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: 'already-exists',
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: 'permission-denied',
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: 'unauthenticated',
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: 'resource-exhausted',
    /**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */
    FAILED_PRECONDITION: 'failed-precondition',
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: 'aborted',
    /**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE: 'out-of-range',
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: 'unimplemented',
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: 'internal',
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: 'unavailable',
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: 'data-loss'
};
/** An error returned by a Firestore operation. */
var FirestoreError = /** @class */ (function (_super) {
    tslib.__extends(FirestoreError, _super);
    /** @hideconstructor */
    function FirestoreError(
    /**
     * The backend error code associated with this error.
     */
    code, 
    /**
     * A custom error description.
     */
    message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.message = message;
        /** The custom name for all FirestoreErrors. */
        _this.name = 'FirebaseError';
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        _this.toString = function () { return _this.name + ": [code=" + _this.code + "]: " + _this.message; };
        return _this;
    }
    return FirestoreError;
}(Error));
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
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
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
var OAuthToken = /** @class */ (function () {
    function OAuthToken(value, user) {
        this.user = user;
        this.type = 'OAuth';
        this.authHeaders = {};
        // Set the headers using Object Literal notation to avoid minification
        this.authHeaders['Authorization'] = "Bearer " + value;
    }
    return OAuthToken;
}());
/** A CredentialsProvider that always yields an empty token. */
var EmptyCredentialsProvider = /** @class */ (function () {
    function EmptyCredentialsProvider() {
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.changeListener = null;
    }
    EmptyCredentialsProvider.prototype.getToken = function () {
        return Promise.resolve(null);
    };
    EmptyCredentialsProvider.prototype.invalidateToken = function () { };
    EmptyCredentialsProvider.prototype.setChangeListener = function (asyncQueue, changeListener) {
        this.changeListener = changeListener;
        // Fire with initial user.
        asyncQueue.enqueueRetryable(function () { return changeListener(User.UNAUTHENTICATED); });
    };
    EmptyCredentialsProvider.prototype.removeChangeListener = function () {
        this.changeListener = null;
    };
    return EmptyCredentialsProvider;
}());
/**
 * A CredentialsProvider that always returns a constant token. Used for
 * emulator token mocking.
 */
var EmulatorCredentialsProvider = /** @class */ (function () {
    function EmulatorCredentialsProvider(token) {
        this.token = token;
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.changeListener = null;
    }
    EmulatorCredentialsProvider.prototype.getToken = function () {
        return Promise.resolve(this.token);
    };
    EmulatorCredentialsProvider.prototype.invalidateToken = function () { };
    EmulatorCredentialsProvider.prototype.setChangeListener = function (asyncQueue, changeListener) {
        var _this = this;
        this.changeListener = changeListener;
        // Fire with initial user.
        asyncQueue.enqueueRetryable(function () { return changeListener(_this.token.user); });
    };
    EmulatorCredentialsProvider.prototype.removeChangeListener = function () {
        this.changeListener = null;
    };
    return EmulatorCredentialsProvider;
}());
var FirebaseCredentialsProvider = /** @class */ (function () {
    function FirebaseCredentialsProvider(authProvider) {
        var _this = this;
        /** Tracks the current User. */
        this.currentUser = User.UNAUTHENTICATED;
        /** Promise that allows blocking on the initialization of Firebase Auth. */
        this.authDeferred = new Deferred();
        /**
         * Counter used to detect if the token changed while a getToken request was
         * outstanding.
         */
        this.tokenCounter = 0;
        this.forceRefresh = false;
        this.auth = null;
        this.asyncQueue = null;
        this.tokenListener = function () {
            _this.tokenCounter++;
            _this.currentUser = _this.getUser();
            _this.authDeferred.resolve();
            if (_this.changeListener) {
                _this.asyncQueue.enqueueRetryable(function () { return _this.changeListener(_this.currentUser); });
            }
        };
        var registerAuth = function (auth) {
            logDebug('FirebaseCredentialsProvider', 'Auth detected');
            _this.auth = auth;
            _this.auth.addAuthTokenListener(_this.tokenListener);
        };
        authProvider.onInit(function (auth) { return registerAuth(auth); });
        // Our users can initialize Auth right after Firestore, so we give it
        // a chance to register itself with the component framework before we
        // determine whether to start up in unauthenticated mode.
        setTimeout(function () {
            if (!_this.auth) {
                var auth = authProvider.getImmediate({ optional: true });
                if (auth) {
                    registerAuth(auth);
                }
                else {
                    // If auth is still not available, proceed with `null` user
                    logDebug('FirebaseCredentialsProvider', 'Auth not yet detected');
                    _this.authDeferred.resolve();
                }
            }
        }, 0);
    }
    FirebaseCredentialsProvider.prototype.getToken = function () {
        var _this = this;
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
        var initialTokenCounter = this.tokenCounter;
        var forceRefresh = this.forceRefresh;
        this.forceRefresh = false;
        if (!this.auth) {
            return Promise.resolve(null);
        }
        return this.auth.getToken(forceRefresh).then(function (tokenData) {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            if (_this.tokenCounter !== initialTokenCounter) {
                logDebug('FirebaseCredentialsProvider', 'getToken aborted due to token change.');
                return _this.getToken();
            }
            else {
                if (tokenData) {
                    hardAssert(typeof tokenData.accessToken === 'string');
                    return new OAuthToken(tokenData.accessToken, _this.currentUser);
                }
                else {
                    return null;
                }
            }
        });
    };
    FirebaseCredentialsProvider.prototype.invalidateToken = function () {
        this.forceRefresh = true;
    };
    FirebaseCredentialsProvider.prototype.setChangeListener = function (asyncQueue, changeListener) {
        var _this = this;
        this.asyncQueue = asyncQueue;
        // Blocks the AsyncQueue until the next user is available.
        this.asyncQueue.enqueueRetryable(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.authDeferred.promise];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, changeListener(this.currentUser)];
                    case 2:
                        _c.sent();
                        this.changeListener = changeListener;
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FirebaseCredentialsProvider.prototype.removeChangeListener = function () {
        if (this.auth) {
            this.auth.removeAuthTokenListener(this.tokenListener);
        }
        this.changeListener = function () { return Promise.resolve(); };
    };
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    FirebaseCredentialsProvider.prototype.getUser = function () {
        var currentUid = this.auth && this.auth.getUid();
        hardAssert(currentUid === null || typeof currentUid === 'string');
        return new User(currentUid);
    };
    return FirebaseCredentialsProvider;
}());
/*
 * FirstPartyToken provides a fresh token each time its value
 * is requested, because if the token is too old, requests will be rejected.
 * Technically this may no longer be necessary since the SDK should gracefully
 * recover from unauthenticated errors (see b/33147818 for context), but it's
 * safer to keep the implementation as-is.
 */
var FirstPartyToken = /** @class */ (function () {
    function FirstPartyToken(gapi, sessionIndex, iamToken) {
        this.gapi = gapi;
        this.sessionIndex = sessionIndex;
        this.iamToken = iamToken;
        this.type = 'FirstParty';
        this.user = User.FIRST_PARTY;
    }
    Object.defineProperty(FirstPartyToken.prototype, "authHeaders", {
        get: function () {
            var headers = {
                'X-Goog-AuthUser': this.sessionIndex
            };
            // Use array notation to prevent minification
            var authHeader = this.gapi['auth']['getAuthHeaderValueForFirstParty']([]);
            if (authHeader) {
                headers['Authorization'] = authHeader;
            }
            if (this.iamToken) {
                headers['X-Goog-Iam-Authorization-Token'] = this.iamToken;
            }
            return headers;
        },
        enumerable: false,
        configurable: true
    });
    return FirstPartyToken;
}());
/*
 * Provides user credentials required for the Firestore JavaScript SDK
 * to authenticate the user, using technique that is only available
 * to applications hosted by Google.
 */
var FirstPartyCredentialsProvider = /** @class */ (function () {
    function FirstPartyCredentialsProvider(gapi, sessionIndex, iamToken) {
        this.gapi = gapi;
        this.sessionIndex = sessionIndex;
        this.iamToken = iamToken;
    }
    FirstPartyCredentialsProvider.prototype.getToken = function () {
        return Promise.resolve(new FirstPartyToken(this.gapi, this.sessionIndex, this.iamToken));
    };
    FirstPartyCredentialsProvider.prototype.setChangeListener = function (asyncQueue, changeListener) {
        // Fire with initial uid.
        asyncQueue.enqueueRetryable(function () { return changeListener(User.FIRST_PARTY); });
    };
    FirstPartyCredentialsProvider.prototype.removeChangeListener = function () { };
    FirstPartyCredentialsProvider.prototype.invalidateToken = function () { };
    return FirstPartyCredentialsProvider;
}());
/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */
function makeCredentialsProvider(credentials) {
    if (!credentials) {
        return new EmptyCredentialsProvider();
    }
    switch (credentials['type']) {
        case 'gapi':
            var client = credentials['client'];
            // Make sure this really is a Gapi client.
            hardAssert(!!(typeof client === 'object' &&
                client !== null &&
                client['auth'] &&
                client['auth']['getAuthHeaderValueForFirstParty']));
            return new FirstPartyCredentialsProvider(client, credentials['sessionIndex'] || '0', credentials['iamToken'] || null);
        case 'provider':
            return credentials['client'];
        default:
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'makeCredentialsProvider failed due to invalid credential type');
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
var DatabaseInfo = /** @class */ (function () {
    /**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId - The database to use.
     * @param appId - The Firebase App Id.
     * @param persistenceKey - A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host - The Firestore backend host to connect to.
     * @param ssl - Whether to use SSL when connecting.
     * @param forceLongPolling - Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
     * option when using WebChannel as the network transport.
     * @param useFetchStreams Whether to use the Fetch API instead of
     * XMLHTTPRequest
     */
    function DatabaseInfo(databaseId, appId, persistenceKey, host, ssl, forceLongPolling, autoDetectLongPolling, useFetchStreams) {
        this.databaseId = databaseId;
        this.appId = appId;
        this.persistenceKey = persistenceKey;
        this.host = host;
        this.ssl = ssl;
        this.forceLongPolling = forceLongPolling;
        this.autoDetectLongPolling = autoDetectLongPolling;
        this.useFetchStreams = useFetchStreams;
    }
    return DatabaseInfo;
}());
/** The default database name for a project. */
var DEFAULT_DATABASE_NAME = '(default)';
/** Represents the database ID a Firestore client is associated with. */
var DatabaseId = /** @class */ (function () {
    function DatabaseId(projectId, database) {
        this.projectId = projectId;
        this.database = database ? database : DEFAULT_DATABASE_NAME;
    }
    Object.defineProperty(DatabaseId.prototype, "isDefaultDatabase", {
        get: function () {
            return this.database === DEFAULT_DATABASE_NAME;
        },
        enumerable: false,
        configurable: true
    });
    DatabaseId.prototype.isEqual = function (other) {
        return (other instanceof DatabaseId &&
            other.projectId === this.projectId &&
            other.database === this.database);
    };
    return DatabaseId;
}());
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
var DOCUMENT_KEY_NAME = '__name__';
/**
 * Path represents an ordered sequence of string segments.
 */
var BasePath = /** @class */ (function () {
    function BasePath(segments, offset, length) {
        if (offset === undefined) {
            offset = 0;
        }
        else if (offset > segments.length) {
            fail();
        }
        if (length === undefined) {
            length = segments.length - offset;
        }
        else if (length > segments.length - offset) {
            fail();
        }
        this.segments = segments;
        this.offset = offset;
        this.len = length;
    }
    Object.defineProperty(BasePath.prototype, "length", {
        get: function () {
            return this.len;
        },
        enumerable: false,
        configurable: true
    });
    BasePath.prototype.isEqual = function (other) {
        return BasePath.comparator(this, other) === 0;
    };
    BasePath.prototype.child = function (nameOrPath) {
        var segments = this.segments.slice(this.offset, this.limit());
        if (nameOrPath instanceof BasePath) {
            nameOrPath.forEach(function (segment) {
                segments.push(segment);
            });
        }
        else {
            segments.push(nameOrPath);
        }
        return this.construct(segments);
    };
    /** The index of one past the last segment of the path. */
    BasePath.prototype.limit = function () {
        return this.offset + this.length;
    };
    BasePath.prototype.popFirst = function (size) {
        size = size === undefined ? 1 : size;
        return this.construct(this.segments, this.offset + size, this.length - size);
    };
    BasePath.prototype.popLast = function () {
        return this.construct(this.segments, this.offset, this.length - 1);
    };
    BasePath.prototype.firstSegment = function () {
        return this.segments[this.offset];
    };
    BasePath.prototype.lastSegment = function () {
        return this.get(this.length - 1);
    };
    BasePath.prototype.get = function (index) {
        return this.segments[this.offset + index];
    };
    BasePath.prototype.isEmpty = function () {
        return this.length === 0;
    };
    BasePath.prototype.isPrefixOf = function (other) {
        if (other.length < this.length) {
            return false;
        }
        for (var i = 0; i < this.length; i++) {
            if (this.get(i) !== other.get(i)) {
                return false;
            }
        }
        return true;
    };
    BasePath.prototype.isImmediateParentOf = function (potentialChild) {
        if (this.length + 1 !== potentialChild.length) {
            return false;
        }
        for (var i = 0; i < this.length; i++) {
            if (this.get(i) !== potentialChild.get(i)) {
                return false;
            }
        }
        return true;
    };
    BasePath.prototype.forEach = function (fn) {
        for (var i = this.offset, end = this.limit(); i < end; i++) {
            fn(this.segments[i]);
        }
    };
    BasePath.prototype.toArray = function () {
        return this.segments.slice(this.offset, this.limit());
    };
    BasePath.comparator = function (p1, p2) {
        var len = Math.min(p1.length, p2.length);
        for (var i = 0; i < len; i++) {
            var left = p1.get(i);
            var right = p2.get(i);
            if (left < right) {
                return -1;
            }
            if (left > right) {
                return 1;
            }
        }
        if (p1.length < p2.length) {
            return -1;
        }
        if (p1.length > p2.length) {
            return 1;
        }
        return 0;
    };
    return BasePath;
}());
/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 */
var ResourcePath = /** @class */ (function (_super) {
    tslib.__extends(ResourcePath, _super);
    function ResourcePath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourcePath.prototype.construct = function (segments, offset, length) {
        return new ResourcePath(segments, offset, length);
    };
    ResourcePath.prototype.canonicalString = function () {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.toArray().join('/');
    };
    ResourcePath.prototype.toString = function () {
        return this.canonicalString();
    };
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    ResourcePath.fromString = function () {
        var pathComponents = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pathComponents[_i] = arguments[_i];
        }
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        var segments = [];
        for (var _c = 0, pathComponents_1 = pathComponents; _c < pathComponents_1.length; _c++) {
            var path = pathComponents_1[_c];
            if (path.indexOf('//') >= 0) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid segment (" + path + "). Paths must not contain // in them.");
            }
            // Strip leading and traling slashed.
            segments.push.apply(segments, path.split('/').filter(function (segment) { return segment.length > 0; }));
        }
        return new ResourcePath(segments);
    };
    ResourcePath.emptyPath = function () {
        return new ResourcePath([]);
    };
    return ResourcePath;
}(BasePath));
var identifierRegExp = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
/** A dot-separated path for navigating sub-objects within a document. */
var FieldPath$1 = /** @class */ (function (_super) {
    tslib.__extends(FieldPath$1, _super);
    function FieldPath$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldPath$1.prototype.construct = function (segments, offset, length) {
        return new FieldPath$1(segments, offset, length);
    };
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    FieldPath$1.isValidIdentifier = function (segment) {
        return identifierRegExp.test(segment);
    };
    FieldPath$1.prototype.canonicalString = function () {
        return this.toArray()
            .map(function (str) {
            str = str.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
            if (!FieldPath$1.isValidIdentifier(str)) {
                str = '`' + str + '`';
            }
            return str;
        })
            .join('.');
    };
    FieldPath$1.prototype.toString = function () {
        return this.canonicalString();
    };
    /**
     * Returns true if this field references the key of a document.
     */
    FieldPath$1.prototype.isKeyField = function () {
        return this.length === 1 && this.get(0) === DOCUMENT_KEY_NAME;
    };
    /**
     * The field designating the key of a document.
     */
    FieldPath$1.keyField = function () {
        return new FieldPath$1([DOCUMENT_KEY_NAME]);
    };
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */
    FieldPath$1.fromServerFormat = function (path) {
        var segments = [];
        var current = '';
        var i = 0;
        var addCurrentSegment = function () {
            if (current.length === 0) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid field path (" + path + "). Paths must not be empty, begin " +
                    "with '.', end with '.', or contain '..'");
            }
            segments.push(current);
            current = '';
        };
        var inBackticks = false;
        while (i < path.length) {
            var c = path[i];
            if (c === '\\') {
                if (i + 1 === path.length) {
                    throw new FirestoreError(Code.INVALID_ARGUMENT, 'Path has trailing escape character: ' + path);
                }
                var next = path[i + 1];
                if (!(next === '\\' || next === '.' || next === '`')) {
                    throw new FirestoreError(Code.INVALID_ARGUMENT, 'Path has invalid escape sequence: ' + path);
                }
                current += next;
                i += 2;
            }
            else if (c === '`') {
                inBackticks = !inBackticks;
                i++;
            }
            else if (c === '.' && !inBackticks) {
                addCurrentSegment();
                i++;
            }
            else {
                current += c;
                i++;
            }
        }
        addCurrentSegment();
        if (inBackticks) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Unterminated ` in path: ' + path);
        }
        return new FieldPath$1(segments);
    };
    FieldPath$1.emptyPath = function () {
        return new FieldPath$1([]);
    };
    return FieldPath$1;
}(BasePath));
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
var DocumentKey = /** @class */ (function () {
    function DocumentKey(path) {
        this.path = path;
    }
    DocumentKey.fromPath = function (path) {
        return new DocumentKey(ResourcePath.fromString(path));
    };
    DocumentKey.fromName = function (name) {
        return new DocumentKey(ResourcePath.fromString(name).popFirst(5));
    };
    /** Returns true if the document is in the specified collectionId. */
    DocumentKey.prototype.hasCollectionId = function (collectionId) {
        return (this.path.length >= 2 &&
            this.path.get(this.path.length - 2) === collectionId);
    };
    DocumentKey.prototype.isEqual = function (other) {
        return (other !== null && ResourcePath.comparator(this.path, other.path) === 0);
    };
    DocumentKey.prototype.toString = function () {
        return this.path.toString();
    };
    DocumentKey.comparator = function (k1, k2) {
        return ResourcePath.comparator(k1.path, k2.path);
    };
    DocumentKey.isDocumentKey = function (path) {
        return path.length % 2 === 0;
    };
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    DocumentKey.fromSegments = function (segments) {
        return new DocumentKey(new ResourcePath(segments.slice()));
    };
    return DocumentKey;
}());
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
function validateNonEmptyArgument(functionName, argumentName, argument) {
    if (!argument) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Function " + functionName + "() cannot be called with an empty " + argumentName + ".");
    }
}
/**
 * Validates that two boolean options are not set at the same time.
 */
function validateIsNotUsedTogether(optionName1, argument1, optionName2, argument2) {
    if (argument1 === true && argument2 === true) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, optionName1 + " and " + optionName2 + " cannot be used together.");
    }
}
/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */
function validateDocumentPath(path) {
    if (!DocumentKey.isDocumentKey(path)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + path + " has " + path.length + ".");
    }
}
/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */
function validateCollectionPath(path) {
    if (DocumentKey.isDocumentKey(path)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + path + " has " + path.length + ".");
    }
}
/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
function isPlainObject(input) {
    return (typeof input === 'object' &&
        input !== null &&
        (Object.getPrototypeOf(input) === Object.prototype ||
            Object.getPrototypeOf(input) === null));
}
/** Returns a string describing the type / value of the provided input. */
function valueDescription(input) {
    if (input === undefined) {
        return 'undefined';
    }
    else if (input === null) {
        return 'null';
    }
    else if (typeof input === 'string') {
        if (input.length > 20) {
            input = input.substring(0, 20) + "...";
        }
        return JSON.stringify(input);
    }
    else if (typeof input === 'number' || typeof input === 'boolean') {
        return '' + input;
    }
    else if (typeof input === 'object') {
        if (input instanceof Array) {
            return 'an array';
        }
        else {
            var customObjectName = tryGetCustomObjectType(input);
            if (customObjectName) {
                return "a custom " + customObjectName + " object";
            }
            else {
                return 'an object';
            }
        }
    }
    else if (typeof input === 'function') {
        return 'a function';
    }
    else {
        return fail();
    }
}
/** Hacky method to try to get the constructor name for an object. */
function tryGetCustomObjectType(input) {
    if (input.constructor) {
        var funcNameRegex = /function\s+([^\s(]+)\s*\(/;
        var results = funcNameRegex.exec(input.constructor.toString());
        if (results && results.length > 1) {
            return results[1];
        }
    }
    return null;
}
/**
 * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
 * underlying instance. Throws if  `obj` is not an instance of `T`.
 *
 * This cast is used in the Lite and Full SDK to verify instance types for
 * arguments passed to the public API.
 */
function cast(obj, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
constructor) {
    if ('_delegate' in obj) {
        // Unwrap Compat types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        obj = obj._delegate;
    }
    if (!(obj instanceof constructor)) {
        if (constructor.name === obj.constructor.name) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Type does not match the expected instance. Did you pass a ' +
                "reference from a different Firestore SDK?");
        }
        else {
            var description = valueDescription(obj);
            throw new FirestoreError(Code.INVALID_ARGUMENT, "Expected type '" + constructor.name + "', but it was: " + description);
        }
    }
    return obj;
}
function validatePositiveNumber(functionName, n) {
    if (n <= 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Function " + functionName + "() requires a positive number, but it was: " + n + ".");
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
var LOG_TAG$3 = 'RestConnection';
/**
 * Maps RPC names to the corresponding REST endpoint name.
 *
 * We use array notation to avoid mangling.
 */
var RPC_NAME_URL_MAPPING = {};
RPC_NAME_URL_MAPPING['BatchGetDocuments'] = 'batchGet';
RPC_NAME_URL_MAPPING['Commit'] = 'commit';
RPC_NAME_URL_MAPPING['RunQuery'] = 'runQuery';
var RPC_URL_VERSION = 'v1';
// SDK_VERSION is updated to different value at runtime depending on the entry point,
// so we need to get its value when we need it in a function.
function getGoogApiClientValue() {
    return 'gl-js/ fire/' + SDK_VERSION;
}
/**
 * Base class for all Rest-based connections to the backend (WebChannel and
 * HTTP).
 */
var RestConnection = /** @class */ (function () {
    function RestConnection(databaseInfo) {
        this.databaseInfo = databaseInfo;
        this.databaseId = databaseInfo.databaseId;
        var proto = databaseInfo.ssl ? 'https' : 'http';
        this.baseUrl = proto + '://' + databaseInfo.host;
        this.databaseRoot =
            'projects/' +
                this.databaseId.projectId +
                '/databases/' +
                this.databaseId.database +
                '/documents';
    }
    RestConnection.prototype.invokeRPC = function (rpcName, path, req, token) {
        var url = this.makeUrl(rpcName, path);
        logDebug(LOG_TAG$3, 'Sending: ', url, req);
        var headers = {};
        this.modifyHeadersForRequest(headers, token);
        return this.performRPCRequest(rpcName, url, headers, req).then(function (response) {
            logDebug(LOG_TAG$3, 'Received: ', response);
            return response;
        }, function (err) {
            logWarn(LOG_TAG$3, rpcName + " failed with error: ", err, 'url: ', url, 'request:', req);
            throw err;
        });
    };
    RestConnection.prototype.invokeStreamingRPC = function (rpcName, path, request, token) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.invokeRPC(rpcName, path, request, token);
    };
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */
    RestConnection.prototype.modifyHeadersForRequest = function (headers, token) {
        headers['X-Goog-Api-Client'] = getGoogApiClientValue();
        // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        headers['Content-Type'] = 'text/plain';
        if (this.databaseInfo.appId) {
            headers['X-Firebase-GMPID'] = this.databaseInfo.appId;
        }
        if (token) {
            for (var header in token.authHeaders) {
                if (token.authHeaders.hasOwnProperty(header)) {
                    headers[header] = token.authHeaders[header];
                }
            }
        }
    };
    RestConnection.prototype.makeUrl = function (rpcName, path) {
        var urlRpcName = RPC_NAME_URL_MAPPING[rpcName];
        return this.baseUrl + "/" + RPC_URL_VERSION + "/" + path + ":" + urlRpcName;
    };
    return RestConnection;
}());
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
 * Error Codes describing the different ways GRPC can fail. These are copied
 * directly from GRPC's sources here:
 *
 * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
 *
 * Important! The names of these identifiers matter because the string forms
 * are used for reverse lookups from the webchannel stream. Do NOT change the
 * names of these identifiers or change this into a const enum.
 */
var RpcCode;
(function (RpcCode) {
    RpcCode[RpcCode["OK"] = 0] = "OK";
    RpcCode[RpcCode["CANCELLED"] = 1] = "CANCELLED";
    RpcCode[RpcCode["UNKNOWN"] = 2] = "UNKNOWN";
    RpcCode[RpcCode["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
    RpcCode[RpcCode["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
    RpcCode[RpcCode["NOT_FOUND"] = 5] = "NOT_FOUND";
    RpcCode[RpcCode["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
    RpcCode[RpcCode["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
    RpcCode[RpcCode["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    RpcCode[RpcCode["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
    RpcCode[RpcCode["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
    RpcCode[RpcCode["ABORTED"] = 10] = "ABORTED";
    RpcCode[RpcCode["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
    RpcCode[RpcCode["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
    RpcCode[RpcCode["INTERNAL"] = 13] = "INTERNAL";
    RpcCode[RpcCode["UNAVAILABLE"] = 14] = "UNAVAILABLE";
    RpcCode[RpcCode["DATA_LOSS"] = 15] = "DATA_LOSS";
})(RpcCode || (RpcCode = {}));
/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function isPermanentError(code) {
    switch (code) {
        case Code.OK:
            return fail();
        case Code.CANCELLED:
        case Code.UNKNOWN:
        case Code.DEADLINE_EXCEEDED:
        case Code.RESOURCE_EXHAUSTED:
        case Code.INTERNAL:
        case Code.UNAVAILABLE:
        // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
        case Code.UNAUTHENTICATED:
            return false;
        case Code.INVALID_ARGUMENT:
        case Code.NOT_FOUND:
        case Code.ALREADY_EXISTS:
        case Code.PERMISSION_DENIED:
        case Code.FAILED_PRECONDITION:
        // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
        case Code.ABORTED:
        case Code.OUT_OF_RANGE:
        case Code.UNIMPLEMENTED:
        case Code.DATA_LOSS:
            return true;
        default:
            return fail();
    }
}
/**
 * Converts an HTTP Status Code to the equivalent error code.
 *
 * @param status - An HTTP Status Code, like 200, 404, 503, etc.
 * @returns The equivalent Code. Unknown status codes are mapped to
 *     Code.UNKNOWN.
 */
function mapCodeFromHttpStatus(status) {
    if (status === undefined) {
        logError('RPC_ERROR', 'HTTP error has no status');
        return Code.UNKNOWN;
    }
    // The canonical error codes for Google APIs [1] specify mapping onto HTTP
    // status codes but the mapping is not bijective. In each case of ambiguity
    // this function chooses a primary error.
    //
    // [1]
    // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
    switch (status) {
        case 200: // OK
            return Code.OK;
        case 400: // Bad Request
            return Code.FAILED_PRECONDITION;
        // Other possibilities based on the forward mapping
        // return Code.INVALID_ARGUMENT;
        // return Code.OUT_OF_RANGE;
        case 401: // Unauthorized
            return Code.UNAUTHENTICATED;
        case 403: // Forbidden
            return Code.PERMISSION_DENIED;
        case 404: // Not Found
            return Code.NOT_FOUND;
        case 409: // Conflict
            return Code.ABORTED;
        // Other possibilities:
        // return Code.ALREADY_EXISTS;
        case 416: // Range Not Satisfiable
            return Code.OUT_OF_RANGE;
        case 429: // Too Many Requests
            return Code.RESOURCE_EXHAUSTED;
        case 499: // Client Closed Request
            return Code.CANCELLED;
        case 500: // Internal Server Error
            return Code.UNKNOWN;
        // Other possibilities:
        // return Code.INTERNAL;
        // return Code.DATA_LOSS;
        case 501: // Unimplemented
            return Code.UNIMPLEMENTED;
        case 503: // Service Unavailable
            return Code.UNAVAILABLE;
        case 504: // Gateway Timeout
            return Code.DEADLINE_EXCEEDED;
        default:
            if (status >= 200 && status < 300) {
                return Code.OK;
            }
            if (status >= 400 && status < 500) {
                return Code.FAILED_PRECONDITION;
            }
            if (status >= 500 && status < 600) {
                return Code.INTERNAL;
            }
            return Code.UNKNOWN;
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
/**
 * A Rest-based connection that relies on the native HTTP stack
 * (e.g. `fetch` or a polyfill).
 */
var FetchConnection = /** @class */ (function (_super) {
    tslib.__extends(FetchConnection, _super);
    /**
     * @param databaseInfo - The connection info.
     * @param fetchImpl - `fetch` or a Polyfill that implements the fetch API.
     */
    function FetchConnection(databaseInfo, fetchImpl) {
        var _this = _super.call(this, databaseInfo) || this;
        _this.fetchImpl = fetchImpl;
        return _this;
    }
    FetchConnection.prototype.openStream = function (rpcName, token) {
        throw new Error('Not supported by FetchConnection');
    };
    FetchConnection.prototype.performRPCRequest = function (rpcName, url, headers, body) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var requestJson, response, err_1;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        requestJson = JSON.stringify(body);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetchImpl(url, {
                                method: 'POST',
                                headers: headers,
                                body: requestJson
                            })];
                    case 2:
                        response = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        throw new FirestoreError(mapCodeFromHttpStatus(err_1.status), 'Request failed with error: ' + err_1.statusText);
                    case 4:
                        if (!response.ok) {
                            throw new FirestoreError(mapCodeFromHttpStatus(response.status), 'Request failed with error: ' + response.statusText);
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    return FetchConnection;
}(RestConnection));
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
/** Initializes the HTTP connection for the REST API. */
function newConnection(databaseInfo) {
    // node-fetch is meant to be API compatible with `fetch`, but its type doesn't
    // match 100%.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new FetchConnection(databaseInfo, nodeFetch__namespace);
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
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */
function randomBytes(nBytes) {
    return crypto.randomBytes(nBytes);
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
var AutoId = /** @class */ (function () {
    function AutoId() {
    }
    AutoId.newId = function () {
        // Alphanumeric characters
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // The largest byte value that is a multiple of `char.length`.
        var maxMultiple = Math.floor(256 / chars.length) * chars.length;
        var autoId = '';
        var targetLength = 20;
        while (autoId.length < targetLength) {
            var bytes = randomBytes(40);
            for (var i = 0; i < bytes.length; ++i) {
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                if (autoId.length < targetLength && bytes[i] < maxMultiple) {
                    autoId += chars.charAt(bytes[i] % chars.length);
                }
            }
        }
        return autoId;
    };
    return AutoId;
}());
function primitiveComparator(left, right) {
    if (left < right) {
        return -1;
    }
    if (left > right) {
        return 1;
    }
    return 0;
}
/** Helper to compare arrays using isEqual(). */
function arrayEquals(left, right, comparator) {
    if (left.length !== right.length) {
        return false;
    }
    return left.every(function (value, index) { return comparator(value, right[index]); });
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
// The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).
var MIN_SECONDS = -62135596800;
// Number of nanoseconds in a millisecond.
var MS_TO_NANOS = 1e6;
/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */
var Timestamp = /** @class */ (function () {
    /**
     * Creates a new timestamp.
     *
     * @param seconds - The number of seconds of UTC time since Unix epoch
     *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     *     9999-12-31T23:59:59Z inclusive.
     * @param nanoseconds - The non-negative fractions of a second at nanosecond
     *     resolution. Negative second values with fractions must still have
     *     non-negative nanoseconds values that count forward in time. Must be
     *     from 0 to 999,999,999 inclusive.
     */
    function Timestamp(
    /**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */
    seconds, 
    /**
     * The fractions of a second at nanosecond resolution.*
     */
    nanoseconds) {
        this.seconds = seconds;
        this.nanoseconds = nanoseconds;
        if (nanoseconds < 0) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + nanoseconds);
        }
        if (nanoseconds >= 1e9) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + nanoseconds);
        }
        if (seconds < MIN_SECONDS) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + seconds);
        }
        // This will break in the year 10,000.
        if (seconds >= 253402300800) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + seconds);
        }
    }
    /**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */
    Timestamp.now = function () {
        return Timestamp.fromMillis(Date.now());
    };
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */
    Timestamp.fromDate = function (date) {
        return Timestamp.fromMillis(date.getTime());
    };
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */
    Timestamp.fromMillis = function (milliseconds) {
        var seconds = Math.floor(milliseconds / 1000);
        var nanos = Math.floor((milliseconds - seconds * 1000) * MS_TO_NANOS);
        return new Timestamp(seconds, nanos);
    };
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */
    Timestamp.prototype.toDate = function () {
        return new Date(this.toMillis());
    };
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */
    Timestamp.prototype.toMillis = function () {
        return this.seconds * 1000 + this.nanoseconds / MS_TO_NANOS;
    };
    Timestamp.prototype._compareTo = function (other) {
        if (this.seconds === other.seconds) {
            return primitiveComparator(this.nanoseconds, other.nanoseconds);
        }
        return primitiveComparator(this.seconds, other.seconds);
    };
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */
    Timestamp.prototype.isEqual = function (other) {
        return (other.seconds === this.seconds && other.nanoseconds === this.nanoseconds);
    };
    /** Returns a textual representation of this Timestamp. */
    Timestamp.prototype.toString = function () {
        return ('Timestamp(seconds=' +
            this.seconds +
            ', nanoseconds=' +
            this.nanoseconds +
            ')');
    };
    /** Returns a JSON-serializable representation of this Timestamp. */
    Timestamp.prototype.toJSON = function () {
        return { seconds: this.seconds, nanoseconds: this.nanoseconds };
    };
    /**
     * Converts this object to a primitive string, which allows Timestamp objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */
    Timestamp.prototype.valueOf = function () {
        // This method returns a string of the form <seconds>.<nanoseconds> where
        // <seconds> is translated to have a non-negative value and both <seconds>
        // and <nanoseconds> are left-padded with zeroes to be a consistent length.
        // Strings with this format then have a lexiographical ordering that matches
        // the expected ordering. The <seconds> translation is done to avoid having
        // a leading negative sign (i.e. a leading '-' character) in its string
        // representation, which would affect its lexiographical ordering.
        var adjustedSeconds = this.seconds - MIN_SECONDS;
        // Note: Up to 12 decimal digits are required to represent all valid
        // 'seconds' values.
        var formattedSeconds = String(adjustedSeconds).padStart(12, '0');
        var formattedNanoseconds = String(this.nanoseconds).padStart(9, '0');
        return formattedSeconds + '.' + formattedNanoseconds;
    };
    return Timestamp;
}());
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
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */
var SnapshotVersion = /** @class */ (function () {
    function SnapshotVersion(timestamp) {
        this.timestamp = timestamp;
    }
    SnapshotVersion.fromTimestamp = function (value) {
        return new SnapshotVersion(value);
    };
    SnapshotVersion.min = function () {
        return new SnapshotVersion(new Timestamp(0, 0));
    };
    SnapshotVersion.prototype.compareTo = function (other) {
        return this.timestamp._compareTo(other.timestamp);
    };
    SnapshotVersion.prototype.isEqual = function (other) {
        return this.timestamp.isEqual(other.timestamp);
    };
    /** Returns a number representation of the version for use in spec tests. */
    SnapshotVersion.prototype.toMicroseconds = function () {
        // Convert to microseconds.
        return this.timestamp.seconds * 1e6 + this.timestamp.nanoseconds / 1000;
    };
    SnapshotVersion.prototype.toString = function () {
        return 'SnapshotVersion(' + this.timestamp.toString() + ')';
    };
    SnapshotVersion.prototype.toTimestamp = function () {
        return this.timestamp;
    };
    return SnapshotVersion;
}());
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
function objectSize(obj) {
    var count = 0;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            count++;
        }
    }
    return count;
}
function forEach(obj, fn) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn(key, obj[key]);
        }
    }
}
function isEmpty(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
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
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */
var FieldMask = /** @class */ (function () {
    function FieldMask(fields) {
        this.fields = fields;
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        fields.sort(FieldPath$1.comparator);
    }
    /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */
    FieldMask.prototype.covers = function (fieldPath) {
        for (var _i = 0, _c = this.fields; _i < _c.length; _i++) {
            var fieldMaskPath = _c[_i];
            if (fieldMaskPath.isPrefixOf(fieldPath)) {
                return true;
            }
        }
        return false;
    };
    FieldMask.prototype.isEqual = function (other) {
        return arrayEquals(this.fields, other.fields, function (l, r) { return l.isEqual(r); });
    };
    return FieldMask;
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
function decodeBase64(encoded) {
    // Node actually doesn't validate base64 strings.
    // A quick sanity check that is not a fool-proof validation
    if (/[^-A-Za-z0-9+/=]/.test(encoded)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Not a valid Base64 string: ' + encoded);
    }
    return new Buffer(encoded, 'base64').toString('binary');
}
/** Converts a binary string to a Base64 encoded string. */
function encodeBase64(raw) {
    return new Buffer(raw, 'binary').toString('base64');
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
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 */
var ByteString = /** @class */ (function () {
    function ByteString(binaryString) {
        this.binaryString = binaryString;
    }
    ByteString.fromBase64String = function (base64) {
        var binaryString = decodeBase64(base64);
        return new ByteString(binaryString);
    };
    ByteString.fromUint8Array = function (array) {
        var binaryString = binaryStringFromUint8Array(array);
        return new ByteString(binaryString);
    };
    ByteString.prototype.toBase64 = function () {
        return encodeBase64(this.binaryString);
    };
    ByteString.prototype.toUint8Array = function () {
        return uint8ArrayFromBinaryString(this.binaryString);
    };
    ByteString.prototype.approximateByteSize = function () {
        return this.binaryString.length * 2;
    };
    ByteString.prototype.compareTo = function (other) {
        return primitiveComparator(this.binaryString, other.binaryString);
    };
    ByteString.prototype.isEqual = function (other) {
        return this.binaryString === other.binaryString;
    };
    return ByteString;
}());
ByteString.EMPTY_BYTE_STRING = new ByteString('');
/**
 * Helper function to convert an Uint8array to a binary string.
 */
function binaryStringFromUint8Array(array) {
    var binaryString = '';
    for (var i = 0; i < array.length; ++i) {
        binaryString += String.fromCharCode(array[i]);
    }
    return binaryString;
}
/**
 * Helper function to convert a binary string to an Uint8Array.
 */
function uint8ArrayFromBinaryString(binaryString) {
    var buffer = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        buffer[i] = binaryString.charCodeAt(i);
    }
    return buffer;
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
// A RegExp matching ISO 8601 UTC timestamps with optional fraction.
var ISO_TIMESTAMP_REG_EXP = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */
function normalizeTimestamp(date) {
    hardAssert(!!date);
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (typeof date === 'string') {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var nanos = 0;
        var fraction = ISO_TIMESTAMP_REG_EXP.exec(date);
        hardAssert(!!fraction);
        if (fraction[1]) {
            // Pad the fraction out to 9 digits (nanos).
            var nanoStr = fraction[1];
            nanoStr = (nanoStr + '000000000').substr(0, 9);
            nanos = Number(nanoStr);
        }
        // Parse the date to get the seconds.
        var parsedDate = new Date(date);
        var seconds = Math.floor(parsedDate.getTime() / 1000);
        return { seconds: seconds, nanos: nanos };
    }
    else {
        // TODO(b/37282237): Use strings for Proto3 timestamps
        // assert(!this.options.useProto3Json,
        //   'The timestamp instance format requires Proto JS.');
        var seconds = normalizeNumber(date.seconds);
        var nanos = normalizeNumber(date.nanos);
        return { seconds: seconds, nanos: nanos };
    }
}
/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */
function normalizeNumber(value) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    if (typeof value === 'number') {
        return value;
    }
    else if (typeof value === 'string') {
        return Number(value);
    }
    else {
        return 0;
    }
}
/** Converts the possible Proto types for Blobs into a ByteString. */
function normalizeByteString(blob) {
    if (typeof blob === 'string') {
        return ByteString.fromBase64String(blob);
    }
    else {
        return ByteString.fromUint8Array(blob);
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
/**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   transform. They can only exist in the local view of a document. Therefore
 *   they do not need to be parsed or serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */
var SERVER_TIMESTAMP_SENTINEL = 'server_timestamp';
var TYPE_KEY = '__type__';
var PREVIOUS_VALUE_KEY = '__previous_value__';
var LOCAL_WRITE_TIME_KEY = '__local_write_time__';
function isServerTimestamp(value) {
    var _a, _b;
    var type = (_b = (((_a = value === null || value === void 0 ? void 0 : value.mapValue) === null || _a === void 0 ? void 0 : _a.fields) || {})[TYPE_KEY]) === null || _b === void 0 ? void 0 : _b.stringValue;
    return type === SERVER_TIMESTAMP_SENTINEL;
}
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */
function getPreviousValue(value) {
    var previousValue = value.mapValue.fields[PREVIOUS_VALUE_KEY];
    if (isServerTimestamp(previousValue)) {
        return getPreviousValue(previousValue);
    }
    return previousValue;
}
/**
 * Returns the local time at which this timestamp was first set.
 */
function getLocalWriteTime(value) {
    var localWriteTime = normalizeTimestamp(value.mapValue.fields[LOCAL_WRITE_TIME_KEY].timestampValue);
    return new Timestamp(localWriteTime.seconds, localWriteTime.nanos);
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
 * Returns whether a variable is either undefined or null.
 */
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
/** Returns whether the value represents -0. */
function isNegativeZero(value) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return value === 0 && 1 / value === 1 / -0;
}
/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */
function isSafeInteger(value) {
    return (typeof value === 'number' &&
        Number.isInteger(value) &&
        !isNegativeZero(value) &&
        value <= Number.MAX_SAFE_INTEGER &&
        value >= Number.MIN_SAFE_INTEGER);
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
/** Extracts the backend's type order for the provided value. */
function typeOrder(value) {
    if ('nullValue' in value) {
        return 0 /* NullValue */;
    }
    else if ('booleanValue' in value) {
        return 1 /* BooleanValue */;
    }
    else if ('integerValue' in value || 'doubleValue' in value) {
        return 2 /* NumberValue */;
    }
    else if ('timestampValue' in value) {
        return 3 /* TimestampValue */;
    }
    else if ('stringValue' in value) {
        return 5 /* StringValue */;
    }
    else if ('bytesValue' in value) {
        return 6 /* BlobValue */;
    }
    else if ('referenceValue' in value) {
        return 7 /* RefValue */;
    }
    else if ('geoPointValue' in value) {
        return 8 /* GeoPointValue */;
    }
    else if ('arrayValue' in value) {
        return 9 /* ArrayValue */;
    }
    else if ('mapValue' in value) {
        if (isServerTimestamp(value)) {
            return 4 /* ServerTimestampValue */;
        }
        return 10 /* ObjectValue */;
    }
    else {
        return fail();
    }
}
/** Tests `left` and `right` for equality based on the backend semantics. */
function valueEquals(left, right) {
    var leftType = typeOrder(left);
    var rightType = typeOrder(right);
    if (leftType !== rightType) {
        return false;
    }
    switch (leftType) {
        case 0 /* NullValue */:
            return true;
        case 1 /* BooleanValue */:
            return left.booleanValue === right.booleanValue;
        case 4 /* ServerTimestampValue */:
            return getLocalWriteTime(left).isEqual(getLocalWriteTime(right));
        case 3 /* TimestampValue */:
            return timestampEquals(left, right);
        case 5 /* StringValue */:
            return left.stringValue === right.stringValue;
        case 6 /* BlobValue */:
            return blobEquals(left, right);
        case 7 /* RefValue */:
            return left.referenceValue === right.referenceValue;
        case 8 /* GeoPointValue */:
            return geoPointEquals(left, right);
        case 2 /* NumberValue */:
            return numberEquals(left, right);
        case 9 /* ArrayValue */:
            return arrayEquals(left.arrayValue.values || [], right.arrayValue.values || [], valueEquals);
        case 10 /* ObjectValue */:
            return objectEquals(left, right);
        default:
            return fail();
    }
}
function timestampEquals(left, right) {
    if (typeof left.timestampValue === 'string' &&
        typeof right.timestampValue === 'string' &&
        left.timestampValue.length === right.timestampValue.length) {
        // Use string equality for ISO 8601 timestamps
        return left.timestampValue === right.timestampValue;
    }
    var leftTimestamp = normalizeTimestamp(left.timestampValue);
    var rightTimestamp = normalizeTimestamp(right.timestampValue);
    return (leftTimestamp.seconds === rightTimestamp.seconds &&
        leftTimestamp.nanos === rightTimestamp.nanos);
}
function geoPointEquals(left, right) {
    return (normalizeNumber(left.geoPointValue.latitude) ===
        normalizeNumber(right.geoPointValue.latitude) &&
        normalizeNumber(left.geoPointValue.longitude) ===
            normalizeNumber(right.geoPointValue.longitude));
}
function blobEquals(left, right) {
    return normalizeByteString(left.bytesValue).isEqual(normalizeByteString(right.bytesValue));
}
function numberEquals(left, right) {
    if ('integerValue' in left && 'integerValue' in right) {
        return (normalizeNumber(left.integerValue) === normalizeNumber(right.integerValue));
    }
    else if ('doubleValue' in left && 'doubleValue' in right) {
        var n1 = normalizeNumber(left.doubleValue);
        var n2 = normalizeNumber(right.doubleValue);
        if (n1 === n2) {
            return isNegativeZero(n1) === isNegativeZero(n2);
        }
        else {
            return isNaN(n1) && isNaN(n2);
        }
    }
    return false;
}
function objectEquals(left, right) {
    var leftMap = left.mapValue.fields || {};
    var rightMap = right.mapValue.fields || {};
    if (objectSize(leftMap) !== objectSize(rightMap)) {
        return false;
    }
    for (var key in leftMap) {
        if (leftMap.hasOwnProperty(key)) {
            if (rightMap[key] === undefined ||
                !valueEquals(leftMap[key], rightMap[key])) {
                return false;
            }
        }
    }
    return true;
}
/** Returns true if the ArrayValue contains the specified element. */
function arrayValueContains(haystack, needle) {
    return ((haystack.values || []).find(function (v) { return valueEquals(v, needle); }) !== undefined);
}
function valueCompare(left, right) {
    var leftType = typeOrder(left);
    var rightType = typeOrder(right);
    if (leftType !== rightType) {
        return primitiveComparator(leftType, rightType);
    }
    switch (leftType) {
        case 0 /* NullValue */:
            return 0;
        case 1 /* BooleanValue */:
            return primitiveComparator(left.booleanValue, right.booleanValue);
        case 2 /* NumberValue */:
            return compareNumbers(left, right);
        case 3 /* TimestampValue */:
            return compareTimestamps(left.timestampValue, right.timestampValue);
        case 4 /* ServerTimestampValue */:
            return compareTimestamps(getLocalWriteTime(left), getLocalWriteTime(right));
        case 5 /* StringValue */:
            return primitiveComparator(left.stringValue, right.stringValue);
        case 6 /* BlobValue */:
            return compareBlobs(left.bytesValue, right.bytesValue);
        case 7 /* RefValue */:
            return compareReferences(left.referenceValue, right.referenceValue);
        case 8 /* GeoPointValue */:
            return compareGeoPoints(left.geoPointValue, right.geoPointValue);
        case 9 /* ArrayValue */:
            return compareArrays(left.arrayValue, right.arrayValue);
        case 10 /* ObjectValue */:
            return compareMaps(left.mapValue, right.mapValue);
        default:
            throw fail();
    }
}
function compareNumbers(left, right) {
    var leftNumber = normalizeNumber(left.integerValue || left.doubleValue);
    var rightNumber = normalizeNumber(right.integerValue || right.doubleValue);
    if (leftNumber < rightNumber) {
        return -1;
    }
    else if (leftNumber > rightNumber) {
        return 1;
    }
    else if (leftNumber === rightNumber) {
        return 0;
    }
    else {
        // one or both are NaN.
        if (isNaN(leftNumber)) {
            return isNaN(rightNumber) ? 0 : -1;
        }
        else {
            return 1;
        }
    }
}
function compareTimestamps(left, right) {
    if (typeof left === 'string' &&
        typeof right === 'string' &&
        left.length === right.length) {
        return primitiveComparator(left, right);
    }
    var leftTimestamp = normalizeTimestamp(left);
    var rightTimestamp = normalizeTimestamp(right);
    var comparison = primitiveComparator(leftTimestamp.seconds, rightTimestamp.seconds);
    if (comparison !== 0) {
        return comparison;
    }
    return primitiveComparator(leftTimestamp.nanos, rightTimestamp.nanos);
}
function compareReferences(leftPath, rightPath) {
    var leftSegments = leftPath.split('/');
    var rightSegments = rightPath.split('/');
    for (var i = 0; i < leftSegments.length && i < rightSegments.length; i++) {
        var comparison = primitiveComparator(leftSegments[i], rightSegments[i]);
        if (comparison !== 0) {
            return comparison;
        }
    }
    return primitiveComparator(leftSegments.length, rightSegments.length);
}
function compareGeoPoints(left, right) {
    var comparison = primitiveComparator(normalizeNumber(left.latitude), normalizeNumber(right.latitude));
    if (comparison !== 0) {
        return comparison;
    }
    return primitiveComparator(normalizeNumber(left.longitude), normalizeNumber(right.longitude));
}
function compareBlobs(left, right) {
    var leftBytes = normalizeByteString(left);
    var rightBytes = normalizeByteString(right);
    return leftBytes.compareTo(rightBytes);
}
function compareArrays(left, right) {
    var leftArray = left.values || [];
    var rightArray = right.values || [];
    for (var i = 0; i < leftArray.length && i < rightArray.length; ++i) {
        var compare = valueCompare(leftArray[i], rightArray[i]);
        if (compare) {
            return compare;
        }
    }
    return primitiveComparator(leftArray.length, rightArray.length);
}
function compareMaps(left, right) {
    var leftMap = left.fields || {};
    var leftKeys = Object.keys(leftMap);
    var rightMap = right.fields || {};
    var rightKeys = Object.keys(rightMap);
    // Even though MapValues are likely sorted correctly based on their insertion
    // order (e.g. when received from the backend), local modifications can bring
    // elements out of order. We need to re-sort the elements to ensure that
    // canonical IDs are independent of insertion order.
    leftKeys.sort();
    rightKeys.sort();
    for (var i = 0; i < leftKeys.length && i < rightKeys.length; ++i) {
        var keyCompare = primitiveComparator(leftKeys[i], rightKeys[i]);
        if (keyCompare !== 0) {
            return keyCompare;
        }
        var compare = valueCompare(leftMap[leftKeys[i]], rightMap[rightKeys[i]]);
        if (compare !== 0) {
            return compare;
        }
    }
    return primitiveComparator(leftKeys.length, rightKeys.length);
}
/** Returns a reference value for the provided database and key. */
function refValue(databaseId, key) {
    return {
        referenceValue: "projects/" + databaseId.projectId + "/databases/" + databaseId.database + "/documents/" + key.path.canonicalString()
    };
}
/** Returns true if `value` is an ArrayValue. */
function isArray(value) {
    return !!value && 'arrayValue' in value;
}
/** Returns true if `value` is a NullValue. */
function isNullValue(value) {
    return !!value && 'nullValue' in value;
}
/** Returns true if `value` is NaN. */
function isNanValue(value) {
    return !!value && 'doubleValue' in value && isNaN(Number(value.doubleValue));
}
/** Returns true if `value` is a MapValue. */
function isMapValue(value) {
    return !!value && 'mapValue' in value;
}
/** Creates a deep copy of `source`. */
function deepClone(source) {
    if (source.geoPointValue) {
        return { geoPointValue: Object.assign({}, source.geoPointValue) };
    }
    else if (source.timestampValue &&
        typeof source.timestampValue === 'object') {
        return { timestampValue: Object.assign({}, source.timestampValue) };
    }
    else if (source.mapValue) {
        var target_1 = { mapValue: { fields: {} } };
        forEach(source.mapValue.fields, function (key, val) { return (target_1.mapValue.fields[key] = deepClone(val)); });
        return target_1;
    }
    else if (source.arrayValue) {
        var target = { arrayValue: { values: [] } };
        for (var i = 0; i < (source.arrayValue.values || []).length; ++i) {
            target.arrayValue.values[i] = deepClone(source.arrayValue.values[i]);
        }
        return target;
    }
    else {
        return Object.assign({}, source);
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
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */
var ObjectValue = /** @class */ (function () {
    function ObjectValue(value) {
        this.value = value;
    }
    ObjectValue.empty = function () {
        return new ObjectValue({ mapValue: {} });
    };
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */
    ObjectValue.prototype.field = function (path) {
        if (path.isEmpty()) {
            return this.value;
        }
        else {
            var currentLevel = this.value;
            for (var i = 0; i < path.length - 1; ++i) {
                currentLevel = (currentLevel.mapValue.fields || {})[path.get(i)];
                if (!isMapValue(currentLevel)) {
                    return null;
                }
            }
            currentLevel = (currentLevel.mapValue.fields || {})[path.lastSegment()];
            return currentLevel || null;
        }
    };
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    ObjectValue.prototype.set = function (path, value) {
        var fieldsMap = this.getFieldsMap(path.popLast());
        fieldsMap[path.lastSegment()] = deepClone(value);
    };
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    ObjectValue.prototype.setAll = function (data) {
        var _this = this;
        var parent = FieldPath$1.emptyPath();
        var upserts = {};
        var deletes = [];
        data.forEach(function (value, path) {
            if (!parent.isImmediateParentOf(path)) {
                // Insert the accumulated changes at this parent location
                var fieldsMap_1 = _this.getFieldsMap(parent);
                _this.applyChanges(fieldsMap_1, upserts, deletes);
                upserts = {};
                deletes = [];
                parent = path.popLast();
            }
            if (value) {
                upserts[path.lastSegment()] = deepClone(value);
            }
            else {
                deletes.push(path.lastSegment());
            }
        });
        var fieldsMap = this.getFieldsMap(parent);
        this.applyChanges(fieldsMap, upserts, deletes);
    };
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */
    ObjectValue.prototype.delete = function (path) {
        var nestedValue = this.field(path.popLast());
        if (isMapValue(nestedValue) && nestedValue.mapValue.fields) {
            delete nestedValue.mapValue.fields[path.lastSegment()];
        }
    };
    ObjectValue.prototype.isEqual = function (other) {
        return valueEquals(this.value, other.value);
    };
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */
    ObjectValue.prototype.getFieldsMap = function (path) {
        var current = this.value;
        if (!current.mapValue.fields) {
            current.mapValue = { fields: {} };
        }
        for (var i = 0; i < path.length; ++i) {
            var next = current.mapValue.fields[path.get(i)];
            if (!isMapValue(next) || !next.mapValue.fields) {
                next = { mapValue: { fields: {} } };
                current.mapValue.fields[path.get(i)] = next;
            }
            current = next;
        }
        return current.mapValue.fields;
    };
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */
    ObjectValue.prototype.applyChanges = function (fieldsMap, inserts, deletes) {
        forEach(inserts, function (key, val) { return (fieldsMap[key] = val); });
        for (var _i = 0, deletes_1 = deletes; _i < deletes_1.length; _i++) {
            var field = deletes_1[_i];
            delete fieldsMap[field];
        }
    };
    ObjectValue.prototype.clone = function () {
        return new ObjectValue(deepClone(this.value));
    };
    return ObjectValue;
}());
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
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */
var MutableDocument = /** @class */ (function () {
    function MutableDocument(key, documentType, version, data, documentState) {
        this.key = key;
        this.documentType = documentType;
        this.version = version;
        this.data = data;
        this.documentState = documentState;
    }
    /**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */
    MutableDocument.newInvalidDocument = function (documentKey) {
        return new MutableDocument(documentKey, 0 /* INVALID */, SnapshotVersion.min(), ObjectValue.empty(), 0 /* SYNCED */);
    };
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */
    MutableDocument.newFoundDocument = function (documentKey, version, value) {
        return new MutableDocument(documentKey, 1 /* FOUND_DOCUMENT */, version, value, 0 /* SYNCED */);
    };
    /** Creates a new document that is known to not exist at the given version. */
    MutableDocument.newNoDocument = function (documentKey, version) {
        return new MutableDocument(documentKey, 2 /* NO_DOCUMENT */, version, ObjectValue.empty(), 0 /* SYNCED */);
    };
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */
    MutableDocument.newUnknownDocument = function (documentKey, version) {
        return new MutableDocument(documentKey, 3 /* UNKNOWN_DOCUMENT */, version, ObjectValue.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
    };
    /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */
    MutableDocument.prototype.convertToFoundDocument = function (version, value) {
        this.version = version;
        this.documentType = 1 /* FOUND_DOCUMENT */;
        this.data = value;
        this.documentState = 0 /* SYNCED */;
        return this;
    };
    /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */
    MutableDocument.prototype.convertToNoDocument = function (version) {
        this.version = version;
        this.documentType = 2 /* NO_DOCUMENT */;
        this.data = ObjectValue.empty();
        this.documentState = 0 /* SYNCED */;
        return this;
    };
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */
    MutableDocument.prototype.convertToUnknownDocument = function (version) {
        this.version = version;
        this.documentType = 3 /* UNKNOWN_DOCUMENT */;
        this.data = ObjectValue.empty();
        this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */;
        return this;
    };
    MutableDocument.prototype.setHasCommittedMutations = function () {
        this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */;
        return this;
    };
    MutableDocument.prototype.setHasLocalMutations = function () {
        this.documentState = 1 /* HAS_LOCAL_MUTATIONS */;
        return this;
    };
    Object.defineProperty(MutableDocument.prototype, "hasLocalMutations", {
        get: function () {
            return this.documentState === 1 /* HAS_LOCAL_MUTATIONS */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MutableDocument.prototype, "hasCommittedMutations", {
        get: function () {
            return this.documentState === 2 /* HAS_COMMITTED_MUTATIONS */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MutableDocument.prototype, "hasPendingWrites", {
        get: function () {
            return this.hasLocalMutations || this.hasCommittedMutations;
        },
        enumerable: false,
        configurable: true
    });
    MutableDocument.prototype.isValidDocument = function () {
        return this.documentType !== 0 /* INVALID */;
    };
    MutableDocument.prototype.isFoundDocument = function () {
        return this.documentType === 1 /* FOUND_DOCUMENT */;
    };
    MutableDocument.prototype.isNoDocument = function () {
        return this.documentType === 2 /* NO_DOCUMENT */;
    };
    MutableDocument.prototype.isUnknownDocument = function () {
        return this.documentType === 3 /* UNKNOWN_DOCUMENT */;
    };
    MutableDocument.prototype.isEqual = function (other) {
        return (other instanceof MutableDocument &&
            this.key.isEqual(other.key) &&
            this.version.isEqual(other.version) &&
            this.documentType === other.documentType &&
            this.documentState === other.documentState &&
            this.data.isEqual(other.data));
    };
    MutableDocument.prototype.clone = function () {
        return new MutableDocument(this.key, this.documentType, this.version, this.data.clone(), this.documentState);
    };
    MutableDocument.prototype.toString = function () {
        return ("Document(" + this.key + ", " + this.version + ", " + JSON.stringify(this.data.value) + ", " +
            ("{documentType: " + this.documentType + "}), ") +
            ("{documentState: " + this.documentState + "})"));
    };
    return MutableDocument;
}());
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
// Visible for testing
var TargetImpl = /** @class */ (function () {
    function TargetImpl(path, collectionGroup, orderBy, filters, limit, startAt, endAt) {
        if (collectionGroup === void 0) { collectionGroup = null; }
        if (orderBy === void 0) { orderBy = []; }
        if (filters === void 0) { filters = []; }
        if (limit === void 0) { limit = null; }
        if (startAt === void 0) { startAt = null; }
        if (endAt === void 0) { endAt = null; }
        this.path = path;
        this.collectionGroup = collectionGroup;
        this.orderBy = orderBy;
        this.filters = filters;
        this.limit = limit;
        this.startAt = startAt;
        this.endAt = endAt;
        this.memoizedCanonicalId = null;
    }
    return TargetImpl;
}());
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */
function newTarget(path, collectionGroup, orderBy, filters, limit, startAt, endAt) {
    if (collectionGroup === void 0) { collectionGroup = null; }
    if (orderBy === void 0) { orderBy = []; }
    if (filters === void 0) { filters = []; }
    if (limit === void 0) { limit = null; }
    if (startAt === void 0) { startAt = null; }
    if (endAt === void 0) { endAt = null; }
    return new TargetImpl(path, collectionGroup, orderBy, filters, limit, startAt, endAt);
}
function targetEquals(left, right) {
    if (left.limit !== right.limit) {
        return false;
    }
    if (left.orderBy.length !== right.orderBy.length) {
        return false;
    }
    for (var i = 0; i < left.orderBy.length; i++) {
        if (!orderByEquals(left.orderBy[i], right.orderBy[i])) {
            return false;
        }
    }
    if (left.filters.length !== right.filters.length) {
        return false;
    }
    for (var i = 0; i < left.filters.length; i++) {
        if (!filterEquals(left.filters[i], right.filters[i])) {
            return false;
        }
    }
    if (left.collectionGroup !== right.collectionGroup) {
        return false;
    }
    if (!left.path.isEqual(right.path)) {
        return false;
    }
    if (!boundEquals(left.startAt, right.startAt)) {
        return false;
    }
    return boundEquals(left.endAt, right.endAt);
}
var Filter = /** @class */ (function () {
    function Filter() {
    }
    return Filter;
}());
var FieldFilter = /** @class */ (function (_super) {
    tslib.__extends(FieldFilter, _super);
    function FieldFilter(field, op, value) {
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.op = op;
        _this.value = value;
        return _this;
    }
    /**
     * Creates a filter based on the provided arguments.
     */
    FieldFilter.create = function (field, op, value) {
        if (field.isKeyField()) {
            if (op === "in" /* IN */ || op === "not-in" /* NOT_IN */) {
                return this.createKeyFieldInFilter(field, op, value);
            }
            else {
                return new KeyFieldFilter(field, op, value);
            }
        }
        else if (op === "array-contains" /* ARRAY_CONTAINS */) {
            return new ArrayContainsFilter(field, value);
        }
        else if (op === "in" /* IN */) {
            return new InFilter(field, value);
        }
        else if (op === "not-in" /* NOT_IN */) {
            return new NotInFilter(field, value);
        }
        else if (op === "array-contains-any" /* ARRAY_CONTAINS_ANY */) {
            return new ArrayContainsAnyFilter(field, value);
        }
        else {
            return new FieldFilter(field, op, value);
        }
    };
    FieldFilter.createKeyFieldInFilter = function (field, op, value) {
        return op === "in" /* IN */
            ? new KeyFieldInFilter(field, value)
            : new KeyFieldNotInFilter(field, value);
    };
    FieldFilter.prototype.matches = function (doc) {
        var other = doc.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
        if (this.op === "!=" /* NOT_EQUAL */) {
            return (other !== null &&
                this.matchesComparison(valueCompare(other, this.value)));
        }
        // Only compare types with matching backend order (such as double and int).
        return (other !== null &&
            typeOrder(this.value) === typeOrder(other) &&
            this.matchesComparison(valueCompare(other, this.value)));
    };
    FieldFilter.prototype.matchesComparison = function (comparison) {
        switch (this.op) {
            case "<" /* LESS_THAN */:
                return comparison < 0;
            case "<=" /* LESS_THAN_OR_EQUAL */:
                return comparison <= 0;
            case "==" /* EQUAL */:
                return comparison === 0;
            case "!=" /* NOT_EQUAL */:
                return comparison !== 0;
            case ">" /* GREATER_THAN */:
                return comparison > 0;
            case ">=" /* GREATER_THAN_OR_EQUAL */:
                return comparison >= 0;
            default:
                return fail();
        }
    };
    FieldFilter.prototype.isInequality = function () {
        return ([
            "<" /* LESS_THAN */,
            "<=" /* LESS_THAN_OR_EQUAL */,
            ">" /* GREATER_THAN */,
            ">=" /* GREATER_THAN_OR_EQUAL */,
            "!=" /* NOT_EQUAL */,
            "not-in" /* NOT_IN */
        ].indexOf(this.op) >= 0);
    };
    return FieldFilter;
}(Filter));
function filterEquals(f1, f2) {
    return (f1.op === f2.op &&
        f1.field.isEqual(f2.field) &&
        valueEquals(f1.value, f2.value));
}
/** Filter that matches on key fields (i.e. '__name__'). */
var KeyFieldFilter = /** @class */ (function (_super) {
    tslib.__extends(KeyFieldFilter, _super);
    function KeyFieldFilter(field, op, value) {
        var _this = _super.call(this, field, op, value) || this;
        _this.key = DocumentKey.fromName(value.referenceValue);
        return _this;
    }
    KeyFieldFilter.prototype.matches = function (doc) {
        var comparison = DocumentKey.comparator(doc.key, this.key);
        return this.matchesComparison(comparison);
    };
    return KeyFieldFilter;
}(FieldFilter));
/** Filter that matches on key fields within an array. */
var KeyFieldInFilter = /** @class */ (function (_super) {
    tslib.__extends(KeyFieldInFilter, _super);
    function KeyFieldInFilter(field, value) {
        var _this = _super.call(this, field, "in" /* IN */, value) || this;
        _this.keys = extractDocumentKeysFromArrayValue("in" /* IN */, value);
        return _this;
    }
    KeyFieldInFilter.prototype.matches = function (doc) {
        return this.keys.some(function (key) { return key.isEqual(doc.key); });
    };
    return KeyFieldInFilter;
}(FieldFilter));
/** Filter that matches on key fields not present within an array. */
var KeyFieldNotInFilter = /** @class */ (function (_super) {
    tslib.__extends(KeyFieldNotInFilter, _super);
    function KeyFieldNotInFilter(field, value) {
        var _this = _super.call(this, field, "not-in" /* NOT_IN */, value) || this;
        _this.keys = extractDocumentKeysFromArrayValue("not-in" /* NOT_IN */, value);
        return _this;
    }
    KeyFieldNotInFilter.prototype.matches = function (doc) {
        return !this.keys.some(function (key) { return key.isEqual(doc.key); });
    };
    return KeyFieldNotInFilter;
}(FieldFilter));
function extractDocumentKeysFromArrayValue(op, value) {
    var _a;
    return (((_a = value.arrayValue) === null || _a === void 0 ? void 0 : _a.values) || []).map(function (v) {
        return DocumentKey.fromName(v.referenceValue);
    });
}
/** A Filter that implements the array-contains operator. */
var ArrayContainsFilter = /** @class */ (function (_super) {
    tslib.__extends(ArrayContainsFilter, _super);
    function ArrayContainsFilter(field, value) {
        return _super.call(this, field, "array-contains" /* ARRAY_CONTAINS */, value) || this;
    }
    ArrayContainsFilter.prototype.matches = function (doc) {
        var other = doc.data.field(this.field);
        return isArray(other) && arrayValueContains(other.arrayValue, this.value);
    };
    return ArrayContainsFilter;
}(FieldFilter));
/** A Filter that implements the IN operator. */
var InFilter = /** @class */ (function (_super) {
    tslib.__extends(InFilter, _super);
    function InFilter(field, value) {
        return _super.call(this, field, "in" /* IN */, value) || this;
    }
    InFilter.prototype.matches = function (doc) {
        var other = doc.data.field(this.field);
        return other !== null && arrayValueContains(this.value.arrayValue, other);
    };
    return InFilter;
}(FieldFilter));
/** A Filter that implements the not-in operator. */
var NotInFilter = /** @class */ (function (_super) {
    tslib.__extends(NotInFilter, _super);
    function NotInFilter(field, value) {
        return _super.call(this, field, "not-in" /* NOT_IN */, value) || this;
    }
    NotInFilter.prototype.matches = function (doc) {
        if (arrayValueContains(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) {
            return false;
        }
        var other = doc.data.field(this.field);
        return other !== null && !arrayValueContains(this.value.arrayValue, other);
    };
    return NotInFilter;
}(FieldFilter));
/** A Filter that implements the array-contains-any operator. */
var ArrayContainsAnyFilter = /** @class */ (function (_super) {
    tslib.__extends(ArrayContainsAnyFilter, _super);
    function ArrayContainsAnyFilter(field, value) {
        return _super.call(this, field, "array-contains-any" /* ARRAY_CONTAINS_ANY */, value) || this;
    }
    ArrayContainsAnyFilter.prototype.matches = function (doc) {
        var _this = this;
        var other = doc.data.field(this.field);
        if (!isArray(other) || !other.arrayValue.values) {
            return false;
        }
        return other.arrayValue.values.some(function (val) { return arrayValueContains(_this.value.arrayValue, val); });
    };
    return ArrayContainsAnyFilter;
}(FieldFilter));
/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */
var Bound = /** @class */ (function () {
    function Bound(position, before) {
        this.position = position;
        this.before = before;
    }
    return Bound;
}());
/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */
var OrderBy = /** @class */ (function () {
    function OrderBy(field, dir /* ASCENDING */) {
        if (dir === void 0) { dir = "asc"; }
        this.field = field;
        this.dir = dir;
    }
    return OrderBy;
}());
function orderByEquals(left, right) {
    return left.dir === right.dir && left.field.isEqual(right.field);
}
function boundEquals(left, right) {
    if (left === null) {
        return right === null;
    }
    else if (right === null) {
        return false;
    }
    if (left.before !== right.before ||
        left.position.length !== right.position.length) {
        return false;
    }
    for (var i = 0; i < left.position.length; i++) {
        var leftPosition = left.position[i];
        var rightPosition = right.position[i];
        if (!valueEquals(leftPosition, rightPosition)) {
            return false;
        }
    }
    return true;
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
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 *
 * Visible for testing.
 */
var QueryImpl = /** @class */ (function () {
    /**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
    function QueryImpl(path, collectionGroup, explicitOrderBy, filters, limit, limitType /* First */, startAt, endAt) {
        if (collectionGroup === void 0) { collectionGroup = null; }
        if (explicitOrderBy === void 0) { explicitOrderBy = []; }
        if (filters === void 0) { filters = []; }
        if (limit === void 0) { limit = null; }
        if (limitType === void 0) { limitType = "F"; }
        if (startAt === void 0) { startAt = null; }
        if (endAt === void 0) { endAt = null; }
        this.path = path;
        this.collectionGroup = collectionGroup;
        this.explicitOrderBy = explicitOrderBy;
        this.filters = filters;
        this.limit = limit;
        this.limitType = limitType;
        this.startAt = startAt;
        this.endAt = endAt;
        this.memoizedOrderBy = null;
        // The corresponding `Target` of this `Query` instance.
        this.memoizedTarget = null;
        if (this.startAt)
            ;
        if (this.endAt)
            ;
    }
    return QueryImpl;
}());
/** Creates a new Query for a query that matches all documents at `path` */
function newQueryForPath(path) {
    return new QueryImpl(path);
}
function hasLimitToLast(query) {
    return !isNullOrUndefined(query.limit) && query.limitType === "L" /* Last */;
}
function getFirstOrderByField(query) {
    return query.explicitOrderBy.length > 0
        ? query.explicitOrderBy[0].field
        : null;
}
function getInequalityFilterField(query) {
    for (var _i = 0, _c = query.filters; _i < _c.length; _i++) {
        var filter = _c[_i];
        if (filter.isInequality()) {
            return filter.field;
        }
    }
    return null;
}
/**
 * Checks if any of the provided Operators are included in the query and
 * returns the first one that is, or null if none are.
 */
function findFilterOperator(query, operators) {
    for (var _i = 0, _c = query.filters; _i < _c.length; _i++) {
        var filter = _c[_i];
        if (operators.indexOf(filter.op) >= 0) {
            return filter.op;
        }
    }
    return null;
}
/**
 * Creates a new Query for a collection group query that matches all documents
 * within the provided collection group.
 */
function newQueryForCollectionGroup(collectionId) {
    return new QueryImpl(ResourcePath.emptyPath(), collectionId);
}
/**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */
function isCollectionGroupQuery(query) {
    return query.collectionGroup !== null;
}
/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */
function queryOrderBy(query) {
    var queryImpl = debugCast(query);
    if (queryImpl.memoizedOrderBy === null) {
        queryImpl.memoizedOrderBy = [];
        var inequalityField = getInequalityFilterField(queryImpl);
        var firstOrderByField = getFirstOrderByField(queryImpl);
        if (inequalityField !== null && firstOrderByField === null) {
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            if (!inequalityField.isKeyField()) {
                queryImpl.memoizedOrderBy.push(new OrderBy(inequalityField));
            }
            queryImpl.memoizedOrderBy.push(new OrderBy(FieldPath$1.keyField(), "asc" /* ASCENDING */));
        }
        else {
            var foundKeyOrdering = false;
            for (var _i = 0, _c = queryImpl.explicitOrderBy; _i < _c.length; _i++) {
                var orderBy_1 = _c[_i];
                queryImpl.memoizedOrderBy.push(orderBy_1);
                if (orderBy_1.field.isKeyField()) {
                    foundKeyOrdering = true;
                }
            }
            if (!foundKeyOrdering) {
                // The order of the implicit key ordering always matches the last
                // explicit order by
                var lastDirection = queryImpl.explicitOrderBy.length > 0
                    ? queryImpl.explicitOrderBy[queryImpl.explicitOrderBy.length - 1]
                        .dir
                    : "asc" /* ASCENDING */;
                queryImpl.memoizedOrderBy.push(new OrderBy(FieldPath$1.keyField(), lastDirection));
            }
        }
    }
    return queryImpl.memoizedOrderBy;
}
/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */
function queryToTarget(query) {
    var queryImpl = debugCast(query);
    if (!queryImpl.memoizedTarget) {
        if (queryImpl.limitType === "F" /* First */) {
            queryImpl.memoizedTarget = newTarget(queryImpl.path, queryImpl.collectionGroup, queryOrderBy(queryImpl), queryImpl.filters, queryImpl.limit, queryImpl.startAt, queryImpl.endAt);
        }
        else {
            // Flip the orderBy directions since we want the last results
            var orderBys = [];
            for (var _i = 0, _c = queryOrderBy(queryImpl); _i < _c.length; _i++) {
                var orderBy_2 = _c[_i];
                var dir = orderBy_2.dir === "desc" /* DESCENDING */
                    ? "asc" /* ASCENDING */
                    : "desc" /* DESCENDING */;
                orderBys.push(new OrderBy(orderBy_2.field, dir));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
            var startAt_1 = queryImpl.endAt
                ? new Bound(queryImpl.endAt.position, !queryImpl.endAt.before)
                : null;
            var endAt_1 = queryImpl.startAt
                ? new Bound(queryImpl.startAt.position, !queryImpl.startAt.before)
                : null;
            // Now return as a LimitType.First query.
            queryImpl.memoizedTarget = newTarget(queryImpl.path, queryImpl.collectionGroup, orderBys, queryImpl.filters, queryImpl.limit, startAt_1, endAt_1);
        }
    }
    return queryImpl.memoizedTarget;
}
function queryWithAddedFilter(query, filter) {
    var newFilters = query.filters.concat([filter]);
    return new QueryImpl(query.path, query.collectionGroup, query.explicitOrderBy.slice(), newFilters, query.limit, query.limitType, query.startAt, query.endAt);
}
function queryWithAddedOrderBy(query, orderBy) {
    // TODO(dimond): validate that orderBy does not list the same key twice.
    var newOrderBy = query.explicitOrderBy.concat([orderBy]);
    return new QueryImpl(query.path, query.collectionGroup, newOrderBy, query.filters.slice(), query.limit, query.limitType, query.startAt, query.endAt);
}
function queryWithLimit(query, limit, limitType) {
    return new QueryImpl(query.path, query.collectionGroup, query.explicitOrderBy.slice(), query.filters.slice(), limit, limitType, query.startAt, query.endAt);
}
function queryWithStartAt(query, bound) {
    return new QueryImpl(query.path, query.collectionGroup, query.explicitOrderBy.slice(), query.filters.slice(), query.limit, query.limitType, bound, query.endAt);
}
function queryWithEndAt(query, bound) {
    return new QueryImpl(query.path, query.collectionGroup, query.explicitOrderBy.slice(), query.filters.slice(), query.limit, query.limitType, query.startAt, bound);
}
function queryEquals(left, right) {
    return (targetEquals(queryToTarget(left), queryToTarget(right)) &&
        left.limitType === right.limitType);
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
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */
function toDouble(serializer, value) {
    if (serializer.useProto3Json) {
        if (isNaN(value)) {
            return { doubleValue: 'NaN' };
        }
        else if (value === Infinity) {
            return { doubleValue: 'Infinity' };
        }
        else if (value === -Infinity) {
            return { doubleValue: '-Infinity' };
        }
    }
    return { doubleValue: isNegativeZero(value) ? '-0' : value };
}
/**
 * Returns an IntegerValue for `value`.
 */
function toInteger(value) {
    return { integerValue: '' + value };
}
/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */
function toNumber(serializer, value) {
    return isSafeInteger(value) ? toInteger(value) : toDouble(serializer, value);
}
/**
 * @license
 * Copyright 2018 Google LLC
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
/** Used to represent a field transform on a mutation. */
var TransformOperation = /** @class */ (function () {
    function TransformOperation() {
        // Make sure that the structural type of `TransformOperation` is unique.
        // See https://github.com/microsoft/TypeScript/issues/5451
        this._ = undefined;
    }
    return TransformOperation;
}());
/** Transforms a value into a server-generated timestamp. */
var ServerTimestampTransform = /** @class */ (function (_super) {
    tslib.__extends(ServerTimestampTransform, _super);
    function ServerTimestampTransform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerTimestampTransform;
}(TransformOperation));
/** Transforms an array value via a union operation. */
var ArrayUnionTransformOperation = /** @class */ (function (_super) {
    tslib.__extends(ArrayUnionTransformOperation, _super);
    function ArrayUnionTransformOperation(elements) {
        var _this = _super.call(this) || this;
        _this.elements = elements;
        return _this;
    }
    return ArrayUnionTransformOperation;
}(TransformOperation));
/** Transforms an array value via a remove operation. */
var ArrayRemoveTransformOperation = /** @class */ (function (_super) {
    tslib.__extends(ArrayRemoveTransformOperation, _super);
    function ArrayRemoveTransformOperation(elements) {
        var _this = _super.call(this) || this;
        _this.elements = elements;
        return _this;
    }
    return ArrayRemoveTransformOperation;
}(TransformOperation));
/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */
var NumericIncrementTransformOperation = /** @class */ (function (_super) {
    tslib.__extends(NumericIncrementTransformOperation, _super);
    function NumericIncrementTransformOperation(serializer, operand) {
        var _this = _super.call(this) || this;
        _this.serializer = serializer;
        _this.operand = operand;
        return _this;
    }
    return NumericIncrementTransformOperation;
}(TransformOperation));
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
/** A field path and the TransformOperation to perform upon it. */
var FieldTransform = /** @class */ (function () {
    function FieldTransform(field, transform) {
        this.field = field;
        this.transform = transform;
    }
    return FieldTransform;
}());
/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */
var Precondition = /** @class */ (function () {
    function Precondition(updateTime, exists) {
        this.updateTime = updateTime;
        this.exists = exists;
    }
    /** Creates a new empty Precondition. */
    Precondition.none = function () {
        return new Precondition();
    };
    /** Creates a new Precondition with an exists flag. */
    Precondition.exists = function (exists) {
        return new Precondition(undefined, exists);
    };
    /** Creates a new Precondition based on a version a document exists at. */
    Precondition.updateTime = function (version) {
        return new Precondition(version);
    };
    Object.defineProperty(Precondition.prototype, "isNone", {
        /** Returns whether this Precondition is empty. */
        get: function () {
            return this.updateTime === undefined && this.exists === undefined;
        },
        enumerable: false,
        configurable: true
    });
    Precondition.prototype.isEqual = function (other) {
        return (this.exists === other.exists &&
            (this.updateTime
                ? !!other.updateTime && this.updateTime.isEqual(other.updateTime)
                : !other.updateTime));
    };
    return Precondition;
}());
/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `applySetMutationToRemoteDocument()` for an
 * example).
 */
var Mutation = /** @class */ (function () {
    function Mutation() {
    }
    return Mutation;
}());
/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */
var SetMutation = /** @class */ (function (_super) {
    tslib.__extends(SetMutation, _super);
    function SetMutation(key, value, precondition, fieldTransforms) {
        if (fieldTransforms === void 0) { fieldTransforms = []; }
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.value = value;
        _this.precondition = precondition;
        _this.fieldTransforms = fieldTransforms;
        _this.type = 0 /* Set */;
        return _this;
    }
    return SetMutation;
}(Mutation));
/**
 * A mutation that modifies fields of the document at the given key with the
 * given values. The values are applied through a field mask:
 *
 *  * When a field is in both the mask and the values, the corresponding field
 *    is updated.
 *  * When a field is in neither the mask nor the values, the corresponding
 *    field is unmodified.
 *  * When a field is in the mask but not in the values, the corresponding field
 *    is deleted.
 *  * When a field is not in the mask but is in the values, the values map is
 *    ignored.
 */
var PatchMutation = /** @class */ (function (_super) {
    tslib.__extends(PatchMutation, _super);
    function PatchMutation(key, data, fieldMask, precondition, fieldTransforms) {
        if (fieldTransforms === void 0) { fieldTransforms = []; }
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.data = data;
        _this.fieldMask = fieldMask;
        _this.precondition = precondition;
        _this.fieldTransforms = fieldTransforms;
        _this.type = 1 /* Patch */;
        return _this;
    }
    return PatchMutation;
}(Mutation));
/** A mutation that deletes the document at the given key. */
var DeleteMutation = /** @class */ (function (_super) {
    tslib.__extends(DeleteMutation, _super);
    function DeleteMutation(key, precondition) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.precondition = precondition;
        _this.type = 2 /* Delete */;
        _this.fieldTransforms = [];
        return _this;
    }
    return DeleteMutation;
}(Mutation));
/**
 * A mutation that verifies the existence of the document at the given key with
 * the provided precondition.
 *
 * The `verify` operation is only used in Transactions, and this class serves
 * primarily to facilitate serialization into protos.
 */
var VerifyMutation = /** @class */ (function (_super) {
    tslib.__extends(VerifyMutation, _super);
    function VerifyMutation(key, precondition) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.precondition = precondition;
        _this.type = 3 /* Verify */;
        _this.fieldTransforms = [];
        return _this;
    }
    return VerifyMutation;
}(Mutation));
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
var DIRECTIONS = (function () {
    var dirs = {};
    dirs["asc" /* ASCENDING */] = 'ASCENDING';
    dirs["desc" /* DESCENDING */] = 'DESCENDING';
    return dirs;
})();
var OPERATORS = (function () {
    var ops = {};
    ops["<" /* LESS_THAN */] = 'LESS_THAN';
    ops["<=" /* LESS_THAN_OR_EQUAL */] = 'LESS_THAN_OR_EQUAL';
    ops[">" /* GREATER_THAN */] = 'GREATER_THAN';
    ops[">=" /* GREATER_THAN_OR_EQUAL */] = 'GREATER_THAN_OR_EQUAL';
    ops["==" /* EQUAL */] = 'EQUAL';
    ops["!=" /* NOT_EQUAL */] = 'NOT_EQUAL';
    ops["array-contains" /* ARRAY_CONTAINS */] = 'ARRAY_CONTAINS';
    ops["in" /* IN */] = 'IN';
    ops["not-in" /* NOT_IN */] = 'NOT_IN';
    ops["array-contains-any" /* ARRAY_CONTAINS_ANY */] = 'ARRAY_CONTAINS_ANY';
    return ops;
})();
function assertPresent(value, description) {
}
/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */
var JsonProtoSerializer = /** @class */ (function () {
    function JsonProtoSerializer(databaseId, useProto3Json) {
        this.databaseId = databaseId;
        this.useProto3Json = useProto3Json;
    }
    return JsonProtoSerializer;
}());
/**
 * Returns a value for a number (or null) that's appropriate to put into
 * a google.protobuf.Int32Value proto.
 * DO NOT USE THIS FOR ANYTHING ELSE.
 * This method cheats. It's typed as returning "number" because that's what
 * our generated proto interfaces say Int32Value must be. But GRPC actually
 * expects a { value: <number> } struct.
 */
function toInt32Proto(serializer, val) {
    if (serializer.useProto3Json || isNullOrUndefined(val)) {
        return val;
    }
    else {
        return { value: val };
    }
}
/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */
function toTimestamp(serializer, timestamp) {
    if (serializer.useProto3Json) {
        // Serialize to ISO-8601 date format, but with full nano resolution.
        // Since JS Date has only millis, let's only use it for the seconds and
        // then manually add the fractions to the end.
        var jsDateStr = new Date(timestamp.seconds * 1000).toISOString();
        // Remove .xxx frac part and Z in the end.
        var strUntilSeconds = jsDateStr.replace(/\.\d*/, '').replace('Z', '');
        // Pad the fraction out to 9 digits (nanos).
        var nanoStr = ('000000000' + timestamp.nanoseconds).slice(-9);
        return strUntilSeconds + "." + nanoStr + "Z";
    }
    else {
        return {
            seconds: '' + timestamp.seconds,
            nanos: timestamp.nanoseconds
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        };
    }
}
function fromTimestamp(date) {
    var timestamp = normalizeTimestamp(date);
    return new Timestamp(timestamp.seconds, timestamp.nanos);
}
/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */
function toBytes(serializer, bytes) {
    if (serializer.useProto3Json) {
        return bytes.toBase64();
    }
    else {
        return bytes.toUint8Array();
    }
}
function toVersion(serializer, version) {
    return toTimestamp(serializer, version.toTimestamp());
}
function fromVersion(version) {
    hardAssert(!!version);
    return SnapshotVersion.fromTimestamp(fromTimestamp(version));
}
function toResourceName(databaseId, path) {
    return fullyQualifiedPrefixPath(databaseId)
        .child('documents')
        .child(path)
        .canonicalString();
}
function fromResourceName(name) {
    var resource = ResourcePath.fromString(name);
    hardAssert(isValidResourceName(resource));
    return resource;
}
function toName(serializer, key) {
    return toResourceName(serializer.databaseId, key.path);
}
function fromName(serializer, name) {
    var resource = fromResourceName(name);
    if (resource.get(1) !== serializer.databaseId.projectId) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Tried to deserialize key from different project: ' +
            resource.get(1) +
            ' vs ' +
            serializer.databaseId.projectId);
    }
    if (resource.get(3) !== serializer.databaseId.database) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Tried to deserialize key from different database: ' +
            resource.get(3) +
            ' vs ' +
            serializer.databaseId.database);
    }
    return new DocumentKey(extractLocalPathFromResourceName(resource));
}
function toQueryPath(serializer, path) {
    return toResourceName(serializer.databaseId, path);
}
function getEncodedDatabaseId(serializer) {
    var path = new ResourcePath([
        'projects',
        serializer.databaseId.projectId,
        'databases',
        serializer.databaseId.database
    ]);
    return path.canonicalString();
}
function fullyQualifiedPrefixPath(databaseId) {
    return new ResourcePath([
        'projects',
        databaseId.projectId,
        'databases',
        databaseId.database
    ]);
}
function extractLocalPathFromResourceName(resourceName) {
    hardAssert(resourceName.length > 4 && resourceName.get(4) === 'documents');
    return resourceName.popFirst(5);
}
/** Creates a Document proto from key and fields (but no create/update time) */
function toMutationDocument(serializer, key, fields) {
    return {
        name: toName(serializer, key),
        fields: fields.value.mapValue.fields
    };
}
function fromDocument(serializer, document, hasCommittedMutations) {
    var key = fromName(serializer, document.name);
    var version = fromVersion(document.updateTime);
    var data = new ObjectValue({ mapValue: { fields: document.fields } });
    var result = MutableDocument.newFoundDocument(key, version, data);
    if (hasCommittedMutations) {
        result.setHasCommittedMutations();
    }
    return hasCommittedMutations ? result.setHasCommittedMutations() : result;
}
function fromFound(serializer, doc) {
    hardAssert(!!doc.found);
    assertPresent(doc.found.name);
    assertPresent(doc.found.updateTime);
    var key = fromName(serializer, doc.found.name);
    var version = fromVersion(doc.found.updateTime);
    var data = new ObjectValue({ mapValue: { fields: doc.found.fields } });
    return MutableDocument.newFoundDocument(key, version, data);
}
function fromMissing(serializer, result) {
    hardAssert(!!result.missing);
    hardAssert(!!result.readTime);
    var key = fromName(serializer, result.missing);
    var version = fromVersion(result.readTime);
    return MutableDocument.newNoDocument(key, version);
}
function fromBatchGetDocumentsResponse(serializer, result) {
    if ('found' in result) {
        return fromFound(serializer, result);
    }
    else if ('missing' in result) {
        return fromMissing(serializer, result);
    }
    return fail();
}
function toMutation(serializer, mutation) {
    var result;
    if (mutation instanceof SetMutation) {
        result = {
            update: toMutationDocument(serializer, mutation.key, mutation.value)
        };
    }
    else if (mutation instanceof DeleteMutation) {
        result = { delete: toName(serializer, mutation.key) };
    }
    else if (mutation instanceof PatchMutation) {
        result = {
            update: toMutationDocument(serializer, mutation.key, mutation.data),
            updateMask: toDocumentMask(mutation.fieldMask)
        };
    }
    else if (mutation instanceof VerifyMutation) {
        result = {
            verify: toName(serializer, mutation.key)
        };
    }
    else {
        return fail();
    }
    if (mutation.fieldTransforms.length > 0) {
        result.updateTransforms = mutation.fieldTransforms.map(function (transform) { return toFieldTransform(serializer, transform); });
    }
    if (!mutation.precondition.isNone) {
        result.currentDocument = toPrecondition(serializer, mutation.precondition);
    }
    return result;
}
function toPrecondition(serializer, precondition) {
    if (precondition.updateTime !== undefined) {
        return {
            updateTime: toVersion(serializer, precondition.updateTime)
        };
    }
    else if (precondition.exists !== undefined) {
        return { exists: precondition.exists };
    }
    else {
        return fail();
    }
}
function toFieldTransform(serializer, fieldTransform) {
    var transform = fieldTransform.transform;
    if (transform instanceof ServerTimestampTransform) {
        return {
            fieldPath: fieldTransform.field.canonicalString(),
            setToServerValue: 'REQUEST_TIME'
        };
    }
    else if (transform instanceof ArrayUnionTransformOperation) {
        return {
            fieldPath: fieldTransform.field.canonicalString(),
            appendMissingElements: {
                values: transform.elements
            }
        };
    }
    else if (transform instanceof ArrayRemoveTransformOperation) {
        return {
            fieldPath: fieldTransform.field.canonicalString(),
            removeAllFromArray: {
                values: transform.elements
            }
        };
    }
    else if (transform instanceof NumericIncrementTransformOperation) {
        return {
            fieldPath: fieldTransform.field.canonicalString(),
            increment: transform.operand
        };
    }
    else {
        throw fail();
    }
}
function toQueryTarget(serializer, target) {
    // Dissect the path into parent, collectionId, and optional key filter.
    var result = { structuredQuery: {} };
    var path = target.path;
    if (target.collectionGroup !== null) {
        result.parent = toQueryPath(serializer, path);
        result.structuredQuery.from = [
            {
                collectionId: target.collectionGroup,
                allDescendants: true
            }
        ];
    }
    else {
        result.parent = toQueryPath(serializer, path.popLast());
        result.structuredQuery.from = [{ collectionId: path.lastSegment() }];
    }
    var where = toFilter(target.filters);
    if (where) {
        result.structuredQuery.where = where;
    }
    var orderBy = toOrder(target.orderBy);
    if (orderBy) {
        result.structuredQuery.orderBy = orderBy;
    }
    var limit = toInt32Proto(serializer, target.limit);
    if (limit !== null) {
        result.structuredQuery.limit = limit;
    }
    if (target.startAt) {
        result.structuredQuery.startAt = toCursor(target.startAt);
    }
    if (target.endAt) {
        result.structuredQuery.endAt = toCursor(target.endAt);
    }
    return result;
}
function toFilter(filters) {
    if (filters.length === 0) {
        return;
    }
    var protos = filters.map(function (filter) {
        return toUnaryOrFieldFilter(filter);
    });
    if (protos.length === 1) {
        return protos[0];
    }
    return { compositeFilter: { op: 'AND', filters: protos } };
}
function toOrder(orderBys) {
    if (orderBys.length === 0) {
        return;
    }
    return orderBys.map(function (order) { return toPropertyOrder(order); });
}
function toCursor(cursor) {
    return {
        before: cursor.before,
        values: cursor.position
    };
}
// visible for testing
function toDirection(dir) {
    return DIRECTIONS[dir];
}
// visible for testing
function toOperatorName(op) {
    return OPERATORS[op];
}
function toFieldPathReference(path) {
    return { fieldPath: path.canonicalString() };
}
// visible for testing
function toPropertyOrder(orderBy) {
    return {
        field: toFieldPathReference(orderBy.field),
        direction: toDirection(orderBy.dir)
    };
}
// visible for testing
function toUnaryOrFieldFilter(filter) {
    if (filter.op === "==" /* EQUAL */) {
        if (isNanValue(filter.value)) {
            return {
                unaryFilter: {
                    field: toFieldPathReference(filter.field),
                    op: 'IS_NAN'
                }
            };
        }
        else if (isNullValue(filter.value)) {
            return {
                unaryFilter: {
                    field: toFieldPathReference(filter.field),
                    op: 'IS_NULL'
                }
            };
        }
    }
    else if (filter.op === "!=" /* NOT_EQUAL */) {
        if (isNanValue(filter.value)) {
            return {
                unaryFilter: {
                    field: toFieldPathReference(filter.field),
                    op: 'IS_NOT_NAN'
                }
            };
        }
        else if (isNullValue(filter.value)) {
            return {
                unaryFilter: {
                    field: toFieldPathReference(filter.field),
                    op: 'IS_NOT_NULL'
                }
            };
        }
    }
    return {
        fieldFilter: {
            field: toFieldPathReference(filter.field),
            op: toOperatorName(filter.op),
            value: filter.value
        }
    };
}
function toDocumentMask(fieldMask) {
    var canonicalFields = [];
    fieldMask.fields.forEach(function (field) { return canonicalFields.push(field.canonicalString()); });
    return {
        fieldPaths: canonicalFields
    };
}
function isValidResourceName(path) {
    // Resource names have at least 4 components (project ID, database ID)
    return (path.length >= 4 &&
        path.get(0) === 'projects' &&
        path.get(2) === 'databases');
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
function newSerializer(databaseId) {
    return new JsonProtoSerializer(databaseId, /* useProto3Json= */ true);
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
var LOG_TAG$2 = 'ExponentialBackoff';
/**
 * Initial backoff time in milliseconds after an error.
 * Set to 1s according to https://cloud.google.com/apis/design/errors.
 */
var DEFAULT_BACKOFF_INITIAL_DELAY_MS = 1000;
var DEFAULT_BACKOFF_FACTOR = 1.5;
/** Maximum backoff time in milliseconds */
var DEFAULT_BACKOFF_MAX_DELAY_MS = 60 * 1000;
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
var ExponentialBackoff = /** @class */ (function () {
    function ExponentialBackoff(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    queue, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    timerId, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    initialDelayMs, 
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */
    backoffFactor, 
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */
    maxDelayMs) {
        if (initialDelayMs === void 0) { initialDelayMs = DEFAULT_BACKOFF_INITIAL_DELAY_MS; }
        if (backoffFactor === void 0) { backoffFactor = DEFAULT_BACKOFF_FACTOR; }
        if (maxDelayMs === void 0) { maxDelayMs = DEFAULT_BACKOFF_MAX_DELAY_MS; }
        this.queue = queue;
        this.timerId = timerId;
        this.initialDelayMs = initialDelayMs;
        this.backoffFactor = backoffFactor;
        this.maxDelayMs = maxDelayMs;
        this.currentBaseMs = 0;
        this.timerPromise = null;
        /** The last backoff attempt, as epoch milliseconds. */
        this.lastAttemptTime = Date.now();
        this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */
    ExponentialBackoff.prototype.reset = function () {
        this.currentBaseMs = 0;
    };
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    ExponentialBackoff.prototype.resetToMax = function () {
        this.currentBaseMs = this.maxDelayMs;
    };
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    ExponentialBackoff.prototype.backoffAndRun = function (op) {
        var _this = this;
        // Cancel any pending backoff operation.
        this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        var desiredDelayWithJitterMs = Math.floor(this.currentBaseMs + this.jitterDelayMs());
        // Guard against lastAttemptTime being in the future due to a clock change.
        var delaySoFarMs = Math.max(0, Date.now() - this.lastAttemptTime);
        // Guard against the backoff delay already being past.
        var remainingDelayMs = Math.max(0, desiredDelayWithJitterMs - delaySoFarMs);
        if (remainingDelayMs > 0) {
            logDebug(LOG_TAG$2, "Backing off for " + remainingDelayMs + " ms " +
                ("(base delay: " + this.currentBaseMs + " ms, ") +
                ("delay with jitter: " + desiredDelayWithJitterMs + " ms, ") +
                ("last attempt: " + delaySoFarMs + " ms ago)"));
        }
        this.timerPromise = this.queue.enqueueAfterDelay(this.timerId, remainingDelayMs, function () {
            _this.lastAttemptTime = Date.now();
            return op();
        });
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.currentBaseMs *= this.backoffFactor;
        if (this.currentBaseMs < this.initialDelayMs) {
            this.currentBaseMs = this.initialDelayMs;
        }
        if (this.currentBaseMs > this.maxDelayMs) {
            this.currentBaseMs = this.maxDelayMs;
        }
    };
    ExponentialBackoff.prototype.skipBackoff = function () {
        if (this.timerPromise !== null) {
            this.timerPromise.skipDelay();
            this.timerPromise = null;
        }
    };
    ExponentialBackoff.prototype.cancel = function () {
        if (this.timerPromise !== null) {
            this.timerPromise.cancel();
            this.timerPromise = null;
        }
    };
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
    ExponentialBackoff.prototype.jitterDelayMs = function () {
        return (Math.random() - 0.5) * this.currentBaseMs;
    };
    return ExponentialBackoff;
}());
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
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */
var Datastore = /** @class */ (function () {
    function Datastore() {
    }
    return Datastore;
}());
/**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */
var DatastoreImpl = /** @class */ (function (_super) {
    tslib.__extends(DatastoreImpl, _super);
    function DatastoreImpl(credentials, connection, serializer) {
        var _this = _super.call(this) || this;
        _this.credentials = credentials;
        _this.connection = connection;
        _this.serializer = serializer;
        _this.terminated = false;
        return _this;
    }
    DatastoreImpl.prototype.verifyInitialized = function () {
        if (this.terminated) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, 'The client has already been terminated.');
        }
    };
    /** Gets an auth token and invokes the provided RPC. */
    DatastoreImpl.prototype.invokeRPC = function (rpcName, path, request) {
        var _this = this;
        this.verifyInitialized();
        return this.credentials
            .getToken()
            .then(function (token) {
            return _this.connection.invokeRPC(rpcName, path, request, token);
        })
            .catch(function (error) {
            if (error.name === 'FirebaseError') {
                if (error.code === Code.UNAUTHENTICATED) {
                    _this.credentials.invalidateToken();
                }
                throw error;
            }
            else {
                throw new FirestoreError(Code.UNKNOWN, error.toString());
            }
        });
    };
    /** Gets an auth token and invokes the provided RPC with streamed results. */
    DatastoreImpl.prototype.invokeStreamingRPC = function (rpcName, path, request) {
        var _this = this;
        this.verifyInitialized();
        return this.credentials
            .getToken()
            .then(function (token) {
            return _this.connection.invokeStreamingRPC(rpcName, path, request, token);
        })
            .catch(function (error) {
            if (error.name === 'FirebaseError') {
                if (error.code === Code.UNAUTHENTICATED) {
                    _this.credentials.invalidateToken();
                }
                throw error;
            }
            else {
                throw new FirestoreError(Code.UNKNOWN, error.toString());
            }
        });
    };
    DatastoreImpl.prototype.terminate = function () {
        this.terminated = true;
    };
    return DatastoreImpl;
}(Datastore));
// TODO(firestorexp): Make sure there is only one Datastore instance per
// firestore-exp client.
function newDatastore(credentials, connection, serializer) {
    return new DatastoreImpl(credentials, connection, serializer);
}
function invokeCommitRpc(datastore, mutations) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var datastoreImpl, path, request;
        return tslib.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    datastoreImpl = debugCast(datastore);
                    path = getEncodedDatabaseId(datastoreImpl.serializer) + '/documents';
                    request = {
                        writes: mutations.map(function (m) { return toMutation(datastoreImpl.serializer, m); })
                    };
                    return [4 /*yield*/, datastoreImpl.invokeRPC('Commit', path, request)];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function invokeBatchGetDocumentsRpc(datastore, keys) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var datastoreImpl, path, request, response, docs, result;
        return tslib.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    datastoreImpl = debugCast(datastore);
                    path = getEncodedDatabaseId(datastoreImpl.serializer) + '/documents';
                    request = {
                        documents: keys.map(function (k) { return toName(datastoreImpl.serializer, k); })
                    };
                    return [4 /*yield*/, datastoreImpl.invokeStreamingRPC('BatchGetDocuments', path, request)];
                case 1:
                    response = _c.sent();
                    docs = new Map();
                    response.forEach(function (proto) {
                        var doc = fromBatchGetDocumentsResponse(datastoreImpl.serializer, proto);
                        docs.set(doc.key.toString(), doc);
                    });
                    result = [];
                    keys.forEach(function (key) {
                        var doc = docs.get(key.toString());
                        hardAssert(!!doc);
                        result.push(doc);
                    });
                    return [2 /*return*/, result];
            }
        });
    });
}
function invokeRunQueryRpc(datastore, query) {
    return tslib.__awaiter(this, void 0, void 0, function () {
        var datastoreImpl, request, response;
        return tslib.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    datastoreImpl = debugCast(datastore);
                    request = toQueryTarget(datastoreImpl.serializer, queryToTarget(query));
                    return [4 /*yield*/, datastoreImpl.invokeStreamingRPC('RunQuery', request.parent, { structuredQuery: request.structuredQuery })];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, (response
                            // Omit RunQueryResponses that only contain readTimes.
                            .filter(function (proto) { return !!proto.document; })
                            .map(function (proto) { return fromDocument(datastoreImpl.serializer, proto.document, undefined); }))];
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
var LOG_TAG$1 = 'ComponentProvider';
/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
 */
var datastoreInstances = new Map();
/**
 * Returns an initialized and started Datastore for the given Firestore
 * instance. Callers must invoke removeComponents() when the Firestore
 * instance is terminated.
 */
function getDatastore(firestore) {
    if (firestore._terminated) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, 'The client has already been terminated.');
    }
    if (!datastoreInstances.has(firestore)) {
        logDebug(LOG_TAG$1, 'Initializing Datastore');
        var databaseInfo = makeDatabaseInfo(firestore._databaseId, firestore.app.options.appId || '', firestore._persistenceKey, firestore._freezeSettings());
        var connection = newConnection(databaseInfo);
        var serializer = newSerializer(firestore._databaseId);
        var datastore = newDatastore(firestore._credentials, connection, serializer);
        datastoreInstances.set(firestore, datastore);
    }
    return datastoreInstances.get(firestore);
}
/**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */
function removeComponents(firestore) {
    var datastore = datastoreInstances.get(firestore);
    if (datastore) {
        logDebug(LOG_TAG$1, 'Removing Datastore');
        datastoreInstances.delete(firestore);
        datastore.terminate();
    }
}
function makeDatabaseInfo(databaseId, appId, persistenceKey, settings) {
    return new DatabaseInfo(databaseId, appId, persistenceKey, settings.host, settings.ssl, settings.experimentalForceLongPolling, settings.experimentalAutoDetectLongPolling, settings.useFetchStreams);
}
/**
 * @license
 * Copyright 2018 Google LLC
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
var LRU_COLLECTION_DISABLED = -1;
var LRU_DEFAULT_CACHE_SIZE_BYTES = 40 * 1024 * 1024;
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
/** Verifies whether `e` is an IndexedDbTransactionError. */
function isIndexedDbTransactionError(e) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return e.name === 'IndexedDbTransactionError';
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
var LRU_MINIMUM_CACHE_SIZE_BYTES = 1 * 1024 * 1024;
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
// settings() defaults:
var DEFAULT_HOST = 'firestore.googleapis.com';
var DEFAULT_SSL = true;
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied firestore.Settings object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */
var FirestoreSettings = /** @class */ (function () {
    function FirestoreSettings(settings) {
        var _a;
        if (settings.host === undefined) {
            if (settings.ssl !== undefined) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            }
            this.host = DEFAULT_HOST;
            this.ssl = DEFAULT_SSL;
        }
        else {
            this.host = settings.host;
            this.ssl = (_a = settings.ssl) !== null && _a !== void 0 ? _a : DEFAULT_SSL;
        }
        this.credentials = settings.credentials;
        this.ignoreUndefinedProperties = !!settings.ignoreUndefinedProperties;
        if (settings.cacheSizeBytes === undefined) {
            this.cacheSizeBytes = LRU_DEFAULT_CACHE_SIZE_BYTES;
        }
        else {
            if (settings.cacheSizeBytes !== LRU_COLLECTION_DISABLED &&
                settings.cacheSizeBytes < LRU_MINIMUM_CACHE_SIZE_BYTES) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "cacheSizeBytes must be at least " + LRU_MINIMUM_CACHE_SIZE_BYTES);
            }
            else {
                this.cacheSizeBytes = settings.cacheSizeBytes;
            }
        }
        this.experimentalForceLongPolling = !!settings.experimentalForceLongPolling;
        this.experimentalAutoDetectLongPolling = !!settings.experimentalAutoDetectLongPolling;
        this.useFetchStreams = !!settings.useFetchStreams;
        validateIsNotUsedTogether('experimentalForceLongPolling', settings.experimentalForceLongPolling, 'experimentalAutoDetectLongPolling', settings.experimentalAutoDetectLongPolling);
    }
    FirestoreSettings.prototype.isEqual = function (other) {
        return (this.host === other.host &&
            this.ssl === other.ssl &&
            this.credentials === other.credentials &&
            this.cacheSizeBytes === other.cacheSizeBytes &&
            this.experimentalForceLongPolling ===
                other.experimentalForceLongPolling &&
            this.experimentalAutoDetectLongPolling ===
                other.experimentalAutoDetectLongPolling &&
            this.ignoreUndefinedProperties === other.ignoreUndefinedProperties &&
            this.useFetchStreams === other.useFetchStreams);
    };
    return FirestoreSettings;
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
/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
var FirebaseFirestore = /** @class */ (function () {
    /** @hideconstructor */
    function FirebaseFirestore(databaseIdOrApp, authProvider) {
        this.type = 'firestore-lite';
        this._persistenceKey = '(lite)';
        this._settings = new FirestoreSettings({});
        this._settingsFrozen = false;
        if (databaseIdOrApp instanceof DatabaseId) {
            this._databaseId = databaseIdOrApp;
            this._credentials = new EmptyCredentialsProvider();
        }
        else {
            this._app = databaseIdOrApp;
            this._databaseId = databaseIdFromApp(databaseIdOrApp);
            this._credentials = new FirebaseCredentialsProvider(authProvider);
        }
    }
    Object.defineProperty(FirebaseFirestore.prototype, "app", {
        /**
         * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
         * instance.
         */
        get: function () {
            if (!this._app) {
                throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is " +
                    'not available');
            }
            return this._app;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseFirestore.prototype, "_initialized", {
        get: function () {
            return this._settingsFrozen;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseFirestore.prototype, "_terminated", {
        get: function () {
            return this._terminateTask !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    FirebaseFirestore.prototype._setSettings = function (settings) {
        if (this._settingsFrozen) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, 'Firestore has already been started and its settings can no longer ' +
                'be changed. You can only modify settings before calling any other ' +
                'methods on a Firestore object.');
        }
        this._settings = new FirestoreSettings(settings);
        if (settings.credentials !== undefined) {
            this._credentials = makeCredentialsProvider(settings.credentials);
        }
    };
    FirebaseFirestore.prototype._getSettings = function () {
        return this._settings;
    };
    FirebaseFirestore.prototype._freezeSettings = function () {
        this._settingsFrozen = true;
        return this._settings;
    };
    FirebaseFirestore.prototype._delete = function () {
        if (!this._terminateTask) {
            this._terminateTask = this._terminate();
        }
        return this._terminateTask;
    };
    /** Returns a JSON-serializable representation of this Firestore instance. */
    FirebaseFirestore.prototype.toJSON = function () {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings
        };
    };
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */
    FirebaseFirestore.prototype._terminate = function () {
        removeComponents(this);
        return Promise.resolve();
    };
    return FirebaseFirestore;
}());
function databaseIdFromApp(app) {
    if (!Object.prototype.hasOwnProperty.apply(app.options, ['projectId'])) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
    }
    return new DatabaseId(app.options.projectId);
}
/**
 * Initializes a new instance of Cloud Firestore with the provided settings.
 * Can only be called before any other functions, including
 * {@link getFirestore}. If the custom settings are empty, this function is
 * equivalent to calling {@link getFirestore}.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} with which the `Firestore` instance will
 * be associated.
 * @param settings - A settings object to configure the `Firestore` instance.
 * @returns A newly initialized Firestore instance.
 */
function initializeFirestore(app$1, settings) {
    var provider = app._getProvider(app$1, 'firestore/lite');
    if (provider.isInitialized()) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, 'Firestore can only be initialized once per app.');
    }
    return provider.initialize({ options: settings });
}
/**
 * Returns the existing instance of Firestore that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned Firestore
 * instance is associated with.
 * @returns The `Firestore` instance of the provided app.
 */
function getFirestore(app$1) {
    if (app$1 === void 0) { app$1 = app.getApp(); }
    return app._getProvider(app$1, 'firestore/lite').getImmediate();
}
/**
 * Modify this instance to communicate with the Cloud Firestore emulator.
 *
 * Note: This must be called before this instance has been used to do any
 * operations.
 *
 * @param firestore - The Firestore instance to configure to connect to the
 * emulator.
 * @param host - the emulator host (ex: localhost).
 * @param port - the emulator port (ex: 9000).
 * @param options.mockUserToken - the mock auth token to use for unit testing
 * Security Rules.
 */
function useFirestoreEmulator(firestore, host, port, options) {
    if (options === void 0) { options = {}; }
    firestore = cast(firestore, FirebaseFirestore);
    var settings = firestore._getSettings();
    if (settings.host !== DEFAULT_HOST && settings.host !== host) {
        logWarn('Host has been set in both settings() and useEmulator(), emulator host ' +
            'will be used');
    }
    firestore._setSettings(Object.assign(Object.assign({}, settings), { host: host + ":" + port, ssl: false }));
    if (options.mockUserToken) {
        // Let createMockUserToken validate first (catches common mistakes like
        // invalid field "uid" and missing field "sub" / "user_id".)
        var token = util.createMockUserToken(options.mockUserToken);
        var uid = options.mockUserToken.sub || options.mockUserToken.user_id;
        if (!uid) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
        }
        firestore._credentials = new EmulatorCredentialsProvider(new OAuthToken(token, new User(uid)));
    }
}
/**
 * Terminates the provided Firestore instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` functions
 * may be used. Any other function will throw a `FirestoreError`. Termination
 * does not cancel any pending writes, and any promises that are awaiting a
 * response from the server will not be resolved.
 *
 * To restart after termination, create a new instance of FirebaseFirestore with
 * {@link getFirestore}.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all of
 * its resources or in combination with {@link clearIndexedDbPersistence} to
 * ensure that all local state is destroyed between test runs.
 *
 * @param firestore - The Firestore instance to terminate.
 * @returns A promise that is resolved when the instance has been successfully
 * terminated.
 */
function terminate(firestore) {
    firestore = cast(firestore, FirebaseFirestore);
    app._removeServiceInstance(firestore.app, 'firestore/lite');
    return firestore._delete();
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
function registerFirestore() {
    setSDKVersion(app.SDK_VERSION + "_lite");
    app._registerComponent(new component.Component('firestore/lite', function (container, _c) {
        var settings = _c.options;
        var app = container.getProvider('app-exp').getImmediate();
        var firestoreInstance = new FirebaseFirestore(app, container.getProvider('auth-internal'));
        if (settings) {
            firestoreInstance._setSettings(settings);
        }
        return firestoreInstance;
    }, "PUBLIC" /* PUBLIC */));
    app.registerVersion('firestore-lite', version$1, 'node');
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
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */
var DocumentReference = /** @class */ (function () {
    /** @hideconstructor */
    function DocumentReference(firestore, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    converter, _key) {
        this.converter = converter;
        this._key = _key;
        /** The type of this Firestore reference. */
        this.type = 'document';
        this.firestore = firestore;
    }
    Object.defineProperty(DocumentReference.prototype, "_path", {
        get: function () {
            return this._key.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentReference.prototype, "id", {
        /**
         * The document's identifier within its collection.
         */
        get: function () {
            return this._key.path.lastSegment();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentReference.prototype, "path", {
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */
        get: function () {
            return this._key.path.canonicalString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentReference.prototype, "parent", {
        /**
         * The collection this `DocumentReference` belongs to.
         */
        get: function () {
            return new CollectionReference(this.firestore, this.converter, this._key.path.popLast());
        },
        enumerable: false,
        configurable: true
    });
    DocumentReference.prototype.withConverter = function (converter) {
        return new DocumentReference(this.firestore, converter, this._key);
    };
    return DocumentReference;
}());
/**
 * A `Query` refers to a Query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */
var Query = /** @class */ (function () {
    // This is the lite version of the Query class in the main SDK.
    /** @hideconstructor protected */
    function Query(firestore, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    converter, _query) {
        this.converter = converter;
        this._query = _query;
        /** The type of this Firestore reference. */
        this.type = 'query';
        this.firestore = firestore;
    }
    Query.prototype.withConverter = function (converter) {
        return new Query(this.firestore, converter, this._query);
    };
    return Query;
}());
/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */
var CollectionReference = /** @class */ (function (_super) {
    tslib.__extends(CollectionReference, _super);
    /** @hideconstructor */
    function CollectionReference(firestore, converter, _path) {
        var _this = _super.call(this, firestore, converter, newQueryForPath(_path)) || this;
        _this._path = _path;
        /** The type of this Firestore reference. */
        _this.type = 'collection';
        return _this;
    }
    Object.defineProperty(CollectionReference.prototype, "id", {
        /** The collection's identifier. */
        get: function () {
            return this._query.path.lastSegment();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CollectionReference.prototype, "path", {
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */
        get: function () {
            return this._query.path.canonicalString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CollectionReference.prototype, "parent", {
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */
        get: function () {
            var parentPath = this._path.popLast();
            if (parentPath.isEmpty()) {
                return null;
            }
            else {
                return new DocumentReference(this.firestore, 
                /* converter= */ null, new DocumentKey(parentPath));
            }
        },
        enumerable: false,
        configurable: true
    });
    CollectionReference.prototype.withConverter = function (converter) {
        return new CollectionReference(this.firestore, converter, this._path);
    };
    return CollectionReference;
}(Query));
function collection(parent, path) {
    var pathSegments = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        pathSegments[_i - 2] = arguments[_i];
    }
    parent = util.getModularInstance(parent);
    validateNonEmptyArgument('collection', 'path', path);
    if (parent instanceof FirebaseFirestore) {
        var absolutePath = ResourcePath.fromString.apply(ResourcePath, tslib.__spreadArray([path], pathSegments));
        validateCollectionPath(absolutePath);
        return new CollectionReference(parent, /* converter= */ null, absolutePath);
    }
    else {
        if (!(parent instanceof DocumentReference) &&
            !(parent instanceof CollectionReference)) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Expected first argument to collection() to be a CollectionReference, ' +
                'a DocumentReference or FirebaseFirestore');
        }
        var absolutePath = ResourcePath.fromString.apply(ResourcePath, tslib.__spreadArray([parent.path], pathSegments)).child(ResourcePath.fromString(path));
        validateCollectionPath(absolutePath);
        return new CollectionReference(parent.firestore, 
        /* converter= */ null, absolutePath);
    }
}
// TODO(firestorelite): Consider using ErrorFactory -
// https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root Firestore instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */
function collectionGroup(firestore, collectionId) {
    firestore = cast(firestore, FirebaseFirestore);
    validateNonEmptyArgument('collectionGroup', 'collection id', collectionId);
    if (collectionId.indexOf('/') >= 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid collection ID '" + collectionId + "' passed to function " +
            "collectionGroup(). Collection IDs must not contain '/'.");
    }
    return new Query(firestore, 
    /* converter= */ null, newQueryForCollectionGroup(collectionId));
}
function doc(parent, path) {
    var pathSegments = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        pathSegments[_i - 2] = arguments[_i];
    }
    parent = util.getModularInstance(parent);
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    if (arguments.length === 1) {
        path = AutoId.newId();
    }
    validateNonEmptyArgument('doc', 'path', path);
    if (parent instanceof FirebaseFirestore) {
        var absolutePath = ResourcePath.fromString.apply(ResourcePath, tslib.__spreadArray([path], pathSegments));
        validateDocumentPath(absolutePath);
        return new DocumentReference(parent, 
        /* converter= */ null, new DocumentKey(absolutePath));
    }
    else {
        if (!(parent instanceof DocumentReference) &&
            !(parent instanceof CollectionReference)) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Expected first argument to collection() to be a CollectionReference, ' +
                'a DocumentReference or FirebaseFirestore');
        }
        var absolutePath = parent._path.child(ResourcePath.fromString.apply(ResourcePath, tslib.__spreadArray([path], pathSegments)));
        validateDocumentPath(absolutePath);
        return new DocumentReference(parent.firestore, parent instanceof CollectionReference ? parent.converter : null, new DocumentKey(absolutePath));
    }
}
/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */
function refEqual(left, right) {
    left = util.getModularInstance(left);
    right = util.getModularInstance(right);
    if ((left instanceof DocumentReference ||
        left instanceof CollectionReference) &&
        (right instanceof DocumentReference || right instanceof CollectionReference)) {
        return (left.firestore === right.firestore &&
            left.path === right.path &&
            left.converter === right.converter);
    }
    return false;
}
/**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */
function queryEqual(left, right) {
    left = util.getModularInstance(left);
    right = util.getModularInstance(right);
    if (left instanceof Query && right instanceof Query) {
        return (left.firestore === right.firestore &&
            queryEquals(left._query, right._query) &&
            left.converter === right.converter);
    }
    return false;
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
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */
var FieldPath = /** @class */ (function () {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function FieldPath() {
        var fieldNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fieldNames[_i] = arguments[_i];
        }
        for (var i = 0; i < fieldNames.length; ++i) {
            if (fieldNames[i].length === 0) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). " +
                    'Field names must not be empty.');
            }
        }
        this._internalPath = new FieldPath$1(fieldNames);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */
    FieldPath.prototype.isEqual = function (other) {
        return this._internalPath.isEqual(other._internalPath);
    };
    return FieldPath;
}());
/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */
function documentId() {
    return new FieldPath(DOCUMENT_KEY_NAME);
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
 * An immutable object representing an array of bytes.
 */
var Bytes = /** @class */ (function () {
    /** @hideconstructor */
    function Bytes(byteString) {
        this._byteString = byteString;
    }
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */
    Bytes.fromBase64String = function (base64) {
        try {
            return new Bytes(ByteString.fromBase64String(base64));
        }
        catch (e) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Failed to construct data from Base64 string: ' + e);
        }
    };
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    Bytes.fromUint8Array = function (array) {
        return new Bytes(ByteString.fromUint8Array(array));
    };
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */
    Bytes.prototype.toBase64 = function () {
        return this._byteString.toBase64();
    };
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */
    Bytes.prototype.toUint8Array = function () {
        return this._byteString.toUint8Array();
    };
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */
    Bytes.prototype.toString = function () {
        return 'Bytes(base64: ' + this.toBase64() + ')';
    };
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */
    Bytes.prototype.isEqual = function (other) {
        return this._byteString.isEqual(other._byteString);
    };
    return Bytes;
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
/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */
var FieldValue = /** @class */ (function () {
    /**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
    function FieldValue(_methodName) {
        this._methodName = _methodName;
    }
    return FieldValue;
}());
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
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */
var GeoPoint = /** @class */ (function () {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    function GeoPoint(latitude, longitude) {
        if (!isFinite(latitude) || latitude < -90 || latitude > 90) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Latitude must be a number between -90 and 90, but was: ' + latitude);
        }
        if (!isFinite(longitude) || longitude < -180 || longitude > 180) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Longitude must be a number between -180 and 180, but was: ' + longitude);
        }
        this._lat = latitude;
        this._long = longitude;
    }
    Object.defineProperty(GeoPoint.prototype, "latitude", {
        /**
         * The latitude of this `GeoPoint` instance.
         */
        get: function () {
            return this._lat;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GeoPoint.prototype, "longitude", {
        /**
         * The longitude of this `GeoPoint` instance.
         */
        get: function () {
            return this._long;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */
    GeoPoint.prototype.isEqual = function (other) {
        return this._lat === other._lat && this._long === other._long;
    };
    /** Returns a JSON-serializable representation of this GeoPoint. */
    GeoPoint.prototype.toJSON = function () {
        return { latitude: this._lat, longitude: this._long };
    };
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    GeoPoint.prototype._compareTo = function (other) {
        return (primitiveComparator(this._lat, other._lat) ||
            primitiveComparator(this._long, other._long));
    };
    return GeoPoint;
}());
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
var RESERVED_FIELD_REGEX = /^__.*__$/;
/** The result of parsing document data (e.g. for a setData call). */
var ParsedSetData = /** @class */ (function () {
    function ParsedSetData(data, fieldMask, fieldTransforms) {
        this.data = data;
        this.fieldMask = fieldMask;
        this.fieldTransforms = fieldTransforms;
    }
    ParsedSetData.prototype.toMutation = function (key, precondition) {
        if (this.fieldMask !== null) {
            return new PatchMutation(key, this.data, this.fieldMask, precondition, this.fieldTransforms);
        }
        else {
            return new SetMutation(key, this.data, precondition, this.fieldTransforms);
        }
    };
    return ParsedSetData;
}());
/** The result of parsing "update" data (i.e. for an updateData call). */
var ParsedUpdateData = /** @class */ (function () {
    function ParsedUpdateData(data, 
    // The fieldMask does not include document transforms.
    fieldMask, fieldTransforms) {
        this.data = data;
        this.fieldMask = fieldMask;
        this.fieldTransforms = fieldTransforms;
    }
    ParsedUpdateData.prototype.toMutation = function (key, precondition) {
        return new PatchMutation(key, this.data, this.fieldMask, precondition, this.fieldTransforms);
    };
    return ParsedUpdateData;
}());
function isWrite(dataSource) {
    switch (dataSource) {
        case 0 /* Set */: // fall through
        case 2 /* MergeSet */: // fall through
        case 1 /* Update */:
            return true;
        case 3 /* Argument */:
        case 4 /* ArrayArgument */:
            return false;
        default:
            throw fail();
    }
}
/** A "context" object passed around while parsing user data. */
var ParseContextImpl = /** @class */ (function () {
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings - The settings for the parser.
     * @param databaseId - The database ID of the Firestore instance.
     * @param serializer - The serializer to use to generate the Value proto.
     * @param ignoreUndefinedProperties - Whether to ignore undefined properties
     * rather than throw.
     * @param fieldTransforms - A mutable list of field transforms encountered
     * while parsing the data.
     * @param fieldMask - A mutable list of field paths encountered while parsing
     * the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    function ParseContextImpl(settings, databaseId, serializer, ignoreUndefinedProperties, fieldTransforms, fieldMask) {
        this.settings = settings;
        this.databaseId = databaseId;
        this.serializer = serializer;
        this.ignoreUndefinedProperties = ignoreUndefinedProperties;
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        if (fieldTransforms === undefined) {
            this.validatePath();
        }
        this.fieldTransforms = fieldTransforms || [];
        this.fieldMask = fieldMask || [];
    }
    Object.defineProperty(ParseContextImpl.prototype, "path", {
        get: function () {
            return this.settings.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParseContextImpl.prototype, "dataSource", {
        get: function () {
            return this.settings.dataSource;
        },
        enumerable: false,
        configurable: true
    });
    /** Returns a new context with the specified settings overwritten. */
    ParseContextImpl.prototype.contextWith = function (configuration) {
        return new ParseContextImpl(Object.assign(Object.assign({}, this.settings), configuration), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    };
    ParseContextImpl.prototype.childContextForField = function (field) {
        var _a;
        var childPath = (_a = this.path) === null || _a === void 0 ? void 0 : _a.child(field);
        var context = this.contextWith({ path: childPath, arrayElement: false });
        context.validatePathSegment(field);
        return context;
    };
    ParseContextImpl.prototype.childContextForFieldPath = function (field) {
        var _a;
        var childPath = (_a = this.path) === null || _a === void 0 ? void 0 : _a.child(field);
        var context = this.contextWith({ path: childPath, arrayElement: false });
        context.validatePath();
        return context;
    };
    ParseContextImpl.prototype.childContextForArray = function (index) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.contextWith({ path: undefined, arrayElement: true });
    };
    ParseContextImpl.prototype.createError = function (reason) {
        return createError(reason, this.settings.methodName, this.settings.hasConverter || false, this.path, this.settings.targetDoc);
    };
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */
    ParseContextImpl.prototype.contains = function (fieldPath) {
        return (this.fieldMask.find(function (field) { return fieldPath.isPrefixOf(field); }) !== undefined ||
            this.fieldTransforms.find(function (transform) { return fieldPath.isPrefixOf(transform.field); }) !== undefined);
    };
    ParseContextImpl.prototype.validatePath = function () {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (!this.path) {
            return;
        }
        for (var i = 0; i < this.path.length; i++) {
            this.validatePathSegment(this.path.get(i));
        }
    };
    ParseContextImpl.prototype.validatePathSegment = function (segment) {
        if (segment.length === 0) {
            throw this.createError('Document fields must not be empty');
        }
        if (isWrite(this.dataSource) && RESERVED_FIELD_REGEX.test(segment)) {
            throw this.createError('Document fields cannot begin and end with "__"');
        }
    };
    return ParseContextImpl;
}());
/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */
var UserDataReader = /** @class */ (function () {
    function UserDataReader(databaseId, ignoreUndefinedProperties, serializer) {
        this.databaseId = databaseId;
        this.ignoreUndefinedProperties = ignoreUndefinedProperties;
        this.serializer = serializer || newSerializer(databaseId);
    }
    /** Creates a new top-level parse context. */
    UserDataReader.prototype.createContext = function (dataSource, methodName, targetDoc, hasConverter) {
        if (hasConverter === void 0) { hasConverter = false; }
        return new ParseContextImpl({
            dataSource: dataSource,
            methodName: methodName,
            targetDoc: targetDoc,
            path: FieldPath$1.emptyPath(),
            arrayElement: false,
            hasConverter: hasConverter
        }, this.databaseId, this.serializer, this.ignoreUndefinedProperties);
    };
    return UserDataReader;
}());
function newUserDataReader(firestore) {
    var settings = firestore._freezeSettings();
    var serializer = newSerializer(firestore._databaseId);
    return new UserDataReader(firestore._databaseId, !!settings.ignoreUndefinedProperties, serializer);
}
/** Parse document data from a set() call. */
function parseSetData(userDataReader, methodName, targetDoc, input, hasConverter, options) {
    if (options === void 0) { options = {}; }
    var context = userDataReader.createContext(options.merge || options.mergeFields
        ? 2 /* MergeSet */
        : 0 /* Set */, methodName, targetDoc, hasConverter);
    validatePlainObject('Data must be an object, but it was:', context, input);
    var updateData = parseObject(input, context);
    var fieldMask;
    var fieldTransforms;
    if (options.merge) {
        fieldMask = new FieldMask(context.fieldMask);
        fieldTransforms = context.fieldTransforms;
    }
    else if (options.mergeFields) {
        var validatedFieldPaths = [];
        for (var _i = 0, _c = options.mergeFields; _i < _c.length; _i++) {
            var stringOrFieldPath = _c[_i];
            var fieldPath = fieldPathFromArgument$1(methodName, stringOrFieldPath, targetDoc);
            if (!context.contains(fieldPath)) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Field '" + fieldPath + "' is specified in your field mask but missing from your input data.");
            }
            if (!fieldMaskContains(validatedFieldPaths, fieldPath)) {
                validatedFieldPaths.push(fieldPath);
            }
        }
        fieldMask = new FieldMask(validatedFieldPaths);
        fieldTransforms = context.fieldTransforms.filter(function (transform) { return fieldMask.covers(transform.field); });
    }
    else {
        fieldMask = null;
        fieldTransforms = context.fieldTransforms;
    }
    return new ParsedSetData(new ObjectValue(updateData), fieldMask, fieldTransforms);
}
var DeleteFieldValueImpl = /** @class */ (function (_super) {
    tslib.__extends(DeleteFieldValueImpl, _super);
    function DeleteFieldValueImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteFieldValueImpl.prototype._toFieldTransform = function (context) {
        if (context.dataSource === 2 /* MergeSet */) {
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            context.fieldMask.push(context.path);
        }
        else if (context.dataSource === 1 /* Update */) {
            throw context.createError(this._methodName + "() can only appear at the top level " +
                'of your update data');
        }
        else {
            // We shouldn't encounter delete sentinels for queries or non-merge set() calls.
            throw context.createError(this._methodName + "() cannot be used with set() unless you pass " +
                '{merge:true}');
        }
        return null;
    };
    DeleteFieldValueImpl.prototype.isEqual = function (other) {
        return other instanceof DeleteFieldValueImpl;
    };
    return DeleteFieldValueImpl;
}(FieldValue));
/**
 * Creates a child context for parsing SerializableFieldValues.
 *
 * This is different than calling `ParseContext.contextWith` because it keeps
 * the fieldTransforms and fieldMask separate.
 *
 * The created context has its `dataSource` set to `UserDataSource.Argument`.
 * Although these values are used with writes, any elements in these FieldValues
 * are not considered writes since they cannot contain any FieldValue sentinels,
 * etc.
 *
 * @param fieldValue - The sentinel FieldValue for which to create a child
 *     context.
 * @param context - The parent context.
 * @param arrayElement - Whether or not the FieldValue has an array.
 */
function createSentinelChildContext(fieldValue, context, arrayElement) {
    return new ParseContextImpl({
        dataSource: 3 /* Argument */,
        targetDoc: context.settings.targetDoc,
        methodName: fieldValue._methodName,
        arrayElement: arrayElement
    }, context.databaseId, context.serializer, context.ignoreUndefinedProperties);
}
var ServerTimestampFieldValueImpl = /** @class */ (function (_super) {
    tslib.__extends(ServerTimestampFieldValueImpl, _super);
    function ServerTimestampFieldValueImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServerTimestampFieldValueImpl.prototype._toFieldTransform = function (context) {
        return new FieldTransform(context.path, new ServerTimestampTransform());
    };
    ServerTimestampFieldValueImpl.prototype.isEqual = function (other) {
        return other instanceof ServerTimestampFieldValueImpl;
    };
    return ServerTimestampFieldValueImpl;
}(FieldValue));
var ArrayUnionFieldValueImpl = /** @class */ (function (_super) {
    tslib.__extends(ArrayUnionFieldValueImpl, _super);
    function ArrayUnionFieldValueImpl(methodName, _elements) {
        var _this = _super.call(this, methodName) || this;
        _this._elements = _elements;
        return _this;
    }
    ArrayUnionFieldValueImpl.prototype._toFieldTransform = function (context) {
        var parseContext = createSentinelChildContext(this, context, 
        /*array=*/ true);
        var parsedElements = this._elements.map(function (element) { return parseData(element, parseContext); });
        var arrayUnion = new ArrayUnionTransformOperation(parsedElements);
        return new FieldTransform(context.path, arrayUnion);
    };
    ArrayUnionFieldValueImpl.prototype.isEqual = function (other) {
        // TODO(mrschmidt): Implement isEquals
        return this === other;
    };
    return ArrayUnionFieldValueImpl;
}(FieldValue));
var ArrayRemoveFieldValueImpl = /** @class */ (function (_super) {
    tslib.__extends(ArrayRemoveFieldValueImpl, _super);
    function ArrayRemoveFieldValueImpl(methodName, _elements) {
        var _this = _super.call(this, methodName) || this;
        _this._elements = _elements;
        return _this;
    }
    ArrayRemoveFieldValueImpl.prototype._toFieldTransform = function (context) {
        var parseContext = createSentinelChildContext(this, context, 
        /*array=*/ true);
        var parsedElements = this._elements.map(function (element) { return parseData(element, parseContext); });
        var arrayUnion = new ArrayRemoveTransformOperation(parsedElements);
        return new FieldTransform(context.path, arrayUnion);
    };
    ArrayRemoveFieldValueImpl.prototype.isEqual = function (other) {
        // TODO(mrschmidt): Implement isEquals
        return this === other;
    };
    return ArrayRemoveFieldValueImpl;
}(FieldValue));
var NumericIncrementFieldValueImpl = /** @class */ (function (_super) {
    tslib.__extends(NumericIncrementFieldValueImpl, _super);
    function NumericIncrementFieldValueImpl(methodName, _operand) {
        var _this = _super.call(this, methodName) || this;
        _this._operand = _operand;
        return _this;
    }
    NumericIncrementFieldValueImpl.prototype._toFieldTransform = function (context) {
        var numericIncrement = new NumericIncrementTransformOperation(context.serializer, toNumber(context.serializer, this._operand));
        return new FieldTransform(context.path, numericIncrement);
    };
    NumericIncrementFieldValueImpl.prototype.isEqual = function (other) {
        // TODO(mrschmidt): Implement isEquals
        return this === other;
    };
    return NumericIncrementFieldValueImpl;
}(FieldValue));
/** Parse update data from an update() call. */
function parseUpdateData(userDataReader, methodName, targetDoc, input) {
    var context = userDataReader.createContext(1 /* Update */, methodName, targetDoc);
    validatePlainObject('Data must be an object, but it was:', context, input);
    var fieldMaskPaths = [];
    var updateData = ObjectValue.empty();
    forEach(input, function (key, value) {
        var path = fieldPathFromDotSeparatedString(methodName, key, targetDoc);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        value = util.getModularInstance(value);
        var childContext = context.childContextForFieldPath(path);
        if (value instanceof DeleteFieldValueImpl) {
            // Add it to the field mask, but don't add anything to updateData.
            fieldMaskPaths.push(path);
        }
        else {
            var parsedValue = parseData(value, childContext);
            if (parsedValue != null) {
                fieldMaskPaths.push(path);
                updateData.set(path, parsedValue);
            }
        }
    });
    var mask = new FieldMask(fieldMaskPaths);
    return new ParsedUpdateData(updateData, mask, context.fieldTransforms);
}
/** Parse update data from a list of field/value arguments. */
function parseUpdateVarargs(userDataReader, methodName, targetDoc, field, value, moreFieldsAndValues) {
    var context = userDataReader.createContext(1 /* Update */, methodName, targetDoc);
    var keys = [fieldPathFromArgument$1(methodName, field, targetDoc)];
    var values = [value];
    if (moreFieldsAndValues.length % 2 !== 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Function " + methodName + "() needs to be called with an even number " +
            'of arguments that alternate between field names and values.');
    }
    for (var i = 0; i < moreFieldsAndValues.length; i += 2) {
        keys.push(fieldPathFromArgument$1(methodName, moreFieldsAndValues[i]));
        values.push(moreFieldsAndValues[i + 1]);
    }
    var fieldMaskPaths = [];
    var updateData = ObjectValue.empty();
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (var i = keys.length - 1; i >= 0; --i) {
        if (!fieldMaskContains(fieldMaskPaths, keys[i])) {
            var path = keys[i];
            var value_1 = values[i];
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
            value_1 = util.getModularInstance(value_1);
            var childContext = context.childContextForFieldPath(path);
            if (value_1 instanceof DeleteFieldValueImpl) {
                // Add it to the field mask, but don't add anything to updateData.
                fieldMaskPaths.push(path);
            }
            else {
                var parsedValue = parseData(value_1, childContext);
                if (parsedValue != null) {
                    fieldMaskPaths.push(path);
                    updateData.set(path, parsedValue);
                }
            }
        }
    }
    var mask = new FieldMask(fieldMaskPaths);
    return new ParsedUpdateData(updateData, mask, context.fieldTransforms);
}
/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */
function parseQueryValue(userDataReader, methodName, input, allowArrays) {
    if (allowArrays === void 0) { allowArrays = false; }
    var context = userDataReader.createContext(allowArrays ? 4 /* ArrayArgument */ : 3 /* Argument */, methodName);
    var parsed = parseData(input, context);
    return parsed;
}
/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */
function parseData(input, context) {
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    input = util.getModularInstance(input);
    if (looksLikeJsonObject(input)) {
        validatePlainObject('Unsupported field value:', context, input);
        return parseObject(input, context);
    }
    else if (input instanceof FieldValue) {
        // FieldValues usually parse into transforms (except FieldValue.delete())
        // in which case we do not want to include this field in our parsed data
        // (as doing so will overwrite the field directly prior to the transform
        // trying to transform it). So we don't add this location to
        // context.fieldMask and we return null as our parsing result.
        parseSentinelFieldValue(input, context);
        return null;
    }
    else if (input === undefined && context.ignoreUndefinedProperties) {
        // If the input is undefined it can never participate in the fieldMask, so
        // don't handle this below. If `ignoreUndefinedProperties` is false,
        // `parseScalarValue` will reject an undefined value.
        return null;
    }
    else {
        // If context.path is null we are inside an array and we don't support
        // field mask paths more granular than the top-level array.
        if (context.path) {
            context.fieldMask.push(context.path);
        }
        if (input instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (context.settings.arrayElement &&
                context.dataSource !== 4 /* ArrayArgument */) {
                throw context.createError('Nested arrays are not supported');
            }
            return parseArray(input, context);
        }
        else {
            return parseScalarValue(input, context);
        }
    }
}
function parseObject(obj, context) {
    var fields = {};
    if (isEmpty(obj)) {
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        if (context.path && context.path.length > 0) {
            context.fieldMask.push(context.path);
        }
    }
    else {
        forEach(obj, function (key, val) {
            var parsedValue = parseData(val, context.childContextForField(key));
            if (parsedValue != null) {
                fields[key] = parsedValue;
            }
        });
    }
    return { mapValue: { fields: fields } };
}
function parseArray(array, context) {
    var values = [];
    var entryIndex = 0;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var entry = array_1[_i];
        var parsedEntry = parseData(entry, context.childContextForArray(entryIndex));
        if (parsedEntry == null) {
            // Just include nulls in the array for fields being replaced with a
            // sentinel.
            parsedEntry = { nullValue: 'NULL_VALUE' };
        }
        values.push(parsedEntry);
        entryIndex++;
    }
    return { arrayValue: { values: values } };
}
/**
 * "Parses" the provided FieldValueImpl, adding any necessary transforms to
 * context.fieldTransforms.
 */
function parseSentinelFieldValue(value, context) {
    // Sentinels are only supported with writes, and not within arrays.
    if (!isWrite(context.dataSource)) {
        throw context.createError(value._methodName + "() can only be used with update() and set()");
    }
    if (!context.path) {
        throw context.createError(value._methodName + "() is not currently supported inside arrays");
    }
    var fieldTransform = value._toFieldTransform(context);
    if (fieldTransform) {
        context.fieldTransforms.push(fieldTransform);
    }
}
/**
 * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
 *
 * @returns The parsed value
 */
function parseScalarValue(value, context) {
    value = util.getModularInstance(value);
    if (value === null) {
        return { nullValue: 'NULL_VALUE' };
    }
    else if (typeof value === 'number') {
        return toNumber(context.serializer, value);
    }
    else if (typeof value === 'boolean') {
        return { booleanValue: value };
    }
    else if (typeof value === 'string') {
        return { stringValue: value };
    }
    else if (value instanceof Date) {
        var timestamp = Timestamp.fromDate(value);
        return {
            timestampValue: toTimestamp(context.serializer, timestamp)
        };
    }
    else if (value instanceof Timestamp) {
        // Firestore backend truncates precision down to microseconds. To ensure
        // offline mode works the same with regards to truncation, perform the
        // truncation immediately without waiting for the backend to do that.
        var timestamp = new Timestamp(value.seconds, Math.floor(value.nanoseconds / 1000) * 1000);
        return {
            timestampValue: toTimestamp(context.serializer, timestamp)
        };
    }
    else if (value instanceof GeoPoint) {
        return {
            geoPointValue: {
                latitude: value.latitude,
                longitude: value.longitude
            }
        };
    }
    else if (value instanceof Bytes) {
        return { bytesValue: toBytes(context.serializer, value._byteString) };
    }
    else if (value instanceof DocumentReference) {
        var thisDb = context.databaseId;
        var otherDb = value.firestore._databaseId;
        if (!otherDb.isEqual(thisDb)) {
            throw context.createError('Document reference is for database ' +
                (otherDb.projectId + "/" + otherDb.database + " but should be ") +
                ("for database " + thisDb.projectId + "/" + thisDb.database));
        }
        return {
            referenceValue: toResourceName(value.firestore._databaseId || context.databaseId, value._key.path)
        };
    }
    else {
        throw context.createError("Unsupported field value: " + valueDescription(value));
    }
}
/**
 * Checks whether an object looks like a JSON object that should be converted
 * into a struct. Normal class/prototype instances are considered to look like
 * JSON objects since they should be converted to a struct value. Arrays, Dates,
 * GeoPoints, etc. are not considered to look like JSON objects since they map
 * to specific FieldValue types other than ObjectValue.
 */
function looksLikeJsonObject(input) {
    return (typeof input === 'object' &&
        input !== null &&
        !(input instanceof Array) &&
        !(input instanceof Date) &&
        !(input instanceof Timestamp) &&
        !(input instanceof GeoPoint) &&
        !(input instanceof Bytes) &&
        !(input instanceof DocumentReference) &&
        !(input instanceof FieldValue));
}
function validatePlainObject(message, context, input) {
    if (!looksLikeJsonObject(input) || !isPlainObject(input)) {
        var description = valueDescription(input);
        if (description === 'an object') {
            // Massage the error if it was an object.
            throw context.createError(message + ' a custom object');
        }
        else {
            throw context.createError(message + ' ' + description);
        }
    }
}
/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */
function fieldPathFromArgument$1(methodName, path, targetDoc) {
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    path = util.getModularInstance(path);
    if (path instanceof FieldPath) {
        return path._internalPath;
    }
    else if (typeof path === 'string') {
        return fieldPathFromDotSeparatedString(methodName, path);
    }
    else {
        var message = 'Field path arguments must be of type string or FieldPath.';
        throw createError(message, methodName, 
        /* hasConverter= */ false, 
        /* path= */ undefined, targetDoc);
    }
}
/**
 * Matches any characters in a field path string that are reserved.
 */
var FIELD_PATH_RESERVED = new RegExp('[~\\*/\\[\\]]');
/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */
function fieldPathFromDotSeparatedString(methodName, path, targetDoc) {
    var found = path.search(FIELD_PATH_RESERVED);
    if (found >= 0) {
        throw createError("Invalid field path (" + path + "). Paths must not contain " +
            "'~', '*', '/', '[', or ']'", methodName, 
        /* hasConverter= */ false, 
        /* path= */ undefined, targetDoc);
    }
    try {
        return new (FieldPath.bind.apply(FieldPath, tslib.__spreadArray([void 0], path.split('.'))))()._internalPath;
    }
    catch (e) {
        throw createError("Invalid field path (" + path + "). Paths must not be empty, " +
            "begin with '.', end with '.', or contain '..'", methodName, 
        /* hasConverter= */ false, 
        /* path= */ undefined, targetDoc);
    }
}
function createError(reason, methodName, hasConverter, path, targetDoc) {
    var hasPath = path && !path.isEmpty();
    var hasDocument = targetDoc !== undefined;
    var message = "Function " + methodName + "() called with invalid data";
    if (hasConverter) {
        message += ' (via `toFirestore()`)';
    }
    message += '. ';
    var description = '';
    if (hasPath || hasDocument) {
        description += ' (found';
        if (hasPath) {
            description += " in field " + path;
        }
        if (hasDocument) {
            description += " in document " + targetDoc;
        }
        description += ')';
    }
    return new FirestoreError(Code.INVALID_ARGUMENT, message + reason + description);
}
/** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */
function fieldMaskContains(haystack, needle) {
    return haystack.some(function (v) { return v.isEqual(needle); });
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
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */
var DocumentSnapshot = /** @class */ (function () {
    // Note: This class is stripped down version of the DocumentSnapshot in
    // the legacy SDK. The changes are:
    // - No support for SnapshotMetadata.
    // - No support for SnapshotOptions.
    /** @hideconstructor protected */
    function DocumentSnapshot(_firestore, _userDataWriter, _key, _document, _converter) {
        this._firestore = _firestore;
        this._userDataWriter = _userDataWriter;
        this._key = _key;
        this._document = _document;
        this._converter = _converter;
    }
    Object.defineProperty(DocumentSnapshot.prototype, "id", {
        /** Property of the `DocumentSnapshot` that provides the document's ID. */
        get: function () {
            return this._key.path.lastSegment();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentSnapshot.prototype, "ref", {
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */
        get: function () {
            return new DocumentReference(this._firestore, this._converter, this._key);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */
    DocumentSnapshot.prototype.exists = function () {
        return this._document !== null;
    };
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */
    DocumentSnapshot.prototype.data = function () {
        if (!this._document) {
            return undefined;
        }
        else if (this._converter) {
            // We only want to use the converter and create a new DocumentSnapshot
            // if a converter has been provided.
            var snapshot = new QueryDocumentSnapshot(this._firestore, this._userDataWriter, this._key, this._document, 
            /* converter= */ null);
            return this._converter.fromFirestore(snapshot);
        }
        else {
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    };
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DocumentSnapshot.prototype.get = function (fieldPath) {
        if (this._document) {
            var value = this._document.data.field(fieldPathFromArgument('DocumentSnapshot.get', fieldPath));
            if (value !== null) {
                return this._userDataWriter.convertValue(value);
            }
        }
        return undefined;
    };
    return DocumentSnapshot;
}());
/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */
var QueryDocumentSnapshot = /** @class */ (function (_super) {
    tslib.__extends(QueryDocumentSnapshot, _super);
    function QueryDocumentSnapshot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */
    QueryDocumentSnapshot.prototype.data = function () {
        return _super.prototype.data.call(this);
    };
    return QueryDocumentSnapshot;
}(DocumentSnapshot));
/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */
var QuerySnapshot = /** @class */ (function () {
    /** @hideconstructor */
    function QuerySnapshot(_query, _docs) {
        this._docs = _docs;
        this.query = _query;
    }
    Object.defineProperty(QuerySnapshot.prototype, "docs", {
        /** An array of all the documents in the `QuerySnapshot`. */
        get: function () {
            return tslib.__spreadArray([], this._docs);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuerySnapshot.prototype, "size", {
        /** The number of documents in the `QuerySnapshot`. */
        get: function () {
            return this.docs.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuerySnapshot.prototype, "empty", {
        /** True if there are no documents in the `QuerySnapshot`. */
        get: function () {
            return this.docs.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */
    QuerySnapshot.prototype.forEach = function (callback, thisArg) {
        this._docs.forEach(callback, thisArg);
    };
    return QuerySnapshot;
}());
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */
function snapshotEqual(left, right) {
    left = util.getModularInstance(left);
    right = util.getModularInstance(right);
    if (left instanceof DocumentSnapshot && right instanceof DocumentSnapshot) {
        return (left._firestore === right._firestore &&
            left._key.isEqual(right._key) &&
            (left._document === null
                ? right._document === null
                : left._document.isEqual(right._document)) &&
            left._converter === right._converter);
    }
    else if (left instanceof QuerySnapshot && right instanceof QuerySnapshot) {
        return (queryEqual(left.query, right.query) &&
            arrayEquals(left.docs, right.docs, snapshotEqual));
    }
    return false;
}
/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */
function fieldPathFromArgument(methodName, arg) {
    if (typeof arg === 'string') {
        return fieldPathFromDotSeparatedString(methodName, arg);
    }
    else if (arg instanceof FieldPath) {
        return arg._internalPath;
    }
    else {
        return arg._delegate._internalPath;
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
function validateHasExplicitOrderByForLimitToLast(query) {
    if (hasLimitToLast(query) && query.explicitOrderBy.length === 0) {
        throw new FirestoreError(Code.UNIMPLEMENTED, 'limitToLast() queries require specifying at least one orderBy() clause');
    }
}
/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */
var QueryConstraint = /** @class */ (function () {
    function QueryConstraint() {
    }
    return QueryConstraint;
}());
/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */
function query(query) {
    var queryConstraints = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        queryConstraints[_i - 1] = arguments[_i];
    }
    for (var _c = 0, queryConstraints_1 = queryConstraints; _c < queryConstraints_1.length; _c++) {
        var constraint = queryConstraints_1[_c];
        query = constraint._apply(query);
    }
    return query;
}
var QueryFilterConstraint = /** @class */ (function (_super) {
    tslib.__extends(QueryFilterConstraint, _super);
    function QueryFilterConstraint(_field, _op, _value) {
        var _this = _super.call(this) || this;
        _this._field = _field;
        _this._op = _op;
        _this._value = _value;
        _this.type = 'where';
        return _this;
    }
    QueryFilterConstraint.prototype._apply = function (query) {
        var reader = newUserDataReader(query.firestore);
        var filter = newQueryFilter(query._query, 'where', reader, query.firestore._databaseId, this._field, this._op, this._value);
        return new Query(query.firestore, query.converter, queryWithAddedFilter(query._query, filter));
    };
    return QueryFilterConstraint;
}(QueryConstraint));
/**
 * Creates a `QueryConstraint` that enforces that documents must contain the
 * specified field and that the value should satisfy the relation constraint
 * provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created `Query`.
 */
function where(fieldPath, opStr, value) {
    var op = opStr;
    var field = fieldPathFromArgument('where', fieldPath);
    return new QueryFilterConstraint(field, op, value);
}
var QueryOrderByConstraint = /** @class */ (function (_super) {
    tslib.__extends(QueryOrderByConstraint, _super);
    function QueryOrderByConstraint(_field, _direction) {
        var _this = _super.call(this) || this;
        _this._field = _field;
        _this._direction = _direction;
        _this.type = 'orderBy';
        return _this;
    }
    QueryOrderByConstraint.prototype._apply = function (query) {
        var orderBy = newQueryOrderBy(query._query, this._field, this._direction);
        return new Query(query.firestore, query.converter, queryWithAddedOrderBy(query._query, orderBy));
    };
    return QueryOrderByConstraint;
}(QueryConstraint));
/**
 * Creates a `QueryConstraint` that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created `Query`.
 */
function orderBy(fieldPath, directionStr) {
    if (directionStr === void 0) { directionStr = 'asc'; }
    var direction = directionStr;
    var path = fieldPathFromArgument('orderBy', fieldPath);
    return new QueryOrderByConstraint(path, direction);
}
var QueryLimitConstraint = /** @class */ (function (_super) {
    tslib.__extends(QueryLimitConstraint, _super);
    function QueryLimitConstraint(type, _limit, _limitType) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this._limit = _limit;
        _this._limitType = _limitType;
        return _this;
    }
    QueryLimitConstraint.prototype._apply = function (query) {
        return new Query(query.firestore, query.converter, queryWithLimit(query._query, this._limit, this._limitType));
    };
    return QueryLimitConstraint;
}(QueryConstraint));
/**
 * Creates a `QueryConstraint` that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created `Query`.
 */
function limit(limit) {
    validatePositiveNumber('limit', limit);
    return new QueryLimitConstraint('limit', limit, "F" /* First */);
}
/**
 * Creates a `QueryConstraint` that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created `Query`.
 */
function limitToLast(limit) {
    validatePositiveNumber('limitToLast', limit);
    return new QueryLimitConstraint('limitToLast', limit, "L" /* Last */);
}
var QueryStartAtConstraint = /** @class */ (function (_super) {
    tslib.__extends(QueryStartAtConstraint, _super);
    function QueryStartAtConstraint(type, _docOrFields, _before) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this._docOrFields = _docOrFields;
        _this._before = _before;
        return _this;
    }
    QueryStartAtConstraint.prototype._apply = function (query) {
        var bound = newQueryBoundFromDocOrFields(query, this.type, this._docOrFields, this._before);
        return new Query(query.firestore, query.converter, queryWithStartAt(query._query, bound));
    };
    return QueryStartAtConstraint;
}(QueryConstraint));
function startAt() {
    var docOrFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        docOrFields[_i] = arguments[_i];
    }
    return new QueryStartAtConstraint('startAt', docOrFields, /*before=*/ true);
}
function startAfter() {
    var docOrFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        docOrFields[_i] = arguments[_i];
    }
    return new QueryStartAtConstraint('startAfter', docOrFields, 
    /*before=*/ false);
}
var QueryEndAtConstraint = /** @class */ (function (_super) {
    tslib.__extends(QueryEndAtConstraint, _super);
    function QueryEndAtConstraint(type, _docOrFields, _before) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this._docOrFields = _docOrFields;
        _this._before = _before;
        return _this;
    }
    QueryEndAtConstraint.prototype._apply = function (query) {
        var bound = newQueryBoundFromDocOrFields(query, this.type, this._docOrFields, this._before);
        return new Query(query.firestore, query.converter, queryWithEndAt(query._query, bound));
    };
    return QueryEndAtConstraint;
}(QueryConstraint));
function endBefore() {
    var docOrFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        docOrFields[_i] = arguments[_i];
    }
    return new QueryEndAtConstraint('endBefore', docOrFields, /*before=*/ true);
}
function endAt() {
    var docOrFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        docOrFields[_i] = arguments[_i];
    }
    return new QueryEndAtConstraint('endAt', docOrFields, /*before=*/ false);
}
/** Helper function to create a bound from a document or fields */
function newQueryBoundFromDocOrFields(query, methodName, docOrFields, before) {
    docOrFields[0] = util.getModularInstance(docOrFields[0]);
    if (docOrFields[0] instanceof DocumentSnapshot) {
        return newQueryBoundFromDocument(query._query, query.firestore._databaseId, methodName, docOrFields[0]._document, before);
    }
    else {
        var reader = newUserDataReader(query.firestore);
        return newQueryBoundFromFields(query._query, query.firestore._databaseId, reader, methodName, docOrFields, before);
    }
}
function newQueryFilter(query, methodName, dataReader, databaseId, fieldPath, op, value) {
    var fieldValue;
    if (fieldPath.isKeyField()) {
        if (op === "array-contains" /* ARRAY_CONTAINS */ || op === "array-contains-any" /* ARRAY_CONTAINS_ANY */) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + op + "' " +
                'queries on FieldPath.documentId().');
        }
        else if (op === "in" /* IN */ || op === "not-in" /* NOT_IN */) {
            validateDisjunctiveFilterElements(value, op);
            var referenceList = [];
            for (var _i = 0, value_2 = value; _i < value_2.length; _i++) {
                var arrayValue = value_2[_i];
                referenceList.push(parseDocumentIdValue(databaseId, query, arrayValue));
            }
            fieldValue = { arrayValue: { values: referenceList } };
        }
        else {
            fieldValue = parseDocumentIdValue(databaseId, query, value);
        }
    }
    else {
        if (op === "in" /* IN */ ||
            op === "not-in" /* NOT_IN */ ||
            op === "array-contains-any" /* ARRAY_CONTAINS_ANY */) {
            validateDisjunctiveFilterElements(value, op);
        }
        fieldValue = parseQueryValue(dataReader, methodName, value, 
        /* allowArrays= */ op === "in" /* IN */ || op === "not-in" /* NOT_IN */);
    }
    var filter = FieldFilter.create(fieldPath, op, fieldValue);
    validateNewFilter(query, filter);
    return filter;
}
function newQueryOrderBy(query, fieldPath, direction) {
    if (query.startAt !== null) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. You must not call startAt() or startAfter() before ' +
            'calling orderBy().');
    }
    if (query.endAt !== null) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. You must not call endAt() or endBefore() before ' +
            'calling orderBy().');
    }
    var orderBy = new OrderBy(fieldPath, direction);
    validateNewOrderBy(query, orderBy);
    return orderBy;
}
/**
 * Create a Bound from a query and a document.
 *
 * Note that the Bound will always include the key of the document
 * and so only the provided document will compare equal to the returned
 * position.
 *
 * Will throw if the document does not contain all fields of the order by
 * of the query or if any of the fields in the order by are an uncommitted
 * server timestamp.
 */
function newQueryBoundFromDocument(query, databaseId, methodName, doc, before) {
    if (!doc) {
        throw new FirestoreError(Code.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " +
            (methodName + "()."));
    }
    var components = [];
    // Because people expect to continue/end a query at the exact document
    // provided, we need to use the implicit sort order rather than the explicit
    // sort order, because it's guaranteed to contain the document key. That way
    // the position becomes unambiguous and the query continues/ends exactly at
    // the provided document. Without the key (by using the explicit sort
    // orders), multiple documents could match the position, yielding duplicate
    // results.
    for (var _i = 0, _c = queryOrderBy(query); _i < _c.length; _i++) {
        var orderBy_3 = _c[_i];
        if (orderBy_3.field.isKeyField()) {
            components.push(refValue(databaseId, doc.key));
        }
        else {
            var value = doc.data.field(orderBy_3.field);
            if (isServerTimestamp(value)) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a ' +
                    'document for which the field "' +
                    orderBy_3.field +
                    '" is an uncommitted server timestamp. (Since the value of ' +
                    'this field is unknown, you cannot start/end a query with it.)');
            }
            else if (value !== null) {
                components.push(value);
            }
            else {
                var field = orderBy_3.field.canonicalString();
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a " +
                    ("document for which the field '" + field + "' (used as the ") +
                    "orderBy) does not exist.");
            }
        }
    }
    return new Bound(components, before);
}
/**
 * Converts a list of field values to a Bound for the given query.
 */
function newQueryBoundFromFields(query, databaseId, dataReader, methodName, values, before) {
    // Use explicit order by's because it has to match the query the user made
    var orderBy = query.explicitOrderBy;
    if (values.length > orderBy.length) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Too many arguments provided to " + methodName + "(). " +
            "The number of arguments must be less than or equal to the " +
            "number of orderBy() clauses");
    }
    var components = [];
    for (var i = 0; i < values.length; i++) {
        var rawValue = values[i];
        var orderByComponent = orderBy[i];
        if (orderByComponent.field.isKeyField()) {
            if (typeof rawValue !== 'string') {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " +
                    (methodName + "(), but got a " + typeof rawValue));
            }
            if (!isCollectionGroupQuery(query) && rawValue.indexOf('/') !== -1) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), " +
                    ("the value passed to " + methodName + "() must be a plain document ID, but ") +
                    ("'" + rawValue + "' contains a slash."));
            }
            var path = query.path.child(ResourcePath.fromString(rawValue));
            if (!DocumentKey.isDocumentKey(path)) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by " +
                    ("FieldPath.documentId(), the value passed to " + methodName + "() must result in a ") +
                    ("valid document path, but '" + path + "' is not because it contains an odd number ") +
                    "of segments.");
            }
            var key = new DocumentKey(path);
            components.push(refValue(databaseId, key));
        }
        else {
            var wrapped = parseQueryValue(dataReader, methodName, rawValue);
            components.push(wrapped);
        }
    }
    return new Bound(components, before);
}
/**
 * Parses the given documentIdValue into a ReferenceValue, throwing
 * appropriate errors if the value is anything other than a DocumentReference
 * or String, or if the string is malformed.
 */
function parseDocumentIdValue(databaseId, query, documentIdValue) {
    documentIdValue = util.getModularInstance(documentIdValue);
    if (typeof documentIdValue === 'string') {
        if (documentIdValue === '') {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. When querying with FieldPath.documentId(), you ' +
                'must provide a valid document ID, but it was an empty string.');
        }
        if (!isCollectionGroupQuery(query) && documentIdValue.indexOf('/') !== -1) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. When querying a collection by " +
                "FieldPath.documentId(), you must provide a plain document ID, but " +
                ("'" + documentIdValue + "' contains a '/' character."));
        }
        var path = query.path.child(ResourcePath.fromString(documentIdValue));
        if (!DocumentKey.isDocumentKey(path)) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. When querying a collection group by " +
                "FieldPath.documentId(), the value provided must result in a valid document path, " +
                ("but '" + path + "' is not because it has an odd number of segments (" + path.length + ")."));
        }
        return refValue(databaseId, new DocumentKey(path));
    }
    else if (documentIdValue instanceof DocumentReference) {
        return refValue(databaseId, documentIdValue._key);
    }
    else {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid " +
            "string or a DocumentReference, but it was: " +
            (valueDescription(documentIdValue) + "."));
    }
}
/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */
function validateDisjunctiveFilterElements(value, operator) {
    if (!Array.isArray(value) || value.length === 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid Query. A non-empty array is required for ' +
            ("'" + operator.toString() + "' filters."));
    }
    if (value.length > 10) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid Query. '" + operator.toString() + "' filters support a " +
            'maximum of 10 elements in the value array.');
    }
}
/**
 * Given an operator, returns the set of operators that cannot be used with it.
 *
 * Operators in a query must adhere to the following set of rules:
 * 1. Only one array operator is allowed.
 * 2. Only one disjunctive operator is allowed.
 * 3. NOT_EQUAL cannot be used with another NOT_EQUAL operator.
 * 4. NOT_IN cannot be used with array, disjunctive, or NOT_EQUAL operators.
 *
 * Array operators: ARRAY_CONTAINS, ARRAY_CONTAINS_ANY
 * Disjunctive operators: IN, ARRAY_CONTAINS_ANY, NOT_IN
 */
function conflictingOps(op) {
    switch (op) {
        case "!=" /* NOT_EQUAL */:
            return ["!=" /* NOT_EQUAL */, "not-in" /* NOT_IN */];
        case "array-contains" /* ARRAY_CONTAINS */:
            return [
                "array-contains" /* ARRAY_CONTAINS */,
                "array-contains-any" /* ARRAY_CONTAINS_ANY */,
                "not-in" /* NOT_IN */
            ];
        case "in" /* IN */:
            return ["array-contains-any" /* ARRAY_CONTAINS_ANY */, "in" /* IN */, "not-in" /* NOT_IN */];
        case "array-contains-any" /* ARRAY_CONTAINS_ANY */:
            return [
                "array-contains" /* ARRAY_CONTAINS */,
                "array-contains-any" /* ARRAY_CONTAINS_ANY */,
                "in" /* IN */,
                "not-in" /* NOT_IN */
            ];
        case "not-in" /* NOT_IN */:
            return [
                "array-contains" /* ARRAY_CONTAINS */,
                "array-contains-any" /* ARRAY_CONTAINS_ANY */,
                "in" /* IN */,
                "not-in" /* NOT_IN */,
                "!=" /* NOT_EQUAL */
            ];
        default:
            return [];
    }
}
function validateNewFilter(query, filter) {
    if (filter.isInequality()) {
        var existingField = getInequalityFilterField(query);
        if (existingField !== null && !existingField.isEqual(filter.field)) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. All where filters with an inequality' +
                ' (<, <=, !=, not-in, >, or >=) must be on the same field. But you have' +
                (" inequality filters on '" + existingField.toString() + "'") +
                (" and '" + filter.field.toString() + "'"));
        }
        var firstOrderByField = getFirstOrderByField(query);
        if (firstOrderByField !== null) {
            validateOrderByAndInequalityMatch(query, filter.field, firstOrderByField);
        }
    }
    var conflictingOp = findFilterOperator(query, conflictingOps(filter.op));
    if (conflictingOp !== null) {
        // Special case when it's a duplicate op to give a slightly clearer error message.
        if (conflictingOp === filter.op) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. You cannot use more than one ' +
                ("'" + filter.op.toString() + "' filter."));
        }
        else {
            throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. You cannot use '" + filter.op.toString() + "' filters " +
                ("with '" + conflictingOp.toString() + "' filters."));
        }
    }
}
function validateNewOrderBy(query, orderBy) {
    if (getFirstOrderByField(query) === null) {
        // This is the first order by. It must match any inequality.
        var inequalityField = getInequalityFilterField(query);
        if (inequalityField !== null) {
            validateOrderByAndInequalityMatch(query, inequalityField, orderBy.field);
        }
    }
}
function validateOrderByAndInequalityMatch(baseQuery, inequality, orderBy) {
    if (!orderBy.isEqual(inequality)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality " +
            ("(<, <=, !=, not-in, >, or >=) on field '" + inequality.toString() + "' ") +
            ("and so you must also use '" + inequality.toString() + "' ") +
            "as your first argument to orderBy(), but your first orderBy() " +
            ("is on field '" + orderBy.toString() + "' instead."));
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
/**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */
var AbstractUserDataWriter = /** @class */ (function () {
    function AbstractUserDataWriter() {
    }
    AbstractUserDataWriter.prototype.convertValue = function (value, serverTimestampBehavior) {
        if (serverTimestampBehavior === void 0) { serverTimestampBehavior = 'none'; }
        switch (typeOrder(value)) {
            case 0 /* NullValue */:
                return null;
            case 1 /* BooleanValue */:
                return value.booleanValue;
            case 2 /* NumberValue */:
                return normalizeNumber(value.integerValue || value.doubleValue);
            case 3 /* TimestampValue */:
                return this.convertTimestamp(value.timestampValue);
            case 4 /* ServerTimestampValue */:
                return this.convertServerTimestamp(value, serverTimestampBehavior);
            case 5 /* StringValue */:
                return value.stringValue;
            case 6 /* BlobValue */:
                return this.convertBytes(normalizeByteString(value.bytesValue));
            case 7 /* RefValue */:
                return this.convertReference(value.referenceValue);
            case 8 /* GeoPointValue */:
                return this.convertGeoPoint(value.geoPointValue);
            case 9 /* ArrayValue */:
                return this.convertArray(value.arrayValue, serverTimestampBehavior);
            case 10 /* ObjectValue */:
                return this.convertObject(value.mapValue, serverTimestampBehavior);
            default:
                throw fail();
        }
    };
    AbstractUserDataWriter.prototype.convertObject = function (mapValue, serverTimestampBehavior) {
        var _this = this;
        var result = {};
        forEach(mapValue.fields, function (key, value) {
            result[key] = _this.convertValue(value, serverTimestampBehavior);
        });
        return result;
    };
    AbstractUserDataWriter.prototype.convertGeoPoint = function (value) {
        return new GeoPoint(normalizeNumber(value.latitude), normalizeNumber(value.longitude));
    };
    AbstractUserDataWriter.prototype.convertArray = function (arrayValue, serverTimestampBehavior) {
        var _this = this;
        return (arrayValue.values || []).map(function (value) { return _this.convertValue(value, serverTimestampBehavior); });
    };
    AbstractUserDataWriter.prototype.convertServerTimestamp = function (value, serverTimestampBehavior) {
        switch (serverTimestampBehavior) {
            case 'previous':
                var previousValue = getPreviousValue(value);
                if (previousValue == null) {
                    return null;
                }
                return this.convertValue(previousValue, serverTimestampBehavior);
            case 'estimate':
                return this.convertTimestamp(getLocalWriteTime(value));
            default:
                return null;
        }
    };
    AbstractUserDataWriter.prototype.convertTimestamp = function (value) {
        var normalizedValue = normalizeTimestamp(value);
        return new Timestamp(normalizedValue.seconds, normalizedValue.nanos);
    };
    AbstractUserDataWriter.prototype.convertDocumentKey = function (name, expectedDatabaseId) {
        var resourcePath = ResourcePath.fromString(name);
        hardAssert(isValidResourceName(resourcePath));
        var databaseId = new DatabaseId(resourcePath.get(1), resourcePath.get(3));
        var key = new DocumentKey(resourcePath.popFirst(5));
        if (!databaseId.isEqual(expectedDatabaseId)) {
            // TODO(b/64130202): Somehow support foreign references.
            logError("Document " + key + " contains a document " +
                "reference within a different database (" +
                (databaseId.projectId + "/" + databaseId.database + ") which is not ") +
                "supported. It will be treated as a reference in the current " +
                ("database (" + expectedDatabaseId.projectId + "/" + expectedDatabaseId.database + ") ") +
                "instead.");
        }
        return key;
    };
    return AbstractUserDataWriter;
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
/**
 * Converts custom model object of type T into DocumentData by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to DocumentData
 * because we want to provide the user with a more specific error message if
 * their set() or fails due to invalid data originating from a toFirestore()
 * call.
 */
function applyFirestoreDataConverter(converter, value, options) {
    var convertedValue;
    if (converter) {
        if (options && (options.merge || options.mergeFields)) {
            // Cast to `any` in order to satisfy the union type constraint on
            // toFirestore().
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            convertedValue = converter.toFirestore(value, options);
        }
        else {
            convertedValue = converter.toFirestore(value);
        }
    }
    else {
        convertedValue = value;
    }
    return convertedValue;
}
var LiteUserDataWriter = /** @class */ (function (_super) {
    tslib.__extends(LiteUserDataWriter, _super);
    function LiteUserDataWriter(firestore) {
        var _this = _super.call(this) || this;
        _this.firestore = firestore;
        return _this;
    }
    LiteUserDataWriter.prototype.convertBytes = function (bytes) {
        return new Bytes(bytes);
    };
    LiteUserDataWriter.prototype.convertReference = function (name) {
        var key = this.convertDocumentKey(name, this.firestore._databaseId);
        return new DocumentReference(this.firestore, /* converter= */ null, key);
    };
    return LiteUserDataWriter;
}(AbstractUserDataWriter));
/**
 * Reads the document referred to by the specified document reference.
 *
 * All documents are directly fetched from the server, even if the document was
 * previously read or modified. Recent modifications are only reflected in the
 * retrieved `DocumentSnapshot` if they have already been applied by the
 * backend. If the client is offline, the read fails. If you like to use
 * caching or see local modifications, please use the full Firestore SDK.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the current
 * document contents.
 */
function getDoc(reference) {
    reference = cast(reference, DocumentReference);
    var datastore = getDatastore(reference.firestore);
    var userDataWriter = new LiteUserDataWriter(reference.firestore);
    return invokeBatchGetDocumentsRpc(datastore, [reference._key]).then(function (result) {
        hardAssert(result.length === 1);
        var document = result[0];
        return new DocumentSnapshot(reference.firestore, userDataWriter, reference._key, document.isFoundDocument() ? document : null, reference.converter);
    });
}
/**
 * Executes the query and returns the results as a {@link QuerySnapshot}.
 *
 * All queries are executed directly by the server, even if the the query was
 * previously executed. Recent modifications are only reflected in the retrieved
 * results if they have already been applied by the backend. If the client is
 * offline, the operation fails. To see previously cached result and local
 * modifications, use the full Firestore SDK.
 *
 * @param query - The `Query` to execute.
 * @returns A Promise that will be resolved with the results of the query.
 */
function getDocs(query) {
    query = cast(query, Query);
    validateHasExplicitOrderByForLimitToLast(query._query);
    var datastore = getDatastore(query.firestore);
    var userDataWriter = new LiteUserDataWriter(query.firestore);
    return invokeRunQueryRpc(datastore, query._query).then(function (result) {
        var docs = result.map(function (doc) { return new QueryDocumentSnapshot(query.firestore, userDataWriter, doc.key, doc, query.converter); });
        if (hasLimitToLast(query._query)) {
            // Limit to last queries reverse the orderBy constraint that was
            // specified by the user. As such, we need to reverse the order of the
            // results to return the documents in the expected order.
            docs.reverse();
        }
        return new QuerySnapshot(query, docs);
    });
}
function setDoc(reference, data, options) {
    reference = cast(reference, DocumentReference);
    var convertedValue = applyFirestoreDataConverter(reference.converter, data, options);
    var dataReader = newUserDataReader(reference.firestore);
    var parsed = parseSetData(dataReader, 'setDoc', reference._key, convertedValue, reference.converter !== null, options);
    var datastore = getDatastore(reference.firestore);
    return invokeCommitRpc(datastore, [
        parsed.toMutation(reference._key, Precondition.none())
    ]);
}
function updateDoc(reference, fieldOrUpdateData, value) {
    var moreFieldsAndValues = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        moreFieldsAndValues[_i - 3] = arguments[_i];
    }
    reference = cast(reference, DocumentReference);
    var dataReader = newUserDataReader(reference.firestore);
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    fieldOrUpdateData = util.getModularInstance(fieldOrUpdateData);
    var parsed;
    if (typeof fieldOrUpdateData === 'string' ||
        fieldOrUpdateData instanceof FieldPath) {
        parsed = parseUpdateVarargs(dataReader, 'updateDoc', reference._key, fieldOrUpdateData, value, moreFieldsAndValues);
    }
    else {
        parsed = parseUpdateData(dataReader, 'updateDoc', reference._key, fieldOrUpdateData);
    }
    var datastore = getDatastore(reference.firestore);
    return invokeCommitRpc(datastore, [
        parsed.toMutation(reference._key, Precondition.exists(true))
    ]);
}
/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * The deletion will only be reflected in document reads that occur after the
 * returned Promise resolves. If the client is offline, the
 * delete fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend.
 */
function deleteDoc(reference) {
    reference = cast(reference, DocumentReference);
    var datastore = getDatastore(reference.firestore);
    return invokeCommitRpc(datastore, [
        new DeleteMutation(reference._key, Precondition.none())
    ]);
}
/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * The result of this write will only be reflected in document reads that occur
 * after the returned Promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A Promise resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend.
 */
function addDoc(reference, data) {
    reference = cast(reference, CollectionReference);
    var docRef = doc(reference);
    var convertedValue = applyFirestoreDataConverter(reference.converter, data);
    var dataReader = newUserDataReader(reference.firestore);
    var parsed = parseSetData(dataReader, 'addDoc', docRef._key, convertedValue, docRef.converter !== null, {});
    var datastore = getDatastore(reference.firestore);
    return invokeCommitRpc(datastore, [
        parsed.toMutation(docRef._key, Precondition.exists(false))
    ]).then(function () { return docRef; });
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
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */
function deleteField() {
    return new DeleteFieldValueImpl('deleteField');
}
/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */
function serverTimestamp() {
    return new ServerTimestampFieldValueImpl('serverTimestamp');
}
/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */
function arrayUnion() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
    return new ArrayUnionFieldValueImpl('arrayUnion', elements);
}
/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */
function arrayRemove() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
    return new ArrayRemoveFieldValueImpl('arrayRemove', elements);
}
/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */
function increment(n) {
    return new NumericIncrementFieldValueImpl('increment', n);
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
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */
var WriteBatch = /** @class */ (function () {
    /** @hideconstructor */
    function WriteBatch(_firestore, _commitHandler) {
        this._firestore = _firestore;
        this._commitHandler = _commitHandler;
        this._mutations = [];
        this._committed = false;
        this._dataReader = newUserDataReader(_firestore);
    }
    WriteBatch.prototype.set = function (documentRef, data, options) {
        this._verifyNotCommitted();
        var ref = validateReference(documentRef, this._firestore);
        var convertedValue = applyFirestoreDataConverter(ref.converter, data, options);
        var parsed = parseSetData(this._dataReader, 'WriteBatch.set', ref._key, convertedValue, ref.converter !== null, options);
        this._mutations.push(parsed.toMutation(ref._key, Precondition.none()));
        return this;
    };
    WriteBatch.prototype.update = function (documentRef, fieldOrUpdateData, value) {
        var moreFieldsAndValues = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            moreFieldsAndValues[_i - 3] = arguments[_i];
        }
        this._verifyNotCommitted();
        var ref = validateReference(documentRef, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        fieldOrUpdateData = util.getModularInstance(fieldOrUpdateData);
        var parsed;
        if (typeof fieldOrUpdateData === 'string' ||
            fieldOrUpdateData instanceof FieldPath) {
            parsed = parseUpdateVarargs(this._dataReader, 'WriteBatch.update', ref._key, fieldOrUpdateData, value, moreFieldsAndValues);
        }
        else {
            parsed = parseUpdateData(this._dataReader, 'WriteBatch.update', ref._key, fieldOrUpdateData);
        }
        this._mutations.push(parsed.toMutation(ref._key, Precondition.exists(true)));
        return this;
    };
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    WriteBatch.prototype.delete = function (documentRef) {
        this._verifyNotCommitted();
        var ref = validateReference(documentRef, this._firestore);
        this._mutations = this._mutations.concat(new DeleteMutation(ref._key, Precondition.none()));
        return this;
    };
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned Promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A Promise resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */
    WriteBatch.prototype.commit = function () {
        this._verifyNotCommitted();
        this._committed = true;
        if (this._mutations.length > 0) {
            return this._commitHandler(this._mutations);
        }
        return Promise.resolve();
    };
    WriteBatch.prototype._verifyNotCommitted = function () {
        if (this._committed) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, 'A write batch can no longer be used after commit() ' +
                'has been called.');
        }
    };
    return WriteBatch;
}());
function validateReference(documentRef, firestore) {
    documentRef = util.getModularInstance(documentRef);
    if (documentRef.firestore !== firestore) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Provided document reference is from a different Firestore instance.');
    }
    else {
        return documentRef;
    }
}
/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single WriteBatch
 * is 500.
 *
 * The result of these writes will only be reflected in document reads that
 * occur after the returned Promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @returns A `WriteBatch` that can be used to atomically execute multiple
 * writes.
 */
function writeBatch(firestore) {
    firestore = cast(firestore, FirebaseFirestore);
    var datastore = getDatastore(firestore);
    return new WriteBatch(firestore, function (writes) { return invokeCommitRpc(datastore, writes); });
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
 * Internal transaction object responsible for accumulating the mutations to
 * perform and the base versions for any documents read.
 */
var Transaction$1 = /** @class */ (function () {
    function Transaction$1(datastore) {
        this.datastore = datastore;
        // The version of each document that was read during this transaction.
        this.readVersions = new Map();
        this.mutations = [];
        this.committed = false;
        /**
         * A deferred usage error that occurred previously in this transaction that
         * will cause the transaction to fail once it actually commits.
         */
        this.lastWriteError = null;
        /**
         * Set of documents that have been written in the transaction.
         *
         * When there's more than one write to the same key in a transaction, any
         * writes after the first are handled differently.
         */
        this.writtenDocs = new Set();
    }
    Transaction$1.prototype.lookup = function (keys) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var docs;
            var _this = this;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.ensureCommitNotCalled();
                        if (this.mutations.length > 0) {
                            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Firestore transactions require all reads to be executed before all writes.');
                        }
                        return [4 /*yield*/, invokeBatchGetDocumentsRpc(this.datastore, keys)];
                    case 1:
                        docs = _c.sent();
                        docs.forEach(function (doc) { return _this.recordVersion(doc); });
                        return [2 /*return*/, docs];
                }
            });
        });
    };
    Transaction$1.prototype.set = function (key, data) {
        this.write(data.toMutation(key, this.precondition(key)));
        this.writtenDocs.add(key.toString());
    };
    Transaction$1.prototype.update = function (key, data) {
        try {
            this.write(data.toMutation(key, this.preconditionForUpdate(key)));
        }
        catch (e) {
            this.lastWriteError = e;
        }
        this.writtenDocs.add(key.toString());
    };
    Transaction$1.prototype.delete = function (key) {
        this.write(new DeleteMutation(key, this.precondition(key)));
        this.writtenDocs.add(key.toString());
    };
    Transaction$1.prototype.commit = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var unwritten;
            var _this = this;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.ensureCommitNotCalled();
                        if (this.lastWriteError) {
                            throw this.lastWriteError;
                        }
                        unwritten = this.readVersions;
                        // For each mutation, note that the doc was written.
                        this.mutations.forEach(function (mutation) {
                            unwritten.delete(mutation.key.toString());
                        });
                        // For each document that was read but not written to, we want to perform
                        // a `verify` operation.
                        unwritten.forEach(function (_, path) {
                            var key = DocumentKey.fromPath(path);
                            _this.mutations.push(new VerifyMutation(key, _this.precondition(key)));
                        });
                        return [4 /*yield*/, invokeCommitRpc(this.datastore, this.mutations)];
                    case 1:
                        _c.sent();
                        this.committed = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Transaction$1.prototype.recordVersion = function (doc) {
        var docVersion;
        if (doc.isFoundDocument()) {
            docVersion = doc.version;
        }
        else if (doc.isNoDocument()) {
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
            docVersion = SnapshotVersion.min();
        }
        else {
            throw fail();
        }
        var existingVersion = this.readVersions.get(doc.key.toString());
        if (existingVersion) {
            if (!docVersion.isEqual(existingVersion)) {
                // This transaction will fail no matter what.
                throw new FirestoreError(Code.ABORTED, 'Document version changed between two reads.');
            }
        }
        else {
            this.readVersions.set(doc.key.toString(), docVersion);
        }
    };
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    Transaction$1.prototype.precondition = function (key) {
        var version = this.readVersions.get(key.toString());
        if (!this.writtenDocs.has(key.toString()) && version) {
            return Precondition.updateTime(version);
        }
        else {
            return Precondition.none();
        }
    };
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    Transaction$1.prototype.preconditionForUpdate = function (key) {
        var version = this.readVersions.get(key.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
        if (!this.writtenDocs.has(key.toString()) && version) {
            if (version.isEqual(SnapshotVersion.min())) {
                // The document doesn't exist, so fail the transaction.
                // This has to be validated locally because you can't send a
                // precondition that a document does not exist without changing the
                // semantics of the backend write to be an insert. This is the reverse
                // of what we want, since we want to assert that the document doesn't
                // exist but then send the update and have it fail. Since we can't
                // express that to the backend, we have to validate locally.
                // Note: this can change once we can send separate verify writes in the
                // transaction.
                throw new FirestoreError(Code.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            }
            // Document exists, base precondition on document update time.
            return Precondition.updateTime(version);
        }
        else {
            // Document was not read, so we just use the preconditions for a blind
            // update.
            return Precondition.exists(true);
        }
    };
    Transaction$1.prototype.write = function (mutation) {
        this.ensureCommitNotCalled();
        this.mutations.push(mutation);
    };
    Transaction$1.prototype.ensureCommitNotCalled = function () {
    };
    return Transaction$1;
}());
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
var DEFAULT_MAX_ATTEMPTS_COUNT = 5;
/**
 * TransactionRunner encapsulates the logic needed to run and retry transactions
 * with backoff.
 */
var TransactionRunner = /** @class */ (function () {
    function TransactionRunner(asyncQueue, datastore, updateFunction, deferred) {
        this.asyncQueue = asyncQueue;
        this.datastore = datastore;
        this.updateFunction = updateFunction;
        this.deferred = deferred;
        this.attemptsRemaining = DEFAULT_MAX_ATTEMPTS_COUNT;
        this.backoff = new ExponentialBackoff(this.asyncQueue, "transaction_retry" /* TransactionRetry */);
    }
    /** Runs the transaction and sets the result on deferred. */
    TransactionRunner.prototype.run = function () {
        this.attemptsRemaining -= 1;
        this.runWithBackOff();
    };
    TransactionRunner.prototype.runWithBackOff = function () {
        var _this = this;
        this.backoff.backoffAndRun(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
            var transaction, userPromise;
            var _this = this;
            return tslib.__generator(this, function (_c) {
                transaction = new Transaction$1(this.datastore);
                userPromise = this.tryRunUpdateFunction(transaction);
                if (userPromise) {
                    userPromise
                        .then(function (result) {
                        _this.asyncQueue.enqueueAndForget(function () {
                            return transaction
                                .commit()
                                .then(function () {
                                _this.deferred.resolve(result);
                            })
                                .catch(function (commitError) {
                                _this.handleTransactionError(commitError);
                            });
                        });
                    })
                        .catch(function (userPromiseError) {
                        _this.handleTransactionError(userPromiseError);
                    });
                }
                return [2 /*return*/];
            });
        }); });
    };
    TransactionRunner.prototype.tryRunUpdateFunction = function (transaction) {
        try {
            var userPromise = this.updateFunction(transaction);
            if (isNullOrUndefined(userPromise) ||
                !userPromise.catch ||
                !userPromise.then) {
                this.deferred.reject(Error('Transaction callback must return a Promise'));
                return null;
            }
            return userPromise;
        }
        catch (error) {
            // Do not retry errors thrown by user provided updateFunction.
            this.deferred.reject(error);
            return null;
        }
    };
    TransactionRunner.prototype.handleTransactionError = function (error) {
        var _this = this;
        if (this.attemptsRemaining > 0 && this.isRetryableTransactionError(error)) {
            this.attemptsRemaining -= 1;
            this.asyncQueue.enqueueAndForget(function () {
                _this.runWithBackOff();
                return Promise.resolve();
            });
        }
        else {
            this.deferred.reject(error);
        }
    };
    TransactionRunner.prototype.isRetryableTransactionError = function (error) {
        if (error.name === 'FirebaseError') {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            var code = error.code;
            return (code === 'aborted' ||
                code === 'failed-precondition' ||
                !isPermanentError(code));
        }
        return false;
    };
    return TransactionRunner;
}());
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
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */
var DelayedOperation = /** @class */ (function () {
    function DelayedOperation(asyncQueue, timerId, targetTimeMs, op, removalCallback) {
        this.asyncQueue = asyncQueue;
        this.timerId = timerId;
        this.targetTimeMs = targetTimeMs;
        this.op = op;
        this.removalCallback = removalCallback;
        this.deferred = new Deferred();
        this.then = this.deferred.promise.then.bind(this.deferred.promise);
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.deferred.promise.catch(function (err) { });
    }
    /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue - The queue to schedule the operation on.
     * @param id - A Timer ID identifying the type of operation this is.
     * @param delayMs - The delay (ms) before the operation should be scheduled.
     * @param op - The operation to run.
     * @param removalCallback - A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */
    DelayedOperation.createAndSchedule = function (asyncQueue, timerId, delayMs, op, removalCallback) {
        var targetTime = Date.now() + delayMs;
        var delayedOp = new DelayedOperation(asyncQueue, timerId, targetTime, op, removalCallback);
        delayedOp.start(delayMs);
        return delayedOp;
    };
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    DelayedOperation.prototype.start = function (delayMs) {
        var _this = this;
        this.timerHandle = setTimeout(function () { return _this.handleDelayElapsed(); }, delayMs);
    };
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    DelayedOperation.prototype.skipDelay = function () {
        return this.handleDelayElapsed();
    };
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    DelayedOperation.prototype.cancel = function (reason) {
        if (this.timerHandle !== null) {
            this.clearTimeout();
            this.deferred.reject(new FirestoreError(Code.CANCELLED, 'Operation cancelled' + (reason ? ': ' + reason : '')));
        }
    };
    DelayedOperation.prototype.handleDelayElapsed = function () {
        var _this = this;
        this.asyncQueue.enqueueAndForget(function () {
            if (_this.timerHandle !== null) {
                _this.clearTimeout();
                return _this.op().then(function (result) {
                    return _this.deferred.resolve(result);
                });
            }
            else {
                return Promise.resolve();
            }
        });
    };
    DelayedOperation.prototype.clearTimeout = function () {
        if (this.timerHandle !== null) {
            this.removalCallback(this);
            clearTimeout(this.timerHandle);
            this.timerHandle = null;
        }
    };
    return DelayedOperation;
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
var LOG_TAG = 'AsyncQueue';
var AsyncQueueImpl = /** @class */ (function () {
    function AsyncQueueImpl() {
        var _this = this;
        // The last promise in the queue.
        this.tail = Promise.resolve();
        // A list of retryable operations. Retryable operations are run in order and
        // retried with backoff.
        this.retryableOps = [];
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this._isShuttingDown = false;
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.delayedOperations = [];
        // visible for testing
        this.failure = null;
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.operationInProgress = false;
        // Enabled during shutdown on Safari to prevent future access to IndexedDB.
        this.skipNonRestrictedTasks = false;
        // List of TimerIds to fast-forward delays for.
        this.timerIdsToSkip = [];
        // Backoff timer used to schedule retries for retryable operations
        this.backoff = new ExponentialBackoff(this, "async_queue_retry" /* AsyncQueueRetry */);
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.visibilityHandler = function () {
            _this.backoff.skipBackoff();
        };
    }
    Object.defineProperty(AsyncQueueImpl.prototype, "isShuttingDown", {
        get: function () {
            return this._isShuttingDown;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    AsyncQueueImpl.prototype.enqueueAndForget = function (op) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(op);
    };
    AsyncQueueImpl.prototype.enqueueAndForgetEvenWhileRestricted = function (op) {
        this.verifyNotFailed();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueueInternal(op);
    };
    AsyncQueueImpl.prototype.enterRestrictedMode = function (purgeExistingTasks) {
        if (!this._isShuttingDown) {
            this._isShuttingDown = true;
            this.skipNonRestrictedTasks = purgeExistingTasks || false;
        }
    };
    AsyncQueueImpl.prototype.enqueue = function (op) {
        var _this = this;
        this.verifyNotFailed();
        if (this._isShuttingDown) {
            // Return a Promise which never resolves.
            return new Promise(function () { });
        }
        // Create a deferred Promise that we can return to the callee. This
        // allows us to return a "hanging Promise" only to the callee and still
        // advance the queue even when the operation is not run.
        var task = new Deferred();
        return this.enqueueInternal(function () {
            if (_this._isShuttingDown && _this.skipNonRestrictedTasks) {
                // We do not resolve 'task'
                return Promise.resolve();
            }
            op().then(task.resolve, task.reject);
            return task.promise;
        }).then(function () { return task.promise; });
    };
    AsyncQueueImpl.prototype.enqueueRetryable = function (op) {
        var _this = this;
        this.enqueueAndForget(function () {
            _this.retryableOps.push(op);
            return _this.retryNextOp();
        });
    };
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    AsyncQueueImpl.prototype.retryNextOp = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var e_1;
            var _this = this;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.retryableOps.length === 0) {
                            return [2 /*return*/];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.retryableOps[0]()];
                    case 2:
                        _c.sent();
                        this.retryableOps.shift();
                        this.backoff.reset();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        if (isIndexedDbTransactionError(e_1)) {
                            logDebug(LOG_TAG, 'Operation failed with retryable error: ' + e_1);
                        }
                        else {
                            throw e_1; // Failure will be handled by AsyncQueue
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        if (this.retryableOps.length > 0) {
                            // If there are additional operations, we re-schedule `retryNextOp()`.
                            // This is necessary to run retryable operations that failed during
                            // their initial attempt since we don't know whether they are already
                            // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
                            // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
                            // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
                            // call scheduled here.
                            // Since `backoffAndRun()` cancels an existing backoff and schedules a
                            // new backoff on every call, there is only ever a single additional
                            // operation in the queue.
                            this.backoff.backoffAndRun(function () { return _this.retryNextOp(); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AsyncQueueImpl.prototype.enqueueInternal = function (op) {
        var _this = this;
        var newTail = this.tail.then(function () {
            _this.operationInProgress = true;
            return op()
                .catch(function (error) {
                _this.failure = error;
                _this.operationInProgress = false;
                var message = getMessageOrStack(error);
                logError('INTERNAL UNHANDLED ERROR: ', message);
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw error;
            })
                .then(function (result) {
                _this.operationInProgress = false;
                return result;
            });
        });
        this.tail = newTail;
        return newTail;
    };
    AsyncQueueImpl.prototype.enqueueAfterDelay = function (timerId, delayMs, op) {
        var _this = this;
        this.verifyNotFailed();
        // Fast-forward delays for timerIds that have been overriden.
        if (this.timerIdsToSkip.indexOf(timerId) > -1) {
            delayMs = 0;
        }
        var delayedOp = DelayedOperation.createAndSchedule(this, timerId, delayMs, op, function (removedOp) { return _this.removeDelayedOperation(removedOp); });
        this.delayedOperations.push(delayedOp);
        return delayedOp;
    };
    AsyncQueueImpl.prototype.verifyNotFailed = function () {
        if (this.failure) {
            fail();
        }
    };
    AsyncQueueImpl.prototype.verifyOperationInProgress = function () {
    };
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    AsyncQueueImpl.prototype.drain = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var currentTail;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        currentTail = this.tail;
                        return [4 /*yield*/, currentTail];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        if (currentTail !== this.tail) return [3 /*break*/, 0];
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    AsyncQueueImpl.prototype.containsDelayedOperation = function (timerId) {
        for (var _i = 0, _c = this.delayedOperations; _i < _c.length; _i++) {
            var op = _c[_i];
            if (op.timerId === timerId) {
                return true;
            }
        }
        return false;
    };
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    AsyncQueueImpl.prototype.runAllDelayedOperationsUntil = function (lastTimerId) {
        var _this = this;
        // Note that draining may generate more delayed ops, so we do that first.
        return this.drain().then(function () {
            // Run ops in the same order they'd run if they ran naturally.
            _this.delayedOperations.sort(function (a, b) { return a.targetTimeMs - b.targetTimeMs; });
            for (var _i = 0, _c = _this.delayedOperations; _i < _c.length; _i++) {
                var op = _c[_i];
                op.skipDelay();
                if (lastTimerId !== "all" /* All */ && op.timerId === lastTimerId) {
                    break;
                }
            }
            return _this.drain();
        });
    };
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    AsyncQueueImpl.prototype.skipDelaysForTimerId = function (timerId) {
        this.timerIdsToSkip.push(timerId);
    };
    /** Called once a DelayedOperation is run or canceled. */
    AsyncQueueImpl.prototype.removeDelayedOperation = function (op) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var index = this.delayedOperations.indexOf(op);
        this.delayedOperations.splice(index, 1);
    };
    return AsyncQueueImpl;
}());
function newAsyncQueue() {
    return new AsyncQueueImpl();
}
/**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error - Error or FirestoreError
 */
function getMessageOrStack(error) {
    var message = error.message || '';
    if (error.stack) {
        if (error.stack.includes(error.message)) {
            message = error.stack;
        }
        else {
            message = error.message + '\n' + error.stack;
        }
    }
    return message;
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
// TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
// legacy SDK.
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */
var Transaction = /** @class */ (function () {
    /** @hideconstructor */
    function Transaction(_firestore, _transaction) {
        this._firestore = _firestore;
        this._transaction = _transaction;
        this._dataReader = newUserDataReader(_firestore);
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */
    Transaction.prototype.get = function (documentRef) {
        var _this = this;
        var ref = validateReference(documentRef, this._firestore);
        var userDataWriter = new LiteUserDataWriter(this._firestore);
        return this._transaction.lookup([ref._key]).then(function (docs) {
            if (!docs || docs.length !== 1) {
                return fail();
            }
            var doc = docs[0];
            if (doc.isFoundDocument()) {
                return new DocumentSnapshot(_this._firestore, userDataWriter, doc.key, doc, ref.converter);
            }
            else if (doc.isNoDocument()) {
                return new DocumentSnapshot(_this._firestore, userDataWriter, ref._key, null, ref.converter);
            }
            else {
                throw fail();
            }
        });
    };
    Transaction.prototype.set = function (documentRef, value, options) {
        var ref = validateReference(documentRef, this._firestore);
        var convertedValue = applyFirestoreDataConverter(ref.converter, value, options);
        var parsed = parseSetData(this._dataReader, 'Transaction.set', ref._key, convertedValue, ref.converter !== null, options);
        this._transaction.set(ref._key, parsed);
        return this;
    };
    Transaction.prototype.update = function (documentRef, fieldOrUpdateData, value) {
        var moreFieldsAndValues = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            moreFieldsAndValues[_i - 3] = arguments[_i];
        }
        var ref = validateReference(documentRef, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        fieldOrUpdateData = util.getModularInstance(fieldOrUpdateData);
        var parsed;
        if (typeof fieldOrUpdateData === 'string' ||
            fieldOrUpdateData instanceof FieldPath) {
            parsed = parseUpdateVarargs(this._dataReader, 'Transaction.update', ref._key, fieldOrUpdateData, value, moreFieldsAndValues);
        }
        else {
            parsed = parseUpdateData(this._dataReader, 'Transaction.update', ref._key, fieldOrUpdateData);
        }
        this._transaction.update(ref._key, parsed);
        return this;
    };
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    Transaction.prototype.delete = function (documentRef) {
        var ref = validateReference(documentRef, this._firestore);
        this._transaction.delete(ref._key);
        return this;
    };
    return Transaction;
}());
/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */
function runTransaction(firestore, updateFunction) {
    firestore = cast(firestore, FirebaseFirestore);
    var datastore = getDatastore(firestore);
    var deferred = new Deferred();
    new TransactionRunner(newAsyncQueue(), datastore, function (internalTransaction) { return updateFunction(new Transaction(firestore, internalTransaction)); }, deferred).run();
    return deferred.promise;
}
/**
 * Firestore Lite
 *
 * @remarks Firestore Lite is a small online-only SDK that allows read
 * and write access to your Firestore database. All operations connect
 * directly to the backend, and `onSnapshot()` APIs are not supported.
 * @packageDocumentation
 */
registerFirestore();

exports.Bytes = Bytes;
exports.CollectionReference = CollectionReference;
exports.DocumentReference = DocumentReference;
exports.DocumentSnapshot = DocumentSnapshot;
exports.FieldPath = FieldPath;
exports.FieldValue = FieldValue;
exports.FirebaseFirestore = FirebaseFirestore;
exports.FirestoreError = FirestoreError;
exports.GeoPoint = GeoPoint;
exports.Query = Query;
exports.QueryConstraint = QueryConstraint;
exports.QueryDocumentSnapshot = QueryDocumentSnapshot;
exports.QuerySnapshot = QuerySnapshot;
exports.Timestamp = Timestamp;
exports.Transaction = Transaction;
exports.WriteBatch = WriteBatch;
exports.addDoc = addDoc;
exports.arrayRemove = arrayRemove;
exports.arrayUnion = arrayUnion;
exports.collection = collection;
exports.collectionGroup = collectionGroup;
exports.deleteDoc = deleteDoc;
exports.deleteField = deleteField;
exports.doc = doc;
exports.documentId = documentId;
exports.endAt = endAt;
exports.endBefore = endBefore;
exports.getDoc = getDoc;
exports.getDocs = getDocs;
exports.getFirestore = getFirestore;
exports.increment = increment;
exports.initializeFirestore = initializeFirestore;
exports.limit = limit;
exports.limitToLast = limitToLast;
exports.orderBy = orderBy;
exports.query = query;
exports.queryEqual = queryEqual;
exports.refEqual = refEqual;
exports.runTransaction = runTransaction;
exports.serverTimestamp = serverTimestamp;
exports.setDoc = setDoc;
exports.setLogLevel = setLogLevel;
exports.snapshotEqual = snapshotEqual;
exports.startAfter = startAfter;
exports.startAt = startAt;
exports.terminate = terminate;
exports.updateDoc = updateDoc;
exports.useFirestoreEmulator = useFirestoreEmulator;
exports.where = where;
exports.writeBatch = writeBatch;
//# sourceMappingURL=index.node.cjs.js.map
