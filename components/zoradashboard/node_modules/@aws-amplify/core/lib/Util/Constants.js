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
Object.defineProperty(exports, "__esModule", { value: true });
// Logging constants
var AWS_CLOUDWATCH_BASE_BUFFER_SIZE = 26;
exports.AWS_CLOUDWATCH_BASE_BUFFER_SIZE = AWS_CLOUDWATCH_BASE_BUFFER_SIZE;
var AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE = 1048576;
exports.AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE = AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE;
var AWS_CLOUDWATCH_MAX_EVENT_SIZE = 256000;
exports.AWS_CLOUDWATCH_MAX_EVENT_SIZE = AWS_CLOUDWATCH_MAX_EVENT_SIZE;
var AWS_CLOUDWATCH_CATEGORY = 'Logging';
exports.AWS_CLOUDWATCH_CATEGORY = AWS_CLOUDWATCH_CATEGORY;
var AWS_CLOUDWATCH_PROVIDER_NAME = 'AWSCloudWatch';
exports.AWS_CLOUDWATCH_PROVIDER_NAME = AWS_CLOUDWATCH_PROVIDER_NAME;
var NO_CREDS_ERROR_STRING = 'No credentials';
exports.NO_CREDS_ERROR_STRING = NO_CREDS_ERROR_STRING;
var RETRY_ERROR_CODES = [
    'ResourceNotFoundException',
    'InvalidSequenceTokenException',
];
exports.RETRY_ERROR_CODES = RETRY_ERROR_CODES;
//# sourceMappingURL=Constants.js.map