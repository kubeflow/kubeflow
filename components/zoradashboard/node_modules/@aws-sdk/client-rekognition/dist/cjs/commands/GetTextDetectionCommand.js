"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTextDetectionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class GetTextDetectionCommand extends smithy_client_1.Command {
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
        const commandName = "GetTextDetectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetTextDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetTextDetectionResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetTextDetectionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetTextDetectionCommand(output, context);
    }
}
exports.GetTextDetectionCommand = GetTextDetectionCommand;
//# sourceMappingURL=GetTextDetectionCommand.js.map