'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var component = require('@firebase/component');
var util = require('@firebase/util');
var fayeWebsocket = require('faye-websocket');
var database = require('@firebase/database');
var tslib = require('tslib');
var logger$1 = require('@firebase/logger');

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
 * Wraps a DOM Storage object and:
 * - automatically encode objects as JSON strings before storing them to allow us to store arbitrary types.
 * - prefixes names with "firebase:" to avoid collisions with app data.
 *
 * We automatically (see storage.js) create two such wrappers, one for sessionStorage,
 * and one for localStorage.
 *
 */
var DOMStorageWrapper = /** @class */ (function () {
    /**
     * @param domStorage_ - The underlying storage object (e.g. localStorage or sessionStorage)
     */
    function DOMStorageWrapper(domStorage_) {
        this.domStorage_ = domStorage_;
        // Use a prefix to avoid collisions with other stuff saved by the app.
        this.prefix_ = 'firebase:';
    }
    /**
     * @param key - The key to save the value under
     * @param value - The value being stored, or null to remove the key.
     */
    DOMStorageWrapper.prototype.set = function (key, value) {
        if (value == null) {
            this.domStorage_.removeItem(this.prefixedName_(key));
        }
        else {
            this.domStorage_.setItem(this.prefixedName_(key), util.stringify(value));
        }
    };
    /**
     * @returns The value that was stored under this key, or null
     */
    DOMStorageWrapper.prototype.get = function (key) {
        var storedVal = this.domStorage_.getItem(this.prefixedName_(key));
        if (storedVal == null) {
            return null;
        }
        else {
            return util.jsonEval(storedVal);
        }
    };
    DOMStorageWrapper.prototype.remove = function (key) {
        this.domStorage_.removeItem(this.prefixedName_(key));
    };
    DOMStorageWrapper.prototype.prefixedName_ = function (name) {
        return this.prefix_ + name;
    };
    DOMStorageWrapper.prototype.toString = function () {
        return this.domStorage_.toString();
    };
    return DOMStorageWrapper;
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
 * An in-memory storage implementation that matches the API of DOMStorageWrapper
 * (TODO: create interface for both to implement).
 */
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage() {
        this.cache_ = {};
        this.isInMemoryStorage = true;
    }
    MemoryStorage.prototype.set = function (key, value) {
        if (value == null) {
            delete this.cache_[key];
        }
        else {
            this.cache_[key] = value;
        }
    };
    MemoryStorage.prototype.get = function (key) {
        if (util.contains(this.cache_, key)) {
            return this.cache_[key];
        }
        return null;
    };
    MemoryStorage.prototype.remove = function (key) {
        delete this.cache_[key];
    };
    return MemoryStorage;
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
 * Helper to create a DOMStorageWrapper or else fall back to MemoryStorage.
 * TODO: Once MemoryStorage and DOMStorageWrapper have a shared interface this method annotation should change
 * to reflect this type
 *
 * @param domStorageName - Name of the underlying storage object
 *   (e.g. 'localStorage' or 'sessionStorage').
 * @returns Turning off type information until a common interface is defined.
 */
var createStoragefor = function (domStorageName) {
    try {
        // NOTE: just accessing "localStorage" or "window['localStorage']" may throw a security exception,
        // so it must be inside the try/catch.
        if (typeof window !== 'undefined' &&
            typeof window[domStorageName] !== 'undefined') {
            // Need to test cache. Just because it's here doesn't mean it works
            var domStorage = window[domStorageName];
            domStorage.setItem('firebase:sentinel', 'cache');
            domStorage.removeItem('firebase:sentinel');
            return new DOMStorageWrapper(domStorage);
        }
    }
    catch (e) { }
    // Failed to create wrapper.  Just return in-memory storage.
    // TODO: log?
    return new MemoryStorage();
};
/** A storage object that lasts across sessions */
var PersistentStorage = createStoragefor('localStorage');
/** A storage object that only lasts one session */
var SessionStorage = createStoragefor('sessionStorage');

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
var logClient = new logger$1.Logger('@firebase/database');
/**
 * Returns a locally-unique ID (generated by just incrementing up from 0 each time its called).
 */
var LUIDGenerator = (function () {
    var id = 1;
    return function () {
        return id++;
    };
})();
/**
 * Sha1 hash of the input string
 * @param str - The string to hash
 * @returns {!string} The resulting hash
 */
var sha1 = function (str) {
    var utf8Bytes = util.stringToByteArray(str);
    var sha1 = new util.Sha1();
    sha1.update(utf8Bytes);
    var sha1Bytes = sha1.digest();
    return util.base64.encodeByteArray(sha1Bytes);
};
var buildLogMessage_ = function () {
    var varArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        varArgs[_i] = arguments[_i];
    }
    var message = '';
    for (var i = 0; i < varArgs.length; i++) {
        var arg = varArgs[i];
        if (Array.isArray(arg) ||
            (arg &&
                typeof arg === 'object' &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                typeof arg.length === 'number')) {
            message += buildLogMessage_.apply(null, arg);
        }
        else if (typeof arg === 'object') {
            message += util.stringify(arg);
        }
        else {
            message += arg;
        }
        message += ' ';
    }
    return message;
};
/**
 * Use this for all debug messages in Firebase.
 */
var logger = null;
/**
 * Flag to check for log availability on first log message
 */
var firstLog_ = true;
/**
 * The implementation of Firebase.enableLogging (defined here to break dependencies)
 * @param logger_ - A flag to turn on logging, or a custom logger
 * @param persistent - Whether or not to persist logging settings across refreshes
 */
var enableLogging = function (logger_, persistent) {
    util.assert(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
    if (logger_ === true) {
        logClient.logLevel = logger$1.LogLevel.VERBOSE;
        logger = logClient.log.bind(logClient);
        if (persistent) {
            SessionStorage.set('logging_enabled', true);
        }
    }
    else if (typeof logger_ === 'function') {
        logger = logger_;
    }
    else {
        logger = null;
        SessionStorage.remove('logging_enabled');
    }
};
var log = function () {
    var varArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        varArgs[_i] = arguments[_i];
    }
    if (firstLog_ === true) {
        firstLog_ = false;
        if (logger === null && SessionStorage.get('logging_enabled') === true) {
            enableLogging(true);
        }
    }
    if (logger) {
        var message = buildLogMessage_.apply(null, varArgs);
        logger(message);
    }
};
var logWrapper = function (prefix) {
    return function () {
        var varArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            varArgs[_i] = arguments[_i];
        }
        log.apply(void 0, tslib.__spreadArray([prefix], tslib.__read(varArgs)));
    };
};
var error = function () {
    var varArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        varArgs[_i] = arguments[_i];
    }
    var message = 'FIREBASE INTERNAL ERROR: ' + buildLogMessage_.apply(void 0, tslib.__spreadArray([], tslib.__read(varArgs)));
    logClient.error(message);
};
var warn = function () {
    var varArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        varArgs[_i] = arguments[_i];
    }
    var message = 'FIREBASE WARNING: ' + buildLogMessage_.apply(void 0, tslib.__spreadArray([], tslib.__read(varArgs)));
    logClient.warn(message);
};
/**
 * Returns true if data is NaN, or +/- Infinity.
 */
var isInvalidJSONNumber = function (data) {
    return (typeof data === 'number' &&
        (data !== data || // NaN
            data === Number.POSITIVE_INFINITY ||
            data === Number.NEGATIVE_INFINITY));
};
var executeWhenDOMReady = function (fn) {
    if (util.isNodeSdk() || document.readyState === 'complete') {
        fn();
    }
    else {
        // Modeled after jQuery. Try DOMContentLoaded and onreadystatechange (which
        // fire before onload), but fall back to onload.
        var called_1 = false;
        var wrappedFn_1 = function () {
            if (!document.body) {
                setTimeout(wrappedFn_1, Math.floor(10));
                return;
            }
            if (!called_1) {
                called_1 = true;
                fn();
            }
        };
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', wrappedFn_1, false);
            // fallback to onload.
            window.addEventListener('load', wrappedFn_1, false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (document.attachEvent) {
            // IE.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState === 'complete') {
                    wrappedFn_1();
                }
            });
            // fallback to onload.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.attachEvent('onload', wrappedFn_1);
            // jQuery has an extra hack for IE that we could employ (based on
            // http://javascript.nwbox.com/IEContentLoaded/) But it looks really old.
            // I'm hoping we don't need it.
        }
    }
};
/**
 * Minimum key name. Invalid for actual data, used as a marker to sort before any valid names
 */
var MIN_NAME = '[MIN_NAME]';
/**
 * Maximum key name. Invalid for actual data, used as a marker to sort above any valid names
 */
var MAX_NAME = '[MAX_NAME]';
/**
 * Compares valid Firebase key names, plus min and max name
 */
var nameCompare = function (a, b) {
    if (a === b) {
        return 0;
    }
    else if (a === MIN_NAME || b === MAX_NAME) {
        return -1;
    }
    else if (b === MIN_NAME || a === MAX_NAME) {
        return 1;
    }
    else {
        var aAsInt = tryParseInt(a), bAsInt = tryParseInt(b);
        if (aAsInt !== null) {
            if (bAsInt !== null) {
                return aAsInt - bAsInt === 0 ? a.length - b.length : aAsInt - bAsInt;
            }
            else {
                return -1;
            }
        }
        else if (bAsInt !== null) {
            return 1;
        }
        else {
            return a < b ? -1 : 1;
        }
    }
};
var requireKey = function (key, obj) {
    if (obj && key in obj) {
        return obj[key];
    }
    else {
        throw new Error('Missing required key (' + key + ') in object: ' + util.stringify(obj));
    }
};
var ObjectToUniqueKey = function (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return util.stringify(obj);
    }
    var keys = [];
    // eslint-disable-next-line guard-for-in
    for (var k in obj) {
        keys.push(k);
    }
    // Export as json, but with the keys sorted.
    keys.sort();
    var key = '{';
    for (var i = 0; i < keys.length; i++) {
        if (i !== 0) {
            key += ',';
        }
        key += util.stringify(keys[i]);
        key += ':';
        key += ObjectToUniqueKey(obj[keys[i]]);
    }
    key += '}';
    return key;
};
/**
 * Splits a string into a number of smaller segments of maximum size
 * @param str - The string
 * @param segsize - The maximum number of chars in the string.
 * @returns The string, split into appropriately-sized chunks
 */
var splitStringBySize = function (str, segsize) {
    var len = str.length;
    if (len <= segsize) {
        return [str];
    }
    var dataSegs = [];
    for (var c = 0; c < len; c += segsize) {
        if (c + segsize > len) {
            dataSegs.push(str.substring(c, len));
        }
        else {
            dataSegs.push(str.substring(c, c + segsize));
        }
    }
    return dataSegs;
};
/**
 * Apply a function to each (key, value) pair in an object or
 * apply a function to each (index, value) pair in an array
 * @param obj - The object or array to iterate over
 * @param fn - The function to apply
 */
function each(obj, fn) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            fn(key, obj[key]);
        }
    }
}
/**
 * Borrowed from http://hg.secondlife.com/llsd/src/tip/js/typedarray.js (MIT License)
 * I made one modification at the end and removed the NaN / Infinity
 * handling (since it seemed broken [caused an overflow] and we don't need it).  See MJL comments.
 * @param v - A double
 *
 */
var doubleToIEEE754String = function (v) {
    util.assert(!isInvalidJSONNumber(v), 'Invalid JSON number'); // MJL
    var ebits = 11, fbits = 52;
    var bias = (1 << (ebits - 1)) - 1;
    var s, e, f, ln, i;
    // Compute sign, exponent, fraction
    // Skip NaN / Infinity handling --MJL.
    if (v === 0) {
        e = 0;
        f = 0;
        s = 1 / v === -Infinity ? 1 : 0;
    }
    else {
        s = v < 0;
        v = Math.abs(v);
        if (v >= Math.pow(2, 1 - bias)) {
            // Normalized
            ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
            e = ln + bias;
            f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
        }
        else {
            // Denormalized
            e = 0;
            f = Math.round(v / Math.pow(2, 1 - bias - fbits));
        }
    }
    // Pack sign, exponent, fraction
    var bits = [];
    for (i = fbits; i; i -= 1) {
        bits.push(f % 2 ? 1 : 0);
        f = Math.floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
        bits.push(e % 2 ? 1 : 0);
        e = Math.floor(e / 2);
    }
    bits.push(s ? 1 : 0);
    bits.reverse();
    var str = bits.join('');
    // Return the data as a hex string. --MJL
    var hexByteString = '';
    for (i = 0; i < 64; i += 8) {
        var hexByte = parseInt(str.substr(i, 8), 2).toString(16);
        if (hexByte.length === 1) {
            hexByte = '0' + hexByte;
        }
        hexByteString = hexByteString + hexByte;
    }
    return hexByteString.toLowerCase();
};
/**
 * Used to detect if we're in a Chrome content script (which executes in an
 * isolated environment where long-polling doesn't work).
 */
var isChromeExtensionContentScript = function () {
    return !!(typeof window === 'object' &&
        window['chrome'] &&
        window['chrome']['extension'] &&
        !/^chrome/.test(window.location.href));
};
/**
 * Used to detect if we're in a Windows 8 Store app.
 */
var isWindowsStoreApp = function () {
    // Check for the presence of a couple WinRT globals
    return typeof Windows === 'object' && typeof Windows.UI === 'object';
};
/**
 * Used to test for integer-looking strings
 */
var INTEGER_REGEXP_ = new RegExp('^-?(0*)\\d{1,10}$');
/**
 * For use in keys, the minimum possible 32-bit integer.
 */
var INTEGER_32_MIN = -2147483648;
/**
 * For use in kyes, the maximum possible 32-bit integer.
 */
var INTEGER_32_MAX = 2147483647;
/**
 * If the string contains a 32-bit integer, return it.  Else return null.
 */
var tryParseInt = function (str) {
    if (INTEGER_REGEXP_.test(str)) {
        var intVal = Number(str);
        if (intVal >= INTEGER_32_MIN && intVal <= INTEGER_32_MAX) {
            return intVal;
        }
    }
    return null;
};
/**
 * Helper to run some code but catch any exceptions and re-throw them later.
 * Useful for preventing user callbacks from breaking internal code.
 *
 * Re-throwing the exception from a setTimeout is a little evil, but it's very
 * convenient (we don't have to try to figure out when is a safe point to
 * re-throw it), and the behavior seems reasonable:
 *
 * * If you aren't pausing on exceptions, you get an error in the console with
 *   the correct stack trace.
 * * If you're pausing on all exceptions, the debugger will pause on your
 *   exception and then again when we rethrow it.
 * * If you're only pausing on uncaught exceptions, the debugger will only pause
 *   on us re-throwing it.
 *
 * @param fn - The code to guard.
 */
var exceptionGuard = function (fn) {
    try {
        fn();
    }
    catch (e) {
        // Re-throw exception when it's safe.
        setTimeout(function () {
            // It used to be that "throw e" would result in a good console error with
            // relevant context, but as of Chrome 39, you just get the firebase.js
            // file/line number where we re-throw it, which is useless. So we log
            // e.stack explicitly.
            var stack = e.stack || '';
            warn('Exception was thrown by user callback.', stack);
            throw e;
        }, Math.floor(0));
    }
};
/**
 * Same as setTimeout() except on Node.JS it will /not/ prevent the process from exiting.
 *
 * It is removed with clearTimeout() as normal.
 *
 * @param fn - Function to run.
 * @param time - Milliseconds to wait before running.
 * @returns The setTimeout() return value.
 */
var setTimeoutNonBlocking = function (fn, time) {
    var timeout = setTimeout(fn, time);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof timeout === 'object' && timeout['unref']) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        timeout['unref']();
    }
    return timeout;
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
 * An immutable object representing a parsed path.  It's immutable so that you
 * can pass them around to other functions without worrying about them changing
 * it.
 */
var Path = /** @class */ (function () {
    /**
     * @param pathOrString - Path string to parse, or another path, or the raw
     * tokens array
     */
    function Path(pathOrString, pieceNum) {
        if (pieceNum === void 0) {
            this.pieces_ = pathOrString.split('/');
            // Remove empty pieces.
            var copyTo = 0;
            for (var i = 0; i < this.pieces_.length; i++) {
                if (this.pieces_[i].length > 0) {
                    this.pieces_[copyTo] = this.pieces_[i];
                    copyTo++;
                }
            }
            this.pieces_.length = copyTo;
            this.pieceNum_ = 0;
        }
        else {
            this.pieces_ = pathOrString;
            this.pieceNum_ = pieceNum;
        }
    }
    Path.prototype.toString = function () {
        var pathString = '';
        for (var i = this.pieceNum_; i < this.pieces_.length; i++) {
            if (this.pieces_[i] !== '') {
                pathString += '/' + this.pieces_[i];
            }
        }
        return pathString || '/';
    };
    return Path;
}());
function pathGetFront(path) {
    if (path.pieceNum_ >= path.pieces_.length) {
        return null;
    }
    return path.pieces_[path.pieceNum_];
}
/**
 * @returns The number of segments in this path
 */
function pathGetLength(path) {
    return path.pieces_.length - path.pieceNum_;
}
function pathPopFront(path) {
    var pieceNum = path.pieceNum_;
    if (pieceNum < path.pieces_.length) {
        pieceNum++;
    }
    return new Path(path.pieces_, pieceNum);
}
/**
 * @returns True if there are no segments in this path
 */
