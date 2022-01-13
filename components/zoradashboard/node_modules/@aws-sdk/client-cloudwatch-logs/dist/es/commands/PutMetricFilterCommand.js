import { __extends } from "tslib";
import { PutMetricFilterRequest } from "../models/models_0";
import { deserializeAws_json1_1PutMetricFilterCommand, serializeAws_json1_1PutMetricFilterCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates or updates a metric filter and associates it with the specified log group.
 *       Metric filters allow you to configure rules to extract metric data from log events ingested
 *       through <a href="https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutLogEvents.html">PutLogEvents</a>.</p>
 *          <p>The maximum number of metric filters that can be associated with a log group is
 *       100.</p>
 */
var PutMetricFilterCommand = /** @class */ (function (_super) {
    __extends(PutMetricFilterCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutMetricFilterCommand(input) {
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
    PutMetricFilterCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "PutMetricFilterCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutMetricFilterRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutMetricFilterCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1PutMetricFilterCommand(input, context);
    };
    PutMetricFilterCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1PutMetricFilterCommand(output, context);
    };
    return PutMetricFilterCommand;
}($Command));
export { PutMetricFilterCommand };
//# sourceMappingURL=PutMetricFilterCommand.js.map