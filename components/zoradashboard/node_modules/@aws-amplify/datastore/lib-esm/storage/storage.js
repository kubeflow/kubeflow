var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
import { Logger, Mutex } from '@aws-amplify/core';
import PushStream from 'zen-push';
import { ModelPredicateCreator } from '../predicates';
import { OpType, QueryOne, isTargetNameAssociation, } from '../types';
import { isModelConstructor, STORAGE, validatePredicate, valuesEqual, } from '../util';
import getDefaultAdapter from './adapter/getDefaultAdapter';
var logger = new Logger('DataStore');
var StorageClass = /** @class */ (function () {
    function StorageClass(schema, namespaceResolver, getModelConstructorByModelName, modelInstanceCreator, adapter, sessionId) {
        this.schema = schema;
        this.namespaceResolver = namespaceResolver;
        this.getModelConstructorByModelName = getModelConstructorByModelName;
        this.modelInstanceCreator = modelInstanceCreator;
        this.adapter = adapter;
        this.sessionId = sessionId;
        this.adapter = getDefaultAdapter();
        this.pushStream = new PushStream();
    }
    StorageClass.getNamespace = function () {
        var namespace = {
            name: STORAGE,
            relationships: {},
            enums: {},
            models: {},
            nonModels: {},
        };
        return namespace;
    };
    StorageClass.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resolve, reject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.initialized !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialized];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        logger.debug('Starting Storage');
                        this.initialized = new Promise(function (res, rej) {
                            resolve = res;
                            reject = rej;
                        });
                        this.adapter
                            .setUp(this.schema, this.namespaceResolver, this.modelInstanceCreator, this.getModelConstructorByModelName, this.sessionId)
                            .then(resolve, reject);
                        return [4 /*yield*/, this.initialized];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StorageClass.prototype.save = function (model, condition, mutator, patchesTuple) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.adapter.save(model, condition)];
                    case 2:
                        result = _a.sent();
                        result.forEach(function (r) {
                            var _a = __read(r, 2), originalElement = _a[0], opType = _a[1];
                            // truthy when save is called by the Merger
                            var syncResponse = !!mutator;
                            var updateMutationInput;
                            // don't attempt to calc mutation input when storage.save
                            // is called by Merger, i.e., when processing an AppSync response
                            if (opType === OpType.UPDATE && !syncResponse) {
                                updateMutationInput = _this.getUpdateMutationInput(model, originalElement, patchesTuple);
                                // // an update without changed user fields
                                // => don't create mutationEvent
                                if (updateMutationInput === null) {
                                    return result;
                                }
                            }
                            var element = updateMutationInput || originalElement;
                            var modelConstructor = Object.getPrototypeOf(originalElement).constructor;
                            _this.pushStream.next({
                                model: modelConstructor,
                                opType: opType,
                                element: element,
                                mutator: mutator,
                                condition: ModelPredicateCreator.getPredicates(condition, false),
                            });
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    StorageClass.prototype.delete = function (modelOrModelConstructor, condition, mutator) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, models, modelIds;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.adapter.delete(modelOrModelConstructor, condition)];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), models = _a[0], deleted = _a[1];
                        modelIds = new Set(models.map(function (_a) {
                            var id = _a.id;
                            return id;
                        }));
                        if (!isModelConstructor(modelOrModelConstructor) &&
                            !Array.isArray(deleted)) {
                            deleted = [deleted];
                        }
                        deleted.forEach(function (model) {
                            var modelConstructor = Object.getPrototypeOf(model)
                                .constructor;
                            var theCondition;
                            if (!isModelConstructor(modelOrModelConstructor)) {
                                theCondition = modelIds.has(model.id)
                                    ? ModelPredicateCreator.getPredicates(condition, false)
                                    : undefined;
                            }
                            _this.pushStream.next({
                                model: modelConstructor,
                                opType: OpType.DELETE,
                                element: model,
                                mutator: mutator,
                                condition: theCondition,
                            });
                        });
                        return [2 /*return*/, [models, deleted]];
                }
            });
        });
    };
    StorageClass.prototype.query = function (modelConstructor, predicate, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.adapter.query(modelConstructor, predicate, pagination)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StorageClass.prototype.queryOne = function (modelConstructor, firstOrLast) {
        if (firstOrLast === void 0) { firstOrLast = QueryOne.FIRST; }
        return __awaiter(this, void 0, void 0, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.adapter.queryOne(modelConstructor, firstOrLast)];
                    case 2:
                        record = _a.sent();
                        return [2 /*return*/, record];
                }
            });
        });
    };
    StorageClass.prototype.observe = function (modelConstructor, predicate, skipOwn) {
        var listenToAll = !modelConstructor;
        var _a = ModelPredicateCreator.getPredicates(predicate, false) || {}, predicates = _a.predicates, type = _a.type;
        var hasPredicate = !!predicates;
        var result = this.pushStream.observable
            .filter(function (_a) {
            var mutator = _a.mutator;
            return !skipOwn || mutator !== skipOwn;
        })
            .map(function (_a) {
            var _mutator = _a.mutator, message = __rest(_a, ["mutator"]);
            return message;
        });
        if (!listenToAll) {
            result = result.filter(function (_a) {
                var model = _a.model, element = _a.element;
                if (modelConstructor !== model) {
                    return false;
                }
                if (hasPredicate) {
                    return validatePredicate(element, type, predicates);
                }
                return true;
            });
        }
        return result;
    };
    StorageClass.prototype.clear = function (completeObservable) {
        if (completeObservable === void 0) { completeObservable = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initialized = undefined;
                        return [4 /*yield*/, this.adapter.clear()];
                    case 1:
                        _a.sent();
                        if (completeObservable) {
                            this.pushStream.complete();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StorageClass.prototype.batchSave = function (modelConstructor, items, mutator) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.adapter.batchSave(modelConstructor, items)];
                    case 2:
                        result = _a.sent();
                        result.forEach(function (_a) {
                            var _b = __read(_a, 2), element = _b[0], opType = _b[1];
                            _this.pushStream.next({
                                model: modelConstructor,
                                opType: opType,
                                element: element,
                                mutator: mutator,
                                condition: undefined,
                            });
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // returns null if no user fields were changed (determined by value comparison)
    StorageClass.prototype.getUpdateMutationInput = function (model, originalElement, patchesTuple) {
        var e_1, _a;
        var containsPatches = patchesTuple && patchesTuple.length;
        if (!containsPatches) {
            return null;
        }
        var _b = __read(patchesTuple, 2), patches = _b[0], source = _b[1];
        var updatedElement = {};
        // extract array of updated fields from patches
        var updatedFields = (patches.map(function (patch) { return patch.path && patch.path[0]; }));
        // check model def for association and replace with targetName if exists
        var modelConstructor = Object.getPrototypeOf(model)
            .constructor;
        var namespace = this.namespaceResolver(modelConstructor);
        var fields = this.schema.namespaces[namespace].models[modelConstructor.name].fields;
        var _c = this.schema.namespaces[namespace].keys[modelConstructor.name], primaryKey = _c.primaryKey, _d = _c.compositeKeys, compositeKeys = _d === void 0 ? [] : _d;
        // set original values for these fields
        updatedFields.forEach(function (field) {
            var e_2, _a, e_3, _b;
            var targetName = isTargetNameAssociation(fields[field].association);
            // if field refers to a belongsTo relation, use the target field instead
            var key = targetName || field;
            // check field values by value. Ignore unchanged fields
            if (!valuesEqual(source[key], originalElement[key])) {
                // if the field was updated to 'undefined', replace with 'null' for compatibility with JSON and GraphQL
                updatedElement[key] =
                    originalElement[key] === undefined ? null : originalElement[key];
                try {
                    for (var compositeKeys_1 = __values(compositeKeys), compositeKeys_1_1 = compositeKeys_1.next(); !compositeKeys_1_1.done; compositeKeys_1_1 = compositeKeys_1.next()) {
                        var fieldSet = compositeKeys_1_1.value;
                        // include all of the fields that comprise the composite key
                        if (fieldSet.has(key)) {
                            try {
                                for (var fieldSet_1 = (e_3 = void 0, __values(fieldSet)), fieldSet_1_1 = fieldSet_1.next(); !fieldSet_1_1.done; fieldSet_1_1 = fieldSet_1.next()) {
                                    var compositeField = fieldSet_1_1.value;
                                    updatedElement[compositeField] = originalElement[compositeField];
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (fieldSet_1_1 && !fieldSet_1_1.done && (_b = fieldSet_1.return)) _b.call(fieldSet_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (compositeKeys_1_1 && !compositeKeys_1_1.done && (_a = compositeKeys_1.return)) _a.call(compositeKeys_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        });
        // include field(s) from custom PK if one is specified for the model
        if (primaryKey && primaryKey.length) {
            try {
                for (var primaryKey_1 = __values(primaryKey), primaryKey_1_1 = primaryKey_1.next(); !primaryKey_1_1.done; primaryKey_1_1 = primaryKey_1.next()) {
                    var pkField = primaryKey_1_1.value;
                    updatedElement[pkField] = originalElement[pkField];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (primaryKey_1_1 && !primaryKey_1_1.done && (_a = primaryKey_1.return)) _a.call(primaryKey_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (Object.keys(updatedElement).length === 0) {
            return null;
        }
        var id = originalElement.id, _version = originalElement._version, _lastChangedAt = originalElement._lastChangedAt, _deleted = originalElement._deleted;
        // For update mutations we only want to send fields with changes
        // and the required internal fields
        return __assign(__assign({}, updatedElement), { id: id,
            _version: _version,
            _lastChangedAt: _lastChangedAt,
            _deleted: _deleted });
    };
    return StorageClass;
}());
var ExclusiveStorage = /** @class */ (function () {
    function ExclusiveStorage(schema, namespaceResolver, getModelConstructorByModelName, modelInstanceCreator, adapter, sessionId) {
        this.mutex = new Mutex();
        this.storage = new StorageClass(schema, namespaceResolver, getModelConstructorByModelName, modelInstanceCreator, adapter, sessionId);
    }
    ExclusiveStorage.prototype.runExclusive = function (fn) {
        return this.mutex.runExclusive(fn.bind(this, this.storage));
    };
    ExclusiveStorage.prototype.save = function (model, condition, mutator, patchesTuple) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.runExclusive(function (storage) {
                        return storage.save(model, condition, mutator, patchesTuple);
                    })];
            });
        });
    };
    ExclusiveStorage.prototype.delete = function (modelOrModelConstructor, condition, mutator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.runExclusive(function (storage) {
                        if (isModelConstructor(modelOrModelConstructor)) {
                            var modelConstructor = modelOrModelConstructor;
                            return storage.delete(modelConstructor, condition, mutator);
                        }
                        else {
                            var model = modelOrModelConstructor;
                            return storage.delete(model, condition, mutator);
                        }
                    })];
            });
        });
    };
    ExclusiveStorage.prototype.query = function (modelConstructor, predicate, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.runExclusive(function (storage) {
                        return storage.query(modelConstructor, predicate, pagination);
                    })];
            });
        });
    };
    ExclusiveStorage.prototype.queryOne = function (modelConstructor, firstOrLast) {
        if (firstOrLast === void 0) { firstOrLast = QueryOne.FIRST; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.runExclusive(function (storage) {
                        return storage.queryOne(modelConstructor, firstOrLast);
                    })];
            });
        });
    };
    ExclusiveStorage.getNamespace = function () {
        return StorageClass.getNamespace();
    };
    ExclusiveStorage.prototype.observe = function (modelConstructor, predicate, skipOwn) {
        return this.storage.observe(modelConstructor, predicate, skipOwn);
    };
    ExclusiveStorage.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExclusiveStorage.prototype.batchSave = function (modelConstructor, items) {
        return this.storage.batchSave(modelConstructor, items);
    };
    ExclusiveStorage.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.storage.init()];
            });
        });
    };
    return ExclusiveStorage;
}());
export { ExclusiveStorage };
//# sourceMappingURL=storage.js.map