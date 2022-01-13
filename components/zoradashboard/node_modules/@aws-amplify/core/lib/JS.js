"use strict";
/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var MIME_MAP = [
    { type: 'text/plain', ext: 'txt' },
    { type: 'text/html', ext: 'html' },
    { type: 'text/javascript', ext: 'js' },
    { type: 'text/css', ext: 'css' },
    { type: 'text/csv', ext: 'csv' },
    { type: 'text/yaml', ext: 'yml' },
    { type: 'text/yaml', ext: 'yaml' },
    { type: 'text/calendar', ext: 'ics' },
    { type: 'text/calendar', ext: 'ical' },
    { type: 'image/apng', ext: 'apng' },
    { type: 'image/bmp', ext: 'bmp' },
    { type: 'image/gif', ext: 'gif' },
    { type: 'image/x-icon', ext: 'ico' },
    { type: 'image/x-icon', ext: 'cur' },
    { type: 'image/jpeg', ext: 'jpg' },
    { type: 'image/jpeg', ext: 'jpeg' },
    { type: 'image/jpeg', ext: 'jfif' },
    { type: 'image/jpeg', ext: 'pjp' },
    { type: 'image/jpeg', ext: 'pjpeg' },
    { type: 'image/png', ext: 'png' },
    { type: 'image/svg+xml', ext: 'svg' },
    { type: 'image/tiff', ext: 'tif' },
    { type: 'image/tiff', ext: 'tiff' },
    { type: 'image/webp', ext: 'webp' },
    { type: 'application/json', ext: 'json' },
    { type: 'application/xml', ext: 'xml' },
    { type: 'application/x-sh', ext: 'sh' },
    { type: 'application/zip', ext: 'zip' },
    { type: 'application/x-rar-compressed', ext: 'rar' },
    { type: 'application/x-tar', ext: 'tar' },
    { type: 'application/x-bzip', ext: 'bz' },
    { type: 'application/x-bzip2', ext: 'bz2' },
    { type: 'application/pdf', ext: 'pdf' },
    { type: 'application/java-archive', ext: 'jar' },
    { type: 'application/msword', ext: 'doc' },
    { type: 'application/vnd.ms-excel', ext: 'xls' },
    { type: 'application/vnd.ms-excel', ext: 'xlsx' },
    { type: 'message/rfc822', ext: 'eml' },
];
exports.isEmpty = function (obj) {
    if (obj === void 0) { obj = {}; }
    return Object.keys(obj).length === 0;
};
exports.sortByField = function (list, field, dir) {
    if (!list || !list.sort) {
        return false;
    }
    var dirX = dir && dir === 'desc' ? -1 : 1;
    list.sort(function (a, b) {
        var a_val = a[field];
        var b_val = b[field];
        if (typeof b_val === 'undefined') {
            return typeof a_val === 'undefined' ? 0 : 1 * dirX;
        }
        if (typeof a_val === 'undefined') {
            return -1 * dirX;
        }
        if (a_val < b_val) {
            return -1 * dirX;
        }
        if (a_val > b_val) {
            return 1 * dirX;
        }
        return 0;
    });
    return true;
};
exports.objectLessAttributes = function (obj, less) {
    var ret = Object.assign({}, obj);
    if (less) {
        if (typeof less === 'string') {
            delete ret[less];
        }
        else {
            less.forEach(function (attr) {
                delete ret[attr];
            });
        }
    }
    return ret;
};
exports.filenameToContentType = function (filename, defVal) {
    if (defVal === void 0) { defVal = 'application/octet-stream'; }
    var name = filename.toLowerCase();
    var filtered = MIME_MAP.filter(function (mime) { return name.endsWith('.' + mime.ext); });
    return filtered.length > 0 ? filtered[0].type : defVal;
};
exports.isTextFile = function (contentType) {
    var type = contentType.toLowerCase();
    if (type.startsWith('text/')) {
        return true;
    }
    return ('application/json' === type ||
        'application/xml' === type ||
        'application/sh' === type);
};
exports.generateRandomString = function () {
    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 32; i > 0; i -= 1) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};
