import { __extends } from "tslib";
import { DescribeEventsDetectionJobRequest, DescribeEventsDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeEventsDetectionJobCommand, serializeAws_json1_1DescribeEventsDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the status and details of an events detection job.</p>
 */
var DescribeEventsDetectionJobCommand = /** @class */ (function (_super) {
    __extends(DescribeEventsDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeEventsDetectionJobCommand(input) {
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
    DescribeEventsDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DescribeEventsDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeEventsDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeEventsDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeEventsDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeEventsDetectionJobCommand(input, context);
    };
    DescribeEventsDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeEventsDetectionJobCommand(output, context);
    };
    return DescribeEventsDetectionJobCommand;
}($Command));
export { DescribeEventsDetectionJobCommand };
//# sourceMappingURL=DescribeEventsDetectionJobCommand.js.map