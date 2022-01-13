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
    var OS = 'ios';
    var Version = react_native_1.Platform.Version;
    var _a = dimToMake(dim), make = _a.make, model = _a.model;
    return {
        platform: OS,
        version: String(Version),
        appVersion: [OS, String(Version)].join('/'),
        make: make,
        model: model,
    };
};
function dimToMake(dim) {
    var height = dim.height, width = dim.width;
    if (height < width) {
        var tmp = height;
        height = width;
        width = tmp;
    }
    if (width === 320 && height === 568) {
        return { make: 'iPhone', model: 'iPhone 5' };
    }
    if (width === 375 && height === 667) {
        return { make: 'iPhone', model: 'iPhone 6/7/8' };
    }
    if (width === 414 && height === 736) {
        return { make: 'iPhone', model: 'iPhone 6/7/8 plus' };
    }
    if (width === 375 && height === 812) {
        return { make: 'iPhone', model: 'iPhone X' };
    }
    if (width === 414 && height === 896) {
        return { make: 'iPhone', model: 'iPhone XR' };
    }
    if (width === 768 && height === 1024) {
        return { make: 'iPad', model: 'iPad Mini/Air' };
    }
    if (width === 834 && height === 1112) {
        return { make: 'iPad', model: 'iPad Pro' };
    }
    if (width === 1024 && height === 1366) {
        return { make: 'iPad', model: 'iPad Pro' };
    }
    if (width === 272 && height === 340) {
        return { make: 'Watch', model: 'Watch 38mm' };
    }
    if (width === 312 && height === 390) {
        return { make: 'Watch', model: 'Watch 42mm' };
    }
    return { make: null, model: null };
}
//# sourceMappingURL=ios.js.map