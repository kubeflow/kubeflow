import { _getProvider, getApp, _removeServiceInstance, _registerComponent, registerVersion, SDK_VERSION as SDK_VERSION$1 } from '@firebase/app';
import { Component } from '@firebase/component';
import { getUA, isSafari, createMockUserToken, getModularInstance } from '@firebase/util';
import { Logger, LogLevel } from '@firebase/logger';
import { inspect, TextEncoder, TextDecoder } from 'util';
import { randomBytes as randomBytes$1 } from 'crypto';
import { credentials, Metadata, loadPackageDefinition } from '@grpc/grpc-js';
import { version as version$2 } from '@grpc/grpc-js/package.json';
import { resolve, join } from 'path';
import { loadSync } from '@grpc/proto-loader';

const name = "@firebase/firestore";
const version$1 = "2.3.9";

const version = "8.8.0";

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
let SDK_VERSION = version;
function setSDKVersion(version) {
    SDK_VERSION = version;
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
/**
 * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
 * exceed. All subsequent calls to next will return increasing values. If provided with a
 * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
 * well as write out sequence numbers that it produces via `next()`.
 */
class ListenSequence {
    constructor(previousValue, sequenceNumberSyncer) {
        this.previousValue = previousValue;
        if (sequenceNumberSyncer) {
            sequenceNumberSyncer.sequenceNumberHandler = sequenceNumber => this.setPreviousValue(sequenceNumber);
            this.writeNewSequenceNumber = sequenceNumber => sequenceNumberSyncer.writeSequenceNumber(sequenceNumber);
        }
    }
    setPreviousValue(externalPreviousValue) {
        this.previousValue = Math.max(externalPreviousValue, this.previousValue);
        return this.previousValue;
    }
    next() {
        const nextValue = ++this.previousValue;
        if (this.writeNewSequenceNumber) {
            this.writeNewSequenceNumber(nextValue);
        }
        return nextValue;
    }
}
ListenSequence.INVALID = -1;

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
    return inspect(value, { depth: 100 });
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
// Helper methods are needed because variables can't be exported as read/write
function getLogLevel() {
    return logClient.logLevel;
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
 */
function setLogLevel(logLevel) {
    logClient.setLogLevel(logLevel);
}
function logDebug(msg, ...obj) {
    if (logClient.logLevel <= LogLevel.DEBUG) {
        const args = obj.map(argToString);
        logClient.debug(`Firestore (${SDK_VERSION}): ${msg}`, ...args);
    }
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
const escapeChar = '\u0001';
const encodedSeparatorChar = '\u0001';
const encodedNul = '\u0010';
const encodedEscape = '\u0011';
/**
 * Encodes a resource path into a IndexedDb-compatible string form.
 */
function encodeResourcePath(path) {
    let result = '';
    for (let i = 0; i < path.length; i++) {
        if (result.length > 0) {
            result = encodeSeparator(result);
        }
        result = encodeSegment(path.get(i), result);
    }
    return encodeSeparator(result);
}
/** Encodes a single segment of a resource path into the given result */
function encodeSegment(segment, resultBuf) {
    let result = resultBuf;
    const length = segment.length;
    for (let i = 0; i < length; i++) {
        const c = segment.charAt(i);
        switch (c) {
            case '\0':
                result += escapeChar + encodedNul;
                break;
            case escapeChar:
                result += escapeChar + encodedEscape;
                break;
            default:
                result += c;
        }
    }
    return result;
}
/** Encodes a path separator into the given result */
function encodeSeparator(result) {
    return result + escapeChar + encodedSeparatorChar;
}
/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */
function decodeResourcePath(path) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    const length = path.length;
    hardAssert(length >= 2);
    if (length === 2) {
        hardAssert(path.charAt(0) === escapeChar && path.charAt(1) === encodedSeparatorChar);
        return ResourcePath.emptyPath();
    }
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
    const lastReasonableEscapeIndex = length - 2;
    const segments = [];
    let segmentBuilder = '';
    for (let start = 0; start < length;) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        const end = path.indexOf(escapeChar, start);
        if (end < 0 || end > lastReasonableEscapeIndex) {
            fail();
        }
        const next = path.charAt(end + 1);
        switch (next) {
            case encodedSeparatorChar:
                const currentPiece = path.substring(start, end);
                let segment;
                if (segmentBuilder.length === 0) {
                    // Avoid copying for the common case of a segment that excludes \0
                    // and \001
                    segment = currentPiece;
                }
                else {
                    segmentBuilder += currentPiece;
                    segment = segmentBuilder;
                    segmentBuilder = '';
                }
                segments.push(segment);
                break;
            case encodedNul:
                segmentBuilder += path.substring(start, end);
                segmentBuilder += '\0';
                break;
            case encodedEscape:
                // The escape character can be used in the output to encode itself.
                segmentBuilder += path.substring(start, end + 1);
                break;
            default:
                fail();
        }
        start = end + 2;
    }
    return new ResourcePath(segments);
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
const SCHEMA_VERSION = 11;
/**
 * Wrapper class to store timestamps (seconds and nanos) in IndexedDb objects.
 */
class DbTimestamp {
    constructor(seconds, nanoseconds) {
        this.seconds = seconds;
        this.nanoseconds = nanoseconds;
    }
}
/**
 * A singleton object to be stored in the 'owner' store in IndexedDb.
 *
 * A given database can have a single primary tab assigned at a given time. That
 * tab must validate that it is still holding the primary lease before every
 * operation that requires locked access. The primary tab should regularly
 * write an updated timestamp to this lease to prevent other tabs from
 * "stealing" the primary lease
 */
class DbPrimaryClient {
    constructor(ownerId, 
    /** Whether to allow shared access from multiple tabs. */
    allowTabSynchronization, leaseTimestampMs) {
        this.ownerId = ownerId;
        this.allowTabSynchronization = allowTabSynchronization;
        this.leaseTimestampMs = leaseTimestampMs;
    }
}
/**
 * Name of the IndexedDb object store.
 *
 * Note that the name 'owner' is chosen to ensure backwards compatibility with
 * older clients that only supported single locked access to the persistence
 * layer.
 */
DbPrimaryClient.store = 'owner';
/**
 * The key string used for the single object that exists in the
 * DbPrimaryClient store.
 */
DbPrimaryClient.key = 'owner';
/**
 * An object to be stored in the 'mutationQueues' store in IndexedDb.
 *
 * Each user gets a single queue of MutationBatches to apply to the server.
 * DbMutationQueue tracks the metadata about the queue.
 */
class DbMutationQueue {
    constructor(
    /**
     * The normalized user ID to which this queue belongs.
     */
    userId, 
    /**
     * An identifier for the highest numbered batch that has been acknowledged
     * by the server. All MutationBatches in this queue with batchIds less
     * than or equal to this value are considered to have been acknowledged by
     * the server.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
    lastAcknowledgedBatchId, 
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
    lastStreamToken) {
        this.userId = userId;
        this.lastAcknowledgedBatchId = lastAcknowledgedBatchId;
        this.lastStreamToken = lastStreamToken;
    }
}
/** Name of the IndexedDb object store.  */
DbMutationQueue.store = 'mutationQueues';
/** Keys are automatically assigned via the userId property. */
DbMutationQueue.keyPath = 'userId';
/**
 * An object to be stored in the 'mutations' store in IndexedDb.
 *
 * Represents a batch of user-level mutations intended to be sent to the server
 * in a single write. Each user-level batch gets a separate DbMutationBatch
 * with a new batchId.
 */
class DbMutationBatch {
    constructor(
    /**
     * The normalized user ID to which this batch belongs.
     */
    userId, 
    /**
     * An identifier for this batch, allocated using an auto-generated key.
     */
    batchId, 
    /**
     * The local write time of the batch, stored as milliseconds since the
     * epoch.
     */
    localWriteTimeMs, 
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
    baseMutations, 
    /**
     * A list of mutations to apply. All mutations will be applied atomically.
     *
     * Mutations are serialized via toMutation().
     */
    mutations) {
        this.userId = userId;
        this.batchId = batchId;
        this.localWriteTimeMs = localWriteTimeMs;
        this.baseMutations = baseMutations;
        this.mutations = mutations;
    }
}
/** Name of the IndexedDb object store.  */
DbMutationBatch.store = 'mutations';
/** Keys are automatically assigned via the userId, batchId properties. */
DbMutationBatch.keyPath = 'batchId';
/** The index name for lookup of mutations by user. */
DbMutationBatch.userMutationsIndex = 'userMutationsIndex';
/** The user mutations index is keyed by [userId, batchId] pairs. */
DbMutationBatch.userMutationsKeyPath = ['userId', 'batchId'];
/**
 * An object to be stored in the 'documentMutations' store in IndexedDb.
 *
 * A manually maintained index of all the mutation batches that affect a given
 * document key. The rows in this table are references based on the contents of
 * DbMutationBatch.mutations.
 */
class DbDocumentMutation {
    constructor() { }
    /**
     * Creates a [userId] key for use in the DbDocumentMutations index to iterate
     * over all of a user's document mutations.
     */
    static prefixForUser(userId) {
        return [userId];
    }
    /**
     * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
     * index to iterate over all at document mutations for a given path or lower.
     */
    static prefixForPath(userId, path) {
        return [userId, encodeResourcePath(path)];
    }
    /**
     * Creates a full index key of [userId, encodedPath, batchId] for inserting
     * and deleting into the DbDocumentMutations index.
     */
    static key(userId, path, batchId) {
        return [userId, encodeResourcePath(path), batchId];
    }
}
DbDocumentMutation.store = 'documentMutations';
/**
 * Because we store all the useful information for this store in the key,
 * there is no useful information to store as the value. The raw (unencoded)
 * path cannot be stored because IndexedDb doesn't store prototype
 * information.
 */
DbDocumentMutation.PLACEHOLDER = new DbDocumentMutation();
/**
 * Represents the known absence of a document at a particular version.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */
class DbNoDocument {
    constructor(path, readTime) {
        this.path = path;
        this.readTime = readTime;
    }
}
/**
 * Represents a document that is known to exist but whose data is unknown.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */
class DbUnknownDocument {
    constructor(path, version) {
        this.path = path;
        this.version = version;
    }
}
/**
 * An object to be stored in the 'remoteDocuments' store in IndexedDb.
 * It represents either:
 *
 * - A complete document.
 * - A "no document" representing a document that is known not to exist (at
 * some version).
 * - An "unknown document" representing a document that is known to exist (at
 * some version) but whose contents are unknown.
 *
 * Note: This is the persisted equivalent of a MaybeDocument and could perhaps
 * be made more general if necessary.
 */
class DbRemoteDocument {
    // TODO: We are currently storing full document keys almost three times
    // (once as part of the primary key, once - partly - as `parentPath` and once
    // inside the encoded documents). During our next migration, we should
    // rewrite the primary key as parentPath + document ID which would allow us
    // to drop one value.
    constructor(
    /**
     * Set to an instance of DbUnknownDocument if the data for a document is
     * not known, but it is known that a document exists at the specified
     * version (e.g. it had a successful update applied to it)
     */
    unknownDocument, 
    /**
     * Set to an instance of a DbNoDocument if it is known that no document
     * exists.
     */
    noDocument, 
    /**
     * Set to an instance of a Document if there's a cached version of the
     * document.
     */
    document, 
    /**
     * Documents that were written to the remote document store based on
     * a write acknowledgment are marked with `hasCommittedMutations`. These
     * documents are potentially inconsistent with the backend's copy and use
     * the write's commit version as their document version.
     */
    hasCommittedMutations, 
    /**
     * When the document was read from the backend. Undefined for data written
     * prior to schema version 9.
     */
    readTime, 
    /**
     * The path of the collection this document is part of. Undefined for data
     * written prior to schema version 9.
     */
    parentPath) {
        this.unknownDocument = unknownDocument;
        this.noDocument = noDocument;
        this.document = document;
        this.hasCommittedMutations = hasCommittedMutations;
        this.readTime = readTime;
        this.parentPath = parentPath;
    }
}
DbRemoteDocument.store = 'remoteDocuments';
/**
 * An index that provides access to all entries sorted by read time (which
 * corresponds to the last modification time of each row).
 *
 * This index is used to provide a changelog for Multi-Tab.
 */
DbRemoteDocument.readTimeIndex = 'readTimeIndex';
DbRemoteDocument.readTimeIndexPath = 'readTime';
/**
 * An index that provides access to documents in a collection sorted by read
 * time.
 *
 * This index is used to allow the RemoteDocumentCache to fetch newly changed
 * documents in a collection.
 */
DbRemoteDocument.collectionReadTimeIndex = 'collectionReadTimeIndex';
DbRemoteDocument.collectionReadTimeIndexPath = ['parentPath', 'readTime'];
/**
 * Contains a single entry that has metadata about the remote document cache.
 */
class DbRemoteDocumentGlobal {
    /**
     * @param byteSize - Approximately the total size in bytes of all the
     * documents in the document cache.
     */
    constructor(byteSize) {
        this.byteSize = byteSize;
    }
}
DbRemoteDocumentGlobal.store = 'remoteDocumentGlobal';
DbRemoteDocumentGlobal.key = 'remoteDocumentGlobalKey';
/**
 * An object to be stored in the 'targets' store in IndexedDb.
 *
 * This is based on and should be kept in sync with the proto used in the iOS
 * client.
 *
 * Each query the client listens to against the server is tracked on disk so
 * that the query can be efficiently resumed on restart.
 */
class DbTarget {
    constructor(
    /**
     * An auto-generated sequential numeric identifier for the query.
     *
     * Queries are stored using their canonicalId as the key, but these
     * canonicalIds can be quite long so we additionally assign a unique
     * queryId which can be used by referenced data structures (e.g.
     * indexes) to minimize the on-disk cost.
     */
    targetId, 
    /**
     * The canonical string representing this query. This is not unique.
     */
    canonicalId, 
    /**
     * The last readTime received from the Watch Service for this query.
     *
     * This is the same value as TargetChange.read_time in the protos.
     */
    readTime, 
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
    resumeToken, 
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
    lastListenSequenceNumber, 
    /**
     * Denotes the maximum snapshot version at which the associated query view
     * contained no limbo documents.  Undefined for data written prior to
     * schema version 9.
     */
    lastLimboFreeSnapshotVersion, 
    /**
     * The query for this target.
     *
     * Because canonical ids are not unique we must store the actual query. We
     * use the proto to have an object we can persist without having to
     * duplicate translation logic to and from a `Query` object.
     */
    query) {
        this.targetId = targetId;
        this.canonicalId = canonicalId;
        this.readTime = readTime;
        this.resumeToken = resumeToken;
        this.lastListenSequenceNumber = lastListenSequenceNumber;
        this.lastLimboFreeSnapshotVersion = lastLimboFreeSnapshotVersion;
        this.query = query;
    }
}
DbTarget.store = 'targets';
/** Keys are automatically assigned via the targetId property. */
DbTarget.keyPath = 'targetId';
/** The name of the queryTargets index. */
DbTarget.queryTargetsIndexName = 'queryTargetsIndex';
/**
 * The index of all canonicalIds to the targets that they match. This is not
 * a unique mapping because canonicalId does not promise a unique name for all
 * possible queries, so we append the targetId to make the mapping unique.
 */
DbTarget.queryTargetsKeyPath = ['canonicalId', 'targetId'];
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
class DbTargetDocument {
    constructor(
    /**
     * The targetId identifying a target or 0 for a sentinel row.
     */
    targetId, 
    /**
     * The path to the document, as encoded in the key.
     */
    path, 
    /**
     * If this is a sentinel row, this should be the sequence number of the last
     * time the document specified by `path` was used. Otherwise, it should be
     * `undefined`.
     */
    sequenceNumber) {
        this.targetId = targetId;
        this.path = path;
        this.sequenceNumber = sequenceNumber;
    }
}
/** Name of the IndexedDb object store.  */
DbTargetDocument.store = 'targetDocuments';
/** Keys are automatically assigned via the targetId, path properties. */
DbTargetDocument.keyPath = ['targetId', 'path'];
/** The index name for the reverse index. */
DbTargetDocument.documentTargetsIndex = 'documentTargetsIndex';
/** We also need to create the reverse index for these properties. */
DbTargetDocument.documentTargetsKeyPath = ['path', 'targetId'];
/**
 * A record of global state tracked across all Targets, tracked separately
 * to avoid the need for extra indexes.
 *
 * This should be kept in-sync with the proto used in the iOS client.
 */
class DbTargetGlobal {
    constructor(
    /**
     * The highest numbered target id across all targets.
     *
     * See DbTarget.targetId.
     */
    highestTargetId, 
    /**
     * The highest numbered lastListenSequenceNumber across all targets.
     *
     * See DbTarget.lastListenSequenceNumber.
     */
    highestListenSequenceNumber, 
    /**
     * A global snapshot version representing the last consistent snapshot we
     * received from the backend. This is monotonically increasing and any
     * snapshots received from the backend prior to this version (e.g. for
     * targets resumed with a resumeToken) should be suppressed (buffered)
     * until the backend has caught up to this snapshot version again. This
     * prevents our cache from ever going backwards in time.
     */
    lastRemoteSnapshotVersion, 
    /**
     * The number of targets persisted.
     */
    targetCount) {
        this.highestTargetId = highestTargetId;
        this.highestListenSequenceNumber = highestListenSequenceNumber;
        this.lastRemoteSnapshotVersion = lastRemoteSnapshotVersion;
        this.targetCount = targetCount;
    }
}
/**
 * The key string used for the single object that exists in the
 * DbTargetGlobal store.
 */
DbTargetGlobal.key = 'targetGlobalKey';
DbTargetGlobal.store = 'targetGlobal';
/**
 * An object representing an association between a Collection id (e.g. 'messages')
 * to a parent path (e.g. '/chats/123') that contains it as a (sub)collection.
 * This is used to efficiently find all collections to query when performing
 * a Collection Group query.
 */
class DbCollectionParent {
    constructor(
    /**
     * The collectionId (e.g. 'messages')
     */
    collectionId, 
    /**
     * The path to the parent (either a document location or an empty path for
     * a root-level collection).
     */
    parent) {
        this.collectionId = collectionId;
        this.parent = parent;
    }
}
/** Name of the IndexedDb object store. */
DbCollectionParent.store = 'collectionParents';
/** Keys are automatically assigned via the collectionId, parent properties. */
DbCollectionParent.keyPath = ['collectionId', 'parent'];
/**
 * A record of the metadata state of each client.
 *
 * PORTING NOTE: This is used to synchronize multi-tab state and does not need
 * to be ported to iOS or Android.
 */
class DbClientMetadata {
    constructor(
    // Note: Previous schema versions included a field
    // "lastProcessedDocumentChangeId". Don't use anymore.
    /** The auto-generated client id assigned at client startup. */
    clientId, 
    /** The last time this state was updated. */
    updateTimeMs, 
    /** Whether the client's network connection is enabled. */
    networkEnabled, 
    /** Whether this client is running in a foreground tab. */
    inForeground) {
        this.clientId = clientId;
        this.updateTimeMs = updateTimeMs;
        this.networkEnabled = networkEnabled;
        this.inForeground = inForeground;
    }
}
/** Name of the IndexedDb object store. */
DbClientMetadata.store = 'clientMetadata';
/** Keys are automatically assigned via the clientId properties. */
DbClientMetadata.keyPath = 'clientId';
/**
 * A object representing a bundle loaded by the SDK.
 */
class DbBundle {
    constructor(
    /** The ID of the loaded bundle. */
    bundleId, 
    /** The create time of the loaded bundle. */
    createTime, 
    /** The schema version of the loaded bundle. */
    version) {
        this.bundleId = bundleId;
        this.createTime = createTime;
        this.version = version;
    }
}
/** Name of the IndexedDb object store. */
DbBundle.store = 'bundles';
DbBundle.keyPath = 'bundleId';
/**
 * A object representing a named query loaded by the SDK via a bundle.
 */
class DbNamedQuery {
    constructor(
    /** The name of the query. */
    name, 
    /** The read time of the results saved in the bundle from the named query. */
    readTime, 
    /** The query saved in the bundle. */
    bundledQuery) {
        this.name = name;
        this.readTime = readTime;
        this.bundledQuery = bundledQuery;
    }
}
/** Name of the IndexedDb object store. */
DbNamedQuery.store = 'namedQueries';
DbNamedQuery.keyPath = 'name';
// Visible for testing
const V1_STORES = [
    DbMutationQueue.store,
    DbMutationBatch.store,
    DbDocumentMutation.store,
    DbRemoteDocument.store,
    DbTarget.store,
    DbPrimaryClient.store,
    DbTargetGlobal.store,
    DbTargetDocument.store
];
// V2 is no longer usable (see comment at top of file)
// Visible for testing
const V3_STORES = V1_STORES;
// Visible for testing
// Note: DbRemoteDocumentChanges is no longer used and dropped with v9.
const V4_STORES = [...V3_STORES, DbClientMetadata.store];
// V5 does not change the set of stores.
const V6_STORES = [...V4_STORES, DbRemoteDocumentGlobal.store];
// V7 does not change the set of stores.
const V8_STORES = [...V6_STORES, DbCollectionParent.store];
// V9 does not change the set of stores.
// V10 does not change the set of stores.
const V11_STORES = [...V8_STORES, DbBundle.store, DbNamedQuery.store];
/**
 * The list of all default IndexedDB stores used throughout the SDK. This is
 * used when creating transactions so that access across all stores is done
 * atomically.
 */
const ALL_STORES = V11_STORES;

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
const PRIMARY_LEASE_LOST_ERROR_MSG = 'The current tab is not in the required state to perform this operation. ' +
    'It might be necessary to refresh the browser tab.';
/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */
class PersistenceTransaction {
    constructor() {
        this.onCommittedListeners = [];
    }
    addOnCommittedListener(listener) {
        this.onCommittedListeners.push(listener);
    }
    raiseOnCommittedEvent() {
        this.onCommittedListeners.forEach(listener => listener());
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
class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
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
 * PersistencePromise is essentially a re-implementation of Promise except
 * it has a .next() method instead of .then() and .next() and .catch() callbacks
 * are executed synchronously when a PersistencePromise resolves rather than
 * asynchronously (Promise implementations use setImmediate() or similar).
 *
 * This is necessary to interoperate with IndexedDB which will automatically
 * commit transactions if control is returned to the event loop without
 * synchronously initiating another operation on the transaction.
 *
 * NOTE: .then() and .catch() only allow a single consumer, unlike normal
 * Promises.
 */
class PersistencePromise {
    constructor(callback) {
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
        this.nextCallback = null;
        this.catchCallback = null;
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = undefined;
        this.error = undefined;
        this.isDone = false;
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.callbackAttached = false;
        callback(value => {
            this.isDone = true;
            this.result = value;
            if (this.nextCallback) {
                // value should be defined unless T is Void, but we can't express
                // that in the type system.
                this.nextCallback(value);
            }
        }, error => {
            this.isDone = true;
            this.error = error;
            if (this.catchCallback) {
                this.catchCallback(error);
            }
        });
    }
    catch(fn) {
        return this.next(undefined, fn);
    }
    next(nextFn, catchFn) {
        if (this.callbackAttached) {
            fail();
        }
        this.callbackAttached = true;
        if (this.isDone) {
            if (!this.error) {
                return this.wrapSuccess(nextFn, this.result);
            }
            else {
                return this.wrapFailure(catchFn, this.error);
            }
        }
        else {
            return new PersistencePromise((resolve, reject) => {
                this.nextCallback = (value) => {
                    this.wrapSuccess(nextFn, value).next(resolve, reject);
                };
                this.catchCallback = (error) => {
                    this.wrapFailure(catchFn, error).next(resolve, reject);
                };
            });
        }
    }
    toPromise() {
        return new Promise((resolve, reject) => {
            this.next(resolve, reject);
        });
    }
    wrapUserFunction(fn) {
        try {
            const result = fn();
            if (result instanceof PersistencePromise) {
                return result;
            }
            else {
                return PersistencePromise.resolve(result);
            }
        }
        catch (e) {
            return PersistencePromise.reject(e);
        }
    }
    wrapSuccess(nextFn, value) {
        if (nextFn) {
            return this.wrapUserFunction(() => nextFn(value));
        }
        else {
            // If there's no nextFn, then R must be the same as T
            return PersistencePromise.resolve(value);
        }
    }
    wrapFailure(catchFn, error) {
        if (catchFn) {
            return this.wrapUserFunction(() => catchFn(error));
        }
        else {
            return PersistencePromise.reject(error);
        }
    }
    static resolve(result) {
        return new PersistencePromise((resolve, reject) => {
            resolve(result);
        });
    }
    static reject(error) {
        return new PersistencePromise((resolve, reject) => {
            reject(error);
        });
    }
    static waitFor(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    all) {
        return new PersistencePromise((resolve, reject) => {
            let expectedCount = 0;
            let resolvedCount = 0;
            let done = false;
            all.forEach(element => {
                ++expectedCount;
                element.next(() => {
                    ++resolvedCount;
                    if (done && resolvedCount === expectedCount) {
                        resolve();
                    }
                }, err => reject(err));
            });
            done = true;
            if (resolvedCount === expectedCount) {
                resolve();
            }
        });
    }
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */
    static or(predicates) {
        let p = PersistencePromise.resolve(false);
        for (const predicate of predicates) {
            p = p.next(isTrue => {
                if (isTrue) {
                    return PersistencePromise.resolve(isTrue);
                }
                else {
                    return predicate();
                }
            });
        }
        return p;
    }
    static forEach(collection, f) {
        const promises = [];
        collection.forEach((r, s) => {
            promises.push(f.call(this, r, s));
        });
        return this.waitFor(promises);
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
// References to `window` are guarded by SimpleDb.isAvailable()
/* eslint-disable no-restricted-globals */
const LOG_TAG$g = 'SimpleDb';
/**
 * The maximum number of retry attempts for an IndexedDb transaction that fails
 * with a DOMException.
 */
const TRANSACTION_RETRY_COUNT = 3;
/**
 * Wraps an IDBTransaction and exposes a store() method to get a handle to a
 * specific object store.
 */
class SimpleDbTransaction {
    constructor(action, transaction) {
        this.action = action;
        this.transaction = transaction;
        this.aborted = false;
        /**
         * A promise that resolves with the result of the IndexedDb transaction.
         */
        this.completionDeferred = new Deferred();
        this.transaction.oncomplete = () => {
            this.completionDeferred.resolve();
        };
        this.transaction.onabort = () => {
            if (transaction.error) {
                this.completionDeferred.reject(new IndexedDbTransactionError(action, transaction.error));
            }
            else {
                this.completionDeferred.resolve();
            }
        };
        this.transaction.onerror = (event) => {
            const error = checkForAndReportiOSError(event.target.error);
            this.completionDeferred.reject(new IndexedDbTransactionError(action, error));
        };
    }
    static open(db, action, mode, objectStoreNames) {
        try {
            return new SimpleDbTransaction(action, db.transaction(objectStoreNames, mode));
        }
        catch (e) {
            throw new IndexedDbTransactionError(action, e);
        }
    }
    get completionPromise() {
        return this.completionDeferred.promise;
    }
    abort(error) {
        if (error) {
            this.completionDeferred.reject(error);
        }
        if (!this.aborted) {
            logDebug(LOG_TAG$g, 'Aborting transaction:', error ? error.message : 'Client-initiated abort');
            this.aborted = true;
            this.transaction.abort();
        }
    }
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */
    store(storeName) {
        const store = this.transaction.objectStore(storeName);
        return new SimpleDbStore(store);
    }
}
/**
 * Provides a wrapper around IndexedDb with a simplified interface that uses
 * Promise-like return values to chain operations. Real promises cannot be used
 * since .then() continuations are executed asynchronously (e.g. via
 * .setImmediate), which would cause IndexedDB to end the transaction.
 * See PersistencePromise for more details.
 */
class SimpleDb {
    /*
     * Creates a new SimpleDb wrapper for IndexedDb database `name`.
     *
     * Note that `version` must not be a downgrade. IndexedDB does not support
     * downgrading the schema version. We currently do not support any way to do
     * versioning outside of IndexedDB's versioning mechanism, as only
     * version-upgrade transactions are allowed to do things like create
     * objectstores.
     */
    constructor(name, version, schemaConverter) {
        this.name = name;
        this.version = version;
        this.schemaConverter = schemaConverter;
        const iOSVersion = SimpleDb.getIOSVersion(getUA());
        // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
        // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
        // whatever reason it's much harder to hit after 12.2 so we only proactively
        // log on 12.2.
        if (iOSVersion === 12.2) {
            logError('Firestore persistence suffers from a bug in iOS 12.2 ' +
                'Safari that may cause your app to stop working. See ' +
                'https://stackoverflow.com/q/56496296/110915 for details ' +
                'and a potential workaround.');
        }
    }
    /** Deletes the specified database. */
    static delete(name) {
        logDebug(LOG_TAG$g, 'Removing database:', name);
        return wrapRequest(window.indexedDB.deleteDatabase(name)).toPromise();
    }
    /** Returns true if IndexedDB is available in the current environment. */
    static isAvailable() {
        if (typeof indexedDB === 'undefined') {
            return false;
        }
        if (SimpleDb.isMockPersistence()) {
            return true;
        }
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
        const ua = getUA();
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
        const iOSVersion = SimpleDb.getIOSVersion(ua);
        const isUnsupportedIOS = 0 < iOSVersion && iOSVersion < 10;
        // Android browser: Disable for userse running version < 4.5.
        const androidVersion = SimpleDb.getAndroidVersion(ua);
        const isUnsupportedAndroid = 0 < androidVersion && androidVersion < 4.5;
        if (ua.indexOf('MSIE ') > 0 ||
            ua.indexOf('Trident/') > 0 ||
            ua.indexOf('Edge/') > 0 ||
            isUnsupportedIOS ||
            isUnsupportedAndroid) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    static isMockPersistence() {
        var _a;
        return (typeof process !== 'undefined' &&
            ((_a = process.env) === null || _a === void 0 ? void 0 : _a.USE_MOCK_PERSISTENCE) === 'YES');
    }
    /** Helper to get a typed SimpleDbStore from a transaction. */
    static getStore(txn, store) {
        return txn.store(store);
    }
    // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    static getIOSVersion(ua) {
        const iOSVersionRegex = ua.match(/i(?:phone|pad|pod) os ([\d_]+)/i);
        const version = iOSVersionRegex
            ? iOSVersionRegex[1].split('_').slice(0, 2).join('.')
            : '-1';
        return Number(version);
    }
    // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    static getAndroidVersion(ua) {
        const androidVersionRegex = ua.match(/Android ([\d.]+)/i);
        const version = androidVersionRegex
            ? androidVersionRegex[1].split('.').slice(0, 2).join('.')
            : '-1';
        return Number(version);
    }
    /**
     * Opens the specified database, creating or upgrading it if necessary.
     */
    async ensureDb(action) {
        if (!this.db) {
            logDebug(LOG_TAG$g, 'Opening database:', this.name);
            this.db = await new Promise((resolve, reject) => {
                // TODO(mikelehen): Investigate browser compatibility.
                // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
                // suggests IE9 and older WebKit browsers handle upgrade
                // differently. They expect setVersion, as described here:
                // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
                const request = indexedDB.open(this.name, this.version);
                request.onsuccess = (event) => {
                    const db = event.target.result;
                    resolve(db);
                };
                request.onblocked = () => {
                    reject(new IndexedDbTransactionError(action, 'Cannot upgrade IndexedDB schema while another tab is open. ' +
                        'Close all tabs that access Firestore and reload this page to proceed.'));
                };
                request.onerror = (event) => {
                    const error = event.target.error;
                    if (error.name === 'VersionError') {
                        reject(new FirestoreError(Code.FAILED_PRECONDITION, 'A newer version of the Firestore SDK was previously used and so the persisted ' +
                            'data is not compatible with the version of the SDK you are now using. The SDK ' +
                            'will operate with persistence disabled. If you need persistence, please ' +
                            're-upgrade to a newer version of the SDK or else clear the persisted IndexedDB ' +
                            'data for your app to start fresh.'));
                    }
                    else {
                        reject(new IndexedDbTransactionError(action, error));
                    }
                };
                request.onupgradeneeded = (event) => {
                    logDebug(LOG_TAG$g, 'Database "' + this.name + '" requires upgrade from version:', event.oldVersion);
                    const db = event.target.result;
                    this.schemaConverter
                        .createOrUpgrade(db, request.transaction, event.oldVersion, this.version)
                        .next(() => {
                        logDebug(LOG_TAG$g, 'Database upgrade to version ' + this.version + ' complete');
                    });
                };
            });
        }
        if (this.versionchangelistener) {
            this.db.onversionchange = event => this.versionchangelistener(event);
        }
        return this.db;
    }
    setVersionChangeListener(versionChangeListener) {
        this.versionchangelistener = versionChangeListener;
        if (this.db) {
            this.db.onversionchange = (event) => {
                return versionChangeListener(event);
            };
        }
    }
    async runTransaction(action, mode, objectStores, transactionFn) {
        const readonly = mode === 'readonly';
        let attemptNumber = 0;
        while (true) {
            ++attemptNumber;
            try {
                this.db = await this.ensureDb(action);
                const transaction = SimpleDbTransaction.open(this.db, action, readonly ? 'readonly' : 'readwrite', objectStores);
                const transactionFnResult = transactionFn(transaction)
                    .catch(error => {
                    // Abort the transaction if there was an error.
                    transaction.abort(error);
                    // We cannot actually recover, and calling `abort()` will cause the transaction's
                    // completion promise to be rejected. This in turn means that we won't use
                    // `transactionFnResult` below. We return a rejection here so that we don't add the
                    // possibility of returning `void` to the type of `transactionFnResult`.
                    return PersistencePromise.reject(error);
                })
                    .toPromise();
                // As noted above, errors are propagated by aborting the transaction. So
                // we swallow any error here to avoid the browser logging it as unhandled.
                transactionFnResult.catch(() => { });
                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                // fire), but still return the original transactionFnResult back to the
                // caller.
                await transaction.completionPromise;
                return transactionFnResult;
            }
            catch (error) {
                // TODO(schmidt-sebastian): We could probably be smarter about this and
                // not retry exceptions that are likely unrecoverable (such as quota
                // exceeded errors).
                // Note: We cannot use an instanceof check for FirestoreException, since the
                // exception is wrapped in a generic error by our async/await handling.
                const retryable = error.name !== 'FirebaseError' &&
                    attemptNumber < TRANSACTION_RETRY_COUNT;
                logDebug(LOG_TAG$g, 'Transaction failed with error:', error.message, 'Retrying:', retryable);
                this.close();
                if (!retryable) {
                    return Promise.reject(error);
                }
            }
        }
    }
    close() {
        if (this.db) {
            this.db.close();
        }
        this.db = undefined;
    }
}
/**
 * A controller for iterating over a key range or index. It allows an iterate
 * callback to delete the currently-referenced object, or jump to a new key
 * within the key range or index.
 */
class IterationController {
    constructor(dbCursor) {
        this.dbCursor = dbCursor;
        this.shouldStop = false;
        this.nextKey = null;
    }
    get isDone() {
        return this.shouldStop;
    }
    get skipToKey() {
        return this.nextKey;
    }
    set cursor(value) {
        this.dbCursor = value;
    }
    /**
     * This function can be called to stop iteration at any point.
     */
    done() {
        this.shouldStop = true;
    }
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */
    skip(key) {
        this.nextKey = key;
    }
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */
    delete() {
        return wrapRequest(this.dbCursor.delete());
    }
}
/** An error that wraps exceptions that thrown during IndexedDB execution. */
class IndexedDbTransactionError extends FirestoreError {
    constructor(actionName, cause) {
        super(Code.UNAVAILABLE, `IndexedDB transaction '${actionName}' failed: ${cause}`);
        this.name = 'IndexedDbTransactionError';
    }
}
/** Verifies whether `e` is an IndexedDbTransactionError. */
function isIndexedDbTransactionError(e) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return e.name === 'IndexedDbTransactionError';
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
 */
class SimpleDbStore {
    constructor(store) {
        this.store = store;
    }
    put(keyOrValue, value) {
        let request;
        if (value !== undefined) {
            logDebug(LOG_TAG$g, 'PUT', this.store.name, keyOrValue, value);
            request = this.store.put(value, keyOrValue);
        }
        else {
            logDebug(LOG_TAG$g, 'PUT', this.store.name, '<auto-key>', keyOrValue);
            request = this.store.put(keyOrValue);
        }
        return wrapRequest(request);
    }
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */
    add(value) {
        logDebug(LOG_TAG$g, 'ADD', this.store.name, value, value);
        const request = this.store.add(value);
        return wrapRequest(request);
    }
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @returns The object with the specified key or null if no object exists.
     */
    get(key) {
        const request = this.store.get(key);
        // We're doing an unsafe cast to ValueType.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return wrapRequest(request).next(result => {
            // Normalize nonexistence to null.
            if (result === undefined) {
                result = null;
            }
            logDebug(LOG_TAG$g, 'GET', this.store.name, key, result);
            return result;
        });
    }
    delete(key) {
        logDebug(LOG_TAG$g, 'DELETE', this.store.name, key);
        const request = this.store.delete(key);
        return wrapRequest(request);
    }
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    count() {
        logDebug(LOG_TAG$g, 'COUNT', this.store.name);
        const request = this.store.count();
        return wrapRequest(request);
    }
    loadAll(indexOrRange, range) {
        const cursor = this.cursor(this.options(indexOrRange, range));
        const results = [];
        return this.iterateCursor(cursor, (key, value) => {
            results.push(value);
        }).next(() => {
            return results;
        });
    }
    deleteAll(indexOrRange, range) {
        logDebug(LOG_TAG$g, 'DELETE ALL', this.store.name);
        const options = this.options(indexOrRange, range);
        options.keysOnly = false;
        const cursor = this.cursor(options);
        return this.iterateCursor(cursor, (key, value, control) => {
            // NOTE: Calling delete() on a cursor is documented as more efficient than
            // calling delete() on an object store with a single key
            // (https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete),
            // however, this requires us *not* to use a keysOnly cursor
            // (https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor/delete). We
            // may want to compare the performance of each method.
            return control.delete();
        });
    }
    iterate(optionsOrCallback, callback) {
        let options;
        if (!callback) {
            options = {};
            callback = optionsOrCallback;
        }
        else {
            options = optionsOrCallback;
        }
        const cursor = this.cursor(options);
        return this.iterateCursor(cursor, callback);
    }
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */
    iterateSerial(callback) {
        const cursorRequest = this.cursor({});
        return new PersistencePromise((resolve, reject) => {
            cursorRequest.onerror = (event) => {
                const error = checkForAndReportiOSError(event.target.error);
                reject(error);
            };
            cursorRequest.onsuccess = (event) => {
                const cursor = event.target.result;
                if (!cursor) {
                    resolve();
                    return;
                }
                callback(cursor.primaryKey, cursor.value).next(shouldContinue => {
                    if (shouldContinue) {
                        cursor.continue();
                    }
                    else {
                        resolve();
                    }
                });
            };
        });
    }
    iterateCursor(cursorRequest, fn) {
        const results = [];
        return new PersistencePromise((resolve, reject) => {
            cursorRequest.onerror = (event) => {
                reject(event.target.error);
            };
            cursorRequest.onsuccess = (event) => {
                const cursor = event.target.result;
                if (!cursor) {
                    resolve();
                    return;
                }
                const controller = new IterationController(cursor);
                const userResult = fn(cursor.primaryKey, cursor.value, controller);
                if (userResult instanceof PersistencePromise) {
                    const userPromise = userResult.catch(err => {
                        controller.done();
                        return PersistencePromise.reject(err);
                    });
                    results.push(userPromise);
                }
                if (controller.isDone) {
                    resolve();
                }
                else if (controller.skipToKey === null) {
                    cursor.continue();
                }
                else {
                    cursor.continue(controller.skipToKey);
                }
            };
        }).next(() => {
            return PersistencePromise.waitFor(results);
        });
    }
    options(indexOrRange, range) {
        let indexName = undefined;
        if (indexOrRange !== undefined) {
            if (typeof indexOrRange === 'string') {
                indexName = indexOrRange;
            }
            else {
                range = indexOrRange;
            }
        }
        return { index: indexName, range };
    }
    cursor(options) {
        let direction = 'next';
        if (options.reverse) {
            direction = 'prev';
        }
        if (options.index) {
            const index = this.store.index(options.index);
            if (options.keysOnly) {
                return index.openKeyCursor(options.range, direction);
            }
            else {
                return index.openCursor(options.range, direction);
            }
        }
        else {
            return this.store.openCursor(options.range, direction);
        }
    }
}
/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */
function wrapRequest(request) {
    return new PersistencePromise((resolve, reject) => {
        request.onsuccess = (event) => {
            const result = event.target.result;
            resolve(result);
        };
        request.onerror = (event) => {
            const error = checkForAndReportiOSError(event.target.error);
            reject(error);
        };
    });
}
// Guard so we only report the error once.
let reportedIOSError = false;
function checkForAndReportiOSError(error) {
    const iOSVersion = SimpleDb.getIOSVersion(getUA());
    if (iOSVersion >= 12.2 && iOSVersion < 13) {
        const IOS_ERROR = 'An internal error was encountered in the Indexed Database server';
        if (error.message.indexOf(IOS_ERROR) >= 0) {
            // Wrap error in a more descriptive one.
            const newError = new FirestoreError('internal', `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${IOS_ERROR}'. This is likely ` +
                `due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 ` +
                `for details and a potential workaround.`);
            if (!reportedIOSError) {
                reportedIOSError = true;
                // Throw a global exception outside of this promise chain, for the user to
                // potentially catch.
                setTimeout(() => {
                    throw newError;
                }, 0);
            }
            return newError;
        }
    }
    return error;
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
class IndexedDbTransaction extends PersistenceTransaction {
    constructor(simpleDbTransaction, currentSequenceNumber) {
        super();
        this.simpleDbTransaction = simpleDbTransaction;
        this.currentSequenceNumber = currentSequenceNumber;
    }
}
function getStore(txn, store) {
    const indexedDbTransaction = debugCast(txn);
    return SimpleDb.getStore(indexedDbTransaction.simpleDbTransaction, store);
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
    return randomBytes$1(nBytes);
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
class AutoId {
    static newId() {
        // Alphanumeric characters
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // The largest byte value that is a multiple of `char.length`.
        const maxMultiple = Math.floor(256 / chars.length) * chars.length;
        let autoId = '';
        const targetLength = 20;
        while (autoId.length < targetLength) {
            const bytes = randomBytes(40);
            for (let i = 0; i < bytes.length; ++i) {
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                if (autoId.length < targetLength && bytes[i] < maxMultiple) {
                    autoId += chars.charAt(bytes[i] % chars.length);
                }
            }
        }
        return autoId;
    }
}
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
    return left.every((value, index) => comparator(value, right[index]));
}
/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */
function immediateSuccessor(s) {
    // Return the input string, with an additional NUL byte appended.
    return s + '\0';
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
const MIN_SECONDS = -62135596800;
// Number of nanoseconds in a millisecond.
const MS_TO_NANOS = 1e6;
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
class Timestamp {
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
    constructor(
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
    static now() {
        return Timestamp.fromMillis(Date.now());
    }
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */
    static fromDate(date) {
        return Timestamp.fromMillis(date.getTime());
    }
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */
    static fromMillis(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const nanos = Math.floor((milliseconds - seconds * 1000) * MS_TO_NANOS);
        return new Timestamp(seconds, nanos);
    }
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */
    toDate() {
        return new Date(this.toMillis());
    }
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */
    toMillis() {
        return this.seconds * 1000 + this.nanoseconds / MS_TO_NANOS;
    }
    _compareTo(other) {
        if (this.seconds === other.seconds) {
            return primitiveComparator(this.nanoseconds, other.nanoseconds);
        }
        return primitiveComparator(this.seconds, other.seconds);
    }
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */
    isEqual(other) {
        return (other.seconds === this.seconds && other.nanoseconds === this.nanoseconds);
    }
    /** Returns a textual representation of this Timestamp. */
    toString() {
        return ('Timestamp(seconds=' +
            this.seconds +
            ', nanoseconds=' +
            this.nanoseconds +
            ')');
    }
    /** Returns a JSON-serializable representation of this Timestamp. */
    toJSON() {
        return { seconds: this.seconds, nanoseconds: this.nanoseconds };
    }
    /**
     * Converts this object to a primitive string, which allows Timestamp objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */
    valueOf() {
        // This method returns a string of the form <seconds>.<nanoseconds> where
        // <seconds> is translated to have a non-negative value and both <seconds>
        // and <nanoseconds> are left-padded with zeroes to be a consistent length.
        // Strings with this format then have a lexiographical ordering that matches
        // the expected ordering. The <seconds> translation is done to avoid having
        // a leading negative sign (i.e. a leading '-' character) in its string
        // representation, which would affect its lexiographical ordering.
        const adjustedSeconds = this.seconds - MIN_SECONDS;
        // Note: Up to 12 decimal digits are required to represent all valid
        // 'seconds' values.
        const formattedSeconds = String(adjustedSeconds).padStart(12, '0');
        const formattedNanoseconds = String(this.nanoseconds).padStart(9, '0');
        return formattedSeconds + '.' + formattedNanoseconds;
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
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */
class SnapshotVersion {
    constructor(timestamp) {
        this.timestamp = timestamp;
    }
    static fromTimestamp(value) {
        return new SnapshotVersion(value);
    }
    static min() {
        return new SnapshotVersion(new Timestamp(0, 0));
    }
    compareTo(other) {
        return this.timestamp._compareTo(other.timestamp);
    }
    isEqual(other) {
        return this.timestamp.isEqual(other.timestamp);
    }
    /** Returns a number representation of the version for use in spec tests. */
    toMicroseconds() {
        // Convert to microseconds.
        return this.timestamp.seconds * 1e6 + this.timestamp.nanoseconds / 1000;
    }
    toString() {
        return 'SnapshotVersion(' + this.timestamp.toString() + ')';
    }
    toTimestamp() {
        return this.timestamp;
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
function objectSize(obj) {
    let count = 0;
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            count++;
        }
    }
    return count;
}
function forEach(obj, fn) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn(key, obj[key]);
        }
    }
}
function isEmpty(obj) {
    for (const key in obj) {
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
class FieldMask {
    constructor(fields) {
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
    covers(fieldPath) {
        for (const fieldMaskPath of this.fields) {
            if (fieldMaskPath.isPrefixOf(fieldPath)) {
                return true;
            }
        }
        return false;
    }
    isEqual(other) {
        return arrayEquals(this.fields, other.fields, (l, r) => l.isEqual(r));
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
class ByteString {
    constructor(binaryString) {
        this.binaryString = binaryString;
    }
    static fromBase64String(base64) {
        const binaryString = decodeBase64(base64);
        return new ByteString(binaryString);
    }
    static fromUint8Array(array) {
        const binaryString = binaryStringFromUint8Array(array);
        return new ByteString(binaryString);
    }
    toBase64() {
        return encodeBase64(this.binaryString);
    }
    toUint8Array() {
        return uint8ArrayFromBinaryString(this.binaryString);
    }
    approximateByteSize() {
        return this.binaryString.length * 2;
    }
    compareTo(other) {
        return primitiveComparator(this.binaryString, other.binaryString);
    }
    isEqual(other) {
        return this.binaryString === other.binaryString;
    }
}
ByteString.EMPTY_BYTE_STRING = new ByteString('');
/**
 * Helper function to convert an Uint8array to a binary string.
 */
function binaryStringFromUint8Array(array) {
    let binaryString = '';
    for (let i = 0; i < array.length; ++i) {
        binaryString += String.fromCharCode(array[i]);
    }
    return binaryString;
}
/**
 * Helper function to convert a binary string to an Uint8Array.
 */
function uint8ArrayFromBinaryString(binaryString) {
    const buffer = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
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
const ISO_TIMESTAMP_REG_EXP = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
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
        let nanos = 0;
        const fraction = ISO_TIMESTAMP_REG_EXP.exec(date);
        hardAssert(!!fraction);
        if (fraction[1]) {
            // Pad the fraction out to 9 digits (nanos).
            let nanoStr = fraction[1];
            nanoStr = (nanoStr + '000000000').substr(0, 9);
            nanos = Number(nanoStr);
        }
        // Parse the date to get the seconds.
        const parsedDate = new Date(date);
        const seconds = Math.floor(parsedDate.getTime() / 1000);
        return { seconds, nanos };
    }
    else {
        // TODO(b/37282237): Use strings for Proto3 timestamps
        // assert(!this.options.useProto3Json,
        //   'The timestamp instance format requires Proto JS.');
        const seconds = normalizeNumber(date.seconds);
        const nanos = normalizeNumber(date.nanos);
        return { seconds, nanos };
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
const SERVER_TIMESTAMP_SENTINEL = 'server_timestamp';
const TYPE_KEY = '__type__';
const PREVIOUS_VALUE_KEY = '__previous_value__';
const LOCAL_WRITE_TIME_KEY = '__local_write_time__';
function isServerTimestamp(value) {
    var _a, _b;
    const type = (_b = (((_a = value === null || value === void 0 ? void 0 : value.mapValue) === null || _a === void 0 ? void 0 : _a.fields) || {})[TYPE_KEY]) === null || _b === void 0 ? void 0 : _b.stringValue;
    return type === SERVER_TIMESTAMP_SENTINEL;
}
/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
function serverTimestamp$1(localWriteTime, previousValue) {
    const mapValue = {
        fields: {
            [TYPE_KEY]: {
                stringValue: SERVER_TIMESTAMP_SENTINEL
            },
            [LOCAL_WRITE_TIME_KEY]: {
                timestampValue: {
                    seconds: localWriteTime.seconds,
                    nanos: localWriteTime.nanoseconds
                }
            }
        }
    };
    if (previousValue) {
        mapValue.fields[PREVIOUS_VALUE_KEY] = previousValue;
    }
    return { mapValue };
}
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */
function getPreviousValue(value) {
    const previousValue = value.mapValue.fields[PREVIOUS_VALUE_KEY];
    if (isServerTimestamp(previousValue)) {
        return getPreviousValue(previousValue);
    }
    return previousValue;
}
/**
 * Returns the local time at which this timestamp was first set.
 */
function getLocalWriteTime(value) {
    const localWriteTime = normalizeTimestamp(value.mapValue.fields[LOCAL_WRITE_TIME_KEY].timestampValue);
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
/** Sentinel value that sorts before any Mutation Batch ID. */
const BATCHID_UNKNOWN = -1;
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
    const leftType = typeOrder(left);
    const rightType = typeOrder(right);
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
    const leftTimestamp = normalizeTimestamp(left.timestampValue);
    const rightTimestamp = normalizeTimestamp(right.timestampValue);
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
        const n1 = normalizeNumber(left.doubleValue);
        const n2 = normalizeNumber(right.doubleValue);
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
    const leftMap = left.mapValue.fields || {};
    const rightMap = right.mapValue.fields || {};
    if (objectSize(leftMap) !== objectSize(rightMap)) {
        return false;
    }
    for (const key in leftMap) {
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
    return ((haystack.values || []).find(v => valueEquals(v, needle)) !== undefined);
}
function valueCompare(left, right) {
    const leftType = typeOrder(left);
    const rightType = typeOrder(right);
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
    const leftNumber = normalizeNumber(left.integerValue || left.doubleValue);
    const rightNumber = normalizeNumber(right.integerValue || right.doubleValue);
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
    const leftTimestamp = normalizeTimestamp(left);
    const rightTimestamp = normalizeTimestamp(right);
    const comparison = primitiveComparator(leftTimestamp.seconds, rightTimestamp.seconds);
    if (comparison !== 0) {
        return comparison;
    }
    return primitiveComparator(leftTimestamp.nanos, rightTimestamp.nanos);
}
function compareReferences(leftPath, rightPath) {
    const leftSegments = leftPath.split('/');
    const rightSegments = rightPath.split('/');
    for (let i = 0; i < leftSegments.length && i < rightSegments.length; i++) {
        const comparison = primitiveComparator(leftSegments[i], rightSegments[i]);
        if (comparison !== 0) {
            return comparison;
        }
    }
    return primitiveComparator(leftSegments.length, rightSegments.length);
}
function compareGeoPoints(left, right) {
    const comparison = primitiveComparator(normalizeNumber(left.latitude), normalizeNumber(right.latitude));
    if (comparison !== 0) {
        return comparison;
    }
    return primitiveComparator(normalizeNumber(left.longitude), normalizeNumber(right.longitude));
}
function compareBlobs(left, right) {
    const leftBytes = normalizeByteString(left);
    const rightBytes = normalizeByteString(right);
    return leftBytes.compareTo(rightBytes);
}
function compareArrays(left, right) {
    const leftArray = left.values || [];
    const rightArray = right.values || [];
    for (let i = 0; i < leftArray.length && i < rightArray.length; ++i) {
        const compare = valueCompare(leftArray[i], rightArray[i]);
        if (compare) {
            return compare;
        }
    }
    return primitiveComparator(leftArray.length, rightArray.length);
}
function compareMaps(left, right) {
    const leftMap = left.fields || {};
    const leftKeys = Object.keys(leftMap);
    const rightMap = right.fields || {};
    const rightKeys = Object.keys(rightMap);
    // Even though MapValues are likely sorted correctly based on their insertion
    // order (e.g. when received from the backend), local modifications can bring
    // elements out of order. We need to re-sort the elements to ensure that
    // canonical IDs are independent of insertion order.
    leftKeys.sort();
    rightKeys.sort();
    for (let i = 0; i < leftKeys.length && i < rightKeys.length; ++i) {
        const keyCompare = primitiveComparator(leftKeys[i], rightKeys[i]);
        if (keyCompare !== 0) {
            return keyCompare;
        }
        const compare = valueCompare(leftMap[leftKeys[i]], rightMap[rightKeys[i]]);
        if (compare !== 0) {
            return compare;
        }
    }
    return primitiveComparator(leftKeys.length, rightKeys.length);
}
/**
 * Generates the canonical ID for the provided field value (as used in Target
 * serialization).
 */
function canonicalId(value) {
    return canonifyValue(value);
}
function canonifyValue(value) {
    if ('nullValue' in value) {
        return 'null';
    }
    else if ('booleanValue' in value) {
        return '' + value.booleanValue;
    }
    else if ('integerValue' in value) {
        return '' + value.integerValue;
    }
    else if ('doubleValue' in value) {
        return '' + value.doubleValue;
    }
    else if ('timestampValue' in value) {
        return canonifyTimestamp(value.timestampValue);
    }
    else if ('stringValue' in value) {
        return value.stringValue;
    }
    else if ('bytesValue' in value) {
        return canonifyByteString(value.bytesValue);
    }
    else if ('referenceValue' in value) {
        return canonifyReference(value.referenceValue);
    }
    else if ('geoPointValue' in value) {
        return canonifyGeoPoint(value.geoPointValue);
    }
    else if ('arrayValue' in value) {
        return canonifyArray(value.arrayValue);
    }
    else if ('mapValue' in value) {
        return canonifyMap(value.mapValue);
    }
    else {
        return fail();
    }
}
function canonifyByteString(byteString) {
    return normalizeByteString(byteString).toBase64();
}
function canonifyTimestamp(timestamp) {
    const normalizedTimestamp = normalizeTimestamp(timestamp);
    return `time(${normalizedTimestamp.seconds},${normalizedTimestamp.nanos})`;
}
function canonifyGeoPoint(geoPoint) {
    return `geo(${geoPoint.latitude},${geoPoint.longitude})`;
}
function canonifyReference(referenceValue) {
    return DocumentKey.fromName(referenceValue).toString();
}
function canonifyMap(mapValue) {
    // Iteration order in JavaScript is not guaranteed. To ensure that we generate
    // matching canonical IDs for identical maps, we need to sort the keys.
    const sortedKeys = Object.keys(mapValue.fields || {}).sort();
    let result = '{';
    let first = true;
    for (const key of sortedKeys) {
        if (!first) {
            result += ',';
        }
        else {
            first = false;
        }
        result += `${key}:${canonifyValue(mapValue.fields[key])}`;
    }
    return result + '}';
}
function canonifyArray(arrayValue) {
    let result = '[';
    let first = true;
    for (const value of arrayValue.values || []) {
        if (!first) {
            result += ',';
        }
        else {
            first = false;
        }
        result += canonifyValue(value);
    }
    return result + ']';
}
/** Returns a reference value for the provided database and key. */
function refValue(databaseId, key) {
    return {
        referenceValue: `projects/${databaseId.projectId}/databases/${databaseId.database}/documents/${key.path.canonicalString()}`
    };
}
/** Returns true if `value` is an IntegerValue . */
function isInteger(value) {
    return !!value && 'integerValue' in value;
}
/** Returns true if `value` is a DoubleValue. */
function isDouble(value) {
    return !!value && 'doubleValue' in value;
}
/** Returns true if `value` is either an IntegerValue or a DoubleValue. */
function isNumber(value) {
    return isInteger(value) || isDouble(value);
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
        const target = { mapValue: { fields: {} } };
        forEach(source.mapValue.fields, (key, val) => (target.mapValue.fields[key] = deepClone(val)));
        return target;
    }
    else if (source.arrayValue) {
        const target = { arrayValue: { values: [] } };
        for (let i = 0; i < (source.arrayValue.values || []).length; ++i) {
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
class ObjectValue {
    constructor(value) {
        this.value = value;
    }
    static empty() {
        return new ObjectValue({ mapValue: {} });
    }
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */
    field(path) {
        if (path.isEmpty()) {
            return this.value;
        }
        else {
            let currentLevel = this.value;
            for (let i = 0; i < path.length - 1; ++i) {
                currentLevel = (currentLevel.mapValue.fields || {})[path.get(i)];
                if (!isMapValue(currentLevel)) {
                    return null;
                }
            }
            currentLevel = (currentLevel.mapValue.fields || {})[path.lastSegment()];
            return currentLevel || null;
        }
    }
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */
    set(path, value) {
        const fieldsMap = this.getFieldsMap(path.popLast());
        fieldsMap[path.lastSegment()] = deepClone(value);
    }
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */
    setAll(data) {
        let parent = FieldPath$1.emptyPath();
        let upserts = {};
        let deletes = [];
        data.forEach((value, path) => {
            if (!parent.isImmediateParentOf(path)) {
                // Insert the accumulated changes at this parent location
                const fieldsMap = this.getFieldsMap(parent);
                this.applyChanges(fieldsMap, upserts, deletes);
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
        const fieldsMap = this.getFieldsMap(parent);
        this.applyChanges(fieldsMap, upserts, deletes);
    }
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */
    delete(path) {
        const nestedValue = this.field(path.popLast());
        if (isMapValue(nestedValue) && nestedValue.mapValue.fields) {
            delete nestedValue.mapValue.fields[path.lastSegment()];
        }
    }
    isEqual(other) {
        return valueEquals(this.value, other.value);
    }
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */
    getFieldsMap(path) {
        let current = this.value;
        if (!current.mapValue.fields) {
            current.mapValue = { fields: {} };
        }
        for (let i = 0; i < path.length; ++i) {
            let next = current.mapValue.fields[path.get(i)];
            if (!isMapValue(next) || !next.mapValue.fields) {
                next = { mapValue: { fields: {} } };
                current.mapValue.fields[path.get(i)] = next;
            }
            current = next;
        }
        return current.mapValue.fields;
    }
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */
    applyChanges(fieldsMap, inserts, deletes) {
        forEach(inserts, (key, val) => (fieldsMap[key] = val));
        for (const field of deletes) {
            delete fieldsMap[field];
        }
    }
    clone() {
        return new ObjectValue(deepClone(this.value));
    }
}
/**
 * Returns a FieldMask built from all fields in a MapValue.
 */
function extractFieldMask(value) {
    const fields = [];
    forEach(value.fields, (key, value) => {
        const currentPath = new FieldPath$1([key]);
        if (isMapValue(value)) {
            const nestedMask = extractFieldMask(value.mapValue);
            const nestedFields = nestedMask.fields;
            if (nestedFields.length === 0) {
                // Preserve the empty map by adding it to the FieldMask.
                fields.push(currentPath);
            }
            else {
                // For nested and non-empty ObjectValues, add the FieldPath of the
                // leaf nodes.
                for (const nestedPath of nestedFields) {
                    fields.push(currentPath.child(nestedPath));
                }
            }
        }
        else {
            // For nested and non-empty ObjectValues, add the FieldPath of the leaf
            // nodes.
            fields.push(currentPath);
        }
    });
    return new FieldMask(fields);
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
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */
class MutableDocument {
    constructor(key, documentType, version, data, documentState) {
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
    static newInvalidDocument(documentKey) {
        return new MutableDocument(documentKey, 0 /* INVALID */, SnapshotVersion.min(), ObjectValue.empty(), 0 /* SYNCED */);
    }
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */
    static newFoundDocument(documentKey, version, value) {
        return new MutableDocument(documentKey, 1 /* FOUND_DOCUMENT */, version, value, 0 /* SYNCED */);
    }
    /** Creates a new document that is known to not exist at the given version. */
    static newNoDocument(documentKey, version) {
        return new MutableDocument(documentKey, 2 /* NO_DOCUMENT */, version, ObjectValue.empty(), 0 /* SYNCED */);
    }
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */
    static newUnknownDocument(documentKey, version) {
        return new MutableDocument(documentKey, 3 /* UNKNOWN_DOCUMENT */, version, ObjectValue.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
    }
    /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */
    convertToFoundDocument(version, value) {
        this.version = version;
        this.documentType = 1 /* FOUND_DOCUMENT */;
        this.data = value;
        this.documentState = 0 /* SYNCED */;
        return this;
    }
    /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */
    convertToNoDocument(version) {
        this.version = version;
        this.documentType = 2 /* NO_DOCUMENT */;
        this.data = ObjectValue.empty();
        this.documentState = 0 /* SYNCED */;
        return this;
    }
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */
    convertToUnknownDocument(version) {
        this.version = version;
        this.documentType = 3 /* UNKNOWN_DOCUMENT */;
        this.data = ObjectValue.empty();
        this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */;
        return this;
    }
    setHasCommittedMutations() {
        this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */;
        return this;
    }
    setHasLocalMutations() {
        this.documentState = 1 /* HAS_LOCAL_MUTATIONS */;
        return this;
    }
    get hasLocalMutations() {
        return this.documentState === 1 /* HAS_LOCAL_MUTATIONS */;
    }
    get hasCommittedMutations() {
        return this.documentState === 2 /* HAS_COMMITTED_MUTATIONS */;
    }
    get hasPendingWrites() {
        return this.hasLocalMutations || this.hasCommittedMutations;
    }
    isValidDocument() {
        return this.documentType !== 0 /* INVALID */;
    }
    isFoundDocument() {
        return this.documentType === 1 /* FOUND_DOCUMENT */;
    }
    isNoDocument() {
        return this.documentType === 2 /* NO_DOCUMENT */;
    }
    isUnknownDocument() {
        return this.documentType === 3 /* UNKNOWN_DOCUMENT */;
    }
    isEqual(other) {
        return (other instanceof MutableDocument &&
            this.key.isEqual(other.key) &&
            this.version.isEqual(other.version) &&
            this.documentType === other.documentType &&
            this.documentState === other.documentState &&
            this.data.isEqual(other.data));
    }
    clone() {
        return new MutableDocument(this.key, this.documentType, this.version, this.data.clone(), this.documentState);
    }
    toString() {
        return (`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, ` +
            `{documentType: ${this.documentType}}), ` +
            `{documentState: ${this.documentState}})`);
    }
}
/**
 * Compares the value for field `field` in the provided documents. Throws if
 * the field does not exist in both documents.
 */
function compareDocumentsByField(field, d1, d2) {
    const v1 = d1.data.field(field);
    const v2 = d2.data.field(field);
    if (v1 !== null && v2 !== null) {
        return valueCompare(v1, v2);
    }
    else {
        return fail();
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
// Visible for testing
class TargetImpl {
    constructor(path, collectionGroup = null, orderBy = [], filters = [], limit = null, startAt = null, endAt = null) {
        this.path = path;
        this.collectionGroup = collectionGroup;
        this.orderBy = orderBy;
        this.filters = filters;
        this.limit = limit;
        this.startAt = startAt;
        this.endAt = endAt;
        this.memoizedCanonicalId = null;
    }
}
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */
function newTarget(path, collectionGroup = null, orderBy = [], filters = [], limit = null, startAt = null, endAt = null) {
    return new TargetImpl(path, collectionGroup, orderBy, filters, limit, startAt, endAt);
}
function canonifyTarget(target) {
    const targetImpl = debugCast(target);
    if (targetImpl.memoizedCanonicalId === null) {
        let canonicalId = targetImpl.path.canonicalString();
        if (targetImpl.collectionGroup !== null) {
            canonicalId += '|cg:' + targetImpl.collectionGroup;
        }
        canonicalId += '|f:';
        canonicalId += targetImpl.filters.map(f => canonifyFilter(f)).join(',');
        canonicalId += '|ob:';
        canonicalId += targetImpl.orderBy.map(o => canonifyOrderBy(o)).join(',');
        if (!isNullOrUndefined(targetImpl.limit)) {
            canonicalId += '|l:';
            canonicalId += targetImpl.limit;
        }
        if (targetImpl.startAt) {
            canonicalId += '|lb:';
            canonicalId += canonifyBound(targetImpl.startAt);
        }
        if (targetImpl.endAt) {
            canonicalId += '|ub:';
            canonicalId += canonifyBound(targetImpl.endAt);
        }
        targetImpl.memoizedCanonicalId = canonicalId;
    }
    return targetImpl.memoizedCanonicalId;
}
function stringifyTarget(target) {
    let str = target.path.canonicalString();
    if (target.collectionGroup !== null) {
        str += ' collectionGroup=' + target.collectionGroup;
    }
    if (target.filters.length > 0) {
        str += `, filters: [${target.filters
            .map(f => stringifyFilter(f))
            .join(', ')}]`;
    }
    if (!isNullOrUndefined(target.limit)) {
        str += ', limit: ' + target.limit;
    }
    if (target.orderBy.length > 0) {
        str += `, orderBy: [${target.orderBy
            .map(o => stringifyOrderBy(o))
            .join(', ')}]`;
    }
    if (target.startAt) {
        str += ', startAt: ' + canonifyBound(target.startAt);
    }
    if (target.endAt) {
        str += ', endAt: ' + canonifyBound(target.endAt);
    }
    return `Target(${str})`;
}
function targetEquals(left, right) {
    if (left.limit !== right.limit) {
        return false;
    }
    if (left.orderBy.length !== right.orderBy.length) {
        return false;
    }
    for (let i = 0; i < left.orderBy.length; i++) {
        if (!orderByEquals(left.orderBy[i], right.orderBy[i])) {
            return false;
        }
    }
    if (left.filters.length !== right.filters.length) {
        return false;
    }
    for (let i = 0; i < left.filters.length; i++) {
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
function isDocumentTarget(target) {
    return (DocumentKey.isDocumentKey(target.path) &&
        target.collectionGroup === null &&
        target.filters.length === 0);
}
class Filter {
}
class FieldFilter extends Filter {
    constructor(field, op, value) {
        super();
        this.field = field;
        this.op = op;
        this.value = value;
    }
    /**
     * Creates a filter based on the provided arguments.
     */
    static create(field, op, value) {
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
    }
    static createKeyFieldInFilter(field, op, value) {
        return op === "in" /* IN */
            ? new KeyFieldInFilter(field, value)
            : new KeyFieldNotInFilter(field, value);
    }
    matches(doc) {
        const other = doc.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
        if (this.op === "!=" /* NOT_EQUAL */) {
            return (other !== null &&
                this.matchesComparison(valueCompare(other, this.value)));
        }
        // Only compare types with matching backend order (such as double and int).
        return (other !== null &&
            typeOrder(this.value) === typeOrder(other) &&
            this.matchesComparison(valueCompare(other, this.value)));
    }
    matchesComparison(comparison) {
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
    }
    isInequality() {
        return ([
            "<" /* LESS_THAN */,
            "<=" /* LESS_THAN_OR_EQUAL */,
            ">" /* GREATER_THAN */,
            ">=" /* GREATER_THAN_OR_EQUAL */,
            "!=" /* NOT_EQUAL */,
            "not-in" /* NOT_IN */
        ].indexOf(this.op) >= 0);
    }
}
function canonifyFilter(filter) {
    // TODO(b/29183165): Technically, this won't be unique if two values have
    // the same description, such as the int 3 and the string "3". So we should
    // add the types in here somehow, too.
    return (filter.field.canonicalString() +
        filter.op.toString() +
        canonicalId(filter.value));
}
function filterEquals(f1, f2) {
    return (f1.op === f2.op &&
        f1.field.isEqual(f2.field) &&
        valueEquals(f1.value, f2.value));
}
/** Returns a debug description for `filter`. */
function stringifyFilter(filter) {
    return `${filter.field.canonicalString()} ${filter.op} ${canonicalId(filter.value)}`;
}
/** Filter that matches on key fields (i.e. '__name__'). */
class KeyFieldFilter extends FieldFilter {
    constructor(field, op, value) {
        super(field, op, value);
        this.key = DocumentKey.fromName(value.referenceValue);
    }
    matches(doc) {
        const comparison = DocumentKey.comparator(doc.key, this.key);
        return this.matchesComparison(comparison);
    }
}
/** Filter that matches on key fields within an array. */
class KeyFieldInFilter extends FieldFilter {
    constructor(field, value) {
        super(field, "in" /* IN */, value);
        this.keys = extractDocumentKeysFromArrayValue("in" /* IN */, value);
    }
    matches(doc) {
        return this.keys.some(key => key.isEqual(doc.key));
    }
}
/** Filter that matches on key fields not present within an array. */
class KeyFieldNotInFilter extends FieldFilter {
    constructor(field, value) {
        super(field, "not-in" /* NOT_IN */, value);
        this.keys = extractDocumentKeysFromArrayValue("not-in" /* NOT_IN */, value);
    }
    matches(doc) {
        return !this.keys.some(key => key.isEqual(doc.key));
    }
}
function extractDocumentKeysFromArrayValue(op, value) {
    var _a;
    return (((_a = value.arrayValue) === null || _a === void 0 ? void 0 : _a.values) || []).map(v => {
        return DocumentKey.fromName(v.referenceValue);
    });
}
/** A Filter that implements the array-contains operator. */
class ArrayContainsFilter extends FieldFilter {
    constructor(field, value) {
        super(field, "array-contains" /* ARRAY_CONTAINS */, value);
    }
    matches(doc) {
        const other = doc.data.field(this.field);
        return isArray(other) && arrayValueContains(other.arrayValue, this.value);
    }
}
/** A Filter that implements the IN operator. */
class InFilter extends FieldFilter {
    constructor(field, value) {
        super(field, "in" /* IN */, value);
    }
    matches(doc) {
        const other = doc.data.field(this.field);
        return other !== null && arrayValueContains(this.value.arrayValue, other);
    }
}
/** A Filter that implements the not-in operator. */
class NotInFilter extends FieldFilter {
    constructor(field, value) {
        super(field, "not-in" /* NOT_IN */, value);
    }
    matches(doc) {
        if (arrayValueContains(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) {
            return false;
        }
        const other = doc.data.field(this.field);
        return other !== null && !arrayValueContains(this.value.arrayValue, other);
    }
}
/** A Filter that implements the array-contains-any operator. */
class ArrayContainsAnyFilter extends FieldFilter {
    constructor(field, value) {
        super(field, "array-contains-any" /* ARRAY_CONTAINS_ANY */, value);
    }
    matches(doc) {
        const other = doc.data.field(this.field);
        if (!isArray(other) || !other.arrayValue.values) {
            return false;
        }
        return other.arrayValue.values.some(val => arrayValueContains(this.value.arrayValue, val));
    }
}
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
class Bound {
    constructor(position, before) {
        this.position = position;
        this.before = before;
    }
}
function canonifyBound(bound) {
    // TODO(b/29183165): Make this collision robust.
    return `${bound.before ? 'b' : 'a'}:${bound.position
        .map(p => canonicalId(p))
        .join(',')}`;
}
/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */
class OrderBy {
    constructor(field, dir = "asc" /* ASCENDING */) {
        this.field = field;
        this.dir = dir;
    }
}
function canonifyOrderBy(orderBy) {
    // TODO(b/29183165): Make this collision robust.
    return orderBy.field.canonicalString() + orderBy.dir;
}
function stringifyOrderBy(orderBy) {
    return `${orderBy.field.canonicalString()} (${orderBy.dir})`;
}
function orderByEquals(left, right) {
    return left.dir === right.dir && left.field.isEqual(right.field);
}
/**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */
function sortsBeforeDocument(bound, orderBy, doc) {
    let comparison = 0;
    for (let i = 0; i < bound.position.length; i++) {
        const orderByComponent = orderBy[i];
        const component = bound.position[i];
        if (orderByComponent.field.isKeyField()) {
            comparison = DocumentKey.comparator(DocumentKey.fromName(component.referenceValue), doc.key);
        }
        else {
            const docValue = doc.data.field(orderByComponent.field);
            comparison = valueCompare(component, docValue);
        }
        if (orderByComponent.dir === "desc" /* DESCENDING */) {
            comparison = comparison * -1;
        }
        if (comparison !== 0) {
            break;
        }
    }
    return bound.before ? comparison <= 0 : comparison < 0;
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
    for (let i = 0; i < left.position.length; i++) {
        const leftPosition = left.position[i];
        const rightPosition = right.position[i];
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
class QueryImpl {
    /**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
    constructor(path, collectionGroup = null, explicitOrderBy = [], filters = [], limit = null, limitType = "F" /* First */, startAt = null, endAt = null) {
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
        if (this.startAt) ;
        if (this.endAt) ;
    }
}
/** Creates a new Query instance with the options provided. */
function newQuery(path, collectionGroup, explicitOrderBy, filters, limit, limitType, startAt, endAt) {
    return new QueryImpl(path, collectionGroup, explicitOrderBy, filters, limit, limitType, startAt, endAt);
}
/** Creates a new Query for a query that matches all documents at `path` */
function newQueryForPath(path) {
    return new QueryImpl(path);
}
/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */
function asCollectionQueryAtPath(query, path) {
    return new QueryImpl(path, 
    /*collectionGroup=*/ null, query.explicitOrderBy.slice(), query.filters.slice(), query.limit, query.limitType, query.startAt, query.endAt);
}
/**
 * Returns true if this query does not specify any query constraints that
 * could remove results.
 */
function matchesAllDocuments(query) {
    return (query.filters.length === 0 &&
        query.limit === null &&
        query.startAt == null &&
        query.endAt == null &&
        (query.explicitOrderBy.length === 0 ||
            (query.explicitOrderBy.length === 1 &&
                query.explicitOrderBy[0].field.isKeyField())));
}
function hasLimitToFirst(query) {
    return !isNullOrUndefined(query.limit) && query.limitType === "F" /* First */;
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
    for (const filter of query.filters) {
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
    for (const filter of query.filters) {
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
 * Returns whether the query matches a single document by path (rather than a
 * collection).
 */
function isDocumentQuery$1(query) {
    return (DocumentKey.isDocumentKey(query.path) &&
        query.collectionGroup === null &&
        query.filters.length === 0);
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
    const queryImpl = debugCast(query);
    if (queryImpl.memoizedOrderBy === null) {
        queryImpl.memoizedOrderBy = [];
        const inequalityField = getInequalityFilterField(queryImpl);
        const firstOrderByField = getFirstOrderByField(queryImpl);
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
            let foundKeyOrdering = false;
            for (const orderBy of queryImpl.explicitOrderBy) {
                queryImpl.memoizedOrderBy.push(orderBy);
                if (orderBy.field.isKeyField()) {
                    foundKeyOrdering = true;
                }
            }
            if (!foundKeyOrdering) {
                // The order of the implicit key ordering always matches the last
                // explicit order by
                const lastDirection = queryImpl.explicitOrderBy.length > 0
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
    const queryImpl = debugCast(query);
    if (!queryImpl.memoizedTarget) {
        if (queryImpl.limitType === "F" /* First */) {
            queryImpl.memoizedTarget = newTarget(queryImpl.path, queryImpl.collectionGroup, queryOrderBy(queryImpl), queryImpl.filters, queryImpl.limit, queryImpl.startAt, queryImpl.endAt);
        }
        else {
            // Flip the orderBy directions since we want the last results
            const orderBys = [];
            for (const orderBy of queryOrderBy(queryImpl)) {
                const dir = orderBy.dir === "desc" /* DESCENDING */
                    ? "asc" /* ASCENDING */
                    : "desc" /* DESCENDING */;
                orderBys.push(new OrderBy(orderBy.field, dir));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
            const startAt = queryImpl.endAt
                ? new Bound(queryImpl.endAt.position, !queryImpl.endAt.before)
                : null;
            const endAt = queryImpl.startAt
                ? new Bound(queryImpl.startAt.position, !queryImpl.startAt.before)
                : null;
            // Now return as a LimitType.First query.
            queryImpl.memoizedTarget = newTarget(queryImpl.path, queryImpl.collectionGroup, orderBys, queryImpl.filters, queryImpl.limit, startAt, endAt);
        }
    }
    return queryImpl.memoizedTarget;
}
function queryWithAddedFilter(query, filter) {
    const newFilters = query.filters.concat([filter]);
    return new QueryImpl(query.path, query.collectionGroup, query.explicitOrderBy.slice(), newFilters, query.limit, query.limitType, query.startAt, query.endAt);
}
function queryWithAddedOrderBy(query, orderBy) {
    // TODO(dimond): validate that orderBy does not list the same key twice.
    const newOrderBy = query.explicitOrderBy.concat([orderBy]);
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
// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function canonifyQuery(query) {
    return `${canonifyTarget(queryToTarget(query))}|lt:${query.limitType}`;
}
function stringifyQuery(query) {
    return `Query(target=${stringifyTarget(queryToTarget(query))}; limitType=${query.limitType})`;
}
/** Returns whether `doc` matches the constraints of `query`. */
function queryMatches(query, doc) {
    return (doc.isFoundDocument() &&
        queryMatchesPathAndCollectionGroup(query, doc) &&
        queryMatchesOrderBy(query, doc) &&
        queryMatchesFilters(query, doc) &&
        queryMatchesBounds(query, doc));
}
function queryMatchesPathAndCollectionGroup(query, doc) {
    const docPath = doc.key.path;
    if (query.collectionGroup !== null) {
        // NOTE: this.path is currently always empty since we don't expose Collection
        // Group queries rooted at a document path yet.
        return (doc.key.hasCollectionId(query.collectionGroup) &&
            query.path.isPrefixOf(docPath));
    }
    else if (DocumentKey.isDocumentKey(query.path)) {
        // exact match for document queries
        return query.path.isEqual(docPath);
    }
    else {
        // shallow ancestor queries by default
        return query.path.isImmediateParentOf(docPath);
    }
}
/**
 * A document must have a value for every ordering clause in order to show up
 * in the results.
 */
function queryMatchesOrderBy(query, doc) {
    for (const orderBy of query.explicitOrderBy) {
        // order by key always matches
        if (!orderBy.field.isKeyField() && doc.data.field(orderBy.field) === null) {
            return false;
        }
    }
    return true;
}
function queryMatchesFilters(query, doc) {
    for (const filter of query.filters) {
        if (!filter.matches(doc)) {
            return false;
        }
    }
    return true;
}
/** Makes sure a document is within the bounds, if provided. */
function queryMatchesBounds(query, doc) {
    if (query.startAt &&
        !sortsBeforeDocument(query.startAt, queryOrderBy(query), doc)) {
        return false;
    }
    if (query.endAt &&
        sortsBeforeDocument(query.endAt, queryOrderBy(query), doc)) {
        return false;
    }
    return true;
}
/**
 * Returns a new comparator function that can be used to compare two documents
 * based on the Query's ordering constraint.
 */
function newQueryComparator(query) {
    return (d1, d2) => {
        let comparedOnKeyField = false;
        for (const orderBy of queryOrderBy(query)) {
            const comp = compareDocs(orderBy, d1, d2);
            if (comp !== 0) {
                return comp;
            }
            comparedOnKeyField = comparedOnKeyField || orderBy.field.isKeyField();
        }
        return 0;
    };
}
function compareDocs(orderBy, d1, d2) {
    const comparison = orderBy.field.isKeyField()
        ? DocumentKey.comparator(d1.key, d2.key)
        : compareDocumentsByField(orderBy.field, d1, d2);
    switch (orderBy.dir) {
        case "asc" /* ASCENDING */:
            return comparison;
        case "desc" /* DESCENDING */:
            return -1 * comparison;
        default:
            return fail();
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
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
class SortedMap {
    constructor(comparator, root) {
        this.comparator = comparator;
        this.root = root ? root : LLRBNode.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
    insert(key, value) {
        return new SortedMap(this.comparator, this.root
            .insert(key, value, this.comparator)
            .copy(null, null, LLRBNode.BLACK, null, null));
    }
    // Returns a copy of the map, with the specified key removed.
    remove(key) {
        return new SortedMap(this.comparator, this.root
            .remove(key, this.comparator)
            .copy(null, null, LLRBNode.BLACK, null, null));
    }
    // Returns the value of the node with the given key, or null.
    get(key) {
        let node = this.root;
        while (!node.isEmpty()) {
            const cmp = this.comparator(key, node.key);
            if (cmp === 0) {
                return node.value;
            }
            else if (cmp < 0) {
                node = node.left;
            }
            else if (cmp > 0) {
                node = node.right;
            }
        }
        return null;
    }
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    indexOf(key) {
        // Number of nodes that were pruned when descending right
        let prunedNodes = 0;
        let node = this.root;
        while (!node.isEmpty()) {
            const cmp = this.comparator(key, node.key);
            if (cmp === 0) {
                return prunedNodes + node.left.size;
            }
            else if (cmp < 0) {
                node = node.left;
            }
            else {
                // Count all nodes left of the node plus the node itself
                prunedNodes += node.left.size + 1;
                node = node.right;
            }
        }
        // Node not found
        return -1;
    }
    isEmpty() {
        return this.root.isEmpty();
    }
    // Returns the total number of nodes in the map.
    get size() {
        return this.root.size;
    }
    // Returns the minimum key in the map.
    minKey() {
        return this.root.minKey();
    }
    // Returns the maximum key in the map.
    maxKey() {
        return this.root.maxKey();
    }
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    inorderTraversal(action) {
        return this.root.inorderTraversal(action);
    }
    forEach(fn) {
        this.inorderTraversal((k, v) => {
            fn(k, v);
            return false;
        });
    }
    toString() {
        const descriptions = [];
        this.inorderTraversal((k, v) => {
            descriptions.push(`${k}:${v}`);
            return false;
        });
        return `{${descriptions.join(', ')}}`;
    }
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    reverseTraversal(action) {
        return this.root.reverseTraversal(action);
    }
    // Returns an iterator over the SortedMap.
    getIterator() {
        return new SortedMapIterator(this.root, null, this.comparator, false);
    }
    getIteratorFrom(key) {
        return new SortedMapIterator(this.root, key, this.comparator, false);
    }
    getReverseIterator() {
        return new SortedMapIterator(this.root, null, this.comparator, true);
    }
    getReverseIteratorFrom(key) {
        return new SortedMapIterator(this.root, key, this.comparator, true);
    }
} // end SortedMap
// An iterator over an LLRBNode.
class SortedMapIterator {
    constructor(node, startKey, comparator, isReverse) {
        this.isReverse = isReverse;
        this.nodeStack = [];
        let cmp = 1;
        while (!node.isEmpty()) {
            cmp = startKey ? comparator(node.key, startKey) : 1;
            // flip the comparison if we're going in reverse
            if (isReverse) {
                cmp *= -1;
            }
            if (cmp < 0) {
                // This node is less than our start key. ignore it
                if (this.isReverse) {
                    node = node.left;
                }
                else {
                    node = node.right;
                }
            }
            else if (cmp === 0) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.nodeStack.push(node);
                break;
            }
            else {
                // This node is greater than our start key, add it to the stack and move
                // to the next one
                this.nodeStack.push(node);
                if (this.isReverse) {
                    node = node.right;
                }
                else {
                    node = node.left;
                }
            }
        }
    }
    getNext() {
        let node = this.nodeStack.pop();
        const result = { key: node.key, value: node.value };
        if (this.isReverse) {
            node = node.left;
            while (!node.isEmpty()) {
                this.nodeStack.push(node);
                node = node.right;
            }
        }
        else {
            node = node.right;
            while (!node.isEmpty()) {
                this.nodeStack.push(node);
                node = node.left;
            }
        }
        return result;
    }
    hasNext() {
        return this.nodeStack.length > 0;
    }
    peek() {
        if (this.nodeStack.length === 0) {
            return null;
        }
        const node = this.nodeStack[this.nodeStack.length - 1];
        return { key: node.key, value: node.value };
    }
} // end SortedMapIterator
// Represents a node in a Left-leaning Red-Black tree.
class LLRBNode {
    constructor(key, value, color, left, right) {
        this.key = key;
        this.value = value;
        this.color = color != null ? color : LLRBNode.RED;
        this.left = left != null ? left : LLRBNode.EMPTY;
        this.right = right != null ? right : LLRBNode.EMPTY;
        this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
    copy(key, value, color, left, right) {
        return new LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
    }
    isEmpty() {
        return false;
    }
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    inorderTraversal(action) {
        return (this.left.inorderTraversal(action) ||
            action(this.key, this.value) ||
            this.right.inorderTraversal(action));
    }
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    reverseTraversal(action) {
        return (this.right.reverseTraversal(action) ||
            action(this.key, this.value) ||
            this.left.reverseTraversal(action));
    }
    // Returns the minimum node in the tree.
    min() {
        if (this.left.isEmpty()) {
            return this;
        }
        else {
            return this.left.min();
        }
    }
    // Returns the maximum key in the tree.
    minKey() {
        return this.min().key;
    }
    // Returns the maximum key in the tree.
    maxKey() {
        if (this.right.isEmpty()) {
            return this.key;
        }
        else {
            return this.right.maxKey();
        }
    }
    // Returns new tree, with the key/value added.
    insert(key, value, comparator) {
        let n = this;
        const cmp = comparator(key, n.key);
        if (cmp < 0) {
            n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
        }
        else if (cmp === 0) {
            n = n.copy(null, value, null, null, null);
        }
        else {
            n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
        }
        return n.fixUp();
    }
    removeMin() {
        if (this.left.isEmpty()) {
            return LLRBNode.EMPTY;
        }
        let n = this;
        if (!n.left.isRed() && !n.left.left.isRed()) {
            n = n.moveRedLeft();
        }
        n = n.copy(null, null, null, n.left.removeMin(), null);
        return n.fixUp();
    }
    // Returns new tree, with the specified item removed.
    remove(key, comparator) {
        let smallest;
        let n = this;
        if (comparator(key, n.key) < 0) {
            if (!n.left.isEmpty() && !n.left.isRed() && !n.left.left.isRed()) {
                n = n.moveRedLeft();
            }
            n = n.copy(null, null, null, n.left.remove(key, comparator), null);
        }
        else {
            if (n.left.isRed()) {
                n = n.rotateRight();
            }
            if (!n.right.isEmpty() && !n.right.isRed() && !n.right.left.isRed()) {
                n = n.moveRedRight();
            }
            if (comparator(key, n.key) === 0) {
                if (n.right.isEmpty()) {
                    return LLRBNode.EMPTY;
                }
                else {
                    smallest = n.right.min();
                    n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin());
                }
            }
            n = n.copy(null, null, null, null, n.right.remove(key, comparator));
        }
        return n.fixUp();
    }
    isRed() {
        return this.color;
    }
    // Returns new tree after performing any needed rotations.
    fixUp() {
        let n = this;
        if (n.right.isRed() && !n.left.isRed()) {
            n = n.rotateLeft();
        }
        if (n.left.isRed() && n.left.left.isRed()) {
            n = n.rotateRight();
        }
        if (n.left.isRed() && n.right.isRed()) {
            n = n.colorFlip();
        }
        return n;
    }
    moveRedLeft() {
        let n = this.colorFlip();
        if (n.right.left.isRed()) {
            n = n.copy(null, null, null, null, n.right.rotateRight());
            n = n.rotateLeft();
            n = n.colorFlip();
        }
        return n;
    }
    moveRedRight() {
        let n = this.colorFlip();
        if (n.left.left.isRed()) {
            n = n.rotateRight();
            n = n.colorFlip();
        }
        return n;
    }
    rotateLeft() {
        const nl = this.copy(null, null, LLRBNode.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, nl, null);
    }
    rotateRight() {
        const nr = this.copy(null, null, LLRBNode.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, nr);
    }
    colorFlip() {
        const left = this.left.copy(null, null, !this.left.color, null, null);
        const right = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, left, right);
    }
    // For testing.
    checkMaxDepth() {
        const blackDepth = this.check();
        if (Math.pow(2.0, blackDepth) <= this.size + 1) {
            return true;
        }
        else {
            return false;
        }
    }
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    check() {
        if (this.isRed() && this.left.isRed()) {
            throw fail();
        }
        if (this.right.isRed()) {
            throw fail();
        }
        const blackDepth = this.left.check();
        if (blackDepth !== this.right.check()) {
            throw fail();
        }
        else {
            return blackDepth + (this.isRed() ? 0 : 1);
        }
    }
} // end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
LLRBNode.EMPTY = null;
LLRBNode.RED = true;
LLRBNode.BLACK = false;
// Represents an empty node (a leaf node in the Red-Black Tree).
class LLRBEmptyNode {
    constructor() {
        this.size = 0;
    }
    get key() {
        throw fail();
    }
    get value() {
        throw fail();
    }
    get color() {
        throw fail();
    }
    get left() {
        throw fail();
    }
    get right() {
        throw fail();
    }
    // Returns a copy of the current node.
    copy(key, value, color, left, right) {
        return this;
    }
    // Returns a copy of the tree, with the specified key/value added.
    insert(key, value, comparator) {
        return new LLRBNode(key, value);
    }
    // Returns a copy of the tree, with the specified key removed.
    remove(key, comparator) {
        return this;
    }
    isEmpty() {
        return true;
    }
    inorderTraversal(action) {
        return false;
    }
    reverseTraversal(action) {
        return false;
    }
    minKey() {
        return null;
    }
    maxKey() {
        return null;
    }
    isRed() {
        return false;
    }
    // For testing.
    checkMaxDepth() {
        return true;
    }
    check() {
        return 0;
    }
} // end LLRBEmptyNode
LLRBNode.EMPTY = new LLRBEmptyNode();

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
class SortedSet {
    constructor(comparator) {
        this.comparator = comparator;
        this.data = new SortedMap(this.comparator);
    }
    has(elem) {
        return this.data.get(elem) !== null;
    }
    first() {
        return this.data.minKey();
    }
    last() {
        return this.data.maxKey();
    }
    get size() {
        return this.data.size;
    }
    indexOf(elem) {
        return this.data.indexOf(elem);
    }
    /** Iterates elements in order defined by "comparator" */
    forEach(cb) {
        this.data.inorderTraversal((k, v) => {
            cb(k);
            return false;
        });
    }
    /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */
    forEachInRange(range, cb) {
        const iter = this.data.getIteratorFrom(range[0]);
        while (iter.hasNext()) {
            const elem = iter.getNext();
            if (this.comparator(elem.key, range[1]) >= 0) {
                return;
            }
            cb(elem.key);
        }
    }
    /**
     * Iterates over `elem`s such that: start &lt;= elem until false is returned.
     */
    forEachWhile(cb, start) {
        let iter;
        if (start !== undefined) {
            iter = this.data.getIteratorFrom(start);
        }
        else {
            iter = this.data.getIterator();
        }
        while (iter.hasNext()) {
            const elem = iter.getNext();
            const result = cb(elem.key);
            if (!result) {
                return;
            }
        }
    }
    /** Finds the least element greater than or equal to `elem`. */
    firstAfterOrEqual(elem) {
        const iter = this.data.getIteratorFrom(elem);
        return iter.hasNext() ? iter.getNext().key : null;
    }
    getIterator() {
        return new SortedSetIterator(this.data.getIterator());
    }
    getIteratorFrom(key) {
        return new SortedSetIterator(this.data.getIteratorFrom(key));
    }
    /** Inserts or updates an element */
    add(elem) {
        return this.copy(this.data.remove(elem).insert(elem, true));
    }
    /** Deletes an element */
    delete(elem) {
        if (!this.has(elem)) {
            return this;
        }
        return this.copy(this.data.remove(elem));
    }
    isEmpty() {
        return this.data.isEmpty();
    }
    unionWith(other) {
        let result = this;
        // Make sure `result` always refers to the larger one of the two sets.
        if (result.size < other.size) {
            result = other;
            other = this;
        }
        other.forEach(elem => {
            result = result.add(elem);
        });
        return result;
    }
    isEqual(other) {
        if (!(other instanceof SortedSet)) {
            return false;
        }
        if (this.size !== other.size) {
            return false;
        }
        const thisIt = this.data.getIterator();
        const otherIt = other.data.getIterator();
        while (thisIt.hasNext()) {
            const thisElem = thisIt.getNext().key;
            const otherElem = otherIt.getNext().key;
            if (this.comparator(thisElem, otherElem) !== 0) {
                return false;
            }
        }
        return true;
    }
    toArray() {
        const res = [];
        this.forEach(targetId => {
            res.push(targetId);
        });
        return res;
    }
    toString() {
        const result = [];
        this.forEach(elem => result.push(elem));
        return 'SortedSet(' + result.toString() + ')';
    }
    copy(data) {
        const result = new SortedSet(this.comparator);
        result.data = data;
        return result;
    }
}
class SortedSetIterator {
    constructor(iter) {
        this.iter = iter;
    }
    getNext() {
        return this.iter.getNext().key;
    }
    hasNext() {
        return this.iter.hasNext();
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
const EMPTY_MUTABLE_DOCUMENT_MAP = new SortedMap(DocumentKey.comparator);
function mutableDocumentMap() {
    return EMPTY_MUTABLE_DOCUMENT_MAP;
}
const EMPTY_DOCUMENT_MAP = new SortedMap(DocumentKey.comparator);
function documentMap() {
    return EMPTY_DOCUMENT_MAP;
}
const EMPTY_DOCUMENT_VERSION_MAP = new SortedMap(DocumentKey.comparator);
function documentVersionMap() {
    return EMPTY_DOCUMENT_VERSION_MAP;
}
const EMPTY_DOCUMENT_KEY_SET = new SortedSet(DocumentKey.comparator);
function documentKeySet(...keys) {
    let set = EMPTY_DOCUMENT_KEY_SET;
    for (const key of keys) {
        set = set.add(key);
    }
    return set;
}
const EMPTY_TARGET_ID_SET = new SortedSet(primitiveComparator);
function targetIdSet() {
    return EMPTY_TARGET_ID_SET;
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
class TransformOperation {
    constructor() {
        // Make sure that the structural type of `TransformOperation` is unique.
        // See https://github.com/microsoft/TypeScript/issues/5451
        this._ = undefined;
    }
}
/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */
function applyTransformOperationToLocalView(transform, previousValue, localWriteTime) {
    if (transform instanceof ServerTimestampTransform) {
        return serverTimestamp$1(localWriteTime, previousValue);
    }
    else if (transform instanceof ArrayUnionTransformOperation) {
        return applyArrayUnionTransformOperation(transform, previousValue);
    }
    else if (transform instanceof ArrayRemoveTransformOperation) {
        return applyArrayRemoveTransformOperation(transform, previousValue);
    }
    else {
        return applyNumericIncrementTransformOperationToLocalView(transform, previousValue);
    }
}
/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */
function applyTransformOperationToRemoteDocument(transform, previousValue, transformResult) {
    // The server just sends null as the transform result for array operations,
    // so we have to calculate a result the same as we do for local
    // applications.
    if (transform instanceof ArrayUnionTransformOperation) {
        return applyArrayUnionTransformOperation(transform, previousValue);
    }
    else if (transform instanceof ArrayRemoveTransformOperation) {
        return applyArrayRemoveTransformOperation(transform, previousValue);
    }
    return transformResult;
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
 */
function computeTransformOperationBaseValue(transform, previousValue) {
    if (transform instanceof NumericIncrementTransformOperation) {
        return isNumber(previousValue) ? previousValue : { integerValue: 0 };
    }
    return null;
}
function transformOperationEquals(left, right) {
    if (left instanceof ArrayUnionTransformOperation &&
        right instanceof ArrayUnionTransformOperation) {
        return arrayEquals(left.elements, right.elements, valueEquals);
    }
    else if (left instanceof ArrayRemoveTransformOperation &&
        right instanceof ArrayRemoveTransformOperation) {
        return arrayEquals(left.elements, right.elements, valueEquals);
    }
    else if (left instanceof NumericIncrementTransformOperation &&
        right instanceof NumericIncrementTransformOperation) {
        return valueEquals(left.operand, right.operand);
    }
    return (left instanceof ServerTimestampTransform &&
        right instanceof ServerTimestampTransform);
}
/** Transforms a value into a server-generated timestamp. */
class ServerTimestampTransform extends TransformOperation {
}
/** Transforms an array value via a union operation. */
class ArrayUnionTransformOperation extends TransformOperation {
    constructor(elements) {
        super();
        this.elements = elements;
    }
}
function applyArrayUnionTransformOperation(transform, previousValue) {
    const values = coercedFieldValuesArray(previousValue);
    for (const toUnion of transform.elements) {
        if (!values.some(element => valueEquals(element, toUnion))) {
            values.push(toUnion);
        }
    }
    return { arrayValue: { values } };
}
/** Transforms an array value via a remove operation. */
class ArrayRemoveTransformOperation extends TransformOperation {
    constructor(elements) {
        super();
        this.elements = elements;
    }
}
function applyArrayRemoveTransformOperation(transform, previousValue) {
    let values = coercedFieldValuesArray(previousValue);
    for (const toRemove of transform.elements) {
        values = values.filter(element => !valueEquals(element, toRemove));
    }
    return { arrayValue: { values } };
}
/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */
class NumericIncrementTransformOperation extends TransformOperation {
    constructor(serializer, operand) {
        super();
        this.serializer = serializer;
        this.operand = operand;
    }
}
function applyNumericIncrementTransformOperationToLocalView(transform, previousValue) {
    // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
    // precision and resolves overflows by reducing precision, we do not
    // manually cap overflows at 2^63.
    const baseValue = computeTransformOperationBaseValue(transform, previousValue);
    const sum = asNumber(baseValue) + asNumber(transform.operand);
    if (isInteger(baseValue) && isInteger(transform.operand)) {
        return toInteger(sum);
    }
    else {
        return toDouble(transform.serializer, sum);
    }
}
function asNumber(value) {
    return normalizeNumber(value.integerValue || value.doubleValue);
}
function coercedFieldValuesArray(value) {
    return isArray(value) && value.arrayValue.values
        ? value.arrayValue.values.slice()
        : [];
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
/** A field path and the TransformOperation to perform upon it. */
class FieldTransform {
    constructor(field, transform) {
        this.field = field;
        this.transform = transform;
    }
}
function fieldTransformEquals(left, right) {
    return (left.field.isEqual(right.field) &&
        transformOperationEquals(left.transform, right.transform));
}
function fieldTransformsAreEqual(left, right) {
    if (left === undefined && right === undefined) {
        return true;
    }
    if (left && right) {
        return arrayEquals(left, right, (l, r) => fieldTransformEquals(l, r));
    }
    return false;
}
/** The result of successfully applying a mutation to the backend. */
class MutationResult {
    constructor(
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
    version, 
    /**
     * The resulting fields returned from the backend after a mutation
     * containing field transforms has been committed. Contains one FieldValue
     * for each FieldTransform that was in the mutation.
     *
     * Will be empty if the mutation did not contain any field transforms.
     */
    transformResults) {
        this.version = version;
        this.transformResults = transformResults;
    }
}
/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */
class Precondition {
    constructor(updateTime, exists) {
        this.updateTime = updateTime;
        this.exists = exists;
    }
    /** Creates a new empty Precondition. */
    static none() {
        return new Precondition();
    }
    /** Creates a new Precondition with an exists flag. */
    static exists(exists) {
        return new Precondition(undefined, exists);
    }
    /** Creates a new Precondition based on a version a document exists at. */
    static updateTime(version) {
        return new Precondition(version);
    }
    /** Returns whether this Precondition is empty. */
    get isNone() {
        return this.updateTime === undefined && this.exists === undefined;
    }
    isEqual(other) {
        return (this.exists === other.exists &&
            (this.updateTime
                ? !!other.updateTime && this.updateTime.isEqual(other.updateTime)
                : !other.updateTime));
    }
}
/** Returns true if the preconditions is valid for the given document. */
function preconditionIsValidForDocument(precondition, document) {
    if (precondition.updateTime !== undefined) {
        return (document.isFoundDocument() &&
            document.version.isEqual(precondition.updateTime));
    }
    else if (precondition.exists !== undefined) {
        return precondition.exists === document.isFoundDocument();
    }
    else {
        return true;
    }
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
 */
class Mutation {
}
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
 */
function applyMutationToRemoteDocument(mutation, document, mutationResult) {
    if (mutation instanceof SetMutation) {
        applySetMutationToRemoteDocument(mutation, document, mutationResult);
    }
    else if (mutation instanceof PatchMutation) {
        applyPatchMutationToRemoteDocument(mutation, document, mutationResult);
    }
    else {
        applyDeleteMutationToRemoteDocument(mutation, document, mutationResult);
    }
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
 */
function applyMutationToLocalView(mutation, document, localWriteTime) {
    if (mutation instanceof SetMutation) {
        applySetMutationToLocalView(mutation, document, localWriteTime);
    }
    else if (mutation instanceof PatchMutation) {
        applyPatchMutationToLocalView(mutation, document, localWriteTime);
    }
    else {
        applyDeleteMutationToLocalView(mutation, document);
    }
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
 */
function extractMutationBaseValue(mutation, document) {
    let baseObject = null;
    for (const fieldTransform of mutation.fieldTransforms) {
        const existingValue = document.data.field(fieldTransform.field);
        const coercedValue = computeTransformOperationBaseValue(fieldTransform.transform, existingValue || null);
        if (coercedValue != null) {
            if (baseObject == null) {
                baseObject = ObjectValue.empty();
            }
            baseObject.set(fieldTransform.field, coercedValue);
        }
    }
    return baseObject ? baseObject : null;
}
function mutationEquals(left, right) {
    if (left.type !== right.type) {
        return false;
    }
    if (!left.key.isEqual(right.key)) {
        return false;
    }
    if (!left.precondition.isEqual(right.precondition)) {
        return false;
    }
    if (!fieldTransformsAreEqual(left.fieldTransforms, right.fieldTransforms)) {
        return false;
    }
    if (left.type === 0 /* Set */) {
        return left.value.isEqual(right.value);
    }
    if (left.type === 1 /* Patch */) {
        return (left.data.isEqual(right.data) &&
            left.fieldMask.isEqual(right.fieldMask));
    }
    return true;
}
/**
 * Returns the version from the given document for use as the result of a
 * mutation. Mutations are defined to return the version of the base document
 * only if it is an existing document. Deleted and unknown documents have a
 * post-mutation version of SnapshotVersion.min().
 */
function getPostMutationVersion(document) {
    return document.isFoundDocument() ? document.version : SnapshotVersion.min();
}
/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */
class SetMutation extends Mutation {
    constructor(key, value, precondition, fieldTransforms = []) {
        super();
        this.key = key;
        this.value = value;
        this.precondition = precondition;
        this.fieldTransforms = fieldTransforms;
        this.type = 0 /* Set */;
    }
}
function applySetMutationToRemoteDocument(mutation, document, mutationResult) {
    // Unlike applySetMutationToLocalView, if we're applying a mutation to a
    // remote document the server has accepted the mutation so the precondition
    // must have held.
    const newData = mutation.value.clone();
    const transformResults = serverTransformResults(mutation.fieldTransforms, document, mutationResult.transformResults);
    newData.setAll(transformResults);
    document
        .convertToFoundDocument(mutationResult.version, newData)
        .setHasCommittedMutations();
}
function applySetMutationToLocalView(mutation, document, localWriteTime) {
    if (!preconditionIsValidForDocument(mutation.precondition, document)) {
        // The mutation failed to apply (e.g. a document ID created with add()
        // caused a name collision).
        return;
    }
    const newData = mutation.value.clone();
    const transformResults = localTransformResults(mutation.fieldTransforms, localWriteTime, document);
    newData.setAll(transformResults);
    document
        .convertToFoundDocument(getPostMutationVersion(document), newData)
        .setHasLocalMutations();
}
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
class PatchMutation extends Mutation {
    constructor(key, data, fieldMask, precondition, fieldTransforms = []) {
        super();
        this.key = key;
        this.data = data;
        this.fieldMask = fieldMask;
        this.precondition = precondition;
        this.fieldTransforms = fieldTransforms;
        this.type = 1 /* Patch */;
    }
}
function applyPatchMutationToRemoteDocument(mutation, document, mutationResult) {
    if (!preconditionIsValidForDocument(mutation.precondition, document)) {
        // Since the mutation was not rejected, we know that the precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and convert to an UnknownDocument with a
        // known updateTime.
        document.convertToUnknownDocument(mutationResult.version);
        return;
    }
    const transformResults = serverTransformResults(mutation.fieldTransforms, document, mutationResult.transformResults);
    const newData = document.data;
    newData.setAll(getPatch(mutation));
    newData.setAll(transformResults);
    document
        .convertToFoundDocument(mutationResult.version, newData)
        .setHasCommittedMutations();
}
function applyPatchMutationToLocalView(mutation, document, localWriteTime) {
    if (!preconditionIsValidForDocument(mutation.precondition, document)) {
        return;
    }
    const transformResults = localTransformResults(mutation.fieldTransforms, localWriteTime, document);
    const newData = document.data;
    newData.setAll(getPatch(mutation));
    newData.setAll(transformResults);
    document
        .convertToFoundDocument(getPostMutationVersion(document), newData)
        .setHasLocalMutations();
}
/**
 * Returns a FieldPath/Value map with the content of the PatchMutation.
 */
function getPatch(mutation) {
    const result = new Map();
    mutation.fieldMask.fields.forEach(fieldPath => {
        if (!fieldPath.isEmpty()) {
            const newValue = mutation.data.field(fieldPath);
            result.set(fieldPath, newValue);
        }
    });
    return result;
}
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
 */
function serverTransformResults(fieldTransforms, mutableDocument, serverTransformResults) {
    const transformResults = new Map();
    hardAssert(fieldTransforms.length === serverTransformResults.length);
    for (let i = 0; i < serverTransformResults.length; i++) {
        const fieldTransform = fieldTransforms[i];
        const transform = fieldTransform.transform;
        const previousValue = mutableDocument.data.field(fieldTransform.field);
        transformResults.set(fieldTransform.field, applyTransformOperationToRemoteDocument(transform, previousValue, serverTransformResults[i]));
    }
    return transformResults;
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
 */
function localTransformResults(fieldTransforms, localWriteTime, mutableDocument) {
    const transformResults = new Map();
    for (const fieldTransform of fieldTransforms) {
        const transform = fieldTransform.transform;
        const previousValue = mutableDocument.data.field(fieldTransform.field);
        transformResults.set(fieldTransform.field, applyTransformOperationToLocalView(transform, previousValue, localWriteTime));
    }
    return transformResults;
}
/** A mutation that deletes the document at the given key. */
class DeleteMutation extends Mutation {
    constructor(key, precondition) {
        super();
        this.key = key;
        this.precondition = precondition;
        this.type = 2 /* Delete */;
        this.fieldTransforms = [];
    }
}
function applyDeleteMutationToRemoteDocument(mutation, document, mutationResult) {
    // Unlike applyToLocalView, if we're applying a mutation to a remote
    // document the server has accepted the mutation so the precondition must
    // have held.
    document
        .convertToNoDocument(mutationResult.version)
        .setHasCommittedMutations();
}
function applyDeleteMutationToLocalView(mutation, document) {
    if (preconditionIsValidForDocument(mutation.precondition, document)) {
        // We don't call `setHasLocalMutations()` since we want to be backwards
        // compatible with the existing SDK behavior.
        document.convertToNoDocument(SnapshotVersion.min());
    }
}
/**
 * A mutation that verifies the existence of the document at the given key with
 * the provided precondition.
 *
 * The `verify` operation is only used in Transactions, and this class serves
 * primarily to facilitate serialization into protos.
 */
class VerifyMutation extends Mutation {
    constructor(key, precondition) {
        super();
        this.key = key;
        this.precondition = precondition;
        this.type = 3 /* Verify */;
        this.fieldTransforms = [];
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
 * A batch of mutations that will be sent as one unit to the backend.
 */
class MutationBatch {
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
    constructor(batchId, localWriteTime, baseMutations, mutations) {
        this.batchId = batchId;
        this.localWriteTime = localWriteTime;
        this.baseMutations = baseMutations;
        this.mutations = mutations;
    }
    /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to compute the state of the remote document
     *
     * @param document - The document to apply mutations to.
     * @param batchResult - The result of applying the MutationBatch to the
     * backend.
     */
    applyToRemoteDocument(document, batchResult) {
        const mutationResults = batchResult.mutationResults;
        for (let i = 0; i < this.mutations.length; i++) {
            const mutation = this.mutations[i];
            if (mutation.key.isEqual(document.key)) {
                const mutationResult = mutationResults[i];
                applyMutationToRemoteDocument(mutation, document, mutationResult);
            }
        }
    }
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param document - The document to apply mutations to.
     */
    applyToLocalView(document) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (const mutation of this.baseMutations) {
            if (mutation.key.isEqual(document.key)) {
                applyMutationToLocalView(mutation, document, this.localWriteTime);
            }
        }
        // Second, apply all user-provided mutations.
        for (const mutation of this.mutations) {
            if (mutation.key.isEqual(document.key)) {
                applyMutationToLocalView(mutation, document, this.localWriteTime);
            }
        }
    }
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */
    applyToLocalDocumentSet(documentMap) {
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
        this.mutations.forEach(m => {
            const document = documentMap.get(m.key);
            // TODO(mutabledocuments): This method should take a MutableDocumentMap
            // and we should remove this cast.
            const mutableDocument = document;
            this.applyToLocalView(mutableDocument);
            if (!document.isValidDocument()) {
                mutableDocument.convertToNoDocument(SnapshotVersion.min());
            }
        });
    }
    keys() {
        return this.mutations.reduce((keys, m) => keys.add(m.key), documentKeySet());
    }
    isEqual(other) {
        return (this.batchId === other.batchId &&
            arrayEquals(this.mutations, other.mutations, (l, r) => mutationEquals(l, r)) &&
            arrayEquals(this.baseMutations, other.baseMutations, (l, r) => mutationEquals(l, r)));
    }
}
/** The result of applying a mutation batch to the backend. */
class MutationBatchResult {
    constructor(batch, commitVersion, mutationResults, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    docVersions) {
        this.batch = batch;
        this.commitVersion = commitVersion;
        this.mutationResults = mutationResults;
        this.docVersions = docVersions;
    }
    /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=&gt;version mapping (docVersions).
     */
    static from(batch, commitVersion, results) {
        hardAssert(batch.mutations.length === results.length);
        let versionMap = documentVersionMap();
        const mutations = batch.mutations;
        for (let i = 0; i < mutations.length; i++) {
            versionMap = versionMap.insert(mutations[i].key, results[i].version);
        }
        return new MutationBatchResult(batch, commitVersion, results, versionMap);
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
class ExistenceFilter {
    // TODO(b/33078163): just use simplest form of existence filter for now
    constructor(count) {
        this.count = count;
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
function isPermanentWriteError(code) {
    return isPermanentError(code) && code !== Code.ABORTED;
}
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */
function mapCodeFromRpcCode(code) {
    if (code === undefined) {
        // This shouldn't normally happen, but in certain error cases (like trying
        // to send invalid proto messages) we may get an error with no GRPC code.
        logError('GRPC error has no .code');
        return Code.UNKNOWN;
    }
    switch (code) {
        case RpcCode.OK:
            return Code.OK;
        case RpcCode.CANCELLED:
            return Code.CANCELLED;
        case RpcCode.UNKNOWN:
            return Code.UNKNOWN;
        case RpcCode.DEADLINE_EXCEEDED:
            return Code.DEADLINE_EXCEEDED;
        case RpcCode.RESOURCE_EXHAUSTED:
            return Code.RESOURCE_EXHAUSTED;
        case RpcCode.INTERNAL:
            return Code.INTERNAL;
        case RpcCode.UNAVAILABLE:
            return Code.UNAVAILABLE;
        case RpcCode.UNAUTHENTICATED:
            return Code.UNAUTHENTICATED;
        case RpcCode.INVALID_ARGUMENT:
            return Code.INVALID_ARGUMENT;
        case RpcCode.NOT_FOUND:
            return Code.NOT_FOUND;
        case RpcCode.ALREADY_EXISTS:
            return Code.ALREADY_EXISTS;
        case RpcCode.PERMISSION_DENIED:
            return Code.PERMISSION_DENIED;
        case RpcCode.FAILED_PRECONDITION:
            return Code.FAILED_PRECONDITION;
        case RpcCode.ABORTED:
            return Code.ABORTED;
        case RpcCode.OUT_OF_RANGE:
            return Code.OUT_OF_RANGE;
        case RpcCode.UNIMPLEMENTED:
            return Code.UNIMPLEMENTED;
        case RpcCode.DATA_LOSS:
            return Code.DATA_LOSS;
        default:
            return fail();
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
 * An event from the RemoteStore. It is split into targetChanges (changes to the
 * state or the set of documents in our watched targets) and documentUpdates
 * (changes to the actual documents).
 */
class RemoteEvent {
    constructor(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    snapshotVersion, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    targetChanges, 
    /**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */
    targetMismatches, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    documentUpdates, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    resolvedLimboDocuments) {
        this.snapshotVersion = snapshotVersion;
        this.targetChanges = targetChanges;
        this.targetMismatches = targetMismatches;
        this.documentUpdates = documentUpdates;
        this.resolvedLimboDocuments = resolvedLimboDocuments;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
    static createSynthesizedRemoteEventForCurrentChange(targetId, current) {
        const targetChanges = new Map();
        targetChanges.set(targetId, TargetChange.createSynthesizedTargetChangeForCurrentChange(targetId, current));
        return new RemoteEvent(SnapshotVersion.min(), targetChanges, targetIdSet(), mutableDocumentMap(), documentKeySet());
    }
}
/**
 * A TargetChange specifies the set of changes for a specific target as part of
 * a RemoteEvent. These changes track which documents are added, modified or
 * removed, as well as the target's resume token and whether the target is
 * marked CURRENT.
 * The actual changes *to* documents are not part of the TargetChange since
 * documents may be part of multiple targets.
 */
class TargetChange {
    constructor(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    resumeToken, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    current, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    addedDocuments, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    modifiedDocuments, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    removedDocuments) {
        this.resumeToken = resumeToken;
        this.current = current;
        this.addedDocuments = addedDocuments;
        this.modifiedDocuments = modifiedDocuments;
        this.removedDocuments = removedDocuments;
    }
    /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */
    static createSynthesizedTargetChangeForCurrentChange(targetId, current) {
        return new TargetChange(ByteString.EMPTY_BYTE_STRING, current, documentKeySet(), documentKeySet(), documentKeySet());
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
 * Represents a changed document and a list of target ids to which this change
 * applies.
 *
 * If document has been deleted NoDocument will be provided.
 */
class DocumentWatchChange {
    constructor(
    /** The new document applies to all of these targets. */
    updatedTargetIds, 
    /** The new document is removed from all of these targets. */
    removedTargetIds, 
    /** The key of the document for this change. */
    key, 
    /**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
    newDoc) {
        this.updatedTargetIds = updatedTargetIds;
        this.removedTargetIds = removedTargetIds;
        this.key = key;
        this.newDoc = newDoc;
    }
}
class ExistenceFilterChange {
    constructor(targetId, existenceFilter) {
        this.targetId = targetId;
        this.existenceFilter = existenceFilter;
    }
}
class WatchTargetChange {
    constructor(
    /** What kind of change occurred to the watch target. */
    state, 
    /** The target IDs that were added/removed/set. */
    targetIds, 
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
    resumeToken = ByteString.EMPTY_BYTE_STRING, 
    /** An RPC error indicating why the watch failed. */
    cause = null) {
        this.state = state;
        this.targetIds = targetIds;
        this.resumeToken = resumeToken;
        this.cause = cause;
    }
}
/** Tracks the internal state of a Watch target. */
class TargetState {
    constructor() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.pendingResponses = 0;
        /**
         * Keeps track of the document changes since the last raised snapshot.
         *
         * These changes are continuously updated as we receive document updates and
         * always reflect the current set of changes against the last issued snapshot.
         */
        this.documentChanges = snapshotChangesMap();
        /** See public getters for explanations of these fields. */
        this._resumeToken = ByteString.EMPTY_BYTE_STRING;
        this._current = false;
        /**
         * Whether this target state should be included in the next snapshot. We
         * initialize to true so that newly-added targets are included in the next
         * RemoteEvent.
         */
        this._hasPendingChanges = true;
    }
    /**
     * Whether this target has been marked 'current'.
     *
     * 'Current' has special meaning in the RPC protocol: It implies that the
     * Watch backend has sent us all changes up to the point at which the target
     * was added and that the target is consistent with the rest of the watch
     * stream.
     */
    get current() {
        return this._current;
    }
    /** The last resume token sent to us for this target. */
    get resumeToken() {
        return this._resumeToken;
    }
    /** Whether this target has pending target adds or target removes. */
    get isPending() {
        return this.pendingResponses !== 0;
    }
    /** Whether we have modified any state that should trigger a snapshot. */
    get hasPendingChanges() {
        return this._hasPendingChanges;
    }
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    updateResumeToken(resumeToken) {
        if (resumeToken.approximateByteSize() > 0) {
            this._hasPendingChanges = true;
            this._resumeToken = resumeToken;
        }
    }
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    toTargetChange() {
        let addedDocuments = documentKeySet();
        let modifiedDocuments = documentKeySet();
        let removedDocuments = documentKeySet();
        this.documentChanges.forEach((key, changeType) => {
            switch (changeType) {
                case 0 /* Added */:
                    addedDocuments = addedDocuments.add(key);
                    break;
                case 2 /* Modified */:
                    modifiedDocuments = modifiedDocuments.add(key);
                    break;
                case 1 /* Removed */:
                    removedDocuments = removedDocuments.add(key);
                    break;
                default:
                    fail();
            }
        });
        return new TargetChange(this._resumeToken, this._current, addedDocuments, modifiedDocuments, removedDocuments);
    }
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    clearPendingChanges() {
        this._hasPendingChanges = false;
        this.documentChanges = snapshotChangesMap();
    }
    addDocumentChange(key, changeType) {
        this._hasPendingChanges = true;
        this.documentChanges = this.documentChanges.insert(key, changeType);
    }
    removeDocumentChange(key) {
        this._hasPendingChanges = true;
        this.documentChanges = this.documentChanges.remove(key);
    }
    recordPendingTargetRequest() {
        this.pendingResponses += 1;
    }
    recordTargetResponse() {
        this.pendingResponses -= 1;
    }
    markCurrent() {
        this._hasPendingChanges = true;
        this._current = true;
    }
}
const LOG_TAG$f = 'WatchChangeAggregator';
/**
 * A helper class to accumulate watch changes into a RemoteEvent.
 */
class WatchChangeAggregator {
    constructor(metadataProvider) {
        this.metadataProvider = metadataProvider;
        /** The internal state of all tracked targets. */
        this.targetStates = new Map();
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.pendingDocumentUpdates = mutableDocumentMap();
        /** A mapping of document keys to their set of target IDs. */
        this.pendingDocumentTargetMapping = documentTargetMap();
        /**
         * A list of targets with existence filter mismatches. These targets are
         * known to be inconsistent and their listens needs to be re-established by
         * RemoteStore.
         */
        this.pendingTargetResets = new SortedSet(primitiveComparator);
    }
    /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */
    handleDocumentChange(docChange) {
        for (const targetId of docChange.updatedTargetIds) {
            if (docChange.newDoc && docChange.newDoc.isFoundDocument()) {
                this.addDocumentToTarget(targetId, docChange.newDoc);
            }
            else {
                this.removeDocumentFromTarget(targetId, docChange.key, docChange.newDoc);
            }
        }
        for (const targetId of docChange.removedTargetIds) {
            this.removeDocumentFromTarget(targetId, docChange.key, docChange.newDoc);
        }
    }
    /** Processes and adds the WatchTargetChange to the current set of changes. */
    handleTargetChange(targetChange) {
        this.forEachTarget(targetChange, targetId => {
            const targetState = this.ensureTargetState(targetId);
            switch (targetChange.state) {
                case 0 /* NoChange */:
                    if (this.isActiveTarget(targetId)) {
                        targetState.updateResumeToken(targetChange.resumeToken);
                    }
                    break;
                case 1 /* Added */:
                    // We need to decrement the number of pending acks needed from watch
                    // for this targetId.
                    targetState.recordTargetResponse();
                    if (!targetState.isPending) {
                        // We have a freshly added target, so we need to reset any state
                        // that we had previously. This can happen e.g. when remove and add
                        // back a target for existence filter mismatches.
                        targetState.clearPendingChanges();
                    }
                    targetState.updateResumeToken(targetChange.resumeToken);
                    break;
                case 2 /* Removed */:
                    // We need to keep track of removed targets to we can post-filter and
                    // remove any target changes.
                    // We need to decrement the number of pending acks needed from watch
                    // for this targetId.
                    targetState.recordTargetResponse();
                    if (!targetState.isPending) {
                        this.removeTarget(targetId);
                    }
                    break;
                case 3 /* Current */:
                    if (this.isActiveTarget(targetId)) {
                        targetState.markCurrent();
                        targetState.updateResumeToken(targetChange.resumeToken);
                    }
                    break;
                case 4 /* Reset */:
                    if (this.isActiveTarget(targetId)) {
                        // Reset the target and synthesizes removes for all existing
                        // documents. The backend will re-add any documents that still
                        // match the target before it sends the next global snapshot.
                        this.resetTarget(targetId);
                        targetState.updateResumeToken(targetChange.resumeToken);
                    }
                    break;
                default:
                    fail();
            }
        });
    }
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */
    forEachTarget(targetChange, fn) {
        if (targetChange.targetIds.length > 0) {
            targetChange.targetIds.forEach(fn);
        }
        else {
            this.targetStates.forEach((_, targetId) => {
                if (this.isActiveTarget(targetId)) {
                    fn(targetId);
                }
            });
        }
    }
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    handleExistenceFilter(watchChange) {
        const targetId = watchChange.targetId;
        const expectedCount = watchChange.existenceFilter.count;
        const targetData = this.targetDataForActiveTarget(targetId);
        if (targetData) {
            const target = targetData.target;
            if (isDocumentTarget(target)) {
                if (expectedCount === 0) {
                    // The existence filter told us the document does not exist. We deduce
                    // that this document does not exist and apply a deleted document to
                    // our updates. Without applying this deleted document there might be
                    // another query that will raise this document as part of a snapshot
                    // until it is resolved, essentially exposing inconsistency between
                    // queries.
                    const key = new DocumentKey(target.path);
                    this.removeDocumentFromTarget(targetId, key, MutableDocument.newNoDocument(key, SnapshotVersion.min()));
                }
                else {
                    hardAssert(expectedCount === 1);
                }
            }
            else {
                const currentSize = this.getCurrentDocumentCountForTarget(targetId);
                if (currentSize !== expectedCount) {
                    // Existence filter mismatch: We reset the mapping and raise a new
                    // snapshot with `isFromCache:true`.
                    this.resetTarget(targetId);
                    this.pendingTargetResets = this.pendingTargetResets.add(targetId);
                }
            }
        }
    }
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    createRemoteEvent(snapshotVersion) {
        const targetChanges = new Map();
        this.targetStates.forEach((targetState, targetId) => {
            const targetData = this.targetDataForActiveTarget(targetId);
            if (targetData) {
                if (targetState.current && isDocumentTarget(targetData.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    //
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    const key = new DocumentKey(targetData.target.path);
                    if (this.pendingDocumentUpdates.get(key) === null &&
                        !this.targetContainsDocument(targetId, key)) {
                        this.removeDocumentFromTarget(targetId, key, MutableDocument.newNoDocument(key, snapshotVersion));
                    }
                }
                if (targetState.hasPendingChanges) {
                    targetChanges.set(targetId, targetState.toTargetChange());
                    targetState.clearPendingChanges();
                }
            }
        });
        let resolvedLimboDocuments = documentKeySet();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        //
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
        this.pendingDocumentTargetMapping.forEach((key, targets) => {
            let isOnlyLimboTarget = true;
            targets.forEachWhile(targetId => {
                const targetData = this.targetDataForActiveTarget(targetId);
                if (targetData &&
                    targetData.purpose !== 2 /* LimboResolution */) {
                    isOnlyLimboTarget = false;
                    return false;
                }
                return true;
            });
            if (isOnlyLimboTarget) {
                resolvedLimboDocuments = resolvedLimboDocuments.add(key);
            }
        });
        const remoteEvent = new RemoteEvent(snapshotVersion, targetChanges, this.pendingTargetResets, this.pendingDocumentUpdates, resolvedLimboDocuments);
        this.pendingDocumentUpdates = mutableDocumentMap();
        this.pendingDocumentTargetMapping = documentTargetMap();
        this.pendingTargetResets = new SortedSet(primitiveComparator);
        return remoteEvent;
    }
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    addDocumentToTarget(targetId, document) {
        if (!this.isActiveTarget(targetId)) {
            return;
        }
        const changeType = this.targetContainsDocument(targetId, document.key)
            ? 2 /* Modified */
            : 0 /* Added */;
        const targetState = this.ensureTargetState(targetId);
        targetState.addDocumentChange(document.key, changeType);
        this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(document.key, document);
        this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(document.key, this.ensureDocumentTargetMapping(document.key).add(targetId));
    }
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    removeDocumentFromTarget(targetId, key, updatedDocument) {
        if (!this.isActiveTarget(targetId)) {
            return;
        }
        const targetState = this.ensureTargetState(targetId);
        if (this.targetContainsDocument(targetId, key)) {
            targetState.addDocumentChange(key, 1 /* Removed */);
        }
        else {
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            targetState.removeDocumentChange(key);
        }
        this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(key, this.ensureDocumentTargetMapping(key).delete(targetId));
        if (updatedDocument) {
            this.pendingDocumentUpdates = this.pendingDocumentUpdates.insert(key, updatedDocument);
        }
    }
    removeTarget(targetId) {
        this.targetStates.delete(targetId);
    }
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    getCurrentDocumentCountForTarget(targetId) {
        const targetState = this.ensureTargetState(targetId);
        const targetChange = targetState.toTargetChange();
        return (this.metadataProvider.getRemoteKeysForTarget(targetId).size +
            targetChange.addedDocuments.size -
            targetChange.removedDocuments.size);
    }
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    recordPendingTargetRequest(targetId) {
        // For each request we get we need to record we need a response for it.
        const targetState = this.ensureTargetState(targetId);
        targetState.recordPendingTargetRequest();
    }
    ensureTargetState(targetId) {
        let result = this.targetStates.get(targetId);
        if (!result) {
            result = new TargetState();
            this.targetStates.set(targetId, result);
        }
        return result;
    }
    ensureDocumentTargetMapping(key) {
        let targetMapping = this.pendingDocumentTargetMapping.get(key);
        if (!targetMapping) {
            targetMapping = new SortedSet(primitiveComparator);
            this.pendingDocumentTargetMapping = this.pendingDocumentTargetMapping.insert(key, targetMapping);
        }
        return targetMapping;
    }
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    isActiveTarget(targetId) {
        const targetActive = this.targetDataForActiveTarget(targetId) !== null;
        if (!targetActive) {
            logDebug(LOG_TAG$f, 'Detected inactive target', targetId);
        }
        return targetActive;
    }
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    targetDataForActiveTarget(targetId) {
        const targetState = this.targetStates.get(targetId);
        return targetState && targetState.isPending
            ? null
            : this.metadataProvider.getTargetDataForTarget(targetId);
    }
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    resetTarget(targetId) {
        this.targetStates.set(targetId, new TargetState());
        // Trigger removal for any documents currently mapped to this target.
        // These removals will be part of the initial snapshot if Watch does not
        // resend these documents.
        const existingKeys = this.metadataProvider.getRemoteKeysForTarget(targetId);
        existingKeys.forEach(key => {
            this.removeDocumentFromTarget(targetId, key, /*updatedDocument=*/ null);
        });
    }
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    targetContainsDocument(targetId, key) {
        const existingKeys = this.metadataProvider.getRemoteKeysForTarget(targetId);
        return existingKeys.has(key);
    }
}
function documentTargetMap() {
    return new SortedMap(DocumentKey.comparator);
}
function snapshotChangesMap() {
    return new SortedMap(DocumentKey.comparator);
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
const DIRECTIONS = (() => {
    const dirs = {};
    dirs["asc" /* ASCENDING */] = 'ASCENDING';
    dirs["desc" /* DESCENDING */] = 'DESCENDING';
    return dirs;
})();
const OPERATORS = (() => {
    const ops = {};
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
class JsonProtoSerializer {
    constructor(databaseId, useProto3Json) {
        this.databaseId = databaseId;
        this.useProto3Json = useProto3Json;
    }
}
function fromRpcStatus(status) {
    const code = status.code === undefined ? Code.UNKNOWN : mapCodeFromRpcCode(status.code);
    return new FirestoreError(code, status.message || '');
}
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
 * Returns a number (or null) from a google.protobuf.Int32Value proto.
 */
function fromInt32Proto(val) {
    let result;
    if (typeof val === 'object') {
        result = val.value;
    }
    else {
        result = val;
    }
    return isNullOrUndefined(result) ? null : result;
}
/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */
function toTimestamp(serializer, timestamp) {
    if (serializer.useProto3Json) {
        // Serialize to ISO-8601 date format, but with full nano resolution.
        // Since JS Date has only millis, let's only use it for the seconds and
        // then manually add the fractions to the end.
        const jsDateStr = new Date(timestamp.seconds * 1000).toISOString();
        // Remove .xxx frac part and Z in the end.
        const strUntilSeconds = jsDateStr.replace(/\.\d*/, '').replace('Z', '');
        // Pad the fraction out to 9 digits (nanos).
        const nanoStr = ('000000000' + timestamp.nanoseconds).slice(-9);
        return `${strUntilSeconds}.${nanoStr}Z`;
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
    const timestamp = normalizeTimestamp(date);
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
/**
 * Returns a ByteString based on the proto string value.
 */
function fromBytes(serializer, value) {
    if (serializer.useProto3Json) {
        hardAssert(value === undefined || typeof value === 'string');
        return ByteString.fromBase64String(value ? value : '');
    }
    else {
        hardAssert(value === undefined || value instanceof Uint8Array);
        return ByteString.fromUint8Array(value ? value : new Uint8Array());
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
    const resource = ResourcePath.fromString(name);
    hardAssert(isValidResourceName(resource));
    return resource;
}
function toName(serializer, key) {
    return toResourceName(serializer.databaseId, key.path);
}
function fromName(serializer, name) {
    const resource = fromResourceName(name);
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
function fromQueryPath(name) {
    const resourceName = fromResourceName(name);
    // In v1beta1 queries for collections at the root did not have a trailing
    // "/documents". In v1 all resource paths contain "/documents". Preserve the
    // ability to read the v1beta1 form for compatibility with queries persisted
    // in the local target cache.
    if (resourceName.length === 4) {
        return ResourcePath.emptyPath();
    }
    return extractLocalPathFromResourceName(resourceName);
}
function getEncodedDatabaseId(serializer) {
    const path = new ResourcePath([
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
function toDocument(serializer, document) {
    return {
        name: toName(serializer, document.key),
        fields: document.data.value.mapValue.fields,
        updateTime: toTimestamp(serializer, document.version.toTimestamp())
    };
}
function fromDocument(serializer, document, hasCommittedMutations) {
    const key = fromName(serializer, document.name);
    const version = fromVersion(document.updateTime);
    const data = new ObjectValue({ mapValue: { fields: document.fields } });
    const result = MutableDocument.newFoundDocument(key, version, data);
    if (hasCommittedMutations) {
        result.setHasCommittedMutations();
    }
    return hasCommittedMutations ? result.setHasCommittedMutations() : result;
}
function fromFound(serializer, doc) {
    hardAssert(!!doc.found);
    assertPresent(doc.found.name);
    assertPresent(doc.found.updateTime);
    const key = fromName(serializer, doc.found.name);
    const version = fromVersion(doc.found.updateTime);
    const data = new ObjectValue({ mapValue: { fields: doc.found.fields } });
    return MutableDocument.newFoundDocument(key, version, data);
}
function fromMissing(serializer, result) {
    hardAssert(!!result.missing);
    hardAssert(!!result.readTime);
    const key = fromName(serializer, result.missing);
    const version = fromVersion(result.readTime);
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
function fromWatchChange(serializer, change) {
    let watchChange;
    if ('targetChange' in change) {
        assertPresent(change.targetChange);
        // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
        // if unset
        const state = fromWatchTargetChangeState(change.targetChange.targetChangeType || 'NO_CHANGE');
        const targetIds = change.targetChange.targetIds || [];
        const resumeToken = fromBytes(serializer, change.targetChange.resumeToken);
        const causeProto = change.targetChange.cause;
        const cause = causeProto && fromRpcStatus(causeProto);
        watchChange = new WatchTargetChange(state, targetIds, resumeToken, cause || null);
    }
    else if ('documentChange' in change) {
        assertPresent(change.documentChange);
        const entityChange = change.documentChange;
        assertPresent(entityChange.document);
        assertPresent(entityChange.document.name);
        assertPresent(entityChange.document.updateTime);
        const key = fromName(serializer, entityChange.document.name);
        const version = fromVersion(entityChange.document.updateTime);
        const data = new ObjectValue({
            mapValue: { fields: entityChange.document.fields }
        });
        const doc = MutableDocument.newFoundDocument(key, version, data);
        const updatedTargetIds = entityChange.targetIds || [];
        const removedTargetIds = entityChange.removedTargetIds || [];
        watchChange = new DocumentWatchChange(updatedTargetIds, removedTargetIds, doc.key, doc);
    }
    else if ('documentDelete' in change) {
        assertPresent(change.documentDelete);
        const docDelete = change.documentDelete;
        assertPresent(docDelete.document);
        const key = fromName(serializer, docDelete.document);
        const version = docDelete.readTime
            ? fromVersion(docDelete.readTime)
            : SnapshotVersion.min();
        const doc = MutableDocument.newNoDocument(key, version);
        const removedTargetIds = docDelete.removedTargetIds || [];
        watchChange = new DocumentWatchChange([], removedTargetIds, doc.key, doc);
    }
    else if ('documentRemove' in change) {
        assertPresent(change.documentRemove);
        const docRemove = change.documentRemove;
        assertPresent(docRemove.document);
        const key = fromName(serializer, docRemove.document);
        const removedTargetIds = docRemove.removedTargetIds || [];
        watchChange = new DocumentWatchChange([], removedTargetIds, key, null);
    }
    else if ('filter' in change) {
        // TODO(dimond): implement existence filter parsing with strategy.
        assertPresent(change.filter);
        const filter = change.filter;
        assertPresent(filter.targetId);
        const count = filter.count || 0;
        const existenceFilter = new ExistenceFilter(count);
        const targetId = filter.targetId;
        watchChange = new ExistenceFilterChange(targetId, existenceFilter);
    }
    else {
        return fail();
    }
    return watchChange;
}
function fromWatchTargetChangeState(state) {
    if (state === 'NO_CHANGE') {
        return 0 /* NoChange */;
    }
    else if (state === 'ADD') {
        return 1 /* Added */;
    }
    else if (state === 'REMOVE') {
        return 2 /* Removed */;
    }
    else if (state === 'CURRENT') {
        return 3 /* Current */;
    }
    else if (state === 'RESET') {
        return 4 /* Reset */;
    }
    else {
        return fail();
    }
}
function versionFromListenResponse(change) {
    // We have only reached a consistent snapshot for the entire stream if there
    // is a read_time set and it applies to all targets (i.e. the list of
    // targets is empty). The backend is guaranteed to send such responses.
    if (!('targetChange' in change)) {
        return SnapshotVersion.min();
    }
    const targetChange = change.targetChange;
    if (targetChange.targetIds && targetChange.targetIds.length) {
        return SnapshotVersion.min();
    }
    if (!targetChange.readTime) {
        return SnapshotVersion.min();
    }
    return fromVersion(targetChange.readTime);
}
function toMutation(serializer, mutation) {
    let result;
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
        result.updateTransforms = mutation.fieldTransforms.map(transform => toFieldTransform(serializer, transform));
    }
    if (!mutation.precondition.isNone) {
        result.currentDocument = toPrecondition(serializer, mutation.precondition);
    }
    return result;
}
function fromMutation(serializer, proto) {
    const precondition = proto.currentDocument
        ? fromPrecondition(proto.currentDocument)
        : Precondition.none();
    const fieldTransforms = proto.updateTransforms
        ? proto.updateTransforms.map(transform => fromFieldTransform(serializer, transform))
        : [];
    if (proto.update) {
        assertPresent(proto.update.name);
        const key = fromName(serializer, proto.update.name);
        const value = new ObjectValue({
            mapValue: { fields: proto.update.fields }
        });
        if (proto.updateMask) {
            const fieldMask = fromDocumentMask(proto.updateMask);
            return new PatchMutation(key, value, fieldMask, precondition, fieldTransforms);
        }
        else {
            return new SetMutation(key, value, precondition, fieldTransforms);
        }
    }
    else if (proto.delete) {
        const key = fromName(serializer, proto.delete);
        return new DeleteMutation(key, precondition);
    }
    else if (proto.verify) {
        const key = fromName(serializer, proto.verify);
        return new VerifyMutation(key, precondition);
    }
    else {
        return fail();
    }
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
function fromPrecondition(precondition) {
    if (precondition.updateTime !== undefined) {
        return Precondition.updateTime(fromVersion(precondition.updateTime));
    }
    else if (precondition.exists !== undefined) {
        return Precondition.exists(precondition.exists);
    }
    else {
        return Precondition.none();
    }
}
function fromWriteResult(proto, commitTime) {
    // NOTE: Deletes don't have an updateTime.
    let version = proto.updateTime
        ? fromVersion(proto.updateTime)
        : fromVersion(commitTime);
    if (version.isEqual(SnapshotVersion.min())) {
        // The Firestore Emulator currently returns an update time of 0 for
        // deletes of non-existing documents (rather than null). This breaks the
        // test "get deleted doc while offline with source=cache" as NoDocuments
        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
        // TODO(#2149): Remove this when Emulator is fixed
        version = fromVersion(commitTime);
    }
    return new MutationResult(version, proto.transformResults || []);
}
function fromWriteResults(protos, commitTime) {
    if (protos && protos.length > 0) {
        hardAssert(commitTime !== undefined);
        return protos.map(proto => fromWriteResult(proto, commitTime));
    }
    else {
        return [];
    }
}
function toFieldTransform(serializer, fieldTransform) {
    const transform = fieldTransform.transform;
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
function fromFieldTransform(serializer, proto) {
    let transform = null;
    if ('setToServerValue' in proto) {
        hardAssert(proto.setToServerValue === 'REQUEST_TIME');
        transform = new ServerTimestampTransform();
    }
    else if ('appendMissingElements' in proto) {
        const values = proto.appendMissingElements.values || [];
        transform = new ArrayUnionTransformOperation(values);
    }
    else if ('removeAllFromArray' in proto) {
        const values = proto.removeAllFromArray.values || [];
        transform = new ArrayRemoveTransformOperation(values);
    }
    else if ('increment' in proto) {
        transform = new NumericIncrementTransformOperation(serializer, proto.increment);
    }
    else {
        fail();
    }
    const fieldPath = FieldPath$1.fromServerFormat(proto.fieldPath);
    return new FieldTransform(fieldPath, transform);
}
function toDocumentsTarget(serializer, target) {
    return { documents: [toQueryPath(serializer, target.path)] };
}
function fromDocumentsTarget(documentsTarget) {
    const count = documentsTarget.documents.length;
    hardAssert(count === 1);
    const name = documentsTarget.documents[0];
    return queryToTarget(newQueryForPath(fromQueryPath(name)));
}
function toQueryTarget(serializer, target) {
    // Dissect the path into parent, collectionId, and optional key filter.
    const result = { structuredQuery: {} };
    const path = target.path;
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
    const where = toFilter(target.filters);
    if (where) {
        result.structuredQuery.where = where;
    }
    const orderBy = toOrder(target.orderBy);
    if (orderBy) {
        result.structuredQuery.orderBy = orderBy;
    }
    const limit = toInt32Proto(serializer, target.limit);
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
function convertQueryTargetToQuery(target) {
    let path = fromQueryPath(target.parent);
    const query = target.structuredQuery;
    const fromCount = query.from ? query.from.length : 0;
    let collectionGroup = null;
    if (fromCount > 0) {
        hardAssert(fromCount === 1);
        const from = query.from[0];
        if (from.allDescendants) {
            collectionGroup = from.collectionId;
        }
        else {
            path = path.child(from.collectionId);
        }
    }
    let filterBy = [];
    if (query.where) {
        filterBy = fromFilter(query.where);
    }
    let orderBy = [];
    if (query.orderBy) {
        orderBy = fromOrder(query.orderBy);
    }
    let limit = null;
    if (query.limit) {
        limit = fromInt32Proto(query.limit);
    }
    let startAt = null;
    if (query.startAt) {
        startAt = fromCursor(query.startAt);
    }
    let endAt = null;
    if (query.endAt) {
        endAt = fromCursor(query.endAt);
    }
    return newQuery(path, collectionGroup, orderBy, filterBy, limit, "F" /* First */, startAt, endAt);
}
function fromQueryTarget(target) {
    return queryToTarget(convertQueryTargetToQuery(target));
}
function toListenRequestLabels(serializer, targetData) {
    const value = toLabel(serializer, targetData.purpose);
    if (value == null) {
        return null;
    }
    else {
        return {
            'goog-listen-tags': value
        };
    }
}
function toLabel(serializer, purpose) {
    switch (purpose) {
        case 0 /* Listen */:
            return null;
        case 1 /* ExistenceFilterMismatch */:
            return 'existence-filter-mismatch';
        case 2 /* LimboResolution */:
            return 'limbo-document';
        default:
            return fail();
    }
}
function toTarget(serializer, targetData) {
    let result;
    const target = targetData.target;
    if (isDocumentTarget(target)) {
        result = { documents: toDocumentsTarget(serializer, target) };
    }
    else {
        result = { query: toQueryTarget(serializer, target) };
    }
    result.targetId = targetData.targetId;
    if (targetData.resumeToken.approximateByteSize() > 0) {
        result.resumeToken = toBytes(serializer, targetData.resumeToken);
    }
    else if (targetData.snapshotVersion.compareTo(SnapshotVersion.min()) > 0) {
        // TODO(wuandy): Consider removing above check because it is most likely true.
        // Right now, many tests depend on this behaviour though (leaving min() out
        // of serialization).
        result.readTime = toTimestamp(serializer, targetData.snapshotVersion.toTimestamp());
    }
    return result;
}
function toFilter(filters) {
    if (filters.length === 0) {
        return;
    }
    const protos = filters.map(filter => {
        return toUnaryOrFieldFilter(filter);
    });
    if (protos.length === 1) {
        return protos[0];
    }
    return { compositeFilter: { op: 'AND', filters: protos } };
}
function fromFilter(filter) {
    if (!filter) {
        return [];
    }
    else if (filter.unaryFilter !== undefined) {
        return [fromUnaryFilter(filter)];
    }
    else if (filter.fieldFilter !== undefined) {
        return [fromFieldFilter(filter)];
    }
    else if (filter.compositeFilter !== undefined) {
        return filter.compositeFilter
            .filters.map(f => fromFilter(f))
            .reduce((accum, current) => accum.concat(current));
    }
    else {
        return fail();
    }
}
function toOrder(orderBys) {
    if (orderBys.length === 0) {
        return;
    }
    return orderBys.map(order => toPropertyOrder(order));
}
function fromOrder(orderBys) {
    return orderBys.map(order => fromPropertyOrder(order));
}
function toCursor(cursor) {
    return {
        before: cursor.before,
        values: cursor.position
    };
}
function fromCursor(cursor) {
    const before = !!cursor.before;
    const position = cursor.values || [];
    return new Bound(position, before);
}
// visible for testing
function toDirection(dir) {
    return DIRECTIONS[dir];
}
// visible for testing
function fromDirection(dir) {
    switch (dir) {
        case 'ASCENDING':
            return "asc" /* ASCENDING */;
        case 'DESCENDING':
            return "desc" /* DESCENDING */;
        default:
            return undefined;
    }
}
// visible for testing
function toOperatorName(op) {
    return OPERATORS[op];
}
function fromOperatorName(op) {
    switch (op) {
        case 'EQUAL':
            return "==" /* EQUAL */;
        case 'NOT_EQUAL':
            return "!=" /* NOT_EQUAL */;
        case 'GREATER_THAN':
            return ">" /* GREATER_THAN */;
        case 'GREATER_THAN_OR_EQUAL':
            return ">=" /* GREATER_THAN_OR_EQUAL */;
        case 'LESS_THAN':
            return "<" /* LESS_THAN */;
        case 'LESS_THAN_OR_EQUAL':
            return "<=" /* LESS_THAN_OR_EQUAL */;
        case 'ARRAY_CONTAINS':
            return "array-contains" /* ARRAY_CONTAINS */;
        case 'IN':
            return "in" /* IN */;
        case 'NOT_IN':
            return "not-in" /* NOT_IN */;
        case 'ARRAY_CONTAINS_ANY':
            return "array-contains-any" /* ARRAY_CONTAINS_ANY */;
        case 'OPERATOR_UNSPECIFIED':
            return fail();
        default:
            return fail();
    }
}
function toFieldPathReference(path) {
    return { fieldPath: path.canonicalString() };
}
function fromFieldPathReference(fieldReference) {
    return FieldPath$1.fromServerFormat(fieldReference.fieldPath);
}
// visible for testing
function toPropertyOrder(orderBy) {
    return {
        field: toFieldPathReference(orderBy.field),
        direction: toDirection(orderBy.dir)
    };
}
function fromPropertyOrder(orderBy) {
    return new OrderBy(fromFieldPathReference(orderBy.field), fromDirection(orderBy.direction));
}
function fromFieldFilter(filter) {
    return FieldFilter.create(fromFieldPathReference(filter.fieldFilter.field), fromOperatorName(filter.fieldFilter.op), filter.fieldFilter.value);
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
function fromUnaryFilter(filter) {
    switch (filter.unaryFilter.op) {
        case 'IS_NAN':
            const nanField = fromFieldPathReference(filter.unaryFilter.field);
            return FieldFilter.create(nanField, "==" /* EQUAL */, {
                doubleValue: NaN
            });
        case 'IS_NULL':
            const nullField = fromFieldPathReference(filter.unaryFilter.field);
            return FieldFilter.create(nullField, "==" /* EQUAL */, {
                nullValue: 'NULL_VALUE'
            });
        case 'IS_NOT_NAN':
            const notNanField = fromFieldPathReference(filter.unaryFilter.field);
            return FieldFilter.create(notNanField, "!=" /* NOT_EQUAL */, {
                doubleValue: NaN
            });
        case 'IS_NOT_NULL':
            const notNullField = fromFieldPathReference(filter.unaryFilter.field);
            return FieldFilter.create(notNullField, "!=" /* NOT_EQUAL */, {
                nullValue: 'NULL_VALUE'
            });
        case 'OPERATOR_UNSPECIFIED':
            return fail();
        default:
            return fail();
    }
}
function toDocumentMask(fieldMask) {
    const canonicalFields = [];
    fieldMask.fields.forEach(field => canonicalFields.push(field.canonicalString()));
    return {
        fieldPaths: canonicalFields
    };
}
function fromDocumentMask(proto) {
    const paths = proto.fieldPaths || [];
    return new FieldMask(paths.map(path => FieldPath$1.fromServerFormat(path)));
}
function isValidResourceName(path) {
    // Resource names have at least 4 components (project ID, database ID)
    return (path.length >= 4 &&
        path.get(0) === 'projects' &&
        path.get(2) === 'databases');
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
 * An immutable set of metadata that the local store tracks for each target.
 */
class TargetData {
    constructor(
    /** The target being listened to. */
    target, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    targetId, 
    /** The purpose of the target. */
    purpose, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    sequenceNumber, 
    /** The latest snapshot version seen for this target. */
    snapshotVersion = SnapshotVersion.min(), 
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */
    lastLimboFreeSnapshotVersion = SnapshotVersion.min(), 
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
    resumeToken = ByteString.EMPTY_BYTE_STRING) {
        this.target = target;
        this.targetId = targetId;
        this.purpose = purpose;
        this.sequenceNumber = sequenceNumber;
        this.snapshotVersion = snapshotVersion;
        this.lastLimboFreeSnapshotVersion = lastLimboFreeSnapshotVersion;
        this.resumeToken = resumeToken;
    }
    /** Creates a new target data instance with an updated sequence number. */
    withSequenceNumber(sequenceNumber) {
        return new TargetData(this.target, this.targetId, this.purpose, sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */
    withResumeToken(resumeToken, snapshotVersion) {
        return new TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, snapshotVersion, this.lastLimboFreeSnapshotVersion, resumeToken);
    }
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */
    withLastLimboFreeSnapshotVersion(lastLimboFreeSnapshotVersion) {
        return new TargetData(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, lastLimboFreeSnapshotVersion, this.resumeToken);
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
/** Serializer for values stored in the LocalStore. */
class LocalSerializer {
    constructor(remoteSerializer) {
        this.remoteSerializer = remoteSerializer;
    }
}
/** Decodes a remote document from storage locally to a Document. */
function fromDbRemoteDocument(localSerializer, remoteDoc) {
    if (remoteDoc.document) {
        return fromDocument(localSerializer.remoteSerializer, remoteDoc.document, !!remoteDoc.hasCommittedMutations);
    }
    else if (remoteDoc.noDocument) {
        const key = DocumentKey.fromSegments(remoteDoc.noDocument.path);
        const version = fromDbTimestamp(remoteDoc.noDocument.readTime);
        const document = MutableDocument.newNoDocument(key, version);
        return remoteDoc.hasCommittedMutations
            ? document.setHasCommittedMutations()
            : document;
    }
    else if (remoteDoc.unknownDocument) {
        const key = DocumentKey.fromSegments(remoteDoc.unknownDocument.path);
        const version = fromDbTimestamp(remoteDoc.unknownDocument.version);
        return MutableDocument.newUnknownDocument(key, version);
    }
    else {
        return fail();
    }
}
/** Encodes a document for storage locally. */
function toDbRemoteDocument(localSerializer, document, readTime) {
    const dbReadTime = toDbTimestampKey(readTime);
    const parentPath = document.key.path.popLast().toArray();
    if (document.isFoundDocument()) {
        const doc = toDocument(localSerializer.remoteSerializer, document);
        const hasCommittedMutations = document.hasCommittedMutations;
        return new DbRemoteDocument(
        /* unknownDocument= */ null, 
        /* noDocument= */ null, doc, hasCommittedMutations, dbReadTime, parentPath);
    }
    else if (document.isNoDocument()) {
        const path = document.key.path.toArray();
        const readTime = toDbTimestamp(document.version);
        const hasCommittedMutations = document.hasCommittedMutations;
        return new DbRemoteDocument(
        /* unknownDocument= */ null, new DbNoDocument(path, readTime), 
        /* document= */ null, hasCommittedMutations, dbReadTime, parentPath);
    }
    else if (document.isUnknownDocument()) {
        const path = document.key.path.toArray();
        const readTime = toDbTimestamp(document.version);
        return new DbRemoteDocument(new DbUnknownDocument(path, readTime), 
        /* noDocument= */ null, 
        /* document= */ null, 
        /* hasCommittedMutations= */ true, dbReadTime, parentPath);
    }
    else {
        return fail();
    }
}
function toDbTimestampKey(snapshotVersion) {
    const timestamp = snapshotVersion.toTimestamp();
    return [timestamp.seconds, timestamp.nanoseconds];
}
function fromDbTimestampKey(dbTimestampKey) {
    const timestamp = new Timestamp(dbTimestampKey[0], dbTimestampKey[1]);
    return SnapshotVersion.fromTimestamp(timestamp);
}
function toDbTimestamp(snapshotVersion) {
    const timestamp = snapshotVersion.toTimestamp();
    return new DbTimestamp(timestamp.seconds, timestamp.nanoseconds);
}
function fromDbTimestamp(dbTimestamp) {
    const timestamp = new Timestamp(dbTimestamp.seconds, dbTimestamp.nanoseconds);
    return SnapshotVersion.fromTimestamp(timestamp);
}
/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
function toDbMutationBatch(localSerializer, userId, batch) {
    const serializedBaseMutations = batch.baseMutations.map(m => toMutation(localSerializer.remoteSerializer, m));
    const serializedMutations = batch.mutations.map(m => toMutation(localSerializer.remoteSerializer, m));
    return new DbMutationBatch(userId, batch.batchId, batch.localWriteTime.toMillis(), serializedBaseMutations, serializedMutations);
}
/** Decodes a DbMutationBatch into a MutationBatch */
function fromDbMutationBatch(localSerializer, dbBatch) {
    const baseMutations = (dbBatch.baseMutations || []).map(m => fromMutation(localSerializer.remoteSerializer, m));
    // Squash old transform mutations into existing patch or set mutations.
    // The replacement of representing `transforms` with `update_transforms`
    // on the SDK means that old `transform` mutations stored in IndexedDB need
    // to be updated to `update_transforms`.
    // TODO(b/174608374): Remove this code once we perform a schema migration.
    for (let i = 0; i < dbBatch.mutations.length - 1; ++i) {
        const currentMutation = dbBatch.mutations[i];
        const hasTransform = i + 1 < dbBatch.mutations.length &&
            dbBatch.mutations[i + 1].transform !== undefined;
        if (hasTransform) {
            const transformMutation = dbBatch.mutations[i + 1];
            currentMutation.updateTransforms = transformMutation.transform.fieldTransforms;
            dbBatch.mutations.splice(i + 1, 1);
            ++i;
        }
    }
    const mutations = dbBatch.mutations.map(m => fromMutation(localSerializer.remoteSerializer, m));
    const timestamp = Timestamp.fromMillis(dbBatch.localWriteTimeMs);
    return new MutationBatch(dbBatch.batchId, timestamp, baseMutations, mutations);
}
/** Decodes a DbTarget into TargetData */
function fromDbTarget(dbTarget) {
    const version = fromDbTimestamp(dbTarget.readTime);
    const lastLimboFreeSnapshotVersion = dbTarget.lastLimboFreeSnapshotVersion !== undefined
        ? fromDbTimestamp(dbTarget.lastLimboFreeSnapshotVersion)
        : SnapshotVersion.min();
    let target;
    if (isDocumentQuery(dbTarget.query)) {
        target = fromDocumentsTarget(dbTarget.query);
    }
    else {
        target = fromQueryTarget(dbTarget.query);
    }
    return new TargetData(target, dbTarget.targetId, 0 /* Listen */, dbTarget.lastListenSequenceNumber, version, lastLimboFreeSnapshotVersion, ByteString.fromBase64String(dbTarget.resumeToken));
}
/** Encodes TargetData into a DbTarget for storage locally. */
function toDbTarget(localSerializer, targetData) {
    const dbTimestamp = toDbTimestamp(targetData.snapshotVersion);
    const dbLastLimboFreeTimestamp = toDbTimestamp(targetData.lastLimboFreeSnapshotVersion);
    let queryProto;
    if (isDocumentTarget(targetData.target)) {
        queryProto = toDocumentsTarget(localSerializer.remoteSerializer, targetData.target);
    }
    else {
        queryProto = toQueryTarget(localSerializer.remoteSerializer, targetData.target);
    }
    // We can't store the resumeToken as a ByteString in IndexedDb, so we
    // convert it to a base64 string for storage.
    const resumeToken = targetData.resumeToken.toBase64();
    // lastListenSequenceNumber is always 0 until we do real GC.
    return new DbTarget(targetData.targetId, canonifyTarget(targetData.target), dbTimestamp, resumeToken, targetData.sequenceNumber, dbLastLimboFreeTimestamp, queryProto);
}
/**
 * A helper function for figuring out what kind of query has been stored.
 */
function isDocumentQuery(dbQuery) {
    return dbQuery.documents !== undefined;
}
/** Encodes a DbBundle to a BundleMetadata object. */
function fromDbBundle(dbBundle) {
    return {
        id: dbBundle.bundleId,
        createTime: fromDbTimestamp(dbBundle.createTime),
        version: dbBundle.version
    };
}
/** Encodes a BundleMetadata to a DbBundle. */
function toDbBundle(metadata) {
    return {
        bundleId: metadata.id,
        createTime: toDbTimestamp(fromVersion(metadata.createTime)),
        version: metadata.version
    };
}
/** Encodes a DbNamedQuery to a NamedQuery. */
function fromDbNamedQuery(dbNamedQuery) {
    return {
        name: dbNamedQuery.name,
        query: fromBundledQuery(dbNamedQuery.bundledQuery),
        readTime: fromDbTimestamp(dbNamedQuery.readTime)
    };
}
/** Encodes a NamedQuery from a bundle proto to a DbNamedQuery. */
function toDbNamedQuery(query) {
    return {
        name: query.name,
        readTime: toDbTimestamp(fromVersion(query.readTime)),
        bundledQuery: query.bundledQuery
    };
}
/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */
function fromBundledQuery(bundledQuery) {
    const query = convertQueryTargetToQuery({
        parent: bundledQuery.parent,
        structuredQuery: bundledQuery.structuredQuery
    });
    if (bundledQuery.limitType === 'LAST') {
        return queryWithLimit(query, query.limit, "L" /* Last */);
    }
    return query;
}
/** Encodes a NamedQuery proto object to a NamedQuery model object. */
function fromProtoNamedQuery(namedQuery) {
    return {
        name: namedQuery.name,
        query: fromBundledQuery(namedQuery.bundledQuery),
        readTime: fromVersion(namedQuery.readTime)
    };
}
/** Decodes a BundleMetadata proto into a BundleMetadata object. */
function fromBundleMetadata(metadata) {
    return {
        id: metadata.id,
        version: metadata.version,
        createTime: fromVersion(metadata.createTime)
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
class IndexedDbBundleCache {
    getBundleMetadata(transaction, bundleId) {
        return bundlesStore(transaction)
            .get(bundleId)
            .next(bundle => {
            if (bundle) {
                return fromDbBundle(bundle);
            }
            return undefined;
        });
    }
    saveBundleMetadata(transaction, bundleMetadata) {
        return bundlesStore(transaction).put(toDbBundle(bundleMetadata));
    }
    getNamedQuery(transaction, queryName) {
        return namedQueriesStore(transaction)
            .get(queryName)
            .next(query => {
            if (query) {
                return fromDbNamedQuery(query);
            }
            return undefined;
        });
    }
    saveNamedQuery(transaction, query) {
        return namedQueriesStore(transaction).put(toDbNamedQuery(query));
    }
}
/**
 * Helper to get a typed SimpleDbStore for the bundles object store.
 */
function bundlesStore(txn) {
    return getStore(txn, DbBundle.store);
}
/**
 * Helper to get a typed SimpleDbStore for the namedQueries object store.
 */
function namedQueriesStore(txn) {
    return getStore(txn, DbNamedQuery.store);
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
 */
class MemoryIndexManager {
    constructor() {
        this.collectionParentIndex = new MemoryCollectionParentIndex();
    }
    addToCollectionParentIndex(transaction, collectionPath) {
        this.collectionParentIndex.add(collectionPath);
        return PersistencePromise.resolve();
    }
    getCollectionParents(transaction, collectionId) {
        return PersistencePromise.resolve(this.collectionParentIndex.getEntries(collectionId));
    }
}
/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */
class MemoryCollectionParentIndex {
    constructor() {
        this.index = {};
    }
    // Returns false if the entry already existed.
    add(collectionPath) {
        const collectionId = collectionPath.lastSegment();
        const parentPath = collectionPath.popLast();
        const existingParents = this.index[collectionId] ||
            new SortedSet(ResourcePath.comparator);
        const added = !existingParents.has(parentPath);
        this.index[collectionId] = existingParents.add(parentPath);
        return added;
    }
    has(collectionPath) {
        const collectionId = collectionPath.lastSegment();
        const parentPath = collectionPath.popLast();
        const existingParents = this.index[collectionId];
        return existingParents && existingParents.has(parentPath);
    }
    getEntries(collectionId) {
        const parentPaths = this.index[collectionId] ||
            new SortedSet(ResourcePath.comparator);
        return parentPaths.toArray();
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
/**
 * A persisted implementation of IndexManager.
 */
class IndexedDbIndexManager {
    constructor() {
        /**
         * An in-memory copy of the index entries we've already written since the SDK
         * launched. Used to avoid re-writing the same entry repeatedly.
         *
         * This is *NOT* a complete cache of what's in persistence and so can never be used to
         * satisfy reads.
         */
        this.collectionParentsCache = new MemoryCollectionParentIndex();
    }
    /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */
    addToCollectionParentIndex(transaction, collectionPath) {
        if (!this.collectionParentsCache.has(collectionPath)) {
            const collectionId = collectionPath.lastSegment();
            const parentPath = collectionPath.popLast();
            transaction.addOnCommittedListener(() => {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                this.collectionParentsCache.add(collectionPath);
            });
            const collectionParent = {
                collectionId,
                parent: encodeResourcePath(parentPath)
            };
            return collectionParentsStore(transaction).put(collectionParent);
        }
        return PersistencePromise.resolve();
    }
    getCollectionParents(transaction, collectionId) {
        const parentPaths = [];
        const range = IDBKeyRange.bound([collectionId, ''], [immediateSuccessor(collectionId), ''], 
        /*lowerOpen=*/ false, 
        /*upperOpen=*/ true);
        return collectionParentsStore(transaction)
            .loadAll(range)
            .next(entries => {
            for (const entry of entries) {
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                if (entry.collectionId !== collectionId) {
                    break;
                }
                parentPaths.push(decodeResourcePath(entry.parent));
            }
            return parentPaths;
        });
    }
}
/**
 * Helper to get a typed SimpleDbStore for the collectionParents
 * document store.
 */
function collectionParentsStore(txn) {
    return getStore(txn, DbCollectionParent.store);
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
 * Delete a mutation batch and the associated document mutations.
 * @returns A PersistencePromise of the document mutations that were removed.
 */
function removeMutationBatch(txn, userId, batch) {
    const mutationStore = txn.store(DbMutationBatch.store);
    const indexTxn = txn.store(DbDocumentMutation.store);
    const promises = [];
    const range = IDBKeyRange.only(batch.batchId);
    let numDeleted = 0;
    const removePromise = mutationStore.iterate({ range }, (key, value, control) => {
        numDeleted++;
        return control.delete();
    });
    promises.push(removePromise.next(() => {
        hardAssert(numDeleted === 1);
    }));
    const removedDocuments = [];
    for (const mutation of batch.mutations) {
        const indexKey = DbDocumentMutation.key(userId, mutation.key.path, batch.batchId);
        promises.push(indexTxn.delete(indexKey));
        removedDocuments.push(mutation.key);
    }
    return PersistencePromise.waitFor(promises).next(() => removedDocuments);
}
/**
 * Returns an approximate size for the given document.
 */
function dbDocumentSize(doc) {
    if (!doc) {
        return 0;
    }
    let value;
    if (doc.document) {
        value = doc.document;
    }
    else if (doc.unknownDocument) {
        value = doc.unknownDocument;
    }
    else if (doc.noDocument) {
        value = doc.noDocument;
    }
    else {
        throw fail();
    }
    return JSON.stringify(value).length;
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
/** A mutation queue for a specific user, backed by IndexedDB. */
class IndexedDbMutationQueue {
    constructor(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    userId, serializer, indexManager, referenceDelegate) {
        this.userId = userId;
        this.serializer = serializer;
        this.indexManager = indexManager;
        this.referenceDelegate = referenceDelegate;
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
        this.documentKeysByBatchId = {};
    }
    /**
     * Creates a new mutation queue for the given user.
     * @param user - The user for which to create a mutation queue.
     * @param serializer - The serializer to use when persisting to IndexedDb.
     */
    static forUser(user, serializer, indexManager, referenceDelegate) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        hardAssert(user.uid !== '');
        const userId = user.isAuthenticated() ? user.uid : '';
        return new IndexedDbMutationQueue(userId, serializer, indexManager, referenceDelegate);
    }
    checkEmpty(transaction) {
        let empty = true;
        const range = IDBKeyRange.bound([this.userId, Number.NEGATIVE_INFINITY], [this.userId, Number.POSITIVE_INFINITY]);
        return mutationsStore(transaction)
            .iterate({ index: DbMutationBatch.userMutationsIndex, range }, (key, value, control) => {
            empty = false;
            control.done();
        })
            .next(() => empty);
    }
    addMutationBatch(transaction, localWriteTime, baseMutations, mutations) {
        const documentStore = documentMutationsStore(transaction);
        const mutationStore = mutationsStore(transaction);
        // The IndexedDb implementation in Chrome (and Firefox) does not handle
        // compound indices that include auto-generated keys correctly. To ensure
        // that the index entry is added correctly in all browsers, we perform two
        // writes: The first write is used to retrieve the next auto-generated Batch
        // ID, and the second write populates the index and stores the actual
        // mutation batch.
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
        // We write an empty object to obtain key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return mutationStore.add({}).next(batchId => {
            hardAssert(typeof batchId === 'number');
            const batch = new MutationBatch(batchId, localWriteTime, baseMutations, mutations);
            const dbBatch = toDbMutationBatch(this.serializer, this.userId, batch);
            const promises = [];
            let collectionParents = new SortedSet((l, r) => primitiveComparator(l.canonicalString(), r.canonicalString()));
            for (const mutation of mutations) {
                const indexKey = DbDocumentMutation.key(this.userId, mutation.key.path, batchId);
                collectionParents = collectionParents.add(mutation.key.path.popLast());
                promises.push(mutationStore.put(dbBatch));
                promises.push(documentStore.put(indexKey, DbDocumentMutation.PLACEHOLDER));
            }
            collectionParents.forEach(parent => {
                promises.push(this.indexManager.addToCollectionParentIndex(transaction, parent));
            });
            transaction.addOnCommittedListener(() => {
                this.documentKeysByBatchId[batchId] = batch.keys();
            });
            return PersistencePromise.waitFor(promises).next(() => batch);
        });
    }
    lookupMutationBatch(transaction, batchId) {
        return mutationsStore(transaction)
            .get(batchId)
            .next(dbBatch => {
            if (dbBatch) {
                hardAssert(dbBatch.userId === this.userId);
                return fromDbMutationBatch(this.serializer, dbBatch);
            }
            return null;
        });
    }
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    lookupMutationKeys(transaction, batchId) {
        if (this.documentKeysByBatchId[batchId]) {
            return PersistencePromise.resolve(this.documentKeysByBatchId[batchId]);
        }
        else {
            return this.lookupMutationBatch(transaction, batchId).next(batch => {
                if (batch) {
                    const keys = batch.keys();
                    this.documentKeysByBatchId[batchId] = keys;
                    return keys;
                }
                else {
                    return null;
                }
            });
        }
    }
    getNextMutationBatchAfterBatchId(transaction, batchId) {
        const nextBatchId = batchId + 1;
        const range = IDBKeyRange.lowerBound([this.userId, nextBatchId]);
        let foundBatch = null;
        return mutationsStore(transaction)
            .iterate({ index: DbMutationBatch.userMutationsIndex, range }, (key, dbBatch, control) => {
            if (dbBatch.userId === this.userId) {
                hardAssert(dbBatch.batchId >= nextBatchId);
                foundBatch = fromDbMutationBatch(this.serializer, dbBatch);
            }
            control.done();
        })
            .next(() => foundBatch);
    }
    getHighestUnacknowledgedBatchId(transaction) {
        const range = IDBKeyRange.upperBound([
            this.userId,
            Number.POSITIVE_INFINITY
        ]);
        let batchId = BATCHID_UNKNOWN;
        return mutationsStore(transaction)
            .iterate({ index: DbMutationBatch.userMutationsIndex, range, reverse: true }, (key, dbBatch, control) => {
            batchId = dbBatch.batchId;
            control.done();
        })
            .next(() => batchId);
    }
    getAllMutationBatches(transaction) {
        const range = IDBKeyRange.bound([this.userId, BATCHID_UNKNOWN], [this.userId, Number.POSITIVE_INFINITY]);
        return mutationsStore(transaction)
            .loadAll(DbMutationBatch.userMutationsIndex, range)
            .next(dbBatches => dbBatches.map(dbBatch => fromDbMutationBatch(this.serializer, dbBatch)));
    }
    getAllMutationBatchesAffectingDocumentKey(transaction, documentKey) {
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
        const indexPrefix = DbDocumentMutation.prefixForPath(this.userId, documentKey.path);
        const indexStart = IDBKeyRange.lowerBound(indexPrefix);
        const results = [];
        return documentMutationsStore(transaction)
            .iterate({ range: indexStart }, (indexKey, _, control) => {
            const [userID, encodedPath, batchId] = indexKey;
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
            const path = decodeResourcePath(encodedPath);
            if (userID !== this.userId || !documentKey.path.isEqual(path)) {
                control.done();
                return;
            }
            // Look up the mutation batch in the store.
            return mutationsStore(transaction)
                .get(batchId)
                .next(mutation => {
                if (!mutation) {
                    throw fail();
                }
                hardAssert(mutation.userId === this.userId);
                results.push(fromDbMutationBatch(this.serializer, mutation));
            });
        })
            .next(() => results);
    }
    getAllMutationBatchesAffectingDocumentKeys(transaction, documentKeys) {
        let uniqueBatchIDs = new SortedSet(primitiveComparator);
        const promises = [];
        documentKeys.forEach(documentKey => {
            const indexStart = DbDocumentMutation.prefixForPath(this.userId, documentKey.path);
            const range = IDBKeyRange.lowerBound(indexStart);
            const promise = documentMutationsStore(transaction).iterate({ range }, (indexKey, _, control) => {
                const [userID, encodedPath, batchID] = indexKey;
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                const path = decodeResourcePath(encodedPath);
                if (userID !== this.userId || !documentKey.path.isEqual(path)) {
                    control.done();
                    return;
                }
                uniqueBatchIDs = uniqueBatchIDs.add(batchID);
            });
            promises.push(promise);
        });
        return PersistencePromise.waitFor(promises).next(() => this.lookupMutationBatches(transaction, uniqueBatchIDs));
    }
    getAllMutationBatchesAffectingQuery(transaction, query) {
        const queryPath = query.path;
        const immediateChildrenLength = queryPath.length + 1;
        // TODO(mcg): Actually implement a single-collection query
        //
        // This is actually executing an ancestor query, traversing the whole
        // subtree below the collection which can be horrifically inefficient for
        // some structures. The right way to solve this is to implement the full
        // value index, but that's not in the cards in the near future so this is
        // the best we can do for the moment.
        //
        // Since we don't yet index the actual properties in the mutations, our
        // current approach is to just return all mutation batches that affect
        // documents in the collection being queried.
        const indexPrefix = DbDocumentMutation.prefixForPath(this.userId, queryPath);
        const indexStart = IDBKeyRange.lowerBound(indexPrefix);
        // Collect up unique batchIDs encountered during a scan of the index. Use a
        // SortedSet to accumulate batch IDs so they can be traversed in order in a
        // scan of the main table.
        let uniqueBatchIDs = new SortedSet(primitiveComparator);
        return documentMutationsStore(transaction)
            .iterate({ range: indexStart }, (indexKey, _, control) => {
            const [userID, encodedPath, batchID] = indexKey;
            const path = decodeResourcePath(encodedPath);
            if (userID !== this.userId || !queryPath.isPrefixOf(path)) {
                control.done();
                return;
            }
            // Rows with document keys more than one segment longer than the
            // query path can't be matches. For example, a query on 'rooms'
            // can't match the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            if (path.length !== immediateChildrenLength) {
                return;
            }
            uniqueBatchIDs = uniqueBatchIDs.add(batchID);
        })
            .next(() => this.lookupMutationBatches(transaction, uniqueBatchIDs));
    }
    lookupMutationBatches(transaction, batchIDs) {
        const results = [];
        const promises = [];
        // TODO(rockwood): Implement this using iterate.
        batchIDs.forEach(batchId => {
            promises.push(mutationsStore(transaction)
                .get(batchId)
                .next(mutation => {
                if (mutation === null) {
                    throw fail();
                }
                hardAssert(mutation.userId === this.userId);
                results.push(fromDbMutationBatch(this.serializer, mutation));
            }));
        });
        return PersistencePromise.waitFor(promises).next(() => results);
    }
    removeMutationBatch(transaction, batch) {
        return removeMutationBatch(transaction.simpleDbTransaction, this.userId, batch).next(removedDocuments => {
            transaction.addOnCommittedListener(() => {
                this.removeCachedMutationKeys(batch.batchId);
            });
            return PersistencePromise.forEach(removedDocuments, (key) => {
                return this.referenceDelegate.markPotentiallyOrphaned(transaction, key);
            });
        });
    }
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    removeCachedMutationKeys(batchId) {
        delete this.documentKeysByBatchId[batchId];
    }
    performConsistencyCheck(txn) {
        return this.checkEmpty(txn).next(empty => {
            if (!empty) {
                return PersistencePromise.resolve();
            }
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
            const startRange = IDBKeyRange.lowerBound(DbDocumentMutation.prefixForUser(this.userId));
            const danglingMutationReferences = [];
            return documentMutationsStore(txn)
                .iterate({ range: startRange }, (key, _, control) => {
                const userID = key[0];
                if (userID !== this.userId) {
                    control.done();
                    return;
                }
                else {
                    const path = decodeResourcePath(key[1]);
                    danglingMutationReferences.push(path);
                }
            })
                .next(() => {
                hardAssert(danglingMutationReferences.length === 0);
            });
        });
    }
    containsKey(txn, key) {
        return mutationQueueContainsKey(txn, this.userId, key);
    }
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    getMutationQueueMetadata(transaction) {
        return mutationQueuesStore(transaction)
            .get(this.userId)
            .next((metadata) => {
            return (metadata ||
                new DbMutationQueue(this.userId, BATCHID_UNKNOWN, 
                /*lastStreamToken=*/ ''));
        });
    }
}
/**
 * @returns true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */
function mutationQueueContainsKey(txn, userId, key) {
    const indexKey = DbDocumentMutation.prefixForPath(userId, key.path);
    const encodedPath = indexKey[1];
    const startRange = IDBKeyRange.lowerBound(indexKey);
    let containsKey = false;
    return documentMutationsStore(txn)
        .iterate({ range: startRange, keysOnly: true }, (key, value, control) => {
        const [userID, keyPath, /*batchID*/ _] = key;
        if (userID === userId && keyPath === encodedPath) {
            containsKey = true;
        }
        control.done();
    })
        .next(() => containsKey);
}
/** Returns true if any mutation queue contains the given document. */
function mutationQueuesContainKey(txn, docKey) {
    let found = false;
    return mutationQueuesStore(txn)
        .iterateSerial(userId => {
        return mutationQueueContainsKey(txn, userId, docKey).next(containsKey => {
            if (containsKey) {
                found = true;
            }
            return PersistencePromise.resolve(!containsKey);
        });
    })
        .next(() => found);
}
/**
 * Helper to get a typed SimpleDbStore for the mutations object store.
 */
function mutationsStore(txn) {
    return getStore(txn, DbMutationBatch.store);
}
/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */
function documentMutationsStore(txn) {
    return getStore(txn, DbDocumentMutation.store);
}
/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */
function mutationQueuesStore(txn) {
    return getStore(txn, DbMutationQueue.store);
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
const OFFSET = 2;
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
 */
class TargetIdGenerator {
    constructor(lastId) {
        this.lastId = lastId;
    }
    next() {
        this.lastId += OFFSET;
        return this.lastId;
    }
    static forTargetCache() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new TargetIdGenerator(2 - OFFSET);
    }
    static forSyncEngine() {
        // Sync engine assigns target IDs for limbo document detection.
        return new TargetIdGenerator(1 - OFFSET);
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
class IndexedDbTargetCache {
    constructor(referenceDelegate, serializer) {
        this.referenceDelegate = referenceDelegate;
        this.serializer = serializer;
    }
    // PORTING NOTE: We don't cache global metadata for the target cache, since
    // some of it (in particular `highestTargetId`) can be modified by secondary
    // tabs. We could perhaps be more granular (and e.g. still cache
    // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
    // to IndexedDb whenever we need to read metadata. We can revisit if it turns
    // out to have a meaningful performance impact.
    allocateTargetId(transaction) {
        return this.retrieveMetadata(transaction).next(metadata => {
            const targetIdGenerator = new TargetIdGenerator(metadata.highestTargetId);
            metadata.highestTargetId = targetIdGenerator.next();
            return this.saveMetadata(transaction, metadata).next(() => metadata.highestTargetId);
        });
    }
    getLastRemoteSnapshotVersion(transaction) {
        return this.retrieveMetadata(transaction).next(metadata => {
            return SnapshotVersion.fromTimestamp(new Timestamp(metadata.lastRemoteSnapshotVersion.seconds, metadata.lastRemoteSnapshotVersion.nanoseconds));
        });
    }
    getHighestSequenceNumber(transaction) {
        return this.retrieveMetadata(transaction).next(targetGlobal => targetGlobal.highestListenSequenceNumber);
    }
    setTargetsMetadata(transaction, highestListenSequenceNumber, lastRemoteSnapshotVersion) {
        return this.retrieveMetadata(transaction).next(metadata => {
            metadata.highestListenSequenceNumber = highestListenSequenceNumber;
            if (lastRemoteSnapshotVersion) {
                metadata.lastRemoteSnapshotVersion = lastRemoteSnapshotVersion.toTimestamp();
            }
            if (highestListenSequenceNumber > metadata.highestListenSequenceNumber) {
                metadata.highestListenSequenceNumber = highestListenSequenceNumber;
            }
            return this.saveMetadata(transaction, metadata);
        });
    }
    addTargetData(transaction, targetData) {
        return this.saveTargetData(transaction, targetData).next(() => {
            return this.retrieveMetadata(transaction).next(metadata => {
                metadata.targetCount += 1;
                this.updateMetadataFromTargetData(targetData, metadata);
                return this.saveMetadata(transaction, metadata);
            });
        });
    }
    updateTargetData(transaction, targetData) {
        return this.saveTargetData(transaction, targetData);
    }
    removeTargetData(transaction, targetData) {
        return this.removeMatchingKeysForTargetId(transaction, targetData.targetId)
            .next(() => targetsStore(transaction).delete(targetData.targetId))
            .next(() => this.retrieveMetadata(transaction))
            .next(metadata => {
            hardAssert(metadata.targetCount > 0);
            metadata.targetCount -= 1;
            return this.saveMetadata(transaction, metadata);
        });
    }
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    removeTargets(txn, upperBound, activeTargetIds) {
        let count = 0;
        const promises = [];
        return targetsStore(txn)
            .iterate((key, value) => {
            const targetData = fromDbTarget(value);
            if (targetData.sequenceNumber <= upperBound &&
                activeTargetIds.get(targetData.targetId) === null) {
                count++;
                promises.push(this.removeTargetData(txn, targetData));
            }
        })
            .next(() => PersistencePromise.waitFor(promises))
            .next(() => count);
    }
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    forEachTarget(txn, f) {
        return targetsStore(txn).iterate((key, value) => {
            const targetData = fromDbTarget(value);
            f(targetData);
        });
    }
    retrieveMetadata(transaction) {
        return globalTargetStore(transaction)
            .get(DbTargetGlobal.key)
            .next(metadata => {
            hardAssert(metadata !== null);
            return metadata;
        });
    }
    saveMetadata(transaction, metadata) {
        return globalTargetStore(transaction).put(DbTargetGlobal.key, metadata);
    }
    saveTargetData(transaction, targetData) {
        return targetsStore(transaction).put(toDbTarget(this.serializer, targetData));
    }
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    updateMetadataFromTargetData(targetData, metadata) {
        let updated = false;
        if (targetData.targetId > metadata.highestTargetId) {
            metadata.highestTargetId = targetData.targetId;
            updated = true;
        }
        if (targetData.sequenceNumber > metadata.highestListenSequenceNumber) {
            metadata.highestListenSequenceNumber = targetData.sequenceNumber;
            updated = true;
        }
        return updated;
    }
    getTargetCount(transaction) {
        return this.retrieveMetadata(transaction).next(metadata => metadata.targetCount);
    }
    getTargetData(transaction, target) {
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficient.
        const canonicalId = canonifyTarget(target);
        const range = IDBKeyRange.bound([canonicalId, Number.NEGATIVE_INFINITY], [canonicalId, Number.POSITIVE_INFINITY]);
        let result = null;
        return targetsStore(transaction)
            .iterate({ range, index: DbTarget.queryTargetsIndexName }, (key, value, control) => {
            const found = fromDbTarget(value);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
            if (targetEquals(target, found.target)) {
                result = found;
                control.done();
            }
        })
            .next(() => result);
    }
    addMatchingKeys(txn, keys, targetId) {
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
        const promises = [];
        const store = documentTargetStore(txn);
        keys.forEach(key => {
            const path = encodeResourcePath(key.path);
            promises.push(store.put(new DbTargetDocument(targetId, path)));
            promises.push(this.referenceDelegate.addReference(txn, targetId, key));
        });
        return PersistencePromise.waitFor(promises);
    }
    removeMatchingKeys(txn, keys, targetId) {
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
        const store = documentTargetStore(txn);
        return PersistencePromise.forEach(keys, (key) => {
            const path = encodeResourcePath(key.path);
            return PersistencePromise.waitFor([
                store.delete([targetId, path]),
                this.referenceDelegate.removeReference(txn, targetId, key)
            ]);
        });
    }
    removeMatchingKeysForTargetId(txn, targetId) {
        const store = documentTargetStore(txn);
        const range = IDBKeyRange.bound([targetId], [targetId + 1], 
        /*lowerOpen=*/ false, 
        /*upperOpen=*/ true);
        return store.delete(range);
    }
    getMatchingKeysForTargetId(txn, targetId) {
        const range = IDBKeyRange.bound([targetId], [targetId + 1], 
        /*lowerOpen=*/ false, 
        /*upperOpen=*/ true);
        const store = documentTargetStore(txn);
        let result = documentKeySet();
        return store
            .iterate({ range, keysOnly: true }, (key, _, control) => {
            const path = decodeResourcePath(key[1]);
            const docKey = new DocumentKey(path);
            result = result.add(docKey);
        })
            .next(() => result);
    }
    containsKey(txn, key) {
        const path = encodeResourcePath(key.path);
        const range = IDBKeyRange.bound([path], [immediateSuccessor(path)], 
        /*lowerOpen=*/ false, 
        /*upperOpen=*/ true);
        let count = 0;
        return documentTargetStore(txn)
            .iterate({
            index: DbTargetDocument.documentTargetsIndex,
            keysOnly: true,
            range
        }, ([targetId, path], _, control) => {
            // Having a sentinel row for a document does not count as containing that document;
            // For the target cache, containing the document means the document is part of some
            // target.
            if (targetId !== 0) {
                count++;
                control.done();
            }
        })
            .next(() => count > 0);
    }
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId - The target ID of the TargetData entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    getTargetDataForTarget(transaction, targetId) {
        return targetsStore(transaction)
            .get(targetId)
            .next(found => {
            if (found) {
                return fromDbTarget(found);
            }
            else {
                return null;
            }
        });
    }
}
/**
 * Helper to get a typed SimpleDbStore for the queries object store.
 */
function targetsStore(txn) {
    return getStore(txn, DbTarget.store);
}
/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */
function globalTargetStore(txn) {
    return getStore(txn, DbTargetGlobal.store);
}
/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */
function documentTargetStore(txn) {
    return getStore(txn, DbTargetDocument.store);
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
 */
async function ignoreIfPrimaryLeaseLoss(err) {
    if (err.code === Code.FAILED_PRECONDITION &&
        err.message === PRIMARY_LEASE_LOST_ERROR_MSG) {
        logDebug('LocalStore', 'Unexpectedly lost primary lease');
    }
    else {
        throw err;
    }
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
const GC_DID_NOT_RUN = {
    didRun: false,
    sequenceNumbersCollected: 0,
    targetsRemoved: 0,
    documentsRemoved: 0
};
const LRU_COLLECTION_DISABLED = -1;
const LRU_DEFAULT_CACHE_SIZE_BYTES = 40 * 1024 * 1024;
class LruParams {
    constructor(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    cacheSizeCollectionThreshold, 
    // The percentage of sequence numbers that we will attempt to collect
    percentileToCollect, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    maximumSequenceNumbersToCollect) {
        this.cacheSizeCollectionThreshold = cacheSizeCollectionThreshold;
        this.percentileToCollect = percentileToCollect;
        this.maximumSequenceNumbersToCollect = maximumSequenceNumbersToCollect;
    }
    static withCacheSize(cacheSize) {
        return new LruParams(cacheSize, LruParams.DEFAULT_COLLECTION_PERCENTILE, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
    }
}
LruParams.DEFAULT_COLLECTION_PERCENTILE = 10;
LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1000;
LruParams.DEFAULT = new LruParams(LRU_DEFAULT_CACHE_SIZE_BYTES, LruParams.DEFAULT_COLLECTION_PERCENTILE, LruParams.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
LruParams.DISABLED = new LruParams(LRU_COLLECTION_DISABLED, 0, 0);

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
const LOG_TAG$e = 'LruGarbageCollector';
const LRU_MINIMUM_CACHE_SIZE_BYTES = 1 * 1024 * 1024;
/** How long we wait to try running LRU GC after SDK initialization. */
const INITIAL_GC_DELAY_MS = 1 * 60 * 1000;
/** Minimum amount of time between GC checks, after the first one. */
const REGULAR_GC_DELAY_MS = 5 * 60 * 1000;
function bufferEntryComparator([aSequence, aIndex], [bSequence, bIndex]) {
    const seqCmp = primitiveComparator(aSequence, bSequence);
    if (seqCmp === 0) {
        // This order doesn't matter, but we can bias against churn by sorting
        // entries created earlier as less than newer entries.
        return primitiveComparator(aIndex, bIndex);
    }
    else {
        return seqCmp;
    }
}
/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */
class RollingSequenceNumberBuffer {
    constructor(maxElements) {
        this.maxElements = maxElements;
        this.buffer = new SortedSet(bufferEntryComparator);
        this.previousIndex = 0;
    }
    nextIndex() {
        return ++this.previousIndex;
    }
    addElement(sequenceNumber) {
        const entry = [sequenceNumber, this.nextIndex()];
        if (this.buffer.size < this.maxElements) {
            this.buffer = this.buffer.add(entry);
        }
        else {
            const highestValue = this.buffer.last();
            if (bufferEntryComparator(entry, highestValue) < 0) {
                this.buffer = this.buffer.delete(highestValue).add(entry);
            }
        }
    }
    get maxValue() {
        // Guaranteed to be non-empty. If we decide we are not collecting any
        // sequence numbers, nthSequenceNumber below short-circuits. If we have
        // decided that we are collecting n sequence numbers, it's because n is some
        // percentage of the existing sequence numbers. That means we should never
        // be in a situation where we are collecting sequence numbers but don't
        // actually have any.
        return this.buffer.last()[0];
    }
}
/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */
class LruScheduler {
    constructor(garbageCollector, asyncQueue) {
        this.garbageCollector = garbageCollector;
        this.asyncQueue = asyncQueue;
        this.hasRun = false;
        this.gcTask = null;
    }
    start(localStore) {
        if (this.garbageCollector.params.cacheSizeCollectionThreshold !==
            LRU_COLLECTION_DISABLED) {
            this.scheduleGC(localStore);
        }
    }
    stop() {
        if (this.gcTask) {
            this.gcTask.cancel();
            this.gcTask = null;
        }
    }
    get started() {
        return this.gcTask !== null;
    }
    scheduleGC(localStore) {
        const delay = this.hasRun ? REGULAR_GC_DELAY_MS : INITIAL_GC_DELAY_MS;
        logDebug('LruGarbageCollector', `Garbage collection scheduled in ${delay}ms`);
        this.gcTask = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection" /* LruGarbageCollection */, delay, async () => {
            this.gcTask = null;
            this.hasRun = true;
            try {
                await localStore.collectGarbage(this.garbageCollector);
            }
            catch (e) {
                if (isIndexedDbTransactionError(e)) {
                    logDebug(LOG_TAG$e, 'Ignoring IndexedDB error during garbage collection: ', e);
                }
                else {
                    await ignoreIfPrimaryLeaseLoss(e);
                }
            }
            await this.scheduleGC(localStore);
        });
    }
}
/** Implements the steps for LRU garbage collection. */
class LruGarbageCollectorImpl {
    constructor(delegate, params) {
        this.delegate = delegate;
        this.params = params;
    }
    calculateTargetCount(txn, percentile) {
        return this.delegate.getSequenceNumberCount(txn).next(targetCount => {
            return Math.floor((percentile / 100.0) * targetCount);
        });
    }
    nthSequenceNumber(txn, n) {
        if (n === 0) {
            return PersistencePromise.resolve(ListenSequence.INVALID);
        }
        const buffer = new RollingSequenceNumberBuffer(n);
        return this.delegate
            .forEachTarget(txn, target => buffer.addElement(target.sequenceNumber))
            .next(() => {
            return this.delegate.forEachOrphanedDocumentSequenceNumber(txn, sequenceNumber => buffer.addElement(sequenceNumber));
        })
            .next(() => buffer.maxValue);
    }
    removeTargets(txn, upperBound, activeTargetIds) {
        return this.delegate.removeTargets(txn, upperBound, activeTargetIds);
    }
    removeOrphanedDocuments(txn, upperBound) {
        return this.delegate.removeOrphanedDocuments(txn, upperBound);
    }
    collect(txn, activeTargetIds) {
        if (this.params.cacheSizeCollectionThreshold === LRU_COLLECTION_DISABLED) {
            logDebug('LruGarbageCollector', 'Garbage collection skipped; disabled');
            return PersistencePromise.resolve(GC_DID_NOT_RUN);
        }
        return this.getCacheSize(txn).next(cacheSize => {
            if (cacheSize < this.params.cacheSizeCollectionThreshold) {
                logDebug('LruGarbageCollector', `Garbage collection skipped; Cache size ${cacheSize} ` +
                    `is lower than threshold ${this.params.cacheSizeCollectionThreshold}`);
                return GC_DID_NOT_RUN;
            }
            else {
                return this.runGarbageCollection(txn, activeTargetIds);
            }
        });
    }
    getCacheSize(txn) {
        return this.delegate.getCacheSize(txn);
    }
    runGarbageCollection(txn, activeTargetIds) {
        let upperBoundSequenceNumber;
        let sequenceNumbersToCollect, targetsRemoved;
        // Timestamps for various pieces of the process
        let countedTargetsTs, foundUpperBoundTs, removedTargetsTs, removedDocumentsTs;
        const startTs = Date.now();
        return this.calculateTargetCount(txn, this.params.percentileToCollect)
            .next(sequenceNumbers => {
            // Cap at the configured max
            if (sequenceNumbers > this.params.maximumSequenceNumbersToCollect) {
                logDebug('LruGarbageCollector', 'Capping sequence numbers to collect down ' +
                    `to the maximum of ${this.params.maximumSequenceNumbersToCollect} ` +
                    `from ${sequenceNumbers}`);
                sequenceNumbersToCollect = this.params
                    .maximumSequenceNumbersToCollect;
            }
            else {
                sequenceNumbersToCollect = sequenceNumbers;
            }
            countedTargetsTs = Date.now();
            return this.nthSequenceNumber(txn, sequenceNumbersToCollect);
        })
            .next(upperBound => {
            upperBoundSequenceNumber = upperBound;
            foundUpperBoundTs = Date.now();
            return this.removeTargets(txn, upperBoundSequenceNumber, activeTargetIds);
        })
            .next(numTargetsRemoved => {
            targetsRemoved = numTargetsRemoved;
            removedTargetsTs = Date.now();
            return this.removeOrphanedDocuments(txn, upperBoundSequenceNumber);
        })
            .next(documentsRemoved => {
            removedDocumentsTs = Date.now();
            if (getLogLevel() <= LogLevel.DEBUG) {
                const desc = 'LRU Garbage Collection\n' +
                    `\tCounted targets in ${countedTargetsTs - startTs}ms\n` +
                    `\tDetermined least recently used ${sequenceNumbersToCollect} in ` +
                    `${foundUpperBoundTs - countedTargetsTs}ms\n` +
                    `\tRemoved ${targetsRemoved} targets in ` +
                    `${removedTargetsTs - foundUpperBoundTs}ms\n` +
                    `\tRemoved ${documentsRemoved} documents in ` +
                    `${removedDocumentsTs - removedTargetsTs}ms\n` +
                    `Total Duration: ${removedDocumentsTs - startTs}ms`;
                logDebug('LruGarbageCollector', desc);
            }
            return PersistencePromise.resolve({
                didRun: true,
                sequenceNumbersCollected: sequenceNumbersToCollect,
                targetsRemoved,
                documentsRemoved
            });
        });
    }
}
function newLruGarbageCollector(delegate, params) {
    return new LruGarbageCollectorImpl(delegate, params);
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
/** Provides LRU functionality for IndexedDB persistence. */
class IndexedDbLruDelegateImpl {
    constructor(db, params) {
        this.db = db;
        this.garbageCollector = newLruGarbageCollector(this, params);
    }
    getSequenceNumberCount(txn) {
        const docCountPromise = this.orphanedDocumentCount(txn);
        const targetCountPromise = this.db.getTargetCache().getTargetCount(txn);
        return targetCountPromise.next(targetCount => docCountPromise.next(docCount => targetCount + docCount));
    }
    orphanedDocumentCount(txn) {
        let orphanedCount = 0;
        return this.forEachOrphanedDocumentSequenceNumber(txn, _ => {
            orphanedCount++;
        }).next(() => orphanedCount);
    }
    forEachTarget(txn, f) {
        return this.db.getTargetCache().forEachTarget(txn, f);
    }
    forEachOrphanedDocumentSequenceNumber(txn, f) {
        return this.forEachOrphanedDocument(txn, (docKey, sequenceNumber) => f(sequenceNumber));
    }
    addReference(txn, targetId, key) {
        return writeSentinelKey(txn, key);
    }
    removeReference(txn, targetId, key) {
        return writeSentinelKey(txn, key);
    }
    removeTargets(txn, upperBound, activeTargetIds) {
        return this.db.getTargetCache().removeTargets(txn, upperBound, activeTargetIds);
    }
    markPotentiallyOrphaned(txn, key) {
        return writeSentinelKey(txn, key);
    }
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    isPinned(txn, docKey) {
        return mutationQueuesContainKey(txn, docKey);
    }
    removeOrphanedDocuments(txn, upperBound) {
        const documentCache = this.db.getRemoteDocumentCache();
        const changeBuffer = documentCache.newChangeBuffer();
        const promises = [];
        let documentCount = 0;
        const iteration = this.forEachOrphanedDocument(txn, (docKey, sequenceNumber) => {
            if (sequenceNumber <= upperBound) {
                const p = this.isPinned(txn, docKey).next(isPinned => {
                    if (!isPinned) {
                        documentCount++;
                        // Our size accounting requires us to read all documents before
                        // removing them.
                        return changeBuffer.getEntry(txn, docKey).next(() => {
                            changeBuffer.removeEntry(docKey);
                            return documentTargetStore(txn).delete(sentinelKey$1(docKey));
                        });
                    }
                });
                promises.push(p);
            }
        });
        return iteration
            .next(() => PersistencePromise.waitFor(promises))
            .next(() => changeBuffer.apply(txn))
            .next(() => documentCount);
    }
    removeTarget(txn, targetData) {
        const updated = targetData.withSequenceNumber(txn.currentSequenceNumber);
        return this.db.getTargetCache().updateTargetData(txn, updated);
    }
    updateLimboDocument(txn, key) {
        return writeSentinelKey(txn, key);
    }
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    forEachOrphanedDocument(txn, f) {
        const store = documentTargetStore(txn);
        let nextToReport = ListenSequence.INVALID;
        let nextPath;
        return store
            .iterate({
            index: DbTargetDocument.documentTargetsIndex
        }, ([targetId, docKey], { path, sequenceNumber }) => {
            if (targetId === 0) {
                // if nextToReport is valid, report it, this is a new key so the
                // last one must not be a member of any targets.
                if (nextToReport !== ListenSequence.INVALID) {
                    f(new DocumentKey(decodeResourcePath(nextPath)), nextToReport);
                }
                // set nextToReport to be this sequence number. It's the next one we
                // might report, if we don't find any targets for this document.
                // Note that the sequence number must be defined when the targetId
                // is 0.
                nextToReport = sequenceNumber;
                nextPath = path;
            }
            else {
                // set nextToReport to be invalid, we know we don't need to report
                // this one since we found a target for it.
                nextToReport = ListenSequence.INVALID;
            }
        })
            .next(() => {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            if (nextToReport !== ListenSequence.INVALID) {
                f(new DocumentKey(decodeResourcePath(nextPath)), nextToReport);
            }
        });
    }
    getCacheSize(txn) {
        return this.db.getRemoteDocumentCache().getSize(txn);
    }
}
function sentinelKey$1(key) {
    return [0, encodeResourcePath(key.path)];
}
/**
 * @returns A value suitable for writing a sentinel row in the target-document
 * store.
 */
function sentinelRow(key, sequenceNumber) {
    return new DbTargetDocument(0, encodeResourcePath(key.path), sequenceNumber);
}
function writeSentinelKey(txn, key) {
    return documentTargetStore(txn).put(sentinelRow(key, txn.currentSequenceNumber));
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
 */
class ObjectMap {
    constructor(mapKeyFn, equalsFn) {
        this.mapKeyFn = mapKeyFn;
        this.equalsFn = equalsFn;
        /**
         * The inner map for a key/value pair. Due to the possibility of collisions we
         * keep a list of entries that we do a linear search through to find an actual
         * match. Note that collisions should be rare, so we still expect near
         * constant time lookups in practice.
         */
        this.inner = {};
    }
    /** Get a value for this key, or undefined if it does not exist. */
    get(key) {
        const id = this.mapKeyFn(key);
        const matches = this.inner[id];
        if (matches === undefined) {
            return undefined;
        }
        for (const [otherKey, value] of matches) {
            if (this.equalsFn(otherKey, key)) {
                return value;
            }
        }
        return undefined;
    }
    has(key) {
        return this.get(key) !== undefined;
    }
    /** Put this key and value in the map. */
    set(key, value) {
        const id = this.mapKeyFn(key);
        const matches = this.inner[id];
        if (matches === undefined) {
            this.inner[id] = [[key, value]];
            return;
        }
        for (let i = 0; i < matches.length; i++) {
            if (this.equalsFn(matches[i][0], key)) {
                matches[i] = [key, value];
                return;
            }
        }
        matches.push([key, value]);
    }
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */
    delete(key) {
        const id = this.mapKeyFn(key);
        const matches = this.inner[id];
        if (matches === undefined) {
            return false;
        }
        for (let i = 0; i < matches.length; i++) {
            if (this.equalsFn(matches[i][0], key)) {
                if (matches.length === 1) {
                    delete this.inner[id];
                }
                else {
                    matches.splice(i, 1);
                }
                return true;
            }
        }
        return false;
    }
    forEach(fn) {
        forEach(this.inner, (_, entries) => {
            for (const [k, v] of entries) {
                fn(k, v);
            }
        });
    }
    isEmpty() {
        return isEmpty(this.inner);
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
class RemoteDocumentChangeBuffer {
    constructor() {
        // A mapping of document key to the new cache entry that should be written (or null if any
        // existing cache entry should be removed).
        this.changes = new ObjectMap(key => key.toString(), (l, r) => l.isEqual(r));
        this.changesApplied = false;
    }
    getReadTime(key) {
        const change = this.changes.get(key);
        if (change) {
            return change.readTime;
        }
        return SnapshotVersion.min();
    }
    /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    addEntry(document, readTime) {
        this.assertNotApplied();
        this.changes.set(document.key, { document, readTime });
    }
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    removeEntry(key, readTime = null) {
        this.assertNotApplied();
        this.changes.set(key, {
            document: MutableDocument.newInvalidDocument(key),
            readTime
        });
    }
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
    getEntry(transaction, documentKey) {
        this.assertNotApplied();
        const bufferedEntry = this.changes.get(documentKey);
        if (bufferedEntry !== undefined) {
            return PersistencePromise.resolve(bufferedEntry.document);
        }
        else {
            return this.getFromCache(transaction, documentKey);
        }
    }
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
    getEntries(transaction, documentKeys) {
        return this.getAllFromCache(transaction, documentKeys);
    }
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */
    apply(transaction) {
        this.assertNotApplied();
        this.changesApplied = true;
        return this.applyChanges(transaction);
    }
    /** Helper to assert this.changes is not null  */
    assertNotApplied() {
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
 * The RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newIndexedDbRemoteDocumentCache()`.
 */
class IndexedDbRemoteDocumentCacheImpl {
    /**
     * @param serializer - The document serializer.
     * @param indexManager - The query indexes that need to be maintained.
     */
    constructor(serializer, indexManager) {
        this.serializer = serializer;
        this.indexManager = indexManager;
    }
    /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    addEntry(transaction, key, doc) {
        const documentStore = remoteDocumentsStore(transaction);
        return documentStore.put(dbKey(key), doc);
    }
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    removeEntry(transaction, documentKey) {
        const store = remoteDocumentsStore(transaction);
        const key = dbKey(documentKey);
        return store.delete(key);
    }
    /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */
    updateMetadata(transaction, sizeDelta) {
        return this.getMetadata(transaction).next(metadata => {
            metadata.byteSize += sizeDelta;
            return this.setMetadata(transaction, metadata);
        });
    }
    getEntry(transaction, documentKey) {
        return remoteDocumentsStore(transaction)
            .get(dbKey(documentKey))
            .next(dbRemoteDoc => {
            return this.maybeDecodeDocument(documentKey, dbRemoteDoc);
        });
    }
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document entry and its size.
     */
    getSizedEntry(transaction, documentKey) {
        return remoteDocumentsStore(transaction)
            .get(dbKey(documentKey))
            .next(dbRemoteDoc => {
            const doc = this.maybeDecodeDocument(documentKey, dbRemoteDoc);
            return {
                document: doc,
                size: dbDocumentSize(dbRemoteDoc)
            };
        });
    }
    getEntries(transaction, documentKeys) {
        let results = mutableDocumentMap();
        return this.forEachDbEntry(transaction, documentKeys, (key, dbRemoteDoc) => {
            const doc = this.maybeDecodeDocument(key, dbRemoteDoc);
            results = results.insert(key, doc);
        }).next(() => results);
    }
    /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys - The set of keys entries to look up.
     * @returns A map of documents indexed by key and a map of sizes indexed by
     *     key (zero if the document does not exist).
     */
    getSizedEntries(transaction, documentKeys) {
        let results = mutableDocumentMap();
        let sizeMap = new SortedMap(DocumentKey.comparator);
        return this.forEachDbEntry(transaction, documentKeys, (key, dbRemoteDoc) => {
            const doc = this.maybeDecodeDocument(key, dbRemoteDoc);
            results = results.insert(key, doc);
            sizeMap = sizeMap.insert(key, dbDocumentSize(dbRemoteDoc));
        }).next(() => {
            return { documents: results, sizeMap };
        });
    }
    forEachDbEntry(transaction, documentKeys, callback) {
        if (documentKeys.isEmpty()) {
            return PersistencePromise.resolve();
        }
        const range = IDBKeyRange.bound(documentKeys.first().path.toArray(), documentKeys.last().path.toArray());
        const keyIter = documentKeys.getIterator();
        let nextKey = keyIter.getNext();
        return remoteDocumentsStore(transaction)
            .iterate({ range }, (potentialKeyRaw, dbRemoteDoc, control) => {
            const potentialKey = DocumentKey.fromSegments(potentialKeyRaw);
            // Go through keys not found in cache.
            while (nextKey && DocumentKey.comparator(nextKey, potentialKey) < 0) {
                callback(nextKey, null);
                nextKey = keyIter.getNext();
            }
            if (nextKey && nextKey.isEqual(potentialKey)) {
                // Key found in cache.
                callback(nextKey, dbRemoteDoc);
                nextKey = keyIter.hasNext() ? keyIter.getNext() : null;
            }
            // Skip to the next key (if there is one).
            if (nextKey) {
                control.skip(nextKey.path.toArray());
            }
            else {
                control.done();
            }
        })
            .next(() => {
            // The rest of the keys are not in the cache. One case where `iterate`
            // above won't go through them is when the cache is empty.
            while (nextKey) {
                callback(nextKey, null);
                nextKey = keyIter.hasNext() ? keyIter.getNext() : null;
            }
        });
    }
    getDocumentsMatchingQuery(transaction, query, sinceReadTime) {
        let results = mutableDocumentMap();
        const immediateChildrenPathLength = query.path.length + 1;
        const iterationOptions = {};
        if (sinceReadTime.isEqual(SnapshotVersion.min())) {
            // Documents are ordered by key, so we can use a prefix scan to narrow
            // down the documents we need to match the query against.
            const startKey = query.path.toArray();
            iterationOptions.range = IDBKeyRange.lowerBound(startKey);
        }
        else {
            // Execute an index-free query and filter by read time. This is safe
            // since all document changes to queries that have a
            // lastLimboFreeSnapshotVersion (`sinceReadTime`) have a read time set.
            const collectionKey = query.path.toArray();
            const readTimeKey = toDbTimestampKey(sinceReadTime);
            iterationOptions.range = IDBKeyRange.lowerBound([collectionKey, readTimeKey], 
            /* open= */ true);
            iterationOptions.index = DbRemoteDocument.collectionReadTimeIndex;
        }
        return remoteDocumentsStore(transaction)
            .iterate(iterationOptions, (key, dbRemoteDoc, control) => {
            // The query is actually returning any path that starts with the query
            // path prefix which may include documents in subcollections. For
            // example, a query on 'rooms' will return rooms/abc/messages/xyx but we
            // shouldn't match it. Fix this by discarding rows with document keys
            // more than one segment longer than the query path.
            if (key.length !== immediateChildrenPathLength) {
                return;
            }
            const document = fromDbRemoteDocument(this.serializer, dbRemoteDoc);
            if (!query.path.isPrefixOf(document.key.path)) {
                control.done();
            }
            else if (queryMatches(query, document)) {
                results = results.insert(document.key, document);
            }
        })
            .next(() => results);
    }
    newChangeBuffer(options) {
        return new IndexedDbRemoteDocumentChangeBuffer(this, !!options && options.trackRemovals);
    }
    getSize(txn) {
        return this.getMetadata(txn).next(metadata => metadata.byteSize);
    }
    getMetadata(txn) {
        return documentGlobalStore(txn)
            .get(DbRemoteDocumentGlobal.key)
            .next(metadata => {
            hardAssert(!!metadata);
            return metadata;
        });
    }
    setMetadata(txn, metadata) {
        return documentGlobalStore(txn).put(DbRemoteDocumentGlobal.key, metadata);
    }
    /**
     * Decodes `remoteDoc` and returns the document (or null, if the document
     * corresponds to the format used for sentinel deletes).
     */
    maybeDecodeDocument(documentKey, dbRemoteDoc) {
        if (dbRemoteDoc) {
            const doc = fromDbRemoteDocument(this.serializer, dbRemoteDoc);
            // Whether the document is a sentinel removal and should only be used in the
            // `getNewDocumentChanges()`
            const isSentinelRemoval = doc.isNoDocument() && doc.version.isEqual(SnapshotVersion.min());
            if (!isSentinelRemoval) {
                return doc;
            }
        }
        return MutableDocument.newInvalidDocument(documentKey);
    }
}
/**
 * Creates a new IndexedDbRemoteDocumentCache.
 *
 * @param serializer - The document serializer.
 * @param indexManager - The query indexes that need to be maintained.
 */
function newIndexedDbRemoteDocumentCache(serializer, indexManager) {
    return new IndexedDbRemoteDocumentCacheImpl(serializer, indexManager);
}
/**
 * Returns the set of documents that have changed since the specified read
 * time.
 */
// PORTING NOTE: This is only used for multi-tab synchronization.
function remoteDocumentCacheGetNewDocumentChanges(remoteDocumentCache, transaction, sinceReadTime) {
    const remoteDocumentCacheImpl = debugCast(remoteDocumentCache);
    let changedDocs = mutableDocumentMap();
    let lastReadTime = toDbTimestampKey(sinceReadTime);
    const documentsStore = remoteDocumentsStore(transaction);
    const range = IDBKeyRange.lowerBound(lastReadTime, true);
    return documentsStore
        .iterate({ index: DbRemoteDocument.readTimeIndex, range }, (_, dbRemoteDoc) => {
        // Unlike `getEntry()` and others, `getNewDocumentChanges()` parses
        // the documents directly since we want to keep sentinel deletes.
        const doc = fromDbRemoteDocument(remoteDocumentCacheImpl.serializer, dbRemoteDoc);
        changedDocs = changedDocs.insert(doc.key, doc);
        lastReadTime = dbRemoteDoc.readTime;
    })
        .next(() => {
        return {
            changedDocs,
            readTime: fromDbTimestampKey(lastReadTime)
        };
    });
}
/**
 * Returns the read time of the most recently read document in the cache, or
 * SnapshotVersion.min() if not available.
 */
// PORTING NOTE: This is only used for multi-tab synchronization.
function remoteDocumentCacheGetLastReadTime(transaction) {
    const documentsStore = remoteDocumentsStore(transaction);
    // If there are no existing entries, we return SnapshotVersion.min().
    let readTime = SnapshotVersion.min();
    return documentsStore
        .iterate({ index: DbRemoteDocument.readTimeIndex, reverse: true }, (key, dbRemoteDoc, control) => {
        if (dbRemoteDoc.readTime) {
            readTime = fromDbTimestampKey(dbRemoteDoc.readTime);
        }
        control.done();
    })
        .next(() => readTime);
}
/**
 * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
 *
 * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
 * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
 * when we apply the changes.
 */
class IndexedDbRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer {
    /**
     * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    constructor(documentCache, trackRemovals) {
        super();
        this.documentCache = documentCache;
        this.trackRemovals = trackRemovals;
        // A map of document sizes prior to applying the changes in this buffer.
        this.documentSizes = new ObjectMap(key => key.toString(), (l, r) => l.isEqual(r));
    }
    applyChanges(transaction) {
        const promises = [];
        let sizeDelta = 0;
        let collectionParents = new SortedSet((l, r) => primitiveComparator(l.canonicalString(), r.canonicalString()));
        this.changes.forEach((key, documentChange) => {
            const previousSize = this.documentSizes.get(key);
            if (documentChange.document.isValidDocument()) {
                const doc = toDbRemoteDocument(this.documentCache.serializer, documentChange.document, this.getReadTime(key));
                collectionParents = collectionParents.add(key.path.popLast());
                const size = dbDocumentSize(doc);
                sizeDelta += size - previousSize;
                promises.push(this.documentCache.addEntry(transaction, key, doc));
            }
            else {
                sizeDelta -= previousSize;
                if (this.trackRemovals) {
                    // In order to track removals, we store a "sentinel delete" in the
                    // RemoteDocumentCache. This entry is represented by a NoDocument
                    // with a version of 0 and ignored by `maybeDecodeDocument()` but
                    // preserved in `getNewDocumentChanges()`.
                    const deletedDoc = toDbRemoteDocument(this.documentCache.serializer, MutableDocument.newNoDocument(key, SnapshotVersion.min()), this.getReadTime(key));
                    promises.push(this.documentCache.addEntry(transaction, key, deletedDoc));
                }
                else {
                    promises.push(this.documentCache.removeEntry(transaction, key));
                }
            }
        });
        collectionParents.forEach(parent => {
            promises.push(this.documentCache.indexManager.addToCollectionParentIndex(transaction, parent));
        });
        promises.push(this.documentCache.updateMetadata(transaction, sizeDelta));
        return PersistencePromise.waitFor(promises);
    }
    getFromCache(transaction, documentKey) {
        // Record the size of everything we load from the cache so we can compute a delta later.
        return this.documentCache
            .getSizedEntry(transaction, documentKey)
            .next(getResult => {
            this.documentSizes.set(documentKey, getResult.size);
            return getResult.document;
        });
    }
    getAllFromCache(transaction, documentKeys) {
        // Record the size of everything we load from the cache so we can compute
        // a delta later.
        return this.documentCache
            .getSizedEntries(transaction, documentKeys)
            .next(({ documents, sizeMap }) => {
            // Note: `getAllFromCache` returns two maps instead of a single map from
            // keys to `DocumentSizeEntry`s. This is to allow returning the
            // `MutableDocumentMap` directly, without a conversion.
            sizeMap.forEach((documentKey, size) => {
                this.documentSizes.set(documentKey, size);
            });
            return documents;
        });
    }
}
function documentGlobalStore(txn) {
    return getStore(txn, DbRemoteDocumentGlobal.store);
}
/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */
function remoteDocumentsStore(txn) {
    return getStore(txn, DbRemoteDocument.store);
}
function dbKey(docKey) {
    return docKey.path.toArray();
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
/** Performs database creation and schema upgrades. */
class SchemaConverter {
    constructor(serializer) {
        this.serializer = serializer;
    }
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */
    createOrUpgrade(db, txn, fromVersion, toVersion) {
        hardAssert(fromVersion < toVersion &&
            fromVersion >= 0 &&
            toVersion <= SCHEMA_VERSION);
        const simpleDbTransaction = new SimpleDbTransaction('createOrUpgrade', txn);
        if (fromVersion < 1 && toVersion >= 1) {
            createPrimaryClientStore(db);
            createMutationQueue(db);
            createQueryCache(db);
            createRemoteDocumentCache(db);
        }
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
        let p = PersistencePromise.resolve();
        if (fromVersion < 3 && toVersion >= 3) {
            // Brand new clients don't need to drop and recreate--only clients that
            // potentially have corrupt data.
            if (fromVersion !== 0) {
                dropQueryCache(db);
                createQueryCache(db);
            }
            p = p.next(() => writeEmptyTargetGlobalEntry(simpleDbTransaction));
        }
        if (fromVersion < 4 && toVersion >= 4) {
            if (fromVersion !== 0) {
                // Schema version 3 uses auto-generated keys to generate globally unique
                // mutation batch IDs (this was previously ensured internally by the
                // client). To migrate to the new schema, we have to read all mutations
                // and write them back out. We preserve the existing batch IDs to guarantee
                // consistency with other object stores. Any further mutation batch IDs will
                // be auto-generated.
                p = p.next(() => upgradeMutationBatchSchemaAndMigrateData(db, simpleDbTransaction));
            }
            p = p.next(() => {
                createClientMetadataStore(db);
            });
        }
        if (fromVersion < 5 && toVersion >= 5) {
            p = p.next(() => this.removeAcknowledgedMutations(simpleDbTransaction));
        }
        if (fromVersion < 6 && toVersion >= 6) {
            p = p.next(() => {
                createDocumentGlobalStore(db);
                return this.addDocumentGlobal(simpleDbTransaction);
            });
        }
        if (fromVersion < 7 && toVersion >= 7) {
            p = p.next(() => this.ensureSequenceNumbers(simpleDbTransaction));
        }
        if (fromVersion < 8 && toVersion >= 8) {
            p = p.next(() => this.createCollectionParentIndex(db, simpleDbTransaction));
        }
        if (fromVersion < 9 && toVersion >= 9) {
            p = p.next(() => {
                // Multi-Tab used to manage its own changelog, but this has been moved
                // to the DbRemoteDocument object store itself. Since the previous change
                // log only contained transient data, we can drop its object store.
                dropRemoteDocumentChangesStore(db);
                createRemoteDocumentReadTimeIndex(txn);
            });
        }
        if (fromVersion < 10 && toVersion >= 10) {
            p = p.next(() => this.rewriteCanonicalIds(simpleDbTransaction));
        }
        if (fromVersion < 11 && toVersion >= 11) {
            p = p.next(() => {
                createBundlesStore(db);
                createNamedQueriesStore(db);
            });
        }
        return p;
    }
    addDocumentGlobal(txn) {
        let byteCount = 0;
        return txn
            .store(DbRemoteDocument.store)
            .iterate((_, doc) => {
            byteCount += dbDocumentSize(doc);
        })
            .next(() => {
            const metadata = new DbRemoteDocumentGlobal(byteCount);
            return txn
                .store(DbRemoteDocumentGlobal.store)
                .put(DbRemoteDocumentGlobal.key, metadata);
        });
    }
    removeAcknowledgedMutations(txn) {
        const queuesStore = txn.store(DbMutationQueue.store);
        const mutationsStore = txn.store(DbMutationBatch.store);
        return queuesStore.loadAll().next(queues => {
            return PersistencePromise.forEach(queues, (queue) => {
                const range = IDBKeyRange.bound([queue.userId, BATCHID_UNKNOWN], [queue.userId, queue.lastAcknowledgedBatchId]);
                return mutationsStore
                    .loadAll(DbMutationBatch.userMutationsIndex, range)
                    .next(dbBatches => {
                    return PersistencePromise.forEach(dbBatches, (dbBatch) => {
                        hardAssert(dbBatch.userId === queue.userId);
                        const batch = fromDbMutationBatch(this.serializer, dbBatch);
                        return removeMutationBatch(txn, queue.userId, batch).next(() => { });
                    });
                });
            });
        });
    }
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    ensureSequenceNumbers(txn) {
        const documentTargetStore = txn.store(DbTargetDocument.store);
        const documentsStore = txn.store(DbRemoteDocument.store);
        const globalTargetStore = txn.store(DbTargetGlobal.store);
        return globalTargetStore.get(DbTargetGlobal.key).next(metadata => {
            const writeSentinelKey = (path) => {
                return documentTargetStore.put(new DbTargetDocument(0, encodeResourcePath(path), metadata.highestListenSequenceNumber));
            };
            const promises = [];
            return documentsStore
                .iterate((key, doc) => {
                const path = new ResourcePath(key);
                const docSentinelKey = sentinelKey(path);
                promises.push(documentTargetStore.get(docSentinelKey).next(maybeSentinel => {
                    if (!maybeSentinel) {
                        return writeSentinelKey(path);
                    }
                    else {
                        return PersistencePromise.resolve();
                    }
                }));
            })
                .next(() => PersistencePromise.waitFor(promises));
        });
    }
    createCollectionParentIndex(db, txn) {
        // Create the index.
        db.createObjectStore(DbCollectionParent.store, {
            keyPath: DbCollectionParent.keyPath
        });
        const collectionParentsStore = txn.store(DbCollectionParent.store);
        // Helper to add an index entry iff we haven't already written it.
        const cache = new MemoryCollectionParentIndex();
        const addEntry = (collectionPath) => {
            if (cache.add(collectionPath)) {
                const collectionId = collectionPath.lastSegment();
                const parentPath = collectionPath.popLast();
                return collectionParentsStore.put({
                    collectionId,
                    parent: encodeResourcePath(parentPath)
                });
            }
        };
        // Index existing remote documents.
        return txn
            .store(DbRemoteDocument.store)
            .iterate({ keysOnly: true }, (pathSegments, _) => {
            const path = new ResourcePath(pathSegments);
            return addEntry(path.popLast());
        })
            .next(() => {
            // Index existing mutations.
            return txn
                .store(DbDocumentMutation.store)
                .iterate({ keysOnly: true }, ([userID, encodedPath, batchId], _) => {
                const path = decodeResourcePath(encodedPath);
                return addEntry(path.popLast());
            });
        });
    }
    rewriteCanonicalIds(txn) {
        const targetStore = txn.store(DbTarget.store);
        return targetStore.iterate((key, originalDbTarget) => {
            const originalTargetData = fromDbTarget(originalDbTarget);
            const updatedDbTarget = toDbTarget(this.serializer, originalTargetData);
            return targetStore.put(updatedDbTarget);
        });
    }
}
function sentinelKey(path) {
    return [0, encodeResourcePath(path)];
}
function createPrimaryClientStore(db) {
    db.createObjectStore(DbPrimaryClient.store);
}
function createMutationQueue(db) {
    db.createObjectStore(DbMutationQueue.store, {
        keyPath: DbMutationQueue.keyPath
    });
    const mutationBatchesStore = db.createObjectStore(DbMutationBatch.store, {
        keyPath: DbMutationBatch.keyPath,
        autoIncrement: true
    });
    mutationBatchesStore.createIndex(DbMutationBatch.userMutationsIndex, DbMutationBatch.userMutationsKeyPath, { unique: true });
    db.createObjectStore(DbDocumentMutation.store);
}
/**
 * Upgrade function to migrate the 'mutations' store from V1 to V3. Loads
 * and rewrites all data.
 */
function upgradeMutationBatchSchemaAndMigrateData(db, txn) {
    const v1MutationsStore = txn.store(DbMutationBatch.store);
    return v1MutationsStore.loadAll().next(existingMutations => {
        db.deleteObjectStore(DbMutationBatch.store);
        const mutationsStore = db.createObjectStore(DbMutationBatch.store, {
            keyPath: DbMutationBatch.keyPath,
            autoIncrement: true
        });
        mutationsStore.createIndex(DbMutationBatch.userMutationsIndex, DbMutationBatch.userMutationsKeyPath, { unique: true });
        const v3MutationsStore = txn.store(DbMutationBatch.store);
        const writeAll = existingMutations.map(mutation => v3MutationsStore.put(mutation));
        return PersistencePromise.waitFor(writeAll);
    });
}
function createRemoteDocumentCache(db) {
    db.createObjectStore(DbRemoteDocument.store);
}
function createDocumentGlobalStore(db) {
    db.createObjectStore(DbRemoteDocumentGlobal.store);
}
function createQueryCache(db) {
    const targetDocumentsStore = db.createObjectStore(DbTargetDocument.store, {
        keyPath: DbTargetDocument.keyPath
    });
    targetDocumentsStore.createIndex(DbTargetDocument.documentTargetsIndex, DbTargetDocument.documentTargetsKeyPath, { unique: true });
    const targetStore = db.createObjectStore(DbTarget.store, {
        keyPath: DbTarget.keyPath
    });
    // NOTE: This is unique only because the TargetId is the suffix.
    targetStore.createIndex(DbTarget.queryTargetsIndexName, DbTarget.queryTargetsKeyPath, { unique: true });
    db.createObjectStore(DbTargetGlobal.store);
}
function dropQueryCache(db) {
    db.deleteObjectStore(DbTargetDocument.store);
    db.deleteObjectStore(DbTarget.store);
    db.deleteObjectStore(DbTargetGlobal.store);
}
function dropRemoteDocumentChangesStore(db) {
    if (db.objectStoreNames.contains('remoteDocumentChanges')) {
        db.deleteObjectStore('remoteDocumentChanges');
    }
}
/**
 * Creates the target global singleton row.
 *
 * @param txn - The version upgrade transaction for indexeddb
 */
function writeEmptyTargetGlobalEntry(txn) {
    const globalStore = txn.store(DbTargetGlobal.store);
    const metadata = new DbTargetGlobal(
    /*highestTargetId=*/ 0, 
    /*lastListenSequenceNumber=*/ 0, SnapshotVersion.min().toTimestamp(), 
    /*targetCount=*/ 0);
    return globalStore.put(DbTargetGlobal.key, metadata);
}
/**
 * Creates indices on the RemoteDocuments store used for both multi-tab
 * and Index-Free queries.
 */
function createRemoteDocumentReadTimeIndex(txn) {
    const remoteDocumentStore = txn.objectStore(DbRemoteDocument.store);
    remoteDocumentStore.createIndex(DbRemoteDocument.readTimeIndex, DbRemoteDocument.readTimeIndexPath, { unique: false });
    remoteDocumentStore.createIndex(DbRemoteDocument.collectionReadTimeIndex, DbRemoteDocument.collectionReadTimeIndexPath, { unique: false });
}
function createClientMetadataStore(db) {
    db.createObjectStore(DbClientMetadata.store, {
        keyPath: DbClientMetadata.keyPath
    });
}
function createBundlesStore(db) {
    db.createObjectStore(DbBundle.store, {
        keyPath: DbBundle.keyPath
    });
}
function createNamedQueriesStore(db) {
    db.createObjectStore(DbNamedQuery.store, {
        keyPath: DbNamedQuery.keyPath
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
const LOG_TAG$d = 'IndexedDbPersistence';
/**
 * Oldest acceptable age in milliseconds for client metadata before the client
 * is considered inactive and its associated data is garbage collected.
 */
const MAX_CLIENT_AGE_MS = 30 * 60 * 1000; // 30 minutes
/**
 * Oldest acceptable metadata age for clients that may participate in the
 * primary lease election. Clients that have not updated their client metadata
 * within 5 seconds are not eligible to receive a primary lease.
 */
const MAX_PRIMARY_ELIGIBLE_AGE_MS = 5000;
/**
 * The interval at which clients will update their metadata, including
 * refreshing their primary lease if held or potentially trying to acquire it if
 * not held.
 *
 * Primary clients may opportunistically refresh their metadata earlier
 * if they're already performing an IndexedDB operation.
 */
const CLIENT_METADATA_REFRESH_INTERVAL_MS = 4000;
/** User-facing error when the primary lease is required but not available. */
const PRIMARY_LEASE_EXCLUSIVE_ERROR_MSG = 'Failed to obtain exclusive access to the persistence layer. To allow ' +
    'shared access, multi-tab synchronization has to be enabled in all tabs. ' +
    'If you are using `experimentalForceOwningTab:true`, make sure that only ' +
    'one tab has persistence enabled at any given time.';
const UNSUPPORTED_PLATFORM_ERROR_MSG = 'This platform is either missing IndexedDB or is known to have ' +
    'an incomplete implementation. Offline persistence has been disabled.';
// The format of the LocalStorage key that stores zombied client is:
//     firestore_zombie_<persistence_prefix>_<instance_key>
const ZOMBIED_CLIENTS_KEY_PREFIX = 'firestore_zombie';
/**
 * The name of the main (and currently only) IndexedDB database. This name is
 * appended to the prefix provided to the IndexedDbPersistence constructor.
 */
const MAIN_DATABASE = 'main';
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
class IndexedDbPersistence {
    constructor(
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    allowTabSynchronization, persistenceKey, clientId, lruParams, queue, window, document, serializer, sequenceNumberSyncer, 
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    forceOwningTab) {
        this.allowTabSynchronization = allowTabSynchronization;
        this.persistenceKey = persistenceKey;
        this.clientId = clientId;
        this.queue = queue;
        this.window = window;
        this.document = document;
        this.sequenceNumberSyncer = sequenceNumberSyncer;
        this.forceOwningTab = forceOwningTab;
        this.listenSequence = null;
        this._started = false;
        this.isPrimary = false;
        this.networkEnabled = true;
        /** Our window.unload handler, if registered. */
        this.windowUnloadHandler = null;
        this.inForeground = false;
        /** Our 'visibilitychange' listener if registered. */
        this.documentVisibilityHandler = null;
        /** The client metadata refresh task. */
        this.clientMetadataRefresher = null;
        /** The last time we garbage collected the client metadata object store. */
        this.lastGarbageCollectionTime = Number.NEGATIVE_INFINITY;
        /** A listener to notify on primary state changes. */
        this.primaryStateListener = _ => Promise.resolve();
        if (!IndexedDbPersistence.isAvailable()) {
            throw new FirestoreError(Code.UNIMPLEMENTED, UNSUPPORTED_PLATFORM_ERROR_MSG);
        }
        this.referenceDelegate = new IndexedDbLruDelegateImpl(this, lruParams);
        this.dbName = persistenceKey + MAIN_DATABASE;
        this.serializer = new LocalSerializer(serializer);
        this.simpleDb = new SimpleDb(this.dbName, SCHEMA_VERSION, new SchemaConverter(this.serializer));
        this.targetCache = new IndexedDbTargetCache(this.referenceDelegate, this.serializer);
        this.indexManager = new IndexedDbIndexManager();
        this.remoteDocumentCache = newIndexedDbRemoteDocumentCache(this.serializer, this.indexManager);
        this.bundleCache = new IndexedDbBundleCache();
        if (this.window && this.window.localStorage) {
            this.webStorage = this.window.localStorage;
        }
        else {
            this.webStorage = null;
            if (forceOwningTab === false) {
                logError(LOG_TAG$d, 'LocalStorage is unavailable. As a result, persistence may not work ' +
                    'reliably. In particular enablePersistence() could fail immediately ' +
                    'after refreshing the page.');
            }
        }
    }
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @returns Whether persistence was enabled.
     */
    start() {
        // NOTE: This is expected to fail sometimes (in the case of another tab
        // already having the persistence lock), so it's the first thing we should
        // do.
        return this.updateClientMetadataAndTryBecomePrimary()
            .then(() => {
            if (!this.isPrimary && !this.allowTabSynchronization) {
                // Fail `start()` if `synchronizeTabs` is disabled and we cannot
                // obtain the primary lease.
                throw new FirestoreError(Code.FAILED_PRECONDITION, PRIMARY_LEASE_EXCLUSIVE_ERROR_MSG);
            }
            this.attachVisibilityHandler();
            this.attachWindowUnloadHook();
            this.scheduleClientMetadataAndPrimaryLeaseRefreshes();
            return this.runTransaction('getHighestListenSequenceNumber', 'readonly', txn => this.targetCache.getHighestSequenceNumber(txn));
        })
            .then(highestListenSequenceNumber => {
            this.listenSequence = new ListenSequence(highestListenSequenceNumber, this.sequenceNumberSyncer);
        })
            .then(() => {
            this._started = true;
        })
            .catch(reason => {
            this.simpleDb && this.simpleDb.close();
            return Promise.reject(reason);
        });
    }
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    setPrimaryStateListener(primaryStateListener) {
        this.primaryStateListener = async (primaryState) => {
            if (this.started) {
                return primaryStateListener(primaryState);
            }
        };
        return primaryStateListener(this.isPrimary);
    }
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    setDatabaseDeletedListener(databaseDeletedListener) {
        this.simpleDb.setVersionChangeListener(async (event) => {
            // Check if an attempt is made to delete IndexedDB.
            if (event.newVersion === null) {
                await databaseDeletedListener();
            }
        });
    }
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    setNetworkEnabled(networkEnabled) {
        if (this.networkEnabled !== networkEnabled) {
            this.networkEnabled = networkEnabled;
            // Schedule a primary lease refresh for immediate execution. The eventual
            // lease update will be propagated via `primaryStateListener`.
            this.queue.enqueueAndForget(async () => {
                if (this.started) {
                    await this.updateClientMetadataAndTryBecomePrimary();
                }
            });
        }
    }
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    updateClientMetadataAndTryBecomePrimary() {
        return this.runTransaction('updateClientMetadataAndTryBecomePrimary', 'readwrite', txn => {
            const metadataStore = clientMetadataStore(txn);
            return metadataStore
                .put(new DbClientMetadata(this.clientId, Date.now(), this.networkEnabled, this.inForeground))
                .next(() => {
                if (this.isPrimary) {
                    return this.verifyPrimaryLease(txn).next(success => {
                        if (!success) {
                            this.isPrimary = false;
                            this.queue.enqueueRetryable(() => this.primaryStateListener(false));
                        }
                    });
                }
            })
                .next(() => this.canActAsPrimary(txn))
                .next(canActAsPrimary => {
                if (this.isPrimary && !canActAsPrimary) {
                    return this.releasePrimaryLeaseIfHeld(txn).next(() => false);
                }
                else if (canActAsPrimary) {
                    return this.acquireOrExtendPrimaryLease(txn).next(() => true);
                }
                else {
                    return /* canActAsPrimary= */ false;
                }
            });
        })
            .catch(e => {
            if (isIndexedDbTransactionError(e)) {
                logDebug(LOG_TAG$d, 'Failed to extend owner lease: ', e);
                // Proceed with the existing state. Any subsequent access to
                // IndexedDB will verify the lease.
                return this.isPrimary;
            }
            if (!this.allowTabSynchronization) {
                throw e;
            }
            logDebug(LOG_TAG$d, 'Releasing owner lease after error during lease refresh', e);
            return /* isPrimary= */ false;
        })
            .then(isPrimary => {
            if (this.isPrimary !== isPrimary) {
                this.queue.enqueueRetryable(() => this.primaryStateListener(isPrimary));
            }
            this.isPrimary = isPrimary;
        });
    }
    verifyPrimaryLease(txn) {
        const store = primaryClientStore(txn);
        return store.get(DbPrimaryClient.key).next(primaryClient => {
            return PersistencePromise.resolve(this.isLocalClient(primaryClient));
        });
    }
    removeClientMetadata(txn) {
        const metadataStore = clientMetadataStore(txn);
        return metadataStore.delete(this.clientId);
    }
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    async maybeGarbageCollectMultiClientState() {
        if (this.isPrimary &&
            !this.isWithinAge(this.lastGarbageCollectionTime, MAX_CLIENT_AGE_MS)) {
            this.lastGarbageCollectionTime = Date.now();
            const inactiveClients = await this.runTransaction('maybeGarbageCollectMultiClientState', 'readwrite-primary', txn => {
                const metadataStore = getStore(txn, DbClientMetadata.store);
                return metadataStore.loadAll().next(existingClients => {
                    const active = this.filterActiveClients(existingClients, MAX_CLIENT_AGE_MS);
                    const inactive = existingClients.filter(client => active.indexOf(client) === -1);
                    // Delete metadata for clients that are no longer considered active.
                    return PersistencePromise.forEach(inactive, (inactiveClient) => metadataStore.delete(inactiveClient.clientId)).next(() => inactive);
                });
            }).catch(() => {
                // Ignore primary lease violations or any other type of error. The next
                // primary will run `maybeGarbageCollectMultiClientState()` again.
                // We don't use `ignoreIfPrimaryLeaseLoss()` since we don't want to depend
                // on LocalStore.
                return [];
            });
            // Delete potential leftover entries that may continue to mark the
            // inactive clients as zombied in LocalStorage.
            // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
            // the client atomically, but we can't. So we opt to delete the IndexedDb
            // entries first to avoid potentially reviving a zombied client.
            if (this.webStorage) {
                for (const inactiveClient of inactiveClients) {
                    this.webStorage.removeItem(this.zombiedClientLocalStorageKey(inactiveClient.clientId));
                }
            }
        }
    }
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    scheduleClientMetadataAndPrimaryLeaseRefreshes() {
        this.clientMetadataRefresher = this.queue.enqueueAfterDelay("client_metadata_refresh" /* ClientMetadataRefresh */, CLIENT_METADATA_REFRESH_INTERVAL_MS, () => {
            return this.updateClientMetadataAndTryBecomePrimary()
                .then(() => this.maybeGarbageCollectMultiClientState())
                .then(() => this.scheduleClientMetadataAndPrimaryLeaseRefreshes());
        });
    }
    /** Checks whether `client` is the local client. */
    isLocalClient(client) {
        return client ? client.ownerId === this.clientId : false;
    }
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    canActAsPrimary(txn) {
        if (this.forceOwningTab) {
            return PersistencePromise.resolve(true);
        }
        const store = primaryClientStore(txn);
        return store
            .get(DbPrimaryClient.key)
            .next(currentPrimary => {
            const currentLeaseIsValid = currentPrimary !== null &&
                this.isWithinAge(currentPrimary.leaseTimestampMs, MAX_PRIMARY_ELIGIBLE_AGE_MS) &&
                !this.isClientZombied(currentPrimary.ownerId);
            // A client is eligible for the primary lease if:
            // - its network is enabled and the client's tab is in the foreground.
            // - its network is enabled and no other client's tab is in the
            //   foreground.
            // - every clients network is disabled and the client's tab is in the
            //   foreground.
            // - every clients network is disabled and no other client's tab is in
            //   the foreground.
            // - the `forceOwningTab` setting was passed in.
            if (currentLeaseIsValid) {
                if (this.isLocalClient(currentPrimary) && this.networkEnabled) {
                    return true;
                }
                if (!this.isLocalClient(currentPrimary)) {
                    if (!currentPrimary.allowTabSynchronization) {
                        // Fail the `canActAsPrimary` check if the current leaseholder has
                        // not opted into multi-tab synchronization. If this happens at
                        // client startup, we reject the Promise returned by
                        // `enablePersistence()` and the user can continue to use Firestore
                        // with in-memory persistence.
                        // If this fails during a lease refresh, we will instead block the
                        // AsyncQueue from executing further operations. Note that this is
                        // acceptable since mixing & matching different `synchronizeTabs`
                        // settings is not supported.
                        //
                        // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                        // no longer be turned off.
                        throw new FirestoreError(Code.FAILED_PRECONDITION, PRIMARY_LEASE_EXCLUSIVE_ERROR_MSG);
                    }
                    return false;
                }
            }
            if (this.networkEnabled && this.inForeground) {
                return true;
            }
            return clientMetadataStore(txn)
                .loadAll()
                .next(existingClients => {
                // Process all existing clients and determine whether at least one of
                // them is better suited to obtain the primary lease.
                const preferredCandidate = this.filterActiveClients(existingClients, MAX_PRIMARY_ELIGIBLE_AGE_MS).find(otherClient => {
                    if (this.clientId !== otherClient.clientId) {
                        const otherClientHasBetterNetworkState = !this.networkEnabled && otherClient.networkEnabled;
                        const otherClientHasBetterVisibility = !this.inForeground && otherClient.inForeground;
                        const otherClientHasSameNetworkState = this.networkEnabled === otherClient.networkEnabled;
                        if (otherClientHasBetterNetworkState ||
                            (otherClientHasBetterVisibility &&
                                otherClientHasSameNetworkState)) {
                            return true;
                        }
                    }
                    return false;
                });
                return preferredCandidate === undefined;
            });
        })
            .next(canActAsPrimary => {
            if (this.isPrimary !== canActAsPrimary) {
                logDebug(LOG_TAG$d, `Client ${canActAsPrimary ? 'is' : 'is not'} eligible for a primary lease.`);
            }
            return canActAsPrimary;
        });
    }
    async shutdown() {
        // The shutdown() operations are idempotent and can be called even when
        // start() aborted (e.g. because it couldn't acquire the persistence lease).
        this._started = false;
        this.markClientZombied();
        if (this.clientMetadataRefresher) {
            this.clientMetadataRefresher.cancel();
            this.clientMetadataRefresher = null;
        }
        this.detachVisibilityHandler();
        this.detachWindowUnloadHook();
        // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
        // has obtained the primary lease.
        await this.simpleDb.runTransaction('shutdown', 'readwrite', [DbPrimaryClient.store, DbClientMetadata.store], simpleDbTxn => {
            const persistenceTransaction = new IndexedDbTransaction(simpleDbTxn, ListenSequence.INVALID);
            return this.releasePrimaryLeaseIfHeld(persistenceTransaction).next(() => this.removeClientMetadata(persistenceTransaction));
        });
        this.simpleDb.close();
        // Remove the entry marking the client as zombied from LocalStorage since
        // we successfully deleted its metadata from IndexedDb.
        this.removeClientZombiedEntry();
    }
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    filterActiveClients(clients, activityThresholdMs) {
        return clients.filter(client => this.isWithinAge(client.updateTimeMs, activityThresholdMs) &&
            !this.isClientZombied(client.clientId));
    }
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    getActiveClients() {
        return this.runTransaction('getActiveClients', 'readonly', txn => {
            return clientMetadataStore(txn)
                .loadAll()
                .next(clients => this.filterActiveClients(clients, MAX_CLIENT_AGE_MS).map(clientMetadata => clientMetadata.clientId));
        });
    }
    get started() {
        return this._started;
    }
    getMutationQueue(user) {
        return IndexedDbMutationQueue.forUser(user, this.serializer, this.indexManager, this.referenceDelegate);
    }
    getTargetCache() {
        return this.targetCache;
    }
    getRemoteDocumentCache() {
        return this.remoteDocumentCache;
    }
    getIndexManager() {
        return this.indexManager;
    }
    getBundleCache() {
        return this.bundleCache;
    }
    runTransaction(action, mode, transactionOperation) {
        logDebug(LOG_TAG$d, 'Starting transaction:', action);
        const simpleDbMode = mode === 'readonly' ? 'readonly' : 'readwrite';
        let persistenceTransaction;
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
        return this.simpleDb
            .runTransaction(action, simpleDbMode, ALL_STORES, simpleDbTxn => {
            persistenceTransaction = new IndexedDbTransaction(simpleDbTxn, this.listenSequence
                ? this.listenSequence.next()
                : ListenSequence.INVALID);
            if (mode === 'readwrite-primary') {
                // While we merely verify that we have (or can acquire) the lease
                // immediately, we wait to extend the primary lease until after
                // executing transactionOperation(). This ensures that even if the
                // transactionOperation takes a long time, we'll use a recent
                // leaseTimestampMs in the extended (or newly acquired) lease.
                return this.verifyPrimaryLease(persistenceTransaction)
                    .next(holdsPrimaryLease => {
                    if (holdsPrimaryLease) {
                        return /* holdsPrimaryLease= */ true;
                    }
                    return this.canActAsPrimary(persistenceTransaction);
                })
                    .next(holdsPrimaryLease => {
                    if (!holdsPrimaryLease) {
                        logError(`Failed to obtain primary lease for action '${action}'.`);
                        this.isPrimary = false;
                        this.queue.enqueueRetryable(() => this.primaryStateListener(false));
                        throw new FirestoreError(Code.FAILED_PRECONDITION, PRIMARY_LEASE_LOST_ERROR_MSG);
                    }
                    return transactionOperation(persistenceTransaction);
                })
                    .next(result => {
                    return this.acquireOrExtendPrimaryLease(persistenceTransaction).next(() => result);
                });
            }
            else {
                return this.verifyAllowTabSynchronization(persistenceTransaction).next(() => transactionOperation(persistenceTransaction));
            }
        })
            .then(result => {
            persistenceTransaction.raiseOnCommittedEvent();
            return result;
        });
    }
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    verifyAllowTabSynchronization(txn) {
        const store = primaryClientStore(txn);
        return store.get(DbPrimaryClient.key).next(currentPrimary => {
            const currentLeaseIsValid = currentPrimary !== null &&
                this.isWithinAge(currentPrimary.leaseTimestampMs, MAX_PRIMARY_ELIGIBLE_AGE_MS) &&
                !this.isClientZombied(currentPrimary.ownerId);
            if (currentLeaseIsValid && !this.isLocalClient(currentPrimary)) {
                if (!this.forceOwningTab &&
                    (!this.allowTabSynchronization ||
                        !currentPrimary.allowTabSynchronization)) {
                    throw new FirestoreError(Code.FAILED_PRECONDITION, PRIMARY_LEASE_EXCLUSIVE_ERROR_MSG);
                }
            }
        });
    }
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    acquireOrExtendPrimaryLease(txn) {
        const newPrimary = new DbPrimaryClient(this.clientId, this.allowTabSynchronization, Date.now());
        return primaryClientStore(txn).put(DbPrimaryClient.key, newPrimary);
    }
    static isAvailable() {
        return SimpleDb.isAvailable();
    }
    /** Checks the primary lease and removes it if we are the current primary. */
    releasePrimaryLeaseIfHeld(txn) {
        const store = primaryClientStore(txn);
        return store.get(DbPrimaryClient.key).next(primaryClient => {
            if (this.isLocalClient(primaryClient)) {
                logDebug(LOG_TAG$d, 'Releasing primary lease.');
                return store.delete(DbPrimaryClient.key);
            }
            else {
                return PersistencePromise.resolve();
            }
        });
    }
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */
    isWithinAge(updateTimeMs, maxAgeMs) {
        const now = Date.now();
        const minAcceptable = now - maxAgeMs;
        const maxAcceptable = now;
        if (updateTimeMs < minAcceptable) {
            return false;
        }
        else if (updateTimeMs > maxAcceptable) {
            logError(`Detected an update time that is in the future: ${updateTimeMs} > ${maxAcceptable}`);
            return false;
        }
        return true;
    }
    attachVisibilityHandler() {
        if (this.document !== null &&
            typeof this.document.addEventListener === 'function') {
            this.documentVisibilityHandler = () => {
                this.queue.enqueueAndForget(() => {
                    this.inForeground = this.document.visibilityState === 'visible';
                    return this.updateClientMetadataAndTryBecomePrimary();
                });
            };
            this.document.addEventListener('visibilitychange', this.documentVisibilityHandler);
            this.inForeground = this.document.visibilityState === 'visible';
        }
    }
    detachVisibilityHandler() {
        if (this.documentVisibilityHandler) {
            this.document.removeEventListener('visibilitychange', this.documentVisibilityHandler);
            this.documentVisibilityHandler = null;
        }
    }
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
    attachWindowUnloadHook() {
        var _a;
        if (typeof ((_a = this.window) === null || _a === void 0 ? void 0 : _a.addEventListener) === 'function') {
            this.windowUnloadHandler = () => {
                // Note: In theory, this should be scheduled on the AsyncQueue since it
                // accesses internal state. We execute this code directly during shutdown
                // to make sure it gets a chance to run.
                this.markClientZombied();
                if (isSafari() && navigator.appVersion.match(`Version/14`)) {
                    // On Safari 14, we do not run any cleanup actions as it might trigger
                    // a bug that prevents Safari from re-opening IndexedDB during the
                    // next page load.
                    // See https://bugs.webkit.org/show_bug.cgi?id=226547
                    this.queue.enterRestrictedMode(/* purgeExistingTasks= */ true);
                }
                this.queue.enqueueAndForget(() => {
                    // Attempt graceful shutdown (including releasing our primary lease),
                    // but there's no guarantee it will complete.
                    return this.shutdown();
                });
            };
            this.window.addEventListener('pagehide', this.windowUnloadHandler);
        }
    }
    detachWindowUnloadHook() {
        if (this.windowUnloadHandler) {
            this.window.removeEventListener('pagehide', this.windowUnloadHandler);
            this.windowUnloadHandler = null;
        }
    }
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    isClientZombied(clientId) {
        var _a;
        try {
            const isZombied = ((_a = this.webStorage) === null || _a === void 0 ? void 0 : _a.getItem(this.zombiedClientLocalStorageKey(clientId))) !== null;
            logDebug(LOG_TAG$d, `Client '${clientId}' ${isZombied ? 'is' : 'is not'} zombied in LocalStorage`);
            return isZombied;
        }
        catch (e) {
            // Gracefully handle if LocalStorage isn't working.
            logError(LOG_TAG$d, 'Failed to get zombied client id.', e);
            return false;
        }
    }
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    markClientZombied() {
        if (!this.webStorage) {
            return;
        }
        try {
            this.webStorage.setItem(this.zombiedClientLocalStorageKey(this.clientId), String(Date.now()));
        }
        catch (e) {
            // Gracefully handle if LocalStorage isn't available / working.
            logError('Failed to set zombie client id.', e);
        }
    }
    /** Removes the zombied client entry if it exists. */
    removeClientZombiedEntry() {
        if (!this.webStorage) {
            return;
        }
        try {
            this.webStorage.removeItem(this.zombiedClientLocalStorageKey(this.clientId));
        }
        catch (e) {
            // Ignore
        }
    }
    zombiedClientLocalStorageKey(clientId) {
        return `${ZOMBIED_CLIENTS_KEY_PREFIX}_${this.persistenceKey}_${clientId}`;
    }
}
/**
 * Helper to get a typed SimpleDbStore for the primary client object store.
 */
function primaryClientStore(txn) {
    return getStore(txn, DbPrimaryClient.store);
}
/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */
function clientMetadataStore(txn) {
    return getStore(txn, DbClientMetadata.store);
}
/**
 * Generates a string used as a prefix when storing data in IndexedDB and
 * LocalStorage.
 */
function indexedDbStoragePrefix(databaseId, persistenceKey) {
    // Use two different prefix formats:
    //
    //   * firestore / persistenceKey / projectID . databaseID / ...
    //   * firestore / persistenceKey / projectID / ...
    //
    // projectIDs are DNS-compatible names and cannot contain dots
    // so there's no danger of collisions.
    let database = databaseId.projectId;
    if (!databaseId.isDefaultDatabase) {
        database += '.' + databaseId.database;
    }
    return 'firestore/' + persistenceKey + '/' + database + '/';
}
async function indexedDbClearPersistence(persistenceKey) {
    if (!SimpleDb.isAvailable()) {
        return Promise.resolve();
    }
    const dbName = persistenceKey + MAIN_DATABASE;
    await SimpleDb.delete(dbName);
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
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */
class LocalDocumentsView {
    constructor(remoteDocumentCache, mutationQueue, indexManager) {
        this.remoteDocumentCache = remoteDocumentCache;
        this.mutationQueue = mutationQueue;
        this.indexManager = indexManager;
    }
    /**
     * Get the local view of the document identified by `key`.
     *
     * @returns Local view of the document or null if we don't have any cached
     * state for it.
     */
    getDocument(transaction, key) {
        return this.mutationQueue
            .getAllMutationBatchesAffectingDocumentKey(transaction, key)
            .next(batches => this.getDocumentInternal(transaction, key, batches));
    }
    /** Internal version of `getDocument` that allows reusing batches. */
    getDocumentInternal(transaction, key, inBatches) {
        return this.remoteDocumentCache.getEntry(transaction, key).next(doc => {
            for (const batch of inBatches) {
                batch.applyToLocalView(doc);
            }
            return doc;
        });
    }
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    applyLocalMutationsToDocuments(docs, batches) {
        docs.forEach((key, localView) => {
            for (const batch of batches) {
                batch.applyToLocalView(localView);
            }
        });
    }
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */
    getDocuments(transaction, keys) {
        return this.remoteDocumentCache
            .getEntries(transaction, keys)
            .next(docs => this.applyLocalViewToDocuments(transaction, docs).next(() => docs));
    }
    /**
     * Applies the local view the given `baseDocs` without retrieving documents
     * from the local store.
     */
    applyLocalViewToDocuments(transaction, baseDocs) {
        return this.mutationQueue
            .getAllMutationBatchesAffectingDocumentKeys(transaction, baseDocs)
            .next(batches => this.applyLocalMutationsToDocuments(baseDocs, batches));
    }
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction - The persistence transaction.
     * @param query - The query to match documents against.
     * @param sinceReadTime - If not set to SnapshotVersion.min(), return only
     *     documents that have been read since this snapshot version (exclusive).
     */
    getDocumentsMatchingQuery(transaction, query, sinceReadTime) {
        if (isDocumentQuery$1(query)) {
            return this.getDocumentsMatchingDocumentQuery(transaction, query.path);
        }
        else if (isCollectionGroupQuery(query)) {
            return this.getDocumentsMatchingCollectionGroupQuery(transaction, query, sinceReadTime);
        }
        else {
            return this.getDocumentsMatchingCollectionQuery(transaction, query, sinceReadTime);
        }
    }
    getDocumentsMatchingDocumentQuery(transaction, docPath) {
        // Just do a simple document lookup.
        return this.getDocument(transaction, new DocumentKey(docPath)).next(document => {
            let result = documentMap();
            if (document.isFoundDocument()) {
                result = result.insert(document.key, document);
            }
            return result;
        });
    }
    getDocumentsMatchingCollectionGroupQuery(transaction, query, sinceReadTime) {
        const collectionId = query.collectionGroup;
        let results = documentMap();
        return this.indexManager
            .getCollectionParents(transaction, collectionId)
            .next(parents => {
            // Perform a collection query against each parent that contains the
            // collectionId and aggregate the results.
            return PersistencePromise.forEach(parents, (parent) => {
                const collectionQuery = asCollectionQueryAtPath(query, parent.child(collectionId));
                return this.getDocumentsMatchingCollectionQuery(transaction, collectionQuery, sinceReadTime).next(r => {
                    r.forEach((key, doc) => {
                        results = results.insert(key, doc);
                    });
                });
            }).next(() => results);
        });
    }
    getDocumentsMatchingCollectionQuery(transaction, query, sinceReadTime) {
        // Query the remote documents and overlay mutations.
        let results;
        let mutationBatches;
        return this.remoteDocumentCache
            .getDocumentsMatchingQuery(transaction, query, sinceReadTime)
            .next(queryResults => {
            results = queryResults;
            return this.mutationQueue.getAllMutationBatchesAffectingQuery(transaction, query);
        })
            .next(matchingMutationBatches => {
            mutationBatches = matchingMutationBatches;
            // It is possible that a PatchMutation can make a document match a query, even if
            // the version in the RemoteDocumentCache is not a match yet (waiting for server
            // to ack). To handle this, we find all document keys affected by the PatchMutations
            // that are not in `result` yet, and back fill them via `remoteDocumentCache.getEntries`,
            // otherwise those `PatchMutations` will be ignored because no base document can be found,
            // and lead to missing result for the query.
            return this.addMissingBaseDocuments(transaction, mutationBatches, results).next(mergedDocuments => {
                results = mergedDocuments;
                for (const batch of mutationBatches) {
                    for (const mutation of batch.mutations) {
                        const key = mutation.key;
                        let document = results.get(key);
                        if (document == null) {
                            // Create invalid document to apply mutations on top of
                            document = MutableDocument.newInvalidDocument(key);
                            results = results.insert(key, document);
                        }
                        applyMutationToLocalView(mutation, document, batch.localWriteTime);
                        if (!document.isFoundDocument()) {
                            results = results.remove(key);
                        }
                    }
                }
            });
        })
            .next(() => {
            // Finally, filter out any documents that don't actually match
            // the query.
            results.forEach((key, doc) => {
                if (!queryMatches(query, doc)) {
                    results = results.remove(key);
                }
            });
            return results;
        });
    }
    addMissingBaseDocuments(transaction, matchingMutationBatches, existingDocuments) {
        let missingBaseDocEntriesForPatching = documentKeySet();
        for (const batch of matchingMutationBatches) {
            for (const mutation of batch.mutations) {
                if (mutation instanceof PatchMutation &&
                    existingDocuments.get(mutation.key) === null) {
                    missingBaseDocEntriesForPatching = missingBaseDocEntriesForPatching.add(mutation.key);
                }
            }
        }
        let mergedDocuments = existingDocuments;
        return this.remoteDocumentCache
            .getEntries(transaction, missingBaseDocEntriesForPatching)
            .next(missingBaseDocs => {
            missingBaseDocs.forEach((key, doc) => {
                if (doc.isFoundDocument()) {
                    mergedDocuments = mergedDocuments.insert(key, doc);
                }
            });
            return mergedDocuments;
        });
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
const LOG_TAG$c = 'LocalStore';
/**
 * The maximum time to leave a resume token buffered without writing it out.
 * This value is arbitrary: it's long enough to avoid several writes
 * (possibly indefinitely if updates come more frequently than this) but
 * short enough that restarting after crashing will still have a pretty
 * recent resume token.
 */
const RESUME_TOKEN_MAX_AGE_MICROS = 5 * 60 * 1e6;
/**
 * Implements `LocalStore` interface.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */
class LocalStoreImpl {
    constructor(
    /** Manages our in-memory or durable persistence. */
    persistence, queryEngine, initialUser, serializer) {
        this.persistence = persistence;
        this.queryEngine = queryEngine;
        this.serializer = serializer;
        /**
         * Maps a targetID to data about its target.
         *
         * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
         * of `applyRemoteEvent()` idempotent.
         */
        this.targetDataByTarget = new SortedMap(primitiveComparator);
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.targetIdByTarget = new ObjectMap(t => canonifyTarget(t), targetEquals);
        /**
         * The read time of the last entry processed by `getNewDocumentChanges()`.
         *
         * PORTING NOTE: This is only used for multi-tab synchronization.
         */
        this.lastDocumentChangeReadTime = SnapshotVersion.min();
        this.mutationQueue = persistence.getMutationQueue(initialUser);
        this.remoteDocuments = persistence.getRemoteDocumentCache();
        this.targetCache = persistence.getTargetCache();
        this.localDocuments = new LocalDocumentsView(this.remoteDocuments, this.mutationQueue, this.persistence.getIndexManager());
        this.bundleCache = persistence.getBundleCache();
        this.queryEngine.setLocalDocumentsView(this.localDocuments);
    }
    collectGarbage(garbageCollector) {
        return this.persistence.runTransaction('Collect garbage', 'readwrite-primary', txn => garbageCollector.collect(txn, this.targetDataByTarget));
    }
}
function newLocalStore(
/** Manages our in-memory or durable persistence. */
persistence, queryEngine, initialUser, serializer) {
    return new LocalStoreImpl(persistence, queryEngine, initialUser, serializer);
}
/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
// PORTING NOTE: Android and iOS only return the documents affected by the
// change.
async function localStoreHandleUserChange(localStore, user) {
    const localStoreImpl = debugCast(localStore);
    let newMutationQueue = localStoreImpl.mutationQueue;
    let newLocalDocuments = localStoreImpl.localDocuments;
    const result = await localStoreImpl.persistence.runTransaction('Handle user change', 'readonly', txn => {
        // Swap out the mutation queue, grabbing the pending mutation batches
        // before and after.
        let oldBatches;
        return localStoreImpl.mutationQueue
            .getAllMutationBatches(txn)
            .next(promisedOldBatches => {
            oldBatches = promisedOldBatches;
            newMutationQueue = localStoreImpl.persistence.getMutationQueue(user);
            // Recreate our LocalDocumentsView using the new
            // MutationQueue.
            newLocalDocuments = new LocalDocumentsView(localStoreImpl.remoteDocuments, newMutationQueue, localStoreImpl.persistence.getIndexManager());
            return newMutationQueue.getAllMutationBatches(txn);
        })
            .next(newBatches => {
            const removedBatchIds = [];
            const addedBatchIds = [];
            // Union the old/new changed keys.
            let changedKeys = documentKeySet();
            for (const batch of oldBatches) {
                removedBatchIds.push(batch.batchId);
                for (const mutation of batch.mutations) {
                    changedKeys = changedKeys.add(mutation.key);
                }
            }
            for (const batch of newBatches) {
                addedBatchIds.push(batch.batchId);
                for (const mutation of batch.mutations) {
                    changedKeys = changedKeys.add(mutation.key);
                }
            }
            // Return the set of all (potentially) changed documents and the list
            // of mutation batch IDs that were affected by change.
            return newLocalDocuments
                .getDocuments(txn, changedKeys)
                .next(affectedDocuments => {
                return {
                    affectedDocuments,
                    removedBatchIds,
                    addedBatchIds
                };
            });
        });
    });
    localStoreImpl.mutationQueue = newMutationQueue;
    localStoreImpl.localDocuments = newLocalDocuments;
    localStoreImpl.queryEngine.setLocalDocumentsView(localStoreImpl.localDocuments);
    return result;
}
/* Accepts locally generated Mutations and commit them to storage. */
function localStoreWriteLocally(localStore, mutations) {
    const localStoreImpl = debugCast(localStore);
    const localWriteTime = Timestamp.now();
    const keys = mutations.reduce((keys, m) => keys.add(m.key), documentKeySet());
    let existingDocs;
    return localStoreImpl.persistence
        .runTransaction('Locally write mutations', 'readwrite', txn => {
        // Load and apply all existing mutations. This lets us compute the
        // current base state for all non-idempotent transforms before applying
        // any additional user-provided writes.
        return localStoreImpl.localDocuments
            .getDocuments(txn, keys)
            .next(docs => {
            existingDocs = docs;
            // For non-idempotent mutations (such as `FieldValue.increment()`),
            // we record the base state in a separate patch mutation. This is
            // later used to guarantee consistent values and prevents flicker
            // even if the backend sends us an update that already includes our
            // transform.
            const baseMutations = [];
            for (const mutation of mutations) {
                const baseValue = extractMutationBaseValue(mutation, existingDocs.get(mutation.key));
                if (baseValue != null) {
                    // NOTE: The base state should only be applied if there's some
                    // existing document to override, so use a Precondition of
                    // exists=true
                    baseMutations.push(new PatchMutation(mutation.key, baseValue, extractFieldMask(baseValue.value.mapValue), Precondition.exists(true)));
                }
            }
            return localStoreImpl.mutationQueue.addMutationBatch(txn, localWriteTime, baseMutations, mutations);
        });
    })
        .then(batch => {
        batch.applyToLocalDocumentSet(existingDocs);
        return { batchId: batch.batchId, changes: existingDocs };
    });
}
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
 */
function localStoreAcknowledgeBatch(localStore, batchResult) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('Acknowledge batch', 'readwrite-primary', txn => {
        const affected = batchResult.batch.keys();
        const documentBuffer = localStoreImpl.remoteDocuments.newChangeBuffer({
            trackRemovals: true // Make sure document removals show up in `getNewDocumentChanges()`
        });
        return applyWriteToRemoteDocuments(localStoreImpl, txn, batchResult, documentBuffer)
            .next(() => documentBuffer.apply(txn))
            .next(() => localStoreImpl.mutationQueue.performConsistencyCheck(txn))
            .next(() => localStoreImpl.localDocuments.getDocuments(txn, affected));
    });
}
/**
 * Removes mutations from the MutationQueue for the specified batch;
 * LocalDocuments will be recalculated.
 *
 * @returns The resulting modified documents.
 */
function localStoreRejectBatch(localStore, batchId) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('Reject batch', 'readwrite-primary', txn => {
        let affectedKeys;
        return localStoreImpl.mutationQueue
            .lookupMutationBatch(txn, batchId)
            .next((batch) => {
            hardAssert(batch !== null);
            affectedKeys = batch.keys();
            return localStoreImpl.mutationQueue.removeMutationBatch(txn, batch);
        })
            .next(() => localStoreImpl.mutationQueue.performConsistencyCheck(txn))
            .next(() => localStoreImpl.localDocuments.getDocuments(txn, affectedKeys));
    });
}
/**
 * Returns the largest (latest) batch id in mutation queue that is pending
 * server response.
 *
 * Returns `BATCHID_UNKNOWN` if the queue is empty.
 */
function localStoreGetHighestUnacknowledgedBatchId(localStore) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('Get highest unacknowledged batch id', 'readonly', txn => localStoreImpl.mutationQueue.getHighestUnacknowledgedBatchId(txn));
}
/**
 * Returns the last consistent snapshot processed (used by the RemoteStore to
 * determine whether to buffer incoming snapshots from the backend).
 */
function localStoreGetLastRemoteSnapshotVersion(localStore) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('Get last remote snapshot version', 'readonly', txn => localStoreImpl.targetCache.getLastRemoteSnapshotVersion(txn));
}
/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */
function localStoreApplyRemoteEventToLocalCache(localStore, remoteEvent) {
    const localStoreImpl = debugCast(localStore);
    const remoteVersion = remoteEvent.snapshotVersion;
    let newTargetDataByTargetMap = localStoreImpl.targetDataByTarget;
    return localStoreImpl.persistence
        .runTransaction('Apply remote event', 'readwrite-primary', txn => {
        const documentBuffer = localStoreImpl.remoteDocuments.newChangeBuffer({
            trackRemovals: true // Make sure document removals show up in `getNewDocumentChanges()`
        });
        // Reset newTargetDataByTargetMap in case this transaction gets re-run.
        newTargetDataByTargetMap = localStoreImpl.targetDataByTarget;
        const promises = [];
        remoteEvent.targetChanges.forEach((change, targetId) => {
            const oldTargetData = newTargetDataByTargetMap.get(targetId);
            if (!oldTargetData) {
                return;
            }
            // Only update the remote keys if the target is still active. This
            // ensures that we can persist the updated target data along with
            // the updated assignment.
            promises.push(localStoreImpl.targetCache
                .removeMatchingKeys(txn, change.removedDocuments, targetId)
                .next(() => {
                return localStoreImpl.targetCache.addMatchingKeys(txn, change.addedDocuments, targetId);
            }));
            const resumeToken = change.resumeToken;
            // Update the resume token if the change includes one.
            if (resumeToken.approximateByteSize() > 0) {
                const newTargetData = oldTargetData
                    .withResumeToken(resumeToken, remoteVersion)
                    .withSequenceNumber(txn.currentSequenceNumber);
                newTargetDataByTargetMap = newTargetDataByTargetMap.insert(targetId, newTargetData);
                // Update the target data if there are target changes (or if
                // sufficient time has passed since the last update).
                if (shouldPersistTargetData(oldTargetData, newTargetData, change)) {
                    promises.push(localStoreImpl.targetCache.updateTargetData(txn, newTargetData));
                }
            }
        });
        let changedDocs = mutableDocumentMap();
        remoteEvent.documentUpdates.forEach((key, doc) => {
            if (remoteEvent.resolvedLimboDocuments.has(key)) {
                promises.push(localStoreImpl.persistence.referenceDelegate.updateLimboDocument(txn, key));
            }
        });
        // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
        // documents in advance in a single call.
        promises.push(populateDocumentChangeBuffer(txn, documentBuffer, remoteEvent.documentUpdates, remoteVersion, undefined).next(result => {
            changedDocs = result;
        }));
        // HACK: The only reason we allow a null snapshot version is so that we
        // can synthesize remote events when we get permission denied errors while
        // trying to resolve the state of a locally cached document that is in
        // limbo.
        if (!remoteVersion.isEqual(SnapshotVersion.min())) {
            const updateRemoteVersion = localStoreImpl.targetCache
                .getLastRemoteSnapshotVersion(txn)
                .next(lastRemoteSnapshotVersion => {
                return localStoreImpl.targetCache.setTargetsMetadata(txn, txn.currentSequenceNumber, remoteVersion);
            });
            promises.push(updateRemoteVersion);
        }
        return PersistencePromise.waitFor(promises)
            .next(() => documentBuffer.apply(txn))
            .next(() => localStoreImpl.localDocuments.applyLocalViewToDocuments(txn, changedDocs))
            .next(() => changedDocs);
    })
        .then(changedDocs => {
        localStoreImpl.targetDataByTarget = newTargetDataByTargetMap;
        return changedDocs;
    });
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
 */
function populateDocumentChangeBuffer(txn, documentBuffer, documents, globalVersion, 
// TODO(wuandy): We could add `readTime` to MaybeDocument instead to remove
// this parameter.
documentVersions) {
    let updatedKeys = documentKeySet();
    documents.forEach(k => (updatedKeys = updatedKeys.add(k)));
    return documentBuffer.getEntries(txn, updatedKeys).next(existingDocs => {
        let changedDocs = mutableDocumentMap();
        documents.forEach((key, doc) => {
            const existingDoc = existingDocs.get(key);
            const docReadTime = (documentVersions === null || documentVersions === void 0 ? void 0 : documentVersions.get(key)) || globalVersion;
            // Note: The order of the steps below is important, since we want
            // to ensure that rejected limbo resolutions (which fabricate
            // NoDocuments with SnapshotVersion.min()) never add documents to
            // cache.
            if (doc.isNoDocument() && doc.version.isEqual(SnapshotVersion.min())) {
                // NoDocuments with SnapshotVersion.min() are used in manufactured
                // events. We remove these documents from cache since we lost
                // access.
                documentBuffer.removeEntry(key, docReadTime);
                changedDocs = changedDocs.insert(key, doc);
            }
            else if (!existingDoc.isValidDocument() ||
                doc.version.compareTo(existingDoc.version) > 0 ||
                (doc.version.compareTo(existingDoc.version) === 0 &&
                    existingDoc.hasPendingWrites)) {
                documentBuffer.addEntry(doc, docReadTime);
                changedDocs = changedDocs.insert(key, doc);
            }
            else {
                logDebug(LOG_TAG$c, 'Ignoring outdated watch update for ', key, '. Current version:', existingDoc.version, ' Watch version:', doc.version);
            }
        });
        return changedDocs;
    });
}
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
function shouldPersistTargetData(oldTargetData, newTargetData, change) {
    hardAssert(newTargetData.resumeToken.approximateByteSize() > 0);
    // Always persist target data if we don't already have a resume token.
    if (oldTargetData.resumeToken.approximateByteSize() === 0) {
        return true;
    }
    // Don't allow resume token changes to be buffered indefinitely. This
    // allows us to be reasonably up-to-date after a crash and avoids needing
    // to loop over all active queries on shutdown. Especially in the browser
    // we may not get time to do anything interesting while the current tab is
    // closing.
    const timeDelta = newTargetData.snapshotVersion.toMicroseconds() -
        oldTargetData.snapshotVersion.toMicroseconds();
    if (timeDelta >= RESUME_TOKEN_MAX_AGE_MICROS) {
        return true;
    }
    // Otherwise if the only thing that has changed about a target is its resume
    // token it's not worth persisting. Note that the RemoteStore keeps an
    // in-memory view of the currently active targets which includes the current
    // resume token, so stream failure or user changes will still use an
    // up-to-date resume token regardless of what we do here.
    const changes = change.addedDocuments.size +
        change.modifiedDocuments.size +
        change.removedDocuments.size;
    return changes > 0;
}
/**
 * Notifies local store of the changed views to locally pin documents.
 */
async function localStoreNotifyLocalViewChanges(localStore, viewChanges) {
    const localStoreImpl = debugCast(localStore);
    try {
        await localStoreImpl.persistence.runTransaction('notifyLocalViewChanges', 'readwrite', txn => {
            return PersistencePromise.forEach(viewChanges, (viewChange) => {
                return PersistencePromise.forEach(viewChange.addedKeys, (key) => localStoreImpl.persistence.referenceDelegate.addReference(txn, viewChange.targetId, key)).next(() => PersistencePromise.forEach(viewChange.removedKeys, (key) => localStoreImpl.persistence.referenceDelegate.removeReference(txn, viewChange.targetId, key)));
            });
        });
    }
    catch (e) {
        if (isIndexedDbTransactionError(e)) {
            // If `notifyLocalViewChanges` fails, we did not advance the sequence
            // number for the documents that were included in this transaction.
            // This might trigger them to be deleted earlier than they otherwise
            // would have, but it should not invalidate the integrity of the data.
            logDebug(LOG_TAG$c, 'Failed to update sequence numbers: ' + e);
        }
        else {
            throw e;
        }
    }
    for (const viewChange of viewChanges) {
        const targetId = viewChange.targetId;
        if (!viewChange.fromCache) {
            const targetData = localStoreImpl.targetDataByTarget.get(targetId);
            // Advance the last limbo free snapshot version
            const lastLimboFreeSnapshotVersion = targetData.snapshotVersion;
            const updatedTargetData = targetData.withLastLimboFreeSnapshotVersion(lastLimboFreeSnapshotVersion);
            localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.insert(targetId, updatedTargetData);
        }
    }
}
/**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */
function localStoreGetNextMutationBatch(localStore, afterBatchId) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('Get next mutation batch', 'readonly', txn => {
        if (afterBatchId === undefined) {
            afterBatchId = BATCHID_UNKNOWN;
        }
        return localStoreImpl.mutationQueue.getNextMutationBatchAfterBatchId(txn, afterBatchId);
    });
}
/**
 * Reads the current value of a Document with a given key or null if not
 * found - used for testing.
 */
function localStoreReadDocument(localStore, key) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('read document', 'readonly', txn => localStoreImpl.localDocuments.getDocument(txn, key));
}
/**
 * Assigns the given target an internal ID so that its results can be pinned so
 * they don't get GC'd. A target must be allocated in the local store before
 * the store can be used to manage its view.
 *
 * Allocating an already allocated `Target` will return the existing `TargetData`
 * for that `Target`.
 */
function localStoreAllocateTarget(localStore, target) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence
        .runTransaction('Allocate target', 'readwrite', txn => {
        let targetData;
        return localStoreImpl.targetCache
            .getTargetData(txn, target)
            .next((cached) => {
            if (cached) {
                // This target has been listened to previously, so reuse the
                // previous targetID.
                // TODO(mcg): freshen last accessed date?
                targetData = cached;
                return PersistencePromise.resolve(targetData);
            }
            else {
                return localStoreImpl.targetCache
                    .allocateTargetId(txn)
                    .next(targetId => {
                    targetData = new TargetData(target, targetId, 0 /* Listen */, txn.currentSequenceNumber);
                    return localStoreImpl.targetCache
                        .addTargetData(txn, targetData)
                        .next(() => targetData);
                });
            }
        });
    })
        .then(targetData => {
        // If Multi-Tab is enabled, the existing target data may be newer than
        // the in-memory data
        const cachedTargetData = localStoreImpl.targetDataByTarget.get(targetData.targetId);
        if (cachedTargetData === null ||
            targetData.snapshotVersion.compareTo(cachedTargetData.snapshotVersion) >
                0) {
            localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.insert(targetData.targetId, targetData);
            localStoreImpl.targetIdByTarget.set(target, targetData.targetId);
        }
        return targetData;
    });
}
/**
 * Returns the TargetData as seen by the LocalStore, including updates that may
 * have not yet been persisted to the TargetCache.
 */
// Visible for testing.
function localStoreGetTargetData(localStore, transaction, target) {
    const localStoreImpl = debugCast(localStore);
    const targetId = localStoreImpl.targetIdByTarget.get(target);
    if (targetId !== undefined) {
        return PersistencePromise.resolve(localStoreImpl.targetDataByTarget.get(targetId));
    }
    else {
        return localStoreImpl.targetCache.getTargetData(transaction, target);
    }
}
/**
 * Unpins all the documents associated with the given target. If
 * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
 * directly removes the associated target data from the target cache.
 *
 * Releasing a non-existing `Target` is a no-op.
 */
// PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
async function localStoreReleaseTarget(localStore, targetId, keepPersistedTargetData) {
    const localStoreImpl = debugCast(localStore);
    const targetData = localStoreImpl.targetDataByTarget.get(targetId);
    const mode = keepPersistedTargetData ? 'readwrite' : 'readwrite-primary';
    try {
        if (!keepPersistedTargetData) {
            await localStoreImpl.persistence.runTransaction('Release target', mode, txn => {
                return localStoreImpl.persistence.referenceDelegate.removeTarget(txn, targetData);
            });
        }
    }
    catch (e) {
        if (isIndexedDbTransactionError(e)) {
            // All `releaseTarget` does is record the final metadata state for the
            // target, but we've been recording this periodically during target
            // activity. If we lose this write this could cause a very slight
            // difference in the order of target deletion during GC, but we
            // don't define exact LRU semantics so this is acceptable.
            logDebug(LOG_TAG$c, `Failed to update sequence numbers for target ${targetId}: ${e}`);
        }
        else {
            throw e;
        }
    }
    localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.remove(targetId);
    localStoreImpl.targetIdByTarget.delete(targetData.target);
}
/**
 * Runs the specified query against the local store and returns the results,
 * potentially taking advantage of query data from previous executions (such
 * as the set of remote keys).
 *
 * @param usePreviousResults - Whether results from previous executions can
 * be used to optimize this query execution.
 */
function localStoreExecuteQuery(localStore, query, usePreviousResults) {
    const localStoreImpl = debugCast(localStore);
    let lastLimboFreeSnapshotVersion = SnapshotVersion.min();
    let remoteKeys = documentKeySet();
    return localStoreImpl.persistence.runTransaction('Execute query', 'readonly', txn => {
        return localStoreGetTargetData(localStoreImpl, txn, queryToTarget(query))
            .next(targetData => {
            if (targetData) {
                lastLimboFreeSnapshotVersion =
                    targetData.lastLimboFreeSnapshotVersion;
                return localStoreImpl.targetCache
                    .getMatchingKeysForTargetId(txn, targetData.targetId)
                    .next(result => {
                    remoteKeys = result;
                });
            }
        })
            .next(() => localStoreImpl.queryEngine.getDocumentsMatchingQuery(txn, query, usePreviousResults
            ? lastLimboFreeSnapshotVersion
            : SnapshotVersion.min(), usePreviousResults ? remoteKeys : documentKeySet()))
            .next(documents => {
            return { documents, remoteKeys };
        });
    });
}
function applyWriteToRemoteDocuments(localStoreImpl, txn, batchResult, documentBuffer) {
    const batch = batchResult.batch;
    const docKeys = batch.keys();
    let promiseChain = PersistencePromise.resolve();
    docKeys.forEach(docKey => {
        promiseChain = promiseChain
            .next(() => documentBuffer.getEntry(txn, docKey))
            .next(doc => {
            const ackVersion = batchResult.docVersions.get(docKey);
            hardAssert(ackVersion !== null);
            if (doc.version.compareTo(ackVersion) < 0) {
                batch.applyToRemoteDocument(doc, batchResult);
                if (doc.isValidDocument()) {
                    // We use the commitVersion as the readTime rather than the
                    // document's updateTime since the updateTime is not advanced
                    // for updates that do not modify the underlying document.
                    documentBuffer.addEntry(doc, batchResult.commitVersion);
                }
            }
        });
    });
    return promiseChain.next(() => localStoreImpl.mutationQueue.removeMutationBatch(txn, batch));
}
/** Returns the local view of the documents affected by a mutation batch. */
// PORTING NOTE: Multi-Tab only.
function localStoreLookupMutationDocuments(localStore, batchId) {
    const localStoreImpl = debugCast(localStore);
    const mutationQueueImpl = debugCast(localStoreImpl.mutationQueue);
    return localStoreImpl.persistence.runTransaction('Lookup mutation documents', 'readonly', txn => {
        return mutationQueueImpl.lookupMutationKeys(txn, batchId).next(keys => {
            if (keys) {
                return localStoreImpl.localDocuments.getDocuments(txn, keys);
            }
            else {
                return PersistencePromise.resolve(null);
            }
        });
    });
}
// PORTING NOTE: Multi-Tab only.
function localStoreRemoveCachedMutationBatchMetadata(localStore, batchId) {
    const mutationQueueImpl = debugCast(debugCast(localStore, LocalStoreImpl).mutationQueue);
    mutationQueueImpl.removeCachedMutationKeys(batchId);
}
// PORTING NOTE: Multi-Tab only.
function localStoreGetActiveClients(localStore) {
    const persistenceImpl = debugCast(debugCast(localStore, LocalStoreImpl).persistence);
    return persistenceImpl.getActiveClients();
}
// PORTING NOTE: Multi-Tab only.
function localStoreGetCachedTarget(localStore, targetId) {
    const localStoreImpl = debugCast(localStore);
    const targetCacheImpl = debugCast(localStoreImpl.targetCache);
    const cachedTargetData = localStoreImpl.targetDataByTarget.get(targetId);
    if (cachedTargetData) {
        return Promise.resolve(cachedTargetData.target);
    }
    else {
        return localStoreImpl.persistence.runTransaction('Get target data', 'readonly', txn => {
            return targetCacheImpl
                .getTargetDataForTarget(txn, targetId)
                .next(targetData => (targetData ? targetData.target : null));
        });
    }
}
/**
 * Returns the set of documents that have been updated since the last call.
 * If this is the first call, returns the set of changes since client
 * initialization. Further invocations will return document that have changed
 * since the prior call.
 */
// PORTING NOTE: Multi-Tab only.
function localStoreGetNewDocumentChanges(localStore) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence
        .runTransaction('Get new document changes', 'readonly', txn => remoteDocumentCacheGetNewDocumentChanges(localStoreImpl.remoteDocuments, txn, localStoreImpl.lastDocumentChangeReadTime))
        .then(({ changedDocs, readTime }) => {
        localStoreImpl.lastDocumentChangeReadTime = readTime;
        return changedDocs;
    });
}
/**
 * Reads the newest document change from persistence and moves the internal
 * synchronization marker forward so that calls to `getNewDocumentChanges()`
 * only return changes that happened after client initialization.
 */
// PORTING NOTE: Multi-Tab only.
async function localStoreSynchronizeLastDocumentChangeReadTime(localStore) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence
        .runTransaction('Synchronize last document change read time', 'readonly', txn => remoteDocumentCacheGetLastReadTime(txn))
        .then(readTime => {
        localStoreImpl.lastDocumentChangeReadTime = readTime;
    });
}
/**
 * Creates a new target using the given bundle name, which will be used to
 * hold the keys of all documents from the bundle in query-document mappings.
 * This ensures that the loaded documents do not get garbage collected
 * right away.
 */
function umbrellaTarget(bundleName) {
    // It is OK that the path used for the query is not valid, because this will
    // not be read and queried.
    return queryToTarget(newQueryForPath(ResourcePath.fromString(`__bundle__/docs/${bundleName}`)));
}
/**
 * Applies the documents from a bundle to the "ground-state" (remote)
 * documents.
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */
async function localStoreApplyBundledDocuments(localStore, bundleConverter, documents, bundleName) {
    const localStoreImpl = debugCast(localStore);
    let documentKeys = documentKeySet();
    let documentMap = mutableDocumentMap();
    let versionMap = documentVersionMap();
    for (const bundleDoc of documents) {
        const documentKey = bundleConverter.toDocumentKey(bundleDoc.metadata.name);
        if (bundleDoc.document) {
            documentKeys = documentKeys.add(documentKey);
        }
        documentMap = documentMap.insert(documentKey, bundleConverter.toMutableDocument(bundleDoc));
        versionMap = versionMap.insert(documentKey, bundleConverter.toSnapshotVersion(bundleDoc.metadata.readTime));
    }
    const documentBuffer = localStoreImpl.remoteDocuments.newChangeBuffer({
        trackRemovals: true // Make sure document removals show up in `getNewDocumentChanges()`
    });
    // Allocates a target to hold all document keys from the bundle, such that
    // they will not get garbage collected right away.
    const umbrellaTargetData = await localStoreAllocateTarget(localStoreImpl, umbrellaTarget(bundleName));
    return localStoreImpl.persistence.runTransaction('Apply bundle documents', 'readwrite', txn => {
        return populateDocumentChangeBuffer(txn, documentBuffer, documentMap, SnapshotVersion.min(), versionMap)
            .next(changedDocs => {
            documentBuffer.apply(txn);
            return changedDocs;
        })
            .next(changedDocs => {
            return localStoreImpl.targetCache
                .removeMatchingKeysForTargetId(txn, umbrellaTargetData.targetId)
                .next(() => localStoreImpl.targetCache.addMatchingKeys(txn, documentKeys, umbrellaTargetData.targetId))
                .next(() => localStoreImpl.localDocuments.applyLocalViewToDocuments(txn, changedDocs))
                .next(() => changedDocs);
        });
    });
}
/**
 * Returns a promise of a boolean to indicate if the given bundle has already
 * been loaded and the create time is newer than the current loading bundle.
 */
function localStoreHasNewerBundle(localStore, bundleMetadata) {
    const localStoreImpl = debugCast(localStore);
    const currentReadTime = fromVersion(bundleMetadata.createTime);
    return localStoreImpl.persistence
        .runTransaction('hasNewerBundle', 'readonly', transaction => {
        return localStoreImpl.bundleCache.getBundleMetadata(transaction, bundleMetadata.id);
    })
        .then(cached => {
        return !!cached && cached.createTime.compareTo(currentReadTime) >= 0;
    });
}
/**
 * Saves the given `BundleMetadata` to local persistence.
 */
function localStoreSaveBundle(localStore, bundleMetadata) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('Save bundle', 'readwrite', transaction => {
        return localStoreImpl.bundleCache.saveBundleMetadata(transaction, bundleMetadata);
    });
}
/**
 * Returns a promise of a `NamedQuery` associated with given query name. Promise
 * resolves to undefined if no persisted data can be found.
 */
function localStoreGetNamedQuery(localStore, queryName) {
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('Get named query', 'readonly', transaction => localStoreImpl.bundleCache.getNamedQuery(transaction, queryName));
}
/**
 * Saves the given `NamedQuery` to local persistence.
 */
async function localStoreSaveNamedQuery(localStore, query, documents = documentKeySet()) {
    // Allocate a target for the named query such that it can be resumed
    // from associated read time if users use it to listen.
    // NOTE: this also means if no corresponding target exists, the new target
    // will remain active and will not get collected, unless users happen to
    // unlisten the query somehow.
    const allocated = await localStoreAllocateTarget(localStore, queryToTarget(fromBundledQuery(query.bundledQuery)));
    const localStoreImpl = debugCast(localStore);
    return localStoreImpl.persistence.runTransaction('Save named query', 'readwrite', transaction => {
        const readTime = fromVersion(query.readTime);
        // Simply save the query itself if it is older than what the SDK already
        // has.
        if (allocated.snapshotVersion.compareTo(readTime) >= 0) {
            return localStoreImpl.bundleCache.saveNamedQuery(transaction, query);
        }
        // Update existing target data because the query from the bundle is newer.
        const newTargetData = allocated.withResumeToken(ByteString.EMPTY_BYTE_STRING, readTime);
        localStoreImpl.targetDataByTarget = localStoreImpl.targetDataByTarget.insert(newTargetData.targetId, newTargetData);
        return localStoreImpl.targetCache
            .updateTargetData(transaction, newTargetData)
            .next(() => localStoreImpl.targetCache.removeMatchingKeysForTargetId(transaction, allocated.targetId))
            .next(() => localStoreImpl.targetCache.addMatchingKeys(transaction, documents, allocated.targetId))
            .next(() => localStoreImpl.bundleCache.saveNamedQuery(transaction, query));
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
class MemoryBundleCache {
    constructor(serializer) {
        this.serializer = serializer;
        this.bundles = new Map();
        this.namedQueries = new Map();
    }
    getBundleMetadata(transaction, bundleId) {
        return PersistencePromise.resolve(this.bundles.get(bundleId));
    }
    saveBundleMetadata(transaction, bundleMetadata) {
        this.bundles.set(bundleMetadata.id, fromBundleMetadata(bundleMetadata));
        return PersistencePromise.resolve();
    }
    getNamedQuery(transaction, queryName) {
        return PersistencePromise.resolve(this.namedQueries.get(queryName));
    }
    saveNamedQuery(transaction, query) {
        this.namedQueries.set(query.name, fromProtoNamedQuery(query));
        return PersistencePromise.resolve();
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
class ReferenceSet {
    constructor() {
        // A set of outstanding references to a document sorted by key.
        this.refsByKey = new SortedSet(DocReference.compareByKey);
        // A set of outstanding references to a document sorted by target id.
        this.refsByTarget = new SortedSet(DocReference.compareByTargetId);
    }
    /** Returns true if the reference set contains no references. */
    isEmpty() {
        return this.refsByKey.isEmpty();
    }
    /** Adds a reference to the given document key for the given ID. */
    addReference(key, id) {
        const ref = new DocReference(key, id);
        this.refsByKey = this.refsByKey.add(ref);
        this.refsByTarget = this.refsByTarget.add(ref);
    }
    /** Add references to the given document keys for the given ID. */
    addReferences(keys, id) {
        keys.forEach(key => this.addReference(key, id));
    }
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    removeReference(key, id) {
        this.removeRef(new DocReference(key, id));
    }
    removeReferences(keys, id) {
        keys.forEach(key => this.removeReference(key, id));
    }
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    removeReferencesForId(id) {
        const emptyKey = new DocumentKey(new ResourcePath([]));
        const startRef = new DocReference(emptyKey, id);
        const endRef = new DocReference(emptyKey, id + 1);
        const keys = [];
        this.refsByTarget.forEachInRange([startRef, endRef], ref => {
            this.removeRef(ref);
            keys.push(ref.key);
        });
        return keys;
    }
    removeAllReferences() {
        this.refsByKey.forEach(ref => this.removeRef(ref));
    }
    removeRef(ref) {
        this.refsByKey = this.refsByKey.delete(ref);
        this.refsByTarget = this.refsByTarget.delete(ref);
    }
    referencesForId(id) {
        const emptyKey = new DocumentKey(new ResourcePath([]));
        const startRef = new DocReference(emptyKey, id);
        const endRef = new DocReference(emptyKey, id + 1);
        let keys = documentKeySet();
        this.refsByTarget.forEachInRange([startRef, endRef], ref => {
            keys = keys.add(ref.key);
        });
        return keys;
    }
    containsKey(key) {
        const ref = new DocReference(key, 0);
        const firstRef = this.refsByKey.firstAfterOrEqual(ref);
        return firstRef !== null && key.isEqual(firstRef.key);
    }
}
class DocReference {
    constructor(key, targetOrBatchId) {
        this.key = key;
        this.targetOrBatchId = targetOrBatchId;
    }
    /** Compare by key then by ID */
    static compareByKey(left, right) {
        return (DocumentKey.comparator(left.key, right.key) ||
            primitiveComparator(left.targetOrBatchId, right.targetOrBatchId));
    }
    /** Compare by ID then by key */
    static compareByTargetId(left, right) {
        return (primitiveComparator(left.targetOrBatchId, right.targetOrBatchId) ||
            DocumentKey.comparator(left.key, right.key));
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
class MemoryMutationQueue {
    constructor(indexManager, referenceDelegate) {
        this.indexManager = indexManager;
        this.referenceDelegate = referenceDelegate;
        /**
         * The set of all mutations that have been sent but not yet been applied to
         * the backend.
         */
        this.mutationQueue = [];
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.nextBatchId = 1;
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.batchesByDocumentKey = new SortedSet(DocReference.compareByKey);
    }
    checkEmpty(transaction) {
        return PersistencePromise.resolve(this.mutationQueue.length === 0);
    }
    addMutationBatch(transaction, localWriteTime, baseMutations, mutations) {
        const batchId = this.nextBatchId;
        this.nextBatchId++;
        if (this.mutationQueue.length > 0) {
            this.mutationQueue[this.mutationQueue.length - 1];
        }
        const batch = new MutationBatch(batchId, localWriteTime, baseMutations, mutations);
        this.mutationQueue.push(batch);
        // Track references by document key and index collection parents.
        for (const mutation of mutations) {
            this.batchesByDocumentKey = this.batchesByDocumentKey.add(new DocReference(mutation.key, batchId));
            this.indexManager.addToCollectionParentIndex(transaction, mutation.key.path.popLast());
        }
        return PersistencePromise.resolve(batch);
    }
    lookupMutationBatch(transaction, batchId) {
        return PersistencePromise.resolve(this.findMutationBatch(batchId));
    }
    getNextMutationBatchAfterBatchId(transaction, batchId) {
        const nextBatchId = batchId + 1;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
        const rawIndex = this.indexOfBatchId(nextBatchId);
        const index = rawIndex < 0 ? 0 : rawIndex;
        return PersistencePromise.resolve(this.mutationQueue.length > index ? this.mutationQueue[index] : null);
    }
    getHighestUnacknowledgedBatchId() {
        return PersistencePromise.resolve(this.mutationQueue.length === 0 ? BATCHID_UNKNOWN : this.nextBatchId - 1);
    }
    getAllMutationBatches(transaction) {
        return PersistencePromise.resolve(this.mutationQueue.slice());
    }
    getAllMutationBatchesAffectingDocumentKey(transaction, documentKey) {
        const start = new DocReference(documentKey, 0);
        const end = new DocReference(documentKey, Number.POSITIVE_INFINITY);
        const result = [];
        this.batchesByDocumentKey.forEachInRange([start, end], ref => {
            const batch = this.findMutationBatch(ref.targetOrBatchId);
            result.push(batch);
        });
        return PersistencePromise.resolve(result);
    }
    getAllMutationBatchesAffectingDocumentKeys(transaction, documentKeys) {
        let uniqueBatchIDs = new SortedSet(primitiveComparator);
        documentKeys.forEach(documentKey => {
            const start = new DocReference(documentKey, 0);
            const end = new DocReference(documentKey, Number.POSITIVE_INFINITY);
            this.batchesByDocumentKey.forEachInRange([start, end], ref => {
                uniqueBatchIDs = uniqueBatchIDs.add(ref.targetOrBatchId);
            });
        });
        return PersistencePromise.resolve(this.findMutationBatches(uniqueBatchIDs));
    }
    getAllMutationBatchesAffectingQuery(transaction, query) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        const prefix = query.path;
        const immediateChildrenPathLength = prefix.length + 1;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
        let startPath = prefix;
        if (!DocumentKey.isDocumentKey(startPath)) {
            startPath = startPath.child('');
        }
        const start = new DocReference(new DocumentKey(startPath), 0);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
        let uniqueBatchIDs = new SortedSet(primitiveComparator);
        this.batchesByDocumentKey.forEachWhile(ref => {
            const rowKeyPath = ref.key.path;
            if (!prefix.isPrefixOf(rowKeyPath)) {
                return false;
            }
            else {
                // Rows with document keys more than one segment longer than the query
                // path can't be matches. For example, a query on 'rooms' can't match
                // the document /rooms/abc/messages/xyx.
                // TODO(mcg): we'll need a different scanner when we implement
                // ancestor queries.
                if (rowKeyPath.length === immediateChildrenPathLength) {
                    uniqueBatchIDs = uniqueBatchIDs.add(ref.targetOrBatchId);
                }
                return true;
            }
        }, start);
        return PersistencePromise.resolve(this.findMutationBatches(uniqueBatchIDs));
    }
    findMutationBatches(batchIDs) {
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
        const result = [];
        batchIDs.forEach(batchId => {
            const batch = this.findMutationBatch(batchId);
            if (batch !== null) {
                result.push(batch);
            }
        });
        return result;
    }
    removeMutationBatch(transaction, batch) {
        // Find the position of the first batch for removal.
        const batchIndex = this.indexOfExistingBatchId(batch.batchId, 'removed');
        hardAssert(batchIndex === 0);
        this.mutationQueue.shift();
        let references = this.batchesByDocumentKey;
        return PersistencePromise.forEach(batch.mutations, (mutation) => {
            const ref = new DocReference(mutation.key, batch.batchId);
            references = references.delete(ref);
            return this.referenceDelegate.markPotentiallyOrphaned(transaction, mutation.key);
        }).next(() => {
            this.batchesByDocumentKey = references;
        });
    }
    removeCachedMutationKeys(batchId) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }
    containsKey(txn, key) {
        const ref = new DocReference(key, 0);
        const firstRef = this.batchesByDocumentKey.firstAfterOrEqual(ref);
        return PersistencePromise.resolve(key.isEqual(firstRef && firstRef.key));
    }
    performConsistencyCheck(txn) {
        if (this.mutationQueue.length === 0) ;
        return PersistencePromise.resolve();
    }
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    indexOfExistingBatchId(batchId, action) {
        const index = this.indexOfBatchId(batchId);
        return index;
    }
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */
    indexOfBatchId(batchId) {
        if (this.mutationQueue.length === 0) {
            // As an index this is past the end of the queue
            return 0;
        }
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
        const firstBatchId = this.mutationQueue[0].batchId;
        return batchId - firstBatchId;
    }
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    findMutationBatch(batchId) {
        const index = this.indexOfBatchId(batchId);
        if (index < 0 || index >= this.mutationQueue.length) {
            return null;
        }
        const batch = this.mutationQueue[index];
        return batch;
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
function documentEntryMap() {
    return new SortedMap(DocumentKey.comparator);
}
/**
 * The memory-only RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newMemoryRemoteDocumentCache()`.
 */
class MemoryRemoteDocumentCacheImpl {
    /**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    constructor(indexManager, sizer) {
        this.indexManager = indexManager;
        this.sizer = sizer;
        /** Underlying cache of documents and their read times. */
        this.docs = documentEntryMap();
        /** Size of all cached documents. */
        this.size = 0;
    }
    /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    addEntry(transaction, doc, readTime) {
        const key = doc.key;
        const entry = this.docs.get(key);
        const previousSize = entry ? entry.size : 0;
        const currentSize = this.sizer(doc);
        this.docs = this.docs.insert(key, {
            document: doc.clone(),
            size: currentSize,
            readTime
        });
        this.size += currentSize - previousSize;
        return this.indexManager.addToCollectionParentIndex(transaction, key.path.popLast());
    }
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    removeEntry(documentKey) {
        const entry = this.docs.get(documentKey);
        if (entry) {
            this.docs = this.docs.remove(documentKey);
            this.size -= entry.size;
        }
    }
    getEntry(transaction, documentKey) {
        const entry = this.docs.get(documentKey);
        return PersistencePromise.resolve(entry
            ? entry.document.clone()
            : MutableDocument.newInvalidDocument(documentKey));
    }
    getEntries(transaction, documentKeys) {
        let results = mutableDocumentMap();
        documentKeys.forEach(documentKey => {
            const entry = this.docs.get(documentKey);
            results = results.insert(documentKey, entry
                ? entry.document.clone()
                : MutableDocument.newInvalidDocument(documentKey));
        });
        return PersistencePromise.resolve(results);
    }
    getDocumentsMatchingQuery(transaction, query, sinceReadTime) {
        let results = mutableDocumentMap();
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        const prefix = new DocumentKey(query.path.child(''));
        const iterator = this.docs.getIteratorFrom(prefix);
        while (iterator.hasNext()) {
            const { key, value: { document, readTime } } = iterator.getNext();
            if (!query.path.isPrefixOf(key.path)) {
                break;
            }
            if (readTime.compareTo(sinceReadTime) <= 0) {
                continue;
            }
            if (!queryMatches(query, document)) {
                continue;
            }
            results = results.insert(document.key, document.clone());
        }
        return PersistencePromise.resolve(results);
    }
    forEachDocumentKey(transaction, f) {
        return PersistencePromise.forEach(this.docs, (key) => f(key));
    }
    newChangeBuffer(options) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new MemoryRemoteDocumentChangeBuffer(this);
    }
    getSize(txn) {
        return PersistencePromise.resolve(this.size);
    }
}
/**
 * Creates a new memory-only RemoteDocumentCache.
 *
 * @param indexManager - A class that manages collection group indices.
 * @param sizer - Used to assess the size of a document. For eager GC, this is
 * expected to just return 0 to avoid unnecessarily doing the work of
 * calculating the size.
 */
function newMemoryRemoteDocumentCache(indexManager, sizer) {
    return new MemoryRemoteDocumentCacheImpl(indexManager, sizer);
}
/**
 * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
 */
class MemoryRemoteDocumentChangeBuffer extends RemoteDocumentChangeBuffer {
    constructor(documentCache) {
        super();
        this.documentCache = documentCache;
    }
    applyChanges(transaction) {
        const promises = [];
        this.changes.forEach((key, doc) => {
            if (doc.document.isValidDocument()) {
                promises.push(this.documentCache.addEntry(transaction, doc.document, this.getReadTime(key)));
            }
            else {
                this.documentCache.removeEntry(key);
            }
        });
        return PersistencePromise.waitFor(promises);
    }
    getFromCache(transaction, documentKey) {
        return this.documentCache.getEntry(transaction, documentKey);
    }
    getAllFromCache(transaction, documentKeys) {
        return this.documentCache.getEntries(transaction, documentKeys);
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
class MemoryTargetCache {
    constructor(persistence) {
        this.persistence = persistence;
        /**
         * Maps a target to the data about that target
         */
        this.targets = new ObjectMap(t => canonifyTarget(t), targetEquals);
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = SnapshotVersion.min();
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0;
        /** The highest sequence number encountered. */
        this.highestSequenceNumber = 0;
        /**
         * A ordered bidirectional mapping between documents and the remote target
         * IDs.
         */
        this.references = new ReferenceSet();
        this.targetCount = 0;
        this.targetIdGenerator = TargetIdGenerator.forTargetCache();
    }
    forEachTarget(txn, f) {
        this.targets.forEach((_, targetData) => f(targetData));
        return PersistencePromise.resolve();
    }
    getLastRemoteSnapshotVersion(transaction) {
        return PersistencePromise.resolve(this.lastRemoteSnapshotVersion);
    }
    getHighestSequenceNumber(transaction) {
        return PersistencePromise.resolve(this.highestSequenceNumber);
    }
    allocateTargetId(transaction) {
        this.highestTargetId = this.targetIdGenerator.next();
        return PersistencePromise.resolve(this.highestTargetId);
    }
    setTargetsMetadata(transaction, highestListenSequenceNumber, lastRemoteSnapshotVersion) {
        if (lastRemoteSnapshotVersion) {
            this.lastRemoteSnapshotVersion = lastRemoteSnapshotVersion;
        }
        if (highestListenSequenceNumber > this.highestSequenceNumber) {
            this.highestSequenceNumber = highestListenSequenceNumber;
        }
        return PersistencePromise.resolve();
    }
    saveTargetData(targetData) {
        this.targets.set(targetData.target, targetData);
        const targetId = targetData.targetId;
        if (targetId > this.highestTargetId) {
            this.targetIdGenerator = new TargetIdGenerator(targetId);
            this.highestTargetId = targetId;
        }
        if (targetData.sequenceNumber > this.highestSequenceNumber) {
            this.highestSequenceNumber = targetData.sequenceNumber;
        }
    }
    addTargetData(transaction, targetData) {
        this.saveTargetData(targetData);
        this.targetCount += 1;
        return PersistencePromise.resolve();
    }
    updateTargetData(transaction, targetData) {
        this.saveTargetData(targetData);
        return PersistencePromise.resolve();
    }
    removeTargetData(transaction, targetData) {
        this.targets.delete(targetData.target);
        this.references.removeReferencesForId(targetData.targetId);
        this.targetCount -= 1;
        return PersistencePromise.resolve();
    }
    removeTargets(transaction, upperBound, activeTargetIds) {
        let count = 0;
        const removals = [];
        this.targets.forEach((key, targetData) => {
            if (targetData.sequenceNumber <= upperBound &&
                activeTargetIds.get(targetData.targetId) === null) {
                this.targets.delete(key);
                removals.push(this.removeMatchingKeysForTargetId(transaction, targetData.targetId));
                count++;
            }
        });
        return PersistencePromise.waitFor(removals).next(() => count);
    }
    getTargetCount(transaction) {
        return PersistencePromise.resolve(this.targetCount);
    }
    getTargetData(transaction, target) {
        const targetData = this.targets.get(target) || null;
        return PersistencePromise.resolve(targetData);
    }
    addMatchingKeys(txn, keys, targetId) {
        this.references.addReferences(keys, targetId);
        return PersistencePromise.resolve();
    }
    removeMatchingKeys(txn, keys, targetId) {
        this.references.removeReferences(keys, targetId);
        const referenceDelegate = this.persistence.referenceDelegate;
        const promises = [];
        if (referenceDelegate) {
            keys.forEach(key => {
                promises.push(referenceDelegate.markPotentiallyOrphaned(txn, key));
            });
        }
        return PersistencePromise.waitFor(promises);
    }
    removeMatchingKeysForTargetId(txn, targetId) {
        this.references.removeReferencesForId(targetId);
        return PersistencePromise.resolve();
    }
    getMatchingKeysForTargetId(txn, targetId) {
        const matchingKeys = this.references.referencesForId(targetId);
        return PersistencePromise.resolve(matchingKeys);
    }
    containsKey(txn, key) {
        return PersistencePromise.resolve(this.references.containsKey(key));
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
const LOG_TAG$b = 'MemoryPersistence';
/**
 * A memory-backed instance of Persistence. Data is stored only in RAM and
 * not persisted across sessions.
 */
class MemoryPersistence {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    constructor(referenceDelegateFactory, serializer) {
        this.mutationQueues = {};
        this.listenSequence = new ListenSequence(0);
        this._started = false;
        this._started = true;
        this.referenceDelegate = referenceDelegateFactory(this);
        this.targetCache = new MemoryTargetCache(this);
        const sizer = (doc) => this.referenceDelegate.documentSize(doc);
        this.indexManager = new MemoryIndexManager();
        this.remoteDocumentCache = newMemoryRemoteDocumentCache(this.indexManager, sizer);
        this.serializer = new LocalSerializer(serializer);
        this.bundleCache = new MemoryBundleCache(this.serializer);
    }
    start() {
        return Promise.resolve();
    }
    shutdown() {
        // No durable state to ensure is closed on shutdown.
        this._started = false;
        return Promise.resolve();
    }
    get started() {
        return this._started;
    }
    setDatabaseDeletedListener() {
        // No op.
    }
    setNetworkEnabled() {
        // No op.
    }
    getIndexManager() {
        return this.indexManager;
    }
    getMutationQueue(user) {
        let queue = this.mutationQueues[user.toKey()];
        if (!queue) {
            queue = new MemoryMutationQueue(this.indexManager, this.referenceDelegate);
            this.mutationQueues[user.toKey()] = queue;
        }
        return queue;
    }
    getTargetCache() {
        return this.targetCache;
    }
    getRemoteDocumentCache() {
        return this.remoteDocumentCache;
    }
    getBundleCache() {
        return this.bundleCache;
    }
    runTransaction(action, mode, transactionOperation) {
        logDebug(LOG_TAG$b, 'Starting transaction:', action);
        const txn = new MemoryTransaction(this.listenSequence.next());
        this.referenceDelegate.onTransactionStarted();
        return transactionOperation(txn)
            .next(result => {
            return this.referenceDelegate
                .onTransactionCommitted(txn)
                .next(() => result);
        })
            .toPromise()
            .then(result => {
            txn.raiseOnCommittedEvent();
            return result;
        });
    }
    mutationQueuesContainKey(transaction, key) {
        return PersistencePromise.or(Object.values(this.mutationQueues).map(queue => () => queue.containsKey(transaction, key)));
    }
}
/**
 * Memory persistence is not actually transactional, but future implementations
 * may have transaction-scoped state.
 */
class MemoryTransaction extends PersistenceTransaction {
    constructor(currentSequenceNumber) {
        super();
        this.currentSequenceNumber = currentSequenceNumber;
    }
}
class MemoryEagerDelegate {
    constructor(persistence) {
        this.persistence = persistence;
        /** Tracks all documents that are active in Query views. */
        this.localViewReferences = new ReferenceSet();
        /** The list of documents that are potentially GCed after each transaction. */
        this._orphanedDocuments = null;
    }
    static factory(persistence) {
        return new MemoryEagerDelegate(persistence);
    }
    get orphanedDocuments() {
        if (!this._orphanedDocuments) {
            throw fail();
        }
        else {
            return this._orphanedDocuments;
        }
    }
    addReference(txn, targetId, key) {
        this.localViewReferences.addReference(key, targetId);
        this.orphanedDocuments.delete(key.toString());
        return PersistencePromise.resolve();
    }
    removeReference(txn, targetId, key) {
        this.localViewReferences.removeReference(key, targetId);
        this.orphanedDocuments.add(key.toString());
        return PersistencePromise.resolve();
    }
    markPotentiallyOrphaned(txn, key) {
        this.orphanedDocuments.add(key.toString());
        return PersistencePromise.resolve();
    }
    removeTarget(txn, targetData) {
        const orphaned = this.localViewReferences.removeReferencesForId(targetData.targetId);
        orphaned.forEach(key => this.orphanedDocuments.add(key.toString()));
        const cache = this.persistence.getTargetCache();
        return cache
            .getMatchingKeysForTargetId(txn, targetData.targetId)
            .next(keys => {
            keys.forEach(key => this.orphanedDocuments.add(key.toString()));
        })
            .next(() => cache.removeTargetData(txn, targetData));
    }
    onTransactionStarted() {
        this._orphanedDocuments = new Set();
    }
    onTransactionCommitted(txn) {
        // Remove newly orphaned documents.
        const cache = this.persistence.getRemoteDocumentCache();
        const changeBuffer = cache.newChangeBuffer();
        return PersistencePromise.forEach(this.orphanedDocuments, (path) => {
            const key = DocumentKey.fromPath(path);
            return this.isReferenced(txn, key).next(isReferenced => {
                if (!isReferenced) {
                    changeBuffer.removeEntry(key);
                }
            });
        }).next(() => {
            this._orphanedDocuments = null;
            return changeBuffer.apply(txn);
        });
    }
    updateLimboDocument(txn, key) {
        return this.isReferenced(txn, key).next(isReferenced => {
            if (isReferenced) {
                this.orphanedDocuments.delete(key.toString());
            }
            else {
                this.orphanedDocuments.add(key.toString());
            }
        });
    }
    documentSize(doc) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }
    isReferenced(txn, key) {
        return PersistencePromise.or([
            () => PersistencePromise.resolve(this.localViewReferences.containsKey(key)),
            () => this.persistence.getTargetCache().containsKey(txn, key),
            () => this.persistence.mutationQueuesContainKey(txn, key)
        ]);
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
/**
 * A query engine that takes advantage of the target document mapping in the
 * QueryCache. Query execution is optimized by only reading the documents that
 * previously matched a query plus any documents that were edited after the
 * query was last listened to.
 *
 * There are some cases when this optimization is not guaranteed to produce
 * the same results as full collection scans. In these cases, query
 * processing falls back to full scans. These cases are:
 *
 * - Limit queries where a document that matched the query previously no longer
 *   matches the query.
 *
 * - Limit queries where a document edit may cause the document to sort below
 *   another document that is in the local cache.
 *
 * - Queries that have never been CURRENT or free of limbo documents.
 */
class QueryEngine {
    /** Sets the document view to query against. */
    setLocalDocumentsView(localDocuments) {
        this.localDocumentsView = localDocuments;
    }
    /** Returns all local documents matching the specified query. */
    getDocumentsMatchingQuery(transaction, query, lastLimboFreeSnapshotVersion, remoteKeys) {
        // Queries that match all documents don't benefit from using
        // key-based lookups. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
        if (matchesAllDocuments(query)) {
            return this.executeFullCollectionScan(transaction, query);
        }
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        if (lastLimboFreeSnapshotVersion.isEqual(SnapshotVersion.min())) {
            return this.executeFullCollectionScan(transaction, query);
        }
        return this.localDocumentsView.getDocuments(transaction, remoteKeys).next(documents => {
            const previousResults = this.applyQuery(query, documents);
            if ((hasLimitToFirst(query) || hasLimitToLast(query)) &&
                this.needsRefill(query.limitType, previousResults, remoteKeys, lastLimboFreeSnapshotVersion)) {
                return this.executeFullCollectionScan(transaction, query);
            }
            if (getLogLevel() <= LogLevel.DEBUG) {
                logDebug('QueryEngine', 'Re-using previous result from %s to execute query: %s', lastLimboFreeSnapshotVersion.toString(), stringifyQuery(query));
            }
            // Retrieve all results for documents that were updated since the last
            // limbo-document free remote snapshot.
            return this.localDocumentsView.getDocumentsMatchingQuery(transaction, query, lastLimboFreeSnapshotVersion).next(updatedResults => {
                // We merge `previousResults` into `updateResults`, since
                // `updateResults` is already a DocumentMap. If a document is
                // contained in both lists, then its contents are the same.
                previousResults.forEach(doc => {
                    updatedResults = updatedResults.insert(doc.key, doc);
                });
                return updatedResults;
            });
        });
    }
    /** Applies the query filter and sorting to the provided documents.  */
    applyQuery(query, documents) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        let queryResults = new SortedSet(newQueryComparator(query));
        documents.forEach((_, maybeDoc) => {
            if (queryMatches(query, maybeDoc)) {
                queryResults = queryResults.add(maybeDoc);
            }
        });
        return queryResults;
    }
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
    needsRefill(limitType, sortedPreviousResults, remoteKeys, limboFreeSnapshotVersion) {
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        if (remoteKeys.size !== sortedPreviousResults.size) {
            return true;
        }
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
        const docAtLimitEdge = limitType === "F" /* First */
            ? sortedPreviousResults.last()
            : sortedPreviousResults.first();
        if (!docAtLimitEdge) {
            // We don't need to refill the query if there were already no documents.
            return false;
        }
        return (docAtLimitEdge.hasPendingWrites ||
            docAtLimitEdge.version.compareTo(limboFreeSnapshotVersion) > 0);
    }
    executeFullCollectionScan(transaction, query) {
        if (getLogLevel() <= LogLevel.DEBUG) {
            logDebug('QueryEngine', 'Using full collection scan to execute query:', stringifyQuery(query));
        }
        return this.localDocumentsView.getDocumentsMatchingQuery(transaction, query, SnapshotVersion.min());
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
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
class User {
    constructor(uid) {
        this.uid = uid;
    }
    isAuthenticated() {
        return this.uid != null;
    }
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    toKey() {
        if (this.isAuthenticated()) {
            return 'uid:' + this.uid;
        }
        else {
            return 'anonymous-user';
        }
    }
    isEqual(otherUser) {
        return otherUser.uid === this.uid;
    }
}
/** A user with a null UID. */
User.UNAUTHENTICATED = new User(null);
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
User.GOOGLE_CREDENTIALS = new User('google-credentials-uid');
User.FIRST_PARTY = new User('first-party-uid');

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
// The format of the LocalStorage key that stores the client state is:
//     firestore_clients_<persistence_prefix>_<instance_key>
const CLIENT_STATE_KEY_PREFIX = 'firestore_clients';
/** Assembles the key for a client state in WebStorage */
function createWebStorageClientStateKey(persistenceKey, clientId) {
    return `${CLIENT_STATE_KEY_PREFIX}_${persistenceKey}_${clientId}`;
}
// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>
//
// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
const MUTATION_BATCH_KEY_PREFIX = 'firestore_mutations';
/** Assembles the key for a mutation batch in WebStorage */
function createWebStorageMutationBatchKey(persistenceKey, user, batchId) {
    let mutationKey = `${MUTATION_BATCH_KEY_PREFIX}_${persistenceKey}_${batchId}`;
    if (user.isAuthenticated()) {
        mutationKey += `_${user.uid}`;
    }
    return mutationKey;
}
// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
const QUERY_TARGET_KEY_PREFIX = 'firestore_targets';
/** Assembles the key for a query state in WebStorage */
function createWebStorageQueryTargetMetadataKey(persistenceKey, targetId) {
    return `${QUERY_TARGET_KEY_PREFIX}_${persistenceKey}_${targetId}`;
}
// The WebStorage prefix that stores the primary tab's online state. The
// format of the key is:
//     firestore_online_state_<persistence_prefix>
const ONLINE_STATE_KEY_PREFIX = 'firestore_online_state';
/** Assembles the key for the online state of the primary tab. */
function createWebStorageOnlineStateKey(persistenceKey) {
    return `${ONLINE_STATE_KEY_PREFIX}_${persistenceKey}`;
}
// The WebStorage prefix that plays as a event to indicate the remote documents
// might have changed due to some secondary tabs loading a bundle.
// format of the key is:
//     firestore_bundle_loaded_<persistenceKey>
const BUNDLE_LOADED_KEY_PREFIX = 'firestore_bundle_loaded';
function createBundleLoadedKey(persistenceKey) {
    return `${BUNDLE_LOADED_KEY_PREFIX}_${persistenceKey}`;
}
// The WebStorage key prefix for the key that stores the last sequence number allocated. The key
// looks like 'firestore_sequence_number_<persistence_prefix>'.
const SEQUENCE_NUMBER_KEY_PREFIX = 'firestore_sequence_number';
/** Assembles the key for the current sequence number. */
function createWebStorageSequenceNumberKey(persistenceKey) {
    return `${SEQUENCE_NUMBER_KEY_PREFIX}_${persistenceKey}`;
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
const LOG_TAG$a = 'SharedClientState';
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
// Visible for testing
class MutationMetadata {
    constructor(user, batchId, state, error) {
        this.user = user;
        this.batchId = batchId;
        this.state = state;
        this.error = error;
    }
    /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */
    static fromWebStorageEntry(user, batchId, value) {
        const mutationBatch = JSON.parse(value);
        let validData = typeof mutationBatch === 'object' &&
            ['pending', 'acknowledged', 'rejected'].indexOf(mutationBatch.state) !==
                -1 &&
            (mutationBatch.error === undefined ||
                typeof mutationBatch.error === 'object');
        let firestoreError = undefined;
        if (validData && mutationBatch.error) {
            validData =
                typeof mutationBatch.error.message === 'string' &&
                    typeof mutationBatch.error.code === 'string';
            if (validData) {
                firestoreError = new FirestoreError(mutationBatch.error.code, mutationBatch.error.message);
            }
        }
        if (validData) {
            return new MutationMetadata(user, batchId, mutationBatch.state, firestoreError);
        }
        else {
            logError(LOG_TAG$a, `Failed to parse mutation state for ID '${batchId}': ${value}`);
            return null;
        }
    }
    toWebStorageJSON() {
        const batchMetadata = {
            state: this.state,
            updateTimeMs: Date.now() // Modify the existing value to trigger update.
        };
        if (this.error) {
            batchMetadata.error = {
                code: this.error.code,
                message: this.error.message
            };
        }
        return JSON.stringify(batchMetadata);
    }
}
/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
// Visible for testing
class QueryTargetMetadata {
    constructor(targetId, state, error) {
        this.targetId = targetId;
        this.state = state;
        this.error = error;
    }
    /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */
    static fromWebStorageEntry(targetId, value) {
        const targetState = JSON.parse(value);
        let validData = typeof targetState === 'object' &&
            ['not-current', 'current', 'rejected'].indexOf(targetState.state) !==
                -1 &&
            (targetState.error === undefined ||
                typeof targetState.error === 'object');
        let firestoreError = undefined;
        if (validData && targetState.error) {
            validData =
                typeof targetState.error.message === 'string' &&
                    typeof targetState.error.code === 'string';
            if (validData) {
                firestoreError = new FirestoreError(targetState.error.code, targetState.error.message);
            }
        }
        if (validData) {
            return new QueryTargetMetadata(targetId, targetState.state, firestoreError);
        }
        else {
            logError(LOG_TAG$a, `Failed to parse target state for ID '${targetId}': ${value}`);
            return null;
        }
    }
    toWebStorageJSON() {
        const targetState = {
            state: this.state,
            updateTimeMs: Date.now() // Modify the existing value to trigger update.
        };
        if (this.error) {
            targetState.error = {
                code: this.error.code,
                message: this.error.message
            };
        }
        return JSON.stringify(targetState);
    }
}
/**
 * This class represents the immutable ClientState for a client read from
 * WebStorage, containing the list of active query targets.
 */
class RemoteClientState {
    constructor(clientId, activeTargetIds) {
        this.clientId = clientId;
        this.activeTargetIds = activeTargetIds;
    }
    /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */
    static fromWebStorageEntry(clientId, value) {
        const clientState = JSON.parse(value);
        let validData = typeof clientState === 'object' &&
            clientState.activeTargetIds instanceof Array;
        let activeTargetIdsSet = targetIdSet();
        for (let i = 0; validData && i < clientState.activeTargetIds.length; ++i) {
            validData = isSafeInteger(clientState.activeTargetIds[i]);
            activeTargetIdsSet = activeTargetIdsSet.add(clientState.activeTargetIds[i]);
        }
        if (validData) {
            return new RemoteClientState(clientId, activeTargetIdsSet);
        }
        else {
            logError(LOG_TAG$a, `Failed to parse client data for instance '${clientId}': ${value}`);
            return null;
        }
    }
}
/**
 * This class represents the online state for all clients participating in
 * multi-tab. The online state is only written to by the primary client, and
 * used in secondary clients to update their query views.
 */
class SharedOnlineState {
    constructor(clientId, onlineState) {
        this.clientId = clientId;
        this.onlineState = onlineState;
    }
    /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */
    static fromWebStorageEntry(value) {
        const onlineState = JSON.parse(value);
        const validData = typeof onlineState === 'object' &&
            ['Unknown', 'Online', 'Offline'].indexOf(onlineState.onlineState) !==
                -1 &&
            typeof onlineState.clientId === 'string';
        if (validData) {
            return new SharedOnlineState(onlineState.clientId, onlineState.onlineState);
        }
        else {
            logError(LOG_TAG$a, `Failed to parse online state: ${value}`);
            return null;
        }
    }
}
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
class LocalClientState {
    constructor() {
        this.activeTargetIds = targetIdSet();
    }
    addQueryTarget(targetId) {
        this.activeTargetIds = this.activeTargetIds.add(targetId);
    }
    removeQueryTarget(targetId) {
        this.activeTargetIds = this.activeTargetIds.delete(targetId);
    }
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    toWebStorageJSON() {
        const data = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now() // Modify the existing value to trigger update.
        };
        return JSON.stringify(data);
    }
}
/**
 * `WebStorageSharedClientState` uses WebStorage (window.localStorage) as the
 * backing store for the SharedClientState. It keeps track of all active
 * clients and supports modifications of the local client's data.
 */
class WebStorageSharedClientState {
    constructor(window, queue, persistenceKey, localClientId, initialUser) {
        this.window = window;
        this.queue = queue;
        this.persistenceKey = persistenceKey;
        this.localClientId = localClientId;
        this.syncEngine = null;
        this.onlineStateHandler = null;
        this.sequenceNumberHandler = null;
        this.storageListener = this.handleWebStorageEvent.bind(this);
        this.activeClients = new SortedMap(primitiveComparator);
        this.started = false;
        /**
         * Captures WebStorage events that occur before `start()` is called. These
         * events are replayed once `WebStorageSharedClientState` is started.
         */
        this.earlyEvents = [];
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        const escapedPersistenceKey = persistenceKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        this.storage = this.window.localStorage;
        this.currentUser = initialUser;
        this.localClientStorageKey = createWebStorageClientStateKey(this.persistenceKey, this.localClientId);
        this.sequenceNumberKey = createWebStorageSequenceNumberKey(this.persistenceKey);
        this.activeClients = this.activeClients.insert(this.localClientId, new LocalClientState());
        this.clientStateKeyRe = new RegExp(`^${CLIENT_STATE_KEY_PREFIX}_${escapedPersistenceKey}_([^_]*)$`);
        this.mutationBatchKeyRe = new RegExp(`^${MUTATION_BATCH_KEY_PREFIX}_${escapedPersistenceKey}_(\\d+)(?:_(.*))?$`);
        this.queryTargetKeyRe = new RegExp(`^${QUERY_TARGET_KEY_PREFIX}_${escapedPersistenceKey}_(\\d+)$`);
        this.onlineStateKey = createWebStorageOnlineStateKey(this.persistenceKey);
        this.bundleLoadedKey = createBundleLoadedKey(this.persistenceKey);
        // Rather than adding the storage observer during start(), we add the
        // storage observer during initialization. This ensures that we collect
        // events before other components populate their initial state (during their
        // respective start() calls). Otherwise, we might for example miss a
        // mutation that is added after LocalStore's start() processed the existing
        // mutations but before we observe WebStorage events.
        this.window.addEventListener('storage', this.storageListener);
    }
    /** Returns 'true' if WebStorage is available in the current environment. */
    static isAvailable(window) {
        return !!(window && window.localStorage);
    }
    async start() {
        // Retrieve the list of existing clients to backfill the data in
        // SharedClientState.
        const existingClients = await this.syncEngine.getActiveClients();
        for (const clientId of existingClients) {
            if (clientId === this.localClientId) {
                continue;
            }
            const storageItem = this.getItem(createWebStorageClientStateKey(this.persistenceKey, clientId));
            if (storageItem) {
                const clientState = RemoteClientState.fromWebStorageEntry(clientId, storageItem);
                if (clientState) {
                    this.activeClients = this.activeClients.insert(clientState.clientId, clientState);
                }
            }
        }
        this.persistClientState();
        // Check if there is an existing online state and call the callback handler
        // if applicable.
        const onlineStateJSON = this.storage.getItem(this.onlineStateKey);
        if (onlineStateJSON) {
            const onlineState = this.fromWebStorageOnlineState(onlineStateJSON);
            if (onlineState) {
                this.handleOnlineStateEvent(onlineState);
            }
        }
        for (const event of this.earlyEvents) {
            this.handleWebStorageEvent(event);
        }
        this.earlyEvents = [];
        // Register a window unload hook to remove the client metadata entry from
        // WebStorage even if `shutdown()` was not called.
        this.window.addEventListener('pagehide', () => this.shutdown());
        this.started = true;
    }
    writeSequenceNumber(sequenceNumber) {
        this.setItem(this.sequenceNumberKey, JSON.stringify(sequenceNumber));
    }
    getAllActiveQueryTargets() {
        return this.extractActiveQueryTargets(this.activeClients);
    }
    isActiveQueryTarget(targetId) {
        let found = false;
        this.activeClients.forEach((key, value) => {
            if (value.activeTargetIds.has(targetId)) {
                found = true;
            }
        });
        return found;
    }
    addPendingMutation(batchId) {
        this.persistMutationState(batchId, 'pending');
    }
    updateMutationState(batchId, state, error) {
        this.persistMutationState(batchId, state, error);
        // Once a final mutation result is observed by other clients, they no longer
        // access the mutation's metadata entry. Since WebStorage replays events
        // in order, it is safe to delete the entry right after updating it.
        this.removeMutationState(batchId);
    }
    addLocalQueryTarget(targetId) {
        let queryState = 'not-current';
        // Lookup an existing query state if the target ID was already registered
        // by another tab
        if (this.isActiveQueryTarget(targetId)) {
            const storageItem = this.storage.getItem(createWebStorageQueryTargetMetadataKey(this.persistenceKey, targetId));
            if (storageItem) {
                const metadata = QueryTargetMetadata.fromWebStorageEntry(targetId, storageItem);
                if (metadata) {
                    queryState = metadata.state;
                }
            }
        }
        this.localClientState.addQueryTarget(targetId);
        this.persistClientState();
        return queryState;
    }
    removeLocalQueryTarget(targetId) {
        this.localClientState.removeQueryTarget(targetId);
        this.persistClientState();
    }
    isLocalQueryTarget(targetId) {
        return this.localClientState.activeTargetIds.has(targetId);
    }
    clearQueryState(targetId) {
        this.removeItem(createWebStorageQueryTargetMetadataKey(this.persistenceKey, targetId));
    }
    updateQueryState(targetId, state, error) {
        this.persistQueryTargetState(targetId, state, error);
    }
    handleUserChange(user, removedBatchIds, addedBatchIds) {
        removedBatchIds.forEach(batchId => {
            this.removeMutationState(batchId);
        });
        this.currentUser = user;
        addedBatchIds.forEach(batchId => {
            this.addPendingMutation(batchId);
        });
    }
    setOnlineState(onlineState) {
        this.persistOnlineState(onlineState);
    }
    notifyBundleLoaded() {
        this.persistBundleLoadedState();
    }
    shutdown() {
        if (this.started) {
            this.window.removeEventListener('storage', this.storageListener);
            this.removeItem(this.localClientStorageKey);
            this.started = false;
        }
    }
    getItem(key) {
        const value = this.storage.getItem(key);
        logDebug(LOG_TAG$a, 'READ', key, value);
        return value;
    }
    setItem(key, value) {
        logDebug(LOG_TAG$a, 'SET', key, value);
        this.storage.setItem(key, value);
    }
    removeItem(key) {
        logDebug(LOG_TAG$a, 'REMOVE', key);
        this.storage.removeItem(key);
    }
    handleWebStorageEvent(event) {
        // Note: The function is typed to take Event to be interface-compatible with
        // `Window.addEventListener`.
        const storageEvent = event;
        if (storageEvent.storageArea === this.storage) {
            logDebug(LOG_TAG$a, 'EVENT', storageEvent.key, storageEvent.newValue);
            if (storageEvent.key === this.localClientStorageKey) {
                logError('Received WebStorage notification for local change. Another client might have ' +
                    'garbage-collected our state');
                return;
            }
            this.queue.enqueueRetryable(async () => {
                if (!this.started) {
                    this.earlyEvents.push(storageEvent);
                    return;
                }
                if (storageEvent.key === null) {
                    return;
                }
                if (this.clientStateKeyRe.test(storageEvent.key)) {
                    if (storageEvent.newValue != null) {
                        const clientState = this.fromWebStorageClientState(storageEvent.key, storageEvent.newValue);
                        if (clientState) {
                            return this.handleClientStateEvent(clientState.clientId, clientState);
                        }
                    }
                    else {
                        const clientId = this.fromWebStorageClientStateKey(storageEvent.key);
                        return this.handleClientStateEvent(clientId, null);
                    }
                }
                else if (this.mutationBatchKeyRe.test(storageEvent.key)) {
                    if (storageEvent.newValue !== null) {
                        const mutationMetadata = this.fromWebStorageMutationMetadata(storageEvent.key, storageEvent.newValue);
                        if (mutationMetadata) {
                            return this.handleMutationBatchEvent(mutationMetadata);
                        }
                    }
                }
                else if (this.queryTargetKeyRe.test(storageEvent.key)) {
                    if (storageEvent.newValue !== null) {
                        const queryTargetMetadata = this.fromWebStorageQueryTargetMetadata(storageEvent.key, storageEvent.newValue);
                        if (queryTargetMetadata) {
                            return this.handleQueryTargetEvent(queryTargetMetadata);
                        }
                    }
                }
                else if (storageEvent.key === this.onlineStateKey) {
                    if (storageEvent.newValue !== null) {
                        const onlineState = this.fromWebStorageOnlineState(storageEvent.newValue);
                        if (onlineState) {
                            return this.handleOnlineStateEvent(onlineState);
                        }
                    }
                }
                else if (storageEvent.key === this.sequenceNumberKey) {
                    const sequenceNumber = fromWebStorageSequenceNumber(storageEvent.newValue);
                    if (sequenceNumber !== ListenSequence.INVALID) {
                        this.sequenceNumberHandler(sequenceNumber);
                    }
                }
                else if (storageEvent.key === this.bundleLoadedKey) {
                    return this.syncEngine.synchronizeWithChangedDocuments();
                }
            });
        }
    }
    get localClientState() {
        return this.activeClients.get(this.localClientId);
    }
    persistClientState() {
        this.setItem(this.localClientStorageKey, this.localClientState.toWebStorageJSON());
    }
    persistMutationState(batchId, state, error) {
        const mutationState = new MutationMetadata(this.currentUser, batchId, state, error);
        const mutationKey = createWebStorageMutationBatchKey(this.persistenceKey, this.currentUser, batchId);
        this.setItem(mutationKey, mutationState.toWebStorageJSON());
    }
    removeMutationState(batchId) {
        const mutationKey = createWebStorageMutationBatchKey(this.persistenceKey, this.currentUser, batchId);
        this.removeItem(mutationKey);
    }
    persistOnlineState(onlineState) {
        const entry = {
            clientId: this.localClientId,
            onlineState
        };
        this.storage.setItem(this.onlineStateKey, JSON.stringify(entry));
    }
    persistQueryTargetState(targetId, state, error) {
        const targetKey = createWebStorageQueryTargetMetadataKey(this.persistenceKey, targetId);
        const targetMetadata = new QueryTargetMetadata(targetId, state, error);
        this.setItem(targetKey, targetMetadata.toWebStorageJSON());
    }
    persistBundleLoadedState() {
        this.setItem(this.bundleLoadedKey, 'value-not-used');
    }
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */
    fromWebStorageClientStateKey(key) {
        const match = this.clientStateKeyRe.exec(key);
        return match ? match[1] : null;
    }
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */
    fromWebStorageClientState(key, value) {
        const clientId = this.fromWebStorageClientStateKey(key);
        return RemoteClientState.fromWebStorageEntry(clientId, value);
    }
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    fromWebStorageMutationMetadata(key, value) {
        const match = this.mutationBatchKeyRe.exec(key);
        const batchId = Number(match[1]);
        const userId = match[2] !== undefined ? match[2] : null;
        return MutationMetadata.fromWebStorageEntry(new User(userId), batchId, value);
    }
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    fromWebStorageQueryTargetMetadata(key, value) {
        const match = this.queryTargetKeyRe.exec(key);
        const targetId = Number(match[1]);
        return QueryTargetMetadata.fromWebStorageEntry(targetId, value);
    }
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    fromWebStorageOnlineState(value) {
        return SharedOnlineState.fromWebStorageEntry(value);
    }
    async handleMutationBatchEvent(mutationBatch) {
        if (mutationBatch.user.uid !== this.currentUser.uid) {
            logDebug(LOG_TAG$a, `Ignoring mutation for non-active user ${mutationBatch.user.uid}`);
            return;
        }
        return this.syncEngine.applyBatchState(mutationBatch.batchId, mutationBatch.state, mutationBatch.error);
    }
    handleQueryTargetEvent(targetMetadata) {
        return this.syncEngine.applyTargetState(targetMetadata.targetId, targetMetadata.state, targetMetadata.error);
    }
    handleClientStateEvent(clientId, clientState) {
        const updatedClients = clientState
            ? this.activeClients.insert(clientId, clientState)
            : this.activeClients.remove(clientId);
        const existingTargets = this.extractActiveQueryTargets(this.activeClients);
        const newTargets = this.extractActiveQueryTargets(updatedClients);
        const addedTargets = [];
        const removedTargets = [];
        newTargets.forEach(targetId => {
            if (!existingTargets.has(targetId)) {
                addedTargets.push(targetId);
            }
        });
        existingTargets.forEach(targetId => {
            if (!newTargets.has(targetId)) {
                removedTargets.push(targetId);
            }
        });
        return this.syncEngine.applyActiveTargetsChange(addedTargets, removedTargets).then(() => {
            this.activeClients = updatedClients;
        });
    }
    handleOnlineStateEvent(onlineState) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        if (this.activeClients.get(onlineState.clientId)) {
            this.onlineStateHandler(onlineState.onlineState);
        }
    }
    extractActiveQueryTargets(clients) {
        let activeTargets = targetIdSet();
        clients.forEach((kev, value) => {
            activeTargets = activeTargets.unionWith(value.activeTargetIds);
        });
        return activeTargets;
    }
}
function fromWebStorageSequenceNumber(seqString) {
    let sequenceNumber = ListenSequence.INVALID;
    if (seqString != null) {
        try {
            const parsed = JSON.parse(seqString);
            hardAssert(typeof parsed === 'number');
            sequenceNumber = parsed;
        }
        catch (e) {
            logError(LOG_TAG$a, 'Failed to read sequence number from WebStorage', e);
        }
    }
    return sequenceNumber;
}
/**
 * `MemorySharedClientState` is a simple implementation of SharedClientState for
 * clients using memory persistence. The state in this class remains fully
 * isolated and no synchronization is performed.
 */
class MemorySharedClientState {
    constructor() {
        this.localState = new LocalClientState();
        this.queryState = {};
        this.onlineStateHandler = null;
        this.sequenceNumberHandler = null;
    }
    addPendingMutation(batchId) {
        // No op.
    }
    updateMutationState(batchId, state, error) {
        // No op.
    }
    addLocalQueryTarget(targetId) {
        this.localState.addQueryTarget(targetId);
        return this.queryState[targetId] || 'not-current';
    }
    updateQueryState(targetId, state, error) {
        this.queryState[targetId] = state;
    }
    removeLocalQueryTarget(targetId) {
        this.localState.removeQueryTarget(targetId);
    }
    isLocalQueryTarget(targetId) {
        return this.localState.activeTargetIds.has(targetId);
    }
    clearQueryState(targetId) {
        delete this.queryState[targetId];
    }
    getAllActiveQueryTargets() {
        return this.localState.activeTargetIds;
    }
    isActiveQueryTarget(targetId) {
        return this.localState.activeTargetIds.has(targetId);
    }
    start() {
        this.localState = new LocalClientState();
        return Promise.resolve();
    }
    handleUserChange(user, removedBatchIds, addedBatchIds) {
        // No op.
    }
    setOnlineState(onlineState) {
        // No op.
    }
    shutdown() { }
    writeSequenceNumber(sequenceNumber) { }
    notifyBundleLoaded() {
        // No op.
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
class NoopConnectivityMonitor {
    addCallback(callback) {
        // No-op.
    }
    shutdown() {
        // No-op.
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
 * Provides a simple helper class that implements the Stream interface to
 * bridge to other implementations that are streams but do not implement the
 * interface. The stream callbacks are invoked with the callOn... methods.
 */
class StreamBridge {
    constructor(args) {
        this.sendFn = args.sendFn;
        this.closeFn = args.closeFn;
    }
    onOpen(callback) {
        this.wrappedOnOpen = callback;
    }
    onClose(callback) {
        this.wrappedOnClose = callback;
    }
    onMessage(callback) {
        this.wrappedOnMessage = callback;
    }
    close() {
        this.closeFn();
    }
    send(msg) {
        this.sendFn(msg);
    }
    callOnOpen() {
        this.wrappedOnOpen();
    }
    callOnClose(err) {
        this.wrappedOnClose(err);
    }
    callOnMessage(msg) {
        this.wrappedOnMessage(msg);
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
/*
 * Utilities for dealing with node.js-style APIs. See nodePromise for more
 * details.
 */
/**
 * Creates a node-style callback that resolves or rejects a new Promise. The
 * callback is passed to the given action which can then use the callback as
 * a parameter to a node-style function.
 *
 * The intent is to directly bridge a node-style function (which takes a
 * callback) into a Promise without manually converting between the node-style
 * callback and the promise at each call.
 *
 * In effect it allows you to convert:
 *
 * @example
 * new Promise((resolve: (value?: fs.Stats) => void,
 *              reject: (error?: any) => void) => {
 *   fs.stat(path, (error?: any, stat?: fs.Stats) => {
 *     if (error) {
 *       reject(error);
 *     } else {
 *       resolve(stat);
 *     }
 *   });
 * });
 *
 * Into
 * @example
 * nodePromise((callback: NodeCallback<fs.Stats>) => {
 *   fs.stat(path, callback);
 * });
 *
 * @param action - a function that takes a node-style callback as an argument
 *     and then uses that callback to invoke some node-style API.
 * @returns a new Promise which will be rejected if the callback is given the
 *     first Error parameter or will resolve to the value given otherwise.
 */
function nodePromise(action) {
    return new Promise((resolve, reject) => {
        action((error, value) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(value);
            }
        });
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
const LOG_TAG$9 = 'Connection';
const X_GOOG_API_CLIENT_VALUE = `gl-node/${process.versions.node} fire/${SDK_VERSION} grpc/${version$2}`;
function createMetadata(databasePath, token, appId) {
    hardAssert(token === null || token.type === 'OAuth');
    const metadata = new Metadata();
    if (token) {
        for (const header in token.authHeaders) {
            if (token.authHeaders.hasOwnProperty(header)) {
                metadata.set(header, token.authHeaders[header]);
            }
        }
    }
    if (appId) {
        metadata.set('X-Firebase-GMPID', appId);
    }
    metadata.set('X-Goog-Api-Client', X_GOOG_API_CLIENT_VALUE);
    // This header is used to improve routing and project isolation by the
    // backend.
    metadata.set('Google-Cloud-Resource-Prefix', databasePath);
    return metadata;
}
/**
 * A Connection implemented by GRPC-Node.
 */
class GrpcConnection {
    constructor(protos, databaseInfo) {
        this.databaseInfo = databaseInfo;
        // We cache stubs for the most-recently-used token.
        this.cachedStub = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.firestore = protos['google']['firestore']['v1'];
        this.databasePath = `projects/${databaseInfo.databaseId.projectId}/databases/${databaseInfo.databaseId.database}`;
    }
    ensureActiveStub() {
        if (!this.cachedStub) {
            logDebug(LOG_TAG$9, 'Creating Firestore stub.');
            const credentials$1 = this.databaseInfo.ssl
                ? credentials.createSsl()
                : credentials.createInsecure();
            this.cachedStub = new this.firestore.Firestore(this.databaseInfo.host, credentials$1);
        }
        return this.cachedStub;
    }
    invokeRPC(rpcName, path, request, token) {
        const stub = this.ensureActiveStub();
        const metadata = createMetadata(this.databasePath, token, this.databaseInfo.appId);
        const jsonRequest = Object.assign({ database: this.databasePath }, request);
        return nodePromise((callback) => {
            logDebug(LOG_TAG$9, `RPC '${rpcName}' invoked with request:`, request);
            return stub[rpcName](jsonRequest, metadata, (grpcError, value) => {
                if (grpcError) {
                    logDebug(LOG_TAG$9, `RPC '${rpcName}' failed with error:`, grpcError);
                    callback(new FirestoreError(mapCodeFromRpcCode(grpcError.code), grpcError.message));
                }
                else {
                    logDebug(LOG_TAG$9, `RPC '${rpcName}' completed with response:`, value);
                    callback(undefined, value);
                }
            });
        });
    }
    invokeStreamingRPC(rpcName, path, request, token) {
        const results = [];
        const responseDeferred = new Deferred();
        logDebug(LOG_TAG$9, `RPC '${rpcName}' invoked (streaming) with request:`, request);
        const stub = this.ensureActiveStub();
        const metadata = createMetadata(this.databasePath, token, this.databaseInfo.appId);
        const jsonRequest = Object.assign(Object.assign({}, request), { database: this.databasePath });
        const stream = stub[rpcName](jsonRequest, metadata);
        stream.on('data', (response) => {
            logDebug(LOG_TAG$9, `RPC ${rpcName} received result:`, response);
            results.push(response);
        });
        stream.on('end', () => {
            logDebug(LOG_TAG$9, `RPC '${rpcName}' completed.`);
            responseDeferred.resolve(results);
        });
        stream.on('error', (grpcError) => {
            logDebug(LOG_TAG$9, `RPC '${rpcName}' failed with error:`, grpcError);
            const code = mapCodeFromRpcCode(grpcError.code);
            responseDeferred.reject(new FirestoreError(code, grpcError.message));
        });
        return responseDeferred.promise;
    }
    // TODO(mikelehen): This "method" is a monster. Should be refactored.
    openStream(rpcName, token) {
        const stub = this.ensureActiveStub();
        const metadata = createMetadata(this.databasePath, token, this.databaseInfo.appId);
        const grpcStream = stub[rpcName](metadata);
        let closed = false;
        const close = (err) => {
            if (!closed) {
                closed = true;
                stream.callOnClose(err);
                grpcStream.end();
            }
        };
        const stream = new StreamBridge({
            sendFn: (msg) => {
                if (!closed) {
                    logDebug(LOG_TAG$9, 'GRPC stream sending:', msg);
                    try {
                        grpcStream.write(msg);
                    }
                    catch (e) {
                        // This probably means we didn't conform to the proto.  Make sure to
                        // log the message we sent.
                        logError('Failure sending:', msg);
                        logError('Error:', e);
                        throw e;
                    }
                }
                else {
                    logDebug(LOG_TAG$9, 'Not sending because gRPC stream is closed:', msg);
                }
            },
            closeFn: () => {
                logDebug(LOG_TAG$9, 'GRPC stream closed locally via close().');
                close();
            }
        });
        grpcStream.on('data', (msg) => {
            if (!closed) {
                logDebug(LOG_TAG$9, 'GRPC stream received:', msg);
                stream.callOnMessage(msg);
            }
        });
        grpcStream.on('end', () => {
            logDebug(LOG_TAG$9, 'GRPC stream ended.');
            close();
        });
        grpcStream.on('error', (grpcError) => {
            if (!closed) {
                logWarn(LOG_TAG$9, 'GRPC stream error. Code:', grpcError.code, 'Message:', grpcError.message);
                const code = mapCodeFromRpcCode(grpcError.code);
                close(new FirestoreError(code, grpcError.message));
            }
        });
        logDebug(LOG_TAG$9, 'Opening GRPC stream');
        // TODO(dimond): Since grpc has no explicit open status (or does it?) we
        // simulate an onOpen in the next loop after the stream had it's listeners
        // registered
        setTimeout(() => {
            stream.callOnOpen();
        }, 0);
        return stream;
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
/** Used by tests so we can match @grpc/proto-loader behavior. */
const protoLoaderOptions = {
    longs: String,
    enums: String,
    defaults: true,
    oneofs: false
};
/**
 * Loads the protocol buffer definitions for Firestore.
 *
 * @returns The GrpcObject representing our protos.
 */
function loadProtos() {
    const root = resolve(__dirname, "src/protos" );
    const firestoreProtoFile = join(root, 'google/firestore/v1/firestore.proto');
    const packageDefinition = loadSync(firestoreProtoFile, Object.assign(Object.assign({}, protoLoaderOptions), { includeDirs: [root] }));
    return loadPackageDefinition(packageDefinition);
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
/** Loads the GRPC stack */
function newConnection(databaseInfo) {
    const protos = loadProtos();
    return new GrpcConnection(protos, databaseInfo);
}
/** Return the Platform-specific connectivity monitor. */
function newConnectivityMonitor() {
    return new NoopConnectivityMonitor();
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
/** The Platform's 'window' implementation or null if not available. */
function getWindow() {
    if (process.env.USE_MOCK_PERSISTENCE === 'YES') {
        // eslint-disable-next-line no-restricted-globals
        return window;
    }
    return null;
}
/** The Platform's 'document' implementation or null if not available. */
function getDocument() {
    return null;
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
    return new JsonProtoSerializer(databaseId, /* useProto3Json= */ false);
}
/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */
function newTextEncoder() {
    return new TextEncoder();
}
/**
 * An instance of the Platform's 'TextDecoder' implementation.
 */
function newTextDecoder() {
    return new TextDecoder('utf-8');
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
const LOG_TAG$8 = 'ExponentialBackoff';
/**
 * Initial backoff time in milliseconds after an error.
 * Set to 1s according to https://cloud.google.com/apis/design/errors.
 */
const DEFAULT_BACKOFF_INITIAL_DELAY_MS = 1000;
const DEFAULT_BACKOFF_FACTOR = 1.5;
/** Maximum backoff time in milliseconds */
const DEFAULT_BACKOFF_MAX_DELAY_MS = 60 * 1000;
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
class ExponentialBackoff {
    constructor(
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
    initialDelayMs = DEFAULT_BACKOFF_INITIAL_DELAY_MS, 
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */
    backoffFactor = DEFAULT_BACKOFF_FACTOR, 
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */
    maxDelayMs = DEFAULT_BACKOFF_MAX_DELAY_MS) {
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
    reset() {
        this.currentBaseMs = 0;
    }
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    resetToMax() {
        this.currentBaseMs = this.maxDelayMs;
    }
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    backoffAndRun(op) {
        // Cancel any pending backoff operation.
        this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        const desiredDelayWithJitterMs = Math.floor(this.currentBaseMs + this.jitterDelayMs());
        // Guard against lastAttemptTime being in the future due to a clock change.
        const delaySoFarMs = Math.max(0, Date.now() - this.lastAttemptTime);
        // Guard against the backoff delay already being past.
        const remainingDelayMs = Math.max(0, desiredDelayWithJitterMs - delaySoFarMs);
        if (remainingDelayMs > 0) {
            logDebug(LOG_TAG$8, `Backing off for ${remainingDelayMs} ms ` +
                `(base delay: ${this.currentBaseMs} ms, ` +
                `delay with jitter: ${desiredDelayWithJitterMs} ms, ` +
                `last attempt: ${delaySoFarMs} ms ago)`);
        }
        this.timerPromise = this.queue.enqueueAfterDelay(this.timerId, remainingDelayMs, () => {
            this.lastAttemptTime = Date.now();
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
    }
    skipBackoff() {
        if (this.timerPromise !== null) {
            this.timerPromise.skipDelay();
            this.timerPromise = null;
        }
    }
    cancel() {
        if (this.timerPromise !== null) {
            this.timerPromise.cancel();
            this.timerPromise = null;
        }
    }
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
    jitterDelayMs() {
        return (Math.random() - 0.5) * this.currentBaseMs;
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
const LOG_TAG$7 = 'PersistentStream';
/** The time a stream stays open after it is marked idle. */
const IDLE_TIMEOUT_MS = 60 * 1000;
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
 */
class PersistentStream {
    constructor(queue, connectionTimerId, idleTimerId, connection, credentialsProvider, listener) {
        this.queue = queue;
        this.idleTimerId = idleTimerId;
        this.connection = connection;
        this.credentialsProvider = credentialsProvider;
        this.listener = listener;
        this.state = 0 /* Initial */;
        /**
         * A close count that's incremented every time the stream is closed; used by
         * getCloseGuardedDispatcher() to invalidate callbacks that happen after
         * close.
         */
        this.closeCount = 0;
        this.idleTimer = null;
        this.stream = null;
        this.backoff = new ExponentialBackoff(queue, connectionTimerId);
    }
    /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */
    isStarted() {
        return (this.state === 1 /* Starting */ ||
            this.state === 2 /* Open */ ||
            this.state === 4 /* Backoff */);
    }
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */
    isOpen() {
        return this.state === 2 /* Open */;
    }
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */
    start() {
        if (this.state === 3 /* Error */) {
            this.performBackoff();
            return;
        }
        this.auth();
    }
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */
    async stop() {
        if (this.isStarted()) {
            await this.close(0 /* Initial */);
        }
    }
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */
    inhibitBackoff() {
        this.state = 0 /* Initial */;
        this.backoff.reset();
    }
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
    markIdle() {
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
        if (this.isOpen() && this.idleTimer === null) {
            this.idleTimer = this.queue.enqueueAfterDelay(this.idleTimerId, IDLE_TIMEOUT_MS, () => this.handleIdleCloseTimer());
        }
    }
    /** Sends a message to the underlying stream. */
    sendRequest(msg) {
        this.cancelIdleCheck();
        this.stream.send(msg);
    }
    /** Called by the idle timer when the stream should close due to inactivity. */
    async handleIdleCloseTimer() {
        if (this.isOpen()) {
            // When timing out an idle stream there's no reason to force the stream into backoff when
            // it restarts so set the stream state to Initial instead of Error.
            return this.close(0 /* Initial */);
        }
    }
    /** Marks the stream as active again. */
    cancelIdleCheck() {
        if (this.idleTimer) {
            this.idleTimer.cancel();
            this.idleTimer = null;
        }
    }
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
    async close(finalState, error) {
        // Cancel any outstanding timers (they're guaranteed not to execute).
        this.cancelIdleCheck();
        this.backoff.cancel();
        // Invalidates any stream-related callbacks (e.g. from auth or the
        // underlying stream), guaranteeing they won't execute.
        this.closeCount++;
        if (finalState !== 3 /* Error */) {
            // If this is an intentional close ensure we don't delay our next connection attempt.
            this.backoff.reset();
        }
        else if (error && error.code === Code.RESOURCE_EXHAUSTED) {
            // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
            logError(error.toString());
            logError('Using maximum backoff delay to prevent overloading the backend.');
            this.backoff.resetToMax();
        }
        else if (error && error.code === Code.UNAUTHENTICATED) {
            // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
            // just expired.
            this.credentialsProvider.invalidateToken();
        }
        // Clean up the underlying stream because we are no longer interested in events.
        if (this.stream !== null) {
            this.tearDown();
            this.stream.close();
            this.stream = null;
        }
        // This state must be assigned before calling onClose() to allow the callback to
        // inhibit backoff or otherwise manipulate the state in its non-started state.
        this.state = finalState;
        // Notify the listener that the stream closed.
        await this.listener.onClose(error);
    }
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */
    tearDown() { }
    auth() {
        this.state = 1 /* Starting */;
        const dispatchIfNotClosed = this.getCloseGuardedDispatcher(this.closeCount);
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
        const closeCount = this.closeCount;
        this.credentialsProvider.getToken().then(token => {
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
            if (this.closeCount === closeCount) {
                // Normally we'd have to schedule the callback on the AsyncQueue.
                // However, the following calls are safe to be called outside the
                // AsyncQueue since they don't chain asynchronous calls
                this.startStream(token);
            }
        }, (error) => {
            dispatchIfNotClosed(() => {
                const rpcError = new FirestoreError(Code.UNKNOWN, 'Fetching auth token failed: ' + error.message);
                return this.handleStreamClose(rpcError);
            });
        });
    }
    startStream(token) {
        const dispatchIfNotClosed = this.getCloseGuardedDispatcher(this.closeCount);
        this.stream = this.startRpc(token);
        this.stream.onOpen(() => {
            dispatchIfNotClosed(() => {
                this.state = 2 /* Open */;
                return this.listener.onOpen();
            });
        });
        this.stream.onClose((error) => {
            dispatchIfNotClosed(() => {
                return this.handleStreamClose(error);
            });
        });
        this.stream.onMessage((msg) => {
            dispatchIfNotClosed(() => {
                return this.onMessage(msg);
            });
        });
    }
    performBackoff() {
        this.state = 4 /* Backoff */;
        this.backoff.backoffAndRun(async () => {
            this.state = 0 /* Initial */;
            this.start();
        });
    }
    // Visible for tests
    handleStreamClose(error) {
        logDebug(LOG_TAG$7, `close with error: ${error}`);
        this.stream = null;
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return this.close(3 /* Error */, error);
    }
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */
    getCloseGuardedDispatcher(startCloseCount) {
        return (fn) => {
            this.queue.enqueueAndForget(() => {
                if (this.closeCount === startCloseCount) {
                    return fn();
                }
                else {
                    logDebug(LOG_TAG$7, 'stream callback skipped by getCloseGuardedDispatcher.');
                    return Promise.resolve();
                }
            });
        };
    }
}
/**
 * A PersistentStream that implements the Listen RPC.
 *
 * Once the Listen stream has called the onOpen() listener, any number of
 * listen() and unlisten() calls can be made to control what changes will be
 * sent from the server for ListenResponses.
 */
class PersistentListenStream extends PersistentStream {
    constructor(queue, connection, credentials, serializer, listener) {
        super(queue, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */, "listen_stream_idle" /* ListenStreamIdle */, connection, credentials, listener);
        this.serializer = serializer;
    }
    startRpc(token) {
        return this.connection.openStream('Listen', token);
    }
    onMessage(watchChangeProto) {
        // A successful response means the stream is healthy
        this.backoff.reset();
        const watchChange = fromWatchChange(this.serializer, watchChangeProto);
        const snapshot = versionFromListenResponse(watchChangeProto);
        return this.listener.onWatchChange(watchChange, snapshot);
    }
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */
    watch(targetData) {
        const request = {};
        request.database = getEncodedDatabaseId(this.serializer);
        request.addTarget = toTarget(this.serializer, targetData);
        const labels = toListenRequestLabels(this.serializer, targetData);
        if (labels) {
            request.labels = labels;
        }
        this.sendRequest(request);
    }
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */
    unwatch(targetId) {
        const request = {};
        request.database = getEncodedDatabaseId(this.serializer);
        request.removeTarget = targetId;
        this.sendRequest(request);
    }
}
/**
 * A Stream that implements the Write RPC.
 *
 * The Write RPC requires the caller to maintain special streamToken
 * state in between calls, to help the server understand which responses the
 * client has processed by the time the next request is made. Every response
 * will contain a streamToken; this value must be passed to the next
 * request.
 *
 * After calling start() on this stream, the next request must be a handshake,
 * containing whatever streamToken is on hand. Once a response to this
 * request is received, all pending mutations may be submitted. When
 * submitting multiple batches of mutations at the same time, it's
 * okay to use the same streamToken for the calls to writeMutations.
 *
 * TODO(b/33271235): Use proto types
 */
class PersistentWriteStream extends PersistentStream {
    constructor(queue, connection, credentials, serializer, listener) {
        super(queue, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */, "write_stream_idle" /* WriteStreamIdle */, connection, credentials, listener);
        this.serializer = serializer;
        this.handshakeComplete_ = false;
    }
    /**
     * Tracks whether or not a handshake has been successfully exchanged and
     * the stream is ready to accept mutations.
     */
    get handshakeComplete() {
        return this.handshakeComplete_;
    }
    // Override of PersistentStream.start
    start() {
        this.handshakeComplete_ = false;
        this.lastStreamToken = undefined;
        super.start();
    }
    tearDown() {
        if (this.handshakeComplete_) {
            this.writeMutations([]);
        }
    }
    startRpc(token) {
        return this.connection.openStream('Write', token);
    }
    onMessage(responseProto) {
        // Always capture the last stream token.
        hardAssert(!!responseProto.streamToken);
        this.lastStreamToken = responseProto.streamToken;
        if (!this.handshakeComplete_) {
            // The first response is always the handshake response
            hardAssert(!responseProto.writeResults || responseProto.writeResults.length === 0);
            this.handshakeComplete_ = true;
            return this.listener.onHandshakeComplete();
        }
        else {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.backoff.reset();
            const results = fromWriteResults(responseProto.writeResults, responseProto.commitTime);
            const commitVersion = fromVersion(responseProto.commitTime);
            return this.listener.onMutationResult(commitVersion, results);
        }
    }
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */
    writeHandshake() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        const request = {};
        request.database = getEncodedDatabaseId(this.serializer);
        this.sendRequest(request);
    }
    /** Sends a group of mutations to the Firestore backend to apply. */
    writeMutations(mutations) {
        const request = {
            streamToken: this.lastStreamToken,
            writes: mutations.map(mutation => toMutation(this.serializer, mutation))
        };
        this.sendRequest(request);
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
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */
class Datastore {
}
/**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */
class DatastoreImpl extends Datastore {
    constructor(credentials, connection, serializer) {
        super();
        this.credentials = credentials;
        this.connection = connection;
        this.serializer = serializer;
        this.terminated = false;
    }
    verifyInitialized() {
        if (this.terminated) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, 'The client has already been terminated.');
        }
    }
    /** Gets an auth token and invokes the provided RPC. */
    invokeRPC(rpcName, path, request) {
        this.verifyInitialized();
        return this.credentials
            .getToken()
            .then(token => {
            return this.connection.invokeRPC(rpcName, path, request, token);
        })
            .catch((error) => {
            if (error.name === 'FirebaseError') {
                if (error.code === Code.UNAUTHENTICATED) {
                    this.credentials.invalidateToken();
                }
                throw error;
            }
            else {
                throw new FirestoreError(Code.UNKNOWN, error.toString());
            }
        });
    }
    /** Gets an auth token and invokes the provided RPC with streamed results. */
    invokeStreamingRPC(rpcName, path, request) {
        this.verifyInitialized();
        return this.credentials
            .getToken()
            .then(token => {
            return this.connection.invokeStreamingRPC(rpcName, path, request, token);
        })
            .catch((error) => {
            if (error.name === 'FirebaseError') {
                if (error.code === Code.UNAUTHENTICATED) {
                    this.credentials.invalidateToken();
                }
                throw error;
            }
            else {
                throw new FirestoreError(Code.UNKNOWN, error.toString());
            }
        });
    }
    terminate() {
        this.terminated = true;
    }
}
// TODO(firestorexp): Make sure there is only one Datastore instance per
// firestore-exp client.
function newDatastore(credentials, connection, serializer) {
    return new DatastoreImpl(credentials, connection, serializer);
}
async function invokeCommitRpc(datastore, mutations) {
    const datastoreImpl = debugCast(datastore);
    const path = getEncodedDatabaseId(datastoreImpl.serializer) + '/documents';
    const request = {
        writes: mutations.map(m => toMutation(datastoreImpl.serializer, m))
    };
    await datastoreImpl.invokeRPC('Commit', path, request);
}
async function invokeBatchGetDocumentsRpc(datastore, keys) {
    const datastoreImpl = debugCast(datastore);
    const path = getEncodedDatabaseId(datastoreImpl.serializer) + '/documents';
    const request = {
        documents: keys.map(k => toName(datastoreImpl.serializer, k))
    };
    const response = await datastoreImpl.invokeStreamingRPC('BatchGetDocuments', path, request);
    const docs = new Map();
    response.forEach(proto => {
        const doc = fromBatchGetDocumentsResponse(datastoreImpl.serializer, proto);
        docs.set(doc.key.toString(), doc);
    });
    const result = [];
    keys.forEach(key => {
        const doc = docs.get(key.toString());
        hardAssert(!!doc);
        result.push(doc);
    });
    return result;
}
function newPersistentWriteStream(datastore, queue, listener) {
    const datastoreImpl = debugCast(datastore);
    datastoreImpl.verifyInitialized();
    return new PersistentWriteStream(queue, datastoreImpl.connection, datastoreImpl.credentials, datastoreImpl.serializer, listener);
}
function newPersistentWatchStream(datastore, queue, listener) {
    const datastoreImpl = debugCast(datastore);
    datastoreImpl.verifyInitialized();
    return new PersistentListenStream(queue, datastoreImpl.connection, datastoreImpl.credentials, datastoreImpl.serializer, listener);
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
const LOG_TAG$6 = 'OnlineStateTracker';
// To deal with transient failures, we allow multiple stream attempts before
// giving up and transitioning from OnlineState.Unknown to Offline.
// TODO(mikelehen): This used to be set to 2 as a mitigation for b/66228394.
// @jdimond thinks that bug is sufficiently fixed so that we can set this back
// to 1. If that works okay, we could potentially remove this logic entirely.
const MAX_WATCH_STREAM_FAILURES = 1;
// To deal with stream attempts that don't succeed or fail in a timely manner,
// we have a timeout for OnlineState to reach Online or Offline.
// If the timeout is reached, we transition to Offline rather than waiting
// indefinitely.
const ONLINE_STATE_TIMEOUT_MS = 10 * 1000;
/**
 * A component used by the RemoteStore to track the OnlineState (that is,
 * whether or not the client as a whole should be considered to be online or
 * offline), implementing the appropriate heuristics.
 *
 * In particular, when the client is trying to connect to the backend, we
 * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
 * a connection to succeed. If we have too many failures or the timeout elapses,
 * then we set the OnlineState to Offline, and the client will behave as if
 * it is offline (get()s will return cached data, etc.).
 */
class OnlineStateTracker {
    constructor(asyncQueue, onlineStateHandler) {
        this.asyncQueue = asyncQueue;
        this.onlineStateHandler = onlineStateHandler;
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */;
        /**
         * A count of consecutive failures to open the stream. If it reaches the
         * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
         * Offline.
         */
        this.watchStreamFailures = 0;
        /**
         * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
         * transition from OnlineState.Unknown to OnlineState.Offline without waiting
         * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
         */
        this.onlineStateTimer = null;
        /**
         * Whether the client should log a warning message if it fails to connect to
         * the backend (initially true, cleared after a successful stream, or if we've
         * logged the message already).
         */
        this.shouldWarnClientIsOffline = true;
    }
    /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */
    handleWatchStreamStart() {
        if (this.watchStreamFailures === 0) {
            this.setAndBroadcast("Unknown" /* Unknown */);
            this.onlineStateTimer = this.asyncQueue.enqueueAfterDelay("online_state_timeout" /* OnlineStateTimeout */, ONLINE_STATE_TIMEOUT_MS, () => {
                this.onlineStateTimer = null;
                this.logClientOfflineWarningIfNecessary(`Backend didn't respond within ${ONLINE_STATE_TIMEOUT_MS / 1000} ` +
                    `seconds.`);
                this.setAndBroadcast("Offline" /* Offline */);
                // NOTE: handleWatchStreamFailure() will continue to increment
                // watchStreamFailures even though we are already marked Offline,
                // but this is non-harmful.
                return Promise.resolve();
            });
        }
    }
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    handleWatchStreamFailure(error) {
        if (this.state === "Online" /* Online */) {
            this.setAndBroadcast("Unknown" /* Unknown */);
        }
        else {
            this.watchStreamFailures++;
            if (this.watchStreamFailures >= MAX_WATCH_STREAM_FAILURES) {
                this.clearOnlineStateTimer();
                this.logClientOfflineWarningIfNecessary(`Connection failed ${MAX_WATCH_STREAM_FAILURES} ` +
                    `times. Most recent error: ${error.toString()}`);
                this.setAndBroadcast("Offline" /* Offline */);
            }
        }
    }
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    set(newState) {
        this.clearOnlineStateTimer();
        this.watchStreamFailures = 0;
        if (newState === "Online" /* Online */) {
            // We've connected to watch at least once. Don't warn the developer
            // about being offline going forward.
            this.shouldWarnClientIsOffline = false;
        }
        this.setAndBroadcast(newState);
    }
    setAndBroadcast(newState) {
        if (newState !== this.state) {
            this.state = newState;
            this.onlineStateHandler(newState);
        }
    }
    logClientOfflineWarningIfNecessary(details) {
        const message = `Could not reach Cloud Firestore backend. ${details}\n` +
            `This typically indicates that your device does not have a healthy ` +
            `Internet connection at the moment. The client will operate in offline ` +
            `mode until it is able to successfully connect to the backend.`;
        if (this.shouldWarnClientIsOffline) {
            logError(message);
            this.shouldWarnClientIsOffline = false;
        }
        else {
            logDebug(LOG_TAG$6, message);
        }
    }
    clearOnlineStateTimer() {
        if (this.onlineStateTimer !== null) {
            this.onlineStateTimer.cancel();
            this.onlineStateTimer = null;
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
const LOG_TAG$5 = 'RemoteStore';
// TODO(b/35853402): Negotiate this with the stream.
const MAX_PENDING_WRITES = 10;
class RemoteStoreImpl {
    constructor(
    /**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
    localStore, 
    /** The client-side proxy for interacting with the backend. */
    datastore, asyncQueue, onlineStateHandler, connectivityMonitor) {
        this.localStore = localStore;
        this.datastore = datastore;
        this.asyncQueue = asyncQueue;
        this.remoteSyncer = {};
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
        this.writePipeline = [];
        /**
         * A mapping of watched targets that the client cares about tracking and the
         * user has explicitly called a 'listen' for this target.
         *
         * These targets may or may not have been sent to or acknowledged by the
         * server. On re-establishing the listen stream, these targets should be sent
         * to the server. The targets removed with unlistens are removed eagerly
         * without waiting for confirmation from the listen stream.
         */
        this.listenTargets = new Map();
        /**
         * A set of reasons for why the RemoteStore may be offline. If empty, the
         * RemoteStore may start its network connections.
         */
        this.offlineCauses = new Set();
        /**
         * Event handlers that get called when the network is disabled or enabled.
         *
         * PORTING NOTE: These functions are used on the Web client to create the
         * underlying streams (to support tree-shakeable streams). On Android and iOS,
         * the streams are created during construction of RemoteStore.
         */
        this.onNetworkStatusChange = [];
        this.connectivityMonitor = connectivityMonitor;
        this.connectivityMonitor.addCallback((_) => {
            asyncQueue.enqueueAndForget(async () => {
                // Porting Note: Unlike iOS, `restartNetwork()` is called even when the
                // network becomes unreachable as we don't have any other way to tear
                // down our streams.
                if (canUseNetwork(this)) {
                    logDebug(LOG_TAG$5, 'Restarting streams for network reachability change.');
                    await restartNetwork(this);
                }
            });
        });
        this.onlineStateTracker = new OnlineStateTracker(asyncQueue, onlineStateHandler);
    }
}
function newRemoteStore(localStore, datastore, asyncQueue, onlineStateHandler, connectivityMonitor) {
    return new RemoteStoreImpl(localStore, datastore, asyncQueue, onlineStateHandler, connectivityMonitor);
}
/** Re-enables the network. Idempotent. */
function remoteStoreEnableNetwork(remoteStore) {
    const remoteStoreImpl = debugCast(remoteStore);
    remoteStoreImpl.offlineCauses.delete(0 /* UserDisabled */);
    return enableNetworkInternal(remoteStoreImpl);
}
async function enableNetworkInternal(remoteStoreImpl) {
    if (canUseNetwork(remoteStoreImpl)) {
        for (const networkStatusHandler of remoteStoreImpl.onNetworkStatusChange) {
            await networkStatusHandler(/* enabled= */ true);
        }
    }
}
/**
 * Temporarily disables the network. The network can be re-enabled using
 * enableNetwork().
 */
async function remoteStoreDisableNetwork(remoteStore) {
    const remoteStoreImpl = debugCast(remoteStore);
    remoteStoreImpl.offlineCauses.add(0 /* UserDisabled */);
    await disableNetworkInternal(remoteStoreImpl);
    // Set the OnlineState to Offline so get()s return from cache, etc.
    remoteStoreImpl.onlineStateTracker.set("Offline" /* Offline */);
}
async function disableNetworkInternal(remoteStoreImpl) {
    for (const networkStatusHandler of remoteStoreImpl.onNetworkStatusChange) {
        await networkStatusHandler(/* enabled= */ false);
    }
}
async function remoteStoreShutdown(remoteStore) {
    const remoteStoreImpl = debugCast(remoteStore);
    logDebug(LOG_TAG$5, 'RemoteStore shutting down.');
    remoteStoreImpl.offlineCauses.add(5 /* Shutdown */);
    await disableNetworkInternal(remoteStoreImpl);
    remoteStoreImpl.connectivityMonitor.shutdown();
    // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
    // triggering spurious listener events with cached data, etc.
    remoteStoreImpl.onlineStateTracker.set("Unknown" /* Unknown */);
}
/**
 * Starts new listen for the given target. Uses resume token if provided. It
 * is a no-op if the target of given `TargetData` is already being listened to.
 */
function remoteStoreListen(remoteStore, targetData) {
    const remoteStoreImpl = debugCast(remoteStore);
    if (remoteStoreImpl.listenTargets.has(targetData.targetId)) {
        return;
    }
    // Mark this as something the client is currently listening for.
    remoteStoreImpl.listenTargets.set(targetData.targetId, targetData);
    if (shouldStartWatchStream(remoteStoreImpl)) {
        // The listen will be sent in onWatchStreamOpen
        startWatchStream(remoteStoreImpl);
    }
    else if (ensureWatchStream(remoteStoreImpl).isOpen()) {
        sendWatchRequest(remoteStoreImpl, targetData);
    }
}
/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */
function remoteStoreUnlisten(remoteStore, targetId) {
    const remoteStoreImpl = debugCast(remoteStore);
    const watchStream = ensureWatchStream(remoteStoreImpl);
    remoteStoreImpl.listenTargets.delete(targetId);
    if (watchStream.isOpen()) {
        sendUnwatchRequest(remoteStoreImpl, targetId);
    }
    if (remoteStoreImpl.listenTargets.size === 0) {
        if (watchStream.isOpen()) {
            watchStream.markIdle();
        }
        else if (canUseNetwork(remoteStoreImpl)) {
            // Revert to OnlineState.Unknown if the watch stream is not open and we
            // have no listeners, since without any listens to send we cannot
            // confirm if the stream is healthy and upgrade to OnlineState.Online.
            remoteStoreImpl.onlineStateTracker.set("Unknown" /* Unknown */);
        }
    }
}
/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */
function sendWatchRequest(remoteStoreImpl, targetData) {
    remoteStoreImpl.watchChangeAggregator.recordPendingTargetRequest(targetData.targetId);
    ensureWatchStream(remoteStoreImpl).watch(targetData);
}
/**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */
function sendUnwatchRequest(remoteStoreImpl, targetId) {
    remoteStoreImpl.watchChangeAggregator.recordPendingTargetRequest(targetId);
    ensureWatchStream(remoteStoreImpl).unwatch(targetId);
}
function startWatchStream(remoteStoreImpl) {
    remoteStoreImpl.watchChangeAggregator = new WatchChangeAggregator({
        getRemoteKeysForTarget: targetId => remoteStoreImpl.remoteSyncer.getRemoteKeysForTarget(targetId),
        getTargetDataForTarget: targetId => remoteStoreImpl.listenTargets.get(targetId) || null
    });
    ensureWatchStream(remoteStoreImpl).start();
    remoteStoreImpl.onlineStateTracker.handleWatchStreamStart();
}
/**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */
function shouldStartWatchStream(remoteStoreImpl) {
    return (canUseNetwork(remoteStoreImpl) &&
        !ensureWatchStream(remoteStoreImpl).isStarted() &&
        remoteStoreImpl.listenTargets.size > 0);
}
function canUseNetwork(remoteStore) {
    const remoteStoreImpl = debugCast(remoteStore);
    return remoteStoreImpl.offlineCauses.size === 0;
}
function cleanUpWatchStreamState(remoteStoreImpl) {
    remoteStoreImpl.watchChangeAggregator = undefined;
}
async function onWatchStreamOpen(remoteStoreImpl) {
    remoteStoreImpl.listenTargets.forEach((targetData, targetId) => {
        sendWatchRequest(remoteStoreImpl, targetData);
    });
}
async function onWatchStreamClose(remoteStoreImpl, error) {
    cleanUpWatchStreamState(remoteStoreImpl);
    // If we still need the watch stream, retry the connection.
    if (shouldStartWatchStream(remoteStoreImpl)) {
        remoteStoreImpl.onlineStateTracker.handleWatchStreamFailure(error);
        startWatchStream(remoteStoreImpl);
    }
    else {
        // No need to restart watch stream because there are no active targets.
        // The online state is set to unknown because there is no active attempt
        // at establishing a connection
        remoteStoreImpl.onlineStateTracker.set("Unknown" /* Unknown */);
    }
}
async function onWatchStreamChange(remoteStoreImpl, watchChange, snapshotVersion) {
    // Mark the client as online since we got a message from the server
    remoteStoreImpl.onlineStateTracker.set("Online" /* Online */);
    if (watchChange instanceof WatchTargetChange &&
        watchChange.state === 2 /* Removed */ &&
        watchChange.cause) {
        // There was an error on a target, don't wait for a consistent snapshot
        // to raise events
        try {
            await handleTargetError(remoteStoreImpl, watchChange);
        }
        catch (e) {
            logDebug(LOG_TAG$5, 'Failed to remove targets %s: %s ', watchChange.targetIds.join(','), e);
            await disableNetworkUntilRecovery(remoteStoreImpl, e);
        }
        return;
    }
    if (watchChange instanceof DocumentWatchChange) {
        remoteStoreImpl.watchChangeAggregator.handleDocumentChange(watchChange);
    }
    else if (watchChange instanceof ExistenceFilterChange) {
        remoteStoreImpl.watchChangeAggregator.handleExistenceFilter(watchChange);
    }
    else {
        remoteStoreImpl.watchChangeAggregator.handleTargetChange(watchChange);
    }
    if (!snapshotVersion.isEqual(SnapshotVersion.min())) {
        try {
            const lastRemoteSnapshotVersion = await localStoreGetLastRemoteSnapshotVersion(remoteStoreImpl.localStore);
            if (snapshotVersion.compareTo(lastRemoteSnapshotVersion) >= 0) {
                // We have received a target change with a global snapshot if the snapshot
                // version is not equal to SnapshotVersion.min().
                await raiseWatchSnapshot(remoteStoreImpl, snapshotVersion);
            }
        }
        catch (e) {
            logDebug(LOG_TAG$5, 'Failed to raise snapshot:', e);
            await disableNetworkUntilRecovery(remoteStoreImpl, e);
        }
    }
}
/**
 * Recovery logic for IndexedDB errors that takes the network offline until
 * `op` succeeds. Retries are scheduled with backoff using
 * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
 * validated via a generic operation.
 *
 * The returned Promise is resolved once the network is disabled and before
 * any retry attempt.
 */
async function disableNetworkUntilRecovery(remoteStoreImpl, e, op) {
    if (isIndexedDbTransactionError(e)) {
        remoteStoreImpl.offlineCauses.add(1 /* IndexedDbFailed */);
        // Disable network and raise offline snapshots
        await disableNetworkInternal(remoteStoreImpl);
        remoteStoreImpl.onlineStateTracker.set("Offline" /* Offline */);
        if (!op) {
            // Use a simple read operation to determine if IndexedDB recovered.
            // Ideally, we would expose a health check directly on SimpleDb, but
            // RemoteStore only has access to persistence through LocalStore.
            op = () => localStoreGetLastRemoteSnapshotVersion(remoteStoreImpl.localStore);
        }
        // Probe IndexedDB periodically and re-enable network
        remoteStoreImpl.asyncQueue.enqueueRetryable(async () => {
            logDebug(LOG_TAG$5, 'Retrying IndexedDB access');
            await op();
            remoteStoreImpl.offlineCauses.delete(1 /* IndexedDbFailed */);
            await enableNetworkInternal(remoteStoreImpl);
        });
    }
    else {
        throw e;
    }
}
/**
 * Executes `op`. If `op` fails, takes the network offline until `op`
 * succeeds. Returns after the first attempt.
 */
function executeWithRecovery(remoteStoreImpl, op) {
    return op().catch(e => disableNetworkUntilRecovery(remoteStoreImpl, e, op));
}
/**
 * Takes a batch of changes from the Datastore, repackages them as a
 * RemoteEvent, and passes that on to the listener, which is typically the
 * SyncEngine.
 */
function raiseWatchSnapshot(remoteStoreImpl, snapshotVersion) {
    const remoteEvent = remoteStoreImpl.watchChangeAggregator.createRemoteEvent(snapshotVersion);
    // Update in-memory resume tokens. LocalStore will update the
    // persistent view of these when applying the completed RemoteEvent.
    remoteEvent.targetChanges.forEach((change, targetId) => {
        if (change.resumeToken.approximateByteSize() > 0) {
            const targetData = remoteStoreImpl.listenTargets.get(targetId);
            // A watched target might have been removed already.
            if (targetData) {
                remoteStoreImpl.listenTargets.set(targetId, targetData.withResumeToken(change.resumeToken, snapshotVersion));
            }
        }
    });
    // Re-establish listens for the targets that have been invalidated by
    // existence filter mismatches.
    remoteEvent.targetMismatches.forEach(targetId => {
        const targetData = remoteStoreImpl.listenTargets.get(targetId);
        if (!targetData) {
            // A watched target might have been removed already.
            return;
        }
        // Clear the resume token for the target, since we're in a known mismatch
        // state.
        remoteStoreImpl.listenTargets.set(targetId, targetData.withResumeToken(ByteString.EMPTY_BYTE_STRING, targetData.snapshotVersion));
        // Cause a hard reset by unwatching and rewatching immediately, but
        // deliberately don't send a resume token so that we get a full update.
        sendUnwatchRequest(remoteStoreImpl, targetId);
        // Mark the target we send as being on behalf of an existence filter
        // mismatch, but don't actually retain that in listenTargets. This ensures
        // that we flag the first re-listen this way without impacting future
        // listens of this target (that might happen e.g. on reconnect).
        const requestTargetData = new TargetData(targetData.target, targetId, 1 /* ExistenceFilterMismatch */, targetData.sequenceNumber);
        sendWatchRequest(remoteStoreImpl, requestTargetData);
    });
    return remoteStoreImpl.remoteSyncer.applyRemoteEvent(remoteEvent);
}
/** Handles an error on a target */
async function handleTargetError(remoteStoreImpl, watchChange) {
    const error = watchChange.cause;
    for (const targetId of watchChange.targetIds) {
        // A watched target might have been removed already.
        if (remoteStoreImpl.listenTargets.has(targetId)) {
            await remoteStoreImpl.remoteSyncer.rejectListen(targetId, error);
            remoteStoreImpl.listenTargets.delete(targetId);
            remoteStoreImpl.watchChangeAggregator.removeTarget(targetId);
        }
    }
}
/**
 * Attempts to fill our write pipeline with writes from the LocalStore.
 *
 * Called internally to bootstrap or refill the write pipeline and by
 * SyncEngine whenever there are new mutations to process.
 *
 * Starts the write stream if necessary.
 */
async function fillWritePipeline(remoteStore) {
    const remoteStoreImpl = debugCast(remoteStore);
    const writeStream = ensureWriteStream(remoteStoreImpl);
    let lastBatchIdRetrieved = remoteStoreImpl.writePipeline.length > 0
        ? remoteStoreImpl.writePipeline[remoteStoreImpl.writePipeline.length - 1]
            .batchId
        : BATCHID_UNKNOWN;
    while (canAddToWritePipeline(remoteStoreImpl)) {
        try {
            const batch = await localStoreGetNextMutationBatch(remoteStoreImpl.localStore, lastBatchIdRetrieved);
            if (batch === null) {
                if (remoteStoreImpl.writePipeline.length === 0) {
                    writeStream.markIdle();
                }
                break;
            }
            else {
                lastBatchIdRetrieved = batch.batchId;
                addToWritePipeline(remoteStoreImpl, batch);
            }
        }
        catch (e) {
            await disableNetworkUntilRecovery(remoteStoreImpl, e);
        }
    }
    if (shouldStartWriteStream(remoteStoreImpl)) {
        startWriteStream(remoteStoreImpl);
    }
}
/**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */
function canAddToWritePipeline(remoteStoreImpl) {
    return (canUseNetwork(remoteStoreImpl) &&
        remoteStoreImpl.writePipeline.length < MAX_PENDING_WRITES);
}
/**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */
function addToWritePipeline(remoteStoreImpl, batch) {
    remoteStoreImpl.writePipeline.push(batch);
    const writeStream = ensureWriteStream(remoteStoreImpl);
    if (writeStream.isOpen() && writeStream.handshakeComplete) {
        writeStream.writeMutations(batch.mutations);
    }
}
function shouldStartWriteStream(remoteStoreImpl) {
    return (canUseNetwork(remoteStoreImpl) &&
        !ensureWriteStream(remoteStoreImpl).isStarted() &&
        remoteStoreImpl.writePipeline.length > 0);
}
function startWriteStream(remoteStoreImpl) {
    ensureWriteStream(remoteStoreImpl).start();
}
async function onWriteStreamOpen(remoteStoreImpl) {
    ensureWriteStream(remoteStoreImpl).writeHandshake();
}
async function onWriteHandshakeComplete(remoteStoreImpl) {
    const writeStream = ensureWriteStream(remoteStoreImpl);
    // Send the write pipeline now that the stream is established.
    for (const batch of remoteStoreImpl.writePipeline) {
        writeStream.writeMutations(batch.mutations);
    }
}
async function onMutationResult(remoteStoreImpl, commitVersion, results) {
    const batch = remoteStoreImpl.writePipeline.shift();
    const success = MutationBatchResult.from(batch, commitVersion, results);
    await executeWithRecovery(remoteStoreImpl, () => remoteStoreImpl.remoteSyncer.applySuccessfulWrite(success));
    // It's possible that with the completion of this mutation another
    // slot has freed up.
    await fillWritePipeline(remoteStoreImpl);
}
async function onWriteStreamClose(remoteStoreImpl, error) {
    // If the write stream closed after the write handshake completes, a write
    // operation failed and we fail the pending operation.
    if (error && ensureWriteStream(remoteStoreImpl).handshakeComplete) {
        // This error affects the actual write.
        await handleWriteError(remoteStoreImpl, error);
    }
    // The write stream might have been started by refilling the write
    // pipeline for failed writes
    if (shouldStartWriteStream(remoteStoreImpl)) {
        startWriteStream(remoteStoreImpl);
    }
}
async function handleWriteError(remoteStoreImpl, error) {
    // Only handle permanent errors here. If it's transient, just let the retry
    // logic kick in.
    if (isPermanentWriteError(error.code)) {
        // This was a permanent error, the request itself was the problem
        // so it's not going to succeed if we resend it.
        const batch = remoteStoreImpl.writePipeline.shift();
        // In this case it's also unlikely that the server itself is melting
        // down -- this was just a bad request so inhibit backoff on the next
        // restart.
        ensureWriteStream(remoteStoreImpl).inhibitBackoff();
        await executeWithRecovery(remoteStoreImpl, () => remoteStoreImpl.remoteSyncer.rejectFailedWrite(batch.batchId, error));
        // It's possible that with the completion of this mutation
        // another slot has freed up.
        await fillWritePipeline(remoteStoreImpl);
    }
}
async function restartNetwork(remoteStore) {
    const remoteStoreImpl = debugCast(remoteStore);
    remoteStoreImpl.offlineCauses.add(4 /* ConnectivityChange */);
    await disableNetworkInternal(remoteStoreImpl);
    remoteStoreImpl.onlineStateTracker.set("Unknown" /* Unknown */);
    remoteStoreImpl.offlineCauses.delete(4 /* ConnectivityChange */);
    await enableNetworkInternal(remoteStoreImpl);
}
async function remoteStoreHandleCredentialChange(remoteStore, user) {
    const remoteStoreImpl = debugCast(remoteStore);
    remoteStoreImpl.asyncQueue.verifyOperationInProgress();
    logDebug(LOG_TAG$5, 'RemoteStore received new credentials');
    const usesNetwork = canUseNetwork(remoteStoreImpl);
    // Tear down and re-create our network streams. This will ensure we get a
    // fresh auth token for the new user and re-fill the write pipeline with
    // new mutations from the LocalStore (since mutations are per-user).
    remoteStoreImpl.offlineCauses.add(3 /* CredentialChange */);
    await disableNetworkInternal(remoteStoreImpl);
    if (usesNetwork) {
        // Don't set the network status to Unknown if we are offline.
        remoteStoreImpl.onlineStateTracker.set("Unknown" /* Unknown */);
    }
    await remoteStoreImpl.remoteSyncer.handleCredentialChange(user);
    remoteStoreImpl.offlineCauses.delete(3 /* CredentialChange */);
    await enableNetworkInternal(remoteStoreImpl);
}
/**
 * Toggles the network state when the client gains or loses its primary lease.
 */
async function remoteStoreApplyPrimaryState(remoteStore, isPrimary) {
    const remoteStoreImpl = debugCast(remoteStore);
    if (isPrimary) {
        remoteStoreImpl.offlineCauses.delete(2 /* IsSecondary */);
        await enableNetworkInternal(remoteStoreImpl);
    }
    else if (!isPrimary) {
        remoteStoreImpl.offlineCauses.add(2 /* IsSecondary */);
        await disableNetworkInternal(remoteStoreImpl);
        remoteStoreImpl.onlineStateTracker.set("Unknown" /* Unknown */);
    }
}
/**
 * If not yet initialized, registers the WatchStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */
function ensureWatchStream(remoteStoreImpl) {
    if (!remoteStoreImpl.watchStream) {
        // Create stream (but note that it is not started yet).
        remoteStoreImpl.watchStream = newPersistentWatchStream(remoteStoreImpl.datastore, remoteStoreImpl.asyncQueue, {
            onOpen: onWatchStreamOpen.bind(null, remoteStoreImpl),
            onClose: onWatchStreamClose.bind(null, remoteStoreImpl),
            onWatchChange: onWatchStreamChange.bind(null, remoteStoreImpl)
        });
        remoteStoreImpl.onNetworkStatusChange.push(async (enabled) => {
            if (enabled) {
                remoteStoreImpl.watchStream.inhibitBackoff();
                if (shouldStartWatchStream(remoteStoreImpl)) {
                    startWatchStream(remoteStoreImpl);
                }
                else {
                    remoteStoreImpl.onlineStateTracker.set("Unknown" /* Unknown */);
                }
            }
            else {
                await remoteStoreImpl.watchStream.stop();
                cleanUpWatchStreamState(remoteStoreImpl);
            }
        });
    }
    return remoteStoreImpl.watchStream;
}
/**
 * If not yet initialized, registers the WriteStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */
function ensureWriteStream(remoteStoreImpl) {
    if (!remoteStoreImpl.writeStream) {
        // Create stream (but note that it is not started yet).
        remoteStoreImpl.writeStream = newPersistentWriteStream(remoteStoreImpl.datastore, remoteStoreImpl.asyncQueue, {
            onOpen: onWriteStreamOpen.bind(null, remoteStoreImpl),
            onClose: onWriteStreamClose.bind(null, remoteStoreImpl),
            onHandshakeComplete: onWriteHandshakeComplete.bind(null, remoteStoreImpl),
            onMutationResult: onMutationResult.bind(null, remoteStoreImpl)
        });
        remoteStoreImpl.onNetworkStatusChange.push(async (enabled) => {
            if (enabled) {
                remoteStoreImpl.writeStream.inhibitBackoff();
                // This will start the write stream if necessary.
                await fillWritePipeline(remoteStoreImpl);
            }
            else {
                await remoteStoreImpl.writeStream.stop();
                if (remoteStoreImpl.writePipeline.length > 0) {
                    logDebug(LOG_TAG$5, `Stopping write stream with ${remoteStoreImpl.writePipeline.length} pending writes`);
                    remoteStoreImpl.writePipeline = [];
                }
            }
        });
    }
    return remoteStoreImpl.writeStream;
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
const LOG_TAG$4 = 'AsyncQueue';
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
class DelayedOperation {
    constructor(asyncQueue, timerId, targetTimeMs, op, removalCallback) {
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
        this.deferred.promise.catch(err => { });
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
    static createAndSchedule(asyncQueue, timerId, delayMs, op, removalCallback) {
        const targetTime = Date.now() + delayMs;
        const delayedOp = new DelayedOperation(asyncQueue, timerId, targetTime, op, removalCallback);
        delayedOp.start(delayMs);
        return delayedOp;
    }
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    start(delayMs) {
        this.timerHandle = setTimeout(() => this.handleDelayElapsed(), delayMs);
    }
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    skipDelay() {
        return this.handleDelayElapsed();
    }
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    cancel(reason) {
        if (this.timerHandle !== null) {
            this.clearTimeout();
            this.deferred.reject(new FirestoreError(Code.CANCELLED, 'Operation cancelled' + (reason ? ': ' + reason : '')));
        }
    }
    handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget(() => {
            if (this.timerHandle !== null) {
                this.clearTimeout();
                return this.op().then(result => {
                    return this.deferred.resolve(result);
                });
            }
            else {
                return Promise.resolve();
            }
        });
    }
    clearTimeout() {
        if (this.timerHandle !== null) {
            this.removalCallback(this);
            clearTimeout(this.timerHandle);
            this.timerHandle = null;
        }
    }
}
/**
 * Returns a FirestoreError that can be surfaced to the user if the provided
 * error is an IndexedDbTransactionError. Re-throws the error otherwise.
 */
function wrapInUserErrorIfRecoverable(e, msg) {
    logError(LOG_TAG$4, `${msg}: ${e}`);
    if (isIndexedDbTransactionError(e)) {
        return new FirestoreError(Code.UNAVAILABLE, `${msg}: ${e}`);
    }
    else {
        throw e;
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
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */
class DocumentSet {
    /** The default ordering is by key if the comparator is omitted */
    constructor(comp) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        if (comp) {
            this.comparator = (d1, d2) => comp(d1, d2) || DocumentKey.comparator(d1.key, d2.key);
        }
        else {
            this.comparator = (d1, d2) => DocumentKey.comparator(d1.key, d2.key);
        }
        this.keyedMap = documentMap();
        this.sortedSet = new SortedMap(this.comparator);
    }
    /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */
    static emptySet(oldSet) {
        return new DocumentSet(oldSet.comparator);
    }
    has(key) {
        return this.keyedMap.get(key) != null;
    }
    get(key) {
        return this.keyedMap.get(key);
    }
    first() {
        return this.sortedSet.minKey();
    }
    last() {
        return this.sortedSet.maxKey();
    }
    isEmpty() {
        return this.sortedSet.isEmpty();
    }
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    indexOf(key) {
        const doc = this.keyedMap.get(key);
        return doc ? this.sortedSet.indexOf(doc) : -1;
    }
    get size() {
        return this.sortedSet.size;
    }
    /** Iterates documents in order defined by "comparator" */
    forEach(cb) {
        this.sortedSet.inorderTraversal((k, v) => {
            cb(k);
            return false;
        });
    }
    /** Inserts or updates a document with the same key */
    add(doc) {
        // First remove the element if we have it.
        const set = this.delete(doc.key);
        return set.copy(set.keyedMap.insert(doc.key, doc), set.sortedSet.insert(doc, null));
    }
    /** Deletes a document with a given key */
    delete(key) {
        const doc = this.get(key);
        if (!doc) {
            return this;
        }
        return this.copy(this.keyedMap.remove(key), this.sortedSet.remove(doc));
    }
    isEqual(other) {
        if (!(other instanceof DocumentSet)) {
            return false;
        }
        if (this.size !== other.size) {
            return false;
        }
        const thisIt = this.sortedSet.getIterator();
        const otherIt = other.sortedSet.getIterator();
        while (thisIt.hasNext()) {
            const thisDoc = thisIt.getNext().key;
            const otherDoc = otherIt.getNext().key;
            if (!thisDoc.isEqual(otherDoc)) {
                return false;
            }
        }
        return true;
    }
    toString() {
        const docStrings = [];
        this.forEach(doc => {
            docStrings.push(doc.toString());
        });
        if (docStrings.length === 0) {
            return 'DocumentSet ()';
        }
        else {
            return 'DocumentSet (\n  ' + docStrings.join('  \n') + '\n)';
        }
    }
    copy(keyedMap, sortedSet) {
        const newSet = new DocumentSet();
        newSet.comparator = this.comparator;
        newSet.keyedMap = keyedMap;
        newSet.sortedSet = sortedSet;
        return newSet;
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
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */
class DocumentChangeSet {
    constructor() {
        this.changeMap = new SortedMap(DocumentKey.comparator);
    }
    track(change) {
        const key = change.doc.key;
        const oldChange = this.changeMap.get(key);
        if (!oldChange) {
            this.changeMap = this.changeMap.insert(key, change);
            return;
        }
        // Merge the new change with the existing change.
        if (change.type !== 0 /* Added */ &&
            oldChange.type === 3 /* Metadata */) {
            this.changeMap = this.changeMap.insert(key, change);
        }
        else if (change.type === 3 /* Metadata */ &&
            oldChange.type !== 1 /* Removed */) {
            this.changeMap = this.changeMap.insert(key, {
                type: oldChange.type,
                doc: change.doc
            });
        }
        else if (change.type === 2 /* Modified */ &&
            oldChange.type === 2 /* Modified */) {
            this.changeMap = this.changeMap.insert(key, {
                type: 2 /* Modified */,
                doc: change.doc
            });
        }
        else if (change.type === 2 /* Modified */ &&
            oldChange.type === 0 /* Added */) {
            this.changeMap = this.changeMap.insert(key, {
                type: 0 /* Added */,
                doc: change.doc
            });
        }
        else if (change.type === 1 /* Removed */ &&
            oldChange.type === 0 /* Added */) {
            this.changeMap = this.changeMap.remove(key);
        }
        else if (change.type === 1 /* Removed */ &&
            oldChange.type === 2 /* Modified */) {
            this.changeMap = this.changeMap.insert(key, {
                type: 1 /* Removed */,
                doc: oldChange.doc
            });
        }
        else if (change.type === 0 /* Added */ &&
            oldChange.type === 1 /* Removed */) {
            this.changeMap = this.changeMap.insert(key, {
                type: 2 /* Modified */,
                doc: change.doc
            });
        }
        else {
            // This includes these cases, which don't make sense:
            // Added->Added
            // Removed->Removed
            // Modified->Added
            // Removed->Modified
            // Metadata->Added
            // Removed->Metadata
            fail();
        }
    }
    getChanges() {
        const changes = [];
        this.changeMap.inorderTraversal((key, change) => {
            changes.push(change);
        });
        return changes;
    }
}
class ViewSnapshot {
    constructor(query, docs, oldDocs, docChanges, mutatedKeys, fromCache, syncStateChanged, excludesMetadataChanges) {
        this.query = query;
        this.docs = docs;
        this.oldDocs = oldDocs;
        this.docChanges = docChanges;
        this.mutatedKeys = mutatedKeys;
        this.fromCache = fromCache;
        this.syncStateChanged = syncStateChanged;
        this.excludesMetadataChanges = excludesMetadataChanges;
    }
    /** Returns a view snapshot as if all documents in the snapshot were added. */
    static fromInitialDocuments(query, documents, mutatedKeys, fromCache) {
        const changes = [];
        documents.forEach(doc => {
            changes.push({ type: 0 /* Added */, doc });
        });
        return new ViewSnapshot(query, documents, DocumentSet.emptySet(documents), changes, mutatedKeys, fromCache, 
        /* syncStateChanged= */ true, 
        /* excludesMetadataChanges= */ false);
    }
    get hasPendingWrites() {
        return !this.mutatedKeys.isEmpty();
    }
    isEqual(other) {
        if (this.fromCache !== other.fromCache ||
            this.syncStateChanged !== other.syncStateChanged ||
            !this.mutatedKeys.isEqual(other.mutatedKeys) ||
            !queryEquals(this.query, other.query) ||
            !this.docs.isEqual(other.docs) ||
            !this.oldDocs.isEqual(other.oldDocs)) {
            return false;
        }
        const changes = this.docChanges;
        const otherChanges = other.docChanges;
        if (changes.length !== otherChanges.length) {
            return false;
        }
        for (let i = 0; i < changes.length; i++) {
            if (changes[i].type !== otherChanges[i].type ||
                !changes[i].doc.isEqual(otherChanges[i].doc)) {
                return false;
            }
        }
        return true;
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
 * Holds the listeners and the last received ViewSnapshot for a query being
 * tracked by EventManager.
 */
class QueryListenersInfo {
    constructor() {
        this.viewSnap = undefined;
        this.listeners = [];
    }
}
function newEventManager() {
    return new EventManagerImpl();
}
class EventManagerImpl {
    constructor() {
        this.queries = new ObjectMap(q => canonifyQuery(q), queryEquals);
        this.onlineState = "Unknown" /* Unknown */;
        this.snapshotsInSyncListeners = new Set();
    }
}
async function eventManagerListen(eventManager, listener) {
    const eventManagerImpl = debugCast(eventManager);
    const query = listener.query;
    let firstListen = false;
    let queryInfo = eventManagerImpl.queries.get(query);
    if (!queryInfo) {
        firstListen = true;
        queryInfo = new QueryListenersInfo();
    }
    if (firstListen) {
        try {
            queryInfo.viewSnap = await eventManagerImpl.onListen(query);
        }
        catch (e) {
            const firestoreError = wrapInUserErrorIfRecoverable(e, `Initialization of query '${stringifyQuery(listener.query)}' failed`);
            listener.onError(firestoreError);
            return;
        }
    }
    eventManagerImpl.queries.set(query, queryInfo);
    queryInfo.listeners.push(listener);
    // Run global snapshot listeners if a consistent snapshot has been emitted.
    listener.applyOnlineStateChange(eventManagerImpl.onlineState);
    if (queryInfo.viewSnap) {
        const raisedEvent = listener.onViewSnapshot(queryInfo.viewSnap);
        if (raisedEvent) {
            raiseSnapshotsInSyncEvent(eventManagerImpl);
        }
    }
}
async function eventManagerUnlisten(eventManager, listener) {
    const eventManagerImpl = debugCast(eventManager);
    const query = listener.query;
    let lastListen = false;
    const queryInfo = eventManagerImpl.queries.get(query);
    if (queryInfo) {
        const i = queryInfo.listeners.indexOf(listener);
        if (i >= 0) {
            queryInfo.listeners.splice(i, 1);
            lastListen = queryInfo.listeners.length === 0;
        }
    }
    if (lastListen) {
        eventManagerImpl.queries.delete(query);
        return eventManagerImpl.onUnlisten(query);
    }
}
function eventManagerOnWatchChange(eventManager, viewSnaps) {
    const eventManagerImpl = debugCast(eventManager);
    let raisedEvent = false;
    for (const viewSnap of viewSnaps) {
        const query = viewSnap.query;
        const queryInfo = eventManagerImpl.queries.get(query);
        if (queryInfo) {
            for (const listener of queryInfo.listeners) {
                if (listener.onViewSnapshot(viewSnap)) {
                    raisedEvent = true;
                }
            }
            queryInfo.viewSnap = viewSnap;
        }
    }
    if (raisedEvent) {
        raiseSnapshotsInSyncEvent(eventManagerImpl);
    }
}
function eventManagerOnWatchError(eventManager, query, error) {
    const eventManagerImpl = debugCast(eventManager);
    const queryInfo = eventManagerImpl.queries.get(query);
    if (queryInfo) {
        for (const listener of queryInfo.listeners) {
            listener.onError(error);
        }
    }
    // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
    // after an error.
    eventManagerImpl.queries.delete(query);
}
function eventManagerOnOnlineStateChange(eventManager, onlineState) {
    const eventManagerImpl = debugCast(eventManager);
    eventManagerImpl.onlineState = onlineState;
    let raisedEvent = false;
    eventManagerImpl.queries.forEach((_, queryInfo) => {
        for (const listener of queryInfo.listeners) {
            // Run global snapshot listeners if a consistent snapshot has been emitted.
            if (listener.applyOnlineStateChange(onlineState)) {
                raisedEvent = true;
            }
        }
    });
    if (raisedEvent) {
        raiseSnapshotsInSyncEvent(eventManagerImpl);
    }
}
function addSnapshotsInSyncListener(eventManager, observer) {
    const eventManagerImpl = debugCast(eventManager);
    eventManagerImpl.snapshotsInSyncListeners.add(observer);
    // Immediately fire an initial event, indicating all existing listeners
    // are in-sync.
    observer.next();
}
function removeSnapshotsInSyncListener(eventManager, observer) {
    const eventManagerImpl = debugCast(eventManager);
    eventManagerImpl.snapshotsInSyncListeners.delete(observer);
}
// Call all global snapshot listeners that have been set.
function raiseSnapshotsInSyncEvent(eventManagerImpl) {
    eventManagerImpl.snapshotsInSyncListeners.forEach(observer => {
        observer.next();
    });
}
/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */
class QueryListener {
    constructor(query, queryObserver, options) {
        this.query = query;
        this.queryObserver = queryObserver;
        /**
         * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
         * observer. This flag is set to true once we've actually raised an event.
         */
        this.raisedInitialEvent = false;
        this.snap = null;
        this.onlineState = "Unknown" /* Unknown */;
        this.options = options || {};
    }
    /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */
    onViewSnapshot(snap) {
        if (!this.options.includeMetadataChanges) {
            // Remove the metadata only changes.
            const docChanges = [];
            for (const docChange of snap.docChanges) {
                if (docChange.type !== 3 /* Metadata */) {
                    docChanges.push(docChange);
                }
            }
            snap = new ViewSnapshot(snap.query, snap.docs, snap.oldDocs, docChanges, snap.mutatedKeys, snap.fromCache, snap.syncStateChanged, 
            /* excludesMetadataChanges= */ true);
        }
        let raisedEvent = false;
        if (!this.raisedInitialEvent) {
            if (this.shouldRaiseInitialEvent(snap, this.onlineState)) {
                this.raiseInitialEvent(snap);
                raisedEvent = true;
            }
        }
        else if (this.shouldRaiseEvent(snap)) {
            this.queryObserver.next(snap);
            raisedEvent = true;
        }
        this.snap = snap;
        return raisedEvent;
    }
    onError(error) {
        this.queryObserver.error(error);
    }
    /** Returns whether a snapshot was raised. */
    applyOnlineStateChange(onlineState) {
        this.onlineState = onlineState;
        let raisedEvent = false;
        if (this.snap &&
            !this.raisedInitialEvent &&
            this.shouldRaiseInitialEvent(this.snap, onlineState)) {
            this.raiseInitialEvent(this.snap);
            raisedEvent = true;
        }
        return raisedEvent;
    }
    shouldRaiseInitialEvent(snap, onlineState) {
        // Always raise the first event when we're synced
        if (!snap.fromCache) {
            return true;
        }
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
        const maybeOnline = onlineState !== "Offline" /* Offline */;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
        if (this.options.waitForSyncWhenOnline && maybeOnline) {
            return false;
        }
        // Raise data from cache if we have any documents or we are offline
        return !snap.docs.isEmpty() || onlineState === "Offline" /* Offline */;
    }
    shouldRaiseEvent(snap) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (snap.docChanges.length > 0) {
            return true;
        }
        const hasPendingWritesChanged = this.snap && this.snap.hasPendingWrites !== snap.hasPendingWrites;
        if (snap.syncStateChanged || hasPendingWritesChanged) {
            return this.options.includeMetadataChanges === true;
        }
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        return false;
    }
    raiseInitialEvent(snap) {
        snap = ViewSnapshot.fromInitialDocuments(snap.query, snap.docs, snap.mutatedKeys, snap.fromCache);
        this.raisedInitialEvent = true;
        this.queryObserver.next(snap);
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
 * A set of changes to what documents are currently in view and out of view for
 * a given query. These changes are sent to the LocalStore by the View (via
 * the SyncEngine) and are used to pin / unpin documents as appropriate.
 */
class LocalViewChanges {
    constructor(targetId, fromCache, addedKeys, removedKeys) {
        this.targetId = targetId;
        this.fromCache = fromCache;
        this.addedKeys = addedKeys;
        this.removedKeys = removedKeys;
    }
    static fromSnapshot(targetId, viewSnapshot) {
        let addedKeys = documentKeySet();
        let removedKeys = documentKeySet();
        for (const docChange of viewSnapshot.docChanges) {
            switch (docChange.type) {
                case 0 /* Added */:
                    addedKeys = addedKeys.add(docChange.doc.key);
                    break;
                case 1 /* Removed */:
                    removedKeys = removedKeys.add(docChange.doc.key);
                    break;
                // do nothing
            }
        }
        return new LocalViewChanges(targetId, viewSnapshot.fromCache, addedKeys, removedKeys);
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
class BundleLoadResult {
    constructor(progress, changedDocs) {
        this.progress = progress;
        this.changedDocs = changedDocs;
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
 * Helper to convert objects from bundles to model objects in the SDK.
 */
class BundleConverterImpl {
    constructor(serializer) {
        this.serializer = serializer;
    }
    toDocumentKey(name) {
        return fromName(this.serializer, name);
    }
    /**
     * Converts a BundleDocument to a MutableDocument.
     */
    toMutableDocument(bundledDoc) {
        if (bundledDoc.metadata.exists) {
            return fromDocument(this.serializer, bundledDoc.document, false);
        }
        else {
            return MutableDocument.newNoDocument(this.toDocumentKey(bundledDoc.metadata.name), this.toSnapshotVersion(bundledDoc.metadata.readTime));
        }
    }
    toSnapshotVersion(time) {
        return fromVersion(time);
    }
}
/**
 * A class to process the elements from a bundle, load them into local
 * storage and provide progress update while loading.
 */
class BundleLoader {
    constructor(bundleMetadata, localStore, serializer) {
        this.bundleMetadata = bundleMetadata;
        this.localStore = localStore;
        this.serializer = serializer;
        /** Batched queries to be saved into storage */
        this.queries = [];
        /** Batched documents to be saved into storage */
        this.documents = [];
        this.progress = bundleInitialProgress(bundleMetadata);
    }
    /**
     * Adds an element from the bundle to the loader.
     *
     * Returns a new progress if adding the element leads to a new progress,
     * otherwise returns null.
     */
    addSizedElement(element) {
        this.progress.bytesLoaded += element.byteLength;
        let documentsLoaded = this.progress.documentsLoaded;
        if (element.payload.namedQuery) {
            this.queries.push(element.payload.namedQuery);
        }
        else if (element.payload.documentMetadata) {
            this.documents.push({ metadata: element.payload.documentMetadata });
            if (!element.payload.documentMetadata.exists) {
                ++documentsLoaded;
            }
        }
        else if (element.payload.document) {
            this.documents[this.documents.length - 1].document =
                element.payload.document;
            ++documentsLoaded;
        }
        if (documentsLoaded !== this.progress.documentsLoaded) {
            this.progress.documentsLoaded = documentsLoaded;
            return Object.assign({}, this.progress);
        }
        return null;
    }
    getQueryDocumentMapping(documents) {
        const queryDocumentMap = new Map();
        const bundleConverter = new BundleConverterImpl(this.serializer);
        for (const bundleDoc of documents) {
            if (bundleDoc.metadata.queries) {
                const documentKey = bundleConverter.toDocumentKey(bundleDoc.metadata.name);
                for (const queryName of bundleDoc.metadata.queries) {
                    const documentKeys = (queryDocumentMap.get(queryName) || documentKeySet()).add(documentKey);
                    queryDocumentMap.set(queryName, documentKeys);
                }
            }
        }
        return queryDocumentMap;
    }
    /**
     * Update the progress to 'Success' and return the updated progress.
     */
    async complete() {
        const changedDocuments = await localStoreApplyBundledDocuments(this.localStore, new BundleConverterImpl(this.serializer), this.documents, this.bundleMetadata.id);
        const queryDocumentMap = this.getQueryDocumentMapping(this.documents);
        for (const q of this.queries) {
            await localStoreSaveNamedQuery(this.localStore, q, queryDocumentMap.get(q.name));
        }
        this.progress.taskState = 'Success';
        return new BundleLoadResult(Object.assign({}, this.progress), changedDocuments);
    }
}
/**
 * Returns a `LoadBundleTaskProgress` representing the initial progress of
 * loading a bundle.
 */
function bundleInitialProgress(metadata) {
    return {
        taskState: 'Running',
        documentsLoaded: 0,
        bytesLoaded: 0,
        totalDocuments: metadata.totalDocuments,
        totalBytes: metadata.totalBytes
    };
}
/**
 * Returns a `LoadBundleTaskProgress` representing the progress that the loading
 * has succeeded.
 */
function bundleSuccessProgress(metadata) {
    return {
        taskState: 'Success',
        documentsLoaded: metadata.totalDocuments,
        bytesLoaded: metadata.totalBytes,
        totalDocuments: metadata.totalDocuments,
        totalBytes: metadata.totalBytes
    };
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
class AddedLimboDocument {
    constructor(key) {
        this.key = key;
    }
}
class RemovedLimboDocument {
    constructor(key) {
        this.key = key;
    }
}
/**
 * View is responsible for computing the final merged truth of what docs are in
 * a query. It gets notified of local and remote changes to docs, and applies
 * the query filters and limits to determine the most correct possible results.
 */
class View {
    constructor(query, 
    /** Documents included in the remote target */
    _syncedDocuments) {
        this.query = query;
        this._syncedDocuments = _syncedDocuments;
        this.syncState = null;
        /**
         * A flag whether the view is current with the backend. A view is considered
         * current after it has seen the current flag from the backend and did not
         * lose consistency within the watch stream (e.g. because of an existence
         * filter mismatch).
         */
        this.current = false;
        /** Documents in the view but not in the remote target */
        this.limboDocuments = documentKeySet();
        /** Document Keys that have local changes */
        this.mutatedKeys = documentKeySet();
        this.docComparator = newQueryComparator(query);
        this.documentSet = new DocumentSet(this.docComparator);
    }
    /**
     * The set of remote documents that the server has told us belongs to the target associated with
     * this view.
     */
    get syncedDocuments() {
        return this._syncedDocuments;
    }
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
    computeDocChanges(docChanges, previousChanges) {
        const changeSet = previousChanges
            ? previousChanges.changeSet
            : new DocumentChangeSet();
        const oldDocumentSet = previousChanges
            ? previousChanges.documentSet
            : this.documentSet;
        let newMutatedKeys = previousChanges
            ? previousChanges.mutatedKeys
            : this.mutatedKeys;
        let newDocumentSet = oldDocumentSet;
        let needsRefill = false;
        // Track the last doc in a (full) limit. This is necessary, because some
        // update (a delete, or an update moving a doc past the old limit) might
        // mean there is some other document in the local cache that either should
        // come (1) between the old last limit doc and the new last document, in the
        // case of updates, or (2) after the new last document, in the case of
        // deletes. So we keep this doc at the old limit to compare the updates to.
        //
        // Note that this should never get used in a refill (when previousChanges is
        // set), because there will only be adds -- no deletes or updates.
        const lastDocInLimit = hasLimitToFirst(this.query) && oldDocumentSet.size === this.query.limit
            ? oldDocumentSet.last()
            : null;
        const firstDocInLimit = hasLimitToLast(this.query) && oldDocumentSet.size === this.query.limit
            ? oldDocumentSet.first()
            : null;
        docChanges.inorderTraversal((key, entry) => {
            const oldDoc = oldDocumentSet.get(key);
            const newDoc = queryMatches(this.query, entry) ? entry : null;
            const oldDocHadPendingMutations = oldDoc
                ? this.mutatedKeys.has(oldDoc.key)
                : false;
            const newDocHasPendingMutations = newDoc
                ? newDoc.hasLocalMutations ||
                    // We only consider committed mutations for documents that were
                    // mutated during the lifetime of the view.
                    (this.mutatedKeys.has(newDoc.key) && newDoc.hasCommittedMutations)
                : false;
            let changeApplied = false;
            // Calculate change
            if (oldDoc && newDoc) {
                const docsEqual = oldDoc.data.isEqual(newDoc.data);
                if (!docsEqual) {
                    if (!this.shouldWaitForSyncedDocument(oldDoc, newDoc)) {
                        changeSet.track({
                            type: 2 /* Modified */,
                            doc: newDoc
                        });
                        changeApplied = true;
                        if ((lastDocInLimit &&
                            this.docComparator(newDoc, lastDocInLimit) > 0) ||
                            (firstDocInLimit &&
                                this.docComparator(newDoc, firstDocInLimit) < 0)) {
                            // This doc moved from inside the limit to outside the limit.
                            // That means there may be some other doc in the local cache
                            // that should be included instead.
                            needsRefill = true;
                        }
                    }
                }
                else if (oldDocHadPendingMutations !== newDocHasPendingMutations) {
                    changeSet.track({ type: 3 /* Metadata */, doc: newDoc });
                    changeApplied = true;
                }
            }
            else if (!oldDoc && newDoc) {
                changeSet.track({ type: 0 /* Added */, doc: newDoc });
                changeApplied = true;
            }
            else if (oldDoc && !newDoc) {
                changeSet.track({ type: 1 /* Removed */, doc: oldDoc });
                changeApplied = true;
                if (lastDocInLimit || firstDocInLimit) {
                    // A doc was removed from a full limit query. We'll need to
                    // requery from the local cache to see if we know about some other
                    // doc that should be in the results.
                    needsRefill = true;
                }
            }
            if (changeApplied) {
                if (newDoc) {
                    newDocumentSet = newDocumentSet.add(newDoc);
                    if (newDocHasPendingMutations) {
                        newMutatedKeys = newMutatedKeys.add(key);
                    }
                    else {
                        newMutatedKeys = newMutatedKeys.delete(key);
                    }
                }
                else {
                    newDocumentSet = newDocumentSet.delete(key);
                    newMutatedKeys = newMutatedKeys.delete(key);
                }
            }
        });
        // Drop documents out to meet limit/limitToLast requirement.
        if (hasLimitToFirst(this.query) || hasLimitToLast(this.query)) {
            while (newDocumentSet.size > this.query.limit) {
                const oldDoc = hasLimitToFirst(this.query)
                    ? newDocumentSet.last()
                    : newDocumentSet.first();
                newDocumentSet = newDocumentSet.delete(oldDoc.key);
                newMutatedKeys = newMutatedKeys.delete(oldDoc.key);
                changeSet.track({ type: 1 /* Removed */, doc: oldDoc });
            }
        }
        return {
            documentSet: newDocumentSet,
            changeSet,
            needsRefill,
            mutatedKeys: newMutatedKeys
        };
    }
    shouldWaitForSyncedDocument(oldDoc, newDoc) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return (oldDoc.hasLocalMutations &&
            newDoc.hasCommittedMutations &&
            !newDoc.hasLocalMutations);
    }
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
    applyChanges(docChanges, updateLimboDocuments, targetChange) {
        const oldDocs = this.documentSet;
        this.documentSet = docChanges.documentSet;
        this.mutatedKeys = docChanges.mutatedKeys;
        // Sort changes based on type and query comparator
        const changes = docChanges.changeSet.getChanges();
        changes.sort((c1, c2) => {
            return (compareChangeType(c1.type, c2.type) ||
                this.docComparator(c1.doc, c2.doc));
        });
        this.applyTargetChange(targetChange);
        const limboChanges = updateLimboDocuments
            ? this.updateLimboDocuments()
            : [];
        const synced = this.limboDocuments.size === 0 && this.current;
        const newSyncState = synced ? 1 /* Synced */ : 0 /* Local */;
        const syncStateChanged = newSyncState !== this.syncState;
        this.syncState = newSyncState;
        if (changes.length === 0 && !syncStateChanged) {
            // no changes
            return { limboChanges };
        }
        else {
            const snap = new ViewSnapshot(this.query, docChanges.documentSet, oldDocs, changes, docChanges.mutatedKeys, newSyncState === 0 /* Local */, syncStateChanged, 
            /* excludesMetadataChanges= */ false);
            return {
                snapshot: snap,
                limboChanges
            };
        }
    }
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    applyOnlineStateChange(onlineState) {
        if (this.current && onlineState === "Offline" /* Offline */) {
            // If we're offline, set `current` to false and then call applyChanges()
            // to refresh our syncState and generate a ViewChange as appropriate. We
            // are guaranteed to get a new TargetChange that sets `current` back to
            // true once the client is back online.
            this.current = false;
            return this.applyChanges({
                documentSet: this.documentSet,
                changeSet: new DocumentChangeSet(),
                mutatedKeys: this.mutatedKeys,
                needsRefill: false
            }, 
            /* updateLimboDocuments= */ false);
        }
        else {
            // No effect, just return a no-op ViewChange.
            return { limboChanges: [] };
        }
    }
    /**
     * Returns whether the doc for the given key should be in limbo.
     */
    shouldBeInLimbo(key) {
        // If the remote end says it's part of this query, it's not in limbo.
        if (this._syncedDocuments.has(key)) {
            return false;
        }
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        if (!this.documentSet.has(key)) {
            return false;
        }
        // If there are local changes to the doc, they might explain why the server
        // doesn't know that it's part of the query. So don't put it in limbo.
        // TODO(klimt): Ideally, we would only consider changes that might actually
        // affect this specific query.
        if (this.documentSet.get(key).hasLocalMutations) {
            return false;
        }
        // Everything else is in limbo.
        return true;
    }
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    applyTargetChange(targetChange) {
        if (targetChange) {
            targetChange.addedDocuments.forEach(key => (this._syncedDocuments = this._syncedDocuments.add(key)));
            targetChange.modifiedDocuments.forEach(key => {
            });
            targetChange.removedDocuments.forEach(key => (this._syncedDocuments = this._syncedDocuments.delete(key)));
            this.current = targetChange.current;
        }
    }
    updateLimboDocuments() {
        // We can only determine limbo documents when we're in-sync with the server.
        if (!this.current) {
            return [];
        }
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
        const oldLimboDocuments = this.limboDocuments;
        this.limboDocuments = documentKeySet();
        this.documentSet.forEach(doc => {
            if (this.shouldBeInLimbo(doc.key)) {
                this.limboDocuments = this.limboDocuments.add(doc.key);
            }
        });
        // Diff the new limbo docs with the old limbo docs.
        const changes = [];
        oldLimboDocuments.forEach(key => {
            if (!this.limboDocuments.has(key)) {
                changes.push(new RemovedLimboDocument(key));
            }
        });
        this.limboDocuments.forEach(key => {
            if (!oldLimboDocuments.has(key)) {
                changes.push(new AddedLimboDocument(key));
            }
        });
        return changes;
    }
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
    synchronizeWithPersistedState(queryResult) {
        this._syncedDocuments = queryResult.remoteKeys;
        this.limboDocuments = documentKeySet();
        const docChanges = this.computeDocChanges(queryResult.documents);
        return this.applyChanges(docChanges, /*updateLimboDocuments=*/ true);
    }
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    computeInitialSnapshot() {
        return ViewSnapshot.fromInitialDocuments(this.query, this.documentSet, this.mutatedKeys, this.syncState === 0 /* Local */);
    }
}
function compareChangeType(c1, c2) {
    const order = (change) => {
        switch (change) {
            case 0 /* Added */:
                return 1;
            case 2 /* Modified */:
                return 2;
            case 3 /* Metadata */:
                // A metadata change is converted to a modified change at the public
                // api layer.  Since we sort by document key and then change type,
                // metadata and modified changes must be sorted equivalently.
                return 2;
            case 1 /* Removed */:
                return 0;
            default:
                return fail();
        }
    };
    return order(c1) - order(c2);
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
const LOG_TAG$3 = 'SyncEngine';
/**
 * QueryView contains all of the data that SyncEngine needs to keep track of for
 * a particular query.
 */
class QueryView {
    constructor(
    /**
     * The query itself.
     */
    query, 
    /**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
    targetId, 
    /**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
    view) {
        this.query = query;
        this.targetId = targetId;
        this.view = view;
    }
}
/** Tracks a limbo resolution. */
class LimboResolution {
    constructor(key) {
        this.key = key;
        /**
         * Set to true once we've received a document. This is used in
         * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
         * decide whether it needs to manufacture a delete event for the target once
         * the target is CURRENT.
         */
        this.receivedDocument = false;
    }
}
/**
 * An implementation of `SyncEngine` coordinating with other parts of SDK.
 *
 * The parts of SyncEngine that act as a callback to RemoteStore need to be
 * registered individually. This is done in `syncEngineWrite()` and
 * `syncEngineListen()` (as well as `applyPrimaryState()`) as these methods
 * serve as entry points to RemoteStore's functionality.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */
class SyncEngineImpl {
    constructor(localStore, remoteStore, eventManager, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    sharedClientState, currentUser, maxConcurrentLimboResolutions) {
        this.localStore = localStore;
        this.remoteStore = remoteStore;
        this.eventManager = eventManager;
        this.sharedClientState = sharedClientState;
        this.currentUser = currentUser;
        this.maxConcurrentLimboResolutions = maxConcurrentLimboResolutions;
        this.syncEngineListener = {};
        this.queryViewsByQuery = new ObjectMap(q => canonifyQuery(q), queryEquals);
        this.queriesByTarget = new Map();
        /**
         * The keys of documents that are in limbo for which we haven't yet started a
         * limbo resolution query. The strings in this set are the result of calling
         * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
         *
         * The `Set` type was chosen because it provides efficient lookup and removal
         * of arbitrary elements and it also maintains insertion order, providing the
         * desired queue-like FIFO semantics.
         */
        this.enqueuedLimboResolutions = new Set();
        /**
         * Keeps track of the target ID for each document that is in limbo with an
         * active target.
         */
        this.activeLimboTargetsByKey = new SortedMap(DocumentKey.comparator);
        /**
         * Keeps track of the information about an active limbo resolution for each
         * active target ID that was started for the purpose of limbo resolution.
         */
        this.activeLimboResolutionsByTarget = new Map();
        this.limboDocumentRefs = new ReferenceSet();
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.mutationUserCallbacks = {};
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.pendingWritesCallbacks = new Map();
        this.limboTargetIdGenerator = TargetIdGenerator.forSyncEngine();
        this.onlineState = "Unknown" /* Unknown */;
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        this._isPrimaryClient = undefined;
    }
    get isPrimaryClient() {
        return this._isPrimaryClient === true;
    }
}
function newSyncEngine(localStore, remoteStore, eventManager, 
// PORTING NOTE: Manages state synchronization in multi-tab environments.
sharedClientState, currentUser, maxConcurrentLimboResolutions, isPrimary) {
    const syncEngine = new SyncEngineImpl(localStore, remoteStore, eventManager, sharedClientState, currentUser, maxConcurrentLimboResolutions);
    if (isPrimary) {
        syncEngine._isPrimaryClient = true;
    }
    return syncEngine;
}
/**
 * Initiates the new listen, resolves promise when listen enqueued to the
 * server. All the subsequent view snapshots or errors are sent to the
 * subscribed handlers. Returns the initial snapshot.
 */
async function syncEngineListen(syncEngine, query) {
    const syncEngineImpl = ensureWatchCallbacks(syncEngine);
    let targetId;
    let viewSnapshot;
    const queryView = syncEngineImpl.queryViewsByQuery.get(query);
    if (queryView) {
        // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
        // already exists when EventManager calls us for the first time. This
        // happens when the primary tab is already listening to this query on
        // behalf of another tab and the user of the primary also starts listening
        // to the query. EventManager will not have an assigned target ID in this
        // case and calls `listen` to obtain this ID.
        targetId = queryView.targetId;
        syncEngineImpl.sharedClientState.addLocalQueryTarget(targetId);
        viewSnapshot = queryView.view.computeInitialSnapshot();
    }
    else {
        const targetData = await localStoreAllocateTarget(syncEngineImpl.localStore, queryToTarget(query));
        const status = syncEngineImpl.sharedClientState.addLocalQueryTarget(targetData.targetId);
        targetId = targetData.targetId;
        viewSnapshot = await initializeViewAndComputeSnapshot(syncEngineImpl, query, targetId, status === 'current');
        if (syncEngineImpl.isPrimaryClient) {
            remoteStoreListen(syncEngineImpl.remoteStore, targetData);
        }
    }
    return viewSnapshot;
}
/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */
async function initializeViewAndComputeSnapshot(syncEngineImpl, query, targetId, current) {
    // PORTING NOTE: On Web only, we inject the code that registers new Limbo
    // targets based on view changes. This allows us to only depend on Limbo
    // changes when user code includes queries.
    syncEngineImpl.applyDocChanges = (queryView, changes, remoteEvent) => applyDocChanges(syncEngineImpl, queryView, changes, remoteEvent);
    const queryResult = await localStoreExecuteQuery(syncEngineImpl.localStore, query, 
    /* usePreviousResults= */ true);
    const view = new View(query, queryResult.remoteKeys);
    const viewDocChanges = view.computeDocChanges(queryResult.documents);
    const synthesizedTargetChange = TargetChange.createSynthesizedTargetChangeForCurrentChange(targetId, current && syncEngineImpl.onlineState !== "Offline" /* Offline */);
    const viewChange = view.applyChanges(viewDocChanges, 
    /* updateLimboDocuments= */ syncEngineImpl.isPrimaryClient, synthesizedTargetChange);
    updateTrackedLimbos(syncEngineImpl, targetId, viewChange.limboChanges);
    const data = new QueryView(query, targetId, view);
    syncEngineImpl.queryViewsByQuery.set(query, data);
    if (syncEngineImpl.queriesByTarget.has(targetId)) {
        syncEngineImpl.queriesByTarget.get(targetId).push(query);
    }
    else {
        syncEngineImpl.queriesByTarget.set(targetId, [query]);
    }
    return viewChange.snapshot;
}
/** Stops listening to the query. */
async function syncEngineUnlisten(syncEngine, query) {
    const syncEngineImpl = debugCast(syncEngine);
    const queryView = syncEngineImpl.queryViewsByQuery.get(query);
    // Only clean up the query view and target if this is the only query mapped
    // to the target.
    const queries = syncEngineImpl.queriesByTarget.get(queryView.targetId);
    if (queries.length > 1) {
        syncEngineImpl.queriesByTarget.set(queryView.targetId, queries.filter(q => !queryEquals(q, query)));
        syncEngineImpl.queryViewsByQuery.delete(query);
        return;
    }
    // No other queries are mapped to the target, clean up the query and the target.
    if (syncEngineImpl.isPrimaryClient) {
        // We need to remove the local query target first to allow us to verify
        // whether any other client is still interested in this target.
        syncEngineImpl.sharedClientState.removeLocalQueryTarget(queryView.targetId);
        const targetRemainsActive = syncEngineImpl.sharedClientState.isActiveQueryTarget(queryView.targetId);
        if (!targetRemainsActive) {
            await localStoreReleaseTarget(syncEngineImpl.localStore, queryView.targetId, 
            /*keepPersistedTargetData=*/ false)
                .then(() => {
                syncEngineImpl.sharedClientState.clearQueryState(queryView.targetId);
                remoteStoreUnlisten(syncEngineImpl.remoteStore, queryView.targetId);
                removeAndCleanupTarget(syncEngineImpl, queryView.targetId);
            })
                .catch(ignoreIfPrimaryLeaseLoss);
        }
    }
    else {
        removeAndCleanupTarget(syncEngineImpl, queryView.targetId);
        await localStoreReleaseTarget(syncEngineImpl.localStore, queryView.targetId, 
        /*keepPersistedTargetData=*/ true);
    }
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
 */
async function syncEngineWrite(syncEngine, batch, userCallback) {
    const syncEngineImpl = syncEngineEnsureWriteCallbacks(syncEngine);
    try {
        const result = await localStoreWriteLocally(syncEngineImpl.localStore, batch);
        syncEngineImpl.sharedClientState.addPendingMutation(result.batchId);
        addMutationCallback(syncEngineImpl, result.batchId, userCallback);
        await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, result.changes);
        await fillWritePipeline(syncEngineImpl.remoteStore);
    }
    catch (e) {
        // If we can't persist the mutation, we reject the user callback and
        // don't send the mutation. The user can then retry the write.
        const error = wrapInUserErrorIfRecoverable(e, `Failed to persist write`);
        userCallback.reject(error);
    }
}
/**
 * Applies one remote event to the sync engine, notifying any views of the
 * changes, and releasing any pending mutation batches that would become
 * visible because of the snapshot version the remote event contains.
 */
async function syncEngineApplyRemoteEvent(syncEngine, remoteEvent) {
    const syncEngineImpl = debugCast(syncEngine);
    try {
        const changes = await localStoreApplyRemoteEventToLocalCache(syncEngineImpl.localStore, remoteEvent);
        // Update `receivedDocument` as appropriate for any limbo targets.
        remoteEvent.targetChanges.forEach((targetChange, targetId) => {
            const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
            if (limboResolution) {
                // Since this is a limbo resolution lookup, it's for a single document
                // and it could be added, modified, or removed, but not a combination.
                hardAssert(targetChange.addedDocuments.size +
                    targetChange.modifiedDocuments.size +
                    targetChange.removedDocuments.size <=
                    1);
                if (targetChange.addedDocuments.size > 0) {
                    limboResolution.receivedDocument = true;
                }
                else if (targetChange.modifiedDocuments.size > 0) {
                    hardAssert(limboResolution.receivedDocument);
                }
                else if (targetChange.removedDocuments.size > 0) {
                    hardAssert(limboResolution.receivedDocument);
                    limboResolution.receivedDocument = false;
                }
                else {
                    // This was probably just a CURRENT targetChange or similar.
                }
            }
        });
        await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes, remoteEvent);
    }
    catch (error) {
        await ignoreIfPrimaryLeaseLoss(error);
    }
}
/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */
function syncEngineApplyOnlineStateChange(syncEngine, onlineState, source) {
    const syncEngineImpl = debugCast(syncEngine);
    // If we are the secondary client, we explicitly ignore the remote store's
    // online state (the local client may go offline, even though the primary
    // tab remains online) and only apply the primary tab's online state from
    // SharedClientState.
    if ((syncEngineImpl.isPrimaryClient &&
        source === 0 /* RemoteStore */) ||
        (!syncEngineImpl.isPrimaryClient &&
            source === 1 /* SharedClientState */)) {
        const newViewSnapshots = [];
        syncEngineImpl.queryViewsByQuery.forEach((query, queryView) => {
            const viewChange = queryView.view.applyOnlineStateChange(onlineState);
            if (viewChange.snapshot) {
                newViewSnapshots.push(viewChange.snapshot);
            }
        });
        eventManagerOnOnlineStateChange(syncEngineImpl.eventManager, onlineState);
        if (newViewSnapshots.length) {
            syncEngineImpl.syncEngineListener.onWatchChange(newViewSnapshots);
        }
        syncEngineImpl.onlineState = onlineState;
        if (syncEngineImpl.isPrimaryClient) {
            syncEngineImpl.sharedClientState.setOnlineState(onlineState);
        }
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
 */
async function syncEngineRejectListen(syncEngine, targetId, err) {
    const syncEngineImpl = debugCast(syncEngine);
    // PORTING NOTE: Multi-tab only.
    syncEngineImpl.sharedClientState.updateQueryState(targetId, 'rejected', err);
    const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
    const limboKey = limboResolution && limboResolution.key;
    if (limboKey) {
        // TODO(klimt): We really only should do the following on permission
        // denied errors, but we don't have the cause code here.
        // It's a limbo doc. Create a synthetic event saying it was deleted.
        // This is kind of a hack. Ideally, we would have a method in the local
        // store to purge a document. However, it would be tricky to keep all of
        // the local store's invariants with another method.
        let documentUpdates = new SortedMap(DocumentKey.comparator);
        documentUpdates = documentUpdates.insert(limboKey, MutableDocument.newNoDocument(limboKey, SnapshotVersion.min()));
        const resolvedLimboDocuments = documentKeySet().add(limboKey);
        const event = new RemoteEvent(SnapshotVersion.min(), 
        /* targetChanges= */ new Map(), 
        /* targetMismatches= */ new SortedSet(primitiveComparator), documentUpdates, resolvedLimboDocuments);
        await syncEngineApplyRemoteEvent(syncEngineImpl, event);
        // Since this query failed, we won't want to manually unlisten to it.
        // We only remove it from bookkeeping after we successfully applied the
        // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
        // this query when the RemoteStore restarts the Watch stream, which should
        // re-trigger the target failure.
        syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.remove(limboKey);
        syncEngineImpl.activeLimboResolutionsByTarget.delete(targetId);
        pumpEnqueuedLimboResolutions(syncEngineImpl);
    }
    else {
        await localStoreReleaseTarget(syncEngineImpl.localStore, targetId, 
        /* keepPersistedTargetData */ false)
            .then(() => removeAndCleanupTarget(syncEngineImpl, targetId, err))
            .catch(ignoreIfPrimaryLeaseLoss);
    }
}
async function syncEngineApplySuccessfulWrite(syncEngine, mutationBatchResult) {
    const syncEngineImpl = debugCast(syncEngine);
    const batchId = mutationBatchResult.batch.batchId;
    try {
        const changes = await localStoreAcknowledgeBatch(syncEngineImpl.localStore, mutationBatchResult);
        // The local store may or may not be able to apply the write result and
        // raise events immediately (depending on whether the watcher is caught
        // up), so we raise user callbacks first so that they consistently happen
        // before listen events.
        processUserCallback(syncEngineImpl, batchId, /*error=*/ null);
        triggerPendingWritesCallbacks(syncEngineImpl, batchId);
        syncEngineImpl.sharedClientState.updateMutationState(batchId, 'acknowledged');
        await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes);
    }
    catch (error) {
        await ignoreIfPrimaryLeaseLoss(error);
    }
}
async function syncEngineRejectFailedWrite(syncEngine, batchId, error) {
    const syncEngineImpl = debugCast(syncEngine);
    try {
        const changes = await localStoreRejectBatch(syncEngineImpl.localStore, batchId);
        // The local store may or may not be able to apply the write result and
        // raise events immediately (depending on whether the watcher is caught up),
        // so we raise user callbacks first so that they consistently happen before
        // listen events.
        processUserCallback(syncEngineImpl, batchId, error);
        triggerPendingWritesCallbacks(syncEngineImpl, batchId);
        syncEngineImpl.sharedClientState.updateMutationState(batchId, 'rejected', error);
        await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes);
    }
    catch (error) {
        await ignoreIfPrimaryLeaseLoss(error);
    }
}
/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */
async function syncEngineRegisterPendingWritesCallback(syncEngine, callback) {
    const syncEngineImpl = debugCast(syncEngine);
    if (!canUseNetwork(syncEngineImpl.remoteStore)) {
        logDebug(LOG_TAG$3, 'The network is disabled. The task returned by ' +
            "'awaitPendingWrites()' will not complete until the network is enabled.");
    }
    try {
        const highestBatchId = await localStoreGetHighestUnacknowledgedBatchId(syncEngineImpl.localStore);
        if (highestBatchId === BATCHID_UNKNOWN) {
            // Trigger the callback right away if there is no pending writes at the moment.
            callback.resolve();
            return;
        }
        const callbacks = syncEngineImpl.pendingWritesCallbacks.get(highestBatchId) || [];
        callbacks.push(callback);
        syncEngineImpl.pendingWritesCallbacks.set(highestBatchId, callbacks);
    }
    catch (e) {
        const firestoreError = wrapInUserErrorIfRecoverable(e, 'Initialization of waitForPendingWrites() operation failed');
        callback.reject(firestoreError);
    }
}
/**
 * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
 * if there are any.
 */
function triggerPendingWritesCallbacks(syncEngineImpl, batchId) {
    (syncEngineImpl.pendingWritesCallbacks.get(batchId) || []).forEach(callback => {
        callback.resolve();
    });
    syncEngineImpl.pendingWritesCallbacks.delete(batchId);
}
/** Reject all outstanding callbacks waiting for pending writes to complete. */
function rejectOutstandingPendingWritesCallbacks(syncEngineImpl, errorMessage) {
    syncEngineImpl.pendingWritesCallbacks.forEach(callbacks => {
        callbacks.forEach(callback => {
            callback.reject(new FirestoreError(Code.CANCELLED, errorMessage));
        });
    });
    syncEngineImpl.pendingWritesCallbacks.clear();
}
function addMutationCallback(syncEngineImpl, batchId, callback) {
    let newCallbacks = syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()];
    if (!newCallbacks) {
        newCallbacks = new SortedMap(primitiveComparator);
    }
    newCallbacks = newCallbacks.insert(batchId, callback);
    syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()] = newCallbacks;
}
/**
 * Resolves or rejects the user callback for the given batch and then discards
 * it.
 */
function processUserCallback(syncEngine, batchId, error) {
    const syncEngineImpl = debugCast(syncEngine);
    let newCallbacks = syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()];
    // NOTE: Mutations restored from persistence won't have callbacks, so it's
    // okay for there to be no callback for this ID.
    if (newCallbacks) {
        const callback = newCallbacks.get(batchId);
        if (callback) {
            if (error) {
                callback.reject(error);
            }
            else {
                callback.resolve();
            }
            newCallbacks = newCallbacks.remove(batchId);
        }
        syncEngineImpl.mutationUserCallbacks[syncEngineImpl.currentUser.toKey()] = newCallbacks;
    }
}
function removeAndCleanupTarget(syncEngineImpl, targetId, error = null) {
    syncEngineImpl.sharedClientState.removeLocalQueryTarget(targetId);
    for (const query of syncEngineImpl.queriesByTarget.get(targetId)) {
        syncEngineImpl.queryViewsByQuery.delete(query);
        if (error) {
            syncEngineImpl.syncEngineListener.onWatchError(query, error);
        }
    }
    syncEngineImpl.queriesByTarget.delete(targetId);
    if (syncEngineImpl.isPrimaryClient) {
        const limboKeys = syncEngineImpl.limboDocumentRefs.removeReferencesForId(targetId);
        limboKeys.forEach(limboKey => {
            const isReferenced = syncEngineImpl.limboDocumentRefs.containsKey(limboKey);
            if (!isReferenced) {
                // We removed the last reference for this key
                removeLimboTarget(syncEngineImpl, limboKey);
            }
        });
    }
}
function removeLimboTarget(syncEngineImpl, key) {
    syncEngineImpl.enqueuedLimboResolutions.delete(key.path.canonicalString());
    // It's possible that the target already got removed because the query failed. In that case,
    // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
    const limboTargetId = syncEngineImpl.activeLimboTargetsByKey.get(key);
    if (limboTargetId === null) {
        // This target already got removed, because the query failed.
        return;
    }
    remoteStoreUnlisten(syncEngineImpl.remoteStore, limboTargetId);
    syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.remove(key);
    syncEngineImpl.activeLimboResolutionsByTarget.delete(limboTargetId);
    pumpEnqueuedLimboResolutions(syncEngineImpl);
}
function updateTrackedLimbos(syncEngineImpl, targetId, limboChanges) {
    for (const limboChange of limboChanges) {
        if (limboChange instanceof AddedLimboDocument) {
            syncEngineImpl.limboDocumentRefs.addReference(limboChange.key, targetId);
            trackLimboChange(syncEngineImpl, limboChange);
        }
        else if (limboChange instanceof RemovedLimboDocument) {
            logDebug(LOG_TAG$3, 'Document no longer in limbo: ' + limboChange.key);
            syncEngineImpl.limboDocumentRefs.removeReference(limboChange.key, targetId);
            const isReferenced = syncEngineImpl.limboDocumentRefs.containsKey(limboChange.key);
            if (!isReferenced) {
                // We removed the last reference for this key
                removeLimboTarget(syncEngineImpl, limboChange.key);
            }
        }
        else {
            fail();
        }
    }
}
function trackLimboChange(syncEngineImpl, limboChange) {
    const key = limboChange.key;
    const keyString = key.path.canonicalString();
    if (!syncEngineImpl.activeLimboTargetsByKey.get(key) &&
        !syncEngineImpl.enqueuedLimboResolutions.has(keyString)) {
        logDebug(LOG_TAG$3, 'New document in limbo: ' + key);
        syncEngineImpl.enqueuedLimboResolutions.add(keyString);
        pumpEnqueuedLimboResolutions(syncEngineImpl);
    }
}
/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */
function pumpEnqueuedLimboResolutions(syncEngineImpl) {
    while (syncEngineImpl.enqueuedLimboResolutions.size > 0 &&
        syncEngineImpl.activeLimboTargetsByKey.size <
            syncEngineImpl.maxConcurrentLimboResolutions) {
        const keyString = syncEngineImpl.enqueuedLimboResolutions.values().next()
            .value;
        syncEngineImpl.enqueuedLimboResolutions.delete(keyString);
        const key = new DocumentKey(ResourcePath.fromString(keyString));
        const limboTargetId = syncEngineImpl.limboTargetIdGenerator.next();
        syncEngineImpl.activeLimboResolutionsByTarget.set(limboTargetId, new LimboResolution(key));
        syncEngineImpl.activeLimboTargetsByKey = syncEngineImpl.activeLimboTargetsByKey.insert(key, limboTargetId);
        remoteStoreListen(syncEngineImpl.remoteStore, new TargetData(queryToTarget(newQueryForPath(key.path)), limboTargetId, 2 /* LimboResolution */, ListenSequence.INVALID));
    }
}
async function syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngine, changes, remoteEvent) {
    const syncEngineImpl = debugCast(syncEngine);
    const newSnaps = [];
    const docChangesInAllViews = [];
    const queriesProcessed = [];
    if (syncEngineImpl.queryViewsByQuery.isEmpty()) {
        // Return early since `onWatchChange()` might not have been assigned yet.
        return;
    }
    syncEngineImpl.queryViewsByQuery.forEach((_, queryView) => {
        queriesProcessed.push(syncEngineImpl
            .applyDocChanges(queryView, changes, remoteEvent)
            .then(viewSnapshot => {
            if (viewSnapshot) {
                if (syncEngineImpl.isPrimaryClient) {
                    syncEngineImpl.sharedClientState.updateQueryState(queryView.targetId, viewSnapshot.fromCache ? 'not-current' : 'current');
                }
                newSnaps.push(viewSnapshot);
                const docChanges = LocalViewChanges.fromSnapshot(queryView.targetId, viewSnapshot);
                docChangesInAllViews.push(docChanges);
            }
        }));
    });
    await Promise.all(queriesProcessed);
    syncEngineImpl.syncEngineListener.onWatchChange(newSnaps);
    await localStoreNotifyLocalViewChanges(syncEngineImpl.localStore, docChangesInAllViews);
}
async function applyDocChanges(syncEngineImpl, queryView, changes, remoteEvent) {
    let viewDocChanges = queryView.view.computeDocChanges(changes);
    if (viewDocChanges.needsRefill) {
        // The query has a limit and some docs were removed, so we need
        // to re-run the query against the local store to make sure we
        // didn't lose any good docs that had been past the limit.
        viewDocChanges = await localStoreExecuteQuery(syncEngineImpl.localStore, queryView.query, 
        /* usePreviousResults= */ false).then(({ documents }) => {
            return queryView.view.computeDocChanges(documents, viewDocChanges);
        });
    }
    const targetChange = remoteEvent && remoteEvent.targetChanges.get(queryView.targetId);
    const viewChange = queryView.view.applyChanges(viewDocChanges, 
    /* updateLimboDocuments= */ syncEngineImpl.isPrimaryClient, targetChange);
    updateTrackedLimbos(syncEngineImpl, queryView.targetId, viewChange.limboChanges);
    return viewChange.snapshot;
}
async function syncEngineHandleCredentialChange(syncEngine, user) {
    const syncEngineImpl = debugCast(syncEngine);
    const userChanged = !syncEngineImpl.currentUser.isEqual(user);
    if (userChanged) {
        logDebug(LOG_TAG$3, 'User change. New user:', user.toKey());
        const result = await localStoreHandleUserChange(syncEngineImpl.localStore, user);
        syncEngineImpl.currentUser = user;
        // Fails tasks waiting for pending writes requested by previous user.
        rejectOutstandingPendingWritesCallbacks(syncEngineImpl, "'waitForPendingWrites' promise is rejected due to a user change.");
        // TODO(b/114226417): Consider calling this only in the primary tab.
        syncEngineImpl.sharedClientState.handleUserChange(user, result.removedBatchIds, result.addedBatchIds);
        await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, result.affectedDocuments);
    }
}
function syncEngineGetRemoteKeysForTarget(syncEngine, targetId) {
    const syncEngineImpl = debugCast(syncEngine);
    const limboResolution = syncEngineImpl.activeLimboResolutionsByTarget.get(targetId);
    if (limboResolution && limboResolution.receivedDocument) {
        return documentKeySet().add(limboResolution.key);
    }
    else {
        let keySet = documentKeySet();
        const queries = syncEngineImpl.queriesByTarget.get(targetId);
        if (!queries) {
            return keySet;
        }
        for (const query of queries) {
            const queryView = syncEngineImpl.queryViewsByQuery.get(query);
            keySet = keySet.unionWith(queryView.view.syncedDocuments);
        }
        return keySet;
    }
}
/**
 * Reconcile the list of synced documents in an existing view with those
 * from persistence.
 */
async function synchronizeViewAndComputeSnapshot(syncEngine, queryView) {
    const syncEngineImpl = debugCast(syncEngine);
    const queryResult = await localStoreExecuteQuery(syncEngineImpl.localStore, queryView.query, 
    /* usePreviousResults= */ true);
    const viewSnapshot = queryView.view.synchronizeWithPersistedState(queryResult);
    if (syncEngineImpl.isPrimaryClient) {
        updateTrackedLimbos(syncEngineImpl, queryView.targetId, viewSnapshot.limboChanges);
    }
    return viewSnapshot;
}
/**
 * Retrieves newly changed documents from remote document cache and raises
 * snapshots if needed.
 */
// PORTING NOTE: Multi-Tab only.
async function syncEngineSynchronizeWithChangedDocuments(syncEngine) {
    const syncEngineImpl = debugCast(syncEngine);
    return localStoreGetNewDocumentChanges(syncEngineImpl.localStore).then(changes => syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes));
}
/** Applies a mutation state to an existing batch.  */
// PORTING NOTE: Multi-Tab only.
async function syncEngineApplyBatchState(syncEngine, batchId, batchState, error) {
    const syncEngineImpl = debugCast(syncEngine);
    const documents = await localStoreLookupMutationDocuments(syncEngineImpl.localStore, batchId);
    if (documents === null) {
        // A throttled tab may not have seen the mutation before it was completed
        // and removed from the mutation queue, in which case we won't have cached
        // the affected documents. In this case we can safely ignore the update
        // since that means we didn't apply the mutation locally at all (if we
        // had, we would have cached the affected documents), and so we will just
        // see any resulting document changes via normal remote document updates
        // as applicable.
        logDebug(LOG_TAG$3, 'Cannot apply mutation batch with id: ' + batchId);
        return;
    }
    if (batchState === 'pending') {
        // If we are the primary client, we need to send this write to the
        // backend. Secondary clients will ignore these writes since their remote
        // connection is disabled.
        await fillWritePipeline(syncEngineImpl.remoteStore);
    }
    else if (batchState === 'acknowledged' || batchState === 'rejected') {
        // NOTE: Both these methods are no-ops for batches that originated from
        // other clients.
        processUserCallback(syncEngineImpl, batchId, error ? error : null);
        triggerPendingWritesCallbacks(syncEngineImpl, batchId);
        localStoreRemoveCachedMutationBatchMetadata(syncEngineImpl.localStore, batchId);
    }
    else {
        fail();
    }
    await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, documents);
}
/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
async function syncEngineApplyPrimaryState(syncEngine, isPrimary) {
    const syncEngineImpl = debugCast(syncEngine);
    ensureWatchCallbacks(syncEngineImpl);
    syncEngineEnsureWriteCallbacks(syncEngineImpl);
    if (isPrimary === true && syncEngineImpl._isPrimaryClient !== true) {
        // Secondary tabs only maintain Views for their local listeners and the
        // Views internal state may not be 100% populated (in particular
        // secondary tabs don't track syncedDocuments, the set of documents the
        // server considers to be in the target). So when a secondary becomes
        // primary, we need to need to make sure that all views for all targets
        // match the state on disk.
        const activeTargets = syncEngineImpl.sharedClientState.getAllActiveQueryTargets();
        const activeQueries = await synchronizeQueryViewsAndRaiseSnapshots(syncEngineImpl, activeTargets.toArray());
        syncEngineImpl._isPrimaryClient = true;
        await remoteStoreApplyPrimaryState(syncEngineImpl.remoteStore, true);
        for (const targetData of activeQueries) {
            remoteStoreListen(syncEngineImpl.remoteStore, targetData);
        }
    }
    else if (isPrimary === false && syncEngineImpl._isPrimaryClient !== false) {
        const activeTargets = [];
        let p = Promise.resolve();
        syncEngineImpl.queriesByTarget.forEach((_, targetId) => {
            if (syncEngineImpl.sharedClientState.isLocalQueryTarget(targetId)) {
                activeTargets.push(targetId);
            }
            else {
                p = p.then(() => {
                    removeAndCleanupTarget(syncEngineImpl, targetId);
                    return localStoreReleaseTarget(syncEngineImpl.localStore, targetId, 
                    /*keepPersistedTargetData=*/ true);
                });
            }
            remoteStoreUnlisten(syncEngineImpl.remoteStore, targetId);
        });
        await p;
        await synchronizeQueryViewsAndRaiseSnapshots(syncEngineImpl, activeTargets);
        resetLimboDocuments(syncEngineImpl);
        syncEngineImpl._isPrimaryClient = false;
        await remoteStoreApplyPrimaryState(syncEngineImpl.remoteStore, false);
    }
}
// PORTING NOTE: Multi-Tab only.
function resetLimboDocuments(syncEngine) {
    const syncEngineImpl = debugCast(syncEngine);
    syncEngineImpl.activeLimboResolutionsByTarget.forEach((_, targetId) => {
        remoteStoreUnlisten(syncEngineImpl.remoteStore, targetId);
    });
    syncEngineImpl.limboDocumentRefs.removeAllReferences();
    syncEngineImpl.activeLimboResolutionsByTarget = new Map();
    syncEngineImpl.activeLimboTargetsByKey = new SortedMap(DocumentKey.comparator);
}
/**
 * Reconcile the query views of the provided query targets with the state from
 * persistence. Raises snapshots for any changes that affect the local
 * client and returns the updated state of all target's query data.
 *
 * @param syncEngine - The sync engine implementation
 * @param targets - the list of targets with views that need to be recomputed
 * @param transitionToPrimary - `true` iff the tab transitions from a secondary
 * tab to a primary tab
 */
// PORTING NOTE: Multi-Tab only.
async function synchronizeQueryViewsAndRaiseSnapshots(syncEngine, targets, transitionToPrimary) {
    const syncEngineImpl = debugCast(syncEngine);
    const activeQueries = [];
    const newViewSnapshots = [];
    for (const targetId of targets) {
        let targetData;
        const queries = syncEngineImpl.queriesByTarget.get(targetId);
        if (queries && queries.length !== 0) {
            // For queries that have a local View, we fetch their current state
            // from LocalStore (as the resume token and the snapshot version
            // might have changed) and reconcile their views with the persisted
            // state (the list of syncedDocuments may have gotten out of sync).
            targetData = await localStoreAllocateTarget(syncEngineImpl.localStore, queryToTarget(queries[0]));
            for (const query of queries) {
                const queryView = syncEngineImpl.queryViewsByQuery.get(query);
                const viewChange = await synchronizeViewAndComputeSnapshot(syncEngineImpl, queryView);
                if (viewChange.snapshot) {
                    newViewSnapshots.push(viewChange.snapshot);
                }
            }
        }
        else {
            // For queries that never executed on this client, we need to
            // allocate the target in LocalStore and initialize a new View.
            const target = await localStoreGetCachedTarget(syncEngineImpl.localStore, targetId);
            targetData = await localStoreAllocateTarget(syncEngineImpl.localStore, target);
            await initializeViewAndComputeSnapshot(syncEngineImpl, synthesizeTargetToQuery(target), targetId, 
            /*current=*/ false);
        }
        activeQueries.push(targetData);
    }
    syncEngineImpl.syncEngineListener.onWatchChange(newViewSnapshots);
    return activeQueries;
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
function synthesizeTargetToQuery(target) {
    return newQuery(target.path, target.collectionGroup, target.orderBy, target.filters, target.limit, "F" /* First */, target.startAt, target.endAt);
}
/** Returns the IDs of the clients that are currently active. */
// PORTING NOTE: Multi-Tab only.
function syncEngineGetActiveClients(syncEngine) {
    const syncEngineImpl = debugCast(syncEngine);
    return localStoreGetActiveClients(syncEngineImpl.localStore);
}
/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
async function syncEngineApplyTargetState(syncEngine, targetId, state, error) {
    const syncEngineImpl = debugCast(syncEngine);
    if (syncEngineImpl._isPrimaryClient) {
        // If we receive a target state notification via WebStorage, we are
        // either already secondary or another tab has taken the primary lease.
        logDebug(LOG_TAG$3, 'Ignoring unexpected query state notification.');
        return;
    }
    if (syncEngineImpl.queriesByTarget.has(targetId)) {
        switch (state) {
            case 'current':
            case 'not-current': {
                const changes = await localStoreGetNewDocumentChanges(syncEngineImpl.localStore);
                const synthesizedRemoteEvent = RemoteEvent.createSynthesizedRemoteEventForCurrentChange(targetId, state === 'current');
                await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngineImpl, changes, synthesizedRemoteEvent);
                break;
            }
            case 'rejected': {
                await localStoreReleaseTarget(syncEngineImpl.localStore, targetId, 
                /* keepPersistedTargetData */ true);
                removeAndCleanupTarget(syncEngineImpl, targetId, error);
                break;
            }
            default:
                fail();
        }
    }
}
/** Adds or removes Watch targets for queries from different tabs. */
async function syncEngineApplyActiveTargetsChange(syncEngine, added, removed) {
    const syncEngineImpl = ensureWatchCallbacks(syncEngine);
    if (!syncEngineImpl._isPrimaryClient) {
        return;
    }
    for (const targetId of added) {
        if (syncEngineImpl.queriesByTarget.has(targetId)) {
            // A target might have been added in a previous attempt
            logDebug(LOG_TAG$3, 'Adding an already active target ' + targetId);
            continue;
        }
        const target = await localStoreGetCachedTarget(syncEngineImpl.localStore, targetId);
        const targetData = await localStoreAllocateTarget(syncEngineImpl.localStore, target);
        await initializeViewAndComputeSnapshot(syncEngineImpl, synthesizeTargetToQuery(target), targetData.targetId, 
        /*current=*/ false);
        remoteStoreListen(syncEngineImpl.remoteStore, targetData);
    }
    for (const targetId of removed) {
        // Check that the target is still active since the target might have been
        // removed if it has been rejected by the backend.
        if (!syncEngineImpl.queriesByTarget.has(targetId)) {
            continue;
        }
        // Release queries that are still active.
        await localStoreReleaseTarget(syncEngineImpl.localStore, targetId, 
        /* keepPersistedTargetData */ false)
            .then(() => {
            remoteStoreUnlisten(syncEngineImpl.remoteStore, targetId);
            removeAndCleanupTarget(syncEngineImpl, targetId);
        })
            .catch(ignoreIfPrimaryLeaseLoss);
    }
}
function ensureWatchCallbacks(syncEngine) {
    const syncEngineImpl = debugCast(syncEngine);
    syncEngineImpl.remoteStore.remoteSyncer.applyRemoteEvent = syncEngineApplyRemoteEvent.bind(null, syncEngineImpl);
    syncEngineImpl.remoteStore.remoteSyncer.getRemoteKeysForTarget = syncEngineGetRemoteKeysForTarget.bind(null, syncEngineImpl);
    syncEngineImpl.remoteStore.remoteSyncer.rejectListen = syncEngineRejectListen.bind(null, syncEngineImpl);
    syncEngineImpl.syncEngineListener.onWatchChange = eventManagerOnWatchChange.bind(null, syncEngineImpl.eventManager);
    syncEngineImpl.syncEngineListener.onWatchError = eventManagerOnWatchError.bind(null, syncEngineImpl.eventManager);
    return syncEngineImpl;
}
function syncEngineEnsureWriteCallbacks(syncEngine) {
    const syncEngineImpl = debugCast(syncEngine);
    syncEngineImpl.remoteStore.remoteSyncer.applySuccessfulWrite = syncEngineApplySuccessfulWrite.bind(null, syncEngineImpl);
    syncEngineImpl.remoteStore.remoteSyncer.rejectFailedWrite = syncEngineRejectFailedWrite.bind(null, syncEngineImpl);
    return syncEngineImpl;
}
/**
 * Loads a Firestore bundle into the SDK. The returned promise resolves when
 * the bundle finished loading.
 *
 * @param syncEngine - SyncEngine to use.
 * @param bundleReader - Bundle to load into the SDK.
 * @param task - LoadBundleTask used to update the loading progress to public API.
 */
function syncEngineLoadBundle(syncEngine, bundleReader, task) {
    const syncEngineImpl = debugCast(syncEngine);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadBundleImpl(syncEngineImpl, bundleReader, task).then(() => {
        syncEngineImpl.sharedClientState.notifyBundleLoaded();
    });
}
async function loadBundleImpl(syncEngine, reader, task) {
    try {
        const metadata = await reader.getMetadata();
        const skip = await localStoreHasNewerBundle(syncEngine.localStore, metadata);
        if (skip) {
            await reader.close();
            task._completeWith(bundleSuccessProgress(metadata));
            return;
        }
        task._updateProgress(bundleInitialProgress(metadata));
        const loader = new BundleLoader(metadata, syncEngine.localStore, reader.serializer);
        let element = await reader.nextElement();
        while (element) {
            ;
            const progress = await loader.addSizedElement(element);
            if (progress) {
                task._updateProgress(progress);
            }
            element = await reader.nextElement();
        }
        const result = await loader.complete();
        // TODO(b/160876443): This currently raises snapshots with
        // `fromCache=false` if users already listen to some queries and bundles
        // has newer version.
        await syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngine, result.changedDocs, 
        /* remoteEvent */ undefined);
        // Save metadata, so loading the same bundle will skip.
        await localStoreSaveBundle(syncEngine.localStore, metadata);
        task._completeWith(result.progress);
    }
    catch (e) {
        logWarn(LOG_TAG$3, `Loading bundle failed with ${e}`);
        task._failWith(e);
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
 * Provides all components needed for Firestore with in-memory persistence.
 * Uses EagerGC garbage collection.
 */
class MemoryOfflineComponentProvider {
    constructor() {
        this.synchronizeTabs = false;
    }
    async initialize(cfg) {
        this.serializer = newSerializer(cfg.databaseInfo.databaseId);
        this.sharedClientState = this.createSharedClientState(cfg);
        this.persistence = this.createPersistence(cfg);
        await this.persistence.start();
        this.gcScheduler = this.createGarbageCollectionScheduler(cfg);
        this.localStore = this.createLocalStore(cfg);
    }
    createGarbageCollectionScheduler(cfg) {
        return null;
    }
    createLocalStore(cfg) {
        return newLocalStore(this.persistence, new QueryEngine(), cfg.initialUser, this.serializer);
    }
    createPersistence(cfg) {
        return new MemoryPersistence(MemoryEagerDelegate.factory, this.serializer);
    }
    createSharedClientState(cfg) {
        return new MemorySharedClientState();
    }
    async terminate() {
        if (this.gcScheduler) {
            this.gcScheduler.stop();
        }
        await this.sharedClientState.shutdown();
        await this.persistence.shutdown();
    }
}
/**
 * Provides all components needed for Firestore with IndexedDB persistence.
 */
class IndexedDbOfflineComponentProvider extends MemoryOfflineComponentProvider {
    constructor(onlineComponentProvider, cacheSizeBytes, forceOwnership) {
        super();
        this.onlineComponentProvider = onlineComponentProvider;
        this.cacheSizeBytes = cacheSizeBytes;
        this.forceOwnership = forceOwnership;
        this.synchronizeTabs = false;
    }
    async initialize(cfg) {
        await super.initialize(cfg);
        await localStoreSynchronizeLastDocumentChangeReadTime(this.localStore);
        await this.onlineComponentProvider.initialize(this, cfg);
        // Enqueue writes from a previous session
        await syncEngineEnsureWriteCallbacks(this.onlineComponentProvider.syncEngine);
        await fillWritePipeline(this.onlineComponentProvider.remoteStore);
    }
    createLocalStore(cfg) {
        return newLocalStore(this.persistence, new QueryEngine(), cfg.initialUser, this.serializer);
    }
    createGarbageCollectionScheduler(cfg) {
        const garbageCollector = this.persistence.referenceDelegate
            .garbageCollector;
        return new LruScheduler(garbageCollector, cfg.asyncQueue);
    }
    createPersistence(cfg) {
        const persistenceKey = indexedDbStoragePrefix(cfg.databaseInfo.databaseId, cfg.databaseInfo.persistenceKey);
        const lruParams = this.cacheSizeBytes !== undefined
            ? LruParams.withCacheSize(this.cacheSizeBytes)
            : LruParams.DEFAULT;
        return new IndexedDbPersistence(this.synchronizeTabs, persistenceKey, cfg.clientId, lruParams, cfg.asyncQueue, getWindow(), getDocument(), this.serializer, this.sharedClientState, !!this.forceOwnership);
    }
    createSharedClientState(cfg) {
        return new MemorySharedClientState();
    }
}
/**
 * Provides all components needed for Firestore with multi-tab IndexedDB
 * persistence.
 *
 * In the legacy client, this provider is used to provide both multi-tab and
 * non-multi-tab persistence since we cannot tell at build time whether
 * `synchronizeTabs` will be enabled.
 */
class MultiTabOfflineComponentProvider extends IndexedDbOfflineComponentProvider {
    constructor(onlineComponentProvider, cacheSizeBytes) {
        super(onlineComponentProvider, cacheSizeBytes, /* forceOwnership= */ false);
        this.onlineComponentProvider = onlineComponentProvider;
        this.cacheSizeBytes = cacheSizeBytes;
        this.synchronizeTabs = true;
    }
    async initialize(cfg) {
        await super.initialize(cfg);
        const syncEngine = this.onlineComponentProvider.syncEngine;
        if (this.sharedClientState instanceof WebStorageSharedClientState) {
            this.sharedClientState.syncEngine = {
                applyBatchState: syncEngineApplyBatchState.bind(null, syncEngine),
                applyTargetState: syncEngineApplyTargetState.bind(null, syncEngine),
                applyActiveTargetsChange: syncEngineApplyActiveTargetsChange.bind(null, syncEngine),
                getActiveClients: syncEngineGetActiveClients.bind(null, syncEngine),
                synchronizeWithChangedDocuments: syncEngineSynchronizeWithChangedDocuments.bind(null, syncEngine)
            };
            await this.sharedClientState.start();
        }
        // NOTE: This will immediately call the listener, so we make sure to
        // set it after localStore / remoteStore are started.
        await this.persistence.setPrimaryStateListener(async (isPrimary) => {
            await syncEngineApplyPrimaryState(this.onlineComponentProvider.syncEngine, isPrimary);
            if (this.gcScheduler) {
                if (isPrimary && !this.gcScheduler.started) {
                    this.gcScheduler.start(this.localStore);
                }
                else if (!isPrimary) {
                    this.gcScheduler.stop();
                }
            }
        });
    }
    createSharedClientState(cfg) {
        const window = getWindow();
        if (!WebStorageSharedClientState.isAvailable(window)) {
            throw new FirestoreError(Code.UNIMPLEMENTED, 'IndexedDB persistence is only available on platforms that support LocalStorage.');
        }
        const persistenceKey = indexedDbStoragePrefix(cfg.databaseInfo.databaseId, cfg.databaseInfo.persistenceKey);
        return new WebStorageSharedClientState(window, cfg.asyncQueue, persistenceKey, cfg.clientId, cfg.initialUser);
    }
}
/**
 * Initializes and wires the components that are needed to interface with the
 * network.
 */
class OnlineComponentProvider {
    async initialize(offlineComponentProvider, cfg) {
        if (this.localStore) {
            // OnlineComponentProvider may get initialized multiple times if
            // multi-tab persistence is used.
            return;
        }
        this.localStore = offlineComponentProvider.localStore;
        this.sharedClientState = offlineComponentProvider.sharedClientState;
        this.datastore = this.createDatastore(cfg);
        this.remoteStore = this.createRemoteStore(cfg);
        this.eventManager = this.createEventManager(cfg);
        this.syncEngine = this.createSyncEngine(cfg, 
        /* startAsPrimary=*/ !offlineComponentProvider.synchronizeTabs);
        this.sharedClientState.onlineStateHandler = onlineState => syncEngineApplyOnlineStateChange(this.syncEngine, onlineState, 1 /* SharedClientState */);
        this.remoteStore.remoteSyncer.handleCredentialChange = syncEngineHandleCredentialChange.bind(null, this.syncEngine);
        await remoteStoreApplyPrimaryState(this.remoteStore, this.syncEngine.isPrimaryClient);
    }
    createEventManager(cfg) {
        return newEventManager();
    }
    createDatastore(cfg) {
        const serializer = newSerializer(cfg.databaseInfo.databaseId);
        const connection = newConnection(cfg.databaseInfo);
        return newDatastore(cfg.credentials, connection, serializer);
    }
    createRemoteStore(cfg) {
        return newRemoteStore(this.localStore, this.datastore, cfg.asyncQueue, onlineState => syncEngineApplyOnlineStateChange(this.syncEngine, onlineState, 0 /* RemoteStore */), newConnectivityMonitor());
    }
    createSyncEngine(cfg, startAsPrimary) {
        return newSyncEngine(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, cfg.initialUser, cfg.maxConcurrentLimboResolutions, startAsPrimary);
    }
    terminate() {
        return remoteStoreShutdown(this.remoteStore);
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
 * How many bytes to read each time when `ReadableStreamReader.read()` is
 * called. Only applicable for byte streams that we control (e.g. those backed
 * by an UInt8Array).
 */
const DEFAULT_BYTES_PER_READ = 10240;
/**
 * Builds a `ByteStreamReader` from a UInt8Array.
 * @param source - The data source to use.
 * @param bytesPerRead - How many bytes each `read()` from the returned reader
 *        will read.
 */
function toByteStreamReaderHelper(source, bytesPerRead = DEFAULT_BYTES_PER_READ) {
    let readFrom = 0;
    const reader = {
        async read() {
            if (readFrom < source.byteLength) {
                const result = {
                    value: source.slice(readFrom, readFrom + bytesPerRead),
                    done: false
                };
                readFrom += bytesPerRead;
                return result;
            }
            return { done: true };
        },
        async cancel() { },
        releaseLock() { },
        closed: Promise.reject('unimplemented')
    };
    return reader;
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
function validateNonEmptyArgument(functionName, argumentName, argument) {
    if (!argument) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${functionName}() cannot be called with an empty ${argumentName}.`);
    }
}
/**
 * Validates that two boolean options are not set at the same time.
 */
function validateIsNotUsedTogether(optionName1, argument1, optionName2, argument2) {
    if (argument1 === true && argument2 === true) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `${optionName1} and ${optionName2} cannot be used together.`);
    }
}
/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */
function validateDocumentPath(path) {
    if (!DocumentKey.isDocumentKey(path)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${path} has ${path.length}.`);
    }
}
/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */
function validateCollectionPath(path) {
    if (DocumentKey.isDocumentKey(path)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${path} has ${path.length}.`);
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
function validatePositiveNumber(functionName, n) {
    if (n <= 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${functionName}() requires a positive number, but it was: ${n}.`);
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
 * On Node, only supported data source is a `Uint8Array` for now.
 */
function toByteStreamReader(source, bytesPerRead) {
    if (!(source instanceof Uint8Array)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `NodePlatform.toByteStreamReader expects source to be Uint8Array, got ${valueDescription(source)}`);
    }
    return toByteStreamReaderHelper(source, bytesPerRead);
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
/*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */
class AsyncObserver {
    constructor(observer) {
        this.observer = observer;
        /**
         * When set to true, will not raise future events. Necessary to deal with
         * async detachment of listener.
         */
        this.muted = false;
    }
    next(value) {
        if (this.observer.next) {
            this.scheduleEvent(this.observer.next, value);
        }
    }
    error(error) {
        if (this.observer.error) {
            this.scheduleEvent(this.observer.error, error);
        }
        else {
            console.error('Uncaught Error in snapshot listener:', error);
        }
    }
    mute() {
        this.muted = true;
    }
    scheduleEvent(eventHandler, event) {
        if (!this.muted) {
            setTimeout(() => {
                if (!this.muted) {
                    eventHandler(event);
                }
            }, 0);
        }
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
 * A complete element in the bundle stream, together with the byte length it
 * occupies in the stream.
 */
class SizedBundleElement {
    constructor(payload, 
    // How many bytes this element takes to store in the bundle.
    byteLength) {
        this.payload = payload;
        this.byteLength = byteLength;
    }
    isBundleMetadata() {
        return 'metadata' in this.payload;
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
 * A class representing a bundle.
 *
 * Takes a bundle stream or buffer, and presents abstractions to read bundled
 * elements out of the underlying content.
 */
class BundleReaderImpl {
    constructor(
    /** The reader to read from underlying binary bundle data source. */
    reader, serializer) {
        this.reader = reader;
        this.serializer = serializer;
        /** Cached bundle metadata. */
        this.metadata = new Deferred();
        /**
         * Internal buffer to hold bundle content, accumulating incomplete element
         * content.
         */
        this.buffer = new Uint8Array();
        this.textDecoder = newTextDecoder();
        // Read the metadata (which is the first element).
        this.nextElementImpl().then(element => {
            if (element && element.isBundleMetadata()) {
                this.metadata.resolve(element.payload.metadata);
            }
            else {
                this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(element === null || element === void 0 ? void 0 : element.payload)}`));
            }
        }, error => this.metadata.reject(error));
    }
    close() {
        return this.reader.cancel();
    }
    async getMetadata() {
        return this.metadata.promise;
    }
    async nextElement() {
        // Makes sure metadata is read before proceeding.
        await this.getMetadata();
        return this.nextElementImpl();
    }
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
    async nextElementImpl() {
        const lengthBuffer = await this.readLength();
        if (lengthBuffer === null) {
            return null;
        }
        const lengthString = this.textDecoder.decode(lengthBuffer);
        const length = Number(lengthString);
        if (isNaN(length)) {
            this.raiseError(`length string (${lengthString}) is not valid number`);
        }
        const jsonString = await this.readJsonString(length);
        return new SizedBundleElement(JSON.parse(jsonString), lengthBuffer.length + length);
    }
    /** First index of '{' from the underlying buffer. */
    indexOfOpenBracket() {
        return this.buffer.findIndex(v => v === '{'.charCodeAt(0));
    }
    /**
     * Reads from the beginning of the internal buffer, until the first '{', and
     * return the content.
     *
     * If reached end of the stream, returns a null.
     */
    async readLength() {
        while (this.indexOfOpenBracket() < 0) {
            const done = await this.pullMoreDataToBuffer();
            if (done) {
                break;
            }
        }
        // Broke out of the loop because underlying stream is closed, and there
        // happens to be no more data to process.
        if (this.buffer.length === 0) {
            return null;
        }
        const position = this.indexOfOpenBracket();
        // Broke out of the loop because underlying stream is closed, but still
        // cannot find an open bracket.
        if (position < 0) {
            this.raiseError('Reached the end of bundle when a length string is expected.');
        }
        const result = this.buffer.slice(0, position);
        // Update the internal buffer to drop the read length.
        this.buffer = this.buffer.slice(position);
        return result;
    }
    /**
     * Reads from a specified position from the internal buffer, for a specified
     * number of bytes, pulling more data from the underlying stream if needed.
     *
     * Returns a string decoded from the read bytes.
     */
    async readJsonString(length) {
        while (this.buffer.length < length) {
            const done = await this.pullMoreDataToBuffer();
            if (done) {
                this.raiseError('Reached the end of bundle when more is expected.');
            }
        }
        const result = this.textDecoder.decode(this.buffer.slice(0, length));
        // Update the internal buffer to drop the read json string.
        this.buffer = this.buffer.slice(length);
        return result;
    }
    raiseError(message) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.reader.cancel();
        throw new Error(`Invalid bundle format: ${message}`);
    }
    /**
     * Pulls more data from underlying stream to internal buffer.
     * Returns a boolean indicating whether the stream is finished.
     */
    async pullMoreDataToBuffer() {
        const result = await this.reader.read();
        if (!result.done) {
            const newBuffer = new Uint8Array(this.buffer.length + result.value.length);
            newBuffer.set(this.buffer);
            newBuffer.set(result.value, this.buffer.length);
            this.buffer = newBuffer;
        }
        return result.done;
    }
}
function newBundleReader(reader, serializer) {
    return new BundleReaderImpl(reader, serializer);
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
class Transaction$2 {
    constructor(datastore) {
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
    async lookup(keys) {
        this.ensureCommitNotCalled();
        if (this.mutations.length > 0) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Firestore transactions require all reads to be executed before all writes.');
        }
        const docs = await invokeBatchGetDocumentsRpc(this.datastore, keys);
        docs.forEach(doc => this.recordVersion(doc));
        return docs;
    }
    set(key, data) {
        this.write(data.toMutation(key, this.precondition(key)));
        this.writtenDocs.add(key.toString());
    }
    update(key, data) {
        try {
            this.write(data.toMutation(key, this.preconditionForUpdate(key)));
        }
        catch (e) {
            this.lastWriteError = e;
        }
        this.writtenDocs.add(key.toString());
    }
    delete(key) {
        this.write(new DeleteMutation(key, this.precondition(key)));
        this.writtenDocs.add(key.toString());
    }
    async commit() {
        this.ensureCommitNotCalled();
        if (this.lastWriteError) {
            throw this.lastWriteError;
        }
        const unwritten = this.readVersions;
        // For each mutation, note that the doc was written.
        this.mutations.forEach(mutation => {
            unwritten.delete(mutation.key.toString());
        });
        // For each document that was read but not written to, we want to perform
        // a `verify` operation.
        unwritten.forEach((_, path) => {
            const key = DocumentKey.fromPath(path);
            this.mutations.push(new VerifyMutation(key, this.precondition(key)));
        });
        await invokeCommitRpc(this.datastore, this.mutations);
        this.committed = true;
    }
    recordVersion(doc) {
        let docVersion;
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
        const existingVersion = this.readVersions.get(doc.key.toString());
        if (existingVersion) {
            if (!docVersion.isEqual(existingVersion)) {
                // This transaction will fail no matter what.
                throw new FirestoreError(Code.ABORTED, 'Document version changed between two reads.');
            }
        }
        else {
            this.readVersions.set(doc.key.toString(), docVersion);
        }
    }
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    precondition(key) {
        const version = this.readVersions.get(key.toString());
        if (!this.writtenDocs.has(key.toString()) && version) {
            return Precondition.updateTime(version);
        }
        else {
            return Precondition.none();
        }
    }
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    preconditionForUpdate(key) {
        const version = this.readVersions.get(key.toString());
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
    }
    write(mutation) {
        this.ensureCommitNotCalled();
        this.mutations.push(mutation);
    }
    ensureCommitNotCalled() {
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
const DEFAULT_MAX_ATTEMPTS_COUNT = 5;
/**
 * TransactionRunner encapsulates the logic needed to run and retry transactions
 * with backoff.
 */
class TransactionRunner {
    constructor(asyncQueue, datastore, updateFunction, deferred) {
        this.asyncQueue = asyncQueue;
        this.datastore = datastore;
        this.updateFunction = updateFunction;
        this.deferred = deferred;
        this.attemptsRemaining = DEFAULT_MAX_ATTEMPTS_COUNT;
        this.backoff = new ExponentialBackoff(this.asyncQueue, "transaction_retry" /* TransactionRetry */);
    }
    /** Runs the transaction and sets the result on deferred. */
    run() {
        this.attemptsRemaining -= 1;
        this.runWithBackOff();
    }
    runWithBackOff() {
        this.backoff.backoffAndRun(async () => {
            const transaction = new Transaction$2(this.datastore);
            const userPromise = this.tryRunUpdateFunction(transaction);
            if (userPromise) {
                userPromise
                    .then(result => {
                    this.asyncQueue.enqueueAndForget(() => {
                        return transaction
                            .commit()
                            .then(() => {
                            this.deferred.resolve(result);
                        })
                            .catch(commitError => {
                            this.handleTransactionError(commitError);
                        });
                    });
                })
                    .catch(userPromiseError => {
                    this.handleTransactionError(userPromiseError);
                });
            }
        });
    }
    tryRunUpdateFunction(transaction) {
        try {
            const userPromise = this.updateFunction(transaction);
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
    }
    handleTransactionError(error) {
        if (this.attemptsRemaining > 0 && this.isRetryableTransactionError(error)) {
            this.attemptsRemaining -= 1;
            this.asyncQueue.enqueueAndForget(() => {
                this.runWithBackOff();
                return Promise.resolve();
            });
        }
        else {
            this.deferred.reject(error);
        }
    }
    isRetryableTransactionError(error) {
        if (error.name === 'FirebaseError') {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            const code = error.code;
            return (code === 'aborted' ||
                code === 'failed-precondition' ||
                !isPermanentError(code));
        }
        return false;
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
const LOG_TAG$2 = 'FirestoreClient';
const MAX_CONCURRENT_LIMBO_RESOLUTIONS = 100;
/**
 * FirestoreClient is a top-level class that constructs and owns all of the
 * pieces of the client SDK architecture. It is responsible for creating the
 * async queue that is shared by all of the other components in the system.
 */
class FirestoreClient {
    constructor(credentials, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    asyncQueue, databaseInfo) {
        this.credentials = credentials;
        this.asyncQueue = asyncQueue;
        this.databaseInfo = databaseInfo;
        this.user = User.UNAUTHENTICATED;
        this.clientId = AutoId.newId();
        this.credentialListener = () => Promise.resolve();
        this.credentials.setChangeListener(asyncQueue, async (user) => {
            logDebug(LOG_TAG$2, 'Received user=', user.uid);
            await this.credentialListener(user);
            this.user = user;
        });
    }
    async getConfiguration() {
        return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            credentials: this.credentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: MAX_CONCURRENT_LIMBO_RESOLUTIONS
        };
    }
    setCredentialChangeListener(listener) {
        this.credentialListener = listener;
    }
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */
    verifyNotTerminated() {
        if (this.asyncQueue.isShuttingDown) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, 'The client has already been terminated.');
        }
    }
    terminate() {
        this.asyncQueue.enterRestrictedMode();
        const deferred = new Deferred();
        this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
            try {
                if (this.onlineComponents) {
                    await this.onlineComponents.terminate();
                }
                if (this.offlineComponents) {
                    await this.offlineComponents.terminate();
                }
                // `removeChangeListener` must be called after shutting down the
                // RemoteStore as it will prevent the RemoteStore from retrieving
                // auth tokens.
                this.credentials.removeChangeListener();
                deferred.resolve();
            }
            catch (e) {
                const firestoreError = wrapInUserErrorIfRecoverable(e, `Failed to shutdown persistence`);
                deferred.reject(firestoreError);
            }
        });
        return deferred.promise;
    }
}
async function setOfflineComponentProvider(client, offlineComponentProvider) {
    client.asyncQueue.verifyOperationInProgress();
    logDebug(LOG_TAG$2, 'Initializing OfflineComponentProvider');
    const configuration = await client.getConfiguration();
    await offlineComponentProvider.initialize(configuration);
    let currentUser = configuration.initialUser;
    client.setCredentialChangeListener(async (user) => {
        if (!currentUser.isEqual(user)) {
            await localStoreHandleUserChange(offlineComponentProvider.localStore, user);
            currentUser = user;
        }
    });
    // When a user calls clearPersistence() in one client, all other clients
    // need to be terminated to allow the delete to succeed.
    offlineComponentProvider.persistence.setDatabaseDeletedListener(() => client.terminate());
    client.offlineComponents = offlineComponentProvider;
}
async function setOnlineComponentProvider(client, onlineComponentProvider) {
    client.asyncQueue.verifyOperationInProgress();
    const offlineComponentProvider = await ensureOfflineComponents(client);
    logDebug(LOG_TAG$2, 'Initializing OnlineComponentProvider');
    const configuration = await client.getConfiguration();
    await onlineComponentProvider.initialize(offlineComponentProvider, configuration);
    // The CredentialChangeListener of the online component provider takes
    // precedence over the offline component provider.
    client.setCredentialChangeListener(user => remoteStoreHandleCredentialChange(onlineComponentProvider.remoteStore, user));
    client.onlineComponents = onlineComponentProvider;
}
async function ensureOfflineComponents(client) {
    if (!client.offlineComponents) {
        logDebug(LOG_TAG$2, 'Using default OfflineComponentProvider');
        await setOfflineComponentProvider(client, new MemoryOfflineComponentProvider());
    }
    return client.offlineComponents;
}
async function ensureOnlineComponents(client) {
    if (!client.onlineComponents) {
        logDebug(LOG_TAG$2, 'Using default OnlineComponentProvider');
        await setOnlineComponentProvider(client, new OnlineComponentProvider());
    }
    return client.onlineComponents;
}
function getPersistence(client) {
    return ensureOfflineComponents(client).then(c => c.persistence);
}
function getLocalStore(client) {
    return ensureOfflineComponents(client).then(c => c.localStore);
}
function getRemoteStore(client) {
    return ensureOnlineComponents(client).then(c => c.remoteStore);
}
function getSyncEngine(client) {
    return ensureOnlineComponents(client).then(c => c.syncEngine);
}
function getDatastore(client) {
    return ensureOnlineComponents(client).then(c => c.datastore);
}
async function getEventManager(client) {
    const onlineComponentProvider = await ensureOnlineComponents(client);
    const eventManager = onlineComponentProvider.eventManager;
    eventManager.onListen = syncEngineListen.bind(null, onlineComponentProvider.syncEngine);
    eventManager.onUnlisten = syncEngineUnlisten.bind(null, onlineComponentProvider.syncEngine);
    return eventManager;
}
/** Enables the network connection and re-enqueues all pending operations. */
function firestoreClientEnableNetwork(client) {
    return client.asyncQueue.enqueue(async () => {
        const persistence = await getPersistence(client);
        const remoteStore = await getRemoteStore(client);
        persistence.setNetworkEnabled(true);
        return remoteStoreEnableNetwork(remoteStore);
    });
}
/** Disables the network connection. Pending operations will not complete. */
function firestoreClientDisableNetwork(client) {
    return client.asyncQueue.enqueue(async () => {
        const persistence = await getPersistence(client);
        const remoteStore = await getRemoteStore(client);
        persistence.setNetworkEnabled(false);
        return remoteStoreDisableNetwork(remoteStore);
    });
}
/**
 * Returns a Promise that resolves when all writes that were pending at the time
 * this method was called received server acknowledgement. An acknowledgement
 * can be either acceptance or rejection.
 */
function firestoreClientWaitForPendingWrites(client) {
    const deferred = new Deferred();
    client.asyncQueue.enqueueAndForget(async () => {
        const syncEngine = await getSyncEngine(client);
        return syncEngineRegisterPendingWritesCallback(syncEngine, deferred);
    });
    return deferred.promise;
}
function firestoreClientListen(client, query, options, observer) {
    const wrappedObserver = new AsyncObserver(observer);
    const listener = new QueryListener(query, wrappedObserver, options);
    client.asyncQueue.enqueueAndForget(async () => {
        const eventManager = await getEventManager(client);
        return eventManagerListen(eventManager, listener);
    });
    return () => {
        wrappedObserver.mute();
        client.asyncQueue.enqueueAndForget(async () => {
            const eventManager = await getEventManager(client);
            return eventManagerUnlisten(eventManager, listener);
        });
    };
}
function firestoreClientGetDocumentFromLocalCache(client, docKey) {
    const deferred = new Deferred();
    client.asyncQueue.enqueueAndForget(async () => {
        const localStore = await getLocalStore(client);
        return readDocumentFromCache(localStore, docKey, deferred);
    });
    return deferred.promise;
}
function firestoreClientGetDocumentViaSnapshotListener(client, key, options = {}) {
    const deferred = new Deferred();
    client.asyncQueue.enqueueAndForget(async () => {
        const eventManager = await getEventManager(client);
        return readDocumentViaSnapshotListener(eventManager, client.asyncQueue, key, options, deferred);
    });
    return deferred.promise;
}
function firestoreClientGetDocumentsFromLocalCache(client, query) {
    const deferred = new Deferred();
    client.asyncQueue.enqueueAndForget(async () => {
        const localStore = await getLocalStore(client);
        return executeQueryFromCache(localStore, query, deferred);
    });
    return deferred.promise;
}
function firestoreClientGetDocumentsViaSnapshotListener(client, query, options = {}) {
    const deferred = new Deferred();
    client.asyncQueue.enqueueAndForget(async () => {
        const eventManager = await getEventManager(client);
        return executeQueryViaSnapshotListener(eventManager, client.asyncQueue, query, options, deferred);
    });
    return deferred.promise;
}
function firestoreClientWrite(client, mutations) {
    const deferred = new Deferred();
    client.asyncQueue.enqueueAndForget(async () => {
        const syncEngine = await getSyncEngine(client);
        return syncEngineWrite(syncEngine, mutations, deferred);
    });
    return deferred.promise;
}
function firestoreClientAddSnapshotsInSyncListener(client, observer) {
    const wrappedObserver = new AsyncObserver(observer);
    client.asyncQueue.enqueueAndForget(async () => {
        const eventManager = await getEventManager(client);
        return addSnapshotsInSyncListener(eventManager, wrappedObserver);
    });
    return () => {
        wrappedObserver.mute();
        client.asyncQueue.enqueueAndForget(async () => {
            const eventManager = await getEventManager(client);
            return removeSnapshotsInSyncListener(eventManager, wrappedObserver);
        });
    };
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
 */
function firestoreClientTransaction(client, updateFunction) {
    const deferred = new Deferred();
    client.asyncQueue.enqueueAndForget(async () => {
        const datastore = await getDatastore(client);
        new TransactionRunner(client.asyncQueue, datastore, updateFunction, deferred).run();
    });
    return deferred.promise;
}
async function readDocumentFromCache(localStore, docKey, result) {
    try {
        const document = await localStoreReadDocument(localStore, docKey);
        if (document.isFoundDocument()) {
            result.resolve(document);
        }
        else if (document.isNoDocument()) {
            result.resolve(null);
        }
        else {
            result.reject(new FirestoreError(Code.UNAVAILABLE, 'Failed to get document from cache. (However, this document may ' +
                "exist on the server. Run again without setting 'source' in " +
                'the GetOptions to attempt to retrieve the document from the ' +
                'server.)'));
        }
    }
    catch (e) {
        const firestoreError = wrapInUserErrorIfRecoverable(e, `Failed to get document '${docKey} from cache`);
        result.reject(firestoreError);
    }
}
/**
 * Retrieves a latency-compensated document from the backend via a
 * SnapshotListener.
 */
function readDocumentViaSnapshotListener(eventManager, asyncQueue, key, options, result) {
    const wrappedObserver = new AsyncObserver({
        next: (snap) => {
            // Remove query first before passing event to user to avoid
            // user actions affecting the now stale query.
            asyncQueue.enqueueAndForget(() => eventManagerUnlisten(eventManager, listener));
            const exists = snap.docs.has(key);
            if (!exists && snap.fromCache) {
                // TODO(dimond): If we're online and the document doesn't
                // exist then we resolve with a doc.exists set to false. If
                // we're offline however, we reject the Promise in this
                // case. Two options: 1) Cache the negative response from
                // the server so we can deliver that even when you're
                // offline 2) Actually reject the Promise in the online case
                // if the document doesn't exist.
                result.reject(new FirestoreError(Code.UNAVAILABLE, 'Failed to get document because the client is offline.'));
            }
            else if (exists &&
                snap.fromCache &&
                options &&
                options.source === 'server') {
                result.reject(new FirestoreError(Code.UNAVAILABLE, 'Failed to get document from server. (However, this ' +
                    'document does exist in the local cache. Run again ' +
                    'without setting source to "server" to ' +
                    'retrieve the cached document.)'));
            }
            else {
                result.resolve(snap);
            }
        },
        error: e => result.reject(e)
    });
    const listener = new QueryListener(newQueryForPath(key.path), wrappedObserver, {
        includeMetadataChanges: true,
        waitForSyncWhenOnline: true
    });
    return eventManagerListen(eventManager, listener);
}
async function executeQueryFromCache(localStore, query, result) {
    try {
        const queryResult = await localStoreExecuteQuery(localStore, query, 
        /* usePreviousResults= */ true);
        const view = new View(query, queryResult.remoteKeys);
        const viewDocChanges = view.computeDocChanges(queryResult.documents);
        const viewChange = view.applyChanges(viewDocChanges, 
        /* updateLimboDocuments= */ false);
        result.resolve(viewChange.snapshot);
    }
    catch (e) {
        const firestoreError = wrapInUserErrorIfRecoverable(e, `Failed to execute query '${query} against cache`);
        result.reject(firestoreError);
    }
}
/**
 * Retrieves a latency-compensated query snapshot from the backend via a
 * SnapshotListener.
 */
function executeQueryViaSnapshotListener(eventManager, asyncQueue, query, options, result) {
    const wrappedObserver = new AsyncObserver({
        next: snapshot => {
            // Remove query first before passing event to user to avoid
            // user actions affecting the now stale query.
            asyncQueue.enqueueAndForget(() => eventManagerUnlisten(eventManager, listener));
            if (snapshot.fromCache && options.source === 'server') {
                result.reject(new FirestoreError(Code.UNAVAILABLE, 'Failed to get documents from server. (However, these ' +
                    'documents may exist in the local cache. Run again ' +
                    'without setting source to "server" to ' +
                    'retrieve the cached documents.)'));
            }
            else {
                result.resolve(snapshot);
            }
        },
        error: e => result.reject(e)
    });
    const listener = new QueryListener(query, wrappedObserver, {
        includeMetadataChanges: true,
        waitForSyncWhenOnline: true
    });
    return eventManagerListen(eventManager, listener);
}
function firestoreClientLoadBundle(client, databaseId, data, resultTask) {
    const reader = createBundleReader(data, newSerializer(databaseId));
    client.asyncQueue.enqueueAndForget(async () => {
        syncEngineLoadBundle(await getSyncEngine(client), reader, resultTask);
    });
}
function firestoreClientGetNamedQuery(client, queryName) {
    return client.asyncQueue.enqueue(async () => localStoreGetNamedQuery(await getLocalStore(client), queryName));
}
function createBundleReader(data, serializer) {
    let content;
    if (typeof data === 'string') {
        content = newTextEncoder().encode(data);
    }
    else {
        content = data;
    }
    return newBundleReader(toByteStreamReader(content), serializer);
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
class DatabaseInfo {
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
    constructor(databaseId, appId, persistenceKey, host, ssl, forceLongPolling, autoDetectLongPolling, useFetchStreams) {
        this.databaseId = databaseId;
        this.appId = appId;
        this.persistenceKey = persistenceKey;
        this.host = host;
        this.ssl = ssl;
        this.forceLongPolling = forceLongPolling;
        this.autoDetectLongPolling = autoDetectLongPolling;
        this.useFetchStreams = useFetchStreams;
    }
}
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
const LOG_TAG$1 = 'ComponentProvider';
/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
 */
const datastoreInstances = new Map();
/**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */
function removeComponents(firestore) {
    const datastore = datastoreInstances.get(firestore);
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
class OAuthToken {
    constructor(value, user) {
        this.user = user;
        this.type = 'OAuth';
        this.authHeaders = {};
        // Set the headers using Object Literal notation to avoid minification
        this.authHeaders['Authorization'] = `Bearer ${value}`;
    }
}
/** A CredentialsProvider that always yields an empty token. */
class EmptyCredentialsProvider {
    constructor() {
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.changeListener = null;
    }
    getToken() {
        return Promise.resolve(null);
    }
    invalidateToken() { }
    setChangeListener(asyncQueue, changeListener) {
        this.changeListener = changeListener;
        // Fire with initial user.
        asyncQueue.enqueueRetryable(() => changeListener(User.UNAUTHENTICATED));
    }
    removeChangeListener() {
        this.changeListener = null;
    }
}
/**
 * A CredentialsProvider that always returns a constant token. Used for
 * emulator token mocking.
 */
class EmulatorCredentialsProvider {
    constructor(token) {
        this.token = token;
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.changeListener = null;
    }
    getToken() {
        return Promise.resolve(this.token);
    }
    invalidateToken() { }
    setChangeListener(asyncQueue, changeListener) {
        this.changeListener = changeListener;
        // Fire with initial user.
        asyncQueue.enqueueRetryable(() => changeListener(this.token.user));
    }
    removeChangeListener() {
        this.changeListener = null;
    }
}
class FirebaseCredentialsProvider {
    constructor(authProvider) {
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
        this.tokenListener = () => {
            this.tokenCounter++;
            this.currentUser = this.getUser();
            this.authDeferred.resolve();
            if (this.changeListener) {
                this.asyncQueue.enqueueRetryable(() => this.changeListener(this.currentUser));
            }
        };
        const registerAuth = (auth) => {
            logDebug('FirebaseCredentialsProvider', 'Auth detected');
            this.auth = auth;
            this.auth.addAuthTokenListener(this.tokenListener);
        };
        authProvider.onInit(auth => registerAuth(auth));
        // Our users can initialize Auth right after Firestore, so we give it
        // a chance to register itself with the component framework before we
        // determine whether to start up in unauthenticated mode.
        setTimeout(() => {
            if (!this.auth) {
                const auth = authProvider.getImmediate({ optional: true });
                if (auth) {
                    registerAuth(auth);
                }
                else {
                    // If auth is still not available, proceed with `null` user
                    logDebug('FirebaseCredentialsProvider', 'Auth not yet detected');
                    this.authDeferred.resolve();
                }
            }
        }, 0);
    }
    getToken() {
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
        const initialTokenCounter = this.tokenCounter;
        const forceRefresh = this.forceRefresh;
        this.forceRefresh = false;
        if (!this.auth) {
            return Promise.resolve(null);
        }
        return this.auth.getToken(forceRefresh).then(tokenData => {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            if (this.tokenCounter !== initialTokenCounter) {
                logDebug('FirebaseCredentialsProvider', 'getToken aborted due to token change.');
                return this.getToken();
            }
            else {
                if (tokenData) {
                    hardAssert(typeof tokenData.accessToken === 'string');
                    return new OAuthToken(tokenData.accessToken, this.currentUser);
                }
                else {
                    return null;
                }
            }
        });
    }
    invalidateToken() {
        this.forceRefresh = true;
    }
    setChangeListener(asyncQueue, changeListener) {
        this.asyncQueue = asyncQueue;
        // Blocks the AsyncQueue until the next user is available.
        this.asyncQueue.enqueueRetryable(async () => {
            await this.authDeferred.promise;
            await changeListener(this.currentUser);
            this.changeListener = changeListener;
        });
    }
    removeChangeListener() {
        if (this.auth) {
            this.auth.removeAuthTokenListener(this.tokenListener);
        }
        this.changeListener = () => Promise.resolve();
    }
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    getUser() {
        const currentUid = this.auth && this.auth.getUid();
        hardAssert(currentUid === null || typeof currentUid === 'string');
        return new User(currentUid);
    }
}
/*
 * FirstPartyToken provides a fresh token each time its value
 * is requested, because if the token is too old, requests will be rejected.
 * Technically this may no longer be necessary since the SDK should gracefully
 * recover from unauthenticated errors (see b/33147818 for context), but it's
 * safer to keep the implementation as-is.
 */
class FirstPartyToken {
    constructor(gapi, sessionIndex, iamToken) {
        this.gapi = gapi;
        this.sessionIndex = sessionIndex;
        this.iamToken = iamToken;
        this.type = 'FirstParty';
        this.user = User.FIRST_PARTY;
    }
    get authHeaders() {
        const headers = {
            'X-Goog-AuthUser': this.sessionIndex
        };
        // Use array notation to prevent minification
        const authHeader = this.gapi['auth']['getAuthHeaderValueForFirstParty']([]);
        if (authHeader) {
            headers['Authorization'] = authHeader;
        }
        if (this.iamToken) {
            headers['X-Goog-Iam-Authorization-Token'] = this.iamToken;
        }
        return headers;
    }
}
/*
 * Provides user credentials required for the Firestore JavaScript SDK
 * to authenticate the user, using technique that is only available
 * to applications hosted by Google.
 */
class FirstPartyCredentialsProvider {
    constructor(gapi, sessionIndex, iamToken) {
        this.gapi = gapi;
        this.sessionIndex = sessionIndex;
        this.iamToken = iamToken;
    }
    getToken() {
        return Promise.resolve(new FirstPartyToken(this.gapi, this.sessionIndex, this.iamToken));
    }
    setChangeListener(asyncQueue, changeListener) {
        // Fire with initial uid.
        asyncQueue.enqueueRetryable(() => changeListener(User.FIRST_PARTY));
    }
    removeChangeListener() { }
    invalidateToken() { }
}
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
            const client = credentials['client'];
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
const DEFAULT_HOST = 'firestore.googleapis.com';
const DEFAULT_SSL = true;
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied firestore.Settings object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */
class FirestoreSettings {
    constructor(settings) {
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
                throw new FirestoreError(Code.INVALID_ARGUMENT, `cacheSizeBytes must be at least ${LRU_MINIMUM_CACHE_SIZE_BYTES}`);
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
    isEqual(other) {
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
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
class FirebaseFirestore$1 {
    /** @hideconstructor */
    constructor(databaseIdOrApp, authProvider) {
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
    /**
     * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
     * instance.
     */
    get app() {
        if (!this._app) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is " +
                'not available');
        }
        return this._app;
    }
    get _initialized() {
        return this._settingsFrozen;
    }
    get _terminated() {
        return this._terminateTask !== undefined;
    }
    _setSettings(settings) {
        if (this._settingsFrozen) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, 'Firestore has already been started and its settings can no longer ' +
                'be changed. You can only modify settings before calling any other ' +
                'methods on a Firestore object.');
        }
        this._settings = new FirestoreSettings(settings);
        if (settings.credentials !== undefined) {
            this._credentials = makeCredentialsProvider(settings.credentials);
        }
    }
    _getSettings() {
        return this._settings;
    }
    _freezeSettings() {
        this._settingsFrozen = true;
        return this._settings;
    }
    _delete() {
        if (!this._terminateTask) {
            this._terminateTask = this._terminate();
        }
        return this._terminateTask;
    }
    /** Returns a JSON-serializable representation of this Firestore instance. */
    toJSON() {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings
        };
    }
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */
    _terminate() {
        removeComponents(this);
        return Promise.resolve();
    }
}
function databaseIdFromApp(app) {
    if (!Object.prototype.hasOwnProperty.apply(app.options, ['projectId'])) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
    }
    return new DatabaseId(app.options.projectId);
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
function useFirestoreEmulator(firestore, host, port, options = {}) {
    firestore = cast(firestore, FirebaseFirestore$1);
    const settings = firestore._getSettings();
    if (settings.host !== DEFAULT_HOST && settings.host !== host) {
        logWarn('Host has been set in both settings() and useEmulator(), emulator host ' +
            'will be used');
    }
    firestore._setSettings(Object.assign(Object.assign({}, settings), { host: `${host}:${port}`, ssl: false }));
    if (options.mockUserToken) {
        // Let createMockUserToken validate first (catches common mistakes like
        // invalid field "uid" and missing field "sub" / "user_id".)
        const token = createMockUserToken(options.mockUserToken);
        const uid = options.mockUserToken.sub || options.mockUserToken.user_id;
        if (!uid) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
        }
        firestore._credentials = new EmulatorCredentialsProvider(new OAuthToken(token, new User(uid)));
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
 */
class DocumentReference {
    /** @hideconstructor */
    constructor(firestore, 
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
    get _path() {
        return this._key.path;
    }
    /**
     * The document's identifier within its collection.
     */
    get id() {
        return this._key.path.lastSegment();
    }
    /**
     * A string representing the path of the referenced document (relative
     * to the root of the database).
     */
    get path() {
        return this._key.path.canonicalString();
    }
    /**
     * The collection this `DocumentReference` belongs to.
     */
    get parent() {
        return new CollectionReference(this.firestore, this.converter, this._key.path.popLast());
    }
    withConverter(converter) {
        return new DocumentReference(this.firestore, converter, this._key);
    }
}
/**
 * A `Query` refers to a Query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */
class Query {
    // This is the lite version of the Query class in the main SDK.
    /** @hideconstructor protected */
    constructor(firestore, 
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
    withConverter(converter) {
        return new Query(this.firestore, converter, this._query);
    }
}
/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */
class CollectionReference extends Query {
    /** @hideconstructor */
    constructor(firestore, converter, _path) {
        super(firestore, converter, newQueryForPath(_path));
        this._path = _path;
        /** The type of this Firestore reference. */
        this.type = 'collection';
    }
    /** The collection's identifier. */
    get id() {
        return this._query.path.lastSegment();
    }
    /**
     * A string representing the path of the referenced collection (relative
     * to the root of the database).
     */
    get path() {
        return this._query.path.canonicalString();
    }
    /**
     * A reference to the containing `DocumentReference` if this is a
     * subcollection. If this isn't a subcollection, the reference is null.
     */
    get parent() {
        const parentPath = this._path.popLast();
        if (parentPath.isEmpty()) {
            return null;
        }
        else {
            return new DocumentReference(this.firestore, 
            /* converter= */ null, new DocumentKey(parentPath));
        }
    }
    withConverter(converter) {
        return new CollectionReference(this.firestore, converter, this._path);
    }
}
function collection(parent, path, ...pathSegments) {
    parent = getModularInstance(parent);
    validateNonEmptyArgument('collection', 'path', path);
    if (parent instanceof FirebaseFirestore$1) {
        const absolutePath = ResourcePath.fromString(path, ...pathSegments);
        validateCollectionPath(absolutePath);
        return new CollectionReference(parent, /* converter= */ null, absolutePath);
    }
    else {
        if (!(parent instanceof DocumentReference) &&
            !(parent instanceof CollectionReference)) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Expected first argument to collection() to be a CollectionReference, ' +
                'a DocumentReference or FirebaseFirestore');
        }
        const absolutePath = ResourcePath.fromString(parent.path, ...pathSegments).child(ResourcePath.fromString(path));
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
    firestore = cast(firestore, FirebaseFirestore$1);
    validateNonEmptyArgument('collectionGroup', 'collection id', collectionId);
    if (collectionId.indexOf('/') >= 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid collection ID '${collectionId}' passed to function ` +
            `collectionGroup(). Collection IDs must not contain '/'.`);
    }
    return new Query(firestore, 
    /* converter= */ null, newQueryForCollectionGroup(collectionId));
}
function doc(parent, path, ...pathSegments) {
    parent = getModularInstance(parent);
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    if (arguments.length === 1) {
        path = AutoId.newId();
    }
    validateNonEmptyArgument('doc', 'path', path);
    if (parent instanceof FirebaseFirestore$1) {
        const absolutePath = ResourcePath.fromString(path, ...pathSegments);
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
        const absolutePath = parent._path.child(ResourcePath.fromString(path, ...pathSegments));
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
    left = getModularInstance(left);
    right = getModularInstance(right);
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
    left = getModularInstance(left);
    right = getModularInstance(right);
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
const LOG_TAG = 'AsyncQueue';
class AsyncQueueImpl {
    constructor() {
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
        this.visibilityHandler = () => {
            this.backoff.skipBackoff();
        };
    }
    get isShuttingDown() {
        return this._isShuttingDown;
    }
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    enqueueAndForget(op) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(op);
    }
    enqueueAndForgetEvenWhileRestricted(op) {
        this.verifyNotFailed();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueueInternal(op);
    }
    enterRestrictedMode(purgeExistingTasks) {
        if (!this._isShuttingDown) {
            this._isShuttingDown = true;
            this.skipNonRestrictedTasks = purgeExistingTasks || false;
        }
    }
    enqueue(op) {
        this.verifyNotFailed();
        if (this._isShuttingDown) {
            // Return a Promise which never resolves.
            return new Promise(() => { });
        }
        // Create a deferred Promise that we can return to the callee. This
        // allows us to return a "hanging Promise" only to the callee and still
        // advance the queue even when the operation is not run.
        const task = new Deferred();
        return this.enqueueInternal(() => {
            if (this._isShuttingDown && this.skipNonRestrictedTasks) {
                // We do not resolve 'task'
                return Promise.resolve();
            }
            op().then(task.resolve, task.reject);
            return task.promise;
        }).then(() => task.promise);
    }
    enqueueRetryable(op) {
        this.enqueueAndForget(() => {
            this.retryableOps.push(op);
            return this.retryNextOp();
        });
    }
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */
    async retryNextOp() {
        if (this.retryableOps.length === 0) {
            return;
        }
        try {
            await this.retryableOps[0]();
            this.retryableOps.shift();
            this.backoff.reset();
        }
        catch (e) {
            if (isIndexedDbTransactionError(e)) {
                logDebug(LOG_TAG, 'Operation failed with retryable error: ' + e);
            }
            else {
                throw e; // Failure will be handled by AsyncQueue
            }
        }
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
            this.backoff.backoffAndRun(() => this.retryNextOp());
        }
    }
    enqueueInternal(op) {
        const newTail = this.tail.then(() => {
            this.operationInProgress = true;
            return op()
                .catch((error) => {
                this.failure = error;
                this.operationInProgress = false;
                const message = getMessageOrStack(error);
                logError('INTERNAL UNHANDLED ERROR: ', message);
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw error;
            })
                .then(result => {
                this.operationInProgress = false;
                return result;
            });
        });
        this.tail = newTail;
        return newTail;
    }
    enqueueAfterDelay(timerId, delayMs, op) {
        this.verifyNotFailed();
        // Fast-forward delays for timerIds that have been overriden.
        if (this.timerIdsToSkip.indexOf(timerId) > -1) {
            delayMs = 0;
        }
        const delayedOp = DelayedOperation.createAndSchedule(this, timerId, delayMs, op, removedOp => this.removeDelayedOperation(removedOp));
        this.delayedOperations.push(delayedOp);
        return delayedOp;
    }
    verifyNotFailed() {
        if (this.failure) {
            fail();
        }
    }
    verifyOperationInProgress() {
    }
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    async drain() {
        // Operations in the queue prior to draining may have enqueued additional
        // operations. Keep draining the queue until the tail is no longer advanced,
        // which indicates that no more new operations were enqueued and that all
        // operations were executed.
        let currentTail;
        do {
            currentTail = this.tail;
            await currentTail;
        } while (currentTail !== this.tail);
    }
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    containsDelayedOperation(timerId) {
        for (const op of this.delayedOperations) {
            if (op.timerId === timerId) {
                return true;
            }
        }
        return false;
    }
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    runAllDelayedOperationsUntil(lastTimerId) {
        // Note that draining may generate more delayed ops, so we do that first.
        return this.drain().then(() => {
            // Run ops in the same order they'd run if they ran naturally.
            this.delayedOperations.sort((a, b) => a.targetTimeMs - b.targetTimeMs);
            for (const op of this.delayedOperations) {
                op.skipDelay();
                if (lastTimerId !== "all" /* All */ && op.timerId === lastTimerId) {
                    break;
                }
            }
            return this.drain();
        });
    }
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    skipDelaysForTimerId(timerId) {
        this.timerIdsToSkip.push(timerId);
    }
    /** Called once a DelayedOperation is run or canceled. */
    removeDelayedOperation(op) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        const index = this.delayedOperations.indexOf(op);
        this.delayedOperations.splice(index, 1);
    }
}
function newAsyncQueue() {
    return new AsyncQueueImpl();
}
/**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error - Error or FirestoreError
 */
function getMessageOrStack(error) {
    let message = error.message || '';
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
/**
 * Represents the task of loading a Firestore bundle. It provides progress of bundle
 * loading, as well as task completion and error events.
 *
 * The API is compatible with `Promise<LoadBundleTaskProgress>`.
 */
class LoadBundleTask {
    constructor() {
        this._progressObserver = {};
        this._taskCompletionResolver = new Deferred();
        this._lastProgress = {
            taskState: 'Running',
            totalBytes: 0,
            totalDocuments: 0,
            bytesLoaded: 0,
            documentsLoaded: 0
        };
    }
    /**
     * Registers functions to listen to bundle loading progress events.
     * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
     *   each time a Firestore document is loaded from the bundle.
     * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
     *   error, and there should be no more updates after this.
     * @param complete - Called when the loading task is complete.
     */
    onProgress(next, error, complete) {
        this._progressObserver = {
            next,
            error,
            complete
        };
    }
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    catch(onRejected) {
        return this._taskCompletionResolver.promise.catch(onRejected);
    }
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */
    then(onFulfilled, onRejected) {
        return this._taskCompletionResolver.promise.then(onFulfilled, onRejected);
    }
    /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */
    _completeWith(progress) {
        this._updateProgress(progress);
        if (this._progressObserver.complete) {
            this._progressObserver.complete();
        }
        this._taskCompletionResolver.resolve(progress);
    }
    /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */
    _failWith(error) {
        this._lastProgress.taskState = 'Error';
        if (this._progressObserver.next) {
            this._progressObserver.next(this._lastProgress);
        }
        if (this._progressObserver.error) {
            this._progressObserver.error(error);
        }
        this._taskCompletionResolver.reject(error);
    }
    /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */
    _updateProgress(progress) {
        this._lastProgress = progress;
        if (this._progressObserver.next) {
            this._progressObserver.next(progress);
        }
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
/** DOMException error code constants. */
const DOM_EXCEPTION_INVALID_STATE = 11;
const DOM_EXCEPTION_ABORTED = 20;
const DOM_EXCEPTION_QUOTA_EXCEEDED = 22;
/**
 * Constant used to indicate the LRU garbage collection should be disabled.
 * Set this value as the `cacheSizeBytes` on the settings passed to the
 * `Firestore` instance.
 */
const CACHE_SIZE_UNLIMITED = LRU_COLLECTION_DISABLED;
/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
class FirebaseFirestore extends FirebaseFirestore$1 {
    /** @hideconstructor */
    constructor(databaseIdOrApp, authProvider) {
        super(databaseIdOrApp, authProvider);
        this.type = 'firestore';
        this._queue = newAsyncQueue();
        this._persistenceKey =
            'name' in databaseIdOrApp ? databaseIdOrApp.name : '[DEFAULT]';
    }
    _terminate() {
        if (!this._firestoreClient) {
            // The client must be initialized to ensure that all subsequent API
            // usage throws an exception.
            configureFirestore(this);
        }
        return this._firestoreClient.terminate();
    }
}
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
function initializeFirestore(app, settings) {
    const provider = _getProvider(app, 'firestore-exp');
    if (provider.isInitialized()) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, 'Firestore can only be initialized once per app.');
    }
    if (settings.cacheSizeBytes !== undefined &&
        settings.cacheSizeBytes !== CACHE_SIZE_UNLIMITED &&
        settings.cacheSizeBytes < LRU_MINIMUM_CACHE_SIZE_BYTES) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `cacheSizeBytes must be at least ${LRU_MINIMUM_CACHE_SIZE_BYTES}`);
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
function getFirestore(app = getApp()) {
    return _getProvider(app, 'firestore-exp').getImmediate();
}
/**
 * @internal
 */
function ensureFirestoreConfigured(firestore) {
    if (!firestore._firestoreClient) {
        configureFirestore(firestore);
    }
    firestore._firestoreClient.verifyNotTerminated();
    return firestore._firestoreClient;
}
function configureFirestore(firestore) {
    var _a;
    const settings = firestore._freezeSettings();
    const databaseInfo = makeDatabaseInfo(firestore._databaseId, ((_a = firestore._app) === null || _a === void 0 ? void 0 : _a.options.appId) || '', firestore._persistenceKey, settings);
    firestore._firestoreClient = new FirestoreClient(firestore._credentials, firestore._queue, databaseInfo);
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
function enableIndexedDbPersistence(firestore, persistenceSettings) {
    firestore = cast(firestore, FirebaseFirestore);
    verifyNotInitialized(firestore);
    const client = ensureFirestoreConfigured(firestore);
    const settings = firestore._freezeSettings();
    const onlineComponentProvider = new OnlineComponentProvider();
    const offlineComponentProvider = new IndexedDbOfflineComponentProvider(onlineComponentProvider, settings.cacheSizeBytes, persistenceSettings === null || persistenceSettings === void 0 ? void 0 : persistenceSettings.forceOwnership);
    return setPersistenceProviders(client, onlineComponentProvider, offlineComponentProvider);
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
 */
function enableMultiTabIndexedDbPersistence(firestore) {
    firestore = cast(firestore, FirebaseFirestore);
    verifyNotInitialized(firestore);
    const client = ensureFirestoreConfigured(firestore);
    const settings = firestore._freezeSettings();
    const onlineComponentProvider = new OnlineComponentProvider();
    const offlineComponentProvider = new MultiTabOfflineComponentProvider(onlineComponentProvider, settings.cacheSizeBytes);
    return setPersistenceProviders(client, onlineComponentProvider, offlineComponentProvider);
}
/**
 * Registers both the `OfflineComponentProvider` and `OnlineComponentProvider`.
 * If the operation fails with a recoverable error (see
 * `canRecoverFromIndexedDbError()` below), the returned Promise is rejected
 * but the client remains usable.
 */
function setPersistenceProviders(client, onlineComponentProvider, offlineComponentProvider) {
    const persistenceResult = new Deferred();
    return client.asyncQueue
        .enqueue(async () => {
        try {
            await setOfflineComponentProvider(client, offlineComponentProvider);
            await setOnlineComponentProvider(client, onlineComponentProvider);
            persistenceResult.resolve();
        }
        catch (e) {
            if (!canFallbackFromIndexedDbError(e)) {
                throw e;
            }
            console.warn('Error enabling offline persistence. Falling back to ' +
                'persistence disabled: ' +
                e);
            persistenceResult.reject(e);
        }
    })
        .then(() => persistenceResult.promise);
}
/**
 * Decides whether the provided error allows us to gracefully disable
 * persistence (as opposed to crashing the client).
 */
function canFallbackFromIndexedDbError(error) {
    if (error.name === 'FirebaseError') {
        return (error.code === Code.FAILED_PRECONDITION ||
            error.code === Code.UNIMPLEMENTED);
    }
    else if (typeof DOMException !== 'undefined' &&
        error instanceof DOMException) {
        // There are a few known circumstances where we can open IndexedDb but
        // trying to read/write will fail (e.g. quota exceeded). For
        // well-understood cases, we attempt to detect these and then gracefully
        // fall back to memory persistence.
        // NOTE: Rather than continue to add to this list, we could decide to
        // always fall back, with the risk that we might accidentally hide errors
        // representing actual SDK bugs.
        return (
        // When the browser is out of quota we could get either quota exceeded
        // or an aborted error depending on whether the error happened during
        // schema migration.
        error.code === DOM_EXCEPTION_QUOTA_EXCEEDED ||
            error.code === DOM_EXCEPTION_ABORTED ||
            // Firefox Private Browsing mode disables IndexedDb and returns
            // INVALID_STATE for any usage.
            error.code === DOM_EXCEPTION_INVALID_STATE);
    }
    return true;
}
/**
 * Clears the persistent storage. This includes pending writes and cached
 * documents.
 *
 * Must be called while the `Firestore` instance is not started (after the app is
 * terminated or when the app is first initialized). On startup, this function
 * must be called before other functions (other than {@link
 * initializeFirestore} or {@link getFirestore})). If the `Firestore`
 * instance is still running, the promise will be rejected with the error code
 * of `failed-precondition`.
 *
 * Note: `clearIndexedDbPersistence()` is primarily intended to help write
 * reliable tests that use Cloud Firestore. It uses an efficient mechanism for
 * dropping existing data but does not attempt to securely overwrite or
 * otherwise make cached data unrecoverable. For applications that are sensitive
 * to the disclosure of cached data in between user sessions, we strongly
 * recommend not enabling persistence at all.
 *
 * @param firestore - The `Firestore` instance to clear persistence for.
 * @returns A promise that is resolved when the persistent storage is
 * cleared. Otherwise, the promise is rejected with an error.
 */
function clearIndexedDbPersistence(firestore) {
    if (firestore._initialized && !firestore._terminated) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, 'Persistence can only be cleared before a Firestore instance is ' +
            'initialized or after it is terminated.');
    }
    const deferred = new Deferred();
    firestore._queue.enqueueAndForgetEvenWhileRestricted(async () => {
        try {
            await indexedDbClearPersistence(indexedDbStoragePrefix(firestore._databaseId, firestore._persistenceKey));
            deferred.resolve();
        }
        catch (e) {
            deferred.reject(e);
        }
    });
    return deferred.promise;
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
function waitForPendingWrites(firestore) {
    firestore = cast(firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientWaitForPendingWrites(client);
}
/**
 * Re-enables use of the network for this Firestore instance after a prior
 * call to {@link disableNetwork}.
 *
 * @returns A promise that is resolved once the network has been enabled.
 */
function enableNetwork(firestore) {
    firestore = cast(firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientEnableNetwork(client);
}
/**
 * Disables network usage for this instance. It can be re-enabled via {@link
 * enableNetwork}. While the network is disabled, any snapshot listeners,
 * `getDoc()` or `getDocs()` calls will return results from cache, and any write
 * operations will be queued until the network is restored.
 *
 * @returns A promise that is resolved once the network has been disabled.
 */
function disableNetwork(firestore) {
    firestore = cast(firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientDisableNetwork(client);
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
 */
function terminate(firestore) {
    _removeServiceInstance(firestore.app, 'firestore-exp');
    return firestore._delete();
}
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
function loadBundle(firestore, bundleData) {
    firestore = cast(firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    const resultTask = new LoadBundleTask();
    firestoreClientLoadBundle(client, firestore._databaseId, bundleData, resultTask);
    return resultTask;
}
/**
 * Reads a Firestore `Query` from local cache, identified by the given name.
 *
 * The named queries are packaged  into bundles on the server side (along
 * with resulting documents), and loaded to local cache using `loadBundle`. Once in local
 * cache, use this method to extract a `Query` by name.
 */
function namedQuery(firestore, name) {
    firestore = cast(firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientGetNamedQuery(client, name).then(namedQuery => {
        if (!namedQuery) {
            return null;
        }
        return new Query(firestore, null, namedQuery.query);
    });
}
function verifyNotInitialized(firestore) {
    if (firestore._initialized || firestore._terminated) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, 'Firestore has already been started and persistence can no longer be ' +
            'enabled. You can only enable persistence before calling any other ' +
            'methods on a Firestore object.');
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
function registerFirestore(variant) {
    setSDKVersion(SDK_VERSION$1);
    _registerComponent(new Component('firestore-exp', (container, { options: settings }) => {
        const app = container.getProvider('app-exp').getImmediate();
        const firestoreInstance = new FirebaseFirestore(app, container.getProvider('auth-internal'));
        settings = Object.assign({ useFetchStreams: false }, settings);
        firestoreInstance._setSettings(settings);
        return firestoreInstance;
    }, "PUBLIC" /* PUBLIC */));
    registerVersion(name, version$1, variant);
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
class FieldPath {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    constructor(...fieldNames) {
        for (let i = 0; i < fieldNames.length; ++i) {
            if (fieldNames[i].length === 0) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid field name at argument $(i + 1). ` +
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
    isEqual(other) {
        return this._internalPath.isEqual(other._internalPath);
    }
}
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
class Bytes {
    /** @hideconstructor */
    constructor(byteString) {
        this._byteString = byteString;
    }
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */
    static fromBase64String(base64) {
        try {
            return new Bytes(ByteString.fromBase64String(base64));
        }
        catch (e) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Failed to construct data from Base64 string: ' + e);
        }
    }
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */
    static fromUint8Array(array) {
        return new Bytes(ByteString.fromUint8Array(array));
    }
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */
    toBase64() {
        return this._byteString.toBase64();
    }
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */
    toUint8Array() {
        return this._byteString.toUint8Array();
    }
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */
    toString() {
        return 'Bytes(base64: ' + this.toBase64() + ')';
    }
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */
    isEqual(other) {
        return this._byteString.isEqual(other._byteString);
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
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */
class FieldValue {
    /**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
    constructor(_methodName) {
        this._methodName = _methodName;
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
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */
class GeoPoint {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    constructor(latitude, longitude) {
        if (!isFinite(latitude) || latitude < -90 || latitude > 90) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Latitude must be a number between -90 and 90, but was: ' + latitude);
        }
        if (!isFinite(longitude) || longitude < -180 || longitude > 180) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Longitude must be a number between -180 and 180, but was: ' + longitude);
        }
        this._lat = latitude;
        this._long = longitude;
    }
    /**
     * The latitude of this `GeoPoint` instance.
     */
    get latitude() {
        return this._lat;
    }
    /**
     * The longitude of this `GeoPoint` instance.
     */
    get longitude() {
        return this._long;
    }
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */
    isEqual(other) {
        return this._lat === other._lat && this._long === other._long;
    }
    /** Returns a JSON-serializable representation of this GeoPoint. */
    toJSON() {
        return { latitude: this._lat, longitude: this._long };
    }
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    _compareTo(other) {
        return (primitiveComparator(this._lat, other._lat) ||
            primitiveComparator(this._long, other._long));
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
const RESERVED_FIELD_REGEX = /^__.*__$/;
/** The result of parsing document data (e.g. for a setData call). */
class ParsedSetData {
    constructor(data, fieldMask, fieldTransforms) {
        this.data = data;
        this.fieldMask = fieldMask;
        this.fieldTransforms = fieldTransforms;
    }
    toMutation(key, precondition) {
        if (this.fieldMask !== null) {
            return new PatchMutation(key, this.data, this.fieldMask, precondition, this.fieldTransforms);
        }
        else {
            return new SetMutation(key, this.data, precondition, this.fieldTransforms);
        }
    }
}
/** The result of parsing "update" data (i.e. for an updateData call). */
class ParsedUpdateData {
    constructor(data, 
    // The fieldMask does not include document transforms.
    fieldMask, fieldTransforms) {
        this.data = data;
        this.fieldMask = fieldMask;
        this.fieldTransforms = fieldTransforms;
    }
    toMutation(key, precondition) {
        return new PatchMutation(key, this.data, this.fieldMask, precondition, this.fieldTransforms);
    }
}
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
class ParseContextImpl {
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
    constructor(settings, databaseId, serializer, ignoreUndefinedProperties, fieldTransforms, fieldMask) {
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
    get path() {
        return this.settings.path;
    }
    get dataSource() {
        return this.settings.dataSource;
    }
    /** Returns a new context with the specified settings overwritten. */
    contextWith(configuration) {
        return new ParseContextImpl(Object.assign(Object.assign({}, this.settings), configuration), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    }
    childContextForField(field) {
        var _a;
        const childPath = (_a = this.path) === null || _a === void 0 ? void 0 : _a.child(field);
        const context = this.contextWith({ path: childPath, arrayElement: false });
        context.validatePathSegment(field);
        return context;
    }
    childContextForFieldPath(field) {
        var _a;
        const childPath = (_a = this.path) === null || _a === void 0 ? void 0 : _a.child(field);
        const context = this.contextWith({ path: childPath, arrayElement: false });
        context.validatePath();
        return context;
    }
    childContextForArray(index) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.contextWith({ path: undefined, arrayElement: true });
    }
    createError(reason) {
        return createError(reason, this.settings.methodName, this.settings.hasConverter || false, this.path, this.settings.targetDoc);
    }
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */
    contains(fieldPath) {
        return (this.fieldMask.find(field => fieldPath.isPrefixOf(field)) !== undefined ||
            this.fieldTransforms.find(transform => fieldPath.isPrefixOf(transform.field)) !== undefined);
    }
    validatePath() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (!this.path) {
            return;
        }
        for (let i = 0; i < this.path.length; i++) {
            this.validatePathSegment(this.path.get(i));
        }
    }
    validatePathSegment(segment) {
        if (segment.length === 0) {
            throw this.createError('Document fields must not be empty');
        }
        if (isWrite(this.dataSource) && RESERVED_FIELD_REGEX.test(segment)) {
            throw this.createError('Document fields cannot begin and end with "__"');
        }
    }
}
/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */
class UserDataReader {
    constructor(databaseId, ignoreUndefinedProperties, serializer) {
        this.databaseId = databaseId;
        this.ignoreUndefinedProperties = ignoreUndefinedProperties;
        this.serializer = serializer || newSerializer(databaseId);
    }
    /** Creates a new top-level parse context. */
    createContext(dataSource, methodName, targetDoc, hasConverter = false) {
        return new ParseContextImpl({
            dataSource,
            methodName,
            targetDoc,
            path: FieldPath$1.emptyPath(),
            arrayElement: false,
            hasConverter
        }, this.databaseId, this.serializer, this.ignoreUndefinedProperties);
    }
}
function newUserDataReader(firestore) {
    const settings = firestore._freezeSettings();
    const serializer = newSerializer(firestore._databaseId);
    return new UserDataReader(firestore._databaseId, !!settings.ignoreUndefinedProperties, serializer);
}
/** Parse document data from a set() call. */
function parseSetData(userDataReader, methodName, targetDoc, input, hasConverter, options = {}) {
    const context = userDataReader.createContext(options.merge || options.mergeFields
        ? 2 /* MergeSet */
        : 0 /* Set */, methodName, targetDoc, hasConverter);
    validatePlainObject('Data must be an object, but it was:', context, input);
    const updateData = parseObject(input, context);
    let fieldMask;
    let fieldTransforms;
    if (options.merge) {
        fieldMask = new FieldMask(context.fieldMask);
        fieldTransforms = context.fieldTransforms;
    }
    else if (options.mergeFields) {
        const validatedFieldPaths = [];
        for (const stringOrFieldPath of options.mergeFields) {
            const fieldPath = fieldPathFromArgument$1(methodName, stringOrFieldPath, targetDoc);
            if (!context.contains(fieldPath)) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, `Field '${fieldPath}' is specified in your field mask but missing from your input data.`);
            }
            if (!fieldMaskContains(validatedFieldPaths, fieldPath)) {
                validatedFieldPaths.push(fieldPath);
            }
        }
        fieldMask = new FieldMask(validatedFieldPaths);
        fieldTransforms = context.fieldTransforms.filter(transform => fieldMask.covers(transform.field));
    }
    else {
        fieldMask = null;
        fieldTransforms = context.fieldTransforms;
    }
    return new ParsedSetData(new ObjectValue(updateData), fieldMask, fieldTransforms);
}
class DeleteFieldValueImpl extends FieldValue {
    _toFieldTransform(context) {
        if (context.dataSource === 2 /* MergeSet */) {
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            context.fieldMask.push(context.path);
        }
        else if (context.dataSource === 1 /* Update */) {
            throw context.createError(`${this._methodName}() can only appear at the top level ` +
                'of your update data');
        }
        else {
            // We shouldn't encounter delete sentinels for queries or non-merge set() calls.
            throw context.createError(`${this._methodName}() cannot be used with set() unless you pass ` +
                '{merge:true}');
        }
        return null;
    }
    isEqual(other) {
        return other instanceof DeleteFieldValueImpl;
    }
}
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
        arrayElement
    }, context.databaseId, context.serializer, context.ignoreUndefinedProperties);
}
class ServerTimestampFieldValueImpl extends FieldValue {
    _toFieldTransform(context) {
        return new FieldTransform(context.path, new ServerTimestampTransform());
    }
    isEqual(other) {
        return other instanceof ServerTimestampFieldValueImpl;
    }
}
class ArrayUnionFieldValueImpl extends FieldValue {
    constructor(methodName, _elements) {
        super(methodName);
        this._elements = _elements;
    }
    _toFieldTransform(context) {
        const parseContext = createSentinelChildContext(this, context, 
        /*array=*/ true);
        const parsedElements = this._elements.map(element => parseData(element, parseContext));
        const arrayUnion = new ArrayUnionTransformOperation(parsedElements);
        return new FieldTransform(context.path, arrayUnion);
    }
    isEqual(other) {
        // TODO(mrschmidt): Implement isEquals
        return this === other;
    }
}
class ArrayRemoveFieldValueImpl extends FieldValue {
    constructor(methodName, _elements) {
        super(methodName);
        this._elements = _elements;
    }
    _toFieldTransform(context) {
        const parseContext = createSentinelChildContext(this, context, 
        /*array=*/ true);
        const parsedElements = this._elements.map(element => parseData(element, parseContext));
        const arrayUnion = new ArrayRemoveTransformOperation(parsedElements);
        return new FieldTransform(context.path, arrayUnion);
    }
    isEqual(other) {
        // TODO(mrschmidt): Implement isEquals
        return this === other;
    }
}
class NumericIncrementFieldValueImpl extends FieldValue {
    constructor(methodName, _operand) {
        super(methodName);
        this._operand = _operand;
    }
    _toFieldTransform(context) {
        const numericIncrement = new NumericIncrementTransformOperation(context.serializer, toNumber(context.serializer, this._operand));
        return new FieldTransform(context.path, numericIncrement);
    }
    isEqual(other) {
        // TODO(mrschmidt): Implement isEquals
        return this === other;
    }
}
/** Parse update data from an update() call. */
function parseUpdateData(userDataReader, methodName, targetDoc, input) {
    const context = userDataReader.createContext(1 /* Update */, methodName, targetDoc);
    validatePlainObject('Data must be an object, but it was:', context, input);
    const fieldMaskPaths = [];
    const updateData = ObjectValue.empty();
    forEach(input, (key, value) => {
        const path = fieldPathFromDotSeparatedString(methodName, key, targetDoc);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        value = getModularInstance(value);
        const childContext = context.childContextForFieldPath(path);
        if (value instanceof DeleteFieldValueImpl) {
            // Add it to the field mask, but don't add anything to updateData.
            fieldMaskPaths.push(path);
        }
        else {
            const parsedValue = parseData(value, childContext);
            if (parsedValue != null) {
                fieldMaskPaths.push(path);
                updateData.set(path, parsedValue);
            }
        }
    });
    const mask = new FieldMask(fieldMaskPaths);
    return new ParsedUpdateData(updateData, mask, context.fieldTransforms);
}
/** Parse update data from a list of field/value arguments. */
function parseUpdateVarargs(userDataReader, methodName, targetDoc, field, value, moreFieldsAndValues) {
    const context = userDataReader.createContext(1 /* Update */, methodName, targetDoc);
    const keys = [fieldPathFromArgument$1(methodName, field, targetDoc)];
    const values = [value];
    if (moreFieldsAndValues.length % 2 !== 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Function ${methodName}() needs to be called with an even number ` +
            'of arguments that alternate between field names and values.');
    }
    for (let i = 0; i < moreFieldsAndValues.length; i += 2) {
        keys.push(fieldPathFromArgument$1(methodName, moreFieldsAndValues[i]));
        values.push(moreFieldsAndValues[i + 1]);
    }
    const fieldMaskPaths = [];
    const updateData = ObjectValue.empty();
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (let i = keys.length - 1; i >= 0; --i) {
        if (!fieldMaskContains(fieldMaskPaths, keys[i])) {
            const path = keys[i];
            let value = values[i];
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
            value = getModularInstance(value);
            const childContext = context.childContextForFieldPath(path);
            if (value instanceof DeleteFieldValueImpl) {
                // Add it to the field mask, but don't add anything to updateData.
                fieldMaskPaths.push(path);
            }
            else {
                const parsedValue = parseData(value, childContext);
                if (parsedValue != null) {
                    fieldMaskPaths.push(path);
                    updateData.set(path, parsedValue);
                }
            }
        }
    }
    const mask = new FieldMask(fieldMaskPaths);
    return new ParsedUpdateData(updateData, mask, context.fieldTransforms);
}
/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */
function parseQueryValue(userDataReader, methodName, input, allowArrays = false) {
    const context = userDataReader.createContext(allowArrays ? 4 /* ArrayArgument */ : 3 /* Argument */, methodName);
    const parsed = parseData(input, context);
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
    input = getModularInstance(input);
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
    const fields = {};
    if (isEmpty(obj)) {
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        if (context.path && context.path.length > 0) {
            context.fieldMask.push(context.path);
        }
    }
    else {
        forEach(obj, (key, val) => {
            const parsedValue = parseData(val, context.childContextForField(key));
            if (parsedValue != null) {
                fields[key] = parsedValue;
            }
        });
    }
    return { mapValue: { fields } };
}
function parseArray(array, context) {
    const values = [];
    let entryIndex = 0;
    for (const entry of array) {
        let parsedEntry = parseData(entry, context.childContextForArray(entryIndex));
        if (parsedEntry == null) {
            // Just include nulls in the array for fields being replaced with a
            // sentinel.
            parsedEntry = { nullValue: 'NULL_VALUE' };
        }
        values.push(parsedEntry);
        entryIndex++;
    }
    return { arrayValue: { values } };
}
/**
 * "Parses" the provided FieldValueImpl, adding any necessary transforms to
 * context.fieldTransforms.
 */
function parseSentinelFieldValue(value, context) {
    // Sentinels are only supported with writes, and not within arrays.
    if (!isWrite(context.dataSource)) {
        throw context.createError(`${value._methodName}() can only be used with update() and set()`);
    }
    if (!context.path) {
        throw context.createError(`${value._methodName}() is not currently supported inside arrays`);
    }
    const fieldTransform = value._toFieldTransform(context);
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
    value = getModularInstance(value);
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
        const timestamp = Timestamp.fromDate(value);
        return {
            timestampValue: toTimestamp(context.serializer, timestamp)
        };
    }
    else if (value instanceof Timestamp) {
        // Firestore backend truncates precision down to microseconds. To ensure
        // offline mode works the same with regards to truncation, perform the
        // truncation immediately without waiting for the backend to do that.
        const timestamp = new Timestamp(value.seconds, Math.floor(value.nanoseconds / 1000) * 1000);
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
        const thisDb = context.databaseId;
        const otherDb = value.firestore._databaseId;
        if (!otherDb.isEqual(thisDb)) {
            throw context.createError('Document reference is for database ' +
                `${otherDb.projectId}/${otherDb.database} but should be ` +
                `for database ${thisDb.projectId}/${thisDb.database}`);
        }
        return {
            referenceValue: toResourceName(value.firestore._databaseId || context.databaseId, value._key.path)
        };
    }
    else {
        throw context.createError(`Unsupported field value: ${valueDescription(value)}`);
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
        const description = valueDescription(input);
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
    path = getModularInstance(path);
    if (path instanceof FieldPath) {
        return path._internalPath;
    }
    else if (typeof path === 'string') {
        return fieldPathFromDotSeparatedString(methodName, path);
    }
    else {
        const message = 'Field path arguments must be of type string or FieldPath.';
        throw createError(message, methodName, 
        /* hasConverter= */ false, 
        /* path= */ undefined, targetDoc);
    }
}
/**
 * Matches any characters in a field path string that are reserved.
 */
const FIELD_PATH_RESERVED = new RegExp('[~\\*/\\[\\]]');
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
    const found = path.search(FIELD_PATH_RESERVED);
    if (found >= 0) {
        throw createError(`Invalid field path (${path}). Paths must not contain ` +
            `'~', '*', '/', '[', or ']'`, methodName, 
        /* hasConverter= */ false, 
        /* path= */ undefined, targetDoc);
    }
    try {
        return new FieldPath(...path.split('.'))._internalPath;
    }
    catch (e) {
        throw createError(`Invalid field path (${path}). Paths must not be empty, ` +
            `begin with '.', end with '.', or contain '..'`, methodName, 
        /* hasConverter= */ false, 
        /* path= */ undefined, targetDoc);
    }
}
function createError(reason, methodName, hasConverter, path, targetDoc) {
    const hasPath = path && !path.isEmpty();
    const hasDocument = targetDoc !== undefined;
    let message = `Function ${methodName}() called with invalid data`;
    if (hasConverter) {
        message += ' (via `toFirestore()`)';
    }
    message += '. ';
    let description = '';
    if (hasPath || hasDocument) {
        description += ' (found';
        if (hasPath) {
            description += ` in field ${path}`;
        }
        if (hasDocument) {
            description += ` in document ${targetDoc}`;
        }
        description += ')';
    }
    return new FirestoreError(Code.INVALID_ARGUMENT, message + reason + description);
}
/** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */
function fieldMaskContains(haystack, needle) {
    return haystack.some(v => v.isEqual(needle));
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
class DocumentSnapshot$1 {
    // Note: This class is stripped down version of the DocumentSnapshot in
    // the legacy SDK. The changes are:
    // - No support for SnapshotMetadata.
    // - No support for SnapshotOptions.
    /** @hideconstructor protected */
    constructor(_firestore, _userDataWriter, _key, _document, _converter) {
        this._firestore = _firestore;
        this._userDataWriter = _userDataWriter;
        this._key = _key;
        this._document = _document;
        this._converter = _converter;
    }
    /** Property of the `DocumentSnapshot` that provides the document's ID. */
    get id() {
        return this._key.path.lastSegment();
    }
    /**
     * The `DocumentReference` for the document included in the `DocumentSnapshot`.
     */
    get ref() {
        return new DocumentReference(this._firestore, this._converter, this._key);
    }
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */
    exists() {
        return this._document !== null;
    }
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */
    data() {
        if (!this._document) {
            return undefined;
        }
        else if (this._converter) {
            // We only want to use the converter and create a new DocumentSnapshot
            // if a converter has been provided.
            const snapshot = new QueryDocumentSnapshot$1(this._firestore, this._userDataWriter, this._key, this._document, 
            /* converter= */ null);
            return this._converter.fromFirestore(snapshot);
        }
        else {
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    }
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
    get(fieldPath) {
        if (this._document) {
            const value = this._document.data.field(fieldPathFromArgument('DocumentSnapshot.get', fieldPath));
            if (value !== null) {
                return this._userDataWriter.convertValue(value);
            }
        }
        return undefined;
    }
}
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
class QueryDocumentSnapshot$1 extends DocumentSnapshot$1 {
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */
    data() {
        return super.data();
    }
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
/**
 * Metadata about a snapshot, describing the state of the snapshot.
 */
class SnapshotMetadata {
    /** @hideconstructor */
    constructor(hasPendingWrites, fromCache) {
        this.hasPendingWrites = hasPendingWrites;
        this.fromCache = fromCache;
    }
    /**
     * Returns true if this `SnapshotMetadata` is equal to the provided one.
     *
     * @param other - The `SnapshotMetadata` to compare against.
     * @returns true if this `SnapshotMetadata` is equal to the provided one.
     */
    isEqual(other) {
        return (this.hasPendingWrites === other.hasPendingWrites &&
            this.fromCache === other.fromCache);
    }
}
/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */
class DocumentSnapshot extends DocumentSnapshot$1 {
    /** @hideconstructor protected */
    constructor(_firestore, userDataWriter, key, document, metadata, converter) {
        super(_firestore, userDataWriter, key, document, converter);
        this._firestore = _firestore;
        this._firestoreImpl = _firestore;
        this.metadata = metadata;
    }
    /**
     * Property of the `DocumentSnapshot` that signals whether or not the data
     * exists. True if the document exists.
     */
    exists() {
        return super.exists();
    }
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
    data(options = {}) {
        if (!this._document) {
            return undefined;
        }
        else if (this._converter) {
            // We only want to use the converter and create a new DocumentSnapshot
            // if a converter has been provided.
            const snapshot = new QueryDocumentSnapshot(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
            /* converter= */ null);
            return this._converter.fromFirestore(snapshot, options);
        }
        else {
            return this._userDataWriter.convertValue(this._document.data.value, options.serverTimestamps);
        }
    }
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
    get(fieldPath, options = {}) {
        if (this._document) {
            const value = this._document.data.field(fieldPathFromArgument('DocumentSnapshot.get', fieldPath));
            if (value !== null) {
                return this._userDataWriter.convertValue(value, options.serverTimestamps);
            }
        }
        return undefined;
    }
}
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
class QueryDocumentSnapshot extends DocumentSnapshot {
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
     */
    data(options = {}) {
        return super.data(options);
    }
}
/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */
class QuerySnapshot {
    /** @hideconstructor */
    constructor(_firestore, _userDataWriter, query, _snapshot) {
        this._firestore = _firestore;
        this._userDataWriter = _userDataWriter;
        this._snapshot = _snapshot;
        this.metadata = new SnapshotMetadata(_snapshot.hasPendingWrites, _snapshot.fromCache);
        this.query = query;
    }
    /** An array of all the documents in the `QuerySnapshot`. */
    get docs() {
        const result = [];
        this.forEach(doc => result.push(doc));
        return result;
    }
    /** The number of documents in the `QuerySnapshot`. */
    get size() {
        return this._snapshot.docs.size;
    }
    /** True if there are no documents in the `QuerySnapshot`. */
    get empty() {
        return this.size === 0;
    }
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */
    forEach(callback, thisArg) {
        this._snapshot.docs.forEach(doc => {
            callback.call(thisArg, new QueryDocumentSnapshot(this._firestore, this._userDataWriter, doc.key, doc, new SnapshotMetadata(this._snapshot.mutatedKeys.has(doc.key), this._snapshot.fromCache), this.query.converter));
        });
    }
    /**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */
    docChanges(options = {}) {
        const includeMetadataChanges = !!options.includeMetadataChanges;
        if (includeMetadataChanges && this._snapshot.excludesMetadataChanges) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'To include metadata changes with your document changes, you must ' +
                'also pass { includeMetadataChanges:true } to onSnapshot().');
        }
        if (!this._cachedChanges ||
            this._cachedChangesIncludeMetadataChanges !== includeMetadataChanges) {
            this._cachedChanges = changesFromSnapshot(this, includeMetadataChanges);
            this._cachedChangesIncludeMetadataChanges = includeMetadataChanges;
        }
        return this._cachedChanges;
    }
}
/** Calculates the array of DocumentChanges for a given ViewSnapshot. */
function changesFromSnapshot(querySnapshot, includeMetadataChanges) {
    if (querySnapshot._snapshot.oldDocs.isEmpty()) {
        let index = 0;
        return querySnapshot._snapshot.docChanges.map(change => {
            const doc = new QueryDocumentSnapshot(querySnapshot._firestore, querySnapshot._userDataWriter, change.doc.key, change.doc, new SnapshotMetadata(querySnapshot._snapshot.mutatedKeys.has(change.doc.key), querySnapshot._snapshot.fromCache), querySnapshot.query.converter);
            return {
                type: 'added',
                doc,
                oldIndex: -1,
                newIndex: index++
            };
        });
    }
    else {
        // A DocumentSet that is updated incrementally as changes are applied to use
        // to lookup the index of a document.
        let indexTracker = querySnapshot._snapshot.oldDocs;
        return querySnapshot._snapshot.docChanges
            .filter(change => includeMetadataChanges || change.type !== 3 /* Metadata */)
            .map(change => {
            const doc = new QueryDocumentSnapshot(querySnapshot._firestore, querySnapshot._userDataWriter, change.doc.key, change.doc, new SnapshotMetadata(querySnapshot._snapshot.mutatedKeys.has(change.doc.key), querySnapshot._snapshot.fromCache), querySnapshot.query.converter);
            let oldIndex = -1;
            let newIndex = -1;
            if (change.type !== 0 /* Added */) {
                oldIndex = indexTracker.indexOf(change.doc.key);
                indexTracker = indexTracker.delete(change.doc.key);
            }
            if (change.type !== 1 /* Removed */) {
                indexTracker = indexTracker.add(change.doc);
                newIndex = indexTracker.indexOf(change.doc.key);
            }
            return {
                type: resultChangeType(change.type),
                doc,
                oldIndex,
                newIndex
            };
        });
    }
}
function resultChangeType(type) {
    switch (type) {
        case 0 /* Added */:
            return 'added';
        case 2 /* Modified */:
        case 3 /* Metadata */:
            return 'modified';
        case 1 /* Removed */:
            return 'removed';
        default:
            return fail();
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
 */
function snapshotEqual(left, right) {
    if (left instanceof DocumentSnapshot && right instanceof DocumentSnapshot) {
        return (left._firestore === right._firestore &&
            left._key.isEqual(right._key) &&
            (left._document === null
                ? right._document === null
                : left._document.isEqual(right._document)) &&
            left._converter === right._converter);
    }
    else if (left instanceof QuerySnapshot && right instanceof QuerySnapshot) {
        return (left._firestore === right._firestore &&
            queryEqual(left.query, right.query) &&
            left.metadata.isEqual(right.metadata) &&
            left._snapshot.isEqual(right._snapshot));
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
class QueryConstraint {
}
/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */
function query(query, ...queryConstraints) {
    for (const constraint of queryConstraints) {
        query = constraint._apply(query);
    }
    return query;
}
class QueryFilterConstraint extends QueryConstraint {
    constructor(_field, _op, _value) {
        super();
        this._field = _field;
        this._op = _op;
        this._value = _value;
        this.type = 'where';
    }
    _apply(query) {
        const reader = newUserDataReader(query.firestore);
        const filter = newQueryFilter(query._query, 'where', reader, query.firestore._databaseId, this._field, this._op, this._value);
        return new Query(query.firestore, query.converter, queryWithAddedFilter(query._query, filter));
    }
}
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
    const op = opStr;
    const field = fieldPathFromArgument('where', fieldPath);
    return new QueryFilterConstraint(field, op, value);
}
class QueryOrderByConstraint extends QueryConstraint {
    constructor(_field, _direction) {
        super();
        this._field = _field;
        this._direction = _direction;
        this.type = 'orderBy';
    }
    _apply(query) {
        const orderBy = newQueryOrderBy(query._query, this._field, this._direction);
        return new Query(query.firestore, query.converter, queryWithAddedOrderBy(query._query, orderBy));
    }
}
/**
 * Creates a `QueryConstraint` that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created `Query`.
 */
function orderBy(fieldPath, directionStr = 'asc') {
    const direction = directionStr;
    const path = fieldPathFromArgument('orderBy', fieldPath);
    return new QueryOrderByConstraint(path, direction);
}
class QueryLimitConstraint extends QueryConstraint {
    constructor(type, _limit, _limitType) {
        super();
        this.type = type;
        this._limit = _limit;
        this._limitType = _limitType;
    }
    _apply(query) {
        return new Query(query.firestore, query.converter, queryWithLimit(query._query, this._limit, this._limitType));
    }
}
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
class QueryStartAtConstraint extends QueryConstraint {
    constructor(type, _docOrFields, _before) {
        super();
        this.type = type;
        this._docOrFields = _docOrFields;
        this._before = _before;
    }
    _apply(query) {
        const bound = newQueryBoundFromDocOrFields(query, this.type, this._docOrFields, this._before);
        return new Query(query.firestore, query.converter, queryWithStartAt(query._query, bound));
    }
}
function startAt(...docOrFields) {
    return new QueryStartAtConstraint('startAt', docOrFields, /*before=*/ true);
}
function startAfter(...docOrFields) {
    return new QueryStartAtConstraint('startAfter', docOrFields, 
    /*before=*/ false);
}
class QueryEndAtConstraint extends QueryConstraint {
    constructor(type, _docOrFields, _before) {
        super();
        this.type = type;
        this._docOrFields = _docOrFields;
        this._before = _before;
    }
    _apply(query) {
        const bound = newQueryBoundFromDocOrFields(query, this.type, this._docOrFields, this._before);
        return new Query(query.firestore, query.converter, queryWithEndAt(query._query, bound));
    }
}
function endBefore(...docOrFields) {
    return new QueryEndAtConstraint('endBefore', docOrFields, /*before=*/ true);
}
function endAt(...docOrFields) {
    return new QueryEndAtConstraint('endAt', docOrFields, /*before=*/ false);
}
/** Helper function to create a bound from a document or fields */
function newQueryBoundFromDocOrFields(query, methodName, docOrFields, before) {
    docOrFields[0] = getModularInstance(docOrFields[0]);
    if (docOrFields[0] instanceof DocumentSnapshot$1) {
        return newQueryBoundFromDocument(query._query, query.firestore._databaseId, methodName, docOrFields[0]._document, before);
    }
    else {
        const reader = newUserDataReader(query.firestore);
        return newQueryBoundFromFields(query._query, query.firestore._databaseId, reader, methodName, docOrFields, before);
    }
}
function newQueryFilter(query, methodName, dataReader, databaseId, fieldPath, op, value) {
    let fieldValue;
    if (fieldPath.isKeyField()) {
        if (op === "array-contains" /* ARRAY_CONTAINS */ || op === "array-contains-any" /* ARRAY_CONTAINS_ANY */) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid Query. You can't perform '${op}' ` +
                'queries on FieldPath.documentId().');
        }
        else if (op === "in" /* IN */ || op === "not-in" /* NOT_IN */) {
            validateDisjunctiveFilterElements(value, op);
            const referenceList = [];
            for (const arrayValue of value) {
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
    const filter = FieldFilter.create(fieldPath, op, fieldValue);
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
    const orderBy = new OrderBy(fieldPath, direction);
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
        throw new FirestoreError(Code.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ` +
            `${methodName}().`);
    }
    const components = [];
    // Because people expect to continue/end a query at the exact document
    // provided, we need to use the implicit sort order rather than the explicit
    // sort order, because it's guaranteed to contain the document key. That way
    // the position becomes unambiguous and the query continues/ends exactly at
    // the provided document. Without the key (by using the explicit sort
    // orders), multiple documents could match the position, yielding duplicate
    // results.
    for (const orderBy of queryOrderBy(query)) {
        if (orderBy.field.isKeyField()) {
            components.push(refValue(databaseId, doc.key));
        }
        else {
            const value = doc.data.field(orderBy.field);
            if (isServerTimestamp(value)) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a ' +
                    'document for which the field "' +
                    orderBy.field +
                    '" is an uncommitted server timestamp. (Since the value of ' +
                    'this field is unknown, you cannot start/end a query with it.)');
            }
            else if (value !== null) {
                components.push(value);
            }
            else {
                const field = orderBy.field.canonicalString();
                throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a ` +
                    `document for which the field '${field}' (used as the ` +
                    `orderBy) does not exist.`);
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
    const orderBy = query.explicitOrderBy;
    if (values.length > orderBy.length) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Too many arguments provided to ${methodName}(). ` +
            `The number of arguments must be less than or equal to the ` +
            `number of orderBy() clauses`);
    }
    const components = [];
    for (let i = 0; i < values.length; i++) {
        const rawValue = values[i];
        const orderByComponent = orderBy[i];
        if (orderByComponent.field.isKeyField()) {
            if (typeof rawValue !== 'string') {
                throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ` +
                    `${methodName}(), but got a ${typeof rawValue}`);
            }
            if (!isCollectionGroupQuery(query) && rawValue.indexOf('/') !== -1) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by FieldPath.documentId(), ` +
                    `the value passed to ${methodName}() must be a plain document ID, but ` +
                    `'${rawValue}' contains a slash.`);
            }
            const path = query.path.child(ResourcePath.fromString(rawValue));
            if (!DocumentKey.isDocumentKey(path)) {
                throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by ` +
                    `FieldPath.documentId(), the value passed to ${methodName}() must result in a ` +
                    `valid document path, but '${path}' is not because it contains an odd number ` +
                    `of segments.`);
            }
            const key = new DocumentKey(path);
            components.push(refValue(databaseId, key));
        }
        else {
            const wrapped = parseQueryValue(dataReader, methodName, rawValue);
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
    documentIdValue = getModularInstance(documentIdValue);
    if (typeof documentIdValue === 'string') {
        if (documentIdValue === '') {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. When querying with FieldPath.documentId(), you ' +
                'must provide a valid document ID, but it was an empty string.');
        }
        if (!isCollectionGroupQuery(query) && documentIdValue.indexOf('/') !== -1) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying a collection by ` +
                `FieldPath.documentId(), you must provide a plain document ID, but ` +
                `'${documentIdValue}' contains a '/' character.`);
        }
        const path = query.path.child(ResourcePath.fromString(documentIdValue));
        if (!DocumentKey.isDocumentKey(path)) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying a collection group by ` +
                `FieldPath.documentId(), the value provided must result in a valid document path, ` +
                `but '${path}' is not because it has an odd number of segments (${path.length}).`);
        }
        return refValue(databaseId, new DocumentKey(path));
    }
    else if (documentIdValue instanceof DocumentReference) {
        return refValue(databaseId, documentIdValue._key);
    }
    else {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. When querying with FieldPath.documentId(), you must provide a valid ` +
            `string or a DocumentReference, but it was: ` +
            `${valueDescription(documentIdValue)}.`);
    }
}
/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */
function validateDisjunctiveFilterElements(value, operator) {
    if (!Array.isArray(value) || value.length === 0) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid Query. A non-empty array is required for ' +
            `'${operator.toString()}' filters.`);
    }
    if (value.length > 10) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid Query. '${operator.toString()}' filters support a ` +
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
        const existingField = getInequalityFilterField(query);
        if (existingField !== null && !existingField.isEqual(filter.field)) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. All where filters with an inequality' +
                ' (<, <=, !=, not-in, >, or >=) must be on the same field. But you have' +
                ` inequality filters on '${existingField.toString()}'` +
                ` and '${filter.field.toString()}'`);
        }
        const firstOrderByField = getFirstOrderByField(query);
        if (firstOrderByField !== null) {
            validateOrderByAndInequalityMatch(query, filter.field, firstOrderByField);
        }
    }
    const conflictingOp = findFilterOperator(query, conflictingOps(filter.op));
    if (conflictingOp !== null) {
        // Special case when it's a duplicate op to give a slightly clearer error message.
        if (conflictingOp === filter.op) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid query. You cannot use more than one ' +
                `'${filter.op.toString()}' filter.`);
        }
        else {
            throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. You cannot use '${filter.op.toString()}' filters ` +
                `with '${conflictingOp.toString()}' filters.`);
        }
    }
}
function validateNewOrderBy(query, orderBy) {
    if (getFirstOrderByField(query) === null) {
        // This is the first order by. It must match any inequality.
        const inequalityField = getInequalityFilterField(query);
        if (inequalityField !== null) {
            validateOrderByAndInequalityMatch(query, inequalityField, orderBy.field);
        }
    }
}
function validateOrderByAndInequalityMatch(baseQuery, inequality, orderBy) {
    if (!orderBy.isEqual(inequality)) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality ` +
            `(<, <=, !=, not-in, >, or >=) on field '${inequality.toString()}' ` +
            `and so you must also use '${inequality.toString()}' ` +
            `as your first argument to orderBy(), but your first orderBy() ` +
            `is on field '${orderBy.toString()}' instead.`);
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
class AbstractUserDataWriter {
    convertValue(value, serverTimestampBehavior = 'none') {
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
    }
    convertObject(mapValue, serverTimestampBehavior) {
        const result = {};
        forEach(mapValue.fields, (key, value) => {
            result[key] = this.convertValue(value, serverTimestampBehavior);
        });
        return result;
    }
    convertGeoPoint(value) {
        return new GeoPoint(normalizeNumber(value.latitude), normalizeNumber(value.longitude));
    }
    convertArray(arrayValue, serverTimestampBehavior) {
        return (arrayValue.values || []).map(value => this.convertValue(value, serverTimestampBehavior));
    }
    convertServerTimestamp(value, serverTimestampBehavior) {
        switch (serverTimestampBehavior) {
            case 'previous':
                const previousValue = getPreviousValue(value);
                if (previousValue == null) {
                    return null;
                }
                return this.convertValue(previousValue, serverTimestampBehavior);
            case 'estimate':
                return this.convertTimestamp(getLocalWriteTime(value));
            default:
                return null;
        }
    }
    convertTimestamp(value) {
        const normalizedValue = normalizeTimestamp(value);
        return new Timestamp(normalizedValue.seconds, normalizedValue.nanos);
    }
    convertDocumentKey(name, expectedDatabaseId) {
        const resourcePath = ResourcePath.fromString(name);
        hardAssert(isValidResourceName(resourcePath));
        const databaseId = new DatabaseId(resourcePath.get(1), resourcePath.get(3));
        const key = new DocumentKey(resourcePath.popFirst(5));
        if (!databaseId.isEqual(expectedDatabaseId)) {
            // TODO(b/64130202): Somehow support foreign references.
            logError(`Document ${key} contains a document ` +
                `reference within a different database (` +
                `${databaseId.projectId}/${databaseId.database}) which is not ` +
                `supported. It will be treated as a reference in the current ` +
                `database (${expectedDatabaseId.projectId}/${expectedDatabaseId.database}) ` +
                `instead.`);
        }
        return key;
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
 * Converts custom model object of type T into DocumentData by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to DocumentData
 * because we want to provide the user with a more specific error message if
 * their set() or fails due to invalid data originating from a toFirestore()
 * call.
 */
function applyFirestoreDataConverter(converter, value, options) {
    let convertedValue;
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
class LiteUserDataWriter extends AbstractUserDataWriter {
    constructor(firestore) {
        super();
        this.firestore = firestore;
    }
    convertBytes(bytes) {
        return new Bytes(bytes);
    }
    convertReference(name) {
        const key = this.convertDocumentKey(name, this.firestore._databaseId);
        return new DocumentReference(this.firestore, /* converter= */ null, key);
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
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */
class WriteBatch {
    /** @hideconstructor */
    constructor(_firestore, _commitHandler) {
        this._firestore = _firestore;
        this._commitHandler = _commitHandler;
        this._mutations = [];
        this._committed = false;
        this._dataReader = newUserDataReader(_firestore);
    }
    set(documentRef, data, options) {
        this._verifyNotCommitted();
        const ref = validateReference(documentRef, this._firestore);
        const convertedValue = applyFirestoreDataConverter(ref.converter, data, options);
        const parsed = parseSetData(this._dataReader, 'WriteBatch.set', ref._key, convertedValue, ref.converter !== null, options);
        this._mutations.push(parsed.toMutation(ref._key, Precondition.none()));
        return this;
    }
    update(documentRef, fieldOrUpdateData, value, ...moreFieldsAndValues) {
        this._verifyNotCommitted();
        const ref = validateReference(documentRef, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        fieldOrUpdateData = getModularInstance(fieldOrUpdateData);
        let parsed;
        if (typeof fieldOrUpdateData === 'string' ||
            fieldOrUpdateData instanceof FieldPath) {
            parsed = parseUpdateVarargs(this._dataReader, 'WriteBatch.update', ref._key, fieldOrUpdateData, value, moreFieldsAndValues);
        }
        else {
            parsed = parseUpdateData(this._dataReader, 'WriteBatch.update', ref._key, fieldOrUpdateData);
        }
        this._mutations.push(parsed.toMutation(ref._key, Precondition.exists(true)));
        return this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */
    delete(documentRef) {
        this._verifyNotCommitted();
        const ref = validateReference(documentRef, this._firestore);
        this._mutations = this._mutations.concat(new DeleteMutation(ref._key, Precondition.none()));
        return this;
    }
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
    commit() {
        this._verifyNotCommitted();
        this._committed = true;
        if (this._mutations.length > 0) {
            return this._commitHandler(this._mutations);
        }
        return Promise.resolve();
    }
    _verifyNotCommitted() {
        if (this._committed) {
            throw new FirestoreError(Code.FAILED_PRECONDITION, 'A write batch can no longer be used after commit() ' +
                'has been called.');
        }
    }
}
function validateReference(documentRef, firestore) {
    documentRef = getModularInstance(documentRef);
    if (documentRef.firestore !== firestore) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, 'Provided document reference is from a different Firestore instance.');
    }
    else {
        return documentRef;
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
// TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
// legacy SDK.
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */
class Transaction$1 {
    /** @hideconstructor */
    constructor(_firestore, _transaction) {
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
    get(documentRef) {
        const ref = validateReference(documentRef, this._firestore);
        const userDataWriter = new LiteUserDataWriter(this._firestore);
        return this._transaction.lookup([ref._key]).then(docs => {
            if (!docs || docs.length !== 1) {
                return fail();
            }
            const doc = docs[0];
            if (doc.isFoundDocument()) {
                return new DocumentSnapshot$1(this._firestore, userDataWriter, doc.key, doc, ref.converter);
            }
            else if (doc.isNoDocument()) {
                return new DocumentSnapshot$1(this._firestore, userDataWriter, ref._key, null, ref.converter);
            }
            else {
                throw fail();
            }
        });
    }
    set(documentRef, value, options) {
        const ref = validateReference(documentRef, this._firestore);
        const convertedValue = applyFirestoreDataConverter(ref.converter, value, options);
        const parsed = parseSetData(this._dataReader, 'Transaction.set', ref._key, convertedValue, ref.converter !== null, options);
        this._transaction.set(ref._key, parsed);
        return this;
    }
    update(documentRef, fieldOrUpdateData, value, ...moreFieldsAndValues) {
        const ref = validateReference(documentRef, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        fieldOrUpdateData = getModularInstance(fieldOrUpdateData);
        let parsed;
        if (typeof fieldOrUpdateData === 'string' ||
            fieldOrUpdateData instanceof FieldPath) {
            parsed = parseUpdateVarargs(this._dataReader, 'Transaction.update', ref._key, fieldOrUpdateData, value, moreFieldsAndValues);
        }
        else {
            parsed = parseUpdateData(this._dataReader, 'Transaction.update', ref._key, fieldOrUpdateData);
        }
        this._transaction.update(ref._key, parsed);
        return this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */
    delete(documentRef) {
        const ref = validateReference(documentRef, this._firestore);
        this._transaction.delete(ref._key);
        return this;
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
 */
function getDoc(reference) {
    reference = cast(reference, DocumentReference);
    const firestore = cast(reference.firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientGetDocumentViaSnapshotListener(client, reference._key).then(snapshot => convertToDocSnapshot(firestore, reference, snapshot));
}
class ExpUserDataWriter extends AbstractUserDataWriter {
    constructor(firestore) {
        super();
        this.firestore = firestore;
    }
    convertBytes(bytes) {
        return new Bytes(bytes);
    }
    convertReference(name) {
        const key = this.convertDocumentKey(name, this.firestore._databaseId);
        return new DocumentReference(this.firestore, /* converter= */ null, key);
    }
}
/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */
function getDocFromCache(reference) {
    reference = cast(reference, DocumentReference);
    const firestore = cast(reference.firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    const userDataWriter = new ExpUserDataWriter(firestore);
    return firestoreClientGetDocumentFromLocalCache(client, reference._key).then(doc => new DocumentSnapshot(firestore, userDataWriter, reference._key, doc, new SnapshotMetadata(doc !== null && doc.hasLocalMutations, 
    /* fromCache= */ true), reference.converter));
}
/**
 * Reads the document referred to by this `DocumentReference` from the server.
 * Returns an error if the network is not available.
 *
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */
function getDocFromServer(reference) {
    reference = cast(reference, DocumentReference);
    const firestore = cast(reference.firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientGetDocumentViaSnapshotListener(client, reference._key, {
        source: 'server'
    }).then(snapshot => convertToDocSnapshot(firestore, reference, snapshot));
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
 */
function getDocs(query) {
    query = cast(query, Query);
    const firestore = cast(query.firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    const userDataWriter = new ExpUserDataWriter(firestore);
    validateHasExplicitOrderByForLimitToLast(query._query);
    return firestoreClientGetDocumentsViaSnapshotListener(client, query._query).then(snapshot => new QuerySnapshot(firestore, userDataWriter, query, snapshot));
}
/**
 * Executes the query and returns the results as a `QuerySnapshot` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A Promise that will be resolved with the results of the query.
 */
function getDocsFromCache(query) {
    query = cast(query, Query);
    const firestore = cast(query.firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    const userDataWriter = new ExpUserDataWriter(firestore);
    return firestoreClientGetDocumentsFromLocalCache(client, query._query).then(snapshot => new QuerySnapshot(firestore, userDataWriter, query, snapshot));
}
/**
 * Executes the query and returns the results as a `QuerySnapshot` from the
 * server. Returns an error if the network is not available.
 *
 * @returns A Promise that will be resolved with the results of the query.
 */
function getDocsFromServer(query) {
    query = cast(query, Query);
    const firestore = cast(query.firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    const userDataWriter = new ExpUserDataWriter(firestore);
    return firestoreClientGetDocumentsViaSnapshotListener(client, query._query, {
        source: 'server'
    }).then(snapshot => new QuerySnapshot(firestore, userDataWriter, query, snapshot));
}
function setDoc(reference, data, options) {
    reference = cast(reference, DocumentReference);
    const firestore = cast(reference.firestore, FirebaseFirestore);
    const convertedValue = applyFirestoreDataConverter(reference.converter, data, options);
    const dataReader = newUserDataReader(firestore);
    const parsed = parseSetData(dataReader, 'setDoc', reference._key, convertedValue, reference.converter !== null, options);
    const mutation = parsed.toMutation(reference._key, Precondition.none());
    return executeWrite(firestore, [mutation]);
}
function updateDoc(reference, fieldOrUpdateData, value, ...moreFieldsAndValues) {
    reference = cast(reference, DocumentReference);
    const firestore = cast(reference.firestore, FirebaseFirestore);
    const dataReader = newUserDataReader(firestore);
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    fieldOrUpdateData = getModularInstance(fieldOrUpdateData);
    let parsed;
    if (typeof fieldOrUpdateData === 'string' ||
        fieldOrUpdateData instanceof FieldPath) {
        parsed = parseUpdateVarargs(dataReader, 'updateDoc', reference._key, fieldOrUpdateData, value, moreFieldsAndValues);
    }
    else {
        parsed = parseUpdateData(dataReader, 'updateDoc', reference._key, fieldOrUpdateData);
    }
    const mutation = parsed.toMutation(reference._key, Precondition.exists(true));
    return executeWrite(firestore, [mutation]);
}
/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */
function deleteDoc(reference) {
    const firestore = cast(reference.firestore, FirebaseFirestore);
    const mutations = [new DeleteMutation(reference._key, Precondition.none())];
    return executeWrite(firestore, mutations);
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
 */
function addDoc(reference, data) {
    const firestore = cast(reference.firestore, FirebaseFirestore);
    const docRef = doc(reference);
    const convertedValue = applyFirestoreDataConverter(reference.converter, data);
    const dataReader = newUserDataReader(reference.firestore);
    const parsed = parseSetData(dataReader, 'addDoc', docRef._key, convertedValue, reference.converter !== null, {});
    const mutation = parsed.toMutation(docRef._key, Precondition.exists(false));
    return executeWrite(firestore, [mutation]).then(() => docRef);
}
function onSnapshot(reference, ...args) {
    var _a, _b, _c;
    reference = getModularInstance(reference);
    let options = {
        includeMetadataChanges: false
    };
    let currArg = 0;
    if (typeof args[currArg] === 'object' && !isPartialObserver(args[currArg])) {
        options = args[currArg];
        currArg++;
    }
    const internalOptions = {
        includeMetadataChanges: options.includeMetadataChanges
    };
    if (isPartialObserver(args[currArg])) {
        const userObserver = args[currArg];
        args[currArg] = (_a = userObserver.next) === null || _a === void 0 ? void 0 : _a.bind(userObserver);
        args[currArg + 1] = (_b = userObserver.error) === null || _b === void 0 ? void 0 : _b.bind(userObserver);
        args[currArg + 2] = (_c = userObserver.complete) === null || _c === void 0 ? void 0 : _c.bind(userObserver);
    }
    let observer;
    let firestore;
    let internalQuery;
    if (reference instanceof DocumentReference) {
        firestore = cast(reference.firestore, FirebaseFirestore);
        internalQuery = newQueryForPath(reference._key.path);
        observer = {
            next: snapshot => {
                if (args[currArg]) {
                    args[currArg](convertToDocSnapshot(firestore, reference, snapshot));
                }
            },
            error: args[currArg + 1],
            complete: args[currArg + 2]
        };
    }
    else {
        const query = cast(reference, Query);
        firestore = cast(query.firestore, FirebaseFirestore);
        internalQuery = query._query;
        const userDataWriter = new ExpUserDataWriter(firestore);
        observer = {
            next: snapshot => {
                if (args[currArg]) {
                    args[currArg](new QuerySnapshot(firestore, userDataWriter, query, snapshot));
                }
            },
            error: args[currArg + 1],
            complete: args[currArg + 2]
        };
        validateHasExplicitOrderByForLimitToLast(reference._query);
    }
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientListen(client, internalQuery, internalOptions, observer);
}
function onSnapshotsInSync(firestore, arg) {
    firestore = cast(firestore, FirebaseFirestore);
    const client = ensureFirestoreConfigured(firestore);
    const observer = isPartialObserver(arg)
        ? arg
        : {
            next: arg
        };
    return firestoreClientAddSnapshotsInSyncListener(client, observer);
}
/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */
function executeWrite(firestore, mutations) {
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientWrite(client, mutations);
}
/**
 * Converts a ViewSnapshot that contains the single document specified by `ref`
 * to a DocumentSnapshot.
 */
function convertToDocSnapshot(firestore, ref, snapshot) {
    const doc = snapshot.docs.get(ref._key);
    const userDataWriter = new ExpUserDataWriter(firestore);
    return new DocumentSnapshot(firestore, userDataWriter, ref._key, doc, new SnapshotMetadata(snapshot.hasPendingWrites, snapshot.fromCache), ref.converter);
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
 */
class Transaction extends Transaction$1 {
    // This class implements the same logic as the Transaction API in the Lite SDK
    // but is subclassed in order to return its own DocumentSnapshot types.
    /** @hideconstructor */
    constructor(_firestore, _transaction) {
        super(_firestore, _transaction);
        this._firestore = _firestore;
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */
    get(documentRef) {
        const ref = validateReference(documentRef, this._firestore);
        const userDataWriter = new ExpUserDataWriter(this._firestore);
        return super
            .get(documentRef)
            .then(liteDocumentSnapshot => new DocumentSnapshot(this._firestore, userDataWriter, ref._key, liteDocumentSnapshot._document, new SnapshotMetadata(
        /* hasPendingWrites= */ false, 
        /* fromCache= */ false), ref.converter));
    }
}
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
    const client = ensureFirestoreConfigured(firestore);
    return firestoreClientTransaction(client, internalTransaction => updateFunction(new Transaction(firestore, internalTransaction)));
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
function arrayUnion(...elements) {
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
function arrayRemove(...elements) {
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
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single WriteBatch
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A `WriteBatch` that can be used to atomically execute multiple
 * writes.
 */
function writeBatch(firestore) {
    firestore = cast(firestore, FirebaseFirestore);
    ensureFirestoreConfigured(firestore);
    return new WriteBatch(firestore, mutations => executeWrite(firestore, mutations));
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
registerFirestore('node');

export { AbstractUserDataWriter, Bytes, CACHE_SIZE_UNLIMITED, CollectionReference, DocumentReference, DocumentSnapshot, FieldPath, FieldValue, FirebaseFirestore, FirestoreError, GeoPoint, LoadBundleTask, Query, QueryConstraint, QueryDocumentSnapshot, QuerySnapshot, SnapshotMetadata, Timestamp, Transaction, WriteBatch, addDoc, arrayRemove, arrayUnion, clearIndexedDbPersistence, collection, collectionGroup, deleteDoc, deleteField, disableNetwork, doc, documentId, enableIndexedDbPersistence, enableMultiTabIndexedDbPersistence, enableNetwork, endAt, endBefore, ensureFirestoreConfigured, executeWrite, getDoc, getDocFromCache, getDocFromServer, getDocs, getDocsFromCache, getDocsFromServer, getFirestore, increment, initializeFirestore, limit, limitToLast, loadBundle, namedQuery, onSnapshot, onSnapshotsInSync, orderBy, query, queryEqual, refEqual, runTransaction, serverTimestamp, setDoc, setLogLevel, snapshotEqual, startAfter, startAt, terminate, updateDoc, useFirestoreEmulator, waitForPendingWrites, where, writeBatch };
//# sourceMappingURL=index.node.esm2017.js.map
