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
var Utils_1 = require("./Utils");
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('StorageCache');
/**
 * Initialization of the cache
 *
 */
var StorageCache = /** @class */ (function () {
    /**
     * Initialize the cache
     * @param config - the configuration of the cache
     */
    function StorageCache(config) {
        this.config = Object.assign({}, config);
        this.cacheCurSizeKey = this.config.keyPrefix + 'CurSize';
        this.checkConfig();
    }
    StorageCache.prototype.getModuleName = function () {
        return 'Cache';
    };
    StorageCache.prototype.checkConfig = function () {
        // check configuration
        if (!Utils_1.isInteger(this.config.capacityInBytes)) {
            logger.error('Invalid parameter: capacityInBytes. It should be an Integer. Setting back to default.');
            this.config.capacityInBytes = Utils_1.defaultConfig.capacityInBytes;
        }
        if (!Utils_1.isInteger(this.config.itemMaxSize)) {
            logger.error('Invalid parameter: itemMaxSize. It should be an Integer. Setting back to default.');
            this.config.itemMaxSize = Utils_1.defaultConfig.itemMaxSize;
        }
        if (!Utils_1.isInteger(this.config.defaultTTL)) {
            logger.error('Invalid parameter: defaultTTL. It should be an Integer. Setting back to default.');
            this.config.defaultTTL = Utils_1.defaultConfig.defaultTTL;
        }
        if (!Utils_1.isInteger(this.config.defaultPriority)) {
            logger.error('Invalid parameter: defaultPriority. It should be an Integer. Setting back to default.');
            this.config.defaultPriority = Utils_1.defaultConfig.defaultPriority;
        }
        if (this.config.itemMaxSize > this.config.capacityInBytes) {
            logger.error('Invalid parameter: itemMaxSize. It should be smaller than capacityInBytes. Setting back to default.');
            this.config.itemMaxSize = Utils_1.defaultConfig.itemMaxSize;
        }
        if (this.config.defaultPriority > 5 || this.config.defaultPriority < 1) {
            logger.error('Invalid parameter: defaultPriority. It should be between 1 and 5. Setting back to default.');
            this.config.defaultPriority = Utils_1.defaultConfig.defaultPriority;
        }
        if (Number(this.config.warningThreshold) > 1 ||
            Number(this.config.warningThreshold) < 0) {
            logger.error('Invalid parameter: warningThreshold. It should be between 0 and 1. Setting back to default.');
            this.config.warningThreshold = Utils_1.defaultConfig.warningThreshold;
        }
        // set 5MB limit
        var cacheLimit = 5 * 1024 * 1024;
        if (this.config.capacityInBytes > cacheLimit) {
            logger.error('Cache Capacity should be less than 5MB. Setting back to default. Setting back to default.');
            this.config.capacityInBytes = Utils_1.defaultConfig.capacityInBytes;
        }
    };
    /**
     * produce a JSON object with meta-data and data value
     * @param value - the value of the item
     * @param options - optional, the specified meta-data
     *
     * @return - the item which has the meta-data and the value
     */
    StorageCache.prototype.fillCacheItem = function (key, value, options) {
        var ret = {
            key: key,
            data: value,
            timestamp: Utils_1.getCurrTime(),
            visitedTime: Utils_1.getCurrTime(),
            priority: options.priority,
            expires: options.expires,
            type: typeof value,
            byteSize: 0,
        };
        ret.byteSize = Utils_1.getByteLength(JSON.stringify(ret));
        // for accurate size
        ret.byteSize = Utils_1.getByteLength(JSON.stringify(ret));
        return ret;
    };
    /**
     * set cache with customized configuration
     * @param config - customized configuration
     *
     * @return - the current configuration
     */
    StorageCache.prototype.configure = function (config) {
        if (!config) {
            return this.config;
        }
        if (config.keyPrefix) {
            logger.warn("Don't try to configure keyPrefix!");
        }
        this.config = Object.assign({}, this.config, config, config.Cache);
        this.checkConfig();
        return this.config;
    };
    return StorageCache;
}());
exports.StorageCache = StorageCache;
/**
 * @deprecated use named import
 */
exports.default = StorageCache;
//# sourceMappingURL=StorageCache.js.map