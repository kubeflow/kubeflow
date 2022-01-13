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
var AbstractPredictionsProvider_1 = require("./AbstractPredictionsProvider");
var Predictions_1 = require("../Predictions");
var core_1 = require("@aws-amplify/core");
var logger = new core_1.Logger('AbstractIdentifyPredictionsProvider');
var AbstractIdentifyPredictionsProvider = /** @class */ (function (_super) {
    __extends(AbstractIdentifyPredictionsProvider, _super);
    function AbstractIdentifyPredictionsProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractIdentifyPredictionsProvider.prototype.getCategory = function () {
        return 'Identify';
    };
    AbstractIdentifyPredictionsProvider.prototype.identify = function (input) {
        if (Predictions_1.isIdentifyTextInput(input)) {
            logger.debug('identifyText');
            return this.identifyText(input);
        }
        else if (Predictions_1.isIdentifyLabelsInput(input)) {
            logger.debug('identifyLabels');
            return this.identifyLabels(input);
        }
        else if (Predictions_1.isIdentifyEntitiesInput(input)) {
            logger.debug('identifyEntities');
            return this.identifyEntities(input);
        }
    };
    AbstractIdentifyPredictionsProvider.prototype.identifyText = function (input) {
        throw new Error('identifyText is not implemented by this provider.');
    };
    AbstractIdentifyPredictionsProvider.prototype.identifyLabels = function (input) {
        throw new Error('identifyLabels is not implemented by this provider');
    };
    AbstractIdentifyPredictionsProvider.prototype.identifyEntities = function (input) {
        throw new Error('identifyEntities is not implemented by this provider');
    };
    return AbstractIdentifyPredictionsProvider;
}(AbstractPredictionsProvider_1.AbstractPredictionsProvider));
exports.AbstractIdentifyPredictionsProvider = AbstractIdentifyPredictionsProvider;
//# sourceMappingURL=AbstractIdentifyPredictionsProvider.js.map