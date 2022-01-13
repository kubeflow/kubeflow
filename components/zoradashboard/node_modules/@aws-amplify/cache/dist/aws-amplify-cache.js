(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@aws-amplify/core"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_cache", ["@aws-amplify/core"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_cache"] = factory(require("@aws-amplify/core"));
	else
		root["aws_amplify_cache"] = factory(root["@aws-amplify/core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib-esm/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib-esm/BrowserStorageCache.js":
/*!****************************************!*\
  !*** ./lib-esm/BrowserStorageCache.js ***!
  \****************************************/
/*! exports provided: BrowserStorageCacheClass, BrowserStorageCache, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserStorageCacheClass", function() { return BrowserStorageCacheClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserStorageCache", function() { return BrowserStorageCache; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./lib-esm/Utils/index.js");
/* harmony import */ var _StorageCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StorageCache */ "./lib-esm/StorageCache.js");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__);
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
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__["ConsoleLogger"]('Cache');
/**
 * Customized storage based on the SessionStorage or LocalStorage with LRU implemented
 */

var BrowserStorageCacheClass = function (_super) {
  __extends(BrowserStorageCacheClass, _super);
  /**
   * initialize the cache
   * @param config - the configuration of the cache
   */


  function BrowserStorageCacheClass(config) {
    var _this = this;

    var cacheConfig = config ? Object.assign({}, _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"], config) : _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"];
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
    item.visitedTime = Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"])();
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

    if (Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"])() >= item.expires) {
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
    var itemSize = size ? size : JSON.parse(this.config.storage.getItem(prefixedKey)).byteSize;

    this._decreaseCurSizeInBytes(itemSize); // remove the cache item


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
    } catch (setItemErr) {
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
    return spaceItemNeed > cacheThresholdSpace ? spaceItemNeed : cacheThresholdSpace;
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
    var keyInCache = []; // get all keys in Storage

    for (var i = 0; i < this.config.storage.length; i += 1) {
      keyInCache.push(this.config.storage.key(i));
    } // find those items which belong to our cache and also clean those expired items


    for (var i = 0; i < keyInCache.length; i += 1) {
      var key = keyInCache[i];

      if (key.indexOf(this.config.keyPrefix) === 0 && key !== this.cacheCurSizeKey) {
        if (this._isExpired(key)) {
          this._removeItem(key);
        } else {
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
    var remainedSize = sizeToPop; // get the items from Storage

    for (var i = 0; i < keys.length; i += 1) {
      var val = this.config.storage.getItem(keys[i]);

      if (val != null) {
        var item = JSON.parse(val);
        items.push(item);
      }
    } // first compare priority
    // then compare visited time


    items.sort(function (a, b) {
      if (a.priority > b.priority) {
        return -1;
      } else if (a.priority < b.priority) {
        return 1;
      } else {
        if (a.visitedTime < b.visitedTime) {
          return -1;
        } else return 1;
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
    var prefixedKey = this.config.keyPrefix + key; // invalid keys

    if (prefixedKey === this.config.keyPrefix || prefixedKey === this.cacheCurSizeKey) {
      logger.warn("Invalid key: should not be empty or 'CurSize'");
      return;
    }

    if (typeof value === 'undefined') {
      logger.warn("The value of item should not be undefined!");
      return;
    }

    var cacheItemOptions = {
      priority: options && options.priority !== undefined ? options.priority : this.config.defaultPriority,
      expires: options && options.expires !== undefined ? options.expires : this.config.defaultTTL + Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"])()
    };

    if (cacheItemOptions.priority < 1 || cacheItemOptions.priority > 5) {
      logger.warn("Invalid parameter: priority due to out or range. It should be within 1 and 5.");
      return;
    }

    var item = this.fillCacheItem(prefixedKey, value, cacheItemOptions); // check wether this item is too big;

    if (item.byteSize > this.config.itemMaxSize) {
      logger.warn("Item with key: " + key + " you are trying to put into is too big!");
      return;
    }

    try {
      // first look into the storage, if it exists, delete it.
      var val = this.config.storage.getItem(prefixedKey);

      if (val) {
        this._removeItem(prefixedKey, JSON.parse(val).byteSize);
      } // check whether the cache is full


      if (this._isCacheFull(item.byteSize)) {
        var validKeys = this._findValidKeys(); // check again and then pop out items


        if (this._isCacheFull(item.byteSize)) {
          var sizeToPop = this._sizeToPop(item.byteSize);

          this._popOutItems(validKeys, sizeToPop);
        }
      } // put item in the cache
      // may failed due to storage full


      this._setItem(prefixedKey, item);
    } catch (e) {
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

    if (prefixedKey === this.config.keyPrefix || prefixedKey === this.cacheCurSizeKey) {
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
        } else {
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
    } catch (e) {
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

    if (prefixedKey === this.config.keyPrefix || prefixedKey === this.cacheCurSizeKey) {
      return;
    }

    try {
      var val = this.config.storage.getItem(prefixedKey);

      if (val) {
        this._removeItem(prefixedKey, JSON.parse(val).byteSize);
      }
    } catch (e) {
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
    } catch (e) {
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

      if (key.indexOf(this.config.keyPrefix) === 0 && key !== this.cacheCurSizeKey) {
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
    if (!config.keyPrefix || config.keyPrefix === _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].keyPrefix) {
      logger.error('invalid keyPrefix, setting keyPrefix with timeStamp');
      config.keyPrefix = _Utils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"].toString();
    }

    return new BrowserStorageCacheClass(config);
  };

  return BrowserStorageCacheClass;
}(_StorageCache__WEBPACK_IMPORTED_MODULE_1__["StorageCache"]);


var BrowserStorageCache = new BrowserStorageCacheClass();
/**
 * @deprecated use named import
 */

/* harmony default export */ __webpack_exports__["default"] = (BrowserStorageCache);

/***/ }),

/***/ "./lib-esm/InMemoryCache.js":
/*!**********************************!*\
  !*** ./lib-esm/InMemoryCache.js ***!
  \**********************************/
/*! exports provided: InMemoryCacheClass, InMemoryCache, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InMemoryCacheClass", function() { return InMemoryCacheClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InMemoryCache", function() { return InMemoryCache; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./lib-esm/Utils/index.js");
/* harmony import */ var _StorageCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StorageCache */ "./lib-esm/StorageCache.js");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__);
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
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __values = undefined && undefined.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};




var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__["ConsoleLogger"]('InMemoryCache');
/**
 * Customized in-memory cache with LRU implemented
 * @member cacheObj - object which store items
 * @member cacheList - list of keys in the cache with LRU
 * @member curSizeInBytes - current size of the cache
 * @member maxPriority - max of the priority
 * @member cacheSizeLimit - the limit of cache size
 */

var InMemoryCacheClass = function (_super) {
  __extends(InMemoryCacheClass, _super);
  /**
   * initialize the cache
   *
   * @param config - the configuration of the cache
   */


  function InMemoryCacheClass(config) {
    var _this = this;

    var cacheConfig = config ? Object.assign({}, _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"], config) : _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"];
    _this = _super.call(this, cacheConfig) || this;
    logger.debug('now we start!');
    _this.cacheList = [];
    _this.curSizeInBytes = 0;
    _this.maxPriority = 5;
    _this.getItem = _this.getItem.bind(_this);
    _this.setItem = _this.setItem.bind(_this);
    _this.removeItem = _this.removeItem.bind(_this); // initialize list for every priority

    for (var i = 0; i < _this.maxPriority; i += 1) {
      _this.cacheList[i] = new _Utils__WEBPACK_IMPORTED_MODULE_0__["CacheList"]();
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
    var text = _Utils__WEBPACK_IMPORTED_MODULE_0__["CacheObject"].getItem(key);
    var item = JSON.parse(text);

    if (Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"])() >= item.expires) {
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
    this.cacheList[listIdx].removeItem(prefixedKey); // decrease the current size of the cache

    this._decreaseCurSizeInBytes(JSON.parse(_Utils__WEBPACK_IMPORTED_MODULE_0__["CacheObject"].getItem(prefixedKey)).byteSize); // finally remove the item from memory


    _Utils__WEBPACK_IMPORTED_MODULE_0__["CacheObject"].removeItem(prefixedKey);
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
    this.cacheList[listIdx].insertItem(prefixedKey); // increase the current size of the cache

    this._increaseCurSizeInBytes(item.byteSize); // finally add the item into memory


    _Utils__WEBPACK_IMPORTED_MODULE_0__["CacheObject"].setItem(prefixedKey, JSON.stringify(item));
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
    var prefixedKey = this.config.keyPrefix + key; // invalid keys

    if (prefixedKey === this.config.keyPrefix || prefixedKey === this.cacheCurSizeKey) {
      logger.warn("Invalid key: should not be empty or 'CurSize'");
      return;
    }

    if (typeof value === 'undefined') {
      logger.warn("The value of item should not be undefined!");
      return;
    }

    var cacheItemOptions = {
      priority: options && options.priority !== undefined ? options.priority : this.config.defaultPriority,
      expires: options && options.expires !== undefined ? options.expires : this.config.defaultTTL + Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"])()
    };

    if (cacheItemOptions.priority < 1 || cacheItemOptions.priority > 5) {
      logger.warn("Invalid parameter: priority due to out or range. It should be within 1 and 5.");
      return;
    }

    var item = this.fillCacheItem(prefixedKey, value, cacheItemOptions); // check wether this item is too big;

    if (item.byteSize > this.config.itemMaxSize) {
      logger.warn("Item with key: " + key + " you are trying to put into is too big!");
      return;
    } // if key already in the cache, then delete it.


    var presentKeyPrio = this.containsKey(key);

    if (presentKeyPrio !== -1) {
      this._removeItem(prefixedKey, presentKeyPrio - 1);
    } // pop out items in the cache when cache is full based on LRU
    // first start from lowest priority cache list


    var cacheListIdx = this.maxPriority - 1;

    while (this._isCacheFull(item.byteSize) && cacheListIdx >= 0) {
      if (!this.cacheList[cacheListIdx].isEmpty()) {
        var popedItemKey = this.cacheList[cacheListIdx].getLastItem();

        this._removeItem(popedItemKey, cacheListIdx);
      } else {
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

    if (prefixedKey === this.config.keyPrefix || prefixedKey === this.cacheCurSizeKey) {
      logger.warn("Invalid key: should not be empty or 'CurSize'");
      return null;
    } // check whether it's in the cachelist


    var presentKeyPrio = this.containsKey(key);

    if (presentKeyPrio !== -1) {
      if (this._isExpired(prefixedKey)) {
        // if expired, remove that item and return null
        this._removeItem(prefixedKey, presentKeyPrio - 1);
      } else {
        // if not expired, great, return the value and refresh it
        ret = _Utils__WEBPACK_IMPORTED_MODULE_0__["CacheObject"].getItem(prefixedKey);
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
    var prefixedKey = this.config.keyPrefix + key; // check if the key is in the cache

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
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
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
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }
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
}(_StorageCache__WEBPACK_IMPORTED_MODULE_1__["StorageCache"]);


var InMemoryCache = new InMemoryCacheClass();
/**
 * @deprecated use named import
 */

/* harmony default export */ __webpack_exports__["default"] = (InMemoryCache);

/***/ }),

/***/ "./lib-esm/StorageCache.js":
/*!*********************************!*\
  !*** ./lib-esm/StorageCache.js ***!
  \*********************************/
/*! exports provided: StorageCache, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageCache", function() { return StorageCache; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./lib-esm/Utils/index.js");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
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




var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__["ConsoleLogger"]('StorageCache');
/**
 * Initialization of the cache
 *
 */

var StorageCache = function () {
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
    if (!Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["isInteger"])(this.config.capacityInBytes)) {
      logger.error('Invalid parameter: capacityInBytes. It should be an Integer. Setting back to default.');
      this.config.capacityInBytes = _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].capacityInBytes;
    }

    if (!Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["isInteger"])(this.config.itemMaxSize)) {
      logger.error('Invalid parameter: itemMaxSize. It should be an Integer. Setting back to default.');
      this.config.itemMaxSize = _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].itemMaxSize;
    }

    if (!Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["isInteger"])(this.config.defaultTTL)) {
      logger.error('Invalid parameter: defaultTTL. It should be an Integer. Setting back to default.');
      this.config.defaultTTL = _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].defaultTTL;
    }

    if (!Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["isInteger"])(this.config.defaultPriority)) {
      logger.error('Invalid parameter: defaultPriority. It should be an Integer. Setting back to default.');
      this.config.defaultPriority = _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].defaultPriority;
    }

    if (this.config.itemMaxSize > this.config.capacityInBytes) {
      logger.error('Invalid parameter: itemMaxSize. It should be smaller than capacityInBytes. Setting back to default.');
      this.config.itemMaxSize = _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].itemMaxSize;
    }

    if (this.config.defaultPriority > 5 || this.config.defaultPriority < 1) {
      logger.error('Invalid parameter: defaultPriority. It should be between 1 and 5. Setting back to default.');
      this.config.defaultPriority = _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].defaultPriority;
    }

    if (Number(this.config.warningThreshold) > 1 || Number(this.config.warningThreshold) < 0) {
      logger.error('Invalid parameter: warningThreshold. It should be between 0 and 1. Setting back to default.');
      this.config.warningThreshold = _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].warningThreshold;
    } // set 5MB limit


    var cacheLimit = 5 * 1024 * 1024;

    if (this.config.capacityInBytes > cacheLimit) {
      logger.error('Cache Capacity should be less than 5MB. Setting back to default. Setting back to default.');
      this.config.capacityInBytes = _Utils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].capacityInBytes;
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
      timestamp: Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"])(),
      visitedTime: Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"])(),
      priority: options.priority,
      expires: options.expires,
      type: _typeof(value),
      byteSize: 0
    };
    ret.byteSize = Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getByteLength"])(JSON.stringify(ret)); // for accurate size

    ret.byteSize = Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["getByteLength"])(JSON.stringify(ret));
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
}();


