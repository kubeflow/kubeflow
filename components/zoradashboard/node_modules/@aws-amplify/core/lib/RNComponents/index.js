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
var JS_1 = require("../JS");
var StorageHelper_1 = require("../StorageHelper");
exports.Linking = {};
exports.AppState = {
    addEventListener: function (action, handler) { return undefined; },
};
// if not in react native, just use local storage
exports.AsyncStorage = JS_1.browserOrNode().isBrowser
    ? new StorageHelper_1.StorageHelper().getStorage()
    : undefined;
//# sourceMappingURL=index.js.map