import { __extends } from "tslib";
import { StopTrainingEntityRecognizerRequest, StopTrainingEntityRecognizerResponse } from "../models/models_0";
import { deserializeAws_json1_1StopTrainingEntityRecognizerCommand, serializeAws_json1_1StopTrainingEntityRecognizerCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Stops an entity recognizer training job while in progress.</p>
 *          <p>If the training job state is <code>TRAINING</code>, the job is marked for termination and
 *       put into the <code>STOP_REQUESTED</code> state. If the training job completes before it can be
 *       stopped, it is put into the <code>TRAINED</code>; otherwise the training job is stopped and
 *       putted into the <code>STOPPED</code> state and the service sends back an HTTP 200 response
 *       with an empty HTTP body.</p>
 */
var StopTrainingEntityRecognizerCommand = /** @class */ (function (_super) {
    __extends(StopTrainingEntityRecognizerCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StopTrainingEntityRecognizerCommand(input) {
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
    StopTrainingEntityRecognizerCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StopTrainingEntityRecognizerCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StopTrainingEntityRecognizerRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StopTrainingEntityRecognizerResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StopTrainingEntityRecognizerCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StopTrainingEntityRecognizerCommand(input, context);
    };
    StopTrainingEntityRecognizerCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StopTrainingEntityRecognizerCommand(output, context);
    };
    return StopTrainingEntityRecognizerCommand;
}($Command));
export { StopTrainingEntityRecognizerCommand };
//# sourceMappingURL=StopTrainingEntityRecognizerCommand.js.map