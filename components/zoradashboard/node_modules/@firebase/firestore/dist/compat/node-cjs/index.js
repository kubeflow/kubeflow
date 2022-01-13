'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var firebase = require('@firebase/app-compat');
var util = require('@firebase/util');
var firestore = require('@firebase/firestore');
var logger = require('@firebase/logger');
var util$1 = require('util');
var component = require('@firebase/component');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var firebase__default = /*#__PURE__*/_interopDefaultLegacy(firebase);

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
var version$1 = "8.8.0";
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
var SDK_VERSION = version$1;
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
function setLogLevel$1(logLevel) {
    logClient.setLogLevel(logLevel);
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
function validateSetOptions(methodName, options) {
    if (options === undefined) {
        return {
            merge: false
        };
    }
    if (options.mergeFields !== undefined && options.merge !== undefined) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, "Invalid options passed to function " + methodName + "(): You cannot " +
            'specify both "merge" and "mergeFields".');
    }
    return options;
}
/**
 * Validates that two boolean options are not set at the same time.
 */
function validateIsNotUsedTogether(optionName1, argument1, optionName2, argument2) {
    if (argument1 === true && argument2 === true) {
        throw new FirestoreError(Code.INVALID_ARGUMENT, optionName1 + " and " + optionName2 + " cannot be used together.");
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
var Blob = /** @class */ (function () {
    function Blob(_delegate) {
        this._delegate = _delegate;
    }
    Blob.fromBase64String = function (base64) {
        return new Blob(firestore.Bytes.fromBase64String(base64));
    };
    Blob.fromUint8Array = function (array) {
        assertUint8ArrayAvailable();
        return new Blob(firestore.Bytes.fromUint8Array(array));
    };
    Blob.prototype.toBase64 = function () {
        return this._delegate.toBase64();
    };
    Blob.prototype.toUint8Array = function () {
        assertUint8ArrayAvailable();
        return this._delegate.toUint8Array();
    };
    Blob.prototype.isEqual = function (other) {
        return this._delegate.isEqual(other._delegate);
    };
    Blob.prototype.toString = function () {
        return 'Blob(base64: ' + this.toBase64() + ')';
    };
    return Blob;
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
    var object = obj;
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
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
var IndexedDbPersistenceProvider = /** @class */ (function () {
    function IndexedDbPersistenceProvider() {
    }
    IndexedDbPersistenceProvider.prototype.enableIndexedDbPersistence = function (firestore$1, forceOwnership) {
        return firestore.enableIndexedDbPersistence(firestore$1._delegate, { forceOwnership: forceOwnership });
    };
    IndexedDbPersistenceProvider.prototype.enableMultiTabIndexedDbPersistence = function (firestore$1) {
        return firestore.enableMultiTabIndexedDbPersistence(firestore$1._delegate);
    };
    IndexedDbPersistenceProvider.prototype.clearIndexedDbPersistence = function (firestore$1) {
        return firestore.clearIndexedDbPersistence(firestore$1._delegate);
    };
    return IndexedDbPersistenceProvider;
}());
/**
 * Compat class for Firestore. Exposes Firestore Legacy API, but delegates
 * to the functional API of firestore-exp.
 */
var Firestore = /** @class */ (function () {
    function Firestore(databaseIdOrApp, _delegate, _persistenceProvider) {
        var _this = this;
        this._delegate = _delegate;
        this._persistenceProvider = _persistenceProvider;
        this.INTERNAL = {
            delete: function () { return _this.terminate(); }
        };
        if (!(databaseIdOrApp instanceof DatabaseId)) {
            this._appCompat = databaseIdOrApp;
        }
    }
    Object.defineProperty(Firestore.prototype, "_databaseId", {
        get: function () {
            return this._delegate._databaseId;
        },
        enumerable: false,
        configurable: true
    });
    Firestore.prototype.settings = function (settingsLiteral) {
        var currentSettings = this._delegate._getSettings();
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
    };
    Firestore.prototype.useEmulator = function (host, port, options) {
        if (options === void 0) { options = {}; }
        firestore.useFirestoreEmulator(this._delegate, host, port, options);
    };
    Firestore.prototype.enableNetwork = function () {
        return firestore.enableNetwork(this._delegate);
    };
    Firestore.prototype.disableNetwork = function () {
        return firestore.disableNetwork(this._delegate);
    };
    Firestore.prototype.enablePersistence = function (settings) {
        var synchronizeTabs = false;
        var experimentalForceOwningTab = false;
        if (settings) {
            synchronizeTabs = !!settings.synchronizeTabs;
            experimentalForceOwningTab = !!settings.experimentalForceOwningTab;
            validateIsNotUsedTogether('synchronizeTabs', synchronizeTabs, 'experimentalForceOwningTab', experimentalForceOwningTab);
        }
        return synchronizeTabs
            ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(this)
            : this._persistenceProvider.enableIndexedDbPersistence(this, experimentalForceOwningTab);
    };
    Firestore.prototype.clearPersistence = function () {
        return this._persistenceProvider.clearIndexedDbPersistence(this);
    };
    Firestore.prototype.terminate = function () {
        if (this._appCompat) {
            this._appCompat._removeServiceInstance('firestore');
            this._appCompat._removeServiceInstance('firestore-exp');
        }
        return this._delegate._delete();
    };
    Firestore.prototype.waitForPendingWrites = function () {
        return firestore.waitForPendingWrites(this._delegate);
    };
    Firestore.prototype.onSnapshotsInSync = function (arg) {
        return firestore.onSnapshotsInSync(this._delegate, arg);
    };
    Object.defineProperty(Firestore.prototype, "app", {
        get: function () {
            if (!this._appCompat) {
                throw new FirestoreError(Code.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is " +
                    'not available');
            }
            return this._appCompat;
        },
        enumerable: false,
        configurable: true
    });
    Firestore.prototype.collection = function (pathString) {
        try {
            return new CollectionReference(this, firestore.collection(this._delegate, pathString));
        }
        catch (e) {
            throw replaceFunctionName(e, 'collection()', 'Firestore.collection()');
        }
    };
    Firestore.prototype.doc = function (pathString) {
        try {
            return new DocumentReference(this, firestore.doc(this._delegate, pathString));
        }
        catch (e) {
            throw replaceFunctionName(e, 'doc()', 'Firestore.doc()');
        }
    };
    Firestore.prototype.collectionGroup = function (collectionId) {
        try {
            return new Query(this, firestore.collectionGroup(this._delegate, collectionId));
        }
        catch (e) {
            throw replaceFunctionName(e, 'collectionGroup()', 'Firestore.collectionGroup()');
        }
    };
    Firestore.prototype.runTransaction = function (updateFunction) {
        var _this = this;
        return firestore.runTransaction(this._delegate, function (transaction) { return updateFunction(new Transaction(_this, transaction)); });
    };
    Firestore.prototype.batch = function () {
        var _this = this;
        firestore.ensureFirestoreConfigured(this._delegate);
        return new WriteBatch(new firestore.WriteBatch(this._delegate, function (mutations) { return firestore.executeWrite(_this._delegate, mutations); }));
    };
    Firestore.prototype.loadBundle = function (bundleData) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, '"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?');
    };
    Firestore.prototype.namedQuery = function (name) {
        throw new FirestoreError(Code.FAILED_PRECONDITION, '"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?');
    };
    return Firestore;
}());
var UserDataWriter = /** @class */ (function (_super) {
    tslib.__extends(UserDataWriter, _super);
    function UserDataWriter(firestore) {
        var _this = _super.call(this) || this;
        _this.firestore = firestore;
        return _this;
    }
    UserDataWriter.prototype.convertBytes = function (bytes) {
        return new Blob(new firestore.Bytes(bytes));
    };
    UserDataWriter.prototype.convertReference = function (name) {
        var key = this.convertDocumentKey(name, this.firestore._databaseId);
        return DocumentReference.forKey(key, this.firestore, /* converter= */ null);
    };
    return UserDataWriter;
}(firestore.AbstractUserDataWriter));
function setLogLevel(level) {
    setLogLevel$1(level);
}
/**
 * A reference to a transaction.
 */
var Transaction = /** @class */ (function () {
    function Transaction(_firestore, _delegate) {
        this._firestore = _firestore;
        this._delegate = _delegate;
        this._userDataWriter = new UserDataWriter(_firestore);
    }
    Transaction.prototype.get = function (documentRef) {
        var _this = this;
        var ref = castReference(documentRef);
        return this._delegate
            .get(ref)
            .then(function (result) { return new DocumentSnapshot(_this._firestore, new firestore.DocumentSnapshot(_this._firestore._delegate, _this._userDataWriter, result._key, result._document, result.metadata, ref.converter)); });
    };
    Transaction.prototype.set = function (documentRef, data, options) {
        var ref = castReference(documentRef);
        if (options) {
            validateSetOptions('Transaction.set', options);
            this._delegate.set(ref, data, options);
        }
        else {
            this._delegate.set(ref, data);
        }
        return this;
    };
    Transaction.prototype.update = function (documentRef, dataOrField, value) {
        var _c;
        var moreFieldsAndValues = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            moreFieldsAndValues[_i - 3] = arguments[_i];
        }
        var ref = castReference(documentRef);
        if (arguments.length === 2) {
            this._delegate.update(ref, dataOrField);
        }
        else {
            (_c = this._delegate).update.apply(_c, tslib.__spreadArray([ref, dataOrField, value], moreFieldsAndValues));
        }
        return this;
    };
    Transaction.prototype.delete = function (documentRef) {
        var ref = castReference(documentRef);
        this._delegate.delete(ref);
        return this;
    };
    return Transaction;
}());
var WriteBatch = /** @class */ (function () {
    function WriteBatch(_delegate) {
        this._delegate = _delegate;
    }
    WriteBatch.prototype.set = function (documentRef, data, options) {
        var ref = castReference(documentRef);
        if (options) {
            validateSetOptions('WriteBatch.set', options);
            this._delegate.set(ref, data, options);
        }
        else {
            this._delegate.set(ref, data);
        }
        return this;
    };
    WriteBatch.prototype.update = function (documentRef, dataOrField, value) {
        var _c;
        var moreFieldsAndValues = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            moreFieldsAndValues[_i - 3] = arguments[_i];
        }
        var ref = castReference(documentRef);
        if (arguments.length === 2) {
            this._delegate.update(ref, dataOrField);
        }
        else {
            (_c = this._delegate).update.apply(_c, tslib.__spreadArray([ref, dataOrField, value], moreFieldsAndValues));
        }
        return this;
    };
    WriteBatch.prototype.delete = function (documentRef) {
        var ref = castReference(documentRef);
        this._delegate.delete(ref);
        return this;
    };
    WriteBatch.prototype.commit = function () {
        return this._delegate.commit();
    };
    return WriteBatch;
}());
/**
 * Wraps a `PublicFirestoreDataConverter` translating the types from the
 * experimental SDK into corresponding types from the Classic SDK before passing
 * them to the wrapped converter.
 */
