import { __extends } from "tslib";
import { StopQueryRequest, StopQueryResponse } from "../models/models_0";
import { deserializeAws_json1_1StopQueryCommand, serializeAws_json1_1StopQueryCommand } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops a CloudWatch Logs Insights query that is in progress. If the query has already ended, the operation
 *     returns an error indicating that the specified query is not running.</p>
 */
var StopQueryCommand = /** @class */ (function (_super) {
    __extends(StopQueryCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopQueryCommand(input) {
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
    StopQueryCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "StopQueryCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopQueryRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopQueryResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopQueryCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopQueryCommand(input, context);
    };
    StopQueryCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopQueryCommand(output, context);
    };
    return StopQueryCommand;
}($Command));
export { StopQueryCommand };
//# sourceMappingURL=StopQueryCommand.js.map