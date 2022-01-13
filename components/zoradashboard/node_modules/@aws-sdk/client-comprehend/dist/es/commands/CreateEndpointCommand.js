import { __extends } from "tslib";
import { CreateEndpointRequest, CreateEndpointResponse } from "../models/models_0";
import { deserializeAws_json1_1CreateEndpointCommand, serializeAws_json1_1CreateEndpointCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a model-specific endpoint for synchronous inference for a previously trained
 *       custom model
 *       </p>
 */
var CreateEndpointCommand = /** @class */ (function (_super) {
    __extends(CreateEndpointCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateEndpointCommand(input) {
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
    CreateEndpointCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "CreateEndpointCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateEndpointRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateEndpointResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateEndpointCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateEndpointCommand(input, context);
    };
    CreateEndpointCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateEndpointCommand(output, context);
    };
    return CreateEndpointCommand;
}($Command));
export { CreateEndpointCommand };
//# sourceMappingURL=CreateEndpointCommand.js.map