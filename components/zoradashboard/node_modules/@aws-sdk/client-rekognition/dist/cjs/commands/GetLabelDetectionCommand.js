"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLabelDetectionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the label detection results of a Amazon Rekognition Video analysis started by <a>StartLabelDetection</a>.  </p>
 *
 *          <p>The label detection operation is started by a call to <a>StartLabelDetection</a>
 *       which returns a job identifier (<code>JobId</code>). When the label detection operation finishes, Amazon Rekognition publishes a completion status to
 *       the Amazon Simple Notification Service topic registered in the initial call to <code>StartlabelDetection</code>. To get the results
 *       of the label detection operation, first check that the status value published to the Amazon SNS topic is <code>SUCCEEDED</code>.
 *       If so, call  <a>GetLabelDetection</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartLabelDetection</code>.</p>
 *          <p>
 *             <code>GetLabelDetection</code> returns an array of detected labels (<code>Labels</code>) sorted by the time
 *        the labels were detected. You can also sort by the label name by specifying <code>NAME</code> for the
 *        <code>SortBy</code> input parameter.</p>
 *          <p>The labels returned include the label name, the percentage confidence in the accuracy of the detected label,
 *         and the time the label was detected in the video.</p>
 *          <p>The returned labels also include bounding box information for common objects, a
 *        hierarchical taxonomy of detected labels, and the version of the label model used for detection.</p>
 *
 *          <p>Use MaxResults parameter to limit the number of labels returned. If there are more results than
 *     specified in <code>MaxResults</code>, the value of <code>NextToken</code> in the operation response contains a pagination token for getting the next set
 *     of results. To get the next page of results, call <code>GetlabelDetection</code> and populate the <code>NextToken</code> request parameter with the token
 *      value returned from the previous call to <code>GetLabelDetection</code>.</p>
 */
class GetLabelDetectionCommand extends smithy_client_1.Command {
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
        const commandName = "GetLabelDetectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetLabelDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetLabelDetectionResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetLabelDetectionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetLabelDetectionCommand(output, context);
    }
}
exports.GetLabelDetectionCommand = GetLabelDetectionCommand;
//# sourceMappingURL=GetLabelDetectionCommand.js.map