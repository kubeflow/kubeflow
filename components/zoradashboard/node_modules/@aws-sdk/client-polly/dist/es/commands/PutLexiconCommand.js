import { __extends } from "tslib";
import { PutLexiconInput, PutLexiconOutput } from "../models/models_0";
import { deserializeAws_restJson1PutLexiconCommand, serializeAws_restJson1PutLexiconCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stores a pronunciation lexicon in an AWS Region. If a lexicon with the same name
 *       already exists in the region, it is overwritten by the new lexicon. Lexicon operations have
 *       eventual consistency, therefore, it might take some time before the lexicon is available to
 *       the SynthesizeSpeech operation.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
var PutLexiconCommand = /** @class */ (function (_super) {
    __extends(PutLexiconCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutLexiconCommand(input) {
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
    PutLexiconCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PollyClient";
        var commandName = "PutLexiconCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutLexiconInput.filterSensitiveLog,
            outputFilterSensitiveLog: PutLexiconOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutLexiconCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1PutLexiconCommand(input, context);
    };
    PutLexiconCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1PutLexiconCommand(output, context);
    };
    return PutLexiconCommand;
}($Command));
export { PutLexiconCommand };
//# sourceMappingURL=PutLexiconCommand.js.map