function pathIsEmpty(path) {
    return path.pieceNum_ >= path.pieces_.length;
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
 * True for invalid Firebase paths.
 * Allows '/' in paths.
 */
var INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
var isValidPathString = function (pathString) {
    return (typeof pathString === 'string' &&
        pathString.length !== 0 &&
        !INVALID_PATH_REGEX_.test(pathString));
};
var validateEventType = function (fnName, eventType, optional) {
    if (optional && eventType === undefined) {
        return;
    }
    switch (eventType) {
        case 'value':
        case 'child_added':
        case 'child_removed':
        case 'child_changed':
        case 'child_moved':
            break;
        default:
            throw new Error(util.errorPrefix(fnName, 'eventType') +
                'must be a valid event type = "value", "child_added", "child_removed", ' +
                '"child_changed", or "child_moved".');
    }
};
var validatePathString = function (fnName, argumentName, pathString, optional) {
    if (optional && pathString === undefined) {
        return;
    }
    if (!isValidPathString(pathString)) {
        throw new Error(util.errorPrefix(fnName, argumentName) +
            'was an invalid path = "' +
            pathString +
            '". Paths must be non-empty strings and ' +
            'can\'t contain ".", "#", "$", "[", or "]"');
    }
};
var validateWritablePath = function (fnName, path) {
    if (pathGetFront(path) === '.info') {
        throw new Error(fnName + " failed = Can't modify data under /.info/");
    }
};
var validateBoolean = function (fnName, argumentName, bool, optional) {
    if (optional && bool === undefined) {
        return;
    }
    if (typeof bool !== 'boolean') {
        throw new Error(util.errorPrefix(fnName, argumentName) + 'must be a boolean.');
    }
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
var NamedNode = /** @class */ (function () {
    function NamedNode(name, node) {
        this.name = name;
        this.node = node;
    }
    NamedNode.Wrap = function (name, node) {
        return new NamedNode(name, node);
    };
    return NamedNode;
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
var Index = /** @class */ (function () {
    function Index() {
    }
    /**
     * @returns A standalone comparison function for
     * this index
     */
    Index.prototype.getCompare = function () {
        return this.compare.bind(this);
    };
    /**
     * Given a before and after value for a node, determine if the indexed value has changed. Even if they are different,
     * it's possible that the changes are isolated to parts of the snapshot that are not indexed.
     *
     *
     * @returns True if the portion of the snapshot being indexed changed between oldNode and newNode
     */
    Index.prototype.indexedValueChanged = function (oldNode, newNode) {
        var oldWrapped = new NamedNode(MIN_NAME, oldNode);
        var newWrapped = new NamedNode(MIN_NAME, newNode);
        return this.compare(oldWrapped, newWrapped) !== 0;
    };
    /**
     * @returns a node wrapper that will sort equal to or less than
     * any other node wrapper, using this index
     */
    Index.prototype.minPost = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NamedNode.MIN;
    };
    return Index;
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
var MAX_NODE$1;
var priorityHashText = function (priority) {
    if (typeof priority === 'number') {
        return 'number:' + doubleToIEEE754String(priority);
    }
    else {
        return 'string:' + priority;
    }
};
/**
 * Validates that a priority snapshot Node is valid.
 */
var validatePriorityNode = function (priorityNode) {
    if (priorityNode.isLeafNode()) {
        var val = priorityNode.val();
        util.assert(typeof val === 'string' ||
            typeof val === 'number' ||
            (typeof val === 'object' && util.contains(val, '.sv')), 'Priority must be a string or number.');
    }
    else {
        util.assert(priorityNode === MAX_NODE$1 || priorityNode.isEmpty(), 'priority of unexpected type.');
    }
    // Don't call getPriority() on MAX_NODE to avoid hitting assertion.
    util.assert(priorityNode === MAX_NODE$1 || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
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
var __childrenNodeConstructor;
/**
 * LeafNode is a class for storing leaf nodes in a DataSnapshot.  It
 * implements Node and stores the value of the node (a string,
 * number, or boolean) accessible via getValue().
 */
var LeafNode = /** @class */ (function () {
    /**
     * @param value_ - The value to store in this leaf node. The object type is
     * possible in the event of a deferred value
     * @param priorityNode_ - The priority of this node.
     */
    function LeafNode(value_, priorityNode_) {
        if (priorityNode_ === void 0) { priorityNode_ = LeafNode.__childrenNodeConstructor.EMPTY_NODE; }
        this.value_ = value_;
        this.priorityNode_ = priorityNode_;
        this.lazyHash_ = null;
        util.assert(this.value_ !== undefined && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
        validatePriorityNode(this.priorityNode_);
    }
    Object.defineProperty(LeafNode, "__childrenNodeConstructor", {
        get: function () {
            return __childrenNodeConstructor;
        },
        set: function (val) {
            __childrenNodeConstructor = val;
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    LeafNode.prototype.isLeafNode = function () {
        return true;
    };
    /** @inheritDoc */
    LeafNode.prototype.getPriority = function () {
        return this.priorityNode_;
    };
    /** @inheritDoc */
    LeafNode.prototype.updatePriority = function (newPriorityNode) {
        return new LeafNode(this.value_, newPriorityNode);
    };
    /** @inheritDoc */
    LeafNode.prototype.getImmediateChild = function (childName) {
        // Hack to treat priority as a regular child
        if (childName === '.priority') {
            return this.priorityNode_;
        }
        else {
            return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
        }
    };
    /** @inheritDoc */
    LeafNode.prototype.getChild = function (path) {
        if (pathIsEmpty(path)) {
            return this;
        }
        else if (pathGetFront(path) === '.priority') {
            return this.priorityNode_;
        }
        else {
            return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
        }
    };
    LeafNode.prototype.hasChild = function () {
        return false;
    };
    /** @inheritDoc */
    LeafNode.prototype.getPredecessorChildName = function (childName, childNode) {
        return null;
    };
    /** @inheritDoc */
    LeafNode.prototype.updateImmediateChild = function (childName, newChildNode) {
        if (childName === '.priority') {
            return this.updatePriority(newChildNode);
        }
        else if (newChildNode.isEmpty() && childName !== '.priority') {
            return this;
        }
        else {
            return LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
        }
    };
    /** @inheritDoc */
    LeafNode.prototype.updateChild = function (path, newChildNode) {
        var front = pathGetFront(path);
        if (front === null) {
            return newChildNode;
        }
        else if (newChildNode.isEmpty() && front !== '.priority') {
            return this;
        }
        else {
            util.assert(front !== '.priority' || pathGetLength(path) === 1, '.priority must be the last token in a path');
            return this.updateImmediateChild(front, LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(path), newChildNode));
        }
    };
    /** @inheritDoc */
    LeafNode.prototype.isEmpty = function () {
        return false;
    };
    /** @inheritDoc */
    LeafNode.prototype.numChildren = function () {
        return 0;
    };
    /** @inheritDoc */
    LeafNode.prototype.forEachChild = function (index, action) {
        return false;
    };
    LeafNode.prototype.val = function (exportFormat) {
        if (exportFormat && !this.getPriority().isEmpty()) {
            return {
                '.value': this.getValue(),
                '.priority': this.getPriority().val()
            };
        }
        else {
            return this.getValue();
        }
    };
    /** @inheritDoc */
    LeafNode.prototype.hash = function () {
        if (this.lazyHash_ === null) {
            var toHash = '';
            if (!this.priorityNode_.isEmpty()) {
                toHash +=
                    'priority:' +
                        priorityHashText(this.priorityNode_.val()) +
                        ':';
            }
            var type = typeof this.value_;
            toHash += type + ':';
            if (type === 'number') {
                toHash += doubleToIEEE754String(this.value_);
            }
            else {
                toHash += this.value_;
            }
            this.lazyHash_ = sha1(toHash);
        }
        return this.lazyHash_;
    };
    /**
     * Returns the value of the leaf node.
     * @returns The value of the node.
     */
    LeafNode.prototype.getValue = function () {
        return this.value_;
    };
    LeafNode.prototype.compareTo = function (other) {
        if (other === LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
            return 1;
        }
        else if (other instanceof LeafNode.__childrenNodeConstructor) {
            return -1;
        }
        else {
            util.assert(other.isLeafNode(), 'Unknown node type');
            return this.compareToLeafNode_(other);
        }
    };
    /**
     * Comparison specifically for two leaf nodes
     */
    LeafNode.prototype.compareToLeafNode_ = function (otherLeaf) {
        var otherLeafType = typeof otherLeaf.value_;
        var thisLeafType = typeof this.value_;
        var otherIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(otherLeafType);
        var thisIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(thisLeafType);
        util.assert(otherIndex >= 0, 'Unknown leaf type: ' + otherLeafType);
        util.assert(thisIndex >= 0, 'Unknown leaf type: ' + thisLeafType);
        if (otherIndex === thisIndex) {
            // Same type, compare values
            if (thisLeafType === 'object') {
                // Deferred value nodes are all equal, but we should also never get to this point...
                return 0;
            }
            else {
                // Note that this works because true > false, all others are number or string comparisons
                if (this.value_ < otherLeaf.value_) {
                    return -1;
                }
                else if (this.value_ === otherLeaf.value_) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
        }
        else {
            return thisIndex - otherIndex;
        }
    };
    LeafNode.prototype.withIndex = function () {
        return this;
    };
    LeafNode.prototype.isIndexed = function () {
        return true;
    };
    LeafNode.prototype.equals = function (other) {
        if (other === this) {
            return true;
        }
        else if (other.isLeafNode()) {
            var otherLeaf = other;
            return (this.value_ === otherLeaf.value_ &&
                this.priorityNode_.equals(otherLeaf.priorityNode_));
        }
        else {
            return false;
        }
    };
    /**
     * The sort order for comparing leaf nodes of different types. If two leaf nodes have
     * the same type, the comparison falls back to their value
     */
    LeafNode.VALUE_TYPE_ORDER = ['object', 'boolean', 'number', 'string'];
    return LeafNode;
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
var nodeFromJSON;
var MAX_NODE;
var PriorityIndex = /** @class */ (function (_super) {
    tslib.__extends(PriorityIndex, _super);
    function PriorityIndex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PriorityIndex.prototype.compare = function (a, b) {
        var aPriority = a.node.getPriority();
        var bPriority = b.node.getPriority();
        var indexCmp = aPriority.compareTo(bPriority);
        if (indexCmp === 0) {
            return nameCompare(a.name, b.name);
        }
        else {
            return indexCmp;
        }
    };
    PriorityIndex.prototype.isDefinedOn = function (node) {
        return !node.getPriority().isEmpty();
    };
    PriorityIndex.prototype.indexedValueChanged = function (oldNode, newNode) {
        return !oldNode.getPriority().equals(newNode.getPriority());
    };
    PriorityIndex.prototype.minPost = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NamedNode.MIN;
    };
    PriorityIndex.prototype.maxPost = function () {
        return new NamedNode(MAX_NAME, new LeafNode('[PRIORITY-POST]', MAX_NODE));
    };
    PriorityIndex.prototype.makePost = function (indexValue, name) {
        var priorityNode = nodeFromJSON(indexValue);
        return new NamedNode(name, new LeafNode('[PRIORITY-POST]', priorityNode));
    };
    /**
     * @returns String representation for inclusion in a query spec
     */
    PriorityIndex.prototype.toString = function () {
        return '.priority';
    };
    return PriorityIndex;
}(Index));
var PRIORITY_INDEX = new PriorityIndex();

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
 * This class is an immutable-from-the-public-api struct containing a set of query parameters defining a
 * range to be returned for a particular location. It is assumed that validation of parameters is done at the
 * user-facing API level, so it is not done here.
 */
var QueryParams = /** @class */ (function () {
    function QueryParams() {
        this.limitSet_ = false;
        this.startSet_ = false;
        this.startNameSet_ = false;
        this.startAfterSet_ = false;
        this.endSet_ = false;
        this.endNameSet_ = false;
        this.endBeforeSet_ = false;
        this.limit_ = 0;
        this.viewFrom_ = '';
        this.indexStartValue_ = null;
        this.indexStartName_ = '';
        this.indexEndValue_ = null;
        this.indexEndName_ = '';
        this.index_ = PRIORITY_INDEX;
    }
    QueryParams.prototype.hasStart = function () {
        return this.startSet_;
    };
    QueryParams.prototype.hasStartAfter = function () {
        return this.startAfterSet_;
    };
    QueryParams.prototype.hasEndBefore = function () {
        return this.endBeforeSet_;
    };
    /**
     * @returns True if it would return from left.
     */
    QueryParams.prototype.isViewFromLeft = function () {
        if (this.viewFrom_ === '') {
            // limit(), rather than limitToFirst or limitToLast was called.
            // This means that only one of startSet_ and endSet_ is true. Use them
            // to calculate which side of the view to anchor to. If neither is set,
            // anchor to the end.
            return this.startSet_;
        }
        else {
            return this.viewFrom_ === "l" /* VIEW_FROM_LEFT */;
        }
    };
    /**
     * Only valid to call if hasStart() returns true
     */
    QueryParams.prototype.getIndexStartValue = function () {
        util.assert(this.startSet_, 'Only valid if start has been set');
        return this.indexStartValue_;
    };
    /**
     * Only valid to call if hasStart() returns true.
     * Returns the starting key name for the range defined by these query parameters
     */
    QueryParams.prototype.getIndexStartName = function () {
        util.assert(this.startSet_, 'Only valid if start has been set');
        if (this.startNameSet_) {
            return this.indexStartName_;
        }
        else {
            return MIN_NAME;
        }
    };
    QueryParams.prototype.hasEnd = function () {
        return this.endSet_;
    };
    /**
     * Only valid to call if hasEnd() returns true.
     */
    QueryParams.prototype.getIndexEndValue = function () {
        util.assert(this.endSet_, 'Only valid if end has been set');
        return this.indexEndValue_;
    };
    /**
     * Only valid to call if hasEnd() returns true.
     * Returns the end key name for the range defined by these query parameters
     */
    QueryParams.prototype.getIndexEndName = function () {
        util.assert(this.endSet_, 'Only valid if end has been set');
        if (this.endNameSet_) {
            return this.indexEndName_;
        }
        else {
            return MAX_NAME;
        }
    };
    QueryParams.prototype.hasLimit = function () {
        return this.limitSet_;
    };
    /**
     * @returns True if a limit has been set and it has been explicitly anchored
     */
    QueryParams.prototype.hasAnchoredLimit = function () {
        return this.limitSet_ && this.viewFrom_ !== '';
    };
    /**
     * Only valid to call if hasLimit() returns true
     */
    QueryParams.prototype.getLimit = function () {
        util.assert(this.limitSet_, 'Only valid if limit has been set');
        return this.limit_;
    };
    QueryParams.prototype.getIndex = function () {
        return this.index_;
    };
    QueryParams.prototype.loadsAllData = function () {
        return !(this.startSet_ || this.endSet_ || this.limitSet_);
    };
    QueryParams.prototype.isDefault = function () {
        return this.loadsAllData() && this.index_ === PRIORITY_INDEX;
    };
    QueryParams.prototype.copy = function () {
        var copy = new QueryParams();
        copy.limitSet_ = this.limitSet_;
        copy.limit_ = this.limit_;
        copy.startSet_ = this.startSet_;
        copy.indexStartValue_ = this.indexStartValue_;
        copy.startNameSet_ = this.startNameSet_;
        copy.indexStartName_ = this.indexStartName_;
        copy.endSet_ = this.endSet_;
        copy.indexEndValue_ = this.indexEndValue_;
        copy.endNameSet_ = this.endNameSet_;
        copy.indexEndName_ = this.indexEndName_;
        copy.index_ = this.index_;
        copy.viewFrom_ = this.viewFrom_;
        return copy;
    };
    return QueryParams;
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
var OnDisconnect = /** @class */ (function () {
    function OnDisconnect(_delegate) {
        this._delegate = _delegate;
    }
    OnDisconnect.prototype.cancel = function (onComplete) {
        util.validateArgCount('OnDisconnect.cancel', 0, 1, arguments.length);
        util.validateCallback('OnDisconnect.cancel', 'onComplete', onComplete, true);
        var result = this._delegate.cancel();
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    OnDisconnect.prototype.remove = function (onComplete) {
        util.validateArgCount('OnDisconnect.remove', 0, 1, arguments.length);
        util.validateCallback('OnDisconnect.remove', 'onComplete', onComplete, true);
        var result = this._delegate.remove();
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    OnDisconnect.prototype.set = function (value, onComplete) {
        util.validateArgCount('OnDisconnect.set', 1, 2, arguments.length);
        util.validateCallback('OnDisconnect.set', 'onComplete', onComplete, true);
        var result = this._delegate.set(value);
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    OnDisconnect.prototype.setWithPriority = function (value, priority, onComplete) {
        util.validateArgCount('OnDisconnect.setWithPriority', 2, 3, arguments.length);
        util.validateCallback('OnDisconnect.setWithPriority', 'onComplete', onComplete, true);
        var result = this._delegate.setWithPriority(value, priority);
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    OnDisconnect.prototype.update = function (objectToMerge, onComplete) {
        util.validateArgCount('OnDisconnect.update', 1, 2, arguments.length);
        if (Array.isArray(objectToMerge)) {
            var newObjectToMerge = {};
            for (var i = 0; i < objectToMerge.length; ++i) {
                newObjectToMerge['' + i] = objectToMerge[i];
            }
            objectToMerge = newObjectToMerge;
            warn('Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the ' +
                'existing data, or an Object with integer keys if you really do want to only update some of the children.');
        }
        util.validateCallback('OnDisconnect.update', 'onComplete', onComplete, true);
        var result = this._delegate.update(objectToMerge);
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    return OnDisconnect;
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
var TransactionResult = /** @class */ (function () {
    /**
     * A type for the resolve value of Firebase.transaction.
     */
    function TransactionResult(committed, snapshot) {
        this.committed = committed;
        this.snapshot = snapshot;
    }
    // Do not create public documentation. This is intended to make JSON serialization work but is otherwise unnecessary
    // for end-users
    TransactionResult.prototype.toJSON = function () {
        util.validateArgCount('TransactionResult.toJSON', 0, 1, arguments.length);
        return { committed: this.committed, snapshot: this.snapshot.toJSON() };
    };
    return TransactionResult;
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
/* eslint-enable @typescript-eslint/no-explicit-any */
/**
 * Class representing a firebase data snapshot.  It wraps a SnapshotNode and
 * surfaces the public methods (val, forEach, etc.) we want to expose.
 */
var DataSnapshot = /** @class */ (function () {
    function DataSnapshot(_database, _delegate) {
        this._database = _database;
        this._delegate = _delegate;
    }
    /**
     * Retrieves the snapshot contents as JSON.  Returns null if the snapshot is
     * empty.
     *
     * @returns JSON representation of the DataSnapshot contents, or null if empty.
     */
    DataSnapshot.prototype.val = function () {
        util.validateArgCount('DataSnapshot.val', 0, 0, arguments.length);
        return this._delegate.val();
    };
    /**
     * Returns the snapshot contents as JSON, including priorities of node.  Suitable for exporting
     * the entire node contents.
     * @returns JSON representation of the DataSnapshot contents, or null if empty.
     */
    DataSnapshot.prototype.exportVal = function () {
        util.validateArgCount('DataSnapshot.exportVal', 0, 0, arguments.length);
        return this._delegate.exportVal();
    };
    // Do not create public documentation. This is intended to make JSON serialization work but is otherwise unnecessary
    // for end-users
    DataSnapshot.prototype.toJSON = function () {
        // Optional spacer argument is unnecessary because we're depending on recursion rather than stringifying the content
        util.validateArgCount('DataSnapshot.toJSON', 0, 1, arguments.length);
        return this._delegate.toJSON();
    };
    /**
     * Returns whether the snapshot contains a non-null value.
     *
     * @returns Whether the snapshot contains a non-null value, or is empty.
     */
    DataSnapshot.prototype.exists = function () {
        util.validateArgCount('DataSnapshot.exists', 0, 0, arguments.length);
        return this._delegate.exists();
    };
    /**
     * Returns a DataSnapshot of the specified child node's contents.
     *
     * @param path - Path to a child.
     * @returns DataSnapshot for child node.
     */
    DataSnapshot.prototype.child = function (path) {
        util.validateArgCount('DataSnapshot.child', 0, 1, arguments.length);
        // Ensure the childPath is a string (can be a number)
        path = String(path);
        validatePathString('DataSnapshot.child', 'path', path, false);
        return new DataSnapshot(this._database, this._delegate.child(path));
    };
    /**
     * Returns whether the snapshot contains a child at the specified path.
     *
     * @param path - Path to a child.
     * @returns Whether the child exists.
     */
    DataSnapshot.prototype.hasChild = function (path) {
        util.validateArgCount('DataSnapshot.hasChild', 1, 1, arguments.length);
        validatePathString('DataSnapshot.hasChild', 'path', path, false);
        return this._delegate.hasChild(path);
    };
    /**
     * Returns the priority of the object, or null if no priority was set.
     *
     * @returns The priority.
     */
    DataSnapshot.prototype.getPriority = function () {
        util.validateArgCount('DataSnapshot.getPriority', 0, 0, arguments.length);
        return this._delegate.priority;
    };
    /**
     * Iterates through child nodes and calls the specified action for each one.
     *
     * @param action - Callback function to be called
     * for each child.
     * @returns True if forEach was canceled by action returning true for
     * one of the child nodes.
     */
    DataSnapshot.prototype.forEach = function (action) {
        var _this = this;
        util.validateArgCount('DataSnapshot.forEach', 1, 1, arguments.length);
        util.validateCallback('DataSnapshot.forEach', 'action', action, false);
        return this._delegate.forEach(function (expDataSnapshot) {
            return action(new DataSnapshot(_this._database, expDataSnapshot));
        });
    };
    /**
     * Returns whether this DataSnapshot has children.
     * @returns True if the DataSnapshot contains 1 or more child nodes.
     */
    DataSnapshot.prototype.hasChildren = function () {
        util.validateArgCount('DataSnapshot.hasChildren', 0, 0, arguments.length);
        return this._delegate.hasChildren();
    };
    Object.defineProperty(DataSnapshot.prototype, "key", {
        get: function () {
            return this._delegate.key;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the number of children for this DataSnapshot.
     * @returns The number of children that this DataSnapshot contains.
     */
    DataSnapshot.prototype.numChildren = function () {
        util.validateArgCount('DataSnapshot.numChildren', 0, 0, arguments.length);
        return this._delegate.size;
    };
    /**
     * @returns The Firebase reference for the location this snapshot's data came
     * from.
     */
    DataSnapshot.prototype.getRef = function () {
        util.validateArgCount('DataSnapshot.ref', 0, 0, arguments.length);
        return new Reference(this._database, this._delegate.ref);
    };
    Object.defineProperty(DataSnapshot.prototype, "ref", {
        get: function () {
            return this.getRef();
        },
        enumerable: false,
        configurable: true
    });
    return DataSnapshot;
}());
/**
 * A Query represents a filter to be applied to a firebase location.  This object purely represents the
 * query expression (and exposes our public API to build the query).  The actual query logic is in ViewBase.js.
 *
 * Since every Firebase reference is a query, Firebase inherits from this object.
 */
var Query = /** @class */ (function () {
    function Query(database, _delegate) {
        this.database = database;
        this._delegate = _delegate;
    }
    Query.prototype.on = function (eventType, callback, cancelCallbackOrContext, context) {
        var _this = this;
        var _a;
        util.validateArgCount('Query.on', 2, 4, arguments.length);
        util.validateCallback('Query.on', 'callback', callback, false);
        var ret = Query.getCancelAndContextArgs_('Query.on', cancelCallbackOrContext, context);
        var valueCallback = function (expSnapshot, previousChildName) {
            callback.call(ret.context, new DataSnapshot(_this.database, expSnapshot), previousChildName);
        };
        valueCallback.userCallback = callback;
        valueCallback.context = ret.context;
        var cancelCallback = (_a = ret.cancel) === null || _a === void 0 ? void 0 : _a.bind(ret.context);
        switch (eventType) {
            case 'value':
                database.onValue(this._delegate, valueCallback, cancelCallback);
                return callback;
            case 'child_added':
                database.onChildAdded(this._delegate, valueCallback, cancelCallback);
                return callback;
            case 'child_removed':
                database.onChildRemoved(this._delegate, valueCallback, cancelCallback);
                return callback;
            case 'child_changed':
                database.onChildChanged(this._delegate, valueCallback, cancelCallback);
                return callback;
            case 'child_moved':
                database.onChildMoved(this._delegate, valueCallback, cancelCallback);
                return callback;
            default:
                throw new Error(util.errorPrefix('Query.on', 'eventType') +
                    'must be a valid event type = "value", "child_added", "child_removed", ' +
                    '"child_changed", or "child_moved".');
        }
    };
    Query.prototype.off = function (eventType, callback, context) {
        util.validateArgCount('Query.off', 0, 3, arguments.length);
        validateEventType('Query.off', eventType, true);
        util.validateCallback('Query.off', 'callback', callback, true);
        util.validateContextObject('Query.off', 'context', context, true);
        if (callback) {
            var valueCallback = function () { };
            valueCallback.userCallback = callback;
            valueCallback.context = context;
            database.off(this._delegate, eventType, valueCallback);
        }
        else {
            database.off(this._delegate, eventType);
        }
    };
    /**
     * Get the server-value for this query, or return a cached value if not connected.
     */
    Query.prototype.get = function () {
        var _this = this;
        return database.get(this._delegate).then(function (expSnapshot) {
            return new DataSnapshot(_this.database, expSnapshot);
        });
    };
    /**
     * Attaches a listener, waits for the first event, and then removes the listener
     */
    Query.prototype.once = function (eventType, callback, failureCallbackOrContext, context) {
        var _this = this;
        util.validateArgCount('Query.once', 1, 4, arguments.length);
        util.validateCallback('Query.once', 'callback', callback, true);
        var ret = Query.getCancelAndContextArgs_('Query.once', failureCallbackOrContext, context);
        var deferred = new util.Deferred();
        var valueCallback = function (expSnapshot, previousChildName) {
            var result = new DataSnapshot(_this.database, expSnapshot);
            if (callback) {
                callback.call(ret.context, result, previousChildName);
            }
            deferred.resolve(result);
        };
        valueCallback.userCallback = callback;
        valueCallback.context = ret.context;
        var cancelCallback = function (error) {
            if (ret.cancel) {
                ret.cancel.call(ret.context, error);
            }
            deferred.reject(error);
        };
        switch (eventType) {
            case 'value':
                database.onValue(this._delegate, valueCallback, cancelCallback, {
                    onlyOnce: true
                });
                break;
            case 'child_added':
                database.onChildAdded(this._delegate, valueCallback, cancelCallback, {
                    onlyOnce: true
                });
                break;
            case 'child_removed':
                database.onChildRemoved(this._delegate, valueCallback, cancelCallback, {
                    onlyOnce: true
                });
                break;
            case 'child_changed':
                database.onChildChanged(this._delegate, valueCallback, cancelCallback, {
                    onlyOnce: true
                });
                break;
            case 'child_moved':
                database.onChildMoved(this._delegate, valueCallback, cancelCallback, {
                    onlyOnce: true
                });
                break;
            default:
                throw new Error(util.errorPrefix('Query.once', 'eventType') +
                    'must be a valid event type = "value", "child_added", "child_removed", ' +
                    '"child_changed", or "child_moved".');
        }
        return deferred.promise;
    };
    /**
     * Set a limit and anchor it to the start of the window.
     */
    Query.prototype.limitToFirst = function (limit) {
        util.validateArgCount('Query.limitToFirst', 1, 1, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.limitToFirst(limit)));
    };
    /**
     * Set a limit and anchor it to the end of the window.
     */
    Query.prototype.limitToLast = function (limit) {
        util.validateArgCount('Query.limitToLast', 1, 1, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.limitToLast(limit)));
    };
    /**
     * Given a child path, return a new query ordered by the specified grandchild path.
     */
    Query.prototype.orderByChild = function (path) {
        util.validateArgCount('Query.orderByChild', 1, 1, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.orderByChild(path)));
    };
    /**
     * Return a new query ordered by the KeyIndex
     */
    Query.prototype.orderByKey = function () {
        util.validateArgCount('Query.orderByKey', 0, 0, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.orderByKey()));
    };
    /**
     * Return a new query ordered by the PriorityIndex
     */
    Query.prototype.orderByPriority = function () {
        util.validateArgCount('Query.orderByPriority', 0, 0, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.orderByPriority()));
    };
    /**
     * Return a new query ordered by the ValueIndex
     */
    Query.prototype.orderByValue = function () {
        util.validateArgCount('Query.orderByValue', 0, 0, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.orderByValue()));
    };
    Query.prototype.startAt = function (value, name) {
        if (value === void 0) { value = null; }
        util.validateArgCount('Query.startAt', 0, 2, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.startAt(value, name)));
    };
    Query.prototype.startAfter = function (value, name) {
        if (value === void 0) { value = null; }
        util.validateArgCount('Query.startAfter', 0, 2, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.startAfter(value, name)));
    };
    Query.prototype.endAt = function (value, name) {
        if (value === void 0) { value = null; }
        util.validateArgCount('Query.endAt', 0, 2, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.endAt(value, name)));
    };
    Query.prototype.endBefore = function (value, name) {
        if (value === void 0) { value = null; }
        util.validateArgCount('Query.endBefore', 0, 2, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.endBefore(value, name)));
    };
    /**
     * Load the selection of children with exactly the specified value, and, optionally,
     * the specified name.
     */
    Query.prototype.equalTo = function (value, name) {
        util.validateArgCount('Query.equalTo', 1, 2, arguments.length);
        return new Query(this.database, database.query(this._delegate, database.equalTo(value, name)));
    };
    /**
     * @returns URL for this location.
     */
    Query.prototype.toString = function () {
        util.validateArgCount('Query.toString', 0, 0, arguments.length);
        return this._delegate.toString();
    };
    // Do not create public documentation. This is intended to make JSON serialization work but is otherwise unnecessary
    // for end-users.
    Query.prototype.toJSON = function () {
        // An optional spacer argument is unnecessary for a string.
        util.validateArgCount('Query.toJSON', 0, 1, arguments.length);
        return this._delegate.toJSON();
    };
    /**
     * Return true if this query and the provided query are equivalent; otherwise, return false.
     */
    Query.prototype.isEqual = function (other) {
        util.validateArgCount('Query.isEqual', 1, 1, arguments.length);
        if (!(other instanceof Query)) {
            var error = 'Query.isEqual failed: First argument must be an instance of firebase.database.Query.';
            throw new Error(error);
        }
        return this._delegate.isEqual(other._delegate);
    };
    /**
     * Helper used by .on and .once to extract the context and or cancel arguments.
     * @param fnName - The function name (on or once)
     *
     */
    Query.getCancelAndContextArgs_ = function (fnName, cancelOrContext, context) {
        var ret = { cancel: undefined, context: undefined };
        if (cancelOrContext && context) {
            ret.cancel = cancelOrContext;
            util.validateCallback(fnName, 'cancel', ret.cancel, true);
            ret.context = context;
            util.validateContextObject(fnName, 'context', ret.context, true);
        }
        else if (cancelOrContext) {
            // we have either a cancel callback or a context.
            if (typeof cancelOrContext === 'object' && cancelOrContext !== null) {
                // it's a context!
                ret.context = cancelOrContext;
            }
            else if (typeof cancelOrContext === 'function') {
                ret.cancel = cancelOrContext;
            }
            else {
                throw new Error(util.errorPrefix(fnName, 'cancelOrContext') +
                    ' must either be a cancel callback or a context object.');
            }
        }
        return ret;
    };
    Object.defineProperty(Query.prototype, "ref", {
        get: function () {
            return new Reference(this.database, new database._ReferenceImpl(this._delegate._repo, this._delegate._path));
        },
        enumerable: false,
        configurable: true
    });
    return Query;
}());
var Reference = /** @class */ (function (_super) {
    tslib.__extends(Reference, _super);
    /**
     * Call options:
     *   new Reference(Repo, Path) or
     *   new Reference(url: string, string|RepoManager)
     *
     * Externally - this is the firebase.database.Reference type.
     */
    function Reference(database$1, _delegate) {
        var _this = _super.call(this, database$1, new database._QueryImpl(_delegate._repo, _delegate._path, new QueryParams(), false)) || this;
        _this.database = database$1;
        _this._delegate = _delegate;
        return _this;
    }
    /** @returns {?string} */
    Reference.prototype.getKey = function () {
        util.validateArgCount('Reference.key', 0, 0, arguments.length);
        return this._delegate.key;
    };
    Reference.prototype.child = function (pathString) {
        util.validateArgCount('Reference.child', 1, 1, arguments.length);
        if (typeof pathString === 'number') {
            pathString = String(pathString);
        }
        return new Reference(this.database, database.child(this._delegate, pathString));
    };
    /** @returns {?Reference} */
    Reference.prototype.getParent = function () {
        util.validateArgCount('Reference.parent', 0, 0, arguments.length);
        var parent = this._delegate.parent;
        return parent ? new Reference(this.database, parent) : null;
    };
    /** @returns {!Reference} */
    Reference.prototype.getRoot = function () {
        util.validateArgCount('Reference.root', 0, 0, arguments.length);
        return new Reference(this.database, this._delegate.root);
    };
    Reference.prototype.set = function (newVal, onComplete) {
        util.validateArgCount('Reference.set', 1, 2, arguments.length);
        util.validateCallback('Reference.set', 'onComplete', onComplete, true);
        var result = database.set(this._delegate, newVal);
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    Reference.prototype.update = function (values, onComplete) {
        util.validateArgCount('Reference.update', 1, 2, arguments.length);
        if (Array.isArray(values)) {
            var newObjectToMerge = {};
            for (var i = 0; i < values.length; ++i) {
                newObjectToMerge['' + i] = values[i];
            }
            values = newObjectToMerge;
            warn('Passing an Array to Firebase.update() is deprecated. ' +
                'Use set() if you want to overwrite the existing data, or ' +
                'an Object with integer keys if you really do want to ' +
                'only update some of the children.');
        }
        validateWritablePath('Reference.update', this._delegate._path);
        util.validateCallback('Reference.update', 'onComplete', onComplete, true);
        var result = database.update(this._delegate, values);
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    Reference.prototype.setWithPriority = function (newVal, newPriority, onComplete) {
        util.validateArgCount('Reference.setWithPriority', 2, 3, arguments.length);
        util.validateCallback('Reference.setWithPriority', 'onComplete', onComplete, true);
        var result = database.setWithPriority(this._delegate, newVal, newPriority);
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    Reference.prototype.remove = function (onComplete) {
        util.validateArgCount('Reference.remove', 0, 1, arguments.length);
        util.validateCallback('Reference.remove', 'onComplete', onComplete, true);
        var result = database.remove(this._delegate);
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    Reference.prototype.transaction = function (transactionUpdate, onComplete, applyLocally) {
        var _this = this;
        util.validateArgCount('Reference.transaction', 1, 3, arguments.length);
        util.validateCallback('Reference.transaction', 'transactionUpdate', transactionUpdate, false);
        util.validateCallback('Reference.transaction', 'onComplete', onComplete, true);
        validateBoolean('Reference.transaction', 'applyLocally', applyLocally, true);
        var result = database.runTransaction(this._delegate, transactionUpdate, {
            applyLocally: applyLocally
        }).then(function (transactionResult) {
            return new TransactionResult(transactionResult.committed, new DataSnapshot(_this.database, transactionResult.snapshot));
        });
        if (onComplete) {
            result.then(function (transactionResult) {
                return onComplete(null, transactionResult.committed, transactionResult.snapshot);
            }, function (error) { return onComplete(error, false, null); });
        }
        return result;
    };
    Reference.prototype.setPriority = function (priority, onComplete) {
        util.validateArgCount('Reference.setPriority', 1, 2, arguments.length);
        util.validateCallback('Reference.setPriority', 'onComplete', onComplete, true);
        var result = database.setPriority(this._delegate, priority);
        if (onComplete) {
            result.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        return result;
    };
    Reference.prototype.push = function (value, onComplete) {
        var _this = this;
        util.validateArgCount('Reference.push', 0, 2, arguments.length);
        util.validateCallback('Reference.push', 'onComplete', onComplete, true);
        var expPromise = database.push(this._delegate, value);
        var promise = expPromise.then(function (expRef) { return new Reference(_this.database, expRef); });
        if (onComplete) {
            promise.then(function () { return onComplete(null); }, function (error) { return onComplete(error); });
        }
        var result = new Reference(this.database, expPromise);
        result.then = promise.then.bind(promise);
        result.catch = promise.catch.bind(promise, undefined);
        return result;
    };
    Reference.prototype.onDisconnect = function () {
        validateWritablePath('Reference.onDisconnect', this._delegate._path);
        return new OnDisconnect(new database.OnDisconnect(this._delegate._repo, this._delegate._path));
    };
    Object.defineProperty(Reference.prototype, "key", {
        get: function () {
            return this.getKey();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "parent", {
        get: function () {
            return this.getParent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "root", {
        get: function () {
            return this.getRoot();
        },
        enumerable: false,
        configurable: true
    });
    return Reference;
}(Query));

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
 * Class representing a firebase database.
 */
var Database = /** @class */ (function () {
    /**
     * The constructor should not be called by users of our public API.
     */
    function Database(_delegate, app) {
        var _this = this;
        this._delegate = _delegate;
        this.app = app;
        this.INTERNAL = {
            delete: function () { return _this._delegate._delete(); }
        };
    }
    /**
     * Modify this instance to communicate with the Realtime Database emulator.
     *
     * <p>Note: This method must be called before performing any other operation.
     *
     * @param host - the emulator host (ex: localhost)
     * @param port - the emulator port (ex: 8080)
     * @param options.mockUserToken - the mock auth token to use for unit testing Security Rules
     */
    Database.prototype.useEmulator = function (host, port, options) {
        if (options === void 0) { options = {}; }
        database.useDatabaseEmulator(this._delegate, host, port, options);
    };
    Database.prototype.ref = function (path) {
        util.validateArgCount('database.ref', 0, 1, arguments.length);
        if (path instanceof Reference) {
            var childRef = database.refFromURL(this._delegate, path.toString());
            return new Reference(this, childRef);
        }
        else {
            var childRef = database.ref(this._delegate, path);
            return new Reference(this, childRef);
        }
    };
    /**
     * Returns a reference to the root or the path specified in url.
     * We throw a exception if the url is not in the same domain as the
     * current repo.
     * @returns Firebase reference.
     */
    Database.prototype.refFromURL = function (url) {
        var apiName = 'database.refFromURL';
        util.validateArgCount(apiName, 1, 1, arguments.length);
        var childRef = database.refFromURL(this._delegate, url);
        return new Reference(this, childRef);
    };
    // Make individual repo go offline.
    Database.prototype.goOffline = function () {
        util.validateArgCount('database.goOffline', 0, 0, arguments.length);
        return database.goOffline(this._delegate);
    };
    Database.prototype.goOnline = function () {
        util.validateArgCount('database.goOnline', 0, 0, arguments.length);
        return database.goOnline(this._delegate);
    };
    Database.ServerValue = {
        TIMESTAMP: database.serverTimestamp(),
        increment: function (delta) { return database.increment(delta); }
    };
    return Database;
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
var PROTOCOL_VERSION = '5';
var VERSION_PARAM = 'v';
var TRANSPORT_SESSION_PARAM = 's';
var REFERER_PARAM = 'r';
var FORGE_REF = 'f';
// Matches console.firebase.google.com, firebase-console-*.corp.google.com and
// firebase.corp.google.com
var FORGE_DOMAIN_RE = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
var LAST_SESSION_PARAM = 'ls';
var APPLICATION_ID_PARAM = 'p';
var APP_CHECK_TOKEN_PARAM = 'ac';
var WEBSOCKET = 'websocket';
var LONG_POLLING = 'long_polling';

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
 * A class that holds metadata about a Repo object
 */
var RepoInfo = /** @class */ (function () {
    /**
     * @param host - Hostname portion of the url for the repo
     * @param secure - Whether or not this repo is accessed over ssl
     * @param namespace - The namespace represented by the repo
     * @param webSocketOnly - Whether to prefer websockets over all other transports (used by Nest).
     * @param nodeAdmin - Whether this instance uses Admin SDK credentials
     * @param persistenceKey - Override the default session persistence storage key
     */
    function RepoInfo(host, secure, namespace, webSocketOnly, nodeAdmin, persistenceKey, includeNamespaceInQueryParams) {
        if (nodeAdmin === void 0) { nodeAdmin = false; }
        if (persistenceKey === void 0) { persistenceKey = ''; }
        if (includeNamespaceInQueryParams === void 0) { includeNamespaceInQueryParams = false; }
        this.secure = secure;
        this.namespace = namespace;
        this.webSocketOnly = webSocketOnly;
        this.nodeAdmin = nodeAdmin;
        this.persistenceKey = persistenceKey;
        this.includeNamespaceInQueryParams = includeNamespaceInQueryParams;
        this._host = host.toLowerCase();
        this._domain = this._host.substr(this._host.indexOf('.') + 1);
        this.internalHost =
            PersistentStorage.get('host:' + host) || this._host;
    }
    RepoInfo.prototype.isCacheableHost = function () {
        return this.internalHost.substr(0, 2) === 's-';
    };
    RepoInfo.prototype.isCustomHost = function () {
        return (this._domain !== 'firebaseio.com' &&
            this._domain !== 'firebaseio-demo.com');
    };
    Object.defineProperty(RepoInfo.prototype, "host", {
        get: function () {
            return this._host;
        },
        set: function (newHost) {
            if (newHost !== this.internalHost) {
                this.internalHost = newHost;
                if (this.isCacheableHost()) {
                    PersistentStorage.set('host:' + this._host, this.internalHost);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    RepoInfo.prototype.toString = function () {
        var str = this.toURLString();
        if (this.persistenceKey) {
            str += '<' + this.persistenceKey + '>';
        }
        return str;
    };
    RepoInfo.prototype.toURLString = function () {
        var protocol = this.secure ? 'https://' : 'http://';
        var query = this.includeNamespaceInQueryParams
            ? "?ns=" + this.namespace
            : '';
        return "" + protocol + this.host + "/" + query;
    };
    return RepoInfo;
}());
function repoInfoNeedsQueryParam(repoInfo) {
    return (repoInfo.host !== repoInfo.internalHost ||
        repoInfo.isCustomHost() ||
        repoInfo.includeNamespaceInQueryParams);
}
/**
 * Returns the websocket URL for this repo
 * @param repoInfo - RepoInfo object
 * @param type - of connection
 * @param params - list
 * @returns The URL for this repo
 */
function repoInfoConnectionURL(repoInfo, type, params) {
    util.assert(typeof type === 'string', 'typeof type must == string');
    util.assert(typeof params === 'object', 'typeof params must == object');
    var connURL;
    if (type === WEBSOCKET) {
        connURL =
            (repoInfo.secure ? 'wss://' : 'ws://') + repoInfo.internalHost + '/.ws?';
    }
    else if (type === LONG_POLLING) {
        connURL =
            (repoInfo.secure ? 'https://' : 'http://') +
                repoInfo.internalHost +
                '/.lp?';
    }
    else {
        throw new Error('Unknown connection type: ' + type);
    }
    if (repoInfoNeedsQueryParam(repoInfo)) {
        params['ns'] = repoInfo.namespace;
    }
    var pairs = [];
    each(params, function (key, value) {
        pairs.push(key + '=' + value);
    });
    return connURL + pairs.join('&');
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
 * Tracks a collection of stats.
 */
var StatsCollection = /** @class */ (function () {
    function StatsCollection() {
        this.counters_ = {};
    }
    StatsCollection.prototype.incrementCounter = function (name, amount) {
        if (amount === void 0) { amount = 1; }
        if (!util.contains(this.counters_, name)) {
            this.counters_[name] = 0;
        }
        this.counters_[name] += amount;
    };
    StatsCollection.prototype.get = function () {
        return util.deepCopy(this.counters_);
    };
    return StatsCollection;
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
var collections = {};
function statsManagerGetCollection(repoInfo) {
    var hashString = repoInfo.toString();
    if (!collections[hashString]) {
        collections[hashString] = new StatsCollection();
    }
    return collections[hashString];
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
 * This class ensures the packets from the server arrive in order
 * This class takes data from the server and ensures it gets passed into the callbacks in order.
 */
var PacketReceiver = /** @class */ (function () {
    /**
     * @param onMessage_
     */
    function PacketReceiver(onMessage_) {
        this.onMessage_ = onMessage_;
        this.pendingResponses = [];
        this.currentResponseNum = 0;
        this.closeAfterResponse = -1;
        this.onClose = null;
    }
    PacketReceiver.prototype.closeAfter = function (responseNum, callback) {
        this.closeAfterResponse = responseNum;
        this.onClose = callback;
        if (this.closeAfterResponse < this.currentResponseNum) {
            this.onClose();
            this.onClose = null;
        }
    };
    /**
     * Each message from the server comes with a response number, and an array of data. The responseNumber
     * allows us to ensure that we process them in the right order, since we can't be guaranteed that all
     * browsers will respond in the same order as the requests we sent
     */
    PacketReceiver.prototype.handleResponse = function (requestNum, data) {
        var _this = this;
        this.pendingResponses[requestNum] = data;
        var _loop_1 = function () {
            var toProcess = this_1.pendingResponses[this_1.currentResponseNum];
            delete this_1.pendingResponses[this_1.currentResponseNum];
            var _loop_2 = function (i) {
                if (toProcess[i]) {
                    exceptionGuard(function () {
                        _this.onMessage_(toProcess[i]);
                    });
                }
            };
            for (var i = 0; i < toProcess.length; ++i) {
                _loop_2(i);
            }
            if (this_1.currentResponseNum === this_1.closeAfterResponse) {
                if (this_1.onClose) {
                    this_1.onClose();
                    this_1.onClose = null;
                }
                return "break";
            }
            this_1.currentResponseNum++;
        };
        var this_1 = this;
        while (this.pendingResponses[this.currentResponseNum]) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
    };
    return PacketReceiver;
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
// URL query parameters associated with longpolling
var FIREBASE_LONGPOLL_START_PARAM = 'start';
var FIREBASE_LONGPOLL_CLOSE_COMMAND = 'close';
var FIREBASE_LONGPOLL_COMMAND_CB_NAME = 'pLPCommand';
var FIREBASE_LONGPOLL_DATA_CB_NAME = 'pRTLPCB';
var FIREBASE_LONGPOLL_ID_PARAM = 'id';
var FIREBASE_LONGPOLL_PW_PARAM = 'pw';
var FIREBASE_LONGPOLL_SERIAL_PARAM = 'ser';
var FIREBASE_LONGPOLL_CALLBACK_ID_PARAM = 'cb';
var FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM = 'seg';
var FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET = 'ts';
var FIREBASE_LONGPOLL_DATA_PARAM = 'd';
var FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM = 'dframe';
//Data size constants.
//TODO: Perf: the maximum length actually differs from browser to browser.
// We should check what browser we're on and set accordingly.
var MAX_URL_DATA_SIZE = 1870;
var SEG_HEADER_SIZE = 30; //ie: &seg=8299234&ts=982389123&d=
var MAX_PAYLOAD_SIZE = MAX_URL_DATA_SIZE - SEG_HEADER_SIZE;
/**
 * Keepalive period
 * send a fresh request at minimum every 25 seconds. Opera has a maximum request
 * length of 30 seconds that we can't exceed.
 */
var KEEPALIVE_REQUEST_INTERVAL = 25000;
/**
 * How long to wait before aborting a long-polling connection attempt.
 */
var LP_CONNECT_TIMEOUT = 30000;
/**
 * This class manages a single long-polling connection.
 */
var BrowserPollConnection = /** @class */ (function () {
    /**
     * @param connId An identifier for this connection, used for logging
     * @param repoInfo The info for the endpoint to send data to.
     * @param applicationId The Firebase App ID for this project.
     * @param appCheckToken The AppCheck token for this client.
     * @param authToken The AuthToken to use for this connection.
     * @param transportSessionId Optional transportSessionid if we are
     * reconnecting for an existing transport session
     * @param lastSessionId Optional lastSessionId if the PersistentConnection has
     * already created a connection previously
     */
    function BrowserPollConnection(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
        var _this = this;
        this.connId = connId;
        this.repoInfo = repoInfo;
        this.applicationId = applicationId;
        this.appCheckToken = appCheckToken;
        this.authToken = authToken;
        this.transportSessionId = transportSessionId;
        this.lastSessionId = lastSessionId;
        this.bytesSent = 0;
        this.bytesReceived = 0;
        this.everConnected_ = false;
        this.log_ = logWrapper(connId);
        this.stats_ = statsManagerGetCollection(repoInfo);
        this.urlFn = function (params) {
            // Always add the token if we have one.
            if (_this.appCheckToken) {
                params[APP_CHECK_TOKEN_PARAM] = _this.appCheckToken;
            }
            return repoInfoConnectionURL(repoInfo, LONG_POLLING, params);
        };
    }
    /**
     * @param onMessage - Callback when messages arrive
     * @param onDisconnect - Callback with connection lost.
     */
    BrowserPollConnection.prototype.open = function (onMessage, onDisconnect) {
        var _this = this;
        this.curSegmentNum = 0;
        this.onDisconnect_ = onDisconnect;
        this.myPacketOrderer = new PacketReceiver(onMessage);
        this.isClosed_ = false;
        this.connectTimeoutTimer_ = setTimeout(function () {
            _this.log_('Timed out trying to connect.');
            // Make sure we clear the host cache
            _this.onClosed_();
            _this.connectTimeoutTimer_ = null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, Math.floor(LP_CONNECT_TIMEOUT));
        // Ensure we delay the creation of the iframe until the DOM is loaded.
        executeWhenDOMReady(function () {
            if (_this.isClosed_) {
                return;
            }
            //Set up a callback that gets triggered once a connection is set up.
            _this.scriptTagHolder = new FirebaseIFrameScriptHolder(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _a = tslib.__read(args, 5), command = _a[0], arg1 = _a[1], arg2 = _a[2]; _a[3]; _a[4];
                _this.incrementIncomingBytes_(args);
                if (!_this.scriptTagHolder) {
                    return; // we closed the connection.
                }
                if (_this.connectTimeoutTimer_) {
                    clearTimeout(_this.connectTimeoutTimer_);
                    _this.connectTimeoutTimer_ = null;
                }
                _this.everConnected_ = true;
                if (command === FIREBASE_LONGPOLL_START_PARAM) {
                    _this.id = arg1;
                    _this.password = arg2;
                }
                else if (command === FIREBASE_LONGPOLL_CLOSE_COMMAND) {
                    // Don't clear the host cache. We got a response from the server, so we know it's reachable
                    if (arg1) {
                        // We aren't expecting any more data (other than what the server's already in the process of sending us
                        // through our already open polls), so don't send any more.
                        _this.scriptTagHolder.sendNewPolls = false;
                        // arg1 in this case is the last response number sent by the server. We should try to receive
                        // all of the responses up to this one before closing
                        _this.myPacketOrderer.closeAfter(arg1, function () {
                            _this.onClosed_();
                        });
                    }
                    else {
                        _this.onClosed_();
                    }
                }
                else {
                    throw new Error('Unrecognized command received: ' + command);
                }
            }, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _a = tslib.__read(args, 2), pN = _a[0], data = _a[1];
                _this.incrementIncomingBytes_(args);
                _this.myPacketOrderer.handleResponse(pN, data);
            }, function () {
                _this.onClosed_();
            }, _this.urlFn);
            //Send the initial request to connect. The serial number is simply to keep the browser from pulling previous results
            //from cache.
            var urlParams = {};
            urlParams[FIREBASE_LONGPOLL_START_PARAM] = 't';
            urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = Math.floor(Math.random() * 100000000);
            if (_this.scriptTagHolder.uniqueCallbackIdentifier) {
                urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM] = _this.scriptTagHolder.uniqueCallbackIdentifier;
            }
            urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
            if (_this.transportSessionId) {
                urlParams[TRANSPORT_SESSION_PARAM] = _this.transportSessionId;
            }
            if (_this.lastSessionId) {
                urlParams[LAST_SESSION_PARAM] = _this.lastSessionId;
            }
            if (_this.applicationId) {
                urlParams[APPLICATION_ID_PARAM] = _this.applicationId;
            }
            if (_this.appCheckToken) {
                urlParams[APP_CHECK_TOKEN_PARAM] = _this.appCheckToken;
            }
            if (typeof location !== 'undefined' &&
                location.hostname &&
                FORGE_DOMAIN_RE.test(location.hostname)) {
                urlParams[REFERER_PARAM] = FORGE_REF;
            }
            var connectURL = _this.urlFn(urlParams);
            _this.log_('Connecting via long-poll to ' + connectURL);
            _this.scriptTagHolder.addTag(connectURL, function () {
                /* do nothing */
            });
        });
    };
    /**
     * Call this when a handshake has completed successfully and we want to consider the connection established
     */
    BrowserPollConnection.prototype.start = function () {
        this.scriptTagHolder.startLongPoll(this.id, this.password);
        this.addDisconnectPingFrame(this.id, this.password);
    };
    /**
     * Forces long polling to be considered as a potential transport
     */
    BrowserPollConnection.forceAllow = function () {
        BrowserPollConnection.forceAllow_ = true;
    };
    /**
     * Forces longpolling to not be considered as a potential transport
     */
    BrowserPollConnection.forceDisallow = function () {
        BrowserPollConnection.forceDisallow_ = true;
    };
    // Static method, use string literal so it can be accessed in a generic way
    BrowserPollConnection.isAvailable = function () {
        if (util.isNodeSdk()) {
            return false;
        }
        else if (BrowserPollConnection.forceAllow_) {
            return true;
        }
        else {
            // NOTE: In React-Native there's normally no 'document', but if you debug a React-Native app in
            // the Chrome debugger, 'document' is defined, but document.createElement is null (2015/06/08).
            return (!BrowserPollConnection.forceDisallow_ &&
                typeof document !== 'undefined' &&
                document.createElement != null &&
                !isChromeExtensionContentScript() &&
                !isWindowsStoreApp());
        }
    };
    /**
     * No-op for polling
     */
    BrowserPollConnection.prototype.markConnectionHealthy = function () { };
    /**
     * Stops polling and cleans up the iframe
     */
    BrowserPollConnection.prototype.shutdown_ = function () {
        this.isClosed_ = true;
        if (this.scriptTagHolder) {
            this.scriptTagHolder.close();
            this.scriptTagHolder = null;
        }
        //remove the disconnect frame, which will trigger an XHR call to the server to tell it we're leaving.
        if (this.myDisconnFrame) {
            document.body.removeChild(this.myDisconnFrame);
            this.myDisconnFrame = null;
        }
        if (this.connectTimeoutTimer_) {
            clearTimeout(this.connectTimeoutTimer_);
            this.connectTimeoutTimer_ = null;
        }
    };
    /**
     * Triggered when this transport is closed
     */
    BrowserPollConnection.prototype.onClosed_ = function () {
        if (!this.isClosed_) {
            this.log_('Longpoll is closing itself');
            this.shutdown_();
            if (this.onDisconnect_) {
                this.onDisconnect_(this.everConnected_);
                this.onDisconnect_ = null;
            }
        }
    };
    /**
     * External-facing close handler. RealTime has requested we shut down. Kill our connection and tell the server
     * that we've left.
     */
    BrowserPollConnection.prototype.close = function () {
        if (!this.isClosed_) {
            this.log_('Longpoll is being closed.');
            this.shutdown_();
        }
    };
    /**
     * Send the JSON object down to the server. It will need to be stringified, base64 encoded, and then
     * broken into chunks (since URLs have a small maximum length).
     * @param data - The JSON data to transmit.
     */
    BrowserPollConnection.prototype.send = function (data) {
        var dataStr = util.stringify(data);
        this.bytesSent += dataStr.length;
        this.stats_.incrementCounter('bytes_sent', dataStr.length);
        //first, lets get the base64-encoded data
        var base64data = util.base64Encode(dataStr);
        //We can only fit a certain amount in each URL, so we need to split this request
        //up into multiple pieces if it doesn't fit in one request.
        var dataSegs = splitStringBySize(base64data, MAX_PAYLOAD_SIZE);
        //Enqueue each segment for transmission. We assign each chunk a sequential ID and a total number
        //of segments so that we can reassemble the packet on the server.
        for (var i = 0; i < dataSegs.length; i++) {
            this.scriptTagHolder.enqueueSegment(this.curSegmentNum, dataSegs.length, dataSegs[i]);
            this.curSegmentNum++;
        }
    };
    /**
     * This is how we notify the server that we're leaving.
     * We aren't able to send requests with DHTML on a window close event, but we can
     * trigger XHR requests in some browsers (everything but Opera basically).
     */
    BrowserPollConnection.prototype.addDisconnectPingFrame = function (id, pw) {
        if (util.isNodeSdk()) {
            return;
        }
        this.myDisconnFrame = document.createElement('iframe');
        var urlParams = {};
        urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM] = 't';
        urlParams[FIREBASE_LONGPOLL_ID_PARAM] = id;
        urlParams[FIREBASE_LONGPOLL_PW_PARAM] = pw;
        this.myDisconnFrame.src = this.urlFn(urlParams);
        this.myDisconnFrame.style.display = 'none';
        document.body.appendChild(this.myDisconnFrame);
    };
    /**
     * Used to track the bytes received by this client
     */
    BrowserPollConnection.prototype.incrementIncomingBytes_ = function (args) {
        // TODO: This is an annoying perf hit just to track the number of incoming bytes.  Maybe it should be opt-in.
        var bytesReceived = util.stringify(args).length;
        this.bytesReceived += bytesReceived;
        this.stats_.incrementCounter('bytes_received', bytesReceived);
    };
    return BrowserPollConnection;
}());
/*********************************************************************************************
 * A wrapper around an iframe that is used as a long-polling script holder.
 *********************************************************************************************/
var FirebaseIFrameScriptHolder = /** @class */ (function () {
    /**
     * @param commandCB - The callback to be called when control commands are recevied from the server.
     * @param onMessageCB - The callback to be triggered when responses arrive from the server.
     * @param onDisconnect - The callback to be triggered when this tag holder is closed
     * @param urlFn - A function that provides the URL of the endpoint to send data to.
     */
    function FirebaseIFrameScriptHolder(commandCB, onMessageCB, onDisconnect, urlFn) {
        this.onDisconnect = onDisconnect;
        this.urlFn = urlFn;
        //We maintain a count of all of the outstanding requests, because if we have too many active at once it can cause
        //problems in some browsers.
        this.outstandingRequests = new Set();
        //A queue of the pending segments waiting for transmission to the server.
        this.pendingSegs = [];
        //A serial number. We use this for two things:
        // 1) A way to ensure the browser doesn't cache responses to polls
        // 2) A way to make the server aware when long-polls arrive in a different order than we started them. The
        //    server needs to release both polls in this case or it will cause problems in Opera since Opera can only execute
        //    JSONP code in the order it was added to the iframe.
        this.currentSerial = Math.floor(Math.random() * 100000000);
        // This gets set to false when we're "closing down" the connection (e.g. we're switching transports but there's still
        // incoming data from the server that we're waiting for).
        this.sendNewPolls = true;
        if (!util.isNodeSdk()) {
            //Each script holder registers a couple of uniquely named callbacks with the window. These are called from the
            //iframes where we put the long-polling script tags. We have two callbacks:
            //   1) Command Callback - Triggered for control issues, like starting a connection.
            //   2) Message Callback - Triggered when new data arrives.
            this.uniqueCallbackIdentifier = LUIDGenerator();
            window[FIREBASE_LONGPOLL_COMMAND_CB_NAME + this.uniqueCallbackIdentifier] = commandCB;
            window[FIREBASE_LONGPOLL_DATA_CB_NAME + this.uniqueCallbackIdentifier] = onMessageCB;
            //Create an iframe for us to add script tags to.
            this.myIFrame = FirebaseIFrameScriptHolder.createIFrame_();
            // Set the iframe's contents.
            var script = '';
            // if we set a javascript url, it's IE and we need to set the document domain. The javascript url is sufficient
            // for ie9, but ie8 needs to do it again in the document itself.
            if (this.myIFrame.src &&
                this.myIFrame.src.substr(0, 'javascript:'.length) === 'javascript:') {
                var currentDomain = document.domain;
                script = '<script>document.domain="' + currentDomain + '";</script>';
            }
            var iframeContents = '<html><body>' + script + '</body></html>';
            try {
                this.myIFrame.doc.open();
                this.myIFrame.doc.write(iframeContents);
                this.myIFrame.doc.close();
            }
            catch (e) {
                log('frame writing exception');
                if (e.stack) {
                    log(e.stack);
                }
                log(e);
            }
        }
        else {
            this.commandCB = commandCB;
            this.onMessageCB = onMessageCB;
        }
    }
    /**
     * Each browser has its own funny way to handle iframes. Here we mush them all together into one object that I can
     * actually use.
     */
    FirebaseIFrameScriptHolder.createIFrame_ = function () {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        // This is necessary in order to initialize the document inside the iframe
        if (document.body) {
            document.body.appendChild(iframe);
            try {
                // If document.domain has been modified in IE, this will throw an error, and we need to set the
                // domain of the iframe's document manually. We can do this via a javascript: url as the src attribute
                // Also note that we must do this *after* the iframe has been appended to the page. Otherwise it doesn't work.
                var a = iframe.contentWindow.document;
                if (!a) {
                    // Apologies for the log-spam, I need to do something to keep closure from optimizing out the assignment above.
                    log('No IE domain setting required');
                }
            }
            catch (e) {
                var domain = document.domain;
                iframe.src =
                    "javascript:void((function(){document.open();document.domain='" +
                        domain +
                        "';document.close();})())";
            }
        }
        else {
            // LongPollConnection attempts to delay initialization until the document is ready, so hopefully this
            // never gets hit.
            throw 'Document body has not initialized. Wait to initialize Firebase until after the document is ready.';
        }
        // Get the document of the iframe in a browser-specific way.
        if (iframe.contentDocument) {
            iframe.doc = iframe.contentDocument; // Firefox, Opera, Safari
        }
        else if (iframe.contentWindow) {
            iframe.doc = iframe.contentWindow.document; // Internet Explorer
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (iframe.document) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            iframe.doc = iframe.document; //others?
        }
        return iframe;
    };
    /**
     * Cancel all outstanding queries and remove the frame.
     */
    FirebaseIFrameScriptHolder.prototype.close = function () {
        var _this = this;
        //Mark this iframe as dead, so no new requests are sent.
        this.alive = false;
        if (this.myIFrame) {
            //We have to actually remove all of the html inside this iframe before removing it from the
            //window, or IE will continue loading and executing the script tags we've already added, which
            //can lead to some errors being thrown. Setting innerHTML seems to be the easiest way to do this.
            this.myIFrame.doc.body.innerHTML = '';
            setTimeout(function () {
                if (_this.myIFrame !== null) {
                    document.body.removeChild(_this.myIFrame);
                    _this.myIFrame = null;
                }
            }, Math.floor(0));
        }
        // Protect from being called recursively.
        var onDisconnect = this.onDisconnect;
        if (onDisconnect) {
            this.onDisconnect = null;
            onDisconnect();
        }
    };
    /**
     * Actually start the long-polling session by adding the first script tag(s) to the iframe.
     * @param id - The ID of this connection
     * @param pw - The password for this connection
     */
    FirebaseIFrameScriptHolder.prototype.startLongPoll = function (id, pw) {
        this.myID = id;
        this.myPW = pw;
        this.alive = true;
        //send the initial request. If there are requests queued, make sure that we transmit as many as we are currently able to.
        while (this.newRequest_()) { }
    };
    /**
     * This is called any time someone might want a script tag to be added. It adds a script tag when there aren't
     * too many outstanding requests and we are still alive.
     *
     * If there are outstanding packet segments to send, it sends one. If there aren't, it sends a long-poll anyways if
     * needed.
     */
    FirebaseIFrameScriptHolder.prototype.newRequest_ = function () {
        // We keep one outstanding request open all the time to receive data, but if we need to send data
        // (pendingSegs.length > 0) then we create a new request to send the data.  The server will automatically
        // close the old request.
        if (this.alive &&
            this.sendNewPolls &&
            this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
            //construct our url
            this.currentSerial++;
            var urlParams = {};
            urlParams[FIREBASE_LONGPOLL_ID_PARAM] = this.myID;
            urlParams[FIREBASE_LONGPOLL_PW_PARAM] = this.myPW;
            urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = this.currentSerial;
            var theURL = this.urlFn(urlParams);
            //Now add as much data as we can.
            var curDataString = '';
            var i = 0;
            while (this.pendingSegs.length > 0) {
                //first, lets see if the next segment will fit.
                var nextSeg = this.pendingSegs[0];
                if (nextSeg.d.length +
                    SEG_HEADER_SIZE +
                    curDataString.length <=
                    MAX_URL_DATA_SIZE) {
                    //great, the segment will fit. Lets append it.
                    var theSeg = this.pendingSegs.shift();
                    curDataString =
                        curDataString +
                            '&' +
                            FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM +
                            i +
                            '=' +
                            theSeg.seg +
                            '&' +
                            FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET +
                            i +
                            '=' +
                            theSeg.ts +
                            '&' +
                            FIREBASE_LONGPOLL_DATA_PARAM +
                            i +
                            '=' +
                            theSeg.d;
                    i++;
                }
                else {
                    break;
                }
            }
            theURL = theURL + curDataString;
            this.addLongPollTag_(theURL, this.currentSerial);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Queue a packet for transmission to the server.
     * @param segnum - A sequential id for this packet segment used for reassembly
     * @param totalsegs - The total number of segments in this packet
     * @param data - The data for this segment.
     */
    FirebaseIFrameScriptHolder.prototype.enqueueSegment = function (segnum, totalsegs, data) {
        //add this to the queue of segments to send.
        this.pendingSegs.push({ seg: segnum, ts: totalsegs, d: data });
        //send the data immediately if there isn't already data being transmitted, unless
        //startLongPoll hasn't been called yet.
        if (this.alive) {
            this.newRequest_();
        }
    };
    /**
     * Add a script tag for a regular long-poll request.
     * @param url - The URL of the script tag.
     * @param serial - The serial number of the request.
     */
    FirebaseIFrameScriptHolder.prototype.addLongPollTag_ = function (url, serial) {
        var _this = this;
        //remember that we sent this request.
        this.outstandingRequests.add(serial);
        var doNewRequest = function () {
            _this.outstandingRequests.delete(serial);
            _this.newRequest_();
        };
        // If this request doesn't return on its own accord (by the server sending us some data), we'll
        // create a new one after the KEEPALIVE interval to make sure we always keep a fresh request open.
        var keepaliveTimeout = setTimeout(doNewRequest, Math.floor(KEEPALIVE_REQUEST_INTERVAL));
        var readyStateCB = function () {
            // Request completed.  Cancel the keepalive.
            clearTimeout(keepaliveTimeout);
            // Trigger a new request so we can continue receiving data.
            doNewRequest();
        };
        this.addTag(url, readyStateCB);
    };
    /**
     * Add an arbitrary script tag to the iframe.
     * @param url - The URL for the script tag source.
     * @param loadCB - A callback to be triggered once the script has loaded.
     */
    FirebaseIFrameScriptHolder.prototype.addTag = function (url, loadCB) {
        var _this = this;
        if (util.isNodeSdk()) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.doNodeLongPoll(url, loadCB);
        }
        else {
            setTimeout(function () {
                try {
                    // if we're already closed, don't add this poll
                    if (!_this.sendNewPolls) {
                        return;
                    }
                    var newScript_1 = _this.myIFrame.doc.createElement('script');
                    newScript_1.type = 'text/javascript';
                    newScript_1.async = true;
                    newScript_1.src = url;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newScript_1.onload = newScript_1.onreadystatechange = function () {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var rstate = newScript_1.readyState;
                        if (!rstate || rstate === 'loaded' || rstate === 'complete') {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            newScript_1.onload = newScript_1.onreadystatechange = null;
                            if (newScript_1.parentNode) {
                                newScript_1.parentNode.removeChild(newScript_1);
                            }
                            loadCB();
                        }
                    };
                    newScript_1.onerror = function () {
                        log('Long-poll script failed to load: ' + url);
                        _this.sendNewPolls = false;
                        _this.close();
                    };
                    _this.myIFrame.doc.body.appendChild(newScript_1);
                }
                catch (e) {
                    // TODO: we should make this error visible somehow
                }
            }, Math.floor(1));
        }
    };
    return FirebaseIFrameScriptHolder;
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
/** The semver (www.semver.org) version of the SDK. */
var SDK_VERSION = '';
// SDK_VERSION should be set before any database instance is created
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
var WEBSOCKET_MAX_FRAME_SIZE = 16384;
var WEBSOCKET_KEEPALIVE_INTERVAL = 45000;
var WebSocketImpl = null;
if (typeof MozWebSocket !== 'undefined') {
    WebSocketImpl = MozWebSocket;
}
else if (typeof WebSocket !== 'undefined') {
    WebSocketImpl = WebSocket;
}
function setWebSocketImpl(impl) {
    WebSocketImpl = impl;
}
/**
 * Create a new websocket connection with the given callbacks.
 */
var WebSocketConnection = /** @class */ (function () {
    /**
     * @param connId identifier for this transport
     * @param repoInfo The info for the websocket endpoint.
     * @param applicationId The Firebase App ID for this project.
     * @param appCheckToken The App Check Token for this client.
     * @param authToken The Auth Token for this client.
     * @param transportSessionId Optional transportSessionId if this is connecting
     * to an existing transport session
     * @param lastSessionId Optional lastSessionId if there was a previous
     * connection
     */
    function WebSocketConnection(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
        this.connId = connId;
        this.applicationId = applicationId;
        this.appCheckToken = appCheckToken;
        this.authToken = authToken;
        this.keepaliveTimer = null;
        this.frames = null;
        this.totalFrames = 0;
        this.bytesSent = 0;
        this.bytesReceived = 0;
        this.log_ = logWrapper(this.connId);
        this.stats_ = statsManagerGetCollection(repoInfo);
        this.connURL = WebSocketConnection.connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken);
        this.nodeAdmin = repoInfo.nodeAdmin;
    }
    /**
     * @param repoInfo - The info for the websocket endpoint.
     * @param transportSessionId - Optional transportSessionId if this is connecting to an existing transport
     *                                         session
     * @param lastSessionId - Optional lastSessionId if there was a previous connection
     * @returns connection url
     */
    WebSocketConnection.connectionURL_ = function (repoInfo, transportSessionId, lastSessionId, appCheckToken) {
        var urlParams = {};
        urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
        if (!util.isNodeSdk() &&
            typeof location !== 'undefined' &&
            location.hostname &&
            FORGE_DOMAIN_RE.test(location.hostname)) {
            urlParams[REFERER_PARAM] = FORGE_REF;
        }
        if (transportSessionId) {
            urlParams[TRANSPORT_SESSION_PARAM] = transportSessionId;
        }
        if (lastSessionId) {
            urlParams[LAST_SESSION_PARAM] = lastSessionId;
        }
        if (appCheckToken) {
            urlParams[APP_CHECK_TOKEN_PARAM] = appCheckToken;
        }
        return repoInfoConnectionURL(repoInfo, WEBSOCKET, urlParams);
    };
    /**
     * @param onMessage - Callback when messages arrive
     * @param onDisconnect - Callback with connection lost.
     */
    WebSocketConnection.prototype.open = function (onMessage, onDisconnect) {
        var _this = this;
        this.onDisconnect = onDisconnect;
        this.onMessage = onMessage;
        this.log_('Websocket connecting to ' + this.connURL);
        this.everConnected_ = false;
        // Assume failure until proven otherwise.
        PersistentStorage.set('previous_websocket_failure', true);
        try {
            if (util.isNodeSdk()) {
                var device = this.nodeAdmin ? 'AdminNode' : 'Node';
                // UA Format: Firebase/<wire_protocol>/<sdk_version>/<platform>/<device>
                var options = {
                    headers: {
                        'User-Agent': "Firebase/" + PROTOCOL_VERSION + "/" + SDK_VERSION + "/" + process.platform + "/" + device,
                        'X-Firebase-GMPID': this.applicationId || ''
                    }
                };
                // If using Node with admin creds, AppCheck-related checks are unnecessary.
                // Note that we send the credentials here even if they aren't admin credentials, which is
                // not a problem.
                // Note that this header is just used to bypass appcheck, and the token should still be sent
                // through the websocket connection once it is established.
                if (this.authToken) {
                    options.headers['Authorization'] = "Bearer " + this.authToken;
                }
                if (this.appCheckToken) {
                    options.headers['X-Firebase-AppCheck'] = this.appCheckToken;
                }
                // Plumb appropriate http_proxy environment variable into faye-websocket if it exists.
                var env = process['env'];
                var proxy = this.connURL.indexOf('wss://') === 0
                    ? env['HTTPS_PROXY'] || env['https_proxy']
                    : env['HTTP_PROXY'] || env['http_proxy'];
                if (proxy) {
                    options['proxy'] = { origin: proxy };
                }
                this.mySock = new WebSocketImpl(this.connURL, [], options);
            }
            else {
                var options = {
                    headers: {
                        'X-Firebase-GMPID': this.applicationId || '',
                        'X-Firebase-AppCheck': this.appCheckToken || ''
                    }
                };
                this.mySock = new WebSocketImpl(this.connURL, [], options);
            }
        }
        catch (e) {
            this.log_('Error instantiating WebSocket.');
            var error = e.message || e.data;
            if (error) {
                this.log_(error);
            }
            this.onClosed_();
            return;
        }
        this.mySock.onopen = function () {
            _this.log_('Websocket connected.');
            _this.everConnected_ = true;
        };
        this.mySock.onclose = function () {
            _this.log_('Websocket connection was disconnected.');
            _this.mySock = null;
            _this.onClosed_();
        };
        this.mySock.onmessage = function (m) {
            _this.handleIncomingFrame(m);
        };
        this.mySock.onerror = function (e) {
            _this.log_('WebSocket error.  Closing connection.');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var error = e.message || e.data;
            if (error) {
                _this.log_(error);
            }
            _this.onClosed_();
        };
    };
    /**
     * No-op for websockets, we don't need to do anything once the connection is confirmed as open
     */
    WebSocketConnection.prototype.start = function () { };
    WebSocketConnection.forceDisallow = function () {
        WebSocketConnection.forceDisallow_ = true;
    };
    WebSocketConnection.isAvailable = function () {
        var isOldAndroid = false;
        if (typeof navigator !== 'undefined' && navigator.userAgent) {
            var oldAndroidRegex = /Android ([0-9]{0,}\.[0-9]{0,})/;
            var oldAndroidMatch = navigator.userAgent.match(oldAndroidRegex);
            if (oldAndroidMatch && oldAndroidMatch.length > 1) {
                if (parseFloat(oldAndroidMatch[1]) < 4.4) {
                    isOldAndroid = true;
                }
            }
        }
        return (!isOldAndroid &&
            WebSocketImpl !== null &&
            !WebSocketConnection.forceDisallow_);
    };
    /**
     * Returns true if we previously failed to connect with this transport.
     */
    WebSocketConnection.previouslyFailed = function () {
        // If our persistent storage is actually only in-memory storage,
        // we default to assuming that it previously failed to be safe.
        return (PersistentStorage.isInMemoryStorage ||
            PersistentStorage.get('previous_websocket_failure') === true);
    };
    WebSocketConnection.prototype.markConnectionHealthy = function () {
        PersistentStorage.remove('previous_websocket_failure');
    };
    WebSocketConnection.prototype.appendFrame_ = function (data) {
        this.frames.push(data);
        if (this.frames.length === this.totalFrames) {
            var fullMess = this.frames.join('');
            this.frames = null;
            var jsonMess = util.jsonEval(fullMess);
            //handle the message
            this.onMessage(jsonMess);
        }
    };
    /**
     * @param frameCount - The number of frames we are expecting from the server
     */
    WebSocketConnection.prototype.handleNewFrameCount_ = function (frameCount) {
        this.totalFrames = frameCount;
        this.frames = [];
    };
    /**
     * Attempts to parse a frame count out of some text. If it can't, assumes a value of 1
     * @returns Any remaining data to be process, or null if there is none
     */
    WebSocketConnection.prototype.extractFrameCount_ = function (data) {
        util.assert(this.frames === null, 'We already have a frame buffer');
        // TODO: The server is only supposed to send up to 9999 frames (i.e. length <= 4), but that isn't being enforced
        // currently.  So allowing larger frame counts (length <= 6).  See https://app.asana.com/0/search/8688598998380/8237608042508
        if (data.length <= 6) {
            var frameCount = Number(data);
            if (!isNaN(frameCount)) {
                this.handleNewFrameCount_(frameCount);
                return null;
            }
        }
        this.handleNewFrameCount_(1);
        return data;
    };
    /**
     * Process a websocket frame that has arrived from the server.
     * @param mess - The frame data
     */
    WebSocketConnection.prototype.handleIncomingFrame = function (mess) {
        if (this.mySock === null) {
            return; // Chrome apparently delivers incoming packets even after we .close() the connection sometimes.
        }
        var data = mess['data'];
        this.bytesReceived += data.length;
        this.stats_.incrementCounter('bytes_received', data.length);
        this.resetKeepAlive();
        if (this.frames !== null) {
            // we're buffering
            this.appendFrame_(data);
        }
        else {
            // try to parse out a frame count, otherwise, assume 1 and process it
            var remainingData = this.extractFrameCount_(data);
            if (remainingData !== null) {
                this.appendFrame_(remainingData);
            }
        }
    };
    /**
     * Send a message to the server
     * @param data - The JSON object to transmit
     */
    WebSocketConnection.prototype.send = function (data) {
        this.resetKeepAlive();
        var dataStr = util.stringify(data);
        this.bytesSent += dataStr.length;
        this.stats_.incrementCounter('bytes_sent', dataStr.length);
        //We can only fit a certain amount in each websocket frame, so we need to split this request
        //up into multiple pieces if it doesn't fit in one request.
        var dataSegs = splitStringBySize(dataStr, WEBSOCKET_MAX_FRAME_SIZE);
        //Send the length header
        if (dataSegs.length > 1) {
            this.sendString_(String(dataSegs.length));
        }
        //Send the actual data in segments.
        for (var i = 0; i < dataSegs.length; i++) {
            this.sendString_(dataSegs[i]);
        }
    };
    WebSocketConnection.prototype.shutdown_ = function () {
        this.isClosed_ = true;
        if (this.keepaliveTimer) {
            clearInterval(this.keepaliveTimer);
            this.keepaliveTimer = null;
        }
        if (this.mySock) {
            this.mySock.close();
            this.mySock = null;
        }
    };
    WebSocketConnection.prototype.onClosed_ = function () {
        if (!this.isClosed_) {
            this.log_('WebSocket is closing itself');
            this.shutdown_();
            // since this is an internal close, trigger the close listener
            if (this.onDisconnect) {
                this.onDisconnect(this.everConnected_);
                this.onDisconnect = null;
            }
        }
    };
    /**
     * External-facing close handler.
     * Close the websocket and kill the connection.
     */
    WebSocketConnection.prototype.close = function () {
        if (!this.isClosed_) {
            this.log_('WebSocket is being closed');
            this.shutdown_();
        }
    };
    /**
     * Kill the current keepalive timer and start a new one, to ensure that it always fires N seconds after
     * the last activity.
     */
    WebSocketConnection.prototype.resetKeepAlive = function () {
        var _this = this;
        clearInterval(this.keepaliveTimer);
        this.keepaliveTimer = setInterval(function () {
            //If there has been no websocket activity for a while, send a no-op
            if (_this.mySock) {
                _this.sendString_('0');
            }
            _this.resetKeepAlive();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
    };
    /**
     * Send a string over the websocket.
     *
     * @param str - String to send.
     */
    WebSocketConnection.prototype.sendString_ = function (str) {
        // Firefox seems to sometimes throw exceptions (NS_ERROR_UNEXPECTED) from websocket .send()
        // calls for some unknown reason.  We treat these as an error and disconnect.
        // See https://app.asana.com/0/58926111402292/68021340250410
        try {
            this.mySock.send(str);
        }
        catch (e) {
            this.log_('Exception thrown from WebSocket.send():', e.message || e.data, 'Closing connection.');
            setTimeout(this.onClosed_.bind(this), 0);
        }
    };
    /**
     * Number of response before we consider the connection "healthy."
     */
    WebSocketConnection.responsesRequiredToBeHealthy = 2;
    /**
     * Time to wait for the connection te become healthy before giving up.
     */
    WebSocketConnection.healthyTimeout = 30000;
    return WebSocketConnection;
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
 * Currently simplistic, this class manages what transport a Connection should use at various stages of its
 * lifecycle.
 *
 * It starts with longpolling in a browser, and httppolling on node. It then upgrades to websockets if
 * they are available.
 */
var TransportManager = /** @class */ (function () {
    /**
     * @param repoInfo - Metadata around the namespace we're connecting to
     */
    function TransportManager(repoInfo) {
        this.initTransports_(repoInfo);
    }
    Object.defineProperty(TransportManager, "ALL_TRANSPORTS", {
        get: function () {
            return [BrowserPollConnection, WebSocketConnection];
        },
        enumerable: false,
        configurable: true
    });
    TransportManager.prototype.initTransports_ = function (repoInfo) {
        var e_1, _a;
        var isWebSocketsAvailable = WebSocketConnection && WebSocketConnection['isAvailable']();
        var isSkipPollConnection = isWebSocketsAvailable && !WebSocketConnection.previouslyFailed();
        if (repoInfo.webSocketOnly) {
            if (!isWebSocketsAvailable) {
                warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");
            }
            isSkipPollConnection = true;
        }
        if (isSkipPollConnection) {
            this.transports_ = [WebSocketConnection];
        }
        else {
            var transports = (this.transports_ = []);
            try {
                for (var _b = tslib.__values(TransportManager.ALL_TRANSPORTS), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var transport = _c.value;
                    if (transport && transport['isAvailable']()) {
                        transports.push(transport);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    /**
     * @returns The constructor for the initial transport to use
     */
    TransportManager.prototype.initialTransport = function () {
        if (this.transports_.length > 0) {
            return this.transports_[0];
        }
        else {
            throw new Error('No transports available');
        }
    };
    /**
     * @returns The constructor for the next transport, or null
     */
    TransportManager.prototype.upgradeTransport = function () {
        if (this.transports_.length > 1) {
            return this.transports_[1];
        }
        else {
            return null;
        }
    };
    return TransportManager;
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
// Abort upgrade attempt if it takes longer than 60s.
var UPGRADE_TIMEOUT = 60000;
// For some transports (WebSockets), we need to "validate" the transport by exchanging a few requests and responses.
// If we haven't sent enough requests within 5s, we'll start sending noop ping requests.
var DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5000;
// If the initial data sent triggers a lot of bandwidth (i.e. it's a large put or a listen for a large amount of data)
// then we may not be able to exchange our ping/pong requests within the healthy timeout.  So if we reach the timeout
// but we've sent/received enough bytes, we don't cancel the connection.
var BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
var BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
var MESSAGE_TYPE = 't';
var MESSAGE_DATA = 'd';
var CONTROL_SHUTDOWN = 's';
var CONTROL_RESET = 'r';
var CONTROL_ERROR = 'e';
var CONTROL_PONG = 'o';
var SWITCH_ACK = 'a';
var END_TRANSMISSION = 'n';
var PING = 'p';
var SERVER_HELLO = 'h';
/**
 * Creates a new real-time connection to the server using whichever method works
 * best in the current browser.
 */
var Connection = /** @class */ (function () {
    /**
     * @param id - an id for this connection
     * @param repoInfo_ - the info for the endpoint to connect to
     * @param applicationId_ - the Firebase App ID for this project
     * @param appCheckToken_ - The App Check Token for this device.
     * @param authToken_ - The auth token for this session.
     * @param onMessage_ - the callback to be triggered when a server-push message arrives
     * @param onReady_ - the callback to be triggered when this connection is ready to send messages.
     * @param onDisconnect_ - the callback to be triggered when a connection was lost
     * @param onKill_ - the callback to be triggered when this connection has permanently shut down.
     * @param lastSessionId - last session id in persistent connection. is used to clean up old session in real-time server
     */
    function Connection(id, repoInfo_, applicationId_, appCheckToken_, authToken_, onMessage_, onReady_, onDisconnect_, onKill_, lastSessionId) {
        this.id = id;
        this.repoInfo_ = repoInfo_;
        this.applicationId_ = applicationId_;
        this.appCheckToken_ = appCheckToken_;
        this.authToken_ = authToken_;
        this.onMessage_ = onMessage_;
        this.onReady_ = onReady_;
        this.onDisconnect_ = onDisconnect_;
        this.onKill_ = onKill_;
        this.lastSessionId = lastSessionId;
        this.connectionCount = 0;
        this.pendingDataMessages = [];
        this.state_ = 0 /* CONNECTING */;
        this.log_ = logWrapper('c:' + this.id + ':');
        this.transportManager_ = new TransportManager(repoInfo_);
        this.log_('Connection created');
        this.start_();
    }
    /**
     * Starts a connection attempt
     */
    Connection.prototype.start_ = function () {
        var _this = this;
        var conn = this.transportManager_.initialTransport();
        this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId);
        // For certain transports (WebSockets), we need to send and receive several messages back and forth before we
        // can consider the transport healthy.
        this.primaryResponsesRequired_ = conn['responsesRequiredToBeHealthy'] || 0;
        var onMessageReceived = this.connReceiver_(this.conn_);
        var onConnectionLost = this.disconnReceiver_(this.conn_);
        this.tx_ = this.conn_;
        this.rx_ = this.conn_;
        this.secondaryConn_ = null;
        this.isHealthy_ = false;
        /*
         * Firefox doesn't like when code from one iframe tries to create another iframe by way of the parent frame.
         * This can occur in the case of a redirect, i.e. we guessed wrong on what server to connect to and received a reset.
         * Somehow, setTimeout seems to make this ok. That doesn't make sense from a security perspective, since you should
         * still have the context of your originating frame.
         */
        setTimeout(function () {
            // this.conn_ gets set to null in some of the tests. Check to make sure it still exists before using it
            _this.conn_ && _this.conn_.open(onMessageReceived, onConnectionLost);
        }, Math.floor(0));
        var healthyTimeoutMS = conn['healthyTimeout'] || 0;
        if (healthyTimeoutMS > 0) {
            this.healthyTimeout_ = setTimeoutNonBlocking(function () {
                _this.healthyTimeout_ = null;
                if (!_this.isHealthy_) {
                    if (_this.conn_ &&
                        _this.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
                        _this.log_('Connection exceeded healthy timeout but has received ' +
                            _this.conn_.bytesReceived +
                            ' bytes.  Marking connection healthy.');
                        _this.isHealthy_ = true;
                        _this.conn_.markConnectionHealthy();
                    }
                    else if (_this.conn_ &&
                        _this.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) {
                        _this.log_('Connection exceeded healthy timeout but has sent ' +
                            _this.conn_.bytesSent +
                            ' bytes.  Leaving connection alive.');
                        // NOTE: We don't want to mark it healthy, since we have no guarantee that the bytes have made it to
                        // the server.
                    }
                    else {
                        _this.log_('Closing unhealthy connection after timeout.');
                        _this.close();
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, Math.floor(healthyTimeoutMS));
        }
    };
    Connection.prototype.nextTransportId_ = function () {
        return 'c:' + this.id + ':' + this.connectionCount++;
    };
    Connection.prototype.disconnReceiver_ = function (conn) {
        var _this = this;
        return function (everConnected) {
            if (conn === _this.conn_) {
                _this.onConnectionLost_(everConnected);
            }
            else if (conn === _this.secondaryConn_) {
                _this.log_('Secondary connection lost.');
                _this.onSecondaryConnectionLost_();
            }
            else {
                _this.log_('closing an old connection');
            }
        };
    };
    Connection.prototype.connReceiver_ = function (conn) {
        var _this = this;
        return function (message) {
            if (_this.state_ !== 2 /* DISCONNECTED */) {
                if (conn === _this.rx_) {
                    _this.onPrimaryMessageReceived_(message);
                }
                else if (conn === _this.secondaryConn_) {
                    _this.onSecondaryMessageReceived_(message);
                }
                else {
                    _this.log_('message on old connection');
                }
            }
        };
    };
    /**
     * @param dataMsg - An arbitrary data message to be sent to the server
     */
    Connection.prototype.sendRequest = function (dataMsg) {
        // wrap in a data message envelope and send it on
        var msg = { t: 'd', d: dataMsg };
        this.sendData_(msg);
    };
    Connection.prototype.tryCleanupConnection = function () {
        if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
            this.log_('cleaning up and promoting a connection: ' + this.secondaryConn_.connId);
            this.conn_ = this.secondaryConn_;
            this.secondaryConn_ = null;
            // the server will shutdown the old connection
        }
    };
    Connection.prototype.onSecondaryControl_ = function (controlData) {
        if (MESSAGE_TYPE in controlData) {
            var cmd = controlData[MESSAGE_TYPE];
            if (cmd === SWITCH_ACK) {
                this.upgradeIfSecondaryHealthy_();
            }
            else if (cmd === CONTROL_RESET) {
                // Most likely the session wasn't valid. Abandon the switch attempt
                this.log_('Got a reset on secondary, closing it');
                this.secondaryConn_.close();
                // If we were already using this connection for something, than we need to fully close
                if (this.tx_ === this.secondaryConn_ ||
                    this.rx_ === this.secondaryConn_) {
                    this.close();
                }
            }
            else if (cmd === CONTROL_PONG) {
                this.log_('got pong on secondary.');
                this.secondaryResponsesRequired_--;
                this.upgradeIfSecondaryHealthy_();
            }
        }
    };
    Connection.prototype.onSecondaryMessageReceived_ = function (parsedData) {
        var layer = requireKey('t', parsedData);
        var data = requireKey('d', parsedData);
        if (layer === 'c') {
            this.onSecondaryControl_(data);
        }
        else if (layer === 'd') {
            // got a data message, but we're still second connection. Need to buffer it up
            this.pendingDataMessages.push(data);
        }
        else {
            throw new Error('Unknown protocol layer: ' + layer);
        }
    };
    Connection.prototype.upgradeIfSecondaryHealthy_ = function () {
        if (this.secondaryResponsesRequired_ <= 0) {
            this.log_('Secondary connection is healthy.');
            this.isHealthy_ = true;
            this.secondaryConn_.markConnectionHealthy();
            this.proceedWithUpgrade_();
        }
        else {
            // Send a ping to make sure the connection is healthy.
            this.log_('sending ping on secondary.');
            this.secondaryConn_.send({ t: 'c', d: { t: PING, d: {} } });
        }
    };
    Connection.prototype.proceedWithUpgrade_ = function () {
        // tell this connection to consider itself open
        this.secondaryConn_.start();
        // send ack
        this.log_('sending client ack on secondary');
        this.secondaryConn_.send({ t: 'c', d: { t: SWITCH_ACK, d: {} } });
        // send end packet on primary transport, switch to sending on this one
        // can receive on this one, buffer responses until end received on primary transport
        this.log_('Ending transmission on primary');
        this.conn_.send({ t: 'c', d: { t: END_TRANSMISSION, d: {} } });
        this.tx_ = this.secondaryConn_;
        this.tryCleanupConnection();
    };
    Connection.prototype.onPrimaryMessageReceived_ = function (parsedData) {
        // Must refer to parsedData properties in quotes, so closure doesn't touch them.
        var layer = requireKey('t', parsedData);
        var data = requireKey('d', parsedData);
        if (layer === 'c') {
            this.onControl_(data);
        }
        else if (layer === 'd') {
            this.onDataMessage_(data);
        }
    };
    Connection.prototype.onDataMessage_ = function (message) {
        this.onPrimaryResponse_();
        // We don't do anything with data messages, just kick them up a level
        this.onMessage_(message);
    };
    Connection.prototype.onPrimaryResponse_ = function () {
        if (!this.isHealthy_) {
            this.primaryResponsesRequired_--;
            if (this.primaryResponsesRequired_ <= 0) {
                this.log_('Primary connection is healthy.');
                this.isHealthy_ = true;
                this.conn_.markConnectionHealthy();
            }
        }
    };
    Connection.prototype.onControl_ = function (controlData) {
        var cmd = requireKey(MESSAGE_TYPE, controlData);
        if (MESSAGE_DATA in controlData) {
            var payload = controlData[MESSAGE_DATA];
            if (cmd === SERVER_HELLO) {
                this.onHandshake_(payload);
            }
            else if (cmd === END_TRANSMISSION) {
                this.log_('recvd end transmission on primary');
                this.rx_ = this.secondaryConn_;
                for (var i = 0; i < this.pendingDataMessages.length; ++i) {
                    this.onDataMessage_(this.pendingDataMessages[i]);
                }
                this.pendingDataMessages = [];
                this.tryCleanupConnection();
            }
            else if (cmd === CONTROL_SHUTDOWN) {
                // This was previously the 'onKill' callback passed to the lower-level connection
                // payload in this case is the reason for the shutdown. Generally a human-readable error
                this.onConnectionShutdown_(payload);
            }
            else if (cmd === CONTROL_RESET) {
                // payload in this case is the host we should contact
                this.onReset_(payload);
            }
            else if (cmd === CONTROL_ERROR) {
                error('Server Error: ' + payload);
            }
            else if (cmd === CONTROL_PONG) {
                this.log_('got pong on primary.');
                this.onPrimaryResponse_();
                this.sendPingOnPrimaryIfNecessary_();
            }
            else {
                error('Unknown control packet command: ' + cmd);
            }
        }
    };
    /**
     * @param handshake - The handshake data returned from the server
     */
    Connection.prototype.onHandshake_ = function (handshake) {
        var timestamp = handshake.ts;
        var version = handshake.v;
        var host = handshake.h;
        this.sessionId = handshake.s;
        this.repoInfo_.host = host;
        // if we've already closed the connection, then don't bother trying to progress further
        if (this.state_ === 0 /* CONNECTING */) {
            this.conn_.start();
            this.onConnectionEstablished_(this.conn_, timestamp);
            if (PROTOCOL_VERSION !== version) {
                warn('Protocol version mismatch detected');
            }
            // TODO: do we want to upgrade? when? maybe a delay?
            this.tryStartUpgrade_();
        }
    };
    Connection.prototype.tryStartUpgrade_ = function () {
        var conn = this.transportManager_.upgradeTransport();
        if (conn) {
            this.startUpgrade_(conn);
        }
    };
    Connection.prototype.startUpgrade_ = function (conn) {
        var _this = this;
        this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId);
        // For certain transports (WebSockets), we need to send and receive several messages back and forth before we
        // can consider the transport healthy.
        this.secondaryResponsesRequired_ =
            conn['responsesRequiredToBeHealthy'] || 0;
        var onMessage = this.connReceiver_(this.secondaryConn_);
        var onDisconnect = this.disconnReceiver_(this.secondaryConn_);
        this.secondaryConn_.open(onMessage, onDisconnect);
        // If we haven't successfully upgraded after UPGRADE_TIMEOUT, give up and kill the secondary.
        setTimeoutNonBlocking(function () {
            if (_this.secondaryConn_) {
                _this.log_('Timed out trying to upgrade.');
                _this.secondaryConn_.close();
            }
        }, Math.floor(UPGRADE_TIMEOUT));
    };
    Connection.prototype.onReset_ = function (host) {
        this.log_('Reset packet received.  New host: ' + host);
        this.repoInfo_.host = host;
        // TODO: if we're already "connected", we need to trigger a disconnect at the next layer up.
        // We don't currently support resets after the connection has already been established
        if (this.state_ === 1 /* CONNECTED */) {
            this.close();
        }
        else {
            // Close whatever connections we have open and start again.
            this.closeConnections_();
            this.start_();
        }
    };
    Connection.prototype.onConnectionEstablished_ = function (conn, timestamp) {
        var _this = this;
        this.log_('Realtime connection established.');
        this.conn_ = conn;
        this.state_ = 1 /* CONNECTED */;
        if (this.onReady_) {
            this.onReady_(timestamp, this.sessionId);
            this.onReady_ = null;
        }
        // If after 5 seconds we haven't sent enough requests to the server to get the connection healthy,
        // send some pings.
        if (this.primaryResponsesRequired_ === 0) {
            this.log_('Primary connection is healthy.');
            this.isHealthy_ = true;
        }
        else {
            setTimeoutNonBlocking(function () {
                _this.sendPingOnPrimaryIfNecessary_();
            }, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
        }
    };
    Connection.prototype.sendPingOnPrimaryIfNecessary_ = function () {
        // If the connection isn't considered healthy yet, we'll send a noop ping packet request.
        if (!this.isHealthy_ && this.state_ === 1 /* CONNECTED */) {
            this.log_('sending ping on primary.');
            this.sendData_({ t: 'c', d: { t: PING, d: {} } });
        }
    };
    Connection.prototype.onSecondaryConnectionLost_ = function () {
        var conn = this.secondaryConn_;
        this.secondaryConn_ = null;
        if (this.tx_ === conn || this.rx_ === conn) {
            // we are relying on this connection already in some capacity. Therefore, a failure is real
            this.close();
        }
    };
    /**
     * @param everConnected - Whether or not the connection ever reached a server. Used to determine if
     * we should flush the host cache
     */
    Connection.prototype.onConnectionLost_ = function (everConnected) {
        this.conn_ = null;
        // NOTE: IF you're seeing a Firefox error for this line, I think it might be because it's getting
        // called on window close and RealtimeState.CONNECTING is no longer defined.  Just a guess.
        if (!everConnected && this.state_ === 0 /* CONNECTING */) {
            this.log_('Realtime connection failed.');
            // Since we failed to connect at all, clear any cached entry for this namespace in case the machine went away
            if (this.repoInfo_.isCacheableHost()) {
                PersistentStorage.remove('host:' + this.repoInfo_.host);
                // reset the internal host to what we would show the user, i.e. <ns>.firebaseio.com
                this.repoInfo_.internalHost = this.repoInfo_.host;
            }
        }
        else if (this.state_ === 1 /* CONNECTED */) {
            this.log_('Realtime connection lost.');
        }
        this.close();
    };
    Connection.prototype.onConnectionShutdown_ = function (reason) {
        this.log_('Connection shutdown command received. Shutting down...');
        if (this.onKill_) {
            this.onKill_(reason);
            this.onKill_ = null;
        }
        // We intentionally don't want to fire onDisconnect (kill is a different case),
        // so clear the callback.
        this.onDisconnect_ = null;
        this.close();
    };
    Connection.prototype.sendData_ = function (data) {
        if (this.state_ !== 1 /* CONNECTED */) {
            throw 'Connection is not connected';
        }
        else {
            this.tx_.send(data);
        }
    };
    /**
     * Cleans up this connection, calling the appropriate callbacks
     */
    Connection.prototype.close = function () {
        if (this.state_ !== 2 /* DISCONNECTED */) {
            this.log_('Closing realtime connection.');
            this.state_ = 2 /* DISCONNECTED */;
            this.closeConnections_();
            if (this.onDisconnect_) {
                this.onDisconnect_();
                this.onDisconnect_ = null;
            }
        }
    };
    Connection.prototype.closeConnections_ = function () {
        this.log_('Shutting down all connections');
        if (this.conn_) {
            this.conn_.close();
            this.conn_ = null;
        }
        if (this.secondaryConn_) {
            this.secondaryConn_.close();
            this.secondaryConn_ = null;
        }
        if (this.healthyTimeout_) {
            clearTimeout(this.healthyTimeout_);
            this.healthyTimeout_ = null;
        }
    };
    return Connection;
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
 * Interface defining the set of actions that can be performed against the Firebase server
 * (basically corresponds to our wire protocol).
 *
 * @interface
 */
var ServerActions = /** @class */ (function () {
    function ServerActions() {
    }
    ServerActions.prototype.put = function (pathString, data, onComplete, hash) { };
    ServerActions.prototype.merge = function (pathString, data, onComplete, hash) { };
    /**
     * Refreshes the auth token for the current connection.
     * @param token - The authentication token
     */
    ServerActions.prototype.refreshAuthToken = function (token) { };
    /**
     * Refreshes the app check token for the current connection.
     * @param token The app check token
     */
    ServerActions.prototype.refreshAppCheckToken = function (token) { };
    ServerActions.prototype.onDisconnectPut = function (pathString, data, onComplete) { };
    ServerActions.prototype.onDisconnectMerge = function (pathString, data, onComplete) { };
    ServerActions.prototype.onDisconnectCancel = function (pathString, onComplete) { };
    ServerActions.prototype.reportStats = function (stats) { };
    return ServerActions;
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
 * Base class to be used if you want to emit events. Call the constructor with
 * the set of allowed event names.
 */
var EventEmitter = /** @class */ (function () {
    function EventEmitter(allowedEvents_) {
        this.allowedEvents_ = allowedEvents_;
        this.listeners_ = {};
        util.assert(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, 'Requires a non-empty array');
    }
    /**
     * To be called by derived classes to trigger events.
     */
    EventEmitter.prototype.trigger = function (eventType) {
        var varArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            varArgs[_i - 1] = arguments[_i];
        }
        if (Array.isArray(this.listeners_[eventType])) {
            // Clone the list, since callbacks could add/remove listeners.
            var listeners = tslib.__spreadArray([], tslib.__read(this.listeners_[eventType]));
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].callback.apply(listeners[i].context, varArgs);
            }
        }
    };
    EventEmitter.prototype.on = function (eventType, callback, context) {
        this.validateEventType_(eventType);
        this.listeners_[eventType] = this.listeners_[eventType] || [];
        this.listeners_[eventType].push({ callback: callback, context: context });
        var eventData = this.getInitialEvent(eventType);
        if (eventData) {
            callback.apply(context, eventData);
        }
    };
    EventEmitter.prototype.off = function (eventType, callback, context) {
        this.validateEventType_(eventType);
        var listeners = this.listeners_[eventType] || [];
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i].callback === callback &&
                (!context || context === listeners[i].context)) {
                listeners.splice(i, 1);
                return;
            }
        }
    };
    EventEmitter.prototype.validateEventType_ = function (eventType) {
        util.assert(this.allowedEvents_.find(function (et) {
            return et === eventType;
        }), 'Unknown event: ' + eventType);
    };
    return EventEmitter;
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
 * Monitors online state (as reported by window.online/offline events).
 *
 * The expectation is that this could have many false positives (thinks we are online
 * when we're not), but no false negatives.  So we can safely use it to determine when
 * we definitely cannot reach the internet.
 */
var OnlineMonitor = /** @class */ (function (_super) {
    tslib.__extends(OnlineMonitor, _super);
    function OnlineMonitor() {
        var _this = _super.call(this, ['online']) || this;
        _this.online_ = true;
        // We've had repeated complaints that Cordova apps can get stuck "offline", e.g.
        // https://forum.ionicframework.com/t/firebase-connection-is-lost-and-never-come-back/43810
        // It would seem that the 'online' event does not always fire consistently. So we disable it
        // for Cordova.
        if (typeof window !== 'undefined' &&
            typeof window.addEventListener !== 'undefined' &&
            !util.isMobileCordova()) {
            window.addEventListener('online', function () {
                if (!_this.online_) {
                    _this.online_ = true;
                    _this.trigger('online', true);
                }
            }, false);
            window.addEventListener('offline', function () {
                if (_this.online_) {
                    _this.online_ = false;
                    _this.trigger('online', false);
                }
            }, false);
        }
        return _this;
    }
    OnlineMonitor.getInstance = function () {
        return new OnlineMonitor();
    };
    OnlineMonitor.prototype.getInitialEvent = function (eventType) {
        util.assert(eventType === 'online', 'Unknown event type: ' + eventType);
        return [this.online_];
    };
    OnlineMonitor.prototype.currentlyOnline = function () {
        return this.online_;
    };
    return OnlineMonitor;
}(EventEmitter));

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
var VisibilityMonitor = /** @class */ (function (_super) {
    tslib.__extends(VisibilityMonitor, _super);
    function VisibilityMonitor() {
        var _this = _super.call(this, ['visible']) || this;
        var hidden;
        var visibilityChange;
        if (typeof document !== 'undefined' &&
            typeof document.addEventListener !== 'undefined') {
            if (typeof document['hidden'] !== 'undefined') {
                // Opera 12.10 and Firefox 18 and later support
                visibilityChange = 'visibilitychange';
                hidden = 'hidden';
            }
            else if (typeof document['mozHidden'] !== 'undefined') {
                visibilityChange = 'mozvisibilitychange';
                hidden = 'mozHidden';
            }
            else if (typeof document['msHidden'] !== 'undefined') {
                visibilityChange = 'msvisibilitychange';
                hidden = 'msHidden';
            }
            else if (typeof document['webkitHidden'] !== 'undefined') {
                visibilityChange = 'webkitvisibilitychange';
                hidden = 'webkitHidden';
            }
        }
        // Initially, we always assume we are visible. This ensures that in browsers
        // without page visibility support or in cases where we are never visible
        // (e.g. chrome extension), we act as if we are visible, i.e. don't delay
        // reconnects
        _this.visible_ = true;
        if (visibilityChange) {
            document.addEventListener(visibilityChange, function () {
                var visible = !document[hidden];
                if (visible !== _this.visible_) {
                    _this.visible_ = visible;
                    _this.trigger('visible', visible);
                }
            }, false);
        }
        return _this;
    }
    VisibilityMonitor.getInstance = function () {
        return new VisibilityMonitor();
    };
    VisibilityMonitor.prototype.getInitialEvent = function (eventType) {
        util.assert(eventType === 'visible', 'Unknown event type: ' + eventType);
        return [this.visible_];
    };
    return VisibilityMonitor;
}(EventEmitter));

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
var RECONNECT_MIN_DELAY = 1000;
var RECONNECT_MAX_DELAY_DEFAULT = 60 * 5 * 1000; // 5 minutes in milliseconds (Case: 1858)
var GET_CONNECT_TIMEOUT = 3 * 1000;
var RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1000; // 30 seconds for admin clients (likely to be a backend server)
var RECONNECT_DELAY_MULTIPLIER = 1.3;
var RECONNECT_DELAY_RESET_TIMEOUT = 30000; // Reset delay back to MIN_DELAY after being connected for 30sec.
var SERVER_KILL_INTERRUPT_REASON = 'server_kill';
// If auth fails repeatedly, we'll assume something is wrong and log a warning / back off.
var INVALID_TOKEN_THRESHOLD = 3;
/**
 * Firebase connection.  Abstracts wire protocol and handles reconnecting.
 *
 * NOTE: All JSON objects sent to the realtime connection must have property names enclosed
 * in quotes to make sure the closure compiler does not minify them.
 */
var PersistentConnection = /** @class */ (function (_super) {
    tslib.__extends(PersistentConnection, _super);
    /**
     * @param repoInfo_ - Data about the namespace we are connecting to
     * @param applicationId_ - The Firebase App ID for this project
     * @param onDataUpdate_ - A callback for new data from the server
     */
    function PersistentConnection(repoInfo_, applicationId_, onDataUpdate_, onConnectStatus_, onServerInfoUpdate_, authTokenProvider_, appCheckTokenProvider_, authOverride_) {
        var _this = _super.call(this) || this;
        _this.repoInfo_ = repoInfo_;
        _this.applicationId_ = applicationId_;
        _this.onDataUpdate_ = onDataUpdate_;
        _this.onConnectStatus_ = onConnectStatus_;
        _this.onServerInfoUpdate_ = onServerInfoUpdate_;
        _this.authTokenProvider_ = authTokenProvider_;
        _this.appCheckTokenProvider_ = appCheckTokenProvider_;
        _this.authOverride_ = authOverride_;
        // Used for diagnostic logging.
        _this.id = PersistentConnection.nextPersistentConnectionId_++;
        _this.log_ = logWrapper('p:' + _this.id + ':');
        _this.interruptReasons_ = {};
        _this.listens = new Map();
        _this.outstandingPuts_ = [];
        _this.outstandingGets_ = [];
        _this.outstandingPutCount_ = 0;
        _this.outstandingGetCount_ = 0;
        _this.onDisconnectRequestQueue_ = [];
        _this.connected_ = false;
        _this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        _this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
        _this.securityDebugCallback_ = null;
        _this.lastSessionId = null;
        _this.establishConnectionTimer_ = null;
        _this.visible_ = false;
        // Before we get connected, we keep a queue of pending messages to send.
        _this.requestCBHash_ = {};
        _this.requestNumber_ = 0;
        _this.realtime_ = null;
        _this.authToken_ = null;
        _this.appCheckToken_ = null;
        _this.forceTokenRefresh_ = false;
        _this.invalidAuthTokenCount_ = 0;
        _this.invalidAppCheckTokenCount_ = 0;
        _this.firstConnection_ = true;
        _this.lastConnectionAttemptTime_ = null;
        _this.lastConnectionEstablishedTime_ = null;
        if (authOverride_ && !util.isNodeSdk()) {
            throw new Error('Auth override specified in options, but not supported on non Node.js platforms');
        }
        VisibilityMonitor.getInstance().on('visible', _this.onVisible_, _this);
        if (repoInfo_.host.indexOf('fblocal') === -1) {
            OnlineMonitor.getInstance().on('online', _this.onOnline_, _this);
        }
        return _this;
    }
    PersistentConnection.prototype.sendRequest = function (action, body, onResponse) {
        var curReqNum = ++this.requestNumber_;
        var msg = { r: curReqNum, a: action, b: body };
        this.log_(util.stringify(msg));
        util.assert(this.connected_, "sendRequest call when we're not connected not allowed.");
        this.realtime_.sendRequest(msg);
        if (onResponse) {
            this.requestCBHash_[curReqNum] = onResponse;
        }
    };
    PersistentConnection.prototype.get = function (query) {
        var _this = this;
        this.initConnection_();
        var deferred = new util.Deferred();
        var request = {
            p: query._path.toString(),
            q: query._queryObject
        };
        var outstandingGet = {
            action: 'g',
            request: request,
            onComplete: function (message) {
                var payload = message['d'];
                if (message['s'] === 'ok') {
                    _this.onDataUpdate_(request['p'], payload, 
                    /*isMerge*/ false, 
                    /*tag*/ null);
                    deferred.resolve(payload);
                }
                else {
                    deferred.reject(payload);
                }
            }
        };
        this.outstandingGets_.push(outstandingGet);
        this.outstandingGetCount_++;
        var index = this.outstandingGets_.length - 1;
        if (!this.connected_) {
            setTimeout(function () {
                var get = _this.outstandingGets_[index];
                if (get === undefined || outstandingGet !== get) {
                    return;
                }
                delete _this.outstandingGets_[index];
                _this.outstandingGetCount_--;
                if (_this.outstandingGetCount_ === 0) {
                    _this.outstandingGets_ = [];
                }
                _this.log_('get ' + index + ' timed out on connection');
                deferred.reject(new Error('Client is offline.'));
            }, GET_CONNECT_TIMEOUT);
        }
        if (this.connected_) {
            this.sendGet_(index);
        }
        return deferred.promise;
    };
    PersistentConnection.prototype.listen = function (query, currentHashFn, tag, onComplete) {
        this.initConnection_();
        var queryId = query._queryIdentifier;
        var pathString = query._path.toString();
        this.log_('Listen called for ' + pathString + ' ' + queryId);
        if (!this.listens.has(pathString)) {
            this.listens.set(pathString, new Map());
        }
        util.assert(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), 'listen() called for non-default but complete query');
        util.assert(!this.listens.get(pathString).has(queryId), 'listen() called twice for same path/queryId.');
        var listenSpec = {
            onComplete: onComplete,
            hashFn: currentHashFn,
            query: query,
            tag: tag
        };
        this.listens.get(pathString).set(queryId, listenSpec);
        if (this.connected_) {
            this.sendListen_(listenSpec);
        }
    };
    PersistentConnection.prototype.sendGet_ = function (index) {
        var _this = this;
        var get = this.outstandingGets_[index];
        this.sendRequest('g', get.request, function (message) {
            delete _this.outstandingGets_[index];
            _this.outstandingGetCount_--;
            if (_this.outstandingGetCount_ === 0) {
                _this.outstandingGets_ = [];
            }
            if (get.onComplete) {
                get.onComplete(message);
            }
        });
    };
    PersistentConnection.prototype.sendListen_ = function (listenSpec) {
        var _this = this;
        var query = listenSpec.query;
        var pathString = query._path.toString();
        var queryId = query._queryIdentifier;
        this.log_('Listen on ' + pathString + ' for ' + queryId);
        var req = { /*path*/ p: pathString };
        var action = 'q';
        // Only bother to send query if it's non-default.
        if (listenSpec.tag) {
            req['q'] = query._queryObject;
            req['t'] = listenSpec.tag;
        }
        req[ /*hash*/'h'] = listenSpec.hashFn();
        this.sendRequest(action, req, function (message) {
            var payload = message[ /*data*/'d'];
            var status = message[ /*status*/'s'];
            // print warnings in any case...
            PersistentConnection.warnOnListenWarnings_(payload, query);
            var currentListenSpec = _this.listens.get(pathString) &&
                _this.listens.get(pathString).get(queryId);
            // only trigger actions if the listen hasn't been removed and readded
            if (currentListenSpec === listenSpec) {
                _this.log_('listen response', message);
                if (status !== 'ok') {
                    _this.removeListen_(pathString, queryId);
                }
                if (listenSpec.onComplete) {
                    listenSpec.onComplete(status, payload);
                }
            }
        });
    };
    PersistentConnection.warnOnListenWarnings_ = function (payload, query) {
        if (payload && typeof payload === 'object' && util.contains(payload, 'w')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var warnings = util.safeGet(payload, 'w');
            if (Array.isArray(warnings) && ~warnings.indexOf('no_index')) {
                var indexSpec = '".indexOn": "' + query._queryParams.getIndex().toString() + '"';
                var indexPath = query._path.toString();
                warn("Using an unspecified index. Your data will be downloaded and " +
                    ("filtered on the client. Consider adding " + indexSpec + " at ") +
                    (indexPath + " to your security rules for better performance."));
            }
        }
    };
    PersistentConnection.prototype.refreshAuthToken = function (token) {
        this.authToken_ = token;
        this.log_('Auth token refreshed');
        if (this.authToken_) {
            this.tryAuth();
        }
        else {
            //If we're connected we want to let the server know to unauthenticate us. If we're not connected, simply delete
            //the credential so we dont become authenticated next time we connect.
            if (this.connected_) {
                this.sendRequest('unauth', {}, function () { });
            }
        }
        this.reduceReconnectDelayIfAdminCredential_(token);
    };
    PersistentConnection.prototype.reduceReconnectDelayIfAdminCredential_ = function (credential) {
        // NOTE: This isn't intended to be bulletproof (a malicious developer can always just modify the client).
        // Additionally, we don't bother resetting the max delay back to the default if auth fails / expires.
        var isFirebaseSecret = credential && credential.length === 40;
        if (isFirebaseSecret || util.isAdmin(credential)) {
            this.log_('Admin auth credential detected.  Reducing max reconnect time.');
            this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
        }
    };
    PersistentConnection.prototype.refreshAppCheckToken = function (token) {
        this.appCheckToken_ = token;
        this.log_('App check token refreshed');
        if (this.appCheckToken_) {
            this.tryAppCheck();
        }
        else {
            //If we're connected we want to let the server know to unauthenticate us.
            //If we're not connected, simply delete the credential so we dont become
            // authenticated next time we connect.
            if (this.connected_) {
                this.sendRequest('unappeck', {}, function () { });
            }
        }
    };
    /**
     * Attempts to authenticate with the given credentials. If the authentication attempt fails, it's triggered like
     * a auth revoked (the connection is closed).
     */
    PersistentConnection.prototype.tryAuth = function () {
        var _this = this;
        if (this.connected_ && this.authToken_) {
            var token_1 = this.authToken_;
            var authMethod = util.isValidFormat(token_1) ? 'auth' : 'gauth';
            var requestData = { cred: token_1 };
            if (this.authOverride_ === null) {
                requestData['noauth'] = true;
            }
            else if (typeof this.authOverride_ === 'object') {
                requestData['authvar'] = this.authOverride_;
            }
            this.sendRequest(authMethod, requestData, function (res) {
                var status = res[ /*status*/'s'];
                var data = res[ /*data*/'d'] || 'error';
                if (_this.authToken_ === token_1) {
                    if (status === 'ok') {
                        _this.invalidAuthTokenCount_ = 0;
                    }
                    else {
                        // Triggers reconnect and force refresh for auth token
                        _this.onAuthRevoked_(status, data);
                    }
                }
            });
        }
    };
    /**
     * Attempts to authenticate with the given token. If the authentication
     * attempt fails, it's triggered like the token was revoked (the connection is
     * closed).
     */
    PersistentConnection.prototype.tryAppCheck = function () {
        var _this = this;
        if (this.connected_ && this.appCheckToken_) {
            this.sendRequest('appcheck', { 'token': this.appCheckToken_ }, function (res) {
                var status = res[ /*status*/'s'];
                var data = res[ /*data*/'d'] || 'error';
                if (status === 'ok') {
                    _this.invalidAppCheckTokenCount_ = 0;
                }
                else {
                    _this.onAppCheckRevoked_(status, data);
                }
            });
        }
    };
    /**
     * @inheritDoc
     */
    PersistentConnection.prototype.unlisten = function (query, tag) {
        var pathString = query._path.toString();
        var queryId = query._queryIdentifier;
        this.log_('Unlisten called for ' + pathString + ' ' + queryId);
        util.assert(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), 'unlisten() called for non-default but complete query');
        var listen = this.removeListen_(pathString, queryId);
        if (listen && this.connected_) {
            this.sendUnlisten_(pathString, queryId, query._queryObject, tag);
        }
    };
    PersistentConnection.prototype.sendUnlisten_ = function (pathString, queryId, queryObj, tag) {
        this.log_('Unlisten on ' + pathString + ' for ' + queryId);
        var req = { /*path*/ p: pathString };
        var action = 'n';
        // Only bother sending queryId if it's non-default.
        if (tag) {
            req['q'] = queryObj;
            req['t'] = tag;
        }
        this.sendRequest(action, req);
    };
    PersistentConnection.prototype.onDisconnectPut = function (pathString, data, onComplete) {
        this.initConnection_();
        if (this.connected_) {
            this.sendOnDisconnect_('o', pathString, data, onComplete);
        }
        else {
            this.onDisconnectRequestQueue_.push({
                pathString: pathString,
                action: 'o',
                data: data,
                onComplete: onComplete
            });
        }
    };
    PersistentConnection.prototype.onDisconnectMerge = function (pathString, data, onComplete) {
        this.initConnection_();
        if (this.connected_) {
            this.sendOnDisconnect_('om', pathString, data, onComplete);
        }
        else {
            this.onDisconnectRequestQueue_.push({
                pathString: pathString,
                action: 'om',
                data: data,
                onComplete: onComplete
            });
        }
    };
    PersistentConnection.prototype.onDisconnectCancel = function (pathString, onComplete) {
        this.initConnection_();
        if (this.connected_) {
            this.sendOnDisconnect_('oc', pathString, null, onComplete);
        }
        else {
            this.onDisconnectRequestQueue_.push({
                pathString: pathString,
                action: 'oc',
                data: null,
                onComplete: onComplete
            });
        }
    };
    PersistentConnection.prototype.sendOnDisconnect_ = function (action, pathString, data, onComplete) {
        var request = { /*path*/ p: pathString, /*data*/ d: data };
        this.log_('onDisconnect ' + action, request);
        this.sendRequest(action, request, function (response) {
            if (onComplete) {
                setTimeout(function () {
                    onComplete(response[ /*status*/'s'], response[ /* data */'d']);
                }, Math.floor(0));
            }
        });
    };
    PersistentConnection.prototype.put = function (pathString, data, onComplete, hash) {
        this.putInternal('p', pathString, data, onComplete, hash);
    };
    PersistentConnection.prototype.merge = function (pathString, data, onComplete, hash) {
        this.putInternal('m', pathString, data, onComplete, hash);
    };
    PersistentConnection.prototype.putInternal = function (action, pathString, data, onComplete, hash) {
        this.initConnection_();
        var request = {
            /*path*/ p: pathString,
            /*data*/ d: data
        };
        if (hash !== undefined) {
            request[ /*hash*/'h'] = hash;
        }
        // TODO: Only keep track of the most recent put for a given path?
        this.outstandingPuts_.push({
            action: action,
            request: request,
            onComplete: onComplete
        });
        this.outstandingPutCount_++;
        var index = this.outstandingPuts_.length - 1;
        if (this.connected_) {
            this.sendPut_(index);
        }
        else {
            this.log_('Buffering put: ' + pathString);
        }
    };
    PersistentConnection.prototype.sendPut_ = function (index) {
        var _this = this;
        var action = this.outstandingPuts_[index].action;
        var request = this.outstandingPuts_[index].request;
        var onComplete = this.outstandingPuts_[index].onComplete;
        this.outstandingPuts_[index].queued = this.connected_;
        this.sendRequest(action, request, function (message) {
            _this.log_(action + ' response', message);
            delete _this.outstandingPuts_[index];
            _this.outstandingPutCount_--;
            // Clean up array occasionally.
            if (_this.outstandingPutCount_ === 0) {
                _this.outstandingPuts_ = [];
            }
            if (onComplete) {
                onComplete(message[ /*status*/'s'], message[ /* data */'d']);
            }
        });
    };
    PersistentConnection.prototype.reportStats = function (stats) {
        var _this = this;
        // If we're not connected, we just drop the stats.
        if (this.connected_) {
            var request = { /*counters*/ c: stats };
            this.log_('reportStats', request);
            this.sendRequest(/*stats*/ 's', request, function (result) {
                var status = result[ /*status*/'s'];
                if (status !== 'ok') {
                    var errorReason = result[ /* data */'d'];
                    _this.log_('reportStats', 'Error sending stats: ' + errorReason);
                }
            });
        }
    };
    PersistentConnection.prototype.onDataMessage_ = function (message) {
        if ('r' in message) {
            // this is a response
            this.log_('from server: ' + util.stringify(message));
            var reqNum = message['r'];
            var onResponse = this.requestCBHash_[reqNum];
            if (onResponse) {
                delete this.requestCBHash_[reqNum];
                onResponse(message[ /*body*/'b']);
            }
        }
        else if ('error' in message) {
            throw 'A server-side error has occurred: ' + message['error'];
        }
        else if ('a' in message) {
            // a and b are action and body, respectively
            this.onDataPush_(message['a'], message['b']);
        }
    };
    PersistentConnection.prototype.onDataPush_ = function (action, body) {
        this.log_('handleServerMessage', action, body);
        if (action === 'd') {
            this.onDataUpdate_(body[ /*path*/'p'], body[ /*data*/'d'], 
            /*isMerge*/ false, body['t']);
        }
        else if (action === 'm') {
            this.onDataUpdate_(body[ /*path*/'p'], body[ /*data*/'d'], 
            /*isMerge=*/ true, body['t']);
        }
        else if (action === 'c') {
            this.onListenRevoked_(body[ /*path*/'p'], body[ /*query*/'q']);
        }
        else if (action === 'ac') {
            this.onAuthRevoked_(body[ /*status code*/'s'], body[ /* explanation */'d']);
        }
        else if (action === 'apc') {
            this.onAppCheckRevoked_(body[ /*status code*/'s'], body[ /* explanation */'d']);
        }
        else if (action === 'sd') {
            this.onSecurityDebugPacket_(body);
        }
        else {
            error('Unrecognized action received from server: ' +
                util.stringify(action) +
                '\nAre you using the latest client?');
        }
    };
    PersistentConnection.prototype.onReady_ = function (timestamp, sessionId) {
        this.log_('connection ready');
        this.connected_ = true;
        this.lastConnectionEstablishedTime_ = new Date().getTime();
        this.handleTimestamp_(timestamp);
        this.lastSessionId = sessionId;
        if (this.firstConnection_) {
            this.sendConnectStats_();
        }
        this.restoreState_();
        this.firstConnection_ = false;
        this.onConnectStatus_(true);
    };
    PersistentConnection.prototype.scheduleConnect_ = function (timeout) {
        var _this = this;
        util.assert(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
        if (this.establishConnectionTimer_) {
            clearTimeout(this.establishConnectionTimer_);
        }
        // NOTE: Even when timeout is 0, it's important to do a setTimeout to work around an infuriating "Security Error" in
        // Firefox when trying to write to our long-polling iframe in some scenarios (e.g. Forge or our unit tests).
        this.establishConnectionTimer_ = setTimeout(function () {
            _this.establishConnectionTimer_ = null;
            _this.establishConnection_();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, Math.floor(timeout));
    };
    PersistentConnection.prototype.initConnection_ = function () {
        if (!this.realtime_ && this.firstConnection_) {
            this.scheduleConnect_(0);
        }
    };
    PersistentConnection.prototype.onVisible_ = function (visible) {
        // NOTE: Tabbing away and back to a window will defeat our reconnect backoff, but I think that's fine.
        if (visible &&
            !this.visible_ &&
            this.reconnectDelay_ === this.maxReconnectDelay_) {
            this.log_('Window became visible.  Reducing delay.');
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
            if (!this.realtime_) {
                this.scheduleConnect_(0);
            }
        }
        this.visible_ = visible;
    };
    PersistentConnection.prototype.onOnline_ = function (online) {
        if (online) {
            this.log_('Browser went online.');
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
            if (!this.realtime_) {
                this.scheduleConnect_(0);
            }
        }
        else {
            this.log_('Browser went offline.  Killing connection.');
            if (this.realtime_) {
                this.realtime_.close();
            }
        }
    };
    PersistentConnection.prototype.onRealtimeDisconnect_ = function () {
        this.log_('data client disconnected');
        this.connected_ = false;
        this.realtime_ = null;
        // Since we don't know if our sent transactions succeeded or not, we need to cancel them.
        this.cancelSentTransactions_();
        // Clear out the pending requests.
        this.requestCBHash_ = {};
        if (this.shouldReconnect_()) {
            if (!this.visible_) {
                this.log_("Window isn't visible.  Delaying reconnect.");
                this.reconnectDelay_ = this.maxReconnectDelay_;
                this.lastConnectionAttemptTime_ = new Date().getTime();
            }
            else if (this.lastConnectionEstablishedTime_) {
                // If we've been connected long enough, reset reconnect delay to minimum.
                var timeSinceLastConnectSucceeded = new Date().getTime() - this.lastConnectionEstablishedTime_;
                if (timeSinceLastConnectSucceeded > RECONNECT_DELAY_RESET_TIMEOUT) {
                    this.reconnectDelay_ = RECONNECT_MIN_DELAY;
                }
                this.lastConnectionEstablishedTime_ = null;
            }
            var timeSinceLastConnectAttempt = new Date().getTime() - this.lastConnectionAttemptTime_;
            var reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
            reconnectDelay = Math.random() * reconnectDelay;
            this.log_('Trying to reconnect in ' + reconnectDelay + 'ms');
            this.scheduleConnect_(reconnectDelay);
            // Adjust reconnect delay for next time.
            this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
        }
        this.onConnectStatus_(false);
    };
    PersistentConnection.prototype.establishConnection_ = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var onDataMessage, onReady, onDisconnect_1, connId, lastSessionId, canceled_1, connection_1, closeFn, sendRequestFn, forceRefresh, _a, authToken, appCheckToken, error_1;
            var _this = this;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldReconnect_()) return [3 /*break*/, 4];
                        this.log_('Making a connection attempt');
                        this.lastConnectionAttemptTime_ = new Date().getTime();
                        this.lastConnectionEstablishedTime_ = null;
                        onDataMessage = this.onDataMessage_.bind(this);
                        onReady = this.onReady_.bind(this);
                        onDisconnect_1 = this.onRealtimeDisconnect_.bind(this);
                        connId = this.id + ':' + PersistentConnection.nextConnectionId_++;
                        lastSessionId = this.lastSessionId;
                        canceled_1 = false;
                        connection_1 = null;
                        closeFn = function () {
                            if (connection_1) {
                                connection_1.close();
                            }
                            else {
                                canceled_1 = true;
                                onDisconnect_1();
                            }
                        };
                        sendRequestFn = function (msg) {
                            util.assert(connection_1, "sendRequest call when we're not connected not allowed.");
                            connection_1.sendRequest(msg);
                        };
                        this.realtime_ = {
                            close: closeFn,
                            sendRequest: sendRequestFn
                        };
                        forceRefresh = this.forceTokenRefresh_;
                        this.forceTokenRefresh_ = false;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this.authTokenProvider_.getToken(forceRefresh),
                                this.appCheckTokenProvider_.getToken(forceRefresh)
                            ])];
                    case 2:
                        _a = tslib.__read.apply(void 0, [_b.sent(), 2]), authToken = _a[0], appCheckToken = _a[1];
                        if (!canceled_1) {
                            log('getToken() completed. Creating connection.');
                            this.authToken_ = authToken && authToken.accessToken;
                            this.appCheckToken_ = appCheckToken && appCheckToken.token;
                            connection_1 = new Connection(connId, this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, onDataMessage, onReady, onDisconnect_1, 
                            /* onKill= */ function (reason) {
                                warn(reason + ' (' + _this.repoInfo_.toString() + ')');
                                _this.interrupt(SERVER_KILL_INTERRUPT_REASON);
                            }, lastSessionId);
                        }
                        else {
                            log('getToken() completed but was canceled');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        this.log_('Failed to get token: ' + error_1);
                        if (!canceled_1) {
                            if (this.repoInfo_.nodeAdmin) {
                                // This may be a critical error for the Admin Node.js SDK, so log a warning.
                                // But getToken() may also just have temporarily failed, so we still want to
                                // continue retrying.
                                warn(error_1);
                            }
                            closeFn();
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PersistentConnection.prototype.interrupt = function (reason) {
        log('Interrupting connection for reason: ' + reason);
        this.interruptReasons_[reason] = true;
        if (this.realtime_) {
            this.realtime_.close();
        }
        else {
            if (this.establishConnectionTimer_) {
                clearTimeout(this.establishConnectionTimer_);
                this.establishConnectionTimer_ = null;
            }
            if (this.connected_) {
                this.onRealtimeDisconnect_();
            }
        }
    };
    PersistentConnection.prototype.resume = function (reason) {
        log('Resuming connection for reason: ' + reason);
        delete this.interruptReasons_[reason];
        if (util.isEmpty(this.interruptReasons_)) {
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
            if (!this.realtime_) {
                this.scheduleConnect_(0);
            }
        }
    };
    PersistentConnection.prototype.handleTimestamp_ = function (timestamp) {
        var delta = timestamp - new Date().getTime();
        this.onServerInfoUpdate_({ serverTimeOffset: delta });
    };
    PersistentConnection.prototype.cancelSentTransactions_ = function () {
        for (var i = 0; i < this.outstandingPuts_.length; i++) {
            var put = this.outstandingPuts_[i];
            if (put && /*hash*/ 'h' in put.request && put.queued) {
                if (put.onComplete) {
                    put.onComplete('disconnect');
                }
                delete this.outstandingPuts_[i];
                this.outstandingPutCount_--;
            }
        }
        // Clean up array occasionally.
        if (this.outstandingPutCount_ === 0) {
            this.outstandingPuts_ = [];
        }
    };
    PersistentConnection.prototype.onListenRevoked_ = function (pathString, query) {
        // Remove the listen and manufacture a "permission_denied" error for the failed listen.
        var queryId;
        if (!query) {
            queryId = 'default';
        }
        else {
            queryId = query.map(function (q) { return ObjectToUniqueKey(q); }).join('$');
        }
        var listen = this.removeListen_(pathString, queryId);
        if (listen && listen.onComplete) {
            listen.onComplete('permission_denied');
        }
    };
    PersistentConnection.prototype.removeListen_ = function (pathString, queryId) {
        var normalizedPathString = new Path(pathString).toString(); // normalize path.
        var listen;
        if (this.listens.has(normalizedPathString)) {
            var map = this.listens.get(normalizedPathString);
            listen = map.get(queryId);
            map.delete(queryId);
            if (map.size === 0) {
                this.listens.delete(normalizedPathString);
            }
        }
        else {
            // all listens for this path has already been removed
            listen = undefined;
        }
        return listen;
    };
    PersistentConnection.prototype.onAuthRevoked_ = function (statusCode, explanation) {
        log('Auth token revoked: ' + statusCode + '/' + explanation);
        this.authToken_ = null;
        this.forceTokenRefresh_ = true;
        this.realtime_.close();
        if (statusCode === 'invalid_token' || statusCode === 'permission_denied') {
            // We'll wait a couple times before logging the warning / increasing the
            // retry period since oauth tokens will report as "invalid" if they're
            // just expired. Plus there may be transient issues that resolve themselves.
            this.invalidAuthTokenCount_++;
            if (this.invalidAuthTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
                // Set a long reconnect delay because recovery is unlikely
                this.reconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
                // Notify the auth token provider that the token is invalid, which will log
                // a warning
                this.authTokenProvider_.notifyForInvalidToken();
            }
        }
    };
    PersistentConnection.prototype.onAppCheckRevoked_ = function (statusCode, explanation) {
        log('App check token revoked: ' + statusCode + '/' + explanation);
        this.appCheckToken_ = null;
        this.forceTokenRefresh_ = true;
        // Note: We don't close the connection as the developer may not have
        // enforcement enabled. The backend closes connections with enforcements.
        if (statusCode === 'invalid_token' || statusCode === 'permission_denied') {
            // We'll wait a couple times before logging the warning / increasing the
            // retry period since oauth tokens will report as "invalid" if they're
            // just expired. Plus there may be transient issues that resolve themselves.
            this.invalidAppCheckTokenCount_++;
            if (this.invalidAppCheckTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
                this.appCheckTokenProvider_.notifyForInvalidToken();
            }
        }
    };
    PersistentConnection.prototype.onSecurityDebugPacket_ = function (body) {
        if (this.securityDebugCallback_) {
            this.securityDebugCallback_(body);
        }
        else {
            if ('msg' in body) {
                console.log('FIREBASE: ' + body['msg'].replace('\n', '\nFIREBASE: '));
            }
        }
    };
    PersistentConnection.prototype.restoreState_ = function () {
        var e_1, _a, e_2, _b;
        //Re-authenticate ourselves if we have a credential stored.
        this.tryAuth();
        this.tryAppCheck();
        try {
            // Puts depend on having received the corresponding data update from the server before they complete, so we must
            // make sure to send listens before puts.
            for (var _c = tslib.__values(this.listens.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var queries = _d.value;
                try {
                    for (var _e = (e_2 = void 0, tslib.__values(queries.values())), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var listenSpec = _f.value;
                        this.sendListen_(listenSpec);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        for (var i = 0; i < this.outstandingPuts_.length; i++) {
            if (this.outstandingPuts_[i]) {
                this.sendPut_(i);
            }
        }
        while (this.onDisconnectRequestQueue_.length) {
            var request = this.onDisconnectRequestQueue_.shift();
            this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
        }
        for (var i = 0; i < this.outstandingGets_.length; i++) {
            if (this.outstandingGets_[i]) {
                this.sendGet_(i);
            }
        }
    };
    /**
     * Sends client stats for first connection
     */
    PersistentConnection.prototype.sendConnectStats_ = function () {
        var stats = {};
        var clientName = 'js';
        if (util.isNodeSdk()) {
            if (this.repoInfo_.nodeAdmin) {
                clientName = 'admin_node';
            }
            else {
                clientName = 'node';
            }
        }
        stats['sdk.' + clientName + '.' + SDK_VERSION.replace(/\./g, '-')] = 1;
        if (util.isMobileCordova()) {
            stats['framework.cordova'] = 1;
        }
        else if (util.isReactNative()) {
            stats['framework.reactnative'] = 1;
        }
        this.reportStats(stats);
    };
    PersistentConnection.prototype.shouldReconnect_ = function () {
        var online = OnlineMonitor.getInstance().currentlyOnline();
        return util.isEmpty(this.interruptReasons_) && online;
    };
    PersistentConnection.nextPersistentConnectionId_ = 0;
    /**
     * Counter for number of connections created. Mainly used for tagging in the logs
     */
    PersistentConnection.nextConnectionId_ = 0;
    return PersistentConnection;
}(ServerActions));

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
 * Returns the delta from the previous call to get stats.
 *
 * @param collection_ - The collection to "listen" to.
 */
var StatsListener = /** @class */ (function () {
    function StatsListener(collection_) {
        this.collection_ = collection_;
        this.last_ = null;
    }
    StatsListener.prototype.get = function () {
        var newStats = this.collection_.get();
        var delta = tslib.__assign({}, newStats);
        if (this.last_) {
            each(this.last_, function (stat, value) {
                delta[stat] = delta[stat] - value;
            });
        }
        this.last_ = newStats;
        return delta;
    };
    return StatsListener;
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
function statsReporterIncludeStat(reporter, stat) {
    reporter.statsToReport_[stat] = true;
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
// TODO: This should be @private but it's used by test_access.js and internal.js
function repoInterceptServerData(repo, callback) {
    repo.interceptServerDataCallback_ = callback;
}
function repoStats(repo, showDelta) {
    if (showDelta === void 0) { showDelta = false; }
    if (typeof console === 'undefined') {
        return;
    }
    var stats;
    if (showDelta) {
        if (!repo.statsListener_) {
            repo.statsListener_ = new StatsListener(repo.stats_);
        }
        stats = repo.statsListener_.get();
    }
    else {
        stats = repo.stats_.get();
    }
    var longestName = Object.keys(stats).reduce(function (previousValue, currentValue) {
        return Math.max(currentValue.length, previousValue);
    }, 0);
    each(stats, function (stat, value) {
        var paddedStat = stat;
        // pad stat names to be the same length (plus 2 extra spaces).
        for (var i = stat.length; i < longestName + 2; i++) {
            paddedStat += ' ';
        }
        console.log(paddedStat + value);
    });
}
function repoStatsIncrementCounter(repo, metric) {
    repo.stats_.incrementCounter(metric);
    statsReporterIncludeStat(repo.statsReporter_, metric);
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
 * INTERNAL methods for internal-use only (tests, etc.).
 *
 * Customers shouldn't use these or else should be aware that they could break at any time.
 */
var forceLongPolling = function () {
    WebSocketConnection.forceDisallow();
    BrowserPollConnection.forceAllow();
};
var forceWebSockets = function () {
    BrowserPollConnection.forceDisallow();
};
/* Used by App Manager */
var isWebSocketsAvailable = function () {
    return WebSocketConnection['isAvailable']();
};
var setSecurityDebugCallback = function (ref, callback) {
    var connection = ref._delegate._repo.persistentConnection_;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    connection.securityDebugCallback_ = callback;
};
var stats = function (ref, showDelta) {
    repoStats(ref._delegate._repo, showDelta);
};
var statsIncrementCounter = function (ref, metric) {
    repoStatsIncrementCounter(ref._delegate._repo, metric);
};
var dataUpdateCount = function (ref) {
    return ref._delegate._repo.dataUpdateCount;
};
var interceptServerData = function (ref, callback) {
    return repoInterceptServerData(ref._delegate._repo, callback);
};
/**
 * Used by console to create a database based on the app,
 * passed database URL and a custom auth implementation.
 *
 * @param app - A valid FirebaseApp-like object
 * @param url - A valid Firebase databaseURL
 * @param version - custom version e.g. firebase-admin version
 * @param customAuthImpl - custom auth implementation
 */
function initStandalone$1(_a) {
    var app = _a.app, url = _a.url, version = _a.version, customAuthImpl = _a.customAuthImpl, namespace = _a.namespace, _b = _a.nodeAdmin, nodeAdmin = _b === void 0 ? false : _b;
    setSDKVersion(version);
    /**
     * ComponentContainer('database-standalone') is just a placeholder that doesn't perform
     * any actual function.
     */
    var authProvider = new component.Provider('auth-internal', new component.ComponentContainer('database-standalone'));
    authProvider.setComponent(new component.Component('auth-internal', function () { return customAuthImpl; }, "PRIVATE" /* PRIVATE */));
    return {
        instance: new Database(database._repoManagerDatabaseFromApp(app, authProvider, 
        /* appCheckProvider= */ undefined, url, nodeAdmin), app),
        namespace: namespace
    };
}

var INTERNAL = /*#__PURE__*/Object.freeze({
  __proto__: null,
  forceLongPolling: forceLongPolling,
  forceWebSockets: forceWebSockets,
  isWebSocketsAvailable: isWebSocketsAvailable,
  setSecurityDebugCallback: setSecurityDebugCallback,
  stats: stats,
  statsIncrementCounter: statsIncrementCounter,
  dataUpdateCount: dataUpdateCount,
  interceptServerData: interceptServerData,
  initStandalone: initStandalone$1
});

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
var DataConnection = PersistentConnection;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
PersistentConnection.prototype.simpleListen = function (pathString, onComplete) {
    this.sendRequest('q', { p: pathString }, onComplete);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
PersistentConnection.prototype.echo = function (data, onEcho) {
    this.sendRequest('echo', { d: data }, onEcho);
};
// RealTimeConnection properties that we use in tests.
var RealTimeConnection = Connection;
var hijackHash = function (newHash) {
    var oldPut = PersistentConnection.prototype.put;
    PersistentConnection.prototype.put = function (pathString, data, onComplete, hash) {
        if (hash !== undefined) {
            hash = newHash();
        }
        oldPut.call(this, pathString, data, onComplete, hash);
    };
    return function () {
        PersistentConnection.prototype.put = oldPut;
    };
};
var ConnectionTarget = RepoInfo;
var queryIdentifier = function (query) {
    return query._delegate._queryIdentifier;
};
/**
 * Forces the RepoManager to create Repos that use ReadonlyRestClient instead of PersistentConnection.
 */
var forceRestClient = function (forceRestClient) {
};

var TEST_ACCESS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DataConnection: DataConnection,
  RealTimeConnection: RealTimeConnection,
  hijackHash: hijackHash,
  ConnectionTarget: ConnectionTarget,
  queryIdentifier: queryIdentifier,
  forceRestClient: forceRestClient
});

var name = "@firebase/database-compat";
var version = "0.0.900";

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
setWebSocketImpl(fayeWebsocket.Client);
var ServerValue = Database.ServerValue;
/**
 * A one off register function which returns a database based on the app and
 * passed database URL. (Used by the Admin SDK)
 *
 * @param app - A valid FirebaseApp-like object
 * @param url - A valid Firebase databaseURL
 * @param version - custom version e.g. firebase-admin version
 * @param nodeAdmin - true if the SDK is being initialized from Firebase Admin.
 */
function initStandalone(app, url, version, nodeAdmin) {
    if (nodeAdmin === void 0) { nodeAdmin = true; }
    util.CONSTANTS.NODE_ADMIN = nodeAdmin;
    return initStandalone$1({
        app: app,
        url: url,
        version: version,
        // firebase-admin-node's app.INTERNAL implements FirebaseAuthInternal interface
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        customAuthImpl: app.INTERNAL,
        namespace: {
            Reference: Reference,
            Query: Query,
            Database: Database,
            DataSnapshot: DataSnapshot,
            enableLogging: database.enableLogging,
            INTERNAL: INTERNAL,
            ServerValue: ServerValue,
            TEST_ACCESS: TEST_ACCESS
        },
        nodeAdmin: nodeAdmin
    });
}
function registerDatabase(instance) {
    // set SDK_VERSION
    setSDKVersion(instance.SDK_VERSION);
    // Register the Database Service with the 'firebase' namespace.
    var namespace = instance.INTERNAL.registerComponent(new component.Component('database-compat', function (container, _a) {
        var url = _a.instanceIdentifier;
        /* Dependencies */
        // getImmediate for FirebaseApp will always succeed
        var app = container.getProvider('app-compat').getImmediate();
        var databaseExp = container
            .getProvider('database-exp')
            .getImmediate({ identifier: url });
        return new Database(databaseExp, app);
    }, "PUBLIC" /* PUBLIC */)
        .setServiceProps(
    // firebase.database namespace properties
    {
        Reference: Reference,
        Query: Query,
        Database: Database,
        DataSnapshot: DataSnapshot,
        enableLogging: database.enableLogging,
        INTERNAL: INTERNAL,
        ServerValue: ServerValue,
        TEST_ACCESS: TEST_ACCESS
    })
        .setMultipleInstances(true));
    instance.registerVersion(name, version, 'node');
    if (util.isNodeSdk()) {
        module.exports = Object.assign({}, namespace, { initStandalone: initStandalone });
    }
}
try {
    // If @firebase/app is not present, skip registering database.
    // It could happen when this package is used in firebase-admin which doesn't depend on @firebase/app.
    // Previously firebase-admin depends on @firebase/app, which causes version conflict on
    // @firebase/app when used together with the js sdk. More detail:
    // https://github.com/firebase/firebase-js-sdk/issues/1696#issuecomment-501546596
    // eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports
    var firebase = require('@firebase/app-compat').default;
    registerDatabase(firebase);
}
catch (err) {
    // catch and ignore 'MODULE_NOT_FOUND' error in firebase-admin context
    // we can safely ignore this error because RTDB in firebase-admin works without @firebase/app
    if (err.code !== 'MODULE_NOT_FOUND') {
        throw err;
    }
}

Object.defineProperty(exports, 'enableLogging', {
  enumerable: true,
  get: function () {
    return database.enableLogging;
  }
});
exports.DataSnapshot = DataSnapshot;
exports.Database = Database;
exports.OnDisconnect = OnDisconnect;
exports.Query = Query;
exports.Reference = Reference;
exports.ServerValue = ServerValue;
exports.initStandalone = initStandalone;
exports.registerDatabase = registerDatabase;
//# sourceMappingURL=index.js.map