/**
 * @deprecated use named import
 */

/* harmony default export */ __webpack_exports__["default"] = (StorageCache);

/***/ }),

/***/ "./lib-esm/Utils/CacheList.js":
/*!************************************!*\
  !*** ./lib-esm/Utils/CacheList.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
var __values = undefined && undefined.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var DoubleLinkedNode = function () {
  function DoubleLinkedNode(keyVal) {
    this.key = keyVal ? keyVal : '';
    this.prevNode = null;
    this.nextNode = null;
  }

  return DoubleLinkedNode;
}();
/**
 * double linked list plus a hash table inside
 * each key in the cache stored as a node in the list
 * recently visited node will be rotated to the head
 * so the Last Recently Visited node will be at the tail
 *
 * @member head - dummy head of the linked list
 * @member tail - dummy tail of the linked list
 * @member hashtable - the hashtable which maps cache key to list node
 * @member length - length of the list
 */


var CacheList = function () {
  /**
   * initialization
   */
  function CacheList() {
    this.head = new DoubleLinkedNode();
    this.tail = new DoubleLinkedNode();
    this.hashtable = {};
    this.length = 0;
    this.head.nextNode = this.tail;
    this.tail.prevNode = this.head;
  }
  /**
   * insert node to the head of the list
   *
   * @param node
   */


  CacheList.prototype.insertNodeToHead = function (node) {
    var tmp = this.head.nextNode;
    this.head.nextNode = node;
    node.nextNode = tmp;
    node.prevNode = this.head;
    tmp.prevNode = node;
    this.length = this.length + 1;
  };
  /**
   * remove node
   *
   * @param node
   */


  CacheList.prototype.removeNode = function (node) {
    node.prevNode.nextNode = node.nextNode;
    node.nextNode.prevNode = node.prevNode;
    node.prevNode = null;
    node.nextNode = null;
    this.length = this.length - 1;
  };
  /**
   * @return true if list is empty
   */


  CacheList.prototype.isEmpty = function () {
    return this.length === 0;
  };
  /**
   * refresh node so it is rotated to the head
   *
   * @param key - key of the node
   */


  CacheList.prototype.refresh = function (key) {
    var node = this.hashtable[key];
    this.removeNode(node);
    this.insertNodeToHead(node);
  };
  /**
   * insert new node to the head and add it in the hashtable
   *
   * @param key - the key of the node
   */


  CacheList.prototype.insertItem = function (key) {
    var node = new DoubleLinkedNode(key);
    this.hashtable[key] = node;
    this.insertNodeToHead(node);
  };
  /**
   * @return the LAST Recently Visited key
   */


  CacheList.prototype.getLastItem = function () {
    return this.tail.prevNode.key;
  };
  /**
   * remove the cache key from the list and hashtable
   * @param key - the key of the node
   */


  CacheList.prototype.removeItem = function (key) {
    var removedItem = this.hashtable[key];
    this.removeNode(removedItem);
    delete this.hashtable[key];
  };
  /**
   * @return length of the list
   */


  CacheList.prototype.getSize = function () {
    return this.length;
  };
  /**
   * @return true if the key is in the hashtable
   * @param key
   */


  CacheList.prototype.containsKey = function (key) {
    return key in this.hashtable;
  };
  /**
   * clean up the list and hashtable
   */


  CacheList.prototype.clearList = function () {
    var e_1, _a;

    try {
      for (var _b = __values(Object.keys(this.hashtable)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;

        if (this.hashtable.hasOwnProperty(key)) {
          delete this.hashtable[key];
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    this.head.nextNode = this.tail;
    this.tail.prevNode = this.head;
    this.length = 0;
  };
  /**
   * @return all keys in the hashtable
   */


  CacheList.prototype.getKeys = function () {
    return Object.keys(this.hashtable);
  };
  /**
   * mainly for test
   *
   * @param key
   * @return true if key is the head node
   */


  CacheList.prototype.isHeadNode = function (key) {
    var node = this.hashtable[key];
    return node.prevNode === this.head;
  };
  /**
   * mainly for test
   *
   * @param key
   * @return true if key is the tail node
   */


  CacheList.prototype.isTailNode = function (key) {
    var node = this.hashtable[key];
    return node.nextNode === this.tail;
  };

  return CacheList;
}();

/* harmony default export */ __webpack_exports__["default"] = (CacheList);

/***/ }),

/***/ "./lib-esm/Utils/CacheUtils.js":
/*!*************************************!*\
  !*** ./lib-esm/Utils/CacheUtils.js ***!
  \*************************************/
/*! exports provided: defaultConfig, getByteLength, getCurrTime, isInteger, CacheObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultConfig", function() { return defaultConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getByteLength", function() { return getByteLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrTime", function() { return getCurrTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInteger", function() { return isInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheObject", function() { return CacheObject; });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__);
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

/**
 * Default cache config
 */

var defaultConfig = {
  keyPrefix: 'aws-amplify-cache',
  capacityInBytes: 1048576,
  itemMaxSize: 210000,
  defaultTTL: 259200000,
  defaultPriority: 5,
  warningThreshold: 0.8,
  // the storage helper will check if localStorage exists,
  // if not, will use a in-memory object instead
  storage: new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["StorageHelper"]().getStorage()
};
/**
 * return the byte size of the string
 * @param str
 */

function getByteLength(str) {
  var ret = 0;
  ret = str.length;

  for (var i = str.length; i >= 0; i -= 1) {
    var charCode = str.charCodeAt(i);

    if (charCode > 0x7f && charCode <= 0x7ff) {
      ret += 1;
    } else if (charCode > 0x7ff && charCode <= 0xffff) {
      ret += 2;
    } // trail surrogate


    if (charCode >= 0xdc00 && charCode <= 0xdfff) {
      i -= 1;
    }
  }

  return ret;
}
/**
 * get current time
 */

function getCurrTime() {
  var currTime = new Date();
  return currTime.getTime();
}
/**
 * check if passed value is an integer
 */

function isInteger(value) {
  if (Number.isInteger) {
    return Number.isInteger(value);
  }

  return _isInteger(value);
}

function _isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/**
 * provide an object as the in-memory cache
 */


var store = {};

var CacheObject = function () {
  function CacheObject() {}

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
}();



/***/ }),

