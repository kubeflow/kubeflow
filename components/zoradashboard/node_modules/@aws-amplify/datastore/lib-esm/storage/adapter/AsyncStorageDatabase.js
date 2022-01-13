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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { OpType, QueryOne, } from '../../types';
import { monotonicUlidFactory } from '../../util';
import { createInMemoryStore } from './InMemoryStore';
var DB_NAME = '@AmplifyDatastore';
var COLLECTION = 'Collection';
var DATA = 'Data';
var monotonicFactoriesMap = new Map();
var AsyncStorageDatabase = /** @class */ (function () {
    function AsyncStorageDatabase() {
        /**
         * Maps storeNames to a map of ulid->id
         */
        this._collectionInMemoryIndex = new Map();
        this.storage = createInMemoryStore();
    }
    AsyncStorageDatabase.prototype.getCollectionIndex = function (storeName) {
        if (!this._collectionInMemoryIndex.has(storeName)) {
            this._collectionInMemoryIndex.set(storeName, new Map());
        }
        return this._collectionInMemoryIndex.get(storeName);
    };
    AsyncStorageDatabase.prototype.getMonotonicFactory = function (storeName) {
        if (!monotonicFactoriesMap.has(storeName)) {
            monotonicFactoriesMap.set(storeName, monotonicUlidFactory());
        }
        return monotonicFactoriesMap.get(storeName);
    };
    AsyncStorageDatabase.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allKeys, keysForCollectionEntries, allKeys_1, allKeys_1_1, key, _a, dbName, storeName, recordType, ulidOrId, id, ulid, id_1, newUlid, oldKey, newKey, item, e_1_1;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this._collectionInMemoryIndex.clear();
                        return [4 /*yield*/, this.storage.getAllKeys()];
                    case 1:
                        allKeys = _c.sent();
                        keysForCollectionEntries = [];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 12, 13, 14]);
                        allKeys_1 = __values(allKeys), allKeys_1_1 = allKeys_1.next();
                        _c.label = 3;
                    case 3:
                        if (!!allKeys_1_1.done) return [3 /*break*/, 11];
                        key = allKeys_1_1.value;
                        _a = __read(key.split('::'), 5), dbName = _a[0], storeName = _a[1], recordType = _a[2], ulidOrId = _a[3], id = _a[4];
                        if (!(dbName === DB_NAME)) return [3 /*break*/, 10];
                        if (!(recordType === DATA)) return [3 /*break*/, 9];
                        ulid = void 0;
                        if (!(id === undefined)) return [3 /*break*/, 7];
                        id_1 = ulidOrId;
                        newUlid = this.getMonotonicFactory(storeName)();
                        oldKey = this.getLegacyKeyForItem(storeName, id_1);
                        newKey = this.getKeyForItem(storeName, id_1, newUlid);
                        return [4 /*yield*/, this.storage.getItem(oldKey)];
                    case 4:
                        item = _c.sent();
                        return [4 /*yield*/, this.storage.setItem(newKey, item)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, this.storage.removeItem(oldKey)];
                    case 6:
                        _c.sent();
                        ulid = newUlid;
                        return [3 /*break*/, 8];
                    case 7:
                        ulid = ulidOrId;
                        _c.label = 8;
                    case 8:
                        this.getCollectionIndex(storeName).set(id, ulid);
                        return [3 /*break*/, 10];
                    case 9:
                        if (recordType === COLLECTION) {
                            keysForCollectionEntries.push(key);
                        }
                        _c.label = 10;
                    case 10:
                        allKeys_1_1 = allKeys_1.next();
                        return [3 /*break*/, 3];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (allKeys_1_1 && !allKeys_1_1.done && (_b = allKeys_1.return)) _b.call(allKeys_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 14:
                        if (!(keysForCollectionEntries.length > 0)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.storage.multiRemove(keysForCollectionEntries)];
                    case 15:
                        _c.sent();
                        _c.label = 16;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    AsyncStorageDatabase.prototype.save = function (item, storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var ulid, itemKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ulid = this.getCollectionIndex(storeName).get(item.id) ||
                            this.getMonotonicFactory(storeName)();
                        itemKey = this.getKeyForItem(storeName, item.id, ulid);
                        this.getCollectionIndex(storeName).set(item.id, ulid);
                        return [4 /*yield*/, this.storage.setItem(itemKey, JSON.stringify(item))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsyncStorageDatabase.prototype.batchSave = function (storeName, items) {
        return __awaiter(this, void 0, void 0, function () {
            var result, collection, keysToDelete, keysToSave, allItemsKeys, itemsMap, items_1, items_1_1, item, id, _deleted, ulid, key, existingRecordsMap, existingRecordsKeys, allItemsKeys_1, allItemsKeys_1_1, key;
            var e_2, _a, e_3, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (items.length === 0) {
                            return [2 /*return*/, []];
                        }
                        result = [];
                        collection = this.getCollectionIndex(storeName);
                        keysToDelete = new Set();
                        keysToSave = new Set();
                        allItemsKeys = [];
                        itemsMap = {};
                        try {
                            for (items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                                item = items_1_1.value;
                                id = item.id, _deleted = item._deleted;
                                ulid = collection.get(id) || this.getMonotonicFactory(storeName)();
                                key = this.getKeyForItem(storeName, id, ulid);
                                allItemsKeys.push(key);
                                itemsMap[key] = { ulid: ulid, model: item };
                                if (_deleted) {
                                    keysToDelete.add(key);
                                }
                                else {
                                    keysToSave.add(key);
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [4 /*yield*/, this.storage.multiGet(allItemsKeys)];
                    case 1:
                        existingRecordsMap = _c.sent();
                        existingRecordsKeys = existingRecordsMap
                            .filter(function (_a) {
                            var _b = __read(_a, 2), v = _b[1];
                            return !!v;
                        })
                            .reduce(function (set, _a) {
                            var _b = __read(_a, 1), k = _b[0];
                            return set.add(k);
                        }, new Set());
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (keysToDelete.size === 0) {
                                    resolve();
                                    return;
                                }
                                var keysToDeleteArray = Array.from(keysToDelete);
                                keysToDeleteArray.forEach(function (key) {
                                    return collection.delete(itemsMap[key].model.id);
                                });
                                _this.storage.multiRemove(keysToDeleteArray, function (errors) {
                                    if (errors && errors.length > 0) {
                                        reject(errors);
                                    }
                                    else {
                                        resolve();
                                    }
                                });
                            })];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (keysToSave.size === 0) {
                                    resolve();
                                    return;
                                }
                                var entriesToSet = Array.from(keysToSave).map(function (key) { return [
                                    key,
                                    JSON.stringify(itemsMap[key].model),
                                ]; });
                                keysToSave.forEach(function (key) {
                                    var _a = itemsMap[key], id = _a.model.id, ulid = _a.ulid;
                                    collection.set(id, ulid);
                                });
                                _this.storage.multiSet(entriesToSet, function (errors) {
                                    if (errors && errors.length > 0) {
                                        reject(errors);
                                    }
                                    else {
                                        resolve();
                                    }
                                });
                            })];
                    case 3:
                        _c.sent();
                        try {
                            for (allItemsKeys_1 = __values(allItemsKeys), allItemsKeys_1_1 = allItemsKeys_1.next(); !allItemsKeys_1_1.done; allItemsKeys_1_1 = allItemsKeys_1.next()) {
                                key = allItemsKeys_1_1.value;
                                if (keysToDelete.has(key) && existingRecordsKeys.has(key)) {
                                    result.push([itemsMap[key].model, OpType.DELETE]);
                                }
                                else if (keysToSave.has(key)) {
                                    result.push([
                                        itemsMap[key].model,
                                        existingRecordsKeys.has(key) ? OpType.UPDATE : OpType.INSERT,
                                    ]);
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (allItemsKeys_1_1 && !allItemsKeys_1_1.done && (_b = allItemsKeys_1.return)) _b.call(allItemsKeys_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AsyncStorageDatabase.prototype.get = function (id, storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var ulid, itemKey, recordAsString, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ulid = this.getCollectionIndex(storeName).get(id);
                        itemKey = this.getKeyForItem(storeName, id, ulid);
                        return [4 /*yield*/, this.storage.getItem(itemKey)];
                    case 1:
                        recordAsString = _a.sent();
                        record = recordAsString && JSON.parse(recordAsString);
                        return [2 /*return*/, record];
                }
            });
        });
    };
    AsyncStorageDatabase.prototype.getOne = function (firstOrLast, storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, _a, itemId, ulid, itemKey, itemString, _b, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        collection = this.getCollectionIndex(storeName);
                        _a = __read(firstOrLast === QueryOne.FIRST
                            ? (function () {
                                var e_4, _a, _b;
                                var id, ulid;
                                try {
                                    for (var collection_1 = __values(collection), collection_1_1 = collection_1.next(); !collection_1_1.done; collection_1_1 = collection_1.next()) {
                                        _b = __read(collection_1_1.value, 2), id = _b[0], ulid = _b[1];
                                        break;
                                    } // Get first element of the set
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (collection_1_1 && !collection_1_1.done && (_a = collection_1.return)) _a.call(collection_1);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                                return [id, ulid];
                            })()
                            : (function () {
                                var e_5, _a, _b;
                                var id, ulid;
                                try {
                                    for (var collection_2 = __values(collection), collection_2_1 = collection_2.next(); !collection_2_1.done; collection_2_1 = collection_2.next()) {
                                        _b = __read(collection_2_1.value, 2), id = _b[0], ulid = _b[1];
                                        ;
                                    } // Get last element of the set
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (collection_2_1 && !collection_2_1.done && (_a = collection_2.return)) _a.call(collection_2);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                                return [id, ulid];
                            })(), 2), itemId = _a[0], ulid = _a[1];
                        itemKey = this.getKeyForItem(storeName, itemId, ulid);
                        _b = itemKey;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storage.getItem(itemKey)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        itemString = _b;
                        result = itemString ? JSON.parse(itemString) || undefined : undefined;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * This function gets all the records stored in async storage for a particular storeName
     * It then loads all the records for that filtered set of keys using multiGet()
     */
    AsyncStorageDatabase.prototype.getAll = function (storeName, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, _a, _b, page, _c, limit, start, end, keysForStore, count, collection_3, collection_3_1, _d, id, ulid, storeRecordStrings, records;
            var e_6, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        collection = this.getCollectionIndex(storeName);
                        _a = pagination || {}, _b = _a.page, page = _b === void 0 ? 0 : _b, _c = _a.limit, limit = _c === void 0 ? 0 : _c;
                        start = Math.max(0, page * limit) || 0;
                        end = limit > 0 ? start + limit : undefined;
                        keysForStore = [];
                        count = 0;
                        try {
                            for (collection_3 = __values(collection), collection_3_1 = collection_3.next(); !collection_3_1.done; collection_3_1 = collection_3.next()) {
                                _d = __read(collection_3_1.value, 2), id = _d[0], ulid = _d[1];
                                count++;
                                if (count <= start) {
                                    continue;
                                }
                                keysForStore.push(this.getKeyForItem(storeName, id, ulid));
                                if (count === end) {
                                    break;
                                }
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (collection_3_1 && !collection_3_1.done && (_e = collection_3.return)) _e.call(collection_3);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        return [4 /*yield*/, this.storage.multiGet(keysForStore)];
                    case 1:
                        storeRecordStrings = _f.sent();
                        records = storeRecordStrings
                            .filter(function (_a) {
                            var _b = __read(_a, 2), value = _b[1];
                            return value;
                        })
                            .map(function (_a) {
                            var _b = __read(_a, 2), value = _b[1];
                            return JSON.parse(value);
                        });
                        return [2 /*return*/, records];
                }
            });
        });
    };
    AsyncStorageDatabase.prototype.delete = function (id, storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var ulid, itemKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ulid = this.getCollectionIndex(storeName).get(id);
                        itemKey = this.getKeyForItem(storeName, id, ulid);
                        this.getCollectionIndex(storeName).delete(id);
                        return [4 /*yield*/, this.storage.removeItem(itemKey)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clear the AsyncStorage of all DataStore entries
     */
    AsyncStorageDatabase.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allKeys, allDataStoreKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.getAllKeys()];
                    case 1:
                        allKeys = _a.sent();
                        allDataStoreKeys = allKeys.filter(function (key) { return key.startsWith(DB_NAME); });
                        return [4 /*yield*/, this.storage.multiRemove(allDataStoreKeys)];
                    case 2:
                        _a.sent();
                        this._collectionInMemoryIndex.clear();
                        return [2 /*return*/];
                }
            });
        });
    };
    AsyncStorageDatabase.prototype.getKeyForItem = function (storeName, id, ulid) {
        return this.getKeyPrefixForStoreItems(storeName) + "::" + ulid + "::" + id;
    };
    AsyncStorageDatabase.prototype.getLegacyKeyForItem = function (storeName, id) {
        return this.getKeyPrefixForStoreItems(storeName) + "::" + id;
    };
    AsyncStorageDatabase.prototype.getKeyPrefixForStoreItems = function (storeName) {
        return DB_NAME + "::" + storeName + "::" + DATA;
    };
    return AsyncStorageDatabase;
}());
export default AsyncStorageDatabase;
//# sourceMappingURL=AsyncStorageDatabase.js.map