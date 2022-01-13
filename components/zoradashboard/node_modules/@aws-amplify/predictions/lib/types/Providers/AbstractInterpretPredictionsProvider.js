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
var AbstractInterpretPredictionsProvider = /** @class */ (function (_super) {
    __extends(AbstractInterpretPredictionsProvider, _super);
    function AbstractInterpretPredictionsProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractInterpretPredictionsProvider.prototype.getCategory = function () {
        return 'Interpret';
    };
    AbstractInterpretPredictionsProvider.prototype.interpret = function (input) {
        if (Predictions_1.isInterpretTextInput(input)) {
            return this.interpretText(input);
        }
    };
    AbstractInterpretPredictionsProvider.prototype.interpretText = function (input) {
        throw new Error('interpretText is not implement by this provider');
    };
    return AbstractInterpretPredictionsProvider;
}(AbstractPredictionsProvider_1.AbstractPredictionsProvider));
exports.AbstractInterpretPredictionsProvider = AbstractInterpretPredictionsProvider;
//# sourceMappingURL=AbstractInterpretPredictionsProvider.js.map