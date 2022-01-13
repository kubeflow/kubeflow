"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContentModerationCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the unsafe content analysis results for a Amazon Rekognition Video analysis started by
 *        <a>StartContentModeration</a>.</p>
 *
 *          <p>Unsafe content analysis of a video is an asynchronous operation. You start analysis by calling
 *        <a>StartContentModeration</a> which returns a job identifier (<code>JobId</code>).
 *        When analysis finishes, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service
 *        topic registered in the initial call to <code>StartContentModeration</code>.
 *        To get the results of the unsafe content analysis, first check that the status value published to the Amazon SNS
 *        topic is <code>SUCCEEDED</code>. If so, call  <code>GetContentModeration</code> and pass the job identifier
 *        (<code>JobId</code>) from the initial call to <code>StartContentModeration</code>. </p>
 *
 *          <p>For more information, see Working with Stored Videos in the
 *      Amazon Rekognition Devlopers Guide.</p>
 *          <p>
 *             <code>GetContentModeration</code> returns detected unsafe content labels,
 *       and the time they are detected, in an array, <code>ModerationLabels</code>, of
 *       <a>ContentModerationDetection</a> objects.
 *      </p>
 *          <p>By default, the moderated labels are returned sorted by time, in milliseconds from the start of the
 *        video. You can also sort them by moderated label by specifying <code>NAME</code> for the <code>SortBy</code>
 *        input parameter. </p>
 *          <p>Since video analysis can return a large number of results, use the <code>MaxResults</code> parameter to limit
 *       the number of labels returned in a single call to <code>GetContentModeration</code>. If there are more results than
 *        specified in <code>MaxResults</code>, the value of <code>NextToken</code> in the operation response contains a
 *        pagination token for getting the next set of results. To get the next page of results, call <code>GetContentModeration</code>
 *        and populate the <code>NextToken</code> request parameter with the value of <code>NextToken</code>
 *        returned from the previous call to <code>GetContentModeration</code>.</p>
 *
 *          <p>For more information, see Detecting Unsafe Content in the Amazon Rekognition Developer Guide.</p>
 */
class GetContentModerationCommand extends smithy_client_1.Command {
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
        const commandName = "GetContentModerationCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetContentModerationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetContentModerationResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetContentModerationCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetContentModerationCommand(output, context);
    }
}
exports.GetContentModerationCommand = GetContentModerationCommand;
//# sourceMappingURL=GetContentModerationCommand.js.map