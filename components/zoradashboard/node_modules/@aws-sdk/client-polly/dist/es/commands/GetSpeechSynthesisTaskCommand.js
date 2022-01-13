import { __extends } from "tslib";
import { GetSpeechSynthesisTaskInput, GetSpeechSynthesisTaskOutput } from "../models/models_0";
import { deserializeAws_restJson1GetSpeechSynthesisTaskCommand, serializeAws_restJson1GetSpeechSynthesisTaskCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Retrieves a specific SpeechSynthesisTask object based on its TaskID. This object contains
 *       information about the given speech synthesis task, including the status of the task, and a
 *       link to the S3 bucket containing the output of the task.</p>
 */
var GetSpeechSynthesisTaskCommand = /** @class */ (function (_super) {
    __extends(GetSpeechSynthesisTaskCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetSpeechSynthesisTaskCommand(input) {
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
    GetSpeechSynthesisTaskCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PollyClient";
        var commandName = "GetSpeechSynthesisTaskCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetSpeechSynthesisTaskInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetSpeechSynthesisTaskOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetSpeechSynthesisTaskCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetSpeechSynthesisTaskCommand(input, context);
    };
    GetSpeechSynthesisTaskCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetSpeechSynthesisTaskCommand(output, context);
    };
    return GetSpeechSynthesisTaskCommand;
}($Command));
export { GetSpeechSynthesisTaskCommand };
//# sourceMappingURL=GetSpeechSynthesisTaskCommand.js.map