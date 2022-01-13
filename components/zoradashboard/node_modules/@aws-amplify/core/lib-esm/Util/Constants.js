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
// Logging constants
var AWS_CLOUDWATCH_BASE_BUFFER_SIZE = 26;
var AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE = 1048576;
var AWS_CLOUDWATCH_MAX_EVENT_SIZE = 256000;
var AWS_CLOUDWATCH_CATEGORY = 'Logging';
var AWS_CLOUDWATCH_PROVIDER_NAME = 'AWSCloudWatch';
var NO_CREDS_ERROR_STRING = 'No credentials';
var RETRY_ERROR_CODES = [
    'ResourceNotFoundException',
    'InvalidSequenceTokenException',
];
export { AWS_CLOUDWATCH_BASE_BUFFER_SIZE, AWS_CLOUDWATCH_CATEGORY, AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE, AWS_CLOUDWATCH_MAX_EVENT_SIZE, AWS_CLOUDWATCH_PROVIDER_NAME, NO_CREDS_ERROR_STRING, RETRY_ERROR_CODES, };
//# sourceMappingURL=Constants.js.map