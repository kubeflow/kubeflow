import { __extends } from "tslib";
import { StopEventsDetectionJobRequest, StopEventsDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StopEventsDetectionJobCommand, serializeAws_json1_1StopEventsDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops an events detection job in progress.</p>
 */
var StopEventsDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StopEventsDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopEventsDetectionJobCommand(input) {
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
    StopEventsDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StopEventsDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopEventsDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopEventsDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopEventsDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopEventsDetectionJobCommand(input, context);
    };
    StopEventsDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopEventsDetectionJobCommand(output, context);
    };
    return StopEventsDetectionJobCommand;
}($Command));
export { StopEventsDetectionJobCommand };
//# sourceMappingURL=StopEventsDetectionJobCommand.js.map