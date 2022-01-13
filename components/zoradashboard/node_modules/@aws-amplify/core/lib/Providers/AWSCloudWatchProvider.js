"use strict";
/*
 * Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
var __1 = require("../..");
var Logger_1 = require("../Logger");
var Platform_1 = require("../Platform");
var Parser_1 = require("../Parser");
var Constants_1 = require("../Util/Constants");
var logger = new Logger_1.ConsoleLogger('AWSCloudWatch');
var AWSCloudWatchProvider = /** @class */ (function () {
    function AWSCloudWatchProvider(config) {
        this.configure(config);
        this._dataTracker = {
            eventUploadInProgress: false,
            logEvents: [],
        };
        this._currentLogBatch = [];
        this._initiateLogPushInterval();
    }
    AWSCloudWatchProvider.prototype.getProviderName = function () {
        return AWSCloudWatchProvider.PROVIDER_NAME;
    };
    AWSCloudWatchProvider.prototype.getCategoryName = function () {
        return AWSCloudWatchProvider.CATEGORY;
    };
    AWSCloudWatchProvider.prototype.getLogQueue = function () {
        return this._dataTracker.logEvents;
    };
    AWSCloudWatchProvider.prototype.configure = function (config) {
        if (!config)
            return this._config || {};
        var conf = Object.assign({}, this._config, Parser_1.parseMobileHubConfig(config).Logging, config);
        this._config = conf;
        return this._config;
    };
    AWSCloudWatchProvider.prototype.createLogGroup = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, credentialsOK, client, output, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('creating new log group in CloudWatch - ', params.logGroupName);
                        cmd = new client_cloudwatch_logs_1.CreateLogGroupCommand(params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._ensureCredentials()];
                    case 2:
                        credentialsOK = _a.sent();
                        if (!credentialsOK) {
                            logger.error(Constants_1.NO_CREDS_ERROR_STRING);
                            throw Error;
                        }
                        client = this._initCloudWatchLogs();
                        return [4 /*yield*/, client.send(cmd)];
                    case 3:
                        output = _a.sent();
                        return [2 /*return*/, output];
                    case 4:
                        error_1 = _a.sent();
                        logger.error("error creating log group - " + error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype.getLogGroups = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, credentialsOK, client, output, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('getting list of log groups');
                        cmd = new client_cloudwatch_logs_1.DescribeLogGroupsCommand(params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._ensureCredentials()];
                    case 2:
                        credentialsOK = _a.sent();
                        if (!credentialsOK) {
                            logger.error(Constants_1.NO_CREDS_ERROR_STRING);
                            throw Error;
                        }
                        client = this._initCloudWatchLogs();
                        return [4 /*yield*/, client.send(cmd)];
                    case 3:
                        output = _a.sent();
                        return [2 /*return*/, output];
                    case 4:
                        error_2 = _a.sent();
                        logger.error("error getting log group - " + error_2);
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype.createLogStream = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, credentialsOK, client, output, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('creating new log stream in CloudWatch - ', params.logStreamName);
                        cmd = new client_cloudwatch_logs_1.CreateLogStreamCommand(params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._ensureCredentials()];
                    case 2:
                        credentialsOK = _a.sent();
                        if (!credentialsOK) {
                            logger.error(Constants_1.NO_CREDS_ERROR_STRING);
                            throw Error;
                        }
                        client = this._initCloudWatchLogs();
                        return [4 /*yield*/, client.send(cmd)];
                    case 3:
                        output = _a.sent();
                        return [2 /*return*/, output];
                    case 4:
                        error_3 = _a.sent();
                        logger.error("error creating log stream - " + error_3);
                        throw error_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype.getLogStreams = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, credentialsOK, client, output, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('getting list of log streams');
                        cmd = new client_cloudwatch_logs_1.DescribeLogStreamsCommand(params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._ensureCredentials()];
                    case 2:
                        credentialsOK = _a.sent();
                        if (!credentialsOK) {
                            logger.error(Constants_1.NO_CREDS_ERROR_STRING);
                            throw Error;
                        }
                        client = this._initCloudWatchLogs();
                        return [4 /*yield*/, client.send(cmd)];
                    case 3:
                        output = _a.sent();
                        return [2 /*return*/, output];
                    case 4:
                        error_4 = _a.sent();
                        logger.error("error getting log stream - " + error_4);
                        throw error_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype.getLogEvents = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, credentialsOK, client, output, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('getting log events from stream - ', params.logStreamName);
                        cmd = new client_cloudwatch_logs_1.GetLogEventsCommand(params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._ensureCredentials()];
                    case 2:
                        credentialsOK = _a.sent();
                        if (!credentialsOK) {
                            logger.error(Constants_1.NO_CREDS_ERROR_STRING);
                            throw Error;
                        }
                        client = this._initCloudWatchLogs();
                        return [4 /*yield*/, client.send(cmd)];
                    case 3:
                        output = _a.sent();
                        return [2 /*return*/, output];
                    case 4:
                        error_5 = _a.sent();
                        logger.error("error getting log events - " + error_5);
                        throw error_5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype.pushLogs = function (logs) {
        logger.debug('pushing log events to Cloudwatch...');
        this._dataTracker.logEvents = __spread(this._dataTracker.logEvents, logs);
    };
    AWSCloudWatchProvider.prototype._validateLogGroupExistsAndCreate = function (logGroupName) {
        return __awaiter(this, void 0, void 0, function () {
            var credentialsOK, currGroups, foundGroups, err_1, errString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._dataTracker.verifiedLogGroup) {
                            return [2 /*return*/, this._dataTracker.verifiedLogGroup];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this._ensureCredentials()];
                    case 2:
                        credentialsOK = _a.sent();
                        if (!credentialsOK) {
                            logger.error(Constants_1.NO_CREDS_ERROR_STRING);
                            throw Error;
                        }
                        return [4 /*yield*/, this.getLogGroups({
                                logGroupNamePrefix: logGroupName,
                            })];
                    case 3:
                        currGroups = _a.sent();
                        if (!(typeof currGroups === 'string') && currGroups.logGroups) {
                            foundGroups = currGroups.logGroups.filter(function (group) { return group.logGroupName === logGroupName; });
                            if (foundGroups.length > 0) {
                                this._dataTracker.verifiedLogGroup = foundGroups[0];
                                return [2 /*return*/, foundGroups[0]];
                            }
                        }
                        /**
                         * If we get to this point, it means that the specified log group does not exist
                         * and we should create it.
                         */
                        return [4 /*yield*/, this.createLogGroup({ logGroupName: logGroupName })];
                    case 4:
                        /**
                         * If we get to this point, it means that the specified log group does not exist
                         * and we should create it.
                         */
                        _a.sent();
                        return [2 /*return*/, null];
                    case 5:
                        err_1 = _a.sent();
                        errString = "failure during log group search: " + err_1;
                        logger.error(errString);
                        throw err_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype._validateLogStreamExists = function (logGroupName, logStreamName) {
        return __awaiter(this, void 0, void 0, function () {
            var credentialsOK, currStreams, foundStreams, err_2, errString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this._ensureCredentials()];
                    case 1:
                        credentialsOK = _a.sent();
                        if (!credentialsOK) {
                            logger.error(Constants_1.NO_CREDS_ERROR_STRING);
                            throw Error;
                        }
                        return [4 /*yield*/, this.getLogStreams({
                                logGroupName: logGroupName,
                                logStreamNamePrefix: logStreamName,
                            })];
                    case 2:
                        currStreams = _a.sent();
                        if (currStreams.logStreams) {
                            foundStreams = currStreams.logStreams.filter(function (stream) { return stream.logStreamName === logStreamName; });
                            if (foundStreams.length > 0) {
                                this._nextSequenceToken = foundStreams[0].uploadSequenceToken;
                                return [2 /*return*/, foundStreams[0]];
                            }
                        }
                        /**
                         * If we get to this point, it means that the specified stream does not
                         * exist, and we should create it now.
                         */
                        return [4 /*yield*/, this.createLogStream({
                                logGroupName: logGroupName,
                                logStreamName: logStreamName,
                            })];
                    case 3:
                        /**
                         * If we get to this point, it means that the specified stream does not
                         * exist, and we should create it now.
                         */
                        _a.sent();
                        return [2 /*return*/, null];
                    case 4:
                        err_2 = _a.sent();
                        errString = "failure during log stream search: " + err_2;
                        logger.error(errString);
                        throw err_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype._sendLogEvents = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var credentialsOK, cmd, client, output, err_3, errString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._ensureCredentials()];
                    case 1:
                        credentialsOK = _a.sent();
                        if (!credentialsOK) {
                            logger.error(Constants_1.NO_CREDS_ERROR_STRING);
                            throw Error;
                        }
                        logger.debug('sending log events to stream - ', params.logStreamName);
                        cmd = new client_cloudwatch_logs_1.PutLogEventsCommand(params);
                        client = this._initCloudWatchLogs();
                        return [4 /*yield*/, client.send(cmd)];
                    case 2:
                        output = _a.sent();
                        return [2 /*return*/, output];
                    case 3:
                        err_3 = _a.sent();
                        errString = "failure during log push: " + err_3;
                        logger.error(errString);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype._initCloudWatchLogs = function () {
        return new client_cloudwatch_logs_1.CloudWatchLogsClient({
            region: this._config.region,
            credentials: this._config.credentials,
            customUserAgent: Platform_1.getAmplifyUserAgent(),
            endpoint: this._config.endpoint,
        });
    };
    AWSCloudWatchProvider.prototype._ensureCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __1.Credentials.get()
                            .then(function (credentials) {
                            if (!credentials)
                                return false;
                            var cred = __1.Credentials.shear(credentials);
                            logger.debug('set credentials for logging', cred);
                            _this._config.credentials = cred;
                            return true;
                        })
                            .catch(function (error) {
                            logger.warn('ensure credentials error', error);
                            return false;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype._getNextSequenceToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var logStream, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._nextSequenceToken && this._nextSequenceToken.length > 0) {
                            return [2 /*return*/, this._nextSequenceToken];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this._validateLogGroupExistsAndCreate(this._config.logGroupName)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._validateLogStreamExists(this._config.logGroupName, this._config.logStreamName)];
                    case 3:
                        logStream = _a.sent();
                        if (!logStream) {
                            this._nextSequenceToken = '';
                            return [2 /*return*/, ''];
                        }
                        this._nextSequenceToken = logStream.uploadSequenceToken || '';
                        return [2 /*return*/, this._nextSequenceToken];
                    case 4:
                        err_4 = _a.sent();
                        logger.error("failure while getting next sequence token: " + err_4);
                        throw err_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype._safeUploadLogEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var seqToken, logBatch, putLogsPayload, sendLogEventsResponse, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._getNextSequenceToken()];
                    case 1:
                        seqToken = _a.sent();
                        logBatch = this._currentLogBatch.length === 0
                            ? this._getBufferedBatchOfLogs()
                            : this._currentLogBatch;
                        putLogsPayload = {
                            logGroupName: this._config.logGroupName,
                            logStreamName: this._config.logStreamName,
                            logEvents: logBatch,
                            sequenceToken: seqToken,
                        };
                        this._dataTracker.eventUploadInProgress = true;
                        return [4 /*yield*/, this._sendLogEvents(putLogsPayload)];
                    case 2:
                        sendLogEventsResponse = _a.sent();
                        this._nextSequenceToken = sendLogEventsResponse.nextSequenceToken;
                        this._dataTracker.eventUploadInProgress = false;
                        this._currentLogBatch = [];
                        return [2 /*return*/, sendLogEventsResponse];
                    case 3:
                        err_5 = _a.sent();
                        logger.error("error during _safeUploadLogEvents: " + err_5);
                        if (Constants_1.RETRY_ERROR_CODES.includes(err_5.name)) {
                            this._getNewSequenceTokenAndSubmit({
                                logEvents: this._currentLogBatch,
                                logGroupName: this._config.logGroupName,
                                logStreamName: this._config.logStreamName,
                            });
                        }
                        else {
                            this._dataTracker.eventUploadInProgress = false;
                            throw err_5;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype._getBufferedBatchOfLogs = function () {
        /**
         * CloudWatch has restrictions on the size of the log events that get sent up.
         * We need to track both the size of each event and the total size of the batch
         * of logs.
         *
         * We also need to ensure that the logs in the batch are sorted in chronological order.
         * https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html
         */
        var currentEventIdx = 0;
        var totalByteSize = 0;
        while (currentEventIdx < this._dataTracker.logEvents.length) {
            var currentEvent = this._dataTracker.logEvents[currentEventIdx];
            var eventSize = currentEvent
                ? new TextEncoder().encode(currentEvent.message).length +
                    Constants_1.AWS_CLOUDWATCH_BASE_BUFFER_SIZE
                : 0;
            if (eventSize > Constants_1.AWS_CLOUDWATCH_MAX_EVENT_SIZE) {
                var errString = "Log entry exceeds maximum size for CloudWatch logs. Log size: " + eventSize + ". Truncating log message.";
                logger.warn(errString);
                currentEvent.message = currentEvent.message.substring(0, eventSize);
            }
            if (totalByteSize + eventSize > Constants_1.AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE)
                break;
            totalByteSize += eventSize;
            currentEventIdx++;
        }
        this._currentLogBatch = this._dataTracker.logEvents.splice(0, currentEventIdx);
        return this._currentLogBatch;
    };
    AWSCloudWatchProvider.prototype._getNewSequenceTokenAndSubmit = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var seqToken, sendLogEventsRepsonse, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this._nextSequenceToken = '';
                        this._dataTracker.eventUploadInProgress = true;
                        return [4 /*yield*/, this._getNextSequenceToken()];
                    case 1:
                        seqToken = _a.sent();
                        payload.sequenceToken = seqToken;
                        return [4 /*yield*/, this._sendLogEvents(payload)];
                    case 2:
                        sendLogEventsRepsonse = _a.sent();
                        this._dataTracker.eventUploadInProgress = false;
                        this._currentLogBatch = [];
                        return [2 /*return*/, sendLogEventsRepsonse];
                    case 3:
                        err_6 = _a.sent();
                        logger.error("error when retrying log submission with new sequence token: " + err_6);
                        this._dataTracker.eventUploadInProgress = false;
                        throw err_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AWSCloudWatchProvider.prototype._initiateLogPushInterval = function () {
        var _this = this;
        if (this._timer) {
            clearInterval(this._timer);
        }
        this._timer = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this._getDocUploadPermissibility()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._safeUploadLogEvents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        err_7 = _a.sent();
                        logger.error("error when calling _safeUploadLogEvents in the timer interval - " + err_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, 2000);
    };
    AWSCloudWatchProvider.prototype._getDocUploadPermissibility = function () {
        return ((this._dataTracker.logEvents.length !== 0 ||
            this._currentLogBatch.length !== 0) &&
            !this._dataTracker.eventUploadInProgress);
    };
    AWSCloudWatchProvider.PROVIDER_NAME = Constants_1.AWS_CLOUDWATCH_PROVIDER_NAME;
    AWSCloudWatchProvider.CATEGORY = Constants_1.AWS_CLOUDWATCH_CATEGORY;
    return AWSCloudWatchProvider;
}());
exports.AWSCloudWatchProvider = AWSCloudWatchProvider;
//# sourceMappingURL=AWSCloudWatchProvider.js.map