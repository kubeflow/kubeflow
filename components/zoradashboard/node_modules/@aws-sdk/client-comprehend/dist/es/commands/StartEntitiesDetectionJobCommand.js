import { __extends } from "tslib";
import { StartEntitiesDetectionJobRequest, StartEntitiesDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StartEntitiesDetectionJobCommand, serializeAws_json1_1StartEntitiesDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts an asynchronous entity detection job for a collection of documents. Use the  operation to track the status of a job.</p>
 *          <p>This API can be used for either standard entity detection or custom entity recognition. In
 *       order to be used for custom entity recognition, the optional <code>EntityRecognizerArn</code>
 *       must be used in order to provide access to the recognizer being used to detect the custom
 *       entity.</p>
 */
var StartEntitiesDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StartEntitiesDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartEntitiesDetectionJobCommand(input) {
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
    StartEntitiesDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StartEntitiesDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartEntitiesDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartEntitiesDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartEntitiesDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartEntitiesDetectionJobCommand(input, context);
    };
    StartEntitiesDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartEntitiesDetectionJobCommand(output, context);
    };
    return StartEntitiesDetectionJobCommand;
}($Command));
export { StartEntitiesDetectionJobCommand };
//# sourceMappingURL=StartEntitiesDetectionJobCommand.js.map