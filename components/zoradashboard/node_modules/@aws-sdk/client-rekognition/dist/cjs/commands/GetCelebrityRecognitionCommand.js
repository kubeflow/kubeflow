"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCelebrityRecognitionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the celebrity recognition results for a Amazon Rekognition Video analysis started by
 *      <a>StartCelebrityRecognition</a>.</p>
 *          <p>Celebrity recognition in a video is an asynchronous operation. Analysis is started by a call
 *       to <a>StartCelebrityRecognition</a>  which returns a job identifier (<code>JobId</code>).
 *       When the celebrity recognition operation finishes, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service
 *       topic registered in the initial call to <code>StartCelebrityRecognition</code>.
 *       To get the results of the celebrity recognition analysis, first check that the status value published to the Amazon SNS
 *       topic is <code>SUCCEEDED</code>. If so, call  <code>GetCelebrityDetection</code> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartCelebrityDetection</code>. </p>
 *
 *          <p>For more information, see Working With Stored Videos in the Amazon Rekognition Developer Guide.</p>
 *          <p>
 *             <code>GetCelebrityRecognition</code> returns detected celebrities and the time(s) they are detected in an array
 *       (<code>Celebrities</code>) of <a>CelebrityRecognition</a>
 *
 *       objects. Each <code>CelebrityRecognition</code> contains information about the celebrity in a <a>CelebrityDetail</a>
 *       object and the time, <code>Timestamp</code>, the celebrity was detected.
 *       </p>
 *          <note>
 *
 *             <p>
 *                <code>GetCelebrityRecognition</code> only returns the default
 *         facial attributes (<code>BoundingBox</code>, <code>Confidence</code>,
 *         <code>Landmarks</code>, <code>Pose</code>, and <code>Quality</code>). The other facial attributes listed
 *         in the <code>Face</code> object of the following response syntax are not returned. For more information,
 *         see FaceDetail in the Amazon Rekognition Developer Guide. </p>
 *          </note>
 *          <p>By default, the <code>Celebrities</code> array is sorted by time (milliseconds from the start of the video).
 *       You can also sort the array by celebrity by specifying the value <code>ID</code> in the <code>SortBy</code> input parameter.</p>
 *          <p>The <code>CelebrityDetail</code> object includes the celebrity identifer and additional information urls. If you don't store
 *       the additional information urls, you can get them later by calling <a>GetCelebrityInfo</a> with the celebrity identifer.</p>
 *          <p>No information is returned for faces not recognized as celebrities.</p>
 *          <p>Use MaxResults parameter to limit the number of labels returned. If there are more results than
 *       specified in <code>MaxResults</code>, the value of <code>NextToken</code> in the operation response contains a
 *       pagination token for getting the next set of results. To get the next page of results, call <code>GetCelebrityDetection</code>
 *       and populate the <code>NextToken</code> request parameter with the token
 *       value returned from the previous call to <code>GetCelebrityRecognition</code>.</p>
 */
class GetCelebrityRecognitionCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "RekognitionClient";
        const commandName = "GetCelebrityRecognitionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetCelebrityRecognitionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetCelebrityRecognitionResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetCelebrityRecognitionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetCelebrityRecognitionCommand(output, context);
    }
}
exports.GetCelebrityRecognitionCommand = GetCelebrityRecognitionCommand;
//# sourceMappingURL=GetCelebrityRecognitionCommand.js.map