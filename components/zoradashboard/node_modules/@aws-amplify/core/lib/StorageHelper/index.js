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
var dataMemory = {};
/** @class */
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage() {
    }
    /**
     * This is used to set a specific item in storage
     * @param {string} key - the key for the item
     * @param {object} value - the value
     * @returns {string} value that was set
     */
    MemoryStorage.setItem = function (key, value) {
        dataMemory[key] = value;
        return dataMemory[key];
    };
    /**
     * This is used to get a specific key from storage
     * @param {string} key - the key for the item
     * This is used to clear the storage
     * @returns {string} the data item
     */
    MemoryStorage.getItem = function (key) {
        return Object.prototype.hasOwnProperty.call(dataMemory, key)
            ? dataMemory[key]
            : undefined;
    };
    /**
     * This is used to remove an item from storage
     * @param {string} key - the key being set
     * @returns {string} value - value that was deleted
     */
    MemoryStorage.removeItem = function (key) {
        return delete dataMemory[key];
    };
    /**
     * This is used to clear the storage
     * @returns {string} nothing
     */
    MemoryStorage.clear = function () {
        dataMemory = {};
        return dataMemory;
    };
    return MemoryStorage;
}());
exports.MemoryStorage = MemoryStorage;
var StorageHelper = /** @class */ (function () {
    /**
     * This is used to get a storage object
     * @returns {object} the storage
     */
    function StorageHelper() {
        try {
            this.storageWindow = window.localStorage;
            this.storageWindow.setItem('aws.amplify.test-ls', 1);
            this.storageWindow.removeItem('aws.amplify.test-ls');
        }
        catch (exception) {
            this.storageWindow = MemoryStorage;
        }
    }
    /**
     * This is used to return the storage
     * @returns {object} the storage
     */
    StorageHelper.prototype.getStorage = function () {
        return this.storageWindow;
    };
    return StorageHelper;
}());
exports.StorageHelper = StorageHelper;
/**
 * @deprecated use named import
 */
exports.default = StorageHelper;
//# sourceMappingURL=index.js.map