"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var core_1 = require("@aws-amplify/core");
exports.default = (function (callback) {
    if (core_1.JS.browserOrNode().isBrowser && window.location) {
        var url = window.location.href;
        callback({ url: url });
    }
    else if (core_1.JS.browserOrNode().isNode) {
        // continue building on ssr
        (function () { }); // noop
    }
    else {
        throw new Error('Not supported');
    }
});
//# sourceMappingURL=urlListener.js.map