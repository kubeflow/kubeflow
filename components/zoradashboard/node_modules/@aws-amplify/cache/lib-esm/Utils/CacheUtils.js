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
import { StorageHelper } from '@aws-amplify/core';
/**
 * Default cache config
 */
export var defaultConfig = {
    keyPrefix: 'aws-amplify-cache',
    capacityInBytes: 1048576,
    itemMaxSize: 210000,
    defaultTTL: 259200000,
    defaultPriority: 5,
    warningThreshold: 0.8,
    // the storage helper will check if localStorage exists,
    // if not, will use a in-memory object instead
    storage: new StorageHelper().getStorage(),
};
/**
 * return the byte size of the string
 * @param str
 */
export function getByteLength(str) {
    var ret = 0;
    ret = str.length;
    for (var i = str.length; i >= 0; i -= 1) {
        var charCode = str.charCodeAt(i);
        if (charCode > 0x7f && charCode <= 0x7ff) {
            ret += 1;
        }
        else if (charCode > 0x7ff && charCode <= 0xffff) {
            ret += 2;
        }
        // trail surrogate
        if (charCode >= 0xdc00 && charCode <= 0xdfff) {
            i -= 1;
        }
    }
    return ret;
}
/**
 * get current time
 */
export function getCurrTime() {
    var currTime = new Date();
    return currTime.getTime();
}
/**
 * check if passed value is an integer
 */
export function isInteger(value) {
    if (Number.isInteger) {
        return Number.isInteger(value);
    }
    return _isInteger(value);
}
function _isInteger(value) {
    return (typeof value === 'number' && isFinite(value) && Math.floor(value) === value);
}
/**
 * provide an object as the in-memory cache
 */
var store = {};
var CacheObject = /** @class */ (function () {
    function CacheObject() {
    }
    CacheObject.clear = function () {
        store = {};
    };
    CacheObject.getItem = function (key) {
        return store[key] || null;
    };
    CacheObject.setItem = function (key, value) {
        store[key] = value;
    };
    CacheObject.removeItem = function (key) {
        delete store[key];
    };
    return CacheObject;
}());
export { CacheObject };
//# sourceMappingURL=CacheUtils.js.map