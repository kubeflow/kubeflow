import { __extends } from "tslib";
import { StartSegmentDetectionRequest, StartSegmentDetectionResponse } from "../models/models_0";
import { deserializeAws_json1_1StartSegmentDetectionCommand, serializeAws_json1_1StartSegmentDetectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts asynchronous detection of segment detection in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect segments in a video stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name and
 *       the filename of the video. <code>StartSegmentDetection</code> returns a job identifier (<code>JobId</code>) which you use to get
 *       the results of the operation. When segment detection is finished, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service topic
 *       that you specify in <code>NotificationChannel</code>.</p>
 *          <p>You can use the <code>Filters</code> (<a>StartSegmentDetectionFilters</a>)
 *       input parameter to specify the minimum detection confidence returned in the response.
 *       Within <code>Filters</code>, use <code>ShotFilter</code> (<a>StartShotDetectionFilter</a>)
 *       to filter detected shots. Use  <code>TechnicalCueFilter</code> (<a>StartTechnicalCueDetectionFilter</a>)
 *       to filter technical cues. </p>
 *          <p>To get the results of the segment detection operation, first check that the status value published to the Amazon SNS
 *       topic is <code>SUCCEEDED</code>. if so, call <a>GetSegmentDetection</a> and pass the job identifier (<code>JobId</code>)
 *       from the initial call to <code>StartSegmentDetection</code>. </p>
 *
 *
 *          <p>For more information, see Detecting Video Segments in Stored Video in the Amazon Rekognition Developer Guide.</p>
 */
var StartSegmentDetectionCommand = /** @class */ (function (_super) {
    __extends(StartSegmentDetectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartSegmentDetectionCommand(input) {
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
    StartSegmentDetectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "StartSegmentDetectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartSegmentDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartSegmentDetectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartSegmentDetectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartSegmentDetectionCommand(input, context);
    };
    StartSegmentDetectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartSegmentDetectionCommand(output, context);
    };
    return StartSegmentDetectionCommand;
}($Command));
export { StartSegmentDetectionCommand };
//# sourceMappingURL=StartSegmentDetectionCommand.js.map