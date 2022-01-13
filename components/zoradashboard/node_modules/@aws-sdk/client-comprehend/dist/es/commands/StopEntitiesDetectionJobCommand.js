import { __extends } from "tslib";
import { StopEntitiesDetectionJobRequest, StopEntitiesDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StopEntitiesDetectionJobCommand, serializeAws_json1_1StopEntitiesDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops an entities detection job in progress.</p>
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
var StopEntitiesDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StopEntitiesDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopEntitiesDetectionJobCommand(input) {
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
    StopEntitiesDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StopEntitiesDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopEntitiesDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopEntitiesDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopEntitiesDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopEntitiesDetectionJobCommand(input, context);
    };
    StopEntitiesDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopEntitiesDetectionJobCommand(output, context);
    };
    return StopEntitiesDetectionJobCommand;
}($Command));
export { StopEntitiesDetectionJobCommand };
//# sourceMappingURL=StopEntitiesDetectionJobCommand.js.map