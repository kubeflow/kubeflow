import { __extends } from "tslib";
import { StartCelebrityRecognitionRequest, StartCelebrityRecognitionResponse } from "../models/models_0";
import { deserializeAws_json1_1StartCelebrityRecognitionCommand, serializeAws_json1_1StartCelebrityRecognitionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts asynchronous recognition of celebrities in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect celebrities in a video must be stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *       and the filename of the video.
 *       <code>StartCelebrityRecognition</code>
 *       returns a job identifier (<code>JobId</code>) which you use to get the results of the analysis.
 *       When celebrity recognition analysis is finished, Amazon Rekognition Video publishes a completion status
 *       to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.
 *       To get the results of the celebrity recognition analysis, first check that the status value published to the Amazon SNS
 *       topic is <code>SUCCEEDED</code>. If so, call  <a>GetCelebrityRecognition</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartCelebrityRecognition</code>. </p>
 *
 *          <p>For more information, see Recognizing Celebrities in the Amazon Rekognition Developer Guide.</p>
 */
var StartCelebrityRecognitionCommand = /** @class */ (function (_super) {
    __extends(StartCelebrityRecognitionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartCelebrityRecognitionCommand(input) {
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
    StartCelebrityRecognitionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartCelebrityRecognitionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartCelebrityRecognitionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartCelebrityRecognitionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartCelebrityRecognitionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartCelebrityRecognitionCommand(input, context);
    };
    StartCelebrityRecognitionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartCelebrityRecognitionCommand(output, context);
    };
    return StartCelebrityRecognitionCommand;
}($Command));
export { StartCelebrityRecognitionCommand };
//# sourceMappingURL=StartCelebrityRecognitionCommand.js.map