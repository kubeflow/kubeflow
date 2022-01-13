import { __extends as e, __spreadArray as t } from "tslib";

import r from "@firebase/app-compat";

import { getModularInstance as n } from "@firebase/util";

import { useFirestoreEmulator as o, enableNetwork as i, disableNetwork as a, waitForPendingWrites as u, onSnapshotsInSync as s, collection as c, doc as f, collectionGroup as l, runTransaction as h, ensureFirestoreConfigured as p, WriteBatch as d, executeWrite as g, Bytes as y, AbstractUserDataWriter as m, DocumentReference as _, refEqual as v, setDoc as w, updateDoc as b, deleteDoc as P, onSnapshot as S, getDocFromCache as I, getDocFromServer as D, getDoc as E, DocumentSnapshot as O, snapshotEqual as F, addDoc as j, QueryDocumentSnapshot as x, query as A, where as C, orderBy as N, limit as T, limitToLast as B, startAt as R, startAfter as q, endBefore as Q, endAt as W, queryEqual as L, getDocsFromCache as U, getDocsFromServer as k, getDocs as V, QuerySnapshot as K, FieldPath as z, loadBundle as M, namedQuery as G, serverTimestamp as Z, deleteField as $, arrayUnion as J, arrayRemove as Y, increment as H, GeoPoint as X, Timestamp as ee, CACHE_SIZE_UNLIMITED as te, enableIndexedDbPersistence as re, enableMultiTabIndexedDbPersistence as ne, clearIndexedDbPersistence as oe } from "@firebase/firestore";

import { Logger as ie, LogLevel as ae } from "@firebase/logger";

