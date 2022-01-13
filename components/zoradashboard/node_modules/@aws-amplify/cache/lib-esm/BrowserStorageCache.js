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
import { defaultConfig, getCurrTime } from './Utils';
import { StorageCache } from './StorageCache';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
var logger = new Logger('Cache');
/**
 * Customized storage based on the SessionStorage or LocalStorage with LRU implemented
 */
var BrowserStorageCacheClass = /** @class */ (function (_super) {
    __extends(BrowserStorageCacheClass, _super);
    /**
     * initialize the cache
     * @param config - the configuration of the cache
     */
    function BrowserStorageCacheClass(config) {
        var _this = this;
        var cacheConfig = config
            ? Object.assign({}, defaultConfig, config)
            : defaultConfig;
        _this = _super.call(this, cacheConfig) || this;
        _this.config.storage = cacheConfig.storage;
        _this.getItem = _this.getItem.bind(_this);
        _this.setItem = _this.setItem.bind(_this);
        _this.removeItem = _this.removeItem.bind(_this);
        return _this;
    }
    /**
     * decrease current size of the cache
     *
     * @private
     * @param amount - the amount of the cache size which needs to be decreased
     */
    BrowserStorageCacheClass.prototype._decreaseCurSizeInBytes = function (amount) {
        var curSize = this.getCacheCurSize();
        this.config.storage.setItem(this.cacheCurSizeKey, (curSize - amount).toString());
    };
    /**
     * increase current size of the cache
     *
     * @private
     * @param amount - the amount of the cache szie which need to be increased
     */
    BrowserStorageCacheClass.prototype._increaseCurSizeInBytes = function (amount) {
        var curSize = this.getCacheCurSize();
        this.config.storage.setItem(this.cacheCurSizeKey, (curSize + amount).toString());
    };
    /**
     * update the visited time if item has been visited
     *
     * @private
     * @param item - the item which need to be refreshed
     * @param prefixedKey - the key of the item
     *
     * @return the refreshed item
     */
    BrowserStorageCacheClass.prototype._refreshItem = function (item, prefixedKey) {
        item.visitedTime = getCurrTime();
        this.config.storage.setItem(prefixedKey, JSON.stringify(item));
        return item;
    };
    /**
     * check wether item is expired
     *
     * @private
     * @param key - the key of the item
     *
     * @return true if the item is expired.
     */
    BrowserStorageCacheClass.prototype._isExpired = function (key) {
        var text = this.config.storage.getItem(key);
        var item = JSON.parse(text);
        if (getCurrTime() >= item.expires) {
            return true;
        }
        return false;
    };
    /**
     * delete item from cache
     *
     * @private
     * @param prefixedKey - the key of the item
     * @param size - optional, the byte size of the item
     */
    BrowserStorageCacheClass.prototype._removeItem = function (prefixedKey, size) {
        var itemSize = size
            ? size
            : JSON.parse(this.config.storage.getItem(prefixedKey)).byteSize;
        this._decreaseCurSizeInBytes(itemSize);
        // remove the cache item
        this.config.storage.removeItem(prefixedKey);
    };
    /**
     * put item into cache
     *
     * @private
     * @param prefixedKey - the key of the item
     * @param itemData - the value of the item
     * @param itemSizeInBytes - the byte size of the item
     */
    BrowserStorageCacheClass.prototype._setItem = function (prefixedKey, item) {
        // update the cache size
        this._increaseCurSizeInBytes(item.byteSize);
        try {
            this.config.storage.setItem(prefixedKey, JSON.stringify(item));
        }
        catch (setItemErr) {
            // if failed, we need to rollback the cache size
            this._decreaseCurSizeInBytes(item.byteSize);
            logger.error("Failed to set item " + setItemErr);
        }
    };
    /**
     * total space needed when poping out items
     *
     * @private
     * @param itemSize
     *
     * @return total space needed
     */
    BrowserStorageCacheClass.prototype._sizeToPop = function (itemSize) {
        var spaceItemNeed = this.getCacheCurSize() + itemSize - this.config.capacityInBytes;
        var cacheThresholdSpace = (1 - this.config.warningThreshold) * this.config.capacityInBytes;
        return spaceItemNeed > cacheThresholdSpace
            ? spaceItemNeed
            : cacheThresholdSpace;
    };
    /**
     * see whether cache is full
     *
     * @private
     * @param itemSize
     *
     * @return true if cache is full
     */
    BrowserStorageCacheClass.prototype._isCacheFull = function (itemSize) {
        return itemSize + this.getCacheCurSize() > this.config.capacityInBytes;
    };
    /**
     * scan the storage and find out all the keys owned by this cache
     * also clean the expired keys while scanning
     *
     * @private
     *
     * @return array of keys
     */
    BrowserStorageCacheClass.prototype._findValidKeys = function () {
        var keys = [];
        var keyInCache = [];
        // get all keys in Storage
        for (var i = 0; i < this.config.storage.length; i += 1) {
            keyInCache.push(this.config.storage.key(i));
        }
        // find those items which belong to our cache and also clean those expired items
        for (var i = 0; i < keyInCache.length; i += 1) {
            var key = keyInCache[i];
            if (key.indexOf(this.config.keyPrefix) === 0 &&
                key !== this.cacheCurSizeKey) {
                if (this._isExpired(key)) {
                    this._removeItem(key);
                }
                else {
                    keys.push(key);
                }
            }
        }
        return keys;
    };
    /**
     * get all the items we have, sort them by their priority,
     * if priority is same, sort them by their last visited time
     * pop out items from the low priority (5 is the lowest)
     *
     * @private
     * @param keys - all the keys in this cache
     * @param sizeToPop - the total size of the items which needed to be poped out
     */
    BrowserStorageCacheClass.prototype._popOutItems = function (keys, sizeToPop) {
        var items = [];
        var remainedSize = sizeToPop;
        // get the items from Storage
        for (var i = 0; i < keys.length; i += 1) {
            var val = this.config.storage.getItem(keys[i]);
            if (val != null) {
                var item = JSON.parse(val);
                items.push(item);
            }
        }
        // first compare priority
        // then compare visited time
        items.sort(function (a, b) {
            if (a.priority > b.priority) {
                return -1;
            }
            else if (a.priority < b.priority) {
                return 1;
            }
            else {
                if (a.visitedTime < b.visitedTime) {
                    return -1;
                }
                else
                    return 1;
            }
        });
        for (var i = 0; i < items.length; i += 1) {
            // pop out items until we have enough room for new item
            this._removeItem(items[i].key, items[i].byteSize);
            remainedSize -= items[i].byteSize;
            if (remainedSize <= 0) {
                return;
            }
        }
    };
    /**
     * Set item into cache. You can put number, string, boolean or object.
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
     * @param {Object} [options] - optional, the specified meta-data
     */
    BrowserStorageCacheClass.prototype.setItem = function (key, value, options) {
        logger.log("Set item: key is " + key + ", value is " + value + " with options: " + options);
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
        try {
            // first look into the storage, if it exists, delete it.
            var val = this.config.storage.getItem(prefixedKey);
            if (val) {
                this._removeItem(prefixedKey, JSON.parse(val).byteSize);
            }
            // check whether the cache is full
            if (this._isCacheFull(item.byteSize)) {
                var validKeys = this._findValidKeys();
                // check again and then pop out items
                if (this._isCacheFull(item.byteSize)) {
                    var sizeToPop = this._sizeToPop(item.byteSize);
                    this._popOutItems(validKeys, sizeToPop);
                }
            }
            // put item in the cache
            // may failed due to storage full
            this._setItem(prefixedKey, item);
        }
        catch (e) {
            logger.warn("setItem failed! " + e);
        }
    };
    /**
     * Get item from cache. It will return null if item doesn’t exist or it has been expired.
     * If you specified callback function in the options,
     * then the function will be executed if no such item in the cache
     * and finally put the return value into cache.
     * Please make sure the callback function will return the value you want to put into the cache.
     * The cache will abort output a warning:
     * If the key is invalid
     * If error happened with browser storage
     *
     * @param key - the key of the item
     * @param {Object} [options] - the options of callback function
     *
     * @return - return the value of the item
     */
    BrowserStorageCacheClass.prototype.getItem = function (key, options) {
        logger.log("Get item: key is " + key + " with options " + options);
        var ret = null;
        var prefixedKey = this.config.keyPrefix + key;
        if (prefixedKey === this.config.keyPrefix ||
            prefixedKey === this.cacheCurSizeKey) {
            logger.warn("Invalid key: should not be empty or 'CurSize'");
            return null;
        }
        try {
            ret = this.config.storage.getItem(prefixedKey);
            if (ret != null) {
                if (this._isExpired(prefixedKey)) {
                    // if expired, remove that item and return null
                    this._removeItem(prefixedKey, JSON.parse(ret).byteSize);
                    ret = null;
                }
                else {
                    // if not expired, great, return the value and refresh it
                    var item = JSON.parse(ret);
                    item = this._refreshItem(item, prefixedKey);
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
        }
        catch (e) {
            logger.warn("getItem failed! " + e);
            return null;
        }
    };
    /**
     * remove item from the cache
     * The cache will abort output a warning:
     * If error happened with browser storage
     * @param key - the key of the item
     */
    BrowserStorageCacheClass.prototype.removeItem = function (key) {
        logger.log("Remove item: key is " + key);
        var prefixedKey = this.config.keyPrefix + key;
        if (prefixedKey === this.config.keyPrefix ||
            prefixedKey === this.cacheCurSizeKey) {
            return;
        }
        try {
            var val = this.config.storage.getItem(prefixedKey);
            if (val) {
                this._removeItem(prefixedKey, JSON.parse(val).byteSize);
            }
        }
        catch (e) {
            logger.warn("removeItem failed! " + e);
        }
    };
    /**
     * clear the entire cache
     * The cache will abort output a warning:
     * If error happened with browser storage
     */
    BrowserStorageCacheClass.prototype.clear = function () {
        logger.log("Clear Cache");
        var keysToRemove = [];
        for (var i = 0; i < this.config.storage.length; i += 1) {
            var key = this.config.storage.key(i);
            if (key.indexOf(this.config.keyPrefix) === 0) {
                keysToRemove.push(key);
            }
        }
        try {
            for (var i = 0; i < keysToRemove.length; i += 1) {
                this.config.storage.removeItem(keysToRemove[i]);
            }
        }
        catch (e) {
            logger.warn("clear failed! " + e);
        }
    };
    /**
     * Return all the keys in the cache.
     *
     * @return - all keys in the cache
     */
    BrowserStorageCacheClass.prototype.getAllKeys = function () {
        var keys = [];
        for (var i = 0; i < this.config.storage.length; i += 1) {
            var key = this.config.storage.key(i);
            if (key.indexOf(this.config.keyPrefix) === 0 &&
                key !== this.cacheCurSizeKey) {
                keys.push(key.substring(this.config.keyPrefix.length));
            }
        }
        return keys;
    };
    /**
     * return the current size of the cache
     *
     * @return - current size of the cache
     */
    BrowserStorageCacheClass.prototype.getCacheCurSize = function () {
        var ret = this.config.storage.getItem(this.cacheCurSizeKey);
        if (!ret) {
            this.config.storage.setItem(this.cacheCurSizeKey, '0');
            ret = '0';
        }
        return Number(ret);
    };
    /**
     * Return a new instance of cache with customized configuration.
     * @param config - the customized configuration
     *
     * @return - new instance of Cache
     */
    BrowserStorageCacheClass.prototype.createInstance = function (config) {
        if (!config.keyPrefix || config.keyPrefix === defaultConfig.keyPrefix) {
            logger.error('invalid keyPrefix, setting keyPrefix with timeStamp');
            config.keyPrefix = getCurrTime.toString();
        }
        return new BrowserStorageCacheClass(config);
    };
    return BrowserStorageCacheClass;
}(StorageCache));
export { BrowserStorageCacheClass };
export var BrowserStorageCache = new BrowserStorageCacheClass();
/**
 * @deprecated use named import
 */
export default BrowserStorageCache;
//# sourceMappingURL=BrowserStorageCache.js.map