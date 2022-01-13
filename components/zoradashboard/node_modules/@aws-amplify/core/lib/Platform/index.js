"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var version_1 = require("./version");
var BASE_USER_AGENT = "aws-amplify/" + version_1.version;
exports.Platform = {
    userAgent: BASE_USER_AGENT + " js",
    product: '',
    navigator: null,
    isReactNative: false,
};
if (typeof navigator !== 'undefined' && navigator.product) {
    exports.Platform.product = navigator.product || '';
    exports.Platform.navigator = navigator || null;
    switch (navigator.product) {
        case 'ReactNative':
            exports.Platform.userAgent = BASE_USER_AGENT + " react-native";
            exports.Platform.isReactNative = true;
            break;
        default:
            exports.Platform.userAgent = BASE_USER_AGENT + " js";
            exports.Platform.isReactNative = false;
            break;
    }
}
exports.getAmplifyUserAgent = function () {
    return exports.Platform.userAgent;
};
/**
 * @deprecated use named import
 */
exports.default = exports.Platform;
//# sourceMappingURL=index.js.map