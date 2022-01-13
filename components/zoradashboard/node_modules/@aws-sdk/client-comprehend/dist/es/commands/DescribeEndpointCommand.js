import { __extends } from "tslib";
import { DescribeEndpointRequest, DescribeEndpointResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeEndpointCommand, serializeAws_json1_1DescribeEndpointCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the properties associated with a specific endpoint. Use this operation to get the
 *       status of an endpoint.</p>
 */
var DescribeEndpointCommand = /** @class */ (function (_super) {
    __extends(DescribeEndpointCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeEndpointCommand(input) {
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
    DescribeEndpointCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DescribeEndpointCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeEndpointRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeEndpointResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeEndpointCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeEndpointCommand(input, context);
    };
    DescribeEndpointCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeEndpointCommand(output, context);
    };
    return DescribeEndpointCommand;
}($Command));
export { DescribeEndpointCommand };
//# sourceMappingURL=DescribeEndpointCommand.js.map