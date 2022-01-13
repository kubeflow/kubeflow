import { __extends } from "tslib";
import { GetLexiconInput, GetLexiconOutput } from "../models/models_0";
import { deserializeAws_restJson1GetLexiconCommand, serializeAws_restJson1GetLexiconCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns the content of the specified pronunciation lexicon stored in an AWS Region. For
 *       more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
var GetLexiconCommand = /** @class */ (function (_super) {
    __extends(GetLexiconCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetLexiconCommand(input) {
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
    GetLexiconCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PollyClient";
        var commandName = "GetLexiconCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetLexiconInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetLexiconOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetLexiconCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetLexiconCommand(input, context);
    };
    GetLexiconCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetLexiconCommand(output, context);
    };
    return GetLexiconCommand;
}($Command));
export { GetLexiconCommand };
//# sourceMappingURL=GetLexiconCommand.js.map