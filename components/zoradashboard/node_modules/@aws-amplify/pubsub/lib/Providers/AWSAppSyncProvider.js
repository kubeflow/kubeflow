"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zen_observable_ts_1 = __importDefault(require("zen-observable-ts"));
var core_1 = require("@aws-amplify/core");
var MqttOverWSProvider_1 = require("./MqttOverWSProvider");
var logger = new core_1.ConsoleLogger('AWSAppSyncProvider');
var AWSAppSyncProvider = /** @class */ (function (_super) {
    __extends(AWSAppSyncProvider, _super);
    function AWSAppSyncProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._topicClient = new Map();
        _this._topicAlias = new Map();
        return _this;
    }
    Object.defineProperty(AWSAppSyncProvider.prototype, "endpoint", {
        get: function () {
            throw new Error('Not supported');
        },
        enumerable: true,
        configurable: true
    });
    AWSAppSyncProvider.prototype.getProviderName = function () {
        return 'AWSAppSyncProvider';
    };
    AWSAppSyncProvider.prototype.publish = function (topics, msg, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Operation not supported');
            });
        });
    };
    AWSAppSyncProvider.prototype._cleanUp = function (clientId) {
        var _this = this;
        var topicsForClient = Array.from(this._topicClient.entries())
            .filter(function (_a) {
            var _b = __read(_a, 2), c = _b[1];
            return c.clientId === clientId;
        })
            .map(function (_a) {
            var _b = __read(_a, 1), t = _b[0];
            return t;
        });
        topicsForClient.forEach(function (t) { return _this._cleanUpForTopic(t); });
    };
    AWSAppSyncProvider.prototype._cleanUpForTopic = function (topic) {
        this._topicClient.delete(topic);
        this._topicAlias.delete(topic);
    };
    AWSAppSyncProvider.prototype.onDisconnect = function (_a) {
        var _this = this;
        var clientId = _a.clientId, errorCode = _a.errorCode, args = __rest(_a, ["clientId", "errorCode"]);
        if (errorCode !== 0) {
            var topicsForClient = Array.from(this._topicClient.entries())
                .filter(function (_a) {
                var _b = __read(_a, 2), c = _b[1];
                return c.clientId === clientId;
            })
                .map(function (_a) {
                var _b = __read(_a, 1), t = _b[0];
                return t;
            });
            topicsForClient.forEach(function (topic) {
                if (_this._topicObservers.has(topic)) {
                    _this._topicObservers.get(topic).forEach(function (obs) {
                        if (!obs.closed) {
                            obs.error(args);
                        }
                    });
                    _this._topicObservers.delete(topic);
                }
            });
            this._cleanUp(clientId);
        }
    };
    AWSAppSyncProvider.prototype.disconnect = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientsQueue.get(clientId, function () { return null; })];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, _super.prototype.disconnect.call(this, clientId)];
                    case 2:
                        _a.sent();
                        this._cleanUp(clientId);
                        return [2 /*return*/];
                }
            });
        });
    };
    AWSAppSyncProvider.prototype.subscribe = function (topics, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var result = new zen_observable_ts_1.default(function (observer) {
            var targetTopics = [].concat(topics);
            logger.debug('Subscribing to topic(s)', targetTopics.join(','));
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, mqttConnections, newSubscriptions, newAliases, map;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Add these topics to map
                            targetTopics.forEach(function (t) {
                                if (!_this._topicObservers.has(t)) {
                                    _this._topicObservers.set(t, new Set());
                                }
                                _this._topicObservers.get(t).add(observer);
                            });
                            _a = options.mqttConnections, mqttConnections = _a === void 0 ? [] : _a, newSubscriptions = options.newSubscriptions;
                            newAliases = Object.entries(newSubscriptions).map(function (_a) {
                                var _b = __read(_a, 2), alias = _b[0], v = _b[1];
                                return [v.topic, alias];
                            });
                            // Merge new aliases with old ones
                            this._topicAlias = new Map(__spread(Array.from(this._topicAlias.entries()), newAliases));
                            map = Object.entries(targetTopics.reduce(function (acc, elem) {
                                var connectionInfoForTopic = mqttConnections.find(function (c) { return c.topics.indexOf(elem) > -1; });
                                if (connectionInfoForTopic) {
                                    var clientId = connectionInfoForTopic.client, url = connectionInfoForTopic.url;
                                    if (!acc[clientId]) {
                                        acc[clientId] = {
                                            url: url,
                                            topics: new Set(),
                                        };
                                    }
                                    acc[clientId].topics.add(elem);
                                }
                                return acc;
                            }, {}));
                            // reconnect everything we have in the map
                            return [4 /*yield*/, Promise.all(map.map(function (_a) {
                                    var _b = __read(_a, 2), clientId = _b[0], _c = _b[1], url = _c.url, topics = _c.topics;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var client, err_1;
                                        var _this = this;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    client = null;
                                                    _d.label = 1;
                                                case 1:
                                                    _d.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, this.connect(clientId, {
                                                            clientId: clientId,
                                                            url: url,
                                                        })];
                                                case 2:
                                                    client = _d.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    err_1 = _d.sent();
                                                    observer.error({ message: 'Failed to connect', error: err_1 });
                                                    observer.complete();
                                                    return [2 /*return*/, undefined];
                                                case 4:
                                                    // subscribe to all topics for this client
                                                    // store topic-client mapping
                                                    topics.forEach(function (topic) {
                                                        if (client.isConnected()) {
                                                            client.subscribe(topic);
                                                            _this._topicClient.set(topic, client);
                                                        }
                                                    });
                                                    return [2 /*return*/, client];
                                            }
                                        });
                                    });
                                }))];
                        case 1:
                            // reconnect everything we have in the map
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); })();
            return function () {
                logger.debug('Unsubscribing from topic(s)', targetTopics.join(','));
                targetTopics.forEach(function (t) {
                    var client = _this._topicClient.get(t);
                    if (client && client.isConnected()) {
                        client.unsubscribe(t);
                        _this._topicClient.delete(t);
                        if (!Array.from(_this._topicClient.values()).some(function (c) { return c === client; })) {
                            _this.disconnect(client.clientId);
                        }
                    }
                    _this._topicObservers.delete(t);
                });
            };
        });
        return zen_observable_ts_1.default.from(result).map(function (value) {
            var topic = _this.getTopicForValue(value);
            var alias = _this._topicAlias.get(topic);
            value.data = Object.entries(value.data).reduce(function (obj, _a) {
                var _b = __read(_a, 2), origKey = _b[0], val = _b[1];
                return ((obj[(alias || origKey)] = val), obj);
            }, {});
            return value;
        });
    };
    return AWSAppSyncProvider;
}(MqttOverWSProvider_1.MqttOverWSProvider));
exports.AWSAppSyncProvider = AWSAppSyncProvider;
//# sourceMappingURL=AWSAppSyncProvider.js.map