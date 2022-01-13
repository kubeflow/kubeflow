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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { PutEventsCommand, } from '@aws-sdk/client-pinpoint';
import { isAppInForeground } from '../utils/AppUtils';
var logger = new Logger('EventsBuffer');
var RETRYABLE_CODES = [429, 500];
var ACCEPTED_CODES = [202];
var EventsBuffer = /** @class */ (function () {
    function EventsBuffer(client, config) {
        this._pause = false;
        this._flush = false;
        logger.debug('Instantiating buffer with config:', config);
        this._buffer = [];
        this._client = client;
        this._config = config;
        this._sendBatch = this._sendBatch.bind(this);
        this._startLoop();
    }
    EventsBuffer.prototype.push = function (event) {
        var _a;
        if (this._buffer > this._config.bufferSize) {
            logger.debug('Exceeded analytics events buffer size');
            return event.handlers.reject(new Error('Exceeded the size of analytics events buffer'));
        }
        var eventId = event.params.event.eventId;
        var bufferElement = (_a = {}, _a[eventId] = event, _a);
        this._buffer.push(bufferElement);
    };
    EventsBuffer.prototype.pause = function () {
        this._pause = true;
    };
    EventsBuffer.prototype.resume = function () {
        this._pause = false;
    };
    EventsBuffer.prototype.updateClient = function (client) {
        this._client = client;
    };
    EventsBuffer.prototype.flush = function () {
        this._flush = true;
    };
    EventsBuffer.prototype._startLoop = function () {
        if (this._interval) {
            clearInterval(this._interval);
        }
        var flushInterval = this._config.flushInterval;
        this._interval = setInterval(this._sendBatch, flushInterval);
    };
    EventsBuffer.prototype._sendBatch = function () {
        var bufferLength = this._buffer.length;
        if (this._flush && !bufferLength) {
            clearInterval(this._interval);
        }
        // Do not send the batch of events if
        // the Buffer is paused or is empty or the App is not in the foreground
        // Apps should be in the foreground since
        // the OS may restrict access to the network in the background
        if (this._pause || !bufferLength || !isAppInForeground()) {
            return;
        }
        var flushSize = this._config.flushSize;
        var batchSize = Math.min(flushSize, bufferLength);
        var bufferSubset = this._buffer.splice(0, batchSize);
        this._putEvents(bufferSubset);
    };
    EventsBuffer.prototype._putEvents = function (buffer) {
        return __awaiter(this, void 0, void 0, function () {
            var eventMap, batchEventParams, command, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventMap = this._bufferToMap(buffer);
                        batchEventParams = this._generateBatchEventParams(eventMap);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        command = new PutEventsCommand(batchEventParams);
                        return [4 /*yield*/, this._client.send(command)];
                    case 2:
                        data = _a.sent();
                        this._processPutEventsSuccessResponse(data, eventMap);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, this._handlePutEventsFailure(err_1, eventMap)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EventsBuffer.prototype._generateBatchEventParams = function (eventMap) {
        var batchEventParams = {
            ApplicationId: '',
            EventsRequest: {
                BatchItem: {},
            },
        };
        Object.values(eventMap).forEach(function (item) {
            var params = item.params;
            var event = params.event, timestamp = params.timestamp, config = params.config;
            var name = event.name, attributes = event.attributes, metrics = event.metrics, eventId = event.eventId, session = event.session;
            var appId = config.appId, endpointId = config.endpointId;
            var batchItem = batchEventParams.EventsRequest.BatchItem;
            batchEventParams.ApplicationId = batchEventParams.ApplicationId || appId;
            if (!batchItem[endpointId]) {
                batchItem[endpointId] = {
                    Endpoint: {},
                    Events: {},
                };
            }
            batchItem[endpointId].Events[eventId] = {
                EventType: name,
                Timestamp: new Date(timestamp).toISOString(),
                Attributes: attributes,
                Metrics: metrics,
                Session: session,
            };
        });
        return batchEventParams;
    };
    EventsBuffer.prototype._handlePutEventsFailure = function (err, eventMap) {
        logger.debug('_putEvents Failed: ', err);
        var statusCode = err.$metadata && err.$metadata.httpStatusCode;
        if (RETRYABLE_CODES.includes(statusCode)) {
            var retryableEvents = Object.values(eventMap);
            this._retry(retryableEvents);
            return;
        }
    };
    EventsBuffer.prototype._processPutEventsSuccessResponse = function (data, eventMap) {
        var Results = data.EventsResponse.Results;
        var retryableEvents = [];
        Object.entries(Results).forEach(function (_a) {
            var _b = __read(_a, 2), endpointId = _b[0], endpointValues = _b[1];
            var responses = endpointValues.EventsItemResponse;
            Object.entries(responses).forEach(function (_a) {
                var _b, _c;
                var _d = __read(_a, 2), eventId = _d[0], _e = _d[1], StatusCode = _e.StatusCode, Message = _e.Message;
                var eventObject = eventMap[eventId];
                // manually crafting handlers response to keep API consistant
                var response = {
                    EventsResponse: {
                        Results: (_b = {},
                            _b[endpointId] = {
                                EventsItemResponse: (_c = {},
                                    _c[eventId] = { StatusCode: StatusCode, Message: Message },
                                    _c),
                            },
                            _b),
                    },
                };
                if (ACCEPTED_CODES.includes(StatusCode)) {
                    eventObject.handlers.resolve(response);
                    return;
                }
                if (RETRYABLE_CODES.includes(StatusCode)) {
                    retryableEvents.push(eventObject);
                    return;
                }
                var name = eventObject.params.event.name;
                logger.error("event " + eventId + " : " + name + " failed with error: " + Message);
                return eventObject.handlers.reject(response);
            });
        });
        if (retryableEvents.length) {
            this._retry(retryableEvents);
        }
    };
    EventsBuffer.prototype._retry = function (retryableEvents) {
        var _a;
        // retryable events that haven't reached the resendLimit
        var eligibleEvents = [];
        retryableEvents.forEach(function (event) {
            var _a;
            var params = event.params;
            var _b = params.event, eventId = _b.eventId, name = _b.name;
            if (params.resendLimit-- > 0) {
                logger.debug("resending event " + eventId + " : " + name + " with " + params.resendLimit + " retry attempts remaining");
                eligibleEvents.push((_a = {}, _a[eventId] = event, _a));
                return;
            }
            logger.debug("no retry attempts remaining for event " + eventId + " : " + name);
        });
        // add the events to the front of the buffer
        (_a = this._buffer).unshift.apply(_a, __spread(eligibleEvents));
    };
    // convert buffer to map, i.e. { eventId1: { params, handler }, eventId2: { params, handlers } }
    // this allows us to easily access the handlers after receiving a batch response
    EventsBuffer.prototype._bufferToMap = function (buffer) {
        return buffer.reduce(function (acc, curVal) {
            var _a = __read(Object.entries(curVal), 1), _b = __read(_a[0], 2), key = _b[0], value = _b[1];
            acc[key] = value;
            return acc;
        }, {});
    };
    return EventsBuffer;
}());
export default EventsBuffer;
//# sourceMappingURL=EventBuffer.js.map