"use strict";
/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var react_native_1 = require("react-native");
var Logger_1 = require("../Logger");
var logger = new Logger_1.ConsoleLogger('DeviceInfo');
exports.clientInfo = function () {
    var dim = react_native_1.Dimensions.get('screen');
    logger.debug(react_native_1.Platform, dim);
    var OS = 'android';
    var Version = react_native_1.Platform.Version;
    return {
        platform: OS,
        version: String(Version),
        appVersion: [OS, String(Version)].join('/'),
    };
};
//# sourceMappingURL=android.js.map