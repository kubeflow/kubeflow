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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var pubsub_1 = require("@aws-amplify/pubsub");
var zen_observable_ts_1 = __importDefault(require("zen-observable-ts"));
var predicates_1 = require("../predicates");
var types_1 = require("../types");
var util_1 = require("../util");
var datastoreConnectivity_1 = __importDefault(require("./datastoreConnectivity"));
var merger_1 = require("./merger");
var outbox_1 = require("./outbox");
var mutation_1 = require("./processors/mutation");
var subscription_1 = require("./processors/subscription");
var sync_1 = require("./processors/sync");
var utils_1 = require("./utils");
var isNode = core_1.browserOrNode().isNode;
var logger = new core_1.ConsoleLogger('DataStore');
var ownSymbol = Symbol('sync');
var ControlMessage;
(function (ControlMessage) {
    ControlMessage["SYNC_ENGINE_STORAGE_SUBSCRIBED"] = "storageSubscribed";
    ControlMessage["SYNC_ENGINE_SUBSCRIPTIONS_ESTABLISHED"] = "subscriptionsEstablished";
    ControlMessage["SYNC_ENGINE_SYNC_QUERIES_STARTED"] = "syncQueriesStarted";
    ControlMessage["SYNC_ENGINE_SYNC_QUERIES_READY"] = "syncQueriesReady";
    ControlMessage["SYNC_ENGINE_MODEL_SYNCED"] = "modelSynced";
    ControlMessage["SYNC_ENGINE_OUTBOX_MUTATION_ENQUEUED"] = "outboxMutationEnqueued";
    ControlMessage["SYNC_ENGINE_OUTBOX_MUTATION_PROCESSED"] = "outboxMutationProcessed";
    ControlMessage["SYNC_ENGINE_OUTBOX_STATUS"] = "outboxStatus";
    ControlMessage["SYNC_ENGINE_NETWORK_STATUS"] = "networkStatus";
    ControlMessage["SYNC_ENGINE_READY"] = "ready";
})(ControlMessage = exports.ControlMessage || (exports.ControlMessage = {}));
var SyncEngine = /** @class */ (function () {
    function SyncEngine(schema, namespaceResolver, modelClasses, userModelClasses, storage, modelInstanceCreator, maxRecordsToSync, syncPageSize, conflictHandler, errorHandler, syncPredicates, amplifyConfig, authModeStrategy) {
        if (amplifyConfig === void 0) { amplifyConfig = {}; }
        this.schema = schema;
        this.namespaceResolver = namespaceResolver;
        this.modelClasses = modelClasses;
        this.userModelClasses = userModelClasses;
        this.storage = storage;
        this.modelInstanceCreator = modelInstanceCreator;
        this.maxRecordsToSync = maxRecordsToSync;
        this.syncPageSize = syncPageSize;
        this.syncPredicates = syncPredicates;
        this.amplifyConfig = amplifyConfig;
        this.authModeStrategy = authModeStrategy;
        this.online = false;
        var MutationEvent = this.modelClasses['MutationEvent'];
        this.outbox = new outbox_1.MutationEventOutbox(this.schema, MutationEvent, modelInstanceCreator, ownSymbol);
        this.modelMerger = new merger_1.ModelMerger(this.outbox, ownSymbol);
        this.syncQueriesProcessor = new sync_1.SyncProcessor(this.schema, this.maxRecordsToSync, this.syncPageSize, this.syncPredicates, this.amplifyConfig, this.authModeStrategy);
        this.subscriptionsProcessor = new subscription_1.SubscriptionProcessor(this.schema, this.syncPredicates, this.amplifyConfig, this.authModeStrategy);
        this.mutationsProcessor = new mutation_1.MutationProcessor(this.schema, this.storage, this.userModelClasses, this.outbox, this.modelInstanceCreator, MutationEvent, this.amplifyConfig, this.authModeStrategy, conflictHandler, errorHandler);
        this.datastoreConnectivity = new datastoreConnectivity_1.default();
    }
    SyncEngine.prototype.start = function (params) {
        var _this = this;
        return new zen_observable_ts_1.default(function (observer) {
            logger.log('starting sync engine...');
            var subscriptions = [];
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var err_1, startPromise, hasMutationsInOutbox;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.setupModels(params)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            observer.error(err_1);
                            return [2 /*return*/];
                        case 3:
                            startPromise = new Promise(function (resolve) {
                                _this.datastoreConnectivity.status().subscribe(function (_a) {
                                    var online = _a.online;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var ctlSubsObservable_1, dataSubsObservable, err_2, error_1;
                                        var _b;
                                        var _this = this;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    if (!(online && !this.online)) return [3 /*break*/, 10];
                                                    this.online = online;
                                                    observer.next({
                                                        type: ControlMessage.SYNC_ENGINE_NETWORK_STATUS,
                                                        data: {
                                                            active: this.online,
                                                        },
                                                    });
                                                    dataSubsObservable = void 0;
                                                    if (!isNode) return [3 /*break*/, 1];
                                                    logger.warn('Realtime disabled when in a server-side environment');
                                                    return [3 /*break*/, 6];
                                                case 1:
                                                    //#region GraphQL Subscriptions
                                                    _b = __read(this.subscriptionsProcessor.start(), 2), 
                                                    // const ctlObservable: Observable<CONTROL_MSG>
                                                    ctlSubsObservable_1 = _b[0], 
                                                    // const dataObservable: Observable<[TransformerMutationType, SchemaModel, Readonly<{
                                                    // id: string;
                                                    // } & Record<string, any>>]>
                                                    dataSubsObservable = _b[1];
                                                    _c.label = 2;
                                                case 2:
                                                    _c.trys.push([2, 4, , 5]);
                                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                            var ctlSubsSubscription = ctlSubsObservable_1.subscribe({
                                                                next: function (msg) {
                                                                    if (msg === subscription_1.CONTROL_MSG.CONNECTED) {
                                                                        resolve();
                                                                    }
                                                                },
                                                                error: function (err) {
                                                                    reject(err);
                                                                    var handleDisconnect = _this.disconnectionHandler();
                                                                    handleDisconnect(err);
                                                                },
                                                            });
                                                            subscriptions.push(ctlSubsSubscription);
                                                        })];
                                                case 3:
                                                    _c.sent();
                                                    return [3 /*break*/, 5];
                                                case 4:
                                                    err_2 = _c.sent();
                                                    observer.error(err_2);
                                                    return [2 /*return*/];
                                                case 5:
                                                    logger.log('Realtime ready');
                                                    observer.next({
                                                        type: ControlMessage.SYNC_ENGINE_SUBSCRIPTIONS_ESTABLISHED,
                                                    });
                                                    _c.label = 6;
                                                case 6:
                                                    _c.trys.push([6, 8, , 9]);
                                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                            var syncQuerySubscription = _this.syncQueriesObservable().subscribe({
                                                                next: function (message) {
                                                                    var type = message.type;
                                                                    if (type === ControlMessage.SYNC_ENGINE_SYNC_QUERIES_READY) {
                                                                        resolve();
                                                                    }
                                                                    observer.next(message);
                                                                },
                                                                complete: function () {
                                                                    resolve();
                                                                },
                                                                error: function (error) {
                                                                    reject(error);
                                                                },
                                                            });
                                                            if (syncQuerySubscription) {
                                                                subscriptions.push(syncQuerySubscription);
                                                            }
                                                        })];
                                                case 7:
                                                    _c.sent();
                                                    return [3 /*break*/, 9];
                                                case 8:
                                                    error_1 = _c.sent();
                                                    observer.error(error_1);
                                                    return [2 /*return*/];
                                                case 9:
                                                    //#endregion
                                                    //#region process mutations
                                                    subscriptions.push(this.mutationsProcessor
                                                        .start()
                                                        .subscribe(function (_a) {
                                                        var modelDefinition = _a.modelDefinition, item = _a.model, hasMore = _a.hasMore;
                                                        var modelConstructor = _this.userModelClasses[modelDefinition.name];
                                                        var model = _this.modelInstanceCreator(modelConstructor, item);
                                                        _this.storage.runExclusive(function (storage) {
                                                            return _this.modelMerger.merge(storage, model);
                                                        });
                                                        observer.next({
                                                            type: ControlMessage.SYNC_ENGINE_OUTBOX_MUTATION_PROCESSED,
                                                            data: {
                                                                model: modelConstructor,
                                                                element: model,
                                                            },
                                                        });
                                                        observer.next({
                                                            type: ControlMessage.SYNC_ENGINE_OUTBOX_STATUS,
                                                            data: {
                                                                isEmpty: !hasMore,
                                                            },
                                                        });
                                                    }));
                                                    //#endregion
                                                    //#region Merge subscriptions buffer
                                                    // TODO: extract to function
                                                    if (!isNode) {
                                                        subscriptions.push(dataSubsObservable.subscribe(function (_a) {
                                                            var _b = __read(_a, 3), _transformerMutationType = _b[0], modelDefinition = _b[1], item = _b[2];
                                                            var modelConstructor = _this.userModelClasses[modelDefinition.name];
                                                            var model = _this.modelInstanceCreator(modelConstructor, item);
                                                            _this.storage.runExclusive(function (storage) {
                                                                return _this.modelMerger.merge(storage, model);
                                                            });
                                                        }));
                                                    }
                                                    return [3 /*break*/, 11];
                                                case 10:
                                                    if (!online) {
                                                        this.online = online;
                                                        observer.next({
                                                            type: ControlMessage.SYNC_ENGINE_NETWORK_STATUS,
                                                            data: {
                                                                active: this.online,
                                                            },
                                                        });
                                                        subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
                                                        subscriptions = [];
                                                    }
                                                    _c.label = 11;
                                                case 11:
                                                    resolve();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                });
                            });
                            this.storage
                                .observe(null, null, ownSymbol)
                                .filter(function (_a) {
                                var model = _a.model;
                                var modelDefinition = _this.getModelDefinition(model);
                                return modelDefinition.syncable === true;
                            })
                                .subscribe({
                                next: function (_a) {
                                    var opType = _a.opType, model = _a.model, element = _a.element, condition = _a.condition;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var namespace, MutationEventConstructor, graphQLCondition, mutationEvent;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    namespace = this.schema.namespaces[this.namespaceResolver(model)];
                                                    MutationEventConstructor = this.modelClasses['MutationEvent'];
                                                    graphQLCondition = utils_1.predicateToGraphQLCondition(condition);
                                                    mutationEvent = utils_1.createMutationInstanceFromModelOperation(namespace.relationships, this.getModelDefinition(model), opType, model, element, graphQLCondition, MutationEventConstructor, this.modelInstanceCreator);
                                                    return [4 /*yield*/, this.outbox.enqueue(this.storage, mutationEvent)];
                                                case 1:
                                                    _b.sent();
                                                    observer.next({
                                                        type: ControlMessage.SYNC_ENGINE_OUTBOX_MUTATION_ENQUEUED,
                                                        data: {
                                                            model: model,
                                                            element: element,
                                                        },
                                                    });
                                                    observer.next({
                                                        type: ControlMessage.SYNC_ENGINE_OUTBOX_STATUS,
                                                        data: {
                                                            isEmpty: false,
                                                        },
                                                    });
                                                    return [4 /*yield*/, startPromise];
                                                case 2:
                                                    _b.sent();
                                                    if (this.online) {
                                                        this.mutationsProcessor.resume();
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                            });
                            observer.next({
                                type: ControlMessage.SYNC_ENGINE_STORAGE_SUBSCRIBED,
                            });
                            return [4 /*yield*/, this.outbox.peek(this.storage)];
                        case 4:
                            hasMutationsInOutbox = (_a.sent()) === undefined;
                            observer.next({
                                type: ControlMessage.SYNC_ENGINE_OUTBOX_STATUS,
                                data: {
                                    isEmpty: hasMutationsInOutbox,
                                },
                            });
                            return [4 /*yield*/, startPromise];
                        case 5:
                            _a.sent();
                            observer.next({
                                type: ControlMessage.SYNC_ENGINE_READY,
                            });
                            return [2 /*return*/];
                    }
                });
            }); })();
            return function () {
                subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
            };
        });
    };
    SyncEngine.prototype.getModelsMetadataWithNextFullSync = function (currentTimeStamp) {
        return __awaiter(this, void 0, void 0, function () {
            var modelLastSync, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Map.bind;
                        return [4 /*yield*/, this.getModelsMetadata()];
                    case 1:
                        modelLastSync = new (_a.apply(Map, [void 0, (_b.sent()).map(function (_a) {
                                var namespace = _a.namespace, model = _a.model, lastSync = _a.lastSync, lastFullSync = _a.lastFullSync, fullSyncInterval = _a.fullSyncInterval, lastSyncPredicate = _a.lastSyncPredicate;
                                var nextFullSync = lastFullSync + fullSyncInterval;
                                var syncFrom = !lastFullSync || nextFullSync < currentTimeStamp
                                    ? 0 // perform full sync if expired
                                    : lastSync; // perform delta sync
                                return [
                                    _this.schema.namespaces[namespace].models[model],
                                    [namespace, syncFrom],
                                ];
                            })]))();
                        return [2 /*return*/, modelLastSync];
                }
            });
        });
    };
    SyncEngine.prototype.syncQueriesObservable = function () {
        var _this = this;
        if (!this.online) {
            return zen_observable_ts_1.default.of();
        }
        return new zen_observable_ts_1.default(function (observer) {
            var syncQueriesSubscription;
            var waitTimeoutId;
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var _loop_1, this_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _loop_1 = function () {
                                var count, modelLastSync, paginatingModels, newestFullSyncStartedAt, theInterval, start, duration, newestStartedAt, msNextFullSync;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            count = new WeakMap();
                                            return [4 /*yield*/, this_1.getModelsMetadataWithNextFullSync(Date.now())];
                                        case 1:
                                            modelLastSync = _a.sent();
                                            paginatingModels = new Set(modelLastSync.keys());
                                            return [4 /*yield*/, new Promise(function (resolve) {
                                                    syncQueriesSubscription = _this.syncQueriesProcessor
                                                        .start(modelLastSync)
                                                        .subscribe({
                                                        next: function (_a) {
                                                            var namespace = _a.namespace, modelDefinition = _a.modelDefinition, items = _a.items, done = _a.done, startedAt = _a.startedAt, isFullSync = _a.isFullSync;
                                                            return __awaiter(_this, void 0, void 0, function () {
                                                                var modelConstructor, modelName, modelMetadata_1, lastFullSync, fullSyncInterval, counts;
                                                                var _this = this;
                                                                return __generator(this, function (_b) {
                                                                    switch (_b.label) {
                                                                        case 0:
                                                                            modelConstructor = this.userModelClasses[modelDefinition.name];
                                                                            if (!count.has(modelConstructor)) {
                                                                                count.set(modelConstructor, {
                                                                                    new: 0,
                                                                                    updated: 0,
                                                                                    deleted: 0,
                                                                                });
                                                                                start = util_1.getNow();
                                                                                newestStartedAt =
                                                                                    newestStartedAt === undefined
                                                                                        ? startedAt
                                                                                        : Math.max(newestStartedAt, startedAt);
                                                                            }
                                                                            /**
                                                                             * If there are mutations in the outbox for a given id, those need to be
                                                                             * merged individually. Otherwise, we can merge them in batches.
                                                                             */
                                                                            return [4 /*yield*/, this.storage.runExclusive(function (storage) { return __awaiter(_this, void 0, void 0, function () {
                                                                                    var idsInOutbox, oneByOne, page, opTypeCount, oneByOne_1, oneByOne_1_1, item, opType, e_1_1, _a, _b, _c, counts;
                                                                                    var e_1, _d;
                                                                                    return __generator(this, function (_e) {
                                                                                        switch (_e.label) {
                                                                                            case 0: return [4 /*yield*/, this.outbox.getModelIds(storage)];
                                                                                            case 1:
                                                                                                idsInOutbox = _e.sent();
                                                                                                oneByOne = [];
                                                                                                page = items.filter(function (item) {
                                                                                                    if (!idsInOutbox.has(item.id)) {
                                                                                                        return true;
                                                                                                    }
                                                                                                    oneByOne.push(item);
                                                                                                    return false;
                                                                                                });
                                                                                                opTypeCount = [];
                                                                                                _e.label = 2;
                                                                                            case 2:
                                                                                                _e.trys.push([2, 7, 8, 9]);
                                                                                                oneByOne_1 = __values(oneByOne), oneByOne_1_1 = oneByOne_1.next();
                                                                                                _e.label = 3;
                                                                                            case 3:
                                                                                                if (!!oneByOne_1_1.done) return [3 /*break*/, 6];
                                                                                                item = oneByOne_1_1.value;
                                                                                                return [4 /*yield*/, this.modelMerger.merge(storage, item)];
                                                                                            case 4:
                                                                                                opType = _e.sent();
                                                                                                if (opType !== undefined) {
                                                                                                    opTypeCount.push([item, opType]);
                                                                                                }
                                                                                                _e.label = 5;
                                                                                            case 5:
                                                                                                oneByOne_1_1 = oneByOne_1.next();
                                                                                                return [3 /*break*/, 3];
                                                                                            case 6: return [3 /*break*/, 9];
                                                                                            case 7:
                                                                                                e_1_1 = _e.sent();
                                                                                                e_1 = { error: e_1_1 };
                                                                                                return [3 /*break*/, 9];
                                                                                            case 8:
                                                                                                try {
                                                                                                    if (oneByOne_1_1 && !oneByOne_1_1.done && (_d = oneByOne_1.return)) _d.call(oneByOne_1);
                                                                                                }
                                                                                                finally { if (e_1) throw e_1.error; }
                                                                                                return [7 /*endfinally*/];
                                                                                            case 9:
                                                                                                _b = (_a = opTypeCount.push).apply;
                                                                                                _c = [opTypeCount];
                                                                                                return [4 /*yield*/, this.modelMerger.mergePage(storage, modelConstructor, page)];
                                                                                            case 10:
                                                                                                _b.apply(_a, _c.concat([__spread.apply(void 0, [(_e.sent())])]));
                                                                                                counts = count.get(modelConstructor);
                                                                                                opTypeCount.forEach(function (_a) {
                                                                                                    var _b = __read(_a, 2), opType = _b[1];
                                                                                                    switch (opType) {
                                                                                                        case types_1.OpType.INSERT:
                                                                                                            counts.new++;
                                                                                                            break;
                                                                                                        case types_1.OpType.UPDATE:
                                                                                                            counts.updated++;
                                                                                                            break;
                                                                                                        case types_1.OpType.DELETE:
                                                                                                            counts.deleted++;
                                                                                                            break;
                                                                                                        default:
                                                                                                            util_1.exhaustiveCheck(opType);
                                                                                                    }
                                                                                                });
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); })];
                                                                        case 1:
                                                                            /**
                                                                             * If there are mutations in the outbox for a given id, those need to be
                                                                             * merged individually. Otherwise, we can merge them in batches.
                                                                             */
                                                                            _b.sent();
                                                                            if (!done) return [3 /*break*/, 4];
                                                                            modelName = modelDefinition.name;
                                                                            return [4 /*yield*/, this.getModelMetadata(namespace, modelName)];
                                                                        case 2:
                                                                            modelMetadata_1 = _b.sent();
                                                                            lastFullSync = modelMetadata_1.lastFullSync, fullSyncInterval = modelMetadata_1.fullSyncInterval;
                                                                            theInterval = fullSyncInterval;
                                                                            newestFullSyncStartedAt =
                                                                                newestFullSyncStartedAt === undefined
                                                                                    ? lastFullSync
                                                                                    : Math.max(newestFullSyncStartedAt, isFullSync ? startedAt : lastFullSync);
                                                                            modelMetadata_1 = this.modelClasses
                                                                                .ModelMetadata.copyOf(modelMetadata_1, function (draft) {
                                                                                draft.lastSync = startedAt;
                                                                                draft.lastFullSync = isFullSync
                                                                                    ? startedAt
                                                                                    : modelMetadata_1.lastFullSync;
                                                                            });
                                                                            return [4 /*yield*/, this.storage.save(modelMetadata_1, undefined, ownSymbol)];
                                                                        case 3:
                                                                            _b.sent();
                                                                            counts = count.get(modelConstructor);
                                                                            observer.next({
                                                                                type: ControlMessage.SYNC_ENGINE_MODEL_SYNCED,
                                                                                data: {
                                                                                    model: modelConstructor,
                                                                                    isFullSync: isFullSync,
                                                                                    isDeltaSync: !isFullSync,
                                                                                    counts: counts,
                                                                                },
                                                                            });
                                                                            paginatingModels.delete(modelDefinition);
                                                                            if (paginatingModels.size === 0) {
                                                                                duration = util_1.getNow() - start;
                                                                                resolve();
                                                                                observer.next({
                                                                                    type: ControlMessage.SYNC_ENGINE_SYNC_QUERIES_READY,
                                                                                });
                                                                                syncQueriesSubscription.unsubscribe();
                                                                            }
                                                                            _b.label = 4;
                                                                        case 4: return [2 /*return*/];
                                                                    }
                                                                });
                                                            });
                                                        },
                                                        error: function (error) {
                                                            observer.error(error);
                                                        },
                                                    });
                                                    observer.next({
                                                        type: ControlMessage.SYNC_ENGINE_SYNC_QUERIES_STARTED,
                                                        data: {
                                                            models: Array.from(paginatingModels).map(function (_a) {
                                                                var name = _a.name;
                                                                return name;
                                                            }),
                                                        },
                                                    });
                                                })];
                                        case 2:
                                            _a.sent();
                                            msNextFullSync = newestFullSyncStartedAt +
                                                theInterval -
                                                (newestStartedAt + duration);
                                            logger.debug("Next fullSync in " + msNextFullSync / 1000 + " seconds. (" + new Date(Date.now() + msNextFullSync) + ")");
                                            return [4 /*yield*/, new Promise(function (res) {
                                                    waitTimeoutId = setTimeout(res, msNextFullSync);
                                                })];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _a.label = 1;
                        case 1:
                            if (!!observer.closed) return [3 /*break*/, 3];
                            return [5 /*yield**/, _loop_1()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })();
            return function () {
                if (syncQueriesSubscription) {
                    syncQueriesSubscription.unsubscribe();
                }
                if (waitTimeoutId) {
                    clearTimeout(waitTimeoutId);
                }
            };
        });
    };
    SyncEngine.prototype.disconnectionHandler = function () {
        var _this = this;
        return function (msg) {
            // This implementation is tied to AWSAppSyncRealTimeProvider 'Connection closed', 'Timeout disconnect' msg
            if (pubsub_1.CONTROL_MSG.CONNECTION_CLOSED === msg ||
                pubsub_1.CONTROL_MSG.TIMEOUT_DISCONNECT === msg) {
                _this.datastoreConnectivity.socketDisconnected();
            }
        };
    };
    SyncEngine.prototype.unsubscribeConnectivity = function () {
        this.datastoreConnectivity.unsubscribe();
    };
    SyncEngine.prototype.setupModels = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var fullSyncInterval, ModelMetadata, models, savedModel, promises, result, _a, _b, modelMetadata, modelName, e_2_1;
            var e_2, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fullSyncInterval = params.fullSyncInterval;
                        ModelMetadata = this.modelClasses
                            .ModelMetadata;
                        models = [];
                        Object.values(this.schema.namespaces).forEach(function (namespace) {
                            Object.values(namespace.models)
                                .filter(function (_a) {
                                var syncable = _a.syncable;
                                return syncable;
                            })
                                .forEach(function (model) {
                                models.push([namespace.name, model]);
                            });
                        });
                        promises = models.map(function (_a) {
                            var _b = __read(_a, 2), namespace = _b[0], model = _b[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                var modelMetadata, syncPredicate, lastSyncPredicate, prevSyncPredicate, syncPredicateUpdated_1;
                                var _c, _d, _e, _f;
                                return __generator(this, function (_g) {
                                    switch (_g.label) {
                                        case 0: return [4 /*yield*/, this.getModelMetadata(namespace, model.name)];
                                        case 1:
                                            modelMetadata = _g.sent();
                                            syncPredicate = predicates_1.ModelPredicateCreator.getPredicates(this.syncPredicates.get(model), false);
                                            lastSyncPredicate = syncPredicate
                                                ? JSON.stringify(syncPredicate)
                                                : null;
                                            if (!(modelMetadata === undefined)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.storage.save(this.modelInstanceCreator(ModelMetadata, {
                                                    model: model.name,
                                                    namespace: namespace,
                                                    lastSync: null,
                                                    fullSyncInterval: fullSyncInterval,
                                                    lastFullSync: null,
                                                    lastSyncPredicate: lastSyncPredicate,
                                                }), undefined, ownSymbol)];
                                        case 2:
                                            _c = __read.apply(void 0, [_g.sent(), 1]), _d = __read(_c[0], 1), savedModel = _d[0];
                                            return [3 /*break*/, 5];
                                        case 3:
                                            prevSyncPredicate = modelMetadata.lastSyncPredicate
                                                ? modelMetadata.lastSyncPredicate
                                                : null;
                                            syncPredicateUpdated_1 = prevSyncPredicate !== lastSyncPredicate;
                                            return [4 /*yield*/, this.storage.save(this.modelClasses.ModelMetadata.copyOf(modelMetadata, function (draft) {
                                                    draft.fullSyncInterval = fullSyncInterval;
                                                    // perform a base sync if the syncPredicate changed in between calls to DataStore.start
                                                    // ensures that the local store contains all the data specified by the syncExpression
                                                    if (syncPredicateUpdated_1) {
                                                        draft.lastSync = null;
                                                        draft.lastFullSync = null;
                                                        draft.lastSyncPredicate = lastSyncPredicate;
                                                    }
                                                }))];
                                        case 4:
                                            _e = __read.apply(void 0, [_g.sent(), 1]), _f = __read(_e[0], 1), savedModel = _f[0];
                                            _g.label = 5;
                                        case 5: return [2 /*return*/, savedModel];
                                    }
                                });
                            });
                        });
                        result = {};
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        _a = __values.apply(void 0, [_d.sent()]), _b = _a.next();
                        _d.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 5];
                        modelMetadata = _b.value;
                        modelName = modelMetadata.model;
                        result[modelName] = modelMetadata;
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, result];
                }
            });
        });
    };
    SyncEngine.prototype.getModelsMetadata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ModelMetadata, modelsMetadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ModelMetadata = this.modelClasses
                            .ModelMetadata;
                        return [4 /*yield*/, this.storage.query(ModelMetadata)];
                    case 1:
                        modelsMetadata = _a.sent();
                        return [2 /*return*/, modelsMetadata];
                }
            });
        });
    };
    SyncEngine.prototype.getModelMetadata = function (namespace, model) {
        return __awaiter(this, void 0, void 0, function () {
            var ModelMetadata, predicate, _a, modelMetadata;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ModelMetadata = this.modelClasses
                            .ModelMetadata;
                        predicate = predicates_1.ModelPredicateCreator.createFromExisting(this.schema.namespaces[util_1.SYNC].models[ModelMetadata.name], function (c) { return c.namespace('eq', namespace).model('eq', model); });
                        return [4 /*yield*/, this.storage.query(ModelMetadata, predicate, {
                                page: 0,
                                limit: 1,
                            })];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), modelMetadata = _a[0];
                        return [2 /*return*/, modelMetadata];
                }
            });
        });
    };
    SyncEngine.prototype.getModelDefinition = function (modelConstructor) {
        var namespaceName = this.namespaceResolver(modelConstructor);
        var modelDefinition = this.schema.namespaces[namespaceName].models[modelConstructor.name];
        return modelDefinition;
    };
    SyncEngine.getNamespace = function () {
        var namespace = {
            name: util_1.SYNC,
            relationships: {},
            enums: {
                OperationType: {
                    name: 'OperationType',
                    values: ['CREATE', 'UPDATE', 'DELETE'],
                },
            },
            nonModels: {},
            models: {
                MutationEvent: {
                    name: 'MutationEvent',
                    pluralName: 'MutationEvents',
                    syncable: false,
                    fields: {
                        id: {
                            name: 'id',
                            type: 'ID',
                            isRequired: true,
                            isArray: false,
                        },
                        model: {
                            name: 'model',
                            type: 'String',
                            isRequired: true,
                            isArray: false,
                        },
                        data: {
                            name: 'data',
                            type: 'String',
                            isRequired: true,
                            isArray: false,
                        },
                        modelId: {
                            name: 'modelId',
                            type: 'String',
                            isRequired: true,
                            isArray: false,
                        },
                        operation: {
                            name: 'operation',
                            type: {
                                enum: 'Operationtype',
                            },
                            isArray: false,
                            isRequired: true,
                        },
                        condition: {
                            name: 'condition',
                            type: 'String',
                            isArray: false,
                            isRequired: true,
                        },
                    },
                },
                ModelMetadata: {
                    name: 'ModelMetadata',
                    pluralName: 'ModelsMetadata',
                    syncable: false,
                    fields: {
                        id: {
                            name: 'id',
                            type: 'ID',
                            isRequired: true,
                            isArray: false,
                        },
                        namespace: {
                            name: 'namespace',
                            type: 'String',
                            isRequired: true,
                            isArray: false,
                        },
                        model: {
                            name: 'model',
                            type: 'String',
                            isRequired: true,
                            isArray: false,
                        },
                        lastSync: {
                            name: 'lastSync',
                            type: 'Int',
                            isRequired: false,
                            isArray: false,
                        },
                        lastFullSync: {
                            name: 'lastFullSync',
                            type: 'Int',
                            isRequired: false,
                            isArray: false,
                        },
                        fullSyncInterval: {
                            name: 'fullSyncInterval',
                            type: 'Int',
                            isRequired: true,
                            isArray: false,
                        },
                    },
                },
            },
        };
        return namespace;
    };
    return SyncEngine;
}());
exports.SyncEngine = SyncEngine;
//# sourceMappingURL=index.js.map