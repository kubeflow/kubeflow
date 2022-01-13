import { __extends } from "tslib";
import { StartTextDetectionRequest, StartTextDetectionResponse } from "../models/models_0";
import { deserializeAws_json1_1StartTextDetectionCommand, serializeAws_json1_1StartTextDetectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts asynchronous detection of text in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect text in a video stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name and
 *        the filename of the video. <code>StartTextDetection</code> returns a job identifier (<code>JobId</code>) which you use to get
 *        the results of the operation. When text detection is finished, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service topic
 *        that you specify in <code>NotificationChannel</code>.</p>
 *          <p>To get the results of the text detection operation, first check that the status value published to the Amazon SNS
 *        topic is <code>SUCCEEDED</code>. if so, call <a>GetTextDetection</a> and pass the job identifier (<code>JobId</code>)
 *        from the initial call to <code>StartTextDetection</code>. </p>
 */
var StartTextDetectionCommand = /** @class */ (function (_super) {
    __extends(StartTextDetectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartTextDetectionCommand(input) {
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
    StartTextDetectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartTextDetectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartTextDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartTextDetectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartTextDetectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartTextDetectionCommand(input, context);
    };
    StartTextDetectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartTextDetectionCommand(output, context);
    };
    return StartTextDetectionCommand;
}($Command));
export { StartTextDetectionCommand };
//# sourceMappingURL=StartTextDetectionCommand.js.map