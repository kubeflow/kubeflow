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
var XRError = /** @class */ (function (_super) {
    __extends(XRError, _super);
    function XRError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XRError;
}(Error));
export { XRError };
var XRNoSceneConfiguredError = /** @class */ (function (_super) {
    __extends(XRNoSceneConfiguredError, _super);
    function XRNoSceneConfiguredError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XRNoSceneConfiguredError;
}(XRError));
export { XRNoSceneConfiguredError };
var XRSceneNotFoundError = /** @class */ (function (_super) {
    __extends(XRSceneNotFoundError, _super);
    function XRSceneNotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XRSceneNotFoundError;
}(XRError));
export { XRSceneNotFoundError };
var XRSceneNotLoadedError = /** @class */ (function (_super) {
    __extends(XRSceneNotLoadedError, _super);
    function XRSceneNotLoadedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XRSceneNotLoadedError;
}(XRError));
export { XRSceneNotLoadedError };
var XRNoDomElement = /** @class */ (function (_super) {
    __extends(XRNoDomElement, _super);
    function XRNoDomElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XRNoDomElement;
}(XRError));
export { XRNoDomElement };
var XRSceneLoadFailure = /** @class */ (function (_super) {
    __extends(XRSceneLoadFailure, _super);
    function XRSceneLoadFailure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XRSceneLoadFailure;
}(XRError));
export { XRSceneLoadFailure };
var XRProviderNotConfigured = /** @class */ (function (_super) {
    __extends(XRProviderNotConfigured, _super);
    function XRProviderNotConfigured() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return XRProviderNotConfigured;
}(XRError));
export { XRProviderNotConfigured };
//# sourceMappingURL=Errors.js.map