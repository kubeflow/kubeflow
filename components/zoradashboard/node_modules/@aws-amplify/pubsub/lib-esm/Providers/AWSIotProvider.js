var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import { MqttOverWSProvider } from './MqttOverWSProvider';
import { Signer, Credentials } from '@aws-amplify/core';
var SERVICE_NAME = 'iotdevicegateway';
var AWSIoTProvider = /** @class */ (function (_super) {
    __extends(AWSIoTProvider, _super);
    function AWSIoTProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AWSIoTProvider.prototype, "region", {
        get: function () {
            return this.options.aws_pubsub_region;
        },
        enumerable: true,
        configurable: true
    });
    AWSIoTProvider.prototype.getProviderName = function () {
        return 'AWSIoTProvider';
    };
    Object.defineProperty(AWSIoTProvider.prototype, "endpoint", {
        get: function () {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var endpoint, serviceInfo, _a, access_key, secret_key, session_token, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            endpoint = this.options.aws_pubsub_endpoint;
                            serviceInfo = {
                                service: SERVICE_NAME,
                                region: this.region,
                            };
                            return [4 /*yield*/, Credentials.get()];
                        case 1:
                            _a = _b.sent(), access_key = _a.accessKeyId, secret_key = _a.secretAccessKey, session_token = _a.sessionToken;
                            result = Signer.signUrl(endpoint, { access_key: access_key, secret_key: secret_key, session_token: session_token }, serviceInfo);
                            return [2 /*return*/, result];
                    }
                });
            }); })();
        },
        enumerable: true,
        configurable: true
    });
    return AWSIoTProvider;
}(MqttOverWSProvider));
export { AWSIoTProvider };
//# sourceMappingURL=AWSIotProvider.js.map