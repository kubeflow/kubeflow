import { __extends } from "tslib";
import { DeleteLexiconInput, DeleteLexiconOutput } from "../models/models_0";
import { deserializeAws_restJson1DeleteLexiconCommand, serializeAws_restJson1DeleteLexiconCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified pronunciation lexicon stored in an AWS Region. A lexicon which
 *       has been deleted is not available for speech synthesis, nor is it possible to retrieve it
 *       using either the <code>GetLexicon</code> or <code>ListLexicon</code> APIs.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
var DeleteLexiconCommand = /** @class */ (function (_super) {
    __extends(DeleteLexiconCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteLexiconCommand(input) {
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
    DeleteLexiconCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PollyClient";
        var commandName = "DeleteLexiconCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteLexiconInput.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteLexiconOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteLexiconCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1DeleteLexiconCommand(input, context);
    };
    DeleteLexiconCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1DeleteLexiconCommand(output, context);
    };
    return DeleteLexiconCommand;
}($Command));
export { DeleteLexiconCommand };
//# sourceMappingURL=DeleteLexiconCommand.js.map