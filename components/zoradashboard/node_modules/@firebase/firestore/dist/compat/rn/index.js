import firebase from '@firebase/app-compat';
import { getModularInstance } from '@firebase/util';
import { Bytes, enableIndexedDbPersistence, enableMultiTabIndexedDbPersistence, clearIndexedDbPersistence, useFirestoreEmulator, enableNetwork, disableNetwork, waitForPendingWrites, onSnapshotsInSync, collection, doc, collectionGroup, runTransaction, ensureFirestoreConfigured, WriteBatch as WriteBatch$1, executeWrite, DocumentSnapshot as DocumentSnapshot$1, DocumentReference as DocumentReference$1, refEqual, setDoc, updateDoc, deleteDoc, onSnapshot, getDocFromCache, getDocFromServer, getDoc, snapshotEqual, query, where, orderBy, limit, limitToLast, startAt, startAfter, endBefore, endAt, queryEqual, getDocsFromCache, getDocsFromServer, getDocs, QuerySnapshot as QuerySnapshot$1, addDoc, AbstractUserDataWriter, QueryDocumentSnapshot as QueryDocumentSnapshot$1, loadBundle as loadBundle$1, namedQuery as namedQuery$1, FieldPath as FieldPath$2, serverTimestamp, deleteField, arrayUnion, arrayRemove, increment, GeoPoint, Timestamp, CACHE_SIZE_UNLIMITED } from '@firebase/firestore';
import { Logger, LogLevel } from '@firebase/logger';
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
/** The default database name for a project. */
const DEFAULT_DATABASE_NAME = '(default)';
/** Represents the database ID a Firestore client is associated with. */
class DatabaseId {
    constructor(projectId, database) {
        this.projectId = projectId;
        this.database = database ? database : DEFAULT_DATABASE_NAME;
    }
    get isDefaultDatabase() {
        return this.database === DEFAULT_DATABASE_NAME;
    }
    isEqual(other) {
        return (other instanceof DatabaseId &&
            other.projectId === this.projectId &&
            other.database === this.database);
    }
}

