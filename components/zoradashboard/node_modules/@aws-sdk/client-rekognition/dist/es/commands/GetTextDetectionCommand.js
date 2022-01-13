import { __extends } from "tslib";
import { GetTextDetectionRequest, GetTextDetectionResponse } from "../models/models_0";
import { deserializeAws_json1_1GetTextDetectionCommand, serializeAws_json1_1GetTextDetectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets the text detection results of a Amazon Rekognition Video analysis started by <a>StartTextDetection</a>.</p>
 *          <p>Text detection with Amazon Rekognition Video is an asynchronous operation. You start text detection by
 *      calling <a>StartTextDetection</a> which returns a job identifier (<code>JobId</code>)
 *      When the text detection operation finishes, Amazon Rekognition publishes a completion status to the Amazon Simple Notification Service
 *      topic registered in the initial call to <code>StartTextDetection</code>. To get the results
 *      of the text detection operation, first check that the status value published to the Amazon SNS topic is <code>SUCCEEDED</code>.
 *      if so, call <code>GetTextDetection</code> and pass the job identifier (<code>JobId</code>) from the initial call
 *      of <code>StartLabelDetection</code>.</p>
 *          <p>
 *             <code>GetTextDetection</code> returns an array of detected text (<code>TextDetections</code>) sorted by
 *        the time the text was detected, up to 50 words per frame of video.</p>
 *          <p>Each element of the array includes the detected text, the precentage confidence in the acuracy
 *        of the detected text, the time the text was detected, bounding box information for where the text
 *        was located, and unique identifiers for words and their lines.</p>
 *          <p>Use MaxResults parameter to limit the number of text detections returned. If there are more results than
 *      specified in <code>MaxResults</code>, the value of <code>NextToken</code> in the operation response contains
 *      a pagination token for getting the next set of results. To get the next page of results, call <code>GetTextDetection</code>
 *      and populate the <code>NextToken</code> request parameter with the token value returned from the previous
 *      call to <code>GetTextDetection</code>.</p>
 */
var GetTextDetectionCommand = /** @class */ (function (_super) {
    __extends(GetTextDetectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetTextDetectionCommand(input) {
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
    GetTextDetectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "GetTextDetectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetTextDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetTextDetectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetTextDetectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1GetTextDetectionCommand(input, context);
    };
    GetTextDetectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1GetTextDetectionCommand(output, context);
    };
    return GetTextDetectionCommand;
}($Command));
export { GetTextDetectionCommand };
//# sourceMappingURL=GetTextDetectionCommand.js.map