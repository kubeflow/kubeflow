/*
 * Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { ConsoleLogger as Logger, Credentials, JS, getAmplifyUserAgent, } from '@aws-amplify/core';
import { PersonalizeEventsClient, PutEventsCommand, } from '@aws-sdk/client-personalize-events';
import { SessionInfoManager, MediaAutoTrack, } from './AmazonPersonalizeHelper';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
var logger = new Logger('AmazonPersonalizeProvider');
// events buffer
var FLUSH_SIZE = 5;
var FLUSH_SIZE_THRESHHOLD = 10;
var FLUSH_INTERVAL = 5 * 1000; // 5s
var IDENTIFY_EVENT = 'Identify';
var AmazonPersonalizeProvider = /** @class */ (function () {
    function AmazonPersonalizeProvider(config) {
        this._buffer = [];
        this._config = config ? config : {};
        this._config.flushSize =
            this._config.flushSize > 0 &&
                this._config.flushSize <= FLUSH_SIZE_THRESHHOLD
                ? this._config.flushSize
                : FLUSH_SIZE;
        this._config.flushInterval = this._config.flushInterval || FLUSH_INTERVAL;
        this._sessionManager = new SessionInfoManager();
        if (!isEmpty(this._config.trackingId)) {
            this._sessionInfo = this._sessionManager.retrieveSessionInfo(this._config.trackingId);
        }
        this._isBrowser = JS.browserOrNode().isBrowser;
        // flush event buffer
        this._setupTimer();
    }
    AmazonPersonalizeProvider.prototype._setupTimer = function () {
        if (this._timer) {
            clearInterval(this._timer);
        }
        var flushInterval = this._config.flushInterval;
        var that = this;
        this._timer = setInterval(function () {
            that._sendFromBuffer();
        }, flushInterval);
    };
    /**
     * Record event
     * @param eventType      - type of the event action. e.g. "Click"
     * @param properties     - properties of the event
     * @return Promise
     */
    AmazonPersonalizeProvider.prototype.record = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, eventType, properties, requestParams, isLoaded;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._getCredentials()];
                    case 1:
                        credentials = _b.sent();
                        if (!credentials)
                            return [2 /*return*/, Promise.resolve(false)];
                        Object.assign(params, {
                            config: this._config,
                            credentials: credentials,
                            sentAt: new Date(),
                        });
                        _a = params.event, eventType = _a.eventType, properties = _a.properties;
                        if (eventType === IDENTIFY_EVENT) {
                            this._sessionManager.updateSessionInfo(properties && properties.userId ? properties.userId : '', this._sessionInfo);
                            return [2 /*return*/];
                        }
                        else if (!isEmpty(params.event.userId)) {
                            this._sessionManager.updateSessionInfo(params.event.userId, this._sessionInfo);
                        }
                        requestParams = this.generateRequestParams(params, this._sessionInfo);
                        if (!(eventType === 'MediaAutoTrack')) return [3 /*break*/, 7];
                        if (!this._isBrowser) return [3 /*break*/, 5];
                        if (!!isEmpty(get(requestParams, 'eventData.properties.domElementId', null))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.isElementFullyLoaded(this.loadElement, requestParams.eventData.properties['domElementId'], 500, 5)];
                    case 2:
                        isLoaded = _b.sent();
                        if (isLoaded) {
                            new MediaAutoTrack(requestParams, this);
                        }
                        else {
                            logger.debug('Cannot find the media element.');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        logger.debug("Missing domElementId field in 'properties' for MediaAutoTrack event type.");
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        logger.debug('MediaAutoTrack only for browser');
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                    case 7: return [2 /*return*/, this.putToBuffer(requestParams)];
                }
            });
        });
    };
    AmazonPersonalizeProvider.prototype.loadElement = function (domId) {
        return new Promise(function (resolve, reject) {
            if (document.getElementById(domId) &&
                document.getElementById(domId).clientHeight) {
                return resolve(true);
            }
            else {
                return reject(true);
            }
        });
    };
    AmazonPersonalizeProvider.prototype.isElementFullyLoaded = function (operation, params, delay, times) {
        var _this = this;
        var wait = function (ms) { return new Promise(function (r) { return setTimeout(r, ms); }); };
        return new Promise(function (resolve, reject) {
            return operation(params)
                .then(resolve)
                .catch(function (reason) {
                if (times - 1 > 0) {
                    return wait(delay)
                        .then(_this.isElementFullyLoaded.bind(null, operation, params, delay, times - 1))
                        .then(resolve)
                        .catch(reject);
                }
                return reject(reason);
            });
        });
    };
    /**
     * get the category of the plugin
     */
    AmazonPersonalizeProvider.prototype.getCategory = function () {
        return 'Analytics';
    };
    /**
     * get provider name of the plugin
     */
    AmazonPersonalizeProvider.prototype.getProviderName = function () {
        return 'AmazonPersonalize';
    };
    /**
     * configure the plugin
     * @param {Object} config - configuration
     */
    AmazonPersonalizeProvider.prototype.configure = function (config) {
        logger.debug('configure Analytics', config);
        var conf = config ? config : {};
        this._config = Object.assign({}, this._config, conf);
        if (!isEmpty(this._config.trackingId)) {
            this._sessionInfo = this._sessionManager.retrieveSessionInfo(this._config.trackingId);
        }
        this._setupTimer();
        return this._config;
    };
    /**
     * Generate the requestParams from customer input params and sessionInfo
     * @private
     * @param eventData      - customer input for event data
     * @param api            - api name
     * @return RequestParams - wrapper object with all information required for make request
     */
    AmazonPersonalizeProvider.prototype.generateRequestParams = function (params, sessionInfo) {
        var requestParams = {};
        var _a = params.event, eventType = _a.eventType, properties = _a.properties;
        requestParams.eventData = { eventType: eventType, properties: properties };
        requestParams.sessionInfo = sessionInfo;
        requestParams.sentAt = params.sentAt;
        requestParams.credentials = params.credentials;
        requestParams.config = params.config;
        return requestParams;
    };
    /**
     * record an event
     * @param {Object} params - the params of an event
     */
    AmazonPersonalizeProvider.prototype._sendEvents = function (group) {
        var groupLen = group.length;
        if (groupLen === 0) {
            logger.debug('events array is empty, directly return');
            return;
        }
        var _a = group[0], config = _a.config, credentials = _a.credentials, sessionInfo = _a.sessionInfo;
        var initClients = this._init(config, credentials);
        if (!initClients)
            return false;
        if (groupLen > 0) {
            var events = [];
            for (var i = 0; i < groupLen; i += 1) {
                var params = group.shift();
                var eventPayload = this._generateSingleRecordPayload(params, sessionInfo);
                events.push(eventPayload);
            }
            var payload_1 = {};
            payload_1.trackingId = sessionInfo.trackingId;
            payload_1.sessionId = sessionInfo.sessionId;
            payload_1.userId = sessionInfo.userId;
            payload_1.eventList = [];
            events.forEach(function (event) {
                // @ts-ignore
                payload_1.eventList.push(event);
            });
            var command = new PutEventsCommand(payload_1);
            this._personalize.send(command, function (err) {
                if (err)
                    logger.debug('Failed to call putEvents in Personalize', err);
                else
                    logger.debug('Put events');
            });
        }
    };
    /**
     * Put event into buffer
     * @private
     * @param params - params for the event recording
     */
    AmazonPersonalizeProvider.prototype.putToBuffer = function (params) {
        if (this._buffer.length < this._config.flushSize) {
            this._buffer.push(params);
        }
        else {
            this._buffer.push(params);
            this._sendFromBuffer();
        }
        return Promise.resolve(true);
    };
    /**
     * flush the buffer and batch sending the request
     * @private
     * @param eventsParams - the buffer for cache the payload
     */
    AmazonPersonalizeProvider.prototype._sendFromBuffer = function () {
        var _this = this;
        var size = this._buffer.length;
        if (size <= 0)
            return;
        var eventsGroups = [];
        var preCred = null;
        var group = [];
        for (var i = 0; i < size; i += 1) {
            var currRequestParams = this._buffer.shift();
            var cred = currRequestParams.credentials;
            var sessionInfo = currRequestParams.sessionInfo;
            if (i === 0) {
                group.push(currRequestParams);
                preCred = cred;
            }
            else {
                if (isEqual(sessionInfo, this._sessionInfo) &&
                    cred.sessionToken === preCred.sessionToken &&
                    cred.identityId === preCred.identityId) {
                    logger.debug('no change for cred, put event in the same group');
                    group.push(currRequestParams);
                }
                else {
                    eventsGroups.push(group);
                    group = [];
                    group.push(currRequestParams);
                    preCred = cred;
                    this._sessionInfo = sessionInfo;
                }
            }
        }
        eventsGroups.push(group);
        eventsGroups.map(function (group) {
            _this._sendEvents(group);
        });
    };
    /**
     * Generate the record payload for single event
     * @private
     * @param params - RequestParams
     */
    AmazonPersonalizeProvider.prototype._generateSingleRecordPayload = function (params, sessionInfo) {
        var eventData = params.eventData, sentAt = params.sentAt;
        var trackPayload = {};
        trackPayload.sentAt = sentAt;
        trackPayload.properties =
            eventData.properties && JSON.stringify(eventData.properties);
        trackPayload.eventId =
            this._sessionManager.getTimerKey() + sessionInfo.sessionId;
        trackPayload.eventType = eventData.eventType;
        return trackPayload;
    };
    /**
     * Initialize the personalize client
     * @private
     * @param params - RequestParams
     */
    AmazonPersonalizeProvider.prototype._init = function (config, credentials) {
        logger.debug('init clients');
        if (this._personalize &&
            this._config.credentials &&
            this._config.credentials.sessionToken === credentials.sessionToken &&
            this._config.credentials.identityId === credentials.identityId) {
            logger.debug('no change for analytics config, directly return from init');
            return true;
        }
        this._config.credentials = credentials;
        var region = config.region;
        logger.debug('initialize personalize with credentials', credentials);
        this._personalize = new PersonalizeEventsClient({
            region: region,
            credentials: credentials,
            customUserAgent: getAmplifyUserAgent(),
        });
        return true;
    };
    /**
     * check if current credentials exists
     * @private
     */
    AmazonPersonalizeProvider.prototype._getCredentials = function () {
        var that = this;
        return Credentials.get()
            .then(function (credentials) {
            if (!credentials)
                return null;
            logger.debug('set credentials for analytics', that._config.credentials);
            return Credentials.shear(credentials);
        })
            .catch(function (err) {
            logger.debug('ensure credentials error', err);
            return null;
        });
    };
    return AmazonPersonalizeProvider;
}());
export { AmazonPersonalizeProvider };
/**
 * @deprecated use named import
 */
export default AmazonPersonalizeProvider;
//# sourceMappingURL=AmazonPersonalizeProvider.js.map