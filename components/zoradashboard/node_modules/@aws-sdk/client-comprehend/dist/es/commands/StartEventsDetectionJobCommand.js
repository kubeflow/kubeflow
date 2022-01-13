import { __extends } from "tslib";
import { StartEventsDetectionJobRequest, StartEventsDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StartEventsDetectionJobCommand, serializeAws_json1_1StartEventsDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts an asynchronous event detection job for a collection of documents.</p>
 */
var StartEventsDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StartEventsDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartEventsDetectionJobCommand(input) {
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
    StartEventsDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StartEventsDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartEventsDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartEventsDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartEventsDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartEventsDetectionJobCommand(input, context);
    };
    StartEventsDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartEventsDetectionJobCommand(output, context);
    };
    return StartEventsDetectionJobCommand;
}($Command));
export { StartEventsDetectionJobCommand };
//# sourceMappingURL=StartEventsDetectionJobCommand.js.map