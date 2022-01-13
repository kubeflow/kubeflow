import { __extends as t, __spreadArray as e, __awaiter as n, __generator as r } from "tslib";

import { getUA as i, isSafari as o, isMobileCordova as s, isReactNative as u, isElectron as a, isIE as c, isUWP as h, isBrowserExtension as f, getModularInstance as l, createMockUserToken as d } from "@firebase/util";

import { Logger as p, LogLevel as y } from "@firebase/logger";

import { XhrIo as v, EventType as m, ErrorCode as g, createWebChannelTransport as w, getStatEventTarget as b, FetchXmlHttpFactory as I, WebChannel as T, Event as E, Stat as _ } from "@firebase/webchannel-wrapper";

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
 */ var S = /** @class */ function() {
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

S.o = -1;

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
var N = {
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
}, D = /** @class */ function(e) {
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
}(Error), A = new p("@firebase/firestore");

/** An error returned by a Firestore operation. */
// Helper methods are needed because variables can't be exported as read/write
function k() {
    return A.logLevel;
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
 */ function C(t) {
    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
    if (A.logLevel <= y.DEBUG) {
        var i = n.map(L);
        A.debug.apply(A, e([ "Firestore (8.8.0): " + t ], i));
    }
}

function x(t) {
    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
    if (A.logLevel <= y.ERROR) {
        var i = n.map(L);
        A.error.apply(A, e([ "Firestore (8.8.0): " + t ], i));
    }
}

function R(t) {
    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
    if (A.logLevel <= y.WARN) {
        var i = n.map(L);
        A.warn.apply(A, e([ "Firestore (8.8.0): " + t ], i));
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function L(t) {
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
 */ function O(t) {
    void 0 === t && (t = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var e = "FIRESTORE (8.8.0) INTERNAL ASSERTION FAILED: " + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
        throw x(e), new Error(e)
    /**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */;
}

function P(t, e) {
    t || O();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function F(t, 
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
 */ function M(t) {
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
        ; n.length < 20; ) for (var r = M(40), i = 0; i < r.length; ++i) 
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
        return n;
    }, t;
}();

function q(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function U(t, e, n) {
    return t.length === e.length && t.every((function(t, r) {
        return n(t, e[r]);
    }));
}

/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */ function B(t) {
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
 */ var j = /** @class */ function() {
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
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new D(N.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new D(N.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new D(N.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new D(N.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
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
        return this.seconds === t.seconds ? q(this.nanoseconds, t.nanoseconds) : q(this.seconds, t.seconds);
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
}(), K = /** @class */ function() {
    function t(t) {
        this.timestamp = t;
    }
    return t.fromTimestamp = function(e) {
        return new t(e);
    }, t.min = function() {
        return new t(new j(0, 0));
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
function Q(t) {
    var e = 0;
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function G(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function z(t) {
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
 */ var W = /** @class */ function() {
    function t(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && O(), void 0 === n ? n = t.length - e : n > t.length - e && O(), 
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
}(), H = /** @class */ function(e) {
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
            if (s.indexOf("//") >= 0) throw new D(N.INVALID_ARGUMENT, "Invalid segment (" + s + "). Paths must not contain // in them.");
            // Strip leading and traling slashed.
                        r.push.apply(r, s.split("/").filter((function(t) {
                return t.length > 0;
            })));
        }
        return new n(r);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(W), Y = /^[_a-zA-Z][_a-zA-Z0-9]*$/, $ = /** @class */ function(e) {
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
        return Y.test(t);
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
            if (0 === r.length) throw new D(N.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            e.push(r), r = "";
        }, s = !1; i < t.length; ) {
            var u = t[i];
            if ("\\" === u) {
                if (i + 1 === t.length) throw new D(N.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                var a = t[i + 1];
                if ("\\" !== a && "." !== a && "`" !== a) throw new D(N.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                r += a, i += 2;
            } else "`" === u ? (s = !s, i++) : "." !== u || s ? (r += u, i++) : (o(), i++);
        }
        if (o(), s) throw new D(N.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new n(e);
    }, n.emptyPath = function() {
        return new n([]);
    }, n;
}(W), X = /** @class */ function() {
    function t(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort($.comparator)
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
}(), J = /** @class */ function() {
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
        return q(this.binaryString, t.binaryString);
    }, t.prototype.isEqual = function(t) {
        return this.binaryString === t.binaryString;
    }, t;
}();

/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 */ J.EMPTY_BYTE_STRING = new J("");

var Z = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */ function tt(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (P(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var e = 0, n = Z.exec(t);
        if (P(!!n), n[1]) {
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
        seconds: et(t.seconds),
        nanos: et(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function et(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function nt(t) {
    return "string" == typeof t ? J.fromBase64String(t) : J.fromUint8Array(t);
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
 */ function rt(t) {
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
 */ function it(t) {
    var e = t.mapValue.fields.__previous_value__;
    return rt(e) ? it(e) : e;
}

/**
 * Returns the local time at which this timestamp was first set.
 */ function ot(t) {
    var e = tt(t.mapValue.fields.__local_write_time__.timestampValue);
    return new j(e.seconds, e.nanos);
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
 */ function st(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function ut(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return 0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */ function at(t) {
    return "number" == typeof t && Number.isInteger(t) && !ut(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
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
 */ var ct = /** @class */ function() {
    function t(t) {
        this.path = t;
    }
    return t.fromPath = function(e) {
        return new t(H.fromString(e));
    }, t.fromName = function(e) {
        return new t(H.fromString(e).popFirst(5));
    }, 
    /** Returns true if the document is in the specified collectionId. */ t.prototype.hasCollectionId = function(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }, t.prototype.isEqual = function(t) {
        return null !== t && 0 === H.comparator(this.path, t.path);
    }, t.prototype.toString = function() {
        return this.path.toString();
    }, t.comparator = function(t, e) {
        return H.comparator(t.path, e.path);
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
        return new t(new H(e.slice()));
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
/** Extracts the backend's type order for the provided value. */ function ht(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? rt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : O();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function ft(t, e) {
    var n = ht(t);
    if (n !== ht(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return ot(t).isEqual(ot(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            var n = tt(t.timestampValue), r = tt(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return nt(t.bytesValue).isEqual(nt(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return et(t.geoPointValue.latitude) === et(e.geoPointValue.latitude) && et(t.geoPointValue.longitude) === et(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return et(t.integerValue) === et(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                var n = et(t.doubleValue), r = et(e.doubleValue);
                return n === r ? ut(n) === ut(r) : isNaN(n) && isNaN(r);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return U(t.arrayValue.values || [], e.arrayValue.values || [], ft);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (Q(n) !== Q(r)) return !1;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !ft(n[i], r[i]))) return !1;
            return !0;
        }(t, e);

      default:
        return O();
    }
}

function lt(t, e) {
    return void 0 !== (t.values || []).find((function(t) {
        return ft(t, e);
    }));
}

function dt(t, e) {
    var n = ht(t), r = ht(e);
    if (n !== r) return q(n, r);
    switch (n) {
      case 0 /* NullValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return q(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            var n = et(t.integerValue || t.doubleValue), r = et(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return pt(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return pt(ot(t), ot(e));

      case 5 /* StringValue */ :
        return q(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            var n = nt(t), r = nt(e);
            return n.compareTo(r);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            for (var n = t.split("/"), r = e.split("/"), i = 0; i < n.length && i < r.length; i++) {
                var o = q(n[i], r[i]);
                if (0 !== o) return o;
            }
            return q(n.length, r.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            var n = q(et(t.latitude), et(e.latitude));
            return 0 !== n ? n : q(et(t.longitude), et(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
                var o = dt(n[i], r[i]);
                if (o) return o;
            }
            return q(n.length, r.length);
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
                var u = q(r[s], o[s]);
                if (0 !== u) return u;
                var a = dt(n[r[s]], i[o[s]]);
                if (0 !== a) return a;
            }
            return q(r.length, o.length);
        }(t.mapValue, e.mapValue);

      default:
        throw O();
    }
}

function pt(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return q(t, e);
    var n = tt(t), r = tt(e), i = q(n.seconds, r.seconds);
    return 0 !== i ? i : q(n.nanos, r.nanos);
}

function yt(t) {
    return vt(t);
}

function vt(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
        var e = tt(t);
        return "time(" + e.seconds + "," + e.nanos + ")";
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? nt(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
    ct.fromName(n).toString()) : "geoPointValue" in t ? "geo(" + (e = t.geoPointValue).latitude + "," + e.longitude + ")" : "arrayValue" in t ? function(t) {
        for (var e = "[", n = !0, r = 0, i = t.values || []; r < i.length; r++) {
            n ? n = !1 : e += ",", e += vt(i[r]);
        }
        return e + "]";
    }(t.arrayValue) : "mapValue" in t ? function(t) {
        for (
        // Iteration order in JavaScript is not guaranteed. To ensure that we generate
        // matching canonical IDs for identical maps, we need to sort the keys.
        var e = "{", n = !0, r = 0, i = Object.keys(t.fields || {}).sort(); r < i.length; r++) {
            var o = i[r];
            n ? n = !1 : e += ",", e += o + ":" + vt(t.fields[o]);
        }
        return e + "}";
    }(t.mapValue) : O();
    var e, n;
}

function mt(t, e) {
    return {
        referenceValue: "projects/" + t.projectId + "/databases/" + t.database + "/documents/" + e.path.canonicalString()
    };
}

/** Returns true if `value` is an IntegerValue . */ function gt(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */ function wt(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function bt(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function It(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function Tt(t) {
    return !!t && "mapValue" in t;
}

/** Creates a deep copy of `source`. */ function Et(t) {
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
        return G(t.mapValue.fields, (function(t, n) {
            return e.mapValue.fields[t] = Et(n);
        })), e;
    }
    if (t.arrayValue) {
        for (var n = {
            arrayValue: {
                values: []
            }
        }, r = 0; r < (t.arrayValue.values || []).length; ++r) n.arrayValue.values[r] = Et(t.arrayValue.values[r]);
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
 */ var _t = /** @class */ function() {
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
        for (var e = this.value, n = 0; n < t.length - 1; ++n) if (!Tt(e = (e.mapValue.fields || {})[t.get(n)])) return null;
        return (e = (e.mapValue.fields || {})[t.lastSegment()]) || null;
    }, 
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    t.prototype.set = function(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = Et(e);
    }, 
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    t.prototype.setAll = function(t) {
        var e = this, n = $.emptyPath(), r = {}, i = [];
        t.forEach((function(t, o) {
            if (!n.isImmediateParentOf(o)) {
                // Insert the accumulated changes at this parent location
                var s = e.getFieldsMap(n);
                e.applyChanges(s, r, i), r = {}, i = [], n = o.popLast();
            }
            t ? r[o.lastSegment()] = Et(t) : i.push(o.lastSegment());
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
        Tt(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
    }, t.prototype.isEqual = function(t) {
        return ft(this.value, t.value);
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
            Tt(r) && r.mapValue.fields || (r = {
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
        G(e, (function(e, n) {
            return t[e] = n;
        }));
        for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r];
            delete t[o];
        }
    }, t.prototype.clone = function() {
        return new t(Et(this.value));
    }, t;
}();

/**
 * Returns a FieldMask built from all fields in a MapValue.
 */ function St(t) {
    var e = [];
    return G(t.fields, (function(t, n) {
        var r = new $([ t ]);
        if (Tt(n)) {
            var i = St(n.mapValue).fields;
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
    })), new X(e)
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

var Nt = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.key = t, this.documentType = e, this.version = n, this.data = r, this.documentState = i
        /**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */;
    }
    return t.newInvalidDocument = function(e) {
        return new t(e, 0 /* INVALID */ , K.min(), _t.empty(), 0 /* SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */
    t.newFoundDocument = function(e, n, r) {
        return new t(e, 1 /* FOUND_DOCUMENT */ , n, r, 0 /* SYNCED */);
    }, 
    /** Creates a new document that is known to not exist at the given version. */ t.newNoDocument = function(e, n) {
        return new t(e, 2 /* NO_DOCUMENT */ , n, _t.empty(), 0 /* SYNCED */);
    }, 
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.newUnknownDocument = function(e, n) {
        return new t(e, 3 /* UNKNOWN_DOCUMENT */ , n, _t.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
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
        return this.version = t, this.documentType = 2 /* NO_DOCUMENT */ , this.data = _t.empty(), 
        this.documentState = 0 /* SYNCED */ , this;
    }, 
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */
    t.prototype.convertToUnknownDocument = function(t) {
        return this.version = t, this.documentType = 3 /* UNKNOWN_DOCUMENT */ , this.data = _t.empty(), 
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
}(), Dt = function(t, e, n, r, i, o, s) {
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
function At(t, e, n, r, i, o, s) {
    return void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
    void 0 === i && (i = null), void 0 === o && (o = null), void 0 === s && (s = null), 
    new Dt(t, e, n, r, i, o, s);
}

function kt(t) {
    var e = F(t);
    if (null === e.h) {
        var n = e.path.canonicalString();
        null !== e.collectionGroup && (n += "|cg:" + e.collectionGroup), n += "|f:", n += e.filters.map((function(t) {
            return function(t) {
                // TODO(b/29183165): Technically, this won't be unique if two values have
                // the same description, such as the int 3 and the string "3". So we should
                // add the types in here somehow, too.
                return t.field.canonicalString() + t.op.toString() + yt(t.value);
            }(t);
        })).join(","), n += "|ob:", n += e.orderBy.map((function(t) {
            return function(t) {
                // TODO(b/29183165): Make this collision robust.
                return t.field.canonicalString() + t.dir;
            }(t);
        })).join(","), st(e.limit) || (n += "|l:", n += e.limit), e.startAt && (n += "|lb:", 
        n += jt(e.startAt)), e.endAt && (n += "|ub:", n += jt(e.endAt)), e.h = n;
    }
    return e.h;
}

function Ct(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (var n = 0; n < t.orderBy.length; n++) if (!Qt(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (var r = 0; r < t.filters.length; r++) if (i = t.filters[r], o = e.filters[r], 
    i.op !== o.op || !i.field.isEqual(o.field) || !ft(i.value, o.value)) return !1;
    var i, o;
    return t.collectionGroup === e.collectionGroup && !!t.path.isEqual(e.path) && !!zt(t.startAt, e.startAt) && zt(t.endAt, e.endAt);
}

function xt(t) {
    return ct.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}

var Rt = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).field = t, i.op = n, i.value = r, i;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return t(n, e), n.create = function(t, e, r) {
        return t.isKeyField() ? "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.l(t, e, r) : new Lt(t, e, r) : "array-contains" /* ARRAY_CONTAINS */ === e ? new Mt(t, r) : "in" /* IN */ === e ? new Vt(t, r) : "not-in" /* NOT_IN */ === e ? new qt(t, r) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Ut(t, r) : new n(t, e, r);
    }, n.l = function(t, e, n) {
        return "in" /* IN */ === e ? new Ot(t, n) : new Pt(t, n);
    }, n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
                return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.m(dt(e, this.value)) : null !== e && ht(this.value) === ht(e) && this.m(dt(e, this.value));
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
            return O();
        }
    }, n.prototype.g = function() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
    }, n;
}((function() {}));

var Lt = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, r) || this).key = ct.fromName(r.referenceValue), 
        i;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = ct.comparator(t.key, this.key);
        return this.m(e);
    }, n;
}(Rt), Ot = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "in" /* IN */ , n) || this).keys = Ft("in" /* IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(Rt), Pt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "not-in" /* NOT_IN */ , n) || this).keys = Ft("not-in" /* NOT_IN */ , n), 
        r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return !this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(Rt);

/** Filter that matches on key fields within an array. */ function Ft(t, e) {
    var n;
    return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((function(t) {
        return ct.fromName(t.referenceValue);
    }));
}

/** A Filter that implements the array-contains operator. */ var Mt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains" /* ARRAY_CONTAINS */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return wt(e) && lt(e.arrayValue, this.value);
    }, n;
}(Rt), Vt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "in" /* IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.data.field(this.field);
        return null !== e && lt(this.value.arrayValue, e);
    }, n;
}(Rt), qt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "not-in" /* NOT_IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        if (lt(this.value.arrayValue, {
            nullValue: "NULL_VALUE"
        })) return !1;
        var e = t.data.field(this.field);
        return null !== e && !lt(this.value.arrayValue, e);
    }, n;
}(Rt), Ut = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = this, n = t.data.field(this.field);
        return !(!wt(n) || !n.arrayValue.values) && n.arrayValue.values.some((function(t) {
            return lt(e.value.arrayValue, t);
        }));
    }, n;
}(Rt), Bt = function(t, e) {
    this.position = t, this.before = e;
};

/** A Filter that implements the IN operator. */ function jt(t) {
    // TODO(b/29183165): Make this collision robust.
    return (t.before ? "b" : "a") + ":" + t.position.map((function(t) {
        return yt(t);
    })).join(",");
}

/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */ var Kt = function(t, e /* ASCENDING */) {
    void 0 === e && (e = "asc"), this.field = t, this.dir = e;
};

function Qt(t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field);
}

/**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */ function Gt(t, e, n) {
    for (var r = 0, i = 0; i < t.position.length; i++) {
        var o = e[i], s = t.position[i];
        if (r = o.field.isKeyField() ? ct.comparator(ct.fromName(s.referenceValue), n.key) : dt(s, n.data.field(o.field)), 
        "desc" /* DESCENDING */ === o.dir && (r *= -1), 0 !== r) break;
    }
    return t.before ? r <= 0 : r < 0;
}

function zt(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.before !== e.before || t.position.length !== e.position.length) return !1;
    for (var n = 0; n < t.position.length; n++) if (!ft(t.position[n], e.position[n])) return !1;
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
 */ var Wt = 
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

/** Creates a new Query instance with the options provided. */ function Ht(t, e, n, r, i, o, s, u) {
    return new Wt(t, e, n, r, i, o, s, u);
}

/** Creates a new Query for a query that matches all documents at `path` */ function Yt(t) {
    return new Wt(t);
}

/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */ function $t(t) {
    return !st(t.limit) && "F" /* First */ === t.limitType;
}

function Xt(t) {
    return !st(t.limit) && "L" /* Last */ === t.limitType;
}

function Jt(t) {
    return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}

function Zt(t) {
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
 */ function te(t) {
    return null !== t.collectionGroup;
}

/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */ function ee(t) {
    var e = F(t);
    if (null === e.p) {
        e.p = [];
        var n = Zt(e), r = Jt(e);
        if (null !== n && null === r) 
        // In order to implicitly add key ordering, we must also add the
        // inequality filter field for it to be a valid query.
        // Note that the default inequality field and key ordering is ascending.
        n.isKeyField() || e.p.push(new Kt(n)), e.p.push(new Kt($.keyField(), "asc" /* ASCENDING */)); else {
            for (var i = !1, o = 0, s = e.explicitOrderBy; o < s.length; o++) {
                var u = s[o];
                e.p.push(u), u.field.isKeyField() && (i = !0);
            }
            if (!i) {
                // The order of the implicit key ordering always matches the last
                // explicit order by
                var a = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc" /* ASCENDING */;
                e.p.push(new Kt($.keyField(), a));
            }
        }
    }
    return e.p;
}

/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */ function ne(t) {
    var e = F(t);
    if (!e.T) if ("F" /* First */ === e.limitType) e.T = At(e.path, e.collectionGroup, ee(e), e.filters, e.limit, e.startAt, e.endAt); else {
        for (
        // Flip the orderBy directions since we want the last results
        var n = [], r = 0, i = ee(e); r < i.length; r++) {
            var o = i[r], s = "desc" /* DESCENDING */ === o.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
            n.push(new Kt(o.field, s));
        }
        // We need to swap the cursors to match the now-flipped query ordering.
                var u = e.endAt ? new Bt(e.endAt.position, !e.endAt.before) : null, a = e.startAt ? new Bt(e.startAt.position, !e.startAt.before) : null;
        // Now return as a LimitType.First query.
                e.T = At(e.path, e.collectionGroup, n, e.filters, e.limit, u, a);
    }
    return e.T;
}

function re(t, e, n) {
    return new Wt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
}

function ie(t, e) {
    return Ct(ne(t), ne(e)) && t.limitType === e.limitType;
}

// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function oe(t) {
    return kt(ne(t)) + "|lt:" + t.limitType;
}

function se(t) {
    return "Query(target=" + function(t) {
        var e = t.path.canonicalString();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
        t.filters.length > 0 && (e += ", filters: [" + t.filters.map((function(t) {
            return (e = t).field.canonicalString() + " " + e.op + " " + yt(e.value);
            /** Returns a debug description for `filter`. */            var e;
            /** Filter that matches on key fields (i.e. '__name__'). */        })).join(", ") + "]"), 
        st(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += ", orderBy: [" + t.orderBy.map((function(t) {
            return function(t) {
                return t.field.canonicalString() + " (" + t.dir + ")";
            }(t);
        })).join(", ") + "]"), t.startAt && (e += ", startAt: " + jt(t.startAt)), t.endAt && (e += ", endAt: " + jt(t.endAt)), 
        "Target(" + e + ")";
    }(ne(t)) + "; limitType=" + t.limitType + ")";
}

/** Returns whether `doc` matches the constraints of `query`. */ function ue(t, e) {
    return e.isFoundDocument() && function(t, e) {
        var n = e.key.path;
        return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : ct.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n);
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
        return !(t.startAt && !Gt(t.startAt, ee(t), e)) && (!t.endAt || !Gt(t.endAt, ee(t), e));
    }(t, e);
}

function ae(t) {
    return function(e, n) {
        for (var r = !1, i = 0, o = ee(t); i < o.length; i++) {
            var s = o[i], u = ce(s, e, n);
            if (0 !== u) return u;
            r = r || s.field.isKeyField();
        }
        return 0;
    };
}

function ce(t, e, n) {
    var r = t.field.isKeyField() ? ct.comparator(e.key, n.key) : function(t, e, n) {
        var r = e.data.field(t), i = n.data.field(t);
        return null !== r && null !== i ? dt(r, i) : O();
    }(t.field, e, n);
    switch (t.dir) {
      case "asc" /* ASCENDING */ :
        return r;

      case "desc" /* DESCENDING */ :
        return -1 * r;

      default:
        return O();
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
 */ function he(t, e) {
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
        doubleValue: ut(e) ? "-0" : e
    };
}

/**
 * Returns an IntegerValue for `value`.
 */ function fe(t) {
    return {
        integerValue: "" + t
    };
}

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */ function le(t, e) {
    return at(e) ? fe(e) : he(t, e);
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
/** Used to represent a field transform on a mutation. */ var de = function() {
    // Make sure that the structural type of `TransformOperation` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this._ = void 0;
};

/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */ function pe(t, e, n) {
    return t instanceof me ? function(t, e) {
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
    }(n, e) : t instanceof ge ? we(t, e) : t instanceof be ? Ie(t, e) : function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        var n = ve(t, e), r = Ee(n) + Ee(t.A);
        return gt(n) && gt(t.A) ? fe(r) : he(t.R, r);
    }(t, e);
}

/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */ function ye(t, e, n) {
    // The server just sends null as the transform result for array operations,
    // so we have to calculate a result the same as we do for local
    // applications.
    return t instanceof ge ? we(t, e) : t instanceof be ? Ie(t, e) : n;
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
 */ function ve(t, e) {
    return t instanceof Te ? gt(n = e) || function(t) {
        return !!t && "doubleValue" in t;
    }(n) ? e : {
        integerValue: 0
    } : null;
    var n;
}

/** Transforms a value into a server-generated timestamp. */ var me = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n;
}(de), ge = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(de);

/** Transforms an array value via a union operation. */ function we(t, e) {
    for (var n = _e(e), r = function(t) {
        n.some((function(e) {
            return ft(e, t);
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

/** Transforms an array value via a remove operation. */ var be = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).elements = t, n;
    }
    return t(n, e), n;
}(de);

function Ie(t, e) {
    for (var n = _e(e), r = function(t) {
        n = n.filter((function(e) {
            return !ft(e, t);
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
 */ var Te = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).R = t, r.A = n, r;
    }
    return t(n, e), n;
}(de);

function Ee(t) {
    return et(t.integerValue || t.doubleValue);
}

function _e(t) {
    return wt(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
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
/** A field path and the TransformOperation to perform upon it. */ var Se = function(t, e) {
    this.field = t, this.transform = e;
};

/** The result of successfully applying a mutation to the backend. */
var Ne = function(
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
}, De = /** @class */ function() {
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
/** Returns true if the preconditions is valid for the given document. */ function Ae(t, e) {
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
 */ var ke = function() {};

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
 */ function Ce(t, e, n) {
    t instanceof Pe ? function(t, e, n) {
        // Unlike applySetMutationToLocalView, if we're applying a mutation to a
        // remote document the server has accepted the mutation so the precondition
        // must have held.
        var r = t.value.clone(), i = Ve(t.fieldTransforms, e, n.transformResults);
        r.setAll(i), e.convertToFoundDocument(n.version, r).setHasCommittedMutations();
    }(t, e, n) : t instanceof Fe ? function(t, e, n) {
        if (Ae(t.precondition, e)) {
            var r = Ve(t.fieldTransforms, e, n.transformResults), i = e.data;
            i.setAll(Me(t)), i.setAll(r), e.convertToFoundDocument(n.version, i).setHasCommittedMutations();
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
 */ function xe(t, e, n) {
    t instanceof Pe ? function(t, e, n) {
        if (Ae(t.precondition, e)) {
            var r = t.value.clone(), i = qe(t.fieldTransforms, n, e);
            r.setAll(i), e.convertToFoundDocument(Oe(e), r).setHasLocalMutations();
        }
    }(t, e, n) : t instanceof Fe ? function(t, e, n) {
        if (Ae(t.precondition, e)) {
            var r = qe(t.fieldTransforms, n, e), i = e.data;
            i.setAll(Me(t)), i.setAll(r), e.convertToFoundDocument(Oe(e), i).setHasLocalMutations();
        }
    }(t, e, n) : function(t, e) {
        Ae(t.precondition, e) && 
        // We don't call `setHasLocalMutations()` since we want to be backwards
        // compatible with the existing SDK behavior.
        e.convertToNoDocument(K.min());
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
 */ function Re(t, e) {
    for (var n = null, r = 0, i = t.fieldTransforms; r < i.length; r++) {
        var o = i[r], s = e.data.field(o.field), u = ve(o.transform, s || null);
        null != u && (null == n && (n = _t.empty()), n.set(o.field, u));
    }
    return n || null;
}

function Le(t, e) {
    return t.type === e.type && !!t.key.isEqual(e.key) && !!t.precondition.isEqual(e.precondition) && !!function(t, e) {
        return void 0 === t && void 0 === e || !(!t || !e) && U(t, e, (function(t, e) {
            return function(t, e) {
                return t.field.isEqual(e.field) && function(t, e) {
                    return t instanceof ge && e instanceof ge || t instanceof be && e instanceof be ? U(t.elements, e.elements, ft) : t instanceof Te && e instanceof Te ? ft(t.A, e.A) : t instanceof me && e instanceof me;
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
 */ function Oe(t) {
    return t.isFoundDocument() ? t.version : K.min();
}

/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */ var Pe = /** @class */ function(e) {
    function n(t, n, r, i) {
        void 0 === i && (i = []);
        var o = this;
        return (o = e.call(this) || this).key = t, o.value = n, o.precondition = r, o.fieldTransforms = i, 
        o.type = 0 /* Set */ , o;
    }
    return t(n, e), n;
}(ke), Fe = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        void 0 === o && (o = []);
        var s = this;
        return (s = e.call(this) || this).key = t, s.data = n, s.fieldMask = r, s.precondition = i, 
        s.fieldTransforms = o, s.type = 1 /* Patch */ , s;
    }
    return t(n, e), n;
}(ke);

function Me(t) {
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

function Ve(t, e, n) {
    var r = new Map;
    P(t.length === n.length);
    for (var i = 0; i < n.length; i++) {
        var o = t[i], s = o.transform, u = e.data.field(o.field);
        r.set(o.field, ye(s, u, n[i]));
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
 */ function qe(t, e, n) {
    for (var r = new Map, i = 0, o = t; i < o.length; i++) {
        var s = o[i], u = s.transform, a = n.data.field(s.field);
        r.set(s.field, pe(u, a, e));
    }
    return r;
}

/** A mutation that deletes the document at the given key. */ var Ue, Be, je = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 2 /* Delete */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n;
}(ke), Ke = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.precondition = n, r.type = 3 /* Verify */ , 
        r.fieldTransforms = [], r;
    }
    return t(n, e), n;
}(ke), Qe = 
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
function Ge(t) {
    switch (t) {
      case N.OK:
        return O();

      case N.CANCELLED:
      case N.UNKNOWN:
      case N.DEADLINE_EXCEEDED:
      case N.RESOURCE_EXHAUSTED:
      case N.INTERNAL:
      case N.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case N.UNAUTHENTICATED:
        return !1;

      case N.INVALID_ARGUMENT:
      case N.NOT_FOUND:
      case N.ALREADY_EXISTS:
      case N.PERMISSION_DENIED:
      case N.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case N.ABORTED:
      case N.OUT_OF_RANGE:
      case N.UNIMPLEMENTED:
      case N.DATA_LOSS:
        return !0;

      default:
        return O();
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
 */ function ze(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return x("GRPC error has no .code"), N.UNKNOWN;
    switch (t) {
      case Ue.OK:
        return N.OK;

      case Ue.CANCELLED:
        return N.CANCELLED;

      case Ue.UNKNOWN:
        return N.UNKNOWN;

      case Ue.DEADLINE_EXCEEDED:
        return N.DEADLINE_EXCEEDED;

      case Ue.RESOURCE_EXHAUSTED:
        return N.RESOURCE_EXHAUSTED;

      case Ue.INTERNAL:
        return N.INTERNAL;

      case Ue.UNAVAILABLE:
        return N.UNAVAILABLE;

      case Ue.UNAUTHENTICATED:
        return N.UNAUTHENTICATED;

      case Ue.INVALID_ARGUMENT:
        return N.INVALID_ARGUMENT;

      case Ue.NOT_FOUND:
        return N.NOT_FOUND;

      case Ue.ALREADY_EXISTS:
        return N.ALREADY_EXISTS;

      case Ue.PERMISSION_DENIED:
        return N.PERMISSION_DENIED;

      case Ue.FAILED_PRECONDITION:
        return N.FAILED_PRECONDITION;

      case Ue.ABORTED:
        return N.ABORTED;

      case Ue.OUT_OF_RANGE:
        return N.OUT_OF_RANGE;

      case Ue.UNIMPLEMENTED:
        return N.UNIMPLEMENTED;

      case Ue.DATA_LOSS:
        return N.DATA_LOSS;

      default:
        return O();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status - An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (Be = Ue || (Ue = {}))[Be.OK = 0] = "OK", Be[Be.CANCELLED = 1] = "CANCELLED", 
Be[Be.UNKNOWN = 2] = "UNKNOWN", Be[Be.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
Be[Be.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Be[Be.NOT_FOUND = 5] = "NOT_FOUND", 
Be[Be.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Be[Be.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
Be[Be.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Be[Be.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
Be[Be.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Be[Be.ABORTED = 10] = "ABORTED", 
Be[Be.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Be[Be.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
Be[Be.INTERNAL = 13] = "INTERNAL", Be[Be.UNAVAILABLE = 14] = "UNAVAILABLE", Be[Be.DATA_LOSS = 15] = "DATA_LOSS";

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
var We = /** @class */ function() {
    function t(t, e) {
        this.comparator = t, this.root = e || Ye.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
        return t.prototype.insert = function(e, n) {
        return new t(this.comparator, this.root.insert(e, n, this.comparator).copy(null, null, Ye.BLACK, null, null));
    }, 
    // Returns a copy of the map, with the specified key removed.
    t.prototype.remove = function(e) {
        return new t(this.comparator, this.root.remove(e, this.comparator).copy(null, null, Ye.BLACK, null, null));
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
        return new He(this.root, null, this.comparator, !1);
    }, t.prototype.getIteratorFrom = function(t) {
        return new He(this.root, t, this.comparator, !1);
    }, t.prototype.getReverseIterator = function() {
        return new He(this.root, null, this.comparator, !0);
    }, t.prototype.getReverseIteratorFrom = function(t) {
        return new He(this.root, t, this.comparator, !0);
    }, t;
}(), He = /** @class */ function() {
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
}(), Ye = /** @class */ function() {
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
        if (this.isRed() && this.left.isRed()) throw O();
        if (this.right.isRed()) throw O();
        var t = this.left.check();
        if (t !== this.right.check()) throw O();
        return t + (this.isRed() ? 0 : 1);
    }, t;
}();

// end SortedMap
// An iterator over an LLRBNode.
// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Ye.EMPTY = null, Ye.RED = !0, Ye.BLACK = !1, 
// end LLRBEmptyNode
Ye.EMPTY = new (/** @class */ function() {
    function t() {
        this.size = 0;
    }
    return Object.defineProperty(t.prototype, "key", {
        get: function() {
            throw O();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
        get: function() {
            throw O();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "color", {
        get: function() {
            throw O();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "left", {
        get: function() {
            throw O();
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            throw O();
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
        return new Ye(t, e);
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
var $e = /** @class */ function() {
    function t(t) {
        this.comparator = t, this.data = new We(this.comparator);
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
        return new Xe(this.data.getIterator());
    }, t.prototype.getIteratorFrom = function(t) {
        return new Xe(this.data.getIteratorFrom(t));
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
}(), Xe = /** @class */ function() {
    function t(t) {
        this.iter = t;
    }
    return t.prototype.getNext = function() {
        return this.iter.getNext().key;
    }, t.prototype.hasNext = function() {
        return this.iter.hasNext();
    }, t;
}(), Je = new We(ct.comparator);

function Ze() {
    return Je;
}

var tn = new We(ct.comparator);

function en() {
    return tn;
}

var nn = new We(ct.comparator);

function rn() {
    return nn;
}

var on = new $e(ct.comparator);

function sn() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = on, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.add(o);
    }
    return n;
}

var un = new $e(q);

function an() {
    return un;
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
 */ var cn = /** @class */ function() {
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
        return r.set(e, hn.createSynthesizedTargetChangeForCurrentChange(e, n)), new t(K.min(), r, an(), Ze(), sn());
    }, t;
}(), hn = /** @class */ function() {
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
        return new t(J.EMPTY_BYTE_STRING, n, sn(), sn(), sn());
    }, t;
}(), fn = function(
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
}, ln = function(t, e) {
    this.targetId = t, this.V = e;
}, dn = function(
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
    void 0 === n && (n = J.EMPTY_BYTE_STRING), void 0 === r && (r = null), this.state = t, 
    this.targetIds = e, this.resumeToken = n, this.cause = r;
}, pn = /** @class */ function() {
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
        this.D = mn(), 
        /** See public getters for explanations of these fields. */
        this.C = J.EMPTY_BYTE_STRING, this.N = !1, 
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
        var t = sn(), e = sn(), n = sn();
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
                O();
            }
        })), new hn(this.C, this.N, t, e, n);
    }, 
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t.prototype.L = function() {
        this.F = !1, this.D = mn();
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
}(), yn = /** @class */ function() {
    function t(t) {
        this.W = t, 
        /** The internal state of all tracked targets. */
        this.G = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.H = Ze(), 
        /** A mapping of document keys to their set of target IDs. */
        this.J = vn(), 
        /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
        this.Y = new $e(q)
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
                O();
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
            if (xt(i)) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                var o = new ct(i.path);
                this.tt(e, o, Nt.newNoDocument(o, K.min()));
            } else P(1 === n); else this.ct(e) !== n && (
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
                if (r.current && xt(o.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    var s = new ct(o.target.path);
                    null !== e.H.get(s) || e.at(i, s) || e.tt(i, s, Nt.newNoDocument(s, t));
                }
                r.$ && (n.set(i, r.M()), r.L());
            }
        }));
        var r = sn();
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
        var i = new cn(t, n, this.Y, this.H, r);
        return this.H = Ze(), this.J = vn(), this.Y = new $e(q), i;
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
        return e || (e = new pn, this.G.set(t, e)), e;
    }, t.prototype.ht = function(t) {
        var e = this.J.get(t);
        return e || (e = new $e(q), this.J = this.J.insert(t, e)), e;
    }, 
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t.prototype.st = function(t) {
        var e = null !== this.ot(t);
        return e || C("WatchChangeAggregator", "Detected inactive target", t), e;
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
        this.G.set(t, new pn), this.W.getRemoteKeysForTarget(t).forEach((function(n) {
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
 */ function vn() {
    return new We(ct.comparator);
}

function mn() {
    return new We(ct.comparator);
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
 */ var gn = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}, wn = {
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
}, bn = function(t, e) {
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
function In(t, e) {
    return t.I ? new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "") + "." + ("000000000" + e.nanoseconds).slice(-9) + "Z" : {
        seconds: "" + e.seconds,
        nanos: e.nanoseconds
    };
}

/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */ function Tn(t, e) {
    return t.I ? e.toBase64() : e.toUint8Array();
}

/**
 * Returns a ByteString based on the proto string value.
 */ function En(t, e) {
    return In(t, e.toTimestamp());
}

function _n(t) {
    return P(!!t), K.fromTimestamp(function(t) {
        var e = tt(t);
        return new j(e.seconds, e.nanos);
    }(t));
}

function Sn(t, e) {
    return function(t) {
        return new H([ "projects", t.projectId, "databases", t.database ]);
    }(t).child("documents").child(e).canonicalString();
}

function Nn(t) {
    var e = H.fromString(t);
    return P($n(e)), e;
}

function Dn(t, e) {
    return Sn(t.databaseId, e.path);
}

function An(t, e) {
    var n = Nn(e);
    if (n.get(1) !== t.databaseId.projectId) throw new D(N.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
    if (n.get(3) !== t.databaseId.database) throw new D(N.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
    return new ct(Rn(n));
}

function kn(t, e) {
    return Sn(t.databaseId, e);
}

function Cn(t) {
    var e = Nn(t);
    // In v1beta1 queries for collections at the root did not have a trailing
    // "/documents". In v1 all resource paths contain "/documents". Preserve the
    // ability to read the v1beta1 form for compatibility with queries persisted
    // in the local target cache.
        return 4 === e.length ? H.emptyPath() : Rn(e);
}

function xn(t) {
    return new H([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
}

function Rn(t) {
    return P(t.length > 4 && "documents" === t.get(4)), t.popFirst(5)
    /** Creates a Document proto from key and fields (but no create/update time) */;
}

function Ln(t, e, n) {
    return {
        name: Dn(t, e),
        fields: n.value.mapValue.fields
    };
}

function On(t, e, n) {
    var r = An(t, e.name), i = _n(e.updateTime), o = new _t({
        mapValue: {
            fields: e.fields
        }
    }), s = Nt.newFoundDocument(r, i, o);
    return n && s.setHasCommittedMutations(), n ? s.setHasCommittedMutations() : s;
}

function Pn(t, e) {
    var n;
    if (e instanceof Pe) n = {
        update: Ln(t, e.key, e.value)
    }; else if (e instanceof je) n = {
        delete: Dn(t, e.key)
    }; else if (e instanceof Fe) n = {
        update: Ln(t, e.key, e.data),
        updateMask: Yn(e.fieldMask)
    }; else {
        if (!(e instanceof Ke)) return O();
        n = {
            verify: Dn(t, e.key)
        };
    }
    return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((function(t) {
        return function(t, e) {
            var n = e.transform;
            if (n instanceof me) return {
                fieldPath: e.field.canonicalString(),
                setToServerValue: "REQUEST_TIME"
            };
            if (n instanceof ge) return {
                fieldPath: e.field.canonicalString(),
                appendMissingElements: {
                    values: n.elements
                }
            };
            if (n instanceof be) return {
                fieldPath: e.field.canonicalString(),
                removeAllFromArray: {
                    values: n.elements
                }
            };
            if (n instanceof Te) return {
                fieldPath: e.field.canonicalString(),
                increment: n.A
            };
            throw O();
        }(0, t);
    }))), e.precondition.isNone || (n.currentDocument = function(t, e) {
        return void 0 !== e.updateTime ? {
            updateTime: En(t, e.updateTime)
        } : void 0 !== e.exists ? {
            exists: e.exists
        } : O();
    }(t, e.precondition)), n;
}

function Fn(t, e) {
    var n = e.currentDocument ? function(t) {
        return void 0 !== t.updateTime ? De.updateTime(_n(t.updateTime)) : void 0 !== t.exists ? De.exists(t.exists) : De.none();
    }(e.currentDocument) : De.none(), r = e.updateTransforms ? e.updateTransforms.map((function(e) {
        return function(t, e) {
            var n = null;
            if ("setToServerValue" in e) P("REQUEST_TIME" === e.setToServerValue), n = new me; else if ("appendMissingElements" in e) {
                var r = e.appendMissingElements.values || [];
                n = new ge(r);
            } else if ("removeAllFromArray" in e) {
                var i = e.removeAllFromArray.values || [];
                n = new be(i);
            } else "increment" in e ? n = new Te(t, e.increment) : O();
            var o = $.fromServerFormat(e.fieldPath);
            return new Se(o, n);
        }(t, e);
    })) : [];
    if (e.update) {
        e.update.name;
        var i = An(t, e.update.name), o = new _t({
            mapValue: {
                fields: e.update.fields
            }
        });
        if (e.updateMask) {
            var s = function(t) {
                var e = t.fieldPaths || [];
                return new X(e.map((function(t) {
                    return $.fromServerFormat(t);
                })));
            }(e.updateMask);
            return new Fe(i, o, s, n, r);
        }
        return new Pe(i, o, n, r);
    }
    if (e.delete) {
        var u = An(t, e.delete);
        return new je(u, n);
    }
    if (e.verify) {
        var a = An(t, e.verify);
        return new Ke(a, n);
    }
    return O();
}

function Mn(t, e) {
    return {
        documents: [ kn(t, e.path) ]
    };
}

function Vn(t, e) {
    // Dissect the path into parent, collectionId, and optional key filter.
    var n = {
        structuredQuery: {}
    }, r = e.path;
    null !== e.collectionGroup ? (n.parent = kn(t, r), n.structuredQuery.from = [ {
        collectionId: e.collectionGroup,
        allDescendants: !0
    } ]) : (n.parent = kn(t, r.popLast()), n.structuredQuery.from = [ {
        collectionId: r.lastSegment()
    } ]);
    var i = function(t) {
        if (0 !== t.length) {
            var e = t.map((function(t) {
                // visible for testing
                return function(t) {
                    if ("==" /* EQUAL */ === t.op) {
                        if (It(t.value)) return {
                            unaryFilter: {
                                field: Gn(t.field),
                                op: "IS_NAN"
                            }
                        };
                        if (bt(t.value)) return {
                            unaryFilter: {
                                field: Gn(t.field),
                                op: "IS_NULL"
                            }
                        };
                    } else if ("!=" /* NOT_EQUAL */ === t.op) {
                        if (It(t.value)) return {
                            unaryFilter: {
                                field: Gn(t.field),
                                op: "IS_NOT_NAN"
                            }
                        };
                        if (bt(t.value)) return {
                            unaryFilter: {
                                field: Gn(t.field),
                                op: "IS_NOT_NULL"
                            }
                        };
                    }
                    return {
                        fieldFilter: {
                            field: Gn(t.field),
                            op: Qn(t.op),
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
                    field: Gn(t.field),
                    direction: Kn(t.dir)
                };
            }(t);
        }));
    }(e.orderBy);
    o && (n.structuredQuery.orderBy = o);
    var s = function(t, e) {
        return t.I || st(e) ? e : {
            value: e
        };
    }(t, e.limit);
    return null !== s && (n.structuredQuery.limit = s), e.startAt && (n.structuredQuery.startAt = Bn(e.startAt)), 
    e.endAt && (n.structuredQuery.endAt = Bn(e.endAt)), n;
}

function qn(t) {
    var e = Cn(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
    if (r > 0) {
        P(1 === r);
        var o = n.from[0];
        o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
    }
    var s = [];
    n.where && (s = Un(n.where));
    var u = [];
    n.orderBy && (u = n.orderBy.map((function(t) {
        return function(t) {
            return new Kt(zn(t.field), 
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
        return st(e = "object" == typeof t ? t.value : t) ? null : e;
    }(n.limit));
    var c = null;
    n.startAt && (c = jn(n.startAt));
    var h = null;
    return n.endAt && (h = jn(n.endAt)), Ht(e, i, u, s, a, "F" /* First */ , c, h);
}

function Un(t) {
    return t ? void 0 !== t.unaryFilter ? [ Hn(t) ] : void 0 !== t.fieldFilter ? [ Wn(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((function(t) {
        return Un(t);
    })).reduce((function(t, e) {
        return t.concat(e);
    })) : O() : [];
}

function Bn(t) {
    return {
        before: t.before,
        values: t.position
    };
}

function jn(t) {
    var e = !!t.before, n = t.values || [];
    return new Bt(n, e);
}

// visible for testing
function Kn(t) {
    return gn[t];
}

function Qn(t) {
    return wn[t];
}

function Gn(t) {
    return {
        fieldPath: t.canonicalString()
    };
}

function zn(t) {
    return $.fromServerFormat(t.fieldPath);
}

function Wn(t) {
    return Rt.create(zn(t.fieldFilter.field), function(t) {
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
            return O();
        }
    }(t.fieldFilter.op), t.fieldFilter.value);
}

function Hn(t) {
    switch (t.unaryFilter.op) {
      case "IS_NAN":
        var e = zn(t.unaryFilter.field);
        return Rt.create(e, "==" /* EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NULL":
        var n = zn(t.unaryFilter.field);
        return Rt.create(n, "==" /* EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "IS_NOT_NAN":
        var r = zn(t.unaryFilter.field);
        return Rt.create(r, "!=" /* NOT_EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NOT_NULL":
        var i = zn(t.unaryFilter.field);
        return Rt.create(i, "!=" /* NOT_EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "OPERATOR_UNSPECIFIED":
      default:
        return O();
    }
}

function Yn(t) {
    var e = [];
    return t.fields.forEach((function(t) {
        return e.push(t.canonicalString());
    })), {
        fieldPaths: e
    };
}

function $n(t) {
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
 */ function Xn(t) {
    for (var e = "", n = 0; n < t.length; n++) e.length > 0 && (e = Zn(e)), e = Jn(t.get(n), e);
    return Zn(e);
}

/** Encodes a single segment of a resource path into the given result */ function Jn(t, e) {
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

/** Encodes a path separator into the given result */ function Zn(t) {
    return t + "";
}

/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */ function tr(t) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    var e = t.length;
    if (P(e >= 2), 2 === e) return P("" === t.charAt(0) && "" === t.charAt(1)), H.emptyPath();
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
        for (var n = e - 2, r = [], i = "", o = 0; o < e; ) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        var s = t.indexOf("", o);
        switch ((s < 0 || s > n) && O(), t.charAt(s + 1)) {
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
            O();
        }
        o = s + 2;
    }
    return new H(r);
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
 */ var er = function(t, e) {
    this.seconds = t, this.nanoseconds = e;
}, nr = function(t, 
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
nr.store = "owner", 
/**
     * The key string used for the single object that exists in the
     * DbPrimaryClient store.
     */
nr.key = "owner";

/**
 * An object to be stored in the 'mutationQueues' store in IndexedDb.
 *
 * Each user gets a single queue of MutationBatches to apply to the server.
 * DbMutationQueue tracks the metadata about the queue.
 */
var rr = function(
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

/** Name of the IndexedDb object store.  */ rr.store = "mutationQueues", 
/** Keys are automatically assigned via the userId property. */
rr.keyPath = "userId";

/**
 * An object to be stored in the 'mutations' store in IndexedDb.
 *
 * Represents a batch of user-level mutations intended to be sent to the server
 * in a single write. Each user-level batch gets a separate DbMutationBatch
 * with a new batchId.
 */
var ir = function(
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

/** Name of the IndexedDb object store.  */ ir.store = "mutations", 
/** Keys are automatically assigned via the userId, batchId properties. */
ir.keyPath = "batchId", 
/** The index name for lookup of mutations by user. */
ir.userMutationsIndex = "userMutationsIndex", 
/** The user mutations index is keyed by [userId, batchId] pairs. */
ir.userMutationsKeyPath = [ "userId", "batchId" ];

/**
 * An object to be stored in the 'documentMutations' store in IndexedDb.
 *
 * A manually maintained index of all the mutation batches that affect a given
 * document key. The rows in this table are references based on the contents of
 * DbMutationBatch.mutations.
 */
var or = /** @class */ function() {
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
        return [ t, Xn(e) ];
    }, 
    /**
     * Creates a full index key of [userId, encodedPath, batchId] for inserting
     * and deleting into the DbDocumentMutations index.
     */
    t.key = function(t, e, n) {
        return [ t, Xn(e), n ];
    }, t;
}();

or.store = "documentMutations", 
/**
     * Because we store all the useful information for this store in the key,
     * there is no useful information to store as the value. The raw (unencoded)
     * path cannot be stored because IndexedDb doesn't store prototype
     * information.
     */
or.PLACEHOLDER = new or;

/**
 * Represents the known absence of a document at a particular version.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */
var sr = function(t, e) {
    this.path = t, this.readTime = e;
}, ur = function(t, e) {
    this.path = t, this.version = e;
}, ar = 
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
 */ ar.store = "remoteDocuments", 
/**
     * An index that provides access to all entries sorted by read time (which
     * corresponds to the last modification time of each row).
     *
     * This index is used to provide a changelog for Multi-Tab.
     */
ar.readTimeIndex = "readTimeIndex", ar.readTimeIndexPath = "readTime", 
/**
     * An index that provides access to documents in a collection sorted by read
     * time.
     *
     * This index is used to allow the RemoteDocumentCache to fetch newly changed
     * documents in a collection.
     */
ar.collectionReadTimeIndex = "collectionReadTimeIndex", ar.collectionReadTimeIndexPath = [ "parentPath", "readTime" ];

/**
 * Contains a single entry that has metadata about the remote document cache.
 */
var cr = 
/**
     * @param byteSize - Approximately the total size in bytes of all the
     * documents in the document cache.
     */
function(t) {
    this.byteSize = t;
};

cr.store = "remoteDocumentGlobal", cr.key = "remoteDocumentGlobalKey";

/**
 * An object to be stored in the 'targets' store in IndexedDb.
 *
 * This is based on and should be kept in sync with the proto used in the iOS
 * client.
 *
 * Each query the client listens to against the server is tracked on disk so
 * that the query can be efficiently resumed on restart.
 */
var hr = function(
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

hr.store = "targets", 
/** Keys are automatically assigned via the targetId property. */
hr.keyPath = "targetId", 
/** The name of the queryTargets index. */
hr.queryTargetsIndexName = "queryTargetsIndex", 
/**
     * The index of all canonicalIds to the targets that they match. This is not
     * a unique mapping because canonicalId does not promise a unique name for all
     * possible queries, so we append the targetId to make the mapping unique.
     */
hr.queryTargetsKeyPath = [ "canonicalId", "targetId" ];

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
var fr = function(
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

/** Name of the IndexedDb object store.  */ fr.store = "targetDocuments", 
/** Keys are automatically assigned via the targetId, path properties. */
fr.keyPath = [ "targetId", "path" ], 
/** The index name for the reverse index. */
fr.documentTargetsIndex = "documentTargetsIndex", 
/** We also need to create the reverse index for these properties. */
fr.documentTargetsKeyPath = [ "path", "targetId" ];

/**
 * A record of global state tracked across all Targets, tracked separately
 * to avoid the need for extra indexes.
 *
 * This should be kept in-sync with the proto used in the iOS client.
 */
var lr = function(
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
 */ lr.key = "targetGlobalKey", lr.store = "targetGlobal";

/**
 * An object representing an association between a Collection id (e.g. 'messages')
 * to a parent path (e.g. '/chats/123') that contains it as a (sub)collection.
 * This is used to efficiently find all collections to query when performing
 * a Collection Group query.
 */
var dr = function(
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

/** Name of the IndexedDb object store. */ dr.store = "collectionParents", 
/** Keys are automatically assigned via the collectionId, parent properties. */
dr.keyPath = [ "collectionId", "parent" ];

/**
 * A record of the metadata state of each client.
 *
 * PORTING NOTE: This is used to synchronize multi-tab state and does not need
 * to be ported to iOS or Android.
 */
var pr = function(
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

/** Name of the IndexedDb object store. */ pr.store = "clientMetadata", 
/** Keys are automatically assigned via the clientId properties. */
pr.keyPath = "clientId";

/**
 * A object representing a bundle loaded by the SDK.
 */
var yr = function(
/** The ID of the loaded bundle. */
t, 
/** The create time of the loaded bundle. */
e, 
/** The schema version of the loaded bundle. */
n) {
    this.bundleId = t, this.createTime = e, this.version = n;
};

/** Name of the IndexedDb object store. */ yr.store = "bundles", yr.keyPath = "bundleId";

/**
 * A object representing a named query loaded by the SDK via a bundle.
 */
var vr = function(
/** The name of the query. */
t, 
/** The read time of the results saved in the bundle from the named query. */
e, 
/** The query saved in the bundle. */
n) {
    this.name = t, this.readTime = e, this.bundledQuery = n;
};

/** Name of the IndexedDb object store. */ vr.store = "namedQueries", vr.keyPath = "name";

// Visible for testing
var mr = e(e([], e(e([], e(e([], e(e([], [ rr.store, ir.store, or.store, ar.store, hr.store, nr.store, lr.store, fr.store ]), [ pr.store ])), [ cr.store ])), [ dr.store ])), [ yr.store, vr.store ]), gr = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.", wr = /** @class */ function() {
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
}(), br = function() {
    var t = this;
    this.promise = new Promise((function(e, n) {
        t.resolve = e, t.reject = n;
    }));
}, Ir = /** @class */ function() {
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
        return this.callbackAttached && O(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(n, this.error) : this.wrapSuccess(e, this.result) : new t((function(t, i) {
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
}(), Tr = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.action = t, this.transaction = e, this.aborted = !1, 
        /**
             * A promise that resolves with the result of the IndexedDb transaction.
             */
        this.ft = new br, this.transaction.oncomplete = function() {
            n.ft.resolve();
        }, this.transaction.onabort = function() {
            e.error ? n.ft.reject(new Sr(t, e.error)) : n.ft.resolve();
        }, this.transaction.onerror = function(e) {
            var r = Cr(e.target.error);
            n.ft.reject(new Sr(t, r));
        };
    }
    return t.open = function(e, n, r, i) {
        try {
            return new t(n, e.transaction(i, r));
        } catch (e) {
            throw new Sr(n, e);
        }
    }, Object.defineProperty(t.prototype, "dt", {
        get: function() {
            return this.ft.promise;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.abort = function(t) {
        t && this.ft.reject(t), this.aborted || (C("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
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
        return new Dr(e);
    }, t;
}(), Er = /** @class */ function() {
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
        12.2 === t._t(i()) && x("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
    }
    /** Deletes the specified database. */    return t.delete = function(t) {
        return C("SimpleDb", "Removing database:", t), Ar(window.indexedDB.deleteDatabase(t)).toPromise();
    }, 
    /** Returns true if IndexedDB is available in the current environment. */ t.yt = function() {
        if ("undefined" == typeof indexedDB) return !1;
        if (t.gt()) return !0;
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
                var e = i(), n = t._t(e), r = 0 < n && n < 10, o = t.Et(e), s = 0 < o && o < 4.5;
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
                return !(e.indexOf("MSIE ") > 0 || e.indexOf("Trident/") > 0 || e.indexOf("Edge/") > 0 || r || s);
    }, 
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    t.gt = function() {
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
                    return this.db ? [ 3 /*break*/ , 2 ] : (C("SimpleDb", "Opening database:", this.name), 
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
                            r(new Sr(t, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
                        }, i.onerror = function(e) {
                            var n = e.target.error;
                            "VersionError" === n.name ? r(new D(N.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : r(new Sr(t, n));
                        }, i.onupgradeneeded = function(t) {
                            C("SimpleDb", 'Database "' + n.name + '" requires upgrade from version:', t.oldVersion);
                            var e = t.target.result;
                            n.wt.Rt(e, i.transaction, t.oldVersion, n.version).next((function() {
                                C("SimpleDb", "Database upgrade to version " + n.version + " complete");
                            }));
                        };
                    })) ]);

                  case 1:
                    e.db = r.sent(), r.label = 2;

                  case 2:
                    return [ 2 /*return*/ , (this.bt && (this.db.onversionchange = function(t) {
                        return n.bt(t);
                    }), this.db) ];
                }
            }));
        }));
    }, t.prototype.vt = function(t) {
        this.bt = t, this.db && (this.db.onversionchange = function(e) {
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
                                return a.db = r.sent(), e = Tr.open(a.db, t, n ? "readonly" : "readwrite", i), u = o(e).catch((function(t) {
                                    // Abort the transaction if there was an error.
                                    return e.abort(t), Ir.reject(t);
                                })).toPromise(), c = {}, u.catch((function() {})), [ 4 /*yield*/ , e.dt ];

                              case 3:
                                return [ 2 /*return*/ , (c.value = (
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                r.sent(), u), c) ];

                              case 4:
                                return h = r.sent(), f = "FirebaseError" !== h.name && s < 3, C("SimpleDb", "Transaction failed with error:", h.message, "Retrying:", f), 
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
}(), _r = /** @class */ function() {
    function t(t) {
        this.Pt = t, this.Vt = !1, this.St = null;
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
            this.Pt = t;
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
        return Ar(this.Pt.delete());
    }, t;
}(), Sr = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, N.UNAVAILABLE, "IndexedDB transaction '" + t + "' failed: " + n) || this).name = "IndexedDbTransactionError", 
        r;
    }
    return t(n, e), n;
}(D);

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
/** Verifies whether `e` is an IndexedDbTransactionError. */ function Nr(t) {
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
 */ var Dr = /** @class */ function() {
    function t(t) {
        this.store = t;
    }
    return t.prototype.put = function(t, e) {
        var n;
        return void 0 !== e ? (C("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (C("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
        n = this.store.put(t)), Ar(n);
    }, 
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */
    t.prototype.add = function(t) {
        return C("SimpleDb", "ADD", this.store.name, t, t), Ar(this.store.add(t));
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
                return Ar(this.store.get(t)).next((function(n) {
            // Normalize nonexistence to null.
            return void 0 === n && (n = null), C("SimpleDb", "GET", e.store.name, t, n), n;
        }));
    }, t.prototype.delete = function(t) {
        return C("SimpleDb", "DELETE", this.store.name, t), Ar(this.store.delete(t));
    }, 
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    t.prototype.count = function() {
        return C("SimpleDb", "COUNT", this.store.name), Ar(this.store.count());
    }, t.prototype.Nt = function(t, e) {
        var n = this.cursor(this.options(t, e)), r = [];
        return this.xt(n, (function(t, e) {
            r.push(e);
        })).next((function() {
            return r;
        }));
    }, t.prototype.Ft = function(t, e) {
        C("SimpleDb", "DELETE ALL", this.store.name);
        var n = this.options(t, e);
        n.kt = !1;
        var r = this.cursor(n);
        return this.xt(r, (function(t, e, n) {
            return n.delete();
        }));
    }, t.prototype.$t = function(t, e) {
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
    t.prototype.Ot = function(t) {
        var e = this.cursor({});
        return new Ir((function(n, r) {
            e.onerror = function(t) {
                var e = Cr(t.target.error);
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
        return new Ir((function(r, i) {
            t.onerror = function(t) {
                i(t.target.error);
            }, t.onsuccess = function(t) {
                var i = t.target.result;
                if (i) {
                    var o = new _r(i), s = e(i.primaryKey, i.value, o);
                    if (s instanceof Ir) {
                        var u = s.catch((function(t) {
                            return o.done(), Ir.reject(t);
                        }));
                        n.push(u);
                    }
                    o.isDone ? r() : null === o.Dt ? i.continue() : i.continue(o.Dt);
                } else r();
            };
        })).next((function() {
            return Ir.waitFor(n);
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
            return t.kt ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }, t;
}();

/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */ function Ar(t) {
    return new Ir((function(e, n) {
        t.onsuccess = function(t) {
            var n = t.target.result;
            e(n);
        }, t.onerror = function(t) {
            var e = Cr(t.target.error);
            n(e);
        };
    }));
}

// Guard so we only report the error once.
var kr = !1;

function Cr(t) {
    var e = Er._t(i());
    if (e >= 12.2 && e < 13) {
        var n = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(n) >= 0) {
            // Wrap error in a more descriptive one.
            var r = new D("internal", "IOS_INDEXEDDB_BUG1: IndexedDb has thrown '" + n + "'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
            return kr || (kr = !0, 
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
 */ var xr = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).Mt = t, r.currentSequenceNumber = n, r;
    }
    return t(n, e), n;
}(wr);

function Rr(t, e) {
    var n = F(t);
    return Er.It(n.Mt, e);
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
 */ var Lr = /** @class */ function() {
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
            i.key.isEqual(t.key) && Ce(i, t, n[r]);
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
            (o = n[e]).key.isEqual(t.key) && xe(o, t, this.localWriteTime);
        }
        // Second, apply all user-provided mutations.
                for (var r = 0, i = this.mutations; r < i.length; r++) {
            var o;
            (o = i[r]).key.isEqual(t.key) && xe(o, t, this.localWriteTime);
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
                        e.applyToLocalView(i), r.isValidDocument() || i.convertToNoDocument(K.min());
        }));
    }, t.prototype.keys = function() {
        return this.mutations.reduce((function(t, e) {
            return t.add(e.key);
        }), sn());
    }, t.prototype.isEqual = function(t) {
        return this.batchId === t.batchId && U(this.mutations, t.mutations, (function(t, e) {
            return Le(t, e);
        })) && U(this.baseMutations, t.baseMutations, (function(t, e) {
            return Le(t, e);
        }));
    }, t;
}(), Or = /** @class */ function() {
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
        P(e.mutations.length === r.length);
        for (var i = rn(), o = e.mutations, s = 0; s < o.length; s++) i = i.insert(o[s].key, r[s].version);
        return new t(e, n, r, i);
    }, t;
}(), Pr = /** @class */ function() {
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
        void 0 === i && (i = K.min()), void 0 === o && (o = K.min()), void 0 === s && (s = J.EMPTY_BYTE_STRING), 
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
}(), Fr = function(t) {
    this.Lt = t;
};

/** The result of applying a mutation batch to the backend. */
/** Decodes a remote document from storage locally to a Document. */ function Mr(t, e) {
    if (e.document) return On(t.Lt, e.document, !!e.hasCommittedMutations);
    if (e.noDocument) {
        var n = ct.fromSegments(e.noDocument.path), r = jr(e.noDocument.readTime), i = Nt.newNoDocument(n, r);
        return e.hasCommittedMutations ? i.setHasCommittedMutations() : i;
    }
    if (e.unknownDocument) {
        var o = ct.fromSegments(e.unknownDocument.path);
        r = jr(e.unknownDocument.version);
        return Nt.newUnknownDocument(o, r);
    }
    return O();
}

/** Encodes a document for storage locally. */ function Vr(t, e, n) {
    var r = qr(n), i = e.key.path.popLast().toArray();
    if (e.isFoundDocument()) {
        var o = function(t, e) {
            return {
                name: Dn(t, e.key),
                fields: e.data.value.mapValue.fields,
                updateTime: In(t, e.version.toTimestamp())
            };
        }(t.Lt, e), s = e.hasCommittedMutations;
        return new ar(
        /* unknownDocument= */ null, 
        /* noDocument= */ null, o, s, r, i);
    }
    if (e.isNoDocument()) {
        var u = e.key.path.toArray(), a = Br(e.version);
        s = e.hasCommittedMutations;
        return new ar(
        /* unknownDocument= */ null, new sr(u, a), 
        /* document= */ null, s, r, i);
    }
    if (e.isUnknownDocument()) {
        var c = e.key.path.toArray(), h = Br(e.version);
        return new ar(new ur(c, h), 
        /* noDocument= */ null, 
        /* document= */ null, 
        /* hasCommittedMutations= */ !0, r, i);
    }
    return O();
}

function qr(t) {
    var e = t.toTimestamp();
    return [ e.seconds, e.nanoseconds ];
}

function Ur(t) {
    var e = new j(t[0], t[1]);
    return K.fromTimestamp(e);
}

function Br(t) {
    var e = t.toTimestamp();
    return new er(e.seconds, e.nanoseconds);
}

function jr(t) {
    var e = new j(t.seconds, t.nanoseconds);
    return K.fromTimestamp(e);
}

/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
/** Decodes a DbMutationBatch into a MutationBatch */ function Kr(t, e) {
    // Squash old transform mutations into existing patch or set mutations.
    // The replacement of representing `transforms` with `update_transforms`
    // on the SDK means that old `transform` mutations stored in IndexedDB need
    // to be updated to `update_transforms`.
    // TODO(b/174608374): Remove this code once we perform a schema migration.
    for (var n = (e.baseMutations || []).map((function(e) {
        return Fn(t.Lt, e);
    })), r = 0; r < e.mutations.length - 1; ++r) {
        var i = e.mutations[r];
        if (r + 1 < e.mutations.length && void 0 !== e.mutations[r + 1].transform) {
            var o = e.mutations[r + 1];
            i.updateTransforms = o.transform.fieldTransforms, e.mutations.splice(r + 1, 1), 
            ++r;
        }
    }
    var s = e.mutations.map((function(e) {
        return Fn(t.Lt, e);
    })), u = j.fromMillis(e.localWriteTimeMs);
    return new Lr(e.batchId, u, n, s);
}

/** Decodes a DbTarget into TargetData */ function Qr(t) {
    var e, n, r = jr(t.readTime), i = void 0 !== t.lastLimboFreeSnapshotVersion ? jr(t.lastLimboFreeSnapshotVersion) : K.min();
    return void 0 !== t.query.documents ? (P(1 === (n = t.query).documents.length), 
    e = ne(Yt(Cn(n.documents[0])))) : e = function(t) {
        return ne(qn(t));
    }(t.query), new Pr(e, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, r, i, J.fromBase64String(t.resumeToken))
    /** Encodes TargetData into a DbTarget for storage locally. */;
}

function Gr(t, e) {
    var n, r = Br(e.snapshotVersion), i = Br(e.lastLimboFreeSnapshotVersion);
    n = xt(e.target) ? Mn(t.Lt, e.target) : Vn(t.Lt, e.target);
    // We can't store the resumeToken as a ByteString in IndexedDb, so we
    // convert it to a base64 string for storage.
    var o = e.resumeToken.toBase64();
    // lastListenSequenceNumber is always 0 until we do real GC.
        return new hr(e.targetId, kt(e.target), r, o, e.sequenceNumber, i, n);
}

/**
 * A helper function for figuring out what kind of query has been stored.
 */
/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */ function zr(t) {
    var e = qn({
        parent: t.parent,
        structuredQuery: t.structuredQuery
    });
    return "LAST" === t.limitType ? re(e, e.limit, "L" /* Last */) : e;
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
 */ var Wr = /** @class */ function() {
    function t() {}
    return t.prototype.getBundleMetadata = function(t, e) {
        return Hr(t).get(e).next((function(t) {
            if (t) return {
                id: (e = t).bundleId,
                createTime: jr(e.createTime),
                version: e.version
            };
            /** Encodes a DbBundle to a BundleMetadata object. */            var e;
            /** Encodes a BundleMetadata to a DbBundle. */        }));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        return Hr(t).put({
            bundleId: (n = e).id,
            createTime: Br(_n(n.createTime)),
            version: n.version
        });
        var n;
        /** Encodes a DbNamedQuery to a NamedQuery. */    }, t.prototype.getNamedQuery = function(t, e) {
        return Yr(t).get(e).next((function(t) {
            if (t) return {
                name: (e = t).name,
                query: zr(e.bundledQuery),
                readTime: jr(e.readTime)
            };
            var e;
            /** Encodes a NamedQuery from a bundle proto to a DbNamedQuery. */        }));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return Yr(t).put(function(t) {
            return {
                name: t.name,
                readTime: Br(_n(t.readTime)),
                bundledQuery: t.bundledQuery
            };
        }(e));
    }, t;
}();

/**
 * Helper to get a typed SimpleDbStore for the bundles object store.
 */ function Hr(t) {
    return Rr(t, yr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the namedQueries object store.
 */ function Yr(t) {
    return Rr(t, vr.store);
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
 */ var $r = /** @class */ function() {
    function t() {
        this.Bt = new Xr;
    }
    return t.prototype.addToCollectionParentIndex = function(t, e) {
        return this.Bt.add(e), Ir.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        return Ir.resolve(this.Bt.getEntries(e));
    }, t;
}(), Xr = /** @class */ function() {
    function t() {
        this.index = {};
    }
    // Returns false if the entry already existed.
        return t.prototype.add = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e] || new $e(H.comparator), i = !r.has(n);
        return this.index[e] = r.add(n), i;
    }, t.prototype.has = function(t) {
        var e = t.lastSegment(), n = t.popLast(), r = this.index[e];
        return r && r.has(n);
    }, t.prototype.getEntries = function(t) {
        return (this.index[t] || new $e(H.comparator)).toArray();
    }, t;
}(), Jr = /** @class */ function() {
    function t() {
        /**
         * An in-memory copy of the index entries we've already written since the SDK
         * launched. Used to avoid re-writing the same entry repeatedly.
         *
         * This is *NOT* a complete cache of what's in persistence and so can never be used to
         * satisfy reads.
         */
        this.qt = new Xr;
    }
    /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */    return t.prototype.addToCollectionParentIndex = function(t, e) {
        var n = this;
        if (!this.qt.has(e)) {
            var r = e.lastSegment(), i = e.popLast();
            t.addOnCommittedListener((function() {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                n.qt.add(e);
            }));
            var o = {
                collectionId: r,
                parent: Xn(i)
            };
            return Zr(t).put(o);
        }
        return Ir.resolve();
    }, t.prototype.getCollectionParents = function(t, e) {
        var n = [], r = IDBKeyRange.bound([ e, "" ], [ B(e), "" ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return Zr(t).Nt(r).next((function(t) {
            for (var r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                                if (o.collectionId !== e) break;
                n.push(tr(o.parent));
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
function Zr(t) {
    return Rr(t, dr.store);
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
 */ var ti = {
    didRun: !1,
    sequenceNumbersCollected: 0,
    targetsRemoved: 0,
    documentsRemoved: 0
}, ei = /** @class */ function() {
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
function ni(t, e, n) {
    var r = t.store(ir.store), i = t.store(or.store), o = [], s = IDBKeyRange.only(n.batchId), u = 0, a = r.$t({
        range: s
    }, (function(t, e, n) {
        return u++, n.delete();
    }));
    o.push(a.next((function() {
        P(1 === u);
    })));
    for (var c = [], h = 0, f = n.mutations; h < f.length; h++) {
        var l = f[h], d = or.key(e, l.key.path, n.batchId);
        o.push(i.delete(d)), c.push(l.key);
    }
    return Ir.waitFor(o).next((function() {
        return c;
    }));
}

/**
 * Returns an approximate size for the given document.
 */ function ri(t) {
    if (!t) return 0;
    var e;
    if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
        if (!t.noDocument) throw O();
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
/** A mutation queue for a specific user, backed by IndexedDB. */ ei.DEFAULT_COLLECTION_PERCENTILE = 10, 
ei.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, ei.DEFAULT = new ei(41943040, ei.DEFAULT_COLLECTION_PERCENTILE, ei.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), 
ei.DISABLED = new ei(-1, 0, 0);

var ii = /** @class */ function() {
    function t(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    t, e, n, r) {
        this.userId = t, this.R = e, this.Ut = n, this.referenceDelegate = r, 
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
    return t.Qt = function(e, n, r, i) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        return P("" !== e.uid), new t(e.isAuthenticated() ? e.uid : "", n, r, i);
    }, t.prototype.checkEmpty = function(t) {
        var e = !0, n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return si(t).$t({
            index: ir.userMutationsIndex,
            range: n
        }, (function(t, n, r) {
            e = !1, r.done();
        })).next((function() {
            return e;
        }));
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this, o = ui(t), s = si(t);
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
            P("number" == typeof u);
            for (var a = new Lr(u, e, n, r), c = function(t, e, n) {
                var r = n.baseMutations.map((function(e) {
                    return Pn(t.Lt, e);
                })), i = n.mutations.map((function(e) {
                    return Pn(t.Lt, e);
                }));
                return new ir(e, n.batchId, n.localWriteTime.toMillis(), r, i);
            }(i.R, i.userId, a), h = [], f = new $e((function(t, e) {
                return q(t.canonicalString(), e.canonicalString());
            })), l = 0, d = r; l < d.length; l++) {
                var p = d[l], y = or.key(i.userId, p.key.path, u);
                f = f.add(p.key.path.popLast()), h.push(s.put(c)), h.push(o.put(y, or.PLACEHOLDER));
            }
            return f.forEach((function(e) {
                h.push(i.Ut.addToCollectionParentIndex(t, e));
            })), t.addOnCommittedListener((function() {
                i.Kt[u] = a.keys();
            })), Ir.waitFor(h).next((function() {
                return a;
            }));
        }));
    }, t.prototype.lookupMutationBatch = function(t, e) {
        var n = this;
        return si(t).get(e).next((function(t) {
            return t ? (P(t.userId === n.userId), Kr(n.R, t)) : null;
        }));
    }, 
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.jt = function(t, e) {
        var n = this;
        return this.Kt[e] ? Ir.resolve(this.Kt[e]) : this.lookupMutationBatch(t, e).next((function(t) {
            if (t) {
                var r = t.keys();
                return n.Kt[e] = r, r;
            }
            return null;
        }));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = this, r = e + 1, i = IDBKeyRange.lowerBound([ this.userId, r ]), o = null;
        return si(t).$t({
            index: ir.userMutationsIndex,
            range: i
        }, (function(t, e, i) {
            e.userId === n.userId && (P(e.batchId >= r), o = Kr(n.R, e)), i.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.getHighestUnacknowledgedBatchId = function(t) {
        var e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]), n = -1;
        return si(t).$t({
            index: ir.userMutationsIndex,
            range: e,
            reverse: !0
        }, (function(t, e, r) {
            n = e.batchId, r.done();
        })).next((function() {
            return n;
        }));
    }, t.prototype.getAllMutationBatches = function(t) {
        var e = this, n = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return si(t).Nt(ir.userMutationsIndex, n).next((function(t) {
            return t.map((function(t) {
                return Kr(e.R, t);
            }));
        }));
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = or.prefixForPath(this.userId, e.path), i = IDBKeyRange.lowerBound(r), o = [];
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
                return ui(t).$t({
            range: i
        }, (function(r, i, s) {
            var u = r[0], a = r[1], c = r[2], h = tr(a);
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
                        if (u === n.userId && e.path.isEqual(h)) 
            // Look up the mutation batch in the store.
            return si(t).get(c).next((function(t) {
                if (!t) throw O();
                P(t.userId === n.userId), o.push(Kr(n.R, t));
            }));
            s.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new $e(q), i = [];
        return e.forEach((function(e) {
            var o = or.prefixForPath(n.userId, e.path), s = IDBKeyRange.lowerBound(o), u = ui(t).$t({
                range: s
            }, (function(t, i, o) {
                var s = t[0], u = t[1], a = t[2], c = tr(u);
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
        })), Ir.waitFor(i).next((function() {
            return n.Wt(t, r);
        }));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        var n = this, r = e.path, i = r.length + 1, o = or.prefixForPath(this.userId, r), s = IDBKeyRange.lowerBound(o), u = new $e(q);
        return ui(t).$t({
            range: s
        }, (function(t, e, o) {
            var s = t[0], a = t[1], c = t[2], h = tr(a);
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
            i.push(si(t).get(e).next((function(t) {
                if (null === t) throw O();
                P(t.userId === n.userId), r.push(Kr(n.R, t));
            })));
        })), Ir.waitFor(i).next((function() {
            return r;
        }));
    }, t.prototype.removeMutationBatch = function(t, e) {
        var n = this;
        return ni(t.Mt, this.userId, e).next((function(r) {
            return t.addOnCommittedListener((function() {
                n.Gt(e.batchId);
            })), Ir.forEach(r, (function(e) {
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
            if (!n) return Ir.resolve();
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
                        var r = IDBKeyRange.lowerBound(or.prefixForUser(e.userId)), i = [];
            return ui(t).$t({
                range: r
            }, (function(t, n, r) {
                if (t[0] === e.userId) {
                    var o = tr(t[1]);
                    i.push(o);
                } else r.done();
            })).next((function() {
                P(0 === i.length);
            }));
        }));
    }, t.prototype.containsKey = function(t, e) {
        return oi(t, this.userId, e);
    }, 
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    t.prototype.zt = function(t) {
        var e = this;
        return ai(t).get(this.userId).next((function(t) {
            return t || new rr(e.userId, -1, 
            /*lastStreamToken=*/ "");
        }));
    }, t;
}();

/**
 * @returns true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */ function oi(t, e, n) {
    var r = or.prefixForPath(e, n.path), i = r[1], o = IDBKeyRange.lowerBound(r), s = !1;
    return ui(t).$t({
        range: o,
        kt: !0
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
 */ function si(t) {
    return Rr(t, ir.store);
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function ui(t) {
    return Rr(t, or.store);
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function ai(t) {
    return Rr(t, rr.store);
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
 */ var ci = /** @class */ function() {
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
}(), hi = /** @class */ function() {
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
            var r = new ci(n.highestTargetId);
            return n.highestTargetId = r.next(), e.Zt(t, n).next((function() {
                return n.highestTargetId;
            }));
        }));
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return this.Xt(t).next((function(t) {
            return K.fromTimestamp(new j(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds));
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
            return fi(t).delete(e.targetId);
        })).next((function() {
            return n.Xt(t);
        })).next((function(e) {
            return P(e.targetCount > 0), e.targetCount -= 1, n.Zt(t, e);
        }));
    }, 
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return fi(t).$t((function(s, u) {
            var a = Qr(u);
            a.sequenceNumber <= e && null === n.get(a.targetId) && (i++, o.push(r.removeTargetData(t, a)));
        })).next((function() {
            return Ir.waitFor(o);
        })).next((function() {
            return i;
        }));
    }, 
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    t.prototype.forEachTarget = function(t, e) {
        return fi(t).$t((function(t, n) {
            var r = Qr(n);
            e(r);
        }));
    }, t.prototype.Xt = function(t) {
        return li(t).get(lr.key).next((function(t) {
            return P(null !== t), t;
        }));
    }, t.prototype.Zt = function(t, e) {
        return li(t).put(lr.key, e);
    }, t.prototype.te = function(t, e) {
        return fi(t).put(Gr(this.R, e));
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
        var n = kt(e), r = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]), i = null;
        return fi(t).$t({
            range: r,
            index: hr.queryTargetsIndexName
        }, (function(t, n, r) {
            var o = Qr(n);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
                        Ct(e, o.target) && (i = o, r.done());
        })).next((function() {
            return i;
        }));
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        var r = this, i = [], o = di(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return e.forEach((function(e) {
            var s = Xn(e.path);
            i.push(o.put(new fr(n, s))), i.push(r.referenceDelegate.addReference(t, n, e));
        })), Ir.waitFor(i);
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        var r = this, i = di(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return Ir.forEach(e, (function(e) {
            var o = Xn(e.path);
            return Ir.waitFor([ i.delete([ n, o ]), r.referenceDelegate.removeReference(t, n, e) ]);
        }));
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        var n = di(t), r = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return n.delete(r);
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), r = di(t), i = sn();
        return r.$t({
            range: n,
            kt: !0
        }, (function(t, e, n) {
            var r = tr(t[1]), o = new ct(r);
            i = i.add(o);
        })).next((function() {
            return i;
        }));
    }, t.prototype.containsKey = function(t, e) {
        var n = Xn(e.path), r = IDBKeyRange.bound([ n ], [ B(n) ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), i = 0;
        return di(t).$t({
            index: fr.documentTargetsIndex,
            kt: !0,
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
        return fi(t).get(e).next((function(t) {
            return t ? Qr(t) : null;
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
function fi(t) {
    return Rr(t, hr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */ function li(t) {
    return Rr(t, lr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */ function di(t) {
    return Rr(t, fr.store);
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
 */ function pi(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            if (t.code !== N.FAILED_PRECONDITION || t.message !== gr) throw t;
            return C("LocalStore", "Unexpectedly lost primary lease"), [ 2 /*return*/ ];
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
 */ function yi(t, e) {
    var n = t[0], r = t[1], i = e[0], o = e[1], s = q(n, i);
    return 0 === s ? q(r, o) : s;
}

/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */ var vi = /** @class */ function() {
    function t(t) {
        this.ne = t, this.buffer = new $e(yi), this.se = 0;
    }
    return t.prototype.ie = function() {
        return ++this.se;
    }, t.prototype.re = function(t) {
        var e = [ t, this.ie() ];
        if (this.buffer.size < this.ne) this.buffer = this.buffer.add(e); else {
            var n = this.buffer.last();
            yi(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e));
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
}(), mi = /** @class */ function() {
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
        C("LruGarbageCollector", "Garbage collection scheduled in " + i + "ms"), this.ce = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection" /* LruGarbageCollection */ , i, (function() {
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
                        return Nr(e = n.sent()) ? (C("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", e), 
                        [ 3 /*break*/ , 6 ]) : [ 3 /*break*/ , 4 ];

                      case 4:
                        return [ 4 /*yield*/ , pi(e) ];

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
}(), gi = /** @class */ function() {
    function t(t, e) {
        this.ae = t, this.params = e;
    }
    return t.prototype.calculateTargetCount = function(t, e) {
        return this.ae.he(t).next((function(t) {
            return Math.floor(e / 100 * t);
        }));
    }, t.prototype.nthSequenceNumber = function(t, e) {
        var n = this;
        if (0 === e) return Ir.resolve(S.o);
        var r = new vi(e);
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
        return -1 === this.params.cacheSizeCollectionThreshold ? (C("LruGarbageCollector", "Garbage collection skipped; disabled"), 
        Ir.resolve(ti)) : this.getCacheSize(t).next((function(r) {
            return r < n.params.cacheSizeCollectionThreshold ? (C("LruGarbageCollector", "Garbage collection skipped; Cache size " + r + " is lower than threshold " + n.params.cacheSizeCollectionThreshold), 
            ti) : n.fe(t, e);
        }));
    }, t.prototype.getCacheSize = function(t) {
        return this.ae.getCacheSize(t);
    }, t.prototype.fe = function(t, e) {
        var n, r, i, o, s, u, a, c = this, h = Date.now();
        return this.calculateTargetCount(t, this.params.percentileToCollect).next((function(e) {
            // Cap at the configured max
            return e > c.params.maximumSequenceNumbersToCollect ? (C("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of " + c.params.maximumSequenceNumbersToCollect + " from " + e), 
            r = c.params.maximumSequenceNumbersToCollect) : r = e, o = Date.now(), c.nthSequenceNumber(t, r);
        })).next((function(r) {
            return n = r, s = Date.now(), c.removeTargets(t, n, e);
        })).next((function(e) {
            return i = e, u = Date.now(), c.removeOrphanedDocuments(t, n);
        })).next((function(t) {
            return a = Date.now(), k() <= y.DEBUG && C("LruGarbageCollector", "LRU Garbage Collection\n\tCounted targets in " + (o - h) + "ms\n\tDetermined least recently used " + r + " in " + (s - o) + "ms\n\tRemoved " + i + " targets in " + (u - s) + "ms\n\tRemoved " + t + " documents in " + (a - u) + "ms\nTotal Duration: " + (a - h) + "ms"), 
            Ir.resolve({
                didRun: !0,
                sequenceNumbersCollected: r,
                targetsRemoved: i,
                documentsRemoved: t
            });
        }));
    }, t;
}(), wi = /** @class */ function() {
    function t(t, e) {
        this.db = t, this.garbageCollector = function(t, e) {
            return new gi(t, e);
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
        return bi(t, n);
    }, t.prototype.removeReference = function(t, e, n) {
        return bi(t, n);
    }, t.prototype.removeTargets = function(t, e, n) {
        return this.db.getTargetCache().removeTargets(t, e, n);
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return bi(t, e);
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
            return ai(t).Ot((function(r) {
                return oi(t, r, e).next((function(t) {
                    return t && (n = !0), Ir.resolve(!t);
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
                        return r.removeEntry(s), di(t).delete([ 0, Xn(s.path) ]);
                    }));
                }));
                i.push(a);
            }
        })).next((function() {
            return Ir.waitFor(i);
        })).next((function() {
            return r.apply(t);
        })).next((function() {
            return o;
        }));
    }, t.prototype.removeTarget = function(t, e) {
        var n = e.withSequenceNumber(t.currentSequenceNumber);
        return this.db.getTargetCache().updateTargetData(t, n);
    }, t.prototype.updateLimboDocument = function(t, e) {
        return bi(t, e);
    }, 
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    t.prototype.we = function(t, e) {
        var n, r = di(t), i = S.o;
        return r.$t({
            index: fr.documentTargetsIndex
        }, (function(t, r) {
            var o = t[0];
            t[1];
            var s = r.path, u = r.sequenceNumber;
            0 === o ? (
            // if nextToReport is valid, report it, this is a new key so the
            // last one must not be a member of any targets.
            i !== S.o && e(new ct(tr(n)), i), 
            // set nextToReport to be this sequence number. It's the next one we
            // might report, if we don't find any targets for this document.
            // Note that the sequence number must be defined when the targetId
            // is 0.
            i = u, n = s) : 
            // set nextToReport to be invalid, we know we don't need to report
            // this one since we found a target for it.
            i = S.o;
        })).next((function() {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            i !== S.o && e(new ct(tr(n)), i);
        }));
    }, t.prototype.getCacheSize = function(t) {
        return this.db.getRemoteDocumentCache().getSize(t);
    }, t;
}();

/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */ function bi(t, e) {
    return di(t).put(
    /**
 * @returns A value suitable for writing a sentinel row in the target-document
 * store.
 */
    function(t, e) {
        return new fr(0, Xn(t.path), e);
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
 */ var Ii = /** @class */ function() {
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
        G(this.inner, (function(e, n) {
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r], s = o[0], u = o[1];
                t(s, u);
            }
        }));
    }, t.prototype.isEmpty = function() {
        return z(this.inner);
    }, t;
}(), Ti = /** @class */ function() {
    function t() {
        // A mapping of document key to the new cache entry that should be written (or null if any
        // existing cache entry should be removed).
        this.changes = new Ii((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), this.changesApplied = !1;
    }
    return t.prototype.getReadTime = function(t) {
        var e = this.changes.get(t);
        return e ? e.readTime : K.min();
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
            document: Nt.newInvalidDocument(t),
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
        return void 0 !== n ? Ir.resolve(n.document) : this.getFromCache(t, e);
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
}(), Ei = /** @class */ function() {
    /**
     * @param serializer - The document serializer.
     * @param indexManager - The query indexes that need to be maintained.
     */
    function t(t, e) {
        this.R = t, this.Ut = e
        /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */;
    }
    return t.prototype.addEntry = function(t, e, n) {
        return Ni(t).put(Di(e), n);
    }, 
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t.prototype.removeEntry = function(t, e) {
        var n = Ni(t), r = Di(e);
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
        return Ni(t).get(Di(e)).next((function(t) {
            return n.ye(e, t);
        }));
    }, 
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document entry and its size.
     */
    t.prototype.ge = function(t, e) {
        var n = this;
        return Ni(t).get(Di(e)).next((function(t) {
            return {
                document: n.ye(e, t),
                size: ri(t)
            };
        }));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = Ze();
        return this.pe(t, e, (function(t, e) {
            var i = n.ye(t, e);
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
        var n = this, r = Ze(), i = new We(ct.comparator);
        return this.pe(t, e, (function(t, e) {
            var o = n.ye(t, e);
            r = r.insert(t, o), i = i.insert(t, ri(e));
        })).next((function() {
            return {
                documents: r,
                Te: i
            };
        }));
    }, t.prototype.pe = function(t, e, n) {
        if (e.isEmpty()) return Ir.resolve();
        var r = IDBKeyRange.bound(e.first().path.toArray(), e.last().path.toArray()), i = e.getIterator(), o = i.getNext();
        return Ni(t).$t({
            range: r
        }, (function(t, e, r) {
            // Go through keys not found in cache.
            for (var s = ct.fromSegments(t); o && ct.comparator(o, s) < 0; ) n(o, null), o = i.getNext();
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
        var r = this, i = Ze(), o = e.path.length + 1, s = {};
        if (n.isEqual(K.min())) {
            // Documents are ordered by key, so we can use a prefix scan to narrow
            // down the documents we need to match the query against.
            var u = e.path.toArray();
            s.range = IDBKeyRange.lowerBound(u);
        } else {
            // Execute an index-free query and filter by read time. This is safe
            // since all document changes to queries that have a
            // lastLimboFreeSnapshotVersion (`sinceReadTime`) have a read time set.
            var a = e.path.toArray(), c = qr(n);
            s.range = IDBKeyRange.lowerBound([ a, c ], 
            /* open= */ !0), s.index = ar.collectionReadTimeIndex;
        }
        return Ni(t).$t(s, (function(t, n, s) {
            // The query is actually returning any path that starts with the query
            // path prefix which may include documents in subcollections. For
            // example, a query on 'rooms' will return rooms/abc/messages/xyx but we
            // shouldn't match it. Fix this by discarding rows with document keys
            // more than one segment longer than the query path.
            if (t.length === o) {
                var u = Mr(r.R, n);
                e.path.isPrefixOf(u.key.path) ? ue(e, u) && (i = i.insert(u.key, u)) : s.done();
            }
        })).next((function() {
            return i;
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        return new _i(this, !!t && t.trackRemovals);
    }, t.prototype.getSize = function(t) {
        return this.getMetadata(t).next((function(t) {
            return t.byteSize;
        }));
    }, t.prototype.getMetadata = function(t) {
        return Si(t).get(cr.key).next((function(t) {
            return P(!!t), t;
        }));
    }, t.prototype.me = function(t, e) {
        return Si(t).put(cr.key, e);
    }, 
    /**
     * Decodes `remoteDoc` and returns the document (or null, if the document
     * corresponds to the format used for sentinel deletes).
     */
    t.prototype.ye = function(t, e) {
        if (e) {
            var n = Mr(this.R, e);
            // Whether the document is a sentinel removal and should only be used in the
            // `getNewDocumentChanges()`
                        if (!n.isNoDocument() || !n.version.isEqual(K.min())) return n;
        }
        return Nt.newInvalidDocument(t);
    }, t;
}(), _i = /** @class */ function(e) {
    /**
     * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).Ie = t, r.trackRemovals = n, 
        // A map of document sizes prior to applying the changes in this buffer.
        r.Ae = new Ii((function(t) {
            return t.toString();
        }), (function(t, e) {
            return t.isEqual(e);
        })), r;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [], r = 0, i = new $e((function(t, e) {
            return q(t.canonicalString(), e.canonicalString());
        }));
        return this.changes.forEach((function(o, s) {
            var u = e.Ae.get(o);
            if (s.document.isValidDocument()) {
                var a = Vr(e.Ie.R, s.document, e.getReadTime(o));
                i = i.add(o.path.popLast());
                var c = ri(a);
                r += c - u, n.push(e.Ie.addEntry(t, o, a));
            } else if (r -= u, e.trackRemovals) {
                // In order to track removals, we store a "sentinel delete" in the
                // RemoteDocumentCache. This entry is represented by a NoDocument
                // with a version of 0 and ignored by `maybeDecodeDocument()` but
                // preserved in `getNewDocumentChanges()`.
                var h = Vr(e.Ie.R, Nt.newNoDocument(o, K.min()), e.getReadTime(o));
                n.push(e.Ie.addEntry(t, o, h));
            } else n.push(e.Ie.removeEntry(t, o));
        })), i.forEach((function(r) {
            n.push(e.Ie.Ut.addToCollectionParentIndex(t, r));
        })), n.push(this.Ie.updateMetadata(t, r)), Ir.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute a delta later.
                return this.Ie.ge(t, e).next((function(t) {
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
}(Ti);

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
 */ function Si(t) {
    return Rr(t, cr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */ function Ni(t) {
    return Rr(t, ar.store);
}

function Di(t) {
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
/** Performs database creation and schema upgrades. */ var Ai = /** @class */ function() {
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
        P(n < r && n >= 0 && r <= 11);
        var o = new Tr("createOrUpgrade", e);
        n < 1 && r >= 1 && (function(t) {
            t.createObjectStore(nr.store);
        }(t), function(t) {
            t.createObjectStore(rr.store, {
                keyPath: rr.keyPath
            }), t.createObjectStore(ir.store, {
                keyPath: ir.keyPath,
                autoIncrement: !0
            }).createIndex(ir.userMutationsIndex, ir.userMutationsKeyPath, {
                unique: !0
            }), t.createObjectStore(or.store);
        }(t), ki(t), function(t) {
            t.createObjectStore(ar.store);
        }(t));
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
        var s = Ir.resolve();
        return n < 3 && r >= 3 && (
        // Brand new clients don't need to drop and recreate--only clients that
        // potentially have corrupt data.
        0 !== n && (function(t) {
            t.deleteObjectStore(fr.store), t.deleteObjectStore(hr.store), t.deleteObjectStore(lr.store);
        }(t), ki(t)), s = s.next((function() {
            /**
     * Creates the target global singleton row.
     *
     * @param txn - The version upgrade transaction for indexeddb
     */
            return function(t) {
                var e = t.store(lr.store), n = new lr(
                /*highestTargetId=*/ 0, 
                /*lastListenSequenceNumber=*/ 0, K.min().toTimestamp(), 
                /*targetCount=*/ 0);
                return e.put(lr.key, n);
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
                return e.store(ir.store).Nt().next((function(n) {
                    t.deleteObjectStore(ir.store), t.createObjectStore(ir.store, {
                        keyPath: ir.keyPath,
                        autoIncrement: !0
                    }).createIndex(ir.userMutationsIndex, ir.userMutationsKeyPath, {
                        unique: !0
                    });
                    var r = e.store(ir.store), i = n.map((function(t) {
                        return r.put(t);
                    }));
                    return Ir.waitFor(i);
                }));
            }(t, o);
        }))), s = s.next((function() {
            !function(t) {
                t.createObjectStore(pr.store, {
                    keyPath: pr.keyPath
                });
            }(t);
        }))), n < 5 && r >= 5 && (s = s.next((function() {
            return i.Re(o);
        }))), n < 6 && r >= 6 && (s = s.next((function() {
            return function(t) {
                t.createObjectStore(cr.store);
            }(t), i.be(o);
        }))), n < 7 && r >= 7 && (s = s.next((function() {
            return i.ve(o);
        }))), n < 8 && r >= 8 && (s = s.next((function() {
            return i.Pe(t, o);
        }))), n < 9 && r >= 9 && (s = s.next((function() {
            // Multi-Tab used to manage its own changelog, but this has been moved
            // to the DbRemoteDocument object store itself. Since the previous change
            // log only contained transient data, we can drop its object store.
            !function(t) {
                t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
            }(t), function(t) {
                var e = t.objectStore(ar.store);
                e.createIndex(ar.readTimeIndex, ar.readTimeIndexPath, {
                    unique: !1
                }), e.createIndex(ar.collectionReadTimeIndex, ar.collectionReadTimeIndexPath, {
                    unique: !1
                });
            }(e);
        }))), n < 10 && r >= 10 && (s = s.next((function() {
            return i.Ve(o);
        }))), n < 11 && r >= 11 && (s = s.next((function() {
            !function(t) {
                t.createObjectStore(yr.store, {
                    keyPath: yr.keyPath
                });
            }(t), function(t) {
                t.createObjectStore(vr.store, {
                    keyPath: vr.keyPath
                });
            }(t);
        }))), s;
    }, t.prototype.be = function(t) {
        var e = 0;
        return t.store(ar.store).$t((function(t, n) {
            e += ri(n);
        })).next((function() {
            var n = new cr(e);
            return t.store(cr.store).put(cr.key, n);
        }));
    }, t.prototype.Re = function(t) {
        var e = this, n = t.store(rr.store), r = t.store(ir.store);
        return n.Nt().next((function(n) {
            return Ir.forEach(n, (function(n) {
                var i = IDBKeyRange.bound([ n.userId, -1 ], [ n.userId, n.lastAcknowledgedBatchId ]);
                return r.Nt(ir.userMutationsIndex, i).next((function(r) {
                    return Ir.forEach(r, (function(r) {
                        P(r.userId === n.userId);
                        var i = Kr(e.R, r);
                        return ni(t, n.userId, i).next((function() {}));
                    }));
                }));
            }));
        }));
    }, 
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    t.prototype.ve = function(t) {
        var e = t.store(fr.store), n = t.store(ar.store);
        return t.store(lr.store).get(lr.key).next((function(t) {
            var r = [];
            return n.$t((function(n, i) {
                var o = new H(n), s = function(t) {
                    return [ 0, Xn(t) ];
                }(o);
                r.push(e.get(s).next((function(n) {
                    return n ? Ir.resolve() : function(n) {
                        return e.put(new fr(0, Xn(n), t.highestListenSequenceNumber));
                    }(o);
                })));
            })).next((function() {
                return Ir.waitFor(r);
            }));
        }));
    }, t.prototype.Pe = function(t, e) {
        // Create the index.
        t.createObjectStore(dr.store, {
            keyPath: dr.keyPath
        });
        var n = e.store(dr.store), r = new Xr, i = function(t) {
            if (r.add(t)) {
                var e = t.lastSegment(), i = t.popLast();
                return n.put({
                    collectionId: e,
                    parent: Xn(i)
                });
            }
        };
        // Helper to add an index entry iff we haven't already written it.
        // Index existing remote documents.
                return e.store(ar.store).$t({
            kt: !0
        }, (function(t, e) {
            var n = new H(t);
            return i(n.popLast());
        })).next((function() {
            return e.store(or.store).$t({
                kt: !0
            }, (function(t, e) {
                t[0];
                var n = t[1];
                t[2];
                var r = tr(n);
                return i(r.popLast());
            }));
        }));
    }, t.prototype.Ve = function(t) {
        var e = this, n = t.store(hr.store);
        return n.$t((function(t, r) {
            var i = Qr(r), o = Gr(e.R, i);
            return n.put(o);
        }));
    }, t;
}();

function ki(t) {
    t.createObjectStore(fr.store, {
        keyPath: fr.keyPath
    }).createIndex(fr.documentTargetsIndex, fr.documentTargetsKeyPath, {
        unique: !0
    }), 
    // NOTE: This is unique only because the TargetId is the suffix.
    t.createObjectStore(hr.store, {
        keyPath: hr.keyPath
    }).createIndex(hr.queryTargetsIndexName, hr.queryTargetsKeyPath, {
        unique: !0
    }), t.createObjectStore(lr.store);
}

var Ci = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.", xi = /** @class */ function() {
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
        this.Fe = null, this.inForeground = !1, 
        /** Our 'visibilitychange' listener if registered. */
        this.ke = null, 
        /** The client metadata refresh task. */
        this.$e = null, 
        /** The last time we garbage collected the client metadata object store. */
        this.Oe = Number.NEGATIVE_INFINITY, 
        /** A listener to notify on primary state changes. */
        this.Me = function(t) {
            return Promise.resolve();
        }, !t.yt()) throw new D(N.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        this.referenceDelegate = new wi(this, i), this.Le = n + "main", this.R = new Fr(a), 
        this.Be = new Er(this.Le, 11, new Ai(this.R)), this.qe = new hi(this.referenceDelegate, this.R), 
        this.Ut = new Jr, this.Ue = function(t, e) {
            return new Ei(t, e);
        }(this.R, this.Ut), this.Ke = new Wr, this.window && this.window.localStorage ? this.Qe = this.window.localStorage : (this.Qe = null, 
        !1 === h && x("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
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
                return this.je().then((function() {
            if (!t.isPrimary && !t.allowTabSynchronization) 
            // Fail `start()` if `synchronizeTabs` is disabled and we cannot
            // obtain the primary lease.
            throw new D(N.FAILED_PRECONDITION, Ci);
            return t.We(), t.Ge(), t.ze(), t.runTransaction("getHighestListenSequenceNumber", "readonly", (function(e) {
                return t.qe.getHighestSequenceNumber(e);
            }));
        })).then((function(e) {
            t.Ne = new S(e, t.De);
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
        this.Be.vt((function(i) {
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
                        return this.started ? [ 4 /*yield*/ , this.je() ] : [ 3 /*break*/ , 2 ];

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
    t.prototype.je = function() {
        var t = this;
        return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (function(e) {
            return Li(e).put(new pr(t.clientId, Date.now(), t.networkEnabled, t.inForeground)).next((function() {
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
            if (Nr(e)) 
            // Proceed with the existing state. Any subsequent access to
            // IndexedDB will verify the lease.
            return C("IndexedDbPersistence", "Failed to extend owner lease: ", e), t.isPrimary;
            if (!t.allowTabSynchronization) throw e;
            return C("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), 
            /* isPrimary= */ !1;
        })).then((function(e) {
            t.isPrimary !== e && t.Se.enqueueRetryable((function() {
                return t.Me(e);
            })), t.isPrimary = e;
        }));
    }, t.prototype.Je = function(t) {
        var e = this;
        return Ri(t).get(nr.key).next((function(t) {
            return Ir.resolve(e.tn(t));
        }));
    }, t.prototype.en = function(t) {
        return Li(t).delete(this.clientId);
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
                    return !this.isPrimary || this.sn(this.Oe, 18e5) ? [ 3 /*break*/ , 2 ] : (this.Oe = Date.now(), 
                    [ 4 /*yield*/ , this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (function(t) {
                        var e = Rr(t, pr.store);
                        return e.Nt().next((function(t) {
                            var n = o.rn(t, 18e5), r = t.filter((function(t) {
                                return -1 === n.indexOf(t);
                            }));
                            // Delete metadata for clients that are no longer considered active.
                                                        return Ir.forEach(r, (function(t) {
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
                    if (t = r.sent(), this.Qe) for (e = 0, n = t; e < n.length; e++) i = n[e], this.Qe.removeItem(this.on(i.clientId));
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
        this.$e = this.Se.enqueueAfterDelay("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, (function() {
            return t.je().then((function() {
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
        return this.Ce ? Ir.resolve(!0) : Ri(t).get(nr.key).next((function(n) {
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
                    throw new D(N.FAILED_PRECONDITION, Ci);
                    return !1;
                }
            }
            return !(!e.networkEnabled || !e.inForeground) || Li(t).Nt().next((function(t) {
                return void 0 === e.rn(t, 5e3).find((function(t) {
                    if (e.clientId !== t.clientId) {
                        var n = !e.networkEnabled && t.networkEnabled, r = !e.inForeground && t.inForeground, i = e.networkEnabled === t.networkEnabled;
                        if (n || r && i) return !0;
                    }
                    return !1;
                }));
            }));
        })).next((function(t) {
            return e.isPrimary !== t && C("IndexedDbPersistence", "Client " + (t ? "is" : "is not") + " eligible for a primary lease."), 
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
                    return this.xe = !1, this.un(), this.$e && (this.$e.cancel(), this.$e = null), this.an(), 
                    this.hn(), [ 4 /*yield*/ , this.Be.runTransaction("shutdown", "readwrite", [ nr.store, pr.store ], (function(e) {
                        var n = new xr(e, S.o);
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
            return Li(e).Nt().next((function(e) {
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
        return ii.Qt(t, this.R, this.Ut, this.referenceDelegate);
    }, t.prototype.getTargetCache = function() {
        return this.qe;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.Ue;
    }, t.prototype.getIndexManager = function() {
        return this.Ut;
    }, t.prototype.getBundleCache = function() {
        return this.Ke;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        C("IndexedDbPersistence", "Starting transaction:", t);
        var i, o = "readonly" === e ? "readonly" : "readwrite";
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
        return this.Be.runTransaction(t, o, mr, (function(o) {
            return i = new xr(o, r.Ne ? r.Ne.next() : S.o), "readwrite-primary" === e ? r.Je(i).next((function(t) {
                return !!t || r.Ye(i);
            })).next((function(e) {
                if (!e) throw x("Failed to obtain primary lease for action '" + t + "'."), r.isPrimary = !1, 
                r.Se.enqueueRetryable((function() {
                    return r.Me(!1);
                })), new D(N.FAILED_PRECONDITION, gr);
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
        return Ri(t).get(nr.key).next((function(t) {
            if (null !== t && e.sn(t.leaseTimestampMs, 5e3) && !e.cn(t.ownerId) && !e.tn(t) && !(e.Ce || e.allowTabSynchronization && t.allowTabSynchronization)) throw new D(N.FAILED_PRECONDITION, Ci);
        }));
    }, 
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    t.prototype.Ze = function(t) {
        var e = new nr(this.clientId, this.allowTabSynchronization, Date.now());
        return Ri(t).put(nr.key, e);
    }, t.yt = function() {
        return Er.yt();
    }, 
    /** Checks the primary lease and removes it if we are the current primary. */ t.prototype.Xe = function(t) {
        var e = this, n = Ri(t);
        return n.get(nr.key).next((function(t) {
            return e.tn(t) ? (C("IndexedDbPersistence", "Releasing primary lease."), n.delete(nr.key)) : Ir.resolve();
        }));
    }, 
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */ t.prototype.sn = function(t, e) {
        var n = Date.now();
        return !(t < n - e || t > n && (x("Detected an update time that is in the future: " + t + " > " + n), 
        1));
    }, t.prototype.We = function() {
        var t = this;
        null !== this.document && "function" == typeof this.document.addEventListener && (this.ke = function() {
            t.Se.enqueueAndForget((function() {
                return t.inForeground = "visible" === t.document.visibilityState, t.je();
            }));
        }, this.document.addEventListener("visibilitychange", this.ke), this.inForeground = "visible" === this.document.visibilityState);
    }, t.prototype.an = function() {
        this.ke && (this.document.removeEventListener("visibilitychange", this.ke), this.ke = null);
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
        "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.Fe = function() {
            // Note: In theory, this should be scheduled on the AsyncQueue since it
            // accesses internal state. We execute this code directly during shutdown
            // to make sure it gets a chance to run.
            e.un(), o() && navigator.appVersion.match("Version/14") && 
            // On Safari 14, we do not run any cleanup actions as it might trigger
            // a bug that prevents Safari from re-opening IndexedDB during the
            // next page load.
            // See https://bugs.webkit.org/show_bug.cgi?id=226547
            e.Se.enterRestrictedMode(/* purgeExistingTasks= */ !0), e.Se.enqueueAndForget((function() {
                return e.shutdown();
            }));
        }, this.window.addEventListener("pagehide", this.Fe));
    }, t.prototype.hn = function() {
        this.Fe && (this.window.removeEventListener("pagehide", this.Fe), this.Fe = null);
    }, 
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    t.prototype.cn = function(t) {
        var e;
        try {
            var n = null !== (null === (e = this.Qe) || void 0 === e ? void 0 : e.getItem(this.on(t)));
            return C("IndexedDbPersistence", "Client '" + t + "' " + (n ? "is" : "is not") + " zombied in LocalStorage"), 
            n;
        } catch (t) {
            // Gracefully handle if LocalStorage isn't working.
            return x("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
        }
    }, 
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    t.prototype.un = function() {
        if (this.Qe) try {
            this.Qe.setItem(this.on(this.clientId), String(Date.now()));
        } catch (t) {
            // Gracefully handle if LocalStorage isn't available / working.
            x("Failed to set zombie client id.", t);
        }
    }, 
    /** Removes the zombied client entry if it exists. */ t.prototype.ln = function() {
        if (this.Qe) try {
            this.Qe.removeItem(this.on(this.clientId));
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
function Ri(t) {
    return Rr(t, nr.store);
}

/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */ function Li(t) {
    return Rr(t, pr.store);
}

/**
 * Generates a string used as a prefix when storing data in IndexedDB and
 * LocalStorage.
 */ function Oi(t, e) {
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

var Pi = function(t, e) {
    this.progress = t, this.wn = e;
}, Fi = /** @class */ function() {
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
            return ct.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
        }(e) ? this.Tn(t, e.path) : te(e) ? this.In(t, e, n) : this.An(t, e, n);
    }, t.prototype.Tn = function(t, e) {
        // Just do a simple document lookup.
        return this.mn(t, new ct(e)).next((function(t) {
            var e = en();
            return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
        }));
    }, t.prototype.In = function(t, e, n) {
        var r = this, i = e.collectionGroup, o = en();
        return this.Ut.getCollectionParents(t, i).next((function(s) {
            return Ir.forEach(s, (function(s) {
                var u = function(t, e) {
                    return new Wt(e, 
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
                    h = Nt.newInvalidDocument(c), r = r.insert(c, h)), xe(a, h, o.localWriteTime), h.isFoundDocument() || (r = r.remove(c));
                }
            }));
        })).next((function() {
            // Finally, filter out any documents that don't actually match
            // the query.
            return r.forEach((function(t, n) {
                ue(e, n) || (r = r.remove(t));
            })), r;
        }));
    }, t.prototype.Rn = function(t, e, n) {
        for (var r = sn(), i = 0, o = e; i < o.length; i++) for (var s = 0, u = o[i].mutations; s < u.length; s++) {
            var a = u[s];
            a instanceof Fe && null === n.get(a.key) && (r = r.add(a.key));
        }
        var c = n;
        return this.Ue.getEntries(t, r).next((function(t) {
            return t.forEach((function(t, e) {
                e.isFoundDocument() && (c = c.insert(t, e));
            })), c;
        }));
    }, t;
}(), Mi = /** @class */ function() {
    function t(t, e, n, r) {
        this.targetId = t, this.fromCache = e, this.bn = n, this.vn = r;
    }
    return t.Pn = function(e, n) {
        for (var r = sn(), i = sn(), o = 0, s = n.docChanges; o < s.length; o++) {
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
}(), Vi = /** @class */ function() {
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
        }(e) || n.isEqual(K.min()) ? this.Dn(t, e) : this.Sn.pn(t, r).next((function(o) {
            var s = i.Cn(e, o);
            return ($t(e) || Xt(e)) && i.Nn(e.limitType, s, r, n) ? i.Dn(t, e) : (k() <= y.DEBUG && C("QueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), se(e)), 
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
        var n = new $e(ae(t));
        return e.forEach((function(e, r) {
            ue(t, r) && (n = n.add(r));
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
        return k() <= y.DEBUG && C("QueryEngine", "Using full collection scan to execute query:", se(e)), 
        this.Sn.getDocumentsMatchingQuery(t, e, K.min());
    }, t;
}(), qi = /** @class */ function() {
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
        this.Fn = new We(q), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.kn = new Ii((function(t) {
            return kt(t);
        }), Ct), 
        /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
        this.$n = K.min(), this._n = t.getMutationQueue(n), this.On = t.getRemoteDocumentCache(), 
        this.qe = t.getTargetCache(), this.Mn = new Fi(this.On, this._n, this.persistence.getIndexManager()), 
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
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */ function Ui(
/** Manages our in-memory or durable persistence. */
t, e, n, r) {
    return new qi(t, e, n, r);
}

/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
// PORTING NOTE: Android and iOS only return the documents affected by the
// change.
function Bi(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = F(t), i = n._n, o = n.Mn, [ 4 /*yield*/ , n.persistence.runTransaction("Handle user change", "readonly", (function(t) {
                    // Swap out the mutation queue, grabbing the pending mutation batches
                    // before and after.
                    var r;
                    return n._n.getAllMutationBatches(t).next((function(s) {
                        return r = s, i = n.persistence.getMutationQueue(e), 
                        // Recreate our LocalDocumentsView using the new
                        // MutationQueue.
                        o = new Fi(n.On, i, n.persistence.getIndexManager()), i.getAllMutationBatches(t);
                    })).next((function(e) {
                        for (var n = [], i = [], s = sn(), u = 0, a = r
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
 */ function ji(t, e) {
    var n = F(t);
    return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (function(t) {
        var r = e.batch.keys(), i = n.On.newChangeBuffer({
            trackRemovals: !0
        });
        return function(t, e, n, r) {
            var i = n.batch, o = i.keys(), s = Ir.resolve();
            return o.forEach((function(t) {
                s = s.next((function() {
                    return r.getEntry(e, t);
                })).next((function(e) {
                    var o = n.docVersions.get(t);
                    P(null !== o), e.version.compareTo(o) < 0 && (i.applyToRemoteDocument(e, n), e.isValidDocument() && 
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
 */ function Ki(t) {
    var e = F(t);
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
 */ function Qi(t, e) {
    var n = F(t), r = e.snapshotVersion, i = n.Fn;
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
                        return P(e.resumeToken.approximateByteSize() > 0), 0 === t.resumeToken.approximateByteSize() || (
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
        var u = Ze();
        // HACK: The only reason we allow a null snapshot version is so that we
        // can synthesize remote events when we get permission denied errors while
        // trying to resolve the state of a locally cached document that is in
        // limbo.
                if (e.documentUpdates.forEach((function(r, i) {
            e.resolvedLimboDocuments.has(r) && s.push(n.persistence.referenceDelegate.updateLimboDocument(t, r));
        })), 
        // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
        // documents in advance in a single call.
        s.push(Gi(t, o, e.documentUpdates, r, void 0).next((function(t) {
            u = t;
        }))), !r.isEqual(K.min())) {
            var a = n.qe.getLastRemoteSnapshotVersion(t).next((function(e) {
                return n.qe.setTargetsMetadata(t, t.currentSequenceNumber, r);
            }));
            s.push(a);
        }
        return Ir.waitFor(s).next((function() {
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
 */ function Gi(t, e, n, r, 
// TODO(wuandy): We could add `readTime` to MaybeDocument instead to remove
// this parameter.
i) {
    var o = sn();
    return n.forEach((function(t) {
        return o = o.add(t);
    })), e.getEntries(t, o).next((function(t) {
        var o = Ze();
        return n.forEach((function(n, s) {
            var u = t.get(n), a = (null == i ? void 0 : i.get(n)) || r;
            // Note: The order of the steps below is important, since we want
            // to ensure that rejected limbo resolutions (which fabricate
            // NoDocuments with SnapshotVersion.min()) never add documents to
            // cache.
                        s.isNoDocument() && s.version.isEqual(K.min()) ? (
            // NoDocuments with SnapshotVersion.min() are used in manufactured
            // events. We remove these documents from cache since we lost
            // access.
            e.removeEntry(n, a), o = o.insert(n, s)) : !u.isValidDocument() || s.version.compareTo(u.version) > 0 || 0 === s.version.compareTo(u.version) && u.hasPendingWrites ? (e.addEntry(s, a), 
            o = o.insert(n, s)) : C("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", u.version, " Watch version:", s.version);
        })), o;
    }))
    /**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */;
}

function zi(t, e) {
    var n = F(t);
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
 */ function Wi(t, e) {
    var n = F(t);
    return n.persistence.runTransaction("Allocate target", "readwrite", (function(t) {
        var r;
        return n.qe.getTargetData(t, e).next((function(i) {
            return i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            r = i, Ir.resolve(r)) : n.qe.allocateTargetId(t).next((function(i) {
                return r = new Pr(e, i, 0 /* Listen */ , t.currentSequenceNumber), n.qe.addTargetData(t, r).next((function() {
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
function Hi(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o, s, u;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = F(t), o = n.Fn.get(e), s = i ? "readwrite" : "readwrite-primary", r.label = 1;

              case 1:
                return r.trys.push([ 1, 4, , 5 ]), i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , n.persistence.runTransaction("Release target", s, (function(t) {
                    return n.persistence.referenceDelegate.removeTarget(t, o);
                })) ];

              case 2:
                r.sent(), r.label = 3;

              case 3:
                return [ 3 /*break*/ , 5 ];

              case 4:
                if (!Nr(u = r.sent())) throw u;
                // All `releaseTarget` does is record the final metadata state for the
                // target, but we've been recording this periodically during target
                // activity. If we lose this write this could cause a very slight
                // difference in the order of target deletion during GC, but we
                // don't define exact LRU semantics so this is acceptable.
                                return C("LocalStore", "Failed to update sequence numbers for target " + e + ": " + u), 
                [ 3 /*break*/ , 5 ];

              case 5:
                return n.Fn = n.Fn.remove(e), n.kn.delete(o.target), [ 2 /*return*/ ];
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
 */ function Yi(t, e, n) {
    var r = F(t), i = K.min(), o = sn();
    return r.persistence.runTransaction("Execute query", "readonly", (function(t) {
        return function(t, e, n) {
            var r = F(t), i = r.kn.get(n);
            return void 0 !== i ? Ir.resolve(r.Fn.get(i)) : r.qe.getTargetData(e, n);
        }(r, t, ne(e)).next((function(e) {
            if (e) return i = e.lastLimboFreeSnapshotVersion, r.qe.getMatchingKeysForTargetId(t, e.targetId).next((function(t) {
                o = t;
            }));
        })).next((function() {
            return r.xn.getDocumentsMatchingQuery(t, e, n ? i : K.min(), n ? o : sn());
        })).next((function(t) {
            return {
                documents: t,
                Bn: o
            };
        }));
    }));
}

// PORTING NOTE: Multi-Tab only.
function $i(t, e) {
    var n = F(t), r = F(n.qe), i = n.Fn.get(e);
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
function Xi(t) {
    var e = F(t);
    return e.persistence.runTransaction("Get new document changes", "readonly", (function(t) {
        return function(t, e, n) {
            var r = F(t), i = Ze(), o = qr(n), s = Ni(e), u = IDBKeyRange.lowerBound(o, !0);
            return s.$t({
                index: ar.readTimeIndex,
                range: u
            }, (function(t, e) {
                // Unlike `getEntry()` and others, `getNewDocumentChanges()` parses
                // the documents directly since we want to keep sentinel deletes.
                var n = Mr(r.R, e);
                i = i.insert(n.key, n), o = e.readTime;
            })).next((function() {
                return {
                    wn: i,
                    readTime: Ur(o)
                };
            }));
        }(e.On, t, e.$n);
    })).then((function(t) {
        var n = t.wn, r = t.readTime;
        return e.$n = r, n;
    }));
}

/**
 * Reads the newest document change from persistence and moves the internal
 * synchronization marker forward so that calls to `getNewDocumentChanges()`
 * only return changes that happened after client initialization.
 */
// PORTING NOTE: Multi-Tab only.
function Ji(t) {
    return n(this, void 0, void 0, (function() {
        var e;
        return r(this, (function(n) {
            return [ 2 /*return*/ , (e = F(t)).persistence.runTransaction("Synchronize last document change read time", "readonly", (function(t) {
                return function(t) {
                    var e = Ni(t), n = K.min();
                    // If there are no existing entries, we return SnapshotVersion.min().
                                        return e.$t({
                        index: ar.readTimeIndex,
                        reverse: !0
                    }, (function(t, e, r) {
                        e.readTime && (n = Ur(e.readTime)), r.done();
                    })).next((function() {
                        return n;
                    }));
                }(t);
            })).then((function(t) {
                e.$n = t;
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
 */ function Zi(t, e, i, o) {
    return n(this, void 0, void 0, (function() {
        var n, s, u, a, c, h, f, l, d, p;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                for (n = F(t), s = sn(), u = Ze(), a = rn(), c = 0, h = i; c < h.length; c++) f = h[c], 
                l = e.qn(f.metadata.name), f.document && (s = s.add(l)), u = u.insert(l, e.Un(f)), 
                a = a.insert(l, e.Kn(f.metadata.readTime));
                return d = n.On.newChangeBuffer({
                    trackRemovals: !0
                }), [ 4 /*yield*/ , Wi(n, function(t) {
                    // It is OK that the path used for the query is not valid, because this will
                    // not be read and queried.
                    return ne(Yt(H.fromString("__bundle__/docs/" + t)));
                }(o)) ];

              case 1:
                // Allocates a target to hold all document keys from the bundle, such that
                // they will not get garbage collected right away.
                return p = r.sent(), [ 2 /*return*/ , n.persistence.runTransaction("Apply bundle documents", "readwrite", (function(t) {
                    return Gi(t, d, u, K.min(), a).next((function(e) {
                        return d.apply(t), e;
                    })).next((function(e) {
                        return n.qe.removeMatchingKeysForTargetId(t, p.targetId).next((function() {
                            return n.qe.addMatchingKeys(t, s, p.targetId);
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
 */ function to(t, e, i) {
    return void 0 === i && (i = sn()), n(this, void 0, void 0, (function() {
        var n, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return [ 4 /*yield*/ , Wi(t, ne(zr(e.bundledQuery))) ];

              case 1:
                return n = r.sent(), [ 2 /*return*/ , (o = F(t)).persistence.runTransaction("Save named query", "readwrite", (function(t) {
                    var r = _n(e.readTime);
                    // Simply save the query itself if it is older than what the SDK already
                    // has.
                                        if (n.snapshotVersion.compareTo(r) >= 0) return o.Ke.saveNamedQuery(t, e);
                    // Update existing target data because the query from the bundle is newer.
                                        var s = n.withResumeToken(J.EMPTY_BYTE_STRING, r);
                    return o.Fn = o.Fn.insert(s.targetId, s), o.qe.updateTargetData(t, s).next((function() {
                        return o.qe.removeMatchingKeysForTargetId(t, n.targetId);
                    })).next((function() {
                        return o.qe.addMatchingKeys(t, i, n.targetId);
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
 */ var eo = /** @class */ function() {
    function t(t) {
        this.R = t, this.Qn = new Map, this.jn = new Map;
    }
    return t.prototype.getBundleMetadata = function(t, e) {
        return Ir.resolve(this.Qn.get(e));
    }, t.prototype.saveBundleMetadata = function(t, e) {
        /** Decodes a BundleMetadata proto into a BundleMetadata object. */
        var n;
        return this.Qn.set(e.id, {
            id: (n = e).id,
            version: n.version,
            createTime: _n(n.createTime)
        }), Ir.resolve();
    }, t.prototype.getNamedQuery = function(t, e) {
        return Ir.resolve(this.jn.get(e));
    }, t.prototype.saveNamedQuery = function(t, e) {
        return this.jn.set(e.name, function(t) {
            return {
                name: t.name,
                query: zr(t.bundledQuery),
                readTime: _n(t.readTime)
            };
        }(e)), Ir.resolve();
    }, t;
}(), no = /** @class */ function() {
    function t() {
        // A set of outstanding references to a document sorted by key.
        this.Wn = new $e(ro.Gn), 
        // A set of outstanding references to a document sorted by target id.
        this.zn = new $e(ro.Hn)
        /** Returns true if the reference set contains no references. */;
    }
    return t.prototype.isEmpty = function() {
        return this.Wn.isEmpty();
    }, 
    /** Adds a reference to the given document key for the given ID. */ t.prototype.addReference = function(t, e) {
        var n = new ro(t, e);
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
        this.Yn(new ro(t, e));
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
        var e = this, n = new ct(new H([])), r = new ro(n, t), i = new ro(n, t + 1), o = [];
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
        var e = new ct(new H([])), n = new ro(e, t), r = new ro(e, t + 1), i = sn();
        return this.zn.forEachInRange([ n, r ], (function(t) {
            i = i.add(t.key);
        })), i;
    }, t.prototype.containsKey = function(t) {
        var e = new ro(t, 0), n = this.Wn.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key);
    }, t;
}(), ro = /** @class */ function() {
    function t(t, e) {
        this.key = t, this.ns = e
        /** Compare by key then by ID */;
    }
    return t.Gn = function(t, e) {
        return ct.comparator(t.key, e.key) || q(t.ns, e.ns);
    }, 
    /** Compare by ID then by key */ t.Hn = function(t, e) {
        return q(t.ns, e.ns) || ct.comparator(t.key, e.key);
    }, t;
}(), io = /** @class */ function() {
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
        this.rs = new $e(ro.Gn);
    }
    return t.prototype.checkEmpty = function(t) {
        return Ir.resolve(0 === this._n.length);
    }, t.prototype.addMutationBatch = function(t, e, n, r) {
        var i = this.ss;
        this.ss++, this._n.length > 0 && this._n[this._n.length - 1];
        var o = new Lr(i, e, n, r);
        this._n.push(o);
        // Track references by document key and index collection parents.
        for (var s = 0, u = r; s < u.length; s++) {
            var a = u[s];
            this.rs = this.rs.add(new ro(a.key, i)), this.Ut.addToCollectionParentIndex(t, a.key.path.popLast());
        }
        return Ir.resolve(o);
    }, t.prototype.lookupMutationBatch = function(t, e) {
        return Ir.resolve(this.os(e));
    }, t.prototype.getNextMutationBatchAfterBatchId = function(t, e) {
        var n = e + 1, r = this.cs(n), i = r < 0 ? 0 : r;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return Ir.resolve(this._n.length > i ? this._n[i] : null);
    }, t.prototype.getHighestUnacknowledgedBatchId = function() {
        return Ir.resolve(0 === this._n.length ? -1 : this.ss - 1);
    }, t.prototype.getAllMutationBatches = function(t) {
        return Ir.resolve(this._n.slice());
    }, t.prototype.getAllMutationBatchesAffectingDocumentKey = function(t, e) {
        var n = this, r = new ro(e, 0), i = new ro(e, Number.POSITIVE_INFINITY), o = [];
        return this.rs.forEachInRange([ r, i ], (function(t) {
            var e = n.os(t.ns);
            o.push(e);
        })), Ir.resolve(o);
    }, t.prototype.getAllMutationBatchesAffectingDocumentKeys = function(t, e) {
        var n = this, r = new $e(q);
        return e.forEach((function(t) {
            var e = new ro(t, 0), i = new ro(t, Number.POSITIVE_INFINITY);
            n.rs.forEachInRange([ e, i ], (function(t) {
                r = r.add(t.ns);
            }));
        })), Ir.resolve(this.us(r));
    }, t.prototype.getAllMutationBatchesAffectingQuery = function(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        var n = e.path, r = n.length + 1, i = n;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
                ct.isDocumentKey(i) || (i = i.child(""));
        var o = new ro(new ct(i), 0), s = new $e(q);
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
        }), o), Ir.resolve(this.us(s));
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
        P(0 === this.hs(e.batchId, "removed")), this._n.shift();
        var r = this.rs;
        return Ir.forEach(e.mutations, (function(i) {
            var o = new ro(i.key, e.batchId);
            return r = r.delete(o), n.referenceDelegate.markPotentiallyOrphaned(t, i.key);
        })).next((function() {
            n.rs = r;
        }));
    }, t.prototype.Gt = function(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }, t.prototype.containsKey = function(t, e) {
        var n = new ro(e, 0), r = this.rs.firstAfterOrEqual(n);
        return Ir.resolve(e.isEqual(r && r.key));
    }, t.prototype.performConsistencyCheck = function(t) {
        return this._n.length, Ir.resolve();
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
}(), oo = /** @class */ function() {
    /**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    function t(t, e) {
        this.Ut = t, this.ls = e, 
        /** Underlying cache of documents and their read times. */
        this.docs = new We(ct.comparator), 
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
        return Ir.resolve(n ? n.document.clone() : Nt.newInvalidDocument(e));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = Ze();
        return e.forEach((function(t) {
            var e = n.docs.get(t);
            r = r.insert(t, e ? e.document.clone() : Nt.newInvalidDocument(t));
        })), Ir.resolve(r);
    }, t.prototype.getDocumentsMatchingQuery = function(t, e, n) {
        for (var r = Ze(), i = new ct(e.path.child("")), o = this.docs.getIteratorFrom(i)
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        ; o.hasNext(); ) {
            var s = o.getNext(), u = s.key, a = s.value, c = a.document, h = a.readTime;
            if (!e.path.isPrefixOf(u.path)) break;
            h.compareTo(n) <= 0 || ue(e, c) && (r = r.insert(c.key, c.clone()));
        }
        return Ir.resolve(r);
    }, t.prototype.fs = function(t, e) {
        return Ir.forEach(this.docs, (function(t) {
            return e(t);
        }));
    }, t.prototype.newChangeBuffer = function(t) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new so(this);
    }, t.prototype.getSize = function(t) {
        return Ir.resolve(this.size);
    }, t;
}(), so = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).Ie = t, n;
    }
    return t(n, e), n.prototype.applyChanges = function(t) {
        var e = this, n = [];
        return this.changes.forEach((function(r, i) {
            i.document.isValidDocument() ? n.push(e.Ie.addEntry(t, i.document, e.getReadTime(r))) : e.Ie.removeEntry(r);
        })), Ir.waitFor(n);
    }, n.prototype.getFromCache = function(t, e) {
        return this.Ie.getEntry(t, e);
    }, n.prototype.getAllFromCache = function(t, e) {
        return this.Ie.getEntries(t, e);
    }, n;
}(Ti), uo = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /**
             * Maps a target to the data about that target
             */
        this.ds = new Ii((function(t) {
            return kt(t);
        }), Ct), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = K.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.ws = 0, 
        /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
        this._s = new no, this.targetCount = 0, this.ys = ci.Jt();
    }
    return t.prototype.forEachTarget = function(t, e) {
        return this.ds.forEach((function(t, n) {
            return e(n);
        })), Ir.resolve();
    }, t.prototype.getLastRemoteSnapshotVersion = function(t) {
        return Ir.resolve(this.lastRemoteSnapshotVersion);
    }, t.prototype.getHighestSequenceNumber = function(t) {
        return Ir.resolve(this.ws);
    }, t.prototype.allocateTargetId = function(t) {
        return this.highestTargetId = this.ys.next(), Ir.resolve(this.highestTargetId);
    }, t.prototype.setTargetsMetadata = function(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.ws && (this.ws = e), 
        Ir.resolve();
    }, t.prototype.te = function(t) {
        this.ds.set(t.target, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.ys = new ci(e), this.highestTargetId = e), t.sequenceNumber > this.ws && (this.ws = t.sequenceNumber);
    }, t.prototype.addTargetData = function(t, e) {
        return this.te(e), this.targetCount += 1, Ir.resolve();
    }, t.prototype.updateTargetData = function(t, e) {
        return this.te(e), Ir.resolve();
    }, t.prototype.removeTargetData = function(t, e) {
        return this.ds.delete(e.target), this._s.Zn(e.targetId), this.targetCount -= 1, 
        Ir.resolve();
    }, t.prototype.removeTargets = function(t, e, n) {
        var r = this, i = 0, o = [];
        return this.ds.forEach((function(s, u) {
            u.sequenceNumber <= e && null === n.get(u.targetId) && (r.ds.delete(s), o.push(r.removeMatchingKeysForTargetId(t, u.targetId)), 
            i++);
        })), Ir.waitFor(o).next((function() {
            return i;
        }));
    }, t.prototype.getTargetCount = function(t) {
        return Ir.resolve(this.targetCount);
    }, t.prototype.getTargetData = function(t, e) {
        var n = this.ds.get(e) || null;
        return Ir.resolve(n);
    }, t.prototype.addMatchingKeys = function(t, e, n) {
        return this._s.Jn(e, n), Ir.resolve();
    }, t.prototype.removeMatchingKeys = function(t, e, n) {
        this._s.Xn(e, n);
        var r = this.persistence.referenceDelegate, i = [];
        return r && e.forEach((function(e) {
            i.push(r.markPotentiallyOrphaned(t, e));
        })), Ir.waitFor(i);
    }, t.prototype.removeMatchingKeysForTargetId = function(t, e) {
        return this._s.Zn(e), Ir.resolve();
    }, t.prototype.getMatchingKeysForTargetId = function(t, e) {
        var n = this._s.es(e);
        return Ir.resolve(n);
    }, t.prototype.containsKey = function(t, e) {
        return Ir.resolve(this._s.containsKey(e));
    }, t;
}(), ao = /** @class */ function() {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    function t(t, e) {
        var n = this;
        this.gs = {}, this.Ne = new S(0), this.xe = !1, this.xe = !0, this.referenceDelegate = t(this), 
        this.qe = new uo(this), this.Ut = new $r, this.Ue = function(t, e) {
            return new oo(t, (function(t) {
                return n.referenceDelegate.ps(t);
            }));
        }(this.Ut), this.R = new Fr(e), this.Ke = new eo(this.R);
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
        return e || (e = new io(this.Ut, this.referenceDelegate), this.gs[t.toKey()] = e), 
        e;
    }, t.prototype.getTargetCache = function() {
        return this.qe;
    }, t.prototype.getRemoteDocumentCache = function() {
        return this.Ue;
    }, t.prototype.getBundleCache = function() {
        return this.Ke;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        C("MemoryPersistence", "Starting transaction:", t);
        var i = new co(this.Ne.next());
        return this.referenceDelegate.Es(), n(i).next((function(t) {
            return r.referenceDelegate.Ts(i).next((function() {
                return t;
            }));
        })).toPromise().then((function(t) {
            return i.raiseOnCommittedEvent(), t;
        }));
    }, t.prototype.Is = function(t, e) {
        return Ir.or(Object.values(this.gs).map((function(n) {
            return function() {
                return n.containsKey(t, e);
            };
        })));
    }, t;
}(), co = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).currentSequenceNumber = t, n;
    }
    return t(n, e), n;
}(wr), ho = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.As = new no, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.Rs = null;
    }
    return t.bs = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "vs", {
        get: function() {
            if (this.Rs) return this.Rs;
            throw O();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.addReference = function(t, e, n) {
        return this.As.addReference(n, e), this.vs.delete(n.toString()), Ir.resolve();
    }, t.prototype.removeReference = function(t, e, n) {
        return this.As.removeReference(n, e), this.vs.add(n.toString()), Ir.resolve();
    }, t.prototype.markPotentiallyOrphaned = function(t, e) {
        return this.vs.add(e.toString()), Ir.resolve();
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
                return Ir.forEach(this.vs, (function(r) {
            var i = ct.fromPath(r);
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
        return Ir.or([ function() {
            return Ir.resolve(n.As.containsKey(e));
        }, function() {
            return n.persistence.getTargetCache().containsKey(t, e);
        }, function() {
            return n.persistence.Is(t, e);
        } ]);
    }, t;
}(), fo = /** @class */ function() {
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
function lo(t, e) {
    return "firestore_clients_" + t + "_" + e;
}

// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>
// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
/** Assembles the key for a mutation batch in WebStorage */ function po(t, e, n) {
    var r = "firestore_mutations_" + t + "_" + n;
    return e.isAuthenticated() && (r += "_" + e.uid), r;
}

// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
/** Assembles the key for a query state in WebStorage */ function yo(t, e) {
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
/** A user with a null UID. */ fo.UNAUTHENTICATED = new fo(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
fo.GOOGLE_CREDENTIALS = new fo("google-credentials-uid"), fo.FIRST_PARTY = new fo("first-party-uid");

var vo = /** @class */ function() {
    function t(t, e, n, r) {
        this.user = t, this.batchId = e, this.state = n, this.error = r
        /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vs = function(e, n, r) {
        var i, o = JSON.parse(r), s = "object" == typeof o && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(o.state) && (void 0 === o.error || "object" == typeof o.error);
        return s && o.error && ((s = "string" == typeof o.error.message && "string" == typeof o.error.code) && (i = new D(o.error.code, o.error.message))), 
        s ? new t(e, n, o.state, i) : (x("SharedClientState", "Failed to parse mutation state for ID '" + n + "': " + r), 
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
}(), mo = /** @class */ function() {
    function t(t, e, n) {
        this.targetId = t, this.state = e, this.error = n
        /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vs = function(e, n) {
        var r, i = JSON.parse(n), o = "object" == typeof i && -1 !== [ "not-current", "current", "rejected" ].indexOf(i.state) && (void 0 === i.error || "object" == typeof i.error);
        return o && i.error && ((o = "string" == typeof i.error.message && "string" == typeof i.error.code) && (r = new D(i.error.code, i.error.message))), 
        o ? new t(e, i.state, r) : (x("SharedClientState", "Failed to parse target state for ID '" + e + "': " + n), 
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
}(), go = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.activeTargetIds = e
        /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vs = function(e, n) {
        for (var r = JSON.parse(n), i = "object" == typeof r && r.activeTargetIds instanceof Array, o = an(), s = 0; i && s < r.activeTargetIds.length; ++s) i = at(r.activeTargetIds[s]), 
        o = o.add(r.activeTargetIds[s]);
        return i ? new t(e, o) : (x("SharedClientState", "Failed to parse client data for instance '" + e + "': " + n), 
        null);
    }, t;
}(), wo = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.onlineState = e
        /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vs = function(e) {
        var n = JSON.parse(e);
        return "object" == typeof n && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(n.onlineState) && "string" == typeof n.clientId ? new t(n.clientId, n.onlineState) : (x("SharedClientState", "Failed to parse online state: " + e), 
        null);
    }, t;
}(), bo = /** @class */ function() {
    function t() {
        this.activeTargetIds = an();
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
}(), Io = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.window = t, this.Se = e, this.persistenceKey = n, this.Ns = r, this.syncEngine = null, 
        this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.xs = this.Fs.bind(this), 
        this.ks = new We(q), this.started = !1, 
        /**
             * Captures WebStorage events that occur before `start()` is called. These
             * events are replayed once `WebStorageSharedClientState` is started.
             */
        this.$s = [];
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        var o = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.window.localStorage, this.currentUser = i, this.Os = lo(this.persistenceKey, this.Ns), 
        this.Ms = 
        /** Assembles the key for the current sequence number. */
        function(t) {
            return "firestore_sequence_number_" + t;
        }(this.persistenceKey), this.ks = this.ks.insert(this.Ns, new bo), this.Ls = new RegExp("^firestore_clients_" + o + "_([^_]*)$"), 
        this.Bs = new RegExp("^firestore_mutations_" + o + "_(\\d+)(?:_(.*))?$"), this.qs = new RegExp("^firestore_targets_" + o + "_(\\d+)$"), 
        this.Us = 
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
    /** Returns 'true' if WebStorage is available in the current environment. */    return t.yt = function(t) {
        return !(!t || !t.localStorage);
    }, t.prototype.start = function() {
        return n(this, void 0, void 0, (function() {
            var t, e, n, i, o, s, u, a, c, h, f, l = this;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.syncEngine.fn() ];

                  case 1:
                    for (t = r.sent(), e = 0, n = t; e < n.length; e++) (i = n[e]) !== this.Ns && (o = this.getItem(lo(this.persistenceKey, i))) && (s = go.Vs(i, o)) && (this.ks = this.ks.insert(s.clientId, s));
                    for (this.Qs(), (u = this.storage.getItem(this.Us)) && (a = this.js(u)) && this.Ws(a), 
                    c = 0, h = this.$s; c < h.length; c++) f = h[c], this.Fs(f);
                    return this.$s = [], 
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
        return this.Gs(this.ks);
    }, t.prototype.isActiveQueryTarget = function(t) {
        var e = !1;
        return this.ks.forEach((function(n, r) {
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
            var n = this.storage.getItem(yo(this.persistenceKey, t));
            if (n) {
                var r = mo.Vs(t, n);
                r && (e = r.state);
            }
        }
        return this.Js.Ds(t), this.Qs(), e;
    }, t.prototype.removeLocalQueryTarget = function(t) {
        this.Js.Cs(t), this.Qs();
    }, t.prototype.isLocalQueryTarget = function(t) {
        return this.Js.activeTargetIds.has(t);
    }, t.prototype.clearQueryState = function(t) {
        this.removeItem(yo(this.persistenceKey, t));
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
        this.started && (this.window.removeEventListener("storage", this.xs), this.removeItem(this.Os), 
        this.started = !1);
    }, t.prototype.getItem = function(t) {
        var e = this.storage.getItem(t);
        return C("SharedClientState", "READ", t, e), e;
    }, t.prototype.setItem = function(t, e) {
        C("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }, t.prototype.removeItem = function(t) {
        C("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }, t.prototype.Fs = function(t) {
        var e = this, i = t;
        // Note: The function is typed to take Event to be interface-compatible with
        // `Window.addEventListener`.
                if (i.storageArea === this.storage) {
            if (C("SharedClientState", "EVENT", i.key, i.newValue), i.key === this.Os) return void x("Received WebStorage notification for local change. Another client might have garbage-collected our state");
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
                            } else if (this.qs.test(i.key)) {
                                if (null !== i.newValue && (o = this.ri(i.key, i.newValue))) return [ 2 /*return*/ , this.oi(o) ];
                            } else if (i.key === this.Us) {
                                if (null !== i.newValue && (s = this.js(i.newValue))) return [ 2 /*return*/ , this.Ws(s) ];
                            } else if (i.key === this.Ms) (u = function(t) {
                                var e = S.o;
                                if (null != t) try {
                                    var n = JSON.parse(t);
                                    P("number" == typeof n), e = n;
                                } catch (t) {
                                    x("SharedClientState", "Failed to read sequence number from WebStorage", t);
                                }
                                return e;
                            }(i.newValue)) !== S.o && this.sequenceNumberHandler(u); else if (i.key === this.Ks) return [ 2 /*return*/ , this.syncEngine.ci() ];
                        } else this.$s.push(i);
                        return [ 2 /*return*/ ];
                    }));
                }));
            }));
        }
    }, Object.defineProperty(t.prototype, "Js", {
        get: function() {
            return this.ks.get(this.Ns);
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.Qs = function() {
        this.setItem(this.Os, this.Js.Ss());
    }, t.prototype.zs = function(t, e, n) {
        var r = new vo(this.currentUser, t, e, n), i = po(this.persistenceKey, this.currentUser, t);
        this.setItem(i, r.Ss());
    }, t.prototype.Hs = function(t) {
        var e = po(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }, t.prototype.Xs = function(t) {
        var e = {
            clientId: this.Ns,
            onlineState: t
        };
        this.storage.setItem(this.Us, JSON.stringify(e));
    }, t.prototype.Ys = function(t, e, n) {
        var r = yo(this.persistenceKey, t), i = new mo(t, e, n);
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
        return go.Vs(n, e);
    }, 
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.si = function(t, e) {
        var n = this.Bs.exec(t), r = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return vo.Vs(new fo(i), r, e);
    }, 
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.ri = function(t, e) {
        var n = this.qs.exec(t), r = Number(n[1]);
        return mo.Vs(r, e);
    }, 
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.js = function(t) {
        return wo.Vs(t);
    }, t.prototype.ii = function(t) {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(e) {
                return t.user.uid === this.currentUser.uid ? [ 2 /*return*/ , this.syncEngine.ui(t.batchId, t.state, t.error) ] : (C("SharedClientState", "Ignoring mutation for non-active user " + t.user.uid), 
                [ 2 /*return*/ ]);
            }));
        }));
    }, t.prototype.oi = function(t) {
        return this.syncEngine.ai(t.targetId, t.state, t.error);
    }, t.prototype.ei = function(t, e) {
        var n = this, r = e ? this.ks.insert(t, e) : this.ks.remove(t), i = this.Gs(this.ks), o = this.Gs(r), s = [], u = [];
        return o.forEach((function(t) {
            i.has(t) || s.push(t);
        })), i.forEach((function(t) {
            o.has(t) || u.push(t);
        })), this.syncEngine.hi(s, u).then((function() {
            n.ks = r;
        }));
    }, t.prototype.Ws = function(t) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        this.ks.get(t.clientId) && this.onlineStateHandler(t.onlineState);
    }, t.prototype.Gs = function(t) {
        var e = an();
        return t.forEach((function(t, n) {
            e = e.unionWith(n.activeTargetIds);
        })), e;
    }, t;
}(), To = /** @class */ function() {
    function t() {
        this.li = new bo, this.fi = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
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
        return this.li = new bo, Promise.resolve();
    }, t.prototype.handleUserChange = function(t, e, n) {
        // No op.
    }, t.prototype.setOnlineState = function(t) {
        // No op.
    }, t.prototype.shutdown = function() {}, t.prototype.writeSequenceNumber = function(t) {}, 
    t.prototype.notifyBundleLoaded = function() {
        // No op.
    }, t;
}(), Eo = /** @class */ function() {
    function t() {}
    return t.prototype.di = function(t) {
        // No-op.
    }, t.prototype.shutdown = function() {
        // No-op.
    }, t;
}(), _o = /** @class */ function() {
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
        C("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.gi; t < e.length; t++) {
            (0, e[t])(0 /* AVAILABLE */);
        }
    }, t.prototype.yi = function() {
        C("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
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
}(), So = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery"
}, No = /** @class */ function() {
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
}(), Do = /** @class */ function(e) {
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
            var s = new v;
            s.listenOnce(m.COMPLETE, (function() {
                try {
                    switch (s.getLastErrorCode()) {
                      case g.NO_ERROR:
                        var e = s.getResponseJson();
                        C("Connection", "XHR received:", JSON.stringify(e)), i(e);
                        break;

                      case g.TIMEOUT:
                        C("Connection", 'RPC "' + t + '" timed out'), o(new D(N.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case g.HTTP_ERROR:
                        var n = s.getStatus();
                        if (C("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", s.getResponseText()), 
                        n > 0) {
                            var r = s.getResponseJson().error;
                            if (r && r.status && r.message) {
                                var u = function(t) {
                                    var e = t.toLowerCase().replace(/_/g, "-");
                                    return Object.values(N).indexOf(e) >= 0 ? e : N.UNKNOWN;
                                }(r.status);
                                o(new D(u, r.message));
                            } else o(new D(N.UNKNOWN, "Server responded with status " + s.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        o(new D(N.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        O();
                    }
                } finally {
                    C("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            var u = JSON.stringify(r);
            s.send(e, "POST", u, n, 15);
        }));
    }, n.prototype.Oi = function(t, e) {
        var n = [ this.Di, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], r = w(), i = b(), o = {
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
        this.useFetchStreams && (o.xmlHttpFactory = new I({})), this.Fi(o.initMessageHeaders, e), 
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
        s() || u() || a() || c() || h() || f() || (o.httpHeadersOverwriteParam = "$httpHeaders");
        var l = n.join("");
        C("Connection", "Creating WebChannel: " + l, o);
        var d = r.createWebChannel(l, o), p = !1, y = !1, v = new No({
            Ei: function(t) {
                y ? C("Connection", "Not sending because WebChannel is closed:", t) : (p || (C("Connection", "Opening WebChannel transport."), 
                d.open(), p = !0), C("Connection", "WebChannel sending:", t), d.send(t));
            },
            Ti: function() {
                return d.close();
            }
        }), m = function(t, e, n) {
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
        return m(d, T.EventType.OPEN, (function() {
            y || C("Connection", "WebChannel transport opened.");
        })), m(d, T.EventType.CLOSE, (function() {
            y || (y = !0, C("Connection", "WebChannel transport closed"), v.Vi());
        })), m(d, T.EventType.ERROR, (function(t) {
            y || (y = !0, R("Connection", "WebChannel transport errored:", t), v.Vi(new D(N.UNAVAILABLE, "The operation could not be completed")));
        })), m(d, T.EventType.MESSAGE, (function(t) {
            var e;
            if (!y) {
                var n = t.data[0];
                P(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                var r = n, i = r.error || (null === (e = r[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    C("Connection", "WebChannel received error:", i);
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
                        var e = Ue[t];
                        if (void 0 !== e) return ze(e);
                    }(o), u = i.message;
                    void 0 === s && (s = N.INTERNAL, u = "Unknown error status: " + o + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    y = !0, v.Vi(new D(s, u)), d.close();
                } else C("Connection", "WebChannel received:", n), v.Si(n);
            }
        })), m(i, E.STAT_EVENT, (function(t) {
            t.stat === _.PROXY ? C("Connection", "Detected buffering proxy") : t.stat === _.NOPROXY && C("Connection", "Detected no buffering proxy");
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
        C("RestConnection", "Sending: ", i, n);
        var o = {};
        return this.Fi(o, r), this.ki(t, i, o, n).then((function(t) {
            return C("RestConnection", "Received: ", t), t;
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
        var n = So[t];
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
function Ao() {
    // `window` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof window ? window : null;
}

/** The Platform's 'document' implementation or null if not available. */ function ko() {
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
 */ function Co(t) {
    return new bn(t, /* useProto3Json= */ !0);
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
 */ var xo = /** @class */ function() {
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
                i > 0 && C("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.qi + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), 
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
}(), Ro = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.Se = t, this.zi = n, this.Hi = r, this.Ji = i, this.listener = o, this.state = 0 /* Initial */ , 
        /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
        this.Yi = 0, this.Xi = null, this.stream = null, this.Zi = new xo(t, e)
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
                    this.Zi.reset() : e && e.code === N.RESOURCE_EXHAUSTED ? (
                    // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                    x(e.toString()), x("Using maximum backoff delay to prevent overloading the backend."), 
                    this.Zi.Qi()) : e && e.code === N.UNAUTHENTICATED && 
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
                var e = new D(N.UNKNOWN, "Fetching auth token failed: " + n.message);
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
        return C("PersistentStream", "close with error: " + t), this.stream = null, this.close(3 /* Error */ , t);
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
                return e.Yi === t ? n() : (C("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve());
            }));
        };
    }, t;
}(), Lo = /** @class */ function(e) {
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
                    return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : O();
                }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], o = function(t, e) {
                    return t.I ? (P(void 0 === e || "string" == typeof e), J.fromBase64String(e || "")) : (P(void 0 === e || e instanceof Uint8Array), 
                    J.fromUint8Array(e || new Uint8Array));
                }(t, e.targetChange.resumeToken), s = (u = e.targetChange.cause) && function(t) {
                    var e = void 0 === t.code ? N.UNKNOWN : ze(t.code);
                    return new D(e, t.message || "");
                }(u);
                n = new dn(r, i, o, s || null);
            } else if ("documentChange" in e) {
                e.documentChange, (r = e.documentChange).document, r.document.name, r.document.updateTime, 
                i = An(t, r.document.name), o = _n(r.document.updateTime);
                var u = new _t({
                    mapValue: {
                        fields: r.document.fields
                    }
                }), a = (s = Nt.newFoundDocument(i, o, u), r.targetIds || []), c = r.removedTargetIds || [];
                n = new fn(a, c, s.key, s);
            } else if ("documentDelete" in e) e.documentDelete, (r = e.documentDelete).document, 
            i = An(t, r.document), o = r.readTime ? _n(r.readTime) : K.min(), u = Nt.newNoDocument(i, o), 
            s = r.removedTargetIds || [], n = new fn([], s, u.key, u); else if ("documentRemove" in e) e.documentRemove, 
            (r = e.documentRemove).document, i = An(t, r.document), o = r.removedTargetIds || [], 
            n = new fn([], o, i, null); else {
                if (!("filter" in e)) return O();
                e.filter;
                var h = e.filter;
                h.targetId, r = h.count || 0, i = new Qe(r), o = h.targetId, n = new ln(o, i);
            }
            return n;
        }(this.R, t), n = function(t) {
            // We have only reached a consistent snapshot for the entire stream if there
            // is a read_time set and it applies to all targets (i.e. the list of
            // targets is empty). The backend is guaranteed to send such responses.
            if (!("targetChange" in t)) return K.min();
            var e = t.targetChange;
            return e.targetIds && e.targetIds.length ? K.min() : e.readTime ? _n(e.readTime) : K.min();
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
        e.database = xn(this.R), e.addTarget = function(t, e) {
            var n, r = e.target;
            return (n = xt(r) ? {
                documents: Mn(t, r)
            } : {
                query: Vn(t, r)
            }).targetId = e.targetId, e.resumeToken.approximateByteSize() > 0 ? n.resumeToken = Tn(t, e.resumeToken) : e.snapshotVersion.compareTo(K.min()) > 0 && (
            // TODO(wuandy): Consider removing above check because it is most likely true.
            // Right now, many tests depend on this behaviour though (leaving min() out
            // of serialization).
            n.readTime = In(t, e.snapshotVersion.toTimestamp())), n;
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
                    return O();
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
        e.database = xn(this.R), e.removeTarget = t, this.cr(e);
    }, n;
}(Ro), Oo = /** @class */ function(e) {
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
        P(!!t.streamToken), this.lastStreamToken = t.streamToken, this.gr) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.Zi.reset();
            var e = function(t, e) {
                return t && t.length > 0 ? (P(void 0 !== e), t.map((function(t) {
                    return function(t, e) {
                        // NOTE: Deletes don't have an updateTime.
                        var n = t.updateTime ? _n(t.updateTime) : _n(e);
                        return n.isEqual(K.min()) && (
                        // The Firestore Emulator currently returns an update time of 0 for
                        // deletes of non-existing documents (rather than null). This breaks the
                        // test "get deleted doc while offline with source=cache" as NoDocuments
                        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
                        // TODO(#2149): Remove this when Emulator is fixed
                        n = _n(e)), new Ne(n, t.transformResults || []);
                    }(t, e);
                }))) : [];
            }(t.writeResults, t.commitTime), n = _n(t.commitTime);
            return this.listener.Tr(n, e);
        }
        // The first response is always the handshake response
                return P(!t.writeResults || 0 === t.writeResults.length), this.gr = !0, 
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
        t.database = xn(this.R), this.cr(t);
    }, 
    /** Sends a group of mutations to the Firestore backend to apply. */ n.prototype.Er = function(t) {
        var e = this, n = {
            streamToken: this.lastStreamToken,
            writes: t.map((function(t) {
                return Pn(e.R, t);
            }))
        };
        this.cr(n);
    }, n;
}(Ro), Po = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).credentials = t, i.Hi = n, i.R = r, i.Rr = !1, 
        i;
    }
    return t(n, e), n.prototype.br = function() {
        if (this.Rr) throw new D(N.FAILED_PRECONDITION, "The client has already been terminated.");
    }, 
    /** Gets an auth token and invokes the provided RPC. */ n.prototype.Ni = function(t, e, n) {
        var r = this;
        return this.br(), this.credentials.getToken().then((function(i) {
            return r.Hi.Ni(t, e, n, i);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === N.UNAUTHENTICATED && r.credentials.invalidateToken(), 
            t) : new D(N.UNKNOWN, t.toString());
        }));
    }, 
    /** Gets an auth token and invokes the provided RPC with streamed results. */ n.prototype.$i = function(t, e, n) {
        var r = this;
        return this.br(), this.credentials.getToken().then((function(i) {
            return r.Hi.$i(t, e, n, i);
        })).catch((function(t) {
            throw "FirebaseError" === t.name ? (t.code === N.UNAUTHENTICATED && r.credentials.invalidateToken(), 
            t) : new D(N.UNKNOWN, t.toString());
        }));
    }, n.prototype.terminate = function() {
        this.Rr = !0;
    }, n;
}((function() {})), Fo = /** @class */ function() {
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
        this.Vr ? (x(e), this.Vr = !1) : C("OnlineStateTracker", e);
    }, t.prototype.Fr = function() {
        null !== this.Pr && (this.Pr.cancel(), this.Pr = null);
    }, t;
}(), Mo = function(
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
            return n(u, void 0, void 0, (function() {
                return r(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return zo(this) ? (C("RemoteStore", "Restarting streams for network reachability change."), 
                        [ 4 /*yield*/ , function(t) {
                            return n(this, void 0, void 0, (function() {
                                var e;
                                return r(this, (function(n) {
                                    switch (n.label) {
                                      case 0:
                                        return (e = F(t)).Or.add(4 /* ConnectivityChange */), [ 4 /*yield*/ , qo(e) ];

                                      case 1:
                                        return n.sent(), e.Br.set("Unknown" /* Unknown */), e.Or.delete(4 /* ConnectivityChange */), 
                                        [ 4 /*yield*/ , Vo(e) ];

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
    })), this.Br = new Fo(i, o);
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
 */ function Vo(t) {
    return n(this, void 0, void 0, (function() {
        var e, n;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                if (!zo(t)) return [ 3 /*break*/ , 4 ];
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
 */ function qo(t) {
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
 */ function Uo(t, e) {
    var n = F(t);
    n.$r.has(e.targetId) || (
    // Mark this as something the client is currently listening for.
    n.$r.set(e.targetId, e), Go(n) ? 
    // The listen will be sent in onWatchStreamOpen
    Qo(n) : us(n).er() && jo(n, e));
}

/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */ function Bo(t, e) {
    var n = F(t), r = us(n);
    n.$r.delete(e), r.er() && Ko(n, e), 0 === n.$r.size && (r.er() ? r.ir() : zo(n) && 
    // Revert to OnlineState.Unknown if the watch stream is not open and we
    // have no listeners, since without any listens to send we cannot
    // confirm if the stream is healthy and upgrade to OnlineState.Online.
    n.Br.set("Unknown" /* Unknown */));
}

/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */ function jo(t, e) {
    t.qr.U(e.targetId), us(t).mr(e)
    /**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */;
}

function Ko(t, e) {
    t.qr.U(e), us(t).yr(e);
}

function Qo(t) {
    t.qr = new yn({
        getRemoteKeysForTarget: function(e) {
            return t.remoteSyncer.getRemoteKeysForTarget(e);
        },
        lt: function(e) {
            return t.$r.get(e) || null;
        }
    }), us(t).start(), t.Br.Sr()
    /**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */;
}

function Go(t) {
    return zo(t) && !us(t).tr() && t.$r.size > 0;
}

function zo(t) {
    return 0 === F(t).Or.size;
}

function Wo(t) {
    t.qr = void 0;
}

function Ho(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            return t.$r.forEach((function(e, n) {
                jo(t, e);
            })), [ 2 /*return*/ ];
        }));
    }));
}

function Yo(t, e) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(n) {
            return Wo(t), 
            // If we still need the watch stream, retry the connection.
            Go(t) ? (t.Br.Nr(e), Qo(t)) : 
            // No need to restart watch stream because there are no active targets.
            // The online state is set to unknown because there is no active attempt
            // at establishing a connection
            t.Br.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
        }));
    }));
}

function $o(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var o, s, u;
        return r(this, (function(a) {
            switch (a.label) {
              case 0:
                if (t.Br.set("Online" /* Online */), !(e instanceof dn && 2 /* Removed */ === e.state && e.cause)) 
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
                                return i < o.length ? (s = o[i], t.$r.has(s) ? [ 4 /*yield*/ , t.remoteSyncer.rejectListen(s, n) ] : [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 5 ];

                              case 2:
                                r.sent(), t.$r.delete(s), t.qr.removeTarget(s), r.label = 3;

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
                return o = a.sent(), C("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), o), 
                [ 4 /*yield*/ , Xo(t, o) ];

              case 4:
                return a.sent(), [ 3 /*break*/ , 5 ];

              case 5:
                return [ 3 /*break*/ , 13 ];

              case 6:
                if (e instanceof fn ? t.qr.X(e) : e instanceof ln ? t.qr.rt(e) : t.qr.et(e), i.isEqual(K.min())) return [ 3 /*break*/ , 13 ];
                a.label = 7;

              case 7:
                return a.trys.push([ 7, 11, , 13 ]), [ 4 /*yield*/ , Ki(t.localStore) ];

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
                            t.$r.set(e, n.withResumeToken(J.EMPTY_BYTE_STRING, n.snapshotVersion)), 
                            // Cause a hard reset by unwatching and rewatching immediately, but
                            // deliberately don't send a resume token so that we get a full update.
                            Ko(t, e);
                            // Mark the target we send as being on behalf of an existence filter
                            // mismatch, but don't actually retain that in listenTargets. This ensures
                            // that we flag the first re-listen this way without impacting future
                            // listens of this target (that might happen e.g. on reconnect).
                            var r = new Pr(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                            jo(t, r);
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
                return C("RemoteStore", "Failed to raise snapshot:", u = a.sent()), [ 4 /*yield*/ , Xo(t, u) ];

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
 */ function Xo(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var o = this;
        return r(this, (function(s) {
            switch (s.label) {
              case 0:
                if (!Nr(e)) throw e;
                // Disable network and raise offline snapshots
                return t.Or.add(1 /* IndexedDbFailed */), [ 4 /*yield*/ , qo(t) ];

              case 1:
                // Disable network and raise offline snapshots
                return s.sent(), t.Br.set("Offline" /* Offline */), i || (
                // Use a simple read operation to determine if IndexedDB recovered.
                // Ideally, we would expose a health check directly on SimpleDb, but
                // RemoteStore only has access to persistence through LocalStore.
                i = function() {
                    return Ki(t.localStore);
                }), 
                // Probe IndexedDB periodically and re-enable network
                t.asyncQueue.enqueueRetryable((function() {
                    return n(o, void 0, void 0, (function() {
                        return r(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return C("RemoteStore", "Retrying IndexedDB access"), [ 4 /*yield*/ , i() ];

                              case 1:
                                return e.sent(), t.Or.delete(1 /* IndexedDbFailed */), [ 4 /*yield*/ , Vo(t) ];

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
 */ function Jo(t, e) {
    return e().catch((function(n) {
        return Xo(t, n, e);
    }));
}

function Zo(t) {
    return n(this, void 0, void 0, (function() {
        var e, n, i, o, s;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                e = F(t), n = as(e), i = e.kr.length > 0 ? e.kr[e.kr.length - 1].batchId : -1, r.label = 1;

              case 1:
                if (!
                /**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */
                function(t) {
                    return zo(t) && t.kr.length < 10;
                }
                /**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */ (e)) return [ 3 /*break*/ , 7 ];
                r.label = 2;

              case 2:
                return r.trys.push([ 2, 4, , 6 ]), [ 4 /*yield*/ , zi(e.localStore, i) ];

              case 3:
                return null === (o = r.sent()) ? (0 === e.kr.length && n.ir(), [ 3 /*break*/ , 7 ]) : (i = o.batchId, 
                function(t, e) {
                    t.kr.push(e);
                    var n = as(t);
                    n.er() && n.pr && n.Er(e.mutations);
                }(e, o), [ 3 /*break*/ , 6 ]);

              case 4:
                return s = r.sent(), [ 4 /*yield*/ , Xo(e, s) ];

              case 5:
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 3 /*break*/ , 1 ];

              case 7:
                return ts(e) && es(e), [ 2 /*return*/ ];
            }
        }));
    }));
}

function ts(t) {
    return zo(t) && !as(t).tr() && t.kr.length > 0;
}

function es(t) {
    as(t).start();
}

function ns(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            return as(t).Ar(), [ 2 /*return*/ ];
        }));
    }));
}

function rs(t) {
    return n(this, void 0, void 0, (function() {
        var e, n, i, o;
        return r(this, (function(r) {
            // Send the write pipeline now that the stream is established.
            for (e = as(t), n = 0, i = t.kr; n < i.length; n++) o = i[n], e.Er(o.mutations);
            return [ 2 /*return*/ ];
        }));
    }));
}

function is(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = t.kr.shift(), o = Or.from(n, e, i), [ 4 /*yield*/ , Jo(t, (function() {
                    return t.remoteSyncer.applySuccessfulWrite(o);
                })) ];

              case 1:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return r.sent(), [ 4 /*yield*/ , Zo(t) ];

              case 2:
                // It's possible that with the completion of this mutation another
                // slot has freed up.
                return r.sent(), [ 2 /*return*/ ];
            }
        }));
    }));
}

function os(t, e) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(i) {
            switch (i.label) {
              case 0:
                return e && as(t).pr ? [ 4 /*yield*/ , function(t, e) {
                    return n(this, void 0, void 0, (function() {
                        var n, i;
                        return r(this, (function(r) {
                            switch (r.label) {
                              case 0:
                                return Ge(i = e.code) && i !== N.ABORTED ? (n = t.kr.shift(), 
                                // In this case it's also unlikely that the server itself is melting
                                // down -- this was just a bad request so inhibit backoff on the next
                                // restart.
                                as(t).sr(), [ 4 /*yield*/ , Jo(t, (function() {
                                    return t.remoteSyncer.rejectFailedWrite(n.batchId, e);
                                })) ]) : [ 3 /*break*/ , 3 ];

                              case 1:
                                // It's possible that with the completion of this mutation
                                // another slot has freed up.
                                return r.sent(), [ 4 /*yield*/ , Zo(t) ];

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
                return ts(t) && es(t), [ 2 /*return*/ ];
            }
        }));
    }));
}

/**
 * Toggles the network state when the client gains or loses its primary lease.
 */ function ss(t, e) {
    return n(this, void 0, void 0, (function() {
        var n;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = F(t), e ? (n.Or.delete(2 /* IsSecondary */), [ 4 /*yield*/ , Vo(n) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return r.sent(), [ 3 /*break*/ , 5 ];

              case 2:
                return e ? [ 3 /*break*/ , 4 ] : (n.Or.add(2 /* IsSecondary */), [ 4 /*yield*/ , qo(n) ]);

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
 */ function us(t) {
    var e = this;
    return t.Ur || (
    // Create stream (but note that it is not started yet).
    t.Ur = function(t, e, n) {
        var r = F(t);
        return r.br(), new Lo(e, r.Hi, r.credentials, r.R, n);
    }(t.datastore, t.asyncQueue, {
        Ii: Ho.bind(null, t),
        Ri: Yo.bind(null, t),
        _r: $o.bind(null, t)
    }), t.Mr.push((function(i) {
        return n(e, void 0, void 0, (function() {
            return r(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.Ur.sr(), Go(t) ? Qo(t) : t.Br.set("Unknown" /* Unknown */), [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    return [ 4 /*yield*/ , t.Ur.stop() ];

                  case 2:
                    e.sent(), Wo(t), e.label = 3;

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

function as(t) {
    var e = this;
    return t.Kr || (
    // Create stream (but note that it is not started yet).
    t.Kr = function(t, e, n) {
        var r = F(t);
        return r.br(), new Oo(e, r.Hi, r.credentials, r.R, n);
    }(t.datastore, t.asyncQueue, {
        Ii: ns.bind(null, t),
        Ri: os.bind(null, t),
        Ir: rs.bind(null, t),
        Tr: is.bind(null, t)
    }), t.Mr.push((function(i) {
        return n(e, void 0, void 0, (function() {
            return r(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return i ? (t.Kr.sr(), [ 4 /*yield*/ , Zo(t) ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    // This will start the write stream if necessary.
                    return e.sent(), [ 3 /*break*/ , 4 ];

                  case 2:
                    return [ 4 /*yield*/ , t.Kr.stop() ];

                  case 3:
                    e.sent(), t.kr.length > 0 && (C("RemoteStore", "Stopping write stream with " + t.kr.length + " pending writes"), 
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

var cs = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = i, 
        this.deferred = new br, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
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
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new D(N.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
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
 */ function hs(t, e) {
    if (x("AsyncQueue", e + ": " + t), Nr(t)) return new D(N.UNAVAILABLE, e + ": " + t);
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
 */ var fs = /** @class */ function() {
    /** The default ordering is by key if the comparator is omitted */
    function t(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.comparator = t ? function(e, n) {
            return t(e, n) || ct.comparator(e.key, n.key);
        } : function(t, e) {
            return ct.comparator(t.key, e.key);
        }, this.keyedMap = en(), this.sortedSet = new We(this.comparator)
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
}(), ls = /** @class */ function() {
    function t() {
        this.Qr = new We(ct.comparator);
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
        O() : this.Qr = this.Qr.insert(e, t);
    }, t.prototype.jr = function() {
        var t = [];
        return this.Qr.inorderTraversal((function(e, n) {
            t.push(n);
        })), t;
    }, t;
}(), ds = /** @class */ function() {
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
        })), new t(e, n, fs.emptySet(n), o, r, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }, Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return !this.mutatedKeys.isEmpty();
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && ie(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
        var e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
        return !0;
    }, t;
}(), ps = function() {
    this.Wr = void 0, this.listeners = [];
}, ys = function() {
    this.queries = new Ii((function(t) {
        return oe(t);
    }), ie), this.onlineState = "Unknown" /* Unknown */ , this.Gr = new Set;
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
 */ function vs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u, a, c;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                if (n = F(t), i = e.query, o = !1, (s = n.queries.get(i)) || (o = !0, s = new ps), 
                !o) return [ 3 /*break*/ , 4 ];
                r.label = 1;

              case 1:
                return r.trys.push([ 1, 3, , 4 ]), u = s, [ 4 /*yield*/ , n.onListen(i) ];

              case 2:
                return u.Wr = r.sent(), [ 3 /*break*/ , 4 ];

              case 3:
                return a = r.sent(), c = hs(a, "Initialization of query '" + se(e.query) + "' failed"), 
                [ 2 /*return*/ , void e.onError(c) ];

              case 4:
                return n.queries.set(i, s), s.listeners.push(e), 
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                e.zr(n.onlineState), s.Wr && e.Hr(s.Wr) && bs(n), [ 2 /*return*/ ];
            }
        }));
    }));
}

function ms(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u;
        return r(this, (function(r) {
            return n = F(t), i = e.query, o = !1, (s = n.queries.get(i)) && (u = s.listeners.indexOf(e)) >= 0 && (s.listeners.splice(u, 1), 
            o = 0 === s.listeners.length), o ? [ 2 /*return*/ , (n.queries.delete(i), n.onUnlisten(i)) ] : [ 2 /*return*/ ];
        }));
    }));
}

function gs(t, e) {
    for (var n = F(t), r = !1, i = 0, o = e; i < o.length; i++) {
        var s = o[i], u = s.query, a = n.queries.get(u);
        if (a) {
            for (var c = 0, h = a.listeners; c < h.length; c++) {
                h[c].Hr(s) && (r = !0);
            }
            a.Wr = s;
        }
    }
    r && bs(n);
}

function ws(t, e, n) {
    var r = F(t), i = r.queries.get(e);
    if (i) for (var o = 0, s = i.listeners; o < s.length; o++) {
        s[o].onError(n);
    }
    // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
    // after an error.
        r.queries.delete(e);
}

// Call all global snapshot listeners that have been set.
function bs(t) {
    t.Gr.forEach((function(t) {
        t.next();
    }));
}

/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */ var Is = /** @class */ function() {
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
            t = new ds(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, 
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
        t = ds.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.Yr = !0, 
        this.Jr.next(t);
    }, t;
}(), Ts = /** @class */ function() {
    function t(t, 
    // How many bytes this element takes to store in the bundle.
    e) {
        this.payload = t, this.byteLength = e;
    }
    return t.prototype.io = function() {
        return "metadata" in this.payload;
    }, t;
}(), Es = /** @class */ function() {
    function t(t) {
        this.R = t;
    }
    return t.prototype.qn = function(t) {
        return An(this.R, t);
    }, 
    /**
     * Converts a BundleDocument to a MutableDocument.
     */
    t.prototype.Un = function(t) {
        return t.metadata.exists ? On(this.R, t.document, !1) : Nt.newNoDocument(this.qn(t.metadata.name), this.Kn(t.metadata.readTime));
    }, t.prototype.Kn = function(t) {
        return _n(t);
    }, t;
}(), _s = /** @class */ function() {
    function t(t, e, n) {
        this.ro = t, this.localStore = e, this.R = n, 
        /** Batched queries to be saved into storage */
        this.queries = [], 
        /** Batched documents to be saved into storage */
        this.documents = [], this.progress = Ss(t)
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
        for (var e = new Map, n = new Es(this.R), r = 0, i = t; r < i.length; r++) {
            var o = i[r];
            if (o.metadata.queries) for (var s = n.qn(o.metadata.name), u = 0, a = o.metadata.queries; u < a.length; u++) {
                var c = a[u], h = (e.get(c) || sn()).add(s);
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
                    return [ 4 /*yield*/ , Zi(this.localStore, new Es(this.R), this.documents, this.ro.id) ];

                  case 1:
                    t = r.sent(), e = this.co(this.documents), n = 0, i = this.queries, r.label = 2;

                  case 2:
                    return n < i.length ? (o = i[n], [ 4 /*yield*/ , to(this.localStore, o, e.get(o.name)) ]) : [ 3 /*break*/ , 5 ];

                  case 3:
                    r.sent(), r.label = 4;

                  case 4:
                    return n++, [ 3 /*break*/ , 2 ];

                  case 5:
                    return [ 2 /*return*/ , (this.progress.taskState = "Success", new Pi(Object.assign({}, this.progress), t)) ];
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
function Ss(t) {
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
 */ var Ns = function(t) {
    this.key = t;
}, Ds = function(t) {
    this.key = t;
}, As = /** @class */ function() {
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
        this.ho = sn(), 
        /** Document Keys that have local changes */
        this.mutatedKeys = sn(), this.lo = ae(t), this.fo = new fs(this.lo);
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
        var n = this, r = e ? e.mo : new ls, i = e ? e.fo : this.fo, o = e ? e.mutatedKeys : this.mutatedKeys, s = i, u = !1, a = $t(this.query) && i.size === this.query.limit ? i.last() : null, c = Xt(this.query) && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.inorderTraversal((function(t, e) {
            var h = i.get(t), f = ue(n.query, e) ? e : null, l = !!h && n.mutatedKeys.has(h.key), d = !!f && (f.hasLocalMutations || 
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
        })), $t(this.query) || Xt(this.query)) for (;s.size > this.query.limit; ) {
            var h = $t(this.query) ? s.last() : s.first();
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
                        return O();
                    }
                };
                return n(t) - n(e);
            }(t.type, e.type) || r.lo(t.doc, e.doc);
        })), this.po(n);
        var s = e ? this.Eo() : [], u = 0 === this.ho.size && this.current ? 1 /* Synced */ : 0 /* Local */ , a = u !== this.ao;
        return this.ao = u, 0 !== o.length || a ? {
            snapshot: new ds(this.query, t.fo, i, o, t.mutatedKeys, 0 /* Local */ === u, a, 
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
            mo: new ls,
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
        this.ho = sn(), this.fo.forEach((function(e) {
            t.Io(e.key) && (t.ho = t.ho.add(e.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        var n = [];
        return e.forEach((function(e) {
            t.ho.has(e) || n.push(new Ds(e));
        })), this.ho.forEach((function(t) {
            e.has(t) || n.push(new Ns(t));
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
        this.uo = t.Bn, this.ho = sn();
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
        return ds.fromInitialDocuments(this.query, this.fo, this.mutatedKeys, 0 /* Local */ === this.ao);
    }, t;
}(), ks = function(
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
}, Cs = function(t) {
    this.key = t, 
    /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
    this.bo = !1;
}, xs = /** @class */ function() {
    function t(t, e, n, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    r, i, o) {
        this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = r, 
        this.currentUser = i, this.maxConcurrentLimboResolutions = o, this.vo = {}, this.Po = new Ii((function(t) {
            return oe(t);
        }), ie), this.Vo = new Map, 
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
        this.Do = new We(ct.comparator), 
        /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
        this.Co = new Map, this.No = new no, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.xo = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.Fo = new Map, this.ko = ci.Yt(), this.onlineState = "Unknown" /* Unknown */ , 
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
function Rs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u, a;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = uu(t), (s = n.Po.get(e)) ? (
                // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
                // already exists when EventManager calls us for the first time. This
                // happens when the primary tab is already listening to this query on
                // behalf of another tab and the user of the primary also starts listening
                // to the query. EventManager will not have an assigned target ID in this
                // case and calls `listen` to obtain this ID.
                i = s.targetId, n.sharedClientState.addLocalQueryTarget(i), o = s.view.Ro(), [ 3 /*break*/ , 4 ]) : [ 3 /*break*/ , 1 ];

              case 1:
                return [ 4 /*yield*/ , Wi(n.localStore, ne(e)) ];

              case 2:
                return u = r.sent(), a = n.sharedClientState.addLocalQueryTarget(u.targetId), i = u.targetId, 
                [ 4 /*yield*/ , Ls(n, e, i, "current" === a) ];

              case 3:
                o = r.sent(), n.isPrimaryClient && Uo(n.remoteStore, u), r.label = 4;

              case 4:
                return [ 2 /*return*/ , o ];
            }
        }));
    }));
}

/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */ function Ls(t, e, i, o) {
    return n(this, void 0, void 0, (function() {
        var s, u, a, c, h, f;
        return r(this, (function(l) {
            switch (l.label) {
              case 0:
                // PORTING NOTE: On Web only, we inject the code that registers new Limbo
                // targets based on view changes. This allows us to only depend on Limbo
                // changes when user code includes queries.
                return t.Oo = function(e, i, o) {
                    return function(t, e, i, o) {
                        return n(this, void 0, void 0, (function() {
                            var n, s, u;
                            return r(this, (function(r) {
                                switch (r.label) {
                                  case 0:
                                    return n = e.view._o(i), n.Nn ? [ 4 /*yield*/ , Yi(t.localStore, e.query, 
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
                                    /* updateLimboDocuments= */ t.isPrimaryClient, s), [ 2 /*return*/ , (zs(t, e.targetId, u.To), 
                                    u.snapshot) ];
                                }
                            }));
                        }));
                    }(t, e, i, o);
                }, [ 4 /*yield*/ , Yi(t.localStore, e, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return s = l.sent(), u = new As(e, s.Bn), a = u._o(s.documents), c = hn.createSynthesizedTargetChangeForCurrentChange(i, o && "Offline" /* Offline */ !== t.onlineState), 
                h = u.applyChanges(a, 
                /* updateLimboDocuments= */ t.isPrimaryClient, c), zs(t, i, h.To), f = new ks(e, i, u), 
                [ 2 /*return*/ , (t.Po.set(e, f), t.Vo.has(i) ? t.Vo.get(i).push(e) : t.Vo.set(i, [ e ]), 
                h.snapshot) ];
            }
        }));
    }));
}

/** Stops listening to the query. */ function Os(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return n = F(t), i = n.Po.get(e), (o = n.Vo.get(i.targetId)).length > 1 ? [ 2 /*return*/ , (n.Vo.set(i.targetId, o.filter((function(t) {
                    return !ie(t, e);
                }))), void n.Po.delete(e)) ] : n.isPrimaryClient ? (
                // We need to remove the local query target first to allow us to verify
                // whether any other client is still interested in this target.
                n.sharedClientState.removeLocalQueryTarget(i.targetId), n.sharedClientState.isActiveQueryTarget(i.targetId) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , Hi(n.localStore, i.targetId, 
                /*keepPersistedTargetData=*/ !1).then((function() {
                    n.sharedClientState.clearQueryState(i.targetId), Bo(n.remoteStore, i.targetId), 
                    Qs(n, i.targetId);
                })).catch(pi) ]) : [ 3 /*break*/ , 3 ];

              case 1:
                r.sent(), r.label = 2;

              case 2:
                return [ 3 /*break*/ , 5 ];

              case 3:
                return Qs(n, i.targetId), [ 4 /*yield*/ , Hi(n.localStore, i.targetId, 
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
 */ function Ps(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o, s, u;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = au(t), r.label = 1;

              case 1:
                return r.trys.push([ 1, 5, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n, r = F(t), i = j.now(), o = e.reduce((function(t, e) {
                        return t.add(e.key);
                    }), sn());
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
                                var c = a[u], h = Re(c, n.get(c.key));
                                null != h && 
                                // NOTE: The base state should only be applied if there's some
                                // existing document to override, so use a Precondition of
                                // exists=true
                                s.push(new Fe(c.key, h, St(h.value.mapValue), De.exists(!0)));
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
                    r || (r = new We(q)), r = r.insert(e, n), t.xo[t.currentUser.toKey()] = r;
                }(n, o.batchId, i), [ 4 /*yield*/ , Ys(n, o.changes) ];

              case 3:
                return r.sent(), [ 4 /*yield*/ , Zo(n.remoteStore) ];

              case 4:
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 5:
                return s = r.sent(), u = hs(s, "Failed to persist write"), i.reject(u), [ 3 /*break*/ , 6 ];

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
 */ function Fs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = F(t), r.label = 1;

              case 1:
                return r.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , Qi(n.localStore, e) ];

              case 2:
                return i = r.sent(), 
                // Update `receivedDocument` as appropriate for any limbo targets.
                e.targetChanges.forEach((function(t, e) {
                    var r = n.Co.get(e);
                    r && (
                    // Since this is a limbo resolution lookup, it's for a single document
                    // and it could be added, modified, or removed, but not a combination.
                    P(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), 
                    t.addedDocuments.size > 0 ? r.bo = !0 : t.modifiedDocuments.size > 0 ? P(r.bo) : t.removedDocuments.size > 0 && (P(r.bo), 
                    r.bo = !1));
                })), [ 4 /*yield*/ , Ys(n, i, e) ];

              case 3:
                // Update `receivedDocument` as appropriate for any limbo targets.
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , pi(r.sent()) ];

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
 */ function Ms(t, e, n) {
    var r = F(t);
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
            var n = F(t);
            n.onlineState = e;
            var r = !1;
            n.queries.forEach((function(t, n) {
                for (var i = 0, o = n.listeners; i < o.length; i++) {
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    o[i].zr(e) && (r = !0);
                }
            })), r && bs(n);
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
 */ function Vs(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o, s, u, a, c;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                // PORTING NOTE: Multi-tab only.
                return (n = F(t)).sharedClientState.updateQueryState(e, "rejected", i), o = n.Co.get(e), 
                (s = o && o.key) ? (u = (u = new We(ct.comparator)).insert(s, Nt.newNoDocument(s, K.min())), 
                a = sn().add(s), c = new cn(K.min(), 
                /* targetChanges= */ new Map, 
                /* targetMismatches= */ new $e(q), u, a), [ 4 /*yield*/ , Fs(n, c) ]) : [ 3 /*break*/ , 2 ];

              case 1:
                return r.sent(), 
                // Since this query failed, we won't want to manually unlisten to it.
                // We only remove it from bookkeeping after we successfully applied the
                // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
                // this query when the RemoteStore restarts the Watch stream, which should
                // re-trigger the target failure.
                n.Do = n.Do.remove(s), n.Co.delete(e), Hs(n), [ 3 /*break*/ , 4 ];

              case 2:
                return [ 4 /*yield*/ , Hi(n.localStore, e, 
                /* keepPersistedTargetData */ !1).then((function() {
                    return Qs(n, e, i);
                })).catch(pi) ];

              case 3:
                r.sent(), r.label = 4;

              case 4:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function qs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = F(t), i = e.batch.batchId, r.label = 1;

              case 1:
                return r.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , ji(n.localStore, e) ];

              case 2:
                return o = r.sent(), 
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                Ks(n, i, /*error=*/ null), js(n, i), n.sharedClientState.updateMutationState(i, "acknowledged"), 
                [ 4 /*yield*/ , Ys(n, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught
                // up), so we raise user callbacks first so that they consistently happen
                // before listen events.
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , pi(r.sent()) ];

              case 5:
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 6:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Us(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = F(t), r.label = 1;

              case 1:
                return r.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , function(t, e) {
                    var n = F(t);
                    return n.persistence.runTransaction("Reject batch", "readwrite-primary", (function(t) {
                        var r;
                        return n._n.lookupMutationBatch(t, e).next((function(e) {
                            return P(null !== e), r = e.keys(), n._n.removeMutationBatch(t, e);
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
                Ks(n, e, i), js(n, e), n.sharedClientState.updateMutationState(e, "rejected", i), 
                [ 4 /*yield*/ , Ys(n, o) ];

              case 3:
                // The local store may or may not be able to apply the write result and
                // raise events immediately (depending on whether the watcher is caught up),
                // so we raise user callbacks first so that they consistently happen before
                // listen events.
                return r.sent(), [ 3 /*break*/ , 6 ];

              case 4:
                return [ 4 /*yield*/ , pi(r.sent()) ];

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
 */ function Bs(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                zo((n = F(t)).remoteStore) || C("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), 
                r.label = 1;

              case 1:
                return r.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , function(t) {
                    var e = F(t);
                    return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (function(t) {
                        return e._n.getHighestUnacknowledgedBatchId(t);
                    }));
                }(n.localStore) ];

              case 2:
                return -1 === (i = r.sent()) ? [ 2 /*return*/ , void e.resolve() ] : ((o = n.Fo.get(i) || []).push(e), 
                n.Fo.set(i, o), [ 3 /*break*/ , 4 ]);

              case 3:
                return s = r.sent(), u = hs(s, "Initialization of waitForPendingWrites() operation failed"), 
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
 */ function js(t, e) {
    (t.Fo.get(e) || []).forEach((function(t) {
        t.resolve();
    })), t.Fo.delete(e)
    /** Reject all outstanding callbacks waiting for pending writes to complete. */;
}

function Ks(t, e, n) {
    var r = F(t), i = r.xo[r.currentUser.toKey()];
    // NOTE: Mutations restored from persistence won't have callbacks, so it's
    // okay for there to be no callback for this ID.
    if (i) {
        var o = i.get(e);
        o && (n ? o.reject(n) : o.resolve(), i = i.remove(e)), r.xo[r.currentUser.toKey()] = i;
    }
}

function Qs(t, e, n) {
    void 0 === n && (n = null), t.sharedClientState.removeLocalQueryTarget(e);
    for (var r = 0, i = t.Vo.get(e); r < i.length; r++) {
        var o = i[r];
        t.Po.delete(o), n && t.vo.Mo(o, n);
    }
    t.Vo.delete(e), t.isPrimaryClient && t.No.Zn(e).forEach((function(e) {
        t.No.containsKey(e) || 
        // We removed the last reference for this key
        Gs(t, e);
    }));
}

function Gs(t, e) {
    t.So.delete(e.path.canonicalString());
    // It's possible that the target already got removed because the query failed. In that case,
    // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
    var n = t.Do.get(e);
    null !== n && (Bo(t.remoteStore, n), t.Do = t.Do.remove(e), t.Co.delete(n), Hs(t));
}

function zs(t, e, n) {
    for (var r = 0, i = n; r < i.length; r++) {
        var o = i[r];
        o instanceof Ns ? (t.No.addReference(o.key, e), Ws(t, o)) : o instanceof Ds ? (C("SyncEngine", "Document no longer in limbo: " + o.key), 
        t.No.removeReference(o.key, e), t.No.containsKey(o.key) || 
        // We removed the last reference for this key
        Gs(t, o.key)) : O();
    }
}

function Ws(t, e) {
    var n = e.key, r = n.path.canonicalString();
    t.Do.get(n) || t.So.has(r) || (C("SyncEngine", "New document in limbo: " + n), t.So.add(r), 
    Hs(t));
}

/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */ function Hs(t) {
    for (;t.So.size > 0 && t.Do.size < t.maxConcurrentLimboResolutions; ) {
        var e = t.So.values().next().value;
        t.So.delete(e);
        var n = new ct(H.fromString(e)), r = t.ko.next();
        t.Co.set(r, new Cs(n)), t.Do = t.Do.insert(n, r), Uo(t.remoteStore, new Pr(ne(Yt(n.path)), r, 2 /* LimboResolution */ , S.o));
    }
}

function Ys(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var o, s, u, a;
        return r(this, (function(c) {
            switch (c.label) {
              case 0:
                return o = F(t), s = [], u = [], a = [], o.Po.isEmpty() ? [ 3 /*break*/ , 3 ] : (o.Po.forEach((function(t, n) {
                    a.push(o.Oo(n, e, i).then((function(t) {
                        if (t) {
                            o.isPrimaryClient && o.sharedClientState.updateQueryState(n.targetId, t.fromCache ? "not-current" : "current"), 
                            s.push(t);
                            var e = Mi.Pn(n.targetId, t);
                            u.push(e);
                        }
                    })));
                })), [ 4 /*yield*/ , Promise.all(a) ]);

              case 1:
                return c.sent(), o.vo._r(s), [ 4 /*yield*/ , function(t, e) {
                    return n(this, void 0, void 0, (function() {
                        var n, i, o, s, u, a, c, h, f;
                        return r(this, (function(r) {
                            switch (r.label) {
                              case 0:
                                n = F(t), r.label = 1;

                              case 1:
                                return r.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (function(t) {
                                    return Ir.forEach(e, (function(e) {
                                        return Ir.forEach(e.bn, (function(r) {
                                            return n.persistence.referenceDelegate.addReference(t, e.targetId, r);
                                        })).next((function() {
                                            return Ir.forEach(e.vn, (function(r) {
                                                return n.persistence.referenceDelegate.removeReference(t, e.targetId, r);
                                            }));
                                        }));
                                    }));
                                })) ];

                              case 2:
                                return r.sent(), [ 3 /*break*/ , 4 ];

                              case 3:
                                if (!Nr(i = r.sent())) throw i;
                                // If `notifyLocalViewChanges` fails, we did not advance the sequence
                                // number for the documents that were included in this transaction.
                                // This might trigger them to be deleted earlier than they otherwise
                                // would have, but it should not invalidate the integrity of the data.
                                                                return C("LocalStore", "Failed to update sequence numbers: " + i), 
                                [ 3 /*break*/ , 4 ];

                              case 4:
                                for (o = 0, s = e; o < s.length; o++) u = s[o], a = u.targetId, u.fromCache || (c = n.Fn.get(a), 
                                h = c.snapshotVersion, f = c.withLastLimboFreeSnapshotVersion(h), 
                                // Advance the last limbo free snapshot version
                                n.Fn = n.Fn.insert(a, f));
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

function $s(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return (n = F(t)).currentUser.isEqual(e) ? [ 3 /*break*/ , 3 ] : (C("SyncEngine", "User change. New user:", e.toKey()), 
                [ 4 /*yield*/ , Bi(n.localStore, e) ]);

              case 1:
                return i = r.sent(), n.currentUser = e, 
                // Fails tasks waiting for pending writes requested by previous user.
                function(t, e) {
                    t.Fo.forEach((function(t) {
                        t.forEach((function(t) {
                            t.reject(new D(N.CANCELLED, "'waitForPendingWrites' promise is rejected due to a user change."));
                        }));
                    })), t.Fo.clear();
                }(n), 
                // TODO(b/114226417): Consider calling this only in the primary tab.
                n.sharedClientState.handleUserChange(e, i.removedBatchIds, i.addedBatchIds), [ 4 /*yield*/ , Ys(n, i.Ln) ];

              case 2:
                r.sent(), r.label = 3;

              case 3:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function Xs(t, e) {
    var n = F(t), r = n.Co.get(e);
    if (r && r.bo) return sn().add(r.key);
    var i = sn(), o = n.Vo.get(e);
    if (!o) return i;
    for (var s = 0, u = o; s < u.length; s++) {
        var a = u[s], c = n.Po.get(a);
        i = i.unionWith(c.view.wo);
    }
    return i;
}

/**
 * Reconcile the list of synced documents in an existing view with those
 * from persistence.
 */ function Js(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return [ 4 /*yield*/ , Yi((n = F(t)).localStore, e.query, 
                /* usePreviousResults= */ !0) ];

              case 1:
                return i = r.sent(), o = e.view.Ao(i), [ 2 /*return*/ , (n.isPrimaryClient && zs(n, e.targetId, o.To), 
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
function Zs(t) {
    return n(this, void 0, void 0, (function() {
        var e;
        return r(this, (function(n) {
            return [ 2 /*return*/ , Xi((e = F(t)).localStore).then((function(t) {
                return Ys(e, t);
            })) ];
        }));
    }));
}

/** Applies a mutation state to an existing batch.  */
// PORTING NOTE: Multi-Tab only.
function tu(t, e, i, o) {
    return n(this, void 0, void 0, (function() {
        var n, s;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return [ 4 /*yield*/ , function(t, e) {
                    var n = F(t), r = F(n._n);
                    return n.persistence.runTransaction("Lookup mutation documents", "readonly", (function(t) {
                        return r.jt(t, e).next((function(e) {
                            return e ? n.Mn.pn(t, e) : Ir.resolve(null);
                        }));
                    }));
                }((n = F(t)).localStore, e) ];

              case 1:
                return null === (s = r.sent()) ? [ 3 /*break*/ , 6 ] : "pending" !== i ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , Zo(n.remoteStore) ];

              case 2:
                // If we are the primary client, we need to send this write to the
                // backend. Secondary clients will ignore these writes since their remote
                // connection is disabled.
                return r.sent(), [ 3 /*break*/ , 4 ];

              case 3:
                "acknowledged" === i || "rejected" === i ? (
                // NOTE: Both these methods are no-ops for batches that originated from
                // other clients.
                Ks(n, e, o || null), js(n, e), function(t, e) {
                    F(F(t)._n).Gt(e);
                }(n.localStore, e)) : O(), r.label = 4;

              case 4:
                return [ 4 /*yield*/ , Ys(n, s) ];

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
                C("SyncEngine", "Cannot apply mutation batch with id: " + e), r.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
function eu(t, e) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u, a, c, h;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return uu(n = F(t)), au(n), !0 !== e || !0 === n.$o ? [ 3 /*break*/ , 3 ] : (i = n.sharedClientState.getAllActiveQueryTargets(), 
                [ 4 /*yield*/ , nu(n, i.toArray()) ]);

              case 1:
                return o = r.sent(), n.$o = !0, [ 4 /*yield*/ , ss(n.remoteStore, !0) ];

              case 2:
                for (r.sent(), s = 0, u = o; s < u.length; s++) a = u[s], Uo(n.remoteStore, a);
                return [ 3 /*break*/ , 7 ];

              case 3:
                return !1 !== e || !1 === n.$o ? [ 3 /*break*/ , 7 ] : (c = [], h = Promise.resolve(), 
                n.Vo.forEach((function(t, e) {
                    n.sharedClientState.isLocalQueryTarget(e) ? c.push(e) : h = h.then((function() {
                        return Qs(n, e), Hi(n.localStore, e, 
                        /*keepPersistedTargetData=*/ !0);
                    })), Bo(n.remoteStore, e);
                })), [ 4 /*yield*/ , h ]);

              case 4:
                return r.sent(), [ 4 /*yield*/ , nu(n, c) ];

              case 5:
                return r.sent(), 
                // PORTING NOTE: Multi-Tab only.
                function(t) {
                    var e = F(t);
                    e.Co.forEach((function(t, n) {
                        Bo(e.remoteStore, n);
                    })), e.No.ts(), e.Co = new Map, e.Do = new We(ct.comparator);
                }(n), n.$o = !1, [ 4 /*yield*/ , ss(n.remoteStore, !1) ];

              case 6:
                r.sent(), r.label = 7;

              case 7:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

function nu(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, i, o, s, u, a, c, h, f, l, d, p, y, v;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                n = F(t), i = [], o = [], s = 0, u = e, r.label = 1;

              case 1:
                return s < u.length ? (a = u[s], c = void 0, (h = n.Vo.get(a)) && 0 !== h.length ? [ 4 /*yield*/ , Wi(n.localStore, ne(h[0])) ] : [ 3 /*break*/ , 7 ]) : [ 3 /*break*/ , 13 ];

              case 2:
                // For queries that have a local View, we fetch their current state
                // from LocalStore (as the resume token and the snapshot version
                // might have changed) and reconcile their views with the persisted
                // state (the list of syncedDocuments may have gotten out of sync).
                c = r.sent(), f = 0, l = h, r.label = 3;

              case 3:
                return f < l.length ? (d = l[f], p = n.Po.get(d), [ 4 /*yield*/ , Js(n, p) ]) : [ 3 /*break*/ , 6 ];

              case 4:
                (y = r.sent()).snapshot && o.push(y.snapshot), r.label = 5;

              case 5:
                return f++, [ 3 /*break*/ , 3 ];

              case 6:
                return [ 3 /*break*/ , 11 ];

              case 7:
                return [ 4 /*yield*/ , $i(n.localStore, a) ];

              case 8:
                return v = r.sent(), [ 4 /*yield*/ , Wi(n.localStore, v) ];

              case 9:
                return c = r.sent(), [ 4 /*yield*/ , Ls(n, ru(v), a, 
                /*current=*/ !1) ];

              case 10:
                r.sent(), r.label = 11;

              case 11:
                i.push(c), r.label = 12;

              case 12:
                return s++, [ 3 /*break*/ , 1 ];

              case 13:
                return [ 2 /*return*/ , (n.vo._r(o), i) ];
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
function ru(t) {
    return Ht(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
}

/** Returns the IDs of the clients that are currently active. */
// PORTING NOTE: Multi-Tab only.
function iu(t) {
    var e = F(t);
    return F(F(e.localStore).persistence).fn();
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
function ou(t, e, i, o) {
    return n(this, void 0, void 0, (function() {
        var n, s, u;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return (n = F(t)).$o ? (
                // If we receive a target state notification via WebStorage, we are
                // either already secondary or another tab has taken the primary lease.
                C("SyncEngine", "Ignoring unexpected query state notification."), [ 3 /*break*/ , 8 ]) : [ 3 /*break*/ , 1 ];

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
                return [ 4 /*yield*/ , Xi(n.localStore) ];

              case 3:
                return s = r.sent(), u = cn.createSynthesizedRemoteEventForCurrentChange(e, "current" === i), 
                [ 4 /*yield*/ , Ys(n, s, u) ];

              case 4:
                return r.sent(), [ 3 /*break*/ , 8 ];

              case 5:
                return [ 4 /*yield*/ , Hi(n.localStore, e, 
                /* keepPersistedTargetData */ !0) ];

              case 6:
                return r.sent(), Qs(n, e, o), [ 3 /*break*/ , 8 ];

              case 7:
                O(), r.label = 8;

              case 8:
                return [ 2 /*return*/ ];
            }
        }));
    }));
}

/** Adds or removes Watch targets for queries from different tabs. */ function su(t, e, i) {
    return n(this, void 0, void 0, (function() {
        var n, o, s, u, a, c, h, f, l, d;
        return r(this, (function(p) {
            switch (p.label) {
              case 0:
                if (!(n = uu(t)).$o) return [ 3 /*break*/ , 10 ];
                o = 0, s = e, p.label = 1;

              case 1:
                return o < s.length ? (u = s[o], n.Vo.has(u) ? (
                // A target might have been added in a previous attempt
                C("SyncEngine", "Adding an already active target " + u), [ 3 /*break*/ , 5 ]) : [ 4 /*yield*/ , $i(n.localStore, u) ]) : [ 3 /*break*/ , 6 ];

              case 2:
                return a = p.sent(), [ 4 /*yield*/ , Wi(n.localStore, a) ];

              case 3:
                return c = p.sent(), [ 4 /*yield*/ , Ls(n, ru(a), c.targetId, 
                /*current=*/ !1) ];

              case 4:
                p.sent(), Uo(n.remoteStore, c), p.label = 5;

              case 5:
                return o++, [ 3 /*break*/ , 1 ];

              case 6:
                h = function(t) {
                    return r(this, (function(e) {
                        switch (e.label) {
                          case 0:
                            return n.Vo.has(t) ? [ 4 /*yield*/ , Hi(n.localStore, t, 
                            /* keepPersistedTargetData */ !1).then((function() {
                                Bo(n.remoteStore, t), Qs(n, t);
                            })).catch(pi) ] : [ 3 /*break*/ , 2 ];

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

function uu(t) {
    var e = F(t);
    return e.remoteStore.remoteSyncer.applyRemoteEvent = Fs.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = Xs.bind(null, e), 
    e.remoteStore.remoteSyncer.rejectListen = Vs.bind(null, e), e.vo._r = gs.bind(null, e.eventManager), 
    e.vo.Mo = ws.bind(null, e.eventManager), e;
}

function au(t) {
    var e = F(t);
    return e.remoteStore.remoteSyncer.applySuccessfulWrite = qs.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Us.bind(null, e), 
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

function cu(t, e, i) {
    var o = F(t);
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
                        var n = F(t), r = _n(e.createTime);
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
                    return i._updateProgress(Ss(n)), o = new _s(n, t.localStore, e.R), [ 4 /*yield*/ , e.Lo() ];

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
                    return a = r.sent(), [ 4 /*yield*/ , Ys(t, a.wn, 
                    /* remoteEvent */ void 0) ];

                  case 12:
                    // Save metadata, so loading the same bundle will skip.
                    // TODO(b/160876443): This currently raises snapshots with
                    // `fromCache=false` if users already listen to some queries and bundles
                    // has newer version.
                    return r.sent(), [ 4 /*yield*/ , function(t, e) {
                        var n = F(t);
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
                    return R("SyncEngine", "Loading bundle failed with " + (c = r.sent())), i._failWith(c), 
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

var hu = /** @class */ function() {
    function t() {
        this.synchronizeTabs = !1;
    }
    return t.prototype.initialize = function(t) {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.R = Co(t.databaseInfo.databaseId), this.sharedClientState = this.Bo(t), 
                    this.persistence = this.qo(t), [ 4 /*yield*/ , this.persistence.start() ];

                  case 1:
                    return e.sent(), this.gcScheduler = this.Uo(t), this.localStore = this.Ko(t), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Uo = function(t) {
        return null;
    }, t.prototype.Ko = function(t) {
        return Ui(this.persistence, new Vi, t.initialUser, this.R);
    }, t.prototype.qo = function(t) {
        return new ao(ho.bs, this.R);
    }, t.prototype.Bo = function(t) {
        return new To;
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
}(), fu = /** @class */ function(e) {
    function i(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).Qo = t, i.cacheSizeBytes = n, i.forceOwnership = r, 
        i.synchronizeTabs = !1, i;
    }
    return t(i, e), i.prototype.initialize = function(t) {
        return n(this, void 0, void 0, (function() {
            return r(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , e.prototype.initialize.call(this, t) ];

                  case 1:
                    return n.sent(), [ 4 /*yield*/ , Ji(this.localStore) ];

                  case 2:
                    return n.sent(), [ 4 /*yield*/ , this.Qo.initialize(this, t) ];

                  case 3:
                    // Enqueue writes from a previous session
                    return n.sent(), [ 4 /*yield*/ , au(this.Qo.syncEngine) ];

                  case 4:
                    // Enqueue writes from a previous session
                    return n.sent(), [ 4 /*yield*/ , Zo(this.Qo.remoteStore) ];

                  case 5:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.Ko = function(t) {
        return Ui(this.persistence, new Vi, t.initialUser, this.R);
    }, i.prototype.Uo = function(t) {
        var e = this.persistence.referenceDelegate.garbageCollector;
        return new mi(e, t.asyncQueue);
    }, i.prototype.qo = function(t) {
        var e = Oi(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey), n = void 0 !== this.cacheSizeBytes ? ei.withCacheSize(this.cacheSizeBytes) : ei.DEFAULT;
        return new xi(this.synchronizeTabs, e, t.clientId, n, t.asyncQueue, Ao(), ko(), this.R, this.sharedClientState, !!this.forceOwnership);
    }, i.prototype.Bo = function(t) {
        return new To;
    }, i;
}(hu), lu = /** @class */ function(e) {
    function i(t, n) {
        var r = this;
        return (r = e.call(this, t, n, /* forceOwnership= */ !1) || this).Qo = t, r.cacheSizeBytes = n, 
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
                    return s.sent(), i = this.Qo.syncEngine, this.sharedClientState instanceof Io ? (this.sharedClientState.syncEngine = {
                        ui: tu.bind(null, i),
                        ai: ou.bind(null, i),
                        hi: su.bind(null, i),
                        fn: iu.bind(null, i),
                        ci: Zs.bind(null, i)
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
                                    return [ 4 /*yield*/ , eu(this.Qo.syncEngine, t) ];

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
        var e = Ao();
        if (!Io.yt(e)) throw new D(N.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
        var n = Oi(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey);
        return new Io(e, t.asyncQueue, n, t.clientId, t.initialUser);
    }, i;
}(fu), du = /** @class */ function() {
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
                        return Ms(n.syncEngine, t, 1 /* SharedClientState */);
                    }, this.remoteStore.remoteSyncer.handleCredentialChange = $s.bind(null, this.syncEngine), 
                    [ 4 /*yield*/ , ss(this.remoteStore, this.syncEngine.isPrimaryClient) ]);

                  case 1:
                    r.sent(), r.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.createEventManager = function(t) {
        return new ys;
    }, t.prototype.createDatastore = function(t) {
        var e, n = Co(t.databaseInfo.databaseId), r = (e = t.databaseInfo, new Do(e));
        /** Return the Platform-specific connectivity monitor. */ return function(t, e, n) {
            return new Po(t, e, n);
        }(t.credentials, r, n);
    }, t.prototype.createRemoteStore = function(t) {
        var e, n, r, i, o, s = this;
        return e = this.localStore, n = this.datastore, r = t.asyncQueue, i = function(t) {
            return Ms(s.syncEngine, t, 0 /* RemoteStore */);
        }, o = _o.yt() ? new _o : new Eo, new Mo(e, n, r, i, o);
    }, t.prototype.createSyncEngine = function(t, e) {
        return function(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        r, i, o, s) {
            var u = new xs(t, e, n, r, i, o);
            return s && (u.$o = !0), u;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e);
    }, t.prototype.terminate = function() {
        return function(t) {
            return n(this, void 0, void 0, (function() {
                var e;
                return r(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = F(t), C("RemoteStore", "RemoteStore shutting down."), e.Or.add(5 /* Shutdown */), 
                        [ 4 /*yield*/ , qo(e) ];

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
function pu(t, e) {
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
 */ var yu = /** @class */ function() {
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
}(), vu = /** @class */ function() {
    function t(
    /** The reader to read from underlying binary bundle data source. */
    t, e) {
        var n = this;
        this.Go = t, this.R = e, 
        /** Cached bundle metadata. */
        this.metadata = new br, 
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
                    return i = r.sent(), [ 2 /*return*/ , new Ts(JSON.parse(i), t.length + n) ];
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
}(), mu = /** @class */ function() {
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
                    if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new D(N.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
                    return [ 4 /*yield*/ , function(t, e) {
                        return n(this, void 0, void 0, (function() {
                            var n, i, o, s, u, a;
                            return r(this, (function(r) {
                                switch (r.label) {
                                  case 0:
                                    return n = F(t), i = xn(n.R) + "/documents", o = {
                                        documents: e.map((function(t) {
                                            return Dn(n.R, t);
                                        }))
                                    }, [ 4 /*yield*/ , n.$i("BatchGetDocuments", i, o) ];

                                  case 1:
                                    return s = r.sent(), u = new Map, s.forEach((function(t) {
                                        var e = function(t, e) {
                                            return "found" in e ? function(t, e) {
                                                P(!!e.found), e.found.name, e.found.updateTime;
                                                var n = An(t, e.found.name), r = _n(e.found.updateTime), i = new _t({
                                                    mapValue: {
                                                        fields: e.found.fields
                                                    }
                                                });
                                                return Nt.newFoundDocument(n, r, i);
                                            }(t, e) : "missing" in e ? function(t, e) {
                                                P(!!e.missing), P(!!e.readTime);
                                                var n = An(t, e.missing), r = _n(e.readTime);
                                                return Nt.newNoDocument(n, r);
                                            }(t, e) : O();
                                        }(n.R, t);
                                        u.set(e.key.toString(), e);
                                    })), a = [], [ 2 /*return*/ , (e.forEach((function(t) {
                                        var e = u.get(t.toString());
                                        P(!!e), a.push(e);
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
        this.write(new je(t, this.precondition(t))), this.writtenDocs.add(t.toString());
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
                        var r = ct.fromPath(n);
                        e.mutations.push(new Ke(r, e.precondition(r)));
                    })), [ 4 /*yield*/ , function(t, e) {
                        return n(this, void 0, void 0, (function() {
                            var n, i, o;
                            return r(this, (function(r) {
                                switch (r.label) {
                                  case 0:
                                    return n = F(t), i = xn(n.R) + "/documents", o = {
                                        writes: e.map((function(t) {
                                            return Pn(n.R, t);
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
            if (!t.isNoDocument()) throw O();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
                        e = K.min();
        }
        var n = this.readVersions.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new D(N.ABORTED, "Document version changed between two reads.");
        } else this.readVersions.set(t.key.toString(), e);
    }, 
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t.prototype.precondition = function(t) {
        var e = this.readVersions.get(t.toString());
        return !this.writtenDocs.has(t.toString()) && e ? De.updateTime(e) : De.none();
    }, 
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    t.prototype.preconditionForUpdate = function(t) {
        var e = this.readVersions.get(t.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.writtenDocs.has(t.toString()) && e) {
            if (e.isEqual(K.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new D(N.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return De.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
                return De.exists(!0);
    }, t.prototype.write = function(t) {
        this.ensureCommitNotCalled(), this.mutations.push(t);
    }, t.prototype.ensureCommitNotCalled = function() {}, t;
}(), gu = /** @class */ function() {
    function t(t, e, n, r) {
        this.asyncQueue = t, this.datastore = e, this.updateFunction = n, this.deferred = r, 
        this.ec = 5, this.Zi = new xo(this.asyncQueue, "transaction_retry" /* TransactionRetry */)
        /** Runs the transaction and sets the result on deferred. */;
    }
    return t.prototype.run = function() {
        this.ec -= 1, this.nc();
    }, t.prototype.nc = function() {
        var t = this;
        this.Zi.ji((function() {
            return n(t, void 0, void 0, (function() {
                var t, e, n = this;
                return r(this, (function(r) {
                    return t = new mu(this.datastore), (e = this.sc(t)) && e.then((function(e) {
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
            return !st(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), 
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
            return "aborted" === e || "failed-precondition" === e || !Ge(e);
        }
        return !1;
    }, t;
}(), wu = /** @class */ function() {
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
        this.credentials = t, this.asyncQueue = e, this.databaseInfo = i, this.user = fo.UNAUTHENTICATED, 
        this.clientId = V.u(), this.credentialListener = function() {
            return Promise.resolve();
        }, this.credentials.setChangeListener(e, (function(t) {
            return n(o, void 0, void 0, (function() {
                return r(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return C("FirestoreClient", "Received user=", t.uid), [ 4 /*yield*/ , this.credentialListener(t) ];

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
        if (this.asyncQueue.isShuttingDown) throw new D(N.FAILED_PRECONDITION, "The client has already been terminated.");
    }, t.prototype.terminate = function() {
        var t = this;
        this.asyncQueue.enterRestrictedMode();
        var e = new br;
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
                        return t = r.sent(), n = hs(t, "Failed to shutdown persistence"), e.reject(n), [ 3 /*break*/ , 6 ];

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
 */ function bu(t, e) {
    return n(this, void 0, void 0, (function() {
        var i, o, s = this;
        return r(this, (function(u) {
            switch (u.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), C("FirestoreClient", "Initializing OfflineComponentProvider"), 
                [ 4 /*yield*/ , t.getConfiguration() ];

              case 1:
                return i = u.sent(), [ 4 /*yield*/ , e.initialize(i) ];

              case 2:
                return u.sent(), o = i.initialUser, t.setCredentialChangeListener((function(t) {
                    return n(s, void 0, void 0, (function() {
                        return r(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return o.isEqual(t) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , Bi(e.localStore, t) ];

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

function Iu(t, e) {
    return n(this, void 0, void 0, (function() {
        var i, o;
        return r(this, (function(s) {
            switch (s.label) {
              case 0:
                return t.asyncQueue.verifyOperationInProgress(), [ 4 /*yield*/ , Tu(t) ];

              case 1:
                return i = s.sent(), C("FirestoreClient", "Initializing OnlineComponentProvider"), 
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
                                    return (n = F(t)).asyncQueue.verifyOperationInProgress(), C("RemoteStore", "RemoteStore received new credentials"), 
                                    i = zo(n), 
                                    // Tear down and re-create our network streams. This will ensure we get a
                                    // fresh auth token for the new user and re-fill the write pipeline with
                                    // new mutations from the LocalStore (since mutations are per-user).
                                    n.Or.add(3 /* CredentialChange */), [ 4 /*yield*/ , qo(n) ];

                                  case 1:
                                    return r.sent(), i && 
                                    // Don't set the network status to Unknown if we are offline.
                                    n.Br.set("Unknown" /* Unknown */), [ 4 /*yield*/ , n.remoteSyncer.handleCredentialChange(e) ];

                                  case 2:
                                    return r.sent(), n.Or.delete(3 /* CredentialChange */), [ 4 /*yield*/ , Vo(n) ];

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

function Tu(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            switch (e.label) {
              case 0:
                return t.offlineComponents ? [ 3 /*break*/ , 2 ] : (C("FirestoreClient", "Using default OfflineComponentProvider"), 
                [ 4 /*yield*/ , bu(t, new hu) ]);

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 /*return*/ , t.offlineComponents ];
            }
        }));
    }));
}

function Eu(t) {
    return n(this, void 0, void 0, (function() {
        return r(this, (function(e) {
            switch (e.label) {
              case 0:
                return t.onlineComponents ? [ 3 /*break*/ , 2 ] : (C("FirestoreClient", "Using default OnlineComponentProvider"), 
                [ 4 /*yield*/ , Iu(t, new du) ]);

              case 1:
                e.sent(), e.label = 2;

              case 2:
                return [ 2 /*return*/ , t.onlineComponents ];
            }
        }));
    }));
}

function _u(t) {
    return Tu(t).then((function(t) {
        return t.persistence;
    }));
}

function Su(t) {
    return Tu(t).then((function(t) {
        return t.localStore;
    }));
}

function Nu(t) {
    return Eu(t).then((function(t) {
        return t.remoteStore;
    }));
}

function Du(t) {
    return Eu(t).then((function(t) {
        return t.syncEngine;
    }));
}

function Au(t) {
    return n(this, void 0, void 0, (function() {
        var e, n;
        return r(this, (function(r) {
            switch (r.label) {
              case 0:
                return [ 4 /*yield*/ , Eu(t) ];

              case 1:
                return e = r.sent(), [ 2 /*return*/ , ((n = e.eventManager).onListen = Rs.bind(null, e.syncEngine), 
                n.onUnlisten = Os.bind(null, e.syncEngine), n) ];
            }
        }));
    }));
}

/** Enables the network connection and re-enqueues all pending operations. */ function ku(t, e, i) {
    var o = this;
    void 0 === i && (i = {});
    var s = new br;
    return t.asyncQueue.enqueueAndForget((function() {
        return n(o, void 0, void 0, (function() {
            var n;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return n = function(t, e, n, r, i) {
                        var o = new yu({
                            next: function(o) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return ms(t, s);
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
                                i.reject(new D(N.UNAVAILABLE, "Failed to get document because the client is offline.")) : u && o.fromCache && r && "server" === r.source ? i.reject(new D(N.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(o);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), s = new Is(Yt(n.path), o, {
                            includeMetadataChanges: !0,
                            so: !0
                        });
                        return vs(t, s);
                    }, [ 4 /*yield*/ , Au(t) ];

                  case 1:
                    return [ 2 /*return*/ , n.apply(void 0, [ r.sent(), t.asyncQueue, e, i, s ]) ];
                }
            }));
        }));
    })), s.promise;
}

function Cu(t, e, i) {
    var o = this;
    void 0 === i && (i = {});
    var s = new br;
    return t.asyncQueue.enqueueAndForget((function() {
        return n(o, void 0, void 0, (function() {
            var n;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return n = function(t, e, n, r, i) {
                        var o = new yu({
                            next: function(n) {
                                // Remove query first before passing event to user to avoid
                                // user actions affecting the now stale query.
                                e.enqueueAndForget((function() {
                                    return ms(t, s);
                                })), n.fromCache && "server" === r.source ? i.reject(new D(N.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
                            },
                            error: function(t) {
                                return i.reject(t);
                            }
                        }), s = new Is(n, o, {
                            includeMetadataChanges: !0,
                            so: !0
                        });
                        return vs(t, s);
                    }, [ 4 /*yield*/ , Au(t) ];

                  case 1:
                    return [ 2 /*return*/ , n.apply(void 0, [ r.sent(), t.asyncQueue, e, i, s ]) ];
                }
            }));
        }));
    })), s.promise;
}

var xu = 
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
}, Ru = /** @class */ function() {
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
}(), Lu = new Map, Ou = function(t, e) {
    this.user = e, this.type = "OAuth", this.authHeaders = {}, 
    // Set the headers using Object Literal notation to avoid minification
    this.authHeaders.Authorization = "Bearer " + t;
}, Pu = /** @class */ function() {
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
            return e(fo.UNAUTHENTICATED);
        }));
    }, t.prototype.removeChangeListener = function() {
        this.changeListener = null;
    }, t;
}(), Fu = /** @class */ function() {
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
}(), Mu = /** @class */ function() {
    function t(t) {
        var e = this;
        /** Tracks the current User. */        this.currentUser = fo.UNAUTHENTICATED, 
        /** Promise that allows blocking on the initialization of Firebase Auth. */
        this.oc = new br, 
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
            C("FirebaseCredentialsProvider", "Auth detected"), e.auth = t, e.auth.addAuthTokenListener(e.uc);
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
                C("FirebaseCredentialsProvider", "Auth not yet detected"), e.oc.resolve());
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
            return t.cc !== e ? (C("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            t.getToken()) : n ? (P("string" == typeof n.accessToken), new Ou(n.accessToken, t.currentUser)) : null;
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
        return P(null === t || "string" == typeof t), new fo(t);
    }, t;
}(), Vu = /** @class */ function() {
    function t(t, e, n) {
        this.hc = t, this.lc = e, this.fc = n, this.type = "FirstParty", this.user = fo.FIRST_PARTY;
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
}(), qu = /** @class */ function() {
    function t(t, e, n) {
        this.hc = t, this.lc = e, this.fc = n;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(new Vu(this.hc, this.lc, this.fc));
    }, t.prototype.setChangeListener = function(t, e) {
        // Fire with initial uid.
        t.enqueueRetryable((function() {
            return e(fo.FIRST_PARTY);
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
function Uu(t, e, n) {
    if (!n) throw new D(N.INVALID_ARGUMENT, "Function " + t + "() cannot be called with an empty " + e + ".");
}

function Bu(t, e) {
    if (void 0 === e) return {
        merge: !1
    };
    if (void 0 !== e.mergeFields && void 0 !== e.merge) throw new D(N.INVALID_ARGUMENT, "Invalid options passed to function " + t + '(): You cannot specify both "merge" and "mergeFields".');
    return e;
}

/**
 * Validates that two boolean options are not set at the same time.
 */ function ju(t, e, n, r) {
    if (!0 === e && !0 === r) throw new D(N.INVALID_ARGUMENT, t + " and " + n + " cannot be used together.");
}

/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */ function Ku(t) {
    if (!ct.isDocumentKey(t)) throw new D(N.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + t + " has " + t.length + ".");
}

/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */ function Qu(t) {
    if (ct.isDocumentKey(t)) throw new D(N.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + t + " has " + t.length + ".");
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
/** Returns a string describing the type / value of the provided input. */ function Gu(t) {
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
    return "function" == typeof t ? "a function" : O();
}

function zu(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    if ("_delegate" in t && (
    // Unwrap Compat types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t = t._delegate), !(t instanceof e)) {
        if (e.name === t.constructor.name) throw new D(N.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        var n = Gu(t);
        throw new D(N.INVALID_ARGUMENT, "Expected type '" + e.name + "', but it was: " + n);
    }
    return t;
}

function Wu(t, e) {
    if (e <= 0) throw new D(N.INVALID_ARGUMENT, "Function " + t + "() requires a positive number, but it was: " + e + ".");
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
 */ var Hu = /** @class */ function() {
    function t(t) {
        var e;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new D(N.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
        void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
            if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new D(N.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
        this.useFetchStreams = !!t.useFetchStreams, ju("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
    }
    return t.prototype.isEqual = function(t) {
        return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
    }, t;
}(), Yu = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new Hu({}), 
        this._settingsFrozen = !1, t instanceof Ru ? (this._databaseId = t, this._credentials = new Pu) : (this._app = t, 
        this._databaseId = function(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new D(N.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
            return new Ru(t.options.projectId);
        }(t), this._credentials = new Mu(e));
    }
    return Object.defineProperty(t.prototype, "app", {
        /**
         * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
         * instance.
         */
        get: function() {
            if (!this._app) throw new D(N.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
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
        if (this._settingsFrozen) throw new D(N.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new Hu(t), void 0 !== t.credentials && (this._credentials = function(t) {
            if (!t) return new Pu;
            switch (t.type) {
              case "gapi":
                var e = t.client;
                // Make sure this really is a Gapi client.
                                return P(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new qu(e, t.sessionIndex || "0", t.iamToken || null);

              case "provider":
                return t.client;

              default:
                throw new D(N.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
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
        return t = this, (e = Lu.get(t)) && (C("ComponentProvider", "Removing Datastore"), 
        Lu.delete(t), e.terminate()), Promise.resolve();
        var t, e;
    }, t;
}(), $u = /** @class */ function() {
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
            return new Ju(this.firestore, this.converter, this._key.path.popLast());
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.withConverter = function(e) {
        return new t(this.firestore, e, this._key);
    }, t;
}(), Xu = /** @class */ function() {
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
}(), Ju = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, Yt(r)) || this)._path = r, 
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
            return t.isEmpty() ? null : new $u(this.firestore, 
            /* converter= */ null, new ct(t));
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.withConverter = function(t) {
        return new n(this.firestore, t, this._path);
    }, n;
}(Xu);

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
 */ function Zu(t, n) {
    for (var r, i = [], o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
    if (t = l(t), Uu("collection", "path", n), t instanceof Yu) return Qu(r = H.fromString.apply(H, e([ n ], i))), 
    new Ju(t, /* converter= */ null, r);
    if (!(t instanceof $u || t instanceof Ju)) throw new D(N.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    return Qu(r = H.fromString.apply(H, e([ t.path ], i)).child(H.fromString(n))), new Ju(t.firestore, 
    /* converter= */ null, r);
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
 */ function ta(t, n) {
    for (var r, i = [], o = 2; o < arguments.length; o++) i[o - 2] = arguments[o];
    if (t = l(t), 
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    1 === arguments.length && (n = V.u()), Uu("doc", "path", n), t instanceof Yu) return Ku(r = H.fromString.apply(H, e([ n ], i))), 
    new $u(t, 
    /* converter= */ null, new ct(r));
    if (!(t instanceof $u || t instanceof Ju)) throw new D(N.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    return Ku(r = t._path.child(H.fromString.apply(H, e([ n ], i)))), new $u(t.firestore, t instanceof Ju ? t.converter : null, new ct(r));
}

/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function ea(t, e) {
    return t = l(t), e = l(e), (t instanceof $u || t instanceof Ju) && (e instanceof $u || e instanceof Ju) && t.firestore === e.firestore && t.path === e.path && t.converter === e.converter
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

function na(t, e) {
    return t = l(t), e = l(e), t instanceof Xu && e instanceof Xu && t.firestore === e.firestore && ie(t._query, e._query) && t.converter === e.converter
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

var ra = /** @class */ function() {
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
        this.Zi = new xo(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.Ic = function() {
            var e = ko();
            e && C("AsyncQueue", "Visibility state changed to " + e.visibilityState), t.Zi.Gi();
        };
        var e = ko();
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
            var e = ko();
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
                var n = new br;
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
                    if (!Nr(t = n.sent())) throw t;
                    // Failure will be handled by AsyncQueue
                                        return C("AsyncQueue", "Operation failed with retryable error: " + t), 
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
                throw e.yc = t, e.gc = !1, x("INTERNAL UNHANDLED ERROR: ", 
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
        var i = cs.createAndSchedule(this, t, e, n, (function(t) {
            return r.vc(t);
        }));
        return this.mc.push(i), i;
    }, t.prototype.Ac = function() {
        this.yc && O();
    }, t.prototype.verifyOperationInProgress = function() {}, 
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t.prototype.Pc = function() {
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

function ia(t) {
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

var oa = /** @class */ function() {
    function t() {
        this._progressObserver = {}, this._taskCompletionResolver = new br, this._lastProgress = {
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
}(), sa = -1, ua = /** @class */ function(e) {
    /** @hideconstructor */
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, n) || this).type = "firestore", r._queue = new ra, r._persistenceKey = "name" in t ? t.name : "[DEFAULT]", 
        r;
    }
    return t(n, e), n.prototype._terminate = function() {
        return this._firestoreClient || 
        // The client must be initialized to ensure that all subsequent API
        // usage throws an exception.
        ca(this), this._firestoreClient.terminate();
    }, n;
}(Yu);

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
function aa(t) {
    return t._firestoreClient || ca(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
}

function ca(t) {
    var e, n = t._freezeSettings(), r = function(t, e, n, r) {
        return new xu(t, e, n, r.host, r.ssl, r.experimentalForceLongPolling, r.experimentalAutoDetectLongPolling, r.useFetchStreams);
    }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, n);
    t._firestoreClient = new wu(t._credentials, t._queue, r);
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
 */
/**
 * Registers both the `OfflineComponentProvider` and `OnlineComponentProvider`.
 * If the operation fails with a recoverable error (see
 * `canRecoverFromIndexedDbError()` below), the returned Promise is rejected
 * but the client remains usable.
 */ function ha(t, e, i) {
    var o = this, s = new br;
    return t.asyncQueue.enqueue((function() {
        return n(o, void 0, void 0, (function() {
            var n;
            return r(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return r.trys.push([ 0, 3, , 4 ]), [ 4 /*yield*/ , bu(t, i) ];

                  case 1:
                    return r.sent(), [ 4 /*yield*/ , Iu(t, e) ];

                  case 2:
                    return r.sent(), s.resolve(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (!
                    /**
         * Decides whether the provided error allows us to gracefully disable
         * persistence (as opposed to crashing the client).
         */
                    function(t) {
                        return "FirebaseError" === t.name ? t.code === N.FAILED_PRECONDITION || t.code === N.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || (22 === t.code || 20 === t.code || 
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

/**
 * Re-enables use of the network for this Firestore instance after a prior
 * call to {@link disableNetwork}.
 *
 * @returns A promise that is resolved once the network has been enabled.
 */
function fa(t) {
    if (t._initialized || t._terminated) throw new D(N.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
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
 */ var la = /** @class */ function() {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function t() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var n = 0; n < t.length; ++n) if (0 === t[n].length) throw new D(N.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new $(t);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */    return t.prototype.isEqual = function(t) {
        return this._internalPath.isEqual(t._internalPath);
    }, t;
}(), da = /** @class */ function() {
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
            return new t(J.fromBase64String(e));
        } catch (e) {
            throw new D(N.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + e);
        }
    }, 
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    t.fromUint8Array = function(e) {
        return new t(J.fromUint8Array(e));
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
}(), pa = 
/**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
function(t) {
    this._methodName = t;
}, ya = /** @class */ function() {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    function t(t, e) {
        if (!isFinite(t) || t < -90 || t > 90) throw new D(N.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new D(N.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
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
        return q(this._lat, t._lat) || q(this._long, t._long);
    }, t;
}(), va = /^__.*__$/, ma = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return null !== this.fieldMask ? new Fe(t, this.data, this.fieldMask, e, this.fieldTransforms) : new Pe(t, this.data, e, this.fieldTransforms);
    }, t;
}(), ga = /** @class */ function() {
    function t(t, 
    // The fieldMask does not include document transforms.
    e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    return t.prototype.toMutation = function(t, e) {
        return new Fe(t, this.data, this.fieldMask, e, this.fieldTransforms);
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
 */ function wa(t) {
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
        throw O();
    }
}

/** A "context" object passed around while parsing user data. */ var ba = /** @class */ function() {
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
        return Ua(t, this.settings.methodName, this.settings.Bc || !1, this.path, this.settings.qc);
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
        if (wa(this.Nc) && va.test(t)) throw this.Lc('Document fields cannot begin and end with "__"');
    }, t;
}(), Ia = /** @class */ function() {
    function t(t, e, n) {
        this.databaseId = t, this.ignoreUndefinedProperties = e, this.R = n || Co(t)
        /** Creates a new top-level parse context. */;
    }
    return t.prototype.Uc = function(t, e, n, r) {
        return void 0 === r && (r = !1), new ba({
            Nc: t,
            methodName: e,
            qc: n,
            path: $.emptyPath(),
            kc: !1,
            Bc: r
        }, this.databaseId, this.R, this.ignoreUndefinedProperties);
    }, t;
}();

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ function Ta(t) {
    var e = t._freezeSettings(), n = Co(t._databaseId);
    return new Ia(t._databaseId, !!e.ignoreUndefinedProperties, n);
}

/** Parse document data from a set() call. */ function Ea(t, e, n, r, i, o) {
    void 0 === o && (o = {});
    var s = t.Uc(o.merge || o.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
    Fa("Data must be an object, but it was:", s, r);
    var u, a, c = Oa(r, s);
    if (o.merge) u = new X(s.fieldMask), a = s.fieldTransforms; else if (o.mergeFields) {
        for (var h = [], f = 0, l = o.mergeFields; f < l.length; f++) {
            var d = Ma(e, l[f], n);
            if (!s.contains(d)) throw new D(N.INVALID_ARGUMENT, "Field '" + d + "' is specified in your field mask but missing from your input data.");
            Ba(h, d) || h.push(d);
        }
        u = new X(h), a = s.fieldTransforms.filter((function(t) {
            return u.covers(t.field);
        }));
    } else u = null, a = s.fieldTransforms;
    return new ma(new _t(c), u, a);
}

var _a = /** @class */ function(e) {
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
}(pa);

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
 */ function Sa(t, e, n) {
    return new ba({
        Nc: 3 /* Argument */ ,
        qc: e.settings.qc,
        methodName: t._methodName,
        kc: n
    }, e.databaseId, e.R, e.ignoreUndefinedProperties);
}

var Na = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        return new Se(t.path, new me);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(pa), Da = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Kc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = Sa(this, t, 
        /*array=*/ !0), n = this.Kc.map((function(t) {
            return La(t, e);
        })), r = new ge(n);
        return new Se(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(pa), Aa = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Kc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = Sa(this, t, 
        /*array=*/ !0), n = this.Kc.map((function(t) {
            return La(t, e);
        })), r = new be(n);
        return new Se(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(pa), ka = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t) || this).Qc = n, r;
    }
    return t(n, e), n.prototype._toFieldTransform = function(t) {
        var e = new Te(t.R, le(t.R, this.Qc));
        return new Se(t.path, e);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(pa);

/** Parse update data from an update() call. */ function Ca(t, e, n, r) {
    var i = t.Uc(1 /* Update */ , e, n);
    Fa("Data must be an object, but it was:", i, r);
    var o = [], s = _t.empty();
    G(r, (function(t, r) {
        var u = qa(e, t, n);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                r = l(r);
        var a = i.Oc(u);
        if (r instanceof _a) 
        // Add it to the field mask, but don't add anything to updateData.
        o.push(u); else {
            var c = La(r, a);
            null != c && (o.push(u), s.set(u, c));
        }
    }));
    var u = new X(o);
    return new ga(s, u, i.fieldTransforms);
}

/** Parse update data from a list of field/value arguments. */ function xa(t, e, n, r, i, o) {
    var s = t.Uc(1 /* Update */ , e, n), u = [ Ma(e, r, n) ], a = [ i ];
    if (o.length % 2 != 0) throw new D(N.INVALID_ARGUMENT, "Function " + e + "() needs to be called with an even number of arguments that alternate between field names and values.");
    for (var c = 0; c < o.length; c += 2) u.push(Ma(e, o[c])), a.push(o[c + 1]);
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (var h = [], f = _t.empty(), d = u.length - 1; d >= 0; --d) if (!Ba(h, u[d])) {
        var p = u[d], y = a[d];
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        y = l(y);
        var v = s.Oc(p);
        if (y instanceof _a) 
        // Add it to the field mask, but don't add anything to updateData.
        h.push(p); else {
            var m = La(y, v);
            null != m && (h.push(p), f.set(p, m));
        }
    }
    var g = new X(h);
    return new ga(f, g, s.fieldTransforms);
}

/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */ function Ra(t, e, n, r) {
    return void 0 === r && (r = !1), La(n, t.Uc(r ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
}

/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */ function La(t, e) {
    if (Pa(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    t = l(t))) return Fa("Unsupported field value:", e, t), Oa(t, e);
    if (t instanceof pa) 
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
        if (!wa(e.Nc)) throw e.Lc(t._methodName + "() can only be used with update() and set()");
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
                var s = La(o[i], e.Mc(r));
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
        if (null === (t = l(t))) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return le(e.R, t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            var n = j.fromDate(t);
            return {
                timestampValue: In(e.R, n)
            };
        }
        if (t instanceof j) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            n = new j(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: In(e.R, n)
            };
        }
        if (t instanceof ya) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof da) return {
            bytesValue: Tn(e.R, t._byteString)
        };
        if (t instanceof $u) {
            n = e.databaseId;
            var r = t.firestore._databaseId;
            if (!r.isEqual(n)) throw e.Lc("Document reference is for database " + r.projectId + "/" + r.database + " but should be for database " + n.projectId + "/" + n.database);
            return {
                referenceValue: Sn(t.firestore._databaseId || e.databaseId, t._key.path)
            };
        }
        throw e.Lc("Unsupported field value: " + Gu(t));
    }(t, e);
}

function Oa(t, e) {
    var n = {};
    return z(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path) : G(t, (function(t, r) {
        var i = La(r, e.Fc(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function Pa(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof j || t instanceof ya || t instanceof da || t instanceof $u || t instanceof pa);
}

function Fa(t, e, n) {
    if (!Pa(n) || !function(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }(n)) {
        var r = Gu(n);
        throw "an object" === r ? e.Lc(t + " a custom object") : e.Lc(t + " " + r);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function Ma(t, e, n) {
    if (
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    (e = l(e)) instanceof la) return e._internalPath;
    if ("string" == typeof e) return qa(t, e);
    throw Ua("Field path arguments must be of type string or FieldPath.", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
}

/**
 * Matches any characters in a field path string that are reserved.
 */ var Va = new RegExp("[~\\*/\\[\\]]");

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */ function qa(t, n, r) {
    if (n.search(Va) >= 0) throw Ua("Invalid field path (" + n + "). Paths must not contain '~', '*', '/', '[', or ']'", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, r);
    try {
        return (new (la.bind.apply(la, e([ void 0 ], n.split(".")))))._internalPath;
    } catch (e) {
        throw Ua("Invalid field path (" + n + "). Paths must not be empty, begin with '.', end with '.', or contain '..'", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, r);
    }
}

function Ua(t, e, n, r, i) {
    var o = r && !r.isEmpty(), s = void 0 !== i, u = "Function " + e + "() called with invalid data";
    n && (u += " (via `toFirestore()`)");
    var a = "";
    return (o || s) && (a += " (found", o && (a += " in field " + r), s && (a += " in document " + i), 
    a += ")"), new D(N.INVALID_ARGUMENT, (u += ". ") + t + a)
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */;
}

function Ba(t, e) {
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
 */ var ja = /** @class */ function() {
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
            return new $u(this._firestore, this._converter, this._key);
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
                var t = new Ka(this._firestore, this._userDataWriter, this._key, this._document, 
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
            var e = this._document.data.field(Qa("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e);
        }
    }, t;
}(), Ka = /** @class */ function(e) {
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
}(ja);

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
function Qa(t, e) {
    return "string" == typeof e ? qa(t, e) : e instanceof la ? e._internalPath : e._delegate._internalPath;
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
 */ var Ga = /** @class */ function() {
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
}(), za = /** @class */ function(e) {
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
                var e = new Wa(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
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
            var n = this._document.data.field(Qa("DocumentSnapshot.get", t));
            if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
    }, n;
}(ja), Wa = /** @class */ function(e) {
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
}(za), Ha = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e, n, r) {
        this._firestore = t, this._userDataWriter = e, this._snapshot = r, this.metadata = new Ga(r.hasPendingWrites, r.fromCache), 
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
            t.call(e, new Wa(n._firestore, n._userDataWriter, r.key, r, new Ga(n._snapshot.mutatedKeys.has(r.key), n._snapshot.fromCache), n.query.converter));
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
        if (e && this._snapshot.excludesMetadataChanges) throw new D(N.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = 
        /** Calculates the array of DocumentChanges for a given ViewSnapshot. */
        function(t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
                var n = 0;
                return t._snapshot.docChanges.map((function(e) {
                    return {
                        type: "added",
                        doc: new Wa(t._firestore, t._userDataWriter, e.doc.key, e.doc, new Ga(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter),
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
                var n = new Wa(t._firestore, t._userDataWriter, e.doc.key, e.doc, new Ga(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter), i = -1, o = -1;
                return 0 /* Added */ !== e.type && (i = r.indexOf(e.doc.key), r = r.delete(e.doc.key)), 
                1 /* Removed */ !== e.type && (o = (r = r.add(e.doc)).indexOf(e.doc.key)), {
                    type: Ya(e.type),
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
 */ function Ya(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return O();
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
 */ function $a(t, e) {
    return t instanceof za && e instanceof za ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof Ha && e instanceof Ha && t._firestore === e._firestore && na(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot);
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
 */ function Xa(t) {
    if (Xt(t) && 0 === t.explicitOrderBy.length) throw new D(N.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ var Ja = function() {};

/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */ function Za(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    for (var r = 0, i = e; r < i.length; r++) {
        var o = i[r];
        t = o._apply(t);
    }
    return t;
}

var tc = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).jc = t, i.Wc = n, i.Gc = r, i.type = "where", 
        i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = Ta(t.firestore), n = function(t, e, n, r, i, o, s) {
            var u;
            if (i.isKeyField()) {
                if ("array-contains" /* ARRAY_CONTAINS */ === o || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === o) throw new D(N.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + o + "' queries on FieldPath.documentId().");
                if ("in" /* IN */ === o || "not-in" /* NOT_IN */ === o) {
                    uc(s, o);
                    for (var a = [], c = 0, h = s; c < h.length; c++) {
                        var f = h[c];
                        a.push(sc(r, t, f));
                    }
                    u = {
                        arrayValue: {
                            values: a
                        }
                    };
                } else u = sc(r, t, s);
            } else "in" /* IN */ !== o && "not-in" /* NOT_IN */ !== o && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== o || uc(s, o), 
            u = Ra(n, "where", s, 
            /* allowArrays= */ "in" /* IN */ === o || "not-in" /* NOT_IN */ === o);
            var l = Rt.create(i, o, u);
            return function(t, e) {
                if (e.g()) {
                    var n = Zt(t);
                    if (null !== n && !n.isEqual(e.field)) throw new D(N.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '" + n.toString() + "' and '" + e.field.toString() + "'");
                    var r = Jt(t);
                    null !== r && ac(t, e.field, r);
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
                throw i === e.op ? new D(N.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + e.op.toString() + "' filter.") : new D(N.INVALID_ARGUMENT, "Invalid query. You cannot use '" + e.op.toString() + "' filters with '" + i.toString() + "' filters.");
            }(t, l), l;
        }(t._query, 0, e, t.firestore._databaseId, this.jc, this.Wc, this.Gc);
        return new Xu(t.firestore, t.converter, function(t, e) {
            var n = t.filters.concat([ e ]);
            return new Wt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, n));
    }, n;
}(Ja), ec = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).jc = t, r.zc = n, r.type = "orderBy", r;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = function(t, e, n) {
            if (null !== t.startAt) throw new D(N.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== t.endAt) throw new D(N.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            var r = new Kt(e, n);
            return function(t, e) {
                if (null === Jt(t)) {
                    // This is the first order by. It must match any inequality.
                    var n = Zt(t);
                    null !== n && ac(t, n, e.field);
                }
            }(t, r), r;
        }(t._query, this.jc, this.zc);
        return new Xu(t.firestore, t.converter, function(t, e) {
            // TODO(dimond): validate that orderBy does not list the same key twice.
            var n = t.explicitOrderBy.concat([ e ]);
            return new Wt(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, e));
    }, n;
}(Ja), nc = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Hc = n, i.Jc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        return new Xu(t.firestore, t.converter, re(t._query, this.Hc, this.Jc));
    }, n;
}(Ja), rc = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Yc = n, i.Xc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = oc(t, this.type, this.Yc, this.Xc);
        return new Xu(t.firestore, t.converter, function(t, e) {
            return new Wt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
        }(t._query, e));
    }, n;
}(Ja), ic = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).type = t, i.Yc = n, i.Xc = r, i;
    }
    return t(n, e), n.prototype._apply = function(t) {
        var e = oc(t, this.type, this.Yc, this.Xc);
        return new Xu(t.firestore, t.converter, function(t, e) {
            return new Wt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
        }(t._query, e));
    }, n;
}(Ja);

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
function oc(t, e, n, r) {
    if (n[0] = l(n[0]), n[0] instanceof ja) return function(t, e, n, r, i) {
        if (!r) throw new D(N.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + n + "().");
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
        for (var o = [], s = 0, u = ee(t); s < u.length; s++) {
            var a = u[s];
            if (a.field.isKeyField()) o.push(mt(e, r.key)); else {
                var c = r.data.field(a.field);
                if (rt(c)) throw new D(N.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + a.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === c) {
                    var h = a.field.canonicalString();
                    throw new D(N.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + h + "' (used as the orderBy) does not exist.");
                }
                o.push(c);
            }
        }
        return new Bt(o, i);
    }(t._query, t.firestore._databaseId, e, n[0]._document, r);
    var i = Ta(t.firestore);
    return function(t, e, n, r, i, o) {
        // Use explicit order by's because it has to match the query the user made
        var s = t.explicitOrderBy;
        if (i.length > s.length) throw new D(N.INVALID_ARGUMENT, "Too many arguments provided to " + r + "(). The number of arguments must be less than or equal to the number of orderBy() clauses");
        for (var u = [], a = 0; a < i.length; a++) {
            var c = i[a];
            if (s[a].field.isKeyField()) {
                if ("string" != typeof c) throw new D(N.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + r + "(), but got a " + typeof c);
                if (!te(t) && -1 !== c.indexOf("/")) throw new D(N.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + r + "() must be a plain document ID, but '" + c + "' contains a slash.");
                var h = t.path.child(H.fromString(c));
                if (!ct.isDocumentKey(h)) throw new D(N.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + r + "() must result in a valid document path, but '" + h + "' is not because it contains an odd number of segments.");
                var f = new ct(h);
                u.push(mt(e, f));
            } else {
                var l = Ra(n, r, c);
                u.push(l);
            }
        }
        return new Bt(u, o);
    }(t._query, t.firestore._databaseId, i, e, n, r);
}

function sc(t, e, n) {
    if ("string" == typeof (n = l(n))) {
        if ("" === n) throw new D(N.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!te(e) && -1 !== n.indexOf("/")) throw new D(N.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" + n + "' contains a '/' character.");
        var r = e.path.child(H.fromString(n));
        if (!ct.isDocumentKey(r)) throw new D(N.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + r + "' is not because it has an odd number of segments (" + r.length + ").");
        return mt(t, new ct(r));
    }
    if (n instanceof $u) return mt(t, n._key);
    throw new D(N.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + Gu(n) + ".");
}

/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */ function uc(t, e) {
    if (!Array.isArray(t) || 0 === t.length) throw new D(N.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
    if (t.length > 10) throw new D(N.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
}

function ac(t, e, n) {
    if (!n.isEqual(e)) throw new D(N.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '" + e.toString() + "' and so you must also use '" + e.toString() + "' as your first argument to orderBy(), but your first orderBy() is on field '" + n.toString() + "' instead.");
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
 */ var cc = /** @class */ function() {
    function t() {}
    return t.prototype.convertValue = function(t, e) {
        switch (void 0 === e && (e = "none"), ht(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return et(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.convertTimestamp(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.convertServerTimestamp(t, e);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return this.convertBytes(nt(t.bytesValue));

          case 7 /* RefValue */ :
            return this.convertReference(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.convertGeoPoint(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.convertArray(t.arrayValue, e);

          case 10 /* ObjectValue */ :
            return this.convertObject(t.mapValue, e);

          default:
            throw O();
        }
    }, t.prototype.convertObject = function(t, e) {
        var n = this, r = {};
        return G(t.fields, (function(t, i) {
            r[t] = n.convertValue(i, e);
        })), r;
    }, t.prototype.convertGeoPoint = function(t) {
        return new ya(et(t.latitude), et(t.longitude));
    }, t.prototype.convertArray = function(t, e) {
        var n = this;
        return (t.values || []).map((function(t) {
            return n.convertValue(t, e);
        }));
    }, t.prototype.convertServerTimestamp = function(t, e) {
        switch (e) {
          case "previous":
            var n = it(t);
            return null == n ? null : this.convertValue(n, e);

          case "estimate":
            return this.convertTimestamp(ot(t));

          default:
            return null;
        }
    }, t.prototype.convertTimestamp = function(t) {
        var e = tt(t);
        return new j(e.seconds, e.nanos);
    }, t.prototype.convertDocumentKey = function(t, e) {
        var n = H.fromString(t);
        P($n(n));
        var r = new Ru(n.get(1), n.get(3)), i = new ct(n.popFirst(5));
        return r.isEqual(e) || 
        // TODO(b/64130202): Somehow support foreign references.
        x("Document " + i + " contains a document reference within a different database (" + r.projectId + "/" + r.database + ") which is not supported. It will be treated as a reference in the current database (" + e.projectId + "/" + e.database + ") instead."), 
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
 */ function hc(t, e, n) {
    // Cast to `any` in order to satisfy the union type constraint on
    // toFirestore().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e;
}

var fc = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new da(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new $u(this.firestore, /* converter= */ null, e);
    }, n;
}(cc), lc = /** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, 
        this._dataReader = Ta(t);
    }
    return t.prototype.set = function(t, e, n) {
        this._verifyNotCommitted();
        var r = dc(t, this._firestore), i = hc(r.converter, e, n), o = Ea(this._dataReader, "WriteBatch.set", r._key, i, null !== r.converter, n);
        return this._mutations.push(o.toMutation(r._key, De.none())), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        this._verifyNotCommitted();
        var o, s = dc(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = l(e)) || e instanceof la ? xa(this._dataReader, "WriteBatch.update", s._key, e, n, r) : Ca(this._dataReader, "WriteBatch.update", s._key, e), 
        this._mutations.push(o.toMutation(s._key, De.exists(!0))), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        this._verifyNotCommitted();
        var e = dc(t, this._firestore);
        return this._mutations = this._mutations.concat(new je(e._key, De.none())), this;
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
        if (this._committed) throw new D(N.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
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
 */ function dc(t, e) {
    if ((t = l(t)).firestore !== e) throw new D(N.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
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
 */ var pc = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new da(t);
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new $u(this.firestore, /* converter= */ null, e);
    }, n;
}(cc);

/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function yc(t, e, n) {
    for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
    t = zu(t, $u);
    var o = zu(t.firestore, ua), s = Ta(o);
    return mc(o, [ ("string" == typeof (
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    e = l(e)) || e instanceof la ? xa(s, "updateDoc", t._key, e, n, r) : Ca(s, "updateDoc", t._key, e)).toMutation(t._key, De.exists(!0)) ]);
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */ function vc(t) {
    for (var e, i, o, s = [], u = 1; u < arguments.length; u++) s[u - 1] = arguments[u];
    t = l(t);
    var a = {
        includeMetadataChanges: !1
    }, c = 0;
    "object" != typeof s[c] || ia(s[c]) || (a = s[c], c++);
    var h, f, d, p = {
        includeMetadataChanges: a.includeMetadataChanges
    };
    if (ia(s[c])) {
        var y = s[c];
        s[c] = null === (e = y.next) || void 0 === e ? void 0 : e.bind(y), s[c + 1] = null === (i = y.error) || void 0 === i ? void 0 : i.bind(y), 
        s[c + 2] = null === (o = y.complete) || void 0 === o ? void 0 : o.bind(y);
    }
    if (t instanceof $u) f = zu(t.firestore, ua), d = Yt(t._key.path), h = {
        next: function(e) {
            s[c] && s[c](gc(f, t, e));
        },
        error: s[c + 1],
        complete: s[c + 2]
    }; else {
        var v = zu(t, Xu);
        f = zu(v.firestore, ua), d = v._query;
        var m = new pc(f);
        h = {
            next: function(t) {
                s[c] && s[c](new Ha(f, m, v, t));
            },
            error: s[c + 1],
            complete: s[c + 2]
        }, Xa(t._query);
    }
    return function(t, e, i, o) {
        var s = this, u = new yu(o), a = new Is(e, u, i);
        return t.asyncQueue.enqueueAndForget((function() {
            return n(s, void 0, void 0, (function() {
                var e;
                return r(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return e = vs, [ 4 /*yield*/ , Au(t) ];

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
                            return e = ms, [ 4 /*yield*/ , Au(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), a ]) ];
                        }
                    }));
                }));
            }));
        };
    }(aa(f), d, p, h);
}

/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ function mc(t, e) {
    return function(t, e) {
        var i = this, o = new br;
        return t.asyncQueue.enqueueAndForget((function() {
            return n(i, void 0, void 0, (function() {
                var n;
                return r(this, (function(r) {
                    switch (r.label) {
                      case 0:
                        return n = Ps, [ 4 /*yield*/ , Du(t) ];

                      case 1:
                        return [ 2 /*return*/ , n.apply(void 0, [ r.sent(), e, o ]) ];
                    }
                }));
            }));
        })), o.promise;
    }(aa(t), e);
}

/**
 * Converts a ViewSnapshot that contains the single document specified by `ref`
 * to a DocumentSnapshot.
 */ function gc(t, e, n) {
    var r = n.docs.get(e._key), i = new pc(t);
    return new za(t, i, e._key, r, new Ga(n.hasPendingWrites, n.fromCache), e.converter);
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
 */ var wc = /** @class */ function(e) {
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
        var n = this, r = dc(t, this._firestore), i = new pc(this._firestore);
        return e.prototype.get.call(this, t).then((function(t) {
            return new za(n._firestore, i, r._key, t._document, new Ga(
            /* hasPendingWrites= */ !1, 
            /* fromCache= */ !1), r.converter);
        }));
    }, n;
}(/** @class */ function() {
    /** @hideconstructor */
    function t(t, e) {
        this._firestore = t, this._transaction = e, this._dataReader = Ta(t)
        /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */;
    }
    return t.prototype.get = function(t) {
        var e = this, n = dc(t, this._firestore), r = new fc(this._firestore);
        return this._transaction.lookup([ n._key ]).then((function(t) {
            if (!t || 1 !== t.length) return O();
            var i = t[0];
            if (i.isFoundDocument()) return new ja(e._firestore, r, i.key, i, n.converter);
            if (i.isNoDocument()) return new ja(e._firestore, r, n._key, null, n.converter);
            throw O();
        }));
    }, t.prototype.set = function(t, e, n) {
        var r = dc(t, this._firestore), i = hc(r.converter, e, n), o = Ea(this._dataReader, "Transaction.set", r._key, i, null !== r.converter, n);
        return this._transaction.set(r._key, o), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
        var o, s = dc(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                return o = "string" == typeof (e = l(e)) || e instanceof la ? xa(this._dataReader, "Transaction.update", s._key, e, n, r) : Ca(this._dataReader, "Transaction.update", s._key, e), 
        this._transaction.update(s._key, o), this;
    }, 
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    t.prototype.delete = function(t) {
        var e = dc(t, this._firestore);
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
/** Helper function to assert Uint8Array is available at runtime. */ function bc() {
    if ("undefined" == typeof Uint8Array) throw new D(N.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.");
}

/** Helper function to assert Base64 functions are available at runtime. */ function Ic() {
    if ("undefined" == typeof atob) throw new D(N.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.");
}

/** Immutable class holding a blob (binary data) */ var Tc = /** @class */ function() {
    function t(t) {
        this._delegate = t;
    }
    return t.fromBase64String = function(e) {
        return Ic(), new t(da.fromBase64String(e));
    }, t.fromUint8Array = function(e) {
        return bc(), new t(da.fromUint8Array(e));
    }, t.prototype.toBase64 = function() {
        return Ic(), this._delegate.toBase64();
    }, t.prototype.toUint8Array = function() {
        return bc(), this._delegate.toUint8Array();
    }, t.prototype.isEqual = function(t) {
        return this._delegate.isEqual(t._delegate);
    }, t.prototype.toString = function() {
        return "Blob(base64: " + this.toBase64() + ")";
    }, t;
}(), Ec = /** @class */ function() {
    function t() {}
    return t.prototype.enableIndexedDbPersistence = function(t, e) {
        return function(t, e) {
            fa(t = zu(t, ua));
            var n = aa(t), r = t._freezeSettings(), i = new du;
            return ha(n, i, new fu(i, r.cacheSizeBytes, null == e ? void 0 : e.forceOwnership));
        }(t._delegate, {
            forceOwnership: e
        });
    }, t.prototype.enableMultiTabIndexedDbPersistence = function(t) {
        return function(t) {
            fa(t = zu(t, ua));
            var e = aa(t), n = t._freezeSettings(), r = new du;
            return ha(e, r, new lu(r, n.cacheSizeBytes));
        }(t._delegate);
    }, t.prototype.clearIndexedDbPersistence = function(t) {
        return function(t) {
            var e = this;
            if (t._initialized && !t._terminated) throw new D(N.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
            var i = new br;
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
                                            return Er.yt() ? (e = t + "main", [ 4 /*yield*/ , Er.delete(e) ]) : [ 2 /*return*/ , Promise.resolve() ];

                                          case 1:
                                            return n.sent(), [ 2 /*return*/ ];
                                        }
                                    }));
                                }));
                            }(Oi(t._databaseId, t._persistenceKey)) ];

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
        }(t._delegate);
    }, t;
}(), _c = /** @class */ function() {
    function t(t, e, n) {
        var r = this;
        this._delegate = e, this.Zc = n, this.INTERNAL = {
            delete: function() {
                return r.terminate();
            }
        }, t instanceof Ru || (this.tu = t);
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
            var i = (t = zu(t, Yu))._getSettings();
            if ("firestore.googleapis.com" !== i.host && i.host !== e && R("Host has been set in both settings() and useEmulator(), emulator host will be used"), 
            t._setSettings(Object.assign(Object.assign({}, i), {
                host: e + ":" + n,
                ssl: !1
            })), r.mockUserToken) {
                // Let createMockUserToken validate first (catches common mistakes like
                // invalid field "uid" and missing field "sub" / "user_id".)
                var o = d(r.mockUserToken), s = r.mockUserToken.sub || r.mockUserToken.user_id;
                if (!s) throw new D(N.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
                t._credentials = new Fu(new Ou(o, new fo(s)));
            }
        }(this._delegate, t, e, n);
    }, t.prototype.enableNetwork = function() {
        return function(t) {
            var e = this;
            return t.asyncQueue.enqueue((function() {
                return n(e, void 0, void 0, (function() {
                    var e, n;
                    return r(this, (function(r) {
                        switch (r.label) {
                          case 0:
                            return [ 4 /*yield*/ , _u(t) ];

                          case 1:
                            return e = r.sent(), [ 4 /*yield*/ , Nu(t) ];

                          case 2:
                            return n = r.sent(), [ 2 /*return*/ , (e.setNetworkEnabled(!0), function(t) {
                                var e = F(t);
                                return e.Or.delete(0 /* UserDisabled */), Vo(e);
                            }(n)) ];
                        }
                    }));
                }));
            }));
        }
        /** Disables the network connection. Pending operations will not complete. */ (aa(zu(this._delegate, ua)));
    }, t.prototype.disableNetwork = function() {
        return function(t) {
            var e = this;
            return t.asyncQueue.enqueue((function() {
                return n(e, void 0, void 0, (function() {
                    var e, i;
                    return r(this, (function(o) {
                        switch (o.label) {
                          case 0:
                            return [ 4 /*yield*/ , _u(t) ];

                          case 1:
                            return e = o.sent(), [ 4 /*yield*/ , Nu(t) ];

                          case 2:
                            return i = o.sent(), [ 2 /*return*/ , (e.setNetworkEnabled(!1), function(t) {
                                return n(this, void 0, void 0, (function() {
                                    var e;
                                    return r(this, (function(n) {
                                        switch (n.label) {
                                          case 0:
                                            return (e = F(t)).Or.add(0 /* UserDisabled */), [ 4 /*yield*/ , qo(e) ];

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
 */ (aa(zu(this._delegate, ua)));
    }, t.prototype.enablePersistence = function(t) {
        var e = !1, n = !1;
        return t && ju("synchronizeTabs", e = !!t.synchronizeTabs, "experimentalForceOwningTab", n = !!t.experimentalForceOwningTab), 
        e ? this.Zc.enableMultiTabIndexedDbPersistence(this) : this.Zc.enableIndexedDbPersistence(this, n);
    }, t.prototype.clearPersistence = function() {
        return this.Zc.clearIndexedDbPersistence(this);
    }, t.prototype.terminate = function() {
        return this.tu && (this.tu._removeServiceInstance("firestore"), this.tu._removeServiceInstance("firestore-exp")), 
        this._delegate._delete();
    }, t.prototype.waitForPendingWrites = function() {
        return function(t) {
            var e = this, i = new br;
            return t.asyncQueue.enqueueAndForget((function() {
                return n(e, void 0, void 0, (function() {
                    var e;
                    return r(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = Bs, [ 4 /*yield*/ , Du(t) ];

                          case 1:
                            return [ 2 /*return*/ , e.apply(void 0, [ n.sent(), i ]) ];
                        }
                    }));
                }));
            })), i.promise;
        }(aa(zu(this._delegate, ua)));
    }, t.prototype.onSnapshotsInSync = function(t) {
        return function(t, e) {
            return function(t, e) {
                var i = this, o = new yu(e);
                return t.asyncQueue.enqueueAndForget((function() {
                    return n(i, void 0, void 0, (function() {
                        var e;
                        return r(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return e = function(t, e) {
                                    F(t).Gr.add(e), 
                                    // Immediately fire an initial event, indicating all existing listeners
                                    // are in-sync.
                                    e.next();
                                }, [ 4 /*yield*/ , Au(t) ];

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
                                        F(t).Gr.delete(e);
                                    }, [ 4 /*yield*/ , Au(t) ];

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
            }(aa(t = zu(t, ua)), ia(e) ? e : {
                next: e
            });
        }(this._delegate, t);
    }, Object.defineProperty(t.prototype, "app", {
        get: function() {
            if (!this.tu) throw new D(N.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this.tu;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.collection = function(t) {
        try {
            return new qc(this, Zu(this._delegate, t));
        } catch (t) {
            throw xc(t, "collection()", "Firestore.collection()");
        }
    }, t.prototype.doc = function(t) {
        try {
            return new Cc(this, ta(this._delegate, t));
        } catch (t) {
            throw xc(t, "doc()", "Firestore.doc()");
        }
    }, t.prototype.collectionGroup = function(t) {
        try {
            return new Fc(this, function(t, e) {
                if (t = zu(t, Yu), Uu("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new D(N.INVALID_ARGUMENT, "Invalid collection ID '" + e + "' passed to function collectionGroup(). Collection IDs must not contain '/'.");
                return new Xu(t, 
                /* converter= */ null, 
                /**
 * Creates a new Query for a collection group query that matches all documents
 * within the provided collection group.
 */
                function(t) {
                    return new Wt(H.emptyPath(), t);
                }(e));
            }(this._delegate, t));
        } catch (t) {
            throw xc(t, "collectionGroup()", "Firestore.collectionGroup()");
        }
    }, t.prototype.runTransaction = function(t) {
        var e = this;
        return function(t, e) {
            return function(t, e) {
                var i = this, o = new br;
                return t.asyncQueue.enqueueAndForget((function() {
                    return n(i, void 0, void 0, (function() {
                        var n;
                        return r(this, (function(r) {
                            switch (r.label) {
                              case 0:
                                return [ 4 /*yield*/ , function(t) {
                                    return Eu(t).then((function(t) {
                                        return t.datastore;
                                    }));
                                }(t) ];

                              case 1:
                                return n = r.sent(), new gu(t.asyncQueue, n, e, o).run(), [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), o.promise;
            }(aa(t), (function(n) {
                return e(new wc(t, n));
            }));
        }(this._delegate, (function(n) {
            return t(new Dc(e, n));
        }));
    }, t.prototype.batch = function() {
        var t = this;
        return aa(this._delegate), new Ac(new lc(this._delegate, (function(e) {
            return mc(t._delegate, e);
        })));
    }, t.prototype.loadBundle = function(t) {
        throw new D(N.FAILED_PRECONDITION, '"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?');
    }, t.prototype.namedQuery = function(t) {
        throw new D(N.FAILED_PRECONDITION, '"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?');
    }, t;
}(), Sc = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).firestore = t, n;
    }
    return t(n, e), n.prototype.convertBytes = function(t) {
        return new Tc(new da(t));
    }, n.prototype.convertReference = function(t) {
        var e = this.convertDocumentKey(t, this.firestore._databaseId);
        return Cc.eu(e, this.firestore, /* converter= */ null);
    }, n;
}(cc);

/**
 * The persistence provider included with the full Firestore SDK.
 */ function Nc(t) {
    var e;
    e = t, A.setLogLevel(e);
}

/**
 * A reference to a transaction.
 */ var Dc = /** @class */ function() {
    function t(t, e) {
        this._firestore = t, this._delegate = e, this._userDataWriter = new Sc(t);
    }
    return t.prototype.get = function(t) {
        var e = this, n = Uc(t);
        return this._delegate.get(n).then((function(t) {
            return new Oc(e._firestore, new za(e._firestore._delegate, e._userDataWriter, t._key, t._document, t.metadata, n.converter));
        }));
    }, t.prototype.set = function(t, e, n) {
        var r = Uc(t);
        return n ? (Bu("Transaction.set", n), this._delegate.set(r, e, n)) : this._delegate.set(r, e), 
        this;
    }, t.prototype.update = function(t, n, r) {
        for (var i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        var u = Uc(t);
        return 2 === arguments.length ? this._delegate.update(u, n) : (i = this._delegate).update.apply(i, e([ u, n, r ], o)), 
        this;
    }, t.prototype.delete = function(t) {
        var e = Uc(t);
        return this._delegate.delete(e), this;
    }, t;
}(), Ac = /** @class */ function() {
    function t(t) {
        this._delegate = t;
    }
    return t.prototype.set = function(t, e, n) {
        var r = Uc(t);
        return n ? (Bu("WriteBatch.set", n), this._delegate.set(r, e, n)) : this._delegate.set(r, e), 
        this;
    }, t.prototype.update = function(t, n, r) {
        for (var i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        var u = Uc(t);
        return 2 === arguments.length ? this._delegate.update(u, n) : (i = this._delegate).update.apply(i, e([ u, n, r ], o)), 
        this;
    }, t.prototype.delete = function(t) {
        var e = Uc(t);
        return this._delegate.delete(e), this;
    }, t.prototype.commit = function() {
        return this._delegate.commit();
    }, t;
}(), kc = /** @class */ function() {
    function t(t, e, n) {
        this._firestore = t, this._userDataWriter = e, this._delegate = n;
    }
    return t.prototype.fromFirestore = function(t, e) {
        var n = new Wa(this._firestore._delegate, this._userDataWriter, t._key, t._document, t.metadata, 
        /* converter= */ null);
        return this._delegate.fromFirestore(new Pc(this._firestore, n), null != e ? e : {});
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
        return o || (o = new t(e, new Sc(e), n), i.set(n, o)), o;
    }, t;
}();

kc.su = new WeakMap;

/**
 * A reference to a particular document in a collection in the database.
 */
var Cc = /** @class */ function() {
    function t(t, e) {
        this.firestore = t, this._delegate = e, this._userDataWriter = new Sc(t);
    }
    return t.iu = function(e, n, r) {
        if (e.length % 2 != 0) throw new D(N.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + e.canonicalString() + " has " + e.length);
        return new t(n, new $u(n._delegate, r, new ct(e)));
    }, t.eu = function(e, n, r) {
        return new t(n, new $u(n._delegate, r, e));
    }, Object.defineProperty(t.prototype, "id", {
        get: function() {
            return this._delegate.id;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "parent", {
        get: function() {
            return new qc(this.firestore, this._delegate.parent);
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
            return new qc(this.firestore, Zu(this._delegate, t));
        } catch (t) {
            throw xc(t, "collection()", "DocumentReference.collection()");
        }
    }, t.prototype.isEqual = function(t) {
        return (t = l(t)) instanceof $u && ea(this._delegate, t);
    }, t.prototype.set = function(t, e) {
        e = Bu("DocumentReference.set", e);
        try {
            return function(t, e, n) {
                t = zu(t, $u);
                var r = zu(t.firestore, ua), i = hc(t.converter, e, n);
                return mc(r, [ Ea(Ta(r), "setDoc", t._key, i, null !== t.converter, n).toMutation(t._key, De.none()) ]);
            }(this._delegate, t, e);
        } catch (t) {
            throw xc(t, "setDoc()", "DocumentReference.set()");
        }
    }, t.prototype.update = function(t, n) {
        for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        try {
            return 1 === arguments.length ? yc(this._delegate, t) : yc.apply(void 0, e([ this._delegate, t, n ], r));
        } catch (t) {
            throw xc(t, "updateDoc()", "DocumentReference.update()");
        }
    }, t.prototype.delete = function() {
        return mc(zu((t = this._delegate).firestore, ua), [ new je(t._key, De.none()) ]);
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
        var r = Rc(e), i = Lc(e, (function(e) {
            return new Oc(t.firestore, new za(t.firestore._delegate, t._userDataWriter, e._key, e._document, e.metadata, t._delegate.converter));
        }));
        return vc(this._delegate, r, i);
    }, t.prototype.get = function(t) {
        var e = this;
        return ("cache" === (null == t ? void 0 : t.source) ? function(t) {
            t = zu(t, $u);
            var e = zu(t.firestore, ua), i = aa(e), o = new pc(e);
            return function(t, e) {
                var i = this, o = new br;
                return t.asyncQueue.enqueueAndForget((function() {
                    return n(i, void 0, void 0, (function() {
                        var i;
                        return r(this, (function(s) {
                            switch (s.label) {
                              case 0:
                                return i = function(t, e, i) {
                                    return n(this, void 0, void 0, (function() {
                                        var n, o;
                                        return r(this, (function(r) {
                                            switch (r.label) {
                                              case 0:
                                                return r.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , function(t, e) {
                                                    var n = F(t);
                                                    return n.persistence.runTransaction("read document", "readonly", (function(t) {
                                                        return n.Mn.mn(t, e);
                                                    }));
                                                }(t, e) ];

                                              case 1:
                                                return (o = r.sent()).isFoundDocument() ? i.resolve(o) : o.isNoDocument() ? i.resolve(null) : i.reject(new D(N.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)")), 
                                                [ 3 /*break*/ , 3 ];

                                              case 2:
                                                return n = r.sent(), o = hs(n, "Failed to get document '" + e + " from cache"), 
                                                i.reject(o), [ 3 /*break*/ , 3 ];

                                              case 3:
                                                return [ 2 /*return*/ ];
                                            }
                                        }));
                                    }));
                                }, [ 4 /*yield*/ , Su(t) ];

                              case 1:
                                return [ 2 /*return*/ , i.apply(void 0, [ s.sent(), e, o ]) ];
                            }
                        }));
                    }));
                })), o.promise;
            }(i, t._key).then((function(n) {
                return new za(e, o, t._key, n, new Ga(null !== n && n.hasLocalMutations, 
                /* fromCache= */ !0), t.converter);
            }));
        }(this._delegate) : "server" === (null == t ? void 0 : t.source) ? function(t) {
            t = zu(t, $u);
            var e = zu(t.firestore, ua);
            return ku(aa(e), t._key, {
                source: "server"
            }).then((function(n) {
                return gc(e, t, n);
            }));
        }(this._delegate) : function(t) {
            t = zu(t, $u);
            var e = zu(t.firestore, ua);
            return ku(aa(e), t._key).then((function(n) {
                return gc(e, t, n);
            }));
        }(this._delegate)).then((function(t) {
            return new Oc(e.firestore, new za(e.firestore._delegate, e._userDataWriter, t._key, t._document, t.metadata, e._delegate.converter));
        }));
    }, t.prototype.withConverter = function(e) {
        return new t(this.firestore, e ? this._delegate.withConverter(kc.nu(this.firestore, e)) : this._delegate.withConverter(null));
    }, t;
}();

/**
 * Replaces the function name in an error thrown by the firestore-exp API
 * with the function names used in the classic API.
 */ function xc(t, e, n) {
    return t.message = t.message.replace(e, n), t
    /**
 * Iterates the list of arguments from an `onSnapshot` call and returns the
 * first argument that may be an `SnapshotListenOptions` object. Returns an
 * empty object if none is found.
 */;
}

function Rc(t) {
    for (var e = 0, n = t; e < n.length; e++) {
        var r = n[e];
        if ("object" == typeof r && !ia(r)) return r;
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
 */ function Lc(t, e) {
    var n, r, i;
    return {
        next: function(t) {
            i.next && i.next(e(t));
        },
        error: null === (n = (i = ia(t[0]) ? t[0] : ia(t[1]) ? t[1] : "function" == typeof t[0] ? {
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

var Oc = /** @class */ function() {
    function t(t, e) {
        this._firestore = t, this._delegate = e;
    }
    return Object.defineProperty(t.prototype, "ref", {
        get: function() {
            return new Cc(this._firestore, this._delegate.ref);
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
        return $a(this._delegate, t._delegate);
    }, t;
}(), Pc = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.data = function(t) {
        return this._delegate.data(t);
    }, n;
}(Oc), Fc = /** @class */ function() {
    function t(t, e) {
        this.firestore = t, this._delegate = e, this._userDataWriter = new Sc(t);
    }
    return t.prototype.where = function(e, n, r) {
        try {
            // The "as string" cast is a little bit of a hack. `where` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new t(this.firestore, Za(this._delegate, function(t, e, n) {
                var r = e, i = Qa("where", t);
                return new tc(i, r, n);
            }(e, n, r)));
        } catch (e) {
            throw xc(e, /(orderBy|where)\(\)/, "Query.$1()");
        }
    }, t.prototype.orderBy = function(e, n) {
        try {
            // The "as string" cast is a little bit of a hack. `orderBy` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new t(this.firestore, Za(this._delegate, function(t, e) {
                void 0 === e && (e = "asc");
                var n = e, r = Qa("orderBy", t);
                return new ec(r, n);
            }(e, n)));
        } catch (e) {
            throw xc(e, /(orderBy|where)\(\)/, "Query.$1()");
        }
    }, t.prototype.limit = function(e) {
        try {
            return new t(this.firestore, Za(this._delegate, function(t) {
                return Wu("limit", t), new nc("limit", t, "F" /* First */);
            }(e)));
        } catch (e) {
            throw xc(e, "limit()", "Query.limit()");
        }
    }, t.prototype.limitToLast = function(e) {
        try {
            return new t(this.firestore, Za(this._delegate, function(t) {
                return Wu("limitToLast", t), new nc("limitToLast", t, "L" /* Last */);
            }(e)));
        } catch (e) {
            throw xc(e, "limitToLast()", "Query.limitToLast()");
        }
    }, t.prototype.startAt = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        try {
            return new t(this.firestore, Za(this._delegate, function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new rc("startAt", t, /*before=*/ !0);
            }.apply(void 0, e)));
        } catch (e) {
            throw xc(e, "startAt()", "Query.startAt()");
        }
    }, t.prototype.startAfter = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        try {
            return new t(this.firestore, Za(this._delegate, function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new rc("startAfter", t, 
                /*before=*/ !1);
            }.apply(void 0, e)));
        } catch (e) {
            throw xc(e, "startAfter()", "Query.startAfter()");
        }
    }, t.prototype.endBefore = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        try {
            return new t(this.firestore, Za(this._delegate, function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new ic("endBefore", t, /*before=*/ !0);
            }.apply(void 0, e)));
        } catch (e) {
            throw xc(e, "endBefore()", "Query.endBefore()");
        }
    }, t.prototype.endAt = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        try {
            return new t(this.firestore, Za(this._delegate, function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new ic("endAt", t, /*before=*/ !1);
            }.apply(void 0, e)));
        } catch (e) {
            throw xc(e, "endAt()", "Query.endAt()");
        }
    }, t.prototype.isEqual = function(t) {
        return na(this._delegate, t._delegate);
    }, t.prototype.get = function(t) {
        var e = this;
        return ("cache" === (null == t ? void 0 : t.source) ? 
        /**
     * Executes the query and returns the results as a `QuerySnapshot` from cache.
     * Returns an error if the document is not currently cached.
     *
     * @returns A Promise that will be resolved with the results of the query.
     */
        function(t) {
            t = zu(t, Xu);
            var e = zu(t.firestore, ua), i = aa(e), o = new pc(e);
            return function(t, e) {
                var i = this, o = new br;
                return t.asyncQueue.enqueueAndForget((function() {
                    return n(i, void 0, void 0, (function() {
                        var i;
                        return r(this, (function(s) {
                            switch (s.label) {
                              case 0:
                                return i = function(t, e, i) {
                                    return n(this, void 0, void 0, (function() {
                                        var n, o, s, u, a;
                                        return r(this, (function(r) {
                                            switch (r.label) {
                                              case 0:
                                                return r.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , Yi(t, e, 
                                                /* usePreviousResults= */ !0) ];

                                              case 1:
                                                return a = r.sent(), n = new As(e, a.Bn), o = n._o(a.documents), s = n.applyChanges(o, 
                                                /* updateLimboDocuments= */ !1), i.resolve(s.snapshot), [ 3 /*break*/ , 3 ];

                                              case 2:
                                                return u = r.sent(), a = hs(u, "Failed to execute query '" + e + " against cache"), 
                                                i.reject(a), [ 3 /*break*/ , 3 ];

                                              case 3:
                                                return [ 2 /*return*/ ];
                                            }
                                        }));
                                    }));
                                }, [ 4 /*yield*/ , Su(t) ];

                              case 1:
                                return [ 2 /*return*/ , i.apply(void 0, [ s.sent(), e, o ]) ];
                            }
                        }));
                    }));
                })), o.promise;
            }(i, t._query).then((function(n) {
                return new Ha(e, o, t, n);
            }));
        }(this._delegate) : "server" === (null == t ? void 0 : t.source) ? function(t) {
            t = zu(t, Xu);
            var e = zu(t.firestore, ua), n = aa(e), r = new pc(e);
            return Cu(n, t._query, {
                source: "server"
            }).then((function(n) {
                return new Ha(e, r, t, n);
            }));
        }(this._delegate) : function(t) {
            t = zu(t, Xu);
            var e = zu(t.firestore, ua), n = aa(e), r = new pc(e);
            return Xa(t._query), Cu(n, t._query).then((function(n) {
                return new Ha(e, r, t, n);
            }));
        }(this._delegate)).then((function(t) {
            return new Vc(e.firestore, new Ha(e.firestore._delegate, e._userDataWriter, e._delegate, t._snapshot));
        }));
    }, t.prototype.onSnapshot = function() {
        for (var t = this, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        var r = Rc(e), i = Lc(e, (function(e) {
            return new Vc(t.firestore, new Ha(t.firestore._delegate, t._userDataWriter, t._delegate, e._snapshot));
        }));
        return vc(this._delegate, r, i);
    }, t.prototype.withConverter = function(e) {
        return new t(this.firestore, e ? this._delegate.withConverter(kc.nu(this.firestore, e)) : this._delegate.withConverter(null));
    }, t;
}(), Mc = /** @class */ function() {
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
            return new Pc(this._firestore, this._delegate.doc);
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
}(), Vc = /** @class */ function() {
    function t(t, e) {
        this._firestore = t, this._delegate = e;
    }
    return Object.defineProperty(t.prototype, "query", {
        get: function() {
            return new Fc(this._firestore, this._delegate.query);
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
                return new Pc(t._firestore, e);
            }));
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.docChanges = function(t) {
        var e = this;
        return this._delegate.docChanges(t).map((function(t) {
            return new Mc(e._firestore, t);
        }));
    }, t.prototype.forEach = function(t, e) {
        var n = this;
        this._delegate.forEach((function(r) {
            t.call(e, new Pc(n._firestore, r));
        }));
    }, t.prototype.isEqual = function(t) {
        return $a(this._delegate, t._delegate);
    }, t;
}(), qc = /** @class */ function(e) {
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
            return t ? new Cc(this.firestore, t) : null;
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.doc = function(t) {
        try {
            return new Cc(this.firestore, void 0 === t ? ta(this._delegate) : ta(this._delegate, t));
        } catch (t) {
            throw xc(t, "doc()", "CollectionReference.doc()");
        }
    }, n.prototype.add = function(t) {
        var e = this;
        return function(t, e) {
            var n = zu(t.firestore, ua), r = ta(t), i = hc(t.converter, e);
            return mc(n, [ Ea(Ta(t.firestore), "addDoc", r._key, i, null !== t.converter, {}).toMutation(r._key, De.exists(!1)) ]).then((function() {
                return r;
            }));
        }(this._delegate, t).then((function(t) {
            return new Cc(e.firestore, t);
        }));
    }, n.prototype.isEqual = function(t) {
        return ea(this._delegate, t._delegate);
    }, n.prototype.withConverter = function(t) {
        return new n(this.firestore, t ? this._delegate.withConverter(kc.nu(this.firestore, t)) : this._delegate.withConverter(null));
    }, n;
}(Fc);

function Uc(t) {
    return zu(t, $u);
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
 */ var Bc = /** @class */ function() {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function t() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        this._delegate = new (la.bind.apply(la, e([ void 0 ], t)));
    }
    return t.documentId = function() {
        /**
         * Internal Note: The backend doesn't technically support querying by
         * document ID. Instead it queries by the entire document name (full path
         * included), but in the cases we currently support documentId(), the net
         * effect is the same.
         */
        return new t($.keyField().canonicalString());
    }, t.prototype.isEqual = function(t) {
        return (t = l(t)) instanceof la && this._delegate._internalPath.isEqual(t._internalPath);
    }, t;
}(), jc = /** @class */ function() {
    function t(t) {
        this._delegate = t;
    }
    return t.serverTimestamp = function() {
        var e = new Na("serverTimestamp");
        return e._methodName = "FieldValue.serverTimestamp", new t(e);
    }, t.delete = function() {
        var e = new _a("deleteField");
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
                        return new Da("arrayUnion", t);
        }.apply(void 0, e);
        return r._methodName = "FieldValue.arrayUnion", new t(r);
    }, t.arrayRemove = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        var r = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            // NOTE: We don't actually parse the data until it's used in set() or
            // update() since we'd need the Firestore instance to do this.
                        return new Aa("arrayRemove", t);
        }.apply(void 0, e);
        return r._methodName = "FieldValue.arrayRemove", new t(r);
    }, t.increment = function(e) {
        var n = function(t) {
            return new ka("increment", t);
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
function Kc(t) {
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
    return function(t, e) {
        var i = aa(t = zu(t, ua)), o = new oa;
        return function(t, e, i, o) {
            var s = this, u = function(t, e) {
                return function(t, e) {
                    return new vu(t, e);
                }(function(t, e) {
                    if (t instanceof Uint8Array) return pu(t, e);
                    if (t instanceof ArrayBuffer) return pu(new Uint8Array(t), e);
                    if (t instanceof ReadableStream) return t.getReader();
                    throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream");
                }("string" == typeof t ? (new TextEncoder).encode(t) : t), e);
            }(i, Co(e));
            t.asyncQueue.enqueueAndForget((function() {
                return n(s, void 0, void 0, (function() {
                    var e;
                    return r(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return e = cu, [ 4 /*yield*/ , Du(t) ];

                          case 1:
                            return e.apply(void 0, [ n.sent(), u, o ]), [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        }(i, t._databaseId, e, o), o;
    }(this._delegate, t);
}

function Qc(t) {
    var e, i, o = this;
    return (e = this._delegate, i = t, function(t, e) {
        var i = this;
        return t.asyncQueue.enqueue((function() {
            return n(i, void 0, void 0, (function() {
                var n;
                return r(this, (function(r) {
                    switch (r.label) {
                      case 0:
                        return n = function(t, e) {
                            var n = F(t);
                            return n.persistence.runTransaction("Get named query", "readonly", (function(t) {
                                return n.Ke.getNamedQuery(t, e);
                            }));
                        }, [ 4 /*yield*/ , Su(t) ];

                      case 1:
                        return [ 2 /*return*/ , n.apply(void 0, [ r.sent(), e ]) ];
                    }
                }));
            }));
        }));
    }(aa(e = zu(e, ua)), i).then((function(t) {
        return t ? new Xu(e, null, t.query) : null;
    }))).then((function(t) {
        return t ? new Fc(o, t) : null;
    }));
}

export { ya as C, sa as E, j as M, Nc as Q, ua as T, _c as U, Ac as W, Oc as X, Pc as Z, Tc as a, Kc as c, Dc as j, Vc as n, jc as o, Ec as q, Bc as r, qc as s, Fc as t, Qc as u, Cc as z };
//# sourceMappingURL=prebuilt-e10b3b00-01f089b3.js.map
