import { __extends } from "tslib";
import { SynthesizeSpeechInput, SynthesizeSpeechOutput } from "../models/models_0";
import { deserializeAws_restJson1SynthesizeSpeechCommand, serializeAws_restJson1SynthesizeSpeechCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Synthesizes UTF-8 input, plain text or SSML, to a stream of bytes. SSML input must be
 *       valid, well-formed SSML. Some alphabets might not be available with all the voices (for
 *       example, Cyrillic might not be read at all by English voices) unless phoneme mapping is used.
 *       For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/how-text-to-speech-works.html">How it
 *         Works</a>.</p>
 */
var SynthesizeSpeechCommand = /** @class */ (function (_super) {
    __extends(SynthesizeSpeechCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SynthesizeSpeechCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    SynthesizeSpeechCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PollyClient";
        var commandName = "SynthesizeSpeechCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SynthesizeSpeechInput.filterSensitiveLog,
            outputFilterSensitiveLog: SynthesizeSpeechOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SynthesizeSpeechCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SynthesizeSpeechCommand(input, context);
    };
    SynthesizeSpeechCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SynthesizeSpeechCommand(output, context);
    };
    return SynthesizeSpeechCommand;
}($Command));
export { SynthesizeSpeechCommand };
//# sourceMappingURL=SynthesizeSpeechCommand.js.map