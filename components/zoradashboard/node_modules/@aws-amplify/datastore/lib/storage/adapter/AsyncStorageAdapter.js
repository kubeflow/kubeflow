"use strict";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var AsyncStorageDatabase_1 = __importDefault(require("./AsyncStorageDatabase"));
var predicates_1 = require("../../predicates");
var types_1 = require("../../types");
var util_1 = require("../../util");
var logger = new core_1.ConsoleLogger('DataStore');
var AsyncStorageAdapter = /** @class */ (function () {
    function AsyncStorageAdapter() {
    }
    AsyncStorageAdapter.prototype.getStorenameForModel = function (modelConstructor) {
        var namespace = this.namespaceResolver(modelConstructor);
        var modelName = modelConstructor.name;
        return this.getStorename(namespace, modelName);
    };
    AsyncStorageAdapter.prototype.getStorename = function (namespace, modelName) {
        var storeName = namespace + "_" + modelName;
        return storeName;
    };
    AsyncStorageAdapter.prototype.setUp = function (theSchema, namespaceResolver, modelInstanceCreator, getModelConstructorByModelName) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initPromise) return [3 /*break*/, 1];
                        this.initPromise = new Promise(function (res, rej) {
                            _this.resolve = res;
                            _this.reject = rej;
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.initPromise];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        this.schema = theSchema;
                        this.namespaceResolver = namespaceResolver;
                        this.modelInstanceCreator = modelInstanceCreator;
                        this.getModelConstructorByModelName = getModelConstructorByModelName;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        if (!!this.db) return [3 /*break*/, 6];
                        this.db = new AsyncStorageDatabase_1.default();
                        return [4 /*yield*/, this.db.init()];
                    case 5:
                        _a.sent();
                        this.resolve();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        this.reject(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.save = function (model, condition) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var modelConstructor, storeName, connectedModels, namespaceName, set, connectionStoreNames, fromDB, predicates, predicateObjs, type, isValid, msg, result, connectionStoreNames_1, connectionStoreNames_1_1, resItem, storeName_1, item, instance, id, fromDB_1, opType, e_1_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        modelConstructor = Object.getPrototypeOf(model)
                            .constructor;
                        storeName = this.getStorenameForModel(modelConstructor);
                        connectedModels = util_1.traverseModel(modelConstructor.name, model, this.schema.namespaces[this.namespaceResolver(modelConstructor)], this.modelInstanceCreator, this.getModelConstructorByModelName);
                        namespaceName = this.namespaceResolver(modelConstructor);
                        set = new Set();
                        connectionStoreNames = Object.values(connectedModels).map(function (_a) {
                            var modelName = _a.modelName, item = _a.item, instance = _a.instance;
                            var storeName = _this.getStorename(namespaceName, modelName);
                            set.add(storeName);
                            return { storeName: storeName, item: item, instance: instance };
                        });
                        return [4 /*yield*/, this.db.get(model.id, storeName)];
                    case 1:
                        fromDB = _b.sent();
                        if (condition && fromDB) {
                            predicates = predicates_1.ModelPredicateCreator.getPredicates(condition);
                            predicateObjs = predicates.predicates, type = predicates.type;
                            isValid = util_1.validatePredicate(fromDB, type, predicateObjs);
                            if (!isValid) {
                                msg = 'Conditional update failed';
                                logger.error(msg, { model: fromDB, condition: predicateObjs });
                                throw new Error(msg);
                            }
                        }
                        result = [];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 9, 10, 15]);
                        connectionStoreNames_1 = __asyncValues(connectionStoreNames);
                        _b.label = 3;
                    case 3: return [4 /*yield*/, connectionStoreNames_1.next()];
                    case 4:
                        if (!(connectionStoreNames_1_1 = _b.sent(), !connectionStoreNames_1_1.done)) return [3 /*break*/, 8];
                        resItem = connectionStoreNames_1_1.value;
                        storeName_1 = resItem.storeName, item = resItem.item, instance = resItem.instance;
                        id = item.id;
                        return [4 /*yield*/, this.db.get(id, storeName_1)];
                    case 5:
                        fromDB_1 = _b.sent();
                        opType = fromDB_1 ? types_1.OpType.UPDATE : types_1.OpType.INSERT;
                        if (!(id === model.id || opType === types_1.OpType.INSERT)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.db.save(item, storeName_1)];
                    case 6:
                        _b.sent();
                        result.push([instance, opType]);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _b.trys.push([10, , 13, 14]);
                        if (!(connectionStoreNames_1_1 && !connectionStoreNames_1_1.done && (_a = connectionStoreNames_1.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(connectionStoreNames_1)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/, result];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.load = function (namespaceName, srcModelName, records) {
        var records_1, records_1_1, records_2, records_2_1;
        var e_2, _a, e_3, _b, e_4, _c;
        return __awaiter(this, void 0, void 0, function () {
            var namespace, relations, connectionStoreNames, modelConstructor, relations_1, relations_1_1, relation, fieldName, modelName, targetName, relationType, storeName, modelConstructor_1, _d, recordItem, connectionRecord, e_3_1, recordItem, connectionRecord, e_4_1, e_2_1;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        namespace = this.schema.namespaces[namespaceName];
                        relations = namespace.relationships[srcModelName].relationTypes;
                        connectionStoreNames = relations.map(function (_a) {
                            var modelName = _a.modelName;
                            return _this.getStorename(namespaceName, modelName);
                        });
                        modelConstructor = this.getModelConstructorByModelName(namespaceName, srcModelName);
                        if (connectionStoreNames.length === 0) {
                            return [2 /*return*/, records.map(function (record) {
                                    return _this.modelInstanceCreator(modelConstructor, record);
                                })];
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 34, 35, 40]);
                        relations_1 = __asyncValues(relations);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, relations_1.next()];
                    case 3:
                        if (!(relations_1_1 = _e.sent(), !relations_1_1.done)) return [3 /*break*/, 33];
                        relation = relations_1_1.value;
                        fieldName = relation.fieldName, modelName = relation.modelName, targetName = relation.targetName, relationType = relation.relationType;
                        storeName = this.getStorename(namespaceName, modelName);
                        modelConstructor_1 = this.getModelConstructorByModelName(namespaceName, modelName);
                        _d = relationType;
                        switch (_d) {
                            case 'HAS_ONE': return [3 /*break*/, 4];
                            case 'BELONGS_TO': return [3 /*break*/, 17];
                            case 'HAS_MANY': return [3 /*break*/, 30];
                        }
                        return [3 /*break*/, 31];
                    case 4:
                        _e.trys.push([4, 10, 11, 16]);
                        records_1 = __asyncValues(records);
                        _e.label = 5;
                    case 5: return [4 /*yield*/, records_1.next()];
                    case 6:
                        if (!(records_1_1 = _e.sent(), !records_1_1.done)) return [3 /*break*/, 9];
                        recordItem = records_1_1.value;
                        if (!recordItem[fieldName]) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.db.get(recordItem[fieldName], storeName)];
                    case 7:
                        connectionRecord = _e.sent();
                        recordItem[fieldName] =
                            connectionRecord &&
                                this.modelInstanceCreator(modelConstructor_1, connectionRecord);
                        _e.label = 8;
                    case 8: return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _e.trys.push([11, , 14, 15]);
                        if (!(records_1_1 && !records_1_1.done && (_b = records_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(records_1)];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [3 /*break*/, 32];
                    case 17:
                        _e.trys.push([17, 23, 24, 29]);
                        records_2 = __asyncValues(records);
                        _e.label = 18;
                    case 18: return [4 /*yield*/, records_2.next()];
                    case 19:
                        if (!(records_2_1 = _e.sent(), !records_2_1.done)) return [3 /*break*/, 22];
                        recordItem = records_2_1.value;
                        if (!recordItem[targetName]) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.db.get(recordItem[targetName], storeName)];
                    case 20:
                        connectionRecord = _e.sent();
                        recordItem[fieldName] =
                            connectionRecord &&
                                this.modelInstanceCreator(modelConstructor_1, connectionRecord);
                        delete recordItem[targetName];
                        _e.label = 21;
                    case 21: return [3 /*break*/, 18];
                    case 22: return [3 /*break*/, 29];
                    case 23:
                        e_4_1 = _e.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 29];
                    case 24:
                        _e.trys.push([24, , 27, 28]);
                        if (!(records_2_1 && !records_2_1.done && (_c = records_2.return))) return [3 /*break*/, 26];
                        return [4 /*yield*/, _c.call(records_2)];
                    case 25:
                        _e.sent();
                        _e.label = 26;
                    case 26: return [3 /*break*/, 28];
                    case 27:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 28: return [7 /*endfinally*/];
                    case 29: return [3 /*break*/, 32];
                    case 30: 
                    // TODO: Lazy loading
                    return [3 /*break*/, 32];
                    case 31:
                        util_1.exhaustiveCheck(relationType);
                        return [3 /*break*/, 32];
                    case 32: return [3 /*break*/, 2];
                    case 33: return [3 /*break*/, 40];
                    case 34:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 40];
                    case 35:
                        _e.trys.push([35, , 38, 39]);
                        if (!(relations_1_1 && !relations_1_1.done && (_a = relations_1.return))) return [3 /*break*/, 37];
                        return [4 /*yield*/, _a.call(relations_1)];
                    case 36:
                        _e.sent();
                        _e.label = 37;
                    case 37: return [3 /*break*/, 39];
                    case 38:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 39: return [7 /*endfinally*/];
                    case 40: return [2 /*return*/, records.map(function (record) {
                            return _this.modelInstanceCreator(modelConstructor, record);
                        })];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.query = function (modelConstructor, predicate, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var storeName, namespaceName, predicates, queryById, hasSort, hasPagination, records;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeName = this.getStorenameForModel(modelConstructor);
                        namespaceName = this.namespaceResolver(modelConstructor);
                        predicates = predicate && predicates_1.ModelPredicateCreator.getPredicates(predicate);
                        queryById = predicates && this.idFromPredicate(predicates);
                        hasSort = pagination && pagination.sort;
                        hasPagination = pagination && pagination.limit;
                        return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                var record, filtered, all;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!queryById) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.getById(storeName, queryById)];
                                        case 1:
                                            record = _a.sent();
                                            return [2 /*return*/, record ? [record] : []];
                                        case 2:
                                            if (!predicates) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.filterOnPredicate(storeName, predicates)];
                                        case 3:
                                            filtered = _a.sent();
                                            return [2 /*return*/, this.inMemoryPagination(filtered, pagination)];
                                        case 4:
                                            if (!(hasSort || hasPagination)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, this.getAll(storeName)];
                                        case 5:
                                            all = _a.sent();
                                            return [2 /*return*/, this.inMemoryPagination(all, pagination)];
                                        case 6: return [2 /*return*/, this.getAll(storeName)];
                                    }
                                });
                            }); })()];
                    case 1:
                        records = _a.sent();
                        return [4 /*yield*/, this.load(namespaceName, modelConstructor.name, records)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.getById = function (storeName, id) {
        return __awaiter(this, void 0, void 0, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.get(id, storeName)];
                    case 1:
                        record = _a.sent();
                        return [2 /*return*/, record];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.getAll = function (storeName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.getAll(storeName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.idFromPredicate = function (predicates) {
        var predicateObjs = predicates.predicates;
        var idPredicate = predicateObjs.length === 1 &&
            predicateObjs.find(function (p) { return types_1.isPredicateObj(p) && p.field === 'id' && p.operator === 'eq'; });
        return idPredicate && idPredicate.operand;
    };
    AsyncStorageAdapter.prototype.filterOnPredicate = function (storeName, predicates) {
        return __awaiter(this, void 0, void 0, function () {
            var predicateObjs, type, all, filtered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        predicateObjs = predicates.predicates, type = predicates.type;
                        return [4 /*yield*/, this.getAll(storeName)];
                    case 1:
                        all = _a.sent();
                        filtered = predicateObjs
                            ? all.filter(function (m) { return util_1.validatePredicate(m, type, predicateObjs); })
                            : all;
                        return [2 /*return*/, filtered];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.inMemoryPagination = function (records, pagination) {
        if (pagination && records.length > 1) {
            if (pagination.sort) {
                var sortPredicates = predicates_1.ModelSortPredicateCreator.getPredicates(pagination.sort);
                if (sortPredicates.length) {
                    var compareFn = util_1.sortCompareFunction(sortPredicates);
                    records.sort(compareFn);
                }
            }
            var _a = pagination.page, page = _a === void 0 ? 0 : _a, _b = pagination.limit, limit = _b === void 0 ? 0 : _b;
            var start = Math.max(0, page * limit) || 0;
            var end = limit > 0 ? start + limit : records.length;
            return records.slice(start, end);
        }
        return records;
    };
    AsyncStorageAdapter.prototype.queryOne = function (modelConstructor, firstOrLast) {
        if (firstOrLast === void 0) { firstOrLast = types_1.QueryOne.FIRST; }
        return __awaiter(this, void 0, void 0, function () {
            var storeName, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeName = this.getStorenameForModel(modelConstructor);
                        return [4 /*yield*/, this.db.getOne(firstOrLast, storeName)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result && this.modelInstanceCreator(modelConstructor, result)];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.delete = function (modelOrModelConstructor, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteQueue, modelConstructor, nameSpace, models, relations, deletedModels, deletedModels, model, modelConstructor, nameSpace, storeName, fromDB, msg, predicates, predicateObjs, type, isValid, msg, relations, relations, deletedModels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteQueue = [];
                        if (!util_1.isModelConstructor(modelOrModelConstructor)) return [3 /*break*/, 8];
                        modelConstructor = modelOrModelConstructor;
                        nameSpace = this.namespaceResolver(modelConstructor);
                        return [4 /*yield*/, this.query(modelConstructor, condition)];
                    case 1:
                        models = _a.sent();
                        relations = this.schema.namespaces[nameSpace].relationships[modelConstructor.name].relationTypes;
                        if (!(condition !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.deleteTraverse(relations, models, modelConstructor.name, nameSpace, deleteQueue)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.deleteItem(deleteQueue)];
                    case 3:
                        _a.sent();
                        deletedModels = deleteQueue.reduce(function (acc, _a) {
                            var items = _a.items;
                            return acc.concat(items);
                        }, []);
                        return [2 /*return*/, [models, deletedModels]];
                    case 4: return [4 /*yield*/, this.deleteTraverse(relations, models, modelConstructor.name, nameSpace, deleteQueue)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.deleteItem(deleteQueue)];
                    case 6:
                        _a.sent();
                        deletedModels = deleteQueue.reduce(function (acc, _a) {
                            var items = _a.items;
                            return acc.concat(items);
                        }, []);
                        return [2 /*return*/, [models, deletedModels]];
                    case 7: return [3 /*break*/, 15];
                    case 8:
                        model = modelOrModelConstructor;
                        modelConstructor = Object.getPrototypeOf(model)
                            .constructor;
                        nameSpace = this.namespaceResolver(modelConstructor);
                        storeName = this.getStorenameForModel(modelConstructor);
                        if (!condition) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.db.get(model.id, storeName)];
                    case 9:
                        fromDB = _a.sent();
                        if (fromDB === undefined) {
                            msg = 'Model instance not found in storage';
                            logger.warn(msg, { model: model });
                            return [2 /*return*/, [[model], []]];
                        }
                        predicates = predicates_1.ModelPredicateCreator.getPredicates(condition);
                        predicateObjs = predicates.predicates, type = predicates.type;
                        isValid = util_1.validatePredicate(fromDB, type, predicateObjs);
                        if (!isValid) {
                            msg = 'Conditional update failed';
                            logger.error(msg, { model: fromDB, condition: predicateObjs });
                            throw new Error(msg);
                        }
                        relations = this.schema.namespaces[nameSpace].relationships[modelConstructor.name].relationTypes;
                        return [4 /*yield*/, this.deleteTraverse(relations, [model], modelConstructor.name, nameSpace, deleteQueue)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 11:
                        relations = this.schema.namespaces[nameSpace].relationships[modelConstructor.name].relationTypes;
                        return [4 /*yield*/, this.deleteTraverse(relations, [model], modelConstructor.name, nameSpace, deleteQueue)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13: return [4 /*yield*/, this.deleteItem(deleteQueue)];
                    case 14:
                        _a.sent();
                        deletedModels = deleteQueue.reduce(function (acc, _a) {
                            var items = _a.items;
                            return acc.concat(items);
                        }, []);
                        return [2 /*return*/, [[model], deletedModels]];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.deleteItem = function (deleteQueue) {
        var deleteQueue_1, deleteQueue_1_1;
        var e_5, _a, e_6, _b;
        return __awaiter(this, void 0, void 0, function () {
            var deleteItem, storeName, items, items_1, items_1_1, item, id, e_6_1, e_5_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 17, 18, 23]);
                        deleteQueue_1 = __asyncValues(deleteQueue);
                        _c.label = 1;
                    case 1: return [4 /*yield*/, deleteQueue_1.next()];
                    case 2:
                        if (!(deleteQueue_1_1 = _c.sent(), !deleteQueue_1_1.done)) return [3 /*break*/, 16];
                        deleteItem = deleteQueue_1_1.value;
                        storeName = deleteItem.storeName, items = deleteItem.items;
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 9, 10, 15]);
                        items_1 = __asyncValues(items);
                        _c.label = 4;
                    case 4: return [4 /*yield*/, items_1.next()];
                    case 5:
                        if (!(items_1_1 = _c.sent(), !items_1_1.done)) return [3 /*break*/, 8];
                        item = items_1_1.value;
                        if (!item) return [3 /*break*/, 7];
                        if (!(typeof item === 'object')) return [3 /*break*/, 7];
                        id = item['id'];
                        return [4 /*yield*/, this.db.delete(id, storeName)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_6_1 = _c.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _c.trys.push([10, , 13, 14]);
                        if (!(items_1_1 && !items_1_1.done && (_b = items_1.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _b.call(items_1)];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [3 /*break*/, 1];
                    case 16: return [3 /*break*/, 23];
                    case 17:
                        e_5_1 = _c.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 23];
                    case 18:
                        _c.trys.push([18, , 21, 22]);
                        if (!(deleteQueue_1_1 && !deleteQueue_1_1.done && (_a = deleteQueue_1.return))) return [3 /*break*/, 20];
                        return [4 /*yield*/, _a.call(deleteQueue_1)];
                    case 19:
                        _c.sent();
                        _c.label = 20;
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 22: return [7 /*endfinally*/];
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Populates the delete Queue with all the items to delete
     * @param relations
     * @param models
     * @param srcModel
     * @param nameSpace
     * @param deleteQueue
     */
    AsyncStorageAdapter.prototype.deleteTraverse = function (relations, models, srcModel, nameSpace, deleteQueue) {
        var relations_2, relations_2_1, models_1, models_1_1, models_2, models_2_1;
        var e_7, _a, e_8, _b, e_9, _c;
        return __awaiter(this, void 0, void 0, function () {
            var rel, relationType, modelName, targetName, storeName, index, _d, model, hasOneIndex, hasOneCustomField, value, allRecords, recordToDelete, e_8_1, model, allRecords, childrenArray, e_9_1, e_7_1;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 35, 36, 41]);
                        relations_2 = __asyncValues(relations);
                        _e.label = 1;
                    case 1: return [4 /*yield*/, relations_2.next()];
                    case 2:
                        if (!(relations_2_1 = _e.sent(), !relations_2_1.done)) return [3 /*break*/, 34];
                        rel = relations_2_1.value;
                        relationType = rel.relationType, modelName = rel.modelName, targetName = rel.targetName;
                        storeName = this.getStorename(nameSpace, modelName);
                        index = util_1.getIndex(this.schema.namespaces[nameSpace].relationships[modelName]
                            .relationTypes, srcModel) ||
                            // if we were unable to find an index via relationTypes
                            // i.e. for keyName connections, attempt to find one by the
                            // associatedWith property
                            util_1.getIndexFromAssociation(this.schema.namespaces[nameSpace].relationships[modelName].indexes, rel.associatedWith);
                        _d = relationType;
                        switch (_d) {
                            case 'HAS_ONE': return [3 /*break*/, 3];
                            case 'HAS_MANY': return [3 /*break*/, 17];
                            case 'BELONGS_TO': return [3 /*break*/, 31];
                        }
                        return [3 /*break*/, 32];
                    case 3:
                        _e.trys.push([3, 10, 11, 16]);
                        models_1 = __asyncValues(models);
                        _e.label = 4;
                    case 4: return [4 /*yield*/, models_1.next()];
                    case 5:
                        if (!(models_1_1 = _e.sent(), !models_1_1.done)) return [3 /*break*/, 9];
                        model = models_1_1.value;
                        hasOneIndex = index || 'byId';
                        hasOneCustomField = targetName in model;
                        value = hasOneCustomField ? model[targetName] : model.id;
                        return [4 /*yield*/, this.db.getAll(storeName)];
                    case 6:
                        allRecords = _e.sent();
                        recordToDelete = allRecords.filter(function (childItem) { return childItem[hasOneIndex] === value; });
                        return [4 /*yield*/, this.deleteTraverse(this.schema.namespaces[nameSpace].relationships[modelName]
                                .relationTypes, recordToDelete, modelName, nameSpace, deleteQueue)];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8: return [3 /*break*/, 4];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_8_1 = _e.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _e.trys.push([11, , 14, 15]);
                        if (!(models_1_1 && !models_1_1.done && (_b = models_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(models_1)];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_8) throw e_8.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [3 /*break*/, 33];
                    case 17:
                        _e.trys.push([17, 24, 25, 30]);
                        models_2 = __asyncValues(models);
                        _e.label = 18;
                    case 18: return [4 /*yield*/, models_2.next()];
                    case 19:
                        if (!(models_2_1 = _e.sent(), !models_2_1.done)) return [3 /*break*/, 23];
                        model = models_2_1.value;
                        return [4 /*yield*/, this.db.getAll(storeName)];
                    case 20:
                        allRecords = _e.sent();
                        childrenArray = allRecords.filter(function (childItem) { return childItem[index] === model.id; });
                        return [4 /*yield*/, this.deleteTraverse(this.schema.namespaces[nameSpace].relationships[modelName]
                                .relationTypes, childrenArray, modelName, nameSpace, deleteQueue)];
                    case 21:
                        _e.sent();
                        _e.label = 22;
                    case 22: return [3 /*break*/, 18];
                    case 23: return [3 /*break*/, 30];
                    case 24:
                        e_9_1 = _e.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 30];
                    case 25:
                        _e.trys.push([25, , 28, 29]);
                        if (!(models_2_1 && !models_2_1.done && (_c = models_2.return))) return [3 /*break*/, 27];
                        return [4 /*yield*/, _c.call(models_2)];
                    case 26:
                        _e.sent();
                        _e.label = 27;
                    case 27: return [3 /*break*/, 29];
                    case 28:
                        if (e_9) throw e_9.error;
                        return [7 /*endfinally*/];
                    case 29: return [7 /*endfinally*/];
                    case 30: return [3 /*break*/, 33];
                    case 31: 
                    // Intentionally blank
                    return [3 /*break*/, 33];
                    case 32:
                        util_1.exhaustiveCheck(relationType);
                        return [3 /*break*/, 33];
                    case 33: return [3 /*break*/, 1];
                    case 34: return [3 /*break*/, 41];
                    case 35:
                        e_7_1 = _e.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 41];
                    case 36:
                        _e.trys.push([36, , 39, 40]);
                        if (!(relations_2_1 && !relations_2_1.done && (_a = relations_2.return))) return [3 /*break*/, 38];
                        return [4 /*yield*/, _a.call(relations_2)];
                    case 37:
                        _e.sent();
                        _e.label = 38;
                    case 38: return [3 /*break*/, 40];
                    case 39:
                        if (e_7) throw e_7.error;
                        return [7 /*endfinally*/];
                    case 40: return [7 /*endfinally*/];
                    case 41:
                        deleteQueue.push({
                            storeName: this.getStorename(nameSpace, srcModel),
                            items: models.map(function (record) {
                                return _this.modelInstanceCreator(_this.getModelConstructorByModelName(nameSpace, srcModel), record);
                            }),
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.clear()];
                    case 1:
                        _a.sent();
                        this.db = undefined;
                        this.initPromise = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    AsyncStorageAdapter.prototype.batchSave = function (modelConstructor, items) {
        return __awaiter(this, void 0, void 0, function () {
            var modelName, namespaceName, storeName, batch, _loop_1, this_1, items_2, items_2_1, item;
            var e_10, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        modelName = modelConstructor.name;
                        namespaceName = this.namespaceResolver(modelConstructor);
                        storeName = this.getStorename(namespaceName, modelName);
                        batch = [];
                        _loop_1 = function (item) {
                            var id = item.id;
                            var connectedModels = util_1.traverseModel(modelConstructor.name, this_1.modelInstanceCreator(modelConstructor, item), this_1.schema.namespaces[this_1.namespaceResolver(modelConstructor)], this_1.modelInstanceCreator, this_1.getModelConstructorByModelName);
                            var instance = connectedModels.find(function (_a) {
                                var instance = _a.instance;
                                return instance.id === id;
                            }).instance;
                            batch.push(instance);
                        };
                        this_1 = this;
                        try {
                            for (items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                                item = items_2_1.value;
                                _loop_1(item);
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        return [4 /*yield*/, this.db.batchSave(storeName, batch)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return AsyncStorageAdapter;
}());
exports.AsyncStorageAdapter = AsyncStorageAdapter;
exports.default = new AsyncStorageAdapter();
//# sourceMappingURL=AsyncStorageAdapter.js.map