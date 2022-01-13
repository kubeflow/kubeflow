import { __extends } from "tslib";
import { StopSentimentDetectionJobRequest, StopSentimentDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StopSentimentDetectionJobCommand, serializeAws_json1_1StopSentimentDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops a sentiment detection job in progress.</p>
 *          <p>If the job state is <code>IN_PROGRESS</code> the job is marked for termination and put
 *       into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped, it
 *       is put into the <code>COMPLETED</code> state; otherwise the job is be stopped and put into the
 *         <code>STOPPED</code> state.</p>
 *          <p>If the job is in the <code>COMPLETED</code> or <code>FAILED</code> state when you call the
 *         <code>StopDominantLanguageDetectionJob</code> operation, the operation returns a 400
 *       Internal Request Exception. </p>
 *          <p>When a job is stopped, any documents already processed are written to the output
 *       location.</p>
 */
var StopSentimentDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StopSentimentDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopSentimentDetectionJobCommand(input) {
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
    StopSentimentDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StopSentimentDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopSentimentDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopSentimentDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopSentimentDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopSentimentDetectionJobCommand(input, context);
    };
    StopSentimentDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopSentimentDetectionJobCommand(output, context);
    };
    return StopSentimentDetectionJobCommand;
}($Command));
export { StopSentimentDetectionJobCommand };
//# sourceMappingURL=StopSentimentDetectionJobCommand.js.map