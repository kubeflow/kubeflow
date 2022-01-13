import { __extends } from "tslib";
import { StartFaceDetectionRequest, StartFaceDetectionResponse } from "../models/models_0";
import { deserializeAws_json1_1StartFaceDetectionCommand, serializeAws_json1_1StartFaceDetectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts asynchronous detection of faces in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect faces in a video stored in an Amazon S3 bucket.
 *        Use <a>Video</a> to specify the bucket name and the filename of the video.
 *        <code>StartFaceDetection</code> returns a job identifier (<code>JobId</code>) that you
 *        use to get the results of the operation.
 *        When face detection is finished, Amazon Rekognition Video publishes a completion status
 *        to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.
 *        To get the results of the face detection operation, first check that the status value published to the Amazon SNS
 *        topic is <code>SUCCEEDED</code>. If so, call  <a>GetFaceDetection</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartFaceDetection</code>.</p>
 *
 *          <p>For more information, see Detecting Faces in a Stored Video in the
 *      Amazon Rekognition Developer Guide.</p>
 */
var StartFaceDetectionCommand = /** @class */ (function (_super) {
    __extends(StartFaceDetectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartFaceDetectionCommand(input) {
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
    StartFaceDetectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartFaceDetectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartFaceDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartFaceDetectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartFaceDetectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartFaceDetectionCommand(input, context);
    };
    StartFaceDetectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartFaceDetectionCommand(output, context);
    };
    return StartFaceDetectionCommand;
}($Command));
export { StartFaceDetectionCommand };
//# sourceMappingURL=StartFaceDetectionCommand.js.map