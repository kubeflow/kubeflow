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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { StorageCache } from './StorageCache';
import { defaultConfig, getCurrTime } from './Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
var logger = new Logger('AsyncStorageCache');
/*
 * Customized cache which based on the AsyncStorage with LRU implemented
 */
var AsyncStorageCache = /** @class */ (function (_super) {
    __extends(AsyncStorageCache, _super);
    /**
     * initialize the cache
     *
     * @param {Object} config - the configuration of the cache
     */
    function AsyncStorageCache(config) {
        var _this = this;
        var cache_config = config
            ? Object.assign({}, defaultConfig, config)
            : defaultConfig;
        _this = _super.call(this, cache_config) || this;
        _this.getItem = _this.getItem.bind(_this);
        _this.setItem = _this.setItem.bind(_this);
        _this.removeItem = _this.removeItem.bind(_this);
        logger.debug('Using AsyncStorageCache');
        return _this;
    }
    /**
     * decrease current size of the cache
     * @private
     * @param amount - the amount of the cache size which needs to be decreased
     */
    AsyncStorageCache.prototype._decreaseCurSizeInBytes = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var curSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCacheCurSize()];
                    case 1:
                        curSize = _a.sent();
                        return [4 /*yield*/, AsyncStorage.setItem(this.cacheCurSizeKey, (curSize - amount).toString())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * increase current size of the cache
     * @private
     * @param amount - the amount of the cache szie which need to be increased
     */
    AsyncStorageCache.prototype._increaseCurSizeInBytes = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var curSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCacheCurSize()];
                    case 1:
                        curSize = _a.sent();
                        return [4 /*yield*/, AsyncStorage.setItem(this.cacheCurSizeKey, (curSize + amount).toString())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * update the visited time if item has been visited
     * @private
     * @param item - the item which need to be refreshed
     * @param prefixedKey - the key of the item
     *
     * @return the refreshed item
     */
    AsyncStorageCache.prototype._refreshItem = function (item, prefixedKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item.visitedTime = getCurrTime();
                        return [4 /*yield*/, AsyncStorage.setItem(prefixedKey, JSON.stringify(item))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, item];
                }
            });
        });
    };
    /**
     * check wether item is expired
     * @private
     * @param key - the key of the item
     *
     * @return true if the item is expired.
     */
    AsyncStorageCache.prototype._isExpired = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var text, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AsyncStorage.getItem(key)];
                    case 1:
                        text = _a.sent();
                        item = JSON.parse(text);
                        if (getCurrTime() >= item.expires) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * delete item from cache
     * @private
     * @param prefixedKey - the key of the item
     * @param size - optional, the byte size of the item
     */
    AsyncStorageCache.prototype._removeItem = function (prefixedKey, size) {
        return __awaiter(this, void 0, void 0, function () {
            var itemSize, _a, _b, _c, removeItemError_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!size) return [3 /*break*/, 1];
                        _a = size;
                        return [3 /*break*/, 3];
                    case 1:
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, AsyncStorage.getItem(prefixedKey)];
                    case 2:
                        _a = _c.apply(_b, [_d.sent()]).byteSize;
                        _d.label = 3;
                    case 3:
                        itemSize = _a;
                        // first try to update the current size of the cache
                        return [4 /*yield*/, this._decreaseCurSizeInBytes(itemSize)];
                    case 4:
                        // first try to update the current size of the cache
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 7, , 9]);
                        return [4 /*yield*/, AsyncStorage.removeItem(prefixedKey)];
                    case 6:
                        _d.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        removeItemError_1 = _d.sent();
                        // if some error happened, we need to rollback the current size
                        return [4 /*yield*/, this._increaseCurSizeInBytes(itemSize)];
                    case 8:
                        // if some error happened, we need to rollback the current size
                        _d.sent();
                        logger.error("Failed to remove item: " + removeItemError_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * put item into cache
     * @private
     * @param prefixedKey - the key of the item
     * @param itemData - the value of the item
     * @param itemSizeInBytes - the byte size of the item
     */
    AsyncStorageCache.prototype._setItem = function (prefixedKey, item) {
        return __awaiter(this, void 0, void 0, function () {
            var setItemErr_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // first try to update the current size of the cache.
                    return [4 /*yield*/, this._increaseCurSizeInBytes(item.byteSize)];
                    case 1:
                        // first try to update the current size of the cache.
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, AsyncStorage.setItem(prefixedKey, JSON.stringify(item))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        setItemErr_1 = _a.sent();
                        // if some error happened, we need to rollback the current size
                        return [4 /*yield*/, this._decreaseCurSizeInBytes(item.byteSize)];
                    case 5:
                        // if some error happened, we need to rollback the current size
                        _a.sent();
                        logger.error("Failed to set item " + setItemErr_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * total space needed when poping out items
     * @private
     * @param itemSize
     *
     * @return total space needed
     */
    AsyncStorageCache.prototype._sizeToPop = function (itemSize) {
        return __awaiter(this, void 0, void 0, function () {
            var spaceItemNeed, cacheThresholdSpace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCacheCurSize()];
                    case 1:
                        spaceItemNeed = (_a.sent()) + itemSize - this.config.capacityInBytes;
                        cacheThresholdSpace = (1 - this.config.warningThreshold) * this.config.capacityInBytes;
                        return [2 /*return*/, spaceItemNeed > cacheThresholdSpace
                                ? spaceItemNeed
                                : cacheThresholdSpace];
                }
            });
        });
    };
    /**
     * see whether cache is full
     * @private
     * @param itemSize
     *
     * @return true if cache is full
     */
    AsyncStorageCache.prototype._isCacheFull = function (itemSize) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = itemSize;
                        return [4 /*yield*/, this.getCacheCurSize()];
                    case 1: return [2 /*return*/, (_a + (_b.sent()) > this.config.capacityInBytes)];
                }
            });
        });
    };
    /**
     * scan the storage and find out all the keys owned by this cache
     * also clean the expired keys while scanning
     * @private
     * @return array of keys
     */
    AsyncStorageCache.prototype._findValidKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys, keyInCache, i, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = [];
                        keyInCache = [];
                        return [4 /*yield*/, AsyncStorage.getAllKeys()];
                    case 1:
                        keyInCache = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < keyInCache.length)) return [3 /*break*/, 7];
                        key = keyInCache[i];
                        if (!(key.indexOf(this.config.keyPrefix) === 0 &&
                            key !== this.cacheCurSizeKey)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._isExpired(key)];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._removeItem(key)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        keys.push(key);
                        _a.label = 6;
                    case 6:
                        i += 1;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, keys];
                }
            });
        });
    };
    /**
     * get all the items we have, sort them by their priority,
     * if priority is same, sort them by their last visited time
     * pop out items from the low priority (5 is the lowest)
     * @private
     * @param keys - all the keys in this cache
     * @param sizeToPop - the total size of the items which needed to be poped out
     */
    AsyncStorageCache.prototype._popOutItems = function (keys, sizeToPop) {
        return __awaiter(this, void 0, void 0, function () {
            var items, remainedSize, i, val, item, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = [];
                        remainedSize = sizeToPop;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < keys.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, AsyncStorage.getItem(keys[i])];
                    case 2:
                        val = _a.sent();
                        if (val != null) {
                            item = JSON.parse(val);
                            items.push(item);
                        }
                        _a.label = 3;
                    case 3:
                        i += 1;
                        return [3 /*break*/, 1];
                    case 4:
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
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < items.length)) return [3 /*break*/, 8];
                        // pop out items until we have enough room for new item
                        return [4 /*yield*/, this._removeItem(items[i].key, items[i].byteSize)];
                    case 6:
                        // pop out items until we have enough room for new item
                        _a.sent();
                        remainedSize -= items[i].byteSize;
                        if (remainedSize <= 0) {
                            return [2 /*return*/];
                        }
                        _a.label = 7;
                    case 7:
                        i += 1;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
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
     * @param {String} key - the key of the item
     * @param {Object} value - the value of the item
     * @param {Object} [options] - optional, the specified meta-data
     * @return {Prmoise}
     */
    AsyncStorageCache.prototype.setItem = function (key, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var prefixedKey, cacheItemOptions, item, val, validKeys, sizeToPop, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug("Set item: key is " + key + ", value is " + value + " with options: " + options);
                        prefixedKey = this.config.keyPrefix + key;
                        // invalid keys
                        if (prefixedKey === this.config.keyPrefix ||
                            prefixedKey === this.cacheCurSizeKey) {
                            logger.warn("Invalid key: should not be empty or 'CurSize'");
                            return [2 /*return*/];
                        }
                        if (typeof value === 'undefined') {
                            logger.warn("The value of item should not be undefined!");
                            return [2 /*return*/];
                        }
                        cacheItemOptions = {
                            priority: options && options.priority !== undefined
                                ? options.priority
                                : this.config.defaultPriority,
                            expires: options && options.expires !== undefined
                                ? options.expires
                                : this.config.defaultTTL + getCurrTime(),
                        };
                        if (cacheItemOptions.priority < 1 || cacheItemOptions.priority > 5) {
                            logger.warn("Invalid parameter: priority due to out or range. It should be within 1 and 5.");
                            return [2 /*return*/];
                        }
                        item = this.fillCacheItem(prefixedKey, value, cacheItemOptions);
                        // check wether this item is too big;
                        if (item.byteSize > this.config.itemMaxSize) {
                            logger.warn("Item with key: " + key + " you are trying to put into is too big!");
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        return [4 /*yield*/, AsyncStorage.getItem(prefixedKey)];
                    case 2:
                        val = _a.sent();
                        if (!val) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._removeItem(prefixedKey, JSON.parse(val).byteSize)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this._isCacheFull(item.byteSize)];
                    case 5:
                        if (!_a.sent()) return [3 /*break*/, 10];
                        return [4 /*yield*/, this._findValidKeys()];
                    case 6:
                        validKeys = _a.sent();
                        return [4 /*yield*/, this._isCacheFull(item.byteSize)];
                    case 7:
                        if (!_a.sent()) return [3 /*break*/, 10];
                        return [4 /*yield*/, this._sizeToPop(item.byteSize)];
                    case 8:
                        sizeToPop = _a.sent();
                        return [4 /*yield*/, this._popOutItems(validKeys, sizeToPop)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: 
                    // put item in the cache
                    return [4 /*yield*/, this._setItem(prefixedKey, item)];
                    case 11:
                        // put item in the cache
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        e_1 = _a.sent();
                        logger.warn("setItem failed! " + e_1);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get item from cache. It will return null if item doesn’t exist or it has been expired.
     * If you specified callback function in the options,
     * then the function will be executed if no such item in the cache
     * and finally put the return value into cache.
     * Please make sure the callback function will return the value you want to put into the cache.
     * The cache will abort output a warning:
     * If the key is invalid
     * If error happened with AsyncStorage
     *
     * @param {String} key - the key of the item
     * @param {Object} [options] - the options of callback function
     * @return {Promise} - return a promise resolves to be the value of the item
     */
    AsyncStorageCache.prototype.getItem = function (key, options) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, prefixedKey, item, val, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug("Get item: key is " + key + " with options " + options);
                        ret = null;
                        prefixedKey = this.config.keyPrefix + key;
                        if (prefixedKey === this.config.keyPrefix ||
                            prefixedKey === this.cacheCurSizeKey) {
                            logger.warn("Invalid key: should not be empty or 'CurSize'");
                            return [2 /*return*/, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, AsyncStorage.getItem(prefixedKey)];
                    case 2:
                        ret = _a.sent();
                        if (!(ret != null)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._isExpired(prefixedKey)];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        // if expired, remove that item and return null
                        return [4 /*yield*/, this._removeItem(prefixedKey, JSON.parse(ret).byteSize)];
                    case 4:
                        // if expired, remove that item and return null
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        item = JSON.parse(ret);
                        return [4 /*yield*/, this._refreshItem(item, prefixedKey)];
                    case 6:
                        item = _a.sent();
                        return [2 /*return*/, item.data];
                    case 7:
                        if (options && options.callback !== undefined) {
                            val = options.callback();
                            if (val !== null) {
                                this.setItem(key, val, options);
                            }
                            return [2 /*return*/, val];
                        }
                        return [2 /*return*/, null];
                    case 8:
                        e_2 = _a.sent();
                        logger.warn("getItem failed! " + e_2);
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * remove item from the cache
     * The cache will abort output a warning:
     * If error happened with AsyncStorage
     * @param {String} key - the key of the item
     * @return {Promise}
     */
    AsyncStorageCache.prototype.removeItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var prefixedKey, val, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug("Remove item: key is " + key);
                        prefixedKey = this.config.keyPrefix + key;
                        if (prefixedKey === this.config.keyPrefix ||
                            prefixedKey === this.cacheCurSizeKey) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, AsyncStorage.getItem(prefixedKey)];
                    case 2:
                        val = _a.sent();
                        if (!val) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._removeItem(prefixedKey, JSON.parse(val).byteSize)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        logger.warn("removeItem failed! " + e_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * clear the entire cache
     * The cache will abort output a warning:
     * If error happened with AsyncStorage
     * @return {Promise}
     */
    AsyncStorageCache.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys, keysToRemove, i, i, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug("Clear Cache");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, AsyncStorage.getAllKeys()];
                    case 2:
                        keys = _a.sent();
                        keysToRemove = [];
                        for (i = 0; i < keys.length; i += 1) {
                            if (keys[i].indexOf(this.config.keyPrefix) === 0) {
                                keysToRemove.push(keys[i]);
                            }
                        }
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < keysToRemove.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, AsyncStorage.removeItem(keysToRemove[i])];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i += 1;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_4 = _a.sent();
                        logger.warn("clear failed! " + e_4);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * return the current size of the cache
     * @return {Promise}
     */
    AsyncStorageCache.prototype.getCacheCurSize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AsyncStorage.getItem(this.cacheCurSizeKey)];
                    case 1:
                        ret = _a.sent();
                        if (!!ret) return [3 /*break*/, 3];
                        return [4 /*yield*/, AsyncStorage.setItem(this.cacheCurSizeKey, '0')];
                    case 2:
                        _a.sent();
                        ret = '0';
                        _a.label = 3;
                    case 3: return [2 /*return*/, Number(ret)];
                }
            });
        });
    };
    /**
     * Return all the keys in the cache.
     * Will return an empty array if error happend.
     * @return {Promise}
     */
    AsyncStorageCache.prototype.getAllKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys, retKeys, i, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AsyncStorage.getAllKeys()];
                    case 1:
                        keys = _a.sent();
                        retKeys = [];
                        for (i = 0; i < keys.length; i += 1) {
                            if (keys[i].indexOf(this.config.keyPrefix) === 0 &&
                                keys[i] !== this.cacheCurSizeKey) {
                                retKeys.push(keys[i].substring(this.config.keyPrefix.length));
                            }
                        }
                        return [2 /*return*/, retKeys];
                    case 2:
                        e_5 = _a.sent();
                        logger.warn("getALlkeys failed! " + e_5);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Return a new instance of cache with customized configuration.
     * @param {Object} config - the customized configuration
     * @return {Object} - the new instance of Cache
     */
    AsyncStorageCache.prototype.createInstance = function (config) {
        if (config.keyPrefix === defaultConfig.keyPrefix) {
            logger.error('invalid keyPrefix, setting keyPrefix with timeStamp');
            config.keyPrefix = getCurrTime.toString();
        }
        return new AsyncStorageCache(config);
    };
    return AsyncStorageCache;
}(StorageCache));
export { AsyncStorageCache };
var instance = new AsyncStorageCache();
export { AsyncStorage, instance as Cache };
export default instance;
//# sourceMappingURL=AsyncStorageCache.js.map