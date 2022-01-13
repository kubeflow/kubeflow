import { __extends } from "tslib";
import { StartContentModerationRequest, StartContentModerationResponse } from "../models/models_0";
import { deserializeAws_json1_1StartContentModerationCommand, serializeAws_json1_1StartContentModerationCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p> Starts asynchronous detection of unsafe content in a stored video.</p>
 *          <p>Amazon Rekognition Video can moderate content in a video stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *       and the filename of the video. <code>StartContentModeration</code>
 *         returns a job identifier (<code>JobId</code>) which you use to get the results of the analysis.
 *         When unsafe content analysis is finished, Amazon Rekognition Video publishes a completion status
 *         to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.</p>
 *         <p>To get the results of the unsafe content analysis, first check that the status value published to the Amazon SNS
 *         topic is <code>SUCCEEDED</code>. If so, call <a>GetContentModeration</a> and pass the job identifier
 *         (<code>JobId</code>) from the initial call to <code>StartContentModeration</code>. </p>
 *
 *          <p>For more information, see Detecting Unsafe Content in the Amazon Rekognition Developer Guide.</p>
 */
var StartContentModerationCommand = /** @class */ (function (_super) {
    __extends(StartContentModerationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartContentModerationCommand(input) {
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
    StartContentModerationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartContentModerationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartContentModerationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartContentModerationResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartContentModerationCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartContentModerationCommand(input, context);
    };
    StartContentModerationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartContentModerationCommand(output, context);
    };
    return StartContentModerationCommand;
}($Command));
export { StartContentModerationCommand };
//# sourceMappingURL=StartContentModerationCommand.js.map