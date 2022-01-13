"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var predicates_1 = require("../predicates");
var types_1 = require("../types");
var util_1 = require("../util");
var utils_1 = require("./utils");
// TODO: Persist deleted ids
var MutationEventOutbox = /** @class */ (function () {
    function MutationEventOutbox(schema, MutationEvent, modelInstanceCreator, ownSymbol) {
        this.schema = schema;
        this.MutationEvent = MutationEvent;
        this.modelInstanceCreator = modelInstanceCreator;
        this.ownSymbol = ownSymbol;
    }
    MutationEventOutbox.prototype.enqueue = function (storage, mutationEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                storage.runExclusive(function (s) { return __awaiter(_this, void 0, void 0, function () {
                    var mutationEventModelDefinition, predicate, _a, first, incomingMutationType, merged_1, incomingConditionJSON, incomingCondition, merged;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                mutationEventModelDefinition = this.schema.namespaces[util_1.SYNC].models['MutationEvent'];
                                predicate = predicates_1.ModelPredicateCreator.createFromExisting(mutationEventModelDefinition, function (c) {
                                    return c
                                        .modelId('eq', mutationEvent.modelId)
                                        .id('ne', _this.inProgressMutationEventId);
                                });
                                return [4 /*yield*/, s.query(this.MutationEvent, predicate)];
                            case 1:
                                _a = __read.apply(void 0, [_b.sent(), 1]), first = _a[0];
                                if (!(first === undefined)) return [3 /*break*/, 3];
                                return [4 /*yield*/, s.save(mutationEvent, undefined, this.ownSymbol)];
                            case 2:
                                _b.sent();
                                return [2 /*return*/];
                            case 3:
                                incomingMutationType = mutationEvent.operation;
                                if (!(first.operation === utils_1.TransformerMutationType.CREATE)) return [3 /*break*/, 8];
                                if (!(incomingMutationType === utils_1.TransformerMutationType.DELETE)) return [3 /*break*/, 5];
                                return [4 /*yield*/, s.delete(this.MutationEvent, predicate)];
                            case 4:
                                _b.sent();
                                return [3 /*break*/, 7];
                            case 5:
                                merged_1 = this.mergeUserFields(first, mutationEvent);
                                return [4 /*yield*/, s.save(this.MutationEvent.copyOf(first, function (draft) {
                                        draft.data = merged_1.data;
                                    }), undefined, this.ownSymbol)];
                            case 6:
                                _b.sent();
                                _b.label = 7;
                            case 7: return [3 /*break*/, 12];
                            case 8:
                                incomingConditionJSON = mutationEvent.condition;
                                incomingCondition = JSON.parse(incomingConditionJSON);
                                merged = void 0;
                                if (!(Object.keys(incomingCondition).length === 0)) return [3 /*break*/, 10];
                                merged = this.mergeUserFields(first, mutationEvent);
                                // delete all for model
                                return [4 /*yield*/, s.delete(this.MutationEvent, predicate)];
                            case 9:
                                // delete all for model
                                _b.sent();
                                _b.label = 10;
                            case 10:
                                merged = merged || mutationEvent;
                                // Enqueue new one
                                return [4 /*yield*/, s.save(merged, undefined, this.ownSymbol)];
                            case 11:
                                // Enqueue new one
                                _b.sent();
                                _b.label = 12;
                            case 12: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    MutationEventOutbox.prototype.dequeue = function (storage, record, recordOp) {
        return __awaiter(this, void 0, void 0, function () {
            var head;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.peek(storage)];
                    case 1:
                        head = _a.sent();
                        if (!record) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.syncOutboxVersionsOnDequeue(storage, record, head, recordOp)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, storage.delete(head)];
                    case 4:
                        _a.sent();
                        this.inProgressMutationEventId = undefined;
                        return [2 /*return*/, head];
                }
            });
        });
    };
    /**
     * Doing a peek() implies that the mutation goes "inProgress"
     *
     * @param storage
     */
    MutationEventOutbox.prototype.peek = function (storage) {
        return __awaiter(this, void 0, void 0, function () {
            var head;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storage.queryOne(this.MutationEvent, types_1.QueryOne.FIRST)];
                    case 1:
                        head = _a.sent();
                        this.inProgressMutationEventId = head ? head.id : undefined;
                        return [2 /*return*/, head];
                }
            });
        });
    };
    MutationEventOutbox.prototype.getForModel = function (storage, model) {
        return __awaiter(this, void 0, void 0, function () {
            var mutationEventModelDefinition, mutationEvents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mutationEventModelDefinition = this.schema.namespaces[util_1.SYNC].models
                            .MutationEvent;
                        return [4 /*yield*/, storage.query(this.MutationEvent, predicates_1.ModelPredicateCreator.createFromExisting(mutationEventModelDefinition, function (c) { return c.modelId('eq', model.id); }))];
                    case 1:
                        mutationEvents = _a.sent();
                        return [2 /*return*/, mutationEvents];
                }
            });
        });
    };
    MutationEventOutbox.prototype.getModelIds = function (storage) {
        return __awaiter(this, void 0, void 0, function () {
            var mutationEvents, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storage.query(this.MutationEvent)];
                    case 1:
                        mutationEvents = _a.sent();
                        result = new Set();
                        mutationEvents.forEach(function (_a) {
                            var modelId = _a.modelId;
                            return result.add(modelId);
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // applies _version from the AppSync mutation response to other items
    // in the mutation queue with the same id
    // see https://github.com/aws-amplify/amplify-js/pull/7354 for more details
    MutationEventOutbox.prototype.syncOutboxVersionsOnDequeue = function (storage, record, head, recordOp) {
        return __awaiter(this, void 0, void 0, function () {
            var _version, _lastChangedAt, _deleted, incomingData, data, __version, __lastChangedAt, __deleted, outgoingData, mutationEventModelDefinition, predicate, outdatedMutations, reconciledMutations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (head.operation !== recordOp) {
                            return [2 /*return*/];
                        }
                        _version = record._version, _lastChangedAt = record._lastChangedAt, _deleted = record._deleted, incomingData = __rest(record, ["_version", "_lastChangedAt", "_deleted"]);
                        data = JSON.parse(head.data);
                        if (!data) {
                            return [2 /*return*/];
                        }
                        __version = data._version, __lastChangedAt = data._lastChangedAt, __deleted = data._deleted, outgoingData = __rest(data, ["_version", "_lastChangedAt", "_deleted"]);
                        // Don't sync the version when the data in the response does not match the data
                        // in the request, i.e., when there's a handled conflict
                        if (!util_1.valuesEqual(incomingData, outgoingData, true)) {
                            return [2 /*return*/];
                        }
                        mutationEventModelDefinition = this.schema.namespaces[util_1.SYNC].models['MutationEvent'];
                        predicate = predicates_1.ModelPredicateCreator.createFromExisting(mutationEventModelDefinition, function (c) { return c.modelId('eq', record.id).id('ne', _this.inProgressMutationEventId); });
                        return [4 /*yield*/, storage.query(this.MutationEvent, predicate)];
                    case 1:
                        outdatedMutations = _a.sent();
                        if (!outdatedMutations.length) {
                            return [2 /*return*/];
                        }
                        reconciledMutations = outdatedMutations.map(function (m) {
                            var oldData = JSON.parse(m.data);
                            var newData = __assign(__assign({}, oldData), { _version: _version, _lastChangedAt: _lastChangedAt });
                            return _this.MutationEvent.copyOf(m, function (draft) {
                                draft.data = JSON.stringify(newData);
                            });
                        });
                        return [4 /*yield*/, storage.delete(this.MutationEvent, predicate)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(reconciledMutations.map(function (m) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, storage.save(m, undefined, this.ownSymbol)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MutationEventOutbox.prototype.mergeUserFields = function (previous, current) {
        var _a = JSON.parse(previous.data), _version = _a._version, id = _a.id, _lastChangedAt = _a._lastChangedAt, _deleted = _a._deleted, previousData = __rest(_a, ["_version", "id", "_lastChangedAt", "_deleted"]);
        var _b = JSON.parse(current.data), __id = _b.id, __version = _b._version, __lastChangedAt = _b._lastChangedAt, __deleted = _b._deleted, currentData = __rest(_b, ["id", "_version", "_lastChangedAt", "_deleted"]);
        var data = JSON.stringify(__assign(__assign({ id: id,
            _version: _version,
            _lastChangedAt: _lastChangedAt,
            _deleted: _deleted }, previousData), currentData));
        return this.modelInstanceCreator(this.MutationEvent, __assign(__assign({}, current), { data: data }));
    };
    return MutationEventOutbox;
}());
exports.MutationEventOutbox = MutationEventOutbox;
//# sourceMappingURL=outbox.js.map