import { Component as ue } from "@firebase/component";

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
/** The default database name for a project. */ var se = /** @class */ function() {
    function e(e, t) {
        this.projectId = e, this.database = t || "(default)";
    }
    return Object.defineProperty(e.prototype, "isDefaultDatabase", {
        get: function() {
            return "(default)" === this.database;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.isEqual = function(t) {
        return t instanceof e && t.projectId === this.projectId && t.database === this.database;
    }, e;
}(), ce = "8.8.0";

/** Represents the database ID a Firestore client is associated with. */
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
var fe = new ie("@firebase/firestore");

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
/**
 * Converts an additional log parameter to a string representation.
 */
function le(e) {
    if ("string" == typeof e) return e;
    try {
        return t = e, JSON.stringify(t);
    } catch (t) {
        // Converting to JSON failed, just log the object directly
        return e;
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
    /** Formats an object as a JSON string, suitable for logging. */
    var t;
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
 */ function he(e) {
    void 0 === e && (e = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var r = "FIRESTORE (" + ce + ") INTERNAL ASSERTION FAILED: " + e;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
    throw function(e) {
        for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
        if (fe.logLevel <= ae.ERROR) {
            var o = r.map(le);
            fe.error.apply(fe, t([ "Firestore (" + ce + "): " + e ], o));
        }
    }(r), new Error(r);
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
 */ var pe = "invalid-argument", de = "failed-precondition", ge = "unimplemented", ye = /** @class */ function(t) {
    /** @hideconstructor */
    function r(
    /**
     * The backend error code associated with this error.
     */
    e, 
    /**
     * A custom error description.
     */
    r) {
        var n = t.call(this, r) || this;
        return n.code = e, n.message = r, 
        /** The custom name for all FirestoreErrors. */
        n.name = "FirebaseError", 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        n.toString = function() {
            return n.name + ": [code=" + n.code + "]: " + n.message;
        }, n;
    }
    return e(r, t), r;
}(Error), me = /** @class */ function() {
    function e(e, t, r) {
        void 0 === t ? t = 0 : t > e.length && he(), void 0 === r ? r = e.length - t : r > e.length - t && he(), 
        this.segments = e, this.offset = t, this.len = r;
    }
    return Object.defineProperty(e.prototype, "length", {
        get: function() {
            return this.len;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.isEqual = function(t) {
        return 0 === e.comparator(this, t);
    }, e.prototype.child = function(t) {
        var r = this.segments.slice(this.offset, this.limit());
        return t instanceof e ? t.forEach((function(e) {
            r.push(e);
        })) : r.push(t), this.construct(r);
    }, 
    /** The index of one past the last segment of the path. */
    e.prototype.limit = function() {
        return this.offset + this.length;
    }, e.prototype.popFirst = function(e) {
        return e = void 0 === e ? 1 : e, this.construct(this.segments, this.offset + e, this.length - e);
    }, e.prototype.popLast = function() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }, e.prototype.firstSegment = function() {
        return this.segments[this.offset];
    }, e.prototype.lastSegment = function() {
        return this.get(this.length - 1);
    }, e.prototype.get = function(e) {
        return this.segments[this.offset + e];
    }, e.prototype.isEmpty = function() {
        return 0 === this.length;
    }, e.prototype.isPrefixOf = function(e) {
        if (e.length < this.length) return !1;
        for (var t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
        return !0;
    }, e.prototype.isImmediateParentOf = function(e) {
        if (this.length + 1 !== e.length) return !1;
        for (var t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
        return !0;
    }, e.prototype.forEach = function(e) {
        for (var t = this.offset, r = this.limit(); t < r; t++) e(this.segments[t]);
    }, e.prototype.toArray = function() {
        return this.segments.slice(this.offset, this.limit());
    }, e.comparator = function(e, t) {
        for (var r = Math.min(e.length, t.length), n = 0; n < r; n++) {
            var o = e.get(n), i = t.get(n);
            if (o < i) return -1;
            if (o > i) return 1;
        }
        return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
    }, e;
}(), _e = /** @class */ function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e(r, t), r.prototype.construct = function(e, t, n) {
        return new r(e, t, n);
    }, r.prototype.canonicalString = function() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.toArray().join("/");
    }, r.prototype.toString = function() {
        return this.canonicalString();
    }, 
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    r.fromString = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
                for (var n = [], o = 0, i = e; o < i.length; o++) {
            var a = i[o];
            if (a.indexOf("//") >= 0) throw new ye(pe, "Invalid segment (" + a + "). Paths must not contain // in them.");
            // Strip leading and traling slashed.
                        n.push.apply(n, a.split("/").filter((function(e) {
                return e.length > 0;
            })));
        }
        return new r(n);
    }, r.emptyPath = function() {
        return new r([]);
    }, r;
}(me), ve = /^[_a-zA-Z][_a-zA-Z0-9]*$/, we = /** @class */ function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e(r, t), r.prototype.construct = function(e, t, n) {
        return new r(e, t, n);
    }, 
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    r.isValidIdentifier = function(e) {
        return ve.test(e);
    }, r.prototype.canonicalString = function() {
        return this.toArray().map((function(e) {
            return e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), r.isValidIdentifier(e) || (e = "`" + e + "`"), 
            e;
        })).join(".");
    }, r.prototype.toString = function() {
        return this.canonicalString();
    }, 
    /**
     * Returns true if this field references the key of a document.
     */
    r.prototype.isKeyField = function() {
        return 1 === this.length && "__name__" === this.get(0);
    }, 
    /**
     * The field designating the key of a document.
     */
    r.keyField = function() {
        return new r([ "__name__" ]);
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
    r.fromServerFormat = function(e) {
        for (var t = [], n = "", o = 0, i = function() {
            if (0 === n.length) throw new ye(pe, "Invalid field path (" + e + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            t.push(n), n = "";
        }, a = !1; o < e.length; ) {
            var u = e[o];
            if ("\\" === u) {
                if (o + 1 === e.length) throw new ye(pe, "Path has trailing escape character: " + e);
                var s = e[o + 1];
                if ("\\" !== s && "." !== s && "`" !== s) throw new ye(pe, "Path has invalid escape sequence: " + e);
                n += s, o += 2;
            } else "`" === u ? (a = !a, o++) : "." !== u || a ? (n += u, o++) : (i(), o++);
        }
        if (i(), a) throw new ye(pe, "Unterminated ` in path: " + e);
        return new r(t);
    }, r.emptyPath = function() {
        return new r([]);
    }, r;
}(me), be = /** @class */ function() {
    function e(e) {
        this.path = e;
    }
    return e.fromPath = function(t) {
        return new e(_e.fromString(t));
    }, e.fromName = function(t) {
        return new e(_e.fromString(t).popFirst(5));
    }, 
    /** Returns true if the document is in the specified collectionId. */
    e.prototype.hasCollectionId = function(e) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
    }, e.prototype.isEqual = function(e) {
        return null !== e && 0 === _e.comparator(this.path, e.path);
    }, e.prototype.toString = function() {
        return this.path.toString();
    }, e.comparator = function(e, t) {
        return _e.comparator(e.path, t.path);
    }, e.isDocumentKey = function(e) {
        return e.length % 2 == 0;
    }, 
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    e.fromSegments = function(t) {
        return new e(new _e(t.slice()));
    }, e;
}();

/** An error returned by a Firestore operation. */
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
function Pe(e, t) {
    if (void 0 === t) return {
        merge: !1
    };
    if (void 0 !== t.mergeFields && void 0 !== t.merge) throw new ye(pe, "Invalid options passed to function " + e + '(): You cannot specify both "merge" and "mergeFields".');
    return t;
}

/**
 * Validates that two boolean options are not set at the same time.
 */
/**
 * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
 * underlying instance. Throws if  `obj` is not an instance of `T`.
 *
 * This cast is used in the Lite and Full SDK to verify instance types for
 * arguments passed to the public API.
 */
function Se(e, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
t) {
    if ("_delegate" in e && (
    // Unwrap Compat types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e = e._delegate), !(e instanceof t)) {
        if (t.name === e.constructor.name) throw new ye(pe, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        var r = 
        /** Returns a string describing the type / value of the provided input. */
        function(e) {
            if (void 0 === e) return "undefined";
            if (null === e) return "null";
            if ("string" == typeof e) return e.length > 20 && (e = e.substring(0, 20) + "..."), 
            JSON.stringify(e);
            if ("number" == typeof e || "boolean" == typeof e) return "" + e;
            if ("object" == typeof e) {
                if (e instanceof Array) return "an array";
                var t = 
                /** Hacky method to try to get the constructor name for an object. */
                function(e) {
                    if (e.constructor) {
                        var t = /function\s+([^\s(]+)\s*\(/.exec(e.constructor.toString());
                        if (t && t.length > 1) return t[1];
                    }
                    return null;
                }(e);
                return t ? "a custom " + t + " object" : "an object";
            }
            return "function" == typeof e ? "a function" : he();
        }(e);
        throw new ye(pe, "Expected type '" + t.name + "', but it was: " + r);
    }
    return e;
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
/** True if and only if the Base64 conversion functions are available. */
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
/** Helper function to assert Uint8Array is available at runtime. */
function Ie() {
    if ("undefined" == typeof Uint8Array) throw new ye(ge, "Uint8Arrays are not available in this environment.");
}

/** Helper function to assert Base64 functions are available at runtime. */ function De() {
    if ("undefined" == typeof atob) throw new ye(ge, "Blobs are unavailable in Firestore in this environment.");
}

/** Immutable class holding a blob (binary data) */ var Ee = /** @class */ function() {
    function e(e) {
        this._delegate = e;
    }
    return e.fromBase64String = function(t) {
        return De(), new e(y.fromBase64String(t));
    }, e.fromUint8Array = function(t) {
        return Ie(), new e(y.fromUint8Array(t));
    }, e.prototype.toBase64 = function() {
        return De(), this._delegate.toBase64();
    }, e.prototype.toUint8Array = function() {
        return Ie(), this._delegate.toUint8Array();
    }, e.prototype.isEqual = function(e) {
        return this._delegate.isEqual(e._delegate);
    }, e.prototype.toString = function() {
        return "Blob(base64: " + this.toBase64() + ")";
    }, e;
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
 */ function Oe(e) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(e, t) {
        if ("object" != typeof e || null === e) return !1;
        for (var r = e, n = 0, o = t; n < o.length; n++) {
            var i = o[n];
            if (i in r && "function" == typeof r[i]) return !0;
        }
        return !1;
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
 * The persistence provider included with the full Firestore SDK.
 */ (e, [ "next", "error", "complete" ]);
}

var Fe = /** @class */ function() {
    function e() {}
    return e.prototype.enableIndexedDbPersistence = function(e, t) {
        return re(e._delegate, {
            forceOwnership: t
        });
    }, e.prototype.enableMultiTabIndexedDbPersistence = function(e) {
        return ne(e._delegate);
    }, e.prototype.clearIndexedDbPersistence = function(e) {
        return oe(e._delegate);
    }, e;
}(), je = /** @class */ function() {
    function e(e, t, r) {
        var n = this;
        this._delegate = t, this._persistenceProvider = r, this.INTERNAL = {
            delete: function() {
                return n.terminate();
            }
        }, e instanceof se || (this._appCompat = e);
    }
    return Object.defineProperty(e.prototype, "_databaseId", {
        get: function() {
            return this._delegate._databaseId;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.settings = function(e) {
        var r = this._delegate._getSettings();
        e.merge || r.host === e.host || function(e) {
            for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
            if (fe.logLevel <= ae.WARN) {
                var o = r.map(le);
                fe.warn.apply(fe, t([ "Firestore (" + ce + "): " + e ], o));
            }
        }("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."), 
        e.merge && 
        // Remove the property from the settings once the merge is completed
        delete (e = Object.assign(Object.assign({}, r), e)).merge, this._delegate._setSettings(e);
    }, e.prototype.useEmulator = function(e, t, r) {
        void 0 === r && (r = {}), o(this._delegate, e, t, r);
    }, e.prototype.enableNetwork = function() {
        return i(this._delegate);
    }, e.prototype.disableNetwork = function() {
        return a(this._delegate);
    }, e.prototype.enablePersistence = function(e) {
        var t = !1, r = !1;
        return e && function(e, t, r, n) {
            if (!0 === t && !0 === n) throw new ye(pe, e + " and " + r + " cannot be used together.");
        }("synchronizeTabs", t = !!e.synchronizeTabs, "experimentalForceOwningTab", r = !!e.experimentalForceOwningTab), 
        t ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(this) : this._persistenceProvider.enableIndexedDbPersistence(this, r);
    }, e.prototype.clearPersistence = function() {
        return this._persistenceProvider.clearIndexedDbPersistence(this);
    }, e.prototype.terminate = function() {
        return this._appCompat && (this._appCompat._removeServiceInstance("firestore"), 
        this._appCompat._removeServiceInstance("firestore-exp")), this._delegate._delete();
    }, e.prototype.waitForPendingWrites = function() {
        return u(this._delegate);
    }, e.prototype.onSnapshotsInSync = function(e) {
        return s(this._delegate, e);
    }, Object.defineProperty(e.prototype, "app", {
        get: function() {
            if (!this._appCompat) throw new ye(de, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this._appCompat;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.collection = function(e) {
        try {
            return new Ve(this, c(this._delegate, e));
        } catch (e) {
            throw Be(e, "collection()", "Firestore.collection()");
        }
    }, e.prototype.doc = function(e) {
        try {
            return new Te(this, f(this._delegate, e));
        } catch (e) {
            throw Be(e, "doc()", "Firestore.doc()");
        }
    }, e.prototype.collectionGroup = function(e) {
        try {
            return new Le(this, l(this._delegate, e));
        } catch (e) {
            throw Be(e, "collectionGroup()", "Firestore.collectionGroup()");
        }
    }, e.prototype.runTransaction = function(e) {
        var t = this;
        return h(this._delegate, (function(r) {
            return e(new Ae(t, r));
        }));
    }, e.prototype.batch = function() {
        var e = this;
        return p(this._delegate), new Ce(new d(this._delegate, (function(t) {
            return g(e._delegate, t);
        })));
    }, e.prototype.loadBundle = function(e) {
        throw new ye(de, '"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?');
    }, e.prototype.namedQuery = function(e) {
        throw new ye(de, '"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?');
    }, e;
}(), xe = /** @class */ function(t) {
    function r(e) {
        var r = t.call(this) || this;
        return r.firestore = e, r;
    }
    return e(r, t), r.prototype.convertBytes = function(e) {
        return new Ee(new y(e));
    }, r.prototype.convertReference = function(e) {
        var t = this.convertDocumentKey(e, this.firestore._databaseId);
        return Te.forKey(t, this.firestore, /* converter= */ null);
    }, r;
}(m);

/**
 * Compat class for Firestore. Exposes Firestore Legacy API, but delegates
 * to the functional API of firestore-exp.
 */
/**
 * A reference to a transaction.
 */
var Ae = /** @class */ function() {
    function e(e, t) {
        this._firestore = e, this._delegate = t, this._userDataWriter = new xe(e);
    }
    return e.prototype.get = function(e) {
        var t = this, r = Ke(e);
        return this._delegate.get(r).then((function(e) {
            return new Qe(t._firestore, new O(t._firestore._delegate, t._userDataWriter, e._key, e._document, e.metadata, r.converter));
        }));
    }, e.prototype.set = function(e, t, r) {
        var n = Ke(e);
        return r ? (Pe("Transaction.set", r), this._delegate.set(n, t, r)) : this._delegate.set(n, t), 
        this;
    }, e.prototype.update = function(e, r, n) {
        for (var o, i = [], a = 3; a < arguments.length; a++) i[a - 3] = arguments[a];
        var u = Ke(e);
        return 2 === arguments.length ? this._delegate.update(u, r) : (o = this._delegate).update.apply(o, t([ u, r, n ], i)), 
        this;
    }, e.prototype.delete = function(e) {
        var t = Ke(e);
        return this._delegate.delete(t), this;
    }, e;
}(), Ce = /** @class */ function() {
    function e(e) {
        this._delegate = e;
    }
    return e.prototype.set = function(e, t, r) {
        var n = Ke(e);
        return r ? (Pe("WriteBatch.set", r), this._delegate.set(n, t, r)) : this._delegate.set(n, t), 
        this;
    }, e.prototype.update = function(e, r, n) {
        for (var o, i = [], a = 3; a < arguments.length; a++) i[a - 3] = arguments[a];
        var u = Ke(e);
        return 2 === arguments.length ? this._delegate.update(u, r) : (o = this._delegate).update.apply(o, t([ u, r, n ], i)), 
        this;
    }, e.prototype.delete = function(e) {
        var t = Ke(e);
        return this._delegate.delete(t), this;
    }, e.prototype.commit = function() {
        return this._delegate.commit();
    }, e;
}(), Ne = /** @class */ function() {
    function e(e, t, r) {
        this._firestore = e, this._userDataWriter = t, this._delegate = r;
    }
    return e.prototype.fromFirestore = function(e, t) {
        var r = new x(this._firestore._delegate, this._userDataWriter, e._key, e._document, e.metadata, 
        /* converter= */ null);
        return this._delegate.fromFirestore(new We(this._firestore, r), null != t ? t : {});
    }, e.prototype.toFirestore = function(e, t) {
        return t ? this._delegate.toFirestore(e, t) : this._delegate.toFirestore(e);
    }, 
    // Use the same instance of `FirestoreDataConverter` for the given instances
    // of `Firestore` and `PublicFirestoreDataConverter` so that isEqual() will
    // compare equal for two objects created with the same converter instance.
    e.getInstance = function(t, r) {
        var n = e.INSTANCES, o = n.get(t);
        o || (o = new WeakMap, n.set(t, o));
        var i = o.get(r);
        return i || (i = new e(t, new xe(t), r), o.set(r, i)), i;
    }, e;
}();

Ne.INSTANCES = new WeakMap;

/**
 * A reference to a particular document in a collection in the database.
 */
var Te = /** @class */ function() {
    function e(e, t) {
        this.firestore = e, this._delegate = t, this._userDataWriter = new xe(e);
    }
    return e.forPath = function(t, r, n) {
        if (t.length % 2 != 0) throw new ye(pe, "Invalid document reference. Document references must have an even number of segments, but " + t.canonicalString() + " has " + t.length);
        return new e(r, new _(r._delegate, n, new be(t)));
    }, e.forKey = function(t, r, n) {
        return new e(r, new _(r._delegate, n, t));
    }, Object.defineProperty(e.prototype, "id", {
        get: function() {
            return this._delegate.id;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "parent", {
        get: function() {
            return new Ve(this.firestore, this._delegate.parent);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "path", {
        get: function() {
            return this._delegate.path;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.collection = function(e) {
        try {
            return new Ve(this.firestore, c(this._delegate, e));
        } catch (e) {
            throw Be(e, "collection()", "DocumentReference.collection()");
        }
    }, e.prototype.isEqual = function(e) {
        return (e = n(e)) instanceof _ && v(this._delegate, e);
    }, e.prototype.set = function(e, t) {
        t = Pe("DocumentReference.set", t);
        try {
            return w(this._delegate, e, t);
        } catch (e) {
            throw Be(e, "setDoc()", "DocumentReference.set()");
        }
    }, e.prototype.update = function(e, r) {
        for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
        try {
            return 1 === arguments.length ? b(this._delegate, e) : b.apply(void 0, t([ this._delegate, e, r ], n));
        } catch (e) {
            throw Be(e, "updateDoc()", "DocumentReference.update()");
        }
    }, e.prototype.delete = function() {
        return P(this._delegate);
    }, e.prototype.onSnapshot = function() {
        for (var e = this, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        var n = Re(t), o = qe(t, (function(t) {
            return new Qe(e.firestore, new O(e.firestore._delegate, e._userDataWriter, t._key, t._document, t.metadata, e._delegate.converter));
        }));
        return S(this._delegate, n, o);
    }, e.prototype.get = function(e) {
        var t = this;
        return ("cache" === (null == e ? void 0 : e.source) ? I(this._delegate) : "server" === (null == e ? void 0 : e.source) ? D(this._delegate) : E(this._delegate)).then((function(e) {
            return new Qe(t.firestore, new O(t.firestore._delegate, t._userDataWriter, e._key, e._document, e.metadata, t._delegate.converter));
        }));
    }, e.prototype.withConverter = function(t) {
        return new e(this.firestore, t ? this._delegate.withConverter(Ne.getInstance(this.firestore, t)) : this._delegate.withConverter(null));
    }, e;
}();

/**
 * Replaces the function name in an error thrown by the firestore-exp API
 * with the function names used in the classic API.
 */ function Be(e, t, r) {
    return e.message = e.message.replace(t, r), e;
}

/**
 * Iterates the list of arguments from an `onSnapshot` call and returns the
 * first argument that may be an `SnapshotListenOptions` object. Returns an
 * empty object if none is found.
 */ function Re(e) {
    for (var t = 0, r = e; t < r.length; t++) {
        var n = r[t];
        if ("object" == typeof n && !Oe(n)) return n;
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
 */ function qe(e, t) {
    var r, n, o;
    return {
        next: function(e) {
            o.next && o.next(t(e));
        },
        error: null === (r = (o = Oe(e[0]) ? e[0] : Oe(e[1]) ? e[1] : "function" == typeof e[0] ? {
            next: e[0],
            error: e[1],
            complete: e[2]
        } : {
            next: e[1],
            error: e[2],
            complete: e[3]
        }).error) || void 0 === r ? void 0 : r.bind(o),
        complete: null === (n = o.complete) || void 0 === n ? void 0 : n.bind(o)
    };
}

var Qe = /** @class */ function() {
    function e(e, t) {
        this._firestore = e, this._delegate = t;
    }
    return Object.defineProperty(e.prototype, "ref", {
        get: function() {
            return new Te(this._firestore, this._delegate.ref);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "id", {
        get: function() {
            return this._delegate.id;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "metadata", {
        get: function() {
            return this._delegate.metadata;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "exists", {
        get: function() {
            return this._delegate.exists();
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.data = function(e) {
        return this._delegate.data(e);
    }, e.prototype.get = function(e, t) {
        return this._delegate.get(e, t);
    }, e.prototype.isEqual = function(e) {
        return F(this._delegate, e._delegate);
    }, e;
}(), We = /** @class */ function(t) {
    function r() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e(r, t), r.prototype.data = function(e) {
        return this._delegate.data(e);
    }, r;
}(Qe), Le = /** @class */ function() {
    function e(e, t) {
        this.firestore = e, this._delegate = t, this._userDataWriter = new xe(e);
    }
    return e.prototype.where = function(t, r, n) {
        try {
            // The "as string" cast is a little bit of a hack. `where` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new e(this.firestore, A(this._delegate, C(t, r, n)));
        } catch (e) {
            throw Be(e, /(orderBy|where)\(\)/, "Query.$1()");
        }
    }, e.prototype.orderBy = function(t, r) {
        try {
            // The "as string" cast is a little bit of a hack. `orderBy` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new e(this.firestore, A(this._delegate, N(t, r)));
        } catch (e) {
            throw Be(e, /(orderBy|where)\(\)/, "Query.$1()");
        }
    }, e.prototype.limit = function(t) {
        try {
            return new e(this.firestore, A(this._delegate, T(t)));
        } catch (e) {
            throw Be(e, "limit()", "Query.limit()");
        }
    }, e.prototype.limitToLast = function(t) {
        try {
            return new e(this.firestore, A(this._delegate, B(t)));
        } catch (e) {
            throw Be(e, "limitToLast()", "Query.limitToLast()");
        }
    }, e.prototype.startAt = function() {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        try {
            return new e(this.firestore, A(this._delegate, R.apply(void 0, t)));
        } catch (e) {
            throw Be(e, "startAt()", "Query.startAt()");
        }
    }, e.prototype.startAfter = function() {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        try {
            return new e(this.firestore, A(this._delegate, q.apply(void 0, t)));
        } catch (e) {
            throw Be(e, "startAfter()", "Query.startAfter()");
        }
    }, e.prototype.endBefore = function() {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        try {
            return new e(this.firestore, A(this._delegate, Q.apply(void 0, t)));
        } catch (e) {
            throw Be(e, "endBefore()", "Query.endBefore()");
        }
    }, e.prototype.endAt = function() {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        try {
            return new e(this.firestore, A(this._delegate, W.apply(void 0, t)));
        } catch (e) {
            throw Be(e, "endAt()", "Query.endAt()");
        }
    }, e.prototype.isEqual = function(e) {
        return L(this._delegate, e._delegate);
    }, e.prototype.get = function(e) {
        var t = this;
        return ("cache" === (null == e ? void 0 : e.source) ? U(this._delegate) : "server" === (null == e ? void 0 : e.source) ? k(this._delegate) : V(this._delegate)).then((function(e) {
            return new ke(t.firestore, new K(t.firestore._delegate, t._userDataWriter, t._delegate, e._snapshot));
        }));
    }, e.prototype.onSnapshot = function() {
        for (var e = this, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        var n = Re(t), o = qe(t, (function(t) {
            return new ke(e.firestore, new K(e.firestore._delegate, e._userDataWriter, e._delegate, t._snapshot));
        }));
        return S(this._delegate, n, o);
    }, e.prototype.withConverter = function(t) {
        return new e(this.firestore, t ? this._delegate.withConverter(Ne.getInstance(this.firestore, t)) : this._delegate.withConverter(null));
    }, e;
}(), Ue = /** @class */ function() {
    function e(e, t) {
        this._firestore = e, this._delegate = t;
    }
    return Object.defineProperty(e.prototype, "type", {
        get: function() {
            return this._delegate.type;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "doc", {
        get: function() {
            return new We(this._firestore, this._delegate.doc);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "oldIndex", {
        get: function() {
            return this._delegate.oldIndex;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "newIndex", {
        get: function() {
            return this._delegate.newIndex;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(), ke = /** @class */ function() {
    function e(e, t) {
        this._firestore = e, this._delegate = t;
    }
    return Object.defineProperty(e.prototype, "query", {
        get: function() {
            return new Le(this._firestore, this._delegate.query);
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "metadata", {
        get: function() {
            return this._delegate.metadata;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "size", {
        get: function() {
            return this._delegate.size;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "empty", {
        get: function() {
            return this._delegate.empty;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "docs", {
        get: function() {
            var e = this;
            return this._delegate.docs.map((function(t) {
                return new We(e._firestore, t);
            }));
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.docChanges = function(e) {
        var t = this;
        return this._delegate.docChanges(e).map((function(e) {
            return new Ue(t._firestore, e);
        }));
    }, e.prototype.forEach = function(e, t) {
        var r = this;
        this._delegate.forEach((function(n) {
            e.call(t, new We(r._firestore, n));
        }));
    }, e.prototype.isEqual = function(e) {
        return F(this._delegate, e._delegate);
    }, e;
}(), Ve = /** @class */ function(t) {
    function r(e, r) {
        var n = t.call(this, e, r) || this;
        return n.firestore = e, n._delegate = r, n;
    }
    return e(r, t), Object.defineProperty(r.prototype, "id", {
        get: function() {
            return this._delegate.id;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(r.prototype, "path", {
        get: function() {
            return this._delegate.path;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(r.prototype, "parent", {
        get: function() {
            var e = this._delegate.parent;
            return e ? new Te(this.firestore, e) : null;
        },
        enumerable: !1,
        configurable: !0
    }), r.prototype.doc = function(e) {
        try {
            return new Te(this.firestore, void 0 === e ? f(this._delegate) : f(this._delegate, e));
        } catch (e) {
            throw Be(e, "doc()", "CollectionReference.doc()");
        }
    }, r.prototype.add = function(e) {
        var t = this;
        return j(this._delegate, e).then((function(e) {
            return new Te(t.firestore, e);
        }));
    }, r.prototype.isEqual = function(e) {
        return v(this._delegate, e._delegate);
    }, r.prototype.withConverter = function(e) {
        return new r(this.firestore, e ? this._delegate.withConverter(Ne.getInstance(this.firestore, e)) : this._delegate.withConverter(null));
    }, r;
}(Le);

function Ke(e) {
    return Se(e, _);
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ze(e) {
    return M(this._delegate, e);
}

function Me(e) {
    var t = this;
    return G(this._delegate, e).then((function(e) {
        return e ? new Le(t, 
        // We can pass `expQuery` here directly since named queries don't have a UserDataConverter.
        // Otherwise, we would have to create a new ExpQuery and pass the old UserDataConverter.
        e) : null;
    }));
}

/**
 * Prototype patches bundle loading to Firestore.
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
// The objects that are a part of this API are exposed to third-parties as
// compiled javascript so we want to flag our private members with a leading
// underscore to discourage their use.
/**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a list
 * of field names (referring to a nested field in the document).
 */
var Ge = /** @class */ function() {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    function e() {
        for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
        this._delegate = new (z.bind.apply(z, t([ void 0 ], e)));
    }
    return e.documentId = function() {
        /**
         * Internal Note: The backend doesn't technically support querying by
         * document ID. Instead it queries by the entire document name (full path
         * included), but in the cases we currently support documentId(), the net
         * effect is the same.
         */
        return new e(we.keyField().canonicalString());
    }, e.prototype.isEqual = function(e) {
        return (e = n(e)) instanceof z && this._delegate._internalPath.isEqual(e._internalPath);
    }, e;
}(), Ze = /** @class */ function() {
    function e(e) {
        this._delegate = e;
    }
    return e.serverTimestamp = function() {
        var t = Z();
        return t._methodName = "FieldValue.serverTimestamp", new e(t);
    }, e.delete = function() {
        var t = $();
        return t._methodName = "FieldValue.delete", new e(t);
    }, e.arrayUnion = function() {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        var n = J.apply(void 0, t);
        return n._methodName = "FieldValue.arrayUnion", new e(n);
    }, e.arrayRemove = function() {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        var n = Y.apply(void 0, t);
        return n._methodName = "FieldValue.arrayRemove", new e(n);
    }, e.increment = function(t) {
        var r = H(t);
        return r._methodName = "FieldValue.increment", new e(r);
    }, e.prototype.isEqual = function(e) {
        return this._delegate.isEqual(e._delegate);
    }, e;
}(), $e = {
    Firestore: je,
    GeoPoint: X,
    Timestamp: ee,
    Blob: Ee,
    Transaction: Ae,
    WriteBatch: Ce,
    DocumentReference: Te,
    DocumentSnapshot: Qe,
    Query: Le,
    QueryDocumentSnapshot: We,
    QuerySnapshot: ke,
    CollectionReference: Ve,
    FieldPath: Ge,
    FieldValue: Ze,
    setLogLevel: function(e) {
        var t;
        t = e, fe.setLogLevel(t);
    },
    CACHE_SIZE_UNLIMITED: te
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
 */ var Je;

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
 * Registers the main Firestore build with the components framework.
 * Persistence can be enabled via `firebase.firestore().enablePersistence()`.
 */
function Ye(e) {
    !function(e) {
        ce = e;
    }(e.SDK_VERSION), 
    /**
 * Configures Firestore as part of the Firebase SDK by calling registerComponent.
 *
 * @param firebase - The FirebaseNamespace to register Firestore with
 * @param firestoreFactory - A factory function that returns a new Firestore
 *    instance.
 */
    function(e, t) {
        e.INTERNAL.registerComponent(new ue("firestore-compat", (function(e) {
            var r = e.getProvider("app-compat").getImmediate(), n = e.getProvider("firestore-exp").getImmediate();
            return t(r, n);
        }), "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, $e)));
    }(e, (function(e, t) {
        return new je(e, t, new Fe);
    })), e.registerVersion("@firebase/firestore-compat", "0.0.900");
}

Ye(r), (Je = je).prototype.loadBundle = ze, Je.prototype.namedQuery = Me;

export { Ye as registerFirestore };
//# sourceMappingURL=index.js.map