var FirestoreDataConverter = /** @class */ (function () {
    function FirestoreDataConverter(_firestore, _userDataWriter, _delegate) {
        this._firestore = _firestore;
        this._userDataWriter = _userDataWriter;
        this._delegate = _delegate;
    }
    FirestoreDataConverter.prototype.fromFirestore = function (snapshot, options) {
        var expSnapshot = new firestore.QueryDocumentSnapshot(this._firestore._delegate, this._userDataWriter, snapshot._key, snapshot._document, snapshot.metadata, 
        /* converter= */ null);
        return this._delegate.fromFirestore(new QueryDocumentSnapshot(this._firestore, expSnapshot), options !== null && options !== void 0 ? options : {});
    };
    FirestoreDataConverter.prototype.toFirestore = function (modelObject, options) {
        if (!options) {
            return this._delegate.toFirestore(modelObject);
        }
        else {
            return this._delegate.toFirestore(modelObject, options);
        }
    };
    // Use the same instance of `FirestoreDataConverter` for the given instances
    // of `Firestore` and `PublicFirestoreDataConverter` so that isEqual() will
    // compare equal for two objects created with the same converter instance.
    FirestoreDataConverter.getInstance = function (firestore, converter) {
        var converterMapByFirestore = FirestoreDataConverter.INSTANCES;
        var untypedConverterByConverter = converterMapByFirestore.get(firestore);
        if (!untypedConverterByConverter) {
            untypedConverterByConverter = new WeakMap();
            converterMapByFirestore.set(firestore, untypedConverterByConverter);
        }
        var instance = untypedConverterByConverter.get(converter);
        if (!instance) {
            instance = new FirestoreDataConverter(firestore, new UserDataWriter(firestore), converter);
            untypedConverterByConverter.set(converter, instance);
        }
        return instance;
    };
    return FirestoreDataConverter;
}());
FirestoreDataConverter.INSTANCES = new WeakMap();
/**
 * A reference to a particular document in a collection in the database.
 */
