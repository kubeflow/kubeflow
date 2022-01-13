"use strict";
/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('AbstractInteractionsProvider');
var AbstractInteractionsProvider = /** @class */ (function () {
    function AbstractInteractionsProvider(options) {
        if (options === void 0) { options = {}; }
        this._config = options;
    }
    AbstractInteractionsProvider.prototype.configure = function (config) {
        if (config === void 0) { config = {}; }
        this._config = __assign(__assign({}, this._config), config);
        logger.debug("configure " + this.getProviderName(), this._config);
        return this.options;
    };
    AbstractInteractionsProvider.prototype.getCategory = function () {
        return 'Interactions';
    };
    Object.defineProperty(AbstractInteractionsProvider.prototype, "options", {
        get: function () {
            return __assign({}, this._config);
        },
        enumerable: true,
        configurable: true
    });
    return AbstractInteractionsProvider;
}());
exports.AbstractInteractionsProvider = AbstractInteractionsProvider;
//# sourceMappingURL=InteractionsProvider.js.map