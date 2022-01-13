import { __extends } from "tslib";
import { DeleteLogStreamRequest } from "../models/models_0";
import { deserializeAws_json1_1DeleteLogStreamCommand, serializeAws_json1_1DeleteLogStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified log stream and permanently deletes all the archived log events associated
 *       with the log stream.</p>
 */
var DeleteLogStreamCommand = /** @class */ (function (_super) {
    __extends(DeleteLogStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteLogStreamCommand(input) {
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
    DeleteLogStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DeleteLogStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteLogStreamRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteLogStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteLogStreamCommand(input, context);
    };
    DeleteLogStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteLogStreamCommand(output, context);
    };
    return DeleteLogStreamCommand;
}($Command));
export { DeleteLogStreamCommand };
//# sourceMappingURL=DeleteLogStreamCommand.js.map