import { __extends as t, __awaiter as e, __generator as n, __spreadArray as r } from "tslib";

import { isMobileCordova as i, isReactNative as o, isElectron as s, isIE as u, isUWP as a, isBrowserExtension as c, getModularInstance as h, createMockUserToken as l } from "@firebase/util";

import { Logger as f, LogLevel as d } from "@firebase/logger";

import { XhrIo as p, EventType as y, ErrorCode as v, createWebChannelTransport as m, getStatEventTarget as g, FetchXmlHttpFactory as w, WebChannel as b, Event as _, Stat as E } from "@firebase/webchannel-wrapper";

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
 */ var T = /** @class */ function() {
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

T.o = -1;

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
var I = {
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
}, A = /** @class */ function(e) {
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
}(Error), N = new f("@firebase/firestore");

/** An error returned by a Firestore operation. */
// Helper methods are needed because variables can't be exported as read/write
function S() {
    return N.logLevel;
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
 */ function D(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (N.logLevel <= d.DEBUG) {
        var i = e.map(C);
        N.debug.apply(N, r([ "Firestore (8.8.0): " + t ], i));
    }
}

function k(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (N.logLevel <= d.ERROR) {
        var i = e.map(C);
        N.error.apply(N, r([ "Firestore (8.8.0): " + t ], i));
    }
}

function R(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (N.logLevel <= d.WARN) {
        var i = e.map(C);
        N.warn.apply(N, r([ "Firestore (8.8.0): " + t ], i));
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function C(t) {
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
 */ function L(t) {
    void 0 === t && (t = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var e = "FIRESTORE (8.8.0) INTERNAL ASSERTION FAILED: " + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
        throw k(e), new Error(e)
    /**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */;
}

function O(t, e) {
    t || L();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function P(t, 
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
 */ function F(t) {
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
 */ var V = /** @class */ function() {
    function t() {}
    return t.u = function() {
        for (
        // Alphanumeric characters
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length, n = ""
        // The largest byte value that is a multiple of `char.length`.
        ; n.length < 20; ) for (var r = F(40), i = 0; i < r.length; ++i) 
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
        return n;
    }, t;
}();

function M(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function U(t, e, n) {
    return t.length === e.length && t.every((function(t, r) {
        return n(t, e[r]);
    }));
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
 */ var x = /** @class */ function() {
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
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new A(I.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new A(I.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new A(I.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new A(I.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
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
        return this.seconds === t.seconds ? M(this.nanoseconds, t.nanoseconds) : M(this.seconds, t.seconds);
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
}(), q = /** @class */ function() {
    function t(t) {
        this.timestamp = t;
    }
    return t.fromTimestamp = function(e) {
        return new t(e);
    }, t.min = function() {
        return new t(new x(0, 0));
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
function B(t) {
    var e = 0;
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function j(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function G(t) {
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
 */ var K = /** @class */ function() {
    function t(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && L(), void 0 === n ? n = t.length - e : n > t.length - e && L(), 
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
}(), Q = /** @class */ function(e) {
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
            if (s.indexOf("//") >= 0) throw new A(I.INVALID_ARGUMENT, "Invalid segment (" + s + "). Paths must not contain // in them.");
            // Strip leading and traling slashed.
                        r.push.apply(r, s.split("/").filter((function(t) {
                return t.length > 0;
            })));
        }
        return new n(r);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(K), z = /^[_a-zA-Z][_a-zA-Z0-9]*$/, W = /** @class */ function(e) {
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
        return z.test(t);
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
            if (0 === r.length) throw new A(I.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            e.push(r), r = "";
        }, s = !1; i < t.length; ) {
            var u = t[i];
            if ("\\" === u) {
                if (i + 1 === t.length) throw new A(I.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                var a = t[i + 1];
                if ("\\" !== a && "." !== a && "`" !== a) throw new A(I.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                r += a, i += 2;
            } else "`" === u ? (s = !s, i++) : "." !== u || s ? (r += u, i++) : (o(), i++);
        }
        if (o(), s) throw new A(I.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new n(e);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(K), H = /** @class */ function() {
    function t(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(W.comparator)
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
        return U(this.fields, t.fields, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), Y = /** @class */ function() {
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
        /** True if and only if the Base64 conversion functions are available. */    }, 
    t.prototype.toUint8Array = function() {
        return function(t) {
            for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }(this.binaryString);
    }, t.prototype.approximateByteSize = function() {
        return 2 * this.binaryString.length;
    }, t.prototype.compareTo = function(t) {
        return M(this.binaryString, t.binaryString);
    }, t.prototype.isEqual = function(t) {
        return this.binaryString === t.binaryString;
    }, t;
}();

/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 */ Y.EMPTY_BYTE_STRING = new Y("");

var X = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */ function J(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (O(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var e = 0, n = X.exec(t);
        if (O(!!n), n[1]) {
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
        seconds: Z(t.seconds),
        nanos: Z(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function Z(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function $(t) {
    return "string" == typeof t ? Y.fromBase64String(t) : Y.fromUint8Array(t);
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
 */ function tt(t) {
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
 */ function et(t) {
    var e = t.mapValue.fields.__previous_value__;
    return tt(e) ? et(e) : e;
}

/**
 * Returns the local time at which this timestamp was first set.
 */ function nt(t) {
    var e = J(t.mapValue.fields.__local_write_time__.timestampValue);
    return new x(e.seconds, e.nanos);
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
 */ function rt(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function it(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return 0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
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
var ot = /** @class */ function() {
    function t(t) {
        this.path = t;
    }
    return t.fromPath = function(e) {
        return new t(Q.fromString(e));
    }, t.fromName = function(e) {
        return new t(Q.fromString(e).popFirst(5));
    }, 
    /** Returns true if the document is in the specified collectionId. */ t.prototype.hasCollectionId = function(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }, t.prototype.isEqual = function(t) {
        return null !== t && 0 === Q.comparator(this.path, t.path);
    }, t.prototype.toString = function() {
        return this.path.toString();
    }, t.comparator = function(t, e) {
        return Q.comparator(t.path, e.path);
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
        return new t(new Q(e.slice()));
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
/** Extracts the backend's type order for the provided value. */ function st(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? tt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : L();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function ut(t, e) {
    var n = st(t);
    if (n !== st(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return nt(t).isEqual(nt(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            var n = J(t.timestampValue), r = J(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return $(t.bytesValue).isEqual($(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return Z(t.geoPointValue.latitude) === Z(e.geoPointValue.latitude) && Z(t.geoPointValue.longitude) === Z(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return Z(t.integerValue) === Z(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                var n = Z(t.doubleValue), r = Z(e.doubleValue);
                return n === r ? it(n) === it(r) : isNaN(n) && isNaN(r);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return U(t.arrayValue.values || [], e.arrayValue.values || [], ut);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (B(n) !== B(r)) return !1;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !ut(n[i], r[i]))) return !1;
            return !0;
        }(t, e);

      default:
        return L();
    }
}

function at(t, e) {
    return void 0 !== (t.values || []).find((function(t) {
        return ut(t, e);
    }));
}

function ct(t, e) {
    var n = st(t), r = st(e);
    if (n !== r) return M(n, r);
    switch (n) {
      case 0 /* NullValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return M(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            var n = Z(t.integerValue || t.doubleValue), r = Z(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return ht(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return ht(nt(t), nt(e));

      case 5 /* StringValue */ :
        return M(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            var n = $(t), r = $(e);
            return n.compareTo(r);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            for (var n = t.split("/"), r = e.split("/"), i = 0; i < n.length && i < r.length; i++) {
                var o = M(n[i], r[i]);
                if (0 !== o) return o;
            }
            return M(n.length, r.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            var n = M(Z(t.latitude), Z(e.latitude));
            return 0 !== n ? n : M(Z(t.longitude), Z(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
                var o = ct(n[i], r[i]);
                if (o) return o;
            }
            return M(n.length, r.length);
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
                var u = M(r[s], o[s]);
                if (0 !== u) return u;
                var a = ct(n[r[s]], i[o[s]]);
                if (0 !== a) return a;
            }
            return M(r.length, o.length);
        }(t.mapValue, e.mapValue);

      default:
        throw L();
    }
}

function ht(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return M(t, e);
    var n = J(t), r = J(e), i = M(n.seconds, r.seconds);
    return 0 !== i ? i : M(n.nanos, r.nanos);
}

function lt(t) {
    return ft(t);
}

function ft(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
        var e = J(t);
        return "time(" + e.seconds + "," + e.nanos + ")";
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? $(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
    ot.fromName(n).toString()) : "geoPointValue" in t ? "geo(" + (e = t.geoPointValue).latitude + "," + e.longitude + ")" : "arrayValue" in t ? function(t) {
        for (var e = "[", n = !0, r = 0, i = t.values || []; r < i.length; r++) {
            n ? n = !1 : e += ",", e += ft(i[r]);
        }
        return e + "]";
    }(t.arrayValue) : "mapValue" in t ? function(t) {
        for (
        // Iteration order in JavaScript is not guaranteed. To ensure that we generate
        // matching canonical IDs for identical maps, we need to sort the keys.
        var e = "{", n = !0, r = 0, i = Object.keys(t.fields || {}).sort(); r < i.length; r++) {
            var o = i[r];
            n ? n = !1 : e += ",", e += o + ":" + ft(t.fields[o]);
        }
        return e + "}";
    }(t.mapValue) : L();
    var e, n;
}

function dt(t, e) {
    return {
        referenceValue: "projects/" + t.projectId + "/databases/" + t.database + "/documents/" + e.path.canonicalString()
    };
}

/** Returns true if `value` is an IntegerValue . */ function pt(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */ function yt(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function vt(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function mt(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function gt(t) {
    return !!t && "mapValue" in t;
}

/** Creates a deep copy of `source`. */ function wt(t) {
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
        return j(t.mapValue.fields, (function(t, n) {
            return e.mapValue.fields[t] = wt(n);
        })), e;
    }
    if (t.arrayValue) {
        for (var n = {
            arrayValue: {
                values: []
            }
        }, r = 0; r < (t.arrayValue.values || []).length; ++r) n.arrayValue.values[r] = wt(t.arrayValue.values[r]);
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
 */ var bt = /** @class */ function() {
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
        for (var e = this.value, n = 0; n < t.length - 1; ++n) if (!gt(e = (e.mapValue.fields || {})[t.get(n)])) return null;
        return (e = (e.mapValue.fields || {})[t.lastSegment()]) || null;
    }, 
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    t.prototype.set = function(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = wt(e);
    }, 
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    t.prototype.setAll = function(t) {
        var e = this, n = W.emptyPath(), r = {}, i = [];
        t.forEach((function(t, o) {
            if (!n.isImmediateParentOf(o)) {
                // Insert the accumulated changes at this parent location
                var s = e.getFieldsMap(n);
                e.applyChanges(s, r, i), r = {}, i = [], n = o.popLast();
            }
            t ? r[o.lastSegment()] = wt(t) : i.push(o.lastSegment());
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
        gt(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
    }, t.prototype.isEqual = function(t) {
        return ut(this.value, t.value);
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
            gt(r) && r.mapValue.fields || (r = {
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
        j(e, (function(e, n) {
            return t[e] = n;
        }));
        for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r];
            delete t[o];
        }
    }, t.prototype.clone = function() {
        return new t(wt(this.value));
    }, t;
}();

/**
 * Returns a FieldMask built from all fields in a MapValue.
 */ function _t(t) {
    var e = [];
    return j(t.fields, (function(t, n) {
        var r = new W([ t ]);
        if (gt(n)) {
            var i = _t(n.mapValue).fields;
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
    })), new H(e)
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

var Et = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.key = t, this.documentType = e, this.version = n, this.data = r, this.documentState = i
        /**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */;
    }
    return t.newInvalidDocument = function(e) {
        return new t(e, 0 /* INVALID */ , q.min(), bt.empty(), 0 /* SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */
    t.newFoundDocument = function(e, n, r) {
        return new t(e, 1 /* FOUND_DOCUMENT */ , n, r, 0 /* SYNCED */);
    }, 
    /** Creates a new document that is known to not exist at the given version. */ t.newNoDocument = function(e, n) {
        return new t(e, 2 /* NO_DOCUMENT */ , n, bt.empty(), 0 /* SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.newUnknownDocument = function(e, n) {
        return new t(e, 3 /* UNKNOWN_DOCUMENT */ , n, bt.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
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
        return this.version = t, this.documentType = 2 /* NO_DOCUMENT */ , this.data = bt.empty(), 
        this.documentState = 0 /* SYNCED */ , this;
    }, 
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.prototype.convertToUnknownDocument = function(t) {
        return this.version = t, this.documentType = 3 /* UNKNOWN_DOCUMENT */ , this.data = bt.empty(), 
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
}(), Tt = function(t, e, n, r, i, o, s) {
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
function It(t, e, n, r, i, o, s) {
    return void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === s && (s = null), 
    new Tt(t, e, n, r, i, o, s);
}

function At(t) {
    var e = P(t);
    if (null === e.h) {
        var n = e.path.canonicalString();
        null !== e.collectionGroup && (n += "|cg:" + e.collectionGroup), n += "|f:", n += e.filters.map((function(t) {
            return function(t) {
                // TODO(b/29183165): Technically, this won't be unique if two values have
                // the same description, such as the int 3 and the string "3". So we should
                // add the types in here somehow, too.
                return t.field.canonicalString() + t.op.toString() + lt(t.value);
            }(t);
        })).join(","), n += "|ob:", n += e.orderBy.map((function(t) {
            return function(t) {
                // TODO(b/29183165): Make this collision robust.
                return t.field.canonicalString() + t.dir;
            }(t);
        })).join(","), rt(e.limit) || (n += "|l:", n += e.limit), e.startAt && (n += "|lb:", 
        n += Ut(e.startAt)), e.endAt && (n += "|ub:", n += Ut(e.endAt)), e.h = n;
    }
    return e.h;
}

function Nt(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (var n = 0; n < t.orderBy.length; n++) if (!qt(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (var r = 0; r < t.filters.length; r++) if (i = t.filters[r], o = e.filters[r], 
    i.op !== o.op || !i.field.isEqual(o.field) || !ut(i.value, o.value)) return !1;
    var i, o;
    return t.collectionGroup === e.collectionGroup && !!t.path.isEqual(e.path) && !!jt(t.startAt, e.startAt) && jt(t.endAt, e.endAt);
}

function St(t) {
    return ot.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}

var Dt = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).field = t, i.op = n, i.value = r, i;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return t(n, e), n.create = function(t, e, r) {
        return t.isKeyField() ? "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.l(t, e, r) : new kt(t, e, r) : "array-contains" /* ARRAY_CONTAINS */ === e ? new Ot(t, r) : "in" /* IN */ === e ? new Pt(t, r) : "not-in" /* NOT_IN */ === e ? new Ft(t, r) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Vt(t, r) : new n(t, e, r);
    }, n.l = function(t, e, n) {
        return "in" /* IN */ === e ? new Rt(t, n) : new Ct(t, n);
    }, n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
                return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.m(ct(e, this.value)) : null !== e && st(this.value) === st(e) && this.m(ct(e, this.value));
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
            return L();
        }
    }, n.prototype.g = function() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
    }, n;
}((function() {}));

var kt = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, r) || this).key = ot.fromName(r.referenceValue), 
        i;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = ot.comparator(t.key, this.key);
        return this.m(e);
    }, n;
}(Dt), Rt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "in" /* IN */ , n) || this).keys = Lt("in" /* IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(Dt), Ct = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "not-in" /* NOT_IN */ , n) || this).keys = Lt("not-in" /* NOT_IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return !this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(Dt);

/** Filter that matches on key fields within an array. */ function Lt(t, e) {
    var n;
    return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((function(t) {
        return ot.fromName(t.referenceValue);
    }));
}

/** A Filter that implements the array-contains operator. */ var Ot = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains" /* ARRAY_CONTAINS */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return yt(e) && at(e.arrayValue, this.value);
    }, n;
}(Dt), Pt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "in" /* IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return null !== e && at(this.value.arrayValue, e);
    }, n;
}(Dt), Ft = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "not-in" /* NOT_IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        if (at(this.value.arrayValue, {
            nullValue: "NULL_VALUE"
        })) return !1;
        var e = t.data.field(this.field);
        return null !== e && !at(this.value.arrayValue, e);
    }, n;
}(Dt), Vt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = this, n = t.data.field(this.field);
        return !(!yt(n) || !n.arrayValue.values) && n.arrayValue.values.some((function(t) {
            return at(e.value.arrayValue, t);
        }));
    }, n;
}(Dt), Mt = function(t, e) {
    this.position = t, this.before = e;
};

/** A Filter that implements the IN operator. */ function Ut(t) {
    // TODO(b/29183165): Make this collision robust.
    return (t.before ? "b" : "a") + ":" + t.position.map((function(t) {
        return lt(t);
    })).join(",");
}

/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */ var xt = function(t, e /* ASCENDING */) {
    void 0 === e && (e = "asc"), this.field = t, this.dir = e;
};

function qt(t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field);
}

/**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */ function Bt(t, e, n) {
    for (var r = 0, i = 0; i < t.position.length; i++) {
        var o = e[i], s = t.position[i];
        if (r = o.field.isKeyField() ? ot.comparator(ot.fromName(s.referenceValue), n.key) : ct(s, n.data.field(o.field)), 
        "desc" /* DESCENDING */ === o.dir && (r *= -1), 0 !== r) break;
    }
    return t.before ? r <= 0 : r < 0;
}

function jt(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.before !== e.before || t.position.length !== e.position.length) return !1;
    for (var n = 0; n < t.position.length; n++) if (!ut(t.position[n], e.position[n])) return !1;
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
 */ var Gt = 
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

/** Creates a new Query instance with the options provided. */
/** Creates a new Query for a query that matches all documents at `path` */ function Kt(t) {
    return new Gt(t);
}

/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */ function Qt(t) {
    return !rt(t.limit) && "F" /* First */ === t.limitType;
}

function zt(t) {
    return !rt(t.limit) && "L" /* Last */ === t.limitType;
}

function Wt(t) {
    return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}

function Ht(t) {
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
 */ function Yt(t) {
    return null !== t.collectionGroup;
}

/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */ function Xt(t) {
    var e = P(t);
    if (null === e.p) {
        e.p = [];
        var n = Ht(e), r = Wt(e);
        if (null !== n && null === r) 
        // In order to implicitly add key ordering, we must also add the
        // inequality filter field for it to be a valid query.
        // Note that the default inequality field and key ordering is ascending.
        n.isKeyField() || e.p.push(new xt(n)), e.p.push(new xt(W.keyField(), "asc" /* ASCENDING */)); else {
            for (var i = !1, o = 0, s = e.explicitOrderBy; o < s.length; o++) {
                var u = s[o];
                e.p.push(u), u.field.isKeyField() && (i = !0);
            }
            if (!i) {
                // The order of the implicit key ordering always matches the last
                // explicit order by
                var a = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc" /* ASCENDING */;
                e.p.push(new xt(W.keyField(), a));
            }
        }
    }
    return e.p;
}

/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */ function Jt(t) {
    var e = P(t);
    if (!e.T) if ("F" /* First */ === e.limitType) e.T = It(e.path, e.collectionGroup, Xt(e), e.filters, e.limit, e.startAt, e.endAt); else {
        for (
        // Flip the orderBy directions since we want the last results
        var n = [], r = 0, i = Xt(e); r < i.length; r++) {
            var o = i[r], s = "desc" /* DESCENDING */ === o.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
            n.push(new xt(o.field, s));
        }
        // We need to swap the cursors to match the now-flipped query ordering.
                var u = e.endAt ? new Mt(e.endAt.position, !e.endAt.before) : null, a = e.startAt ? new Mt(e.startAt.position, !e.startAt.before) : null;
        // Now return as a LimitType.First query.
                e.T = It(e.path, e.collectionGroup, n, e.filters, e.limit, u, a);
    }
    return e.T;
}

function Zt(t, e, n) {
    return new Gt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
}

function $t(t, e) {
    return Nt(Jt(t), Jt(e)) && t.limitType === e.limitType;
}

// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function te(t) {
    return At(Jt(t)) + "|lt:" + t.limitType;
}

function ee(t) {
    return "Query(target=" + function(t) {
        var e = t.path.canonicalString();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
        t.filters.length > 0 && (e += ", filters: [" + t.filters.map((function(t) {
            return (e = t).field.canonicalString() + " " + e.op + " " + lt(e.value);
            /** Returns a debug description for `filter`. */            var e;
            /** Filter that matches on key fields (i.e. '__name__'). */        })).join(", ") + "]"), 
        rt(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += ", orderBy: [" + t.orderBy.map((function(t) {
            return function(t) {
                return t.field.canonicalString() + " (" + t.dir + ")";
            }(t);
        })).join(", ") + "]"), t.startAt && (e += ", startAt: " + Ut(t.startAt)), t.endAt && (e += ", endAt: " + Ut(t.endAt)), 
        "Target(" + e + ")";
    }(Jt(t)) + "; limitType=" + t.limitType + ")";
}

/** Returns whether `doc` matches the constraints of `query`. */ function ne(t, e) {
    return e.isFoundDocument() && function(t, e) {
        var n = e.key.path;
        return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : ot.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n);
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
        return !(t.startAt && !Bt(t.startAt, Xt(t), e)) && (!t.endAt || !Bt(t.endAt, Xt(t), e));
    }(t, e);
}

function re(t) {
    return function(e, n) {
        for (var r = !1, i = 0, o = Xt(t); i < o.length; i++) {
            var s = o[i], u = ie(s, e, n);
            if (0 !== u) return u;
            r = r || s.field.isKeyField();
        }
        return 0;
    };
}

function ie(t, e, n) {
    var r = t.field.isKeyField() ? ot.comparator(e.key, n.key) : function(t, e, n) {
        var r = e.data.field(t), i = n.data.field(t);
        return null !== r && null !== i ? ct(r, i) : L();
    }(t.field, e, n);
    switch (t.dir) {
      case "asc" /* ASCENDING */ :
        return r;

      case "desc" /* DESCENDING */ :
        return -1 * r;

      default:
        return L();
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
 */ function oe(t, e) {
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
        doubleValue: it(e) ? "-0" : e
    };
}

/**
 * Returns an IntegerValue for `value`.
 */ function se(t) {
    return {
        integerValue: "" + t
    };
}

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */ function ue(t, e) {
    return function(t) {
        return "number" == typeof t && Number.isInteger(t) && !it(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
    }(e) ? se(e) : oe(t, e);
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
/** Used to represent a field transform on a mutation. */ var ae = function() {
    // Make sure that the structural type of `TransformOperation` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this._ = void 0;
};

/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */ function ce(t, e, n) {
    return t instanceof fe ? function(t, e) {
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
    }(n, e) : t instanceof de ? pe(t, e) : t instanceof ye ? ve(t, e) : function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        var n = le(t, e), r = ge(n) + ge(t.A);
        return pt(n) && pt(t.A) ? se(r) : oe(t.R, r);
    }(t, e);
}

/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */ function he(t, e, n) {
    // The server just sends null as the transform result for array operations,
    // so we have to calculate a result the same as we do for local
    // applications.
    return t instanceof de ? pe(t, e) : t instanceof ye ? ve(t, e) : n;
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
 */ function le(t, e) {
    return t instanceof me ? pt(n = e) || function(t) {
        return !!t && "doubleValue" in t;
    }(n) ? e : {
        integerValue: 0
    } : null;
    var n;
}

/** Transforms a value into a server-generated timestamp. */ var fe = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n;
}(ae), de = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(ae);

/** Transforms an array value via a union operation. */ function pe(t, e) {
    for (var n = we(e), r = function(t) {
        n.some((function(e) {
            return ut(e, t);
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

/** Transforms an array value via a remove operation. */ var ye = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(ae);

function ve(t, e) {
    for (var n = we(e), r = function(t) {
        n = n.filter((function(e) {
            return !ut(e, t);
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
 */ var me = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).R = t, r.A = n, r;
    }
    return t(n, e), n;
}(ae);

function ge(t) {
    return Z(t.integerValue || t.doubleValue);
}

function we(t) {
    return yt(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
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
/** A field path and the TransformOperation to perform upon it. */ var be = function(t, e) {
    this.field = t, this.transform = e;
};

/** The result of successfully applying a mutation to the backend. */
var _e = function(
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
}, Ee = /** @class */ function() {
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
/** Returns true if the preconditions is valid for the given document. */ function Te(t, e) {
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
 */ var Ie = function() {};

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
 */ function Ae(t, e, n) {
    t instanceof Re ? function(t, e, n) {
        // Unlike applySetMutationToLocalView, if we're applying a mutation to a
        // remote document the server has accepted the mutation so the precondition
        // must have held.
        var r = t.value.clone(), i = Oe(t.fieldTransforms, e, n.transformResults);
        r.setAll(i), e.convertToFoundDocument(n.version, r).setHasCommittedMutations();
    }(t, e, n) : t instanceof Ce ? function(t, e, n) {
        if (Te(t.precondition, e)) {
            var r = Oe(t.fieldTransforms, e, n.transformResults), i = e.data;
            i.setAll(Le(t)), i.setAll(r), e.convertToFoundDocument(n.version, i).setHasCommittedMutations();
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
 */ function Ne(t, e, n) {
    t instanceof Re ? function(t, e, n) {
        if (Te(t.precondition, e)) {
            var r = t.value.clone(), i = Pe(t.fieldTransforms, n, e);
            r.setAll(i), e.convertToFoundDocument(ke(e), r).setHasLocalMutations();
        }
    }(t, e, n) : t instanceof Ce ? function(t, e, n) {
        if (Te(t.precondition, e)) {
            var r = Pe(t.fieldTransforms, n, e), i = e.data;
            i.setAll(Le(t)), i.setAll(r), e.convertToFoundDocument(ke(e), i).setHasLocalMutations();
        }
    }(t, e, n) : function(t, e) {
        Te(t.precondition, e) && 
        // We don't call `setHasLocalMutations()` since we want to be backwards
        // compatible with the existing SDK behavior.
        e.convertToNoDocument(q.min());
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
 */ function Se(t, e) {
    for (var n = null, r = 0, i = t.fieldTransforms; r < i.length; r++) {
        var o = i[r], s = e.data.field(o.field), u = le(o.transform, s || null);
        null != u && (null == n && (n = bt.empty()), n.set(o.field, u));
    }
    return n || null;
}

function De(t, e) {
    return t.type === e.type && !!t.key.isEqual(e.key) && !!t.precondition.isEqual(e.precondition) && !!function(t, e) {
        return void 0 === t && void 0 === e || !(!t || !e) && U(t, e, (function(t, e) {
            return function(t, e) {
                return t.field.isEqual(e.field) && function(t, e) {
                    return t instanceof de && e instanceof de || t instanceof ye && e instanceof ye ? U(t.elements, e.elements, ut) : t instanceof me && e instanceof me ? ut(t.A, e.A) : t instanceof fe && e instanceof fe;
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
 */ function ke(t) {
    return t.isFoundDocument() ? t.version : q.min();
}

/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */ var Re = /** @class */ function(e) {
    function n(t, n, r, i) {
        void 0 === i && (i = []);
        var o = this;
        return (o = e.call(this) || this).key = t, o.value = n, o.precondition = r, o.fieldTransforms = i, 
        o.type = 0 /* Set */ , o;
    }
    return t(n, e), n;
}(Ie), Ce = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        void 0 === o && (o = []);
        var s = this;
        return (s = e.call(this) || this).key = t, s.data = n, s.fieldMask = r, s.precondition = i, 
        s.fieldTransforms = o, s.type = 1 /* Patch */ , s;
    }
    return t(n, e), n;
}(Ie);

function Le(t) {
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

function Oe(t, e, n) {
    var r = new Map;
    O(t.length === n.length);
    for (var i = 0; i < n.length; i++) {
        var o = t[i], s = o.transform, u = e.data.field(o.field);
        r.set(o.field, he(s, u, n[i]));
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
 */ function Pe(t, e, n) {
    for (var r = new Map, i = 0, o = t; i < o.length; i++) {
        var s = o[i], u = s.transform, a = n.data.field(s.field);
        r.set(s.field, ce(u, a, e));
    }
    return r;
}

/** A mutation that deletes the document at the given key. */ var Fe, Ve, Me = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 2 /* Delete */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n;
}(Ie), Ue = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 3 /* Verify */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n;
}(Ie), xe = 
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
function qe(t) {
    switch (t) {
      case I.OK:
        return L();

      case I.CANCELLED:
      case I.UNKNOWN:
      case I.DEADLINE_EXCEEDED:
      case I.RESOURCE_EXHAUSTED:
      case I.INTERNAL:
      case I.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case I.UNAUTHENTICATED:
        return !1;

      case I.INVALID_ARGUMENT:
      case I.NOT_FOUND:
      case I.ALREADY_EXISTS:
      case I.PERMISSION_DENIED:
      case I.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case I.ABORTED:
      case I.OUT_OF_RANGE:
      case I.UNIMPLEMENTED:
      case I.DATA_LOSS:
        return !0;

      default:
        return L();
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
 */ function Be(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return k("GRPC error has no .code"), I.UNKNOWN;
    switch (t) {
      case Fe.OK:
        return I.OK;

      case Fe.CANCELLED:
        return I.CANCELLED;

      case Fe.UNKNOWN:
        return I.UNKNOWN;

      case Fe.DEADLINE_EXCEEDED:
        return I.DEADLINE_EXCEEDED;

      case Fe.RESOURCE_EXHAUSTED:
        return I.RESOURCE_EXHAUSTED;

      case Fe.INTERNAL:
        return I.INTERNAL;

      case Fe.UNAVAILABLE:
        return I.UNAVAILABLE;

      case Fe.UNAUTHENTICATED:
        return I.UNAUTHENTICATED;

      case Fe.INVALID_ARGUMENT:
        return I.INVALID_ARGUMENT;

      case Fe.NOT_FOUND:
        return I.NOT_FOUND;

      case Fe.ALREADY_EXISTS:
        return I.ALREADY_EXISTS;

      case Fe.PERMISSION_DENIED:
        return I.PERMISSION_DENIED;

      case Fe.FAILED_PRECONDITION:
        return I.FAILED_PRECONDITION;

      case Fe.ABORTED:
        return I.ABORTED;

      case Fe.OUT_OF_RANGE:
        return I.OUT_OF_RANGE;

      case Fe.UNIMPLEMENTED:
        return I.UNIMPLEMENTED;

      case Fe.DATA_LOSS:
        return I.DATA_LOSS;

      default:
        return L();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status - An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (Ve = Fe || (Fe = {}))[Ve.OK = 0] = "OK", Ve[Ve.CANCELLED = 1] = "CANCELLED", 
Ve[Ve.UNKNOWN = 2] = "UNKNOWN", Ve[Ve.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
Ve[Ve.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Ve[Ve.NOT_FOUND = 5] = "NOT_FOUND", 
Ve[Ve.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Ve[Ve.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
Ve[Ve.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Ve[Ve.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
Ve[Ve.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Ve[Ve.ABORTED = 10] = "ABORTED", 
Ve[Ve.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Ve[Ve.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
Ve[Ve.INTERNAL = 13] = "INTERNAL", Ve[Ve.UNAVAILABLE = 14] = "UNAVAILABLE", Ve[Ve.DATA_LOSS = 15] = "DATA_LOSS";

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
var je = /** @class */ function() {
    function t(t, e) {
        this.comparator = t, this.root = e || Ke.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
        return t.prototype.insert = function(e, n) {
        return new t(this.comparator, this.root.insert(e, n, this.comparator).copy(null, null, Ke.BLACK, null, null));
    }, 
    // Returns a copy of the map, with the specified key removed.
    t.prototype.remove = function(e) {
        return new t(this.comparator, this.root.remove(e, this.comparator).copy(null, null, Ke.BLACK, null, null));
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
        return new Ge(this.root, null, this.comparator, !1);
    }, t.prototype.getIteratorFrom = function(t) {
        return new Ge(this.root, t, this.comparator, !1);
    }, t.prototype.getReverseIterator = function() {
        return new Ge(this.root, null, this.comparator, !0);
    }, t.prototype.getReverseIteratorFrom = function(t) {
        return new Ge(this.root, t, this.comparator, !0);
    }, t;
}(), Ge = /** @class */ function() {
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
}(), Ke = /** @class */ function() {
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
        if (this.isRed() && this.left.isRed()) throw L();
        if (this.right.isRed()) throw L();
        var t = this.left.check();
        if (t !== this.right.check()) throw L();
        return t + (this.isRed() ? 0 : 1);
    }, t;
}();

// end SortedMap
// An iterator over an LLRBNode.
// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Ke.EMPTY = null, Ke.RED = !0, Ke.BLACK = !1, 
// end LLRBEmptyNode
Ke.EMPTY = new (/** @class */ function() {
    function t() {
        this.size = 0;
    }
    return Object.defineProperty(t.prototype, "key", {
        get: function() {
            throw L();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
        get: function() {
            throw L();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "color", {
        get: function() {
            throw L();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "left", {
        get: function() {
            throw L();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            throw L();
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
        return new Ke(t, e);
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
var Qe = /** @class */ function() {
    function t(t) {
        this.comparator = t, this.data = new je(this.comparator);
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
        return new ze(this.data.getIterator());
    }, t.prototype.getIteratorFrom = function(t) {
        return new ze(this.data.getIteratorFrom(t));
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
}(), ze = /** @class */ function() {
    function t(t) {
        this.iter = t;
    }
    return t.prototype.getNext = function() {
        return this.iter.getNext().key;
    }, t.prototype.hasNext = function() {
        return this.iter.hasNext();
    }, t;
}(), We = new je(ot.comparator);

function He() {
    return We;
}

var Ye = new je(ot.comparator);

function Xe() {
    return Ye;
}

var Je = new je(ot.comparator);

function Ze() {
    return Je;
}

var $e = new Qe(ot.comparator);

function tn() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = $e, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.add(o);
    }
    return n;
}

var en = new Qe(M);

function nn() {
    return en;
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
 */ var rn = /** @class */ function() {
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
        return r.set(e, on.createSynthesizedTargetChangeForCurrentChange(e, n)), new t(q.min(), r, nn(), He(), tn());
    }, t;
}(), on = /** @class */ function() {
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
        return new t(Y.EMPTY_BYTE_STRING, n, tn(), tn(), tn());
    }, t;
}(), sn = function(
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
    this.v = t, this.removedTargetIds = e, this.key = n, this.P = r;
}, un = function(t, e) {
    this.targetId = t, this.V = e;
}, an = function(
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
    void 0 === n && (n = Y.EMPTY_BYTE_STRING), void 0 === r && (r = null), this.state = t, 
    this.targetIds = e, this.resumeToken = n, this.cause = r;
}, cn = /** @class */ function() {
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
        this.D = fn(), 
        /** See public getters for explanations of these fields. */
        this.C = Y.EMPTY_BYTE_STRING, this.N = !1, 
        /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
        this.F = !0;
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
    }), Object.defineProperty(t.prototype, "k", {
        /** Whether this target has pending target adds or target removes. */ get: function() {
            return 0 !== this.S;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "$", {
        /** Whether we have modified any state that should trigger a snapshot. */ get: function() {
            return this.F;
        },
        enumerable: !1,
        configurable: !0
    }), 
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    t.prototype.O = function(t) {
        t.approximateByteSize() > 0 && (this.F = !0, this.C = t);
    }, 
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    t.prototype.M = function() {
        var t = tn(), e = tn(), n = tn();
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
                L();
            }
        })), new on(this.C, this.N, t, e, n);
    }, 
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t.prototype.L = function() {
        this.F = !1, this.D = fn();
    }, t.prototype.B = function(t, e) {
        this.F = !0, this.D = this.D.insert(t, e);
    }, t.prototype.q = function(t) {
        this.F = !0, this.D = this.D.remove(t);
    }, t.prototype.U = function() {
        this.S += 1;
    }, t.prototype.K = function() {
        this.S -= 1;
    }, t.prototype.j = function() {
        this.F = !0, this.N = !0;
    }, t;
}(), hn = /** @class */ function() {
    function t(t) {
        this.W = t, 
        /** The internal state of all tracked targets. */
        this.G = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.H = He(), 
        /** A mapping of document keys to their set of target IDs. */
        this.J = ln(), 
        /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
        this.Y = new Qe(M)
        /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */;
    }
    return t.prototype.X = function(t) {
        for (var e = 0, n = t.v; e < n.length; e++) {
            var r = n[e];
            t.P && t.P.isFoundDocument() ? this.Z(r, t.P) : this.tt(r, t.key, t.P);
        }
        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
            r = o[i];
            this.tt(r, t.key, t.P);
        }
    }, 
    /** Processes and adds the WatchTargetChange to the current set of changes. */ t.prototype.et = function(t) {
        var e = this;
        this.forEachTarget(t, (function(n) {
            var r = e.nt(n);
            switch (t.state) {
              case 0 /* NoChange */ :
                e.st(n) && r.O(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.K(), r.k || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                r.L(), r.O(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.K(), r.k || e.removeTarget(n);
                break;

              case 3 /* Current */ :
                e.st(n) && (r.j(), r.O(t.resumeToken));
                break;

              case 4 /* Reset */ :
                e.st(n) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                e.it(n), r.O(t.resumeToken));
                break;

              default:
                L();
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
            if (St(i)) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                var o = new ot(i.path);
                this.tt(e, o, Et.newNoDocument(o, q.min()));
            } else O(1 === n); else this.ct(e) !== n && (
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
                if (r.current && St(o.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    var s = new ot(o.target.path);
                    null !== e.H.get(s) || e.at(i, s) || e.tt(i, s, Et.newNoDocument(s, t));
                }
                r.$ && (n.set(i, r.M()), r.L());
            }
        }));
        var r = tn();
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
        var i = new rn(t, n, this.Y, this.H, r);
        return this.H = He(), this.J = ln(), this.Y = new Qe(M), i;
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
            r.q(e), this.J = this.J.insert(e, this.ht(e).delete(t)), n && (this.H = this.H.insert(e, n));
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
    t.prototype.U = function(t) {
        this.nt(t).U();
    }, t.prototype.nt = function(t) {
        var e = this.G.get(t);
        return e || (e = new cn, this.G.set(t, e)), e;
    }, t.prototype.ht = function(t) {
        var e = this.J.get(t);
        return e || (e = new Qe(M), this.J = this.J.insert(t, e)), e;
    }, 
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t.prototype.st = function(t) {
        var e = null !== this.ot(t);
        return e || D("WatchChangeAggregator", "Detected inactive target", t), e;
    }, 
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    t.prototype.ot = function(t) {
        var e = this.G.get(t);
        return e && e.k ? null : this.W.lt(t);
    }, 
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    t.prototype.it = function(t) {
        var e = this;
        this.G.set(t, new cn), this.W.getRemoteKeysForTarget(t).forEach((function(n) {
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
 */ function ln() {
    return new je(ot.comparator);
}

function fn() {
    return new je(ot.comparator);
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
 */ var dn = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}, pn = {
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
}, yn = function(t, e) {
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
function vn(t, e) {
    return t.I ? new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "") + "." + ("000000000" + e.nanoseconds).slice(-9) + "Z" : {
        seconds: "" + e.seconds,
        nanos: e.nanoseconds
    };
}

/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */ function mn(t, e) {
    return t.I ? e.toBase64() : e.toUint8Array();
}

/**
 * Returns a ByteString based on the proto string value.
 */ function gn(t, e) {
    return vn(t, e.toTimestamp());
}

function wn(t) {
    return O(!!t), q.fromTimestamp(function(t) {
        var e = J(t);
        return new x(e.seconds, e.nanos);
    }(t));
}

function bn(t, e) {
    return function(t) {
        return new Q([ "projects", t.projectId, "databases", t.database ]);
    }(t).child("documents").child(e).canonicalString();
}

function _n(t) {
    var e = Q.fromString(t);
    return O(jn(e)), e;
}

function En(t, e) {
    return bn(t.databaseId, e.path);
}

function Tn(t, e) {
    var n = _n(e);
    if (n.get(1) !== t.databaseId.projectId) throw new A(I.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
    if (n.get(3) !== t.databaseId.database) throw new A(I.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
    return new ot(Nn(n));
}

function In(t, e) {
    return bn(t.databaseId, e);
}

function An(t) {
    return new Q([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
}

function Nn(t) {
    return O(t.length > 4 && "documents" === t.get(4)), t.popFirst(5)
    /** Creates a Document proto from key and fields (but no create/update time) */;
}

function Sn(t, e, n) {
    return {
        name: En(t, e),
        fields: n.value.mapValue.fields
    };
}

function Dn(t, e) {
    var n;
    if (e instanceof Re) n = {
        update: Sn(t, e.key, e.value)
    }; else if (e instanceof Me) n = {
        delete: En(t, e.key)
    }; else if (e instanceof Ce) n = {
        update: Sn(t, e.key, e.data),
        updateMask: Bn(e.fieldMask)
    }; else {
        if (!(e instanceof Ue)) return L();
        n = {
            verify: En(t, e.key)
        };
    }
    return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((function(t) {
        return function(t, e) {
            var n = e.transform;
            if (n instanceof fe) return {
                fieldPath: e.field.canonicalString(),
                setToServerValue: "REQUEST_TIME"
            };
            if (n instanceof de) return {
                fieldPath: e.field.canonicalString(),
                appendMissingElements: {
                    values: n.elements
                }
            };
            if (n instanceof ye) return {
                fieldPath: e.field.canonicalString(),
                removeAllFromArray: {
                    values: n.elements
                }
            };
            if (n instanceof me) return {
                fieldPath: e.field.canonicalString(),
                increment: n.A
            };
            throw L();
        }(0, t);
    }))), e.precondition.isNone || (n.currentDocument = function(t, e) {
        return void 0 !== e.updateTime ? {
            updateTime: gn(t, e.updateTime)
        } : void 0 !== e.exists ? {
            exists: e.exists
        } : L();
    }(t, e.precondition)), n;
}

function kn(t, e) {
    return {
        documents: [ In(t, e.path) ]
    };
}

function Rn(t, e) {
    // Dissect the path into parent, collectionId, and optional key filter.
    var n = {
        structuredQuery: {}
    }, r = e.path;
    null !== e.collectionGroup ? (n.parent = In(t, r), n.structuredQuery.from = [ {
        collectionId: e.collectionGroup,
        allDescendants: !0
    } ]) : (n.parent = In(t, r.popLast()), n.structuredQuery.from = [ {
        collectionId: r.lastSegment()
    } ]);
    var i = function(t) {
        if (0 !== t.length) {
            var e = t.map((function(t) {
                // visible for testing
                return function(t) {
                    if ("==" /* EQUAL */ === t.op) {
                        if (mt(t.value)) return {
                            unaryFilter: {
                                field: Mn(t.field),
                                op: "IS_NAN"
                            }
                        };
                        if (vt(t.value)) return {
                            unaryFilter: {
                                field: Mn(t.field),
                                op: "IS_NULL"
                            }
                        };
                    } else if ("!=" /* NOT_EQUAL */ === t.op) {
                        if (mt(t.value)) return {
                            unaryFilter: {
                                field: Mn(t.field),
                                op: "IS_NOT_NAN"
                            }
                        };
                        if (vt(t.value)) return {
                            unaryFilter: {
                                field: Mn(t.field),
                                op: "IS_NOT_NULL"
                            }
                        };
                    }
                    return {
                        fieldFilter: {
                            field: Mn(t.field),
                            op: Vn(t.op),
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
                    field: Mn(t.field),
                    direction: Fn(t.dir)
                };
            }(t);
        }));
    }(e.orderBy);
    o && (n.structuredQuery.orderBy = o);
    var s = function(t, e) {
        return t.I || rt(e) ? e : {
            value: e
        };
    }(t, e.limit);
    return null !== s && (n.structuredQuery.limit = s), e.startAt && (n.structuredQuery.startAt = On(e.startAt)), 
    e.endAt && (n.structuredQuery.endAt = On(e.endAt)), n;
}

function Cn(t) {
    var e = function(t) {
        var e = _n(t);
        // In v1beta1 queries for collections at the root did not have a trailing
        // "/documents". In v1 all resource paths contain "/documents". Preserve the
        // ability to read the v1beta1 form for compatibility with queries persisted
        // in the local target cache.
                return 4 === e.length ? Q.emptyPath() : Nn(e);
    }(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
    if (r > 0) {
        O(1 === r);
        var o = n.from[0];
        o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
    }
    var s = [];
    n.where && (s = Ln(n.where));
    var u = [];
    n.orderBy && (u = n.orderBy.map((function(t) {
        return function(t) {
            return new xt(Un(t.field), 
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
        return rt(e = "object" == typeof t ? t.value : t) ? null : e;
    }(n.limit));
    var c = null;
    n.startAt && (c = Pn(n.startAt));
    var h = null;
    return n.endAt && (h = Pn(n.endAt)), function(t, e, n, r, i, o, s, u) {
        return new Gt(t, e, n, r, i, o, s, u);
    }(e, i, u, s, a, "F" /* First */ , c, h);
}

function Ln(t) {
    return t ? void 0 !== t.unaryFilter ? [ qn(t) ] : void 0 !== t.fieldFilter ? [ xn(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((function(t) {
        return Ln(t);
    })).reduce((function(t, e) {
        return t.concat(e);
    })) : L() : [];
}

function On(t) {
    return {
        before: t.before,
        values: t.position
    };
}

function Pn(t) {
    var e = !!t.before, n = t.values || [];
    return new Mt(n, e);
}

// visible for testing
function Fn(t) {
    return dn[t];
}

function Vn(t) {
    return pn[t];
}

function Mn(t) {
    return {
        fieldPath: t.canonicalString()
    };
}

function Un(t) {
    return W.fromServerFormat(t.fieldPath);
}

function xn(t) {
    return Dt.create(Un(t.fieldFilter.field), function(t) {
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
            return L();
        }
    }(t.fieldFilter.op), t.fieldFilter.value);
}

function qn(t) {
    switch (t.unaryFilter.op) {
      case "IS_NAN":
        var e = Un(t.unaryFilter.field);
        return Dt.create(e, "==" /* EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NULL":
        var n = Un(t.unaryFilter.field);
        return Dt.create(n, "==" /* EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "IS_NOT_NAN":
        var r = Un(t.unaryFilter.field);
        return Dt.create(r, "!=" /* NOT_EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NOT_NULL":
        var i = Un(t.unaryFilter.field);
        return Dt.create(i, "!=" /* NOT_EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "OPERATOR_UNSPECIFIED":
      default:
        return L();
    }
}

function Bn(t) {
    var e = [];
    return t.fields.forEach((function(t) {
        return e.push(t.canonicalString());
    })), {
        fieldPaths: e
    };
}

function jn(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}

// Visible for testing
var Gn = /** @class */ function() {
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
}(), Kn = function() {
    var t = this;
    this.promise = new Promise((function(e, n) {
        t.resolve = e, t.reject = n;
    }));
}, Qn = /** @class */ function() {
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
        return this.callbackAttached && L(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(n, this.error) : this.wrapSuccess(e, this.result) : new t((function(t, i) {
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
}();

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
/** Verifies whether `e` is an IndexedDbTransactionError. */ function zn(t) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return "IndexedDbTransactionError" === t.name;
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
 */ var Wn = /** @class */ function() {
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
            i.key.isEqual(t.key) && Ae(i, t, n[r]);
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
            (o = n[e]).key.isEqual(t.key) && Ne(o, t, this.localWriteTime);
        }
        // Second, apply all user-provided mutations.
                for (var r = 0, i = this.mutations; r < i.length; r++) {
            var o;
            (o = i[r]).key.isEqual(t.key) && Ne(o, t, this.localWriteTime);
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
                        e.applyToLocalView(i), r.isValidDocument() || i.convertToNoDocument(q.min());
        }));
    }, t.prototype.keys = function() {
        return this.mutations.reduce((function(t, e) {
            return t.add(e.key);
        }), tn());
    }, t.prototype.isEqual = function(t) {
        return this.batchId === t.batchId && U(this.mutations, t.mutations, (function(t, e) {
            return De(t, e);
        })) && U(this.baseMutations, t.baseMutations, (function(t, e) {
            return De(t, e);
        }));
    }, t;
}(), Hn = /** @class */ function() {
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
        O(e.mutations.length === r.length);
        for (var i = Ze(), o = e.mutations, s = 0; s < o.length; s++) i = i.insert(o[s].key, r[s].version);
        return new t(e, n, r, i);
    }, t;
}(), Yn = /** @class */ function() {
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
        void 0 === i && (i = q.min()), void 0 === o && (o = q.min()), void 0 === s && (s = Y.EMPTY_BYTE_STRING), 
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
}(), Xn = function(t) {
    this.Lt = t;
};

/** The result of applying a mutation batch to the backend. */
/**
 * A helper function for figuring out what kind of query has been stored.
 */
/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */
function Jn(t) {
    var e = Cn({
        parent: t.parent,
        structuredQuery: t.structuredQuery
    });
    return "LAST" === t.limitType ? Zt(e, e.limit, "L" /* Last */) : e;
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
 */ var Zn = /** @class */ function() {
    function t() {
        this.Bt = new $n;
    }
    return t.prototype.addToCollectionParentIndex = function(t, e) {
        return this.Bt.add(e), Qn.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        return Qn.resolve(this.Bt.getEntries(e));
    }, t;
}(), $n = /** @class */ function() {
    function t() {
        this.index = {};
    }
    // Returns false if the entry already existed.
        return t.prototype.add = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e] || new Qe(Q.comparator), i = !r.has(n);
        return this.index[e] = r.add(n), i;
    }, t.prototype.has = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e];
        return r && r.has(n);
    }, t.prototype.getEntries = function(t) {
        return (this.index[t] || new Qe(Q.comparator)).toArray();
    }, t;
}(), tr = /** @class */ function() {
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
}();

/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
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
/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err - An error returned by a LocalStore operation.
 * @returns A Promise that resolves after we recovered, or the original error.
 */
function er(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            if (t.code !== I.FAILED_PRECONDITION || "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab." !== t.message) throw t;
            return D("LocalStore", "Unexpectedly lost primary lease"), [ 2 /*return*/ ];
        }));
    }));
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
 */ var nr = /** @class */ function() {
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
        j(this.inner, (function(e, n) {
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r], s = o[0], u = o[1];
                t(s, u);
            }
        }));
    }, t.prototype.isEmpty = function() {
        return G(this.inner);
    }, t;
}(), rr = /** @class */ function() {
    function t() {
        // A mapping of document key to the new cache entry that should be written (or null if any
        // existing cache entry should be removed).
        this.changes = new nr((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.changesApplied = !1;
    }
    return t.prototype.getReadTime = function(t) {
        var e = this.changes.get(t);
        return e ? e.readTime : q.min();
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
            document: Et.newInvalidDocument(t),
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
        return void 0 !== n ? Qn.resolve(n.document) : this.getFromCache(t, e);
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
}(), ir = function(t, e) {
    this.progress = t, this.wn = e;
}, or = /** @class */ function() {
    function t(t, e, n) {
        this.Ue = t, this._n = e, this.Ut = n
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
            return n.yn(t, e, r);
        }));
    }, 
    /** Internal version of `getDocument` that allows reusing batches. */ t.prototype.yn = function(t, e, n) {
        return this.Ue.getEntry(t, e).next((function(t) {
            for (var e = 0, r = n; e < r.length; e++) {
                r[e].applyToLocalView(t);
            }
            return t;
        }));
    }, 
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    t.prototype.gn = function(t, e) {
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
        return this.Ue.getEntries(t, e).next((function(e) {
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
            return n.gn(e, t);
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
            return ot.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
        }(e) ? this.Tn(t, e.path) : Yt(e) ? this.In(t, e, n) : this.An(t, e, n);
    }, t.prototype.Tn = function(t, e) {
        // Just do a simple document lookup.
        return this.mn(t, new ot(e)).next((function(t) {
            var e = Xe();
            return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
        }));
    }, t.prototype.In = function(t, e, n) {
        var r = this, i = e.collectionGroup, o = Xe();
        return this.Ut.getCollectionParents(t, i).next((function(s) {
            return Qn.forEach(s, (function(s) {
                var u = function(t, e) {
                    return new Gt(e, 
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
                return this.Ue.getDocumentsMatchingQuery(t, e, n).next((function(n) {
            return r = n, o._n.getAllMutationBatchesAffectingQuery(t, e);
        })).next((function(e) {
            return i = e, o.Rn(t, i, r).next((function(t) {
                r = t;
                for (var e = 0, n = i; e < n.length; e++) for (var o = n[e], s = 0, u = o.mutations; s < u.length; s++) {
                    var a = u[s], c = a.key, h = r.get(c);
                    null == h && (
                    // Create invalid document to apply mutations on top of
                    h = Et.newInvalidDocument(c), r = r.insert(c, h)), Ne(a, h, o.localWriteTime), h.isFoundDocument() || (r = r.remove(c));
                }
            }));
        })).next((function() {
            // Finally, filter out any documents that don't actually match
            // the query.
            return r.forEach((function(t, n) {
                ne(e, n) || (r = r.remove(t));
            })), r;
        }));
    }, t.prototype.Rn = function(t, e, n) {
        for (var r = tn(), i = 0, o = e; i < o.length; i++) for (var s = 0, u = o[i].mutations; s < u.length; s++) {
            var a = u[s];
            a instanceof Ce && null === n.get(a.key) && (r = r.add(a.key));
        }
        var c = n;
        return this.Ue.getEntries(t, r).next((function(t) {
            return t.forEach((function(t, e) {
                e.isFoundDocument() && (c = c.insert(t, e));
            })), c;
        }));
    }, t;
}(), sr = /** @class */ function() {
    function t(t, e, n, r) {
        this.targetId = t, this.fromCache = e, this.bn = n, this.vn = r;
    }
    return t.Pn = function(e, n) {
        for (var r = tn(), i = tn(), o = 0, s = n.docChanges; o < s.length; o++) {
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
}(), ur = /** @class */ function() {
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
        }(e) || n.isEqual(q.min()) ? this.Dn(t, e) : this.Sn.pn(t, r).next((function(o) {
            var s = i.Cn(e, o);
            return (Qt(e) || zt(e)) && i.Nn(e.limitType, s, r, n) ? i.Dn(t, e) : (S() <= d.DEBUG && D("QueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), ee(e)), 
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
        var n = new Qe(re(t));
        return e.forEach((function(e, r) {
            ne(t, r) && (n = n.add(r));
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
        return S() <= d.DEBUG && D("QueryEngine", "Using full collection scan to execute query:", ee(e)), 
        this.Sn.getDocumentsMatchingQuery(t, e, q.min());
    }, t;
}(), ar = /** @class */ function() {
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
        this.Fn = new je(M), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.kn = new nr((function(t) {
            return At(t);
        }), Nt), 
        /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
        this.$n = q.min(), this._n = t.getMutationQueue(n), this.On = t.getRemoteDocumentCache(), 
        this.qe = t.getTargetCache(), this.Mn = new or(this.On, this._n, this.persistence.getIndexManager()), 
        this.Ke = t.getBundleCache(), this.xn.Vn(this.Mn);
    }
    return t.prototype.collectGarbage = function(t) {
        var e = this;
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (function(n) {
            return t.collect(n, e.Fn);
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
 */
/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
// PORTING NOTE: Android and iOS only return the documents affected by the
// change.
function cr(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, s;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = P(t), i = e._n, o = e.Mn, [ 4 /*yield*/ , e.persistence.runTransaction("Handle user change", "readonly", (function(t) {
                    // Swap out the mutation queue, grabbing the pending mutation batches
                    // before and after.
                    var n;
                    return e._n.getAllMutationBatches(t).next((function(s) {
                        return n = s, i = e.persistence.getMutationQueue(r), 
                        // Recreate our LocalDocumentsView using the new
                        // MutationQueue.
                        o = new or(e.On, i, e.persistence.getIndexManager()), i.getAllMutationBatches(t);
                    })).next((function(e) {
                        for (var r = [], i = [], s = tn(), u = 0, a = n
                        // Union the old/new changed keys.
                        ; u < a.length; u++) {
                            var c = a[u];
                            r.push(c.batchId);
                            for (var h = 0, l = c.mutations; h < l.length; h++) {
                                var f = l[h];
                                s = s.add(f.key);
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
                                removedBatchIds: r,
                                addedBatchIds: i
                            };
                        }));
                    }));
                })) ];

              case 1:
                return s = n.sent(), [ 2 /*return*/ , (e._n = i, e.Mn = o, e.xn.Vn(e.Mn), s) ];
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
 */ function hr(t, e) {
    var n = P(t);
    return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (function(t) {
        var r = e.batch.keys(), i = n.On.newChangeBuffer({
            trackRemovals: !0
        });
        return function(t, e, n, r) {
            var i = n.batch, o = i.keys(), s = Qn.resolve();
            return o.forEach((function(t) {
                s = s.next((function() {
                    return r.getEntry(e, t);
                })).next((function(e) {
                    var o = n.docVersions.get(t);
                    O(null !== o), e.version.compareTo(o) < 0 && (i.applyToRemoteDocument(e, n), e.isValidDocument() && 
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
 */ function lr(t) {
    var e = P(t);
    return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (function(t) {
        return e.qe.getLastRemoteSnapshotVersion(t);
    }));
}

/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function fr(t, e) {
    var n = P(t), r = e.snapshotVersion, i = n.Fn;
    return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (function(t) {
        var o = n.On.newChangeBuffer({
            trackRemovals: !0
        });
        // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                i = n.Fn;
        var s = [];
        e.targetChanges.forEach((function(e, o) {
            var u = i.get(o);
            if (u) {
                // Only update the remote keys if the target is still active. This
                // ensures that we can persist the updated target data along with
                // the updated assignment.
                s.push(n.qe.removeMatchingKeys(t, e.removedDocuments, o).next((function() {
                    return n.qe.addMatchingKeys(t, e.addedDocuments, o);
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
                        return O(e.resumeToken.approximateByteSize() > 0), 0 === t.resumeToken.approximateByteSize() || (
                        // Don't allow resume token changes to be buffered indefinitely. This
                        // allows us to be reasonably up-to-date after a crash and avoids needing
                        // to loop over all active queries on shutdown. Especially in the browser
                        // we may not get time to do anything interesting while the current tab is
                        // closing.
                        e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= 3e8 || n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0);
                    }(u, c, e) && s.push(n.qe.updateTargetData(t, c));
                }
            }
        }));
        var u = He();
        // HACK: The only reason we allow a null snapshot version is so that we
        // can synthesize remote events when we get permission denied errors while
        // trying to resolve the state of a locally cached document that is in
        // limbo.
                if (e.documentUpdates.forEach((function(r, i) {
            e.resolvedLimboDocuments.has(r) && s.push(n.persistence.referenceDelegate.updateLimboDocument(t, r));
        })), 
        // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
        // documents in advance in a single call.
        s.push(dr(t, o, e.documentUpdates, r, void 0).next((function(t) {
            u = t;
        }))), !r.isEqual(q.min())) {
            var a = n.qe.getLastRemoteSnapshotVersion(t).next((function(e) {
                return n.qe.setTargetsMetadata(t, t.currentSequenceNumber, r);
            }));
            s.push(a);
        }
        return Qn.waitFor(s).next((function() {
            return o.apply(t);
        })).next((function() {
            return n.Mn.En(t, u);
        })).next((function() {
            return u;
        }));
    })).then((function(t) {
        return n.Fn = i, t;
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
 */ function dr(t, e, n, r, 
// TODO(wuandy): We could add `readTime` to MaybeDocument instead to remove
// this parameter.
i) {
    var o = tn();
    return n.forEach((function(t) {
        return o = o.add(t);
    })), e.getEntries(t, o).next((function(t) {
        var o = He();
        return n.forEach((function(n, s) {
            var u = t.get(n), a = (null == i ? void 0 : i.get(n)) || r;
            // Note: The order of the steps below is important, since we want
            // to ensure that rejected limbo resolutions (which fabricate
            // NoDocuments with SnapshotVersion.min()) never add documents to
            // cache.
                        s.isNoDocument() && s.version.isEqual(q.min()) ? (
            // NoDocuments with SnapshotVersion.min() are used in manufactured
            // events. We remove these documents from cache since we lost
            // access.
            e.removeEntry(n, a), o = o.insert(n, s)) : !u.isValidDocument() || s.version.compareTo(u.version) > 0 || 0 === s.version.compareTo(u.version) && u.hasPendingWrites ? (e.addEntry(s, a), 
            o = o.insert(n, s)) : D("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", u.version, " Watch version:", s.version);
        })), o;
    }))
    /**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */;
}

function pr(t, e) {
    var n = P(t);
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
 */ function yr(t, e) {
    var n = P(t);
    return n.persistence.runTransaction("Allocate target", "readwrite", (function(t) {
        var r;
        return n.qe.getTargetData(t, e).next((function(i) {
            return i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            r = i, Qn.resolve(r)) : n.qe.allocateTargetId(t).next((function(i) {
                return r = new Yn(e, i, 0 /* Listen */ , t.currentSequenceNumber), n.qe.addTargetData(t, r).next((function() {
                    return r;
                }));
            }));
        }));
    })).then((function(t) {
        // If Multi-Tab is enabled, the existing target data may be newer than
        // the in-memory data
        var r = n.Fn.get(t.targetId);
        return (null === r || t.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.Fn = n.Fn.insert(t.targetId, t), 
        n.kn.set(e, t.targetId)), t;
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
function vr(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, s, u;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = P(t), o = e.Fn.get(r), s = i ? "readwrite" : "readwrite-primary", n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 5 ]), i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , e.persistence.runTransaction("Release target", s, (function(t) {
                    return e.persistence.referenceDelegate.removeTarget(t, o);
                })) ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return [ 3 /*break*/ , 5 ];

              case 4:
                if (!zn(u = n.sent())) throw u;
                // All `releaseTarget` does is record the final metadata state for the
                // target, but we've been recording this periodically during target
                // activity. If we lose this write this could cause a very slight
                // difference in the order of target deletion during GC, but we
                // don't define exact LRU semantics so this is acceptable.
                                return D("LocalStore", "Failed to update sequence numbers for target " + r + ": " + u), 
                [ 3 /*break*/ , 5 ];

              case 5:
                return e.Fn = e.Fn.remove(r), e.kn.delete(o.target), [ 2 /*return*/ ];
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
 */ function mr(t, e, n) {
    var r = P(t), i = q.min(), o = tn();
    return r.persistence.runTransaction("Execute query", "readonly", (function(t) {
        return function(t, e, n) {
            var r = P(t), i = r.kn.get(n);
            return void 0 !== i ? Qn.resolve(r.Fn.get(i)) : r.qe.getTargetData(e, n);
        }(r, t, Jt(e)).next((function(e) {
            if (e) return i = e.lastLimboFreeSnapshotVersion, r.qe.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
                o = t;
            }));
        })).next((function() {
            return r.xn.getDocumentsMatchingQuery(t, e, n ? i : q.min(), n ? o : tn());
        })).next((function(t) {
            return {
                documents: t,
                Bn: o
            };
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
 */ function gr(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var e, s, u, a, c, h, l, f, d, p;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                for (e = P(t), s = tn(), u = He(), a = Ze(), c = 0, h = i; c < h.length; c++) l = h[c], 
                f = r.qn(l.metadata.name), l.document && (s = s.add(f)), u = u.insert(f, r.Un(l)), 
                a = a.insert(f, r.Kn(l.metadata.readTime));
                return d = e.On.newChangeBuffer({
                    trackRemovals: !0
                }), [ 4 /*yield*/ , yr(e, function(t) {
                    // It is OK that the path used for the query is not valid, because this will
                    // not be read and queried.
                    return Jt(Kt(Q.fromString("__bundle__/docs/" + t)));
                }(o)) ];

              case 1:
                // Allocates a target to hold all document keys from the bundle, such that
                // they will not get garbage collected right away.
                return p = n.sent(), [ 2 /*return*/ , e.persistence.runTransaction("Apply bundle documents", "readwrite", (function(t) {
                    return dr(t, d, u, q.min(), a).next((function(e) {
                        return d.apply(t), e;
                    })).next((function(n) {
                        return e.qe.removeMatchingKeysForTargetId(t, p.targetId).next((function() {
                            return e.qe.addMatchingKeys(t, s, p.targetId);
                        })).next((function() {
                            return e.Mn.En(t, n);
                        })).next((function() {
                            return n;
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
 */ function wr(t, r, i) {
    return void 0 === i && (i = tn()), e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , yr(t, Jt(Jn(r.bundledQuery))) ];

              case 1:
                return e = n.sent(), [ 2 /*return*/ , (o = P(t)).persistence.runTransaction("Save named query", "readwrite", (function(t) {
                    var n = wn(r.readTime);
                    // Simply save the query itself if it is older than what the SDK already
                    // has.
                                        if (e.snapshotVersion.compareTo(n) >= 0) return o.Ke.saveNamedQuery(t, r);
                    // Update existing target data because the query from the bundle is newer.
                                        var s = e.withResumeToken(Y.EMPTY_BYTE_STRING, n);
                    return o.Fn = o.Fn.insert(s.targetId, s), o.qe.updateTargetData(t, s).next((function() {
                        return o.qe.removeMatchingKeysForTargetId(t, e.targetId);
                    })).next((function() {
                        return o.qe.addMatchingKeys(t, i, e.targetId);
                    })).next((function() {
                        return o.Ke.saveNamedQuery(t, r);
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
 */ var br = /** @class */ function() {
    function t(t) {
        this.R = t, this.Qn = new Map, this.jn = new Map;
    }
    return t.prototype.getBundleMetadata = function(t, e) {
        return Qn.resolve(this.Qn.get(e));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        /** Decodes a BundleMetadata proto into a BundleMetadata object. */
        var n;
        return this.Qn.set(e.id, {
            id: (n = e).id,
            version: n.version,
            createTime: wn(n.createTime)
        }), Qn.resolve();
    }, t.prototype.getNamedQuery = function(t, e) {
        return Qn.resolve(this.jn.get(e));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return this.jn.set(e.name, function(t) {
            return {
                name: t.name,
                query: Jn(t.bundledQuery),
                readTime: wn(t.readTime)
            };
        }(e)), Qn.resolve();
    }, t;
}(), _r = /** @class */ function() {
    function t() {
        // A set of outstanding references to a document sorted by key.
        this.Wn = new Qe(Er.Gn), 
        // A set of outstanding references to a document sorted by target id.
        this.zn = new Qe(Er.Hn)
        /** Returns true if the reference set contains no references. */;
    }
    return t.prototype.isEmpty = function() {
        return this.Wn.isEmpty();
    }, 
    /** Adds a reference to the given document key for the given ID. */ t.prototype.addReference = function(t, e) {
        var n = new Er(t, e);
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
        this.Yn(new Er(t, e));
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
        var e = this, n = new ot(new Q([])), r = new Er(n, t), i = new Er(n, t + 1), o = [];
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
        var e = new ot(new Q([])), n = new Er(e, t), r = new Er(e, t + 1), i = tn();
        return this.zn.forEachInRange([ n, r ], (function(t) {
            i = i.add(t.key);
        })), i;
    }, t.prototype.containsKey = function(t) {
        var e = new Er(t, 0), n = this.Wn.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key);
    }, t;
}(), Er = /** @class */ function() {
    function t(t, e) {
        this.key = t, this.ns = e
        /** Compare by key then by ID */;
    }
    return t.Gn = function(t, e) {
        return ot.comparator(t.key, e.key) || M(t.ns, e.ns);
    }, 
    /** Compare by ID then by key */ t.Hn = function(t, e) {
        return M(t.ns, e.ns) || ot.comparator(t.key, e.key);
    }, t;
}(), Tr = /** @class */ function() {
    function t(t, e) {
        this.Ut = t, this.referenceDelegate = e, 
        /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
        this._n = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.ss = 1, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.rs = new Qe(Er.Gn);
    }
    return t.prototype.checkEmpty = function(t) {
        return Qn.resolve(0 === this._n.length);
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this.ss;
        this.ss++, this._n.length > 0 && this._n[this._n.length - 1];
        var o = new Wn(i, e, n, r);
        this._n.push(o);
        // Track references by document key and index collection parents.
        for (var s = 0, u = r; s < u.length; s++) {
            var a = u[s];
            this.rs = this.rs.add(new Er(a.key, i)), this.Ut.addToCollectionParentIndex(t, a.key.path.popLast());
        }
        return Qn.resolve(o);
    }, t.prototype.lookupMutationBatch = function(t, e) {
        return Qn.resolve(this.os(e));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = e + 1, r = this.cs(n), i = r < 0 ? 0 : r;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return Qn.resolve(this._n.length > i ? this._n[i] : null);
    }, t.prototype.getHighestUnacknowledgedBatchId = function() {
        return Qn.resolve(0 === this._n.length ? -1 : this.ss - 1);
    }, t.prototype.getAllMutationBatches = function(t) {
        return Qn.resolve(this._n.slice());
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = new Er(e, 0), i = new Er(e, Number.POSITIVE_INFINITY), o = [];
        return this.rs.forEachInRange([ r, i ], (function(t) {
            var e = n.os(t.ns);
            o.push(e);
        })), Qn.resolve(o);
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new Qe(M);
        return e.forEach((function(t) {
            var e = new Er(t, 0), i = new Er(t, Number.POSITIVE_INFINITY);
            n.rs.forEachInRange([ e, i ], (function(t) {
                r = r.add(t.ns);
            }));
        })), Qn.resolve(this.us(r));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        var n = e.path, r = n.length + 1, i = n;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
                ot.isDocumentKey(i) || (i = i.child(""));
        var o = new Er(new ot(i), 0), s = new Qe(M);
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
        }), o), Qn.resolve(this.us(s));
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
        O(0 === this.hs(e.batchId, "removed")), this._n.shift();
        var r = this.rs;
        return Qn.forEach(e.mutations, (function(i) {
            var o = new Er(i.key, e.batchId);
            return r = r.delete(o), n.referenceDelegate.markPotentiallyOrphaned(t, i.key);
        })).next((function() {
            n.rs = r;
        }));
    }, t.prototype.Gt = function(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }, t.prototype.containsKey = function(t, e) {
        var n = new Er(e, 0), r = this.rs.firstAfterOrEqual(n);
        return Qn.resolve(e.isEqual(r && r.key));
    }, t.prototype.performConsistencyCheck = function(t) {
        return this._n.length, Qn.resolve();
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
}(), Ir = /** @class */ function() {
    /**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    function t(t, e) {
        this.Ut = t, this.ls = e, 
        /** Underlying cache of documents and their read times. */
        this.docs = new je(ot.comparator), 
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
        }), this.size += s - o, this.Ut.addToCollectionParentIndex(t, r.path.popLast());
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
        return Qn.resolve(n ? n.document.clone() : Et.newInvalidDocument(e));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = He();
        return e.forEach((function(t) {
            var e = n.docs.get(t);
            r = r.insert(t, e ? e.document.clone() : Et.newInvalidDocument(t));
        })), Qn.resolve(r);
    }, t.prototype.getDocumentsMatchingQuery = function(t, e, n) {
        for (var r = He(), i = new ot(e.path.child("")), o = this.docs.getIteratorFrom(i)
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        ; o.hasNext(); ) {
            var s = o.getNext(), u = s.key, a = s.value, c = a.document, h = a.readTime;
            if (!e.path.isPrefixOf(u.path)) break;
            h.compareTo(n) <= 0 || ne(e, c) && (r = r.insert(c.key, c.clone()));
        }
        return Qn.resolve(r);
    }, t.prototype.fs = function(t, e) {
        return Qn.forEach(this.docs, (function(t) {
            return e(t);
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new Ar(this);
    }, t.prototype.getSize = function(t) {
        return Qn.resolve(this.size);
    }, t;
}(), Ar = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).Ie = t, n;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [];
        return this.changes.forEach((function(r, i) {
            i.document.isValidDocument() ? n.push(e.Ie.addEntry(t, i.document, e.getReadTime(r))) : e.Ie.removeEntry(r);
        })), Qn.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        return this.Ie.getEntry(t, e);
    }, n.prototype.getAllFromCache = function(t, e) {
        return this.Ie.getEntries(t, e);
    }, n;
}(rr), Nr = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /**
             * Maps a target to the data about that target
             */
        this.ds = new nr((function(t) {
            return At(t);
        }), Nt), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = q.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.ws = 0, 
        /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
        this._s = new _r, this.targetCount = 0, this.ys = tr.Jt();
    }
    return t.prototype.forEachTarget = function(t, e) {
        return this.ds.forEach((function(t, n) {
            return e(n);
        })), Qn.resolve();
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return Qn.resolve(this.lastRemoteSnapshotVersion);
    }, t.prototype.getHighestSequenceNumber = function(t) {
        return Qn.resolve(this.ws);
    }, t.prototype.allocateTargetId = function(t) {
        return this.highestTargetId = this.ys.next(), Qn.resolve(this.highestTargetId);
    }, t.prototype.setTargetsMetadata = function(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.ws && (this.ws = e), 
        Qn.resolve();
    }, t.prototype.te = function(t) {
        this.ds.set(t.target, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.ys = new tr(e), this.highestTargetId = e), t.sequenceNumber > this.ws && (this.ws = t.sequenceNumber);
    }, t.prototype.addTargetData = function(t, e) {
        return this.te(e), this.targetCount += 1, Qn.resolve();
    }, t.prototype.updateTargetData = function(t, e) {
        return this.te(e), Qn.resolve();
    }, t.prototype.removeTargetData = function(t, e) {
        return this.ds.delete(e.target), this._s.Zn(e.targetId), this.targetCount -= 1, 
        Qn.resolve();
    }, t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return this.ds.forEach((function(s, u) {
            u.sequenceNumber <= e && null === n.get(u.targetId) && (r.ds.delete(s), o.push(r.removeMatchingKeysForTargetId(t, u.targetId)), 
            i++);
        })), Qn.waitFor(o).next((function() {
            return i;
        }));
    }, t.prototype.getTargetCount = function(t) {
        return Qn.resolve(this.targetCount);
    }, t.prototype.getTargetData = function(t, e) {
        var n = this.ds.get(e) || null;
        return Qn.resolve(n);
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        return this._s.Jn(e, n), Qn.resolve();
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        this._s.Xn(e, n);
        var r = this.persistence.referenceDelegate, i = [];
        return r && e.forEach((function(e) {
            i.push(r.markPotentiallyOrphaned(t, e));
        })), Qn.waitFor(i);
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        return this._s.Zn(e), Qn.resolve();
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = this._s.es(e);
        return Qn.resolve(n);
    }, t.prototype.containsKey = function(t, e) {
        return Qn.resolve(this._s.containsKey(e));
    }, t;
}(), Sr = /** @class */ function() {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    function t(t, e) {
        var n = this;
        this.gs = {}, this.Ne = new T(0), this.xe = !1, this.xe = !0, this.referenceDelegate = t(this), 
        this.qe = new Nr(this), this.Ut = new Zn, this.Ue = function(t, e) {
            return new Ir(t, (function(t) {
                return n.referenceDelegate.ps(t);
            }));
        }(this.Ut), this.R = new Xn(e), this.Ke = new br(this.R);
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
        return this.Ut;
    }, t.prototype.getMutationQueue = function(t) {
        var e = this.gs[t.toKey()];
        return e || (e = new Tr(this.Ut, this.referenceDelegate), this.gs[t.toKey()] = e), 
        e;
    }, t.prototype.getTargetCache = function() {
        return this.qe;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.Ue;
    }, t.prototype.getBundleCache = function() {
        return this.Ke;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        D("MemoryPersistence", "Starting transaction:", t);
        var i = new Dr(this.Ne.next());
        return this.referenceDelegate.Es(), n(i).next((function(t) {
            return r.referenceDelegate.Ts(i).next((function() {
                return t;
            }));
        })).toPromise().then((function(t) {
            return i.raiseOnCommittedEvent(), t;
        }));
    }, t.prototype.Is = function(t, e) {
        return Qn.or(Object.values(this.gs).map((function(n) {
            return function() {
                return n.containsKey(t, e);
            };
        })));
    }, t;
}(), Dr = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).currentSequenceNumber = t, n;
    }
    return t(n, e), n;
}(Gn), kr = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.As = new _r, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.Rs = null;
    }
    return t.bs = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "vs", {
        get: function() {
            if (this.Rs) return this.Rs;
            throw L();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.addReference = function(t, e, n) {
        return this.As.addReference(n, e), this.vs.delete(n.toString()), Qn.resolve();
    }, t.prototype.removeReference = function(t, e, n) {
        return this.As.removeReference(n, e), this.vs.add(n.toString()), Qn.resolve();
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return this.vs.add(e.toString()), Qn.resolve();
    }, t.prototype.removeTarget = function(t, e) {
        var n = this;
        this.As.Zn(e.targetId).forEach((function(t) {
            return n.vs.add(t.toString());
        }));
        var r = this.persistence.getTargetCache();
        return r.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
            t.forEach((function(t) {
                return n.vs.add(t.toString());
            }));
        })).next((function() {
            return r.removeTargetData(t, e);
        }));
    }, t.prototype.Es = function() {
        this.Rs = new Set;
    }, t.prototype.Ts = function(t) {
        var e = this, n = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        // Remove newly orphaned documents.
                return Qn.forEach(this.vs, (function(r) {
            var i = ot.fromPath(r);
            return e.Ps(t, i).next((function(t) {
                t || n.removeEntry(i);
            }));
        })).next((function() {
            return e.Rs = null, n.apply(t);
        }));
    }, t.prototype.updateLimboDocument = function(t, e) {
        var n = this;
        return this.Ps(t, e).next((function(t) {
            t ? n.vs.delete(e.toString()) : n.vs.add(e.toString());
        }));
    }, t.prototype.ps = function(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }, t.prototype.Ps = function(t, e) {
        var n = this;
        return Qn.or([ function() {
            return Qn.resolve(n.As.containsKey(e));
        }, function() {
            return n.persistence.getTargetCache().containsKey(t, e);
        }, function() {
            return n.persistence.Is(t, e);
        } ]);
    }, t;
}(), Rr = /** @class */ function() {
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
/** A user with a null UID. */ Rr.UNAUTHENTICATED = new Rr(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
Rr.GOOGLE_CREDENTIALS = new Rr("google-credentials-uid"), Rr.FIRST_PARTY = new Rr("first-party-uid");

/**
 * Metadata state of the local client. Unlike `RemoteClientState`, this class is
 * mutable and keeps track of all pending mutations, which allows us to
 * update the range of pending mutation batch IDs as new mutations are added or
 * removed.
 *
 * The data in `LocalClientState` is not read from WebStorage and instead
 * updated via its instance methods. The updated state can be serialized via
 * `toWebStorageJSON()`.
 */
// Visible for testing.
var Cr = /** @class */ function() {
    function t() {
        this.activeTargetIds = nn();
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
}(), Lr = /** @class */ function() {
    function t() {
        this.li = new Cr, this.fi = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
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
        return this.li = new Cr, Promise.resolve();
    }, t.prototype.handleUserChange = function(t, e, n) {
        // No op.
    }, t.prototype.setOnlineState = function(t) {
        // No op.
    }, t.prototype.shutdown = function() {}, t.prototype.writeSequenceNumber = function(t) {}, 
    t.prototype.notifyBundleLoaded = function() {
        // No op.
    }, t;
}(), Or = /** @class */ function() {
    function t() {}
    return t.prototype.di = function(t) {
        // No-op.
    }, t.prototype.shutdown = function() {
        // No-op.
    }, t;
}(), Pr = /** @class */ function() {
    function t() {
        var t = this;
        this.wi = function() {
            return t._i();
        }, this.mi = function() {
            return t.yi();
        }, this.gi = [], this.pi();
    }
    return t.prototype.di = function(t) {
        this.gi.push(t);
    }, t.prototype.shutdown = function() {
        window.removeEventListener("online", this.wi), window.removeEventListener("offline", this.mi);
    }, t.prototype.pi = function() {
        window.addEventListener("online", this.wi), window.addEventListener("offline", this.mi);
    }, t.prototype._i = function() {
        D("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.gi; t < e.length; t++) {
            (0, e[t])(0 /* AVAILABLE */);
        }
    }, t.prototype.yi = function() {
        D("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (var t = 0, e = this.gi; t < e.length; t++) {
            (0, e[t])(1 /* UNAVAILABLE */);
        }
    }, 
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    t.yt = function() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }, t;
}(), Fr = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery"
}, Vr = /** @class */ function() {
    function t(t) {
        this.Ei = t.Ei, this.Ti = t.Ti;
    }
    return t.prototype.Ii = function(t) {
        this.Ai = t;
    }, t.prototype.Ri = function(t) {
        this.bi = t;
    }, t.prototype.onMessage = function(t) {
        this.vi = t;
    }, t.prototype.close = function() {
        this.Ti();
    }, t.prototype.send = function(t) {
        this.Ei(t);
    }, t.prototype.Pi = function() {
        this.Ai();
    }, t.prototype.Vi = function(t) {
        this.bi(t);
    }, t.prototype.Si = function(t) {
        this.vi(t);
    }, t;
}(), Mr = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this, t) || this).forceLongPolling = t.forceLongPolling, n.autoDetectLongPolling = t.autoDetectLongPolling, 
        n.useFetchStreams = t.useFetchStreams, n;
    }
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    return t(n, e), n.prototype.ki = function(t, e, n, r) {
        return new Promise((function(i, o) {
            var s = new p;
            s.listenOnce(y.COMPLETE, (function() {
                try {
                    switch (s.getLastErrorCode()) {
                      case v.NO_ERROR:
                        var e = s.getResponseJson();
                        D("Connection", "XHR received:", JSON.stringify(e)), i(e);
                        break;

                      case v.TIMEOUT:
                        D("Connection", 'RPC "' + t + '" timed out'), o(new A(I.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case v.HTTP_ERROR:
                        var n = s.getStatus();
                        if (D("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", s.getResponseText()), 
                        n > 0) {
                            var r = s.getResponseJson().error;
                            if (r && r.status && r.message) {
                                var u = function(t) {
                                    var e = t.toLowerCase().replace(/_/g, "-");
                                    return Object.values(I).indexOf(e) >= 0 ? e : I.UNKNOWN;
                                }(r.status);
                                o(new A(u, r.message));
                            } else o(new A(I.UNKNOWN, "Server responded with status " + s.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        o(new A(I.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        L();
                    }
                } finally {
                    D("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            var u = JSON.stringify(r);
            s.send(e, "POST", u, n, 15);
        }));
    }, n.prototype.Oi = function(t, e) {
        var n = [ this.Di, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], r = m(), h = g(), l = {
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
        this.useFetchStreams && (l.xmlHttpFactory = new w({})), this.Fi(l.initMessageHeaders, e), 
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
        i() || o() || s() || u() || a() || c() || (l.httpHeadersOverwriteParam = "$httpHeaders");
        var f = n.join("");
        D("Connection", "Creating WebChannel: " + f, l);
        var d = r.createWebChannel(f, l), p = !1, y = !1, v = new Vr({
            Ei: function(t) {
                y ? D("Connection", "Not sending because WebChannel is closed:", t) : (p || (D("Connection", "Opening WebChannel transport."), 
                d.open(), p = !0), D("Connection", "WebChannel sending:", t), d.send(t));
            },
            Ti: function() {
                return d.close();
            }
        }), T = function(t, e, n) {
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
        return T(d, b.EventType.OPEN, (function() {
            y || D("Connection", "WebChannel transport opened.");
        })), T(d, b.EventType.CLOSE, (function() {
            y || (y = !0, D("Connection", "WebChannel transport closed"), v.Vi());
        })), T(d, b.EventType.ERROR, (function(t) {
            y || (y = !0, R("Connection", "WebChannel transport errored:", t), v.Vi(new A(I.UNAVAILABLE, "The operation could not be completed")));
        })), T(d, b.EventType.MESSAGE, (function(t) {
            var e;
            if (!y) {
                var n = t.data[0];
                O(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                var r = n, i = r.error || (null === (e = r[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    D("Connection", "WebChannel received error:", i);
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
                        var e = Fe[t];
                        if (void 0 !== e) return Be(e);
                    }(o), u = i.message;
                    void 0 === s && (s = I.INTERNAL, u = "Unknown error status: " + o + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    y = !0, v.Vi(new A(s, u)), d.close();
                } else D("Connection", "WebChannel received:", n), v.Si(n);
            }
        })), T(h, _.STAT_EVENT, (function(t) {
            t.stat === E.PROXY ? D("Connection", "Detected buffering proxy") : t.stat === E.NOPROXY && D("Connection", "Detected no buffering proxy");
        })), setTimeout((function() {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            v.Pi();
        }), 0), v;
    }, n;
}(/** @class */ function() {
    function t(t) {
        this.databaseInfo = t, this.databaseId = t.databaseId;
        var e = t.ssl ? "https" : "http";
        this.Di = e + "://" + t.host, this.Ci = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
    }
    return t.prototype.Ni = function(t, e, n, r) {
        var i = this.xi(t, e);
        D("RestConnection", "Sending: ", i, n);
        var o = {};
        return this.Fi(o, r), this.ki(t, i, o, n).then((function(t) {
            return D("RestConnection", "Received: ", t), t;
        }), (function(e) {
            throw R("RestConnection", t + " failed with error: ", e, "url: ", i, "request:", n), 
            e;
        }));
    }, t.prototype.$i = function(t, e, n, r) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.Ni(t, e, n, r);
    }, 
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */
    t.prototype.Fi = function(t, e) {
        if (t["X-Goog-Api-Client"] = "gl-js/ fire/8.8.0", 
        // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), 
        e) for (var n in e.authHeaders) e.authHeaders.hasOwnProperty(n) && (t[n] = e.authHeaders[n]);
    }, t.prototype.xi = function(t, e) {
        var n = Fr[t];
        return this.Di + "/v1/" + e + ":" + n;
    }, t;
}());

/** The Platform's 'document' implementation or null if not available. */ function Ur() {
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
 */ function xr(t) {
    return new yn(t, /* useProto3Json= */ !0);
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
 */ var qr = /** @class */ function() {
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
        this.Se = t, this.timerId = e, this.Mi = n, this.Li = r, this.Bi = i, this.qi = 0, 
        this.Ui = null, 
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
        this.qi = 0;
    }, 
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    t.prototype.Qi = function() {
        this.qi = this.Bi;
    }, 
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    t.prototype.ji = function(t) {
        var e = this;
        // Cancel any pending backoff operation.
                this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        var n = Math.floor(this.qi + this.Wi()), r = Math.max(0, Date.now() - this.Ki), i = Math.max(0, n - r);
        // Guard against lastAttemptTime being in the future due to a clock change.
                i > 0 && D("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.qi + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), 
        this.Ui = this.Se.enqueueAfterDelay(this.timerId, i, (function() {
            return e.Ki = Date.now(), t();
        })), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.qi *= this.Li, this.qi < this.Mi && (this.qi = this.Mi), this.qi > this.Bi && (this.qi = this.Bi);
    }, t.prototype.Gi = function() {
        null !== this.Ui && (this.Ui.skipDelay(), this.Ui = null);
    }, t.prototype.cancel = function() {
        null !== this.Ui && (this.Ui.cancel(), this.Ui = null);
    }, 
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */ t.prototype.Wi = function() {
        return (Math.random() - .5) * this.qi;
    }, t;
}(), Br = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.Se = t, this.zi = n, this.Hi = r, this.Ji = i, this.listener = o, this.state = 0 /* Initial */ , 
        /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
        this.Yi = 0, this.Xi = null, this.stream = null, this.Zi = new qr(t, e)
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
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
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
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
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
    t.prototype.close = function(t, r) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Notify the listener that the stream closed.
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    return this.ur(), this.Zi.cancel(), 
                    // Invalidates any stream-related callbacks (e.g. from auth or the
                    // underlying stream), guaranteeing they won't execute.
                    this.Yi++, 3 /* Error */ !== t ? 
                    // If this is an intentional close ensure we don't delay our next connection attempt.
                    this.Zi.reset() : r && r.code === I.RESOURCE_EXHAUSTED ? (
                    // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                    k(r.toString()), k("Using maximum backoff delay to prevent overloading the backend."), 
                    this.Zi.Qi()) : r && r.code === I.UNAUTHENTICATED && 
                    // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
                    // just expired.
                    this.Ji.invalidateToken(), 
                    // Clean up the underlying stream because we are no longer interested in events.
                    null !== this.stream && (this.ar(), this.stream.close(), this.stream = null), 
                    // This state must be assigned before calling onClose() to allow the callback to
                    // inhibit backoff or otherwise manipulate the state in its non-started state.
                    this.state = t, [ 4 /*yield*/ , this.listener.Ri(r) ];

                  case 1:
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    // Notify the listener that the stream closed.
                    return e.sent(), [ 2 /*return*/ ];
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
                var e = new A(I.UNKNOWN, "Fetching auth token failed: " + n.message);
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
        this.state = 4 /* Backoff */ , this.Zi.ji((function() {
            return e(t, void 0, void 0, (function() {
                return n(this, (function(t) {
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
        return D("PersistentStream", "close with error: " + t), this.stream = null, this.close(3 /* Error */ , t);
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
                return e.Yi === t ? n() : (D("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve());
            }));
        };
    }, t;
}(), jr = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        var s = this;
        return (s = e.call(this, t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , n, r, o) || this).R = i, 
        s;
    }
    return t(n, e), n.prototype.wr = function(t) {
        return this.Hi.Oi("Listen", t);
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
                    return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : L();
                }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], o = function(t, e) {
                    return t.I ? (O(void 0 === e || "string" == typeof e), Y.fromBase64String(e || "")) : (O(void 0 === e || e instanceof Uint8Array), 
                    Y.fromUint8Array(e || new Uint8Array));
                }(t, e.targetChange.resumeToken), s = (u = e.targetChange.cause) && function(t) {
                    var e = void 0 === t.code ? I.UNKNOWN : Be(t.code);
                    return new A(e, t.message || "");
                }(u);
                n = new an(r, i, o, s || null);
            } else if ("documentChange" in e) {
                e.documentChange, (r = e.documentChange).document, r.document.name, r.document.updateTime, 
                i = Tn(t, r.document.name), o = wn(r.document.updateTime);
                var u = new bt({
                    mapValue: {
                        fields: r.document.fields
                    }
                }), a = (s = Et.newFoundDocument(i, o, u), r.targetIds || []), c = r.removedTargetIds || [];
                n = new sn(a, c, s.key, s);
            } else if ("documentDelete" in e) e.documentDelete, (r = e.documentDelete).document, 
            i = Tn(t, r.document), o = r.readTime ? wn(r.readTime) : q.min(), u = Et.newNoDocument(i, o), 
            s = r.removedTargetIds || [], n = new sn([], s, u.key, u); else if ("documentRemove" in e) e.documentRemove, 
            (r = e.documentRemove).document, i = Tn(t, r.document), o = r.removedTargetIds || [], 
            n = new sn([], o, i, null); else {
                if (!("filter" in e)) return L();
                e.filter;
                var h = e.filter;
                h.targetId, r = h.count || 0, i = new xe(r), o = h.targetId, n = new un(o, i);
            }
            return n;
        }(this.R, t), n = function(t) {
            // We have only reached a consistent snapshot for the entire stream if there
            // is a read_time set and it applies to all targets (i.e. the list of
            // targets is empty). The backend is guaranteed to send such responses.
            if (!("targetChange" in t)) return q.min();
            var e = t.targetChange;
            return e.targetIds && e.targetIds.length ? q.min() : e.readTime ? wn(e.readTime) : q.min();
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
        e.database = An(this.R), e.addTarget = function(t, e) {
            var n, r = e.target;
            return (n = St(r) ? {
                documents: kn(t, r)
            } : {
                query: Rn(t, r)
            }).targetId = e.targetId, e.resumeToken.approximateByteSize() > 0 ? n.resumeToken = mn(t, e.resumeToken) : e.snapshotVersion.compareTo(q.min()) > 0 && (
            // TODO(wuandy): Consider removing above check because it is most likely true.
            // Right now, many tests depend on this behaviour though (leaving min() out
            // of serialization).
            n.readTime = vn(t, e.snapshotVersion.toTimestamp())), n;
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
                    return L();
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
    n.prototype.yr = function(t) {
        var e = {};
        e.database = An(this.R), e.removeTarget = t, this.cr(e);
    }, n;
}(Br), Gr = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        var s = this;
        return (s = e.call(this, t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , n, r, o) || this).R = i, 
        s.gr = !1, s;
    }
    return t(n, e), Object.defineProperty(n.prototype, "pr", {
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */
        get: function() {
            return this.gr;
        },
        enumerable: !1,
        configurable: !0
    }), 
    // Override of PersistentStream.start
    n.prototype.start = function() {
        this.gr = !1, this.lastStreamToken = void 0, e.prototype.start.call(this);
    }, n.prototype.ar = function() {
        this.gr && this.Er([]);
    }, n.prototype.wr = function(t) {
        return this.Hi.Oi("Write", t);
    }, n.prototype.onMessage = function(t) {
        if (
        // Always capture the last stream token.
        O(!!t.streamToken), this.lastStreamToken = t.streamToken, this.gr) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.Zi.reset();
            var e = function(t, e) {
                return t && t.length > 0 ? (O(void 0 !== e), t.map((function(t) {
                    return function(t, e) {
                        // NOTE: Deletes don't have an updateTime.
                        var n = t.updateTime ? wn(t.updateTime) : wn(e);
                        return n.isEqual(q.min()) && (
                        // The Firestore Emulator currently returns an update time of 0 for
                        // deletes of non-existing documents (rather than null). This breaks the
                        // test "get deleted doc while offline with source=cache" as NoDocuments
                        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
                        // TODO(#2149): Remove this when Emulator is fixed
                        n = wn(e)), new _e(n, t.transformResults || []);
                    }(t, e);
                }))) : [];
            }(t.writeResults, t.commitTime), n = wn(t.commitTime);
            return this.listener.Tr(n, e);
        }
        // The first response is always the handshake response
                return O(!t.writeResults || 0 === t.writeResults.length), this.gr = !0, 
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
        t.database = An(this.R), this.cr(t);
    }, 
    /** Sends a group of mutations to the Firestore backend to apply. */ n.prototype.Er = function(t) {
        var e = this, n = {
            streamToken: this.lastStreamToken,
            writes: t.map((function(t) {
                return Dn(e.R, t);
            }))
        };
        this.cr(n);
    }, n;
}(Br), Kr = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).credentials = t, i.Hi = n, i.R = r, i.Rr = !1, 
        i;
    }
    return t(n, e), n.prototype.br = function() {
        if (this.Rr) throw new A(I.FAILED_PRECONDITION, "The client has already been terminated.");
    }, 
    /** Gets an auth token and invokes the provided RPC. */ n.prototype.Ni = function(t, e, n) {
        var r = this;
        return this.br(), this.credentials.getToken().then((function(i) {
            return r.Hi.Ni(t, e, n, i);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === I.UNAUTHENTICATED && r.credentials.invalidateToken(), 
            t) : new A(I.UNKNOWN, t.toString());
        }));
    }, 
    /** Gets an auth token and invokes the provided RPC with streamed results. */ n.prototype.$i = function(t, e, n) {
        var r = this;
        return this.br(), this.credentials.getToken().then((function(i) {
            return r.Hi.$i(t, e, n, i);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === I.UNAUTHENTICATED && r.credentials.invalidateToken(), 
            t) : new A(I.UNKNOWN, t.toString());
        }));
    }, n.prototype.terminate = function() {
        this.Rr = !0;
    }, n;
}((function() {})), Qr = /** @class */ function() {
    function t(t, e) {
        this.asyncQueue = t, this.onlineStateHandler = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
        this.vr = 0, 
        /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
        this.Pr = null, 
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
        0 === this.vr && (this.Dr("Unknown" /* Unknown */), this.Pr = this.asyncQueue.enqueueAfterDelay("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (function() {
            return t.Pr = null, t.Cr("Backend didn't respond within 10 seconds."), t.Dr("Offline" /* Offline */), 
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
        "Online" /* Online */ === this.state ? this.Dr("Unknown" /* Unknown */) : (this.vr++, 
        this.vr >= 1 && (this.Fr(), this.Cr("Connection failed 1 times. Most recent error: " + t.toString()), 
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
        this.Fr(), this.vr = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.Vr = !1), this.Dr(t);
    }, t.prototype.Dr = function(t) {
        t !== this.state && (this.state = t, this.onlineStateHandler(t));
    }, t.prototype.Cr = function(t) {
        var e = "Could not reach Cloud Firestore backend. " + t + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
        this.Vr ? (k(e), this.Vr = !1) : D("OnlineStateTracker", e);
    }, t.prototype.Fr = function() {
        null !== this.Pr && (this.Pr.cancel(), this.Pr = null);
    }, t;
}(), zr = function(
/**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
t, 
/** The client-side proxy for interacting with the backend. */
r, i, o, s) {
    var u = this;
    this.localStore = t, this.datastore = r, this.asyncQueue = i, this.remoteSyncer = {}, 
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
    this.kr = [], 
    /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
    this.$r = new Map, 
    /**
             * A set of reasons for why the RemoteStore may be offline. If empty, the
             * RemoteStore may start its network connections.
             */
    this.Or = new Set, 
    /**
             * Event handlers that get called when the network is disabled or enabled.
             *
             * PORTING NOTE: These functions are used on the Web client to create the
             * underlying streams (to support tree-shakeable streams). On Android and iOS,
             * the streams are created during construction of RemoteStore.
             */
    this.Mr = [], this.Lr = s, this.Lr.di((function(t) {
        i.enqueueAndForget((function() {
            return e(u, void 0, void 0, (function() {
                return n(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return ei(this) ? (D("RemoteStore", "Restarting streams for network reachability change."), 
                        [ 4 /*yield*/ , function(t) {
                            return e(this, void 0, void 0, (function() {
                                var e;
                                return n(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return (e = P(t)).Or.add(4 /* ConnectivityChange */), [ 4 /*yield*/ , Hr(e) ];

                                      case 1:
                                        return n.sent(), e.Br.set("Unknown" /* Unknown */), e.Or.delete(4 /* ConnectivityChange */), 
                                        [ 4 /*yield*/ , Wr(e) ];

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
    })), this.Br = new Qr(i, o);
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
 */ function Wr(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if (!ei(t)) return [ 3 /*break*/ , 4 ];
                e = 0, r = t.Mr, n.label = 1;

              case 1:
                return e < r.length ? [ 4 /*yield*/ , (0, r[e])(/* enabled= */ !0) ] : [ 3 /*break*/ , 4 ];

              case 2:
                n.sent(), n.label = 3;

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
 */ function Hr(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = 0, r = t.Mr, n.label = 1;

              case 1:
                return e < r.length ? [ 4 /*yield*/ , (0, r[e])(/* enabled= */ !1) ] : [ 3 /*break*/ , 4 ];

              case 2:
                n.sent(), n.label = 3;

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
 */ function Yr(t, e) {
    var n = P(t);
    n.$r.has(e.targetId) || (
    // Mark this as something the client is currently listening for.
    n.$r.set(e.targetId, e), ti(n) ? 
    // The listen will be sent in onWatchStreamOpen
    $r(n) : vi(n).er() && Jr(n, e));
}

/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */ function Xr(t, e) {
    var n = P(t), r = vi(n);
    n.$r.delete(e), r.er() && Zr(n, e), 0 === n.$r.size && (r.er() ? r.ir() : ei(n) && 
    // Revert to OnlineState.Unknown if the watch stream is not open and we
    // have no listeners, since without any listens to send we cannot
    // confirm if the stream is healthy and upgrade to OnlineState.Online.
    n.Br.set("Unknown" /* Unknown */));
}

/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */ function Jr(t, e) {
    t.qr.U(e.targetId), vi(t).mr(e)
    /**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */;
}

function Zr(t, e) {
    t.qr.U(e), vi(t).yr(e);
}

function $r(t) {
    t.qr = new hn({
        getRemoteKeysForTarget: function(e) {
            return t.remoteSyncer.getRemoteKeysForTarget(e);
        },
        lt: function(e) {
            return t.$r.get(e) || null;
        }
    }), vi(t).start(), t.Br.Sr()
    /**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */;
}

function ti(t) {
    return ei(t) && !vi(t).tr() && t.$r.size > 0;
}

function ei(t) {
    return 0 === P(t).Or.size;
}

function ni(t) {
    t.qr = void 0;
}

function ri(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return t.$r.forEach((function(e, n) {
                Jr(t, e);
            })), [ 2 /*return*/ ];
        }));
    }));
}

function ii(t, r) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return ni(t), 
            // If we still need the watch stream, retry the connection.
            ti(t) ? (t.Br.Nr(r), $r(t)) : 
            // No need to restart watch stream because there are no active targets.
            // The online state is set to unknown because there is no active attempt
            // at establishing a connection
            t.Br.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
        }));
    }));
}

function oi(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o, s, u;
        return n(this, (function(a) {
            switch (a.label) {
              case 0:
                if (t.Br.set("Online" /* Online */), !(r instanceof an && 2 /* Removed */ === r.state && r.cause)) 
                // Mark the client as online since we got a message from the server
                return [ 3 /*break*/ , 6 ];
                a.label = 1;

              case 1:
                return a.trys.push([ 1, 3, , 5 ]), [ 4 /*yield*/ , 
                /** Handles an error on a target */
                function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e, i, o, s;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                e = r.cause, i = 0, o = r.targetIds, n.label = 1;

                              case 1:
                                return i < o.length ? (s = o[i], t.$r.has(s) ? [ 4 /*yield*/ , t.remoteSyncer.rejectListen(s, e) ] : [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 5 ];

                              case 2:
                                n.sent(), t.$r.delete(s), t.qr.removeTarget(s), n.label = 3;

                              case 3:
                                n.label = 4;

                              case 4:
                                return i++, [ 3 /*break*/ , 1 ];

                              case 5:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(t, r) ];

              case 2:
                return a.sent(), [ 3 /*break*/ , 5 ];

              case 3:
                return o = a.sent(), D("RemoteStore", "Failed to remove targets %s: %s ", r.targetIds.join(","), o), 
                [ 4 /*yield*/ , si(t, o) ];

              case 4:
                return a.sent(), [ 3 /*break*/ , 5 ];

              case 5:
                return [ 3 /*break*/ , 13 ];

              case 6:
                if (r instanceof sn ? t.qr.X(r) : r instanceof un ? t.qr.rt(r) : t.qr.et(r), i.isEqual(q.min())) return [ 3 /*break*/ , 13 ];
                a.label = 7;

              case 7:
                return a.trys.push([ 7, 11, , 13 ]), [ 4 /*yield*/ , lr(t.localStore) ];

              case 8:
                return s = a.sent(), i.compareTo(s) >= 0 ? [ 4 /*yield*/ , 
                /**
                 * Takes a batch of changes from the Datastore, repackages them as a
                 * RemoteEvent, and passes that on to the listener, which is typically the
                 * SyncEngine.
                 */
                function(t, e) {
                    var n = t.qr.ut(e);
                    // Update in-memory resume tokens. LocalStore will update the
                    // persistent view of these when applying the completed RemoteEvent.
                                        return n.targetChanges.forEach((function(n, r) {
                        if (n.resumeToken.approximateByteSize() > 0) {
                            var i = t.$r.get(r);
                            // A watched target might have been removed already.
                                                        i && t.$r.set(r, i.withResumeToken(n.resumeToken, e));
                        }
                    })), 
                    // Re-establish listens for the targets that have been invalidated by
                    // existence filter mismatches.
                    n.targetMismatches.forEach((function(e) {
                        var n = t.$r.get(e);
                        if (n) {
                            // Clear the resume token for the target, since we're in a known mismatch
                            // state.
                            t.$r.set(e, n.withResumeToken(Y.EMPTY_BYTE_STRING, n.snapshotVersion)), 
                            // Cause a hard reset by unwatching and rewatching immediately, but
                            // deliberately don't send a resume token so that we get a full update.
                            Zr(t, e);
                            // Mark the target we send as being on behalf of an existence filter
                            // mismatch, but don't actually retain that in listenTargets. This ensures
                            // that we flag the first re-listen this way without impacting future
                            // listens of this target (that might happen e.g. on reconnect).
                            var r = new Yn(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                            Jr(t, r);
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
                return D("RemoteStore", "Failed to raise snapshot:", u = a.sent()), [ 4 /*yield*/ , si(t, u) ];

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
 */ function si(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o = this;
        return n(this, (function(s) {
            switch (s.label) {
              case 0:
                if (!zn(r)) throw r;
                // Disable network and raise offline snapshots
                return t.Or.add(1 /* IndexedDbFailed */), [ 4 /*yield*/ , Hr(t) ];

              case 1:
                // Disable network and raise offline snapshots
                return s.sent(), t.Br.set("Offline" /* Offline */), i || (
                // Use a simple read operation to determine if IndexedDB recovered.
                // Ideally, we would expose a health check directly on SimpleDb, but
                // RemoteStore only has access to persistence through LocalStore.
                i = function() {
                    return lr(t.localStore);
                }), 
                // Probe IndexedDB periodically and re-enable network
                t.asyncQueue.enqueueRetryable((function() {
                    return e(o, void 0, void 0, (function() {
                        return n(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return D("RemoteStore", "Retrying IndexedDB access"), [ 4 /*yield*/ , i() ];

                              case 1:
                                return e.sent(), t.Or.delete(1 /* IndexedDbFailed */), [ 4 /*yield*/ , Wr(t) ];

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
 */ function ui(t, e) {
    return e().catch((function(n) {
        return si(t, n, e);
    }));
}

function ai(t) {
    return e(this, void 0, void 0, (function() {
        var e, r, i, o, s;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = P(t), r = mi(e), i = e.kr.length > 0 ? e.kr[e.kr.length - 1].batchId : -1, n.label = 1;

              case 1:
                if (!
                /**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */
                function(t) {
                    return ei(t) && t.kr.length < 10;
                }
                /**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */ (e)) return [ 3 /*break*/ , 7 ];
                n.label = 2;

              case 2:
                return n.trys.push([ 2, 4, , 6 ]), [ 4 /*yield*/ , pr(e.localStore, i) ];

              case 3:
                return null === (o = n.sent()) ? (0 === e.kr.length && r.ir(), [ 3 /*break*/ , 7 ]) : (i = o.batchId, 
                function(t, e) {
                    t.kr.push(e);
                    var n = mi(t);
                    n.er() && n.pr && n.Er(e.mutations);
                }(e, o), [ 3 /*break*/ , 6 ]);

              case 4:
                return s = n.sent(), [ 4 /*yield*/ , si(e, s) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 3 /*break*/ , 1 ];

              case 7:
                return ci(e) && hi(e), [ 2 /*return*/ ];
            }
        }));
    }));
}

function ci(t) {
    return ei(t) && !mi(t).tr() && t.kr.length > 0;
}

function hi(t) {
    mi(t).start();
}

function li(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            return mi(t).Ar(), [ 2 /*return*/ ];
        }));
    }));
}

function fi(t) {
    return e(this, void 0, void 0, (function() {
        var e, r, i, o;
        return n(this, (function(n) {
            // Send the write pipeline now that the stream is established.
            for (e = mi(t), r = 0, i = t.kr; r < i.length; r++) o = i[r], e.Er(o.mutations);
            return [ 2 /*return*/ ];
        }));
    }));
}

function di(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = t.kr.shift(), o = Hn.from(e, r, i), [ 4 /*yield*/ , ui(t, (function() {
                    return t.remoteSyncer.applySuccessfulWrite(o);
                })) ];

              case 1:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return n.sent(), [ 4 /*yield*/ , ai(t) ];

              case 2:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return n.sent(), [ 2 /*return*/ ];
            }
        }));
    }));
}

function pi(t, r) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(i) {
            switch (i.label) {
              case 0:
                return r && mi(t).pr ? [ 4 /*yield*/ , function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e, i;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return qe(i = r.code) && i !== I.ABORTED ? (e = t.kr.shift(), 
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                mi(t).sr(), [ 4 /*yield*/ , ui(t, (function() {
                                    return t.remoteSyncer.rejectFailedWrite(e.batchId, r);
                                })) ]) : [ 3 /*break*/ , 3 ];

                              case 1:
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                return n.sent(), [ 4 /*yield*/ , ai(t) ];

                              case 2:
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                n.sent(), n.label = 3;

                              case 3:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                }(t, r) ] : [ 3 /*break*/ , 2 ];

                // This error affects the actual write.
                              case 1:
                // This error affects the actual write.
                i.sent(), i.label = 2;

              case 2:
                // If the write stream closed after the write handshake completes, a write
                // operation failed and we fail the pending operation.
                // The write stream might have been started by refilling the write
                // pipeline for failed writes
                return ci(t) && hi(t), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Toggles the network state when the client gains or loses its primary lease.
 */ function yi(t, r) {
    return e(this, void 0, void 0, (function() {
        var e;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = P(t), r ? (e.Or.delete(2 /* IsSecondary */), [ 4 /*yield*/ , Wr(e) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return n.sent(), [ 3 /*break*/ , 5 ];

              case 2:
                return r ? [ 3 /*break*/ , 4 ] : (e.Or.add(2 /* IsSecondary */), [ 4 /*yield*/ , Hr(e) ]);

              case 3:
                n.sent(), e.Br.set("Unknown" /* Unknown */), n.label = 4;

              case 4:
                n.label = 5;

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
 */ function vi(t) {
    var r = this;
    return t.Ur || (
    // Create stream (but note that it is not started yet).
    t.Ur = function(t, e, n) {
        var r = P(t);
        return r.br(), new jr(e, r.Hi, r.credentials, r.R, n);
    }(t.datastore, t.asyncQueue, {
        Ii: ri.bind(null, t),
        Ri: ii.bind(null, t),
        _r: oi.bind(null, t)
    }), t.Mr.push((function(i) {
        return e(r, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.Ur.sr(), ti(t) ? $r(t) : t.Br.set("Unknown" /* Unknown */), [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    return [ 4 /*yield*/ , t.Ur.stop() ];

                  case 2:
                    e.sent(), ni(t), e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }))), t.Ur
    /**
 * If not yet initialized, registers the WriteStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */;
}

function mi(t) {
    var r = this;
    return t.Kr || (
    // Create stream (but note that it is not started yet).
    t.Kr = function(t, e, n) {
        var r = P(t);
        return r.br(), new Gr(e, r.Hi, r.credentials, r.R, n);
    }(t.datastore, t.asyncQueue, {
        Ii: li.bind(null, t),
        Ri: pi.bind(null, t),
        Ir: fi.bind(null, t),
        Tr: di.bind(null, t)
    }), t.Mr.push((function(i) {
        return e(r, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.Kr.sr(), [ 4 /*yield*/ , ai(t) ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    // This will start the write stream if necessary.
                    return e.sent(), [ 3 /*break*/ , 4 ];

                  case 2:
                    return [ 4 /*yield*/ , t.Kr.stop() ];

                  case 3:
                    e.sent(), t.kr.length > 0 && (D("RemoteStore", "Stopping write stream with " + t.kr.length + " pending writes"), 
                    t.kr = []), e.label = 4;

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

var gi = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = i, 
        this.deferred = new Kn, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
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
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new A(I.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
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
 */ function wi(t, e) {
    if (k("AsyncQueue", e + ": " + t), zn(t)) return new A(I.UNAVAILABLE, e + ": " + t);
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
 */ var bi = /** @class */ function() {
    /** The default ordering is by key if the comparator is omitted */
    function t(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.comparator = t ? function(e, n) {
            return t(e, n) || ot.comparator(e.key, n.key);
        } : function(t, e) {
            return ot.comparator(t.key, e.key);
        }, this.keyedMap = Xe(), this.sortedSet = new je(this.comparator)
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
}(), _i = /** @class */ function() {
    function t() {
        this.Qr = new je(ot.comparator);
    }
    return t.prototype.track = function(t) {
        var e = t.doc.key, n = this.Qr.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.Qr = this.Qr.insert(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.Qr = this.Qr.insert(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.Qr = this.Qr.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.Qr = this.Qr.insert(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.Qr = this.Qr.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.Qr = this.Qr.insert(e, {
            type: 1 /* Removed */ ,
            doc: n.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.Qr = this.Qr.insert(e, {
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
        L() : this.Qr = this.Qr.insert(e, t);
    }, t.prototype.jr = function() {
        var t = [];
        return this.Qr.inorderTraversal((function(e, n) {
            t.push(n);
        })), t;
    }, t;
}(), Ei = /** @class */ function() {
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
        })), new t(e, n, bi.emptySet(n), o, r, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }, Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return !this.mutatedKeys.isEmpty();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && $t(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
        var e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
        return !0;
    }, t;
}(), Ti = function() {
    this.Wr = void 0, this.listeners = [];
}, Ii = function() {
    this.queries = new nr((function(t) {
        return te(t);
    }), $t), this.onlineState = "Unknown" /* Unknown */ , this.Gr = new Set;
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
 */ function Ai(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, s, u, a, c;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                if (e = P(t), i = r.query, o = !1, (s = e.queries.get(i)) || (o = !0, s = new Ti), 
                !o) return [ 3 /*break*/ , 4 ];
                n.label = 1;

              case 1:
                return n.trys.push([ 1, 3, , 4 ]), u = s, [ 4 /*yield*/ , e.onListen(i) ];

              case 2:
                return u.Wr = n.sent(), [ 3 /*break*/ , 4 ];

              case 3:
                return a = n.sent(), c = wi(a, "Initialization of query '" + ee(r.query) + "' failed"), 
                [ 2 /*return*/ , void r.onError(c) ];

              case 4:
                return e.queries.set(i, s), s.listeners.push(r), 
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                r.zr(e.onlineState), s.Wr && r.Hr(s.Wr) && ki(e), [ 2 /*return*/ ];
            }
        }));
    }));
}

function Ni(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, s, u;
        return n(this, (function(n) {
            return e = P(t), i = r.query, o = !1, (s = e.queries.get(i)) && (u = s.listeners.indexOf(r)) >= 0 && (s.listeners.splice(u, 1), 
            o = 0 === s.listeners.length), o ? [ 2 /*return*/ , (e.queries.delete(i), e.onUnlisten(i)) ] : [ 2 /*return*/ ];
        }));
    }));
}

function Si(t, e) {
    for (var n = P(t), r = !1, i = 0, o = e; i < o.length; i++) {
        var s = o[i], u = s.query, a = n.queries.get(u);
        if (a) {
            for (var c = 0, h = a.listeners; c < h.length; c++) {
                h[c].Hr(s) && (r = !0);
            }
            a.Wr = s;
        }
    }
    r && ki(n);
}

function Di(t, e, n) {
    var r = P(t), i = r.queries.get(e);
    if (i) for (var o = 0, s = i.listeners; o < s.length; o++) {
        s[o].onError(n);
    }
    // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
    // after an error.
        r.queries.delete(e);
}

// Call all global snapshot listeners that have been set.
function ki(t) {
    t.Gr.forEach((function(t) {
        t.next();
    }));
}

/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */ var Ri = /** @class */ function() {
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
            t = new Ei(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, 
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
        t = Ei.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.Yr = !0, 
        this.Jr.next(t);
    }, t;
}(), Ci = /** @class */ function() {
    function t(t, 
    // How many bytes this element takes to store in the bundle.
    e) {
        this.payload = t, this.byteLength = e;
    }
    return t.prototype.io = function() {
        return "metadata" in this.payload;
    }, t;
}(), Li = /** @class */ function() {
    function t(t) {
        this.R = t;
    }
    return t.prototype.qn = function(t) {
        return Tn(this.R, t);
    }, 
    /**
     * Converts a BundleDocument to a MutableDocument.
     */
    t.prototype.Un = function(t) {
        return t.metadata.exists ? function(t, e, n) {
            var r = Tn(t, e.name), i = wn(e.updateTime), o = new bt({
                mapValue: {
                    fields: e.fields
                }
            }), s = Et.newFoundDocument(r, i, o);
            return n && s.setHasCommittedMutations(), n ? s.setHasCommittedMutations() : s;
        }(this.R, t.document, !1) : Et.newNoDocument(this.qn(t.metadata.name), this.Kn(t.metadata.readTime));
    }, t.prototype.Kn = function(t) {
        return wn(t);
    }, t;
}(), Oi = /** @class */ function() {
    function t(t, e, n) {
        this.ro = t, this.localStore = e, this.R = n, 
        /** Batched queries to be saved into storage */
        this.queries = [], 
        /** Batched documents to be saved into storage */
        this.documents = [], this.progress = Pi(t)
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
        for (var e = new Map, n = new Li(this.R), r = 0, i = t; r < i.length; r++) {
            var o = i[r];
            if (o.metadata.queries) for (var s = n.qn(o.metadata.name), u = 0, a = o.metadata.queries; u < a.length; u++) {
                var c = a[u], h = (e.get(c) || tn()).add(s);
                e.set(c, h);
            }
        }
        return e;
    }, 
    /**
     * Update the progress to 'Success' and return the updated progress.
     */
    t.prototype.complete = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i, o;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , gr(this.localStore, new Li(this.R), this.documents, this.ro.id) ];

                  case 1:
                    t = n.sent(), e = this.co(this.documents), r = 0, i = this.queries, n.label = 2;

                  case 2:
                    return r < i.length ? (o = i[r], [ 4 /*yield*/ , wr(this.localStore, o, e.get(o.name)) ]) : [ 3 /*break*/ , 5 ];

                  case 3:
                    n.sent(), n.label = 4;

                  case 4:
                    return r++, [ 3 /*break*/ , 2 ];

                  case 5:
                    return [ 2 /*return*/ , (this.progress.taskState = "Success", new ir(Object.assign({}, this.progress), t)) ];
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
function Pi(t) {
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
 */ var Fi = function(t) {
    this.key = t;
}, Vi = function(t) {
    this.key = t;
}, Mi = /** @class */ function() {
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
        this.ho = tn(), 
        /** Document Keys that have local changes */
        this.mutatedKeys = tn(), this.lo = re(t), this.fo = new bi(this.lo);
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
        var n = this, r = e ? e.mo : new _i, i = e ? e.fo : this.fo, o = e ? e.mutatedKeys : this.mutatedKeys, s = i, u = !1, a = Qt(this.query) && i.size === this.query.limit ? i.last() : null, c = zt(this.query) && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.inorderTraversal((function(t, e) {
            var h = i.get(t), l = ne(n.query, e) ? e : null, f = !!h && n.mutatedKeys.has(h.key), d = !!l && (l.hasLocalMutations || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            n.mutatedKeys.has(l.key) && l.hasCommittedMutations), p = !1;
            // Calculate change
            h && l ? h.data.isEqual(l.data) ? f !== d && (r.track({
                type: 3 /* Metadata */ ,
                doc: l
            }), p = !0) : n.yo(h, l) || (r.track({
                type: 2 /* Modified */ ,
                doc: l
            }), p = !0, (a && n.lo(l, a) > 0 || c && n.lo(l, c) < 0) && (
            // This doc moved from inside the limit to outside the limit.
            // That means there may be some other doc in the local cache
            // that should be included instead.
            u = !0)) : !h && l ? (r.track({
                type: 0 /* Added */ ,
                doc: l
            }), p = !0) : h && !l && (r.track({
                type: 1 /* Removed */ ,
                doc: h
            }), p = !0, (a || c) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            u = !0)), p && (l ? (s = s.add(l), o = d ? o.add(t) : o.delete(t)) : (s = s.delete(t), 
            o = o.delete(t)));
        })), Qt(this.query) || zt(this.query)) for (;s.size > this.query.limit; ) {
            var h = Qt(this.query) ? s.last() : s.first();
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
        var o = t.mo.jr();
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
                        return L();
                    }
                };
                return n(t) - n(e);
            }(t.type, e.type) || r.lo(t.doc, e.doc);
        })), this.po(n);
        var s = e ? this.Eo() : [], u = 0 === this.ho.size && this.current ? 1 /* Synced */ : 0 /* Local */ , a = u !== this.ao;
        return this.ao = u, 0 !== o.length || a ? {
            snapshot: new Ei(this.query, t.fo, i, o, t.mutatedKeys, 0 /* Local */ === u, a, 
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
            mo: new _i,
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
        this.ho = tn(), this.fo.forEach((function(e) {
            t.Io(e.key) && (t.ho = t.ho.add(e.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        var n = [];
        return e.forEach((function(e) {
            t.ho.has(e) || n.push(new Vi(e));
        })), this.ho.forEach((function(t) {
            e.has(t) || n.push(new Fi(t));
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
        this.uo = t.Bn, this.ho = tn();
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
        return Ei.fromInitialDocuments(this.query, this.fo, this.mutatedKeys, 0 /* Local */ === this.ao);
    }, t;
}(), Ui = function(
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
}, xi = function(t) {
    this.key = t, 
    /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
    this.bo = !1;
}, qi = /** @class */ function() {
    function t(t, e, n, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    r, i, o) {
        this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = r, 
        this.currentUser = i, this.maxConcurrentLimboResolutions = o, this.vo = {}, this.Po = new nr((function(t) {
            return te(t);
        }), $t), this.Vo = new Map, 
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
        this.Do = new je(ot.comparator), 
        /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
        this.Co = new Map, this.No = new _r, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.xo = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.Fo = new Map, this.ko = tr.Yt(), this.onlineState = "Unknown" /* Unknown */ , 
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        this.$o = void 0;
    }
    return Object.defineProperty(t.prototype, "isPrimaryClient", {
        get: function() {
            return !0 === this.$o;
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
function Bi(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, s, u, a;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = function(t) {
                    var e = P(t);
                    return e.remoteStore.remoteSyncer.applyRemoteEvent = Qi.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = so.bind(null, e), 
                    e.remoteStore.remoteSyncer.rejectListen = Wi.bind(null, e), e.vo._r = Si.bind(null, e.eventManager), 
                    e.vo.Mo = Di.bind(null, e.eventManager), e;
                }(t), (s = e.Po.get(r)) ? (
                // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
                // already exists when EventManager calls us for the first time. This
                // happens when the primary tab is already listening to this query on
                // behalf of another tab and the user of the primary also starts listening
                // to the query. EventManager will not have an assigned target ID in this
                // case and calls `listen` to obtain this ID.
                i = s.targetId, e.sharedClientState.addLocalQueryTarget(i), o = s.view.Ro(), [ 3 /*break*/ , 4 ]) : [ 3 /*break*/ , 1 ];

              case 1:
                return [ 4 /*yield*/ , yr(e.localStore, Jt(r)) ];

              case 2:
                return u = n.sent(), a = e.sharedClientState.addLocalQueryTarget(u.targetId), i = u.targetId, 
                [ 4 /*yield*/ , ji(e, r, i, "current" === a) ];

              case 3:
                o = n.sent(), e.isPrimaryClient && Yr(e.remoteStore, u), n.label = 4;

              case 4:
                return [ 2 /*return*/ , o ];
            }
        }));
    }));
}

/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */ function ji(t, r, i, o) {
    return e(this, void 0, void 0, (function() {
        var s, u, a, c, h, l;
        return n(this, (function(f) {
            switch (f.label) {
              case 0:
                // PORTING NOTE: On Web only, we inject the code that registers new Limbo
                // targets based on view changes. This allows us to only depend on Limbo
                // changes when user code includes queries.
                return t.Oo = function(r, i, o) {
                    return function(t, r, i, o) {
                        return e(this, void 0, void 0, (function() {
                            var e, s, u;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = r.view._o(i), e.Nn ? [ 4 /*yield*/ , mr(t.localStore, r.query, 
                                    /* usePreviousResults= */ !1).then((function(t) {
                                        var n = t.documents;
                                        return r.view._o(n, e);
                                    })) ] : [ 3 /*break*/ , 2 ];

                                  case 1:
                                    // The query has a limit and some docs were removed, so we need
                                    // to re-run the query against the local store to make sure we
                                    // didn't lose any good docs that had been past the limit.
                                    e = n.sent(), n.label = 2;

                                  case 2:
                                    return s = o && o.targetChanges.get(r.targetId), u = r.view.applyChanges(e, 
                                    /* updateLimboDocuments= */ t.isPrimaryClient, s), [ 2 /*return*/ , (eo(t, r.targetId, u.To), 
                                    u.snapshot) ];
                                }
                            }));
                        }));
                    }(t, r, i, o);
                }, [ 4 /*yield*/ , mr(t.localStore, r, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return s = f.sent(), u = new Mi(r, s.Bn), a = u._o(s.documents), c = on.createSynthesizedTargetChangeForCurrentChange(i, o && "Offline" /* Offline */ !== t.onlineState), 
                h = u.applyChanges(a, 
                /* updateLimboDocuments= */ t.isPrimaryClient, c), eo(t, i, h.To), l = new Ui(r, i, u), 
                [ 2 /*return*/ , (t.Po.set(r, l), t.Vo.has(i) ? t.Vo.get(i).push(r) : t.Vo.set(i, [ r ]), 
                h.snapshot) ];
            }
        }));
    }));
}

/** Stops listening to the query. */ function Gi(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return e = P(t), i = e.Po.get(r), (o = e.Vo.get(i.targetId)).length > 1 ? [ 2 /*return*/ , (e.Vo.set(i.targetId, o.filter((function(t) {
                    return !$t(t, r);
                }))), void e.Po.delete(r)) ] : e.isPrimaryClient ? (
                // We need to remove the local query target first to allow us to verify
                // whether any other client is still interested in this target.
                e.sharedClientState.removeLocalQueryTarget(i.targetId), e.sharedClientState.isActiveQueryTarget(i.targetId) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , vr(e.localStore, i.targetId, 
                /*keepPersistedTargetData=*/ !1).then((function() {
                    e.sharedClientState.clearQueryState(i.targetId), Xr(e.remoteStore, i.targetId), 
                    $i(e, i.targetId);
                })).catch(er) ]) : [ 3 /*break*/ , 3 ];

              case 1:
                n.sent(), n.label = 2;

              case 2:
                return [ 3 /*break*/ , 5 ];

              case 3:
                return $i(e, i.targetId), [ 4 /*yield*/ , vr(e.localStore, i.targetId, 
                /*keepPersistedTargetData=*/ !0) ];

              case 4:
                n.sent(), n.label = 5;

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
 */ function Ki(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, s, u;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = function(t) {
                    var e = P(t);
                    return e.remoteStore.remoteSyncer.applySuccessfulWrite = Hi.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Yi.bind(null, e), 
                    e
                    /**
 * Loads a Firestore bundle into the SDK. The returned promise resolves when
 * the bundle finished loading.
 *
 * @param syncEngine - SyncEngine to use.
 * @param bundleReader - Bundle to load into the SDK.
 * @param task - LoadBundleTask used to update the loading progress to public API.
 */;
                }(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 5, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n, r = P(t), i = x.now(), o = e.reduce((function(t, e) {
                        return t.add(e.key);
                    }), tn());
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
                                var c = a[u], h = Se(c, n.get(c.key));
                                null != h && 
                                // NOTE: The base state should only be applied if there's some
                                // existing document to override, so use a Precondition of
                                // exists=true
                                s.push(new Ce(c.key, h, _t(h.value.mapValue), Ee.exists(!0)));
                            }
                            return r._n.addMutationBatch(t, i, s, e);
                        }));
                    })).then((function(t) {
                        return t.applyToLocalDocumentSet(n), {
                            batchId: t.batchId,
                            changes: n
                        };
                    }));
                }(e.localStore, r) ];

              case 2:
                return o = n.sent(), e.sharedClientState.addPendingMutation(o.batchId), function(t, e, n) {
                    var r = t.xo[t.currentUser.toKey()];
                    r || (r = new je(M)), r = r.insert(e, n), t.xo[t.currentUser.toKey()] = r;
                }(e, o.batchId, i), [ 4 /*yield*/ , io(e, o.changes) ];

              case 3:
                return n.sent(), [ 4 /*yield*/ , ai(e.remoteStore) ];

              case 4:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 5:
                return s = n.sent(), u = wi(s, "Failed to persist write"), i.reject(u), [ 3 /*break*/ , 6 ];

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
 */ function Qi(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = P(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , fr(e.localStore, r) ];

              case 2:
                return i = n.sent(), 
                // Update `receivedDocument` as appropriate for any limbo targets.
                r.targetChanges.forEach((function(t, n) {
                    var r = e.Co.get(n);
                    r && (
                    // Since this is a limbo resolution lookup, it's for a single document
                    // and it could be added, modified, or removed, but not a combination.
                    O(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), 
                    t.addedDocuments.size > 0 ? r.bo = !0 : t.modifiedDocuments.size > 0 ? O(r.bo) : t.removedDocuments.size > 0 && (O(r.bo), 
                    r.bo = !1));
                })), [ 4 /*yield*/ , io(e, i, r) ];

              case 3:
                // Update `receivedDocument` as appropriate for any limbo targets.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , er(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */ function zi(t, e, n) {
    var r = P(t);
    // If we are the secondary client, we explicitly ignore the remote store's
    // online state (the local client may go offline, even though the primary
    // tab remains online) and only apply the primary tab's online state from
    // SharedClientState.
        if (r.isPrimaryClient && 0 /* RemoteStore */ === n || !r.isPrimaryClient && 1 /* SharedClientState */ === n) {
        var i = [];
        r.Po.forEach((function(t, n) {
            var r = n.view.zr(e);
            r.snapshot && i.push(r.snapshot);
        })), function(t, e) {
            var n = P(t);
            n.onlineState = e;
            var r = !1;
            n.queries.forEach((function(t, n) {
                for (var i = 0, o = n.listeners; i < o.length; i++) {
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    o[i].zr(e) && (r = !0);
                }
            })), r && ki(n);
        }(r.eventManager, e), i.length && r.vo._r(i), r.onlineState = e, r.isPrimaryClient && r.sharedClientState.setOnlineState(e);
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
 */ function Wi(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o, s, u, a, c;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                // PORTING NOTE: Multi-tab only.
                return (e = P(t)).sharedClientState.updateQueryState(r, "rejected", i), o = e.Co.get(r), 
                (s = o && o.key) ? (u = (u = new je(ot.comparator)).insert(s, Et.newNoDocument(s, q.min())), 
                a = tn().add(s), c = new rn(q.min(), 
                /* targetChanges= */ new Map, 
                /* targetMismatches= */ new Qe(M), u, a), [ 4 /*yield*/ , Qi(e, c) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return n.sent(), 
                // Since this query failed, we won't want to manually unlisten to it.
                // We only remove it from bookkeeping after we successfully applied the
                // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
                // this query when the RemoteStore restarts the Watch stream, which should
                // re-trigger the target failure.
                e.Do = e.Do.remove(s), e.Co.delete(r), ro(e), [ 3 /*break*/ , 4 ];

              case 2:
                return [ 4 /*yield*/ , vr(e.localStore, r, 
                /* keepPersistedTargetData */ !1).then((function() {
                    return $i(e, r, i);
                })).catch(er) ];

              case 3:
                n.sent(), n.label = 4;

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Hi(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = P(t), i = r.batch.batchId, n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , hr(e.localStore, r) ];

              case 2:
                return o = n.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                Zi(e, i, /*error=*/ null), Ji(e, i), e.sharedClientState.updateMutationState(i, "acknowledged"), 
                [ 4 /*yield*/ , io(e, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , er(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Yi(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var e, o;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                e = P(t), n.label = 1;

              case 1:
                return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n = P(t);
                    return n.persistence.runTransaction("Reject batch", "readwrite-primary", (function(t) {
                        var r;
                        return n._n.lookupMutationBatch(t, e).next((function(e) {
                            return O(null !== e), r = e.keys(), n._n.removeMutationBatch(t, e);
                        })).next((function() {
                            return n._n.performConsistencyCheck(t);
                        })).next((function() {
                            return n.Mn.pn(t, r);
                        }));
                    }));
                }(e.localStore, r) ];

              case 2:
                return o = n.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                Zi(e, r, i), Ji(e, r), e.sharedClientState.updateMutationState(r, "rejected", i), 
                [ 4 /*yield*/ , io(e, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , er(n.sent()) ];

              case 5:
                return n.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */ function Xi(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i, o, s, u;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                ei((e = P(t)).remoteStore) || D("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), 
                n.label = 1;

              case 1:
                return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , function(t) {
                    var e = P(t);
                    return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (function(t) {
                        return e._n.getHighestUnacknowledgedBatchId(t);
                    }));
                }(e.localStore) ];

              case 2:
                return -1 === (i = n.sent()) ? [ 2 /*return*/ , void r.resolve() ] : ((o = e.Fo.get(i) || []).push(r), 
                e.Fo.set(i, o), [ 3 /*break*/ , 4 ]);

              case 3:
                return s = n.sent(), u = wi(s, "Initialization of waitForPendingWrites() operation failed"), 
                r.reject(u), [ 3 /*break*/ , 4 ];

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
 * if there are any.
 */ function Ji(t, e) {
    (t.Fo.get(e) || []).forEach((function(t) {
        t.resolve();
    })), t.Fo.delete(e)
    /** Reject all outstanding callbacks waiting for pending writes to complete. */;
}

function Zi(t, e, n) {
    var r = P(t), i = r.xo[r.currentUser.toKey()];
    // NOTE: Mutations restored from persistence won't have callbacks, so it's
    // okay for there to be no callback for this ID.
    if (i) {
        var o = i.get(e);
        o && (n ? o.reject(n) : o.resolve(), i = i.remove(e)), r.xo[r.currentUser.toKey()] = i;
    }
}

function $i(t, e, n) {
    void 0 === n && (n = null), t.sharedClientState.removeLocalQueryTarget(e);
    for (var r = 0, i = t.Vo.get(e); r < i.length; r++) {
        var o = i[r];
        t.Po.delete(o), n && t.vo.Mo(o, n);
    }
    t.Vo.delete(e), t.isPrimaryClient && t.No.Zn(e).forEach((function(e) {
        t.No.containsKey(e) || 
        // We removed the last reference for this key
        to(t, e);
    }));
}

function to(t, e) {
    t.So.delete(e.path.canonicalString());
    // It's possible that the target already got removed because the query failed. In that case,
    // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
    var n = t.Do.get(e);
    null !== n && (Xr(t.remoteStore, n), t.Do = t.Do.remove(e), t.Co.delete(n), ro(t));
}

function eo(t, e, n) {
    for (var r = 0, i = n; r < i.length; r++) {
        var o = i[r];
        o instanceof Fi ? (t.No.addReference(o.key, e), no(t, o)) : o instanceof Vi ? (D("SyncEngine", "Document no longer in limbo: " + o.key), 
        t.No.removeReference(o.key, e), t.No.containsKey(o.key) || 
        // We removed the last reference for this key
        to(t, o.key)) : L();
    }
}

function no(t, e) {
    var n = e.key, r = n.path.canonicalString();
    t.Do.get(n) || t.So.has(r) || (D("SyncEngine", "New document in limbo: " + n), t.So.add(r), 
    ro(t));
}

/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */ function ro(t) {
    for (;t.So.size > 0 && t.Do.size < t.maxConcurrentLimboResolutions; ) {
        var e = t.So.values().next().value;
        t.So.delete(e);
        var n = new ot(Q.fromString(e)), r = t.ko.next();
        t.Co.set(r, new xi(n)), t.Do = t.Do.insert(n, r), Yr(t.remoteStore, new Yn(Jt(Kt(n.path)), r, 2 /* LimboResolution */ , T.o));
    }
}

function io(t, r, i) {
    return e(this, void 0, void 0, (function() {
        var o, s, u, a;
        return n(this, (function(c) {
            switch (c.label) {
              case 0:
                return o = P(t), s = [], u = [], a = [], o.Po.isEmpty() ? [ 3 /*break*/ , 3 ] : (o.Po.forEach((function(t, e) {
                    a.push(o.Oo(e, r, i).then((function(t) {
                        if (t) {
                            o.isPrimaryClient && o.sharedClientState.updateQueryState(e.targetId, t.fromCache ? "not-current" : "current"), 
                            s.push(t);
                            var n = sr.Pn(e.targetId, t);
                            u.push(n);
                        }
                    })));
                })), [ 4 /*yield*/ , Promise.all(a) ]);

              case 1:
                return c.sent(), o.vo._r(s), [ 4 /*yield*/ , function(t, r) {
                    return e(this, void 0, void 0, (function() {
                        var e, i, o, s, u, a, c, h, l;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                e = P(t), n.label = 1;

                              case 1:
                                return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , e.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (function(t) {
                                    return Qn.forEach(r, (function(n) {
                                        return Qn.forEach(n.bn, (function(r) {
                                            return e.persistence.referenceDelegate.addReference(t, n.targetId, r);
                                        })).next((function() {
                                            return Qn.forEach(n.vn, (function(r) {
                                                return e.persistence.referenceDelegate.removeReference(t, n.targetId, r);
                                            }));
                                        }));
                                    }));
                                })) ];

                              case 2:
                                return n.sent(), [ 3 /*break*/ , 4 ];

                              case 3:
                                if (!zn(i = n.sent())) throw i;
                                // If `notifyLocalViewChanges` fails, we did not advance the sequence
                                // number for the documents that were included in this transaction.
                                // This might trigger them to be deleted earlier than they otherwise
                                // would have, but it should not invalidate the integrity of the data.
                                                                return D("LocalStore", "Failed to update sequence numbers: " + i), 
                                [ 3 /*break*/ , 4 ];

                              case 4:
                                for (o = 0, s = r; o < s.length; o++) u = s[o], a = u.targetId, u.fromCache || (c = e.Fn.get(a), 
                                h = c.snapshotVersion, l = c.withLastLimboFreeSnapshotVersion(h), 
                                // Advance the last limbo free snapshot version
                                e.Fn = e.Fn.insert(a, l));
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

function oo(t, r) {
    return e(this, void 0, void 0, (function() {
        var e, i;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return (e = P(t)).currentUser.isEqual(r) ? [ 3 /*break*/ , 3 ] : (D("SyncEngine", "User change. New user:", r.toKey()), 
                [ 4 /*yield*/ , cr(e.localStore, r) ]);

              case 1:
                return i = n.sent(), e.currentUser = r, 
                // Fails tasks waiting for pending writes requested by previous user.
                function(t, e) {
                    t.Fo.forEach((function(t) {
                        t.forEach((function(t) {
                            t.reject(new A(I.CANCELLED, "'waitForPendingWrites' promise is rejected due to a user change."));
                        }));
                    })), t.Fo.clear();
                }(e), 
                // TODO(b/114226417): Consider calling this only in the primary tab.
                e.sharedClientState.handleUserChange(r, i.removedBatchIds, i.addedBatchIds), [ 4 /*yield*/ , io(e, i.Ln) ];

              case 2:
                n.sent(), n.label = 3;

              case 3:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function so(t, e) {
    var n = P(t), r = n.Co.get(e);
    if (r && r.bo) return tn().add(r.key);
    var i = tn(), o = n.Vo.get(e);
    if (!o) return i;
    for (var s = 0, u = o; s < u.length; s++) {
        var a = u[s], c = n.Po.get(a);
        i = i.unionWith(c.view.wo);
    }
    return i;
}

function uo(t, r, i) {
    var o = P(t);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (function(t, r, i) {
        return e(this, void 0, void 0, (function() {
            var e, o, s, u, a, c;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return n.trys.push([ 0, 14, , 15 ]), [ 4 /*yield*/ , r.getMetadata() ];

                  case 1:
                    return e = n.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = P(t), r = wn(e.createTime);
                        return n.persistence.runTransaction("hasNewerBundle", "readonly", (function(t) {
                            return n.Ke.getBundleMetadata(t, e.id);
                        })).then((function(t) {
                            return !!t && t.createTime.compareTo(r) >= 0;
                        }));
                    }(t.localStore, e) ];

                  case 2:
                    return n.sent() ? [ 4 /*yield*/ , r.close() ] : [ 3 /*break*/ , 4 ];

                  case 3:
                    return [ 2 /*return*/ , (n.sent(), void i._completeWith(function(t) {
                        return {
                            taskState: "Success",
                            documentsLoaded: t.totalDocuments,
                            bytesLoaded: t.totalBytes,
                            totalDocuments: t.totalDocuments,
                            totalBytes: t.totalBytes
                        };
                    }(e))) ];

                  case 4:
                    return i._updateProgress(Pi(e)), o = new Oi(e, t.localStore, r.R), [ 4 /*yield*/ , r.Lo() ];

                  case 5:
                    s = n.sent(), n.label = 6;

                  case 6:
                    return s ? [ 4 /*yield*/ , o.oo(s) ] : [ 3 /*break*/ , 10 ];

                  case 7:
                    return (u = n.sent()) && i._updateProgress(u), [ 4 /*yield*/ , r.Lo() ];

                  case 8:
                    s = n.sent(), n.label = 9;

                  case 9:
                    return [ 3 /*break*/ , 6 ];

                  case 10:
                    return [ 4 /*yield*/ , o.complete() ];

                  case 11:
                    // TODO(b/160876443): This currently raises snapshots with
                    // `fromCache=false` if users already listen to some queries and bundles
                    // has newer version.
                    return a = n.sent(), [ 4 /*yield*/ , io(t, a.wn, 
                    /* remoteEvent */ void 0) ];

                  case 12:
                    // Save metadata, so loading the same bundle will skip.
                    // TODO(b/160876443): This currently raises snapshots with
                    // `fromCache=false` if users already listen to some queries and bundles
                    // has newer version.
                    return n.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = P(t);
                        return n.persistence.runTransaction("Save bundle", "readwrite", (function(t) {
                            return n.Ke.saveBundleMetadata(t, e);
                        }));
                    }(t.localStore, e) ];

                  case 13:
                    // TODO(b/160876443): This currently raises snapshots with
                    // `fromCache=false` if users already listen to some queries and bundles
                    // has newer version.
                    // Save metadata, so loading the same bundle will skip.
                    return n.sent(), i._completeWith(a.progress), [ 3 /*break*/ , 15 ];

                  case 14:
                    return R("SyncEngine", "Loading bundle failed with " + (c = n.sent())), i._failWith(c), 
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
 */)(o, r, i).then((function() {
        o.sharedClientState.notifyBundleLoaded();
    }));
}

var ao = /** @class */ function() {
    function t() {
        this.synchronizeTabs = !1;
    }
    return t.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.R = xr(t.databaseInfo.databaseId), this.sharedClientState = this.Bo(t), 
                    this.persistence = this.qo(t), [ 4 /*yield*/ , this.persistence.start() ];

                  case 1:
                    return e.sent(), this.gcScheduler = this.Uo(t), this.localStore = this.Ko(t), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Uo = function(t) {
        return null;
    }, t.prototype.Ko = function(t) {
        return function(
        /** Manages our in-memory or durable persistence. */
        t, e, n, r) {
            return new ar(t, e, n, r);
        }(this.persistence, new ur, t.initialUser, this.R);
    }, t.prototype.qo = function(t) {
        return new Sr(kr.bs, this.R);
    }, t.prototype.Bo = function(t) {
        return new Lr;
    }, t.prototype.terminate = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
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
}(), co = /** @class */ function() {
    function t() {}
    return t.prototype.initialize = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.localStore ? [ 3 /*break*/ , 2 ] : (this.localStore = t.localStore, 
                    this.sharedClientState = t.sharedClientState, this.datastore = this.createDatastore(r), 
                    this.remoteStore = this.createRemoteStore(r), this.eventManager = this.createEventManager(r), 
                    this.syncEngine = this.createSyncEngine(r, 
                    /* startAsPrimary=*/ !t.synchronizeTabs), this.sharedClientState.onlineStateHandler = function(t) {
                        return zi(e.syncEngine, t, 1 /* SharedClientState */);
                    }, this.remoteStore.remoteSyncer.handleCredentialChange = oo.bind(null, this.syncEngine), 
                    [ 4 /*yield*/ , yi(this.remoteStore, this.syncEngine.isPrimaryClient) ]);

                  case 1:
                    n.sent(), n.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.createEventManager = function(t) {
        return new Ii;
    }, t.prototype.createDatastore = function(t) {
        var e, n = xr(t.databaseInfo.databaseId), r = (e = t.databaseInfo, new Mr(e));
        /** Return the Platform-specific connectivity monitor. */ return function(t, e, n) {
            return new Kr(t, e, n);
        }(t.credentials, r, n);
    }, t.prototype.createRemoteStore = function(t) {
        var e, n, r, i, o, s = this;
        return e = this.localStore, n = this.datastore, r = t.asyncQueue, i = function(t) {
            return zi(s.syncEngine, t, 0 /* RemoteStore */);
        }, o = Pr.yt() ? new Pr : new Or, new zr(e, n, r, i, o);
    }, t.prototype.createSyncEngine = function(t, e) {
        return function(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        r, i, o, s) {
            var u = new qi(t, e, n, r, i, o);
            return s && (u.$o = !0), u;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e);
    }, t.prototype.terminate = function() {
        return function(t) {
            return e(this, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = P(t), D("RemoteStore", "RemoteStore shutting down."), e.Or.add(5 /* Shutdown */), 
                        [ 4 /*yield*/ , Hr(e) ];

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
 * Initializes and wires the components that are needed to interface with the
 * network.
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
function ho(t, r) {
    void 0 === r && (r = 10240);
    var i = 0;
    return {
        read: function() {
            return e(this, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    return i < t.byteLength ? (e = {
                        value: t.slice(i, i + r),
                        done: !1
                    }, [ 2 /*return*/ , (i += r, e) ]) : [ 2 /*return*/ , {
                        done: !0
                    } ];
                }));
            }));
        },
        cancel: function() {
            return e(this, void 0, void 0, (function() {
                return n(this, (function(t) {
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
 */ var lo = /** @class */ function() {
    function t(t) {
        this.observer = t, 
        /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
        this.muted = !1;
    }
    return t.prototype.next = function(t) {
        this.observer.next && this.jo(this.observer.next, t);
    }, t.prototype.error = function(t) {
        this.observer.error ? this.jo(this.observer.error, t) : console.error("Uncaught Error in snapshot listener:", t);
    }, t.prototype.Wo = function() {
        this.muted = !0;
    }, t.prototype.jo = function(t, e) {
        var n = this;
        this.muted || setTimeout((function() {
            n.muted || t(e);
        }), 0);
    }, t;
}(), fo = /** @class */ function() {
    function t(
    /** The reader to read from underlying binary bundle data source. */
    t, e) {
        var n = this;
        this.Go = t, this.R = e, 
        /** Cached bundle metadata. */
        this.metadata = new Kn, 
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
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                return [ 2 /*return*/ , this.metadata.promise ];
            }));
        }));
    }, t.prototype.Lo = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
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
        return e(this, void 0, void 0, (function() {
            var t, e, r, i;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Jo() ];

                  case 1:
                    return null === (t = n.sent()) ? [ 2 /*return*/ , null ] : (e = this.zo.decode(t), 
                    r = Number(e), isNaN(r) && this.Yo("length string (" + e + ") is not valid number"), 
                    [ 4 /*yield*/ , this.Xo(r) ]);

                  case 2:
                    return i = n.sent(), [ 2 /*return*/ , new Ci(JSON.parse(i), t.length + r) ];
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
        return e(this, void 0, void 0, (function() {
            var t, e;
            return n(this, (function(n) {
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
        return e(this, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
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
        return e(this, void 0, void 0, (function() {
            var t, e;
            return n(this, (function(n) {
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
}(), po = /** @class */ function() {
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
        return e(this, void 0, void 0, (function() {
            var r, i = this;
            return n(this, (function(o) {
                switch (o.label) {
                  case 0:
                    if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new A(I.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
                    return [ 4 /*yield*/ , function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i, o, s, u, a;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = P(t), i = An(e.R) + "/documents", o = {
                                        documents: r.map((function(t) {
                                            return En(e.R, t);
                                        }))
                                    }, [ 4 /*yield*/ , e.$i("BatchGetDocuments", i, o) ];

                                  case 1:
                                    return s = n.sent(), u = new Map, s.forEach((function(t) {
                                        var n = function(t, e) {
                                            return "found" in e ? function(t, e) {
                                                O(!!e.found), e.found.name, e.found.updateTime;
                                                var n = Tn(t, e.found.name), r = wn(e.found.updateTime), i = new bt({
                                                    mapValue: {
                                                        fields: e.found.fields
                                                    }
                                                });
                                                return Et.newFoundDocument(n, r, i);
                                            }(t, e) : "missing" in e ? function(t, e) {
                                                O(!!e.missing), O(!!e.readTime);
                                                var n = Tn(t, e.missing), r = wn(e.readTime);
                                                return Et.newNoDocument(n, r);
                                            }(t, e) : L();
                                        }(e.R, t);
                                        u.set(n.key.toString(), n);
                                    })), a = [], [ 2 /*return*/ , (r.forEach((function(t) {
                                        var e = u.get(t.toString());
                                        O(!!e), a.push(e);
                                    })), a) ];
                                }
                            }));
                        }));
                    }(this.datastore, t) ];

                  case 1:
                    return [ 2 /*return*/ , ((r = o.sent()).forEach((function(t) {
                        return i.recordVersion(t);
                    })), r) ];
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
        this.write(new Me(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }, t.prototype.commit = function() {
        return e(this, void 0, void 0, (function() {
            var t, r = this;
            return n(this, (function(i) {
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
                    t.forEach((function(t, e) {
                        var n = ot.fromPath(e);
                        r.mutations.push(new Ue(n, r.precondition(n)));
                    })), [ 4 /*yield*/ , function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i, o;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = P(t), i = An(e.R) + "/documents", o = {
                                        writes: r.map((function(t) {
                                            return Dn(e.R, t);
                                        }))
                                    }, [ 4 /*yield*/ , e.Ni("Commit", i, o) ];

                                  case 1:
                                    return n.sent(), [ 2 /*return*/ ];
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
            if (!t.isNoDocument()) throw L();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
                        e = q.min();
        }
        var n = this.readVersions.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new A(I.ABORTED, "Document version changed between two reads.");
        } else this.readVersions.set(t.key.toString(), e);
    }, 
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t.prototype.precondition = function(t) {
        var e = this.readVersions.get(t.toString());
        return !this.writtenDocs.has(t.toString()) && e ? Ee.updateTime(e) : Ee.none();
    }, 
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    t.prototype.preconditionForUpdate = function(t) {
        var e = this.readVersions.get(t.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.writtenDocs.has(t.toString()) && e) {
            if (e.isEqual(q.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new A(I.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return Ee.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
                return Ee.exists(!0);
    }, t.prototype.write = function(t) {
        this.ensureCommitNotCalled(), this.mutations.push(t);
    }, t.prototype.ensureCommitNotCalled = function() {}, t;
}(), yo = /** @class */ function() {
    function t(t, e, n, r) {
        this.asyncQueue = t, this.datastore = e, this.updateFunction = n, this.deferred = r, 
        this.ec = 5, this.Zi = new qr(this.asyncQueue, "transaction_retry" /* TransactionRetry */)
        /** Runs the transaction and sets the result on deferred. */;
    }
    return t.prototype.run = function() {
        this.ec -= 1, this.nc();
    }, t.prototype.nc = function() {
        var t = this;
        this.Zi.ji((function() {
            return e(t, void 0, void 0, (function() {
                var t, e, r = this;
                return n(this, (function(n) {
                    return t = new po(this.datastore), (e = this.sc(t)) && e.then((function(e) {
                        r.asyncQueue.enqueueAndForget((function() {
                            return t.commit().then((function() {
                                r.deferred.resolve(e);
                            })).catch((function(t) {
                                r.ic(t);
                            }));
                        }));
                    })).catch((function(t) {
                        r.ic(t);
                    })), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, t.prototype.sc = function(t) {
        try {
            var e = this.updateFunction(t);
            return !rt(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), 
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
            return "aborted" === e || "failed-precondition" === e || !qe(e);
        }
        return !1;
    }, t;
}(), vo = /** @class */ function() {
    function t(t, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    r, i) {
        var o = this;
        this.credentials = t, this.asyncQueue = r, this.databaseInfo = i, this.user = Rr.UNAUTHENTICATED, 
        this.clientId = V.u(), this.credentialListener = function() {
            return Promise.resolve();
        }, this.credentials.setChangeListener(r, (function(t) {
            return e(o, void 0, void 0, (function() {
                return n(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return D("FirestoreClient", "Received user=", t.uid), [ 4 /*yield*/ , this.credentialListener(t) ];

                      case 1:
                        return e.sent(), this.user = t, [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }
    return t.prototype.getConfiguration = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
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
        if (this.asyncQueue.isShuttingDown) throw new A(I.FAILED_PRECONDITION, "The client has already been terminated.");
    }, t.prototype.terminate = function() {
        var t = this;
        this.asyncQueue.enterRestrictedMode();
        var r = new Kn;
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((function() {
            return e(t, void 0, void 0, (function() {
                var t, e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return n.trys.push([ 0, 5, , 6 ]), this.onlineComponents ? [ 4 /*yield*/ , this.onlineComponents.terminate() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        n.sent(), n.label = 2;

                      case 2:
                        return this.offlineComponents ? [ 4 /*yield*/ , this.offlineComponents.terminate() ] : [ 3 /*break*/ , 4 ];

                      case 3:
                        n.sent(), n.label = 4;

                      case 4:
                        // `removeChangeListener` must be called after shutting down the
                        // RemoteStore as it will prevent the RemoteStore from retrieving
                        // auth tokens.
                        return this.credentials.removeChangeListener(), r.resolve(), [ 3 /*break*/ , 6 ];

                      case 5:
                        return t = n.sent(), e = wi(t, "Failed to shutdown persistence"), r.reject(e), [ 3 /*break*/ , 6 ];

                      case 6:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })), r.promise;
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
 */ function mo(t, r) {
    return e(this, void 0, void 0, (function() {
        var i, o, s = this;
        return n(this, (function(u) {
            switch (u.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), D("FirestoreClient", "Initializing OfflineComponentProvider"), 
                [ 4 /*yield*/ , t.getConfiguration() ];

              case 1:
                return i = u.sent(), [ 4 /*yield*/ , r.initialize(i) ];

              case 2:
                return u.sent(), o = i.initialUser, t.setCredentialChangeListener((function(t) {
                    return e(s, void 0, void 0, (function() {
                        return n(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return o.isEqual(t) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , cr(r.localStore, t) ];

                              case 1:
                                e.sent(), o = t, e.label = 2;

                              case 2:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), 
                // When a user calls clearPersistence() in one client, all other clients
                // need to be terminated to allow the delete to succeed.
                r.persistence.setDatabaseDeletedListener((function() {
                    return t.terminate();
                })), t.offlineComponents = r, [ 2 /*return*/ ];
            }
        }));
    }));
}

function go(t, r) {
    return e(this, void 0, void 0, (function() {
        var i, o;
        return n(this, (function(s) {
            switch (s.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), [ 4 /*yield*/ , wo(t) ];

              case 1:
                return i = s.sent(), D("FirestoreClient", "Initializing OnlineComponentProvider"), 
                [ 4 /*yield*/ , t.getConfiguration() ];

              case 2:
                return o = s.sent(), [ 4 /*yield*/ , r.initialize(i, o) ];

              case 3:
                return s.sent(), 
                // The CredentialChangeListener of the online component provider takes
                // precedence over the offline component provider.
                t.setCredentialChangeListener((function(t) {
                    return function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return (e = P(t)).asyncQueue.verifyOperationInProgress(), D("RemoteStore", "RemoteStore received new credentials"), 
                                    i = ei(e), 
                                    // Tear down and re-create our network streams. This will ensure we get a
                                    // fresh auth token for the new user and re-fill the write pipeline with
                                    // new mutations from the LocalStore (since mutations are per-user).
                                    e.Or.add(3 /* CredentialChange */), [ 4 /*yield*/ , Hr(e) ];

                                  case 1:
                                    return n.sent(), i && 
                                    // Don't set the network status to Unknown if we are offline.
                                    e.Br.set("Unknown" /* Unknown */), [ 4 /*yield*/ , e.remoteSyncer.handleCredentialChange(r) ];

                                  case 2:
                                    return n.sent(), e.Or.delete(3 /* CredentialChange */), [ 4 /*yield*/ , Wr(e) ];

                                  case 3:
                                    // Tear down and re-create our network streams. This will ensure we get a
                                    // fresh auth token for the new user and re-fill the write pipeline with
                                    // new mutations from the LocalStore (since mutations are per-user).
                                    return n.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    }(r.remoteStore, t);
                })), t.onlineComponents = r, [ 2 /*return*/ ];
            }
        }));
    }));
}

function wo(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            switch (e.label) {
              case 0:
                return t.offlineComponents ? [ 3 /*break*/ , 2 ] : (D("FirestoreClient", "Using default OfflineComponentProvider"), 
                [ 4 /*yield*/ , mo(t, new ao) ]);

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 /*return*/ , t.offlineComponents ];
            }
        }));
    }));
}

function bo(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            switch (e.label) {
              case 0:
                return t.onlineComponents ? [ 3 /*break*/ , 2 ] : (D("FirestoreClient", "Using default OnlineComponentProvider"), 
                [ 4 /*yield*/ , go(t, new co) ]);

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 /*return*/ , t.onlineComponents ];
            }
        }));
    }));
}

function _o(t) {
    return wo(t).then((function(t) {
        return t.persistence;
    }));
}

function Eo(t) {
    return wo(t).then((function(t) {
        return t.localStore;
    }));
}

function To(t) {
    return bo(t).then((function(t) {
        return t.remoteStore;
    }));
}

function Io(t) {
    return bo(t).then((function(t) {
        return t.syncEngine;
    }));
}

function Ao(t) {
    return e(this, void 0, void 0, (function() {
        var e, r;
        return n(this, (function(n) {
            switch (n.label) {
              case 0:
                return [ 4 /*yield*/ , bo(t) ];

              case 1:
                return e = n.sent(), [ 2 /*return*/ , ((r = e.eventManager).onListen = Bi.bind(null, e.syncEngine), 
                r.onUnlisten = Gi.bind(null, e.syncEngine), r) ];
            }
        }));
    }));
}

/** Enables the network connection and re-enqueues all pending operations. */ function No(t, r, i) {
    var o = this;
    void 0 === i && (i = {});
    var s = new Kn;
    return t.asyncQueue.enqueueAndForget((function() {
        return e(o, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = function(t, e, n, r, i) {
                        var o = new lo({
                            next: function(o) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return Ni(t, s);
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
                                i.reject(new A(I.UNAVAILABLE, "Failed to get document because the client is offline.")) : u && o.fromCache && r && "server" === r.source ? i.reject(new A(I.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(o);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), s = new Ri(Kt(n.path), o, {
                            includeMetadataChanges: !0,
                            so: !0
                        });
                        return Ai(t, s);
                    }, [ 4 /*yield*/ , Ao(t) ];

                  case 1:
                    return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), t.asyncQueue, r, i, s ]) ];
                }
            }));
        }));
    })), s.promise;
}

function So(t, r, i) {
    var o = this;
    void 0 === i && (i = {});
    var s = new Kn;
    return t.asyncQueue.enqueueAndForget((function() {
        return e(o, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = function(t, e, n, r, i) {
                        var o = new lo({
                            next: function(n) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return Ni(t, s);
                                })), n.fromCache && "server" === r.source ? i.reject(new A(I.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), s = new Ri(n, o, {
                            includeMetadataChanges: !0,
                            so: !0
                        });
                        return Ai(t, s);
                    }, [ 4 /*yield*/ , Ao(t) ];

                  case 1:
                    return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), t.asyncQueue, r, i, s ]) ];
                }
            }));
        }));
    })), s.promise;
}

var Do = 
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
}, ko = /** @class */ function() {
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
}(), Ro = new Map, Co = function(t, e) {
    this.user = e, this.type = "OAuth", this.authHeaders = {}, 
    // Set the headers using Object Literal notation to avoid minification
    this.authHeaders.Authorization = "Bearer " + t;
}, Lo = /** @class */ function() {
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
            return e(Rr.UNAUTHENTICATED);
        }));
    }, t.prototype.removeChangeListener = function() {
        this.changeListener = null;
    }, t;
}(), Oo = /** @class */ function() {
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
}(), Po = /** @class */ function() {
    function t(t) {
        var e = this;
        /** Tracks the current User. */        this.currentUser = Rr.UNAUTHENTICATED, 
        /** Promise that allows blocking on the initialization of Firebase Auth. */
        this.oc = new Kn, 
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
            D("FirebaseCredentialsProvider", "Auth detected"), e.auth = t, e.auth.addAuthTokenListener(e.uc);
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
                D("FirebaseCredentialsProvider", "Auth not yet detected"), e.oc.resolve());
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
            return t.cc !== e ? (D("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            t.getToken()) : n ? (O("string" == typeof n.accessToken), new Co(n.accessToken, t.currentUser)) : null;
        })) : Promise.resolve(null);
    }, t.prototype.invalidateToken = function() {
        this.forceRefresh = !0;
    }, t.prototype.setChangeListener = function(t, r) {
        var i = this;
        this.asyncQueue = t, 
        // Blocks the AsyncQueue until the next user is available.
        this.asyncQueue.enqueueRetryable((function() {
            return e(i, void 0, void 0, (function() {
                return n(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return [ 4 /*yield*/ , this.oc.promise ];

                      case 1:
                        return t.sent(), [ 4 /*yield*/ , r(this.currentUser) ];

                      case 2:
                        return t.sent(), this.changeListener = r, [ 2 /*return*/ ];
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
        return O(null === t || "string" == typeof t), new Rr(t);
    }, t;
}(), Fo = /** @class */ function() {
    function t(t, e, n) {
        this.hc = t, this.lc = e, this.fc = n, this.type = "FirstParty", this.user = Rr.FIRST_PARTY;
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
}(), Vo = /** @class */ function() {
    function t(t, e, n) {
        this.hc = t, this.lc = e, this.fc = n;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(new Fo(this.hc, this.lc, this.fc));
    }, t.prototype.setChangeListener = function(t, e) {
        // Fire with initial uid.
        t.enqueueRetryable((function() {
            return e(Rr.FIRST_PARTY);
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
function Mo(t, e, n) {
    if (!n) throw new A(I.INVALID_ARGUMENT, "Function " + t + "() cannot be called with an empty " + e + ".");
}

function Uo(t, e) {
    if (void 0 === e) return {
        merge: !1
    };
    if (void 0 !== e.mergeFields && void 0 !== e.merge) throw new A(I.INVALID_ARGUMENT, "Invalid options passed to function " + t + '(): You cannot specify both "merge" and "mergeFields".');
    return e;
}

/**
 * Validates that two boolean options are not set at the same time.
 */ function xo(t, e, n, r) {
    if (!0 === e && !0 === r) throw new A(I.INVALID_ARGUMENT, t + " and " + n + " cannot be used together.");
}

/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */ function qo(t) {
    if (!ot.isDocumentKey(t)) throw new A(I.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + t + " has " + t.length + ".");
}

/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */ function Bo(t) {
    if (ot.isDocumentKey(t)) throw new A(I.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + t + " has " + t.length + ".");
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
/** Returns a string describing the type / value of the provided input. */ function jo(t) {
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
    return "function" == typeof t ? "a function" : L();
}

function Go(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    if ("_delegate" in t && (
    // Unwrap Compat types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t = t._delegate), !(t instanceof e)) {
        if (e.name === t.constructor.name) throw new A(I.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        var n = jo(t);
        throw new A(I.INVALID_ARGUMENT, "Expected type '" + e.name + "', but it was: " + n);
    }
    return t;
}

function Ko(t, e) {
    if (e <= 0) throw new A(I.INVALID_ARGUMENT, "Function " + t + "() requires a positive number, but it was: " + e + ".");
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
 */ var Qo = /** @class */ function() {
    function t(t) {
        var e;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new A(I.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
        void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
            if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new A(I.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
        this.useFetchStreams = !!t.useFetchStreams, xo("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
    }
    return t.prototype.isEqual = function(t) {
        return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
    }, t;
}(), zo = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new Qo({}), 
        this._settingsFrozen = !1, t instanceof ko ? (this._databaseId = t, this._credentials = new Lo) : (this._app = t, 
        this._databaseId = function(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new A(I.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
            return new ko(t.options.projectId);
        }(t), this._credentials = new Po(e));
    }
    return Object.defineProperty(t.prototype, "app", {
        /**
         * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
         * instance.
         */
        get: function() {
            if (!this._app) throw new A(I.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
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
        if (this._settingsFrozen) throw new A(I.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new Qo(t), void 0 !== t.credentials && (this._credentials = function(t) {
            if (!t) return new Lo;
            switch (t.type) {
              case "gapi":
                var e = t.client;
                // Make sure this really is a Gapi client.
                                return O(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new Vo(e, t.sessionIndex || "0", t.iamToken || null);

              case "provider":
                return t.client;

              default:
                throw new A(I.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
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
        return t = this, (e = Ro.get(t)) && (D("ComponentProvider", "Removing Datastore"), 
        Ro.delete(t), e.terminate()), Promise.resolve();
        var t, e;
    }, t;
}(), Wo = /** @class */ function() {
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
            return new Yo(this.firestore, this.converter, this._key.path.popLast());
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.withConverter = function(e) {
        return new t(this.firestore, e, this._key);
    }, t;
}(), Ho = /** @class */ function() {
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
}(), Yo = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, Kt(r)) || this)._path = r, 
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
            return t.isEmpty() ? null : new Wo(this.firestore, 
            /* converter= */ null, new ot(t));
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.withConverter = function(t) {
        return new n(this.firestore, t, this._path);
    }, n;
}(Ho);

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
 */ function Xo(t, e) {
    for (var n, i = [], o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
    if (t = h(t), Mo("collection", "path", e), t instanceof zo) return Bo(n = Q.fromString.apply(Q, r([ e ], i))), 
    new Yo(t, /* converter= */ null, n);
    if (!(t instanceof Wo || t instanceof Yo)) throw new A(I.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    return Bo(n = Q.fromString.apply(Q, r([ t.path ], i)).child(Q.fromString(e))), new Yo(t.firestore, 
    /* converter= */ null, n);
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
 */ function Jo(t, e) {
    for (var n, i = [], o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
    if (t = h(t), 
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    1 === arguments.length && (e = V.u()), Mo("doc", "path", e), t instanceof zo) return qo(n = Q.fromString.apply(Q, r([ e ], i))), 
    new Wo(t, 
    /* converter= */ null, new ot(n));
    if (!(t instanceof Wo || t instanceof Yo)) throw new A(I.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    return qo(n = t._path.child(Q.fromString.apply(Q, r([ e ], i)))), new Wo(t.firestore, t instanceof Yo ? t.converter : null, new ot(n));
}

/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function Zo(t, e) {
    return t = h(t), e = h(e), (t instanceof Wo || t instanceof Yo) && (e instanceof Wo || e instanceof Yo) && t.firestore === e.firestore && t.path === e.path && t.converter === e.converter
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

function $o(t, e) {
    return t = h(t), e = h(e), t instanceof Ho && e instanceof Ho && t.firestore === e.firestore && $t(t._query, e._query) && t.converter === e.converter
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

var ts = /** @class */ function() {
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
        this.yc = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.gc = !1, 
        // Enabled during shutdown on Safari to prevent future access to IndexedDB.
        this.Ec = !1, 
        // List of TimerIds to fast-forward delays for.
        this.Tc = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.Zi = new qr(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.Ic = function() {
            var e = Ur();
            e && D("AsyncQueue", "Visibility state changed to " + e.visibilityState), t.Zi.Gi();
        };
        var e = Ur();
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
            var e = Ur();
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
                var n = new Kn;
        return this.Rc((function() {
            return e._c && e.Ec ? Promise.resolve() : (t().then(n.resolve, n.reject), n.promise);
        })).then((function() {
            return n.promise;
        }));
    }, t.prototype.enqueueRetryable = function(t) {
        var e = this;
        this.enqueueAndForget((function() {
            return e.wc.push(t), e.bc();
        }));
    }, 
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    t.prototype.bc = function() {
        return e(this, void 0, void 0, (function() {
            var t, e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    if (0 === this.wc.length) return [ 3 /*break*/ , 5 ];
                    n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , this.wc[0]() ];

                  case 2:
                    return n.sent(), this.wc.shift(), this.Zi.reset(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (!zn(t = n.sent())) throw t;
                    // Failure will be handled by AsyncQueue
                                        return D("AsyncQueue", "Operation failed with retryable error: " + t), 
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
                    this.Zi.ji((function() {
                        return e.bc();
                    })), n.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Rc = function(t) {
        var e = this, n = this.dc.then((function() {
            return e.gc = !0, t().catch((function(t) {
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw e.yc = t, e.gc = !1, k("INTERNAL UNHANDLED ERROR: ", 
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
                return e.gc = !1, t;
            }));
        }));
        return this.dc = n, n;
    }, t.prototype.enqueueAfterDelay = function(t, e, n) {
        var r = this;
        this.Ac(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.Tc.indexOf(t) > -1 && (e = 0);
        var i = gi.createAndSchedule(this, t, e, n, (function(t) {
            return r.vc(t);
        }));
        return this.mc.push(i), i;
    }, t.prototype.Ac = function() {
        this.yc && L();
    }, t.prototype.verifyOperationInProgress = function() {}, 
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t.prototype.Pc = function() {
        return e(this, void 0, void 0, (function() {
            var t;
            return n(this, (function(e) {
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
                return this.Pc().then((function() {
            // Run ops in the same order they'd run if they ran naturally.
            e.mc.sort((function(t, e) {
                return t.targetTimeMs - e.targetTimeMs;
            }));
            for (var n = 0, r = e.mc; n < r.length; n++) {
                var i = r[n];
                if (i.skipDelay(), "all" /* All */ !== t && i.timerId === t) break;
            }
            return e.Pc();
        }));
    }, 
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    t.prototype.Dc = function(t) {
        this.Tc.push(t);
    }, 
    /** Called once a DelayedOperation is run or canceled. */ t.prototype.vc = function(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var e = this.mc.indexOf(t);
        this.mc.splice(e, 1);
    }, t;
}();

function es(t) {
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

var ns = /** @class */ function() {
    function t() {
        this._progressObserver = {}, this._taskCompletionResolver = new Kn, this._lastProgress = {
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
}(), rs = -1, is = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, n) || this).type = "firestore", r._queue = new ts, r._persistenceKey = "name" in t ? t.name : "[DEFAULT]", 
        r;
    }
    return t(n, e), n.prototype._terminate = function() {
        return this._firestoreClient || 
        // The client must be initialized to ensure that all subsequent API
        // usage throws an exception.
        ss(this), this._firestoreClient.terminate();
    }, n;
}(zo);

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
 * @internal
 */
function os(t) {
    return t._firestoreClient || ss(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
}

function ss(t) {
    var e, n = t._freezeSettings(), r = function(t, e, n, r) {
        return new Do(t, e, n, r.host, r.ssl, r.experimentalForceLongPolling, r.experimentalAutoDetectLongPolling, r.useFetchStreams);
    }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, n);
    t._firestoreClient = new vo(t._credentials, t._queue, r);
}

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
 */
var us = /** @class */ function() {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function t() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var n = 0; n < t.length; ++n) if (0 === t[n].length) throw new A(I.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new W(t);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */    return t.prototype.isEqual = function(t) {
        return this._internalPath.isEqual(t._internalPath);
    }, t;
}(), as = /** @class */ function() {
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
            return new t(Y.fromBase64String(e));
        } catch (e) {
            throw new A(I.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e);
        }
    }, 
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    t.fromUint8Array = function(e) {
        return new t(Y.fromUint8Array(e));
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
}(), cs = 
/**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
function(t) {
    this._methodName = t;
}, hs = /** @class */ function() {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    function t(t, e) {
        if (!isFinite(t) || t < -90 || t > 90) throw new A(I.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new A(I.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
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
        return M(this._lat, t._lat) || M(this._long, t._long);
    }, t;
}(), ls = /^__.*__$/, fs = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return null !== this.fieldMask ? new Ce(t, this.data, this.fieldMask, e, this.fieldTransforms) : new Re(t, this.data, e, this.fieldTransforms);
    }, t;
}(), ds = /** @class */ function() {
    function t(t, 
    // The fieldMask does not include document transforms.
    e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return new Ce(t, this.data, this.fieldMask, e, this.fieldTransforms);
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
 * An immutable object representing an array of bytes.
 */ function ps(t) {
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
        throw L();
    }
}

/** A "context" object passed around while parsing user data. */ var ys = /** @class */ function() {
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
    }, t.prototype.Fc = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.xc({
            path: n,
            kc: !1
        });
        return r.$c(t), r;
    }, t.prototype.Oc = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.xc({
            path: n,
            kc: !1
        });
        return r.Cc(), r;
    }, t.prototype.Mc = function(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.xc({
            path: void 0,
            kc: !0
        });
    }, t.prototype.Lc = function(t) {
        return Fs(t, this.settings.methodName, this.settings.Bc || !1, this.path, this.settings.qc);
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
        if (this.path) for (var t = 0; t < this.path.length; t++) this.$c(this.path.get(t));
    }, t.prototype.$c = function(t) {
        if (0 === t.length) throw this.Lc("Document fields must not be empty");
        if (ps(this.Nc) && ls.test(t)) throw this.Lc('Document fields cannot begin and end with "__"');
    }, t;
}(), vs = /** @class */ function() {
    function t(t, e, n) {
        this.databaseId = t, this.ignoreUndefinedProperties = e, this.R = n || xr(t)
        /** Creates a new top-level parse context. */;
    }
    return t.prototype.Uc = function(t, e, n, r) {
        return void 0 === r && (r = !1), new ys({
            Nc: t,
            methodName: e,
            qc: n,
            path: W.emptyPath(),
            kc: !1,
            Bc: r
        }, this.databaseId, this.R, this.ignoreUndefinedProperties);
    }, t;
}();

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ function ms(t) {
    var e = t._freezeSettings(), n = xr(t._databaseId);
    return new vs(t._databaseId, !!e.ignoreUndefinedProperties, n);
}

/** Parse document data from a set() call. */ function gs(t, e, n, r, i, o) {
    void 0 === o && (o = {});
    var s = t.Uc(o.merge || o.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
    Cs("Data must be an object, but it was:", s, r);
    var u, a, c = ks(r, s);
    if (o.merge) u = new H(s.fieldMask), a = s.fieldTransforms; else if (o.mergeFields) {
        for (var h = [], l = 0, f = o.mergeFields; l < f.length; l++) {
            var d = Ls(e, f[l], n);
            if (!s.contains(d)) throw new A(I.INVALID_ARGUMENT, "Field '" + d + "' is specified in your field mask but missing from your input data.");
            Vs(h, d) || h.push(d);
        }
        u = new H(h), a = s.fieldTransforms.filter((function(t) {
            return u.covers(t.field);
        }));
    } else u = null, a = s.fieldTransforms;
    return new fs(new bt(c), u, a);
}

var ws = /** @class */ function(e) {
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
}(cs);

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
 */ function bs(t, e, n) {
    return new ys({
        Nc: 3 /* Argument */ ,
        qc: e.settings.qc,
        methodName: t._methodName,
        kc: n
    }, e.databaseId, e.R, e.ignoreUndefinedProperties);
}

var _s = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        return new be(t.path, new fe);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(cs), Es = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Kc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = bs(this, t, 
        /*array=*/ !0), n = this.Kc.map((function(t) {
            return Ds(t, e);
        })), r = new de(n);
        return new be(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(cs), Ts = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Kc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = bs(this, t, 
        /*array=*/ !0), n = this.Kc.map((function(t) {
            return Ds(t, e);
        })), r = new ye(n);
        return new be(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(cs), Is = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Qc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = new me(t.R, ue(t.R, this.Qc));
        return new be(t.path, e);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(cs);

/** Parse update data from an update() call. */ function As(t, e, n, r) {
    var i = t.Uc(1 /* Update */ , e, n);
    Cs("Data must be an object, but it was:", i, r);
    var o = [], s = bt.empty();
    j(r, (function(t, r) {
        var u = Ps(e, t, n);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                r = h(r);
        var a = i.Oc(u);
        if (r instanceof ws) 
        // Add it to the field mask, but don't add anything to updateData.
        o.push(u); else {
            var c = Ds(r, a);
            null != c && (o.push(u), s.set(u, c));
        }
    }));
    var u = new H(o);
    return new ds(s, u, i.fieldTransforms);
}

/** Parse update data from a list of field/value arguments. */ function Ns(t, e, n, r, i, o) {
    var s = t.Uc(1 /* Update */ , e, n), u = [ Ls(e, r, n) ], a = [ i ];
    if (o.length % 2 != 0) throw new A(I.INVALID_ARGUMENT, "Function " + e + "() needs to be called with an even number of arguments that alternate between field names and values.");
    for (var c = 0; c < o.length; c += 2) u.push(Ls(e, o[c])), a.push(o[c + 1]);
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (var l = [], f = bt.empty(), d = u.length - 1; d >= 0; --d) if (!Vs(l, u[d])) {
        var p = u[d], y = a[d];
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        y = h(y);
        var v = s.Oc(p);
        if (y instanceof ws) 
        // Add it to the field mask, but don't add anything to updateData.
        l.push(p); else {
            var m = Ds(y, v);
            null != m && (l.push(p), f.set(p, m));
        }
    }
    var g = new H(l);
    return new ds(f, g, s.fieldTransforms);
}

/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */ function Ss(t, e, n, r) {
    return void 0 === r && (r = !1), Ds(n, t.Uc(r ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
}

/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */ function Ds(t, e) {
    if (Rs(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    t = h(t))) return Cs("Unsupported field value:", e, t), ks(t, e);
    if (t instanceof cs) 
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
        if (!ps(e.Nc)) throw e.Lc(t._methodName + "() can only be used with update() and set()");
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
        if (e.settings.kc && 4 /* ArrayArgument */ !== e.Nc) throw e.Lc("Nested arrays are not supported");
        return function(t, e) {
            for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
                var s = Ds(o[i], e.Mc(r));
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
        if (null === (t = h(t))) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return ue(e.R, t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            var n = x.fromDate(t);
            return {
                timestampValue: vn(e.R, n)
            };
        }
        if (t instanceof x) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            n = new x(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: vn(e.R, n)
            };
        }
        if (t instanceof hs) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof as) return {
            bytesValue: mn(e.R, t._byteString)
        };
        if (t instanceof Wo) {
            n = e.databaseId;
            var r = t.firestore._databaseId;
            if (!r.isEqual(n)) throw e.Lc("Document reference is for database " + r.projectId + "/" + r.database + " but should be for database " + n.projectId + "/" + n.database);
            return {
                referenceValue: bn(t.firestore._databaseId || e.databaseId, t._key.path)
            };
        }
        throw e.Lc("Unsupported field value: " + jo(t));
    }(t, e);
}

function ks(t, e) {
    var n = {};
    return G(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path) : j(t, (function(t, r) {
        var i = Ds(r, e.Fc(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function Rs(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof x || t instanceof hs || t instanceof as || t instanceof Wo || t instanceof cs);
}

function Cs(t, e, n) {
    if (!Rs(n) || !function(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }(n)) {
        var r = jo(n);
        throw "an object" === r ? e.Lc(t + " a custom object") : e.Lc(t + " " + r);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function Ls(t, e, n) {
    if (
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    (e = h(e)) instanceof us) return e._internalPath;
    if ("string" == typeof e) return Ps(t, e);
    throw Fs("Field path arguments must be of type string or FieldPath.", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
}

/**
 * Matches any characters in a field path string that are reserved.
 */ var Os = new RegExp("[~\\*/\\[\\]]");

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */ function Ps(t, e, n) {
    if (e.search(Os) >= 0) throw Fs("Invalid field path (" + e + "). Paths must not contain '~', '*', '/', '[', or ']'", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
    try {
        return (new (us.bind.apply(us, r([ void 0 ], e.split(".")))))._internalPath;
    } catch (r) {
        throw Fs("Invalid field path (" + e + "). Paths must not be empty, begin with '.', end with '.', or contain '..'", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
    }
}

function Fs(t, e, n, r, i) {
    var o = r && !r.isEmpty(), s = void 0 !== i, u = "Function " + e + "() called with invalid data";
    n && (u += " (via `toFirestore()`)");
    var a = "";
    return (o || s) && (a += " (found", o && (a += " in field " + r), s && (a += " in document " + i), 
    a += ")"), new A(I.INVALID_ARGUMENT, (u += ". ") + t + a)
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */;
}

function Vs(t, e) {
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
 */ var Ms = /** @class */ function() {
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
            return new Wo(this._firestore, this._converter, this._key);
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
                var t = new Us(this._firestore, this._userDataWriter, this._key, this._document, 
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
            var e = this._document.data.field(xs("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e);
        }
    }, t;
}(), Us = /** @class */ function(e) {
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
}(Ms);

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
function xs(t, e) {
    return "string" == typeof e ? Ps(t, e) : e instanceof us ? e._internalPath : e._delegate._internalPath;
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
 */ var qs = /** @class */ function() {
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
}(), Bs = /** @class */ function(e) {
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
                var e = new js(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
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
            var n = this._document.data.field(xs("DocumentSnapshot.get", t));
            if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
    }, n;
}(Ms), js = /** @class */ function(e) {
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
}(Bs), Gs = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e, n, r) {
        this._firestore = t, this._userDataWriter = e, this._snapshot = r, this.metadata = new qs(r.hasPendingWrites, r.fromCache), 
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
            t.call(e, new js(n._firestore, n._userDataWriter, r.key, r, new qs(n._snapshot.mutatedKeys.has(r.key), n._snapshot.fromCache), n.query.converter));
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
        if (e && this._snapshot.excludesMetadataChanges) throw new A(I.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = 
        /** Calculates the array of DocumentChanges for a given ViewSnapshot. */
        function(t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
                var n = 0;
                return t._snapshot.docChanges.map((function(e) {
                    return {
                        type: "added",
                        doc: new js(t._firestore, t._userDataWriter, e.doc.key, e.doc, new qs(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter),
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
                var n = new js(t._firestore, t._userDataWriter, e.doc.key, e.doc, new qs(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter), i = -1, o = -1;
                return 0 /* Added */ !== e.type && (i = r.indexOf(e.doc.key), r = r.delete(e.doc.key)), 
                1 /* Removed */ !== e.type && (o = (r = r.add(e.doc)).indexOf(e.doc.key)), {
                    type: Ks(e.type),
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
 */ function Ks(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return L();
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
 */ function Qs(t, e) {
    return t instanceof Bs && e instanceof Bs ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof Gs && e instanceof Gs && t._firestore === e._firestore && $o(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot);
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
 */ function zs(t) {
    if (zt(t) && 0 === t.explicitOrderBy.length) throw new A(I.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ var Ws = function() {};

/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */ function Hs(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    for (var r = 0, i = e; r < i.length; r++) {
        var o = i[r];
        t = o._apply(t);
    }
    return t;
}

var Ys = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).jc = t, i.Wc = n, i.Gc = r, i.type = "where", 
        i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = ms(t.firestore), n = function(t, e, n, r, i, o, s) {
            var u;
            if (i.isKeyField()) {
                if ("array-contains" /* ARRAY_CONTAINS */ === o || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === o) throw new A(I.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + o + "' queries on FieldPath.documentId().");
                if ("in" /* IN */ === o || "not-in" /* NOT_IN */ === o) {
                    nu(s, o);
                    for (var a = [], c = 0, h = s; c < h.length; c++) {
                        var l = h[c];
                        a.push(eu(r, t, l));
                    }
                    u = {
                        arrayValue: {
                            values: a
                        }
                    };
                } else u = eu(r, t, s);
            } else "in" /* IN */ !== o && "not-in" /* NOT_IN */ !== o && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== o || nu(s, o), 
            u = Ss(n, "where", s, 
            /* allowArrays= */ "in" /* IN */ === o || "not-in" /* NOT_IN */ === o);
            var f = Dt.create(i, o, u);
            return function(t, e) {
                if (e.g()) {
                    var n = Ht(t);
                    if (null !== n && !n.isEqual(e.field)) throw new A(I.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '" + n.toString() + "' and '" + e.field.toString() + "'");
                    var r = Wt(t);
                    null !== r && ru(t, e.field, r);
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
                throw i === e.op ? new A(I.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + e.op.toString() + "' filter.") : new A(I.INVALID_ARGUMENT, "Invalid query. You cannot use '" + e.op.toString() + "' filters with '" + i.toString() + "' filters.");
            }(t, f), f;
        }(t._query, 0, e, t.firestore._databaseId, this.jc, this.Wc, this.Gc);
        return new Ho(t.firestore, t.converter, function(t, e) {
            var n = t.filters.concat([ e ]);
            return new Gt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, n));
    }, n;
}(Ws), Xs = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).jc = t, r.zc = n, r.type = "orderBy", r;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = function(t, e, n) {
            if (null !== t.startAt) throw new A(I.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== t.endAt) throw new A(I.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            var r = new xt(e, n);
            return function(t, e) {
                if (null === Wt(t)) {
                    // This is the first order by. It must match any inequality.
                    var n = Ht(t);
                    null !== n && ru(t, n, e.field);
                }
            }(t, r), r;
        }(t._query, this.jc, this.zc);
        return new Ho(t.firestore, t.converter, function(t, e) {
            // TODO(dimond): validate that orderBy does not list the same key twice.
            var n = t.explicitOrderBy.concat([ e ]);
            return new Gt(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, e));
    }, n;
}(Ws), Js = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Hc = n, i.Jc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        return new Ho(t.firestore, t.converter, Zt(t._query, this.Hc, this.Jc));
    }, n;
}(Ws), Zs = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Yc = n, i.Xc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = tu(t, this.type, this.Yc, this.Xc);
        return new Ho(t.firestore, t.converter, function(t, e) {
            return new Gt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
        }(t._query, e));
    }, n;
}(Ws), $s = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Yc = n, i.Xc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = tu(t, this.type, this.Yc, this.Xc);
        return new Ho(t.firestore, t.converter, function(t, e) {
            return new Gt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
        }(t._query, e));
    }, n;
}(Ws);

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
/** Helper function to create a bound from a document or fields */
function tu(t, e, n, r) {
    if (n[0] = h(n[0]), n[0] instanceof Ms) return function(t, e, n, r, i) {
        if (!r) throw new A(I.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + n + "().");
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
        for (var o = [], s = 0, u = Xt(t); s < u.length; s++) {
            var a = u[s];
            if (a.field.isKeyField()) o.push(dt(e, r.key)); else {
                var c = r.data.field(a.field);
                if (tt(c)) throw new A(I.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + a.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === c) {
                    var h = a.field.canonicalString();
                    throw new A(I.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + h + "' (used as the orderBy) does not exist.");
                }
                o.push(c);
            }
        }
        return new Mt(o, i);
    }(t._query, t.firestore._databaseId, e, n[0]._document, r);
    var i = ms(t.firestore);
    return function(t, e, n, r, i, o) {
        // Use explicit order by's because it has to match the query the user made
        var s = t.explicitOrderBy;
        if (i.length > s.length) throw new A(I.INVALID_ARGUMENT, "Too many arguments provided to " + r + "(). The number of arguments must be less than or equal to the number of orderBy() clauses");
        for (var u = [], a = 0; a < i.length; a++) {
            var c = i[a];
            if (s[a].field.isKeyField()) {
                if ("string" != typeof c) throw new A(I.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + r + "(), but got a " + typeof c);
                if (!Yt(t) && -1 !== c.indexOf("/")) throw new A(I.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + r + "() must be a plain document ID, but '" + c + "' contains a slash.");
                var h = t.path.child(Q.fromString(c));
                if (!ot.isDocumentKey(h)) throw new A(I.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + r + "() must result in a valid document path, but '" + h + "' is not because it contains an odd number of segments.");
                var l = new ot(h);
                u.push(dt(e, l));
            } else {
                var f = Ss(n, r, c);
                u.push(f);
            }
        }
        return new Mt(u, o);
    }(t._query, t.firestore._databaseId, i, e, n, r);
}

function eu(t, e, n) {
    if ("string" == typeof (n = h(n))) {
        if ("" === n) throw new A(I.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!Yt(e) && -1 !== n.indexOf("/")) throw new A(I.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" + n + "' contains a '/' character.");
        var r = e.path.child(Q.fromString(n));
        if (!ot.isDocumentKey(r)) throw new A(I.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + r + "' is not because it has an odd number of segments (" + r.length + ").");
        return dt(t, new ot(r));
    }
    if (n instanceof Wo) return dt(t, n._key);
    throw new A(I.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + jo(n) + ".");
}

/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */ function nu(t, e) {
    if (!Array.isArray(t) || 0 === t.length) throw new A(I.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
    if (t.length > 10) throw new A(I.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
}

function ru(t, e, n) {
    if (!n.isEqual(e)) throw new A(I.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '" + e.toString() + "' and so you must also use '" + e.toString() + "' as your first argument to orderBy(), but your first orderBy() is on field '" + n.toString() + "' instead.");
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
 */ var iu = /** @class */ function() {
    function t() {}
    return t.prototype.convertValue = function(t, e) {
        switch (void 0 === e && (e = "none"), st(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return Z(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.convertTimestamp(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.convertServerTimestamp(t, e);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return this.convertBytes($(t.bytesValue));

          case 7 /* RefValue */ :
            return this.convertReference(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.convertGeoPoint(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.convertArray(t.arrayValue, e);

          case 10 /* ObjectValue */ :
            return this.convertObject(t.mapValue, e);

          default:
            throw L();
        }
    }, t.prototype.convertObject = function(t, e) {
        var n = this, r = {};
        return j(t.fields, (function(t, i) {
            r[t] = n.convertValue(i, e);
        })), r;
    }, t.prototype.convertGeoPoint = function(t) {
        return new hs(Z(t.latitude), Z(t.longitude));
    }, t.prototype.convertArray = function(t, e) {
        var n = this;
        return (t.values || []).map((function(t) {
            return n.convertValue(t, e);
        }));
    }, t.prototype.convertServerTimestamp = function(t, e) {
        switch (e) {
          case "previous":
            var n = et(t);
            return null == n ? null : this.convertValue(n, e);

          case "estimate":
            return this.convertTimestamp(nt(t));

          default:
            return null;
        }
    }, t.prototype.convertTimestamp = function(t) {
        var e = J(t);
        return new x(e.seconds, e.nanos);
    }, t.prototype.convertDocumentKey = function(t, e) {
        var n = Q.fromString(t);
        O(jn(n));
        var r = new ko(n.get(1), n.get(3)), i = new ot(n.popFirst(5));
        return r.isEqual(e) || 
        // TODO(b/64130202): Somehow support foreign references.
        k("Document " + i + " contains a document reference within a different database (" + r.projectId + "/" + r.database + ") which is not supported. It will be treated as a reference in the current database (" + e.projectId + "/" + e.database + ") instead."), 
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
 */ function ou(t, e, n) {
    // Cast to `any` in order to satisfy the union type constraint on
    // toFirestore().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e;
}

var su = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new as(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new Wo(this.firestore, /* converter= */ null, e);
    }, n;
}(iu), uu = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, 
        this._dataReader = ms(t);
    }
    return t.prototype.set = function(t, e, n) {
        this._verifyNotCommitted();
        var r = au(t, this._firestore), i = ou(r.converter, e, n), o = gs(this._dataReader, "WriteBatch.set", r._key, i, null !== r.converter, n);
        return this._mutations.push(o.toMutation(r._key, Ee.none())), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        this._verifyNotCommitted();
        var o, s = au(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = h(e)) || e instanceof us ? Ns(this._dataReader, "WriteBatch.update", s._key, e, n, r) : As(this._dataReader, "WriteBatch.update", s._key, e), 
        this._mutations.push(o.toMutation(s._key, Ee.exists(!0))), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        this._verifyNotCommitted();
        var e = au(t, this._firestore);
        return this._mutations = this._mutations.concat(new Me(e._key, Ee.none())), this;
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
        if (this._committed) throw new A(I.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
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
 */ function au(t, e) {
    if ((t = h(t)).firestore !== e) throw new A(I.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
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
 */ var cu = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new as(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new Wo(this.firestore, /* converter= */ null, e);
    }, n;
}(iu);

/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function hu(t, e, n) {
    for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
    t = Go(t, Wo);
    var o = Go(t.firestore, is), s = ms(o);
    return fu(o, [ ("string" == typeof (
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    e = h(e)) || e instanceof us ? Ns(s, "updateDoc", t._key, e, n, r) : As(s, "updateDoc", t._key, e)).toMutation(t._key, Ee.exists(!0)) ]);
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */ function lu(t) {
    for (var r, i, o, s = [], u = 1; u < arguments.length; u++) s[u - 1] = arguments[u];
    t = h(t);
    var a = {
        includeMetadataChanges: !1
    }, c = 0;
    "object" != typeof s[c] || es(s[c]) || (a = s[c], c++);
    var l, f, d, p = {
        includeMetadataChanges: a.includeMetadataChanges
    };
    if (es(s[c])) {
        var y = s[c];
        s[c] = null === (r = y.next) || void 0 === r ? void 0 : r.bind(y), s[c + 1] = null === (i = y.error) || void 0 === i ? void 0 : i.bind(y), 
        s[c + 2] = null === (o = y.complete) || void 0 === o ? void 0 : o.bind(y);
    }
    if (t instanceof Wo) f = Go(t.firestore, is), d = Kt(t._key.path), l = {
        next: function(e) {
            s[c] && s[c](du(f, t, e));
        },
        error: s[c + 1],
        complete: s[c + 2]
    }; else {
        var v = Go(t, Ho);
        f = Go(v.firestore, is), d = v._query;
        var m = new cu(f);
        l = {
            next: function(t) {
                s[c] && s[c](new Gs(f, m, v, t));
            },
            error: s[c + 1],
            complete: s[c + 2]
        }, zs(t._query);
    }
    return function(t, r, i, o) {
        var s = this, u = new lo(o), a = new Ri(r, u, i);
        return t.asyncQueue.enqueueAndForget((function() {
            return e(s, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = Ai, [ 4 /*yield*/ , Ao(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), a ]) ];
                    }
                }));
            }));
        })), function() {
            u.Wo(), t.asyncQueue.enqueueAndForget((function() {
                return e(s, void 0, void 0, (function() {
                    var e;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = Ni, [ 4 /*yield*/ , Ao(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), a ]) ];
                        }
                    }));
                }));
            }));
        };
    }(os(f), d, p, l);
}

/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ function fu(t, r) {
    return function(t, r) {
        var i = this, o = new Kn;
        return t.asyncQueue.enqueueAndForget((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = Ki, [ 4 /*yield*/ , Io(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), r, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(os(t), r);
}

/**
 * Converts a ViewSnapshot that contains the single document specified by `ref`
 * to a DocumentSnapshot.
 */ function du(t, e, n) {
    var r = n.docs.get(e._key), i = new cu(t);
    return new Bs(t, i, e._key, r, new qs(n.hasPendingWrites, n.fromCache), e.converter);
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
 */ var pu = /** @class */ function(e) {
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
        var n = this, r = au(t, this._firestore), i = new cu(this._firestore);
        return e.prototype.get.call(this, t).then((function(t) {
            return new Bs(n._firestore, i, r._key, t._document, new qs(
            /* hasPendingWrites= */ !1, 
            /* fromCache= */ !1), r.converter);
        }));
    }, n;
}(/** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._transaction = e, this._dataReader = ms(t)
        /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */;
    }
    return t.prototype.get = function(t) {
        var e = this, n = au(t, this._firestore), r = new su(this._firestore);
        return this._transaction.lookup([ n._key ]).then((function(t) {
            if (!t || 1 !== t.length) return L();
            var i = t[0];
            if (i.isFoundDocument()) return new Ms(e._firestore, r, i.key, i, n.converter);
            if (i.isNoDocument()) return new Ms(e._firestore, r, n._key, null, n.converter);
            throw L();
        }));
    }, t.prototype.set = function(t, e, n) {
        var r = au(t, this._firestore), i = ou(r.converter, e, n), o = gs(this._dataReader, "Transaction.set", r._key, i, null !== r.converter, n);
        return this._transaction.set(r._key, o), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        var o, s = au(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = h(e)) || e instanceof us ? Ns(this._dataReader, "Transaction.update", s._key, e, n, r) : As(this._dataReader, "Transaction.update", s._key, e), 
        this._transaction.update(s._key, o), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        var e = au(t, this._firestore);
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
/** Helper function to assert Uint8Array is available at runtime. */ function yu() {
    if ("undefined" == typeof Uint8Array) throw new A(I.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.");
}

/** Helper function to assert Base64 functions are available at runtime. */ function vu() {
    if ("undefined" == typeof atob) throw new A(I.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.");
}

/** Immutable class holding a blob (binary data) */ var mu = /** @class */ function() {
    function t(t) {
        this._delegate = t;
    }
    return t.fromBase64String = function(e) {
        return vu(), new t(as.fromBase64String(e));
    }, t.fromUint8Array = function(e) {
        return yu(), new t(as.fromUint8Array(e));
    }, t.prototype.toBase64 = function() {
        return vu(), this._delegate.toBase64();
    }, t.prototype.toUint8Array = function() {
        return yu(), this._delegate.toUint8Array();
    }, t.prototype.isEqual = function(t) {
        return this._delegate.isEqual(t._delegate);
    }, t.prototype.toString = function() {
        return "Blob(base64: " + this.toBase64() + ")";
    }, t;
}(), gu = "You are using the memory-only build of Firestore. Persistence support is only available via the @firebase/firestore bundle or the firebase-firestore.js build.", wu = /** @class */ function() {
    function t() {}
    return t.prototype.enableIndexedDbPersistence = function(t, e) {
        throw new A(I.FAILED_PRECONDITION, gu);
    }, t.prototype.enableMultiTabIndexedDbPersistence = function(t) {
        throw new A(I.FAILED_PRECONDITION, gu);
    }, t.prototype.clearIndexedDbPersistence = function(t) {
        throw new A(I.FAILED_PRECONDITION, gu);
    }, t;
}(), bu = /** @class */ function() {
    function t(t, e, n) {
        var r = this;
        this._delegate = e, this.Zc = n, this.INTERNAL = {
            delete: function() {
                return r.terminate();
            }
        }, t instanceof ko || (this.tu = t);
    }
    return Object.defineProperty(t.prototype, "_databaseId", {
        get: function() {
            return this._delegate._databaseId;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.settings = function(t) {
        var e = this._delegate._getSettings();
        t.merge || e.host === t.host || R("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."), 
        t.merge && 
        // Remove the property from the settings once the merge is completed
        delete (t = Object.assign(Object.assign({}, e), t)).merge, this._delegate._setSettings(t);
    }, t.prototype.useEmulator = function(t, e, n) {
        void 0 === n && (n = {}), function(t, e, n, r) {
            void 0 === r && (r = {});
            var i = (t = Go(t, zo))._getSettings();
            if ("firestore.googleapis.com" !== i.host && i.host !== e && R("Host has been set in both settings() and useEmulator(), emulator host will be used"), 
            t._setSettings(Object.assign(Object.assign({}, i), {
                host: e + ":" + n,
                ssl: !1
            })), r.mockUserToken) {
                // Let createMockUserToken validate first (catches common mistakes like
                // invalid field "uid" and missing field "sub" / "user_id".)
                var o = l(r.mockUserToken), s = r.mockUserToken.sub || r.mockUserToken.user_id;
                if (!s) throw new A(I.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
                t._credentials = new Oo(new Co(o, new Rr(s)));
            }
        }(this._delegate, t, e, n);
    }, t.prototype.enableNetwork = function() {
        return function(t) {
            var r = this;
            return t.asyncQueue.enqueue((function() {
                return e(r, void 0, void 0, (function() {
                    var e, r;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return [ 4 /*yield*/ , _o(t) ];

                          case 1:
                            return e = n.sent(), [ 4 /*yield*/ , To(t) ];

                          case 2:
                            return r = n.sent(), [ 2 /*return*/ , (e.setNetworkEnabled(!0), function(t) {
                                var e = P(t);
                                return e.Or.delete(0 /* UserDisabled */), Wr(e);
                            }(r)) ];
                        }
                    }));
                }));
            }));
        }
        /** Disables the network connection. Pending operations will not complete. */ (os(Go(this._delegate, is)));
    }, t.prototype.disableNetwork = function() {
        return function(t) {
            var r = this;
            return t.asyncQueue.enqueue((function() {
                return e(r, void 0, void 0, (function() {
                    var r, i;
                    return n(this, (function(o) {
                        switch (o.label) {
                          case 0:
                            return [ 4 /*yield*/ , _o(t) ];

                          case 1:
                            return r = o.sent(), [ 4 /*yield*/ , To(t) ];

                          case 2:
                            return i = o.sent(), [ 2 /*return*/ , (r.setNetworkEnabled(!1), function(t) {
                                return e(this, void 0, void 0, (function() {
                                    var e;
                                    return n(this, (function(n) {
                                        switch (n.label) {
                                          case 0:
                                            return (e = P(t)).Or.add(0 /* UserDisabled */), [ 4 /*yield*/ , Hr(e) ];

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
 */ (os(Go(this._delegate, is)));
    }, t.prototype.enablePersistence = function(t) {
        var e = !1, n = !1;
        return t && xo("synchronizeTabs", e = !!t.synchronizeTabs, "experimentalForceOwningTab", n = !!t.experimentalForceOwningTab), 
        e ? this.Zc.enableMultiTabIndexedDbPersistence(this) : this.Zc.enableIndexedDbPersistence(this, n);
    }, t.prototype.clearPersistence = function() {
        return this.Zc.clearIndexedDbPersistence(this);
    }, t.prototype.terminate = function() {
        return this.tu && (this.tu._removeServiceInstance("firestore"), this.tu._removeServiceInstance("firestore-exp")), 
        this._delegate._delete();
    }, t.prototype.waitForPendingWrites = function() {
        return function(t) {
            var r = this, i = new Kn;
            return t.asyncQueue.enqueueAndForget((function() {
                return e(r, void 0, void 0, (function() {
                    var e;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = Xi, [ 4 /*yield*/ , Io(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), i ]) ];
                        }
                    }));
                }));
            })), i.promise;
        }(os(Go(this._delegate, is)));
    }, t.prototype.onSnapshotsInSync = function(t) {
        return function(t, r) {
            return function(t, r) {
                var i = this, o = new lo(r);
                return t.asyncQueue.enqueueAndForget((function() {
                    return e(i, void 0, void 0, (function() {
                        var e;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return e = function(t, e) {
                                    P(t).Gr.add(e), 
                                    // Immediately fire an initial event, indicating all existing listeners
                                    // are in-sync.
                                    e.next();
                                }, [ 4 /*yield*/ , Ao(t) ];

                              case 1:
                                return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), o ]) ];
                            }
                        }));
                    }));
                })), function() {
                    o.Wo(), t.asyncQueue.enqueueAndForget((function() {
                        return e(i, void 0, void 0, (function() {
                            var e;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = function(t, e) {
                                        P(t).Gr.delete(e);
                                    }, [ 4 /*yield*/ , Ao(t) ];

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
            }(os(t = Go(t, is)), es(r) ? r : {
                next: r
            });
        }(this._delegate, t);
    }, Object.defineProperty(t.prototype, "app", {
        get: function() {
            if (!this.tu) throw new A(I.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this.tu;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.collection = function(t) {
        try {
            return new Fu(this, Xo(this._delegate, t));
        } catch (t) {
            throw Su(t, "collection()", "Firestore.collection()");
        }
    }, t.prototype.doc = function(t) {
        try {
            return new Nu(this, Jo(this._delegate, t));
        } catch (t) {
            throw Su(t, "doc()", "Firestore.doc()");
        }
    }, t.prototype.collectionGroup = function(t) {
        try {
            return new Lu(this, function(t, e) {
                if (t = Go(t, zo), Mo("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new A(I.INVALID_ARGUMENT, "Invalid collection ID '" + e + "' passed to function collectionGroup(). Collection IDs must not contain '/'.");
                return new Ho(t, 
                /* converter= */ null, 
                /**
 * Creates a new Query for a collection group query that matches all documents
 * within the provided collection group.
 */
                function(t) {
                    return new Gt(Q.emptyPath(), t);
                }(e));
            }(this._delegate, t));
        } catch (t) {
            throw Su(t, "collectionGroup()", "Firestore.collectionGroup()");
        }
    }, t.prototype.runTransaction = function(t) {
        var r = this;
        return function(t, r) {
            return function(t, r) {
                var i = this, o = new Kn;
                return t.asyncQueue.enqueueAndForget((function() {
                    return e(i, void 0, void 0, (function() {
                        var e;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return [ 4 /*yield*/ , function(t) {
                                    return bo(t).then((function(t) {
                                        return t.datastore;
                                    }));
                                }(t) ];

                              case 1:
                                return e = n.sent(), new yo(t.asyncQueue, e, r, o).run(), [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), o.promise;
            }(os(t), (function(e) {
                return r(new pu(t, e));
            }));
        }(this._delegate, (function(e) {
            return t(new Tu(r, e));
        }));
    }, t.prototype.batch = function() {
        var t = this;
        return os(this._delegate), new Iu(new uu(this._delegate, (function(e) {
            return fu(t._delegate, e);
        })));
    }, t.prototype.loadBundle = function(t) {
        throw new A(I.FAILED_PRECONDITION, '"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?');
    }, t.prototype.namedQuery = function(t) {
        throw new A(I.FAILED_PRECONDITION, '"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?');
    }, t;
}(), _u = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new mu(new as(t));
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return Nu.eu(e, this.firestore, /* converter= */ null);
    }, n;
}(iu);

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
 */ function Eu(t) {
    var e;
    e = t, N.setLogLevel(e);
}

/**
 * A reference to a transaction.
 */ var Tu = /** @class */ function() {
    function t(t, e) {
        this._firestore = t, this._delegate = e, this._userDataWriter = new _u(t);
    }
    return t.prototype.get = function(t) {
        var e = this, n = Vu(t);
        return this._delegate.get(n).then((function(t) {
            return new Ru(e._firestore, new Bs(e._firestore._delegate, e._userDataWriter, t._key, t._document, t.metadata, n.converter));
        }));
    }, t.prototype.set = function(t, e, n) {
        var r = Vu(t);
        return n ? (Uo("Transaction.set", n), this._delegate.set(r, e, n)) : this._delegate.set(r, e), 
        this;
    }, t.prototype.update = function(t, e, n) {
        for (var i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        var u = Vu(t);
        return 2 === arguments.length ? this._delegate.update(u, e) : (i = this._delegate).update.apply(i, r([ u, e, n ], o)), 
        this;
    }, t.prototype.delete = function(t) {
        var e = Vu(t);
        return this._delegate.delete(e), this;
    }, t;
}(), Iu = /** @class */ function() {
    function t(t) {
        this._delegate = t;
    }
    return t.prototype.set = function(t, e, n) {
        var r = Vu(t);
        return n ? (Uo("WriteBatch.set", n), this._delegate.set(r, e, n)) : this._delegate.set(r, e), 
        this;
    }, t.prototype.update = function(t, e, n) {
        for (var i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        var u = Vu(t);
        return 2 === arguments.length ? this._delegate.update(u, e) : (i = this._delegate).update.apply(i, r([ u, e, n ], o)), 
        this;
    }, t.prototype.delete = function(t) {
        var e = Vu(t);
        return this._delegate.delete(e), this;
    }, t.prototype.commit = function() {
        return this._delegate.commit();
    }, t;
}(), Au = /** @class */ function() {
    function t(t, e, n) {
        this._firestore = t, this._userDataWriter = e, this._delegate = n;
    }
    return t.prototype.fromFirestore = function(t, e) {
        var n = new js(this._firestore._delegate, this._userDataWriter, t._key, t._document, t.metadata, 
        /* converter= */ null);
        return this._delegate.fromFirestore(new Cu(this._firestore, n), null != e ? e : {});
    }, t.prototype.toFirestore = function(t, e) {
        return e ? this._delegate.toFirestore(t, e) : this._delegate.toFirestore(t);
    }, 
    // Use the same instance of `FirestoreDataConverter` for the given instances
    // of `Firestore` and `PublicFirestoreDataConverter` so that isEqual() will
    // compare equal for two objects created with the same converter instance.
    t.nu = function(e, n) {
        var r = t.su, i = r.get(e);
        i || (i = new WeakMap, r.set(e, i));
        var o = i.get(n);
        return o || (o = new t(e, new _u(e), n), i.set(n, o)), o;
    }, t;
}();

Au.su = new WeakMap;

/**
 * A reference to a particular document in a collection in the database.
 */
var Nu = /** @class */ function() {
    function t(t, e) {
        this.firestore = t, this._delegate = e, this._userDataWriter = new _u(t);
    }
    return t.iu = function(e, n, r) {
        if (e.length % 2 != 0) throw new A(I.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + e.canonicalString() + " has " + e.length);
        return new t(n, new Wo(n._delegate, r, new ot(e)));
    }, t.eu = function(e, n, r) {
        return new t(n, new Wo(n._delegate, r, e));
    }, Object.defineProperty(t.prototype, "id", {
        get: function() {
            return this._delegate.id;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "parent", {
        get: function() {
            return new Fu(this.firestore, this._delegate.parent);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this._delegate.path;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.collection = function(t) {
        try {
            return new Fu(this.firestore, Xo(this._delegate, t));
        } catch (t) {
            throw Su(t, "collection()", "DocumentReference.collection()");
        }
    }, t.prototype.isEqual = function(t) {
        return (t = h(t)) instanceof Wo && Zo(this._delegate, t);
    }, t.prototype.set = function(t, e) {
        e = Uo("DocumentReference.set", e);
        try {
            return function(t, e, n) {
                t = Go(t, Wo);
                var r = Go(t.firestore, is), i = ou(t.converter, e, n);
                return fu(r, [ gs(ms(r), "setDoc", t._key, i, null !== t.converter, n).toMutation(t._key, Ee.none()) ]);
            }(this._delegate, t, e);
        } catch (t) {
            throw Su(t, "setDoc()", "DocumentReference.set()");
        }
    }, t.prototype.update = function(t, e) {
        for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
        try {
            return 1 === arguments.length ? hu(this._delegate, t) : hu.apply(void 0, r([ this._delegate, t, e ], n));
        } catch (t) {
            throw Su(t, "updateDoc()", "DocumentReference.update()");
        }
    }, t.prototype.delete = function() {
        return fu(Go((t = this._delegate).firestore, is), [ new Me(t._key, Ee.none()) ]);
        var t;
        /**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A Promise resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend (Note that it
 * won't resolve while you're offline).
 */    }, t.prototype.onSnapshot = function() {
        for (var t = this, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        var r = Du(e), i = ku(e, (function(e) {
            return new Ru(t.firestore, new Bs(t.firestore._delegate, t._userDataWriter, e._key, e._document, e.metadata, t._delegate.converter));
        }));
        return lu(this._delegate, r, i);
    }, t.prototype.get = function(t) {
        var r = this;
        return ("cache" === (null == t ? void 0 : t.source) ? function(t) {
            t = Go(t, Wo);
            var r = Go(t.firestore, is), i = os(r), o = new cu(r);
            return function(t, r) {
                var i = this, o = new Kn;
                return t.asyncQueue.enqueueAndForget((function() {
                    return e(i, void 0, void 0, (function() {
                        var i;
                        return n(this, (function(s) {
                            switch (s.label) {
                              case 0:
                                return i = function(t, r, i) {
                                    return e(this, void 0, void 0, (function() {
                                        var e, o;
                                        return n(this, (function(n) {
                                            switch (n.label) {
                                              case 0:
                                                return n.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , function(t, e) {
                                                    var n = P(t);
                                                    return n.persistence.runTransaction("read document", "readonly", (function(t) {
                                                        return n.Mn.mn(t, e);
                                                    }));
                                                }(t, r) ];

                                              case 1:
                                                return (o = n.sent()).isFoundDocument() ? i.resolve(o) : o.isNoDocument() ? i.resolve(null) : i.reject(new A(I.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")), 
                                                [ 3 /*break*/ , 3 ];

                                              case 2:
                                                return e = n.sent(), o = wi(e, "Failed to get document '" + r + " from cache"), 
                                                i.reject(o), [ 3 /*break*/ , 3 ];

                                              case 3:
                                                return [ 2 /*return*/ ];
                                            }
                                        }));
                                    }));
                                }, [ 4 /*yield*/ , Eo(t) ];

                              case 1:
                                return [ 2 /*return*/ , i.apply(void 0, [ s.sent(), r, o ]) ];
                            }
                        }));
                    }));
                })), o.promise;
            }(i, t._key).then((function(e) {
                return new Bs(r, o, t._key, e, new qs(null !== e && e.hasLocalMutations, 
                /* fromCache= */ !0), t.converter);
            }));
        }(this._delegate) : "server" === (null == t ? void 0 : t.source) ? function(t) {
            t = Go(t, Wo);
            var e = Go(t.firestore, is);
            return No(os(e), t._key, {
                source: "server"
            }).then((function(n) {
                return du(e, t, n);
            }));
        }(this._delegate) : function(t) {
            t = Go(t, Wo);
            var e = Go(t.firestore, is);
            return No(os(e), t._key).then((function(n) {
                return du(e, t, n);
            }));
        }(this._delegate)).then((function(t) {
            return new Ru(r.firestore, new Bs(r.firestore._delegate, r._userDataWriter, t._key, t._document, t.metadata, r._delegate.converter));
        }));
    }, t.prototype.withConverter = function(e) {
        return new t(this.firestore, e ? this._delegate.withConverter(Au.nu(this.firestore, e)) : this._delegate.withConverter(null));
    }, t;
}();

/**
 * Replaces the function name in an error thrown by the firestore-exp API
 * with the function names used in the classic API.
 */ function Su(t, e, n) {
    return t.message = t.message.replace(e, n), t
    /**
 * Iterates the list of arguments from an `onSnapshot` call and returns the
 * first argument that may be an `SnapshotListenOptions` object. Returns an
 * empty object if none is found.
 */;
}

function Du(t) {
    for (var e = 0, n = t; e < n.length; e++) {
        var r = n[e];
        if ("object" == typeof r && !es(r)) return r;
    }
    return {};
}

/**
 * Creates an observer that can be passed to the firestore-exp SDK. The
 * observer converts all observed values into the format expected by the classic
 * SDK.
 *
 * @param args - The list of arguments from an `onSnapshot` call.
 * @param wrapper - The function that converts the firestore-exp type into the
 * type used by this shim.
 */ function ku(t, e) {
    var n, r, i;
    return {
        next: function(t) {
            i.next && i.next(e(t));
        },
        error: null === (n = (i = es(t[0]) ? t[0] : es(t[1]) ? t[1] : "function" == typeof t[0] ? {
            next: t[0],
            error: t[1],
            complete: t[2]
        } : {
            next: t[1],
            error: t[2],
            complete: t[3]
        }).error) || void 0 === n ? void 0 : n.bind(i),
        complete: null === (r = i.complete) || void 0 === r ? void 0 : r.bind(i)
    };
}

var Ru = /** @class */ function() {
    function t(t, e) {
        this._firestore = t, this._delegate = e;
    }
    return Object.defineProperty(t.prototype, "ref", {
        get: function() {
            return new Nu(this._firestore, this._delegate.ref);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "id", {
        get: function() {
            return this._delegate.id;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "metadata", {
        get: function() {
            return this._delegate.metadata;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "exists", {
        get: function() {
            return this._delegate.exists();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.data = function(t) {
        return this._delegate.data(t);
    }, t.prototype.get = function(t, e) {
        return this._delegate.get(t, e);
    }, t.prototype.isEqual = function(t) {
        return Qs(this._delegate, t._delegate);
    }, t;
}(), Cu = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.data = function(t) {
        return this._delegate.data(t);
    }, n;
}(Ru), Lu = /** @class */ function() {
    function t(t, e) {
        this.firestore = t, this._delegate = e, this._userDataWriter = new _u(t);
    }
    return t.prototype.where = function(e, n, r) {
        try {
            // The "as string" cast is a little bit of a hack. `where` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new t(this.firestore, Hs(this._delegate, function(t, e, n) {
                var r = e, i = xs("where", t);
                return new Ys(i, r, n);
            }(e, n, r)));
        } catch (e) {
            throw Su(e, /(orderBy|where)\(\)/, "Query.$1()");
        }
    }, t.prototype.orderBy = function(e, n) {
        try {
            // The "as string" cast is a little bit of a hack. `orderBy` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new t(this.firestore, Hs(this._delegate, function(t, e) {
                void 0 === e && (e = "asc");
                var n = e, r = xs("orderBy", t);
                return new Xs(r, n);
            }(e, n)));
        } catch (e) {
            throw Su(e, /(orderBy|where)\(\)/, "Query.$1()");
        }
    }, t.prototype.limit = function(e) {
        try {
            return new t(this.firestore, Hs(this._delegate, function(t) {
                return Ko("limit", t), new Js("limit", t, "F" /* First */);
            }(e)));
        } catch (e) {
            throw Su(e, "limit()", "Query.limit()");
        }
    }, t.prototype.limitToLast = function(e) {
        try {
            return new t(this.firestore, Hs(this._delegate, function(t) {
                return Ko("limitToLast", t), new Js("limitToLast", t, "L" /* Last */);
            }(e)));
        } catch (e) {
            throw Su(e, "limitToLast()", "Query.limitToLast()");
        }
    }, t.prototype.startAt = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        try {
            return new t(this.firestore, Hs(this._delegate, function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new Zs("startAt", t, /*before=*/ !0);
            }.apply(void 0, e)));
        } catch (e) {
            throw Su(e, "startAt()", "Query.startAt()");
        }
    }, t.prototype.startAfter = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        try {
            return new t(this.firestore, Hs(this._delegate, function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new Zs("startAfter", t, 
                /*before=*/ !1);
            }.apply(void 0, e)));
        } catch (e) {
            throw Su(e, "startAfter()", "Query.startAfter()");
        }
    }, t.prototype.endBefore = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        try {
            return new t(this.firestore, Hs(this._delegate, function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new $s("endBefore", t, /*before=*/ !0);
            }.apply(void 0, e)));
        } catch (e) {
            throw Su(e, "endBefore()", "Query.endBefore()");
        }
    }, t.prototype.endAt = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        try {
            return new t(this.firestore, Hs(this._delegate, function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new $s("endAt", t, /*before=*/ !1);
            }.apply(void 0, e)));
        } catch (e) {
            throw Su(e, "endAt()", "Query.endAt()");
        }
    }, t.prototype.isEqual = function(t) {
        return $o(this._delegate, t._delegate);
    }, t.prototype.get = function(t) {
        var r = this;
        return ("cache" === (null == t ? void 0 : t.source) ? 
        /**
     * Executes the query and returns the results as a `QuerySnapshot` from cache.
     * Returns an error if the document is not currently cached.
     *
     * @returns A Promise that will be resolved with the results of the query.
     */
        function(t) {
            t = Go(t, Ho);
            var r = Go(t.firestore, is), i = os(r), o = new cu(r);
            return function(t, r) {
                var i = this, o = new Kn;
                return t.asyncQueue.enqueueAndForget((function() {
                    return e(i, void 0, void 0, (function() {
                        var i;
                        return n(this, (function(s) {
                            switch (s.label) {
                              case 0:
                                return i = function(t, r, i) {
                                    return e(this, void 0, void 0, (function() {
                                        var e, o, s, u, a;
                                        return n(this, (function(n) {
                                            switch (n.label) {
                                              case 0:
                                                return n.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , mr(t, r, 
                                                /* usePreviousResults= */ !0) ];

                                              case 1:
                                                return a = n.sent(), e = new Mi(r, a.Bn), o = e._o(a.documents), s = e.applyChanges(o, 
                                                /* updateLimboDocuments= */ !1), i.resolve(s.snapshot), [ 3 /*break*/ , 3 ];

                                              case 2:
                                                return u = n.sent(), a = wi(u, "Failed to execute query '" + r + " against cache"), 
                                                i.reject(a), [ 3 /*break*/ , 3 ];

                                              case 3:
                                                return [ 2 /*return*/ ];
                                            }
                                        }));
                                    }));
                                }, [ 4 /*yield*/ , Eo(t) ];

                              case 1:
                                return [ 2 /*return*/ , i.apply(void 0, [ s.sent(), r, o ]) ];
                            }
                        }));
                    }));
                })), o.promise;
            }(i, t._query).then((function(e) {
                return new Gs(r, o, t, e);
            }));
        }(this._delegate) : "server" === (null == t ? void 0 : t.source) ? function(t) {
            t = Go(t, Ho);
            var e = Go(t.firestore, is), n = os(e), r = new cu(e);
            return So(n, t._query, {
                source: "server"
            }).then((function(n) {
                return new Gs(e, r, t, n);
            }));
        }(this._delegate) : function(t) {
            t = Go(t, Ho);
            var e = Go(t.firestore, is), n = os(e), r = new cu(e);
            return zs(t._query), So(n, t._query).then((function(n) {
                return new Gs(e, r, t, n);
            }));
        }(this._delegate)).then((function(t) {
            return new Pu(r.firestore, new Gs(r.firestore._delegate, r._userDataWriter, r._delegate, t._snapshot));
        }));
    }, t.prototype.onSnapshot = function() {
        for (var t = this, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        var r = Du(e), i = ku(e, (function(e) {
            return new Pu(t.firestore, new Gs(t.firestore._delegate, t._userDataWriter, t._delegate, e._snapshot));
        }));
        return lu(this._delegate, r, i);
    }, t.prototype.withConverter = function(e) {
        return new t(this.firestore, e ? this._delegate.withConverter(Au.nu(this.firestore, e)) : this._delegate.withConverter(null));
    }, t;
}(), Ou = /** @class */ function() {
    function t(t, e) {
        this._firestore = t, this._delegate = e;
    }
    return Object.defineProperty(t.prototype, "type", {
        get: function() {
            return this._delegate.type;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "doc", {
        get: function() {
            return new Cu(this._firestore, this._delegate.doc);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "oldIndex", {
        get: function() {
            return this._delegate.oldIndex;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "newIndex", {
        get: function() {
            return this._delegate.newIndex;
        },
        enumerable: !1,
        configurable: !0
    }), t;
}(), Pu = /** @class */ function() {
    function t(t, e) {
        this._firestore = t, this._delegate = e;
    }
    return Object.defineProperty(t.prototype, "query", {
        get: function() {
            return new Lu(this._firestore, this._delegate.query);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "metadata", {
        get: function() {
            return this._delegate.metadata;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this._delegate.size;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "empty", {
        get: function() {
            return this._delegate.empty;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "docs", {
        get: function() {
            var t = this;
            return this._delegate.docs.map((function(e) {
                return new Cu(t._firestore, e);
            }));
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.docChanges = function(t) {
        var e = this;
        return this._delegate.docChanges(t).map((function(t) {
            return new Ou(e._firestore, t);
        }));
    }, t.prototype.forEach = function(t, e) {
        var n = this;
        this._delegate.forEach((function(r) {
            t.call(e, new Cu(n._firestore, r));
        }));
    }, t.prototype.isEqual = function(t) {
        return Qs(this._delegate, t._delegate);
    }, t;
}(), Fu = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, n) || this).firestore = t, r._delegate = n, r;
    }
    return t(n, e), Object.defineProperty(n.prototype, "id", {
        get: function() {
            return this._delegate.id;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "path", {
        get: function() {
            return this._delegate.path;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "parent", {
        get: function() {
            var t = this._delegate.parent;
            return t ? new Nu(this.firestore, t) : null;
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.doc = function(t) {
        try {
            return new Nu(this.firestore, void 0 === t ? Jo(this._delegate) : Jo(this._delegate, t));
        } catch (t) {
            throw Su(t, "doc()", "CollectionReference.doc()");
        }
    }, n.prototype.add = function(t) {
        var e = this;
        return function(t, e) {
            var n = Go(t.firestore, is), r = Jo(t), i = ou(t.converter, e);
            return fu(n, [ gs(ms(t.firestore), "addDoc", r._key, i, null !== t.converter, {}).toMutation(r._key, Ee.exists(!1)) ]).then((function() {
                return r;
            }));
        }(this._delegate, t).then((function(t) {
            return new Nu(e.firestore, t);
        }));
    }, n.prototype.isEqual = function(t) {
        return Zo(this._delegate, t._delegate);
    }, n.prototype.withConverter = function(t) {
        return new n(this.firestore, t ? this._delegate.withConverter(Au.nu(this.firestore, t)) : this._delegate.withConverter(null));
    }, n;
}(Lu);

function Vu(t) {
    return Go(t, Wo);
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
// The objects that are a part of this API are exposed to third-parties as
// compiled javascript so we want to flag our private members with a leading
// underscore to discourage their use.
/**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a list
 * of field names (referring to a nested field in the document).
 */ var Mu = /** @class */ function() {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function t() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        this._delegate = new (us.bind.apply(us, r([ void 0 ], t)));
    }
    return t.documentId = function() {
        /**
         * Internal Note: The backend doesn't technically support querying by
         * document ID. Instead it queries by the entire document name (full path
         * included), but in the cases we currently support documentId(), the net
         * effect is the same.
         */
        return new t(W.keyField().canonicalString());
    }, t.prototype.isEqual = function(t) {
        return (t = h(t)) instanceof us && this._delegate._internalPath.isEqual(t._internalPath);
    }, t;
}(), Uu = /** @class */ function() {
    function t(t) {
        this._delegate = t;
    }
    return t.serverTimestamp = function() {
        var e = new _s("serverTimestamp");
        return e._methodName = "FieldValue.serverTimestamp", new t(e);
    }, t.delete = function() {
        var e = new ws("deleteField");
        return e._methodName = "FieldValue.delete", new t(e);
    }, t.arrayUnion = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        var r = 
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
        function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            // NOTE: We don't actually parse the data until it's used in set() or
            // update() since we'd need the Firestore instance to do this.
                        return new Es("arrayUnion", t);
        }.apply(void 0, e);
        return r._methodName = "FieldValue.arrayUnion", new t(r);
    }, t.arrayRemove = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        var r = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            // NOTE: We don't actually parse the data until it's used in set() or
            // update() since we'd need the Firestore instance to do this.
                        return new Ts("arrayRemove", t);
        }.apply(void 0, e);
        return r._methodName = "FieldValue.arrayRemove", new t(r);
    }, t.increment = function(e) {
        var n = function(t) {
            return new Is("increment", t);
        }(e);
        return n._methodName = "FieldValue.increment", new t(n);
    }, t.prototype.isEqual = function(t) {
        return this._delegate.isEqual(t._delegate);
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
function xu(t) {
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
 */
    return function(t, r) {
        var i = os(t = Go(t, is)), o = new ns;
        return function(t, r, i, o) {
            var s = this, u = function(t, e) {
                return function(t, e) {
                    return new fo(t, e);
                }(function(t, e) {
                    if (t instanceof Uint8Array) return ho(t, e);
                    if (t instanceof ArrayBuffer) return ho(new Uint8Array(t), e);
                    if (t instanceof ReadableStream) return t.getReader();
                    throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream");
                }("string" == typeof t ? (new TextEncoder).encode(t) : t), e);
            }(i, xr(r));
            t.asyncQueue.enqueueAndForget((function() {
                return e(s, void 0, void 0, (function() {
                    var e;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = uo, [ 4 /*yield*/ , Io(t) ];

                          case 1:
                            return e.apply(void 0, [ n.sent(), u, o ]), [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        }(i, t._databaseId, r, o), o;
    }(this._delegate, t);
}

function qu(t) {
    var r, i, o = this;
    return (r = this._delegate, i = t, function(t, r) {
        var i = this;
        return t.asyncQueue.enqueue((function() {
            return e(i, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = function(t, e) {
                            var n = P(t);
                            return n.persistence.runTransaction("Get named query", "readonly", (function(t) {
                                return n.Ke.getNamedQuery(t, e);
                            }));
                        }, [ 4 /*yield*/ , Eo(t) ];

                      case 1:
                        return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), r ]) ];
                    }
                }));
            }));
        }));
    }(os(r = Go(r, is)), i).then((function(t) {
        return t ? new Ho(r, null, t.query) : null;
    }))).then((function(t) {
        return t ? new Lu(o, t) : null;
    }));
}

export { wu as B, hs as C, rs as E, x as M, Eu as Q, is as T, bu as U, Iu as W, Ru as X, Cu as Z, mu as a, xu as c, Tu as j, Pu as n, Uu as o, Mu as r, Fu as s, Lu as t, qu as u, Nu as z };
//# sourceMappingURL=prebuilt-2b285dd7-821bb514.js.map
