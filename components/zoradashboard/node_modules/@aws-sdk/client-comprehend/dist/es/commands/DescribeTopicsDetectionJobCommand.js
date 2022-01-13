import { __extends } from "tslib";
import { DescribeTopicsDetectionJobRequest, DescribeTopicsDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1DescribeTopicsDetectionJobCommand, serializeAws_json1_1DescribeTopicsDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the properties associated with a topic detection job. Use this operation to get
 *       the status of a detection job.</p>
 */
var DescribeTopicsDetectionJobCommand = /** @class */ (function (_super) {
    __extends(DescribeTopicsDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeTopicsDetectionJobCommand(input) {
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
    DescribeTopicsDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DescribeTopicsDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeTopicsDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeTopicsDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeTopicsDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeTopicsDetectionJobCommand(input, context);
    };
    DescribeTopicsDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeTopicsDetectionJobCommand(output, context);
    };
    return DescribeTopicsDetectionJobCommand;
}($Command));
export { DescribeTopicsDetectionJobCommand };
//# sourceMappingURL=DescribeTopicsDetectionJobCommand.js.map