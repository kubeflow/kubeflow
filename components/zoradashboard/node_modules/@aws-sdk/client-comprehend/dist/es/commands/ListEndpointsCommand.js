import { __extends } from "tslib";
import { ListEndpointsRequest, ListEndpointsResponse } from "../models/models_0";
import { deserializeAws_json1_1ListEndpointsCommand, serializeAws_json1_1ListEndpointsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a list of all existing endpoints that you've created.</p>
 */
var ListEndpointsCommand = /** @class */ (function (_super) {
    __extends(ListEndpointsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListEndpointsCommand(input) {
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
    ListEndpointsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "ListEndpointsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListEndpointsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListEndpointsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListEndpointsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListEndpointsCommand(input, context);
    };
    ListEndpointsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListEndpointsCommand(output, context);
    };
    return ListEndpointsCommand;
}($Command));
export { ListEndpointsCommand };
//# sourceMappingURL=ListEndpointsCommand.js.map