/***/ "./lib-esm/Utils/index.js":
/*!********************************!*\
  !*** ./lib-esm/Utils/index.js ***!
  \********************************/
/*! exports provided: defaultConfig, getByteLength, getCurrTime, isInteger, CacheObject, CacheList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CacheUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CacheUtils */ "./lib-esm/Utils/CacheUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultConfig", function() { return _CacheUtils__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getByteLength", function() { return _CacheUtils__WEBPACK_IMPORTED_MODULE_0__["getByteLength"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCurrTime", function() { return _CacheUtils__WEBPACK_IMPORTED_MODULE_0__["getCurrTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isInteger", function() { return _CacheUtils__WEBPACK_IMPORTED_MODULE_0__["isInteger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CacheObject", function() { return _CacheUtils__WEBPACK_IMPORTED_MODULE_0__["CacheObject"]; });

/* harmony import */ var _CacheList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CacheList */ "./lib-esm/Utils/CacheList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CacheList", function() { return _CacheList__WEBPACK_IMPORTED_MODULE_1__["default"]; });

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



/***/ }),

/***/ "./lib-esm/index.js":
/*!**************************!*\
  !*** ./lib-esm/index.js ***!
  \**************************/
/*! exports provided: BrowserStorageCache, InMemoryCache, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BrowserStorageCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserStorageCache */ "./lib-esm/BrowserStorageCache.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrowserStorageCache", function() { return _BrowserStorageCache__WEBPACK_IMPORTED_MODULE_1__["BrowserStorageCache"]; });

/* harmony import */ var _InMemoryCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InMemoryCache */ "./lib-esm/InMemoryCache.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InMemoryCache", function() { return _InMemoryCache__WEBPACK_IMPORTED_MODULE_2__["InMemoryCache"]; });

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




/**
 * @deprecated use named import
 */

/* harmony default export */ __webpack_exports__["default"] = (_BrowserStorageCache__WEBPACK_IMPORTED_MODULE_1__["BrowserStorageCache"]);
_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["Amplify"].register(_BrowserStorageCache__WEBPACK_IMPORTED_MODULE_1__["BrowserStorageCache"]);

/***/ }),

/***/ "@aws-amplify/core":
/*!************************************!*\
  !*** external "@aws-amplify/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__aws_amplify_core__;

/***/ })

/******/ });
});
//# sourceMappingURL=aws-amplify-cache.js.map