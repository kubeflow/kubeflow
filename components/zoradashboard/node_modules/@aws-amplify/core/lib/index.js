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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Amplify_1 = require("./Amplify");
exports.Amplify = Amplify_1.Amplify;
var Platform_1 = require("./Platform");
var Amplify_2 = require("./Amplify");
exports.AmplifyClass = Amplify_2.AmplifyClass;
var ClientDevice_1 = require("./ClientDevice");
exports.ClientDevice = ClientDevice_1.ClientDevice;
var Logger_1 = require("./Logger");
exports.ConsoleLogger = Logger_1.ConsoleLogger;
exports.Logger = Logger_1.ConsoleLogger;
__export(require("./Errors"));
var Hub_1 = require("./Hub");
exports.Hub = Hub_1.Hub;
var I18n_1 = require("./I18n");
exports.I18n = I18n_1.I18n;
__export(require("./JS"));
var Signer_1 = require("./Signer");
exports.Signer = Signer_1.Signer;
__export(require("./Parser"));
__export(require("./Providers"));
var OAuthHelper_1 = require("./OAuthHelper");
exports.FacebookOAuth = OAuthHelper_1.FacebookOAuth;
exports.GoogleOAuth = OAuthHelper_1.GoogleOAuth;
__export(require("./RNComponents"));
var Credentials_1 = require("./Credentials");
exports.Credentials = Credentials_1.Credentials;
exports.CredentialsClass = Credentials_1.CredentialsClass;
var ServiceWorker_1 = require("./ServiceWorker");
exports.ServiceWorker = ServiceWorker_1.ServiceWorker;
var StorageHelper_1 = require("./StorageHelper");
exports.StorageHelper = StorageHelper_1.StorageHelper;
exports.MemoryStorage = StorageHelper_1.MemoryStorage;
var UniversalStorage_1 = require("./UniversalStorage");
exports.UniversalStorage = UniversalStorage_1.UniversalStorage;
var Platform_2 = require("./Platform");
exports.Platform = Platform_2.Platform;
exports.getAmplifyUserAgent = Platform_2.getAmplifyUserAgent;
__export(require("./constants"));
exports.Constants = {
    userAgent: Platform_1.Platform.userAgent,
};
__export(require("./constants"));
__export(require("./Util"));
/**
 * @deprecated use named import
 */
exports.default = Amplify_1.Amplify;
//# sourceMappingURL=index.js.map