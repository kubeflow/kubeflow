import { __extends } from "tslib";
import { StartTopicsDetectionJobRequest, StartTopicsDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StartTopicsDetectionJobCommand, serializeAws_json1_1StartTopicsDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts an asynchronous topic detection job. Use the
 *         <code>DescribeTopicDetectionJob</code> operation to track the status of a job.</p>
 */
var StartTopicsDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StartTopicsDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartTopicsDetectionJobCommand(input) {
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
    StartTopicsDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StartTopicsDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartTopicsDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartTopicsDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartTopicsDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartTopicsDetectionJobCommand(input, context);
    };
    StartTopicsDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartTopicsDetectionJobCommand(output, context);
    };
    return StartTopicsDetectionJobCommand;
}($Command));
export { StartTopicsDetectionJobCommand };
//# sourceMappingURL=StartTopicsDetectionJobCommand.js.map