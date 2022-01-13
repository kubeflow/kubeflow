import { __extends } from "tslib";
import { StartPiiEntitiesDetectionJobRequest, StartPiiEntitiesDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StartPiiEntitiesDetectionJobCommand, serializeAws_json1_1StartPiiEntitiesDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts an asynchronous PII entity detection job for a collection of documents.</p>
 */
var StartPiiEntitiesDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StartPiiEntitiesDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartPiiEntitiesDetectionJobCommand(input) {
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
    StartPiiEntitiesDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StartPiiEntitiesDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartPiiEntitiesDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartPiiEntitiesDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartPiiEntitiesDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartPiiEntitiesDetectionJobCommand(input, context);
    };
    StartPiiEntitiesDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartPiiEntitiesDetectionJobCommand(output, context);
    };
    return StartPiiEntitiesDetectionJobCommand;
}($Command));
export { StartPiiEntitiesDetectionJobCommand };
//# sourceMappingURL=StartPiiEntitiesDetectionJobCommand.js.map