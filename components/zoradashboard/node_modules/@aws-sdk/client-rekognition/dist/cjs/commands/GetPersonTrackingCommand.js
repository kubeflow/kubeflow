"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonTrackingCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the path tracking results of a Amazon Rekognition Video analysis started by <a>StartPersonTracking</a>.</p>
 *
 *          <p>The person path tracking operation is started by a call to <code>StartPersonTracking</code>
 *      which returns a job identifier (<code>JobId</code>). When the operation finishes, Amazon Rekognition Video publishes a completion status to
 *      the Amazon Simple Notification Service topic registered in the initial call to <code>StartPersonTracking</code>.</p>
 *          <p>To get the results of the person path tracking operation, first check
 *        that the status value published to the Amazon SNS topic is <code>SUCCEEDED</code>.
 *      If so, call  <a>GetPersonTracking</a> and pass the job identifier
 *      (<code>JobId</code>) from the initial call to <code>StartPersonTracking</code>.</p>
 *          <p>
 *             <code>GetPersonTracking</code> returns an array, <code>Persons</code>, of tracked persons and the time(s) their
 *        paths were tracked in the video. </p>
 *          <note>
 *             <p>
 *                <code>GetPersonTracking</code> only returns the default
 *        facial attributes (<code>BoundingBox</code>, <code>Confidence</code>,
 *        <code>Landmarks</code>, <code>Pose</code>, and <code>Quality</code>). The other facial attributes listed
 *        in the <code>Face</code> object of the following response syntax are not returned. </p>
 *
 *             <p>For more information, see FaceDetail in the Amazon Rekognition Developer Guide.</p>
 *          </note>
 *
 *
 *          <p>By default, the array is sorted by the time(s) a person's path is tracked in the video.
 *       You can sort by tracked persons by specifying <code>INDEX</code> for the <code>SortBy</code> input parameter.</p>
 *
 *          <p>Use the <code>MaxResults</code> parameter to limit the number of items returned. If there are more results than
 *    specified in <code>MaxResults</code>, the value of <code>NextToken</code> in the operation response contains a pagination token for getting the next set
 *    of results. To get the next page of results, call <code>GetPersonTracking</code> and populate the <code>NextToken</code> request parameter with the token
 *     value returned from the previous call to <code>GetPersonTracking</code>.</p>
 */
class GetPersonTrackingCommand extends smithy_client_1.Command {
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
        const commandName = "GetPersonTrackingCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetPersonTrackingRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetPersonTrackingResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetPersonTrackingCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetPersonTrackingCommand(output, context);
    }
}
exports.GetPersonTrackingCommand = GetPersonTrackingCommand;
//# sourceMappingURL=GetPersonTrackingCommand.js.map