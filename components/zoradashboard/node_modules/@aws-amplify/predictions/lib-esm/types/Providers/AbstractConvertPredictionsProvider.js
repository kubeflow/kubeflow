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
import { isTranslateTextInput, isTextToSpeechInput, isSpeechToTextInput, } from '../Predictions';
import { AbstractPredictionsProvider } from './AbstractPredictionsProvider';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
var logger = new Logger('AbstractConvertPredictionsProvider');
var AbstractConvertPredictionsProvider = /** @class */ (function (_super) {
    __extends(AbstractConvertPredictionsProvider, _super);
    function AbstractConvertPredictionsProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractConvertPredictionsProvider.prototype.getCategory = function () {
        return 'Convert';
    };
    AbstractConvertPredictionsProvider.prototype.convert = function (input) {
        if (isTranslateTextInput(input)) {
            logger.debug('translateText');
            return this.translateText(input);
        }
        else if (isTextToSpeechInput(input)) {
            logger.debug('textToSpeech');
            return this.convertTextToSpeech(input);
        }
        else if (isSpeechToTextInput(input)) {
            logger.debug('textToSpeech');
            return this.convertSpeechToText(input);
        }
    };
    AbstractConvertPredictionsProvider.prototype.translateText = function (translateTextInput) {
        throw new Error('convertText is not implemented by this provider');
    };
    AbstractConvertPredictionsProvider.prototype.convertTextToSpeech = function (textToSpeechInput) {
        throw new Error('convertTextToSpeech is not implemented by this provider');
    };
    AbstractConvertPredictionsProvider.prototype.convertSpeechToText = function (speechToTextInput) {
        throw new Error('convertSpeechToText is not implemented by this provider');
    };
    return AbstractConvertPredictionsProvider;
}(AbstractPredictionsProvider));
export { AbstractConvertPredictionsProvider };
//# sourceMappingURL=AbstractConvertPredictionsProvider.js.map