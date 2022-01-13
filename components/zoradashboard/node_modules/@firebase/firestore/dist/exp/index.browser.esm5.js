import { __extends as t, __spreadArray as e, __awaiter as n, __generator as r } from "tslib";

import { _getProvider as i, getApp as o, _removeServiceInstance as s, SDK_VERSION as u, _registerComponent as a, registerVersion as c } from "@firebase/app";

import { Component as h } from "@firebase/component";

import { getUA as f, isSafari as l, isMobileCordova as d, isReactNative as p, isElectron as y, isIE as v, isUWP as m, isBrowserExtension as g, createMockUserToken as w, getModularInstance as b } from "@firebase/util";

import { Logger as I, LogLevel as T } from "@firebase/logger";

import { XhrIo as E, EventType as S, ErrorCode as _, createWebChannelTransport as N, getStatEventTarget as D, FetchXmlHttpFactory as A, WebChannel as k, Event as C, Stat as x } from "@firebase/webchannel-wrapper";

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
 */ var R = "8.8.0", L = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.previousValue = t, e && (e.sequenceNumberHandler = function(t) {
            return n.t(t);
        }, this.i = function(t) {
            return e.writeSequenceNumber(t);
        });
    }
    return t.prototype.t = function(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }, t.prototype.next = function() {
        var t = ++this.previousValue;
        return this.i && this.i(t), t;
    }, t;
}();

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
/**
 * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
 * exceed. All subsequent calls to next will return increasing values. If provided with a
 * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
 * well as write out sequence numbers that it produces via `next()`.
 */ L.o = -1;

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
var O = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: "ok",
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: "cancelled",
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: "unknown",
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: "invalid-argument",
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: "deadline-exceeded",
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: "not-found",
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: "already-exists",
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: "permission-denied",
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: "unauthenticated",
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: "resource-exhausted",
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
    FAILED_PRECONDITION: "failed-precondition",
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: "aborted",
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
    OUT_OF_RANGE: "out-of-range",
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: "internal",
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: "unavailable",
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: "data-loss"
}, P = /** @class */ function(e) {
    /** @hideconstructor */
    function n(
    /**
     * The backend error code associated with this error.
     */
    t, 
    /**
     * A custom error description.
     */
    n) {
        var r = this;
        return (r = e.call(this, n) || this).code = t, r.message = n, 
        /** The custom name for all FirestoreErrors. */
        r.name = "FirebaseError", 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        r.toString = function() {
            return r.name + ": [code=" + r.code + "]: " + r.message;
        }, r;
    }
    return t(n, e), n;
}(Error), F = new I("@firebase/firestore");

/** An error returned by a Firestore operation. */
// Helper methods are needed because variables can't be exported as read/write
function M() {
    return F.logLevel;
}

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
 */ function V(t) {
    F.setLogLevel(t);
}

function q(t) {
    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
    if (F.logLevel <= T.DEBUG) {
        var i = n.map(j);
        F.debug.apply(F, e([ "Firestore (" + R + "): " + t ], i));
    }
}

function U(t) {
    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
    if (F.logLevel <= T.ERROR) {
        var i = n.map(j);
        F.error.apply(F, e([ "Firestore (" + R + "): " + t ], i));
    }
}

function B(t) {
    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
    if (F.logLevel <= T.WARN) {
        var i = n.map(j);
        F.warn.apply(F, e([ "Firestore (" + R + "): " + t ], i));
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function j(t) {
    if ("string" == typeof t) return t;
    try {
        return e = t, JSON.stringify(e);
    } catch (e) {
        // Converting to JSON failed, just log the object directly
        return t;
    }
    var e;
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
 */ function K(t) {
    void 0 === t && (t = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var e = "FIRESTORE (" + R + ") INTERNAL ASSERTION FAILED: " + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
        throw U(e), new Error(e)
    /**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */;
}

function G(t, e) {
    t || K();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function z(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    return t;
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
 */ function Q(t) {
    // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
    var e = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
    if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n); else 
    // Falls back to Math.random
    for (var r = 0; r < t; r++) n[r] = Math.floor(256 * Math.random());
    return n;
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
 */ var W = /** @class */ function() {
    function t() {}
    return t.u = function() {
        for (
        // Alphanumeric characters
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length, n = ""
        // The largest byte value that is a multiple of `char.length`.
        ; n.length < 20; ) for (var r = Q(40), i = 0; i < r.length; ++i) 
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
        return n;
    }, t;
}();

function H(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function Y(t, e, n) {
    return t.length === e.length && t.every((function(t, r) {
        return n(t, e[r]);
    }));
}

/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */ function X(t) {
    // Return the input string, with an additional NUL byte appended.
    return t + "\0";
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
 */ var $ = /** @class */ function() {
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
    function t(
    /**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */
    t, 
    /**
     * The fractions of a second at nanosecond resolution.*
     */
    e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new P(O.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new P(O.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new P(O.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new P(O.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
    }
    /**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */    return t.now = function() {
        return t.fromMillis(Date.now());
    }, 
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */
    t.fromDate = function(e) {
        return t.fromMillis(e.getTime());
    }, 
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */
    t.fromMillis = function(e) {
        var n = Math.floor(e / 1e3);
        return new t(n, Math.floor(1e6 * (e - 1e3 * n)));
    }, 
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */
    t.prototype.toDate = function() {
        return new Date(this.toMillis());
    }, 
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */
    t.prototype.toMillis = function() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }, t.prototype._compareTo = function(t) {
        return this.seconds === t.seconds ? H(this.nanoseconds, t.nanoseconds) : H(this.seconds, t.seconds);
    }, 
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }, 
    /** Returns a textual representation of this Timestamp. */ t.prototype.toString = function() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }, 
    /** Returns a JSON-serializable representation of this Timestamp. */ t.prototype.toJSON = function() {
        return {
            seconds: this.seconds,
            nanoseconds: this.nanoseconds
        };
    }, 
    /**
     * Converts this object to a primitive string, which allows Timestamp objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */
    t.prototype.valueOf = function() {
        // This method returns a string of the form <seconds>.<nanoseconds> where
        // <seconds> is translated to have a non-negative value and both <seconds>
        // and <nanoseconds> are left-padded with zeroes to be a consistent length.
        // Strings with this format then have a lexiographical ordering that matches
        // the expected ordering. The <seconds> translation is done to avoid having
        // a leading negative sign (i.e. a leading '-' character) in its string
        // representation, which would affect its lexiographical ordering.
        var t = this.seconds - -62135596800;
        // Note: Up to 12 decimal digits are required to represent all valid
        // 'seconds' values.
                return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }, t;
}(), J = /** @class */ function() {
    function t(t) {
        this.timestamp = t;
    }
    return t.fromTimestamp = function(e) {
        return new t(e);
    }, t.min = function() {
        return new t(new $(0, 0));
    }, t.prototype.compareTo = function(t) {
        return this.timestamp._compareTo(t.timestamp);
    }, t.prototype.isEqual = function(t) {
        return this.timestamp.isEqual(t.timestamp);
    }, 
    /** Returns a number representation of the version for use in spec tests. */ t.prototype.toMicroseconds = function() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }, t.prototype.toString = function() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }, t.prototype.toTimestamp = function() {
        return this.timestamp;
    }, t;
}();

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
function Z(t) {
    var e = 0;
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function tt(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function et(t) {
    for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
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
 * Path represents an ordered sequence of string segments.
 */ var nt = /** @class */ function() {
    function t(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && K(), void 0 === n ? n = t.length - e : n > t.length - e && K(), 
        this.segments = t, this.offset = e, this.len = n;
    }
    return Object.defineProperty(t.prototype, "length", {
        get: function() {
            return this.len;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return 0 === t.comparator(this, e);
    }, t.prototype.child = function(e) {
        var n = this.segments.slice(this.offset, this.limit());
        return e instanceof t ? e.forEach((function(t) {
            n.push(t);
        })) : n.push(e), this.construct(n);
    }, 
    /** The index of one past the last segment of the path. */ t.prototype.limit = function() {
        return this.offset + this.length;
    }, t.prototype.popFirst = function(t) {
        return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t);
    }, t.prototype.popLast = function() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }, t.prototype.firstSegment = function() {
        return this.segments[this.offset];
    }, t.prototype.lastSegment = function() {
        return this.get(this.length - 1);
    }, t.prototype.get = function(t) {
        return this.segments[this.offset + t];
    }, t.prototype.isEmpty = function() {
        return 0 === this.length;
    }, t.prototype.isPrefixOf = function(t) {
        if (t.length < this.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.isImmediateParentOf = function(t) {
        if (this.length + 1 !== t.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.forEach = function(t) {
        for (var e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
    }, t.prototype.toArray = function() {
        return this.segments.slice(this.offset, this.limit());
    }, t.comparator = function(t, e) {
        for (var n = Math.min(t.length, e.length), r = 0; r < n; r++) {
            var i = t.get(r), o = e.get(r);
            if (i < o) return -1;
            if (i > o) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }, t;
}(), rt = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.construct = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype.canonicalString = function() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.toArray().join("/");
    }, n.prototype.toString = function() {
        return this.canonicalString();
    }, 
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    n.fromString = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
                for (var r = [], i = 0, o = t; i < o.length; i++) {
            var s = o[i];
            if (s.indexOf("//") >= 0) throw new P(O.INVALID_ARGUMENT, "Invalid segment (" + s + "). Paths must not contain // in them.");
            // Strip leading and traling slashed.
                        r.push.apply(r, s.split("/").filter((function(t) {
                return t.length > 0;
            })));
        }
        return new n(r);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(nt), it = /^[_a-zA-Z][_a-zA-Z0-9]*$/, ot = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.construct = function(t, e, r) {
        return new n(t, e, r);
    }, 
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    n.isValidIdentifier = function(t) {
        return it.test(t);
    }, n.prototype.canonicalString = function() {
        return this.toArray().map((function(t) {
            return t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), n.isValidIdentifier(t) || (t = "`" + t + "`"), 
            t;
        })).join(".");
    }, n.prototype.toString = function() {
        return this.canonicalString();
    }, 
    /**
     * Returns true if this field references the key of a document.
     */
    n.prototype.isKeyField = function() {
        return 1 === this.length && "__name__" === this.get(0);
    }, 
    /**
     * The field designating the key of a document.
     */
    n.keyField = function() {
        return new n([ "__name__" ]);
    }, 
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
    n.fromServerFormat = function(t) {
        for (var e = [], r = "", i = 0, o = function() {
            if (0 === r.length) throw new P(O.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            e.push(r), r = "";
        }, s = !1; i < t.length; ) {
            var u = t[i];
            if ("\\" === u) {
                if (i + 1 === t.length) throw new P(O.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                var a = t[i + 1];
                if ("\\" !== a && "." !== a && "`" !== a) throw new P(O.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                r += a, i += 2;
            } else "`" === u ? (s = !s, i++) : "." !== u || s ? (r += u, i++) : (o(), i++);
        }
        if (o(), s) throw new P(O.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new n(e);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(nt), st = /** @class */ function() {
    function t(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(ot.comparator)
        /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */;
    }
    return t.prototype.covers = function(t) {
        for (var e = 0, n = this.fields; e < n.length; e++) {
            if (n[e].isPrefixOf(t)) return !0;
        }
        return !1;
    }, t.prototype.isEqual = function(t) {
        return Y(this.fields, t.fields, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), ut = /** @class */ function() {
    function t(t) {
        this.binaryString = t;
    }
    return t.fromBase64String = function(e) {
        return new t(atob(e));
    }, t.fromUint8Array = function(e) {
        return new t(
        /**
 * Helper function to convert an Uint8array to a binary string.
 */
        function(t) {
            for (var e = "", n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
            return e;
        }(e));
    }, t.prototype.toBase64 = function() {
        return t = this.binaryString, btoa(t);
        /** Converts a binary string to a Base64 encoded string. */        var t;
    }, t.prototype.toUint8Array = function() {
        return function(t) {
            for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }(this.binaryString);
    }, t.prototype.approximateByteSize = function() {
        return 2 * this.binaryString.length;
    }, t.prototype.compareTo = function(t) {
        return H(this.binaryString, t.binaryString);
    }, t.prototype.isEqual = function(t) {
        return this.binaryString === t.binaryString;
    }, t;
}();

/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 */ ut.EMPTY_BYTE_STRING = new ut("");

var at = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */ function ct(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (G(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var e = 0, n = at.exec(t);
        if (G(!!n), n[1]) {
            // Pad the fraction out to 9 digits (nanos).
            var r = n[1];
            r = (r + "000000000").substr(0, 9), e = Number(r);
        }
        // Parse the date to get the seconds.
                var i = new Date(t);
        return {
            seconds: Math.floor(i.getTime() / 1e3),
            nanos: e
        };
    }
    return {
        seconds: ht(t.seconds),
        nanos: ht(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function ht(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function ft(t) {
    return "string" == typeof t ? ut.fromBase64String(t) : ut.fromUint8Array(t);
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
 */ function lt(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */ function dt(t) {
    var e = t.mapValue.fields.__previous_value__;
    return lt(e) ? dt(e) : e;
}

/**
 * Returns the local time at which this timestamp was first set.
 */ function pt(t) {
    var e = ct(t.mapValue.fields.__local_write_time__.timestampValue);
    return new $(e.seconds, e.nanos);
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
/** Sentinel value that sorts before any Mutation Batch ID. */
/**
 * Returns whether a variable is either undefined or null.
 */ function yt(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function vt(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return 0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */ function mt(t) {
    return "number" == typeof t && Number.isInteger(t) && !vt(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
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
 */ var gt = /** @class */ function() {
    function t(t) {
        this.path = t;
    }
    return t.fromPath = function(e) {
        return new t(rt.fromString(e));
    }, t.fromName = function(e) {
        return new t(rt.fromString(e).popFirst(5));
    }, 
    /** Returns true if the document is in the specified collectionId. */ t.prototype.hasCollectionId = function(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }, t.prototype.isEqual = function(t) {
        return null !== t && 0 === rt.comparator(this.path, t.path);
    }, t.prototype.toString = function() {
        return this.path.toString();
    }, t.comparator = function(t, e) {
        return rt.comparator(t.path, e.path);
    }, t.isDocumentKey = function(t) {
        return t.length % 2 == 0;
    }, 
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    t.fromSegments = function(e) {
        return new t(new rt(e.slice()));
    }, t;
}();

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
/** Extracts the backend's type order for the provided value. */ function wt(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? lt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : K();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function bt(t, e) {
    var n = wt(t);
    if (n !== wt(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return pt(t).isEqual(pt(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            var n = ct(t.timestampValue), r = ct(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return ft(t.bytesValue).isEqual(ft(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return ht(t.geoPointValue.latitude) === ht(e.geoPointValue.latitude) && ht(t.geoPointValue.longitude) === ht(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return ht(t.integerValue) === ht(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                var n = ht(t.doubleValue), r = ht(e.doubleValue);
                return n === r ? vt(n) === vt(r) : isNaN(n) && isNaN(r);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return Y(t.arrayValue.values || [], e.arrayValue.values || [], bt);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (Z(n) !== Z(r)) return !1;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !bt(n[i], r[i]))) return !1;
            return !0;
        }(t, e);

      default:
        return K();
    }
}

function It(t, e) {
    return void 0 !== (t.values || []).find((function(t) {
        return bt(t, e);
    }));
}

function Tt(t, e) {
    var n = wt(t), r = wt(e);
    if (n !== r) return H(n, r);
    switch (n) {
      case 0 /* NullValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return H(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            var n = ht(t.integerValue || t.doubleValue), r = ht(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return Et(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return Et(pt(t), pt(e));

      case 5 /* StringValue */ :
        return H(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            var n = ft(t), r = ft(e);
            return n.compareTo(r);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            for (var n = t.split("/"), r = e.split("/"), i = 0; i < n.length && i < r.length; i++) {
                var o = H(n[i], r[i]);
                if (0 !== o) return o;
            }
            return H(n.length, r.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            var n = H(ht(t.latitude), ht(e.latitude));
            return 0 !== n ? n : H(ht(t.longitude), ht(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
                var o = Tt(n[i], r[i]);
                if (o) return o;
            }
            return H(n.length, r.length);
        }(t.arrayValue, e.arrayValue);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.fields || {}, r = Object.keys(n), i = e.fields || {}, o = Object.keys(i);
            // Even though MapValues are likely sorted correctly based on their insertion
            // order (e.g. when received from the backend), local modifications can bring
            // elements out of order. We need to re-sort the elements to ensure that
            // canonical IDs are independent of insertion order.
                        r.sort(), o.sort();
            for (var s = 0; s < r.length && s < o.length; ++s) {
                var u = H(r[s], o[s]);
                if (0 !== u) return u;
                var a = Tt(n[r[s]], i[o[s]]);
                if (0 !== a) return a;
            }
            return H(r.length, o.length);
        }(t.mapValue, e.mapValue);

      default:
        throw K();
    }
}

function Et(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return H(t, e);
    var n = ct(t), r = ct(e), i = H(n.seconds, r.seconds);
    return 0 !== i ? i : H(n.nanos, r.nanos);
}

function St(t) {
    return _t(t);
}

function _t(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
        var e = ct(t);
        return "time(" + e.seconds + "," + e.nanos + ")";
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? ft(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
    gt.fromName(n).toString()) : "geoPointValue" in t ? "geo(" + (e = t.geoPointValue).latitude + "," + e.longitude + ")" : "arrayValue" in t ? function(t) {
        for (var e = "[", n = !0, r = 0, i = t.values || []; r < i.length; r++) {
            n ? n = !1 : e += ",", e += _t(i[r]);
        }
        return e + "]";
    }(t.arrayValue) : "mapValue" in t ? function(t) {
        for (
        // Iteration order in JavaScript is not guaranteed. To ensure that we generate
        // matching canonical IDs for identical maps, we need to sort the keys.
        var e = "{", n = !0, r = 0, i = Object.keys(t.fields || {}).sort(); r < i.length; r++) {
            var o = i[r];
            n ? n = !1 : e += ",", e += o + ":" + _t(t.fields[o]);
        }
        return e + "}";
    }(t.mapValue) : K();
    var e, n;
}

function Nt(t, e) {
    return {
        referenceValue: "projects/" + t.projectId + "/databases/" + t.database + "/documents/" + e.path.canonicalString()
    };
}

/** Returns true if `value` is an IntegerValue . */ function Dt(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */ function At(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function kt(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function Ct(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function xt(t) {
    return !!t && "mapValue" in t;
}

/** Creates a deep copy of `source`. */ function Rt(t) {
    if (t.geoPointValue) return {
        geoPointValue: Object.assign({}, t.geoPointValue)
    };
    if (t.timestampValue && "object" == typeof t.timestampValue) return {
        timestampValue: Object.assign({}, t.timestampValue)
    };
    if (t.mapValue) {
        var e = {
            mapValue: {
                fields: {}
            }
        };
        return tt(t.mapValue.fields, (function(t, n) {
            return e.mapValue.fields[t] = Rt(n);
        })), e;
    }
    if (t.arrayValue) {
        for (var n = {
            arrayValue: {
                values: []
            }
        }, r = 0; r < (t.arrayValue.values || []).length; ++r) n.arrayValue.values[r] = Rt(t.arrayValue.values[r]);
        return n;
    }
    return Object.assign({}, t);
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
 */ var Lt = /** @class */ function() {
    function t(t) {
        this.value = t;
    }
    return t.empty = function() {
        return new t({
            mapValue: {}
        });
    }, 
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */
    t.prototype.field = function(t) {
        if (t.isEmpty()) return this.value;
        for (var e = this.value, n = 0; n < t.length - 1; ++n) if (!xt(e = (e.mapValue.fields || {})[t.get(n)])) return null;
        return (e = (e.mapValue.fields || {})[t.lastSegment()]) || null;
    }, 
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    t.prototype.set = function(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = Rt(e);
    }, 
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    t.prototype.setAll = function(t) {
        var e = this, n = ot.emptyPath(), r = {}, i = [];
        t.forEach((function(t, o) {
            if (!n.isImmediateParentOf(o)) {
                // Insert the accumulated changes at this parent location
                var s = e.getFieldsMap(n);
                e.applyChanges(s, r, i), r = {}, i = [], n = o.popLast();
            }
            t ? r[o.lastSegment()] = Rt(t) : i.push(o.lastSegment());
        }));
        var o = this.getFieldsMap(n);
        this.applyChanges(o, r, i);
    }, 
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */
    t.prototype.delete = function(t) {
        var e = this.field(t.popLast());
        xt(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
    }, t.prototype.isEqual = function(t) {
        return bt(this.value, t.value);
    }, 
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */
    t.prototype.getFieldsMap = function(t) {
        var e = this.value;
        e.mapValue.fields || (e.mapValue = {
            fields: {}
        });
        for (var n = 0; n < t.length; ++n) {
            var r = e.mapValue.fields[t.get(n)];
            xt(r) && r.mapValue.fields || (r = {
                mapValue: {
                    fields: {}
                }
            }, e.mapValue.fields[t.get(n)] = r), e = r;
        }
        return e.mapValue.fields;
    }, 
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */
    t.prototype.applyChanges = function(t, e, n) {
        tt(e, (function(e, n) {
            return t[e] = n;
        }));
        for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r];
            delete t[o];
        }
    }, t.prototype.clone = function() {
        return new t(Rt(this.value));
    }, t;
}();

/**
 * Returns a FieldMask built from all fields in a MapValue.
 */ function Ot(t) {
    var e = [];
    return tt(t.fields, (function(t, n) {
        var r = new ot([ t ]);
        if (xt(n)) {
            var i = Ot(n.mapValue).fields;
            if (0 === i.length) 
            // Preserve the empty map by adding it to the FieldMask.
            e.push(r); else 
            // For nested and non-empty ObjectValues, add the FieldPath of the
            // leaf nodes.
            for (var o = 0, s = i; o < s.length; o++) {
                var u = s[o];
                e.push(r.child(u));
            }
        } else 
        // For nested and non-empty ObjectValues, add the FieldPath of the leaf
        // nodes.
        e.push(r);
    })), new st(e)
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
 */;
}

var Pt = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.key = t, this.documentType = e, this.version = n, this.data = r, this.documentState = i
        /**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */;
    }
    return t.newInvalidDocument = function(e) {
        return new t(e, 0 /* INVALID */ , J.min(), Lt.empty(), 0 /* SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */
    t.newFoundDocument = function(e, n, r) {
        return new t(e, 1 /* FOUND_DOCUMENT */ , n, r, 0 /* SYNCED */);
    }, 
    /** Creates a new document that is known to not exist at the given version. */ t.newNoDocument = function(e, n) {
        return new t(e, 2 /* NO_DOCUMENT */ , n, Lt.empty(), 0 /* SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.newUnknownDocument = function(e, n) {
        return new t(e, 3 /* UNKNOWN_DOCUMENT */ , n, Lt.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
    }, 
    /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */
    t.prototype.convertToFoundDocument = function(t, e) {
        return this.version = t, this.documentType = 1 /* FOUND_DOCUMENT */ , this.data = e, 
        this.documentState = 0 /* SYNCED */ , this;
    }, 
    /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */
    t.prototype.convertToNoDocument = function(t) {
        return this.version = t, this.documentType = 2 /* NO_DOCUMENT */ , this.data = Lt.empty(), 
        this.documentState = 0 /* SYNCED */ , this;
    }, 
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.prototype.convertToUnknownDocument = function(t) {
        return this.version = t, this.documentType = 3 /* UNKNOWN_DOCUMENT */ , this.data = Lt.empty(), 
        this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
    }, t.prototype.setHasCommittedMutations = function() {
        return this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
    }, t.prototype.setHasLocalMutations = function() {
        return this.documentState = 1 /* HAS_LOCAL_MUTATIONS */ , this;
    }, Object.defineProperty(t.prototype, "hasLocalMutations", {
        get: function() {
            return 1 /* HAS_LOCAL_MUTATIONS */ === this.documentState;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "hasCommittedMutations", {
        get: function() {
            return 2 /* HAS_COMMITTED_MUTATIONS */ === this.documentState;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return this.hasLocalMutations || this.hasCommittedMutations;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isValidDocument = function() {
        return 0 /* INVALID */ !== this.documentType;
    }, t.prototype.isFoundDocument = function() {
        return 1 /* FOUND_DOCUMENT */ === this.documentType;
    }, t.prototype.isNoDocument = function() {
        return 2 /* NO_DOCUMENT */ === this.documentType;
    }, t.prototype.isUnknownDocument = function() {
        return 3 /* UNKNOWN_DOCUMENT */ === this.documentType;
    }, t.prototype.isEqual = function(e) {
        return e instanceof t && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data);
    }, t.prototype.clone = function() {
        return new t(this.key, this.documentType, this.version, this.data.clone(), this.documentState);
    }, t.prototype.toString = function() {
        return "Document(" + this.key + ", " + this.version + ", " + JSON.stringify(this.data.value) + ", {documentType: " + this.documentType + "}), {documentState: " + this.documentState + "})";
    }, t;
}(), Ft = function(t, e, n, r, i, o, s) {
    void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === s && (s = null), 
    this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = r, this.limit = i, 
    this.startAt = o, this.endAt = s, this.h = null;
};

/**
 * Compares the value for field `field` in the provided documents. Throws if
 * the field does not exist in both documents.
 */
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
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */
function Mt(t, e, n, r, i, o, s) {
    return void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === s && (s = null), 
    new Ft(t, e, n, r, i, o, s);
}

function Vt(t) {
    var e = z(t);
    if (null === e.h) {
        var n = e.path.canonicalString();
        null !== e.collectionGroup && (n += "|cg:" + e.collectionGroup), n += "|f:", n += e.filters.map((function(t) {
            return function(t) {
                // TODO(b/29183165): Technically, this won't be unique if two values have
                // the same description, such as the int 3 and the string "3". So we should
                // add the types in here somehow, too.
                return t.field.canonicalString() + t.op.toString() + St(t.value);
            }(t);
        })).join(","), n += "|ob:", n += e.orderBy.map((function(t) {
            return function(t) {
                // TODO(b/29183165): Make this collision robust.
                return t.field.canonicalString() + t.dir;
            }(t);
        })).join(","), yt(e.limit) || (n += "|l:", n += e.limit), e.startAt && (n += "|lb:", 
        n += $t(e.startAt)), e.endAt && (n += "|ub:", n += $t(e.endAt)), e.h = n;
    }
    return e.h;
}

function qt(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (var n = 0; n < t.orderBy.length; n++) if (!Zt(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (var r = 0; r < t.filters.length; r++) if (i = t.filters[r], o = e.filters[r], 
    i.op !== o.op || !i.field.isEqual(o.field) || !bt(i.value, o.value)) return !1;
    var i, o;
    return t.collectionGroup === e.collectionGroup && !!t.path.isEqual(e.path) && !!ee(t.startAt, e.startAt) && ee(t.endAt, e.endAt);
}

function Ut(t) {
    return gt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}

var Bt = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).field = t, i.op = n, i.value = r, i;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return t(n, e), n.create = function(t, e, r) {
        return t.isKeyField() ? "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.l(t, e, r) : new jt(t, e, r) : "array-contains" /* ARRAY_CONTAINS */ === e ? new Qt(t, r) : "in" /* IN */ === e ? new Wt(t, r) : "not-in" /* NOT_IN */ === e ? new Ht(t, r) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Yt(t, r) : new n(t, e, r);
    }, n.l = function(t, e, n) {
        return "in" /* IN */ === e ? new Kt(t, n) : new Gt(t, n);
    }, n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
                return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.m(Tt(e, this.value)) : null !== e && wt(this.value) === wt(e) && this.m(Tt(e, this.value));
        // Only compare types with matching backend order (such as double and int).
        }, n.prototype.m = function(t) {
        switch (this.op) {
          case "<" /* LESS_THAN */ :
            return t < 0;

          case "<=" /* LESS_THAN_OR_EQUAL */ :
            return t <= 0;

          case "==" /* EQUAL */ :
            return 0 === t;

          case "!=" /* NOT_EQUAL */ :
            return 0 !== t;

          case ">" /* GREATER_THAN */ :
            return t > 0;

          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            return t >= 0;

          default:
            return K();
        }
    }, n.prototype.g = function() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
    }, n;
}((function() {}));

var jt = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, r) || this).key = gt.fromName(r.referenceValue), 
        i;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = gt.comparator(t.key, this.key);
        return this.m(e);
    }, n;
}(Bt), Kt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "in" /* IN */ , n) || this).keys = zt("in" /* IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(Bt), Gt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "not-in" /* NOT_IN */ , n) || this).keys = zt("not-in" /* NOT_IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return !this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(Bt);

/** Filter that matches on key fields within an array. */ function zt(t, e) {
    var n;
    return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((function(t) {
        return gt.fromName(t.referenceValue);
    }));
}

/** A Filter that implements the array-contains operator. */ var Qt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains" /* ARRAY_CONTAINS */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return At(e) && It(e.arrayValue, this.value);
    }, n;
}(Bt), Wt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "in" /* IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return null !== e && It(this.value.arrayValue, e);
    }, n;
}(Bt), Ht = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "not-in" /* NOT_IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        if (It(this.value.arrayValue, {
            nullValue: "NULL_VALUE"
        })) return !1;
        var e = t.data.field(this.field);
        return null !== e && !It(this.value.arrayValue, e);
    }, n;
}(Bt), Yt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = this, n = t.data.field(this.field);
        return !(!At(n) || !n.arrayValue.values) && n.arrayValue.values.some((function(t) {
            return It(e.value.arrayValue, t);
        }));
    }, n;
}(Bt), Xt = function(t, e) {
    this.position = t, this.before = e;
};

/** A Filter that implements the IN operator. */ function $t(t) {
    // TODO(b/29183165): Make this collision robust.
    return (t.before ? "b" : "a") + ":" + t.position.map((function(t) {
        return St(t);
    })).join(",");
}

/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */ var Jt = function(t, e /* ASCENDING */) {
    void 0 === e && (e = "asc"), this.field = t, this.dir = e;
};

function Zt(t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field);
}

/**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */ function te(t, e, n) {
    for (var r = 0, i = 0; i < t.position.length; i++) {
        var o = e[i], s = t.position[i];
        if (r = o.field.isKeyField() ? gt.comparator(gt.fromName(s.referenceValue), n.key) : Tt(s, n.data.field(o.field)), 
        "desc" /* DESCENDING */ === o.dir && (r *= -1), 0 !== r) break;
    }
    return t.before ? r <= 0 : r < 0;
}

function ee(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.before !== e.before || t.position.length !== e.position.length) return !1;
    for (var n = 0; n < t.position.length; n++) if (!bt(t.position[n], e.position[n])) return !1;
    return !0;
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
 */ var ne = 
/**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
function(t, e, n, r, i, o /* First */ , s, u) {
    void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = "F"), void 0 === s && (s = null), 
    void 0 === u && (u = null), this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, 
    this.filters = r, this.limit = i, this.limitType = o, this.startAt = s, this.endAt = u, 
    this.p = null, 
    // The corresponding `Target` of this `Query` instance.
    this.T = null, this.startAt, this.endAt;
};

/** Creates a new Query instance with the options provided. */ function re(t, e, n, r, i, o, s, u) {
    return new ne(t, e, n, r, i, o, s, u);
}

/** Creates a new Query for a query that matches all documents at `path` */ function ie(t) {
    return new ne(t);
}

/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */ function oe(t) {
    return !yt(t.limit) && "F" /* First */ === t.limitType;
}

function se(t) {
    return !yt(t.limit) && "L" /* Last */ === t.limitType;
}

function ue(t) {
    return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}

function ae(t) {
    for (var e = 0, n = t.filters; e < n.length; e++) {
        var r = n[e];
        if (r.g()) return r.field;
    }
    return null;
}

/**
 * Checks if any of the provided Operators are included in the query and
 * returns the first one that is, or null if none are.
 */
/**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */ function ce(t) {
    return null !== t.collectionGroup;
}

/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */ function he(t) {
    var e = z(t);
    if (null === e.p) {
        e.p = [];
        var n = ae(e), r = ue(e);
        if (null !== n && null === r) 
        // In order to implicitly add key ordering, we must also add the
        // inequality filter field for it to be a valid query.
        // Note that the default inequality field and key ordering is ascending.
        n.isKeyField() || e.p.push(new Jt(n)), e.p.push(new Jt(ot.keyField(), "asc" /* ASCENDING */)); else {
            for (var i = !1, o = 0, s = e.explicitOrderBy; o < s.length; o++) {
                var u = s[o];
                e.p.push(u), u.field.isKeyField() && (i = !0);
            }
            if (!i) {
                // The order of the implicit key ordering always matches the last
                // explicit order by
                var a = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc" /* ASCENDING */;
                e.p.push(new Jt(ot.keyField(), a));
            }
        }
    }
    return e.p;
}

/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */ function fe(t) {
    var e = z(t);
    if (!e.T) if ("F" /* First */ === e.limitType) e.T = Mt(e.path, e.collectionGroup, he(e), e.filters, e.limit, e.startAt, e.endAt); else {
        for (
        // Flip the orderBy directions since we want the last results
        var n = [], r = 0, i = he(e); r < i.length; r++) {
            var o = i[r], s = "desc" /* DESCENDING */ === o.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
            n.push(new Jt(o.field, s));
        }
        // We need to swap the cursors to match the now-flipped query ordering.
                var u = e.endAt ? new Xt(e.endAt.position, !e.endAt.before) : null, a = e.startAt ? new Xt(e.startAt.position, !e.startAt.before) : null;
        // Now return as a LimitType.First query.
                e.T = Mt(e.path, e.collectionGroup, n, e.filters, e.limit, u, a);
    }
    return e.T;
}

function le(t, e, n) {
    return new ne(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
}

function de(t, e) {
    return qt(fe(t), fe(e)) && t.limitType === e.limitType;
}

// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function pe(t) {
    return Vt(fe(t)) + "|lt:" + t.limitType;
}

function ye(t) {
    return "Query(target=" + function(t) {
        var e = t.path.canonicalString();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
        t.filters.length > 0 && (e += ", filters: [" + t.filters.map((function(t) {
            return (e = t).field.canonicalString() + " " + e.op + " " + St(e.value);
            /** Returns a debug description for `filter`. */            var e;
            /** Filter that matches on key fields (i.e. '__name__'). */        })).join(", ") + "]"), 
        yt(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += ", orderBy: [" + t.orderBy.map((function(t) {
            return function(t) {
                return t.field.canonicalString() + " (" + t.dir + ")";
            }(t);
        })).join(", ") + "]"), t.startAt && (e += ", startAt: " + $t(t.startAt)), t.endAt && (e += ", endAt: " + $t(t.endAt)), 
        "Target(" + e + ")";
    }(fe(t)) + "; limitType=" + t.limitType + ")";
}

/** Returns whether `doc` matches the constraints of `query`. */ function ve(t, e) {
    return e.isFoundDocument() && function(t, e) {
        var n = e.key.path;
        return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : gt.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n);
    }(t, e) && function(t, e) {
        for (var n = 0, r = t.explicitOrderBy; n < r.length; n++) {
            var i = r[n];
            // order by key always matches
                        if (!i.field.isKeyField() && null === e.data.field(i.field)) return !1;
        }
        return !0;
    }(t, e) && function(t, e) {
        for (var n = 0, r = t.filters; n < r.length; n++) {
            if (!r[n].matches(e)) return !1;
        }
        return !0;
    }(t, e) && function(t, e) {
        return !(t.startAt && !te(t.startAt, he(t), e)) && (!t.endAt || !te(t.endAt, he(t), e));
    }(t, e);
}

function me(t) {
    return function(e, n) {
        for (var r = !1, i = 0, o = he(t); i < o.length; i++) {
            var s = o[i], u = ge(s, e, n);
            if (0 !== u) return u;
            r = r || s.field.isKeyField();
        }
        return 0;
    };
}

function ge(t, e, n) {
    var r = t.field.isKeyField() ? gt.comparator(e.key, n.key) : function(t, e, n) {
        var r = e.data.field(t), i = n.data.field(t);
        return null !== r && null !== i ? Tt(r, i) : K();
    }(t.field, e, n);
    switch (t.dir) {
      case "asc" /* ASCENDING */ :
        return r;

      case "desc" /* DESCENDING */ :
        return -1 * r;

      default:
        return K();
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
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */ function we(t, e) {
    if (t.I) {
        if (isNaN(e)) return {
            doubleValue: "NaN"
        };
        if (e === 1 / 0) return {
            doubleValue: "Infinity"
        };
        if (e === -1 / 0) return {
            doubleValue: "-Infinity"
        };
    }
    return {
        doubleValue: vt(e) ? "-0" : e
    };
}

/**
 * Returns an IntegerValue for `value`.
 */ function be(t) {
    return {
        integerValue: "" + t
    };
}

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */ function Ie(t, e) {
    return mt(e) ? be(e) : we(t, e);
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
/** Used to represent a field transform on a mutation. */ var Te = function() {
    // Make sure that the structural type of `TransformOperation` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this._ = void 0;
};

/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */ function Ee(t, e, n) {
    return t instanceof Ne ? function(t, e) {
        var n = {
            fields: {
                __type__: {
                    stringValue: "server_timestamp"
                },
                __local_write_time__: {
                    timestampValue: {
                        seconds: t.seconds,
                        nanos: t.nanoseconds
                    }
                }
            }
        };
        return e && (n.fields.__previous_value__ = e), {
            mapValue: n
        };
    }(n, e) : t instanceof De ? Ae(t, e) : t instanceof ke ? Ce(t, e) : function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        var n = _e(t, e), r = Re(n) + Re(t.A);
        return Dt(n) && Dt(t.A) ? be(r) : we(t.R, r);
    }(t, e);
}

/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */ function Se(t, e, n) {
    // The server just sends null as the transform result for array operations,
    // so we have to calculate a result the same as we do for local
    // applications.
    return t instanceof De ? Ae(t, e) : t instanceof ke ? Ce(t, e) : n;
}

/**
 * If this transform operation is not idempotent, returns the base value to
 * persist for this transform. If a base value is returned, the transform
 * operation is always applied to this base value, even if document has
 * already been updated.
 *
 * Base values provide consistent behavior for non-idempotent transforms and
 * allow us to return the same latency-compensated value even if the backend
 * has already applied the transform operation. The base value is null for
 * idempotent transforms, as they can be re-played even if the backend has
 * already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent transforms.
 */ function _e(t, e) {
    return t instanceof xe ? Dt(n = e) || function(t) {
        return !!t && "doubleValue" in t;
    }(n) ? e : {
        integerValue: 0
    } : null;
    var n;
}

/** Transforms a value into a server-generated timestamp. */ var Ne = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n;
}(Te), De = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(Te);

/** Transforms an array value via a union operation. */ function Ae(t, e) {
    for (var n = Le(e), r = function(t) {
        n.some((function(e) {
            return bt(e, t);
        })) || n.push(t);
    }, i = 0, o = t.elements; i < o.length; i++) {
        r(o[i]);
    }
    return {
        arrayValue: {
            values: n
        }
    };
}

/** Transforms an array value via a remove operation. */ var ke = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(Te);

function Ce(t, e) {
    for (var n = Le(e), r = function(t) {
        n = n.filter((function(e) {
            return !bt(e, t);
        }));
    }, i = 0, o = t.elements; i < o.length; i++) {
        r(o[i]);
    }
    return {
        arrayValue: {
            values: n
        }
    };
}

/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */ var xe = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).R = t, r.A = n, r;
    }
    return t(n, e), n;
}(Te);

function Re(t) {
    return ht(t.integerValue || t.doubleValue);
}

function Le(t) {
    return At(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
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
/** A field path and the TransformOperation to perform upon it. */ var Oe = function(t, e) {
    this.field = t, this.transform = e;
};

/** The result of successfully applying a mutation to the backend. */
var Pe = function(
/**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */
t, 
/**
     * The resulting fields returned from the backend after a mutation
     * containing field transforms has been committed. Contains one FieldValue
     * for each FieldTransform that was in the mutation.
     *
     * Will be empty if the mutation did not contain any field transforms.
     */
e) {
    this.version = t, this.transformResults = e;
}, Fe = /** @class */ function() {
    function t(t, e) {
        this.updateTime = t, this.exists = e
        /** Creates a new empty Precondition. */;
    }
    return t.none = function() {
        return new t;
    }, 
    /** Creates a new Precondition with an exists flag. */ t.exists = function(e) {
        return new t(void 0, e);
    }, 
    /** Creates a new Precondition based on a version a document exists at. */ t.updateTime = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "isNone", {
        /** Returns whether this Precondition is empty. */ get: function() {
            return void 0 === this.updateTime && void 0 === this.exists;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }, t;
}();

/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */
/** Returns true if the preconditions is valid for the given document. */ function Me(t, e) {
    return void 0 !== t.updateTime ? e.isFoundDocument() && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e.isFoundDocument();
}

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
 */ var Ve = function() {};

/**
 * Applies this mutation to the given document for the purposes of computing a
 * new remote document. If the input document doesn't match the expected state
 * (e.g. it is invalid or outdated), the document type may transition to
 * unknown.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param mutationResult - The result of applying the mutation from the backend.
 */ function qe(t, e, n) {
    t instanceof Ge ? function(t, e, n) {
        // Unlike applySetMutationToLocalView, if we're applying a mutation to a
        // remote document the server has accepted the mutation so the precondition
        // must have held.
        var r = t.value.clone(), i = We(t.fieldTransforms, e, n.transformResults);
        r.setAll(i), e.convertToFoundDocument(n.version, r).setHasCommittedMutations();
    }(t, e, n) : t instanceof ze ? function(t, e, n) {
        if (Me(t.precondition, e)) {
            var r = We(t.fieldTransforms, e, n.transformResults), i = e.data;
            i.setAll(Qe(t)), i.setAll(r), e.convertToFoundDocument(n.version, i).setHasCommittedMutations();
        } else e.convertToUnknownDocument(n.version);
    }(t, e, n) : function(t, e, n) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        e.convertToNoDocument(n.version).setHasCommittedMutations();
    }(0, e, n);
}

/**
 * Applies this mutation to the given document for the purposes of computing
 * the new local view of a document. If the input document doesn't match the
 * expected state, the document is not modified.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param localWriteTime - A timestamp indicating the local write time of the
 *     batch this mutation is a part of.
 */ function Ue(t, e, n) {
    t instanceof Ge ? function(t, e, n) {
        if (Me(t.precondition, e)) {
            var r = t.value.clone(), i = He(t.fieldTransforms, n, e);
            r.setAll(i), e.convertToFoundDocument(Ke(e), r).setHasLocalMutations();
        }
    }(t, e, n) : t instanceof ze ? function(t, e, n) {
        if (Me(t.precondition, e)) {
            var r = He(t.fieldTransforms, n, e), i = e.data;
            i.setAll(Qe(t)), i.setAll(r), e.convertToFoundDocument(Ke(e), i).setHasLocalMutations();
        }
    }(t, e, n) : function(t, e) {
        Me(t.precondition, e) && 
        // We don't call `setHasLocalMutations()` since we want to be backwards
        // compatible with the existing SDK behavior.
        e.convertToNoDocument(J.min());
    }(t, e);
}

/**
 * If this mutation is not idempotent, returns the base value to persist with
 * this mutation. If a base value is returned, the mutation is always applied
 * to this base value, even if document has already been updated.
 *
 * The base value is a sparse object that consists of only the document
 * fields for which this mutation contains a non-idempotent transformation
 * (e.g. a numeric increment). The provided value guarantees consistent
 * behavior for non-idempotent transforms and allow us to return the same
 * latency-compensated value even if the backend has already applied the
 * mutation. The base value is null for idempotent mutations, as they can be
 * re-played even if the backend has already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent mutations.
 */ function Be(t, e) {
    for (var n = null, r = 0, i = t.fieldTransforms; r < i.length; r++) {
        var o = i[r], s = e.data.field(o.field), u = _e(o.transform, s || null);
        null != u && (null == n && (n = Lt.empty()), n.set(o.field, u));
    }
    return n || null;
}

function je(t, e) {
    return t.type === e.type && !!t.key.isEqual(e.key) && !!t.precondition.isEqual(e.precondition) && !!function(t, e) {
        return void 0 === t && void 0 === e || !(!t || !e) && Y(t, e, (function(t, e) {
            return function(t, e) {
                return t.field.isEqual(e.field) && function(t, e) {
                    return t instanceof De && e instanceof De || t instanceof ke && e instanceof ke ? Y(t.elements, e.elements, bt) : t instanceof xe && e instanceof xe ? bt(t.A, e.A) : t instanceof Ne && e instanceof Ne;
                }(t.transform, e.transform);
            }(t, e);
        }));
    }(t.fieldTransforms, e.fieldTransforms) && (0 /* Set */ === t.type ? t.value.isEqual(e.value) : 1 /* Patch */ !== t.type || t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask));
}

/**
 * Returns the version from the given document for use as the result of a
 * mutation. Mutations are defined to return the version of the base document
 * only if it is an existing document. Deleted and unknown documents have a
 * post-mutation version of SnapshotVersion.min().
 */ function Ke(t) {
    return t.isFoundDocument() ? t.version : J.min();
}

/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */ var Ge = /** @class */ function(e) {
    function n(t, n, r, i) {
        void 0 === i && (i = []);
        var o = this;
        return (o = e.call(this) || this).key = t, o.value = n, o.precondition = r, o.fieldTransforms = i, 
        o.type = 0 /* Set */ , o;
    }
    return t(n, e), n;
}(Ve), ze = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        void 0 === o && (o = []);
        var s = this;
        return (s = e.call(this) || this).key = t, s.data = n, s.fieldMask = r, s.precondition = i, 
        s.fieldTransforms = o, s.type = 1 /* Patch */ , s;
    }
    return t(n, e), n;
}(Ve);

function Qe(t) {
    var e = new Map;
    return t.fieldMask.fields.forEach((function(n) {
        if (!n.isEmpty()) {
            var r = t.data.field(n);
            e.set(n, r);
        }
    })), e
    /**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use after a mutation
 * containing transforms has been acknowledged by the server.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param mutableDocument - The current state of the document after applying all
 * previous mutations.
 * @param serverTransformResults - The transform results received by the server.
 * @returns The transform results list.
 */;
}

function We(t, e, n) {
    var r = new Map;
    G(t.length === n.length);
    for (var i = 0; i < n.length; i++) {
        var o = t[i], s = o.transform, u = e.data.field(o.field);
        r.set(o.field, Se(s, u, n[i]));
    }
    return r;
}

/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use when applying a
 * transform locally.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param localWriteTime - The local time of the mutation (used to
 *     generate ServerTimestampValues).
 * @param mutableDocument - The current state of the document after applying all
 *     previous mutations.
 * @returns The transform results list.
 */ function He(t, e, n) {
    for (var r = new Map, i = 0, o = t; i < o.length; i++) {
        var s = o[i], u = s.transform, a = n.data.field(s.field);
        r.set(s.field, Ee(u, a, e));
    }
    return r;
}

/** A mutation that deletes the document at the given key. */ var Ye, Xe, $e = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 2 /* Delete */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n;
}(Ve), Je = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 3 /* Verify */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n;
}(Ve), Ze = 
// TODO(b/33078163): just use simplest form of existence filter for now
function(t) {
    this.count = t;
};

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function tn(t) {
    switch (t) {
      case O.OK:
        return K();

      case O.CANCELLED:
      case O.UNKNOWN:
      case O.DEADLINE_EXCEEDED:
      case O.RESOURCE_EXHAUSTED:
      case O.INTERNAL:
      case O.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case O.UNAUTHENTICATED:
        return !1;

      case O.INVALID_ARGUMENT:
      case O.NOT_FOUND:
      case O.ALREADY_EXISTS:
      case O.PERMISSION_DENIED:
      case O.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case O.ABORTED:
      case O.OUT_OF_RANGE:
      case O.UNIMPLEMENTED:
      case O.DATA_LOSS:
        return !0;

      default:
        return K();
    }
}

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */ function en(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return U("GRPC error has no .code"), O.UNKNOWN;
    switch (t) {
      case Ye.OK:
        return O.OK;

      case Ye.CANCELLED:
        return O.CANCELLED;

      case Ye.UNKNOWN:
        return O.UNKNOWN;

      case Ye.DEADLINE_EXCEEDED:
        return O.DEADLINE_EXCEEDED;

      case Ye.RESOURCE_EXHAUSTED:
        return O.RESOURCE_EXHAUSTED;

      case Ye.INTERNAL:
        return O.INTERNAL;

      case Ye.UNAVAILABLE:
        return O.UNAVAILABLE;

      case Ye.UNAUTHENTICATED:
        return O.UNAUTHENTICATED;

      case Ye.INVALID_ARGUMENT:
        return O.INVALID_ARGUMENT;

      case Ye.NOT_FOUND:
        return O.NOT_FOUND;

      case Ye.ALREADY_EXISTS:
        return O.ALREADY_EXISTS;

      case Ye.PERMISSION_DENIED:
        return O.PERMISSION_DENIED;

      case Ye.FAILED_PRECONDITION:
        return O.FAILED_PRECONDITION;

      case Ye.ABORTED:
        return O.ABORTED;

      case Ye.OUT_OF_RANGE:
        return O.OUT_OF_RANGE;

      case Ye.UNIMPLEMENTED:
        return O.UNIMPLEMENTED;

      case Ye.DATA_LOSS:
        return O.DATA_LOSS;

      default:
        return K();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status - An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (Xe = Ye || (Ye = {}))[Xe.OK = 0] = "OK", Xe[Xe.CANCELLED = 1] = "CANCELLED", 
Xe[Xe.UNKNOWN = 2] = "UNKNOWN", Xe[Xe.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
Xe[Xe.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Xe[Xe.NOT_FOUND = 5] = "NOT_FOUND", 
Xe[Xe.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Xe[Xe.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
Xe[Xe.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Xe[Xe.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
Xe[Xe.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Xe[Xe.ABORTED = 10] = "ABORTED", 
Xe[Xe.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Xe[Xe.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
Xe[Xe.INTERNAL = 13] = "INTERNAL", Xe[Xe.UNAVAILABLE = 14] = "UNAVAILABLE", Xe[Xe.DATA_LOSS = 15] = "DATA_LOSS";

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
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
var nn = /** @class */ function() {
    function t(t, e) {
        this.comparator = t, this.root = e || on.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
        return t.prototype.insert = function(e, n) {
        return new t(this.comparator, this.root.insert(e, n, this.comparator).copy(null, null, on.BLACK, null, null));
    }, 
    // Returns a copy of the map, with the specified key removed.
    t.prototype.remove = function(e) {
        return new t(this.comparator, this.root.remove(e, this.comparator).copy(null, null, on.BLACK, null, null));
    }, 
    // Returns the value of the node with the given key, or null.
    t.prototype.get = function(t) {
        for (var e = this.root; !e.isEmpty(); ) {
            var n = this.comparator(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? e = e.left : n > 0 && (e = e.right);
        }
        return null;
    }, 
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    t.prototype.indexOf = function(t) {
        for (
        // Number of nodes that were pruned when descending right
        var e = 0, n = this.root; !n.isEmpty(); ) {
            var r = this.comparator(t, n.key);
            if (0 === r) return e + n.left.size;
            r < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            e += n.left.size + 1, n = n.right);
        }
        // Node not found
                return -1;
    }, t.prototype.isEmpty = function() {
        return this.root.isEmpty();
    }, Object.defineProperty(t.prototype, "size", {
        // Returns the total number of nodes in the map.
        get: function() {
            return this.root.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Returns the minimum key in the map.
    t.prototype.minKey = function() {
        return this.root.minKey();
    }, 
    // Returns the maximum key in the map.
    t.prototype.maxKey = function() {
        return this.root.maxKey();
    }, 
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.inorderTraversal = function(t) {
        return this.root.inorderTraversal(t);
    }, t.prototype.forEach = function(t) {
        this.inorderTraversal((function(e, n) {
            return t(e, n), !1;
        }));
    }, t.prototype.toString = function() {
        var t = [];
        return this.inorderTraversal((function(e, n) {
            return t.push(e + ":" + n), !1;
        })), "{" + t.join(", ") + "}";
    }, 
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.reverseTraversal = function(t) {
        return this.root.reverseTraversal(t);
    }, 
    // Returns an iterator over the SortedMap.
    t.prototype.getIterator = function() {
        return new rn(this.root, null, this.comparator, !1);
    }, t.prototype.getIteratorFrom = function(t) {
        return new rn(this.root, t, this.comparator, !1);
    }, t.prototype.getReverseIterator = function() {
        return new rn(this.root, null, this.comparator, !0);
    }, t.prototype.getReverseIteratorFrom = function(t) {
        return new rn(this.root, t, this.comparator, !0);
    }, t;
}(), rn = /** @class */ function() {
    function t(t, e, n, r) {
        this.isReverse = r, this.nodeStack = [];
        for (var i = 1; !t.isEmpty(); ) if (i = e ? n(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        r && (i *= -1), i < 0) 
        // This node is less than our start key. ignore it
        t = this.isReverse ? t.left : t.right; else {
            if (0 === i) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.nodeStack.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
                        this.nodeStack.push(t), t = this.isReverse ? t.right : t.left;
        }
    }
    return t.prototype.getNext = function() {
        var t = this.nodeStack.pop(), e = {
            key: t.key,
            value: t.value
        };
        if (this.isReverse) for (t = t.left; !t.isEmpty(); ) this.nodeStack.push(t), t = t.right; else for (t = t.right; !t.isEmpty(); ) this.nodeStack.push(t), 
        t = t.left;
        return e;
    }, t.prototype.hasNext = function() {
        return this.nodeStack.length > 0;
    }, t.prototype.peek = function() {
        if (0 === this.nodeStack.length) return null;
        var t = this.nodeStack[this.nodeStack.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }, t;
}(), on = /** @class */ function() {
    function t(e, n, r, i, o) {
        this.key = e, this.value = n, this.color = null != r ? r : t.RED, this.left = null != i ? i : t.EMPTY, 
        this.right = null != o ? o : t.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
        return t.prototype.copy = function(e, n, r, i, o) {
        return new t(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right);
    }, t.prototype.isEmpty = function() {
        return !1;
    }, 
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.inorderTraversal = function(t) {
        return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t);
    }, 
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.reverseTraversal = function(t) {
        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t);
    }, 
    // Returns the minimum node in the tree.
    t.prototype.min = function() {
        return this.left.isEmpty() ? this : this.left.min();
    }, 
    // Returns the maximum key in the tree.
    t.prototype.minKey = function() {
        return this.min().key;
    }, 
    // Returns the maximum key in the tree.
    t.prototype.maxKey = function() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
    }, 
    // Returns new tree, with the key/value added.
    t.prototype.insert = function(t, e, n) {
        var r = this, i = n(t, r.key);
        return (r = i < 0 ? r.copy(null, null, null, r.left.insert(t, e, n), null) : 0 === i ? r.copy(null, e, null, null, null) : r.copy(null, null, null, null, r.right.insert(t, e, n))).fixUp();
    }, t.prototype.removeMin = function() {
        if (this.left.isEmpty()) return t.EMPTY;
        var e = this;
        return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), (e = e.copy(null, null, null, e.left.removeMin(), null)).fixUp();
    }, 
    // Returns new tree, with the specified item removed.
    t.prototype.remove = function(e, n) {
        var r, i = this;
        if (n(e, i.key) < 0) i.left.isEmpty() || i.left.isRed() || i.left.left.isRed() || (i = i.moveRedLeft()), 
        i = i.copy(null, null, null, i.left.remove(e, n), null); else {
            if (i.left.isRed() && (i = i.rotateRight()), i.right.isEmpty() || i.right.isRed() || i.right.left.isRed() || (i = i.moveRedRight()), 
            0 === n(e, i.key)) {
                if (i.right.isEmpty()) return t.EMPTY;
                r = i.right.min(), i = i.copy(r.key, r.value, null, null, i.right.removeMin());
            }
            i = i.copy(null, null, null, null, i.right.remove(e, n));
        }
        return i.fixUp();
    }, t.prototype.isRed = function() {
        return this.color;
    }, 
    // Returns new tree after performing any needed rotations.
    t.prototype.fixUp = function() {
        var t = this;
        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), 
        t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t;
    }, t.prototype.moveRedLeft = function() {
        var t = this.colorFlip();
        return t.right.left.isRed() && (t = (t = (t = t.copy(null, null, null, null, t.right.rotateRight())).rotateLeft()).colorFlip()), 
        t;
    }, t.prototype.moveRedRight = function() {
        var t = this.colorFlip();
        return t.left.left.isRed() && (t = (t = t.rotateRight()).colorFlip()), t;
    }, t.prototype.rotateLeft = function() {
        var e = this.copy(null, null, t.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, e, null);
    }, t.prototype.rotateRight = function() {
        var e = this.copy(null, null, t.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, e);
    }, t.prototype.colorFlip = function() {
        var t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e);
    }, 
    // For testing.
    t.prototype.checkMaxDepth = function() {
        var t = this.check();
        return Math.pow(2, t) <= this.size + 1;
    }, 
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    t.prototype.check = function() {
        if (this.isRed() && this.left.isRed()) throw K();
        if (this.right.isRed()) throw K();
        var t = this.left.check();
        if (t !== this.right.check()) throw K();
        return t + (this.isRed() ? 0 : 1);
    }, t;
}();

// end SortedMap
// An iterator over an LLRBNode.
// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
on.EMPTY = null, on.RED = !0, on.BLACK = !1, 
// end LLRBEmptyNode
on.EMPTY = new (/** @class */ function() {
    function t() {
        this.size = 0;
    }
    return Object.defineProperty(t.prototype, "key", {
        get: function() {
            throw K();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
        get: function() {
            throw K();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "color", {
        get: function() {
            throw K();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "left", {
        get: function() {
            throw K();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            throw K();
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Returns a copy of the current node.
    t.prototype.copy = function(t, e, n, r, i) {
        return this;
    }, 
    // Returns a copy of the tree, with the specified key/value added.
    t.prototype.insert = function(t, e, n) {
        return new on(t, e);
    }, 
    // Returns a copy of the tree, with the specified key removed.
    t.prototype.remove = function(t, e) {
        return this;
    }, t.prototype.isEmpty = function() {
        return !0;
    }, t.prototype.inorderTraversal = function(t) {
        return !1;
    }, t.prototype.reverseTraversal = function(t) {
        return !1;
    }, t.prototype.minKey = function() {
        return null;
    }, t.prototype.maxKey = function() {
        return null;
    }, t.prototype.isRed = function() {
        return !1;
    }, 
    // For testing.
    t.prototype.checkMaxDepth = function() {
        return !0;
    }, t.prototype.check = function() {
        return 0;
    }, t;
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
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
var sn = /** @class */ function() {
    function t(t) {
        this.comparator = t, this.data = new nn(this.comparator);
    }
    return t.prototype.has = function(t) {
        return null !== this.data.get(t);
    }, t.prototype.first = function() {
        return this.data.minKey();
    }, t.prototype.last = function() {
        return this.data.maxKey();
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.data.size;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.indexOf = function(t) {
        return this.data.indexOf(t);
    }, 
    /** Iterates elements in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.data.inorderTraversal((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */ t.prototype.forEachInRange = function(t, e) {
        for (var n = this.data.getIteratorFrom(t[0]); n.hasNext(); ) {
            var r = n.getNext();
            if (this.comparator(r.key, t[1]) >= 0) return;
            e(r.key);
        }
    }, 
    /**
     * Iterates over `elem`s such that: start &lt;= elem until false is returned.
     */
    t.prototype.forEachWhile = function(t, e) {
        var n;
        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) if (!t(n.getNext().key)) return;
    }, 
    /** Finds the least element greater than or equal to `elem`. */ t.prototype.firstAfterOrEqual = function(t) {
        var e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null;
    }, t.prototype.getIterator = function() {
        return new un(this.data.getIterator());
    }, t.prototype.getIteratorFrom = function(t) {
        return new un(this.data.getIteratorFrom(t));
    }, 
    /** Inserts or updates an element */ t.prototype.add = function(t) {
        return this.copy(this.data.remove(t).insert(t, !0));
    }, 
    /** Deletes an element */ t.prototype.delete = function(t) {
        return this.has(t) ? this.copy(this.data.remove(t)) : this;
    }, t.prototype.isEmpty = function() {
        return this.data.isEmpty();
    }, t.prototype.unionWith = function(t) {
        var e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach((function(t) {
            e = e.add(t);
        })), e;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.data.getIterator(), r = e.data.getIterator(); n.hasNext(); ) {
            var i = n.getNext().key, o = r.getNext().key;
            if (0 !== this.comparator(i, o)) return !1;
        }
        return !0;
    }, t.prototype.toArray = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e);
        })), t;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            return t.push(e);
        })), "SortedSet(" + t.toString() + ")";
    }, t.prototype.copy = function(e) {
        var n = new t(this.comparator);
        return n.data = e, n;
    }, t;
}(), un = /** @class */ function() {
    function t(t) {
        this.iter = t;
    }
    return t.prototype.getNext = function() {
        return this.iter.getNext().key;
    }, t.prototype.hasNext = function() {
        return this.iter.hasNext();
    }, t;
}(), an = new nn(gt.comparator);

function cn() {
    return an;
}

var hn = new nn(gt.comparator);

function fn() {
    return hn;
}

var ln = new nn(gt.comparator);

function dn() {
    return ln;
}

var pn = new sn(gt.comparator);

function yn() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = pn, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.add(o);
    }
    return n;
}

var vn = new sn(H);

function mn() {
    return vn;
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
 * An event from the RemoteStore. It is split into targetChanges (changes to the
 * state or the set of documents in our watched targets) and documentUpdates
 * (changes to the actual documents).
 */ var gn = /** @class */ function() {
    function t(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    t, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    e, 
    /**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */
    n, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    r, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    i) {
        this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = r, 
        this.resolvedLimboDocuments = i;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
        return t.createSynthesizedRemoteEventForCurrentChange = function(e, n) {
        var r = new Map;
        return r.set(e, wn.createSynthesizedTargetChangeForCurrentChange(e, n)), new t(J.min(), r, mn(), cn(), yn());
    }, t;
}(), wn = /** @class */ function() {
    function t(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    t, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    e, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    n, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    r, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    i) {
        this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = r, 
        this.removedDocuments = i
        /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */;
    }
    return t.createSynthesizedTargetChangeForCurrentChange = function(e, n) {
        return new t(ut.EMPTY_BYTE_STRING, n, yn(), yn(), yn());
    }, t;
}(), bn = function(
/** The new document applies to all of these targets. */
t, 
/** The new document is removed from all of these targets. */
e, 
/** The key of the document for this change. */
n, 
/**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
r) {
    this.P = t, this.removedTargetIds = e, this.key = n, this.v = r;
}, In = function(t, e) {
    this.targetId = t, this.V = e;
}, Tn = function(
/** What kind of change occurred to the watch target. */
t, 
/** The target IDs that were added/removed/set. */
e, 
/**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
n
/** An RPC error indicating why the watch failed. */ , r) {
    void 0 === n && (n = ut.EMPTY_BYTE_STRING), void 0 === r && (r = null), this.state = t, 
    this.targetIds = e, this.resumeToken = n, this.cause = r;
}, En = /** @class */ function() {
    function t() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.S = 0, 
        /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
        this.D = Nn(), 
        /** See public getters for explanations of these fields. */
        this.C = ut.EMPTY_BYTE_STRING, this.N = !1, 
        /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
        this.k = !0;
    }
    return Object.defineProperty(t.prototype, "current", {
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */
        get: function() {
            return this.N;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "resumeToken", {
        /** The last resume token sent to us for this target. */ get: function() {
            return this.C;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "$", {
        /** Whether this target has pending target adds or target removes. */ get: function() {
            return 0 !== this.S;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "O", {
        /** Whether we have modified any state that should trigger a snapshot. */ get: function() {
            return this.k;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    t.prototype.F = function(t) {
        t.approximateByteSize() > 0 && (this.k = !0, this.C = t);
    }, 
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    t.prototype.M = function() {
        var t = yn(), e = yn(), n = yn();
        return this.D.forEach((function(r, i) {
            switch (i) {
              case 0 /* Added */ :
                t = t.add(r);
                break;

              case 2 /* Modified */ :
                e = e.add(r);
                break;

              case 1 /* Removed */ :
                n = n.add(r);
                break;

              default:
                K();
            }
        })), new wn(this.C, this.N, t, e, n);
    }, 
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t.prototype.L = function() {
        this.k = !1, this.D = Nn();
    }, t.prototype.B = function(t, e) {
        this.k = !0, this.D = this.D.insert(t, e);
    }, t.prototype.U = function(t) {
        this.k = !0, this.D = this.D.remove(t);
    }, t.prototype.q = function() {
        this.S += 1;
    }, t.prototype.K = function() {
        this.S -= 1;
    }, t.prototype.j = function() {
        this.k = !0, this.N = !0;
    }, t;
}(), Sn = /** @class */ function() {
    function t(t) {
        this.W = t, 
        /** The internal state of all tracked targets. */
        this.G = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.H = cn(), 
        /** A mapping of document keys to their set of target IDs. */
        this.J = _n(), 
        /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
        this.Y = new sn(H)
        /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */;
    }
    return t.prototype.X = function(t) {
        for (var e = 0, n = t.P; e < n.length; e++) {
            var r = n[e];
            t.v && t.v.isFoundDocument() ? this.Z(r, t.v) : this.tt(r, t.key, t.v);
        }
        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
            var s = o[i];
            this.tt(s, t.key, t.v);
        }
    }, 
    /** Processes and adds the WatchTargetChange to the current set of changes. */ t.prototype.et = function(t) {
        var e = this;
        this.forEachTarget(t, (function(n) {
            var r = e.nt(n);
            switch (t.state) {
              case 0 /* NoChange */ :
                e.st(n) && r.F(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.K(), r.$ || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                r.L(), r.F(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.K(), r.$ || e.removeTarget(n);
                break;

              case 3 /* Current */ :
                e.st(n) && (r.j(), r.F(t.resumeToken));
                break;

              case 4 /* Reset */ :
                e.st(n) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                e.it(n), r.F(t.resumeToken));
                break;

              default:
                K();
            }
        }));
    }, 
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */
    t.prototype.forEachTarget = function(t, e) {
        var n = this;
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.G.forEach((function(t, r) {
            n.st(r) && e(r);
        }));
    }, 
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    t.prototype.rt = function(t) {
        var e = t.targetId, n = t.V.count, r = this.ot(e);
        if (r) {
            var i = r.target;
            if (Ut(i)) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                var o = new gt(i.path);
                this.tt(e, o, Pt.newNoDocument(o, J.min()));
            } else G(1 === n); else this.ct(e) !== n && (
            // Existence filter mismatch: We reset the mapping and raise a new
            // snapshot with `isFromCache:true`.
            this.it(e), this.Y = this.Y.add(e));
        }
    }, 
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    t.prototype.ut = function(t) {
        var e = this, n = new Map;
        this.G.forEach((function(r, i) {
            var o = e.ot(i);
            if (o) {
                if (r.current && Ut(o.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    var s = new gt(o.target.path);
                    null !== e.H.get(s) || e.at(i, s) || e.tt(i, s, Pt.newNoDocument(s, t));
                }
                r.O && (n.set(i, r.M()), r.L());
            }
        }));
        var r = yn();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.J.forEach((function(t, n) {
            var i = !0;
            n.forEachWhile((function(t) {
                var n = e.ot(t);
                return !n || 2 /* LimboResolution */ === n.purpose || (i = !1, !1);
            })), i && (r = r.add(t));
        }));
        var i = new gn(t, n, this.Y, this.H, r);
        return this.H = cn(), this.J = _n(), this.Y = new sn(H), i;
    }, 
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    t.prototype.Z = function(t, e) {
        if (this.st(t)) {
            var n = this.at(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
            this.nt(t).B(e.key, n), this.H = this.H.insert(e.key, e), this.J = this.J.insert(e.key, this.ht(e.key).add(t));
        }
    }, 
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    t.prototype.tt = function(t, e, n) {
        if (this.st(t)) {
            var r = this.nt(t);
            this.at(t, e) ? r.B(e, 1 /* Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            r.U(e), this.J = this.J.insert(e, this.ht(e).delete(t)), n && (this.H = this.H.insert(e, n));
        }
    }, t.prototype.removeTarget = function(t) {
        this.G.delete(t);
    }, 
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    t.prototype.ct = function(t) {
        var e = this.nt(t).M();
        return this.W.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size;
    }, 
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    t.prototype.q = function(t) {
        this.nt(t).q();
    }, t.prototype.nt = function(t) {
        var e = this.G.get(t);
        return e || (e = new En, this.G.set(t, e)), e;
    }, t.prototype.ht = function(t) {
        var e = this.J.get(t);
        return e || (e = new sn(H), this.J = this.J.insert(t, e)), e;
    }, 
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t.prototype.st = function(t) {
        var e = null !== this.ot(t);
        return e || q("WatchChangeAggregator", "Detected inactive target", t), e;
    }, 
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    t.prototype.ot = function(t) {
        var e = this.G.get(t);
        return e && e.$ ? null : this.W.lt(t);
    }, 
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    t.prototype.it = function(t) {
        var e = this;
        this.G.set(t, new En), this.W.getRemoteKeysForTarget(t).forEach((function(n) {
            e.tt(t, n, /*updatedDocument=*/ null);
        }));
    }, 
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    t.prototype.at = function(t, e) {
        return this.W.getRemoteKeysForTarget(t).has(e);
    }, t;
}();

/**
 * A TargetChange specifies the set of changes for a specific target as part of
 * a RemoteEvent. These changes track which documents are added, modified or
 * removed, as well as the target's resume token and whether the target is
 * marked CURRENT.
 * The actual changes *to* documents are not part of the TargetChange since
 * documents may be part of multiple targets.
 */ function _n() {
    return new nn(gt.comparator);
}

function Nn() {
    return new nn(gt.comparator);
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
 */ var Dn = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}, An = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
}, kn = function(t, e) {
    this.databaseId = t, this.I = e;
};

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
/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */
function Cn(t, e) {
    return t.I ? new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "") + "." + ("000000000" + e.nanoseconds).slice(-9) + "Z" : {
        seconds: "" + e.seconds,
        nanos: e.nanoseconds
    };
}

/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */ function xn(t, e) {
    return t.I ? e.toBase64() : e.toUint8Array();
}

/**
 * Returns a ByteString based on the proto string value.
 */ function Rn(t, e) {
    return Cn(t, e.toTimestamp());
}

function Ln(t) {
    return G(!!t), J.fromTimestamp(function(t) {
        var e = ct(t);
        return new $(e.seconds, e.nanos);
    }(t));
}

function On(t, e) {
    return function(t) {
        return new rt([ "projects", t.projectId, "databases", t.database ]);
    }(t).child("documents").child(e).canonicalString();
}

function Pn(t) {
    var e = rt.fromString(t);
    return G(or(e)), e;
}

function Fn(t, e) {
    return On(t.databaseId, e.path);
}

function Mn(t, e) {
    var n = Pn(e);
    if (n.get(1) !== t.databaseId.projectId) throw new P(O.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
    if (n.get(3) !== t.databaseId.database) throw new P(O.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
    return new gt(Bn(n));
}

function Vn(t, e) {
    return On(t.databaseId, e);
}

function qn(t) {
    var e = Pn(t);
    // In v1beta1 queries for collections at the root did not have a trailing
    // "/documents". In v1 all resource paths contain "/documents". Preserve the
    // ability to read the v1beta1 form for compatibility with queries persisted
    // in the local target cache.
        return 4 === e.length ? rt.emptyPath() : Bn(e);
}

function Un(t) {
    return new rt([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
}

function Bn(t) {
    return G(t.length > 4 && "documents" === t.get(4)), t.popFirst(5)
    /** Creates a Document proto from key and fields (but no create/update time) */;
}

function jn(t, e, n) {
    return {
        name: Fn(t, e),
        fields: n.value.mapValue.fields
    };
}

function Kn(t, e, n) {
    var r = Mn(t, e.name), i = Ln(e.updateTime), o = new Lt({
        mapValue: {
            fields: e.fields
        }
    }), s = Pt.newFoundDocument(r, i, o);
    return n && s.setHasCommittedMutations(), n ? s.setHasCommittedMutations() : s;
}

function Gn(t, e) {
    var n;
    if (e instanceof Ge) n = {
        update: jn(t, e.key, e.value)
    }; else if (e instanceof $e) n = {
        delete: Fn(t, e.key)
    }; else if (e instanceof ze) n = {
        update: jn(t, e.key, e.data),
        updateMask: ir(e.fieldMask)
    }; else {
        if (!(e instanceof Je)) return K();
        n = {
            verify: Fn(t, e.key)
        };
    }
    return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((function(t) {
        return function(t, e) {
            var n = e.transform;
            if (n instanceof Ne) return {
                fieldPath: e.field.canonicalString(),
                setToServerValue: "REQUEST_TIME"
            };
            if (n instanceof De) return {
                fieldPath: e.field.canonicalString(),
                appendMissingElements: {
                    values: n.elements
                }
            };
            if (n instanceof ke) return {
                fieldPath: e.field.canonicalString(),
                removeAllFromArray: {
                    values: n.elements
                }
            };
            if (n instanceof xe) return {
                fieldPath: e.field.canonicalString(),
                increment: n.A
            };
            throw K();
        }(0, t);
    }))), e.precondition.isNone || (n.currentDocument = function(t, e) {
        return void 0 !== e.updateTime ? {
            updateTime: Rn(t, e.updateTime)
        } : void 0 !== e.exists ? {
            exists: e.exists
        } : K();
    }(t, e.precondition)), n;
}

function zn(t, e) {
    var n = e.currentDocument ? function(t) {
        return void 0 !== t.updateTime ? Fe.updateTime(Ln(t.updateTime)) : void 0 !== t.exists ? Fe.exists(t.exists) : Fe.none();
    }(e.currentDocument) : Fe.none(), r = e.updateTransforms ? e.updateTransforms.map((function(e) {
        return function(t, e) {
            var n = null;
            if ("setToServerValue" in e) G("REQUEST_TIME" === e.setToServerValue), n = new Ne; else if ("appendMissingElements" in e) {
                var r = e.appendMissingElements.values || [];
                n = new De(r);
            } else if ("removeAllFromArray" in e) {
                var i = e.removeAllFromArray.values || [];
                n = new ke(i);
            } else "increment" in e ? n = new xe(t, e.increment) : K();
            var o = ot.fromServerFormat(e.fieldPath);
            return new Oe(o, n);
        }(t, e);
    })) : [];
    if (e.update) {
        e.update.name;
        var i = Mn(t, e.update.name), o = new Lt({
            mapValue: {
                fields: e.update.fields
            }
        });
        if (e.updateMask) {
            var s = function(t) {
                var e = t.fieldPaths || [];
                return new st(e.map((function(t) {
                    return ot.fromServerFormat(t);
                })));
            }(e.updateMask);
            return new ze(i, o, s, n, r);
        }
        return new Ge(i, o, n, r);
    }
    if (e.delete) {
        var u = Mn(t, e.delete);
        return new $e(u, n);
    }
    if (e.verify) {
        var a = Mn(t, e.verify);
        return new Je(a, n);
    }
    return K();
}

function Qn(t, e) {
    return {
        documents: [ Vn(t, e.path) ]
    };
}

function Wn(t, e) {
    // Dissect the path into parent, collectionId, and optional key filter.
    var n = {
        structuredQuery: {}
    }, r = e.path;
    null !== e.collectionGroup ? (n.parent = Vn(t, r), n.structuredQuery.from = [ {
        collectionId: e.collectionGroup,
        allDescendants: !0
    } ]) : (n.parent = Vn(t, r.popLast()), n.structuredQuery.from = [ {
        collectionId: r.lastSegment()
    } ]);
    var i = function(t) {
        if (0 !== t.length) {
            var e = t.map((function(t) {
                // visible for testing
                return function(t) {
                    if ("==" /* EQUAL */ === t.op) {
                        if (Ct(t.value)) return {
                            unaryFilter: {
                                field: tr(t.field),
                                op: "IS_NAN"
                            }
                        };
                        if (kt(t.value)) return {
                            unaryFilter: {
                                field: tr(t.field),
                                op: "IS_NULL"
                            }
                        };
                    } else if ("!=" /* NOT_EQUAL */ === t.op) {
                        if (Ct(t.value)) return {
                            unaryFilter: {
                                field: tr(t.field),
                                op: "IS_NOT_NAN"
                            }
                        };
                        if (kt(t.value)) return {
                            unaryFilter: {
                                field: tr(t.field),
                                op: "IS_NOT_NULL"
                            }
                        };
                    }
                    return {
                        fieldFilter: {
                            field: tr(t.field),
                            op: Zn(t.op),
                            value: t.value
                        }
                    };
                }(t);
            }));
            return 1 === e.length ? e[0] : {
                compositeFilter: {
                    op: "AND",
                    filters: e
                }
            };
        }
    }(e.filters);
    i && (n.structuredQuery.where = i);
    var o = function(t) {
        if (0 !== t.length) return t.map((function(t) {
            // visible for testing
            return function(t) {
                return {
                    field: tr(t.field),
                    direction: Jn(t.dir)
                };
            }(t);
        }));
    }(e.orderBy);
    o && (n.structuredQuery.orderBy = o);
    var s = function(t, e) {
        return t.I || yt(e) ? e : {
            value: e
        };
    }(t, e.limit);
    return null !== s && (n.structuredQuery.limit = s), e.startAt && (n.structuredQuery.startAt = Xn(e.startAt)), 
    e.endAt && (n.structuredQuery.endAt = Xn(e.endAt)), n;
}

function Hn(t) {
    var e = qn(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
    if (r > 0) {
        G(1 === r);
        var o = n.from[0];
        o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
    }
    var s = [];
    n.where && (s = Yn(n.where));
    var u = [];
    n.orderBy && (u = n.orderBy.map((function(t) {
        return function(t) {
            return new Jt(er(t.field), 
            // visible for testing
            function(t) {
                switch (t) {
                  case "ASCENDING":
                    return "asc" /* ASCENDING */;

                  case "DESCENDING":
                    return "desc" /* DESCENDING */;

                  default:
                    return;
                }
            }(t.direction));
        }(t);
    })));
    var a = null;
    n.limit && (a = function(t) {
        var e;
        return yt(e = "object" == typeof t ? t.value : t) ? null : e;
    }(n.limit));
    var c = null;
    n.startAt && (c = $n(n.startAt));
    var h = null;
    return n.endAt && (h = $n(n.endAt)), re(e, i, u, s, a, "F" /* First */ , c, h);
}

function Yn(t) {
    return t ? void 0 !== t.unaryFilter ? [ rr(t) ] : void 0 !== t.fieldFilter ? [ nr(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((function(t) {
        return Yn(t);
    })).reduce((function(t, e) {
        return t.concat(e);
    })) : K() : [];
}

function Xn(t) {
    return {
        before: t.before,
        values: t.position
    };
}

function $n(t) {
    var e = !!t.before, n = t.values || [];
    return new Xt(n, e);
}

// visible for testing
function Jn(t) {
    return Dn[t];
}

function Zn(t) {
    return An[t];
}

function tr(t) {
    return {
        fieldPath: t.canonicalString()
    };
}

function er(t) {
    return ot.fromServerFormat(t.fieldPath);
}

function nr(t) {
    return Bt.create(er(t.fieldFilter.field), function(t) {
        switch (t) {
          case "EQUAL":
            return "==" /* EQUAL */;

          case "NOT_EQUAL":
            return "!=" /* NOT_EQUAL */;

          case "GREATER_THAN":
            return ">" /* GREATER_THAN */;

          case "GREATER_THAN_OR_EQUAL":
            return ">=" /* GREATER_THAN_OR_EQUAL */;

          case "LESS_THAN":
            return "<" /* LESS_THAN */;

          case "LESS_THAN_OR_EQUAL":
            return "<=" /* LESS_THAN_OR_EQUAL */;

          case "ARRAY_CONTAINS":
            return "array-contains" /* ARRAY_CONTAINS */;

          case "IN":
            return "in" /* IN */;

          case "NOT_IN":
            return "not-in" /* NOT_IN */;

          case "ARRAY_CONTAINS_ANY":
            return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

          case "OPERATOR_UNSPECIFIED":
          default:
            return K();
        }
    }(t.fieldFilter.op), t.fieldFilter.value);
}

function rr(t) {
    switch (t.unaryFilter.op) {
      case "IS_NAN":
        var e = er(t.unaryFilter.field);
        return Bt.create(e, "==" /* EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NULL":
        var n = er(t.unaryFilter.field);
        return Bt.create(n, "==" /* EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "IS_NOT_NAN":
        var r = er(t.unaryFilter.field);
        return Bt.create(r, "!=" /* NOT_EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NOT_NULL":
        var i = er(t.unaryFilter.field);
        return Bt.create(i, "!=" /* NOT_EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "OPERATOR_UNSPECIFIED":
      default:
        return K();
    }
}

function ir(t) {
    var e = [];
    return t.fields.forEach((function(t) {
        return e.push(t.canonicalString());
    })), {
        fieldPaths: e
    };
}

function or(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
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
 * Encodes a resource path into a IndexedDb-compatible string form.
 */ function sr(t) {
    for (var e = "", n = 0; n < t.length; n++) e.length > 0 && (e = ar(e)), e = ur(t.get(n), e);
    return ar(e);
}

/** Encodes a single segment of a resource path into the given result */ function ur(t, e) {
    for (var n = e, r = t.length, i = 0; i < r; i++) {
        var o = t.charAt(i);
        switch (o) {
          case "\0":
            n += "";
            break;

          case "":
            n += "";
            break;

          default:
            n += o;
        }
    }
    return n;
}

/** Encodes a path separator into the given result */ function ar(t) {
    return t + "";
}

/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */ function cr(t) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    var e = t.length;
    if (G(e >= 2), 2 === e) return G("" === t.charAt(0) && "" === t.charAt(1)), rt.emptyPath();
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
        for (var n = e - 2, r = [], i = "", o = 0; o < e; ) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        var s = t.indexOf("", o);
        switch ((s < 0 || s > n) && K(), t.charAt(s + 1)) {
          case "":
            var u = t.substring(o, s), a = void 0;
            0 === i.length ? 
            // Avoid copying for the common case of a segment that excludes \0
            // and \001
            a = u : (a = i += u, i = ""), r.push(a);
            break;

          case "":
            i += t.substring(o, s), i += "\0";
            break;

          case "":
            // The escape character can be used in the output to encode itself.
            i += t.substring(o, s + 1);
            break;

          default:
            K();
        }
        o = s + 2;
    }
    return new rt(r);
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
 * Schema Version for the Web client:
 * 1.  Initial version including Mutation Queue, Query Cache, and Remote
 *     Document Cache
 * 2.  Used to ensure a targetGlobal object exists and add targetCount to it. No
 *     longer required because migration 3 unconditionally clears it.
 * 3.  Dropped and re-created Query Cache to deal with cache corruption related
 *     to limbo resolution. Addresses
 *     https://github.com/firebase/firebase-ios-sdk/issues/1548
 * 4.  Multi-Tab Support.
 * 5.  Removal of held write acks.
 * 6.  Create document global for tracking document cache size.
 * 7.  Ensure every cached document has a sentinel row with a sequence number.
 * 8.  Add collection-parent index for Collection Group queries.
 * 9.  Change RemoteDocumentChanges store to be keyed by readTime rather than
 *     an auto-incrementing ID. This is required for Index-Free queries.
 * 10. Rewrite the canonical IDs to the explicit Protobuf-based format.
 * 11. Add bundles and named_queries for bundle support.
 */
/**
 * Wrapper class to store timestamps (seconds and nanos) in IndexedDb objects.
 */ var hr = function(t, e) {
    this.seconds = t, this.nanoseconds = e;
}, fr = function(t, 
/** Whether to allow shared access from multiple tabs. */
e, n) {
    this.ownerId = t, this.allowTabSynchronization = e, this.leaseTimestampMs = n;
};

/**
 * A singleton object to be stored in the 'owner' store in IndexedDb.
 *
 * A given database can have a single primary tab assigned at a given time. That
 * tab must validate that it is still holding the primary lease before every
 * operation that requires locked access. The primary tab should regularly
 * write an updated timestamp to this lease to prevent other tabs from
 * "stealing" the primary lease
 */
/**
 * Name of the IndexedDb object store.
 *
 * Note that the name 'owner' is chosen to ensure backwards compatibility with
 * older clients that only supported single locked access to the persistence
 * layer.
 */
fr.store = "owner", 
/**
     * The key string used for the single object that exists in the
     * DbPrimaryClient store.
     */
fr.key = "owner";

/**
 * An object to be stored in the 'mutationQueues' store in IndexedDb.
 *
 * Each user gets a single queue of MutationBatches to apply to the server.
 * DbMutationQueue tracks the metadata about the queue.
 */
var lr = function(
/**
     * The normalized user ID to which this queue belongs.
     */
t, 
/**
     * An identifier for the highest numbered batch that has been acknowledged
     * by the server. All MutationBatches in this queue with batchIds less
     * than or equal to this value are considered to have been acknowledged by
     * the server.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
e, 
/**
     * A stream token that was previously sent by the server.
     *
     * See StreamingWriteRequest in datastore.proto for more details about
     * usage.
     *
     * After sending this token, earlier tokens may not be used anymore so
     * only a single stream token is retained.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
n) {
    this.userId = t, this.lastAcknowledgedBatchId = e, this.lastStreamToken = n;
};

/** Name of the IndexedDb object store.  */ lr.store = "mutationQueues", 
/** Keys are automatically assigned via the userId property. */
lr.keyPath = "userId";

/**
 * An object to be stored in the 'mutations' store in IndexedDb.
 *
 * Represents a batch of user-level mutations intended to be sent to the server
 * in a single write. Each user-level batch gets a separate DbMutationBatch
 * with a new batchId.
 */
var dr = function(
/**
     * The normalized user ID to which this batch belongs.
     */
t, 
/**
     * An identifier for this batch, allocated using an auto-generated key.
     */
e, 
/**
     * The local write time of the batch, stored as milliseconds since the
     * epoch.
     */
n, 
/**
     * A list of "mutations" that represent a partial base state from when this
     * write batch was initially created. During local application of the write
     * batch, these baseMutations are applied prior to the real writes in order
     * to override certain document fields from the remote document cache. This
     * is necessary in the case of non-idempotent writes (e.g. `increment()`
     * transforms) to make sure that the local view of the modified documents
     * doesn't flicker if the remote document cache receives the result of the
     * non-idempotent write before the write is removed from the queue.
     *
     * These mutations are never sent to the backend.
     */
r, 
/**
     * A list of mutations to apply. All mutations will be applied atomically.
     *
     * Mutations are serialized via toMutation().
     */
i) {
    this.userId = t, this.batchId = e, this.localWriteTimeMs = n, this.baseMutations = r, 
    this.mutations = i;
};

/** Name of the IndexedDb object store.  */ dr.store = "mutations", 
/** Keys are automatically assigned via the userId, batchId properties. */
dr.keyPath = "batchId", 
/** The index name for lookup of mutations by user. */
dr.userMutationsIndex = "userMutationsIndex", 
/** The user mutations index is keyed by [userId, batchId] pairs. */
dr.userMutationsKeyPath = [ "userId", "batchId" ];

/**
 * An object to be stored in the 'documentMutations' store in IndexedDb.
 *
 * A manually maintained index of all the mutation batches that affect a given
 * document key. The rows in this table are references based on the contents of
 * DbMutationBatch.mutations.
 */
var pr = /** @class */ function() {
    function t() {}
    /**
     * Creates a [userId] key for use in the DbDocumentMutations index to iterate
     * over all of a user's document mutations.
     */    return t.prefixForUser = function(t) {
        return [ t ];
    }, 
    /**
     * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
     * index to iterate over all at document mutations for a given path or lower.
     */
    t.prefixForPath = function(t, e) {
        return [ t, sr(e) ];
    }, 
    /**
     * Creates a full index key of [userId, encodedPath, batchId] for inserting
     * and deleting into the DbDocumentMutations index.
     */
    t.key = function(t, e, n) {
        return [ t, sr(e), n ];
    }, t;
}();

pr.store = "documentMutations", 
/**
     * Because we store all the useful information for this store in the key,
     * there is no useful information to store as the value. The raw (unencoded)
     * path cannot be stored because IndexedDb doesn't store prototype
     * information.
     */
pr.PLACEHOLDER = new pr;

/**
 * Represents the known absence of a document at a particular version.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */
var yr = function(t, e) {
    this.path = t, this.readTime = e;
}, vr = function(t, e) {
    this.path = t, this.version = e;
}, mr = 
// TODO: We are currently storing full document keys almost three times
// (once as part of the primary key, once - partly - as `parentPath` and once
// inside the encoded documents). During our next migration, we should
// rewrite the primary key as parentPath + document ID which would allow us
// to drop one value.
function(
/**
     * Set to an instance of DbUnknownDocument if the data for a document is
     * not known, but it is known that a document exists at the specified
     * version (e.g. it had a successful update applied to it)
     */
t, 
/**
     * Set to an instance of a DbNoDocument if it is known that no document
     * exists.
     */
e, 
/**
     * Set to an instance of a Document if there's a cached version of the
     * document.
     */
n, 
/**
     * Documents that were written to the remote document store based on
     * a write acknowledgment are marked with `hasCommittedMutations`. These
     * documents are potentially inconsistent with the backend's copy and use
     * the write's commit version as their document version.
     */
r, 
/**
     * When the document was read from the backend. Undefined for data written
     * prior to schema version 9.
     */
i, 
/**
     * The path of the collection this document is part of. Undefined for data
     * written prior to schema version 9.
     */
o) {
    this.unknownDocument = t, this.noDocument = e, this.document = n, this.hasCommittedMutations = r, 
    this.readTime = i, this.parentPath = o;
};

/**
 * Represents a document that is known to exist but whose data is unknown.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */ mr.store = "remoteDocuments", 
/**
     * An index that provides access to all entries sorted by read time (which
     * corresponds to the last modification time of each row).
     *
     * This index is used to provide a changelog for Multi-Tab.
     */
mr.readTimeIndex = "readTimeIndex", mr.readTimeIndexPath = "readTime", 
/**
     * An index that provides access to documents in a collection sorted by read
     * time.
     *
     * This index is used to allow the RemoteDocumentCache to fetch newly changed
     * documents in a collection.
     */
mr.collectionReadTimeIndex = "collectionReadTimeIndex", mr.collectionReadTimeIndexPath = [ "parentPath", "readTime" ];

/**
 * Contains a single entry that has metadata about the remote document cache.
 */
var gr = 
/**
     * @param byteSize - Approximately the total size in bytes of all the
     * documents in the document cache.
     */
function(t) {
    this.byteSize = t;
};

gr.store = "remoteDocumentGlobal", gr.key = "remoteDocumentGlobalKey";

/**
 * An object to be stored in the 'targets' store in IndexedDb.
 *
 * This is based on and should be kept in sync with the proto used in the iOS
 * client.
 *
 * Each query the client listens to against the server is tracked on disk so
 * that the query can be efficiently resumed on restart.
 */
var wr = function(
/**
     * An auto-generated sequential numeric identifier for the query.
     *
     * Queries are stored using their canonicalId as the key, but these
     * canonicalIds can be quite long so we additionally assign a unique
     * queryId which can be used by referenced data structures (e.g.
     * indexes) to minimize the on-disk cost.
     */
t, 
/**
     * The canonical string representing this query. This is not unique.
     */
e, 
/**
     * The last readTime received from the Watch Service for this query.
     *
     * This is the same value as TargetChange.read_time in the protos.
     */
n, 
/**
     * An opaque, server-assigned token that allows watching a query to be
     * resumed after disconnecting without retransmitting all the data
     * that matches the query. The resume token essentially identifies a
     * point in time from which the server should resume sending results.
     *
     * This is related to the snapshotVersion in that the resumeToken
     * effectively also encodes that value, but the resumeToken is opaque
     * and sometimes encodes additional information.
     *
     * A consequence of this is that the resumeToken should be used when
     * asking the server to reason about where this client is in the watch
     * stream, but the client should use the snapshotVersion for its own
     * purposes.
     *
     * This is the same value as TargetChange.resume_token in the protos.
     */
r, 
/**
     * A sequence number representing the last time this query was
     * listened to, used for garbage collection purposes.
     *
     * Conventionally this would be a timestamp value, but device-local
     * clocks are unreliable and they must be able to create new listens
     * even while disconnected. Instead this should be a monotonically
     * increasing number that's incremented on each listen call.
     *
     * This is different from the queryId since the queryId is an
     * immutable identifier assigned to the Query on first use while
     * lastListenSequenceNumber is updated every time the query is
     * listened to.
     */
i, 
/**
     * Denotes the maximum snapshot version at which the associated query view
     * contained no limbo documents.  Undefined for data written prior to
     * schema version 9.
     */
o, 
/**
     * The query for this target.
     *
     * Because canonical ids are not unique we must store the actual query. We
     * use the proto to have an object we can persist without having to
     * duplicate translation logic to and from a `Query` object.
     */
s) {
    this.targetId = t, this.canonicalId = e, this.readTime = n, this.resumeToken = r, 
    this.lastListenSequenceNumber = i, this.lastLimboFreeSnapshotVersion = o, this.query = s;
};

wr.store = "targets", 
/** Keys are automatically assigned via the targetId property. */
wr.keyPath = "targetId", 
/** The name of the queryTargets index. */
wr.queryTargetsIndexName = "queryTargetsIndex", 
/**
     * The index of all canonicalIds to the targets that they match. This is not
     * a unique mapping because canonicalId does not promise a unique name for all
     * possible queries, so we append the targetId to make the mapping unique.
     */
wr.queryTargetsKeyPath = [ "canonicalId", "targetId" ];

/**
 * An object representing an association between a target and a document, or a
 * sentinel row marking the last sequence number at which a document was used.
 * Each document cached must have a corresponding sentinel row before lru
 * garbage collection is enabled.
 *
 * The target associations and sentinel rows are co-located so that orphaned
 * documents and their sequence numbers can be identified efficiently via a scan
 * of this store.
 */
var br = function(
/**
     * The targetId identifying a target or 0 for a sentinel row.
     */
t, 
/**
     * The path to the document, as encoded in the key.
     */
e, 
/**
     * If this is a sentinel row, this should be the sequence number of the last
     * time the document specified by `path` was used. Otherwise, it should be
     * `undefined`.
     */
n) {
    this.targetId = t, this.path = e, this.sequenceNumber = n;
};

/** Name of the IndexedDb object store.  */ br.store = "targetDocuments", 
/** Keys are automatically assigned via the targetId, path properties. */
br.keyPath = [ "targetId", "path" ], 
/** The index name for the reverse index. */
br.documentTargetsIndex = "documentTargetsIndex", 
/** We also need to create the reverse index for these properties. */
br.documentTargetsKeyPath = [ "path", "targetId" ];

/**
 * A record of global state tracked across all Targets, tracked separately
 * to avoid the need for extra indexes.
 *
 * This should be kept in-sync with the proto used in the iOS client.
 */
var Ir = function(
/**
     * The highest numbered target id across all targets.
     *
     * See DbTarget.targetId.
     */
t, 
/**
     * The highest numbered lastListenSequenceNumber across all targets.
     *
     * See DbTarget.lastListenSequenceNumber.
     */
e, 
/**
     * A global snapshot version representing the last consistent snapshot we
     * received from the backend. This is monotonically increasing and any
     * snapshots received from the backend prior to this version (e.g. for
     * targets resumed with a resumeToken) should be suppressed (buffered)
     * until the backend has caught up to this snapshot version again. This
     * prevents our cache from ever going backwards in time.
     */
n, 
/**
     * The number of targets persisted.
     */
r) {
    this.highestTargetId = t, this.highestListenSequenceNumber = e, this.lastRemoteSnapshotVersion = n, 
    this.targetCount = r;
};

/**
 * The key string used for the single object that exists in the
 * DbTargetGlobal store.
 */ Ir.key = "targetGlobalKey", Ir.store = "targetGlobal";

/**
 * An object representing an association between a Collection id (e.g. 'messages')
 * to a parent path (e.g. '/chats/123') that contains it as a (sub)collection.
 * This is used to efficiently find all collections to query when performing
 * a Collection Group query.
 */
var Tr = function(
/**
     * The collectionId (e.g. 'messages')
     */
t, 
/**
     * The path to the parent (either a document location or an empty path for
     * a root-level collection).
     */
e) {
    this.collectionId = t, this.parent = e;
};

/** Name of the IndexedDb object store. */ Tr.store = "collectionParents", 
/** Keys are automatically assigned via the collectionId, parent properties. */
Tr.keyPath = [ "collectionId", "parent" ];

/**
 * A record of the metadata state of each client.
 *
 * PORTING NOTE: This is used to synchronize multi-tab state and does not need
 * to be ported to iOS or Android.
 */
var Er = function(
// Note: Previous schema versions included a field
// "lastProcessedDocumentChangeId". Don't use anymore.
/** The auto-generated client id assigned at client startup. */
t, 
/** The last time this state was updated. */
e, 
/** Whether the client's network connection is enabled. */
n, 
/** Whether this client is running in a foreground tab. */
r) {
    this.clientId = t, this.updateTimeMs = e, this.networkEnabled = n, this.inForeground = r;
};

/** Name of the IndexedDb object store. */ Er.store = "clientMetadata", 
/** Keys are automatically assigned via the clientId properties. */
Er.keyPath = "clientId";

/**
 * A object representing a bundle loaded by the SDK.
 */
var Sr = function(
/** The ID of the loaded bundle. */
t, 
/** The create time of the loaded bundle. */
e, 
/** The schema version of the loaded bundle. */
n) {
    this.bundleId = t, this.createTime = e, this.version = n;
};

/** Name of the IndexedDb object store. */ Sr.store = "bundles", Sr.keyPath = "bundleId";

/**
 * A object representing a named query loaded by the SDK via a bundle.
 */
var _r = function(
/** The name of the query. */
t, 
/** The read time of the results saved in the bundle from the named query. */
e, 
/** The query saved in the bundle. */
n) {
    this.name = t, this.readTime = e, this.bundledQuery = n;
};

/** Name of the IndexedDb object store. */ _r.store = "namedQueries", _r.keyPath = "name";

// Visible for testing
var Nr = e(e([], e(e([], e(e([], e(e([], [ lr.store, dr.store, pr.store, mr.store, wr.store, fr.store, Ir.store, br.store ]), [ Er.store ])), [ gr.store ])), [ Tr.store ])), [ Sr.store, _r.store ]), Dr = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.", Ar = /** @class */ function() {
    function t() {
        this.onCommittedListeners = [];
    }
    return t.prototype.addOnCommittedListener = function(t) {
        this.onCommittedListeners.push(t);
    }, t.prototype.raiseOnCommittedEvent = function() {
        this.onCommittedListeners.forEach((function(t) {
            return t();
        }));
    }, t;
}(), kr = function() {
    var t = this;
    this.promise = new Promise((function(e, n) {
        t.resolve = e, t.reject = n;
    }));
}, Cr = /** @class */ function() {
    function t(t) {
        var e = this;
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
                this.nextCallback = null, this.catchCallback = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.isDone = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.callbackAttached = !1, t((function(t) {
            e.isDone = !0, e.result = t, e.nextCallback && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            e.nextCallback(t);
        }), (function(t) {
            e.isDone = !0, e.error = t, e.catchCallback && e.catchCallback(t);
        }));
    }
    return t.prototype.catch = function(t) {
        return this.next(void 0, t);
    }, t.prototype.next = function(e, n) {
        var r = this;
        return this.callbackAttached && K(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(n, this.error) : this.wrapSuccess(e, this.result) : new t((function(t, i) {
            r.nextCallback = function(n) {
                r.wrapSuccess(e, n).next(t, i);
            }, r.catchCallback = function(e) {
                r.wrapFailure(n, e).next(t, i);
            };
        }));
    }, t.prototype.toPromise = function() {
        var t = this;
        return new Promise((function(e, n) {
            t.next(e, n);
        }));
    }, t.prototype.wrapUserFunction = function(e) {
        try {
            var n = e();
            return n instanceof t ? n : t.resolve(n);
        } catch (e) {
            return t.reject(e);
        }
    }, t.prototype.wrapSuccess = function(e, n) {
        return e ? this.wrapUserFunction((function() {
            return e(n);
        })) : t.resolve(n);
    }, t.prototype.wrapFailure = function(e, n) {
        return e ? this.wrapUserFunction((function() {
            return e(n);
        })) : t.reject(n);
    }, t.resolve = function(e) {
        return new t((function(t, n) {
            t(e);
        }));
    }, t.reject = function(e) {
        return new t((function(t, n) {
            n(e);
        }));
    }, t.waitFor = function(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        return new t((function(t, n) {
            var r = 0, i = 0, o = !1;
            e.forEach((function(e) {
                ++r, e.next((function() {
                    ++i, o && i === r && t();
                }), (function(t) {
                    return n(t);
                }));
            })), o = !0, i === r && t();
        }));
    }, 
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */
    t.or = function(e) {
        for (var n = t.resolve(!1), r = function(e) {
            n = n.next((function(n) {
                return n ? t.resolve(n) : e();
            }));
        }, i = 0, o = e; i < o.length; i++) {
            r(o[i]);
        }
        return n;
    }, t.forEach = function(t, e) {
        var n = this, r = [];
        return t.forEach((function(t, i) {
            r.push(e.call(n, t, i));
        })), this.waitFor(r);
    }, t;
}(), xr = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.action = t, this.transaction = e, this.aborted = !1, 
        /**
             * A promise that resolves with the result of the IndexedDb transaction.
             */
        this.ft = new kr, this.transaction.oncomplete = function() {
            n.ft.resolve();
        }, this.transaction.onabort = function() {
            e.error ? n.ft.reject(new Or(t, e.error)) : n.ft.resolve();
        }, this.transaction.onerror = function(e) {
            var r = qr(e.target.error);
            n.ft.reject(new Or(t, r));
        };
    }
    return t.open = function(e, n, r, i) {
        try {
            return new t(n, e.transaction(i, r));
        } catch (e) {
            throw new Or(n, e);
        }
    }, Object.defineProperty(t.prototype, "dt", {
        get: function() {
            return this.ft.promise;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.abort = function(t) {
        t && this.ft.reject(t), this.aborted || (q("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
        this.aborted = !0, this.transaction.abort());
    }, 
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */
    t.prototype.store = function(t) {
        var e = this.transaction.objectStore(t);
        return new Fr(e);
    }, t;
}(), Rr = /** @class */ function() {
    /*
     * Creates a new SimpleDb wrapper for IndexedDb database `name`.
     *
     * Note that `version` must not be a downgrade. IndexedDB does not support
     * downgrading the schema version. We currently do not support any way to do
     * versioning outside of IndexedDB's versioning mechanism, as only
     * version-upgrade transactions are allowed to do things like create
     * objectstores.
     */
    function t(e, n, r) {
        this.name = e, this.version = n, this.wt = r, 
        // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
        // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
        // whatever reason it's much harder to hit after 12.2 so we only proactively
        // log on 12.2.
        12.2 === t._t(f()) && U("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
    }
    /** Deletes the specified database. */    return t.delete = function(t) {
        return q("SimpleDb", "Removing database:", t), Mr(window.indexedDB.deleteDatabase(t)).toPromise();
    }, 
    /** Returns true if IndexedDB is available in the current environment. */ t.gt = function() {
        if ("undefined" == typeof indexedDB) return !1;
        if (t.yt()) return !0;
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
                var e = f(), n = t._t(e), r = 0 < n && n < 10, i = t.Et(e), o = 0 < i && i < 4.5;
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
                return !(e.indexOf("MSIE ") > 0 || e.indexOf("Trident/") > 0 || e.indexOf("Edge/") > 0 || r || o);
    }, 
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    t.yt = function() {
        var t;
        return "undefined" != typeof process && "YES" === (null === (t = process.env) || void 0 === t ? void 0 : t.Tt);
    }, 
    /** Helper to get a typed SimpleDbStore from a transaction. */ t.It = function(t, e) {
        return t.store(e);
    }, 
    // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    t._t = function(t) {
        var e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, 
    // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    t.Et = function(t) {
        var e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, 
    /**
     * Opens the specified database, creating or upgrading it if necessary.
     */
    t.prototype.At = function(t) {
        return n(this, void 0, void 0, (function() {
            var e, n = this;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return this.db ? [ 3 /*break*/ , 2 ] : (q("SimpleDb", "Opening database:", this.name), 
                    e = this, [ 4 /*yield*/ , new Promise((function(e, r) {
                        // TODO(mikelehen): Investigate browser compatibility.
                        // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
                        // suggests IE9 and older WebKit browsers handle upgrade
                        // differently. They expect setVersion, as described here:
                        // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
                        var i = indexedDB.open(n.name, n.version);
                        i.onsuccess = function(t) {
                            var n = t.target.result;
                            e(n);
                        }, i.onblocked = function() {
                            r(new Or(t, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
                        }, i.onerror = function(e) {
                            var n = e.target.error;
                            "VersionError" === n.name ? r(new P(O.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : r(new Or(t, n));
                        }, i.onupgradeneeded = function(t) {
                            q("SimpleDb", 'Database "' + n.name + '" requires upgrade from version:', t.oldVersion);
                            var e = t.target.result;
                            n.wt.Rt(e, i.transaction, t.oldVersion, n.version).next((function() {
                                q("SimpleDb", "Database upgrade to version " + n.version + " complete");
                            }));
                        };
                    })) ]);

                  case 1:
                    e.db = r.sent(), r.label = 2;

                  case 2:
                    return [ 2 /*return*/ , (this.Pt && (this.db.onversionchange = function(t) {
                        return n.Pt(t);
                    }), this.db) ];
                }
            }));
        }));
    }, t.prototype.bt = function(t) {
        this.Pt = t, this.db && (this.db.onversionchange = function(e) {
            return t(e);
        });
    }, t.prototype.runTransaction = function(t, e, i, o) {
        return n(this, void 0, void 0, (function() {
            var n, s, u, a, c;
            return r(this, (function(h) {
                switch (h.label) {
                  case 0:
                    n = "readonly" === e, s = 0, u = function() {
                        var e, u, c, h, f;
                        return r(this, (function(r) {
                            switch (r.label) {
                              case 0:
                                ++s, r.label = 1;

                              case 1:
                                return r.trys.push([ 1, 4, , 5 ]), [ 4 /*yield*/ , a.At(t) ];

                              case 2:
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                return a.db = r.sent(), e = xr.open(a.db, t, n ? "readonly" : "readwrite", i), u = o(e).catch((function(t) {
                                    // Abort the transaction if there was an error.
                                    return e.abort(t), Cr.reject(t);
                                })).toPromise(), c = {}, u.catch((function() {})), [ 4 /*yield*/ , e.dt ];

                              case 3:
                                return [ 2 /*return*/ , (c.value = (
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                r.sent(), u), c) ];

                              case 4:
                                return h = r.sent(), f = "FirebaseError" !== h.name && s < 3, q("SimpleDb", "Transaction failed with error:", h.message, "Retrying:", f), 
                                a.close(), f ? [ 3 /*break*/ , 5 ] : [ 2 /*return*/ , {
                                    value: Promise.reject(h)
                                } ];

                              case 5:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }, a = this, h.label = 1;

                  case 1:
                    return [ 5 /*yield**/ , u() ];

                  case 2:
                    if ("object" == typeof (c = h.sent())) return [ 2 /*return*/ , c.value ];
                    h.label = 3;

                  case 3:
                    return [ 3 /*break*/ , 1 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.close = function() {
        this.db && this.db.close(), this.db = void 0;
    }, t;
}(), Lr = /** @class */ function() {
    function t(t) {
        this.vt = t, this.Vt = !1, this.St = null;
    }
    return Object.defineProperty(t.prototype, "isDone", {
        get: function() {
            return this.Vt;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "Dt", {
        get: function() {
            return this.St;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "cursor", {
        set: function(t) {
            this.vt = t;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * This function can be called to stop iteration at any point.
     */
    t.prototype.done = function() {
        this.Vt = !0;
    }, 
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */
    t.prototype.Ct = function(t) {
        this.St = t;
    }, 
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */
    t.prototype.delete = function() {
        return Mr(this.vt.delete());
    }, t;
}(), Or = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, O.UNAVAILABLE, "IndexedDB transaction '" + t + "' failed: " + n) || this).name = "IndexedDbTransactionError", 
        r;
    }
    return t(n, e), n;
}(P);

// V2 is no longer usable (see comment at top of file)
// Visible for testing
/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */
/** Verifies whether `e` is an IndexedDbTransactionError. */ function Pr(t) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return "IndexedDbTransactionError" === t.name;
}

/**
 * A wrapper around an IDBObjectStore providing an API that:
 *
 * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
 * methods for acting against the object store.
 * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
 * method return a PersistencePromise instead.
 * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
 * intermediate IndexedDB types (IDBCursorWithValue, etc.)
 */ var Fr = /** @class */ function() {
    function t(t) {
        this.store = t;
    }
    return t.prototype.put = function(t, e) {
        var n;
        return void 0 !== e ? (q("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (q("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
        n = this.store.put(t)), Mr(n);
    }, 
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */
    t.prototype.add = function(t) {
        return q("SimpleDb", "ADD", this.store.name, t, t), Mr(this.store.add(t));
    }, 
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @returns The object with the specified key or null if no object exists.
     */
    t.prototype.get = function(t) {
        var e = this;
        // We're doing an unsafe cast to ValueType.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return Mr(this.store.get(t)).next((function(n) {
            // Normalize nonexistence to null.
            return void 0 === n && (n = null), q("SimpleDb", "GET", e.store.name, t, n), n;
        }));
    }, t.prototype.delete = function(t) {
        return q("SimpleDb", "DELETE", this.store.name, t), Mr(this.store.delete(t));
    }, 
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    t.prototype.count = function() {
        return q("SimpleDb", "COUNT", this.store.name), Mr(this.store.count());
    }, t.prototype.Nt = function(t, e) {
        var n = this.cursor(this.options(t, e)), r = [];
        return this.xt(n, (function(t, e) {
            r.push(e);
        })).next((function() {
            return r;
        }));
    }, t.prototype.kt = function(t, e) {
        q("SimpleDb", "DELETE ALL", this.store.name);
        var n = this.options(t, e);
        n.$t = !1;
        var r = this.cursor(n);
        return this.xt(r, (function(t, e, n) {
            return n.delete();
        }));
    }, t.prototype.Ot = function(t, e) {
        var n;
        e ? n = t : (n = {}, e = t);
        var r = this.cursor(n);
        return this.xt(r, e);
    }, 
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */
    t.prototype.Ft = function(t) {
        var e = this.cursor({});
        return new Cr((function(n, r) {
            e.onerror = function(t) {
                var e = qr(t.target.error);
                r(e);
            }, e.onsuccess = function(e) {
                var r = e.target.result;
                r ? t(r.primaryKey, r.value).next((function(t) {
                    t ? r.continue() : n();
                })) : n();
            };
        }));
    }, t.prototype.xt = function(t, e) {
        var n = [];
        return new Cr((function(r, i) {
            t.onerror = function(t) {
                i(t.target.error);
            }, t.onsuccess = function(t) {
                var i = t.target.result;
                if (i) {
                    var o = new Lr(i), s = e(i.primaryKey, i.value, o);
                    if (s instanceof Cr) {
                        var u = s.catch((function(t) {
                            return o.done(), Cr.reject(t);
                        }));
                        n.push(u);
                    }
                    o.isDone ? r() : null === o.Dt ? i.continue() : i.continue(o.Dt);
                } else r();
            };
        })).next((function() {
            return Cr.waitFor(n);
        }));
    }, t.prototype.options = function(t, e) {
        var n;
        return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
            index: n,
            range: e
        };
    }, t.prototype.cursor = function(t) {
        var e = "next";
        if (t.reverse && (e = "prev"), t.index) {
            var n = this.store.index(t.index);
            return t.$t ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }, t;
}();

/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */ function Mr(t) {
    return new Cr((function(e, n) {
        t.onsuccess = function(t) {
            var n = t.target.result;
            e(n);
        }, t.onerror = function(t) {
            var e = qr(t.target.error);
            n(e);
        };
    }));
}

// Guard so we only report the error once.
var Vr = !1;

function qr(t) {
    var e = Rr._t(f());
    if (e >= 12.2 && e < 13) {
        var n = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(n) >= 0) {
            // Wrap error in a more descriptive one.
            var r = new P("internal", "IOS_INDEXEDDB_BUG1: IndexedDb has thrown '" + n + "'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
            return Vr || (Vr = !0, 
            // Throw a global exception outside of this promise chain, for the user to
            // potentially catch.
            setTimeout((function() {
                throw r;
            }), 0)), r;
        }
    }
    return t;
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
 */ var Ur = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).Mt = t, r.currentSequenceNumber = n, r;
    }
    return t(n, e), n;
}(Ar);

function Br(t, e) {
    var n = z(t);
    return Rr.It(n.Mt, e);
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
 * A batch of mutations that will be sent as one unit to the backend.
 */ var jr = /** @class */ function() {
    /**
     * @param batchId - The unique ID of this mutation batch.
     * @param localWriteTime - The original write time of this mutation.
     * @param baseMutations - Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations - The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */
    function t(t, e, n, r) {
        this.batchId = t, this.localWriteTime = e, this.baseMutations = n, this.mutations = r
        /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to compute the state of the remote document
     *
     * @param document - The document to apply mutations to.
     * @param batchResult - The result of applying the MutationBatch to the
     * backend.
     */;
    }
    return t.prototype.applyToRemoteDocument = function(t, e) {
        for (var n = e.mutationResults, r = 0; r < this.mutations.length; r++) {
            var i = this.mutations[r];
            i.key.isEqual(t.key) && qe(i, t, n[r]);
        }
    }, 
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param document - The document to apply mutations to.
     */
    t.prototype.applyToLocalView = function(t) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (var e = 0, n = this.baseMutations; e < n.length; e++) {
            var r = n[e];
            r.key.isEqual(t.key) && Ue(r, t, this.localWriteTime);
        }
        // Second, apply all user-provided mutations.
                for (var i = 0, o = this.mutations; i < o.length; i++) {
            var s = o[i];
            s.key.isEqual(t.key) && Ue(s, t, this.localWriteTime);
        }
    }, 
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */
    t.prototype.applyToLocalDocumentSet = function(t) {
        var e = this;
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
                this.mutations.forEach((function(n) {
            var r = t.get(n.key), i = r;
            // TODO(mutabledocuments): This method should take a MutableDocumentMap
            // and we should remove this cast.
                        e.applyToLocalView(i), r.isValidDocument() || i.convertToNoDocument(J.min());
        }));
    }, t.prototype.keys = function() {
        return this.mutations.reduce((function(t, e) {
            return t.add(e.key);
        }), yn());
    }, t.prototype.isEqual = function(t) {
        return this.batchId === t.batchId && Y(this.mutations, t.mutations, (function(t, e) {
            return je(t, e);
        })) && Y(this.baseMutations, t.baseMutations, (function(t, e) {
            return je(t, e);
        }));
    }, t;
}(), Kr = /** @class */ function() {
    function t(t, e, n, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    r) {
        this.batch = t, this.commitVersion = e, this.mutationResults = n, this.docVersions = r
        /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=&gt;version mapping (docVersions).
     */;
    }
    return t.from = function(e, n, r) {
        G(e.mutations.length === r.length);
        for (var i = dn(), o = e.mutations, s = 0; s < o.length; s++) i = i.insert(o[s].key, r[s].version);
        return new t(e, n, r, i);
    }, t;
}(), Gr = /** @class */ function() {
    function t(
    /** The target being listened to. */
    t, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    e, 
    /** The purpose of the target. */
    n, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    r, 
    /** The latest snapshot version seen for this target. */
    i
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */ , o
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */ , s) {
        void 0 === i && (i = J.min()), void 0 === o && (o = J.min()), void 0 === s && (s = ut.EMPTY_BYTE_STRING), 
        this.target = t, this.targetId = e, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, 
        this.lastLimboFreeSnapshotVersion = o, this.resumeToken = s;
    }
    /** Creates a new target data instance with an updated sequence number. */    return t.prototype.withSequenceNumber = function(e) {
        return new t(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }, 
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */
    t.prototype.withResumeToken = function(e, n) {
        return new t(this.target, this.targetId, this.purpose, this.sequenceNumber, n, this.lastLimboFreeSnapshotVersion, e);
    }, 
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */
    t.prototype.withLastLimboFreeSnapshotVersion = function(e) {
        return new t(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken);
    }, t;
}(), zr = function(t) {
    this.Lt = t;
};

/** The result of applying a mutation batch to the backend. */
/** Decodes a remote document from storage locally to a Document. */ function Qr(t, e) {
    if (e.document) return Kn(t.Lt, e.document, !!e.hasCommittedMutations);
    if (e.noDocument) {
        var n = gt.fromSegments(e.noDocument.path), r = $r(e.noDocument.readTime), i = Pt.newNoDocument(n, r);
        return e.hasCommittedMutations ? i.setHasCommittedMutations() : i;
    }
    if (e.unknownDocument) {
        var o = gt.fromSegments(e.unknownDocument.path), s = $r(e.unknownDocument.version);
        return Pt.newUnknownDocument(o, s);
    }
    return K();
}

/** Encodes a document for storage locally. */ function Wr(t, e, n) {
    var r = Hr(n), i = e.key.path.popLast().toArray();
    if (e.isFoundDocument()) {
        var o = function(t, e) {
            return {
                name: Fn(t, e.key),
                fields: e.data.value.mapValue.fields,
                updateTime: Cn(t, e.version.toTimestamp())
            };
        }(t.Lt, e), s = e.hasCommittedMutations;
        return new mr(
        /* unknownDocument= */ null, 
        /* noDocument= */ null, o, s, r, i);
    }
    if (e.isNoDocument()) {
        var u = e.key.path.toArray(), a = Xr(e.version), c = e.hasCommittedMutations;
        return new mr(
        /* unknownDocument= */ null, new yr(u, a), 
        /* document= */ null, c, r, i);
    }
    if (e.isUnknownDocument()) {
        var h = e.key.path.toArray(), f = Xr(e.version);
        return new mr(new vr(h, f), 
        /* noDocument= */ null, 
        /* document= */ null, 
        /* hasCommittedMutations= */ !0, r, i);
    }
    return K();
}

function Hr(t) {
    var e = t.toTimestamp();
    return [ e.seconds, e.nanoseconds ];
}

function Yr(t) {
    var e = new $(t[0], t[1]);
    return J.fromTimestamp(e);
}

function Xr(t) {
    var e = t.toTimestamp();
    return new hr(e.seconds, e.nanoseconds);
}

function $r(t) {
    var e = new $(t.seconds, t.nanoseconds);
    return J.fromTimestamp(e);
}

/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
/** Decodes a DbMutationBatch into a MutationBatch */ function Jr(t, e) {
    // Squash old transform mutations into existing patch or set mutations.
    // The replacement of representing `transforms` with `update_transforms`
    // on the SDK means that old `transform` mutations stored in IndexedDB need
    // to be updated to `update_transforms`.
    // TODO(b/174608374): Remove this code once we perform a schema migration.
    for (var n = (e.baseMutations || []).map((function(e) {
        return zn(t.Lt, e);
    })), r = 0; r < e.mutations.length - 1; ++r) {
        var i = e.mutations[r];
        if (r + 1 < e.mutations.length && void 0 !== e.mutations[r + 1].transform) {
            var o = e.mutations[r + 1];
            i.updateTransforms = o.transform.fieldTransforms, e.mutations.splice(r + 1, 1), 
            ++r;
        }
    }
    var s = e.mutations.map((function(e) {
        return zn(t.Lt, e);
    })), u = $.fromMillis(e.localWriteTimeMs);
    return new jr(e.batchId, u, n, s);
}

/** Decodes a DbTarget into TargetData */ function Zr(t) {
    var e, n, r = $r(t.readTime), i = void 0 !== t.lastLimboFreeSnapshotVersion ? $r(t.lastLimboFreeSnapshotVersion) : J.min();
    return void 0 !== t.query.documents ? (G(1 === (n = t.query).documents.length), 
    e = fe(ie(qn(n.documents[0])))) : e = function(t) {
        return fe(Hn(t));
    }(t.query), new Gr(e, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, r, i, ut.fromBase64String(t.resumeToken))
    /** Encodes TargetData into a DbTarget for storage locally. */;
}

function ti(t, e) {
    var n, r = Xr(e.snapshotVersion), i = Xr(e.lastLimboFreeSnapshotVersion);
    n = Ut(e.target) ? Qn(t.Lt, e.target) : Wn(t.Lt, e.target);
    // We can't store the resumeToken as a ByteString in IndexedDb, so we
    // convert it to a base64 string for storage.
    var o = e.resumeToken.toBase64();
    // lastListenSequenceNumber is always 0 until we do real GC.
        return new wr(e.targetId, Vt(e.target), r, o, e.sequenceNumber, i, n);
}

/**
 * A helper function for figuring out what kind of query has been stored.
 */
/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */ function ei(t) {
    var e = Hn({
        parent: t.parent,
        structuredQuery: t.structuredQuery
    });
    return "LAST" === t.limitType ? le(e, e.limit, "L" /* Last */) : e;
}

/** Encodes a NamedQuery proto object to a NamedQuery model object. */
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
 */ var ni = /** @class */ function() {
    function t() {}
    return t.prototype.getBundleMetadata = function(t, e) {
        return ri(t).get(e).next((function(t) {
            if (t) return {
                id: (e = t).bundleId,
                createTime: $r(e.createTime),
                version: e.version
            };
            /** Encodes a DbBundle to a BundleMetadata object. */            var e;
            /** Encodes a BundleMetadata to a DbBundle. */        }));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        return ri(t).put({
            bundleId: (n = e).id,
            createTime: Xr(Ln(n.createTime)),
            version: n.version
        });
        var n;
        /** Encodes a DbNamedQuery to a NamedQuery. */    }, t.prototype.getNamedQuery = function(t, e) {
        return ii(t).get(e).next((function(t) {
            if (t) return {
                name: (e = t).name,
                query: ei(e.bundledQuery),
                readTime: $r(e.readTime)
            };
            var e;
            /** Encodes a NamedQuery from a bundle proto to a DbNamedQuery. */        }));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return ii(t).put(function(t) {
            return {
                name: t.name,
                readTime: Xr(Ln(t.readTime)),
                bundledQuery: t.bundledQuery
            };
        }(e));
    }, t;
}();

/**
 * Helper to get a typed SimpleDbStore for the bundles object store.
 */ function ri(t) {
    return Br(t, Sr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the namedQueries object store.
 */ function ii(t) {
    return Br(t, _r.store);
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
 * An in-memory implementation of IndexManager.
 */ var oi = /** @class */ function() {
    function t() {
        this.Bt = new si;
    }
    return t.prototype.addToCollectionParentIndex = function(t, e) {
        return this.Bt.add(e), Cr.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        return Cr.resolve(this.Bt.getEntries(e));
    }, t;
}(), si = /** @class */ function() {
    function t() {
        this.index = {};
    }
    // Returns false if the entry already existed.
        return t.prototype.add = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e] || new sn(rt.comparator), i = !r.has(n);
        return this.index[e] = r.add(n), i;
    }, t.prototype.has = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e];
        return r && r.has(n);
    }, t.prototype.getEntries = function(t) {
        return (this.index[t] || new sn(rt.comparator)).toArray();
    }, t;
}(), ui = /** @class */ function() {
    function t() {
        /**
         * An in-memory copy of the index entries we've already written since the SDK
         * launched. Used to avoid re-writing the same entry repeatedly.
         *
         * This is *NOT* a complete cache of what's in persistence and so can never be used to
         * satisfy reads.
         */
        this.Ut = new si;
    }
    /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */    return t.prototype.addToCollectionParentIndex = function(t, e) {
        var n = this;
        if (!this.Ut.has(e)) {
            var r = e.lastSegment(), i = e.popLast();
            t.addOnCommittedListener((function() {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                n.Ut.add(e);
            }));
            var o = {
                collectionId: r,
                parent: sr(i)
            };
            return ai(t).put(o);
        }
        return Cr.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        var n = [], r = IDBKeyRange.bound([ e, "" ], [ X(e), "" ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return ai(t).Nt(r).next((function(t) {
            for (var r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                                if (o.collectionId !== e) break;
                n.push(cr(o.parent));
            }
            return n;
        }));
    }, t;
}();

/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */
/**
 * Helper to get a typed SimpleDbStore for the collectionParents
 * document store.
 */
function ai(t) {
    return Br(t, Tr.store);
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
 */ var ci = {
    didRun: !1,
    sequenceNumbersCollected: 0,
    targetsRemoved: 0,
    documentsRemoved: 0
}, hi = /** @class */ function() {
    function t(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    n) {
        this.cacheSizeCollectionThreshold = t, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n;
    }
    return t.withCacheSize = function(e) {
        return new t(e, t.DEFAULT_COLLECTION_PERCENTILE, t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
    }, t;
}();

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
 * Delete a mutation batch and the associated document mutations.
 * @returns A PersistencePromise of the document mutations that were removed.
 */
function fi(t, e, n) {
    var r = t.store(dr.store), i = t.store(pr.store), o = [], s = IDBKeyRange.only(n.batchId), u = 0, a = r.Ot({
        range: s
    }, (function(t, e, n) {
        return u++, n.delete();
    }));
    o.push(a.next((function() {
        G(1 === u);
    })));
    for (var c = [], h = 0, f = n.mutations; h < f.length; h++) {
        var l = f[h], d = pr.key(e, l.key.path, n.batchId);
        o.push(i.delete(d)), c.push(l.key);
    }
    return Cr.waitFor(o).next((function() {
        return c;
    }));
}

/**
 * Returns an approximate size for the given document.
 */ function li(t) {
    if (!t) return 0;
    var e;
    if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
        if (!t.noDocument) throw K();
        e = t.noDocument;
    }
    return JSON.stringify(e).length;
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
/** A mutation queue for a specific user, backed by IndexedDB. */ hi.DEFAULT_COLLECTION_PERCENTILE = 10, 
hi.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, hi.DEFAULT = new hi(41943040, hi.DEFAULT_COLLECTION_PERCENTILE, hi.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), 
hi.DISABLED = new hi(-1, 0, 0);

var di = /** @class */ function() {
    function t(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    t, e, n, r) {
        this.userId = t, this.R = e, this.qt = n, this.referenceDelegate = r, 
        /**
             * Caches the document keys for pending mutation batches. If the mutation
             * has been removed from IndexedDb, the cached value may continue to
             * be used to retrieve the batch's document keys. To remove a cached value
             * locally, `removeCachedMutationKeys()` should be invoked either directly
             * or through `removeMutationBatches()`.
             *
             * With multi-tab, when the primary client acknowledges or rejects a mutation,
             * this cache is used by secondary clients to invalidate the local
             * view of the documents that were previously affected by the mutation.
             */
        // PORTING NOTE: Multi-tab only.
        this.Kt = {}
        /**
     * Creates a new mutation queue for the given user.
     * @param user - The user for which to create a mutation queue.
     * @param serializer - The serializer to use when persisting to IndexedDb.
     */;
    }
    return t.jt = function(e, n, r, i) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        return G("" !== e.uid), new t(e.isAuthenticated() ? e.uid : "", n, r, i);
    }, t.prototype.checkEmpty = function(t) {
        var e = !0, n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return yi(t).Ot({
            index: dr.userMutationsIndex,
            range: n
        }, (function(t, n, r) {
            e = !1, r.done();
        })).next((function() {
            return e;
        }));
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this, o = vi(t), s = yi(t);
        // The IndexedDb implementation in Chrome (and Firefox) does not handle
        // compound indices that include auto-generated keys correctly. To ensure
        // that the index entry is added correctly in all browsers, we perform two
        // writes: The first write is used to retrieve the next auto-generated Batch
        // ID, and the second write populates the index and stores the actual
        // mutation batch.
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
        // We write an empty object to obtain key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s.add({}).next((function(u) {
            G("number" == typeof u);
            for (var a = new jr(u, e, n, r), c = function(t, e, n) {
                var r = n.baseMutations.map((function(e) {
                    return Gn(t.Lt, e);
                })), i = n.mutations.map((function(e) {
                    return Gn(t.Lt, e);
                }));
                return new dr(e, n.batchId, n.localWriteTime.toMillis(), r, i);
            }(i.R, i.userId, a), h = [], f = new sn((function(t, e) {
                return H(t.canonicalString(), e.canonicalString());
            })), l = 0, d = r; l < d.length; l++) {
                var p = d[l], y = pr.key(i.userId, p.key.path, u);
                f = f.add(p.key.path.popLast()), h.push(s.put(c)), h.push(o.put(y, pr.PLACEHOLDER));
            }
            return f.forEach((function(e) {
                h.push(i.qt.addToCollectionParentIndex(t, e));
            })), t.addOnCommittedListener((function() {
                i.Kt[u] = a.keys();
            })), Cr.waitFor(h).next((function() {
                return a;
            }));
        }));
    }, t.prototype.lookupMutationBatch = function(t, e) {
        var n = this;
        return yi(t).get(e).next((function(t) {
            return t ? (G(t.userId === n.userId), Jr(n.R, t)) : null;
        }));
    }, 
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Qt = function(t, e) {
        var n = this;
        return this.Kt[e] ? Cr.resolve(this.Kt[e]) : this.lookupMutationBatch(t, e).next((function(t) {
            if (t) {
                var r = t.keys();
                return n.Kt[e] = r, r;
            }
            return null;
        }));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = this, r = e + 1, i = IDBKeyRange.lowerBound([ this.userId, r ]), o = null;
        return yi(t).Ot({
            index: dr.userMutationsIndex,
            range: i
        }, (function(t, e, i) {
            e.userId === n.userId && (G(e.batchId >= r), o = Jr(n.R, e)), i.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.getHighestUnacknowledgedBatchId = function(t) {
        var e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]), n = -1;
        return yi(t).Ot({
            index: dr.userMutationsIndex,
            range: e,
            reverse: !0
        }, (function(t, e, r) {
            n = e.batchId, r.done();
        })).next((function() {
            return n;
        }));
    }, t.prototype.getAllMutationBatches = function(t) {
        var e = this, n = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return yi(t).Nt(dr.userMutationsIndex, n).next((function(t) {
            return t.map((function(t) {
                return Jr(e.R, t);
            }));
        }));
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = pr.prefixForPath(this.userId, e.path), i = IDBKeyRange.lowerBound(r), o = [];
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
                return vi(t).Ot({
            range: i
        }, (function(r, i, s) {
            var u = r[0], a = r[1], c = r[2], h = cr(a);
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
                        if (u === n.userId && e.path.isEqual(h)) 
            // Look up the mutation batch in the store.
            return yi(t).get(c).next((function(t) {
                if (!t) throw K();
                G(t.userId === n.userId), o.push(Jr(n.R, t));
            }));
            s.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new sn(H), i = [];
        return e.forEach((function(e) {
            var o = pr.prefixForPath(n.userId, e.path), s = IDBKeyRange.lowerBound(o), u = vi(t).Ot({
                range: s
            }, (function(t, i, o) {
                var s = t[0], u = t[1], a = t[2], c = cr(u);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                                s === n.userId && e.path.isEqual(c) ? r = r.add(a) : o.done();
            }));
            i.push(u);
        })), Cr.waitFor(i).next((function() {
            return n.Wt(t, r);
        }));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        var n = this, r = e.path, i = r.length + 1, o = pr.prefixForPath(this.userId, r), s = IDBKeyRange.lowerBound(o), u = new sn(H);
        return vi(t).Ot({
            range: s
        }, (function(t, e, o) {
            var s = t[0], a = t[1], c = t[2], h = cr(a);
            s === n.userId && r.isPrefixOf(h) ? 
            // Rows with document keys more than one segment longer than the
            // query path can't be matches. For example, a query on 'rooms'
            // can't match the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            h.length === i && (u = u.add(c)) : o.done();
        })).next((function() {
            return n.Wt(t, u);
        }));
    }, t.prototype.Wt = function(t, e) {
        var n = this, r = [], i = [];
        // TODO(rockwood): Implement this using iterate.
        return e.forEach((function(e) {
            i.push(yi(t).get(e).next((function(t) {
                if (null === t) throw K();
                G(t.userId === n.userId), r.push(Jr(n.R, t));
            })));
        })), Cr.waitFor(i).next((function() {
            return r;
        }));
    }, t.prototype.removeMutationBatch = function(t, e) {
        var n = this;
        return fi(t.Mt, this.userId, e).next((function(r) {
            return t.addOnCommittedListener((function() {
                n.Gt(e.batchId);
            })), Cr.forEach(r, (function(e) {
                return n.referenceDelegate.markPotentiallyOrphaned(t, e);
            }));
        }));
    }, 
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    t.prototype.Gt = function(t) {
        delete this.Kt[t];
    }, t.prototype.performConsistencyCheck = function(t) {
        var e = this;
        return this.checkEmpty(t).next((function(n) {
            if (!n) return Cr.resolve();
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
                        var r = IDBKeyRange.lowerBound(pr.prefixForUser(e.userId)), i = [];
            return vi(t).Ot({
                range: r
            }, (function(t, n, r) {
                if (t[0] === e.userId) {
                    var o = cr(t[1]);
                    i.push(o);
                } else r.done();
            })).next((function() {
                G(0 === i.length);
            }));
        }));
    }, t.prototype.containsKey = function(t, e) {
        return pi(t, this.userId, e);
    }, 
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    t.prototype.zt = function(t) {
        var e = this;
        return mi(t).get(this.userId).next((function(t) {
            return t || new lr(e.userId, -1, 
            /*lastStreamToken=*/ "");
        }));
    }, t;
}();

/**
 * @returns true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */ function pi(t, e, n) {
    var r = pr.prefixForPath(e, n.path), i = r[1], o = IDBKeyRange.lowerBound(r), s = !1;
    return vi(t).Ot({
        range: o,
        $t: !0
    }, (function(t, n, r) {
        var o = t[0], u = t[1];
 /*batchID*/        t[2], o === e && u === i && (s = !0), 
        r.done();
    })).next((function() {
        return s;
    }));
}

/** Returns true if any mutation queue contains the given document. */
/**
 * Helper to get a typed SimpleDbStore for the mutations object store.
 */ function yi(t) {
    return Br(t, dr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function vi(t) {
    return Br(t, pr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function mi(t) {
    return Br(t, lr.store);
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
/** Offset to ensure non-overlapping target ids. */
/**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */ var gi = /** @class */ function() {
    function t(t) {
        this.Ht = t;
    }
    return t.prototype.next = function() {
        return this.Ht += 2, this.Ht;
    }, t.Jt = function() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new t(0);
    }, t.Yt = function() {
        // Sync engine assigns target IDs for limbo document detection.
        return new t(-1);
    }, t;
}(), wi = /** @class */ function() {
    function t(t, e) {
        this.referenceDelegate = t, this.R = e;
    }
    // PORTING NOTE: We don't cache global metadata for the target cache, since
    // some of it (in particular `highestTargetId`) can be modified by secondary
    // tabs. We could perhaps be more granular (and e.g. still cache
    // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
    // to IndexedDb whenever we need to read metadata. We can revisit if it turns
    // out to have a meaningful performance impact.
        return t.prototype.allocateTargetId = function(t) {
        var e = this;
        return this.Xt(t).next((function(n) {
            var r = new gi(n.highestTargetId);
            return n.highestTargetId = r.next(), e.Zt(t, n).next((function() {
                return n.highestTargetId;
            }));
        }));
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return this.Xt(t).next((function(t) {
            return J.fromTimestamp(new $(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds));
        }));
    }, t.prototype.getHighestSequenceNumber = function(t) {
        return this.Xt(t).next((function(t) {
            return t.highestListenSequenceNumber;
        }));
    }, t.prototype.setTargetsMetadata = function(t, e, n) {
        var r = this;
        return this.Xt(t).next((function(i) {
            return i.highestListenSequenceNumber = e, n && (i.lastRemoteSnapshotVersion = n.toTimestamp()), 
            e > i.highestListenSequenceNumber && (i.highestListenSequenceNumber = e), r.Zt(t, i);
        }));
    }, t.prototype.addTargetData = function(t, e) {
        var n = this;
        return this.te(t, e).next((function() {
            return n.Xt(t).next((function(r) {
                return r.targetCount += 1, n.ee(e, r), n.Zt(t, r);
            }));
        }));
    }, t.prototype.updateTargetData = function(t, e) {
        return this.te(t, e);
    }, t.prototype.removeTargetData = function(t, e) {
        var n = this;
        return this.removeMatchingKeysForTargetId(t, e.targetId).next((function() {
            return bi(t).delete(e.targetId);
        })).next((function() {
            return n.Xt(t);
        })).next((function(e) {
            return G(e.targetCount > 0), e.targetCount -= 1, n.Zt(t, e);
        }));
    }, 
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return bi(t).Ot((function(s, u) {
            var a = Zr(u);
            a.sequenceNumber <= e && null === n.get(a.targetId) && (i++, o.push(r.removeTargetData(t, a)));
        })).next((function() {
            return Cr.waitFor(o);
        })).next((function() {
            return i;
        }));
    }, 
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    t.prototype.forEachTarget = function(t, e) {
        return bi(t).Ot((function(t, n) {
            var r = Zr(n);
            e(r);
        }));
    }, t.prototype.Xt = function(t) {
        return Ii(t).get(Ir.key).next((function(t) {
            return G(null !== t), t;
        }));
    }, t.prototype.Zt = function(t, e) {
        return Ii(t).put(Ir.key, e);
    }, t.prototype.te = function(t, e) {
        return bi(t).put(ti(this.R, e));
    }, 
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    t.prototype.ee = function(t, e) {
        var n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
        t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
        n = !0), n;
    }, t.prototype.getTargetCount = function(t) {
        return this.Xt(t).next((function(t) {
            return t.targetCount;
        }));
    }, t.prototype.getTargetData = function(t, e) {
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficient.
        var n = Vt(e), r = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]), i = null;
        return bi(t).Ot({
            range: r,
            index: wr.queryTargetsIndexName
        }, (function(t, n, r) {
            var o = Zr(n);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
                        qt(e, o.target) && (i = o, r.done());
        })).next((function() {
            return i;
        }));
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        var r = this, i = [], o = Ti(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return e.forEach((function(e) {
            var s = sr(e.path);
            i.push(o.put(new br(n, s))), i.push(r.referenceDelegate.addReference(t, n, e));
        })), Cr.waitFor(i);
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        var r = this, i = Ti(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return Cr.forEach(e, (function(e) {
            var o = sr(e.path);
            return Cr.waitFor([ i.delete([ n, o ]), r.referenceDelegate.removeReference(t, n, e) ]);
        }));
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        var n = Ti(t), r = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return n.delete(r);
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), r = Ti(t), i = yn();
        return r.Ot({
            range: n,
            $t: !0
        }, (function(t, e, n) {
            var r = cr(t[1]), o = new gt(r);
            i = i.add(o);
        })).next((function() {
            return i;
        }));
    }, t.prototype.containsKey = function(t, e) {
        var n = sr(e.path), r = IDBKeyRange.bound([ n ], [ X(n) ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), i = 0;
        return Ti(t).Ot({
            index: br.documentTargetsIndex,
            $t: !0,
            range: r
        }, (function(t, e, n) {
            var r = t[0];
            t[1], 
            // Having a sentinel row for a document does not count as containing that document;
            // For the target cache, containing the document means the document is part of some
            // target.
            0 !== r && (i++, n.done());
        })).next((function() {
            return i > 0;
        }));
    }, 
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId - The target ID of the TargetData entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.lt = function(t, e) {
        return bi(t).get(e).next((function(t) {
            return t ? Zr(t) : null;
        }));
    }, t;
}();

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
 * Helper to get a typed SimpleDbStore for the queries object store.
 */
function bi(t) {
    return Br(t, wr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */ function Ii(t) {
    return Br(t, Ir.store);
}

/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */ function Ti(t) {
    return Br(t, br.store);
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
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err - An error returned by a LocalStore operation.
 * @returns A Promise that resolves after we recovered, or the original error.
 */ function Ei(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            if (t.code !== O.FAILED_PRECONDITION || t.message !== Dr) throw t;
            return q("LocalStore", "Unexpectedly lost primary lease"), [ 2 /*return*/ ];
        }));
    }));
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
 */ function Si(t, e) {
    var n = t[0], r = t[1], i = e[0], o = e[1], s = H(n, i);
    return 0 === s ? H(r, o) : s;
}

/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */ var _i = /** @class */ function() {
    function t(t) {
        this.ne = t, this.buffer = new sn(Si), this.se = 0;
    }
    return t.prototype.ie = function() {
        return ++this.se;
    }, t.prototype.re = function(t) {
        var e = [ t, this.ie() ];
        if (this.buffer.size < this.ne) this.buffer = this.buffer.add(e); else {
            var n = this.buffer.last();
            Si(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e));
        }
    }, Object.defineProperty(t.prototype, "maxValue", {
        get: function() {
            // Guaranteed to be non-empty. If we decide we are not collecting any
            // sequence numbers, nthSequenceNumber below short-circuits. If we have
            // decided that we are collecting n sequence numbers, it's because n is some
            // percentage of the existing sequence numbers. That means we should never
            // be in a situation where we are collecting sequence numbers but don't
            // actually have any.
            return this.buffer.last()[0];
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), Ni = /** @class */ function() {
    function t(t, e) {
        this.garbageCollector = t, this.asyncQueue = e, this.oe = !1, this.ce = null;
    }
    return t.prototype.start = function(t) {
        -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.ue(t);
    }, t.prototype.stop = function() {
        this.ce && (this.ce.cancel(), this.ce = null);
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return null !== this.ce;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.ue = function(t) {
        var e = this, i = this.oe ? 3e5 : 6e4;
        q("LruGarbageCollector", "Garbage collection scheduled in " + i + "ms"), this.ce = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection" /* LruGarbageCollection */ , i, (function() {
            return n(e, void 0, void 0, (function() {
                var e;
                return r(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        this.ce = null, this.oe = !0, n.label = 1;

                      case 1:
                        return n.trys.push([ 1, 3, , 7 ]), [ 4 /*yield*/ , t.collectGarbage(this.garbageCollector) ];

                      case 2:
                        return n.sent(), [ 3 /*break*/ , 7 ];

                      case 3:
                        return Pr(e = n.sent()) ? (q("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", e), 
                        [ 3 /*break*/ , 6 ]) : [ 3 /*break*/ , 4 ];

                      case 4:
                        return [ 4 /*yield*/ , Ei(e) ];

                      case 5:
                        n.sent(), n.label = 6;

                      case 6:
                        return [ 3 /*break*/ , 7 ];

                      case 7:
                        return [ 4 /*yield*/ , this.ue(t) ];

                      case 8:
                        return n.sent(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, t;
}(), Di = /** @class */ function() {
    function t(t, e) {
        this.ae = t, this.params = e;
    }
    return t.prototype.calculateTargetCount = function(t, e) {
        return this.ae.he(t).next((function(t) {
            return Math.floor(e / 100 * t);
        }));
    }, t.prototype.nthSequenceNumber = function(t, e) {
        var n = this;
        if (0 === e) return Cr.resolve(L.o);
        var r = new _i(e);
        return this.ae.forEachTarget(t, (function(t) {
            return r.re(t.sequenceNumber);
        })).next((function() {
            return n.ae.le(t, (function(t) {
                return r.re(t);
            }));
        })).next((function() {
            return r.maxValue;
        }));
    }, t.prototype.removeTargets = function(t, e, n) {
        return this.ae.removeTargets(t, e, n);
    }, t.prototype.removeOrphanedDocuments = function(t, e) {
        return this.ae.removeOrphanedDocuments(t, e);
    }, t.prototype.collect = function(t, e) {
        var n = this;
        return -1 === this.params.cacheSizeCollectionThreshold ? (q("LruGarbageCollector", "Garbage collection skipped; disabled"), 
        Cr.resolve(ci)) : this.getCacheSize(t).next((function(r) {
            return r < n.params.cacheSizeCollectionThreshold ? (q("LruGarbageCollector", "Garbage collection skipped; Cache size " + r + " is lower than threshold " + n.params.cacheSizeCollectionThreshold), 
            ci) : n.fe(t, e);
        }));
    }, t.prototype.getCacheSize = function(t) {
        return this.ae.getCacheSize(t);
    }, t.prototype.fe = function(t, e) {
        var n, r, i, o, s, u, a, c = this, h = Date.now();
        return this.calculateTargetCount(t, this.params.percentileToCollect).next((function(e) {
            // Cap at the configured max
            return e > c.params.maximumSequenceNumbersToCollect ? (q("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of " + c.params.maximumSequenceNumbersToCollect + " from " + e), 
            r = c.params.maximumSequenceNumbersToCollect) : r = e, o = Date.now(), c.nthSequenceNumber(t, r);
        })).next((function(r) {
            return n = r, s = Date.now(), c.removeTargets(t, n, e);
        })).next((function(e) {
            return i = e, u = Date.now(), c.removeOrphanedDocuments(t, n);
        })).next((function(t) {
            return a = Date.now(), M() <= T.DEBUG && q("LruGarbageCollector", "LRU Garbage Collection\n\tCounted targets in " + (o - h) + "ms\n\tDetermined least recently used " + r + " in " + (s - o) + "ms\n\tRemoved " + i + " targets in " + (u - s) + "ms\n\tRemoved " + t + " documents in " + (a - u) + "ms\nTotal Duration: " + (a - h) + "ms"), 
            Cr.resolve({
                didRun: !0,
                sequenceNumbersCollected: r,
                targetsRemoved: i,
                documentsRemoved: t
            });
        }));
    }, t;
}(), Ai = /** @class */ function() {
    function t(t, e) {
        this.db = t, this.garbageCollector = function(t, e) {
            return new Di(t, e);
        }(this, e);
    }
    return t.prototype.he = function(t) {
        var e = this.de(t);
        return this.db.getTargetCache().getTargetCount(t).next((function(t) {
            return e.next((function(e) {
                return t + e;
            }));
        }));
    }, t.prototype.de = function(t) {
        var e = 0;
        return this.le(t, (function(t) {
            e++;
        })).next((function() {
            return e;
        }));
    }, t.prototype.forEachTarget = function(t, e) {
        return this.db.getTargetCache().forEachTarget(t, e);
    }, t.prototype.le = function(t, e) {
        return this.we(t, (function(t, n) {
            return e(n);
        }));
    }, t.prototype.addReference = function(t, e, n) {
        return ki(t, n);
    }, t.prototype.removeReference = function(t, e, n) {
        return ki(t, n);
    }, t.prototype.removeTargets = function(t, e, n) {
        return this.db.getTargetCache().removeTargets(t, e, n);
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return ki(t, e);
    }, 
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    t.prototype._e = function(t, e) {
        return function(t, e) {
            var n = !1;
            return mi(t).Ft((function(r) {
                return pi(t, r, e).next((function(t) {
                    return t && (n = !0), Cr.resolve(!t);
                }));
            })).next((function() {
                return n;
            }));
        }(t, e);
    }, t.prototype.removeOrphanedDocuments = function(t, e) {
        var n = this, r = this.db.getRemoteDocumentCache().newChangeBuffer(), i = [], o = 0;
        return this.we(t, (function(s, u) {
            if (u <= e) {
                var a = n._e(t, s).next((function(e) {
                    if (!e) 
                    // Our size accounting requires us to read all documents before
                    // removing them.
                    return o++, r.getEntry(t, s).next((function() {
                        return r.removeEntry(s), Ti(t).delete([ 0, sr(s.path) ]);
                    }));
                }));
                i.push(a);
            }
        })).next((function() {
            return Cr.waitFor(i);
        })).next((function() {
            return r.apply(t);
        })).next((function() {
            return o;
        }));
    }, t.prototype.removeTarget = function(t, e) {
        var n = e.withSequenceNumber(t.currentSequenceNumber);
        return this.db.getTargetCache().updateTargetData(t, n);
    }, t.prototype.updateLimboDocument = function(t, e) {
        return ki(t, e);
    }, 
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    t.prototype.we = function(t, e) {
        var n, r = Ti(t), i = L.o;
        return r.Ot({
            index: br.documentTargetsIndex
        }, (function(t, r) {
            var o = t[0];
            t[1];
            var s = r.path, u = r.sequenceNumber;
            0 === o ? (
            // if nextToReport is valid, report it, this is a new key so the
            // last one must not be a member of any targets.
            i !== L.o && e(new gt(cr(n)), i), 
            // set nextToReport to be this sequence number. It's the next one we
            // might report, if we don't find any targets for this document.
            // Note that the sequence number must be defined when the targetId
            // is 0.
            i = u, n = s) : 
            // set nextToReport to be invalid, we know we don't need to report
            // this one since we found a target for it.
            i = L.o;
        })).next((function() {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            i !== L.o && e(new gt(cr(n)), i);
        }));
    }, t.prototype.getCacheSize = function(t) {
        return this.db.getRemoteDocumentCache().getSize(t);
    }, t;
}();

/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */ function ki(t, e) {
    return Ti(t).put(
    /**
 * @returns A value suitable for writing a sentinel row in the target-document
 * store.
 */
    function(t, e) {
        return new br(0, sr(t.path), e);
    }(e, t.currentSequenceNumber));
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
 * A map implementation that uses objects as keys. Objects must have an
 * associated equals function and must be immutable. Entries in the map are
 * stored together with the key being produced from the mapKeyFn. This map
 * automatically handles collisions of keys.
 */ var Ci = /** @class */ function() {
    function t(t, e) {
        this.mapKeyFn = t, this.equalsFn = e, 
        /**
             * The inner map for a key/value pair. Due to the possibility of collisions we
             * keep a list of entries that we do a linear search through to find an actual
             * match. Note that collisions should be rare, so we still expect near
             * constant time lookups in practice.
             */
        this.inner = {}
        /** Get a value for this key, or undefined if it does not exist. */;
    }
    return t.prototype.get = function(t) {
        var e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 !== n) for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r], s = o[0], u = o[1];
            if (this.equalsFn(s, t)) return u;
        }
    }, t.prototype.has = function(t) {
        return void 0 !== this.get(t);
    }, 
    /** Put this key and value in the map. */ t.prototype.set = function(t, e) {
        var n = this.mapKeyFn(t), r = this.inner[n];
        if (void 0 !== r) {
            for (var i = 0; i < r.length; i++) if (this.equalsFn(r[i][0], t)) return void (r[i] = [ t, e ]);
            r.push([ t, e ]);
        } else this.inner[n] = [ [ t, e ] ];
    }, 
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */
    t.prototype.delete = function(t) {
        var e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 === n) return !1;
        for (var r = 0; r < n.length; r++) if (this.equalsFn(n[r][0], t)) return 1 === n.length ? delete this.inner[e] : n.splice(r, 1), 
        !0;
        return !1;
    }, t.prototype.forEach = function(t) {
        tt(this.inner, (function(e, n) {
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r], s = o[0], u = o[1];
                t(s, u);
            }
        }));
    }, t.prototype.isEmpty = function() {
        return et(this.inner);
    }, t;
}(), xi = /** @class */ function() {
    function t() {
        // A mapping of document key to the new cache entry that should be written (or null if any
        // existing cache entry should be removed).
        this.changes = new Ci((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.changesApplied = !1;
    }
    return t.prototype.getReadTime = function(t) {
        var e = this.changes.get(t);
        return e ? e.readTime : J.min();
    }, 
    /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.addEntry = function(t, e) {
        this.assertNotApplied(), this.changes.set(t.key, {
            document: t,
            readTime: e
        });
    }, 
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.removeEntry = function(t, e) {
        void 0 === e && (e = null), this.assertNotApplied(), this.changes.set(t, {
            document: Pt.newInvalidDocument(t),
            readTime: e
        });
    }, 
    /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document or an invalid document if we have nothing
     * cached.
     */
    t.prototype.getEntry = function(t, e) {
        this.assertNotApplied();
        var n = this.changes.get(e);
        return void 0 !== n ? Cr.resolve(n.document) : this.getFromCache(t, e);
    }, 
    /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys - The keys of the entries to look up.
     * @returns A map of cached documents, indexed by key. If an entry cannot be
     *     found, the corresponding key will be mapped to an invalid document.
     */
    t.prototype.getEntries = function(t, e) {
        return this.getAllFromCache(t, e);
    }, 
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */
    t.prototype.apply = function(t) {
        return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(t);
    }, 
    /** Helper to assert this.changes is not null  */ t.prototype.assertNotApplied = function() {}, 
    t;
}(), Ri = /** @class */ function() {
    /**
     * @param serializer - The document serializer.
     * @param indexManager - The query indexes that need to be maintained.
     */
    function t(t, e) {
        this.R = t, this.qt = e
        /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */;
    }
    return t.prototype.addEntry = function(t, e, n) {
        return Pi(t).put(Fi(e), n);
    }, 
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t.prototype.removeEntry = function(t, e) {
        var n = Pi(t), r = Fi(e);
        return n.delete(r);
    }, 
    /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */
    t.prototype.updateMetadata = function(t, e) {
        var n = this;
        return this.getMetadata(t).next((function(r) {
            return r.byteSize += e, n.me(t, r);
        }));
    }, t.prototype.getEntry = function(t, e) {
        var n = this;
        return Pi(t).get(Fi(e)).next((function(t) {
            return n.ge(e, t);
        }));
    }, 
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document entry and its size.
     */
    t.prototype.ye = function(t, e) {
        var n = this;
        return Pi(t).get(Fi(e)).next((function(t) {
            return {
                document: n.ge(e, t),
                size: li(t)
            };
        }));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = cn();
        return this.pe(t, e, (function(t, e) {
            var i = n.ge(t, e);
            r = r.insert(t, i);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys - The set of keys entries to look up.
     * @returns A map of documents indexed by key and a map of sizes indexed by
     *     key (zero if the document does not exist).
     */
    t.prototype.Ee = function(t, e) {
        var n = this, r = cn(), i = new nn(gt.comparator);
        return this.pe(t, e, (function(t, e) {
            var o = n.ge(t, e);
            r = r.insert(t, o), i = i.insert(t, li(e));
        })).next((function() {
            return {
                documents: r,
                Te: i
            };
        }));
    }, t.prototype.pe = function(t, e, n) {
        if (e.isEmpty()) return Cr.resolve();
        var r = IDBKeyRange.bound(e.first().path.toArray(), e.last().path.toArray()), i = e.getIterator(), o = i.getNext();
        return Pi(t).Ot({
            range: r
        }, (function(t, e, r) {
            // Go through keys not found in cache.
            for (var s = gt.fromSegments(t); o && gt.comparator(o, s) < 0; ) n(o, null), o = i.getNext();
            o && o.isEqual(s) && (
            // Key found in cache.
            n(o, e), o = i.hasNext() ? i.getNext() : null), 
            // Skip to the next key (if there is one).
            o ? r.Ct(o.path.toArray()) : r.done();
        })).next((function() {
            // The rest of the keys are not in the cache. One case where `iterate`
            // above won't go through them is when the cache is empty.
            for (;o; ) n(o, null), o = i.hasNext() ? i.getNext() : null;
        }));
    }, t.prototype.getDocumentsMatchingQuery = function(t, e, n) {
        var r = this, i = cn(), o = e.path.length + 1, s = {};
        if (n.isEqual(J.min())) {
            // Documents are ordered by key, so we can use a prefix scan to narrow
            // down the documents we need to match the query against.
            var u = e.path.toArray();
            s.range = IDBKeyRange.lowerBound(u);
        } else {
            // Execute an index-free query and filter by read time. This is safe
            // since all document changes to queries that have a
            // lastLimboFreeSnapshotVersion (`sinceReadTime`) have a read time set.
            var a = e.path.toArray(), c = Hr(n);
            s.range = IDBKeyRange.lowerBound([ a, c ], 
            /* open= */ !0), s.index = mr.collectionReadTimeIndex;
        }
        return Pi(t).Ot(s, (function(t, n, s) {
            // The query is actually returning any path that starts with the query
            // path prefix which may include documents in subcollections. For
            // example, a query on 'rooms' will return rooms/abc/messages/xyx but we
            // shouldn't match it. Fix this by discarding rows with document keys
            // more than one segment longer than the query path.
            if (t.length === o) {
                var u = Qr(r.R, n);
                e.path.isPrefixOf(u.key.path) ? ve(e, u) && (i = i.insert(u.key, u)) : s.done();
            }
        })).next((function() {
            return i;
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        return new Li(this, !!t && t.trackRemovals);
    }, t.prototype.getSize = function(t) {
        return this.getMetadata(t).next((function(t) {
            return t.byteSize;
        }));
    }, t.prototype.getMetadata = function(t) {
        return Oi(t).get(gr.key).next((function(t) {
            return G(!!t), t;
        }));
    }, t.prototype.me = function(t, e) {
        return Oi(t).put(gr.key, e);
    }, 
    /**
     * Decodes `remoteDoc` and returns the document (or null, if the document
     * corresponds to the format used for sentinel deletes).
     */
    t.prototype.ge = function(t, e) {
        if (e) {
            var n = Qr(this.R, e);
            // Whether the document is a sentinel removal and should only be used in the
            // `getNewDocumentChanges()`
                        if (!n.isNoDocument() || !n.version.isEqual(J.min())) return n;
        }
        return Pt.newInvalidDocument(t);
    }, t;
}(), Li = /** @class */ function(e) {
    /**
     * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).Ie = t, r.trackRemovals = n, 
        // A map of document sizes prior to applying the changes in this buffer.
        r.Ae = new Ci((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), r;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [], r = 0, i = new sn((function(t, e) {
            return H(t.canonicalString(), e.canonicalString());
        }));
        return this.changes.forEach((function(o, s) {
            var u = e.Ae.get(o);
            if (s.document.isValidDocument()) {
                var a = Wr(e.Ie.R, s.document, e.getReadTime(o));
                i = i.add(o.path.popLast());
                var c = li(a);
                r += c - u, n.push(e.Ie.addEntry(t, o, a));
            } else if (r -= u, e.trackRemovals) {
                // In order to track removals, we store a "sentinel delete" in the
                // RemoteDocumentCache. This entry is represented by a NoDocument
                // with a version of 0 and ignored by `maybeDecodeDocument()` but
                // preserved in `getNewDocumentChanges()`.
                var h = Wr(e.Ie.R, Pt.newNoDocument(o, J.min()), e.getReadTime(o));
                n.push(e.Ie.addEntry(t, o, h));
            } else n.push(e.Ie.removeEntry(t, o));
        })), i.forEach((function(r) {
            n.push(e.Ie.qt.addToCollectionParentIndex(t, r));
        })), n.push(this.Ie.updateMetadata(t, r)), Cr.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute a delta later.
                return this.Ie.ye(t, e).next((function(t) {
            return n.Ae.set(e, t.size), t.document;
        }));
    }, n.prototype.getAllFromCache = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute
        // a delta later.
                return this.Ie.Ee(t, e).next((function(t) {
            var e = t.documents;
            // Note: `getAllFromCache` returns two maps instead of a single map from
            // keys to `DocumentSizeEntry`s. This is to allow returning the
            // `MutableDocumentMap` directly, without a conversion.
            return t.Te.forEach((function(t, e) {
                n.Ae.set(t, e);
            })), e;
        }));
    }, n;
}(xi);

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
 * An in-memory buffer of entries to be written to a RemoteDocumentCache.
 * It can be used to batch up a set of changes to be written to the cache, but
 * additionally supports reading entries back with the `getEntry()` method,
 * falling back to the underlying RemoteDocumentCache if no entry is
 * buffered.
 *
 * Entries added to the cache *must* be read first. This is to facilitate
 * calculating the size delta of the pending changes.
 *
 * PORTING NOTE: This class was implemented then removed from other platforms.
 * If byte-counting ends up being needed on the other platforms, consider
 * porting this class as part of that implementation work.
 */ function Oi(t) {
    return Br(t, gr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */ function Pi(t) {
    return Br(t, mr.store);
}

function Fi(t) {
    return t.path.toArray();
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
/** Performs database creation and schema upgrades. */ var Mi = /** @class */ function() {
    function t(t) {
        this.R = t;
    }
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */    return t.prototype.Rt = function(t, e, n, r) {
        var i = this;
        G(n < r && n >= 0 && r <= 11);
        var o = new xr("createOrUpgrade", e);
        n < 1 && r >= 1 && (function(t) {
            t.createObjectStore(fr.store);
        }(t), function(t) {
            t.createObjectStore(lr.store, {
                keyPath: lr.keyPath
            }), t.createObjectStore(dr.store, {
                keyPath: dr.keyPath,
                autoIncrement: !0
            }).createIndex(dr.userMutationsIndex, dr.userMutationsKeyPath, {
                unique: !0
            }), t.createObjectStore(pr.store);
        }(t), Vi(t), function(t) {
            t.createObjectStore(mr.store);
        }(t));
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
        var s = Cr.resolve();
        return n < 3 && r >= 3 && (
        // Brand new clients don't need to drop and recreate--only clients that
        // potentially have corrupt data.
        0 !== n && (function(t) {
            t.deleteObjectStore(br.store), t.deleteObjectStore(wr.store), t.deleteObjectStore(Ir.store);
        }(t), Vi(t)), s = s.next((function() {
            /**
     * Creates the target global singleton row.
     *
     * @param txn - The version upgrade transaction for indexeddb
     */
            return function(t) {
                var e = t.store(Ir.store), n = new Ir(
                /*highestTargetId=*/ 0, 
                /*lastListenSequenceNumber=*/ 0, J.min().toTimestamp(), 
                /*targetCount=*/ 0);
                return e.put(Ir.key, n);
            }(o);
        }))), n < 4 && r >= 4 && (0 !== n && (
        // Schema version 3 uses auto-generated keys to generate globally unique
        // mutation batch IDs (this was previously ensured internally by the
        // client). To migrate to the new schema, we have to read all mutations
        // and write them back out. We preserve the existing batch IDs to guarantee
        // consistency with other object stores. Any further mutation batch IDs will
        // be auto-generated.
        s = s.next((function() {
            return function(t, e) {
                return e.store(dr.store).Nt().next((function(n) {
                    t.deleteObjectStore(dr.store), t.createObjectStore(dr.store, {
                        keyPath: dr.keyPath,
                        autoIncrement: !0
                    }).createIndex(dr.userMutationsIndex, dr.userMutationsKeyPath, {
                        unique: !0
                    });
                    var r = e.store(dr.store), i = n.map((function(t) {
                        return r.put(t);
                    }));
                    return Cr.waitFor(i);
                }));
            }(t, o);
        }))), s = s.next((function() {
            !function(t) {
                t.createObjectStore(Er.store, {
                    keyPath: Er.keyPath
                });
            }(t);
        }))), n < 5 && r >= 5 && (s = s.next((function() {
            return i.Re(o);
        }))), n < 6 && r >= 6 && (s = s.next((function() {
            return function(t) {
                t.createObjectStore(gr.store);
            }(t), i.Pe(o);
        }))), n < 7 && r >= 7 && (s = s.next((function() {
            return i.be(o);
        }))), n < 8 && r >= 8 && (s = s.next((function() {
            return i.ve(t, o);
        }))), n < 9 && r >= 9 && (s = s.next((function() {
            // Multi-Tab used to manage its own changelog, but this has been moved
            // to the DbRemoteDocument object store itself. Since the previous change
            // log only contained transient data, we can drop its object store.
            !function(t) {
                t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
            }(t), function(t) {
                var e = t.objectStore(mr.store);
                e.createIndex(mr.readTimeIndex, mr.readTimeIndexPath, {
                    unique: !1
                }), e.createIndex(mr.collectionReadTimeIndex, mr.collectionReadTimeIndexPath, {
                    unique: !1
                });
            }(e);
        }))), n < 10 && r >= 10 && (s = s.next((function() {
            return i.Ve(o);
        }))), n < 11 && r >= 11 && (s = s.next((function() {
            !function(t) {
                t.createObjectStore(Sr.store, {
                    keyPath: Sr.keyPath
                });
            }(t), function(t) {
                t.createObjectStore(_r.store, {
                    keyPath: _r.keyPath
                });
            }(t);
        }))), s;
    }, t.prototype.Pe = function(t) {
        var e = 0;
        return t.store(mr.store).Ot((function(t, n) {
            e += li(n);
        })).next((function() {
            var n = new gr(e);
            return t.store(gr.store).put(gr.key, n);
        }));
    }, t.prototype.Re = function(t) {
        var e = this, n = t.store(lr.store), r = t.store(dr.store);
        return n.Nt().next((function(n) {
            return Cr.forEach(n, (function(n) {
                var i = IDBKeyRange.bound([ n.userId, -1 ], [ n.userId, n.lastAcknowledgedBatchId ]);
                return r.Nt(dr.userMutationsIndex, i).next((function(r) {
                    return Cr.forEach(r, (function(r) {
                        G(r.userId === n.userId);
                        var i = Jr(e.R, r);
                        return fi(t, n.userId, i).next((function() {}));
                    }));
                }));
            }));
        }));
    }, 
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    t.prototype.be = function(t) {
        var e = t.store(br.store), n = t.store(mr.store);
        return t.store(Ir.store).get(Ir.key).next((function(t) {
            var r = [];
            return n.Ot((function(n, i) {
                var o = new rt(n), s = function(t) {
                    return [ 0, sr(t) ];
                }(o);
                r.push(e.get(s).next((function(n) {
                    return n ? Cr.resolve() : function(n) {
                        return e.put(new br(0, sr(n), t.highestListenSequenceNumber));
                    }(o);
                })));
            })).next((function() {
                return Cr.waitFor(r);
            }));
        }));
    }, t.prototype.ve = function(t, e) {
        // Create the index.
        t.createObjectStore(Tr.store, {
            keyPath: Tr.keyPath
        });
        var n = e.store(Tr.store), r = new si, i = function(t) {
            if (r.add(t)) {
                var e = t.lastSegment(), i = t.popLast();
                return n.put({
                    collectionId: e,
                    parent: sr(i)
                });
            }
        };
        // Helper to add an index entry iff we haven't already written it.
        // Index existing remote documents.
                return e.store(mr.store).Ot({
            $t: !0
        }, (function(t, e) {
            var n = new rt(t);
            return i(n.popLast());
        })).next((function() {
            return e.store(pr.store).Ot({
                $t: !0
            }, (function(t, e) {
                t[0];
                var n = t[1];
                t[2];
                var r = cr(n);
                return i(r.popLast());
            }));
        }));
    }, t.prototype.Ve = function(t) {
        var e = this, n = t.store(wr.store);
        return n.Ot((function(t, r) {
            var i = Zr(r), o = ti(e.R, i);
            return n.put(o);
        }));
    }, t;
}();

function Vi(t) {
    t.createObjectStore(br.store, {
        keyPath: br.keyPath
    }).createIndex(br.documentTargetsIndex, br.documentTargetsKeyPath, {
        unique: !0
    }), 
    // NOTE: This is unique only because the TargetId is the suffix.
    t.createObjectStore(wr.store, {
        keyPath: wr.keyPath
    }).createIndex(wr.queryTargetsIndexName, wr.queryTargetsKeyPath, {
        unique: !0
    }), t.createObjectStore(Ir.store);
}

var qi = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.", Ui = /** @class */ function() {
    function t(
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    e, n, r, i, o, s, u, a, c, 
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    h) {
        if (this.allowTabSynchronization = e, this.persistenceKey = n, this.clientId = r, 
        this.Se = o, this.window = s, this.document = u, this.De = c, this.Ce = h, this.Ne = null, 
        this.xe = !1, this.isPrimary = !1, this.networkEnabled = !0, 
        /** Our window.unload handler, if registered. */
        this.ke = null, this.inForeground = !1, 
        /** Our 'visibilitychange' listener if registered. */
        this.$e = null, 
        /** The client metadata refresh task. */
        this.Oe = null, 
        /** The last time we garbage collected the client metadata object store. */
        this.Fe = Number.NEGATIVE_INFINITY, 
        /** A listener to notify on primary state changes. */
        this.Me = function(t) {
            return Promise.resolve();
        }, !t.gt()) throw new P(O.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        this.referenceDelegate = new Ai(this, i), this.Le = n + "main", this.R = new zr(a), 
        this.Be = new Rr(this.Le, 11, new Mi(this.R)), this.Ue = new wi(this.referenceDelegate, this.R), 
        this.qt = new ui, this.qe = function(t, e) {
            return new Ri(t, e);
        }(this.R, this.qt), this.Ke = new ni, this.window && this.window.localStorage ? this.je = this.window.localStorage : (this.je = null, 
        !1 === h && U("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
    }
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @returns Whether persistence was enabled.
     */    return t.prototype.start = function() {
        var t = this;
        // NOTE: This is expected to fail sometimes (in the case of another tab
        // already having the persistence lock), so it's the first thing we should
        // do.
                return this.Qe().then((function() {
            if (!t.isPrimary && !t.allowTabSynchronization) 
            // Fail `start()` if `synchronizeTabs` is disabled and we cannot
            // obtain the primary lease.
            throw new P(O.FAILED_PRECONDITION, qi);
            return t.We(), t.Ge(), t.ze(), t.runTransaction("getHighestListenSequenceNumber", "readonly", (function(e) {
                return t.Ue.getHighestSequenceNumber(e);
            }));
        })).then((function(e) {
            t.Ne = new L(e, t.De);
        })).then((function() {
            t.xe = !0;
        })).catch((function(e) {
            return t.Be && t.Be.close(), Promise.reject(e);
        }));
    }, 
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.He = function(t) {
        var e = this;
        return this.Me = function(i) {
            return n(e, void 0, void 0, (function() {
                return r(this, (function(e) {
                    return this.started ? [ 2 /*return*/ , t(i) ] : [ 2 /*return*/ ];
                }));
            }));
        }, t(this.isPrimary);
    }, 
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.setDatabaseDeletedListener = function(t) {
        var e = this;
        this.Be.bt((function(i) {
            return n(e, void 0, void 0, (function() {
                return r(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return null === i.newVersion ? [ 4 /*yield*/ , t() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        e.sent(), e.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, 
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.setNetworkEnabled = function(t) {
        var e = this;
        this.networkEnabled !== t && (this.networkEnabled = t, 
        // Schedule a primary lease refresh for immediate execution. The eventual
        // lease update will be propagated via `primaryStateListener`.
        this.Se.enqueueAndForget((function() {
            return n(e, void 0, void 0, (function() {
                return r(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return this.started ? [ 4 /*yield*/ , this.Qe() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        t.sent(), t.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })));
    }, 
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    t.prototype.Qe = function() {
        var t = this;
        return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (function(e) {
            return ji(e).put(new Er(t.clientId, Date.now(), t.networkEnabled, t.inForeground)).next((function() {
                if (t.isPrimary) return t.Je(e).next((function(e) {
                    e || (t.isPrimary = !1, t.Se.enqueueRetryable((function() {
                        return t.Me(!1);
                    })));
                }));
            })).next((function() {
                return t.Ye(e);
            })).next((function(n) {
                return t.isPrimary && !n ? t.Xe(e).next((function() {
                    return !1;
                })) : !!n && t.Ze(e).next((function() {
                    return !0;
                }));
            }));
        })).catch((function(e) {
            if (Pr(e)) 
            // Proceed with the existing state. Any subsequent access to
            // IndexedDB will verify the lease.
            return q("IndexedDbPersistence", "Failed to extend owner lease: ", e), t.isPrimary;
            if (!t.allowTabSynchronization) throw e;
            return q("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), 
            /* isPrimary= */ !1;
        })).then((function(e) {
            t.isPrimary !== e && t.Se.enqueueRetryable((function() {
                return t.Me(e);
            })), t.isPrimary = e;
        }));
    }, t.prototype.Je = function(t) {
        var e = this;
        return Bi(t).get(fr.key).next((function(t) {
            return Cr.resolve(e.tn(t));
        }));
    }, t.prototype.en = function(t) {
        return ji(t).delete(this.clientId);
    }, 
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    t.prototype.nn = function() {
        return n(this, void 0, void 0, (function() {
            var t, e, n, i, o = this;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return !this.isPrimary || this.sn(this.Fe, 18e5) ? [ 3 /*break*/ , 2 ] : (this.Fe = Date.now(), 
                    [ 4 /*yield*/ , this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (function(t) {
                        var e = Br(t, Er.store);
                        return e.Nt().next((function(t) {
                            var n = o.rn(t, 18e5), r = t.filter((function(t) {
                                return -1 === n.indexOf(t);
                            }));
                            // Delete metadata for clients that are no longer considered active.
                                                        return Cr.forEach(r, (function(t) {
                                return e.delete(t.clientId);
                            })).next((function() {
                                return r;
                            }));
                        }));
                    })).catch((function() {
                        return [];
                    })) ]);

                  case 1:
                    // Delete potential leftover entries that may continue to mark the
                    // inactive clients as zombied in LocalStorage.
                    // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
                    // the client atomically, but we can't. So we opt to delete the IndexedDb
                    // entries first to avoid potentially reviving a zombied client.
                    if (t = r.sent(), this.je) for (e = 0, n = t; e < n.length; e++) i = n[e], this.je.removeItem(this.on(i.clientId));
                    r.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    t.prototype.ze = function() {
        var t = this;
        this.Oe = this.Se.enqueueAfterDelay("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, (function() {
            return t.Qe().then((function() {
                return t.nn();
            })).then((function() {
                return t.ze();
            }));
        }));
    }, 
    /** Checks whether `client` is the local client. */ t.prototype.tn = function(t) {
        return !!t && t.ownerId === this.clientId;
    }, 
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    t.prototype.Ye = function(t) {
        var e = this;
        return this.Ce ? Cr.resolve(!0) : Bi(t).get(fr.key).next((function(n) {
            // A client is eligible for the primary lease if:
            // - its network is enabled and the client's tab is in the foreground.
            // - its network is enabled and no other client's tab is in the
            //   foreground.
            // - every clients network is disabled and the client's tab is in the
            //   foreground.
            // - every clients network is disabled and no other client's tab is in
            //   the foreground.
            // - the `forceOwningTab` setting was passed in.
            if (null !== n && e.sn(n.leaseTimestampMs, 5e3) && !e.cn(n.ownerId)) {
                if (e.tn(n) && e.networkEnabled) return !0;
                if (!e.tn(n)) {
                    if (!n.allowTabSynchronization) 
                    // Fail the `canActAsPrimary` check if the current leaseholder has
                    // not opted into multi-tab synchronization. If this happens at
                    // client startup, we reject the Promise returned by
                    // `enablePersistence()` and the user can continue to use Firestore
                    // with in-memory persistence.
                    // If this fails during a lease refresh, we will instead block the
                    // AsyncQueue from executing further operations. Note that this is
                    // acceptable since mixing & matching different `synchronizeTabs`
                    // settings is not supported.
                    // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                    // no longer be turned off.
                    throw new P(O.FAILED_PRECONDITION, qi);
                    return !1;
                }
            }
            return !(!e.networkEnabled || !e.inForeground) || ji(t).Nt().next((function(t) {
                return void 0 === e.rn(t, 5e3).find((function(t) {
                    if (e.clientId !== t.clientId) {
                        var n = !e.networkEnabled && t.networkEnabled, r = !e.inForeground && t.inForeground, i = e.networkEnabled === t.networkEnabled;
                        if (n || r && i) return !0;
                    }
                    return !1;
                }));
            }));
        })).next((function(t) {
            return e.isPrimary !== t && q("IndexedDbPersistence", "Client " + (t ? "is" : "is not") + " eligible for a primary lease."), 
            t;
        }));
    }, t.prototype.shutdown = function() {
        return n(this, void 0, void 0, (function() {
            var t = this;
            return r(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
                    // has obtained the primary lease.
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    return this.xe = !1, this.un(), this.Oe && (this.Oe.cancel(), this.Oe = null), this.an(), 
                    this.hn(), [ 4 /*yield*/ , this.Be.runTransaction("shutdown", "readwrite", [ fr.store, Er.store ], (function(e) {
                        var n = new Ur(e, L.o);
                        return t.Xe(n).next((function() {
                            return t.en(n);
                        }));
                    })) ];

                  case 1:
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
                    // has obtained the primary lease.
                    return e.sent(), this.Be.close(), 
                    // Remove the entry marking the client as zombied from LocalStorage since
                    // we successfully deleted its metadata from IndexedDb.
                    this.ln(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    t.prototype.rn = function(t, e) {
        var n = this;
        return t.filter((function(t) {
            return n.sn(t.updateTimeMs, e) && !n.cn(t.clientId);
        }));
    }, 
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.fn = function() {
        var t = this;
        return this.runTransaction("getActiveClients", "readonly", (function(e) {
            return ji(e).Nt().next((function(e) {
                return t.rn(e, 18e5).map((function(t) {
                    return t.clientId;
                }));
            }));
        }));
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return this.xe;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.getMutationQueue = function(t) {
        return di.jt(t, this.R, this.qt, this.referenceDelegate);
    }, t.prototype.getTargetCache = function() {
        return this.Ue;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.qe;
    }, t.prototype.getIndexManager = function() {
        return this.qt;
    }, t.prototype.getBundleCache = function() {
        return this.Ke;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        q("IndexedDbPersistence", "Starting transaction:", t);
        var i, o = "readonly" === e ? "readonly" : "readwrite";
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
        return this.Be.runTransaction(t, o, Nr, (function(o) {
            return i = new Ur(o, r.Ne ? r.Ne.next() : L.o), "readwrite-primary" === e ? r.Je(i).next((function(t) {
                return !!t || r.Ye(i);
            })).next((function(e) {
                if (!e) throw U("Failed to obtain primary lease for action '" + t + "'."), r.isPrimary = !1, 
                r.Se.enqueueRetryable((function() {
                    return r.Me(!1);
                })), new P(O.FAILED_PRECONDITION, Dr);
                return n(i);
            })).next((function(t) {
                return r.Ze(i).next((function() {
                    return t;
                }));
            })) : r.dn(i).next((function() {
                return n(i);
            }));
        })).then((function(t) {
            return i.raiseOnCommittedEvent(), t;
        }));
    }, 
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    t.prototype.dn = function(t) {
        var e = this;
        return Bi(t).get(fr.key).next((function(t) {
            if (null !== t && e.sn(t.leaseTimestampMs, 5e3) && !e.cn(t.ownerId) && !e.tn(t) && !(e.Ce || e.allowTabSynchronization && t.allowTabSynchronization)) throw new P(O.FAILED_PRECONDITION, qi);
        }));
    }, 
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    t.prototype.Ze = function(t) {
        var e = new fr(this.clientId, this.allowTabSynchronization, Date.now());
        return Bi(t).put(fr.key, e);
    }, t.gt = function() {
        return Rr.gt();
    }, 
    /** Checks the primary lease and removes it if we are the current primary. */ t.prototype.Xe = function(t) {
        var e = this, n = Bi(t);
        return n.get(fr.key).next((function(t) {
            return e.tn(t) ? (q("IndexedDbPersistence", "Releasing primary lease."), n.delete(fr.key)) : Cr.resolve();
        }));
    }, 
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */ t.prototype.sn = function(t, e) {
        var n = Date.now();
        return !(t < n - e || t > n && (U("Detected an update time that is in the future: " + t + " > " + n), 
        1));
    }, t.prototype.We = function() {
        var t = this;
        null !== this.document && "function" == typeof this.document.addEventListener && (this.$e = function() {
            t.Se.enqueueAndForget((function() {
                return t.inForeground = "visible" === t.document.visibilityState, t.Qe();
            }));
        }, this.document.addEventListener("visibilitychange", this.$e), this.inForeground = "visible" === this.document.visibilityState);
    }, t.prototype.an = function() {
        this.$e && (this.document.removeEventListener("visibilitychange", this.$e), this.$e = null);
    }, 
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */
    t.prototype.Ge = function() {
        var t, e = this;
        "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.ke = function() {
            // Note: In theory, this should be scheduled on the AsyncQueue since it
            // accesses internal state. We execute this code directly during shutdown
            // to make sure it gets a chance to run.
            e.un(), l() && navigator.appVersion.match("Version/14") && 
            // On Safari 14, we do not run any cleanup actions as it might trigger
            // a bug that prevents Safari from re-opening IndexedDB during the
            // next page load.
            // See https://bugs.webkit.org/show_bug.cgi?id=226547
            e.Se.enterRestrictedMode(/* purgeExistingTasks= */ !0), e.Se.enqueueAndForget((function() {
                return e.shutdown();
            }));
        }, this.window.addEventListener("pagehide", this.ke));
    }, t.prototype.hn = function() {
        this.ke && (this.window.removeEventListener("pagehide", this.ke), this.ke = null);
    }, 
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    t.prototype.cn = function(t) {
        var e;
        try {
            var n = null !== (null === (e = this.je) || void 0 === e ? void 0 : e.getItem(this.on(t)));
            return q("IndexedDbPersistence", "Client '" + t + "' " + (n ? "is" : "is not") + " zombied in LocalStorage"), 
            n;
        } catch (t) {
            // Gracefully handle if LocalStorage isn't working.
            return U("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
        }
    }, 
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    t.prototype.un = function() {
        if (this.je) try {
            this.je.setItem(this.on(this.clientId), String(Date.now()));
        } catch (t) {
            // Gracefully handle if LocalStorage isn't available / working.
            U("Failed to set zombie client id.", t);
        }
    }, 
    /** Removes the zombied client entry if it exists. */ t.prototype.ln = function() {
        if (this.je) try {
            this.je.removeItem(this.on(this.clientId));
        } catch (t) {
            // Ignore
        }
    }, t.prototype.on = function(t) {
        return "firestore_zombie_" + this.persistenceKey + "_" + t;
    }, t;
}();

/**
 * Oldest acceptable age in milliseconds for client metadata before the client
 * is considered inactive and its associated data is garbage collected.
 */
/**
 * An IndexedDB-backed instance of Persistence. Data is stored persistently
 * across sessions.
 *
 * On Web only, the Firestore SDKs support shared access to its persistence
 * layer. This allows multiple browser tabs to read and write to IndexedDb and
 * to synchronize state even without network connectivity. Shared access is
 * currently optional and not enabled unless all clients invoke
 * `enablePersistence()` with `{synchronizeTabs:true}`.
 *
 * In multi-tab mode, if multiple clients are active at the same time, the SDK
 * will designate one client as the “primary client”. An effort is made to pick
 * a visible, network-connected and active client, and this client is
 * responsible for letting other clients know about its presence. The primary
 * client writes a unique client-generated identifier (the client ID) to
 * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
 * update this entry, another client can acquire the lease and take over as
 * primary.
 *
 * Some persistence operations in the SDK are designated as primary-client only
 * operations. This includes the acknowledgment of mutations and all updates of
 * remote documents. The effects of these operations are written to persistence
 * and then broadcast to other tabs via LocalStorage (see
 * `WebStorageSharedClientState`), which then refresh their state from
 * persistence.
 *
 * Similarly, the primary client listens to notifications sent by secondary
 * clients to discover persistence changes written by secondary clients, such as
 * the addition of new mutations and query targets.
 *
 * If multi-tab is not enabled and another tab already obtained the primary
 * lease, IndexedDbPersistence enters a failed state and all subsequent
 * operations will automatically fail.
 *
 * Additionally, there is an optimization so that when a tab is closed, the
 * primary lease is released immediately (this is especially important to make
 * sure that a refreshed tab is able to immediately re-acquire the primary
 * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
 * since it is an asynchronous API. So in addition to attempting to give up the
 * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
 * LocalStorage which acts as an indicator that another tab should go ahead and
 * take the primary lease immediately regardless of the current lease timestamp.
 *
 * TODO(b/114226234): Remove `synchronizeTabs` section when multi-tab is no
 * longer optional.
 */
/**
 * Helper to get a typed SimpleDbStore for the primary client object store.
 */
function Bi(t) {
    return Br(t, fr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */ function ji(t) {
    return Br(t, Er.store);
}

/**
 * Generates a string used as a prefix when storing data in IndexedDB and
 * LocalStorage.
 */ function Ki(t, e) {
    // Use two different prefix formats:
    //   * firestore / persistenceKey / projectID . databaseID / ...
    //   * firestore / persistenceKey / projectID / ...
    // projectIDs are DNS-compatible names and cannot contain dots
    // so there's no danger of collisions.
    var n = t.projectId;
    return t.isDefaultDatabase || (n += "." + t.database), "firestore/" + e + "/" + n + "/"
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
 */;
}

var Gi = function(t, e) {
    this.progress = t, this.wn = e;
}, zi = /** @class */ function() {
    function t(t, e, n) {
        this.qe = t, this._n = e, this.qt = n
        /**
     * Get the local view of the document identified by `key`.
     *
     * @returns Local view of the document or null if we don't have any cached
     * state for it.
     */;
    }
    return t.prototype.mn = function(t, e) {
        var n = this;
        return this._n.getAllMutationBatchesAffectingDocumentKey(t, e).next((function(r) {
            return n.gn(t, e, r);
        }));
    }, 
    /** Internal version of `getDocument` that allows reusing batches. */ t.prototype.gn = function(t, e, n) {
        return this.qe.getEntry(t, e).next((function(t) {
            for (var e = 0, r = n; e < r.length; e++) {
                r[e].applyToLocalView(t);
            }
            return t;
        }));
    }, 
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    t.prototype.yn = function(t, e) {
        t.forEach((function(t, n) {
            for (var r = 0, i = e; r < i.length; r++) {
                i[r].applyToLocalView(n);
            }
        }));
    }, 
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */
    t.prototype.pn = function(t, e) {
        var n = this;
        return this.qe.getEntries(t, e).next((function(e) {
            return n.En(t, e).next((function() {
                return e;
            }));
        }));
    }, 
    /**
     * Applies the local view the given `baseDocs` without retrieving documents
     * from the local store.
     */
    t.prototype.En = function(t, e) {
        var n = this;
        return this._n.getAllMutationBatchesAffectingDocumentKeys(t, e).next((function(t) {
            return n.yn(e, t);
        }));
    }, 
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction - The persistence transaction.
     * @param query - The query to match documents against.
     * @param sinceReadTime - If not set to SnapshotVersion.min(), return only
     *     documents that have been read since this snapshot version (exclusive).
     */
    t.prototype.getDocumentsMatchingQuery = function(t, e, n) {
        /**
 * Returns whether the query matches a single document by path (rather than a
 * collection).
 */
        return function(t) {
            return gt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
        }(e) ? this.Tn(t, e.path) : ce(e) ? this.In(t, e, n) : this.An(t, e, n);
    }, t.prototype.Tn = function(t, e) {
        // Just do a simple document lookup.
        return this.mn(t, new gt(e)).next((function(t) {
            var e = fn();
            return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
        }));
    }, t.prototype.In = function(t, e, n) {
        var r = this, i = e.collectionGroup, o = fn();
        return this.qt.getCollectionParents(t, i).next((function(s) {
            return Cr.forEach(s, (function(s) {
                var u = function(t, e) {
                    return new ne(e, 
                    /*collectionGroup=*/ null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
                }(e, s.child(i));
                return r.An(t, u, n).next((function(t) {
                    t.forEach((function(t, e) {
                        o = o.insert(t, e);
                    }));
                }));
            })).next((function() {
                return o;
            }));
        }));
    }, t.prototype.An = function(t, e, n) {
        var r, i, o = this;
        // Query the remote documents and overlay mutations.
                return this.qe.getDocumentsMatchingQuery(t, e, n).next((function(n) {
            return r = n, o._n.getAllMutationBatchesAffectingQuery(t, e);
        })).next((function(e) {
            return i = e, o.Rn(t, i, r).next((function(t) {
                r = t;
                for (var e = 0, n = i; e < n.length; e++) for (var o = n[e], s = 0, u = o.mutations; s < u.length; s++) {
                    var a = u[s], c = a.key, h = r.get(c);
                    null == h && (
                    // Create invalid document to apply mutations on top of
                    h = Pt.newInvalidDocument(c), r = r.insert(c, h)), Ue(a, h, o.localWriteTime), h.isFoundDocument() || (r = r.remove(c));
                }
            }));
        })).next((function() {
            // Finally, filter out any documents that don't actually match
            // the query.
            return r.forEach((function(t, n) {
                ve(e, n) || (r = r.remove(t));
            })), r;
        }));
    }, t.prototype.Rn = function(t, e, n) {
        for (var r = yn(), i = 0, o = e; i < o.length; i++) for (var s = 0, u = o[i].mutations; s < u.length; s++) {
            var a = u[s];
            a instanceof ze && null === n.get(a.key) && (r = r.add(a.key));
        }
        var c = n;
        return this.qe.getEntries(t, r).next((function(t) {
            return t.forEach((function(t, e) {
                e.isFoundDocument() && (c = c.insert(t, e));
            })), c;
        }));
    }, t;
}(), Qi = /** @class */ function() {
    function t(t, e, n, r) {
        this.targetId = t, this.fromCache = e, this.Pn = n, this.bn = r;
    }
    return t.vn = function(e, n) {
        for (var r = yn(), i = yn(), o = 0, s = n.docChanges; o < s.length; o++) {
            var u = s[o];
            switch (u.type) {
              case 0 /* Added */ :
                r = r.add(u.doc.key);
                break;

              case 1 /* Removed */ :
                i = i.add(u.doc.key);
                // do nothing
                        }
        }
        return new t(e, n.fromCache, r, i);
    }, t;
}(), Wi = /** @class */ function() {
    function t() {}
    /** Sets the document view to query against. */    return t.prototype.Vn = function(t) {
        this.Sn = t;
    }, 
    /** Returns all local documents matching the specified query. */ t.prototype.getDocumentsMatchingQuery = function(t, e, n, r) {
        var i = this;
        // Queries that match all documents don't benefit from using
        // key-based lookups. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
                return function(t) {
            return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.explicitOrderBy.length || 1 === t.explicitOrderBy.length && t.explicitOrderBy[0].field.isKeyField());
        }(e) || n.isEqual(J.min()) ? this.Dn(t, e) : this.Sn.pn(t, r).next((function(o) {
            var s = i.Cn(e, o);
            return (oe(e) || se(e)) && i.Nn(e.limitType, s, r, n) ? i.Dn(t, e) : (M() <= T.DEBUG && q("QueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), ye(e)), 
            i.Sn.getDocumentsMatchingQuery(t, e, n).next((function(t) {
                // We merge `previousResults` into `updateResults`, since
                // `updateResults` is already a DocumentMap. If a document is
                // contained in both lists, then its contents are the same.
                return s.forEach((function(e) {
                    t = t.insert(e.key, e);
                })), t;
            })));
        }));
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }, 
    /** Applies the query filter and sorting to the provided documents.  */ t.prototype.Cn = function(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        var n = new sn(me(t));
        return e.forEach((function(e, r) {
            ve(t, r) && (n = n.add(r));
        })), n;
    }, 
    /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param sortedPreviousResults - The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys - The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion - The version of the snapshot when the
     * query was last synchronized.
     */
    t.prototype.Nn = function(t, e, n, r) {
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        if (n.size !== e.size) return !0;
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
                var i = "F" /* First */ === t ? e.last() : e.first();
        return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0);
    }, t.prototype.Dn = function(t, e) {
        return M() <= T.DEBUG && q("QueryEngine", "Using full collection scan to execute query:", ye(e)), 
        this.Sn.getDocumentsMatchingQuery(t, e, J.min());
    }, t;
}(), Hi = /** @class */ function() {
    function t(
    /** Manages our in-memory or durable persistence. */
    t, e, n, r) {
        this.persistence = t, this.xn = e, this.R = r, 
        /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
        this.kn = new nn(H), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.$n = new Ci((function(t) {
            return Vt(t);
        }), qt), 
        /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
        this.On = J.min(), this._n = t.getMutationQueue(n), this.Fn = t.getRemoteDocumentCache(), 
        this.Ue = t.getTargetCache(), this.Mn = new zi(this.Fn, this._n, this.persistence.getIndexManager()), 
        this.Ke = t.getBundleCache(), this.xn.Vn(this.Mn);
    }
    return t.prototype.collectGarbage = function(t) {
        var e = this;
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (function(n) {
            return t.collect(n, e.kn);
        }));
    }, t;
}();

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
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */ function Yi(
/** Manages our in-memory or durable persistence. */
t, e, n, r) {
    return new Hi(t, e, n, r);
}

/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
// PORTING NOTE: Android and iOS only return the documents affected by the
// change.
function Xi(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = z(t), i = n._n, o = n.Mn, [ 4 /*yield*/ , n.persistence.runTransaction("Handle user change", "readonly", (function(t) {
                    // Swap out the mutation queue, grabbing the pending mutation batches
                    // before and after.
                    var r;
                    return n._n.getAllMutationBatches(t).next((function(s) {
                        return r = s, i = n.persistence.getMutationQueue(e), 
                        // Recreate our LocalDocumentsView using the new
                        // MutationQueue.
                        o = new zi(n.Fn, i, n.persistence.getIndexManager()), i.getAllMutationBatches(t);
                    })).next((function(e) {
                        for (var n = [], i = [], s = yn(), u = 0, a = r
                        // Union the old/new changed keys.
                        ; u < a.length; u++) {
                            var c = a[u];
                            n.push(c.batchId);
                            for (var h = 0, f = c.mutations; h < f.length; h++) {
                                var l = f[h];
                                s = s.add(l.key);
                            }
                        }
                        for (var d = 0, p = e; d < p.length; d++) {
                            var y = p[d];
                            i.push(y.batchId);
                            for (var v = 0, m = y.mutations; v < m.length; v++) {
                                var g = m[v];
                                s = s.add(g.key);
                            }
                        }
                        // Return the set of all (potentially) changed documents and the list
                        // of mutation batch IDs that were affected by change.
                                                return o.pn(t, s).next((function(t) {
                            return {
                                Ln: t,
                                removedBatchIds: n,
                                addedBatchIds: i
                            };
                        }));
                    }));
                })) ];

              case 1:
                return s = r.sent(), [ 2 /*return*/ , (n._n = i, n.Mn = o, n.xn.Vn(n.Mn), s) ];
            }
        }));
    }));
}

/* Accepts locally generated Mutations and commit them to storage. */
/**
 * Acknowledges the given batch.
 *
 * On the happy path when a batch is acknowledged, the local store will
 *
 *  + remove the batch from the mutation queue;
 *  + apply the changes to the remote document cache;
 *  + recalculate the latency compensated view implied by those changes (there
 *    may be mutations in the queue that affect the documents but haven't been
 *    acknowledged yet); and
 *  + give the changed documents back the sync engine
 *
 * @returns The resulting (modified) documents.
 */ function $i(t, e) {
    var n = z(t);
    return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (function(t) {
        var r = e.batch.keys(), i = n.Fn.newChangeBuffer({
            trackRemovals: !0
        });
        return function(t, e, n, r) {
            var i = n.batch, o = i.keys(), s = Cr.resolve();
            return o.forEach((function(t) {
                s = s.next((function() {
                    return r.getEntry(e, t);
                })).next((function(e) {
                    var o = n.docVersions.get(t);
                    G(null !== o), e.version.compareTo(o) < 0 && (i.applyToRemoteDocument(e, n), e.isValidDocument() && 
                    // We use the commitVersion as the readTime rather than the
                    // document's updateTime since the updateTime is not advanced
                    // for updates that do not modify the underlying document.
                    r.addEntry(e, n.commitVersion));
                }));
            })), s.next((function() {
                return t._n.removeMutationBatch(e, i);
            }));
        }(n, t, e, i).next((function() {
            return i.apply(t);
        })).next((function() {
            return n._n.performConsistencyCheck(t);
        })).next((function() {
            return n.Mn.pn(t, r);
        }));
    }));
}

/**
 * Removes mutations from the MutationQueue for the specified batch;
 * LocalDocuments will be recalculated.
 *
 * @returns The resulting modified documents.
 */
/**
 * Returns the last consistent snapshot processed (used by the RemoteStore to
 * determine whether to buffer incoming snapshots from the backend).
 */ function Ji(t) {
    var e = z(t);
    return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (function(t) {
        return e.Ue.getLastRemoteSnapshotVersion(t);
    }));
}

/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function Zi(t, e) {
    var n = z(t), r = e.snapshotVersion, i = n.kn;
    return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (function(t) {
        var o = n.Fn.newChangeBuffer({
            trackRemovals: !0
        });
        // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                i = n.kn;
        var s = [];
        e.targetChanges.forEach((function(e, o) {
            var u = i.get(o);
            if (u) {
                // Only update the remote keys if the target is still active. This
                // ensures that we can persist the updated target data along with
                // the updated assignment.
                s.push(n.Ue.removeMatchingKeys(t, e.removedDocuments, o).next((function() {
                    return n.Ue.addMatchingKeys(t, e.addedDocuments, o);
                })));
                var a = e.resumeToken;
                // Update the resume token if the change includes one.
                                if (a.approximateByteSize() > 0) {
                    var c = u.withResumeToken(a, r).withSequenceNumber(t.currentSequenceNumber);
                    i = i.insert(o, c), 
                    // Update the target data if there are target changes (or if
                    // sufficient time has passed since the last update).
                    /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
                    function(t, e, n) {
                        // Always persist target data if we don't already have a resume token.
                        return G(e.resumeToken.approximateByteSize() > 0), 0 === t.resumeToken.approximateByteSize() || (
                        // Don't allow resume token changes to be buffered indefinitely. This
                        // allows us to be reasonably up-to-date after a crash and avoids needing
                        // to loop over all active queries on shutdown. Especially in the browser
                        // we may not get time to do anything interesting while the current tab is
                        // closing.
                        e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= 3e8 || n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0);
                    }(u, c, e) && s.push(n.Ue.updateTargetData(t, c));
                }
            }
        }));
        var u = cn();
        // HACK: The only reason we allow a null snapshot version is so that we
        // can synthesize remote events when we get permission denied errors while
        // trying to resolve the state of a locally cached document that is in
        // limbo.
                if (e.documentUpdates.forEach((function(r, i) {
            e.resolvedLimboDocuments.has(r) && s.push(n.persistence.referenceDelegate.updateLimboDocument(t, r));
        })), 
        // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
        // documents in advance in a single call.
        s.push(to(t, o, e.documentUpdates, r, void 0).next((function(t) {
            u = t;
        }))), !r.isEqual(J.min())) {
            var a = n.Ue.getLastRemoteSnapshotVersion(t).next((function(e) {
                return n.Ue.setTargetsMetadata(t, t.currentSequenceNumber, r);
            }));
            s.push(a);
        }
        return Cr.waitFor(s).next((function() {
            return o.apply(t);
        })).next((function() {
            return n.Mn.En(t, u);
        })).next((function() {
            return u;
        }));
    })).then((function(t) {
        return n.kn = i, t;
    }));
}

/**
 * Populates document change buffer with documents from backend or a bundle.
 * Returns the document changes resulting from applying those documents.
 *
 * @param txn - Transaction to use to read existing documents from storage.
 * @param documentBuffer - Document buffer to collect the resulted changes to be
 *        applied to storage.
 * @param documents - Documents to be applied.
 * @param globalVersion - A `SnapshotVersion` representing the read time if all
 *        documents have the same read time.
 * @param documentVersions - A DocumentKey-to-SnapshotVersion map if documents
 *        have their own read time.
 *
 * Note: this function will use `documentVersions` if it is defined;
 * when it is not defined, resorts to `globalVersion`.
 */ function to(t, e, n, r, 
// TODO(wuandy): We could add `readTime` to MaybeDocument instead to remove
// this parameter.
i) {
    var o = yn();
    return n.forEach((function(t) {
        return o = o.add(t);
    })), e.getEntries(t, o).next((function(t) {
        var o = cn();
        return n.forEach((function(n, s) {
            var u = t.get(n), a = (null == i ? void 0 : i.get(n)) || r;
            // Note: The order of the steps below is important, since we want
            // to ensure that rejected limbo resolutions (which fabricate
            // NoDocuments with SnapshotVersion.min()) never add documents to
            // cache.
                        s.isNoDocument() && s.version.isEqual(J.min()) ? (
            // NoDocuments with SnapshotVersion.min() are used in manufactured
            // events. We remove these documents from cache since we lost
            // access.
            e.removeEntry(n, a), o = o.insert(n, s)) : !u.isValidDocument() || s.version.compareTo(u.version) > 0 || 0 === s.version.compareTo(u.version) && u.hasPendingWrites ? (e.addEntry(s, a), 
            o = o.insert(n, s)) : q("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", u.version, " Watch version:", s.version);
        })), o;
    }))
    /**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */;
}

function eo(t, e) {
    var n = z(t);
    return n.persistence.runTransaction("Get next mutation batch", "readonly", (function(t) {
        return void 0 === e && (e = -1), n._n.getNextMutationBatchAfterBatchId(t, e);
    }));
}

/**
 * Reads the current value of a Document with a given key or null if not
 * found - used for testing.
 */
/**
 * Assigns the given target an internal ID so that its results can be pinned so
 * they don't get GC'd. A target must be allocated in the local store before
 * the store can be used to manage its view.
 *
 * Allocating an already allocated `Target` will return the existing `TargetData`
 * for that `Target`.
 */ function no(t, e) {
    var n = z(t);
    return n.persistence.runTransaction("Allocate target", "readwrite", (function(t) {
        var r;
        return n.Ue.getTargetData(t, e).next((function(i) {
            return i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            r = i, Cr.resolve(r)) : n.Ue.allocateTargetId(t).next((function(i) {
                return r = new Gr(e, i, 0 /* Listen */ , t.currentSequenceNumber), n.Ue.addTargetData(t, r).next((function() {
                    return r;
                }));
            }));
        }));
    })).then((function(t) {
        // If Multi-Tab is enabled, the existing target data may be newer than
        // the in-memory data
        var r = n.kn.get(t.targetId);
        return (null === r || t.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.kn = n.kn.insert(t.targetId, t), 
        n.$n.set(e, t.targetId)), t;
    }));
}

/**
 * Returns the TargetData as seen by the LocalStore, including updates that may
 * have not yet been persisted to the TargetCache.
 */
// Visible for testing.
/**
 * Unpins all the documents associated with the given target. If
 * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
 * directly removes the associated target data from the target cache.
 *
 * Releasing a non-existing `Target` is a no-op.
 */
// PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
function ro(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o, s, u;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = z(t), o = n.kn.get(e), s = i ? "readwrite" : "readwrite-primary", r.label = 1;

              case 1:
                return r.trys.push([ 1, 4, , 5 ]), i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , n.persistence.runTransaction("Release target", s, (function(t) {
                    return n.persistence.referenceDelegate.removeTarget(t, o);
                })) ];

              case 2:
                r.sent(), r.label = 3;

              case 3:
                return [ 3 /*break*/ , 5 ];

              case 4:
                if (!Pr(u = r.sent())) throw u;
                // All `releaseTarget` does is record the final metadata state for the
                // target, but we've been recording this periodically during target
                // activity. If we lose this write this could cause a very slight
                // difference in the order of target deletion during GC, but we
                // don't define exact LRU semantics so this is acceptable.
                                return q("LocalStore", "Failed to update sequence numbers for target " + e + ": " + u), 
                [ 3 /*break*/ , 5 ];

              case 5:
                return n.kn = n.kn.remove(e), n.$n.delete(o.target), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Runs the specified query against the local store and returns the results,
 * potentially taking advantage of query data from previous executions (such
 * as the set of remote keys).
 *
 * @param usePreviousResults - Whether results from previous executions can
 * be used to optimize this query execution.
 */ function io(t, e, n) {
    var r = z(t), i = J.min(), o = yn();
    return r.persistence.runTransaction("Execute query", "readonly", (function(t) {
        return function(t, e, n) {
            var r = z(t), i = r.$n.get(n);
            return void 0 !== i ? Cr.resolve(r.kn.get(i)) : r.Ue.getTargetData(e, n);
        }(r, t, fe(e)).next((function(e) {
            if (e) return i = e.lastLimboFreeSnapshotVersion, r.Ue.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
                o = t;
            }));
        })).next((function() {
            return r.xn.getDocumentsMatchingQuery(t, e, n ? i : J.min(), n ? o : yn());
        })).next((function(t) {
            return {
                documents: t,
                Bn: o
            };
        }));
    }));
}

// PORTING NOTE: Multi-Tab only.
function oo(t, e) {
    var n = z(t), r = z(n.Ue), i = n.kn.get(e);
    return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", (function(t) {
        return r.lt(t, e).next((function(t) {
            return t ? t.target : null;
        }));
    }));
}

/**
 * Returns the set of documents that have been updated since the last call.
 * If this is the first call, returns the set of changes since client
 * initialization. Further invocations will return document that have changed
 * since the prior call.
 */
// PORTING NOTE: Multi-Tab only.
function so(t) {
    var e = z(t);
    return e.persistence.runTransaction("Get new document changes", "readonly", (function(t) {
        return function(t, e, n) {
            var r = z(t), i = cn(), o = Hr(n), s = Pi(e), u = IDBKeyRange.lowerBound(o, !0);
            return s.Ot({
                index: mr.readTimeIndex,
                range: u
            }, (function(t, e) {
                // Unlike `getEntry()` and others, `getNewDocumentChanges()` parses
                // the documents directly since we want to keep sentinel deletes.
                var n = Qr(r.R, e);
                i = i.insert(n.key, n), o = e.readTime;
            })).next((function() {
                return {
                    wn: i,
                    readTime: Yr(o)
                };
            }));
        }(e.Fn, t, e.On);
    })).then((function(t) {
        var n = t.wn, r = t.readTime;
        return e.On = r, n;
    }));
}

/**
 * Reads the newest document change from persistence and moves the internal
 * synchronization marker forward so that calls to `getNewDocumentChanges()`
 * only return changes that happened after client initialization.
 */
// PORTING NOTE: Multi-Tab only.
function uo(t) {
    return n(this, void 0, void 0, (function() {
        var e;
        return r(this, (function(n) {
            return [ 2 /*return*/ , (e = z(t)).persistence.runTransaction("Synchronize last document change read time", "readonly", (function(t) {
                return function(t) {
                    var e = Pi(t), n = J.min();
                    // If there are no existing entries, we return SnapshotVersion.min().
                                        return e.Ot({
                        index: mr.readTimeIndex,
                        reverse: !0
                    }, (function(t, e, r) {
                        e.readTime && (n = Yr(e.readTime)), r.done();
                    })).next((function() {
                        return n;
                    }));
                }(t);
            })).then((function(t) {
                e.On = t;
            })) ];
        }));
    }));
}

/**
 * Creates a new target using the given bundle name, which will be used to
 * hold the keys of all documents from the bundle in query-document mappings.
 * This ensures that the loaded documents do not get garbage collected
 * right away.
 */
/**
 * Applies the documents from a bundle to the "ground-state" (remote)
 * documents.
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function ao(t, e, i, o) {
    return n(this, void 0, void 0, (function() {
        var n, s, u, a, c, h, f, l, d, p;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                for (n = z(t), s = yn(), u = cn(), a = dn(), c = 0, h = i; c < h.length; c++) f = h[c], 
                l = e.Un(f.metadata.name), f.document && (s = s.add(l)), u = u.insert(l, e.qn(f)), 
                a = a.insert(l, e.Kn(f.metadata.readTime));
                return d = n.Fn.newChangeBuffer({
                    trackRemovals: !0
                }), [ 4 /*yield*/ , no(n, function(t) {
                    // It is OK that the path used for the query is not valid, because this will
                    // not be read and queried.
                    return fe(ie(rt.fromString("__bundle__/docs/" + t)));
                }(o)) ];

              case 1:
                // Allocates a target to hold all document keys from the bundle, such that
                // they will not get garbage collected right away.
                return p = r.sent(), [ 2 /*return*/ , n.persistence.runTransaction("Apply bundle documents", "readwrite", (function(t) {
                    return to(t, d, u, J.min(), a).next((function(e) {
                        return d.apply(t), e;
                    })).next((function(e) {
                        return n.Ue.removeMatchingKeysForTargetId(t, p.targetId).next((function() {
                            return n.Ue.addMatchingKeys(t, s, p.targetId);
                        })).next((function() {
                            return n.Mn.En(t, e);
                        })).next((function() {
                            return e;
                        }));
                    }));
                })) ];
            }
        }));
    }));
}

/**
 * Returns a promise of a boolean to indicate if the given bundle has already
 * been loaded and the create time is newer than the current loading bundle.
 */
/**
 * Saves the given `NamedQuery` to local persistence.
 */ function co(t, e, i) {
    return void 0 === i && (i = yn()), n(this, void 0, void 0, (function() {
        var n, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return [ 4 /*yield*/ , no(t, fe(ei(e.bundledQuery))) ];

              case 1:
                return n = r.sent(), [ 2 /*return*/ , (o = z(t)).persistence.runTransaction("Save named query", "readwrite", (function(t) {
                    var r = Ln(e.readTime);
                    // Simply save the query itself if it is older than what the SDK already
                    // has.
                                        if (n.snapshotVersion.compareTo(r) >= 0) return o.Ke.saveNamedQuery(t, e);
                    // Update existing target data because the query from the bundle is newer.
                                        var s = n.withResumeToken(ut.EMPTY_BYTE_STRING, r);
                    return o.kn = o.kn.insert(s.targetId, s), o.Ue.updateTargetData(t, s).next((function() {
                        return o.Ue.removeMatchingKeysForTargetId(t, n.targetId);
                    })).next((function() {
                        return o.Ue.addMatchingKeys(t, i, n.targetId);
                    })).next((function() {
                        return o.Ke.saveNamedQuery(t, e);
                    }));
                })) ];
            }
        }));
    }));
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
 */ var ho = /** @class */ function() {
    function t(t) {
        this.R = t, this.jn = new Map, this.Qn = new Map;
    }
    return t.prototype.getBundleMetadata = function(t, e) {
        return Cr.resolve(this.jn.get(e));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        /** Decodes a BundleMetadata proto into a BundleMetadata object. */
        var n;
        return this.jn.set(e.id, {
            id: (n = e).id,
            version: n.version,
            createTime: Ln(n.createTime)
        }), Cr.resolve();
    }, t.prototype.getNamedQuery = function(t, e) {
        return Cr.resolve(this.Qn.get(e));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return this.Qn.set(e.name, function(t) {
            return {
                name: t.name,
                query: ei(t.bundledQuery),
                readTime: Ln(t.readTime)
            };
        }(e)), Cr.resolve();
    }, t;
}(), fo = /** @class */ function() {
    function t() {
        // A set of outstanding references to a document sorted by key.
        this.Wn = new sn(lo.Gn), 
        // A set of outstanding references to a document sorted by target id.
        this.zn = new sn(lo.Hn)
        /** Returns true if the reference set contains no references. */;
    }
    return t.prototype.isEmpty = function() {
        return this.Wn.isEmpty();
    }, 
    /** Adds a reference to the given document key for the given ID. */ t.prototype.addReference = function(t, e) {
        var n = new lo(t, e);
        this.Wn = this.Wn.add(n), this.zn = this.zn.add(n);
    }, 
    /** Add references to the given document keys for the given ID. */ t.prototype.Jn = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.addReference(t, e);
        }));
    }, 
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    t.prototype.removeReference = function(t, e) {
        this.Yn(new lo(t, e));
    }, t.prototype.Xn = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.removeReference(t, e);
        }));
    }, 
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    t.prototype.Zn = function(t) {
        var e = this, n = new gt(new rt([])), r = new lo(n, t), i = new lo(n, t + 1), o = [];
        return this.zn.forEachInRange([ r, i ], (function(t) {
            e.Yn(t), o.push(t.key);
        })), o;
    }, t.prototype.ts = function() {
        var t = this;
        this.Wn.forEach((function(e) {
            return t.Yn(e);
        }));
    }, t.prototype.Yn = function(t) {
        this.Wn = this.Wn.delete(t), this.zn = this.zn.delete(t);
    }, t.prototype.es = function(t) {
        var e = new gt(new rt([])), n = new lo(e, t), r = new lo(e, t + 1), i = yn();
        return this.zn.forEachInRange([ n, r ], (function(t) {
            i = i.add(t.key);
        })), i;
    }, t.prototype.containsKey = function(t) {
        var e = new lo(t, 0), n = this.Wn.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key);
    }, t;
}(), lo = /** @class */ function() {
    function t(t, e) {
        this.key = t, this.ns = e
        /** Compare by key then by ID */;
    }
    return t.Gn = function(t, e) {
        return gt.comparator(t.key, e.key) || H(t.ns, e.ns);
    }, 
    /** Compare by ID then by key */ t.Hn = function(t, e) {
        return H(t.ns, e.ns) || gt.comparator(t.key, e.key);
    }, t;
}(), po = /** @class */ function() {
    function t(t, e) {
        this.qt = t, this.referenceDelegate = e, 
        /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
        this._n = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.ss = 1, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.rs = new sn(lo.Gn);
    }
    return t.prototype.checkEmpty = function(t) {
        return Cr.resolve(0 === this._n.length);
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this.ss;
        this.ss++, this._n.length > 0 && this._n[this._n.length - 1];
        var o = new jr(i, e, n, r);
        this._n.push(o);
        // Track references by document key and index collection parents.
        for (var s = 0, u = r; s < u.length; s++) {
            var a = u[s];
            this.rs = this.rs.add(new lo(a.key, i)), this.qt.addToCollectionParentIndex(t, a.key.path.popLast());
        }
        return Cr.resolve(o);
    }, t.prototype.lookupMutationBatch = function(t, e) {
        return Cr.resolve(this.os(e));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = e + 1, r = this.cs(n), i = r < 0 ? 0 : r;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return Cr.resolve(this._n.length > i ? this._n[i] : null);
    }, t.prototype.getHighestUnacknowledgedBatchId = function() {
        return Cr.resolve(0 === this._n.length ? -1 : this.ss - 1);
    }, t.prototype.getAllMutationBatches = function(t) {
        return Cr.resolve(this._n.slice());
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = new lo(e, 0), i = new lo(e, Number.POSITIVE_INFINITY), o = [];
        return this.rs.forEachInRange([ r, i ], (function(t) {
            var e = n.os(t.ns);
            o.push(e);
        })), Cr.resolve(o);
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new sn(H);
        return e.forEach((function(t) {
            var e = new lo(t, 0), i = new lo(t, Number.POSITIVE_INFINITY);
            n.rs.forEachInRange([ e, i ], (function(t) {
                r = r.add(t.ns);
            }));
        })), Cr.resolve(this.us(r));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        var n = e.path, r = n.length + 1, i = n;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
                gt.isDocumentKey(i) || (i = i.child(""));
        var o = new lo(new gt(i), 0), s = new sn(H);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                return this.rs.forEachWhile((function(t) {
            var e = t.key.path;
            return !!n.isPrefixOf(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === r && (s = s.add(t.ns)), !0);
        }), o), Cr.resolve(this.us(s));
    }, t.prototype.us = function(t) {
        var e = this, n = [];
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
                return t.forEach((function(t) {
            var r = e.os(t);
            null !== r && n.push(r);
        })), n;
    }, t.prototype.removeMutationBatch = function(t, e) {
        var n = this;
        G(0 === this.hs(e.batchId, "removed")), this._n.shift();
        var r = this.rs;
        return Cr.forEach(e.mutations, (function(i) {
            var o = new lo(i.key, e.batchId);
            return r = r.delete(o), n.referenceDelegate.markPotentiallyOrphaned(t, i.key);
        })).next((function() {
            n.rs = r;
        }));
    }, t.prototype.Gt = function(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }, t.prototype.containsKey = function(t, e) {
        var n = new lo(e, 0), r = this.rs.firstAfterOrEqual(n);
        return Cr.resolve(e.isEqual(r && r.key));
    }, t.prototype.performConsistencyCheck = function(t) {
        return this._n.length, Cr.resolve();
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    t.prototype.hs = function(t, e) {
        return this.cs(t);
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */
    t.prototype.cs = function(t) {
        return 0 === this._n.length ? 0 : t - this._n[0].batchId;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
        }, 
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    t.prototype.os = function(t) {
        var e = this.cs(t);
        return e < 0 || e >= this._n.length ? null : this._n[e];
    }, t;
}(), yo = /** @class */ function() {
    /**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    function t(t, e) {
        this.qt = t, this.ls = e, 
        /** Underlying cache of documents and their read times. */
        this.docs = new nn(gt.comparator), 
        /** Size of all cached documents. */
        this.size = 0
        /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */;
    }
    return t.prototype.addEntry = function(t, e, n) {
        var r = e.key, i = this.docs.get(r), o = i ? i.size : 0, s = this.ls(e);
        return this.docs = this.docs.insert(r, {
            document: e.clone(),
            size: s,
            readTime: n
        }), this.size += s - o, this.qt.addToCollectionParentIndex(t, r.path.popLast());
    }, 
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t.prototype.removeEntry = function(t) {
        var e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }, t.prototype.getEntry = function(t, e) {
        var n = this.docs.get(e);
        return Cr.resolve(n ? n.document.clone() : Pt.newInvalidDocument(e));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = cn();
        return e.forEach((function(t) {
            var e = n.docs.get(t);
            r = r.insert(t, e ? e.document.clone() : Pt.newInvalidDocument(t));
        })), Cr.resolve(r);
    }, t.prototype.getDocumentsMatchingQuery = function(t, e, n) {
        for (var r = cn(), i = new gt(e.path.child("")), o = this.docs.getIteratorFrom(i)
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        ; o.hasNext(); ) {
            var s = o.getNext(), u = s.key, a = s.value, c = a.document, h = a.readTime;
            if (!e.path.isPrefixOf(u.path)) break;
            h.compareTo(n) <= 0 || ve(e, c) && (r = r.insert(c.key, c.clone()));
        }
        return Cr.resolve(r);
    }, t.prototype.fs = function(t, e) {
        return Cr.forEach(this.docs, (function(t) {
            return e(t);
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new vo(this);
    }, t.prototype.getSize = function(t) {
        return Cr.resolve(this.size);
    }, t;
}(), vo = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).Ie = t, n;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [];
        return this.changes.forEach((function(r, i) {
            i.document.isValidDocument() ? n.push(e.Ie.addEntry(t, i.document, e.getReadTime(r))) : e.Ie.removeEntry(r);
        })), Cr.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        return this.Ie.getEntry(t, e);
    }, n.prototype.getAllFromCache = function(t, e) {
        return this.Ie.getEntries(t, e);
    }, n;
}(xi), mo = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /**
             * Maps a target to the data about that target
             */
        this.ds = new Ci((function(t) {
            return Vt(t);
        }), qt), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = J.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.ws = 0, 
        /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
        this._s = new fo, this.targetCount = 0, this.gs = gi.Jt();
    }
    return t.prototype.forEachTarget = function(t, e) {
        return this.ds.forEach((function(t, n) {
            return e(n);
        })), Cr.resolve();
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return Cr.resolve(this.lastRemoteSnapshotVersion);
    }, t.prototype.getHighestSequenceNumber = function(t) {
        return Cr.resolve(this.ws);
    }, t.prototype.allocateTargetId = function(t) {
        return this.highestTargetId = this.gs.next(), Cr.resolve(this.highestTargetId);
    }, t.prototype.setTargetsMetadata = function(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.ws && (this.ws = e), 
        Cr.resolve();
    }, t.prototype.te = function(t) {
        this.ds.set(t.target, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.gs = new gi(e), this.highestTargetId = e), t.sequenceNumber > this.ws && (this.ws = t.sequenceNumber);
    }, t.prototype.addTargetData = function(t, e) {
        return this.te(e), this.targetCount += 1, Cr.resolve();
    }, t.prototype.updateTargetData = function(t, e) {
        return this.te(e), Cr.resolve();
    }, t.prototype.removeTargetData = function(t, e) {
        return this.ds.delete(e.target), this._s.Zn(e.targetId), this.targetCount -= 1, 
        Cr.resolve();
    }, t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return this.ds.forEach((function(s, u) {
            u.sequenceNumber <= e && null === n.get(u.targetId) && (r.ds.delete(s), o.push(r.removeMatchingKeysForTargetId(t, u.targetId)), 
            i++);
        })), Cr.waitFor(o).next((function() {
            return i;
        }));
    }, t.prototype.getTargetCount = function(t) {
        return Cr.resolve(this.targetCount);
    }, t.prototype.getTargetData = function(t, e) {
        var n = this.ds.get(e) || null;
        return Cr.resolve(n);
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        return this._s.Jn(e, n), Cr.resolve();
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        this._s.Xn(e, n);
        var r = this.persistence.referenceDelegate, i = [];
        return r && e.forEach((function(e) {
            i.push(r.markPotentiallyOrphaned(t, e));
        })), Cr.waitFor(i);
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        return this._s.Zn(e), Cr.resolve();
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = this._s.es(e);
        return Cr.resolve(n);
    }, t.prototype.containsKey = function(t, e) {
        return Cr.resolve(this._s.containsKey(e));
    }, t;
}(), go = /** @class */ function() {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    function t(t, e) {
        var n = this;
        this.ys = {}, this.Ne = new L(0), this.xe = !1, this.xe = !0, this.referenceDelegate = t(this), 
        this.Ue = new mo(this), this.qt = new oi, this.qe = function(t, e) {
            return new yo(t, (function(t) {
                return n.referenceDelegate.ps(t);
            }));
        }(this.qt), this.R = new zr(e), this.Ke = new ho(this.R);
    }
    return t.prototype.start = function() {
        return Promise.resolve();
    }, t.prototype.shutdown = function() {
        // No durable state to ensure is closed on shutdown.
        return this.xe = !1, Promise.resolve();
    }, Object.defineProperty(t.prototype, "started", {
        get: function() {
            return this.xe;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.setDatabaseDeletedListener = function() {
        // No op.
    }, t.prototype.setNetworkEnabled = function() {
        // No op.
    }, t.prototype.getIndexManager = function() {
        return this.qt;
    }, t.prototype.getMutationQueue = function(t) {
        var e = this.ys[t.toKey()];
        return e || (e = new po(this.qt, this.referenceDelegate), this.ys[t.toKey()] = e), 
        e;
    }, t.prototype.getTargetCache = function() {
        return this.Ue;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.qe;
    }, t.prototype.getBundleCache = function() {
        return this.Ke;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        q("MemoryPersistence", "Starting transaction:", t);
        var i = new wo(this.Ne.next());
        return this.referenceDelegate.Es(), n(i).next((function(t) {
            return r.referenceDelegate.Ts(i).next((function() {
                return t;
            }));
        })).toPromise().then((function(t) {
            return i.raiseOnCommittedEvent(), t;
        }));
    }, t.prototype.Is = function(t, e) {
        return Cr.or(Object.values(this.ys).map((function(n) {
            return function() {
                return n.containsKey(t, e);
            };
        })));
    }, t;
}(), wo = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).currentSequenceNumber = t, n;
    }
    return t(n, e), n;
}(Ar), bo = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.As = new fo, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.Rs = null;
    }
    return t.Ps = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "bs", {
        get: function() {
            if (this.Rs) return this.Rs;
            throw K();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.addReference = function(t, e, n) {
        return this.As.addReference(n, e), this.bs.delete(n.toString()), Cr.resolve();
    }, t.prototype.removeReference = function(t, e, n) {
        return this.As.removeReference(n, e), this.bs.add(n.toString()), Cr.resolve();
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return this.bs.add(e.toString()), Cr.resolve();
    }, t.prototype.removeTarget = function(t, e) {
        var n = this;
        this.As.Zn(e.targetId).forEach((function(t) {
            return n.bs.add(t.toString());
        }));
        var r = this.persistence.getTargetCache();
        return r.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
            t.forEach((function(t) {
                return n.bs.add(t.toString());
            }));
        })).next((function() {
            return r.removeTargetData(t, e);
        }));
    }, t.prototype.Es = function() {
        this.Rs = new Set;
    }, t.prototype.Ts = function(t) {
        var e = this, n = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        // Remove newly orphaned documents.
                return Cr.forEach(this.bs, (function(r) {
            var i = gt.fromPath(r);
            return e.vs(t, i).next((function(t) {
                t || n.removeEntry(i);
            }));
        })).next((function() {
            return e.Rs = null, n.apply(t);
        }));
    }, t.prototype.updateLimboDocument = function(t, e) {
        var n = this;
        return this.vs(t, e).next((function(t) {
            t ? n.bs.delete(e.toString()) : n.bs.add(e.toString());
        }));
    }, t.prototype.ps = function(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }, t.prototype.vs = function(t, e) {
        var n = this;
        return Cr.or([ function() {
            return Cr.resolve(n.As.containsKey(e));
        }, function() {
            return n.persistence.getTargetCache().containsKey(t, e);
        }, function() {
            return n.persistence.Is(t, e);
        } ]);
    }, t;
}(), Io = /** @class */ function() {
    function t(t) {
        this.uid = t;
    }
    return t.prototype.isAuthenticated = function() {
        return null != this.uid;
    }, 
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    t.prototype.toKey = function() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }, t.prototype.isEqual = function(t) {
        return t.uid === this.uid;
    }, t;
}();

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
 * A collection of references to a document from some kind of numbered entity
 * (either a target ID or batch ID). As references are added to or removed from
 * the set corresponding events are emitted to a registered garbage collector.
 *
 * Each reference is represented by a DocumentReference object. Each of them
 * contains enough information to uniquely identify the reference. They are all
 * stored primarily in a set sorted by key. A document is considered garbage if
 * there's no references in that set (this can be efficiently checked thanks to
 * sorting by key).
 *
 * ReferenceSet also keeps a secondary set that contains references sorted by
 * IDs. This one is used to efficiently implement removal of all references by
 * some target ID.
 */
/** Assembles the key for a client state in WebStorage */
function To(t, e) {
    return "firestore_clients_" + t + "_" + e;
}

// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>
// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
/** Assembles the key for a mutation batch in WebStorage */ function Eo(t, e, n) {
    var r = "firestore_mutations_" + t + "_" + n;
    return e.isAuthenticated() && (r += "_" + e.uid), r;
}

// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
/** Assembles the key for a query state in WebStorage */ function So(t, e) {
    return "firestore_targets_" + t + "_" + e;
}

// The WebStorage prefix that stores the primary tab's online state. The
// format of the key is:
//     firestore_online_state_<persistence_prefix>
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
// Visible for testing
/** A user with a null UID. */ Io.UNAUTHENTICATED = new Io(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
Io.GOOGLE_CREDENTIALS = new Io("google-credentials-uid"), Io.FIRST_PARTY = new Io("first-party-uid");

var _o = /** @class */ function() {
    function t(t, e, n, r) {
        this.user = t, this.batchId = e, this.state = n, this.error = r
        /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vs = function(e, n, r) {
        var i, o = JSON.parse(r), s = "object" == typeof o && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(o.state) && (void 0 === o.error || "object" == typeof o.error);
        return s && o.error && ((s = "string" == typeof o.error.message && "string" == typeof o.error.code) && (i = new P(o.error.code, o.error.message))), 
        s ? new t(e, n, o.state, i) : (U("SharedClientState", "Failed to parse mutation state for ID '" + n + "': " + r), 
        null);
    }, t.prototype.Ss = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), No = /** @class */ function() {
    function t(t, e, n) {
        this.targetId = t, this.state = e, this.error = n
        /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vs = function(e, n) {
        var r, i = JSON.parse(n), o = "object" == typeof i && -1 !== [ "not-current", "current", "rejected" ].indexOf(i.state) && (void 0 === i.error || "object" == typeof i.error);
        return o && i.error && ((o = "string" == typeof i.error.message && "string" == typeof i.error.code) && (r = new P(i.error.code, i.error.message))), 
        o ? new t(e, i.state, r) : (U("SharedClientState", "Failed to parse target state for ID '" + e + "': " + n), 
        null);
    }, t.prototype.Ss = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), Do = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.activeTargetIds = e
        /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vs = function(e, n) {
        for (var r = JSON.parse(n), i = "object" == typeof r && r.activeTargetIds instanceof Array, o = mn(), s = 0; i && s < r.activeTargetIds.length; ++s) i = mt(r.activeTargetIds[s]), 
        o = o.add(r.activeTargetIds[s]);
        return i ? new t(e, o) : (U("SharedClientState", "Failed to parse client data for instance '" + e + "': " + n), 
        null);
    }, t;
}(), Ao = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.onlineState = e
        /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vs = function(e) {
        var n = JSON.parse(e);
        return "object" == typeof n && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(n.onlineState) && "string" == typeof n.clientId ? new t(n.clientId, n.onlineState) : (U("SharedClientState", "Failed to parse online state: " + e), 
        null);
    }, t;
}(), ko = /** @class */ function() {
    function t() {
        this.activeTargetIds = mn();
    }
    return t.prototype.Ds = function(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }, t.prototype.Cs = function(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }, 
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    t.prototype.Ss = function() {
        var t = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }, t;
}(), Co = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.window = t, this.Se = e, this.persistenceKey = n, this.Ns = r, this.syncEngine = null, 
        this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.xs = this.ks.bind(this), 
        this.$s = new nn(H), this.started = !1, 
        /**
             * Captures WebStorage events that occur before `start()` is called. These
             * events are replayed once `WebStorageSharedClientState` is started.
             */
        this.Os = [];
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        var o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.window.localStorage, this.currentUser = i, this.Fs = To(this.persistenceKey, this.Ns), 
        this.Ms = 
        /** Assembles the key for the current sequence number. */
        function(t) {
            return "firestore_sequence_number_" + t;
        }(this.persistenceKey), this.$s = this.$s.insert(this.Ns, new ko), this.Ls = new RegExp("^firestore_clients_" + o + "_([^_]*)$"), 
        this.Bs = new RegExp("^firestore_mutations_" + o + "_(\\d+)(?:_(.*))?$"), this.Us = new RegExp("^firestore_targets_" + o + "_(\\d+)$"), 
        this.qs = 
        /** Assembles the key for the online state of the primary tab. */
        function(t) {
            return "firestore_online_state_" + t;
        }(this.persistenceKey), this.Ks = function(t) {
            return "firestore_bundle_loaded_" + t;
        }(this.persistenceKey), 
        // Rather than adding the storage observer during start(), we add the
        // storage observer during initialization. This ensures that we collect
        // events before other components populate their initial state (during their
        // respective start() calls). Otherwise, we might for example miss a
        // mutation that is added after LocalStore's start() processed the existing
        // mutations but before we observe WebStorage events.
        this.window.addEventListener("storage", this.xs);
    }
    /** Returns 'true' if WebStorage is available in the current environment. */    return t.gt = function(t) {
        return !(!t || !t.localStorage);
    }, t.prototype.start = function() {
        return n(this, void 0, void 0, (function() {
            var t, e, n, i, o, s, u, a, c, h, f, l = this;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.syncEngine.fn() ];

                  case 1:
                    for (t = r.sent(), e = 0, n = t; e < n.length; e++) (i = n[e]) !== this.Ns && (o = this.getItem(To(this.persistenceKey, i))) && (s = Do.Vs(i, o)) && (this.$s = this.$s.insert(s.clientId, s));
                    for (this.js(), (u = this.storage.getItem(this.qs)) && (a = this.Qs(u)) && this.Ws(a), 
                    c = 0, h = this.Os; c < h.length; c++) f = h[c], this.ks(f);
                    return this.Os = [], 
                    // Register a window unload hook to remove the client metadata entry from
                    // WebStorage even if `shutdown()` was not called.
                    this.window.addEventListener("pagehide", (function() {
                        return l.shutdown();
                    })), this.started = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.writeSequenceNumber = function(t) {
        this.setItem(this.Ms, JSON.stringify(t));
    }, t.prototype.getAllActiveQueryTargets = function() {
        return this.Gs(this.$s);
    }, t.prototype.isActiveQueryTarget = function(t) {
        var e = !1;
        return this.$s.forEach((function(n, r) {
            r.activeTargetIds.has(t) && (e = !0);
        })), e;
    }, t.prototype.addPendingMutation = function(t) {
        this.zs(t, "pending");
    }, t.prototype.updateMutationState = function(t, e, n) {
        this.zs(t, e, n), 
        // Once a final mutation result is observed by other clients, they no longer
        // access the mutation's metadata entry. Since WebStorage replays events
        // in order, it is safe to delete the entry right after updating it.
        this.Hs(t);
    }, t.prototype.addLocalQueryTarget = function(t) {
        var e = "not-current";
        // Lookup an existing query state if the target ID was already registered
        // by another tab
                if (this.isActiveQueryTarget(t)) {
            var n = this.storage.getItem(So(this.persistenceKey, t));
            if (n) {
                var r = No.Vs(t, n);
                r && (e = r.state);
            }
        }
        return this.Js.Ds(t), this.js(), e;
    }, t.prototype.removeLocalQueryTarget = function(t) {
        this.Js.Cs(t), this.js();
    }, t.prototype.isLocalQueryTarget = function(t) {
        return this.Js.activeTargetIds.has(t);
    }, t.prototype.clearQueryState = function(t) {
        this.removeItem(So(this.persistenceKey, t));
    }, t.prototype.updateQueryState = function(t, e, n) {
        this.Ys(t, e, n);
    }, t.prototype.handleUserChange = function(t, e, n) {
        var r = this;
        e.forEach((function(t) {
            r.Hs(t);
        })), this.currentUser = t, n.forEach((function(t) {
            r.addPendingMutation(t);
        }));
    }, t.prototype.setOnlineState = function(t) {
        this.Xs(t);
    }, t.prototype.notifyBundleLoaded = function() {
        this.Zs();
    }, t.prototype.shutdown = function() {
        this.started && (this.window.removeEventListener("storage", this.xs), this.removeItem(this.Fs), 
        this.started = !1);
    }, t.prototype.getItem = function(t) {
        var e = this.storage.getItem(t);
        return q("SharedClientState", "READ", t, e), e;
    }, t.prototype.setItem = function(t, e) {
        q("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }, t.prototype.removeItem = function(t) {
        q("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }, t.prototype.ks = function(t) {
        var e = this, i = t;
        // Note: The function is typed to take Event to be interface-compatible with
        // `Window.addEventListener`.
                if (i.storageArea === this.storage) {
            if (q("SharedClientState", "EVENT", i.key, i.newValue), i.key === this.Fs) return void U("Received WebStorage notification for local change. Another client might have garbage-collected our state");
            this.Se.enqueueRetryable((function() {
                return n(e, void 0, void 0, (function() {
                    var t, e, n, o, s, u;
                    return r(this, (function(r) {
                        if (this.started) {
                            if (null !== i.key) if (this.Ls.test(i.key)) {
                                if (null == i.newValue) return t = this.ti(i.key), [ 2 /*return*/ , this.ei(t, null) ];
                                if (e = this.ni(i.key, i.newValue)) return [ 2 /*return*/ , this.ei(e.clientId, e) ];
                            } else if (this.Bs.test(i.key)) {
                                if (null !== i.newValue && (n = this.si(i.key, i.newValue))) return [ 2 /*return*/ , this.ii(n) ];
                            } else if (this.Us.test(i.key)) {
                                if (null !== i.newValue && (o = this.ri(i.key, i.newValue))) return [ 2 /*return*/ , this.oi(o) ];
                            } else if (i.key === this.qs) {
                                if (null !== i.newValue && (s = this.Qs(i.newValue))) return [ 2 /*return*/ , this.Ws(s) ];
                            } else if (i.key === this.Ms) (u = function(t) {
                                var e = L.o;
                                if (null != t) try {
                                    var n = JSON.parse(t);
                                    G("number" == typeof n), e = n;
                                } catch (t) {
                                    U("SharedClientState", "Failed to read sequence number from WebStorage", t);
                                }
                                return e;
                            }(i.newValue)) !== L.o && this.sequenceNumberHandler(u); else if (i.key === this.Ks) return [ 2 /*return*/ , this.syncEngine.ci() ];
                        } else this.Os.push(i);
                        return [ 2 /*return*/ ];
                    }));
                }));
            }));
        }
    }, Object.defineProperty(t.prototype, "Js", {
        get: function() {
            return this.$s.get(this.Ns);
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.js = function() {
        this.setItem(this.Fs, this.Js.Ss());
    }, t.prototype.zs = function(t, e, n) {
        var r = new _o(this.currentUser, t, e, n), i = Eo(this.persistenceKey, this.currentUser, t);
        this.setItem(i, r.Ss());
    }, t.prototype.Hs = function(t) {
        var e = Eo(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }, t.prototype.Xs = function(t) {
        var e = {
            clientId: this.Ns,
            onlineState: t
        };
        this.storage.setItem(this.qs, JSON.stringify(e));
    }, t.prototype.Ys = function(t, e, n) {
        var r = So(this.persistenceKey, t), i = new No(t, e, n);
        this.setItem(r, i.Ss());
    }, t.prototype.Zs = function() {
        this.setItem(this.Ks, "value-not-used");
    }, 
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */
    t.prototype.ti = function(t) {
        var e = this.Ls.exec(t);
        return e ? e[1] : null;
    }, 
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */
    t.prototype.ni = function(t, e) {
        var n = this.ti(t);
        return Do.Vs(n, e);
    }, 
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.si = function(t, e) {
        var n = this.Bs.exec(t), r = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return _o.Vs(new Io(i), r, e);
    }, 
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.ri = function(t, e) {
        var n = this.Us.exec(t), r = Number(n[1]);
        return No.Vs(r, e);
    }, 
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.Qs = function(t) {
        return Ao.Vs(t);
    }, t.prototype.ii = function(t) {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(e) {
                return t.user.uid === this.currentUser.uid ? [ 2 /*return*/ , this.syncEngine.ui(t.batchId, t.state, t.error) ] : (q("SharedClientState", "Ignoring mutation for non-active user " + t.user.uid), 
                [ 2 /*return*/ ]);
            }));
        }));
    }, t.prototype.oi = function(t) {
        return this.syncEngine.ai(t.targetId, t.state, t.error);
    }, t.prototype.ei = function(t, e) {
        var n = this, r = e ? this.$s.insert(t, e) : this.$s.remove(t), i = this.Gs(this.$s), o = this.Gs(r), s = [], u = [];
        return o.forEach((function(t) {
            i.has(t) || s.push(t);
        })), i.forEach((function(t) {
            o.has(t) || u.push(t);
        })), this.syncEngine.hi(s, u).then((function() {
            n.$s = r;
        }));
    }, t.prototype.Ws = function(t) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        this.$s.get(t.clientId) && this.onlineStateHandler(t.onlineState);
    }, t.prototype.Gs = function(t) {
        var e = mn();
        return t.forEach((function(t, n) {
            e = e.unionWith(n.activeTargetIds);
        })), e;
    }, t;
}(), xo = /** @class */ function() {
    function t() {
        this.li = new ko, this.fi = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
    }
    return t.prototype.addPendingMutation = function(t) {
        // No op.
    }, t.prototype.updateMutationState = function(t, e, n) {
        // No op.
    }, t.prototype.addLocalQueryTarget = function(t) {
        return this.li.Ds(t), this.fi[t] || "not-current";
    }, t.prototype.updateQueryState = function(t, e, n) {
        this.fi[t] = e;
    }, t.prototype.removeLocalQueryTarget = function(t) {
        this.li.Cs(t);
    }, t.prototype.isLocalQueryTarget = function(t) {
        return this.li.activeTargetIds.has(t);
    }, t.prototype.clearQueryState = function(t) {
        delete this.fi[t];
    }, t.prototype.getAllActiveQueryTargets = function() {
        return this.li.activeTargetIds;
    }, t.prototype.isActiveQueryTarget = function(t) {
        return this.li.activeTargetIds.has(t);
    }, t.prototype.start = function() {
        return this.li = new ko, Promise.resolve();
    }, t.prototype.handleUserChange = function(t, e, n) {
        // No op.
    }, t.prototype.setOnlineState = function(t) {
        // No op.
    }, t.prototype.shutdown = function() {}, t.prototype.writeSequenceNumber = function(t) {}, 
    t.prototype.notifyBundleLoaded = function() {
        // No op.
    }, t;
}(), Ro = /** @class */ function() {
    function t() {}
    return t.prototype.di = function(t) {
        // No-op.
    }, t.prototype.shutdown = function() {
        // No-op.
    }, t;
}(), Lo = /** @class */ function() {
    function t() {
        var t = this;
        this.wi = function() {
            return t._i();
        }, this.mi = function() {
            return t.gi();
        }, this.yi = [], this.pi();
    }
    return t.prototype.di = function(t) {
        this.yi.push(t);
    }, t.prototype.shutdown = function() {
        window.removeEventListener("online", this.wi), window.removeEventListener("offline", this.mi);
    }, t.prototype.pi = function() {
        window.addEventListener("online", this.wi), window.addEventListener("offline", this.mi);
    }, t.prototype._i = function() {
        q("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.yi; t < e.length; t++) {
            (0, e[t])(0 /* AVAILABLE */);
        }
    }, t.prototype.gi = function() {
        q("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (var t = 0, e = this.yi; t < e.length; t++) {
            (0, e[t])(1 /* UNAVAILABLE */);
        }
    }, 
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    t.gt = function() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }, t;
}(), Oo = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery"
}, Po = /** @class */ function() {
    function t(t) {
        this.Ei = t.Ei, this.Ti = t.Ti;
    }
    return t.prototype.Ii = function(t) {
        this.Ai = t;
    }, t.prototype.Ri = function(t) {
        this.Pi = t;
    }, t.prototype.onMessage = function(t) {
        this.bi = t;
    }, t.prototype.close = function() {
        this.Ti();
    }, t.prototype.send = function(t) {
        this.Ei(t);
    }, t.prototype.vi = function() {
        this.Ai();
    }, t.prototype.Vi = function(t) {
        this.Pi(t);
    }, t.prototype.Si = function(t) {
        this.bi(t);
    }, t;
}(), Fo = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this, t) || this).forceLongPolling = t.forceLongPolling, n.autoDetectLongPolling = t.autoDetectLongPolling, 
        n.useFetchStreams = t.useFetchStreams, n;
    }
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    return t(n, e), n.prototype.$i = function(t, e, n, r) {
        return new Promise((function(i, o) {
            var s = new E;
            s.listenOnce(S.COMPLETE, (function() {
                try {
                    switch (s.getLastErrorCode()) {
                      case _.NO_ERROR:
                        var e = s.getResponseJson();
                        q("Connection", "XHR received:", JSON.stringify(e)), i(e);
                        break;

                      case _.TIMEOUT:
                        q("Connection", 'RPC "' + t + '" timed out'), o(new P(O.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case _.HTTP_ERROR:
                        var n = s.getStatus();
                        if (q("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", s.getResponseText()), 
                        n > 0) {
                            var r = s.getResponseJson().error;
                            if (r && r.status && r.message) {
                                var u = function(t) {
                                    var e = t.toLowerCase().replace(/_/g, "-");
                                    return Object.values(O).indexOf(e) >= 0 ? e : O.UNKNOWN;
                                }(r.status);
                                o(new P(u, r.message));
                            } else o(new P(O.UNKNOWN, "Server responded with status " + s.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        o(new P(O.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        K();
                    }
                } finally {
                    q("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            var u = JSON.stringify(r);
            s.send(e, "POST", u, n, 15);
        }));
    }, n.prototype.Fi = function(t, e) {
        var n = [ this.Di, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], r = N(), i = D(), o = {
            // Required for backend stickiness, routing behavior is based on this
            // parameter.
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                // This param is used to improve routing and project isolation by the
                // backend and must be included in every request.
                database: "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                // Override the default timeout (randomized between 10-20 seconds) since
                // a large write batch on a slow internet connection may take a long
                // time to send to the backend. Rather than have WebChannel impose a
                // tight timeout which could lead to infinite timeouts and retries, we
                // set it very large (5-10 minutes) and rely on the browser's builtin
                // timeouts to kick in if the request isn't working.
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling,
            detectBufferingProxy: this.autoDetectLongPolling
        };
        this.useFetchStreams && (o.xmlHttpFactory = new A({})), this.ki(o.initMessageHeaders, e), 
        // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the httpHeadersOverwriteParam option to specify that
        // the headers should instead be encoded into a special "$httpHeaders" query
        // parameter, which is recognized by the webchannel backend. This is
        // formally defined here:
        // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
        // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
        // doesn't have an Origin header. So we have to exclude a few browser environments that are
        // known to (sometimes) not include an Origin. See
        // https://github.com/firebase/firebase-js-sdk/issues/1491.
        d() || p() || y() || v() || m() || g() || (o.httpHeadersOverwriteParam = "$httpHeaders");
        var s = n.join("");
        q("Connection", "Creating WebChannel: " + s, o);
        var u = r.createWebChannel(s, o), a = !1, c = !1, h = new Po({
            Ei: function(t) {
                c ? q("Connection", "Not sending because WebChannel is closed:", t) : (a || (q("Connection", "Opening WebChannel transport."), 
                u.open(), a = !0), q("Connection", "WebChannel sending:", t), u.send(t));
            },
            Ti: function() {
                return u.close();
            }
        }), f = function(t, e, n) {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            t.listen(e, (function(t) {
                try {
                    n(t);
                } catch (t) {
                    setTimeout((function() {
                        throw t;
                    }), 0);
                }
            }));
        };
        // WebChannel supports sending the first message with the handshake - saving
        // a network round trip. However, it will have to call send in the same
        // JS event loop as open. In order to enforce this, we delay actually
        // opening the WebChannel until send is called. Whether we have called
        // open is tracked with this variable.
                // Closure events are guarded and exceptions are swallowed, so catch any
        // exception and rethrow using a setTimeout so they become visible again.
        // Note that eventually this function could go away if we are confident
        // enough the code is exception free.
        return f(u, k.EventType.OPEN, (function() {
            c || q("Connection", "WebChannel transport opened.");
        })), f(u, k.EventType.CLOSE, (function() {
            c || (c = !0, q("Connection", "WebChannel transport closed"), h.Vi());
        })), f(u, k.EventType.ERROR, (function(t) {
            c || (c = !0, B("Connection", "WebChannel transport errored:", t), h.Vi(new P(O.UNAVAILABLE, "The operation could not be completed")));
        })), f(u, k.EventType.MESSAGE, (function(t) {
            var e;
            if (!c) {
                var n = t.data[0];
                G(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                var r = n, i = r.error || (null === (e = r[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    q("Connection", "WebChannel received error:", i);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    var o = i.status, s = 
                    /**
 * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
 *
 * @returns The Code equivalent to the given status string or undefined if
 *     there is no match.
 */
                    function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var e = Ye[t];
                        if (void 0 !== e) return en(e);
                    }(o), a = i.message;
                    void 0 === s && (s = O.INTERNAL, a = "Unknown error status: " + o + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    c = !0, h.Vi(new P(s, a)), u.close();
                } else q("Connection", "WebChannel received:", n), h.Si(n);
            }
        })), f(i, C.STAT_EVENT, (function(t) {
            t.stat === x.PROXY ? q("Connection", "Detected buffering proxy") : t.stat === x.NOPROXY && q("Connection", "Detected no buffering proxy");
        })), setTimeout((function() {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            h.vi();
        }), 0), h;
    }, n;
}(/** @class */ function() {
    function t(t) {
        this.databaseInfo = t, this.databaseId = t.databaseId;
        var e = t.ssl ? "https" : "http";
        this.Di = e + "://" + t.host, this.Ci = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
    }
    return t.prototype.Ni = function(t, e, n, r) {
        var i = this.xi(t, e);
        q("RestConnection", "Sending: ", i, n);
        var o = {};
        return this.ki(o, r), this.$i(t, i, o, n).then((function(t) {
            return q("RestConnection", "Received: ", t), t;
        }), (function(e) {
            throw B("RestConnection", t + " failed with error: ", e, "url: ", i, "request:", n), 
            e;
        }));
    }, t.prototype.Oi = function(t, e, n, r) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.Ni(t, e, n, r);
    }, 
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */
    t.prototype.ki = function(t, e) {
        if (t["X-Goog-Api-Client"] = "gl-js/ fire/" + R, 
        // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), 
        e) for (var n in e.authHeaders) e.authHeaders.hasOwnProperty(n) && (t[n] = e.authHeaders[n]);
    }, t.prototype.xi = function(t, e) {
        var n = Oo[t];
        return this.Di + "/v1/" + e + ":" + n;
    }, t;
}());

/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
// Visible for testing
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
/** Initializes the WebChannelConnection for the browser. */
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
/** The Platform's 'window' implementation or null if not available. */
function Mo() {
    // `window` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof window ? window : null;
}

/** The Platform's 'document' implementation or null if not available. */ function Vo() {
    // `document` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof document ? document : null;
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
 */ function qo(t) {
    return new kn(t, /* useProto3Json= */ !0);
}

/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */ var Uo = /** @class */ function() {
    function t(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    t, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    e, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    n
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */ , r
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */ , i) {
        void 0 === n && (n = 1e3), void 0 === r && (r = 1.5), void 0 === i && (i = 6e4), 
        this.Se = t, this.timerId = e, this.Mi = n, this.Li = r, this.Bi = i, this.Ui = 0, 
        this.qi = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.Ki = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    return t.prototype.reset = function() {
        this.Ui = 0;
    }, 
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    t.prototype.ji = function() {
        this.Ui = this.Bi;
    }, 
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    t.prototype.Qi = function(t) {
        var e = this;
        // Cancel any pending backoff operation.
                this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        var n = Math.floor(this.Ui + this.Wi()), r = Math.max(0, Date.now() - this.Ki), i = Math.max(0, n - r);
        // Guard against lastAttemptTime being in the future due to a clock change.
                i > 0 && q("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.Ui + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), 
        this.qi = this.Se.enqueueAfterDelay(this.timerId, i, (function() {
            return e.Ki = Date.now(), t();
        })), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.Ui *= this.Li, this.Ui < this.Mi && (this.Ui = this.Mi), this.Ui > this.Bi && (this.Ui = this.Bi);
    }, t.prototype.Gi = function() {
        null !== this.qi && (this.qi.skipDelay(), this.qi = null);
    }, t.prototype.cancel = function() {
        null !== this.qi && (this.qi.cancel(), this.qi = null);
    }, 
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */ t.prototype.Wi = function() {
        return (Math.random() - .5) * this.Ui;
    }, t;
}(), Bo = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.Se = t, this.zi = n, this.Hi = r, this.Ji = i, this.listener = o, this.state = 0 /* Initial */ , 
        /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
        this.Yi = 0, this.Xi = null, this.stream = null, this.Zi = new Uo(t, e)
        /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */;
    }
    return t.prototype.tr = function() {
        return 1 /* Starting */ === this.state || 2 /* Open */ === this.state || 4 /* Backoff */ === this.state;
    }, 
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */
    t.prototype.er = function() {
        return 2 /* Open */ === this.state;
    }, 
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */
    t.prototype.start = function() {
        3 /* Error */ !== this.state ? this.auth() : this.nr();
    }, 
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */
    t.prototype.stop = function() {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.tr() ? [ 4 /*yield*/ , this.close(0 /* Initial */) ] : [ 3 /*break*/ , 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */
    t.prototype.sr = function() {
        this.state = 0 /* Initial */ , this.Zi.reset();
    }, 
    /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */
    t.prototype.ir = function() {
        var t = this;
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
                this.er() && null === this.Xi && (this.Xi = this.Se.enqueueAfterDelay(this.zi, 6e4, (function() {
            return t.rr();
        })));
    }, 
    /** Sends a message to the underlying stream. */ t.prototype.cr = function(t) {
        this.ur(), this.stream.send(t);
    }, 
    /** Called by the idle timer when the stream should close due to inactivity. */ t.prototype.rr = function() {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(t) {
                return this.er() ? [ 2 /*return*/ , this.close(0 /* Initial */) ] : [ 2 /*return*/ ];
            }));
        }));
    }, 
    /** Marks the stream as active again. */ t.prototype.ur = function() {
        this.Xi && (this.Xi.cancel(), this.Xi = null);
    }, 
    /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState - the intended state of the stream after closing.
     * @param error - the error the connection was closed with.
     */
    t.prototype.close = function(t, e) {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(n) {
                switch (n.label) {
                  case 0:
                    // Notify the listener that the stream closed.
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    return this.ur(), this.Zi.cancel(), 
                    // Invalidates any stream-related callbacks (e.g. from auth or the
                    // underlying stream), guaranteeing they won't execute.
                    this.Yi++, 3 /* Error */ !== t ? 
                    // If this is an intentional close ensure we don't delay our next connection attempt.
                    this.Zi.reset() : e && e.code === O.RESOURCE_EXHAUSTED ? (
                    // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                    U(e.toString()), U("Using maximum backoff delay to prevent overloading the backend."), 
                    this.Zi.ji()) : e && e.code === O.UNAUTHENTICATED && 
                    // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
                    // just expired.
                    this.Ji.invalidateToken(), 
                    // Clean up the underlying stream because we are no longer interested in events.
                    null !== this.stream && (this.ar(), this.stream.close(), this.stream = null), 
                    // This state must be assigned before calling onClose() to allow the callback to
                    // inhibit backoff or otherwise manipulate the state in its non-started state.
                    this.state = t, [ 4 /*yield*/ , this.listener.Ri(e) ];

                  case 1:
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    // Notify the listener that the stream closed.
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */
    t.prototype.ar = function() {}, t.prototype.auth = function() {
        var t = this;
        this.state = 1 /* Starting */;
        var e = this.hr(this.Yi), n = this.Yi;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                this.Ji.getToken().then((function(e) {
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
            t.Yi === n && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            t.lr(e);
        }), (function(n) {
            e((function() {
                var e = new P(O.UNKNOWN, "Fetching auth token failed: " + n.message);
                return t.dr(e);
            }));
        }));
    }, t.prototype.lr = function(t) {
        var e = this, n = this.hr(this.Yi);
        this.stream = this.wr(t), this.stream.Ii((function() {
            n((function() {
                return e.state = 2 /* Open */ , e.listener.Ii();
            }));
        })), this.stream.Ri((function(t) {
            n((function() {
                return e.dr(t);
            }));
        })), this.stream.onMessage((function(t) {
            n((function() {
                return e.onMessage(t);
            }));
        }));
    }, t.prototype.nr = function() {
        var t = this;
        this.state = 4 /* Backoff */ , this.Zi.Qi((function() {
            return n(t, void 0, void 0, (function() {
                return r(this, (function(t) {
                    return this.state = 0 /* Initial */ , this.start(), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, 
    // Visible for tests
    t.prototype.dr = function(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return q("PersistentStream", "close with error: " + t), this.stream = null, this.close(3 /* Error */ , t);
    }, 
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */
    t.prototype.hr = function(t) {
        var e = this;
        return function(n) {
            e.Se.enqueueAndForget((function() {
                return e.Yi === t ? n() : (q("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve());
            }));
        };
    }, t;
}(), jo = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        var s = this;
        return (s = e.call(this, t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , n, r, o) || this).R = i, 
        s;
    }
    return t(n, e), n.prototype.wr = function(t) {
        return this.Hi.Fi("Listen", t);
    }, n.prototype.onMessage = function(t) {
        // A successful response means the stream is healthy
        this.Zi.reset();
        var e = function(t, e) {
            var n;
            if ("targetChange" in e) {
                e.targetChange;
                // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
                // if unset
                var r = function(t) {
                    return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : K();
                }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], o = function(t, e) {
                    return t.I ? (G(void 0 === e || "string" == typeof e), ut.fromBase64String(e || "")) : (G(void 0 === e || e instanceof Uint8Array), 
                    ut.fromUint8Array(e || new Uint8Array));
                }(t, e.targetChange.resumeToken), s = e.targetChange.cause, u = s && function(t) {
                    var e = void 0 === t.code ? O.UNKNOWN : en(t.code);
                    return new P(e, t.message || "");
                }(s);
                n = new Tn(r, i, o, u || null);
            } else if ("documentChange" in e) {
                e.documentChange;
                var a = e.documentChange;
                a.document, a.document.name, a.document.updateTime;
                var c = Mn(t, a.document.name), h = Ln(a.document.updateTime), f = new Lt({
                    mapValue: {
                        fields: a.document.fields
                    }
                }), l = Pt.newFoundDocument(c, h, f), d = a.targetIds || [], p = a.removedTargetIds || [];
                n = new bn(d, p, l.key, l);
            } else if ("documentDelete" in e) {
                e.documentDelete;
                var y = e.documentDelete;
                y.document;
                var v = Mn(t, y.document), m = y.readTime ? Ln(y.readTime) : J.min(), g = Pt.newNoDocument(v, m), w = y.removedTargetIds || [];
                n = new bn([], w, g.key, g);
            } else if ("documentRemove" in e) {
                e.documentRemove;
                var b = e.documentRemove;
                b.document;
                var I = Mn(t, b.document), T = b.removedTargetIds || [];
                n = new bn([], T, I, null);
            } else {
                if (!("filter" in e)) return K();
                e.filter;
                var E = e.filter;
                E.targetId;
                var S = E.count || 0, _ = new Ze(S), N = E.targetId;
                n = new In(N, _);
            }
            return n;
        }(this.R, t), n = function(t) {
            // We have only reached a consistent snapshot for the entire stream if there
            // is a read_time set and it applies to all targets (i.e. the list of
            // targets is empty). The backend is guaranteed to send such responses.
            if (!("targetChange" in t)) return J.min();
            var e = t.targetChange;
            return e.targetIds && e.targetIds.length ? J.min() : e.readTime ? Ln(e.readTime) : J.min();
        }(t);
        return this.listener._r(e, n);
    }, 
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */
    n.prototype.mr = function(t) {
        var e = {};
        e.database = Un(this.R), e.addTarget = function(t, e) {
            var n, r = e.target;
            return (n = Ut(r) ? {
                documents: Qn(t, r)
            } : {
                query: Wn(t, r)
            }).targetId = e.targetId, e.resumeToken.approximateByteSize() > 0 ? n.resumeToken = xn(t, e.resumeToken) : e.snapshotVersion.compareTo(J.min()) > 0 && (
            // TODO(wuandy): Consider removing above check because it is most likely true.
            // Right now, many tests depend on this behaviour though (leaving min() out
            // of serialization).
            n.readTime = Cn(t, e.snapshotVersion.toTimestamp())), n;
        }(this.R, t);
        var n = function(t, e) {
            var n = function(t, e) {
                switch (e) {
                  case 0 /* Listen */ :
                    return null;

                  case 1 /* ExistenceFilterMismatch */ :
                    return "existence-filter-mismatch";

                  case 2 /* LimboResolution */ :
                    return "limbo-document";

                  default:
                    return K();
                }
            }(0, e.purpose);
            return null == n ? null : {
                "goog-listen-tags": n
            };
        }(this.R, t);
        n && (e.labels = n), this.cr(e);
    }, 
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */
    n.prototype.gr = function(t) {
        var e = {};
        e.database = Un(this.R), e.removeTarget = t, this.cr(e);
    }, n;
}(Bo), Ko = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        var s = this;
        return (s = e.call(this, t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , n, r, o) || this).R = i, 
        s.yr = !1, s;
    }
    return t(n, e), Object.defineProperty(n.prototype, "pr", {
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */
        get: function() {
            return this.yr;
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Override of PersistentStream.start
    n.prototype.start = function() {
        this.yr = !1, this.lastStreamToken = void 0, e.prototype.start.call(this);
    }, n.prototype.ar = function() {
        this.yr && this.Er([]);
    }, n.prototype.wr = function(t) {
        return this.Hi.Fi("Write", t);
    }, n.prototype.onMessage = function(t) {
        if (
        // Always capture the last stream token.
        G(!!t.streamToken), this.lastStreamToken = t.streamToken, this.yr) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.Zi.reset();
            var e = function(t, e) {
                return t && t.length > 0 ? (G(void 0 !== e), t.map((function(t) {
                    return function(t, e) {
                        // NOTE: Deletes don't have an updateTime.
                        var n = t.updateTime ? Ln(t.updateTime) : Ln(e);
                        return n.isEqual(J.min()) && (
                        // The Firestore Emulator currently returns an update time of 0 for
                        // deletes of non-existing documents (rather than null). This breaks the
                        // test "get deleted doc while offline with source=cache" as NoDocuments
                        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
                        // TODO(#2149): Remove this when Emulator is fixed
                        n = Ln(e)), new Pe(n, t.transformResults || []);
                    }(t, e);
                }))) : [];
            }(t.writeResults, t.commitTime), n = Ln(t.commitTime);
            return this.listener.Tr(n, e);
        }
        // The first response is always the handshake response
                return G(!t.writeResults || 0 === t.writeResults.length), this.yr = !0, 
        this.listener.Ir();
    }, 
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */
    n.prototype.Ar = function() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        var t = {};
        t.database = Un(this.R), this.cr(t);
    }, 
    /** Sends a group of mutations to the Firestore backend to apply. */ n.prototype.Er = function(t) {
        var e = this, n = {
            streamToken: this.lastStreamToken,
            writes: t.map((function(t) {
                return Gn(e.R, t);
            }))
        };
        this.cr(n);
    }, n;
}(Bo), Go = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).credentials = t, i.Hi = n, i.R = r, i.Rr = !1, 
        i;
    }
    return t(n, e), n.prototype.Pr = function() {
        if (this.Rr) throw new P(O.FAILED_PRECONDITION, "The client has already been terminated.");
    }, 
    /** Gets an auth token and invokes the provided RPC. */ n.prototype.Ni = function(t, e, n) {
        var r = this;
        return this.Pr(), this.credentials.getToken().then((function(i) {
            return r.Hi.Ni(t, e, n, i);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === O.UNAUTHENTICATED && r.credentials.invalidateToken(), 
            t) : new P(O.UNKNOWN, t.toString());
        }));
    }, 
    /** Gets an auth token and invokes the provided RPC with streamed results. */ n.prototype.Oi = function(t, e, n) {
        var r = this;
        return this.Pr(), this.credentials.getToken().then((function(i) {
            return r.Hi.Oi(t, e, n, i);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === O.UNAUTHENTICATED && r.credentials.invalidateToken(), 
            t) : new P(O.UNKNOWN, t.toString());
        }));
    }, n.prototype.terminate = function() {
        this.Rr = !0;
    }, n;
}((function() {})), zo = /** @class */ function() {
    function t(t, e) {
        this.asyncQueue = t, this.onlineStateHandler = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
        this.br = 0, 
        /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
        this.vr = null, 
        /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
        this.Vr = !0
        /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */;
    }
    return t.prototype.Sr = function() {
        var t = this;
        0 === this.br && (this.Dr("Unknown" /* Unknown */), this.vr = this.asyncQueue.enqueueAfterDelay("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (function() {
            return t.vr = null, t.Cr("Backend didn't respond within 10 seconds."), t.Dr("Offline" /* Offline */), 
            Promise.resolve();
        })));
    }, 
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    t.prototype.Nr = function(t) {
        "Online" /* Online */ === this.state ? this.Dr("Unknown" /* Unknown */) : (this.br++, 
        this.br >= 1 && (this.kr(), this.Cr("Connection failed 1 times. Most recent error: " + t.toString()), 
        this.Dr("Offline" /* Offline */)));
    }, 
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    t.prototype.set = function(t) {
        this.kr(), this.br = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.Vr = !1), this.Dr(t);
    }, t.prototype.Dr = function(t) {
        t !== this.state && (this.state = t, this.onlineStateHandler(t));
    }, t.prototype.Cr = function(t) {
        var e = "Could not reach Cloud Firestore backend. " + t + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
        this.Vr ? (U(e), this.Vr = !1) : q("OnlineStateTracker", e);
    }, t.prototype.kr = function() {
        null !== this.vr && (this.vr.cancel(), this.vr = null);
    }, t;
}(), Qo = function(
/**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
t, 
/** The client-side proxy for interacting with the backend. */
e, i, o, s) {
    var u = this;
    this.localStore = t, this.datastore = e, this.asyncQueue = i, this.remoteSyncer = {}, 
    /**
             * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
             * LocalStore via fillWritePipeline() and have or will send to the write
             * stream.
             *
             * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
             * restart the write stream. When the stream is established the writes in the
             * pipeline will be sent in order.
             *
             * Writes remain in writePipeline until they are acknowledged by the backend
             * and thus will automatically be re-sent if the stream is interrupted /
             * restarted before they're acknowledged.
             *
             * Write responses from the backend are linked to their originating request
             * purely based on order, and so we can just shift() writes from the front of
             * the writePipeline as we receive responses.
             */
    this.$r = [], 
    /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
    this.Or = new Map, 
    /**
             * A set of reasons for why the RemoteStore may be offline. If empty, the
             * RemoteStore may start its network connections.
             */
    this.Fr = new Set, 
    /**
             * Event handlers that get called when the network is disabled or enabled.
             *
             * PORTING NOTE: These functions are used on the Web client to create the
             * underlying streams (to support tree-shakeable streams). On Android and iOS,
             * the streams are created during construction of RemoteStore.
             */
    this.Mr = [], this.Lr = s, this.Lr.di((function(t) {
        i.enqueueAndForget((function() {
            return n(u, void 0, void 0, (function() {
                return r(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return es(this) ? (q("RemoteStore", "Restarting streams for network reachability change."), 
                        [ 4 /*yield*/ , function(t) {
                            return n(this, void 0, void 0, (function() {
                                var e;
                                return r(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return (e = z(t)).Fr.add(4 /* ConnectivityChange */), [ 4 /*yield*/ , Ho(e) ];

                                      case 1:
                                        return n.sent(), e.Br.set("Unknown" /* Unknown */), e.Fr.delete(4 /* ConnectivityChange */), 
                                        [ 4 /*yield*/ , Wo(e) ];

                                      case 2:
                                        return n.sent(), [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }(this) ]) : [ 3 /*break*/ , 2 ];

                      case 1:
                        t.sent(), t.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    })), this.Br = new zo(i, o);
};

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
 * A PersistentStream is an abstract base class that represents a streaming RPC
 * to the Firestore backend. It's built on top of the connections own support
 * for streaming RPCs, and adds several critical features for our clients:
 *
 *   - Exponential backoff on failure
 *   - Authentication via CredentialsProvider
 *   - Dispatching all callbacks into the shared worker queue
 *   - Closing idle streams after 60 seconds of inactivity
 *
 * Subclasses of PersistentStream implement serialization of models to and
 * from the JSON representation of the protocol buffers for a specific
 * streaming RPC.
 *
 * ## Starting and Stopping
 *
 * Streaming RPCs are stateful and need to be start()ed before messages can
 * be sent and received. The PersistentStream will call the onOpen() function
 * of the listener once the stream is ready to accept requests.
 *
 * Should a start() fail, PersistentStream will call the registered onClose()
 * listener with a FirestoreError indicating what went wrong.
 *
 * A PersistentStream can be started and stopped repeatedly.
 *
 * Generic types:
 *  SendType: The type of the outgoing message of the underlying
 *    connection stream
 *  ReceiveType: The type of the incoming message of the underlying
 *    connection stream
 *  ListenerType: The type of the listener that will be used for callbacks
 */ function Wo(t) {
    return n(this, void 0, void 0, (function() {
        var e, n;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                if (!es(t)) return [ 3 /*break*/ , 4 ];
                e = 0, n = t.Mr, r.label = 1;

              case 1:
                return e < n.length ? [ 4 /*yield*/ , (0, n[e])(/* enabled= */ !0) ] : [ 3 /*break*/ , 4 ];

              case 2:
                r.sent(), r.label = 3;

              case 3:
                return e++, [ 3 /*break*/ , 1 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Temporarily disables the network. The network can be re-enabled using
 * enableNetwork().
 */ function Ho(t) {
    return n(this, void 0, void 0, (function() {
        var e, n;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                e = 0, n = t.Mr, r.label = 1;

              case 1:
                return e < n.length ? [ 4 /*yield*/ , (0, n[e])(/* enabled= */ !1) ] : [ 3 /*break*/ , 4 ];

              case 2:
                r.sent(), r.label = 3;

              case 3:
                return e++, [ 3 /*break*/ , 1 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Starts new listen for the given target. Uses resume token if provided. It
 * is a no-op if the target of given `TargetData` is already being listened to.
 */ function Yo(t, e) {
    var n = z(t);
    n.Or.has(e.targetId) || (
    // Mark this as something the client is currently listening for.
    n.Or.set(e.targetId, e), ts(n) ? 
    // The listen will be sent in onWatchStreamOpen
    Zo(n) : vs(n).er() && $o(n, e));
}

/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */ function Xo(t, e) {
    var n = z(t), r = vs(n);
    n.Or.delete(e), r.er() && Jo(n, e), 0 === n.Or.size && (r.er() ? r.ir() : es(n) && 
    // Revert to OnlineState.Unknown if the watch stream is not open and we
    // have no listeners, since without any listens to send we cannot
    // confirm if the stream is healthy and upgrade to OnlineState.Online.
    n.Br.set("Unknown" /* Unknown */));
}

/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */ function $o(t, e) {
    t.Ur.q(e.targetId), vs(t).mr(e)
    /**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */;
}

function Jo(t, e) {
    t.Ur.q(e), vs(t).gr(e);
}

function Zo(t) {
    t.Ur = new Sn({
        getRemoteKeysForTarget: function(e) {
            return t.remoteSyncer.getRemoteKeysForTarget(e);
        },
        lt: function(e) {
            return t.Or.get(e) || null;
        }
    }), vs(t).start(), t.Br.Sr()
    /**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */;
}

function ts(t) {
    return es(t) && !vs(t).tr() && t.Or.size > 0;
}

function es(t) {
    return 0 === z(t).Fr.size;
}

function ns(t) {
    t.Ur = void 0;
}

function rs(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            return t.Or.forEach((function(e, n) {
                $o(t, e);
            })), [ 2 /*return*/ ];
        }));
    }));
}

function is(t, e) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(n) {
            return ns(t), 
            // If we still need the watch stream, retry the connection.
            ts(t) ? (t.Br.Nr(e), Zo(t)) : 
            // No need to restart watch stream because there are no active targets.
            // The online state is set to unknown because there is no active attempt
            // at establishing a connection
            t.Br.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
        }));
    }));
}

function os(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var o, s, u;
        return r(this, (function(a) {
            switch (a.label) {
              case 0:
                if (t.Br.set("Online" /* Online */), !(e instanceof Tn && 2 /* Removed */ === e.state && e.cause)) 
                // Mark the client as online since we got a message from the server
                return [ 3 /*break*/ , 6 ];
                a.label = 1;

              case 1:
                return a.trys.push([ 1, 3, , 5 ]), [ 4 /*yield*/ , 
                /** Handles an error on a target */
                function(t, e) {
                    return n(this, void 0, void 0, (function() {
                        var n, i, o, s;
                        return r(this, (function(r) {
                            switch (r.label) {
                              case 0:
                                n = e.cause, i = 0, o = e.targetIds, r.label = 1;

                              case 1:
                                return i < o.length ? (s = o[i], t.Or.has(s) ? [ 4 /*yield*/ , t.remoteSyncer.rejectListen(s, n) ] : [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 5 ];

                              case 2:
                                r.sent(), t.Or.delete(s), t.Ur.removeTarget(s), r.label = 3;

                              case 3:
                                r.label = 4;

                              case 4:
                                return i++, [ 3 /*break*/ , 1 ];

                              case 5:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(t, e) ];

              case 2:
                return a.sent(), [ 3 /*break*/ , 5 ];

              case 3:
                return o = a.sent(), q("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), o), 
                [ 4 /*yield*/ , ss(t, o) ];

              case 4:
                return a.sent(), [ 3 /*break*/ , 5 ];

              case 5:
                return [ 3 /*break*/ , 13 ];

              case 6:
                if (e instanceof bn ? t.Ur.X(e) : e instanceof In ? t.Ur.rt(e) : t.Ur.et(e), i.isEqual(J.min())) return [ 3 /*break*/ , 13 ];
                a.label = 7;

              case 7:
                return a.trys.push([ 7, 11, , 13 ]), [ 4 /*yield*/ , Ji(t.localStore) ];

              case 8:
                return s = a.sent(), i.compareTo(s) >= 0 ? [ 4 /*yield*/ , 
                /**
                 * Takes a batch of changes from the Datastore, repackages them as a
                 * RemoteEvent, and passes that on to the listener, which is typically the
                 * SyncEngine.
                 */
                function(t, e) {
                    var n = t.Ur.ut(e);
                    // Update in-memory resume tokens. LocalStore will update the
                    // persistent view of these when applying the completed RemoteEvent.
                                        return n.targetChanges.forEach((function(n, r) {
                        if (n.resumeToken.approximateByteSize() > 0) {
                            var i = t.Or.get(r);
                            // A watched target might have been removed already.
                                                        i && t.Or.set(r, i.withResumeToken(n.resumeToken, e));
                        }
                    })), 
                    // Re-establish listens for the targets that have been invalidated by
                    // existence filter mismatches.
                    n.targetMismatches.forEach((function(e) {
                        var n = t.Or.get(e);
                        if (n) {
                            // Clear the resume token for the target, since we're in a known mismatch
                            // state.
                            t.Or.set(e, n.withResumeToken(ut.EMPTY_BYTE_STRING, n.snapshotVersion)), 
                            // Cause a hard reset by unwatching and rewatching immediately, but
                            // deliberately don't send a resume token so that we get a full update.
                            Jo(t, e);
                            // Mark the target we send as being on behalf of an existence filter
                            // mismatch, but don't actually retain that in listenTargets. This ensures
                            // that we flag the first re-listen this way without impacting future
                            // listens of this target (that might happen e.g. on reconnect).
                            var r = new Gr(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                            $o(t, r);
                        }
                    })), t.remoteSyncer.applyRemoteEvent(n);
                }(t, i) ] : [ 3 /*break*/ , 10 ];

                // We have received a target change with a global snapshot if the snapshot
                // version is not equal to SnapshotVersion.min().
                              case 9:
                // We have received a target change with a global snapshot if the snapshot
                // version is not equal to SnapshotVersion.min().
                a.sent(), a.label = 10;

              case 10:
                return [ 3 /*break*/ , 13 ];

              case 11:
                return q("RemoteStore", "Failed to raise snapshot:", u = a.sent()), [ 4 /*yield*/ , ss(t, u) ];

              case 12:
                return a.sent(), [ 3 /*break*/ , 13 ];

              case 13:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Recovery logic for IndexedDB errors that takes the network offline until
 * `op` succeeds. Retries are scheduled with backoff using
 * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
 * validated via a generic operation.
 *
 * The returned Promise is resolved once the network is disabled and before
 * any retry attempt.
 */ function ss(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var o = this;
        return r(this, (function(s) {
            switch (s.label) {
              case 0:
                if (!Pr(e)) throw e;
                // Disable network and raise offline snapshots
                return t.Fr.add(1 /* IndexedDbFailed */), [ 4 /*yield*/ , Ho(t) ];

              case 1:
                // Disable network and raise offline snapshots
                return s.sent(), t.Br.set("Offline" /* Offline */), i || (
                // Use a simple read operation to determine if IndexedDB recovered.
                // Ideally, we would expose a health check directly on SimpleDb, but
                // RemoteStore only has access to persistence through LocalStore.
                i = function() {
                    return Ji(t.localStore);
                }), 
                // Probe IndexedDB periodically and re-enable network
                t.asyncQueue.enqueueRetryable((function() {
                    return n(o, void 0, void 0, (function() {
                        return r(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return q("RemoteStore", "Retrying IndexedDB access"), [ 4 /*yield*/ , i() ];

                              case 1:
                                return e.sent(), t.Fr.delete(1 /* IndexedDbFailed */), [ 4 /*yield*/ , Wo(t) ];

                              case 2:
                                return e.sent(), [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Executes `op`. If `op` fails, takes the network offline until `op`
 * succeeds. Returns after the first attempt.
 */ function us(t, e) {
    return e().catch((function(n) {
        return ss(t, n, e);
    }));
}

function as(t) {
    return n(this, void 0, void 0, (function() {
        var e, n, i, o, s;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                e = z(t), n = ms(e), i = e.$r.length > 0 ? e.$r[e.$r.length - 1].batchId : -1, r.label = 1;

              case 1:
                if (!
                /**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */
                function(t) {
                    return es(t) && t.$r.length < 10;
                }
                /**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */ (e)) return [ 3 /*break*/ , 7 ];
                r.label = 2;

              case 2:
                return r.trys.push([ 2, 4, , 6 ]), [ 4 /*yield*/ , eo(e.localStore, i) ];

              case 3:
                return null === (o = r.sent()) ? (0 === e.$r.length && n.ir(), [ 3 /*break*/ , 7 ]) : (i = o.batchId, 
                function(t, e) {
                    t.$r.push(e);
                    var n = ms(t);
                    n.er() && n.pr && n.Er(e.mutations);
                }(e, o), [ 3 /*break*/ , 6 ]);

              case 4:
                return s = r.sent(), [ 4 /*yield*/ , ss(e, s) ];

              case 5:
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 3 /*break*/ , 1 ];

              case 7:
                return cs(e) && hs(e), [ 2 /*return*/ ];
            }
        }));
    }));
}

function cs(t) {
    return es(t) && !ms(t).tr() && t.$r.length > 0;
}

function hs(t) {
    ms(t).start();
}

function fs(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            return ms(t).Ar(), [ 2 /*return*/ ];
        }));
    }));
}

function ls(t) {
    return n(this, void 0, void 0, (function() {
        var e, n, i, o;
        return r(this, (function(r) {
            // Send the write pipeline now that the stream is established.
            for (e = ms(t), n = 0, i = t.$r; n < i.length; n++) o = i[n], e.Er(o.mutations);
            return [ 2 /*return*/ ];
        }));
    }));
}

function ds(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = t.$r.shift(), o = Kr.from(n, e, i), [ 4 /*yield*/ , us(t, (function() {
                    return t.remoteSyncer.applySuccessfulWrite(o);
                })) ];

              case 1:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return r.sent(), [ 4 /*yield*/ , as(t) ];

              case 2:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return r.sent(), [ 2 /*return*/ ];
            }
        }));
    }));
}

function ps(t, e) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(i) {
            switch (i.label) {
              case 0:
                return e && ms(t).pr ? [ 4 /*yield*/ , function(t, e) {
                    return n(this, void 0, void 0, (function() {
                        var n, i;
                        return r(this, (function(r) {
                            switch (r.label) {
                              case 0:
                                return tn(i = e.code) && i !== O.ABORTED ? (n = t.$r.shift(), 
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                ms(t).sr(), [ 4 /*yield*/ , us(t, (function() {
                                    return t.remoteSyncer.rejectFailedWrite(n.batchId, e);
                                })) ]) : [ 3 /*break*/ , 3 ];

                              case 1:
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                return r.sent(), [ 4 /*yield*/ , as(t) ];

                              case 2:
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                r.sent(), r.label = 3;

                              case 3:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(t, e) ] : [ 3 /*break*/ , 2 ];

                // This error affects the actual write.
                              case 1:
                // This error affects the actual write.
                i.sent(), i.label = 2;

              case 2:
                // If the write stream closed after the write handshake completes, a write
                // operation failed and we fail the pending operation.
                // The write stream might have been started by refilling the write
                // pipeline for failed writes
                return cs(t) && hs(t), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Toggles the network state when the client gains or loses its primary lease.
 */ function ys(t, e) {
    return n(this, void 0, void 0, (function() {
        var n;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = z(t), e ? (n.Fr.delete(2 /* IsSecondary */), [ 4 /*yield*/ , Wo(n) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return r.sent(), [ 3 /*break*/ , 5 ];

              case 2:
                return e ? [ 3 /*break*/ , 4 ] : (n.Fr.add(2 /* IsSecondary */), [ 4 /*yield*/ , Ho(n) ]);

              case 3:
                r.sent(), n.Br.set("Unknown" /* Unknown */), r.label = 4;

              case 4:
                r.label = 5;

              case 5:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * If not yet initialized, registers the WatchStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */ function vs(t) {
    var e = this;
    return t.qr || (
    // Create stream (but note that it is not started yet).
    t.qr = function(t, e, n) {
        var r = z(t);
        return r.Pr(), new jo(e, r.Hi, r.credentials, r.R, n);
    }(t.datastore, t.asyncQueue, {
        Ii: rs.bind(null, t),
        Ri: is.bind(null, t),
        _r: os.bind(null, t)
    }), t.Mr.push((function(i) {
        return n(e, void 0, void 0, (function() {
            return r(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.qr.sr(), ts(t) ? Zo(t) : t.Br.set("Unknown" /* Unknown */), [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    return [ 4 /*yield*/ , t.qr.stop() ];

                  case 2:
                    e.sent(), ns(t), e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }))), t.qr
    /**
 * If not yet initialized, registers the WriteStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */;
}

function ms(t) {
    var e = this;
    return t.Kr || (
    // Create stream (but note that it is not started yet).
    t.Kr = function(t, e, n) {
        var r = z(t);
        return r.Pr(), new Ko(e, r.Hi, r.credentials, r.R, n);
    }(t.datastore, t.asyncQueue, {
        Ii: fs.bind(null, t),
        Ri: ps.bind(null, t),
        Ir: ls.bind(null, t),
        Tr: ds.bind(null, t)
    }), t.Mr.push((function(i) {
        return n(e, void 0, void 0, (function() {
            return r(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.Kr.sr(), [ 4 /*yield*/ , as(t) ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    // This will start the write stream if necessary.
                    return e.sent(), [ 3 /*break*/ , 4 ];

                  case 2:
                    return [ 4 /*yield*/ , t.Kr.stop() ];

                  case 3:
                    e.sent(), t.$r.length > 0 && (q("RemoteStore", "Stopping write stream with " + t.$r.length + " pending writes"), 
                    t.$r = []), e.label = 4;

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }))), t.Kr
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
 */;
}

var gs = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = i, 
        this.deferred = new kr, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.deferred.promise.catch((function(t) {}))
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
     */;
    }
    return t.createAndSchedule = function(e, n, r, i, o) {
        var s = new t(e, n, Date.now() + r, i, o);
        return s.start(r), s;
    }, 
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    t.prototype.start = function(t) {
        var e = this;
        this.timerHandle = setTimeout((function() {
            return e.handleDelayElapsed();
        }), t);
    }, 
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    t.prototype.skipDelay = function() {
        return this.handleDelayElapsed();
    }, 
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    t.prototype.cancel = function(t) {
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new P(O.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }, t.prototype.handleDelayElapsed = function() {
        var t = this;
        this.asyncQueue.enqueueAndForget((function() {
            return null !== t.timerHandle ? (t.clearTimeout(), t.op().then((function(e) {
                return t.deferred.resolve(e);
            }))) : Promise.resolve();
        }));
    }, t.prototype.clearTimeout = function() {
        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), 
        this.timerHandle = null);
    }, t;
}();

/**
 * Returns a FirestoreError that can be surfaced to the user if the provided
 * error is an IndexedDbTransactionError. Re-throws the error otherwise.
 */ function ws(t, e) {
    if (U("AsyncQueue", e + ": " + t), Pr(t)) return new P(O.UNAVAILABLE, e + ": " + t);
    throw t;
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
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */ var bs = /** @class */ function() {
    /** The default ordering is by key if the comparator is omitted */
    function t(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.comparator = t ? function(e, n) {
            return t(e, n) || gt.comparator(e.key, n.key);
        } : function(t, e) {
            return gt.comparator(t.key, e.key);
        }, this.keyedMap = fn(), this.sortedSet = new nn(this.comparator)
        /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */;
    }
    return t.emptySet = function(e) {
        return new t(e.comparator);
    }, t.prototype.has = function(t) {
        return null != this.keyedMap.get(t);
    }, t.prototype.get = function(t) {
        return this.keyedMap.get(t);
    }, t.prototype.first = function() {
        return this.sortedSet.minKey();
    }, t.prototype.last = function() {
        return this.sortedSet.maxKey();
    }, t.prototype.isEmpty = function() {
        return this.sortedSet.isEmpty();
    }, 
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    t.prototype.indexOf = function(t) {
        var e = this.keyedMap.get(t);
        return e ? this.sortedSet.indexOf(e) : -1;
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.sortedSet.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /** Iterates documents in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.sortedSet.inorderTraversal((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Inserts or updates a document with the same key */ t.prototype.add = function(t) {
        // First remove the element if we have it.
        var e = this.delete(t.key);
        return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null));
    }, 
    /** Deletes a document with a given key */ t.prototype.delete = function(t) {
        var e = this.get(t);
        return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.sortedSet.getIterator(), r = e.sortedSet.getIterator(); n.hasNext(); ) {
            var i = n.getNext().key, o = r.getNext().key;
            if (!i.isEqual(o)) return !1;
        }
        return !0;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e.toString());
        })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }, t.prototype.copy = function(e, n) {
        var r = new t;
        return r.comparator = this.comparator, r.keyedMap = e, r.sortedSet = n, r;
    }, t;
}(), Is = /** @class */ function() {
    function t() {
        this.jr = new nn(gt.comparator);
    }
    return t.prototype.track = function(t) {
        var e = t.doc.key, n = this.jr.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.jr = this.jr.insert(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.jr = this.jr.insert(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.jr = this.jr.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.jr = this.jr.insert(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.jr = this.jr.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.jr = this.jr.insert(e, {
            type: 1 /* Removed */ ,
            doc: n.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.jr = this.jr.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        K() : this.jr = this.jr.insert(e, t);
    }, t.prototype.Qr = function() {
        var t = [];
        return this.jr.inorderTraversal((function(e, n) {
            t.push(n);
        })), t;
    }, t;
}(), Ts = /** @class */ function() {
    function t(t, e, n, r, i, o, s, u) {
        this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, 
        this.fromCache = o, this.syncStateChanged = s, this.excludesMetadataChanges = u
        /** Returns a view snapshot as if all documents in the snapshot were added. */;
    }
    return t.fromInitialDocuments = function(e, n, r, i) {
        var o = [];
        return n.forEach((function(t) {
            o.push({
                type: 0 /* Added */ ,
                doc: t
            });
        })), new t(e, n, bs.emptySet(n), o, r, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }, Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return !this.mutatedKeys.isEmpty();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && de(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
        var e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
        return !0;
    }, t;
}(), Es = function() {
    this.Wr = void 0, this.listeners = [];
}, Ss = function() {
    this.queries = new Ci((function(t) {
        return pe(t);
    }), de), this.onlineState = "Unknown" /* Unknown */ , this.Gr = new Set;
};

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
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */ function _s(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u, a, c;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                if (n = z(t), i = e.query, o = !1, (s = n.queries.get(i)) || (o = !0, s = new Es), 
                !o) return [ 3 /*break*/ , 4 ];
                r.label = 1;

              case 1:
                return r.trys.push([ 1, 3, , 4 ]), u = s, [ 4 /*yield*/ , n.onListen(i) ];

              case 2:
                return u.Wr = r.sent(), [ 3 /*break*/ , 4 ];

              case 3:
                return a = r.sent(), c = ws(a, "Initialization of query '" + ye(e.query) + "' failed"), 
                [ 2 /*return*/ , void e.onError(c) ];

              case 4:
                return n.queries.set(i, s), s.listeners.push(e), 
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                e.zr(n.onlineState), s.Wr && e.Hr(s.Wr) && ks(n), [ 2 /*return*/ ];
            }
        }));
    }));
}

function Ns(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u;
        return r(this, (function(r) {
            return n = z(t), i = e.query, o = !1, (s = n.queries.get(i)) && (u = s.listeners.indexOf(e)) >= 0 && (s.listeners.splice(u, 1), 
            o = 0 === s.listeners.length), o ? [ 2 /*return*/ , (n.queries.delete(i), n.onUnlisten(i)) ] : [ 2 /*return*/ ];
        }));
    }));
}

function Ds(t, e) {
    for (var n = z(t), r = !1, i = 0, o = e; i < o.length; i++) {
        var s = o[i], u = s.query, a = n.queries.get(u);
        if (a) {
            for (var c = 0, h = a.listeners; c < h.length; c++) {
                h[c].Hr(s) && (r = !0);
            }
            a.Wr = s;
        }
    }
    r && ks(n);
}

function As(t, e, n) {
    var r = z(t), i = r.queries.get(e);
    if (i) for (var o = 0, s = i.listeners; o < s.length; o++) {
        s[o].onError(n);
    }
    // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
    // after an error.
        r.queries.delete(e);
}

// Call all global snapshot listeners that have been set.
function ks(t) {
    t.Gr.forEach((function(t) {
        t.next();
    }));
}

/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */ var Cs = /** @class */ function() {
    function t(t, e, n) {
        this.query = t, this.Jr = e, 
        /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
        this.Yr = !1, this.Xr = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {}
        /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */;
    }
    return t.prototype.Hr = function(t) {
        if (!this.options.includeMetadataChanges) {
            for (
            // Remove the metadata only changes.
            var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
                var i = r[n];
                3 /* Metadata */ !== i.type && e.push(i);
            }
            t = new Ts(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, 
            /* excludesMetadataChanges= */ !0);
        }
        var o = !1;
        return this.Yr ? this.Zr(t) && (this.Jr.next(t), o = !0) : this.eo(t, this.onlineState) && (this.no(t), 
        o = !0), this.Xr = t, o;
    }, t.prototype.onError = function(t) {
        this.Jr.error(t);
    }, 
    /** Returns whether a snapshot was raised. */ t.prototype.zr = function(t) {
        this.onlineState = t;
        var e = !1;
        return this.Xr && !this.Yr && this.eo(this.Xr, t) && (this.no(this.Xr), e = !0), 
        e;
    }, t.prototype.eo = function(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                var n = "Offline" /* Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return !(this.options.so && n || t.docs.isEmpty() && "Offline" /* Offline */ !== e);
        // Raise data from cache if we have any documents or we are offline
        }, t.prototype.Zr = function(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        var e = this.Xr && this.Xr.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }, t.prototype.no = function(t) {
        t = Ts.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.Yr = !0, 
        this.Jr.next(t);
    }, t;
}(), xs = /** @class */ function() {
    function t(t, 
    // How many bytes this element takes to store in the bundle.
    e) {
        this.payload = t, this.byteLength = e;
    }
    return t.prototype.io = function() {
        return "metadata" in this.payload;
    }, t;
}(), Rs = /** @class */ function() {
    function t(t) {
        this.R = t;
    }
    return t.prototype.Un = function(t) {
        return Mn(this.R, t);
    }, 
    /**
     * Converts a BundleDocument to a MutableDocument.
     */
    t.prototype.qn = function(t) {
        return t.metadata.exists ? Kn(this.R, t.document, !1) : Pt.newNoDocument(this.Un(t.metadata.name), this.Kn(t.metadata.readTime));
    }, t.prototype.Kn = function(t) {
        return Ln(t);
    }, t;
}(), Ls = /** @class */ function() {
    function t(t, e, n) {
        this.ro = t, this.localStore = e, this.R = n, 
        /** Batched queries to be saved into storage */
        this.queries = [], 
        /** Batched documents to be saved into storage */
        this.documents = [], this.progress = Os(t)
        /**
     * Adds an element from the bundle to the loader.
     *
     * Returns a new progress if adding the element leads to a new progress,
     * otherwise returns null.
     */;
    }
    return t.prototype.oo = function(t) {
        this.progress.bytesLoaded += t.byteLength;
        var e = this.progress.documentsLoaded;
        return t.payload.namedQuery ? this.queries.push(t.payload.namedQuery) : t.payload.documentMetadata ? (this.documents.push({
            metadata: t.payload.documentMetadata
        }), t.payload.documentMetadata.exists || ++e) : t.payload.document && (this.documents[this.documents.length - 1].document = t.payload.document, 
        ++e), e !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = e, 
        Object.assign({}, this.progress)) : null;
    }, t.prototype.co = function(t) {
        for (var e = new Map, n = new Rs(this.R), r = 0, i = t; r < i.length; r++) {
            var o = i[r];
            if (o.metadata.queries) for (var s = n.Un(o.metadata.name), u = 0, a = o.metadata.queries; u < a.length; u++) {
                var c = a[u], h = (e.get(c) || yn()).add(s);
                e.set(c, h);
            }
        }
        return e;
    }, 
    /**
     * Update the progress to 'Success' and return the updated progress.
     */
    t.prototype.complete = function() {
        return n(this, void 0, void 0, (function() {
            var t, e, n, i, o;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return [ 4 /*yield*/ , ao(this.localStore, new Rs(this.R), this.documents, this.ro.id) ];

                  case 1:
                    t = r.sent(), e = this.co(this.documents), n = 0, i = this.queries, r.label = 2;

                  case 2:
                    return n < i.length ? (o = i[n], [ 4 /*yield*/ , co(this.localStore, o, e.get(o.name)) ]) : [ 3 /*break*/ , 5 ];

                  case 3:
                    r.sent(), r.label = 4;

                  case 4:
                    return n++, [ 3 /*break*/ , 2 ];

                  case 5:
                    return [ 2 /*return*/ , (this.progress.taskState = "Success", new Gi(Object.assign({}, this.progress), t)) ];
                }
            }));
        }));
    }, t;
}();

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
 * A complete element in the bundle stream, together with the byte length it
 * occupies in the stream.
 */
/**
 * Returns a `LoadBundleTaskProgress` representing the initial progress of
 * loading a bundle.
 */
function Os(t) {
    return {
        taskState: "Running",
        documentsLoaded: 0,
        bytesLoaded: 0,
        totalDocuments: t.totalDocuments,
        totalBytes: t.totalBytes
    };
}

/**
 * Returns a `LoadBundleTaskProgress` representing the progress that the loading
 * has succeeded.
 */
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
 */ var Ps = function(t) {
    this.key = t;
}, Fs = function(t) {
    this.key = t;
}, Ms = /** @class */ function() {
    function t(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.uo = e, this.ao = null, 
        /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
        this.current = !1, 
        /** Documents in the view but not in the remote target */
        this.ho = yn(), 
        /** Document Keys that have local changes */
        this.mutatedKeys = yn(), this.lo = me(t), this.fo = new bs(this.lo);
    }
    return Object.defineProperty(t.prototype, "wo", {
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */
        get: function() {
            return this.uo;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges - The doc changes to apply to this view.
     * @param previousChanges - If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @returns a new set of docs, changes, and refill flag.
     */
    t.prototype._o = function(t, e) {
        var n = this, r = e ? e.mo : new Is, i = e ? e.fo : this.fo, o = e ? e.mutatedKeys : this.mutatedKeys, s = i, u = !1, a = oe(this.query) && i.size === this.query.limit ? i.last() : null, c = se(this.query) && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.inorderTraversal((function(t, e) {
            var h = i.get(t), f = ve(n.query, e) ? e : null, l = !!h && n.mutatedKeys.has(h.key), d = !!f && (f.hasLocalMutations || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            n.mutatedKeys.has(f.key) && f.hasCommittedMutations), p = !1;
            // Calculate change
            h && f ? h.data.isEqual(f.data) ? l !== d && (r.track({
                type: 3 /* Metadata */ ,
                doc: f
            }), p = !0) : n.yo(h, f) || (r.track({
                type: 2 /* Modified */ ,
                doc: f
            }), p = !0, (a && n.lo(f, a) > 0 || c && n.lo(f, c) < 0) && (
            // This doc moved from inside the limit to outside the limit.
            // That means there may be some other doc in the local cache
            // that should be included instead.
            u = !0)) : !h && f ? (r.track({
                type: 0 /* Added */ ,
                doc: f
            }), p = !0) : h && !f && (r.track({
                type: 1 /* Removed */ ,
                doc: h
            }), p = !0, (a || c) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            u = !0)), p && (f ? (s = s.add(f), o = d ? o.add(t) : o.delete(t)) : (s = s.delete(t), 
            o = o.delete(t)));
        })), oe(this.query) || se(this.query)) for (;s.size > this.query.limit; ) {
            var h = oe(this.query) ? s.last() : s.first();
            s = s.delete(h.key), o = o.delete(h.key), r.track({
                type: 1 /* Removed */ ,
                doc: h
            });
        }
        return {
            fo: s,
            mo: r,
            Nn: u,
            mutatedKeys: o
        };
    }, t.prototype.yo = function(t, e) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
    }, 
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges - The set of changes to make to the view's docs.
     * @param updateLimboDocuments - Whether to update limbo documents based on
     *        this change.
     * @param targetChange - A target change to apply for computing limbo docs and
     *        sync state.
     * @returns A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    t.prototype.applyChanges = function(t, e, n) {
        var r = this, i = this.fo;
        this.fo = t.fo, this.mutatedKeys = t.mutatedKeys;
        // Sort changes based on type and query comparator
        var o = t.mo.Qr();
        o.sort((function(t, e) {
            return function(t, e) {
                var n = function(t) {
                    switch (t) {
                      case 0 /* Added */ :
                        return 1;

                      case 2 /* Modified */ :
                      case 3 /* Metadata */ :
                        // A metadata change is converted to a modified change at the public
                        // api layer.  Since we sort by document key and then change type,
                        // metadata and modified changes must be sorted equivalently.
                        return 2;

                      case 1 /* Removed */ :
                        return 0;

                      default:
                        return K();
                    }
                };
                return n(t) - n(e);
            }(t.type, e.type) || r.lo(t.doc, e.doc);
        })), this.po(n);
        var s = e ? this.Eo() : [], u = 0 === this.ho.size && this.current ? 1 /* Synced */ : 0 /* Local */ , a = u !== this.ao;
        return this.ao = u, 0 !== o.length || a ? {
            snapshot: new Ts(this.query, t.fo, i, o, t.mutatedKeys, 0 /* Local */ === u, a, 
            /* excludesMetadataChanges= */ !1),
            To: s
        } : {
            To: s
        };
        // no changes
        }, 
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    t.prototype.zr = function(t) {
        return this.current && "Offline" /* Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.current = !1, this.applyChanges({
            fo: this.fo,
            mo: new Is,
            mutatedKeys: this.mutatedKeys,
            Nn: !1
        }, 
        /* updateLimboDocuments= */ !1)) : {
            To: []
        };
    }, 
    /**
     * Returns whether the doc for the given key should be in limbo.
     */
    t.prototype.Io = function(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.uo.has(t) && 
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.fo.has(t) && !this.fo.get(t).hasLocalMutations;
    }, 
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    t.prototype.po = function(t) {
        var e = this;
        t && (t.addedDocuments.forEach((function(t) {
            return e.uo = e.uo.add(t);
        })), t.modifiedDocuments.forEach((function(t) {})), t.removedDocuments.forEach((function(t) {
            return e.uo = e.uo.delete(t);
        })), this.current = t.current);
    }, t.prototype.Eo = function() {
        var t = this;
        // We can only determine limbo documents when we're in-sync with the server.
                if (!this.current) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                var e = this.ho;
        this.ho = yn(), this.fo.forEach((function(e) {
            t.Io(e.key) && (t.ho = t.ho.add(e.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        var n = [];
        return e.forEach((function(e) {
            t.ho.has(e) || n.push(new Fs(e));
        })), this.ho.forEach((function(t) {
            e.has(t) || n.push(new Ps(t));
        })), n;
    }, 
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @returns The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Ao = function(t) {
        this.uo = t.Bn, this.ho = yn();
        var e = this._o(t.documents);
        return this.applyChanges(e, /*updateLimboDocuments=*/ !0);
    }, 
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Ro = function() {
        return Ts.fromInitialDocuments(this.query, this.fo, this.mutatedKeys, 0 /* Local */ === this.ao);
    }, t;
}(), Vs = function(
/**
     * The query itself.
     */
t, 
/**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
e, 
/**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
n) {
    this.query = t, this.targetId = e, this.view = n;
}, qs = function(t) {
    this.key = t, 
    /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
    this.Po = !1;
}, Us = /** @class */ function() {
    function t(t, e, n, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    r, i, o) {
        this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = r, 
        this.currentUser = i, this.maxConcurrentLimboResolutions = o, this.bo = {}, this.vo = new Ci((function(t) {
            return pe(t);
        }), de), this.Vo = new Map, 
        /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query. The strings in this set are the result of calling
             * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
             *
             * The `Set` type was chosen because it provides efficient lookup and removal
             * of arbitrary elements and it also maintains insertion order, providing the
             * desired queue-like FIFO semantics.
             */
        this.So = new Set, 
        /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
        this.Do = new nn(gt.comparator), 
        /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
        this.Co = new Map, this.No = new fo, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.xo = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.ko = new Map, this.$o = gi.Yt(), this.onlineState = "Unknown" /* Unknown */ , 
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        this.Oo = void 0;
    }
    return Object.defineProperty(t.prototype, "isPrimaryClient", {
        get: function() {
            return !0 === this.Oo;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}();

/**
 * Initiates the new listen, resolves promise when listen enqueued to the
 * server. All the subsequent view snapshots or errors are sent to the
 * subscribed handlers. Returns the initial snapshot.
 */
function Bs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u, a;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = vu(t), (s = n.vo.get(e)) ? (
                // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
                // already exists when EventManager calls us for the first time. This
                // happens when the primary tab is already listening to this query on
                // behalf of another tab and the user of the primary also starts listening
                // to the query. EventManager will not have an assigned target ID in this
                // case and calls `listen` to obtain this ID.
                i = s.targetId, n.sharedClientState.addLocalQueryTarget(i), o = s.view.Ro(), [ 3 /*break*/ , 4 ]) : [ 3 /*break*/ , 1 ];

              case 1:
                return [ 4 /*yield*/ , no(n.localStore, fe(e)) ];

              case 2:
                return u = r.sent(), a = n.sharedClientState.addLocalQueryTarget(u.targetId), i = u.targetId, 
                [ 4 /*yield*/ , js(n, e, i, "current" === a) ];

              case 3:
                o = r.sent(), n.isPrimaryClient && Yo(n.remoteStore, u), r.label = 4;

              case 4:
                return [ 2 /*return*/ , o ];
            }
        }));
    }));
}

/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */ function js(t, e, i, o) {
    return n(this, void 0, void 0, (function() {
        var s, u, a, c, h, f;
        return r(this, (function(l) {
            switch (l.label) {
              case 0:
                // PORTING NOTE: On Web only, we inject the code that registers new Limbo
                // targets based on view changes. This allows us to only depend on Limbo
                // changes when user code includes queries.
                return t.Fo = function(e, i, o) {
                    return function(t, e, i, o) {
                        return n(this, void 0, void 0, (function() {
                            var n, s, u;
                            return r(this, (function(r) {
                                switch (r.label) {
                                  case 0:
                                    return n = e.view._o(i), n.Nn ? [ 4 /*yield*/ , io(t.localStore, e.query, 
                                    /* usePreviousResults= */ !1).then((function(t) {
                                        var r = t.documents;
                                        return e.view._o(r, n);
                                    })) ] : [ 3 /*break*/ , 2 ];

                                  case 1:
                                    // The query has a limit and some docs were removed, so we need
                                    // to re-run the query against the local store to make sure we
                                    // didn't lose any good docs that had been past the limit.
                                    n = r.sent(), r.label = 2;

                                  case 2:
                                    return s = o && o.targetChanges.get(e.targetId), u = e.view.applyChanges(n, 
                                    /* updateLimboDocuments= */ t.isPrimaryClient, s), [ 2 /*return*/ , (eu(t, e.targetId, u.To), 
                                    u.snapshot) ];
                                }
                            }));
                        }));
                    }(t, e, i, o);
                }, [ 4 /*yield*/ , io(t.localStore, e, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return s = l.sent(), u = new Ms(e, s.Bn), a = u._o(s.documents), c = wn.createSynthesizedTargetChangeForCurrentChange(i, o && "Offline" /* Offline */ !== t.onlineState), 
                h = u.applyChanges(a, 
                /* updateLimboDocuments= */ t.isPrimaryClient, c), eu(t, i, h.To), f = new Vs(e, i, u), 
                [ 2 /*return*/ , (t.vo.set(e, f), t.Vo.has(i) ? t.Vo.get(i).push(e) : t.Vo.set(i, [ e ]), 
                h.snapshot) ];
            }
        }));
    }));
}

/** Stops listening to the query. */ function Ks(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = z(t), i = n.vo.get(e), (o = n.Vo.get(i.targetId)).length > 1 ? [ 2 /*return*/ , (n.Vo.set(i.targetId, o.filter((function(t) {
                    return !de(t, e);
                }))), void n.vo.delete(e)) ] : n.isPrimaryClient ? (
                // We need to remove the local query target first to allow us to verify
                // whether any other client is still interested in this target.
                n.sharedClientState.removeLocalQueryTarget(i.targetId), n.sharedClientState.isActiveQueryTarget(i.targetId) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , ro(n.localStore, i.targetId, 
                /*keepPersistedTargetData=*/ !1).then((function() {
                    n.sharedClientState.clearQueryState(i.targetId), Xo(n.remoteStore, i.targetId), 
                    Zs(n, i.targetId);
                })).catch(Ei) ]) : [ 3 /*break*/ , 3 ];

              case 1:
                r.sent(), r.label = 2;

              case 2:
                return [ 3 /*break*/ , 5 ];

              case 3:
                return Zs(n, i.targetId), [ 4 /*yield*/ , ro(n.localStore, i.targetId, 
                /*keepPersistedTargetData=*/ !0) ];

              case 4:
                r.sent(), r.label = 5;

              case 5:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Initiates the write of local mutation batch which involves adding the
 * writes to the mutation queue, notifying the remote store about new
 * mutations and raising events for any changes this write caused.
 *
 * The promise returned by this call is resolved when the above steps
 * have completed, *not* when the write was acked by the backend. The
 * userCallback is resolved once the write was acked/rejected by the
 * backend (or failed locally for any other reason).
 */ function Gs(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o, s, u;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = mu(t), r.label = 1;

              case 1:
                return r.trys.push([ 1, 5, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n, r = z(t), i = $.now(), o = e.reduce((function(t, e) {
                        return t.add(e.key);
                    }), yn());
                    return r.persistence.runTransaction("Locally write mutations", "readwrite", (function(t) {
                        return r.Mn.pn(t, o).next((function(o) {
                            n = o;
                            for (
                            // For non-idempotent mutations (such as `FieldValue.increment()`),
                            // we record the base state in a separate patch mutation. This is
                            // later used to guarantee consistent values and prevents flicker
                            // even if the backend sends us an update that already includes our
                            // transform.
                            var s = [], u = 0, a = e; u < a.length; u++) {
                                var c = a[u], h = Be(c, n.get(c.key));
                                null != h && 
                                // NOTE: The base state should only be applied if there's some
                                // existing document to override, so use a Precondition of
                                // exists=true
                                s.push(new ze(c.key, h, Ot(h.value.mapValue), Fe.exists(!0)));
                            }
                            return r._n.addMutationBatch(t, i, s, e);
                        }));
                    })).then((function(t) {
                        return t.applyToLocalDocumentSet(n), {
                            batchId: t.batchId,
                            changes: n
                        };
                    }));
                }(n.localStore, e) ];

              case 2:
                return o = r.sent(), n.sharedClientState.addPendingMutation(o.batchId), function(t, e, n) {
                    var r = t.xo[t.currentUser.toKey()];
                    r || (r = new nn(H)), r = r.insert(e, n), t.xo[t.currentUser.toKey()] = r;
                }(n, o.batchId, i), [ 4 /*yield*/ , iu(n, o.changes) ];

              case 3:
                return r.sent(), [ 4 /*yield*/ , as(n.remoteStore) ];

              case 4:
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 5:
                return s = r.sent(), u = ws(s, "Failed to persist write"), i.reject(u), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Applies one remote event to the sync engine, notifying any views of the
 * changes, and releasing any pending mutation batches that would become
 * visible because of the snapshot version the remote event contains.
 */ function zs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = z(t), r.label = 1;

              case 1:
                return r.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , Zi(n.localStore, e) ];

              case 2:
                return i = r.sent(), 
                // Update `receivedDocument` as appropriate for any limbo targets.
                e.targetChanges.forEach((function(t, e) {
                    var r = n.Co.get(e);
                    r && (
                    // Since this is a limbo resolution lookup, it's for a single document
                    // and it could be added, modified, or removed, but not a combination.
                    G(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), 
                    t.addedDocuments.size > 0 ? r.Po = !0 : t.modifiedDocuments.size > 0 ? G(r.Po) : t.removedDocuments.size > 0 && (G(r.Po), 
                    r.Po = !1));
                })), [ 4 /*yield*/ , iu(n, i, e) ];

              case 3:
                // Update `receivedDocument` as appropriate for any limbo targets.
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , Ei(r.sent()) ];

              case 5:
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */ function Qs(t, e, n) {
    var r = z(t);
    // If we are the secondary client, we explicitly ignore the remote store's
    // online state (the local client may go offline, even though the primary
    // tab remains online) and only apply the primary tab's online state from
    // SharedClientState.
        if (r.isPrimaryClient && 0 /* RemoteStore */ === n || !r.isPrimaryClient && 1 /* SharedClientState */ === n) {
        var i = [];
        r.vo.forEach((function(t, n) {
            var r = n.view.zr(e);
            r.snapshot && i.push(r.snapshot);
        })), function(t, e) {
            var n = z(t);
            n.onlineState = e;
            var r = !1;
            n.queries.forEach((function(t, n) {
                for (var i = 0, o = n.listeners; i < o.length; i++) {
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    o[i].zr(e) && (r = !0);
                }
            })), r && ks(n);
        }(r.eventManager, e), i.length && r.bo._r(i), r.onlineState = e, r.isPrimaryClient && r.sharedClientState.setOnlineState(e);
    }
}

/**
 * Rejects the listen for the given targetID. This can be triggered by the
 * backend for any active target.
 *
 * @param syncEngine - The sync engine implementation.
 * @param targetId - The targetID corresponds to one previously initiated by the
 * user as part of TargetData passed to listen() on RemoteStore.
 * @param err - A description of the condition that has forced the rejection.
 * Nearly always this will be an indication that the user is no longer
 * authorized to see the data matching the target.
 */ function Ws(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o, s, u, a, c;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                // PORTING NOTE: Multi-tab only.
                return (n = z(t)).sharedClientState.updateQueryState(e, "rejected", i), o = n.Co.get(e), 
                (s = o && o.key) ? (u = (u = new nn(gt.comparator)).insert(s, Pt.newNoDocument(s, J.min())), 
                a = yn().add(s), c = new gn(J.min(), 
                /* targetChanges= */ new Map, 
                /* targetMismatches= */ new sn(H), u, a), [ 4 /*yield*/ , zs(n, c) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return r.sent(), 
                // Since this query failed, we won't want to manually unlisten to it.
                // We only remove it from bookkeeping after we successfully applied the
                // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
                // this query when the RemoteStore restarts the Watch stream, which should
                // re-trigger the target failure.
                n.Do = n.Do.remove(s), n.Co.delete(e), ru(n), [ 3 /*break*/ , 4 ];

              case 2:
                return [ 4 /*yield*/ , ro(n.localStore, e, 
                /* keepPersistedTargetData */ !1).then((function() {
                    return Zs(n, e, i);
                })).catch(Ei) ];

              case 3:
                r.sent(), r.label = 4;

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Hs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = z(t), i = e.batch.batchId, r.label = 1;

              case 1:
                return r.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , $i(n.localStore, e) ];

              case 2:
                return o = r.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                Js(n, i, /*error=*/ null), $s(n, i), n.sharedClientState.updateMutationState(i, "acknowledged"), 
                [ 4 /*yield*/ , iu(n, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , Ei(r.sent()) ];

              case 5:
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Ys(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = z(t), r.label = 1;

              case 1:
                return r.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n = z(t);
                    return n.persistence.runTransaction("Reject batch", "readwrite-primary", (function(t) {
                        var r;
                        return n._n.lookupMutationBatch(t, e).next((function(e) {
                            return G(null !== e), r = e.keys(), n._n.removeMutationBatch(t, e);
                        })).next((function() {
                            return n._n.performConsistencyCheck(t);
                        })).next((function() {
                            return n.Mn.pn(t, r);
                        }));
                    }));
                }(n.localStore, e) ];

              case 2:
                return o = r.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                Js(n, e, i), $s(n, e), n.sharedClientState.updateMutationState(e, "rejected", i), 
                [ 4 /*yield*/ , iu(n, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , Ei(r.sent()) ];

              case 5:
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */ function Xs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                es((n = z(t)).remoteStore) || q("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), 
                r.label = 1;

              case 1:
                return r.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , function(t) {
                    var e = z(t);
                    return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (function(t) {
                        return e._n.getHighestUnacknowledgedBatchId(t);
                    }));
                }(n.localStore) ];

              case 2:
                return -1 === (i = r.sent()) ? [ 2 /*return*/ , void e.resolve() ] : ((o = n.ko.get(i) || []).push(e), 
                n.ko.set(i, o), [ 3 /*break*/ , 4 ]);

              case 3:
                return s = r.sent(), u = ws(s, "Initialization of waitForPendingWrites() operation failed"), 
                e.reject(u), [ 3 /*break*/ , 4 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
 * if there are any.
 */ function $s(t, e) {
    (t.ko.get(e) || []).forEach((function(t) {
        t.resolve();
    })), t.ko.delete(e)
    /** Reject all outstanding callbacks waiting for pending writes to complete. */;
}

function Js(t, e, n) {
    var r = z(t), i = r.xo[r.currentUser.toKey()];
    // NOTE: Mutations restored from persistence won't have callbacks, so it's
    // okay for there to be no callback for this ID.
    if (i) {
        var o = i.get(e);
        o && (n ? o.reject(n) : o.resolve(), i = i.remove(e)), r.xo[r.currentUser.toKey()] = i;
    }
}

function Zs(t, e, n) {
    void 0 === n && (n = null), t.sharedClientState.removeLocalQueryTarget(e);
    for (var r = 0, i = t.Vo.get(e); r < i.length; r++) {
        var o = i[r];
        t.vo.delete(o), n && t.bo.Mo(o, n);
    }
    t.Vo.delete(e), t.isPrimaryClient && t.No.Zn(e).forEach((function(e) {
        t.No.containsKey(e) || 
        // We removed the last reference for this key
        tu(t, e);
    }));
}

function tu(t, e) {
    t.So.delete(e.path.canonicalString());
    // It's possible that the target already got removed because the query failed. In that case,
    // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
    var n = t.Do.get(e);
    null !== n && (Xo(t.remoteStore, n), t.Do = t.Do.remove(e), t.Co.delete(n), ru(t));
}

function eu(t, e, n) {
    for (var r = 0, i = n; r < i.length; r++) {
        var o = i[r];
        o instanceof Ps ? (t.No.addReference(o.key, e), nu(t, o)) : o instanceof Fs ? (q("SyncEngine", "Document no longer in limbo: " + o.key), 
        t.No.removeReference(o.key, e), t.No.containsKey(o.key) || 
        // We removed the last reference for this key
        tu(t, o.key)) : K();
    }
}

function nu(t, e) {
    var n = e.key, r = n.path.canonicalString();
    t.Do.get(n) || t.So.has(r) || (q("SyncEngine", "New document in limbo: " + n), t.So.add(r), 
    ru(t));
}

/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */ function ru(t) {
    for (;t.So.size > 0 && t.Do.size < t.maxConcurrentLimboResolutions; ) {
        var e = t.So.values().next().value;
        t.So.delete(e);
        var n = new gt(rt.fromString(e)), r = t.$o.next();
        t.Co.set(r, new qs(n)), t.Do = t.Do.insert(n, r), Yo(t.remoteStore, new Gr(fe(ie(n.path)), r, 2 /* LimboResolution */ , L.o));
    }
}

function iu(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var o, s, u, a;
        return r(this, (function(c) {
            switch (c.label) {
              case 0:
                return o = z(t), s = [], u = [], a = [], o.vo.isEmpty() ? [ 3 /*break*/ , 3 ] : (o.vo.forEach((function(t, n) {
                    a.push(o.Fo(n, e, i).then((function(t) {
                        if (t) {
                            o.isPrimaryClient && o.sharedClientState.updateQueryState(n.targetId, t.fromCache ? "not-current" : "current"), 
                            s.push(t);
                            var e = Qi.vn(n.targetId, t);
                            u.push(e);
                        }
                    })));
                })), [ 4 /*yield*/ , Promise.all(a) ]);

              case 1:
                return c.sent(), o.bo._r(s), [ 4 /*yield*/ , function(t, e) {
                    return n(this, void 0, void 0, (function() {
                        var n, i, o, s, u, a, c, h, f;
                        return r(this, (function(r) {
                            switch (r.label) {
                              case 0:
                                n = z(t), r.label = 1;

                              case 1:
                                return r.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (function(t) {
                                    return Cr.forEach(e, (function(e) {
                                        return Cr.forEach(e.Pn, (function(r) {
                                            return n.persistence.referenceDelegate.addReference(t, e.targetId, r);
                                        })).next((function() {
                                            return Cr.forEach(e.bn, (function(r) {
                                                return n.persistence.referenceDelegate.removeReference(t, e.targetId, r);
                                            }));
                                        }));
                                    }));
                                })) ];

                              case 2:
                                return r.sent(), [ 3 /*break*/ , 4 ];

                              case 3:
                                if (!Pr(i = r.sent())) throw i;
                                // If `notifyLocalViewChanges` fails, we did not advance the sequence
                                // number for the documents that were included in this transaction.
                                // This might trigger them to be deleted earlier than they otherwise
                                // would have, but it should not invalidate the integrity of the data.
                                                                return q("LocalStore", "Failed to update sequence numbers: " + i), 
                                [ 3 /*break*/ , 4 ];

                              case 4:
                                for (o = 0, s = e; o < s.length; o++) u = s[o], a = u.targetId, u.fromCache || (c = n.kn.get(a), 
                                h = c.snapshotVersion, f = c.withLastLimboFreeSnapshotVersion(h), 
                                // Advance the last limbo free snapshot version
                                n.kn = n.kn.insert(a, f));
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(o.localStore, u) ];

              case 2:
                c.sent(), c.label = 3;

              case 3:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function ou(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return (n = z(t)).currentUser.isEqual(e) ? [ 3 /*break*/ , 3 ] : (q("SyncEngine", "User change. New user:", e.toKey()), 
                [ 4 /*yield*/ , Xi(n.localStore, e) ]);

              case 1:
                return i = r.sent(), n.currentUser = e, 
                // Fails tasks waiting for pending writes requested by previous user.
                function(t, e) {
                    t.ko.forEach((function(t) {
                        t.forEach((function(t) {
                            t.reject(new P(O.CANCELLED, "'waitForPendingWrites' promise is rejected due to a user change."));
                        }));
                    })), t.ko.clear();
                }(n), 
                // TODO(b/114226417): Consider calling this only in the primary tab.
                n.sharedClientState.handleUserChange(e, i.removedBatchIds, i.addedBatchIds), [ 4 /*yield*/ , iu(n, i.Ln) ];

              case 2:
                r.sent(), r.label = 3;

              case 3:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function su(t, e) {
    var n = z(t), r = n.Co.get(e);
    if (r && r.Po) return yn().add(r.key);
    var i = yn(), o = n.Vo.get(e);
    if (!o) return i;
    for (var s = 0, u = o; s < u.length; s++) {
        var a = u[s], c = n.vo.get(a);
        i = i.unionWith(c.view.wo);
    }
    return i;
}

/**
 * Reconcile the list of synced documents in an existing view with those
 * from persistence.
 */ function uu(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return [ 4 /*yield*/ , io((n = z(t)).localStore, e.query, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return i = r.sent(), o = e.view.Ao(i), [ 2 /*return*/ , (n.isPrimaryClient && eu(n, e.targetId, o.To), 
                o) ];
            }
        }));
    }));
}

/**
 * Retrieves newly changed documents from remote document cache and raises
 * snapshots if needed.
 */
// PORTING NOTE: Multi-Tab only.
function au(t) {
    return n(this, void 0, void 0, (function() {
        var e;
        return r(this, (function(n) {
            return [ 2 /*return*/ , so((e = z(t)).localStore).then((function(t) {
                return iu(e, t);
            })) ];
        }));
    }));
}

/** Applies a mutation state to an existing batch.  */
// PORTING NOTE: Multi-Tab only.
function cu(t, e, i, o) {
    return n(this, void 0, void 0, (function() {
        var n, s;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return [ 4 /*yield*/ , function(t, e) {
                    var n = z(t), r = z(n._n);
                    return n.persistence.runTransaction("Lookup mutation documents", "readonly", (function(t) {
                        return r.Qt(t, e).next((function(e) {
                            return e ? n.Mn.pn(t, e) : Cr.resolve(null);
                        }));
                    }));
                }((n = z(t)).localStore, e) ];

              case 1:
                return null === (s = r.sent()) ? [ 3 /*break*/ , 6 ] : "pending" !== i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , as(n.remoteStore) ];

              case 2:
                // If we are the primary client, we need to send this write to the
                // backend. Secondary clients will ignore these writes since their remote
                // connection is disabled.
                return r.sent(), [ 3 /*break*/ , 4 ];

              case 3:
                "acknowledged" === i || "rejected" === i ? (
                // NOTE: Both these methods are no-ops for batches that originated from
                // other clients.
                Js(n, e, o || null), $s(n, e), function(t, e) {
                    z(z(t)._n).Gt(e);
                }(n.localStore, e)) : K(), r.label = 4;

              case 4:
                return [ 4 /*yield*/ , iu(n, s) ];

              case 5:
                return r.sent(), [ 3 /*break*/ , 7 ];

              case 6:
                // A throttled tab may not have seen the mutation before it was completed
                // and removed from the mutation queue, in which case we won't have cached
                // the affected documents. In this case we can safely ignore the update
                // since that means we didn't apply the mutation locally at all (if we
                // had, we would have cached the affected documents), and so we will just
                // see any resulting document changes via normal remote document updates
                // as applicable.
                q("SyncEngine", "Cannot apply mutation batch with id: " + e), r.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
function hu(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u, a, c, h;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return vu(n = z(t)), mu(n), !0 !== e || !0 === n.Oo ? [ 3 /*break*/ , 3 ] : (i = n.sharedClientState.getAllActiveQueryTargets(), 
                [ 4 /*yield*/ , fu(n, i.toArray()) ]);

              case 1:
                return o = r.sent(), n.Oo = !0, [ 4 /*yield*/ , ys(n.remoteStore, !0) ];

              case 2:
                for (r.sent(), s = 0, u = o; s < u.length; s++) a = u[s], Yo(n.remoteStore, a);
                return [ 3 /*break*/ , 7 ];

              case 3:
                return !1 !== e || !1 === n.Oo ? [ 3 /*break*/ , 7 ] : (c = [], h = Promise.resolve(), 
                n.Vo.forEach((function(t, e) {
                    n.sharedClientState.isLocalQueryTarget(e) ? c.push(e) : h = h.then((function() {
                        return Zs(n, e), ro(n.localStore, e, 
                        /*keepPersistedTargetData=*/ !0);
                    })), Xo(n.remoteStore, e);
                })), [ 4 /*yield*/ , h ]);

              case 4:
                return r.sent(), [ 4 /*yield*/ , fu(n, c) ];

              case 5:
                return r.sent(), 
                // PORTING NOTE: Multi-Tab only.
                function(t) {
                    var e = z(t);
                    e.Co.forEach((function(t, n) {
                        Xo(e.remoteStore, n);
                    })), e.No.ts(), e.Co = new Map, e.Do = new nn(gt.comparator);
                }(n), n.Oo = !1, [ 4 /*yield*/ , ys(n.remoteStore, !1) ];

              case 6:
                r.sent(), r.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function fu(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u, a, c, h, f, l, d, p, y, v;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = z(t), i = [], o = [], s = 0, u = e, r.label = 1;

              case 1:
                return s < u.length ? (a = u[s], c = void 0, (h = n.Vo.get(a)) && 0 !== h.length ? [ 4 /*yield*/ , no(n.localStore, fe(h[0])) ] : [ 3 /*break*/ , 7 ]) : [ 3 /*break*/ , 13 ];

              case 2:
                // For queries that have a local View, we fetch their current state
                // from LocalStore (as the resume token and the snapshot version
                // might have changed) and reconcile their views with the persisted
                // state (the list of syncedDocuments may have gotten out of sync).
                c = r.sent(), f = 0, l = h, r.label = 3;

              case 3:
                return f < l.length ? (d = l[f], p = n.vo.get(d), [ 4 /*yield*/ , uu(n, p) ]) : [ 3 /*break*/ , 6 ];

              case 4:
                (y = r.sent()).snapshot && o.push(y.snapshot), r.label = 5;

              case 5:
                return f++, [ 3 /*break*/ , 3 ];

              case 6:
                return [ 3 /*break*/ , 11 ];

              case 7:
                return [ 4 /*yield*/ , oo(n.localStore, a) ];

              case 8:
                return v = r.sent(), [ 4 /*yield*/ , no(n.localStore, v) ];

              case 9:
                return c = r.sent(), [ 4 /*yield*/ , js(n, lu(v), a, 
                /*current=*/ !1) ];

              case 10:
                r.sent(), r.label = 11;

              case 11:
                i.push(c), r.label = 12;

              case 12:
                return s++, [ 3 /*break*/ , 1 ];

              case 13:
                return [ 2 /*return*/ , (n.bo._r(o), i) ];
            }
        }));
    }));
}

/**
 * Creates a `Query` object from the specified `Target`. There is no way to
 * obtain the original `Query`, so we synthesize a `Query` from the `Target`
 * object.
 *
 * The synthesized result might be different from the original `Query`, but
 * since the synthesized `Query` should return the same results as the
 * original one (only the presentation of results might differ), the potential
 * difference will not cause issues.
 */
// PORTING NOTE: Multi-Tab only.
function lu(t) {
    return re(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
}

/** Returns the IDs of the clients that are currently active. */
// PORTING NOTE: Multi-Tab only.
function du(t) {
    var e = z(t);
    return z(z(e.localStore).persistence).fn();
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
function pu(t, e, i, o) {
    return n(this, void 0, void 0, (function() {
        var n, s, u;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return (n = z(t)).Oo ? (
                // If we receive a target state notification via WebStorage, we are
                // either already secondary or another tab has taken the primary lease.
                q("SyncEngine", "Ignoring unexpected query state notification."), [ 3 /*break*/ , 8 ]) : [ 3 /*break*/ , 1 ];

              case 1:
                if (!n.Vo.has(e)) return [ 3 /*break*/ , 8 ];
                switch (i) {
                  case "current":
                  case "not-current":
                    return [ 3 /*break*/ , 2 ];

                  case "rejected":
                    return [ 3 /*break*/ , 5 ];
                }
                return [ 3 /*break*/ , 7 ];

              case 2:
                return [ 4 /*yield*/ , so(n.localStore) ];

              case 3:
                return s = r.sent(), u = gn.createSynthesizedRemoteEventForCurrentChange(e, "current" === i), 
                [ 4 /*yield*/ , iu(n, s, u) ];

              case 4:
                return r.sent(), [ 3 /*break*/ , 8 ];

              case 5:
                return [ 4 /*yield*/ , ro(n.localStore, e, 
                /* keepPersistedTargetData */ !0) ];

              case 6:
                return r.sent(), Zs(n, e, o), [ 3 /*break*/ , 8 ];

              case 7:
                K(), r.label = 8;

              case 8:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Adds or removes Watch targets for queries from different tabs. */ function yu(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o, s, u, a, c, h, f, l, d;
        return r(this, (function(p) {
            switch (p.label) {
              case 0:
                if (!(n = vu(t)).Oo) return [ 3 /*break*/ , 10 ];
                o = 0, s = e, p.label = 1;

              case 1:
                return o < s.length ? (u = s[o], n.Vo.has(u) ? (
                // A target might have been added in a previous attempt
                q("SyncEngine", "Adding an already active target " + u), [ 3 /*break*/ , 5 ]) : [ 4 /*yield*/ , oo(n.localStore, u) ]) : [ 3 /*break*/ , 6 ];

              case 2:
                return a = p.sent(), [ 4 /*yield*/ , no(n.localStore, a) ];

              case 3:
                return c = p.sent(), [ 4 /*yield*/ , js(n, lu(a), c.targetId, 
                /*current=*/ !1) ];

              case 4:
                p.sent(), Yo(n.remoteStore, c), p.label = 5;

              case 5:
                return o++, [ 3 /*break*/ , 1 ];

              case 6:
                h = function(t) {
                    return r(this, (function(e) {
                        switch (e.label) {
                          case 0:
                            return n.Vo.has(t) ? [ 4 /*yield*/ , ro(n.localStore, t, 
                            /* keepPersistedTargetData */ !1).then((function() {
                                Xo(n.remoteStore, t), Zs(n, t);
                            })).catch(Ei) ] : [ 3 /*break*/ , 2 ];

                            // Release queries that are still active.
                                                      case 1:
                            // Release queries that are still active.
                            e.sent(), e.label = 2;

                          case 2:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }, f = 0, l = i, p.label = 7;

              case 7:
                return f < l.length ? (d = l[f], [ 5 /*yield**/ , h(d) ]) : [ 3 /*break*/ , 10 ];

              case 8:
                p.sent(), p.label = 9;

              case 9:
                return f++, [ 3 /*break*/ , 7 ];

              case 10:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function vu(t) {
    var e = z(t);
    return e.remoteStore.remoteSyncer.applyRemoteEvent = zs.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = su.bind(null, e), 
    e.remoteStore.remoteSyncer.rejectListen = Ws.bind(null, e), e.bo._r = Ds.bind(null, e.eventManager), 
    e.bo.Mo = As.bind(null, e.eventManager), e;
}

function mu(t) {
    var e = z(t);
    return e.remoteStore.remoteSyncer.applySuccessfulWrite = Hs.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Ys.bind(null, e), 
    e
    /**
 * Loads a Firestore bundle into the SDK. The returned promise resolves when
 * the bundle finished loading.
 *
 * @param syncEngine - SyncEngine to use.
 * @param bundleReader - Bundle to load into the SDK.
 * @param task - LoadBundleTask used to update the loading progress to public API.
 */;
}

function gu(t, e, i) {
    var o = z(t);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (function(t, e, i) {
        return n(this, void 0, void 0, (function() {
            var n, o, s, u, a, c;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return r.trys.push([ 0, 14, , 15 ]), [ 4 /*yield*/ , e.getMetadata() ];

                  case 1:
                    return n = r.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = z(t), r = Ln(e.createTime);
                        return n.persistence.runTransaction("hasNewerBundle", "readonly", (function(t) {
                            return n.Ke.getBundleMetadata(t, e.id);
                        })).then((function(t) {
                            return !!t && t.createTime.compareTo(r) >= 0;
                        }));
                    }(t.localStore, n) ];

                  case 2:
                    return r.sent() ? [ 4 /*yield*/ , e.close() ] : [ 3 /*break*/ , 4 ];

                  case 3:
                    return [ 2 /*return*/ , (r.sent(), void i._completeWith(function(t) {
                        return {
                            taskState: "Success",
                            documentsLoaded: t.totalDocuments,
                            bytesLoaded: t.totalBytes,
                            totalDocuments: t.totalDocuments,
                            totalBytes: t.totalBytes
                        };
                    }(n))) ];

                  case 4:
                    return i._updateProgress(Os(n)), o = new Ls(n, t.localStore, e.R), [ 4 /*yield*/ , e.Lo() ];

                  case 5:
                    s = r.sent(), r.label = 6;

                  case 6:
                    return s ? [ 4 /*yield*/ , o.oo(s) ] : [ 3 /*break*/ , 10 ];

                  case 7:
                    return (u = r.sent()) && i._updateProgress(u), [ 4 /*yield*/ , e.Lo() ];

                  case 8:
                    s = r.sent(), r.label = 9;

                  case 9:
                    return [ 3 /*break*/ , 6 ];

                  case 10:
                    return [ 4 /*yield*/ , o.complete() ];

                  case 11:
                    // TODO(b/160876443): This currently raises snapshots with
                    // `fromCache=false` if users already listen to some queries and bundles
                    // has newer version.
                    return a = r.sent(), [ 4 /*yield*/ , iu(t, a.wn, 
                    /* remoteEvent */ void 0) ];

                  case 12:
                    // Save metadata, so loading the same bundle will skip.
                    // TODO(b/160876443): This currently raises snapshots with
                    // `fromCache=false` if users already listen to some queries and bundles
                    // has newer version.
                    return r.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = z(t);
                        return n.persistence.runTransaction("Save bundle", "readwrite", (function(t) {
                            return n.Ke.saveBundleMetadata(t, e);
                        }));
                    }(t.localStore, n) ];

                  case 13:
                    // TODO(b/160876443): This currently raises snapshots with
                    // `fromCache=false` if users already listen to some queries and bundles
                    // has newer version.
                    // Save metadata, so loading the same bundle will skip.
                    return r.sent(), i._completeWith(a.progress), [ 3 /*break*/ , 15 ];

                  case 14:
                    return B("SyncEngine", "Loading bundle failed with " + (c = r.sent())), i._failWith(c), 
                    [ 3 /*break*/ , 15 ];

                  case 15:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
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
 * Provides all components needed for Firestore with in-memory persistence.
 * Uses EagerGC garbage collection.
 */)(o, e, i).then((function() {
        o.sharedClientState.notifyBundleLoaded();
    }));
}

var wu = /** @class */ function() {
    function t() {
        this.synchronizeTabs = !1;
    }
    return t.prototype.initialize = function(t) {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.R = qo(t.databaseInfo.databaseId), this.sharedClientState = this.Bo(t), 
                    this.persistence = this.Uo(t), [ 4 /*yield*/ , this.persistence.start() ];

                  case 1:
                    return e.sent(), this.gcScheduler = this.qo(t), this.localStore = this.Ko(t), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.qo = function(t) {
        return null;
    }, t.prototype.Ko = function(t) {
        return Yi(this.persistence, new Wi, t.initialUser, this.R);
    }, t.prototype.Uo = function(t) {
        return new go(bo.Ps, this.R);
    }, t.prototype.Bo = function(t) {
        return new xo;
    }, t.prototype.terminate = function() {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.gcScheduler && this.gcScheduler.stop(), [ 4 /*yield*/ , this.sharedClientState.shutdown() ];

                  case 1:
                    return t.sent(), [ 4 /*yield*/ , this.persistence.shutdown() ];

                  case 2:
                    return t.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t;
}(), bu = /** @class */ function(e) {
    function i(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).jo = t, i.cacheSizeBytes = n, i.forceOwnership = r, 
        i.synchronizeTabs = !1, i;
    }
    return t(i, e), i.prototype.initialize = function(t) {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , e.prototype.initialize.call(this, t) ];

                  case 1:
                    return n.sent(), [ 4 /*yield*/ , uo(this.localStore) ];

                  case 2:
                    return n.sent(), [ 4 /*yield*/ , this.jo.initialize(this, t) ];

                  case 3:
                    // Enqueue writes from a previous session
                    return n.sent(), [ 4 /*yield*/ , mu(this.jo.syncEngine) ];

                  case 4:
                    // Enqueue writes from a previous session
                    return n.sent(), [ 4 /*yield*/ , as(this.jo.remoteStore) ];

                  case 5:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.Ko = function(t) {
        return Yi(this.persistence, new Wi, t.initialUser, this.R);
    }, i.prototype.qo = function(t) {
        var e = this.persistence.referenceDelegate.garbageCollector;
        return new Ni(e, t.asyncQueue);
    }, i.prototype.Uo = function(t) {
        var e = Ki(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey), n = void 0 !== this.cacheSizeBytes ? hi.withCacheSize(this.cacheSizeBytes) : hi.DEFAULT;
        return new Ui(this.synchronizeTabs, e, t.clientId, n, t.asyncQueue, Mo(), Vo(), this.R, this.sharedClientState, !!this.forceOwnership);
    }, i.prototype.Bo = function(t) {
        return new xo;
    }, i;
}(wu), Iu = /** @class */ function(e) {
    function i(t, n) {
        var r = this;
        return (r = e.call(this, t, n, /* forceOwnership= */ !1) || this).jo = t, r.cacheSizeBytes = n, 
        r.synchronizeTabs = !0, r;
    }
    return t(i, e), i.prototype.initialize = function(t) {
        return n(this, void 0, void 0, (function() {
            var i, o = this;
            return r(this, (function(s) {
                switch (s.label) {
                  case 0:
                    return [ 4 /*yield*/ , e.prototype.initialize.call(this, t) ];

                  case 1:
                    return s.sent(), i = this.jo.syncEngine, this.sharedClientState instanceof Co ? (this.sharedClientState.syncEngine = {
                        ui: cu.bind(null, i),
                        ai: pu.bind(null, i),
                        hi: yu.bind(null, i),
                        fn: du.bind(null, i),
                        ci: au.bind(null, i)
                    }, [ 4 /*yield*/ , this.sharedClientState.start() ]) : [ 3 /*break*/ , 3 ];

                  case 2:
                    s.sent(), s.label = 3;

                  case 3:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return [ 4 /*yield*/ , this.persistence.He((function(t) {
                        return n(o, void 0, void 0, (function() {
                            return r(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return [ 4 /*yield*/ , hu(this.jo.syncEngine, t) ];

                                  case 1:
                                    return e.sent(), this.gcScheduler && (t && !this.gcScheduler.started ? this.gcScheduler.start(this.localStore) : t || this.gcScheduler.stop()), 
                                    [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })) ];

                  case 4:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return s.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.Bo = function(t) {
        var e = Mo();
        if (!Co.gt(e)) throw new P(O.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
        var n = Ki(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey);
        return new Co(e, t.asyncQueue, n, t.clientId, t.initialUser);
    }, i;
}(bu), Tu = /** @class */ function() {
    function t() {}
    return t.prototype.initialize = function(t, e) {
        return n(this, void 0, void 0, (function() {
            var n = this;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return this.localStore ? [ 3 /*break*/ , 2 ] : (this.localStore = t.localStore, 
                    this.sharedClientState = t.sharedClientState, this.datastore = this.createDatastore(e), 
                    this.remoteStore = this.createRemoteStore(e), this.eventManager = this.createEventManager(e), 
                    this.syncEngine = this.createSyncEngine(e, 
                    /* startAsPrimary=*/ !t.synchronizeTabs), this.sharedClientState.onlineStateHandler = function(t) {
                        return Qs(n.syncEngine, t, 1 /* SharedClientState */);
                    }, this.remoteStore.remoteSyncer.handleCredentialChange = ou.bind(null, this.syncEngine), 
                    [ 4 /*yield*/ , ys(this.remoteStore, this.syncEngine.isPrimaryClient) ]);

                  case 1:
                    r.sent(), r.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.createEventManager = function(t) {
        return new Ss;
    }, t.prototype.createDatastore = function(t) {
        var e, n = qo(t.databaseInfo.databaseId), r = (e = t.databaseInfo, new Fo(e));
        /** Return the Platform-specific connectivity monitor. */ return function(t, e, n) {
            return new Go(t, e, n);
        }(t.credentials, r, n);
    }, t.prototype.createRemoteStore = function(t) {
        var e, n, r, i, o, s = this;
        return e = this.localStore, n = this.datastore, r = t.asyncQueue, i = function(t) {
            return Qs(s.syncEngine, t, 0 /* RemoteStore */);
        }, o = Lo.gt() ? new Lo : new Ro, new Qo(e, n, r, i, o);
    }, t.prototype.createSyncEngine = function(t, e) {
        return function(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        r, i, o, s) {
            var u = new Us(t, e, n, r, i, o);
            return s && (u.Oo = !0), u;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e);
    }, t.prototype.terminate = function() {
        return function(t) {
            return n(this, void 0, void 0, (function() {
                var e;
                return r(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = z(t), q("RemoteStore", "RemoteStore shutting down."), e.Fr.add(5 /* Shutdown */), 
                        [ 4 /*yield*/ , Ho(e) ];

                      case 1:
                        return n.sent(), e.Lr.shutdown(), 
                        // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                        // triggering spurious listener events with cached data, etc.
                        e.Br.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
                    }
                }));
            }));
        }(this.remoteStore);
    }, t;
}();

/**
 * Provides all components needed for Firestore with IndexedDB persistence.
 */
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
 * How many bytes to read each time when `ReadableStreamReader.read()` is
 * called. Only applicable for byte streams that we control (e.g. those backed
 * by an UInt8Array).
 */
/**
 * Builds a `ByteStreamReader` from a UInt8Array.
 * @param source - The data source to use.
 * @param bytesPerRead - How many bytes each `read()` from the returned reader
 *        will read.
 */
function Eu(t, e) {
    void 0 === e && (e = 10240);
    var i = 0;
    return {
        read: function() {
            return n(this, void 0, void 0, (function() {
                var n;
                return r(this, (function(r) {
                    return i < t.byteLength ? (n = {
                        value: t.slice(i, i + e),
                        done: !1
                    }, [ 2 /*return*/ , (i += e, n) ]) : [ 2 /*return*/ , {
                        done: !0
                    } ];
                }));
            }));
        },
        cancel: function() {
            return n(this, void 0, void 0, (function() {
                return r(this, (function(t) {
                    return [ 2 /*return*/ ];
                }));
            }));
        },
        releaseLock: function() {},
        closed: Promise.reject("unimplemented")
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
 * On web, a `ReadableStream` is wrapped around by a `ByteStreamReader`.
 */
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
/*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */ var Su = /** @class */ function() {
    function t(t) {
        this.observer = t, 
        /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
        this.muted = !1;
    }
    return t.prototype.next = function(t) {
        this.observer.next && this.Qo(this.observer.next, t);
    }, t.prototype.error = function(t) {
        this.observer.error ? this.Qo(this.observer.error, t) : console.error("Uncaught Error in snapshot listener:", t);
    }, t.prototype.Wo = function() {
        this.muted = !0;
    }, t.prototype.Qo = function(t, e) {
        var n = this;
        this.muted || setTimeout((function() {
            n.muted || t(e);
        }), 0);
    }, t;
}(), _u = /** @class */ function() {
    function t(
    /** The reader to read from underlying binary bundle data source. */
    t, e) {
        var n = this;
        this.Go = t, this.R = e, 
        /** Cached bundle metadata. */
        this.metadata = new kr, 
        /**
             * Internal buffer to hold bundle content, accumulating incomplete element
             * content.
             */
        this.buffer = new Uint8Array, this.zo = new TextDecoder("utf-8"), 
        // Read the metadata (which is the first element).
        this.Ho().then((function(t) {
            t && t.io() ? n.metadata.resolve(t.payload.metadata) : n.metadata.reject(new Error("The first element of the bundle is not a metadata, it is\n             " + JSON.stringify(null == t ? void 0 : t.payload)));
        }), (function(t) {
            return n.metadata.reject(t);
        }));
    }
    return t.prototype.close = function() {
        return this.Go.cancel();
    }, t.prototype.getMetadata = function() {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(t) {
                return [ 2 /*return*/ , this.metadata.promise ];
            }));
        }));
    }, t.prototype.Lo = function() {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.getMetadata() ];

                  case 1:
                    // Makes sure metadata is read before proceeding.
                    return [ 2 /*return*/ , (t.sent(), this.Ho()) ];
                }
            }));
        }));
    }, 
    /**
     * Reads from the head of internal buffer, and pulling more data from
     * underlying stream if a complete element cannot be found, until an
     * element(including the prefixed length and the JSON string) is found.
     *
     * Once a complete element is read, it is dropped from internal buffer.
     *
     * Returns either the bundled element, or null if we have reached the end of
     * the stream.
     */
    t.prototype.Ho = function() {
        return n(this, void 0, void 0, (function() {
            var t, e, n, i;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Jo() ];

                  case 1:
                    return null === (t = r.sent()) ? [ 2 /*return*/ , null ] : (e = this.zo.decode(t), 
                    n = Number(e), isNaN(n) && this.Yo("length string (" + e + ") is not valid number"), 
                    [ 4 /*yield*/ , this.Xo(n) ]);

                  case 2:
                    return i = r.sent(), [ 2 /*return*/ , new xs(JSON.parse(i), t.length + n) ];
                }
            }));
        }));
    }, 
    /** First index of '{' from the underlying buffer. */ t.prototype.Zo = function() {
        return this.buffer.findIndex((function(t) {
            return t === "{".charCodeAt(0);
        }));
    }, 
    /**
     * Reads from the beginning of the internal buffer, until the first '{', and
     * return the content.
     *
     * If reached end of the stream, returns a null.
     */
    t.prototype.Jo = function() {
        return n(this, void 0, void 0, (function() {
            var t, e;
            return r(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.Zo() < 0 ? [ 4 /*yield*/ , this.tc() ] : [ 3 /*break*/ , 3 ];

                  case 1:
                    if (n.sent()) return [ 3 /*break*/ , 3 ];
                    n.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 0 ];

                  case 3:
                    // Broke out of the loop because underlying stream is closed, and there
                    // happens to be no more data to process.
                    return 0 === this.buffer.length ? [ 2 /*return*/ , null ] : (
                    // Broke out of the loop because underlying stream is closed, but still
                    // cannot find an open bracket.
                    (t = this.Zo()) < 0 && this.Yo("Reached the end of bundle when a length string is expected."), 
                    e = this.buffer.slice(0, t), [ 2 /*return*/ , (this.buffer = this.buffer.slice(t), 
                    e) ]);
                }
            }));
        }));
    }, 
    /**
     * Reads from a specified position from the internal buffer, for a specified
     * number of bytes, pulling more data from the underlying stream if needed.
     *
     * Returns a string decoded from the read bytes.
     */
    t.prototype.Xo = function(t) {
        return n(this, void 0, void 0, (function() {
            var e;
            return r(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.buffer.length < t ? [ 4 /*yield*/ , this.tc() ] : [ 3 /*break*/ , 3 ];

                  case 1:
                    n.sent() && this.Yo("Reached the end of bundle when more is expected."), n.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 0 ];

                  case 3:
                    // Update the internal buffer to drop the read json string.
                    return e = this.zo.decode(this.buffer.slice(0, t)), [ 2 /*return*/ , (this.buffer = this.buffer.slice(t), 
                    e) ];
                }
            }));
        }));
    }, t.prototype.Yo = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        throw this.Go.cancel(), new Error("Invalid bundle format: " + t);
    }, 
    /**
     * Pulls more data from underlying stream to internal buffer.
     * Returns a boolean indicating whether the stream is finished.
     */
    t.prototype.tc = function() {
        return n(this, void 0, void 0, (function() {
            var t, e;
            return r(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Go.read() ];

                  case 1:
                    return (t = n.sent()).done || ((e = new Uint8Array(this.buffer.length + t.value.length)).set(this.buffer), 
                    e.set(t.value, this.buffer.length), this.buffer = e), [ 2 /*return*/ , t.done ];
                }
            }));
        }));
    }, t;
}(), Nu = /** @class */ function() {
    function t(t) {
        this.datastore = t, 
        // The version of each document that was read during this transaction.
        this.readVersions = new Map, this.mutations = [], this.committed = !1, 
        /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
        this.lastWriteError = null, 
        /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
        this.writtenDocs = new Set;
    }
    return t.prototype.lookup = function(t) {
        return n(this, void 0, void 0, (function() {
            var e, i = this;
            return r(this, (function(o) {
                switch (o.label) {
                  case 0:
                    if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new P(O.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
                    return [ 4 /*yield*/ , function(t, e) {
                        return n(this, void 0, void 0, (function() {
                            var n, i, o, s, u, a;
                            return r(this, (function(r) {
                                switch (r.label) {
                                  case 0:
                                    return n = z(t), i = Un(n.R) + "/documents", o = {
                                        documents: e.map((function(t) {
                                            return Fn(n.R, t);
                                        }))
                                    }, [ 4 /*yield*/ , n.Oi("BatchGetDocuments", i, o) ];

                                  case 1:
                                    return s = r.sent(), u = new Map, s.forEach((function(t) {
                                        var e = function(t, e) {
                                            return "found" in e ? function(t, e) {
                                                G(!!e.found), e.found.name, e.found.updateTime;
                                                var n = Mn(t, e.found.name), r = Ln(e.found.updateTime), i = new Lt({
                                                    mapValue: {
                                                        fields: e.found.fields
                                                    }
                                                });
                                                return Pt.newFoundDocument(n, r, i);
                                            }(t, e) : "missing" in e ? function(t, e) {
                                                G(!!e.missing), G(!!e.readTime);
                                                var n = Mn(t, e.missing), r = Ln(e.readTime);
                                                return Pt.newNoDocument(n, r);
                                            }(t, e) : K();
                                        }(n.R, t);
                                        u.set(e.key.toString(), e);
                                    })), a = [], [ 2 /*return*/ , (e.forEach((function(t) {
                                        var e = u.get(t.toString());
                                        G(!!e), a.push(e);
                                    })), a) ];
                                }
                            }));
                        }));
                    }(this.datastore, t) ];

                  case 1:
                    return [ 2 /*return*/ , ((e = o.sent()).forEach((function(t) {
                        return i.recordVersion(t);
                    })), e) ];
                }
            }));
        }));
    }, t.prototype.set = function(t, e) {
        this.write(e.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }, t.prototype.update = function(t, e) {
        try {
            this.write(e.toMutation(t, this.preconditionForUpdate(t)));
        } catch (t) {
            this.lastWriteError = t;
        }
        this.writtenDocs.add(t.toString());
    }, t.prototype.delete = function(t) {
        this.write(new $e(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }, t.prototype.commit = function() {
        return n(this, void 0, void 0, (function() {
            var t, e = this;
            return r(this, (function(i) {
                switch (i.label) {
                  case 0:
                    if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError;
                    return t = this.readVersions, 
                    // For each mutation, note that the doc was written.
                    this.mutations.forEach((function(e) {
                        t.delete(e.key.toString());
                    })), 
                    // For each document that was read but not written to, we want to perform
                    // a `verify` operation.
                    t.forEach((function(t, n) {
                        var r = gt.fromPath(n);
                        e.mutations.push(new Je(r, e.precondition(r)));
                    })), [ 4 /*yield*/ , function(t, e) {
                        return n(this, void 0, void 0, (function() {
                            var n, i, o;
                            return r(this, (function(r) {
                                switch (r.label) {
                                  case 0:
                                    return n = z(t), i = Un(n.R) + "/documents", o = {
                                        writes: e.map((function(t) {
                                            return Gn(n.R, t);
                                        }))
                                    }, [ 4 /*yield*/ , n.Ni("Commit", i, o) ];

                                  case 1:
                                    return r.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(this.datastore, this.mutations) ];

                  case 1:
                    // For each mutation, note that the doc was written.
                    return i.sent(), this.committed = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.recordVersion = function(t) {
        var e;
        if (t.isFoundDocument()) e = t.version; else {
            if (!t.isNoDocument()) throw K();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
                        e = J.min();
        }
        var n = this.readVersions.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new P(O.ABORTED, "Document version changed between two reads.");
        } else this.readVersions.set(t.key.toString(), e);
    }, 
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t.prototype.precondition = function(t) {
        var e = this.readVersions.get(t.toString());
        return !this.writtenDocs.has(t.toString()) && e ? Fe.updateTime(e) : Fe.none();
    }, 
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    t.prototype.preconditionForUpdate = function(t) {
        var e = this.readVersions.get(t.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.writtenDocs.has(t.toString()) && e) {
            if (e.isEqual(J.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new P(O.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return Fe.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
                return Fe.exists(!0);
    }, t.prototype.write = function(t) {
        this.ensureCommitNotCalled(), this.mutations.push(t);
    }, t.prototype.ensureCommitNotCalled = function() {}, t;
}(), Du = /** @class */ function() {
    function t(t, e, n, r) {
        this.asyncQueue = t, this.datastore = e, this.updateFunction = n, this.deferred = r, 
        this.ec = 5, this.Zi = new Uo(this.asyncQueue, "transaction_retry" /* TransactionRetry */)
        /** Runs the transaction and sets the result on deferred. */;
    }
    return t.prototype.run = function() {
        this.ec -= 1, this.nc();
    }, t.prototype.nc = function() {
        var t = this;
        this.Zi.Qi((function() {
            return n(t, void 0, void 0, (function() {
                var t, e, n = this;
                return r(this, (function(r) {
                    return t = new Nu(this.datastore), (e = this.sc(t)) && e.then((function(e) {
                        n.asyncQueue.enqueueAndForget((function() {
                            return t.commit().then((function() {
                                n.deferred.resolve(e);
                            })).catch((function(t) {
                                n.ic(t);
                            }));
                        }));
                    })).catch((function(t) {
                        n.ic(t);
                    })), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, t.prototype.sc = function(t) {
        try {
            var e = this.updateFunction(t);
            return !yt(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.deferred.reject(t), null;
        }
    }, t.prototype.ic = function(t) {
        var e = this;
        this.ec > 0 && this.rc(t) ? (this.ec -= 1, this.asyncQueue.enqueueAndForget((function() {
            return e.nc(), Promise.resolve();
        }))) : this.deferred.reject(t);
    }, t.prototype.rc = function(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            var e = t.code;
            return "aborted" === e || "failed-precondition" === e || !tn(e);
        }
        return !1;
    }, t;
}(), Au = /** @class */ function() {
    function t(t, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    e, i) {
        var o = this;
        this.credentials = t, this.asyncQueue = e, this.databaseInfo = i, this.user = Io.UNAUTHENTICATED, 
        this.clientId = W.u(), this.credentialListener = function() {
            return Promise.resolve();
        }, this.credentials.setChangeListener(e, (function(t) {
            return n(o, void 0, void 0, (function() {
                return r(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return q("FirestoreClient", "Received user=", t.uid), [ 4 /*yield*/ , this.credentialListener(t) ];

                      case 1:
                        return e.sent(), this.user = t, [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }
    return t.prototype.getConfiguration = function() {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(t) {
                return [ 2 /*return*/ , {
                    asyncQueue: this.asyncQueue,
                    databaseInfo: this.databaseInfo,
                    clientId: this.clientId,
                    credentials: this.credentials,
                    initialUser: this.user,
                    maxConcurrentLimboResolutions: 100
                } ];
            }));
        }));
    }, t.prototype.setCredentialChangeListener = function(t) {
        this.credentialListener = t;
    }, 
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */
    t.prototype.verifyNotTerminated = function() {
        if (this.asyncQueue.isShuttingDown) throw new P(O.FAILED_PRECONDITION, "The client has already been terminated.");
    }, t.prototype.terminate = function() {
        var t = this;
        this.asyncQueue.enterRestrictedMode();
        var e = new kr;
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((function() {
            return n(t, void 0, void 0, (function() {
                var t, n;
                return r(this, (function(r) {
                    switch (r.label) {
                      case 0:
                        return r.trys.push([ 0, 5, , 6 ]), this.onlineComponents ? [ 4 /*yield*/ , this.onlineComponents.terminate() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        r.sent(), r.label = 2;

                      case 2:
                        return this.offlineComponents ? [ 4 /*yield*/ , this.offlineComponents.terminate() ] : [ 3 /*break*/ , 4 ];

                      case 3:
                        r.sent(), r.label = 4;

                      case 4:
                        // `removeChangeListener` must be called after shutting down the
                        // RemoteStore as it will prevent the RemoteStore from retrieving
                        // auth tokens.
                        return this.credentials.removeChangeListener(), e.resolve(), [ 3 /*break*/ , 6 ];

                      case 5:
                        return t = r.sent(), n = ws(t, "Failed to shutdown persistence"), e.reject(n), [ 3 /*break*/ , 6 ];

                      case 6:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })), e.promise;
    }, t;
}();

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
 * A class representing a bundle.
 *
 * Takes a bundle stream or buffer, and presents abstractions to read bundled
 * elements out of the underlying content.
 */ function ku(t, e) {
    return n(this, void 0, void 0, (function() {
        var i, o, s = this;
        return r(this, (function(u) {
            switch (u.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), q("FirestoreClient", "Initializing OfflineComponentProvider"), 
                [ 4 /*yield*/ , t.getConfiguration() ];

              case 1:
                return i = u.sent(), [ 4 /*yield*/ , e.initialize(i) ];

              case 2:
                return u.sent(), o = i.initialUser, t.setCredentialChangeListener((function(t) {
                    return n(s, void 0, void 0, (function() {
                        return r(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return o.isEqual(t) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , Xi(e.localStore, t) ];

                              case 1:
                                n.sent(), o = t, n.label = 2;

                              case 2:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), 
                // When a user calls clearPersistence() in one client, all other clients
                // need to be terminated to allow the delete to succeed.
                e.persistence.setDatabaseDeletedListener((function() {
                    return t.terminate();
                })), t.offlineComponents = e, [ 2 /*return*/ ];
            }
        }));
    }));
}

function Cu(t, e) {
    return n(this, void 0, void 0, (function() {
        var i, o;
        return r(this, (function(s) {
            switch (s.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), [ 4 /*yield*/ , xu(t) ];

              case 1:
                return i = s.sent(), q("FirestoreClient", "Initializing OnlineComponentProvider"), 
                [ 4 /*yield*/ , t.getConfiguration() ];

              case 2:
                return o = s.sent(), [ 4 /*yield*/ , e.initialize(i, o) ];

              case 3:
                return s.sent(), 
                // The CredentialChangeListener of the online component provider takes
                // precedence over the offline component provider.
                t.setCredentialChangeListener((function(t) {
                    return function(t, e) {
                        return n(this, void 0, void 0, (function() {
                            var n, i;
                            return r(this, (function(r) {
                                switch (r.label) {
                                  case 0:
                                    return (n = z(t)).asyncQueue.verifyOperationInProgress(), q("RemoteStore", "RemoteStore received new credentials"), 
                                    i = es(n), 
                                    // Tear down and re-create our network streams. This will ensure we get a
                                    // fresh auth token for the new user and re-fill the write pipeline with
                                    // new mutations from the LocalStore (since mutations are per-user).
                                    n.Fr.add(3 /* CredentialChange */), [ 4 /*yield*/ , Ho(n) ];

                                  case 1:
                                    return r.sent(), i && 
                                    // Don't set the network status to Unknown if we are offline.
                                    n.Br.set("Unknown" /* Unknown */), [ 4 /*yield*/ , n.remoteSyncer.handleCredentialChange(e) ];

                                  case 2:
                                    return r.sent(), n.Fr.delete(3 /* CredentialChange */), [ 4 /*yield*/ , Wo(n) ];

                                  case 3:
                                    // Tear down and re-create our network streams. This will ensure we get a
                                    // fresh auth token for the new user and re-fill the write pipeline with
                                    // new mutations from the LocalStore (since mutations are per-user).
                                    return r.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(e.remoteStore, t);
                })), t.onlineComponents = e, [ 2 /*return*/ ];
            }
        }));
    }));
}

function xu(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            switch (e.label) {
              case 0:
                return t.offlineComponents ? [ 3 /*break*/ , 2 ] : (q("FirestoreClient", "Using default OfflineComponentProvider"), 
                [ 4 /*yield*/ , ku(t, new wu) ]);

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 /*return*/ , t.offlineComponents ];
            }
        }));
    }));
}

function Ru(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            switch (e.label) {
              case 0:
                return t.onlineComponents ? [ 3 /*break*/ , 2 ] : (q("FirestoreClient", "Using default OnlineComponentProvider"), 
                [ 4 /*yield*/ , Cu(t, new Tu) ]);

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 /*return*/ , t.onlineComponents ];
            }
        }));
    }));
}

function Lu(t) {
    return xu(t).then((function(t) {
        return t.persistence;
    }));
}

function Ou(t) {
    return xu(t).then((function(t) {
        return t.localStore;
    }));
}

function Pu(t) {
    return Ru(t).then((function(t) {
        return t.remoteStore;
    }));
}

function Fu(t) {
    return Ru(t).then((function(t) {
        return t.syncEngine;
    }));
}

function Mu(t) {
    return n(this, void 0, void 0, (function() {
        var e, n;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return [ 4 /*yield*/ , Ru(t) ];

              case 1:
                return e = r.sent(), [ 2 /*return*/ , ((n = e.eventManager).onListen = Bs.bind(null, e.syncEngine), 
                n.onUnlisten = Ks.bind(null, e.syncEngine), n) ];
            }
        }));
    }));
}

/** Enables the network connection and re-enqueues all pending operations. */ function Vu(t, e, i) {
    var o = this;
    void 0 === i && (i = {});
    var s = new kr;
    return t.asyncQueue.enqueueAndForget((function() {
        return n(o, void 0, void 0, (function() {
            var n;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return n = function(t, e, n, r, i) {
                        var o = new Su({
                            next: function(o) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return Ns(t, s);
                                }));
                                var u = o.docs.has(n);
                                !u && o.fromCache ? 
                                // TODO(dimond): If we're online and the document doesn't
                                // exist then we resolve with a doc.exists set to false. If
                                // we're offline however, we reject the Promise in this
                                // case. Two options: 1) Cache the negative response from
                                // the server so we can deliver that even when you're
                                // offline 2) Actually reject the Promise in the online case
                                // if the document doesn't exist.
                                i.reject(new P(O.UNAVAILABLE, "Failed to get document because the client is offline.")) : u && o.fromCache && r && "server" === r.source ? i.reject(new P(O.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(o);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), s = new Cs(ie(n.path), o, {
                            includeMetadataChanges: !0,
                            so: !0
                        });
                        return _s(t, s);
                    }, [ 4 /*yield*/ , Mu(t) ];

                  case 1:
                    return [ 2 /*return*/ , n.apply(void 0, [ r.sent(), t.asyncQueue, e, i, s ]) ];
                }
            }));
        }));
    })), s.promise;
}

function qu(t, e, i) {
    var o = this;
    void 0 === i && (i = {});
    var s = new kr;
    return t.asyncQueue.enqueueAndForget((function() {
        return n(o, void 0, void 0, (function() {
            var n;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return n = function(t, e, n, r, i) {
                        var o = new Su({
                            next: function(n) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return Ns(t, s);
                                })), n.fromCache && "server" === r.source ? i.reject(new P(O.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), s = new Cs(n, o, {
                            includeMetadataChanges: !0,
                            so: !0
                        });
                        return _s(t, s);
                    }, [ 4 /*yield*/ , Mu(t) ];

                  case 1:
                    return [ 2 /*return*/ , n.apply(void 0, [ r.sent(), t.asyncQueue, e, i, s ]) ];
                }
            }));
        }));
    })), s.promise;
}

var Uu = 
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
function(t, e, n, r, i, o, s, u) {
    this.databaseId = t, this.appId = e, this.persistenceKey = n, this.host = r, this.ssl = i, 
    this.forceLongPolling = o, this.autoDetectLongPolling = s, this.useFetchStreams = u;
}, Bu = /** @class */ function() {
    function t(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    return Object.defineProperty(t.prototype, "isDefaultDatabase", {
        get: function() {
            return "(default)" === this.database;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return e instanceof t && e.projectId === this.projectId && e.database === this.database;
    }, t;
}(), ju = new Map, Ku = function(t, e) {
    this.user = e, this.type = "OAuth", this.authHeaders = {}, 
    // Set the headers using Object Literal notation to avoid minification
    this.authHeaders.Authorization = "Bearer " + t;
}, Gu = /** @class */ function() {
    function t() {
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.changeListener = null;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {}, t.prototype.setChangeListener = function(t, e) {
        this.changeListener = e, 
        // Fire with initial user.
        t.enqueueRetryable((function() {
            return e(Io.UNAUTHENTICATED);
        }));
    }, t.prototype.removeChangeListener = function() {
        this.changeListener = null;
    }, t;
}(), zu = /** @class */ function() {
    function t(t) {
        this.token = t, 
        /**
             * Stores the listener registered with setChangeListener()
             * This isn't actually necessary since the UID never changes, but we use this
             * to verify the listen contract is adhered to in tests.
             */
        this.changeListener = null;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(this.token);
    }, t.prototype.invalidateToken = function() {}, t.prototype.setChangeListener = function(t, e) {
        var n = this;
        this.changeListener = e, 
        // Fire with initial user.
        t.enqueueRetryable((function() {
            return e(n.token.user);
        }));
    }, t.prototype.removeChangeListener = function() {
        this.changeListener = null;
    }, t;
}(), Qu = /** @class */ function() {
    function t(t) {
        var e = this;
        /** Tracks the current User. */        this.currentUser = Io.UNAUTHENTICATED, 
        /** Promise that allows blocking on the initialization of Firebase Auth. */
        this.oc = new kr, 
        /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
        this.cc = 0, this.forceRefresh = !1, this.auth = null, this.asyncQueue = null, this.uc = function() {
            e.cc++, e.currentUser = e.ac(), e.oc.resolve(), e.changeListener && e.asyncQueue.enqueueRetryable((function() {
                return e.changeListener(e.currentUser);
            }));
        };
        var n = function(t) {
            q("FirebaseCredentialsProvider", "Auth detected"), e.auth = t, e.auth.addAuthTokenListener(e.uc);
        };
        t.onInit((function(t) {
            return n(t);
        })), 
        // Our users can initialize Auth right after Firestore, so we give it
        // a chance to register itself with the component framework before we
        // determine whether to start up in unauthenticated mode.
        setTimeout((function() {
            if (!e.auth) {
                var r = t.getImmediate({
                    optional: !0
                });
                r ? n(r) : (
                // If auth is still not available, proceed with `null` user
                q("FirebaseCredentialsProvider", "Auth not yet detected"), e.oc.resolve());
            }
        }), 0);
    }
    return t.prototype.getToken = function() {
        var t = this, e = this.cc, n = this.forceRefresh;
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
                return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((function(n) {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            return t.cc !== e ? (q("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            t.getToken()) : n ? (G("string" == typeof n.accessToken), new Ku(n.accessToken, t.currentUser)) : null;
        })) : Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {
        this.forceRefresh = !0;
    }, t.prototype.setChangeListener = function(t, e) {
        var i = this;
        this.asyncQueue = t, 
        // Blocks the AsyncQueue until the next user is available.
        this.asyncQueue.enqueueRetryable((function() {
            return n(i, void 0, void 0, (function() {
                return r(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return [ 4 /*yield*/ , this.oc.promise ];

                      case 1:
                        return t.sent(), [ 4 /*yield*/ , e(this.currentUser) ];

                      case 2:
                        return t.sent(), this.changeListener = e, [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, t.prototype.removeChangeListener = function() {
        this.auth && this.auth.removeAuthTokenListener(this.uc), this.changeListener = function() {
            return Promise.resolve();
        };
    }, 
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    t.prototype.ac = function() {
        var t = this.auth && this.auth.getUid();
        return G(null === t || "string" == typeof t), new Io(t);
    }, t;
}(), Wu = /** @class */ function() {
    function t(t, e, n) {
        this.hc = t, this.lc = e, this.fc = n, this.type = "FirstParty", this.user = Io.FIRST_PARTY;
    }
    return Object.defineProperty(t.prototype, "authHeaders", {
        get: function() {
            var t = {
                "X-Goog-AuthUser": this.lc
            }, e = this.hc.auth.getAuthHeaderValueForFirstParty([]);
            // Use array notation to prevent minification
                        return e && (t.Authorization = e), this.fc && (t["X-Goog-Iam-Authorization-Token"] = this.fc), 
            t;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), Hu = /** @class */ function() {
    function t(t, e, n) {
        this.hc = t, this.lc = e, this.fc = n;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(new Wu(this.hc, this.lc, this.fc));
    }, t.prototype.setChangeListener = function(t, e) {
        // Fire with initial uid.
        t.enqueueRetryable((function() {
            return e(Io.FIRST_PARTY);
        }));
    }, t.prototype.removeChangeListener = function() {}, t.prototype.invalidateToken = function() {}, 
    t;
}();

/** The default database name for a project. */
/** Represents the database ID a Firestore client is associated with. */
/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */
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
function Yu(t, e, n) {
    if (!n) throw new P(O.INVALID_ARGUMENT, "Function " + t + "() cannot be called with an empty " + e + ".");
}

/**
 * Validates that two boolean options are not set at the same time.
 */
/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */ function Xu(t) {
    if (!gt.isDocumentKey(t)) throw new P(O.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + t + " has " + t.length + ".");
}

/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */ function $u(t) {
    if (gt.isDocumentKey(t)) throw new P(O.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + t + " has " + t.length + ".");
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
/** Returns a string describing the type / value of the provided input. */ function Ju(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
    JSON.stringify(t);
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        var e = 
        /** Hacky method to try to get the constructor name for an object. */
        function(t) {
            if (t.constructor) {
                var e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                if (e && e.length > 1) return e[1];
            }
            return null;
        }(t);
        return e ? "a custom " + e + " object" : "an object";
    }
    return "function" == typeof t ? "a function" : K();
}

function Zu(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    if ("_delegate" in t && (
    // Unwrap Compat types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t = t._delegate), !(t instanceof e)) {
        if (e.name === t.constructor.name) throw new P(O.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        var n = Ju(t);
        throw new P(O.INVALID_ARGUMENT, "Expected type '" + e.name + "', but it was: " + n);
    }
    return t;
}

function ta(t, e) {
    if (e <= 0) throw new P(O.INVALID_ARGUMENT, "Function " + t + "() requires a positive number, but it was: " + e + ".");
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
// settings() defaults:
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied firestore.Settings object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */ var ea = /** @class */ function() {
    function t(t) {
        var e;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new P(O.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
        void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
            if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new P(O.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
        this.useFetchStreams = !!t.useFetchStreams, function(t, e, n, r) {
            if (!0 === e && !0 === r) throw new P(O.INVALID_ARGUMENT, "experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.");
        }(0, t.experimentalForceLongPolling, 0, t.experimentalAutoDetectLongPolling);
    }
    return t.prototype.isEqual = function(t) {
        return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
    }, t;
}(), na = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new ea({}), 
        this._settingsFrozen = !1, t instanceof Bu ? (this._databaseId = t, this._credentials = new Gu) : (this._app = t, 
        this._databaseId = function(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new P(O.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
            return new Bu(t.options.projectId);
        }(t), this._credentials = new Qu(e));
    }
    return Object.defineProperty(t.prototype, "app", {
        /**
         * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
         * instance.
         */
        get: function() {
            if (!this._app) throw new P(O.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this._app;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "_initialized", {
        get: function() {
            return this._settingsFrozen;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "_terminated", {
        get: function() {
            return void 0 !== this._terminateTask;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype._setSettings = function(t) {
        if (this._settingsFrozen) throw new P(O.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new ea(t), void 0 !== t.credentials && (this._credentials = function(t) {
            if (!t) return new Gu;
            switch (t.type) {
              case "gapi":
                var e = t.client;
                // Make sure this really is a Gapi client.
                                return G(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new Hu(e, t.sessionIndex || "0", t.iamToken || null);

              case "provider":
                return t.client;

              default:
                throw new P(O.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
            }
        }(t.credentials));
    }, t.prototype._getSettings = function() {
        return this._settings;
    }, t.prototype._freezeSettings = function() {
        return this._settingsFrozen = !0, this._settings;
    }, t.prototype._delete = function() {
        return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
    }, 
    /** Returns a JSON-serializable representation of this Firestore instance. */ t.prototype.toJSON = function() {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings
        };
    }, 
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */
    t.prototype._terminate = function() {
        /**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */
        return t = this, (e = ju.get(t)) && (q("ComponentProvider", "Removing Datastore"), 
        ju.delete(t), e.terminate()), Promise.resolve();
        var t, e;
    }, t;
}();

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
 */ function ra(t, e, n, r) {
    void 0 === r && (r = {});
    var i = (t = Zu(t, na))._getSettings();
    if ("firestore.googleapis.com" !== i.host && i.host !== e && B("Host has been set in both settings() and useEmulator(), emulator host will be used"), 
    t._setSettings(Object.assign(Object.assign({}, i), {
        host: e + ":" + n,
        ssl: !1
    })), r.mockUserToken) {
        // Let createMockUserToken validate first (catches common mistakes like
        // invalid field "uid" and missing field "sub" / "user_id".)
        var o = w(r.mockUserToken), s = r.mockUserToken.sub || r.mockUserToken.user_id;
        if (!s) throw new P(O.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
        t._credentials = new zu(new Ku(o, new Io(s)));
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
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */ var ia = /** @class */ function() {
    /** @hideconstructor */
    function t(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._key = n, 
        /** The type of this Firestore reference. */
        this.type = "document", this.firestore = t;
    }
    return Object.defineProperty(t.prototype, "_path", {
        get: function() {
            return this._key.path;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "id", {
        /**
         * The document's identifier within its collection.
         */
        get: function() {
            return this._key.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "path", {
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */
        get: function() {
            return this._key.path.canonicalString();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "parent", {
        /**
         * The collection this `DocumentReference` belongs to.
         */
        get: function() {
            return new sa(this.firestore, this.converter, this._key.path.popLast());
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.withConverter = function(e) {
        return new t(this.firestore, e, this._key);
    }, t;
}(), oa = /** @class */ function() {
    // This is the lite version of the Query class in the main SDK.
    /** @hideconstructor protected */
    function t(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._query = n, 
        /** The type of this Firestore reference. */
        this.type = "query", this.firestore = t;
    }
    return t.prototype.withConverter = function(e) {
        return new t(this.firestore, e, this._query);
    }, t;
}(), sa = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, ie(r)) || this)._path = r, 
        /** The type of this Firestore reference. */
        i.type = "collection", i;
    }
    return t(n, e), Object.defineProperty(n.prototype, "id", {
        /** The collection's identifier. */ get: function() {
            return this._query.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "path", {
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */
        get: function() {
            return this._query.path.canonicalString();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "parent", {
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */
        get: function() {
            var t = this._path.popLast();
            return t.isEmpty() ? null : new ia(this.firestore, 
            /* converter= */ null, new gt(t));
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.withConverter = function(t) {
        return new n(this.firestore, t, this._path);
    }, n;
}(oa);

/**
 * A `Query` refers to a Query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */ function ua(t, n) {
    for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
    if (t = b(t), Yu("collection", "path", n), t instanceof na) {
        var o = rt.fromString.apply(rt, e([ n ], r));
        return $u(o), new sa(t, /* converter= */ null, o);
    }
    if (!(t instanceof ia || t instanceof sa)) throw new P(O.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    var s = rt.fromString.apply(rt, e([ t.path ], r)).child(rt.fromString(n));
    return $u(s), new sa(t.firestore, 
    /* converter= */ null, s);
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
 */ function aa(t, e) {
    if (t = Zu(t, na), Yu("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new P(O.INVALID_ARGUMENT, "Invalid collection ID '" + e + "' passed to function collectionGroup(). Collection IDs must not contain '/'.");
    return new oa(t, 
    /* converter= */ null, 
    /**
 * Creates a new Query for a collection group query that matches all documents
 * within the provided collection group.
 */
    function(t) {
        return new ne(rt.emptyPath(), t);
    }(e));
}

function ca(t, n) {
    for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
    if (t = b(t), 
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    1 === arguments.length && (n = W.u()), Yu("doc", "path", n), t instanceof na) {
        var o = rt.fromString.apply(rt, e([ n ], r));
        return Xu(o), new ia(t, 
        /* converter= */ null, new gt(o));
    }
    if (!(t instanceof ia || t instanceof sa)) throw new P(O.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    var s = t._path.child(rt.fromString.apply(rt, e([ n ], r)));
    return Xu(s), new ia(t.firestore, t instanceof sa ? t.converter : null, new gt(s));
}

/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function ha(t, e) {
    return t = b(t), e = b(e), (t instanceof ia || t instanceof sa) && (e instanceof ia || e instanceof sa) && t.firestore === e.firestore && t.path === e.path && t.converter === e.converter
    /**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */;
}

function fa(t, e) {
    return t = b(t), e = b(e), t instanceof oa && e instanceof oa && t.firestore === e.firestore && de(t._query, e._query) && t.converter === e.converter
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
 */;
}

var la = /** @class */ function() {
    function t() {
        var t = this;
        // The last promise in the queue.
                this.dc = Promise.resolve(), 
        // A list of retryable operations. Retryable operations are run in order and
        // retried with backoff.
        this.wc = [], 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this._c = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.mc = [], 
        // visible for testing
        this.gc = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.yc = !1, 
        // Enabled during shutdown on Safari to prevent future access to IndexedDB.
        this.Ec = !1, 
        // List of TimerIds to fast-forward delays for.
        this.Tc = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.Zi = new Uo(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.Ic = function() {
            var e = Vo();
            e && q("AsyncQueue", "Visibility state changed to " + e.visibilityState), t.Zi.Gi();
        };
        var e = Vo();
        e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.Ic);
    }
    return Object.defineProperty(t.prototype, "isShuttingDown", {
        get: function() {
            return this._c;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    t.prototype.enqueueAndForget = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }, t.prototype.enqueueAndForgetEvenWhileRestricted = function(t) {
        this.Ac(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.Rc(t);
    }, t.prototype.enterRestrictedMode = function(t) {
        if (!this._c) {
            this._c = !0, this.Ec = t || !1;
            var e = Vo();
            e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.Ic);
        }
    }, t.prototype.enqueue = function(t) {
        var e = this;
        if (this.Ac(), this._c) 
        // Return a Promise which never resolves.
        return new Promise((function() {}));
        // Create a deferred Promise that we can return to the callee. This
        // allows us to return a "hanging Promise" only to the callee and still
        // advance the queue even when the operation is not run.
                var n = new kr;
        return this.Rc((function() {
            return e._c && e.Ec ? Promise.resolve() : (t().then(n.resolve, n.reject), n.promise);
        })).then((function() {
            return n.promise;
        }));
    }, t.prototype.enqueueRetryable = function(t) {
        var e = this;
        this.enqueueAndForget((function() {
            return e.wc.push(t), e.Pc();
        }));
    }, 
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    t.prototype.Pc = function() {
        return n(this, void 0, void 0, (function() {
            var t, e = this;
            return r(this, (function(n) {
                switch (n.label) {
                  case 0:
                    if (0 === this.wc.length) return [ 3 /*break*/ , 5 ];
                    n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , this.wc[0]() ];

                  case 2:
                    return n.sent(), this.wc.shift(), this.Zi.reset(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (!Pr(t = n.sent())) throw t;
                    // Failure will be handled by AsyncQueue
                                        return q("AsyncQueue", "Operation failed with retryable error: " + t), 
                    [ 3 /*break*/ , 4 ];

                  case 4:
                    this.wc.length > 0 && 
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
                    this.Zi.Qi((function() {
                        return e.Pc();
                    })), n.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Rc = function(t) {
        var e = this, n = this.dc.then((function() {
            return e.yc = !0, t().catch((function(t) {
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw e.gc = t, e.yc = !1, U("INTERNAL UNHANDLED ERROR: ", 
                /**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error - Error or FirestoreError
 */
                function(t) {
                    var e = t.message || "";
                    return t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack), 
                    e;
                }(t)), t;
            })).then((function(t) {
                return e.yc = !1, t;
            }));
        }));
        return this.dc = n, n;
    }, t.prototype.enqueueAfterDelay = function(t, e, n) {
        var r = this;
        this.Ac(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.Tc.indexOf(t) > -1 && (e = 0);
        var i = gs.createAndSchedule(this, t, e, n, (function(t) {
            return r.bc(t);
        }));
        return this.mc.push(i), i;
    }, t.prototype.Ac = function() {
        this.gc && K();
    }, t.prototype.verifyOperationInProgress = function() {}, 
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t.prototype.vc = function() {
        return n(this, void 0, void 0, (function() {
            var t;
            return r(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , t = this.dc ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    if (t !== this.dc) return [ 3 /*break*/ , 0 ];
                    e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    t.prototype.Vc = function(t) {
        for (var e = 0, n = this.mc; e < n.length; e++) {
            if (n[e].timerId === t) return !0;
        }
        return !1;
    }, 
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    t.prototype.Sc = function(t) {
        var e = this;
        // Note that draining may generate more delayed ops, so we do that first.
                return this.vc().then((function() {
            // Run ops in the same order they'd run if they ran naturally.
            e.mc.sort((function(t, e) {
                return t.targetTimeMs - e.targetTimeMs;
            }));
            for (var n = 0, r = e.mc; n < r.length; n++) {
                var i = r[n];
                if (i.skipDelay(), "all" /* All */ !== t && i.timerId === t) break;
            }
            return e.vc();
        }));
    }, 
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    t.prototype.Dc = function(t) {
        this.Tc.push(t);
    }, 
    /** Called once a DelayedOperation is run or canceled. */ t.prototype.bc = function(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var e = this.mc.indexOf(t);
        this.mc.splice(e, 1);
    }, t;
}();

function da(t) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(t, e) {
        if ("object" != typeof t || null === t) return !1;
        for (var n = t, r = 0, i = [ "next", "error", "complete" ]; r < i.length; r++) {
            var o = i[r];
            if (o in n && "function" == typeof n[o]) return !0;
        }
        return !1;
    }(t);
}

var pa = /** @class */ function() {
    function t() {
        this._progressObserver = {}, this._taskCompletionResolver = new kr, this._lastProgress = {
            taskState: "Running",
            totalBytes: 0,
            totalDocuments: 0,
            bytesLoaded: 0,
            documentsLoaded: 0
        }
        /**
     * Registers functions to listen to bundle loading progress events.
     * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
     *   each time a Firestore document is loaded from the bundle.
     * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
     *   error, and there should be no more updates after this.
     * @param complete - Called when the loading task is complete.
     */;
    }
    return t.prototype.onProgress = function(t, e, n) {
        this._progressObserver = {
            next: t,
            error: e,
            complete: n
        };
    }, 
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    t.prototype.catch = function(t) {
        return this._taskCompletionResolver.promise.catch(t);
    }, 
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    t.prototype.then = function(t, e) {
        return this._taskCompletionResolver.promise.then(t, e);
    }, 
    /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */
    t.prototype._completeWith = function(t) {
        this._updateProgress(t), this._progressObserver.complete && this._progressObserver.complete(), 
        this._taskCompletionResolver.resolve(t);
    }, 
    /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */
    t.prototype._failWith = function(t) {
        this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), 
        this._progressObserver.error && this._progressObserver.error(t), this._taskCompletionResolver.reject(t);
    }, 
    /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */
    t.prototype._updateProgress = function(t) {
        this._lastProgress = t, this._progressObserver.next && this._progressObserver.next(t);
    }, t;
}(), ya = -1, va = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, n) || this).type = "firestore", r._queue = new la, r._persistenceKey = "name" in t ? t.name : "[DEFAULT]", 
        r;
    }
    return t(n, e), n.prototype._terminate = function() {
        return this._firestoreClient || 
        // The client must be initialized to ensure that all subsequent API
        // usage throws an exception.
        ba(this), this._firestoreClient.terminate();
    }, n;
}(na);

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
/** DOMException error code constants. */
/**
 * Initializes a new instance of Cloud Firestore with the provided settings.
 * Can only be called before any other function, including
 * {@link getFirestore}. If the custom settings are empty, this function is
 * equivalent to calling {@link getFirestore}.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} with which the `Firestore` instance will
 * be associated.
 * @param settings - A settings object to configure the `Firestore` instance.
 * @returns A newly initialized `Firestore` instance.
 */
function ma(t, e) {
    var n = i(t, "firestore-exp");
    if (n.isInitialized()) throw new P(O.FAILED_PRECONDITION, "Firestore can only be initialized once per app.");
    if (void 0 !== e.cacheSizeBytes && -1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new P(O.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
    return n.initialize({
        options: e
    });
}

/**
 * Returns the existing instance of Firestore that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned Firestore
 * instance is associated with.
 * @returns The `Firestore` instance of the provided app.
 */ function ga(t) {
    return void 0 === t && (t = o()), i(t, "firestore-exp").getImmediate();
}

/**
 * @internal
 */ function wa(t) {
    return t._firestoreClient || ba(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
}

function ba(t) {
    var e, n = t._freezeSettings(), r = function(t, e, n, r) {
        return new Uu(t, e, n, r.host, r.ssl, r.experimentalForceLongPolling, r.experimentalAutoDetectLongPolling, r.useFetchStreams);
    }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, n);
    t._firestoreClient = new Au(t._credentials, t._queue, r);
}

/**
 * Attempts to enable persistent storage, if possible.
 *
 * Must be called before any other functions (other than
 * {@link initializeFirestore}, {@link getFirestore} or
 * {@link clearIndexedDbPersistence}.
 *
 * If this fails, `enableIndexedDbPersistence()` will reject the promise it
 * returns. Note that even after this failure, the `Firestore` instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The `Firestore` instance to enable persistence for.
 * @param persistenceSettings - Optional settings object to configure
 * persistence.
 * @returns A promise that represents successfully enabling persistent storage.
 */ function Ia(t, e) {
    xa(t = Zu(t, va));
    var n = wa(t), r = t._freezeSettings(), i = new Tu;
    return Ea(n, i, new bu(i, r.cacheSizeBytes, null == e ? void 0 : e.forceOwnership));
}

/**
 * Attempts to enable multi-tab persistent storage, if possible. If enabled
 * across all tabs, all operations share access to local persistence, including
 * shared execution of queries and latency-compensated local document updates
 * across all connected instances.
 *
 * If this fails, `enableMultiTabIndexedDbPersistence()` will reject the promise
 * it returns. Note that even after this failure, the `Firestore` instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab and
 *     multi-tab is not enabled.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The `Firestore` instance to enable persistence for.
 * @returns A promise that represents successfully enabling persistent
 * storage.
 */ function Ta(t) {
    xa(t = Zu(t, va));
    var e = wa(t), n = t._freezeSettings(), r = new Tu;
    return Ea(e, r, new Iu(r, n.cacheSizeBytes));
}

/**
 * Registers both the `OfflineComponentProvider` and `OnlineComponentProvider`.
 * If the operation fails with a recoverable error (see
 * `canRecoverFromIndexedDbError()` below), the returned Promise is rejected
 * but the client remains usable.
 */ function Ea(t, e, i) {
    var o = this, s = new kr;
    return t.asyncQueue.enqueue((function() {
        return n(o, void 0, void 0, (function() {
            var n;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return r.trys.push([ 0, 3, , 4 ]), [ 4 /*yield*/ , ku(t, i) ];

                  case 1:
                    return r.sent(), [ 4 /*yield*/ , Cu(t, e) ];

                  case 2:
                    return r.sent(), s.resolve(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (!
                    /**
         * Decides whether the provided error allows us to gracefully disable
         * persistence (as opposed to crashing the client).
         */
                    function(t) {
                        return "FirebaseError" === t.name ? t.code === O.FAILED_PRECONDITION || t.code === O.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || (22 === t.code || 20 === t.code || 
                        // Firefox Private Browsing mode disables IndexedDb and returns
                        // INVALID_STATE for any usage.
                        11 === t.code);
                    }(n = r.sent())) throw n;
                    return console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + n), 
                    s.reject(n), [ 3 /*break*/ , 4 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    })).then((function() {
        return s.promise;
    }));
}

function Sa(t) {
    var e = this;
    if (t._initialized && !t._terminated) throw new P(O.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
    var i = new kr;
    return t._queue.enqueueAndForgetEvenWhileRestricted((function() {
        return n(e, void 0, void 0, (function() {
            var e;
            return r(this, (function(o) {
                switch (o.label) {
                  case 0:
                    return o.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , function(t) {
                        return n(this, void 0, void 0, (function() {
                            var e;
                            return r(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return Rr.gt() ? (e = t + "main", [ 4 /*yield*/ , Rr.delete(e) ]) : [ 2 /*return*/ , Promise.resolve() ];

                                  case 1:
                                    return n.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(Ki(t._databaseId, t._persistenceKey)) ];

                  case 1:
                    return o.sent(), i.resolve(), [ 3 /*break*/ , 3 ];

                  case 2:
                    return e = o.sent(), i.reject(e), [ 3 /*break*/ , 3 ];

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    })), i.promise
    /**
 * Waits until all currently pending writes for the active user have been
 * acknowledged by the backend.
 *
 * The returned Promise resolves immediately if there are no outstanding writes.
 * Otherwise, the Promise waits for all previously issued writes (including
 * those written in a previous app session), but it does not wait for writes
 * that were added after the function is called. If you want to wait for
 * additional writes, call `waitForPendingWrites()` again.
 *
 * Any outstanding `waitForPendingWrites()` Promises are rejected during user
 * changes.
 *
 * @returns A Promise which resolves when all currently pending writes have been
 * acknowledged by the backend.
 */;
}

function _a(t) {
    return function(t) {
        var e = this, i = new kr;
        return t.asyncQueue.enqueueAndForget((function() {
            return n(e, void 0, void 0, (function() {
                var e;
                return r(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = Xs, [ 4 /*yield*/ , Fu(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), i ]) ];
                    }
                }));
            }));
        })), i.promise;
    }(wa(t = Zu(t, va)));
}

/**
 * Re-enables use of the network for this Firestore instance after a prior
 * call to {@link disableNetwork}.
 *
 * @returns A promise that is resolved once the network has been enabled.
 */ function Na(t) {
    return function(t) {
        var e = this;
        return t.asyncQueue.enqueue((function() {
            return n(e, void 0, void 0, (function() {
                var e, n;
                return r(this, (function(r) {
                    switch (r.label) {
                      case 0:
                        return [ 4 /*yield*/ , Lu(t) ];

                      case 1:
                        return e = r.sent(), [ 4 /*yield*/ , Pu(t) ];

                      case 2:
                        return n = r.sent(), [ 2 /*return*/ , (e.setNetworkEnabled(!0), function(t) {
                            var e = z(t);
                            return e.Fr.delete(0 /* UserDisabled */), Wo(e);
                        }(n)) ];
                    }
                }));
            }));
        }));
    }
    /** Disables the network connection. Pending operations will not complete. */ (wa(t = Zu(t, va)));
}

/**
 * Disables network usage for this instance. It can be re-enabled via {@link
 * enableNetwork}. While the network is disabled, any snapshot listeners,
 * `getDoc()` or `getDocs()` calls will return results from cache, and any write
 * operations will be queued until the network is restored.
 *
 * @returns A promise that is resolved once the network has been disabled.
 */ function Da(t) {
    return function(t) {
        var e = this;
        return t.asyncQueue.enqueue((function() {
            return n(e, void 0, void 0, (function() {
                var e, i;
                return r(this, (function(o) {
                    switch (o.label) {
                      case 0:
                        return [ 4 /*yield*/ , Lu(t) ];

                      case 1:
                        return e = o.sent(), [ 4 /*yield*/ , Pu(t) ];

                      case 2:
                        return i = o.sent(), [ 2 /*return*/ , (e.setNetworkEnabled(!1), function(t) {
                            return n(this, void 0, void 0, (function() {
                                var e;
                                return r(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return (e = z(t)).Fr.add(0 /* UserDisabled */), [ 4 /*yield*/ , Ho(e) ];

                                      case 1:
                                        return n.sent(), 
                                        // Set the OnlineState to Offline so get()s return from cache, etc.
                                        e.Br.set("Offline" /* Offline */), [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }(i)) ];
                    }
                }));
            }));
        }));
    }
    /**
 * Returns a Promise that resolves when all writes that were pending at the time
 * this method was called received server acknowledgement. An acknowledgement
 * can be either acceptance or rejection.
 */ (wa(t = Zu(t, va)));
}

/**
 * Terminates the provided Firestore instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` function
 * may be used. Any other function will throw a `FirestoreError`.
 *
 * To restart after termination, create a new instance of FirebaseFirestore with
 * {@link getFirestore}.
 *
 * Termination does not cancel any pending writes, and any promises that are
 * awaiting a response from the server will not be resolved. If you have
 * persistence enabled, the next time you start this instance, it will resume
 * sending these writes to the server.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all
 * of its resources or in combination with `clearIndexedDbPersistence()` to
 * ensure that all local state is destroyed between test runs.
 *
 * @returns A promise that is resolved when the instance has been successfully
 * terminated.
 */ function Aa(t) {
    return s(t.app, "firestore-exp"), t._delete()
    /**
 * Loads a Firestore bundle into the local cache.
 *
 * @param firestore - The `Firestore` instance to load bundles for for.
 * @param bundleData - An object representing the bundle to be loaded. Valid objects are
 *   `ArrayBuffer`, `ReadableStream<Uint8Array>` or `string`.
 *
 * @returns
 *   A `LoadBundleTask` object, which notifies callers with progress updates, and completion
 *   or error events. It can be used as a `Promise<LoadBundleTaskProgress>`.
 */;
}

function ka(t, e) {
    var i = wa(t = Zu(t, va)), o = new pa;
    return function(t, e, i, o) {
        var s = this, u = function(t, e) {
            return function(t, e) {
                return new _u(t, e);
            }(function(t, e) {
                if (t instanceof Uint8Array) return Eu(t, e);
                if (t instanceof ArrayBuffer) return Eu(new Uint8Array(t), e);
                if (t instanceof ReadableStream) return t.getReader();
                throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream");
            }("string" == typeof t ? (new TextEncoder).encode(t) : t), e);
        }(i, qo(e));
        t.asyncQueue.enqueueAndForget((function() {
            return n(s, void 0, void 0, (function() {
                var e;
                return r(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = gu, [ 4 /*yield*/ , Fu(t) ];

                      case 1:
                        return e.apply(void 0, [ n.sent(), u, o ]), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }(i, t._databaseId, e, o), o
    /**
 * Reads a Firestore `Query` from local cache, identified by the given name.
 *
 * The named queries are packaged  into bundles on the server side (along
 * with resulting documents), and loaded to local cache using `loadBundle`. Once in local
 * cache, use this method to extract a `Query` by name.
 */;
}

function Ca(t, e) {
    return function(t, e) {
        var i = this;
        return t.asyncQueue.enqueue((function() {
            return n(i, void 0, void 0, (function() {
                var n;
                return r(this, (function(r) {
                    switch (r.label) {
                      case 0:
                        return n = function(t, e) {
                            var n = z(t);
                            return n.persistence.runTransaction("Get named query", "readonly", (function(t) {
                                return n.Ke.getNamedQuery(t, e);
                            }));
                        }, [ 4 /*yield*/ , Ou(t) ];

                      case 1:
                        return [ 2 /*return*/ , n.apply(void 0, [ r.sent(), e ]) ];
                    }
                }));
            }));
        }));
    }(wa(t = Zu(t, va)), e).then((function(e) {
        return e ? new oa(t, null, e.query) : null;
    }));
}

function xa(t) {
    if (t._initialized || t._terminated) throw new P(O.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
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
 */ var Ra = /** @class */ function() {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function t() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var n = 0; n < t.length; ++n) if (0 === t[n].length) throw new P(O.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new ot(t);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */    return t.prototype.isEqual = function(t) {
        return this._internalPath.isEqual(t._internalPath);
    }, t;
}();

/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */ function La() {
    return new Ra("__name__");
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
 */ var Oa = /** @class */ function() {
    /** @hideconstructor */
    function t(t) {
        this._byteString = t;
    }
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */    return t.fromBase64String = function(e) {
        try {
            return new t(ut.fromBase64String(e));
        } catch (e) {
            throw new P(O.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e);
        }
    }, 
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    t.fromUint8Array = function(e) {
        return new t(ut.fromUint8Array(e));
    }, 
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */
    t.prototype.toBase64 = function() {
        return this._byteString.toBase64();
    }, 
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */
    t.prototype.toUint8Array = function() {
        return this._byteString.toUint8Array();
    }, 
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */
    t.prototype.toString = function() {
        return "Bytes(base64: " + this.toBase64() + ")";
    }, 
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return this._byteString.isEqual(t._byteString);
    }, t;
}(), Pa = 
/**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
function(t) {
    this._methodName = t;
}, Fa = /** @class */ function() {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    function t(t, e) {
        if (!isFinite(t) || t < -90 || t > 90) throw new P(O.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new P(O.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t, this._long = e;
    }
    return Object.defineProperty(t.prototype, "latitude", {
        /**
         * The latitude of this `GeoPoint` instance.
         */
        get: function() {
            return this._lat;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "longitude", {
        /**
         * The longitude of this `GeoPoint` instance.
         */
        get: function() {
            return this._long;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */
    t.prototype.isEqual = function(t) {
        return this._lat === t._lat && this._long === t._long;
    }, 
    /** Returns a JSON-serializable representation of this GeoPoint. */ t.prototype.toJSON = function() {
        return {
            latitude: this._lat,
            longitude: this._long
        };
    }, 
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    t.prototype._compareTo = function(t) {
        return H(this._lat, t._lat) || H(this._long, t._long);
    }, t;
}(), Ma = /^__.*__$/, Va = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return null !== this.fieldMask ? new ze(t, this.data, this.fieldMask, e, this.fieldTransforms) : new Ge(t, this.data, e, this.fieldTransforms);
    }, t;
}(), qa = /** @class */ function() {
    function t(t, 
    // The fieldMask does not include document transforms.
    e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return new ze(t, this.data, this.fieldMask, e, this.fieldTransforms);
    }, t;
}();

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
 */ function Ua(t) {
    switch (t) {
      case 0 /* Set */ :
 // fall through
              case 2 /* MergeSet */ :
 // fall through
              case 1 /* Update */ :
        return !0;

      case 3 /* Argument */ :
      case 4 /* ArrayArgument */ :
        return !1;

      default:
        throw K();
    }
}

/** A "context" object passed around while parsing user data. */ var Ba = /** @class */ function() {
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
    function t(t, e, n, r, i, o) {
        this.settings = t, this.databaseId = e, this.R = n, this.ignoreUndefinedProperties = r, 
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        void 0 === i && this.Cc(), this.fieldTransforms = i || [], this.fieldMask = o || [];
    }
    return Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this.settings.path;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "Nc", {
        get: function() {
            return this.settings.Nc;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /** Returns a new context with the specified settings overwritten. */ t.prototype.xc = function(e) {
        return new t(Object.assign(Object.assign({}, this.settings), e), this.databaseId, this.R, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    }, t.prototype.kc = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.xc({
            path: n,
            $c: !1
        });
        return r.Oc(t), r;
    }, t.prototype.Fc = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.xc({
            path: n,
            $c: !1
        });
        return r.Cc(), r;
    }, t.prototype.Mc = function(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.xc({
            path: void 0,
            $c: !0
        });
    }, t.prototype.Lc = function(t) {
        return uc(t, this.settings.methodName, this.settings.Bc || !1, this.path, this.settings.Uc);
    }, 
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */ t.prototype.contains = function(t) {
        return void 0 !== this.fieldMask.find((function(e) {
            return t.isPrefixOf(e);
        })) || void 0 !== this.fieldTransforms.find((function(e) {
            return t.isPrefixOf(e.field);
        }));
    }, t.prototype.Cc = function() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (var t = 0; t < this.path.length; t++) this.Oc(this.path.get(t));
    }, t.prototype.Oc = function(t) {
        if (0 === t.length) throw this.Lc("Document fields must not be empty");
        if (Ua(this.Nc) && Ma.test(t)) throw this.Lc('Document fields cannot begin and end with "__"');
    }, t;
}(), ja = /** @class */ function() {
    function t(t, e, n) {
        this.databaseId = t, this.ignoreUndefinedProperties = e, this.R = n || qo(t)
        /** Creates a new top-level parse context. */;
    }
    return t.prototype.qc = function(t, e, n, r) {
        return void 0 === r && (r = !1), new Ba({
            Nc: t,
            methodName: e,
            Uc: n,
            path: ot.emptyPath(),
            $c: !1,
            Bc: r
        }, this.databaseId, this.R, this.ignoreUndefinedProperties);
    }, t;
}();

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ function Ka(t) {
    var e = t._freezeSettings(), n = qo(t._databaseId);
    return new ja(t._databaseId, !!e.ignoreUndefinedProperties, n);
}

/** Parse document data from a set() call. */ function Ga(t, e, n, r, i, o) {
    void 0 === o && (o = {});
    var s = t.qc(o.merge || o.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
    rc("Data must be an object, but it was:", s, r);
    var u, a, c = ec(r, s);
    if (o.merge) u = new st(s.fieldMask), a = s.fieldTransforms; else if (o.mergeFields) {
        for (var h = [], f = 0, l = o.mergeFields; f < l.length; f++) {
            var d = ic(e, l[f], n);
            if (!s.contains(d)) throw new P(O.INVALID_ARGUMENT, "Field '" + d + "' is specified in your field mask but missing from your input data.");
            ac(h, d) || h.push(d);
        }
        u = new st(h), a = s.fieldTransforms.filter((function(t) {
            return u.covers(t.field);
        }));
    } else u = null, a = s.fieldTransforms;
    return new Va(new Lt(c), u, a);
}

var za = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        if (2 /* MergeSet */ !== t.Nc) throw 1 /* Update */ === t.Nc ? t.Lc(this._methodName + "() can only appear at the top level of your update data") : t.Lc(this._methodName + "() cannot be used with set() unless you pass {merge:true}");
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
                return t.fieldMask.push(t.path), null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(Pa);

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
 */ function Qa(t, e, n) {
    return new Ba({
        Nc: 3 /* Argument */ ,
        Uc: e.settings.Uc,
        methodName: t._methodName,
        $c: n
    }, e.databaseId, e.R, e.ignoreUndefinedProperties);
}

var Wa = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        return new Oe(t.path, new Ne);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(Pa), Ha = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Kc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = Qa(this, t, 
        /*array=*/ !0), n = this.Kc.map((function(t) {
            return tc(t, e);
        })), r = new De(n);
        return new Oe(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Pa), Ya = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Kc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = Qa(this, t, 
        /*array=*/ !0), n = this.Kc.map((function(t) {
            return tc(t, e);
        })), r = new ke(n);
        return new Oe(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Pa), Xa = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).jc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = new xe(t.R, Ie(t.R, this.jc));
        return new Oe(t.path, e);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Pa);

/** Parse update data from an update() call. */ function $a(t, e, n, r) {
    var i = t.qc(1 /* Update */ , e, n);
    rc("Data must be an object, but it was:", i, r);
    var o = [], s = Lt.empty();
    tt(r, (function(t, r) {
        var u = sc(e, t, n);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                r = b(r);
        var a = i.Fc(u);
        if (r instanceof za) 
        // Add it to the field mask, but don't add anything to updateData.
        o.push(u); else {
            var c = tc(r, a);
            null != c && (o.push(u), s.set(u, c));
        }
    }));
    var u = new st(o);
    return new qa(s, u, i.fieldTransforms);
}

/** Parse update data from a list of field/value arguments. */ function Ja(t, e, n, r, i, o) {
    var s = t.qc(1 /* Update */ , e, n), u = [ ic(e, r, n) ], a = [ i ];
    if (o.length % 2 != 0) throw new P(O.INVALID_ARGUMENT, "Function " + e + "() needs to be called with an even number of arguments that alternate between field names and values.");
    for (var c = 0; c < o.length; c += 2) u.push(ic(e, o[c])), a.push(o[c + 1]);
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (var h = [], f = Lt.empty(), l = u.length - 1; l >= 0; --l) if (!ac(h, u[l])) {
        var d = u[l], p = a[l];
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        p = b(p);
        var y = s.Fc(d);
        if (p instanceof za) 
        // Add it to the field mask, but don't add anything to updateData.
        h.push(d); else {
            var v = tc(p, y);
            null != v && (h.push(d), f.set(d, v));
        }
    }
    var m = new st(h);
    return new qa(f, m, s.fieldTransforms);
}

/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */ function Za(t, e, n, r) {
    return void 0 === r && (r = !1), tc(n, t.qc(r ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
}

/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */ function tc(t, e) {
    if (nc(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    t = b(t))) return rc("Unsupported field value:", e, t), ec(t, e);
    if (t instanceof Pa) 
    // FieldValues usually parse into transforms (except FieldValue.delete())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.
    /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
    return function(t, e) {
        // Sentinels are only supported with writes, and not within arrays.
        if (!Ua(e.Nc)) throw e.Lc(t._methodName + "() can only be used with update() and set()");
        if (!e.path) throw e.Lc(t._methodName + "() is not currently supported inside arrays");
        var n = t._toFieldTransform(e);
        n && e.fieldTransforms.push(n);
    }(t, e), null;
    if (void 0 === t && e.ignoreUndefinedProperties) 
    // If the input is undefined it can never participate in the fieldMask, so
    // don't handle this below. If `ignoreUndefinedProperties` is false,
    // `parseScalarValue` will reject an undefined value.
    return null;
    if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.fieldMask.push(e.path), t instanceof Array) {
        // TODO(b/34871131): Include the path containing the array in the error
        // message.
        // In the case of IN queries, the parsed data is an array (representing
        // the set of values to be included for the IN query) that may directly
        // contain additional arrays (each representing an individual field
        // value), so we disable this validation.
        if (e.settings.$c && 4 /* ArrayArgument */ !== e.Nc) throw e.Lc("Nested arrays are not supported");
        return function(t, e) {
            for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
                var s = tc(o[i], e.Mc(r));
                null == s && (
                // Just include nulls in the array for fields being replaced with a
                // sentinel.
                s = {
                    nullValue: "NULL_VALUE"
                }), n.push(s), r++;
            }
            return {
                arrayValue: {
                    values: n
                }
            };
        }(t, e);
    }
    return function(t, e) {
        if (null === (t = b(t))) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return Ie(e.R, t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            var n = $.fromDate(t);
            return {
                timestampValue: Cn(e.R, n)
            };
        }
        if (t instanceof $) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            var r = new $(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: Cn(e.R, r)
            };
        }
        if (t instanceof Fa) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof Oa) return {
            bytesValue: xn(e.R, t._byteString)
        };
        if (t instanceof ia) {
            var i = e.databaseId, o = t.firestore._databaseId;
            if (!o.isEqual(i)) throw e.Lc("Document reference is for database " + o.projectId + "/" + o.database + " but should be for database " + i.projectId + "/" + i.database);
            return {
                referenceValue: On(t.firestore._databaseId || e.databaseId, t._key.path)
            };
        }
        throw e.Lc("Unsupported field value: " + Ju(t));
    }(t, e);
}

function ec(t, e) {
    var n = {};
    return et(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path) : tt(t, (function(t, r) {
        var i = tc(r, e.kc(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function nc(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof $ || t instanceof Fa || t instanceof Oa || t instanceof ia || t instanceof Pa);
}

function rc(t, e, n) {
    if (!nc(n) || !function(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }(n)) {
        var r = Ju(n);
        throw "an object" === r ? e.Lc(t + " a custom object") : e.Lc(t + " " + r);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function ic(t, e, n) {
    if (
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    (e = b(e)) instanceof Ra) return e._internalPath;
    if ("string" == typeof e) return sc(t, e);
    throw uc("Field path arguments must be of type string or FieldPath.", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
}

/**
 * Matches any characters in a field path string that are reserved.
 */ var oc = new RegExp("[~\\*/\\[\\]]");

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */ function sc(t, n, r) {
    if (n.search(oc) >= 0) throw uc("Invalid field path (" + n + "). Paths must not contain '~', '*', '/', '[', or ']'", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, r);
    try {
        return (new (Ra.bind.apply(Ra, e([ void 0 ], n.split(".")))))._internalPath;
    } catch (e) {
        throw uc("Invalid field path (" + n + "). Paths must not be empty, begin with '.', end with '.', or contain '..'", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, r);
    }
}

function uc(t, e, n, r, i) {
    var o = r && !r.isEmpty(), s = void 0 !== i, u = "Function " + e + "() called with invalid data";
    n && (u += " (via `toFirestore()`)");
    var a = "";
    return (o || s) && (a += " (found", o && (a += " in field " + r), s && (a += " in document " + i), 
    a += ")"), new P(O.INVALID_ARGUMENT, (u += ". ") + t + a)
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */;
}

function ac(t, e) {
    return t.some((function(t) {
        return t.isEqual(e);
    }));
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
 */ var cc = /** @class */ function() {
    // Note: This class is stripped down version of the DocumentSnapshot in
    // the legacy SDK. The changes are:
    // - No support for SnapshotMetadata.
    // - No support for SnapshotOptions.
    /** @hideconstructor protected */
    function t(t, e, n, r, i) {
        this._firestore = t, this._userDataWriter = e, this._key = n, this._document = r, 
        this._converter = i;
    }
    return Object.defineProperty(t.prototype, "id", {
        /** Property of the `DocumentSnapshot` that provides the document's ID. */ get: function() {
            return this._key.path.lastSegment();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ref", {
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */
        get: function() {
            return new ia(this._firestore, this._converter, this._key);
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */
    t.prototype.exists = function() {
        return null !== this._document;
    }, 
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */
    t.prototype.data = function() {
        if (this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                var t = new hc(this._firestore, this._userDataWriter, this._key, this._document, 
                /* converter= */ null);
                return this._converter.fromFirestore(t);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    }, 
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
    t.prototype.get = function(t) {
        if (this._document) {
            var e = this._document.data.field(fc("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e);
        }
    }, t;
}(), hc = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */    return t(n, e), n.prototype.data = function() {
        return e.prototype.data.call(this);
    }, n;
}(cc);

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
/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */
function fc(t, e) {
    return "string" == typeof e ? sc(t, e) : e instanceof Ra ? e._internalPath : e._delegate._internalPath;
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
 * Metadata about a snapshot, describing the state of the snapshot.
 */ var lc = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this.hasPendingWrites = t, this.fromCache = e
        /**
     * Returns true if this `SnapshotMetadata` is equal to the provided one.
     *
     * @param other - The `SnapshotMetadata` to compare against.
     * @returns true if this `SnapshotMetadata` is equal to the provided one.
     */;
    }
    return t.prototype.isEqual = function(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }, t;
}(), dc = /** @class */ function(e) {
    /** @hideconstructor protected */
    function n(t, n, r, i, o, s) {
        var u = this;
        return (u = e.call(this, t, n, r, i, s) || this)._firestore = t, u._firestoreImpl = t, 
        u.metadata = o, u;
    }
    /**
     * Property of the `DocumentSnapshot` that signals whether or not the data
     * exists. True if the document exists.
     */    return t(n, e), n.prototype.exists = function() {
        return e.prototype.exists.call(this);
    }, 
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * By default, `FieldValue.serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document or `undefined` if
     * the document doesn't exist.
     */
    n.prototype.data = function(t) {
        if (void 0 === t && (t = {}), this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                var e = new pc(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
                /* converter= */ null);
                return this._converter.fromFirestore(e, t);
            }
            return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps);
        }
    }, 
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * By default, a `FieldValue.serverTimestamp()` that has not yet been set to
     * its final value will be returned as `null`. You can override this by
     * passing an options object.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @param options - An options object to configure how the field is retrieved
     * from the snapshot (for example the desired behavior for server timestamps
     * that have not yet been set to their final value).
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n.prototype.get = function(t, e) {
        if (void 0 === e && (e = {}), this._document) {
            var n = this._document.data.field(fc("DocumentSnapshot.get", t));
            if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
    }, n;
}(cc), pc = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * By default, `FieldValue.serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @override
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document.
     */    return t(n, e), n.prototype.data = function(t) {
        return void 0 === t && (t = {}), e.prototype.data.call(this, t);
    }, n;
}(dc), yc = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e, n, r) {
        this._firestore = t, this._userDataWriter = e, this._snapshot = r, this.metadata = new lc(r.hasPendingWrites, r.fromCache), 
        this.query = n;
    }
    return Object.defineProperty(t.prototype, "docs", {
        /** An array of all the documents in the `QuerySnapshot`. */ get: function() {
            var t = [];
            return this.forEach((function(e) {
                return t.push(e);
            })), t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "size", {
        /** The number of documents in the `QuerySnapshot`. */ get: function() {
            return this._snapshot.docs.size;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "empty", {
        /** True if there are no documents in the `QuerySnapshot`. */ get: function() {
            return 0 === this.size;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */
    t.prototype.forEach = function(t, e) {
        var n = this;
        this._snapshot.docs.forEach((function(r) {
            t.call(e, new pc(n._firestore, n._userDataWriter, r.key, r, new lc(n._snapshot.mutatedKeys.has(r.key), n._snapshot.fromCache), n.query.converter));
        }));
    }, 
    /**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */
    t.prototype.docChanges = function(t) {
        void 0 === t && (t = {});
        var e = !!t.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges) throw new P(O.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = 
        /** Calculates the array of DocumentChanges for a given ViewSnapshot. */
        function(t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
                var n = 0;
                return t._snapshot.docChanges.map((function(e) {
                    return {
                        type: "added",
                        doc: new pc(t._firestore, t._userDataWriter, e.doc.key, e.doc, new lc(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter),
                        oldIndex: -1,
                        newIndex: n++
                    };
                }));
            }
            // A DocumentSet that is updated incrementally as changes are applied to use
            // to lookup the index of a document.
            var r = t._snapshot.oldDocs;
            return t._snapshot.docChanges.filter((function(t) {
                return e || 3 /* Metadata */ !== t.type;
            })).map((function(e) {
                var n = new pc(t._firestore, t._userDataWriter, e.doc.key, e.doc, new lc(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter), i = -1, o = -1;
                return 0 /* Added */ !== e.type && (i = r.indexOf(e.doc.key), r = r.delete(e.doc.key)), 
                1 /* Removed */ !== e.type && (o = (r = r.add(e.doc)).indexOf(e.doc.key)), {
                    type: vc(e.type),
                    doc: n,
                    oldIndex: i,
                    newIndex: o
                };
            }));
        }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
    }, t;
}();

/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ function vc(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return K();
    }
}

// TODO(firestoreexp): Add tests for snapshotEqual with different snapshot
// metadata
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */ function mc(t, e) {
    return t instanceof dc && e instanceof dc ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof yc && e instanceof yc && t._firestore === e._firestore && fa(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot);
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
 */ function gc(t) {
    if (se(t) && 0 === t.explicitOrderBy.length) throw new P(O.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ var wc = function() {};

/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */ function bc(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    for (var r = 0, i = e; r < i.length; r++) {
        var o = i[r];
        t = o._apply(t);
    }
    return t;
}

var Ic = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).Qc = t, i.Wc = n, i.Gc = r, i.type = "where", 
        i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = Ka(t.firestore), n = function(t, e, n, r, i, o, s) {
            var u;
            if (i.isKeyField()) {
                if ("array-contains" /* ARRAY_CONTAINS */ === o || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === o) throw new P(O.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + o + "' queries on FieldPath.documentId().");
                if ("in" /* IN */ === o || "not-in" /* NOT_IN */ === o) {
                    Fc(s, o);
                    for (var a = [], c = 0, h = s; c < h.length; c++) {
                        var f = h[c];
                        a.push(Pc(r, t, f));
                    }
                    u = {
                        arrayValue: {
                            values: a
                        }
                    };
                } else u = Pc(r, t, s);
            } else "in" /* IN */ !== o && "not-in" /* NOT_IN */ !== o && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== o || Fc(s, o), 
            u = Za(n, "where", s, 
            /* allowArrays= */ "in" /* IN */ === o || "not-in" /* NOT_IN */ === o);
            var l = Bt.create(i, o, u);
            return function(t, e) {
                if (e.g()) {
                    var n = ae(t);
                    if (null !== n && !n.isEqual(e.field)) throw new P(O.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '" + n.toString() + "' and '" + e.field.toString() + "'");
                    var r = ue(t);
                    null !== r && Mc(t, e.field, r);
                }
                var i = function(t, e) {
                    for (var n = 0, r = t.filters; n < r.length; n++) {
                        var i = r[n];
                        if (e.indexOf(i.op) >= 0) return i.op;
                    }
                    return null;
                }(t, 
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
                function(t) {
                    switch (t) {
                      case "!=" /* NOT_EQUAL */ :
                        return [ "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ];

                      case "array-contains" /* ARRAY_CONTAINS */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "not-in" /* NOT_IN */ ];

                      case "in" /* IN */ :
                        return [ "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                      case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                      case "not-in" /* NOT_IN */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ , "!=" /* NOT_EQUAL */ ];

                      default:
                        return [];
                    }
                }(e.op));
                if (null !== i) 
                // Special case when it's a duplicate op to give a slightly clearer error message.
                throw i === e.op ? new P(O.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + e.op.toString() + "' filter.") : new P(O.INVALID_ARGUMENT, "Invalid query. You cannot use '" + e.op.toString() + "' filters with '" + i.toString() + "' filters.");
            }(t, l), l;
        }(t._query, 0, e, t.firestore._databaseId, this.Qc, this.Wc, this.Gc);
        return new oa(t.firestore, t.converter, function(t, e) {
            var n = t.filters.concat([ e ]);
            return new ne(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, n));
    }, n;
}(wc);

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
 */ function Tc(t, e, n) {
    var r = e, i = fc("where", t);
    return new Ic(i, r, n);
}

var Ec = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).Qc = t, r.zc = n, r.type = "orderBy", r;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = function(t, e, n) {
            if (null !== t.startAt) throw new P(O.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== t.endAt) throw new P(O.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            var r = new Jt(e, n);
            return function(t, e) {
                if (null === ue(t)) {
                    // This is the first order by. It must match any inequality.
                    var n = ae(t);
                    null !== n && Mc(t, n, e.field);
                }
            }(t, r), r;
        }(t._query, this.Qc, this.zc);
        return new oa(t.firestore, t.converter, function(t, e) {
            // TODO(dimond): validate that orderBy does not list the same key twice.
            var n = t.explicitOrderBy.concat([ e ]);
            return new ne(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, e));
    }, n;
}(wc);

/**
 * Creates a `QueryConstraint` that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created `Query`.
 */ function Sc(t, e) {
    void 0 === e && (e = "asc");
    var n = e, r = fc("orderBy", t);
    return new Ec(r, n);
}

var _c = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Hc = n, i.Jc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        return new oa(t.firestore, t.converter, le(t._query, this.Hc, this.Jc));
    }, n;
}(wc);

/**
 * Creates a `QueryConstraint` that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created `Query`.
 */ function Nc(t) {
    return ta("limit", t), new _c("limit", t, "F" /* First */)
    /**
 * Creates a `QueryConstraint` that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created `Query`.
 */;
}

function Dc(t) {
    return ta("limitToLast", t), new _c("limitToLast", t, "L" /* Last */);
}

var Ac = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Yc = n, i.Xc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = Oc(t, this.type, this.Yc, this.Xc);
        return new oa(t.firestore, t.converter, function(t, e) {
            return new ne(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
        }(t._query, e));
    }, n;
}(wc);

function kc() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return new Ac("startAt", t, /*before=*/ !0);
}

function Cc() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return new Ac("startAfter", t, 
    /*before=*/ !1);
}

var xc = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Yc = n, i.Xc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = Oc(t, this.type, this.Yc, this.Xc);
        return new oa(t.firestore, t.converter, function(t, e) {
            return new ne(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
        }(t._query, e));
    }, n;
}(wc);

function Rc() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return new xc("endBefore", t, /*before=*/ !0);
}

function Lc() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return new xc("endAt", t, /*before=*/ !1);
}

/** Helper function to create a bound from a document or fields */ function Oc(t, e, n, r) {
    if (n[0] = b(n[0]), n[0] instanceof cc) return function(t, e, n, r, i) {
        if (!r) throw new P(O.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + n + "().");
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
        for (var o = [], s = 0, u = he(t); s < u.length; s++) {
            var a = u[s];
            if (a.field.isKeyField()) o.push(Nt(e, r.key)); else {
                var c = r.data.field(a.field);
                if (lt(c)) throw new P(O.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + a.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === c) {
                    var h = a.field.canonicalString();
                    throw new P(O.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + h + "' (used as the orderBy) does not exist.");
                }
                o.push(c);
            }
        }
        return new Xt(o, i);
    }(t._query, t.firestore._databaseId, e, n[0]._document, r);
    var i = Ka(t.firestore);
    return function(t, e, n, r, i, o) {
        // Use explicit order by's because it has to match the query the user made
        var s = t.explicitOrderBy;
        if (i.length > s.length) throw new P(O.INVALID_ARGUMENT, "Too many arguments provided to " + r + "(). The number of arguments must be less than or equal to the number of orderBy() clauses");
        for (var u = [], a = 0; a < i.length; a++) {
            var c = i[a];
            if (s[a].field.isKeyField()) {
                if ("string" != typeof c) throw new P(O.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + r + "(), but got a " + typeof c);
                if (!ce(t) && -1 !== c.indexOf("/")) throw new P(O.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + r + "() must be a plain document ID, but '" + c + "' contains a slash.");
                var h = t.path.child(rt.fromString(c));
                if (!gt.isDocumentKey(h)) throw new P(O.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + r + "() must result in a valid document path, but '" + h + "' is not because it contains an odd number of segments.");
                var f = new gt(h);
                u.push(Nt(e, f));
            } else {
                var l = Za(n, r, c);
                u.push(l);
            }
        }
        return new Xt(u, o);
    }(t._query, t.firestore._databaseId, i, e, n, r);
}

function Pc(t, e, n) {
    if ("string" == typeof (n = b(n))) {
        if ("" === n) throw new P(O.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!ce(e) && -1 !== n.indexOf("/")) throw new P(O.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" + n + "' contains a '/' character.");
        var r = e.path.child(rt.fromString(n));
        if (!gt.isDocumentKey(r)) throw new P(O.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + r + "' is not because it has an odd number of segments (" + r.length + ").");
        return Nt(t, new gt(r));
    }
    if (n instanceof ia) return Nt(t, n._key);
    throw new P(O.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + Ju(n) + ".");
}

/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */ function Fc(t, e) {
    if (!Array.isArray(t) || 0 === t.length) throw new P(O.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
    if (t.length > 10) throw new P(O.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
}

function Mc(t, e, n) {
    if (!n.isEqual(e)) throw new P(O.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '" + e.toString() + "' and so you must also use '" + e.toString() + "' as your first argument to orderBy(), but your first orderBy() is on field '" + n.toString() + "' instead.");
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
 */ var Vc = /** @class */ function() {
    function t() {}
    return t.prototype.convertValue = function(t, e) {
        switch (void 0 === e && (e = "none"), wt(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return ht(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.convertTimestamp(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.convertServerTimestamp(t, e);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return this.convertBytes(ft(t.bytesValue));

          case 7 /* RefValue */ :
            return this.convertReference(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.convertGeoPoint(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.convertArray(t.arrayValue, e);

          case 10 /* ObjectValue */ :
            return this.convertObject(t.mapValue, e);

          default:
            throw K();
        }
    }, t.prototype.convertObject = function(t, e) {
        var n = this, r = {};
        return tt(t.fields, (function(t, i) {
            r[t] = n.convertValue(i, e);
        })), r;
    }, t.prototype.convertGeoPoint = function(t) {
        return new Fa(ht(t.latitude), ht(t.longitude));
    }, t.prototype.convertArray = function(t, e) {
        var n = this;
        return (t.values || []).map((function(t) {
            return n.convertValue(t, e);
        }));
    }, t.prototype.convertServerTimestamp = function(t, e) {
        switch (e) {
          case "previous":
            var n = dt(t);
            return null == n ? null : this.convertValue(n, e);

          case "estimate":
            return this.convertTimestamp(pt(t));

          default:
            return null;
        }
    }, t.prototype.convertTimestamp = function(t) {
        var e = ct(t);
        return new $(e.seconds, e.nanos);
    }, t.prototype.convertDocumentKey = function(t, e) {
        var n = rt.fromString(t);
        G(or(n));
        var r = new Bu(n.get(1), n.get(3)), i = new gt(n.popFirst(5));
        return r.isEqual(e) || 
        // TODO(b/64130202): Somehow support foreign references.
        U("Document " + i + " contains a document reference within a different database (" + r.projectId + "/" + r.database + ") which is not supported. It will be treated as a reference in the current database (" + e.projectId + "/" + e.database + ") instead."), 
        i;
    }, t;
}();

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
 */ function qc(t, e, n) {
    // Cast to `any` in order to satisfy the union type constraint on
    // toFirestore().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e;
}

var Uc = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new Oa(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new ia(this.firestore, /* converter= */ null, e);
    }, n;
}(Vc), Bc = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, 
        this._dataReader = Ka(t);
    }
    return t.prototype.set = function(t, e, n) {
        this._verifyNotCommitted();
        var r = jc(t, this._firestore), i = qc(r.converter, e, n), o = Ga(this._dataReader, "WriteBatch.set", r._key, i, null !== r.converter, n);
        return this._mutations.push(o.toMutation(r._key, Fe.none())), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        this._verifyNotCommitted();
        var o, s = jc(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = b(e)) || e instanceof Ra ? Ja(this._dataReader, "WriteBatch.update", s._key, e, n, r) : $a(this._dataReader, "WriteBatch.update", s._key, e), 
        this._mutations.push(o.toMutation(s._key, Fe.exists(!0))), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        this._verifyNotCommitted();
        var e = jc(t, this._firestore);
        return this._mutations = this._mutations.concat(new $e(e._key, Fe.none())), this;
    }, 
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
    t.prototype.commit = function() {
        return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
    }, t.prototype._verifyNotCommitted = function() {
        if (this._committed) throw new P(O.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }, t;
}();

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
 */ function jc(t, e) {
    if ((t = b(t)).firestore !== e) throw new P(O.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
    return t;
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
 * Reads the document referred to by this `DocumentReference`.
 *
 * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
 * for data from the server, but it may return cached data or fail if you are
 * offline and the server cannot be reached. To specify this behavior, invoke
 * {@link getDocFromCache} or {@link getDocFromServer}.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function Kc(t) {
    t = Zu(t, ia);
    var e = Zu(t.firestore, va);
    return Vu(wa(e), t._key).then((function(n) {
        return rh(e, t, n);
    }));
}

var Gc = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new Oa(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new ia(this.firestore, /* converter= */ null, e);
    }, n;
}(Vc);

/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function zc(t) {
    t = Zu(t, ia);
    var e = Zu(t.firestore, va), i = wa(e), o = new Gc(e);
    return function(t, e) {
        var i = this, o = new kr;
        return t.asyncQueue.enqueueAndForget((function() {
            return n(i, void 0, void 0, (function() {
                var i;
                return r(this, (function(s) {
                    switch (s.label) {
                      case 0:
                        return i = function(t, e, i) {
                            return n(this, void 0, void 0, (function() {
                                var n, o, s;
                                return r(this, (function(r) {
                                    switch (r.label) {
                                      case 0:
                                        return r.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , function(t, e) {
                                            var n = z(t);
                                            return n.persistence.runTransaction("read document", "readonly", (function(t) {
                                                return n.Mn.mn(t, e);
                                            }));
                                        }(t, e) ];

                                      case 1:
                                        return (n = r.sent()).isFoundDocument() ? i.resolve(n) : n.isNoDocument() ? i.resolve(null) : i.reject(new P(O.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")), 
                                        [ 3 /*break*/ , 3 ];

                                      case 2:
                                        return o = r.sent(), s = ws(o, "Failed to get document '" + e + " from cache"), 
                                        i.reject(s), [ 3 /*break*/ , 3 ];

                                      case 3:
                                        return [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }, [ 4 /*yield*/ , Ou(t) ];

                      case 1:
                        return [ 2 /*return*/ , i.apply(void 0, [ s.sent(), e, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(i, t._key).then((function(n) {
        return new dc(e, o, t._key, n, new lc(null !== n && n.hasLocalMutations, 
        /* fromCache= */ !0), t.converter);
    }));
}

/**
 * Reads the document referred to by this `DocumentReference` from the server.
 * Returns an error if the network is not available.
 *
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function Qc(t) {
    t = Zu(t, ia);
    var e = Zu(t.firestore, va);
    return Vu(wa(e), t._key, {
        source: "server"
    }).then((function(n) {
        return rh(e, t, n);
    }));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot`.
 *
 * Note: `getDocs()` attempts to provide up-to-date data when possible by
 * waiting for data from the server, but it may return cached data or fail if
 * you are offline and the server cannot be reached. To specify this behavior,
 * invoke {@link getDocsFromCache} or {@link getDocsFromServer}.
 *
 * @returns A Promise that will be resolved with the results of the query.
 */ function Wc(t) {
    t = Zu(t, oa);
    var e = Zu(t.firestore, va), n = wa(e), r = new Gc(e);
    return gc(t._query), qu(n, t._query).then((function(n) {
        return new yc(e, r, t, n);
    }))
    /**
 * Executes the query and returns the results as a `QuerySnapshot` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A Promise that will be resolved with the results of the query.
 */;
}

function Hc(t) {
    t = Zu(t, oa);
    var e = Zu(t.firestore, va), i = wa(e), o = new Gc(e);
    return function(t, e) {
        var i = this, o = new kr;
        return t.asyncQueue.enqueueAndForget((function() {
            return n(i, void 0, void 0, (function() {
                var i;
                return r(this, (function(s) {
                    switch (s.label) {
                      case 0:
                        return i = function(t, e, i) {
                            return n(this, void 0, void 0, (function() {
                                var n, o, s, u, a, c;
                                return r(this, (function(r) {
                                    switch (r.label) {
                                      case 0:
                                        return r.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , io(t, e, 
                                        /* usePreviousResults= */ !0) ];

                                      case 1:
                                        return n = r.sent(), o = new Ms(e, n.Bn), s = o._o(n.documents), u = o.applyChanges(s, 
                                        /* updateLimboDocuments= */ !1), i.resolve(u.snapshot), [ 3 /*break*/ , 3 ];

                                      case 2:
                                        return a = r.sent(), c = ws(a, "Failed to execute query '" + e + " against cache"), 
                                        i.reject(c), [ 3 /*break*/ , 3 ];

                                      case 3:
                                        return [ 2 /*return*/ ];
                                    }
                                }));
                            }));
                        }, [ 4 /*yield*/ , Ou(t) ];

                      case 1:
                        return [ 2 /*return*/ , i.apply(void 0, [ s.sent(), e, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(i, t._query).then((function(n) {
        return new yc(e, o, t, n);
    }));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from the
 * server. Returns an error if the network is not available.
 *
 * @returns A Promise that will be resolved with the results of the query.
 */ function Yc(t) {
    t = Zu(t, oa);
    var e = Zu(t.firestore, va), n = wa(e), r = new Gc(e);
    return qu(n, t._query, {
        source: "server"
    }).then((function(n) {
        return new yc(e, r, t, n);
    }));
}

function Xc(t, e, n) {
    t = Zu(t, ia);
    var r = Zu(t.firestore, va), i = qc(t.converter, e, n);
    return nh(r, [ Ga(Ka(r), "setDoc", t._key, i, null !== t.converter, n).toMutation(t._key, Fe.none()) ]);
}

function $c(t, e, n) {
    for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
    t = Zu(t, ia);
    var o = Zu(t.firestore, va), s = Ka(o);
    return nh(o, [ ("string" == typeof (
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    e = b(e)) || e instanceof Ra ? Ja(s, "updateDoc", t._key, e, n, r) : $a(s, "updateDoc", t._key, e)).toMutation(t._key, Fe.exists(!0)) ]);
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */ function Jc(t) {
    return nh(Zu(t.firestore, va), [ new $e(t._key, Fe.none()) ]);
}

/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A Promise resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend (Note that it
 * won't resolve while you're offline).
 */ function Zc(t, e) {
    var n = Zu(t.firestore, va), r = ca(t), i = qc(t.converter, e);
    return nh(n, [ Ga(Ka(t.firestore), "addDoc", r._key, i, null !== t.converter, {}).toMutation(r._key, Fe.exists(!1)) ]).then((function() {
        return r;
    }));
}

function th(t) {
    for (var e, i, o, s = [], u = 1; u < arguments.length; u++) s[u - 1] = arguments[u];
    t = b(t);
    var a = {
        includeMetadataChanges: !1
    }, c = 0;
    "object" != typeof s[c] || da(s[c]) || (a = s[c], c++);
    var h, f, l, d = {
        includeMetadataChanges: a.includeMetadataChanges
    };
    if (da(s[c])) {
        var p = s[c];
        s[c] = null === (e = p.next) || void 0 === e ? void 0 : e.bind(p), s[c + 1] = null === (i = p.error) || void 0 === i ? void 0 : i.bind(p), 
        s[c + 2] = null === (o = p.complete) || void 0 === o ? void 0 : o.bind(p);
    }
    if (t instanceof ia) f = Zu(t.firestore, va), l = ie(t._key.path), h = {
        next: function(e) {
            s[c] && s[c](rh(f, t, e));
        },
        error: s[c + 1],
        complete: s[c + 2]
    }; else {
        var y = Zu(t, oa);
        f = Zu(y.firestore, va), l = y._query;
        var v = new Gc(f);
        h = {
            next: function(t) {
                s[c] && s[c](new yc(f, v, y, t));
            },
            error: s[c + 1],
            complete: s[c + 2]
        }, gc(t._query);
    }
    return function(t, e, i, o) {
        var s = this, u = new Su(o), a = new Cs(e, u, i);
        return t.asyncQueue.enqueueAndForget((function() {
            return n(s, void 0, void 0, (function() {
                var e;
                return r(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = _s, [ 4 /*yield*/ , Mu(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), a ]) ];
                    }
                }));
            }));
        })), function() {
            u.Wo(), t.asyncQueue.enqueueAndForget((function() {
                return n(s, void 0, void 0, (function() {
                    var e;
                    return r(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = Ns, [ 4 /*yield*/ , Mu(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), a ]) ];
                        }
                    }));
                }));
            }));
        };
    }(wa(f), l, d, h);
}

function eh(t, e) {
    return function(t, e) {
        var i = this, o = new Su(e);
        return t.asyncQueue.enqueueAndForget((function() {
            return n(i, void 0, void 0, (function() {
                var e;
                return r(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = function(t, e) {
                            z(t).Gr.add(e), 
                            // Immediately fire an initial event, indicating all existing listeners
                            // are in-sync.
                            e.next();
                        }, [ 4 /*yield*/ , Mu(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), o ]) ];
                    }
                }));
            }));
        })), function() {
            o.Wo(), t.asyncQueue.enqueueAndForget((function() {
                return n(i, void 0, void 0, (function() {
                    var e;
                    return r(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = function(t, e) {
                                z(t).Gr.delete(e);
                            }, [ 4 /*yield*/ , Mu(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), o ]) ];
                        }
                    }));
                }));
            }));
        }
        /**
 * Takes an updateFunction in which a set of reads and writes can be performed
 * atomically. In the updateFunction, the client can read and write values
 * using the supplied transaction object. After the updateFunction, all
 * changes will be committed. If a retryable error occurs (ex: some other
 * client has changed any of the data referenced), then the updateFunction
 * will be called again after a backoff. If the updateFunction still fails
 * after all retries, then the transaction will be rejected.
 *
 * The transaction object passed to the updateFunction contains methods for
 * accessing documents and collections. Unlike other datastore access, data
 * accessed with the transaction will not reflect local changes that have not
 * been committed. For this reason, it is required that all reads are
 * performed before any writes. Transactions must be performed while online.
 */;
    }(wa(t = Zu(t, va)), da(e) ? e : {
        next: e
    });
}

/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ function nh(t, e) {
    return function(t, e) {
        var i = this, o = new kr;
        return t.asyncQueue.enqueueAndForget((function() {
            return n(i, void 0, void 0, (function() {
                var n;
                return r(this, (function(r) {
                    switch (r.label) {
                      case 0:
                        return n = Gs, [ 4 /*yield*/ , Fu(t) ];

                      case 1:
                        return [ 2 /*return*/ , n.apply(void 0, [ r.sent(), e, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(wa(t), e);
}

/**
 * Converts a ViewSnapshot that contains the single document specified by `ref`
 * to a DocumentSnapshot.
 */ function rh(t, e, n) {
    var r = n.docs.get(e._key), i = new Gc(t);
    return new dc(t, i, e._key, r, new lc(n.hasPendingWrites, n.fromCache), e.converter);
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
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ var ih = /** @class */ function(e) {
    // This class implements the same logic as the Transaction API in the Lite SDK
    // but is subclassed in order to return its own DocumentSnapshot types.
    /** @hideconstructor */
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, n) || this)._firestore = t, r;
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    return t(n, e), n.prototype.get = function(t) {
        var n = this, r = jc(t, this._firestore), i = new Gc(this._firestore);
        return e.prototype.get.call(this, t).then((function(t) {
            return new dc(n._firestore, i, r._key, t._document, new lc(
            /* hasPendingWrites= */ !1, 
            /* fromCache= */ !1), r.converter);
        }));
    }, n;
}(/** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._transaction = e, this._dataReader = Ka(t)
        /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */;
    }
    return t.prototype.get = function(t) {
        var e = this, n = jc(t, this._firestore), r = new Uc(this._firestore);
        return this._transaction.lookup([ n._key ]).then((function(t) {
            if (!t || 1 !== t.length) return K();
            var i = t[0];
            if (i.isFoundDocument()) return new cc(e._firestore, r, i.key, i, n.converter);
            if (i.isNoDocument()) return new cc(e._firestore, r, n._key, null, n.converter);
            throw K();
        }));
    }, t.prototype.set = function(t, e, n) {
        var r = jc(t, this._firestore), i = qc(r.converter, e, n), o = Ga(this._dataReader, "Transaction.set", r._key, i, null !== r.converter, n);
        return this._transaction.set(r._key, o), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        var o, s = jc(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = b(e)) || e instanceof Ra ? Ja(this._dataReader, "Transaction.update", s._key, e, n, r) : $a(this._dataReader, "Transaction.update", s._key, e), 
        this._transaction.update(s._key, o), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        var e = jc(t, this._firestore);
        return this._transaction.delete(e._key), this;
    }, t;
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
 */ function oh(t, e) {
    return function(t, e) {
        var i = this, o = new kr;
        return t.asyncQueue.enqueueAndForget((function() {
            return n(i, void 0, void 0, (function() {
                var n;
                return r(this, (function(r) {
                    switch (r.label) {
                      case 0:
                        return [ 4 /*yield*/ , function(t) {
                            return Ru(t).then((function(t) {
                                return t.datastore;
                            }));
                        }(t) ];

                      case 1:
                        return n = r.sent(), new Du(t.asyncQueue, n, e, o).run(), [ 2 /*return*/ ];
                    }
                }));
            }));
        })), o.promise;
    }(wa(t), (function(n) {
        return e(new ih(t, n));
    }));
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
 */ function sh() {
    return new za("deleteField");
}

/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */ function uh() {
    return new Wa("serverTimestamp");
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
 */ function ah() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
        return new Ha("arrayUnion", t);
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
 */ function ch() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
        return new Ya("arrayRemove", t);
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
 */ function hh(t) {
    return new Xa("increment", t);
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
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single WriteBatch
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A `WriteBatch` that can be used to atomically execute multiple
 * writes.
 */ function fh(t) {
    return wa(t = Zu(t, va)), new Bc(t, (function(e) {
        return nh(t, e);
    }))
    /**
 * Cloud Firestore
 *
 * @packageDocumentation
 */;
}

R = u, a(new h("firestore-exp", (function(t, e) {
    var n = e.options, r = t.getProvider("app-exp").getImmediate(), i = new va(r, t.getProvider("auth-internal"));
    return n = Object.assign({
        useFetchStreams: !1
    }, n), i._setSettings(n), i;
}), "PUBLIC" /* PUBLIC */)), c("@firebase/firestore", "2.3.9", undefined);

export { Vc as AbstractUserDataWriter, Oa as Bytes, ya as CACHE_SIZE_UNLIMITED, sa as CollectionReference, ia as DocumentReference, dc as DocumentSnapshot, Ra as FieldPath, Pa as FieldValue, va as FirebaseFirestore, P as FirestoreError, Fa as GeoPoint, pa as LoadBundleTask, oa as Query, wc as QueryConstraint, pc as QueryDocumentSnapshot, yc as QuerySnapshot, lc as SnapshotMetadata, $ as Timestamp, ih as Transaction, Bc as WriteBatch, Zc as addDoc, ch as arrayRemove, ah as arrayUnion, Sa as clearIndexedDbPersistence, ua as collection, aa as collectionGroup, Jc as deleteDoc, sh as deleteField, Da as disableNetwork, ca as doc, La as documentId, Ia as enableIndexedDbPersistence, Ta as enableMultiTabIndexedDbPersistence, Na as enableNetwork, Lc as endAt, Rc as endBefore, wa as ensureFirestoreConfigured, nh as executeWrite, Kc as getDoc, zc as getDocFromCache, Qc as getDocFromServer, Wc as getDocs, Hc as getDocsFromCache, Yc as getDocsFromServer, ga as getFirestore, hh as increment, ma as initializeFirestore, Nc as limit, Dc as limitToLast, ka as loadBundle, Ca as namedQuery, th as onSnapshot, eh as onSnapshotsInSync, Sc as orderBy, bc as query, fa as queryEqual, ha as refEqual, oh as runTransaction, uh as serverTimestamp, Xc as setDoc, V as setLogLevel, mc as snapshotEqual, Cc as startAfter, kc as startAt, Aa as terminate, $c as updateDoc, ra as useFirestoreEmulator, _a as waitForPendingWrites, Tc as where, fh as writeBatch };
//# sourceMappingURL=index.browser.esm5.js.map