var DocumentReference = /** @class */ (function () {
    function DocumentReference(firestore, _delegate) {
        this.firestore = firestore;
        this._delegate = _delegate;
        this._userDataWriter = new UserDataWriter(firestore);
    }
    DocumentReference.forPath = function (path, firestore$1, converter) {
        if (path.length % 2 !== 0) {
            throw new FirestoreError(Code.INVALID_ARGUMENT, 'Invalid document reference. Document ' +
                'references must have an even number of segments, but ' +
                (path.canonicalString() + " has " + path.length));
        }
        return new DocumentReference(firestore$1, new firestore.DocumentReference(firestore$1._delegate, converter, new DocumentKey(path)));
    };
    DocumentReference.forKey = function (key, firestore$1, converter) {
        return new DocumentReference(firestore$1, new firestore.DocumentReference(firestore$1._delegate, converter, key));
    };
    Object.defineProperty(DocumentReference.prototype, "id", {
        get: function () {
            return this._delegate.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentReference.prototype, "parent", {
        get: function () {
            return new CollectionReference(this.firestore, this._delegate.parent);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentReference.prototype, "path", {
        get: function () {
            return this._delegate.path;
        },
        enumerable: false,
        configurable: true
    });
    DocumentReference.prototype.collection = function (pathString) {
        try {
            return new CollectionReference(this.firestore, firestore.collection(this._delegate, pathString));
        }
        catch (e) {
            throw replaceFunctionName(e, 'collection()', 'DocumentReference.collection()');
        }
    };
    DocumentReference.prototype.isEqual = function (other) {
        other = util.getModularInstance(other);
        if (!(other instanceof firestore.DocumentReference)) {
            return false;
        }
        return firestore.refEqual(this._delegate, other);
    };
    DocumentReference.prototype.set = function (value, options) {
        options = validateSetOptions('DocumentReference.set', options);
        try {
            return firestore.setDoc(this._delegate, value, options);
        }
        catch (e) {
            throw replaceFunctionName(e, 'setDoc()', 'DocumentReference.set()');
        }
    };
    DocumentReference.prototype.update = function (fieldOrUpdateData, value) {
        var moreFieldsAndValues = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            moreFieldsAndValues[_i - 2] = arguments[_i];
        }
        try {
            if (arguments.length === 1) {
                return firestore.updateDoc(this._delegate, fieldOrUpdateData);
            }
            else {
                return firestore.updateDoc.apply(void 0, tslib.__spreadArray([this._delegate, fieldOrUpdateData, value], moreFieldsAndValues));
            }
        }
        catch (e) {
            throw replaceFunctionName(e, 'updateDoc()', 'DocumentReference.update()');
        }
    };
    DocumentReference.prototype.delete = function () {
        return firestore.deleteDoc(this._delegate);
    };
    DocumentReference.prototype.onSnapshot = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var options = extractSnapshotOptions(args);
        var observer = wrapObserver(args, function (result) { return new DocumentSnapshot(_this.firestore, new firestore.DocumentSnapshot(_this.firestore._delegate, _this._userDataWriter, result._key, result._document, result.metadata, _this._delegate.converter)); });
        return firestore.onSnapshot(this._delegate, options, observer);
    };
    DocumentReference.prototype.get = function (options) {
        var _this = this;
        var snap;
        if ((options === null || options === void 0 ? void 0 : options.source) === 'cache') {
            snap = firestore.getDocFromCache(this._delegate);
        }
        else if ((options === null || options === void 0 ? void 0 : options.source) === 'server') {
            snap = firestore.getDocFromServer(this._delegate);
        }
        else {
            snap = firestore.getDoc(this._delegate);
        }
        return snap.then(function (result) { return new DocumentSnapshot(_this.firestore, new firestore.DocumentSnapshot(_this.firestore._delegate, _this._userDataWriter, result._key, result._document, result.metadata, _this._delegate.converter)); });
    };
    DocumentReference.prototype.withConverter = function (converter) {
        return new DocumentReference(this.firestore, converter
            ? this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore, converter))
            : this._delegate.withConverter(null));
    };
    return DocumentReference;
}());
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
    for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
        var arg = args_1[_i];
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
    var userObserver;
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
        next: function (val) {
            if (userObserver.next) {
                userObserver.next(wrapper(val));
            }
        },
        error: (_a = userObserver.error) === null || _a === void 0 ? void 0 : _a.bind(userObserver),
        complete: (_b = userObserver.complete) === null || _b === void 0 ? void 0 : _b.bind(userObserver)
    };
}
var DocumentSnapshot = /** @class */ (function () {
    function DocumentSnapshot(_firestore, _delegate) {
        this._firestore = _firestore;
        this._delegate = _delegate;
    }
    Object.defineProperty(DocumentSnapshot.prototype, "ref", {
        get: function () {
            return new DocumentReference(this._firestore, this._delegate.ref);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentSnapshot.prototype, "id", {
        get: function () {
            return this._delegate.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentSnapshot.prototype, "metadata", {
        get: function () {
            return this._delegate.metadata;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentSnapshot.prototype, "exists", {
        get: function () {
            return this._delegate.exists();
        },
        enumerable: false,
        configurable: true
    });
    DocumentSnapshot.prototype.data = function (options) {
        return this._delegate.data(options);
    };
    DocumentSnapshot.prototype.get = function (fieldPath, options
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        return this._delegate.get(fieldPath, options);
    };
    DocumentSnapshot.prototype.isEqual = function (other) {
        return firestore.snapshotEqual(this._delegate, other._delegate);
    };
    return DocumentSnapshot;
}());
var QueryDocumentSnapshot = /** @class */ (function (_super) {
    tslib.__extends(QueryDocumentSnapshot, _super);
    function QueryDocumentSnapshot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryDocumentSnapshot.prototype.data = function (options) {
        var data = this._delegate.data(options);
        return data;
    };
    return QueryDocumentSnapshot;
}(DocumentSnapshot));
var Query = /** @class */ (function () {
    function Query(firestore, _delegate) {
        this.firestore = firestore;
        this._delegate = _delegate;
        this._userDataWriter = new UserDataWriter(firestore);
    }
    Query.prototype.where = function (fieldPath, opStr, value) {
        try {
            // The "as string" cast is a little bit of a hack. `where` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new Query(this.firestore, firestore.query(this._delegate, firestore.where(fieldPath, opStr, value)));
        }
        catch (e) {
            throw replaceFunctionName(e, /(orderBy|where)\(\)/, 'Query.$1()');
        }
    };
    Query.prototype.orderBy = function (fieldPath, directionStr) {
        try {
            // The "as string" cast is a little bit of a hack. `orderBy` accepts the
            // FieldPath Compat type as input, but is not typed as such in order to
            // not expose this via our public typings file.
            return new Query(this.firestore, firestore.query(this._delegate, firestore.orderBy(fieldPath, directionStr)));
        }
        catch (e) {
            throw replaceFunctionName(e, /(orderBy|where)\(\)/, 'Query.$1()');
        }
    };
    Query.prototype.limit = function (n) {
        try {
            return new Query(this.firestore, firestore.query(this._delegate, firestore.limit(n)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'limit()', 'Query.limit()');
        }
    };
    Query.prototype.limitToLast = function (n) {
        try {
            return new Query(this.firestore, firestore.query(this._delegate, firestore.limitToLast(n)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'limitToLast()', 'Query.limitToLast()');
        }
    };
    Query.prototype.startAt = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return new Query(this.firestore, firestore.query(this._delegate, firestore.startAt.apply(void 0, args)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'startAt()', 'Query.startAt()');
        }
    };
    Query.prototype.startAfter = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return new Query(this.firestore, firestore.query(this._delegate, firestore.startAfter.apply(void 0, args)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'startAfter()', 'Query.startAfter()');
        }
    };
    Query.prototype.endBefore = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return new Query(this.firestore, firestore.query(this._delegate, firestore.endBefore.apply(void 0, args)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'endBefore()', 'Query.endBefore()');
        }
    };
    Query.prototype.endAt = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return new Query(this.firestore, firestore.query(this._delegate, firestore.endAt.apply(void 0, args)));
        }
        catch (e) {
            throw replaceFunctionName(e, 'endAt()', 'Query.endAt()');
        }
    };
    Query.prototype.isEqual = function (other) {
        return firestore.queryEqual(this._delegate, other._delegate);
    };
    Query.prototype.get = function (options) {
        var _this = this;
        var query;
        if ((options === null || options === void 0 ? void 0 : options.source) === 'cache') {
            query = firestore.getDocsFromCache(this._delegate);
        }
        else if ((options === null || options === void 0 ? void 0 : options.source) === 'server') {
            query = firestore.getDocsFromServer(this._delegate);
        }
        else {
            query = firestore.getDocs(this._delegate);
        }
        return query.then(function (result) { return new QuerySnapshot(_this.firestore, new firestore.QuerySnapshot(_this.firestore._delegate, _this._userDataWriter, _this._delegate, result._snapshot)); });
    };
    Query.prototype.onSnapshot = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var options = extractSnapshotOptions(args);
        var observer = wrapObserver(args, function (snap) { return new QuerySnapshot(_this.firestore, new firestore.QuerySnapshot(_this.firestore._delegate, _this._userDataWriter, _this._delegate, snap._snapshot)); });
        return firestore.onSnapshot(this._delegate, options, observer);
    };
    Query.prototype.withConverter = function (converter) {
        return new Query(this.firestore, converter
            ? this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore, converter))
            : this._delegate.withConverter(null));
    };
    return Query;
}());
var DocumentChange = /** @class */ (function () {
    function DocumentChange(_firestore, _delegate) {
        this._firestore = _firestore;
        this._delegate = _delegate;
    }
    Object.defineProperty(DocumentChange.prototype, "type", {
        get: function () {
            return this._delegate.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentChange.prototype, "doc", {
        get: function () {
            return new QueryDocumentSnapshot(this._firestore, this._delegate.doc);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentChange.prototype, "oldIndex", {
        get: function () {
            return this._delegate.oldIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocumentChange.prototype, "newIndex", {
        get: function () {
            return this._delegate.newIndex;
        },
        enumerable: false,
        configurable: true
    });
    return DocumentChange;
}());
var QuerySnapshot = /** @class */ (function () {
    function QuerySnapshot(_firestore, _delegate) {
        this._firestore = _firestore;
        this._delegate = _delegate;
    }
    Object.defineProperty(QuerySnapshot.prototype, "query", {
        get: function () {
            return new Query(this._firestore, this._delegate.query);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuerySnapshot.prototype, "metadata", {
        get: function () {
            return this._delegate.metadata;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuerySnapshot.prototype, "size", {
        get: function () {
            return this._delegate.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuerySnapshot.prototype, "empty", {
        get: function () {
            return this._delegate.empty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuerySnapshot.prototype, "docs", {
        get: function () {
            var _this = this;
            return this._delegate.docs.map(function (doc) { return new QueryDocumentSnapshot(_this._firestore, doc); });
        },
        enumerable: false,
        configurable: true
    });
    QuerySnapshot.prototype.docChanges = function (options) {
        var _this = this;
        return this._delegate
            .docChanges(options)
            .map(function (docChange) { return new DocumentChange(_this._firestore, docChange); });
    };
    QuerySnapshot.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this._delegate.forEach(function (snapshot) {
            callback.call(thisArg, new QueryDocumentSnapshot(_this._firestore, snapshot));
        });
    };
    QuerySnapshot.prototype.isEqual = function (other) {
        return firestore.snapshotEqual(this._delegate, other._delegate);
    };
    return QuerySnapshot;
}());
var CollectionReference = /** @class */ (function (_super) {
    tslib.__extends(CollectionReference, _super);
    function CollectionReference(firestore, _delegate) {
        var _this = _super.call(this, firestore, _delegate) || this;
        _this.firestore = firestore;
        _this._delegate = _delegate;
        return _this;
    }
    Object.defineProperty(CollectionReference.prototype, "id", {
        get: function () {
            return this._delegate.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CollectionReference.prototype, "path", {
        get: function () {
            return this._delegate.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CollectionReference.prototype, "parent", {
        get: function () {
            var docRef = this._delegate.parent;
            return docRef ? new DocumentReference(this.firestore, docRef) : null;
        },
        enumerable: false,
        configurable: true
    });
    CollectionReference.prototype.doc = function (documentPath) {
        try {
            if (documentPath === undefined) {
                // Call `doc` without `documentPath` if `documentPath` is `undefined`
                // as `doc` validates the number of arguments to prevent users from
                // accidentally passing `undefined`.
                return new DocumentReference(this.firestore, firestore.doc(this._delegate));
            }
            else {
                return new DocumentReference(this.firestore, firestore.doc(this._delegate, documentPath));
            }
        }
        catch (e) {
            throw replaceFunctionName(e, 'doc()', 'CollectionReference.doc()');
        }
    };
    CollectionReference.prototype.add = function (data) {
        var _this = this;
        return firestore.addDoc(this._delegate, data).then(function (docRef) { return new DocumentReference(_this.firestore, docRef); });
    };
    CollectionReference.prototype.isEqual = function (other) {
        return firestore.refEqual(this._delegate, other._delegate);
    };
    CollectionReference.prototype.withConverter = function (converter) {
        return new CollectionReference(this.firestore, converter
            ? this._delegate.withConverter(FirestoreDataConverter.getInstance(this.firestore, converter))
            : this._delegate.withConverter(null));
    };
    return CollectionReference;
}(Query));
function castReference(documentRef) {
    return cast(documentRef, firestore.DocumentReference);
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
    return firestore.loadBundle(this._delegate, data);
}
function namedQuery(queryName) {
    var _this = this;
    return firestore.namedQuery(this._delegate, queryName).then(function (expQuery) {
        if (!expQuery) {
            return null;
        }
        return new Query(_this, 
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
        this._delegate = new (firestore.FieldPath.bind.apply(firestore.FieldPath, tslib.__spreadArray([void 0], fieldNames)))();
    }
    FieldPath.documentId = function () {
        /**
         * Internal Note: The backend doesn't technically support querying by
         * document ID. Instead it queries by the entire document name (full path
         * included), but in the cases we currently support documentId(), the net
         * effect is the same.
         */
        return new FieldPath(FieldPath$1.keyField().canonicalString());
    };
    FieldPath.prototype.isEqual = function (other) {
        other = util.getModularInstance(other);
        if (!(other instanceof firestore.FieldPath)) {
            return false;
        }
        return this._delegate._internalPath.isEqual(other._internalPath);
    };
    return FieldPath;
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
var FieldValue = /** @class */ (function () {
    function FieldValue(_delegate) {
        this._delegate = _delegate;
    }
    FieldValue.serverTimestamp = function () {
        var delegate = firestore.serverTimestamp();
        delegate._methodName = 'FieldValue.serverTimestamp';
        return new FieldValue(delegate);
    };
    FieldValue.delete = function () {
        var delegate = firestore.deleteField();
        delegate._methodName = 'FieldValue.delete';
        return new FieldValue(delegate);
    };
    FieldValue.arrayUnion = function () {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        var delegate = firestore.arrayUnion.apply(void 0, elements);
        delegate._methodName = 'FieldValue.arrayUnion';
        return new FieldValue(delegate);
    };
    FieldValue.arrayRemove = function () {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        var delegate = firestore.arrayRemove.apply(void 0, elements);
        delegate._methodName = 'FieldValue.arrayRemove';
        return new FieldValue(delegate);
    };
    FieldValue.increment = function (n) {
        var delegate = firestore.increment(n);
        delegate._methodName = 'FieldValue.increment';
        return new FieldValue(delegate);
    };
    FieldValue.prototype.isEqual = function (other) {
        return this._delegate.isEqual(other._delegate);
    };
    return FieldValue;
}());
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
var firestoreNamespace = {
    Firestore: Firestore,
    GeoPoint: firestore.GeoPoint,
    Timestamp: firestore.Timestamp,
    Blob: Blob,
    Transaction: Transaction,
    WriteBatch: WriteBatch,
    DocumentReference: DocumentReference,
    DocumentSnapshot: DocumentSnapshot,
    Query: Query,
    QueryDocumentSnapshot: QueryDocumentSnapshot,
    QuerySnapshot: QuerySnapshot,
    CollectionReference: CollectionReference,
    FieldPath: FieldPath,
    FieldValue: FieldValue,
    setLogLevel: setLogLevel,
    CACHE_SIZE_UNLIMITED: firestore.CACHE_SIZE_UNLIMITED
};
/**
 * Configures Firestore as part of the Firebase SDK by calling registerComponent.
 *
 * @param firebase - The FirebaseNamespace to register Firestore with
 * @param firestoreFactory - A factory function that returns a new Firestore
 *    instance.
 */
function configureForFirebase(firebase, firestoreFactory) {
    firebase.INTERNAL.registerComponent(new component.Component('firestore-compat', function (container) {
        var app = container.getProvider('app-compat').getImmediate();
        var firestoreExp = container
            .getProvider('firestore-exp')
            .getImmediate();
        return firestoreFactory(app, firestoreExp);
    }, "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, firestoreNamespace)));
}
var name = "@firebase/firestore-compat";
var version = "0.0.900";
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
 * Registers the main Firestore Node build with the components framework.
 * Persistence can be enabled via `firebase.firestore().enablePersistence()`.
 */
function registerFirestore(instance) {
    setSDKVersion(instance.SDK_VERSION);
    configureForFirebase(instance, function (app, firestoreExp) { return new Firestore(app, firestoreExp, new IndexedDbPersistenceProvider()); });
    instance.registerVersion(name, version, 'node');
}
registerFirestore(firebase__default['default']);
registerBundle(Firestore);

exports.registerFirestore = registerFirestore;
//# sourceMappingURL=index.js.map
