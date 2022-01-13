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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = require("./Storage");
exports.StorageClass = Storage_1.Storage;
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('Storage');
var _instance = null;
var getInstance = function () {
    if (_instance) {
        return _instance;
    }
    logger.debug('Create Storage Instance, debug');
    _instance = new Storage_1.Storage();
    _instance.vault = new Storage_1.Storage();
    var old_configure = _instance.configure;
    _instance.configure = function (options) {
        logger.debug('storage configure called');
        var vaultConfig = __assign({}, old_configure.call(_instance, options));
        // set level private for each provider for the vault
        Object.keys(vaultConfig).forEach(function (providerName) {
            if (typeof vaultConfig[providerName] !== 'string') {
                vaultConfig[providerName] = __assign(__assign({}, vaultConfig[providerName]), { level: 'private' });
            }
        });
        logger.debug('storage vault configure called');
        _instance.vault.configure(vaultConfig);
    };
    return _instance;
};
exports.Storage = getInstance();
core_1.Amplify.register(exports.Storage);
/**
 * @deprecated use named import
 */
exports.default = exports.Storage;
__export(require("./providers"));
//# sourceMappingURL=index.js.map