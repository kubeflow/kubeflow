"use strict";
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
var logger = new core_1.ConsoleLogger('AbstractXRProvider');
var AbstractXRProvider = /** @class */ (function () {
    function AbstractXRProvider(options) {
        if (options === void 0) { options = {}; }
        this._config = options;
    }
    AbstractXRProvider.prototype.configure = function (config) {
        if (config === void 0) { config = {}; }
        this._config = __assign(__assign({}, config), this._config);
        logger.debug("configure " + this.getProviderName(), this._config);
        return this.options;
    };
    AbstractXRProvider.prototype.getCategory = function () {
        return 'XR';
    };
    Object.defineProperty(AbstractXRProvider.prototype, "options", {
        get: function () {
            return __assign({}, this._config);
        },
        enumerable: true,
        configurable: true
    });
    return AbstractXRProvider;
}());
exports.AbstractXRProvider = AbstractXRProvider;
//# sourceMappingURL=XRProvider.js.map