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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var Paho = __importStar(require("paho-mqtt"));
var uuid_1 = require("uuid");
var zen_observable_ts_1 = __importDefault(require("zen-observable-ts"));
var PubSubProvider_1 = require("./PubSubProvider");
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('MqttOverWSProvider');
function mqttTopicMatch(filter, topic) {
    var filterArray = filter.split('/');
    var length = filterArray.length;
    var topicArray = topic.split('/');
    for (var i = 0; i < length; ++i) {
        var left = filterArray[i];
        var right = topicArray[i];
        if (left === '#')
            return topicArray.length >= length;
        if (left !== '+' && left !== right)
            return false;
    }
    return length === topicArray.length;
}
exports.mqttTopicMatch = mqttTopicMatch;
var ClientsQueue = /** @class */ (function () {
    function ClientsQueue() {
        this.promises = new Map();
    }
    ClientsQueue.prototype.get = function (clientId, clientFactory) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                promise = this.promises.get(clientId);
                if (promise) {
                    return [2 /*return*/, promise];
                }
                promise = clientFactory(clientId);
                this.promises.set(clientId, promise);
                return [2 /*return*/, promise];
            });
        });
    };
    Object.defineProperty(ClientsQueue.prototype, "allClients", {
        get: function () {
            return Array.from(this.promises.keys());
        },
        enumerable: true,
        configurable: true
    });
    ClientsQueue.prototype.remove = function (clientId) {
        this.promises.delete(clientId);
    };
    return ClientsQueue;
}());
var topicSymbol = typeof Symbol !== 'undefined' ? Symbol('topic') : '@@topic';
var MqttOverWSProvider = /** @class */ (function (_super) {
    __extends(MqttOverWSProvider, _super);
    function MqttOverWSProvider(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, __assign(__assign({}, options), { clientId: options.clientId || uuid_1.v4() })) || this;
        _this._clientsQueue = new ClientsQueue();
        _this._topicObservers = new Map();
        _this._clientIdObservers = new Map();
        return _this;
    }
    Object.defineProperty(MqttOverWSProvider.prototype, "clientId", {
        get: function () {
            return this.options.clientId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MqttOverWSProvider.prototype, "endpoint", {
        get: function () {
            return this.options.aws_pubsub_endpoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MqttOverWSProvider.prototype, "clientsQueue", {
        get: function () {
            return this._clientsQueue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MqttOverWSProvider.prototype, "isSSLEnabled", {
        get: function () {
            return !this.options
                .aws_appsync_dangerously_connect_to_http_endpoint_for_testing;
        },
        enumerable: true,
        configurable: true
    });
    MqttOverWSProvider.prototype.getTopicForValue = function (value) {
        return typeof value === 'object' && value[topicSymbol];
    };
    MqttOverWSProvider.prototype.getProviderName = function () {
        return 'MqttOverWSProvider';
    };
    MqttOverWSProvider.prototype.onDisconnect = function (_a) {
        var _this = this;
        var clientId = _a.clientId, errorCode = _a.errorCode, args = __rest(_a, ["clientId", "errorCode"]);
        if (errorCode !== 0) {
            logger.warn(clientId, JSON.stringify(__assign({ errorCode: errorCode }, args), null, 2));
            var topicsToDelete_1 = [];
            var clientIdObservers = this._clientIdObservers.get(clientId);
            if (!clientIdObservers) {
                return;
            }
            clientIdObservers.forEach(function (observer) {
                observer.error('Disconnected, error code: ' + errorCode);
                // removing observers for disconnected clientId
                _this._topicObservers.forEach(function (observerForTopic, observerTopic) {
                    observerForTopic.delete(observer);
                    if (observerForTopic.size === 0) {
                        topicsToDelete_1.push(observerTopic);
                    }
                });
            });
            // forgiving any trace of clientId
            this._clientIdObservers.delete(clientId);
            // Removing topics that are not listen by an observer
            topicsToDelete_1.forEach(function (topic) {
                _this._topicObservers.delete(topic);
            });
        }
    };
    MqttOverWSProvider.prototype.newClient = function (_a) {
        var url = _a.url, clientId = _a.clientId;
        return __awaiter(this, void 0, void 0, function () {
            var client;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.debug('Creating new MQTT client', clientId);
                        client = new Paho.Client(url, clientId);
                        // client.trace = (args) => logger.debug(clientId, JSON.stringify(args, null, 2));
                        client.onMessageArrived = function (_a) {
                            var topic = _a.destinationName, msg = _a.payloadString;
                            _this._onMessage(topic, msg);
                        };
                        client.onConnectionLost = function (_a) {
                            var errorCode = _a.errorCode, args = __rest(_a, ["errorCode"]);
                            _this.onDisconnect(__assign({ clientId: clientId, errorCode: errorCode }, args));
                        };
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                client.connect({
                                    useSSL: _this.isSSLEnabled,
                                    mqttVersion: 3,
                                    onSuccess: function () { return resolve(client); },
                                    onFailure: reject,
                                });
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, client];
                }
            });
        });
    };
    MqttOverWSProvider.prototype.connect = function (clientId, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientsQueue.get(clientId, function (clientId) {
                            return _this.newClient(__assign(__assign({}, options), { clientId: clientId }));
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MqttOverWSProvider.prototype.disconnect = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clientsQueue.get(clientId, function () { return null; })];
                    case 1:
                        client = _a.sent();
                        if (client && client.isConnected()) {
                            client.disconnect();
                        }
                        this.clientsQueue.remove(clientId);
                        return [2 /*return*/];
                }
            });
        });
    };
    MqttOverWSProvider.prototype.publish = function (topics, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var targetTopics, message, url, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetTopics = [].concat(topics);
                        message = JSON.stringify(msg);
                        return [4 /*yield*/, this.endpoint];
                    case 1:
                        url = _a.sent();
                        return [4 /*yield*/, this.connect(this.clientId, { url: url })];
                    case 2:
                        client = _a.sent();
                        logger.debug('Publishing to topic(s)', targetTopics.join(','), message);
                        targetTopics.forEach(function (topic) { return client.send(topic, message); });
                        return [2 /*return*/];
                }
            });
        });
    };
    MqttOverWSProvider.prototype._onMessage = function (topic, msg) {
        try {
            var matchedTopicObservers_1 = [];
            this._topicObservers.forEach(function (observerForTopic, observerTopic) {
                if (mqttTopicMatch(observerTopic, topic)) {
                    matchedTopicObservers_1.push(observerForTopic);
                }
            });
            var parsedMessage_1 = JSON.parse(msg);
            if (typeof parsedMessage_1 === 'object') {
                parsedMessage_1[topicSymbol] = topic;
            }
            matchedTopicObservers_1.forEach(function (observersForTopic) {
                observersForTopic.forEach(function (observer) { return observer.next(parsedMessage_1); });
            });
        }
        catch (error) {
            logger.warn('Error handling message', error, msg);
        }
    };
    MqttOverWSProvider.prototype.subscribe = function (topics, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var targetTopics = [].concat(topics);
        logger.debug('Subscribing to topic(s)', targetTopics.join(','));
        return new zen_observable_ts_1.default(function (observer) {
            targetTopics.forEach(function (topic) {
                // this._topicObservers is used to notify the observers according to the topic received on the message
                var observersForTopic = _this._topicObservers.get(topic);
                if (!observersForTopic) {
                    observersForTopic = new Set();
                    _this._topicObservers.set(topic, observersForTopic);
                }
                observersForTopic.add(observer);
            });
            // @ts-ignore
            var client;
            var _a = options.clientId, clientId = _a === void 0 ? _this.clientId : _a;
            // this._clientIdObservers is used to close observers when client gets disconnected
            var observersForClientId = _this._clientIdObservers.get(clientId);
            if (!observersForClientId) {
                observersForClientId = new Set();
            }
            observersForClientId.add(observer);
            _this._clientIdObservers.set(clientId, observersForClientId);
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, url, _b, e_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = options.url;
                            if (!(_a === void 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.endpoint];
                        case 1:
                            _b = _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _b = _a;
                            _c.label = 3;
                        case 3:
                            url = _b;
                            _c.label = 4;
                        case 4:
                            _c.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.connect(clientId, { url: url })];
                        case 5:
                            client = _c.sent();
                            targetTopics.forEach(function (topic) {
                                client.subscribe(topic);
                            });
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _c.sent();
                            observer.error(e_1);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            }); })();
            return function () {
                logger.debug('Unsubscribing from topic(s)', targetTopics.join(','));
                if (client) {
                    _this._clientIdObservers.get(clientId).delete(observer);
                    // No more observers per client => client not needed anymore
                    if (_this._clientIdObservers.get(clientId).size === 0) {
                        _this.disconnect(clientId);
                        _this._clientIdObservers.delete(clientId);
                    }
                    targetTopics.forEach(function (topic) {
                        var observersForTopic = _this._topicObservers.get(topic) ||
                            new Set();
                        observersForTopic.delete(observer);
                        // if no observers exists for the topic, topic should be removed
                        if (observersForTopic.size === 0) {
                            _this._topicObservers.delete(topic);
                            if (client.isConnected()) {
                                client.unsubscribe(topic);
                            }
                        }
                    });
                }
                return null;
            };
        });
    };
    return MqttOverWSProvider;
}(PubSubProvider_1.AbstractPubSubProvider));
exports.MqttOverWSProvider = MqttOverWSProvider;
//# sourceMappingURL=MqttOverWSProvider.js.map