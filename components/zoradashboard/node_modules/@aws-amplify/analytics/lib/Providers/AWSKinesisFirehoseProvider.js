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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var AWSKinesisProvider_1 = require("./AWSKinesisProvider");
var client_firehose_1 = require("@aws-sdk/client-firehose");
var util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
var logger = new core_1.ConsoleLogger('AWSKineisFirehoseProvider');
var AWSKinesisFirehoseProvider = /** @class */ (function (_super) {
    __extends(AWSKinesisFirehoseProvider, _super);
    function AWSKinesisFirehoseProvider(config) {
        return _super.call(this, config) || this;
    }
    /**
     * get provider name of the plugin
     */
    AWSKinesisFirehoseProvider.prototype.getProviderName = function () {
        return 'AWSKinesisFirehose';
    };
    AWSKinesisFirehoseProvider.prototype._sendEvents = function (group) {
        var _this = this;
        if (group.length === 0) {
            return;
        }
        var _a = group[0], config = _a.config, credentials = _a.credentials;
        var initClients = this._init(config, credentials);
        if (!initClients)
            return false;
        var records = {};
        group.map(function (params) {
            // split by streamName
            var evt = params.event;
            var streamName = evt.streamName, data = evt.data;
            if (records[streamName] === undefined) {
                records[streamName] = [];
            }
            var bufferData = data && typeof data !== 'string' ? JSON.stringify(data) : data;
            var Data = util_utf8_browser_1.fromUtf8(bufferData);
            var record = { Data: Data };
            records[streamName].push(record);
        });
        Object.keys(records).map(function (streamName) {
            logger.debug('putting records to kinesis', streamName, 'with records', records[streamName]);
            _this._kinesisFirehose
                .send(new client_firehose_1.PutRecordBatchCommand({
                Records: records[streamName],
                DeliveryStreamName: streamName,
            }))
                .then(function (res) { return logger.debug('Upload records to stream', streamName); })
                .catch(function (err) { return logger.debug('Failed to upload records to Kinesis', err); });
        });
    };
    AWSKinesisFirehoseProvider.prototype._init = function (config, credentials) {
        logger.debug('init clients');
        if (this._kinesisFirehose &&
            this._config.credentials &&
            this._config.credentials.sessionToken === credentials.sessionToken &&
            this._config.credentials.identityId === credentials.identityId) {
            logger.debug('no change for analytics config, directly return from init');
            return true;
        }
        this._config.credentials = credentials;
        var region = config.region;
        return this._initFirehose(region, credentials);
    };
    AWSKinesisFirehoseProvider.prototype._initFirehose = function (region, credentials) {
        logger.debug('initialize kinesis firehose with credentials', credentials);
        this._kinesisFirehose = new client_firehose_1.FirehoseClient({
            apiVersion: '2015-08-04',
            region: region,
            credentials: credentials,
        });
        return true;
    };
    return AWSKinesisFirehoseProvider;
}(AWSKinesisProvider_1.AWSKinesisProvider));
exports.AWSKinesisFirehoseProvider = AWSKinesisFirehoseProvider;
/**
 * @deprecated use named import
 */
exports.default = AWSKinesisFirehoseProvider;
//# sourceMappingURL=AWSKinesisFirehoseProvider.js.map