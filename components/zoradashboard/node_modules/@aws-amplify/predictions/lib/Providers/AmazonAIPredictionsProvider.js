"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Providers_1 = require("../types/Providers");
var AmazonAIConvertPredictionsProvider_1 = require("./AmazonAIConvertPredictionsProvider");
var AmazonAIInterpretPredictionsProvider_1 = require("./AmazonAIInterpretPredictionsProvider");
var AmazonAIIdentifyPredictionsProvider_1 = require("./AmazonAIIdentifyPredictionsProvider");
var AmazonAIPredictionsProvider = /** @class */ (function (_super) {
    __extends(AmazonAIPredictionsProvider, _super);
    function AmazonAIPredictionsProvider() {
        var _this = _super.call(this) || this;
        _this.convertProvider = new AmazonAIConvertPredictionsProvider_1.AmazonAIConvertPredictionsProvider();
        _this.identifyProvider = new AmazonAIIdentifyPredictionsProvider_1.AmazonAIIdentifyPredictionsProvider();
        _this.interpretProvider = new AmazonAIInterpretPredictionsProvider_1.AmazonAIInterpretPredictionsProvider();
        return _this;
    }
    AmazonAIPredictionsProvider.prototype.getCategory = function () {
        return 'Predictions';
    };
    AmazonAIPredictionsProvider.prototype.getProviderName = function () {
        return 'AmazonAIPredictionsProvider';
    };
    AmazonAIPredictionsProvider.prototype.configure = function (config) {
        this.convertProvider.configure(config.convert);
        this.identifyProvider.configure(config.identify);
        this.interpretProvider.configure(config.interpret);
        return config;
    };
    AmazonAIPredictionsProvider.prototype.interpret = function (input) {
        return this.interpretProvider.interpret(input);
    };
    AmazonAIPredictionsProvider.prototype.convert = function (input) {
        return this.convertProvider.convert(input);
    };
    AmazonAIPredictionsProvider.prototype.identify = function (input) {
        return this.identifyProvider.identify(input);
    };
    return AmazonAIPredictionsProvider;
}(Providers_1.AbstractPredictionsProvider));
exports.AmazonAIPredictionsProvider = AmazonAIPredictionsProvider;
/**
 * @deprecated use named import
 */
exports.default = AmazonAIPredictionsProvider;
//# sourceMappingURL=AmazonAIPredictionsProvider.js.map