const version$1 = "8.8.0";

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
let SDK_VERSION = version$1;
function setSDKVersion(version) {
    SDK_VERSION = version;
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
function formatJSON(value) {
    return JSON.stringify(value);
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
const logClient = new Logger('@firebase/firestore');
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
function setLogLevel$1(logLevel) {
    logClient.setLogLevel(logLevel);
}
function logError(msg, ...obj) {
    if (logClient.logLevel <= LogLevel.ERROR) {
        const args = obj.map(argToString);
        logClient.error(`Firestore (${SDK_VERSION}): ${msg}`, ...args);
    }
}
function logWarn(msg, ...obj) {
    if (logClient.logLevel <= LogLevel.WARN) {
        const args = obj.map(argToString);
        logClient.warn(`Firestore (${SDK_VERSION}): ${msg}`, ...args);
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
function fail(failure = 'Unexpected state') {
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
    const message = `FIRESTORE (${SDK_VERSION}) INTERNAL ASSERTION FAILED: ` + failure;
    logError(message);
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
    throw new Error(message);
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
const Code = {
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
class FirestoreError extends Error {
    /** @hideconstructor */
    constructor(
    /**
     * The backend error code associated with this error.
     */
    code, 
    /**
     * A custom error description.
     */
    message) {
        super(message);
        this.code = code;
        this.message = message;
        /** The custom name for all FirestoreErrors. */
        this.name = 'FirebaseError';
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
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
const DOCUMENT_KEY_NAME = '__name__';
/**
 * Path represents an ordered sequence of string segments.
 */
class BasePath {
    constructor(segments, offset, length) {
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
    get length() {
        return this.len;
    }
    isEqual(other) {
        return BasePath.comparator(this, other) === 0;
    }
    child(nameOrPath) {
        const segments = this.segments.slice(this.offset, this.limit());
        if (nameOrPath instanceof BasePath) {
            nameOrPath.forEach(segment => {
                segments.push(segment);
            });
        }
        else {
            segments.push(nameOrPath);
        }
        return this.construct(segments);
    }
    /** The index of one past the last segment of the path. */
    limit() {
        return this.offset + this.length;
    }
    popFirst(size) {
        size = size === undefined ? 1 : size;
        return this.construct(this.segments, this.offset + size, this.length - size);
    }
    popLast() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }
    firstSegment() {
        return this.segments[this.offset];
    }
    lastSegment() {
        return this.get(this.length - 1);
    }
    get(index) {
        return this.segments[this.offset + index];
    }
    isEmpty() {
        return this.length === 0;
    }
    isPrefixOf(other) {
        if (other.length < this.length) {
            return false;
        }
        for (let i = 0; i < this.length; i++) {
            if (this.get(i) !== other.get(i)) {
                return false;
            }
        }
        return true;
    }
    isImmediateParentOf(potentialChild) {
        if (this.length + 1 !== potentialChild.length) {
            return false;
        }
        for (let i = 0; i < this.length; i++) {
            if (this.get(i) !== potentialChild.get(i)) {
                return false;
            }
        }
        return true;
    }
    forEach(fn) {
        for (let i = this.offset, end = this.limit(); i < end; i++) {
            fn(this.segments[i]);
        }
    }
    toArray() {
        return this.segments.slice(this.offset, this.limit());
    }
    static comparator(p1, p2) {
        const len = Math.min(p1.length, p2.length);
        for (let i = 0; i < len; i++) {
            const left = p1.get(i);
            const right = p2.get(i);
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
    }
}
/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 */
class ResourcePath extends BasePath {
    construct(segments, offset, length) {
        return new ResourcePath(segments, offset, length);
    }
    canonicalString() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.toArray().join('/');
    }
    toString() {
        return this.canonicalString();
    }
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    static fromString(...pathComponents) {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        const segments = [];
        for (const path of pathComponents) {
            if (path.indexOf('//') >= 0) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid segment (${path}). Paths must not contain // in them.`);
            }
            // Strip leading and traling slashed.
            segments.push(...path.split('/').filter(segment => segment.length > 0));
        }
        return new ResourcePath(segments);
    }
    static emptyPath() {
        return new ResourcePath([]);
    }
}
const identifierRegExp = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
/** A dot-separated path for navigating sub-objects within a document. */
class FieldPath$1 extends BasePath {
    construct(segments, offset, length) {
        return new FieldPath$1(segments, offset, length);
    }
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    static isValidIdentifier(segment) {
        return identifierRegExp.test(segment);
    }
    canonicalString() {
        return this.toArray()
            .map(str => {
            str = str.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
            if (!FieldPath$1.isValidIdentifier(str)) {
                str = '`' + str + '`';
            }
            return str;
        })
            .join('.');
    }
    toString() {
        return this.canonicalString();
    }
    /**
     * Returns true if this field references the key of a document.
     */
    isKeyField() {
        return this.length === 1 && this.get(0) === DOCUMENT_KEY_NAME;
    }
    /**
     * The field designating the key of a document.
     */
    static keyField() {
        return new FieldPath$1([DOCUMENT_KEY_NAME]);
    }
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
    static fromServerFormat(path) {
        const segments = [];
        let current = '';
        let i = 0;
        const addCurrentSegment = () => {
            if (current.length === 0) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid field path (${path}). Paths must not be empty, begin ` +
                    `with '.', end with '.', or contain '..'`);
            }
            segments.push(current);
            current = '';
        };
        let inBackticks = false;
        while (i < path.length) {
            const c = path[i];
            if (c === '\\') {
                if (i + 1 === path.length) {
                    throw new FirestoreError(Code.INVALID_ARGUMENT, 'Path has trailing escape character: ' + path);
                }
                const next = path[i + 1];
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
    }
    static emptyPath() {
        return new FieldPath$1([]);
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
class DocumentKey {
    constructor(path) {
        this.path = path;
    }
    static fromPath(path) {
        return new DocumentKey(ResourcePath.fromString(path));
    }
    static fromName(name) {
        return new DocumentKey(ResourcePath.fromString(name).popFirst(5));
    }
    /** Returns true if the document is in the specified collectionId. */
    hasCollectionId(collectionId) {
        return (this.path.length >= 2 &&
            this.path.get(this.path.length - 2) === collectionId);
    }
    isEqual(other) {
        return (other !== null && ResourcePath.comparator(this.path, other.path) === 0);
    }
    toString() {
        return this.path.toString();
    }
    static comparator(k1, k2) {
        return ResourcePath.comparator(k1.path, k2.path);
    }
    static isDocumentKey(path) {
        return path.length % 2 === 0;
    }
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */
    static fromSegments(segments) {
        return new DocumentKey(new ResourcePath(segments.slice()));
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
function validateSetOptions(methodName, options) {
    if (options === undefined) {
        return {
            merge: false
        };
    }
    if (options.mergeFields !== undefined && options.merge !== undefined) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid options passed to function ${methodName}(): You cannot ` +
            'specify both "merge" and "mergeFields".');
    }
    return options;
}
/**
 * Validates that two boolean options are not set at the same time.
 */
function validateIsNotUsedTogether(optionName1, argument1, optionName2, argument2) {
    if (argument1 === true && argument2 === true) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `${optionName1} and ${optionName2} cannot be used together.`);
    }
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
            input = `${input.substring(0, 20)}...`;
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
            const customObjectName = tryGetCustomObjectType(input);
            if (customObjectName) {
                return `a custom ${customObjectName} object`;
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
        const funcNameRegex = /function\s+([^\s(]+)\s*\(/;
        const results = funcNameRegex.exec(input.constructor.toString());
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
                `reference from a different Firestore SDK?`);
        }
        else {
            const description = valueDescription(obj);
            throw new FirestoreError(Code.INVALID_ARGUMENT, `Expected type '${constructor.name}', but it was: ${description}`);
        }
    }
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
/** Helper function to assert Uint8Array is available at runtime. */
function assertUint8ArrayAvailable() {
    if (typeof Uint8Array === 'undefined') {
        throw new FirestoreError(Code.UNIMPLEMENTED, 'Uint8Arrays are not available in this environment.');
    }
}
/** Immutable class holding a blob (binary data) */
class Blob {
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    static fromBase64String(base64) {
        return new Blob(Bytes.fromBase64String(base64));
    }
    static fromUint8Array(array) {
        assertUint8ArrayAvailable();
        return new Blob(Bytes.fromUint8Array(array));
    }
    toBase64() {
        return this._delegate.toBase64();
    }
    toUint8Array() {
        assertUint8ArrayAvailable();
        return this._delegate.toUint8Array();
    }
    isEqual(other) {
        return this._delegate.isEqual(other._delegate);
    }
    toString() {
        return 'Blob(base64: ' + this.toBase64() + ')';
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
function isPartialObserver(obj) {
    return implementsAnyMethods(obj, ['next', 'error', 'complete']);
}
/**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    const object = obj;
    for (const method of methods) {
        if (method in object && typeof object[method] === 'function') {
            return true;
        }
    }
    return false;
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
 */
class IndexedDbPersistenceProvider {
    enableIndexedDbPersistence(firestore, forceOwnership) {
        return enableIndexedDbPersistence(firestore._delegate, { forceOwnership });
    }
    enableMultiTabIndexedDbPersistence(firestore) {
        return enableMultiTabIndexedDbPersistence(firestore._delegate);
    }
    clearIndexedDbPersistence(firestore) {
        return clearIndexedDbPersistence(firestore._delegate);
    }
}
/**
 * Compat class for Firestore. Exposes Firestore Legacy API, but delegates
 * to the functional API of firestore-exp.
 */
class Firestore {
    constructor(databaseIdOrApp, _delegate, _persistenceProvider) {
        this._delegate = _delegate;
        this._persistenceProvider = _persistenceProvider;
        this.INTERNAL = {
            delete: () => this.terminate()
        };
        if (!(databaseIdOrApp instanceof DatabaseId)) {
            this._appCompat = databaseIdOrApp;
        }
    }
    get _databaseId() {
        return this._delegate._databaseId;
    }
    settings(settingsLiteral) {
        const currentSettings = this._delegate._getSettings();
        if (!settingsLiteral.merge &&
            currentSettings.host !== settingsLiteral.host) {
            logWarn('You are overriding the original host. If you did not intend ' +
                'to override your settings, use {merge: true}.');
        }
        if (settingsLiteral.merge) {
            settingsLiteral = Object.assign(Object.assign({}, currentSettings), settingsLiteral);
            // Remove the property from the settings once the merge is completed
            delete settingsLiteral.merge;
        }
        this._delegate._setSettings(settingsLiteral);
    }
    useEmulator(host, port, options = {}) {
        useFirestoreEmulator(this._delegate, host, port, options);
    }
    enableNetwork() {
        return enableNetwork(this._delegate);
    }
    disableNetwork() {
        return disableNetwork(this._delegate);
    }
    enablePersistence(settings) {
        let synchronizeTabs = false;
        let experimentalForceOwningTab = false;
        if (settings) {
            synchronizeTabs = !!settings.synchronizeTabs;
            experimentalForceOwningTab = !!settings.experimentalForceOwningTab;
            validateIsNotUsedTogether('synchronizeTabs', synchronizeTabs, 'experimentalForceOwningTab', experimentalForceOwningTab);
        }
        return synchronizeTabs
            ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(this)
            : this._persistenceProvider.enableIndexedDbPersistence(this, experimentalForceOwningTab);
    }
    clearPersistence() {
        return this._persistenceProvider.clearIndexedDbPersistence(this);
    }
    terminate() {
        if (this._appCompat) {
            this._appCompat._removeServiceInstance('firestore');
            this._appCompat._removeServiceInstance('firestore-exp');
        }
        return this._delegate._delete();
    }
    waitForPendingWrites() {
        return waitForPendingWrites(this._delegate);
    }
    onSnapshotsInSync(arg) {
        return onSnapshotsInSync(this._delegate, arg);
    }
    get app() {
        if (!this._appCompat) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is " +
                'not available');
        }
        return this._appCompat;
    }
    collection(pathString) {
        try {
            return new CollectionReference(this, collection(this._delegate, pathString));
        }
        catch (e) {
            throw replaceFunctionName(e, 'collection()', 'Firestore.collection()');
        }
    }
    doc(pathString) {
        try {
            return new DocumentReference(this, doc(this._delegate, pathString));
        }
        catch (e) {
            throw replaceFunctionName(e, 'doc()', 'Firestore.doc()');
        }
    }
    collectionGroup(collectionId) {
        try {
            return new Query(this, collectionGroup(this._delegate, collectionId));
        }
        catch (e) {
            throw replaceFunctionName(e, 'collectionGroup()', 'Firestore.collectionGroup()');
        }
    }
    runTransaction(updateFunction) {
        return runTransaction(this._delegate, transaction => updateFunction(new Transaction(this, transaction)));
    }
    batch() {
        ensureFirestoreConfigured(this._delegate);
        return new WriteBatch(new WriteBatch$1(this._delegate, mutations => executeWrite(this._delegate, mutations)));
    }
    loadBundle(bundleData) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, '"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?');
    }
    namedQuery(name) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, '"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?');
    }
}
class UserDataWriter extends AbstractUserDataWriter {
    constructor(firestore) {
        super();
        this.firestore = firestore;
    }
    convertBytes(bytes) {
        return new Blob(new Bytes(bytes));
    }
    convertReference(name) {
        const key = this.convertDocumentKey(name, this.firestore._databaseId);
        return DocumentReference.forKey(key, this.firestore, /* converter= */ null);
    }
}
function setLogLevel(level) {
    setLogLevel$1(level);
}
/**
 * A reference to a transaction.
 */
class Transaction {
    constructor(_firestore, _delegate) {
        this._firestore = _firestore;
        this._delegate = _delegate;
        this._userDataWriter = new UserDataWriter(_firestore);
    }
    get(documentRef) {
        const ref = castReference(documentRef);
        return this._delegate
            .get(ref)
            .then(result => new DocumentSnapshot(this._firestore, new DocumentSnapshot$1(this._firestore._delegate, this._userDataWriter, result._key, result._document, result.metadata, ref.converter)));
    }
    set(documentRef, data, options) {
        const ref = castReference(documentRef);
        if (options) {
            validateSetOptions('Transaction.set', options);
            this._delegate.set(ref, data, options);
        }
        else {
            this._delegate.set(ref, data);
        }
        return this;
    }
    update(documentRef, dataOrField, value, ...moreFieldsAndValues) {
        const ref = castReference(documentRef);
        if (arguments.length === 2) {
            this._delegate.update(ref, dataOrField);
        }
        else {
            this._delegate.update(ref, dataOrField, value, ...moreFieldsAndValues);
        }
        return this;
    }
    delete(documentRef) {
        const ref = castReference(documentRef);
        this._delegate.delete(ref);
        return this;
    }
}
class WriteBatch {
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    set(documentRef, data, options) {
        const ref = castReference(documentRef);
        if (options) {
            validateSetOptions('WriteBatch.set', options);
            this._delegate.set(ref, data, options);
        }
        else {
            this._delegate.set(ref, data);
        }
        return this;
    }
    update(documentRef, dataOrField, value, ...moreFieldsAndValues) {
        const ref = castReference(documentRef);
        if (arguments.length === 2) {
            this._delegate.update(ref, dataOrField);
        }
        else {
            this._delegate.update(ref, dataOrField, value, ...moreFieldsAndValues);
        }
        return this;
    }
    delete(documentRef) {
        const ref = castReference(documentRef);
        this._delegate.delete(ref);
        return this;
    }
    commit() {
        return this._delegate.commit();
    }
}
/**
 * Wraps a `PublicFirestoreDataConverter` translating the types from the
 * experimental SDK into corresponding types from the Classic SDK before passing
 * them to the wrapped converter.
 */
class FirestoreDataConverter {
    constructor(_firestore, _userDataWriter, _delegate) {
        this._firestore = _firestore;
        this._userDataWriter = _userDataWriter;
        this._delegate = _delegate;
    }
    fromFirestore(snapshot, options) {
        const expSnapshot = new QueryDocumentSnapshot$1(this._firestore._delegate, this._userDataWriter, snapshot._key, snapshot._document, snapshot.metadata, 
        /* converter= */ null);
        return this._delegate.fromFirestore(new QueryDocumentSnapshot(this._firestore, expSnapshot), options !== null && options !== void 0 ? options : {});
    }
    toFirestore(modelObject, options) {
        if (!options) {
            return this._delegate.toFirestore(modelObject);
        }
        else {
            return this._delegate.toFirestore(modelObject, options);
        }
    }
    // Use the same instance of `FirestoreDataConverter` for the given instances
    // of `Firestore` and `PublicFirestoreDataConverter` so that isEqual() will
    // compare equal for two objects created with the same converter instance.
    static getInstance(firestore, converter) {
        const converterMapByFirestore = FirestoreDataConverter.INSTANCES;
        let untypedConverterByConverter = converterMapByFirestore.get(firestore);
        if (!untypedConverterByConverter) {
            untypedConverterByConverter = new WeakMap();
            converterMapByFirestore.set(firestore, untypedConverterByConverter);
        }
        let instance = untypedConverterByConverter.get(converter);
        if (!instance) {
            instance = new FirestoreDataConverter(firestore, new UserDataWriter(firestore), converter);
            untypedConverterByConverter.set(converter, instance);
        }
        return instance;
    }
}
FirestoreDataConverter.INSTANCES = new WeakMap();
/**
 * A reference to a particular document in a collection in the database.
 */
class DocumentReference {
    constructor(firestore, _delegate) {
        this.firestore = firestore;
        this._delegate = _delegate;
        this._userDataWriter = new UserDataWriter(firestore);
    }
    static forPath(path, firestore, converter) {
        if (path.length % 2 !== 0) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid document reference. Document ' +
                'references must have an even number of segments, but ' +
                `${path.canonicalString()} has ${path.length}`);
        }
        return new DocumentReference(firestore, new DocumentReference$1(firestore._delegate, converter, new DocumentKey(path)));
    }
    static forKey(key, firestore, converter) {
        return new DocumentReference(firestore, new DocumentReference$1(firestore._delegate, converter, key));
    }
    get id() {
        return this._delegate.id;
    }
    get parent() {
        return new CollectionReference(this.firestore, this._delegate.parent);
    }
    get path() {
        return this._delegate.path;
    }
    collection(pathString) {
        try {
            return new CollectionReference(this.firestore, collection(this._delegate, pathString));
        }
        catch (e) {
            throw replaceFunctionName(e, 'collection()', 'DocumentReference.collection()');
        }
    }
    isEqual(other) {
        other = getModularInstance(other);
        if (!(other instanceof DocumentReference$1)) {
            return false;
        }
        return refEqual(this._delegate, other);
    }
    set(value, options) {
        options = validateSetOptions('DocumentReference.set', options);
        try {
            return setDoc(this._delegate, value, options);
        }
        catch (e) {
            throw replaceFunctionName(e, 'setDoc()', 'DocumentReference.set()');
        }
    }
    update(fieldOrUpdateData, value, ...moreFieldsAndValues) {
        try {
            if (arguments.length === 1) {
                return updateDoc(this._delegate, fieldOrUpdateData);
            }
            else {
                return updateDoc(this._delegate, fieldOrUpdateData, value, ...moreFieldsAndValues);
            }
        }
        catch (e) {
            throw replaceFunctionName(e, 'updateDoc()', 'DocumentReference.update()');
        }
    }
    delete() {
        return deleteDoc(this._delegate);
    }
    onSnapshot(...args) {
        const options = extractSnapshotOptions(args);
        const observer = wrapObserver(args, result => new DocumentSnapshot(this.firestore, new DocumentSnapshot$1(this.firestore._delegate, this._userDataWriter, result._key, result._document, result.metadata, this._delegate.converter)));
        return onSnapshot(this._delegate, options, observer);
    }
    get(options) {
        let snap;
        if ((options === null || options === void 0 ? void 0 : options.source) === 'cache') {
            snap = getDocFromCache(this._delegate);
        }
        else if ((options === null || options === void 0 ? void 0 : options.source) === 'server') {
            snap = getDocFromServer(this._delegate);
        }
        else {
            snap = getDoc(this._delegate);
        }
        return snap.then(result => new DocumentSnapshot(this.firestore, new DocumentSnapshot$1(this.firestore._delegate, this._userDataWriter, result._key, result._document, result.metadata, this._delegate.converter)));
    }
    withConverter(converter) {
        return new DocumentReference(this.firestore, converter
            ? this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore, converter))
            : this._delegate.withConverter(null));
    }
}
/**
 * Replaces the function name in an error thrown by the firestore-exp API
 * with the function names used in the classic API.
 */
