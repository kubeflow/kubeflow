import { ConsoleLogger as Logger } from '@aws-amplify/core';
var logger = new Logger('Amplify');
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
export { AbstractPredictionsProvider };
//# sourceMappingURL=AbstractPredictionsProvider.js.map