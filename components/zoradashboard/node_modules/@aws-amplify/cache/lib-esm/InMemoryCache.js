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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { CacheList, defaultConfig, getCurrTime, CacheObject } from './Utils';
import { StorageCache } from './StorageCache';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
var logger = new Logger('InMemoryCache');
/**
 * Customized in-memory cache with LRU implemented
 * @member cacheObj - object which store items
 * @member cacheList - list of keys in the cache with LRU
 * @member curSizeInBytes - current size of the cache
 * @member maxPriority - max of the priority
 * @member cacheSizeLimit - the limit of cache size
 */
var InMemoryCacheClass = /** @class */ (function (_super) {
    __extends(InMemoryCacheClass, _super);
    /**
     * initialize the cache
     *
     * @param config - the configuration of the cache
     */
    function InMemoryCacheClass(config) {
        var _this = this;
        var cacheConfig = config
            ? Object.assign({}, defaultConfig, config)
            : defaultConfig;
        _this = _super.call(this, cacheConfig) || this;
        logger.debug('now we start!');
        _this.cacheList = [];
        _this.curSizeInBytes = 0;
        _this.maxPriority = 5;
        _this.getItem = _this.getItem.bind(_this);
        _this.setItem = _this.setItem.bind(_this);
        _this.removeItem = _this.removeItem.bind(_this);
        // initialize list for every priority
        for (var i = 0; i < _this.maxPriority; i += 1) {
            _this.cacheList[i] = new CacheList();
        }
        return _this;
    }
    /**
     * decrease current size of the cache
     *
     * @param amount - the amount of the cache size which needs to be decreased
     */
    InMemoryCacheClass.prototype._decreaseCurSizeInBytes = function (amount) {
        this.curSizeInBytes -= amount;
    };
    /**
     * increase current size of the cache
     *
     * @param amount - the amount of the cache szie which need to be increased
     */
    InMemoryCacheClass.prototype._increaseCurSizeInBytes = function (amount) {
        this.curSizeInBytes += amount;
    };
    /**
     * check whether item is expired
     *
     * @param key - the key of the item
     *
     * @return true if the item is expired.
     */
    InMemoryCacheClass.prototype._isExpired = function (key) {
        var text = CacheObject.getItem(key);
        var item = JSON.parse(text);
        if (getCurrTime() >= item.expires) {
            return true;
        }
        return false;
    };
    /**
     * delete item from cache
     *
     * @param prefixedKey - the key of the item
     * @param listIdx - indicates which cache list the key belongs to
     */
    InMemoryCacheClass.prototype._removeItem = function (prefixedKey, listIdx) {
        // delete the key from the list
        this.cacheList[listIdx].removeItem(prefixedKey);
        // decrease the current size of the cache
        this._decreaseCurSizeInBytes(JSON.parse(CacheObject.getItem(prefixedKey)).byteSize);
        // finally remove the item from memory
        CacheObject.removeItem(prefixedKey);
    };
    /**
     * put item into cache
     *
     * @param prefixedKey - the key of the item
     * @param itemData - the value of the item
     * @param itemSizeInBytes - the byte size of the item
     * @param listIdx - indicates which cache list the key belongs to
     */
    InMemoryCacheClass.prototype._setItem = function (prefixedKey, item, listIdx) {
        // insert the key into the list
        this.cacheList[listIdx].insertItem(prefixedKey);
        // increase the current size of the cache
        this._increaseCurSizeInBytes(item.byteSize);
        // finally add the item into memory
        CacheObject.setItem(prefixedKey, JSON.stringify(item));
    };
    /**
     * see whether cache is full
     *
     * @param itemSize
     *
     * @return true if cache is full
     */
    InMemoryCacheClass.prototype._isCacheFull = function (itemSize) {
        return this.curSizeInBytes + itemSize > this.config.capacityInBytes;
    };
    /**
     * check whether the cache contains the key
     *
     * @param key
     */
    InMemoryCacheClass.prototype.containsKey = function (key) {
        var prefixedKey = this.config.keyPrefix + key;
        for (var i = 0; i < this.maxPriority; i += 1) {
            if (this.cacheList[i].containsKey(prefixedKey)) {
                return i + 1;
            }
        }
        return -1;
    };
    /**
     * * Set item into cache. You can put number, string, boolean or object.
     * The cache will first check whether has the same key.
     * If it has, it will delete the old item and then put the new item in
     * The cache will pop out items if it is full
     * You can specify the cache item options. The cache will abort and output a warning:
     * If the key is invalid
     * If the size of the item exceeds itemMaxSize.
     * If the value is undefined
     * If incorrect cache item configuration
     * If error happened with browser storage
     *
     * @param key - the key of the item
     * @param value - the value of the item
     * @param options - optional, the specified meta-data
     *
     * @throws if the item is too big which exceeds the limit of single item size
     * @throws if the key is invalid
     */
    InMemoryCacheClass.prototype.setItem = function (key, value, options) {
        var prefixedKey = this.config.keyPrefix + key;
        // invalid keys
        if (prefixedKey === this.config.keyPrefix ||
            prefixedKey === this.cacheCurSizeKey) {
            logger.warn("Invalid key: should not be empty or 'CurSize'");
            return;
        }
        if (typeof value === 'undefined') {
            logger.warn("The value of item should not be undefined!");
            return;
        }
        var cacheItemOptions = {
            priority: options && options.priority !== undefined
                ? options.priority
                : this.config.defaultPriority,
            expires: options && options.expires !== undefined
                ? options.expires
                : this.config.defaultTTL + getCurrTime(),
        };
        if (cacheItemOptions.priority < 1 || cacheItemOptions.priority > 5) {
            logger.warn("Invalid parameter: priority due to out or range. It should be within 1 and 5.");
            return;
        }
        var item = this.fillCacheItem(prefixedKey, value, cacheItemOptions);
        // check wether this item is too big;
        if (item.byteSize > this.config.itemMaxSize) {
            logger.warn("Item with key: " + key + " you are trying to put into is too big!");
            return;
        }
        // if key already in the cache, then delete it.
        var presentKeyPrio = this.containsKey(key);
        if (presentKeyPrio !== -1) {
            this._removeItem(prefixedKey, presentKeyPrio - 1);
        }
        // pop out items in the cache when cache is full based on LRU
        // first start from lowest priority cache list
        var cacheListIdx = this.maxPriority - 1;
        while (this._isCacheFull(item.byteSize) && cacheListIdx >= 0) {
            if (!this.cacheList[cacheListIdx].isEmpty()) {
                var popedItemKey = this.cacheList[cacheListIdx].getLastItem();
                this._removeItem(popedItemKey, cacheListIdx);
            }
            else {
                cacheListIdx -= 1;
            }
        }
        this._setItem(prefixedKey, item, Number(item.priority) - 1);
    };
    /**
     * Get item from cache. It will return null if item doesn’t exist or it has been expired.
     * If you specified callback function in the options,
     * then the function will be executed if no such item in the cache
     * and finally put the return value into cache.
     * Please make sure the callback function will return the value you want to put into the cache.
     * The cache will abort output a warning:
     * If the key is invalid
     *
     * @param key - the key of the item
     * @param options - the options of callback function
     */
    InMemoryCacheClass.prototype.getItem = function (key, options) {
        var ret = null;
        var prefixedKey = this.config.keyPrefix + key;
        if (prefixedKey === this.config.keyPrefix ||
            prefixedKey === this.cacheCurSizeKey) {
            logger.warn("Invalid key: should not be empty or 'CurSize'");
            return null;
        }
        // check whether it's in the cachelist
        var presentKeyPrio = this.containsKey(key);
        if (presentKeyPrio !== -1) {
            if (this._isExpired(prefixedKey)) {
                // if expired, remove that item and return null
                this._removeItem(prefixedKey, presentKeyPrio - 1);
            }
            else {
                // if not expired, great, return the value and refresh it
                ret = CacheObject.getItem(prefixedKey);
                var item = JSON.parse(ret);
                this.cacheList[item.priority - 1].refresh(prefixedKey);
                return item.data;
            }
        }
        if (options && options.callback !== undefined) {
            var val = options.callback();
            if (val !== null) {
                this.setItem(key, val, options);
            }
            return val;
        }
        return null;
    };
    /**
     * remove item from the cache
     *
     * @param key - the key of the item
     */
    InMemoryCacheClass.prototype.removeItem = function (key) {
        var prefixedKey = this.config.keyPrefix + key;
        // check if the key is in the cache
        var presentKeyPrio = this.containsKey(key);
        if (presentKeyPrio !== -1) {
            this._removeItem(prefixedKey, presentKeyPrio - 1);
        }
    };
    /**
     * clear the entire cache
     */
    InMemoryCacheClass.prototype.clear = function () {
        var e_1, _a;
        for (var i = 0; i < this.maxPriority; i += 1) {
            try {
                for (var _b = (e_1 = void 0, __values(this.cacheList[i].getKeys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    this._removeItem(key, i);
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
     * Return all the keys in the cache.
     */
    InMemoryCacheClass.prototype.getAllKeys = function () {
        var e_2, _a;
        var keys = [];
        for (var i = 0; i < this.maxPriority; i += 1) {
            try {
                for (var _b = (e_2 = void 0, __values(this.cacheList[i].getKeys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    keys.push(key.substring(this.config.keyPrefix.length));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return keys;
    };
    /**
     * return the current size of the cache
     *
     * @return the current size of the cache
     */
    InMemoryCacheClass.prototype.getCacheCurSize = function () {
        return this.curSizeInBytes;
    };
    /**
     * Return a new instance of cache with customized configuration.
     * @param config - the customized configuration
     */
    InMemoryCacheClass.prototype.createInstance = function (config) {
        return new InMemoryCacheClass(config);
    };
    return InMemoryCacheClass;
}(StorageCache));
export { InMemoryCacheClass };
export var InMemoryCache = new InMemoryCacheClass();
/**
 * @deprecated use named import
 */
export default InMemoryCache;
//# sourceMappingURL=InMemoryCache.js.map