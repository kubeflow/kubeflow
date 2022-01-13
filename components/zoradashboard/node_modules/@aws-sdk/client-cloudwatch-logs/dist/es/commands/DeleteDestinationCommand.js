import { __extends } from "tslib";
import { DeleteDestinationRequest } from "../models/models_0";
import { deserializeAws_json1_1DeleteDestinationCommand, serializeAws_json1_1DeleteDestinationCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified destination, and eventually disables all the
 *       subscription filters that publish to it. This operation does not delete the
 *       physical resource encapsulated by the destination.</p>
 */
var DeleteDestinationCommand = /** @class */ (function (_super) {
    __extends(DeleteDestinationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteDestinationCommand(input) {
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
    DeleteDestinationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DeleteDestinationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteDestinationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteDestinationCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteDestinationCommand(input, context);
    };
    DeleteDestinationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteDestinationCommand(output, context);
    };
    return DeleteDestinationCommand;
}($Command));
export { DeleteDestinationCommand };
//# sourceMappingURL=DeleteDestinationCommand.js.map