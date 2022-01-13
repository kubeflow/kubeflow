import { __extends } from "tslib";
import { DeleteEndpointRequest, DeleteEndpointResponse } from "../models/models_0";
import { deserializeAws_json1_1DeleteEndpointCommand, serializeAws_json1_1DeleteEndpointCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes a model-specific endpoint for a previously-trained custom model. All endpoints
 *       must be deleted in order for the model to be deleted.</p>
 */
var DeleteEndpointCommand = /** @class */ (function (_super) {
    __extends(DeleteEndpointCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteEndpointCommand(input) {
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
    DeleteEndpointCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DeleteEndpointCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteEndpointRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteEndpointResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteEndpointCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteEndpointCommand(input, context);
    };
    DeleteEndpointCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteEndpointCommand(output, context);
    };
    return DeleteEndpointCommand;
}($Command));
export { DeleteEndpointCommand };
//# sourceMappingURL=DeleteEndpointCommand.js.map