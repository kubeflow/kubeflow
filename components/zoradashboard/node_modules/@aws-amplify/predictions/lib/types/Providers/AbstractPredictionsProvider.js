"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('Amplify');
var AbstractPredictionsProvider = /** @class */ (function () {
    function AbstractPredictionsProvider() {
    }
    AbstractPredictionsProvider.prototype.configure = function (config) {
        logger.debug('configure AbstractPredictionsProvider', { config: config });
        this._config = config;
        return config;
    };
    return AbstractPredictionsProvider;
}());
exports.AbstractPredictionsProvider = AbstractPredictionsProvider;
//# sourceMappingURL=AbstractPredictionsProvider.js.map