function replaceFunctionName(e, original, updated) {
    e.message = e.message.replace(original, updated);
    return e;
}
/**
 * Iterates the list of arguments from an `onSnapshot` call and returns the
 * first argument that may be an `SnapshotListenOptions` object. Returns an
 * empty object if none is found.
 */
function extractSnapshotOptions(args) {
    for (const arg of args) {
        if (typeof arg === 'object' && !isPartialObserver(arg)) {
            return arg;
        }
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
 */
function wrapObserver(args, wrapper) {
    var _a, _b;
    let userObserver;
    if (isPartialObserver(args[0])) {
        userObserver = args[0];
    }
    else if (isPartialObserver(args[1])) {
        userObserver = args[1];
    }
    else if (typeof args[0] === 'function') {
        userObserver = {
            next: args[0],
            error: args[1],
            complete: args[2]
        };
    }
    else {
        userObserver = {
            next: args[1],
            error: args[2],
            complete: args[3]
        };
    }
    return {
        next: val => {
            if (userObserver.next) {
                userObserver.next(wrapper(val));
            }
        },
        error: (_a = userObserver.error) === null || _a === void 0 ? void 0 : _a.bind(userObserver),
        complete: (_b = userObserver.complete) === null || _b === void 0 ? void 0 : _b.bind(userObserver)
    };
}
class DocumentSnapshot {
    constructor(_firestore, _delegate) {
        this._firestore = _firestore;
        this._delegate = _delegate;
    }
    get ref() {
        return new DocumentReference(this._firestore, this._delegate.ref);
    }
    get id() {
        return this._delegate.id;
    }
    get metadata() {
        return this._delegate.metadata;
    }
    get exists() {
        return this._delegate.exists();
    }
    data(options) {
        return this._delegate.data(options);
    }
    get(fieldPath, options
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        return this._delegate.get(fieldPath, options);
    }
    isEqual(other) {
        return snapshotEqual(this._delegate, other._delegate);
    }
}
class QueryDocumentSnapshot extends DocumentSnapshot {
    data(options) {
        const data = this._delegate.data(options);
        return data;
    }
}
class Query {
    constructor(firestore, _delegate) {
        this.firestore = firestore;
        this._delegate = _delegate;
        this._userDataWriter = new UserDataWriter(firestore);
    }
    where(fieldPath, opStr, value) {
        try {
            // The "as string" cast is a little bit of a hack. `where` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new Query(this.firestore, query(this._delegate, where(fieldPath, opStr, value)));
        }
        catch (e) {
            throw replaceFunctionName(e, /(orderBy|where)\(\)/, 'Query.$1()');
        }
    }
    orderBy(fieldPath, directionStr) {
        try {
            // The "as string" cast is a little bit of a hack. `orderBy` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new Query(this.firestore, query(this._delegate, orderBy(fieldPath, directionStr)));
        }
        catch (e) {
            throw replaceFunctionName(e, /(orderBy|where)\(\)/, 'Query.$1()');
        }
    }
    limit(n) {
        try {
            return new Query(this.firestore, query(this._delegate, limit(n)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'limit()', 'Query.limit()');
        }
    }
    limitToLast(n) {
        try {
            return new Query(this.firestore, query(this._delegate, limitToLast(n)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'limitToLast()', 'Query.limitToLast()');
        }
    }
    startAt(...args) {
        try {
            return new Query(this.firestore, query(this._delegate, startAt(...args)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'startAt()', 'Query.startAt()');
        }
    }
    startAfter(...args) {
        try {
            return new Query(this.firestore, query(this._delegate, startAfter(...args)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'startAfter()', 'Query.startAfter()');
        }
    }
    endBefore(...args) {
        try {
            return new Query(this.firestore, query(this._delegate, endBefore(...args)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'endBefore()', 'Query.endBefore()');
        }
    }
    endAt(...args) {
        try {
            return new Query(this.firestore, query(this._delegate, endAt(...args)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'endAt()', 'Query.endAt()');
        }
    }
    isEqual(other) {
        return queryEqual(this._delegate, other._delegate);
    }
    get(options) {
        let query;
        if ((options === null || options === void 0 ? void 0 : options.source) === 'cache') {
            query = getDocsFromCache(this._delegate);
        }
        else if ((options === null || options === void 0 ? void 0 : options.source) === 'server') {
            query = getDocsFromServer(this._delegate);
        }
        else {
            query = getDocs(this._delegate);
        }
        return query.then(result => new QuerySnapshot(this.firestore, new QuerySnapshot$1(this.firestore._delegate, this._userDataWriter, this._delegate, result._snapshot)));
    }
    onSnapshot(...args) {
        const options = extractSnapshotOptions(args);
        const observer = wrapObserver(args, snap => new QuerySnapshot(this.firestore, new QuerySnapshot$1(this.firestore._delegate, this._userDataWriter, this._delegate, snap._snapshot)));
        return onSnapshot(this._delegate, options, observer);
    }
    withConverter(converter) {
        return new Query(this.firestore, converter
            ? this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore, converter))
            : this._delegate.withConverter(null));
    }
}
class DocumentChange {
    constructor(_firestore, _delegate) {
        this._firestore = _firestore;
        this._delegate = _delegate;
    }
    get type() {
        return this._delegate.type;
    }
    get doc() {
        return new QueryDocumentSnapshot(this._firestore, this._delegate.doc);
    }
    get oldIndex() {
        return this._delegate.oldIndex;
    }
    get newIndex() {
        return this._delegate.newIndex;
    }
}
class QuerySnapshot {
    constructor(_firestore, _delegate) {
        this._firestore = _firestore;
        this._delegate = _delegate;
    }
    get query() {
        return new Query(this._firestore, this._delegate.query);
    }
    get metadata() {
        return this._delegate.metadata;
    }
    get size() {
        return this._delegate.size;
    }
    get empty() {
        return this._delegate.empty;
    }
    get docs() {
        return this._delegate.docs.map(doc => new QueryDocumentSnapshot(this._firestore, doc));
    }
    docChanges(options) {
        return this._delegate
            .docChanges(options)
            .map(docChange => new DocumentChange(this._firestore, docChange));
    }
    forEach(callback, thisArg) {
        this._delegate.forEach(snapshot => {
            callback.call(thisArg, new QueryDocumentSnapshot(this._firestore, snapshot));
        });
    }
    isEqual(other) {
        return snapshotEqual(this._delegate, other._delegate);
    }
}
class CollectionReference extends Query {
    constructor(firestore, _delegate) {
        super(firestore, _delegate);
        this.firestore = firestore;
        this._delegate = _delegate;
    }
    get id() {
        return this._delegate.id;
    }
    get path() {
        return this._delegate.path;
    }
    get parent() {
        const docRef = this._delegate.parent;
        return docRef ? new DocumentReference(this.firestore, docRef) : null;
    }
    doc(documentPath) {
        try {
            if (documentPath === undefined) {
                // Call `doc` without `documentPath` if `documentPath` is `undefined`
                // as `doc` validates the number of arguments to prevent users from
                // accidentally passing `undefined`.
                return new DocumentReference(this.firestore, doc(this._delegate));
            }
            else {
                return new DocumentReference(this.firestore, doc(this._delegate, documentPath));
            }
        }
        catch (e) {
            throw replaceFunctionName(e, 'doc()', 'CollectionReference.doc()');
        }
    }
    add(data) {
        return addDoc(this._delegate, data).then(docRef => new DocumentReference(this.firestore, docRef));
    }
    isEqual(other) {
        return refEqual(this._delegate, other._delegate);
    }
    withConverter(converter) {
        return new CollectionReference(this.firestore, converter
            ? this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore, converter))
            : this._delegate.withConverter(null));
    }
}
function castReference(documentRef) {
    return cast(documentRef, DocumentReference$1);
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
 */
function loadBundle(data) {
    return loadBundle$1(this._delegate, data);
}
function namedQuery(queryName) {
    return namedQuery$1(this._delegate, queryName).then(expQuery => {
        if (!expQuery) {
            return null;
        }
        return new Query(this, 
        // We can pass `expQuery` here directly since named queries don't have a UserDataConverter.
        // Otherwise, we would have to create a new ExpQuery and pass the old UserDataConverter.
        expQuery);
    });
}
/**
 * Prototype patches bundle loading to Firestore.
 */
function registerBundle(instance) {
    instance.prototype.loadBundle = loadBundle;
    instance.prototype.namedQuery = namedQuery;
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
 */
class FieldPath {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    constructor(...fieldNames) {
        this._delegate = new FieldPath$2(...fieldNames);
    }
    static documentId() {
        /**
         * Internal Note: The backend doesn't technically support querying by
         * document ID. Instead it queries by the entire document name (full path
         * included), but in the cases we currently support documentId(), the net
         * effect is the same.
         */
        return new FieldPath(FieldPath$1.keyField().canonicalString());
    }
    isEqual(other) {
        other = getModularInstance(other);
        if (!(other instanceof FieldPath$2)) {
            return false;
        }
        return this._delegate._internalPath.isEqual(other._internalPath);
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
class FieldValue {
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    static serverTimestamp() {
        const delegate = serverTimestamp();
        delegate._methodName = 'FieldValue.serverTimestamp';
        return new FieldValue(delegate);
    }
    static delete() {
        const delegate = deleteField();
        delegate._methodName = 'FieldValue.delete';
        return new FieldValue(delegate);
    }
    static arrayUnion(...elements) {
        const delegate = arrayUnion(...elements);
        delegate._methodName = 'FieldValue.arrayUnion';
        return new FieldValue(delegate);
    }
    static arrayRemove(...elements) {
        const delegate = arrayRemove(...elements);
        delegate._methodName = 'FieldValue.arrayRemove';
        return new FieldValue(delegate);
    }
    static increment(n) {
        const delegate = increment(n);
        delegate._methodName = 'FieldValue.increment';
        return new FieldValue(delegate);
    }
    isEqual(other) {
        return this._delegate.isEqual(other._delegate);
    }
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
 */
const firestoreNamespace = {
    Firestore,
    GeoPoint,
    Timestamp,
    Blob,
    Transaction,
    WriteBatch,
    DocumentReference,
    DocumentSnapshot,
    Query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    CollectionReference,
    FieldPath,
    FieldValue,
    setLogLevel,
    CACHE_SIZE_UNLIMITED
};
/**
 * Configures Firestore as part of the Firebase SDK by calling registerComponent.
 *
 * @param firebase - The FirebaseNamespace to register Firestore with
 * @param firestoreFactory - A factory function that returns a new Firestore
 *    instance.
 */
function configureForFirebase(firebase, firestoreFactory) {
    firebase.INTERNAL.registerComponent(new Component('firestore-compat', container => {
        const app = container.getProvider('app-compat').getImmediate();
        const firestoreExp = container
            .getProvider('firestore-exp')
            .getImmediate();
        return firestoreFactory(app, firestoreExp);
    }, "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, firestoreNamespace)));
}

const name = "@firebase/firestore-compat";
const version = "0.0.900";

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
function registerFirestore(instance) {
    setSDKVersion(instance.SDK_VERSION);
    configureForFirebase(instance, (app, firestoreExp) => new Firestore(app, firestoreExp, new IndexedDbPersistenceProvider()));
    instance.registerVersion(name, version);
}
registerFirestore(firebase);
registerBundle(Firestore);

export { registerFirestore };
//# sourceMappingURL=index.js.map
