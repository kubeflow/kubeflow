import { __extends } from "tslib";
import { DeleteMetricFilterRequest } from "../models/models_0";
import { deserializeAws_json1_1DeleteMetricFilterCommand, serializeAws_json1_1DeleteMetricFilterCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified metric filter.</p>
 */
var DeleteMetricFilterCommand = /** @class */ (function (_super) {
    __extends(DeleteMetricFilterCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteMetricFilterCommand(input) {
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
    DeleteMetricFilterCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DeleteMetricFilterCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteMetricFilterRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteMetricFilterCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteMetricFilterCommand(input, context);
    };
    DeleteMetricFilterCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteMetricFilterCommand(output, context);
    };
    return DeleteMetricFilterCommand;
}($Command));
export { DeleteMetricFilterCommand };
//# sourceMappingURL=DeleteMetricFilterCommand.js.map