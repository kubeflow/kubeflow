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
var browser_1 = require("./browser");
var ClientDevice = /** @class */ (function () {
    function ClientDevice() {
    }
    ClientDevice.clientInfo = function () {
        return browser_1.clientInfo();
    };
    ClientDevice.dimension = function () {
        return browser_1.dimension();
    };
    return ClientDevice;
}());
exports.ClientDevice = ClientDevice;
/**
 * @deprecated use named import
 */
exports.default = ClientDevice;
//# sourceMappingURL=index.js.map