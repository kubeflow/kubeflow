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
var ios_1 = require("./ios");
var android_1 = require("./android");
var OS = react_native_1.Platform.OS;
var ClientDevice = /** @class */ (function () {
    function ClientDevice() {
    }
    ClientDevice.clientInfo = function () {
        if (OS === 'ios') {
            return ios_1.clientInfo();
        }
        else {
            return android_1.clientInfo();
        }
    };
    return ClientDevice;
}());
exports.ClientDevice = ClientDevice;
/**
 * @deprecated use named import
 */
exports.default = ClientDevice;
//# sourceMappingURL=reactnative.js.map