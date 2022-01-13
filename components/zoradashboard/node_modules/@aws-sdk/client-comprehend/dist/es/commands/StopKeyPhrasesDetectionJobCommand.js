import { __extends } from "tslib";
import { StopKeyPhrasesDetectionJobRequest, StopKeyPhrasesDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StopKeyPhrasesDetectionJobCommand, serializeAws_json1_1StopKeyPhrasesDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops a key phrases detection job in progress.</p>
 *          <p>If the job state is <code>IN_PROGRESS</code> the job is marked for termination and put
 *       into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped, it
 *       is put into the <code>COMPLETED</code> state; otherwise the job is stopped and put into the
 *         <code>STOPPED</code> state.</p>
 *          <p>If the job is in the <code>COMPLETED</code> or <code>FAILED</code> state when you call the
 *         <code>StopDominantLanguageDetectionJob</code> operation, the operation returns a 400
 *       Internal Request Exception. </p>
 *          <p>When a job is stopped, any documents already processed are written to the output
 *       location.</p>
 */
var StopKeyPhrasesDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StopKeyPhrasesDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopKeyPhrasesDetectionJobCommand(input) {
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
    StopKeyPhrasesDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StopKeyPhrasesDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopKeyPhrasesDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopKeyPhrasesDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopKeyPhrasesDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopKeyPhrasesDetectionJobCommand(input, context);
    };
    StopKeyPhrasesDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopKeyPhrasesDetectionJobCommand(output, context);
    };
    return StopKeyPhrasesDetectionJobCommand;
}($Command));
export { StopKeyPhrasesDetectionJobCommand };
//# sourceMappingURL=StopKeyPhrasesDetectionJobCommand.js.map