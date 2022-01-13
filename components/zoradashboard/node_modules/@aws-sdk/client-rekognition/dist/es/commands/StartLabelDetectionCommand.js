import { __extends } from "tslib";
import { StartLabelDetectionRequest, StartLabelDetectionResponse } from "../models/models_0";
import { deserializeAws_json1_1StartLabelDetectionCommand, serializeAws_json1_1StartLabelDetectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts asynchronous detection of labels in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect labels in a video. Labels are instances of real-world entities.
 *        This includes objects like flower, tree, and table; events like
 *        wedding, graduation, and birthday party; concepts like landscape, evening, and nature; and activities
 *        like a person getting out of a car or a person skiing.</p>
 *
 *          <p>The video must be stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *        and the filename of the video.
 *         <code>StartLabelDetection</code> returns a job identifier (<code>JobId</code>) which you use to get the
 *        results of the operation. When label detection is finished, Amazon Rekognition Video publishes a completion status
 *         to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.</p>
 *          <p>To get the results of the label detection operation, first check that the status value published to the Amazon SNS
 *         topic is <code>SUCCEEDED</code>. If so, call  <a>GetLabelDetection</a> and pass the job identifier
 *        (<code>JobId</code>) from the initial call to <code>StartLabelDetection</code>.</p>
 *         <p></p>
 */
var StartLabelDetectionCommand = /** @class */ (function (_super) {
    __extends(StartLabelDetectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartLabelDetectionCommand(input) {
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
    StartLabelDetectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartLabelDetectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartLabelDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartLabelDetectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartLabelDetectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartLabelDetectionCommand(input, context);
    };
    StartLabelDetectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartLabelDetectionCommand(output, context);
    };
    return StartLabelDetectionCommand;
}($Command));
export { StartLabelDetectionCommand };
//# sourceMappingURL=StartLabelDetectionCommand.js.map