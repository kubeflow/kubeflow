import { __extends } from "tslib";
import { GetSegmentDetectionRequest, GetSegmentDetectionResponse } from "../models/models_0";
import { deserializeAws_json1_1GetSegmentDetectionCommand, serializeAws_json1_1GetSegmentDetectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the segment detection results of a Amazon Rekognition Video analysis started by <a>StartSegmentDetection</a>.</p>
 *          <p>Segment detection with Amazon Rekognition Video is an asynchronous operation. You start segment detection by
 *       calling <a>StartSegmentDetection</a> which returns a job identifier (<code>JobId</code>).
 *       When the segment detection operation finishes, Amazon Rekognition publishes a completion status to the Amazon Simple Notification Service
 *       topic registered in the initial call to <code>StartSegmentDetection</code>. To get the results
 *       of the segment detection operation, first check that the status value published to the Amazon SNS topic is <code>SUCCEEDED</code>.
 *       if so, call <code>GetSegmentDetection</code> and pass the job identifier (<code>JobId</code>) from the initial call
 *       of <code>StartSegmentDetection</code>.</p>
 *          <p>
 *             <code>GetSegmentDetection</code> returns detected segments in an array (<code>Segments</code>)
 *       of <a>SegmentDetection</a> objects. <code>Segments</code> is sorted by the segment types
 *       specified in the <code>SegmentTypes</code> input parameter of <code>StartSegmentDetection</code>.
 *     Each element of the array includes the detected segment, the precentage confidence in the acuracy
 *       of the detected segment, the type of the segment, and the frame in which the segment was detected.</p>
 *          <p>Use <code>SelectedSegmentTypes</code> to find out the type of segment detection requested in the
 *     call to <code>StartSegmentDetection</code>.</p>
 *          <p>Use the <code>MaxResults</code> parameter to limit the number of segment detections returned. If there are more results than
 *       specified in <code>MaxResults</code>, the value of <code>NextToken</code> in the operation response contains
 *       a pagination token for getting the next set of results. To get the next page of results, call <code>GetSegmentDetection</code>
 *       and populate the <code>NextToken</code> request parameter with the token value returned from the previous
 *       call to <code>GetSegmentDetection</code>.</p>
 *
 *          <p>For more information, see Detecting Video Segments in Stored Video in the Amazon Rekognition Developer Guide.</p>
 */
var GetSegmentDetectionCommand = /** @class */ (function (_super) {
    __extends(GetSegmentDetectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetSegmentDetectionCommand(input) {
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
    GetSegmentDetectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "GetSegmentDetectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetSegmentDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetSegmentDetectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetSegmentDetectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1GetSegmentDetectionCommand(input, context);
    };
    GetSegmentDetectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1GetSegmentDetectionCommand(output, context);
    };
    return GetSegmentDetectionCommand;
}($Command));
export { GetSegmentDetectionCommand };
//# sourceMappingURL=GetSegmentDetectionCommand.js.map