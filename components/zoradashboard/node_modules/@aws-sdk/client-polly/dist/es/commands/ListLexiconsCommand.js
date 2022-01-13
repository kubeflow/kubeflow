import { __extends } from "tslib";
import { ListLexiconsInput, ListLexiconsOutput } from "../models/models_0";
import { deserializeAws_restJson1ListLexiconsCommand, serializeAws_restJson1ListLexiconsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns a list of pronunciation lexicons stored in an AWS Region. For more information,
 *       see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
var ListLexiconsCommand = /** @class */ (function (_super) {
    __extends(ListLexiconsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListLexiconsCommand(input) {
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
    ListLexiconsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PollyClient";
        var commandName = "ListLexiconsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListLexiconsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListLexiconsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListLexiconsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ListLexiconsCommand(input, context);
    };
    ListLexiconsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ListLexiconsCommand(output, context);
    };
    return ListLexiconsCommand;
}($Command));
export { ListLexiconsCommand };
//# sourceMappingURL=ListLexiconsCommand.js.map