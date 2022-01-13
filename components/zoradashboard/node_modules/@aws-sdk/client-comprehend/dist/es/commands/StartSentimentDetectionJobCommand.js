import { __extends } from "tslib";
import { StartSentimentDetectionJobRequest, StartSentimentDetectionJobResponse } from "../models/models_0";
import { deserializeAws_json1_1StartSentimentDetectionJobCommand, serializeAws_json1_1StartSentimentDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts an asynchronous sentiment detection job for a collection of documents. use the
 *          operation to track the status of a
 *       job.</p>
 */
var StartSentimentDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StartSentimentDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartSentimentDetectionJobCommand(input) {
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
    StartSentimentDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StartSentimentDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartSentimentDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartSentimentDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartSentimentDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartSentimentDetectionJobCommand(input, context);
    };
    StartSentimentDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartSentimentDetectionJobCommand(output, context);
    };
    return StartSentimentDetectionJobCommand;
}($Command));
export { StartSentimentDetectionJobCommand };
//# sourceMappingURL=StartSentimentDetectionJobCommand.js.map