import { __extends } from "tslib";
import { StartDominantLanguageDetectionJobRequest, StartDominantLanguageDetectionJobResponse, } from "../models/models_0";
import { deserializeAws_json1_1StartDominantLanguageDetectionJobCommand, serializeAws_json1_1StartDominantLanguageDetectionJobCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts an asynchronous dominant language detection job for a collection of documents. Use
 *       the  operation to track the status
 *       of a job.</p>
 */
var StartDominantLanguageDetectionJobCommand = /** @class */ (function (_super) {
    __extends(StartDominantLanguageDetectionJobCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartDominantLanguageDetectionJobCommand(input) {
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
    StartDominantLanguageDetectionJobCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "StartDominantLanguageDetectionJobCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartDominantLanguageDetectionJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartDominantLanguageDetectionJobResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartDominantLanguageDetectionJobCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartDominantLanguageDetectionJobCommand(input, context);
    };
    StartDominantLanguageDetectionJobCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartDominantLanguageDetectionJobCommand(output, context);
    };
    return StartDominantLanguageDetectionJobCommand;
}($Command));
export { StartDominantLanguageDetectionJobCommand };
//# sourceMappingURL=StartDominantLanguageDetectionJobCommand.js.map