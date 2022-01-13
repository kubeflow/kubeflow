import { __extends } from "tslib";
import { StartProjectVersionRequest, StartProjectVersionResponse } from "../models/models_0";
import { deserializeAws_json1_1StartProjectVersionCommand, serializeAws_json1_1StartProjectVersionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts the running of the version of a model. Starting a model takes a while
 *       to complete. To check the current state of the model, use <a>DescribeProjectVersions</a>.</p>
 *          <p>Once the model is running, you can detect custom labels in new images by calling
 *          <a>DetectCustomLabels</a>.</p>
 *          <note>
 *             <p>You are charged for the amount of time that the model is running. To stop a running
 *       model, call <a>StopProjectVersion</a>.</p>
 *          </note>
 *          <p>This operation requires permissions to perform the
 *          <code>rekognition:StartProjectVersion</code> action.</p>
 */
var StartProjectVersionCommand = /** @class */ (function (_super) {
    __extends(StartProjectVersionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartProjectVersionCommand(input) {
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
    StartProjectVersionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartProjectVersionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartProjectVersionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartProjectVersionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartProjectVersionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartProjectVersionCommand(input, context);
    };
    StartProjectVersionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartProjectVersionCommand(output, context);
    };
    return StartProjectVersionCommand;
}($Command));
export { StartProjectVersionCommand };
//# sourceMappingURL=StartProjectVersionCommand.js.map