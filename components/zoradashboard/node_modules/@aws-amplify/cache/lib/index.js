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
var core_1 = require("@aws-amplify/core");
var BrowserStorageCache_1 = require("./BrowserStorageCache");
exports.BrowserStorageCache = BrowserStorageCache_1.BrowserStorageCache;
var InMemoryCache_1 = require("./InMemoryCache");
exports.InMemoryCache = InMemoryCache_1.InMemoryCache;
/**
 * @deprecated use named import
 */
exports.default = BrowserStorageCache_1.BrowserStorageCache;
core_1.Amplify.register(BrowserStorageCache_1.BrowserStorageCache);
//# sourceMappingURL=index.js.map