exports.makeQuerablePromise = function (promise) {
    if (promise.isResolved)
        return promise;
    var isPending = true;
    var isRejected = false;
    var isFullfilled = false;
    var result = promise.then(function (data) {
        isFullfilled = true;
        isPending = false;
        return data;
    }, function (e) {
        isRejected = true;
        isPending = false;
        throw e;
    });
    result.isFullfilled = function () { return isFullfilled; };
    result.isPending = function () { return isPending; };
    result.isRejected = function () { return isRejected; };
    return result;
};
exports.isWebWorker = function () {
    if (typeof self === 'undefined') {
        return false;
    }
    var selfContext = self;
    return typeof selfContext.WorkerGlobalScope !== 'undefined' &&
        self instanceof selfContext.WorkerGlobalScope;
};
exports.browserOrNode = function () {
    var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    var isNode = typeof process !== 'undefined' &&
        process.versions != null &&
        process.versions.node != null;
    return {
        isBrowser: isBrowser,
        isNode: isNode,
    };
};
/**
 * transfer the first letter of the keys to lowercase
 * @param {Object} obj - the object need to be transferred
 * @param {Array} whiteListForItself - whitelist itself from being transferred
 * @param {Array} whiteListForChildren - whitelist its children keys from being transferred
 */
exports.transferKeyToLowerCase = function (obj, whiteListForItself, whiteListForChildren) {
    if (whiteListForItself === void 0) { whiteListForItself = []; }
    if (whiteListForChildren === void 0) { whiteListForChildren = []; }
    if (!exports.isStrictObject(obj))
        return obj;
    var ret = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var transferedKey = whiteListForItself.includes(key)
                ? key
                : key[0].toLowerCase() + key.slice(1);
            ret[transferedKey] = whiteListForChildren.includes(key)
                ? obj[key]
                : exports.transferKeyToLowerCase(obj[key], whiteListForItself, whiteListForChildren);
        }
    }
    return ret;
};
/**
 * transfer the first letter of the keys to lowercase
 * @param {Object} obj - the object need to be transferred
 * @param {Array} whiteListForItself - whitelist itself from being transferred
 * @param {Array} whiteListForChildren - whitelist its children keys from being transferred
 */
exports.transferKeyToUpperCase = function (obj, whiteListForItself, whiteListForChildren) {
    if (whiteListForItself === void 0) { whiteListForItself = []; }
    if (whiteListForChildren === void 0) { whiteListForChildren = []; }
    if (!exports.isStrictObject(obj))
        return obj;
    var ret = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var transferredKey = whiteListForItself.includes(key)
                ? key
                : key[0].toUpperCase() + key.slice(1);
            ret[transferredKey] = whiteListForChildren.includes(key)
                ? obj[key]
                : exports.transferKeyToUpperCase(obj[key], whiteListForItself, whiteListForChildren);
        }
    }
    return ret;
};
/**
 * Return true if the object is a strict object
 * which means it's not Array, Function, Number, String, Boolean or Null
 * @param obj the Object
 */
exports.isStrictObject = function (obj) {
    return (obj instanceof Object &&
        !(obj instanceof Array) &&
        !(obj instanceof Function) &&
        !(obj instanceof Number) &&
        !(obj instanceof String) &&
        !(obj instanceof Boolean));
};
/**
 * @deprecated use per-function imports
 */
var JS = /** @class */ (function () {
    function JS() {
    }
    JS.isEmpty = exports.isEmpty;
    JS.sortByField = exports.sortByField;
    JS.objectLessAttributes = exports.objectLessAttributes;
    JS.filenameToContentType = exports.filenameToContentType;
    JS.isTextFile = exports.isTextFile;
    JS.generateRandomString = exports.generateRandomString;
    JS.makeQuerablePromise = exports.makeQuerablePromise;
    JS.isWebWorker = exports.isWebWorker;
    JS.browserOrNode = exports.browserOrNode;
    JS.transferKeyToLowerCase = exports.transferKeyToLowerCase;
    JS.transferKeyToUpperCase = exports.transferKeyToUpperCase;
    JS.isStrictObject = exports.isStrictObject;
    return JS;
}());
exports.JS = JS;
/**
 * @deprecated use per-function imports
 */
exports.default = JS;
//# sourceMappingURL=JS.js.map