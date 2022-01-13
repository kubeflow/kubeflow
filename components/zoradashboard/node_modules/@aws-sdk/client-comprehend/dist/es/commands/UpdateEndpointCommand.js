import { __extends } from "tslib";
import { UpdateEndpointRequest, UpdateEndpointResponse } from "../models/models_0";
import { deserializeAws_json1_1UpdateEndpointCommand, serializeAws_json1_1UpdateEndpointCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Updates information about the specified endpoint.</p>
 */
var UpdateEndpointCommand = /** @class */ (function (_super) {
    __extends(UpdateEndpointCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateEndpointCommand(input) {
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
    UpdateEndpointCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "UpdateEndpointCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateEndpointRequest.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateEndpointResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateEndpointCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1UpdateEndpointCommand(input, context);
    };
    UpdateEndpointCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1UpdateEndpointCommand(output, context);
    };
    return UpdateEndpointCommand;
}($Command));
export { UpdateEndpointCommand };
//# sourceMappingURL=UpdateEndpointCommand.js.map