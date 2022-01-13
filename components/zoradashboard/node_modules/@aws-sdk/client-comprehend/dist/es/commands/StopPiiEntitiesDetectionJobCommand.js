import { __extends } from "tslib";
import { StopPiiEntitiesDetectionJobRequest, StopPiiEntitiesDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StopPiiEntitiesDetectionJobCommand, serializeAws_json1_1StopPiiEntitiesDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops a PII entities detection job in progress.</p>
 */
var StopPiiEntitiesDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StopPiiEntitiesDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopPiiEntitiesDetectionJobCommand(input) {
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
    StopPiiEntitiesDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StopPiiEntitiesDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopPiiEntitiesDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopPiiEntitiesDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopPiiEntitiesDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopPiiEntitiesDetectionJobCommand(input, context);
    };
    StopPiiEntitiesDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopPiiEntitiesDetectionJobCommand(output, context);
    };
    return StopPiiEntitiesDetectionJobCommand;
}($Command));
export { StopPiiEntitiesDetectionJobCommand };
//# sourceMappingURL=StopPiiEntitiesDetectionJobCommand.js.map