"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDocumentTextDetectionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the results for an Amazon Textract asynchronous operation that detects text in a document.
 *      Amazon Textract can detect lines of text and the words that make up a line of text.</p>
 *          <p>You start asynchronous text detection by calling <a>StartDocumentTextDetection</a>, which returns a job identifier
 *             (<code>JobId</code>). When the text detection operation finishes, Amazon Textract publishes a
 *          completion status to the Amazon Simple Notification Service (Amazon SNS) topic that's registered in the initial call to
 *             <code>StartDocumentTextDetection</code>. To get the results of the text-detection
 *          operation, first check that the status value published to the Amazon SNS topic is
 *             <code>SUCCEEDED</code>. If so, call <code>GetDocumentTextDetection</code>, and pass the
 *          job identifier (<code>JobId</code>) from the initial call to
 *             <code>StartDocumentTextDetection</code>.</p>
 *          <p>
 *             <code>GetDocumentTextDetection</code> returns an array of <a>Block</a>
 *          objects. </p>
 *          <p>Each document page has as an associated <code>Block</code> of type PAGE. Each PAGE <code>Block</code> object
 *         is the parent of LINE <code>Block</code> objects that represent the lines of detected text on a page. A LINE <code>Block</code> object is
 *         a parent for each word that makes up the line. Words are represented by <code>Block</code> objects of type WORD.</p>
 *
 *          <p>Use the MaxResults parameter to limit the number of blocks that are returned. If there
 *          are more results than specified in <code>MaxResults</code>, the value of
 *             <code>NextToken</code> in the operation response contains a pagination token for getting
 *          the next set of results. To get the next page of results, call
 *             <code>GetDocumentTextDetection</code>, and populate the <code>NextToken</code> request
 *          parameter with the token value that's returned from the previous call to
 *             <code>GetDocumentTextDetection</code>.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-detecting.html">Document Text Detection</a>.</p>
 */
class GetDocumentTextDetectionCommand extends smithy_client_1.Command {
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
        const clientName = "TextractClient";
        const commandName = "GetDocumentTextDetectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetDocumentTextDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetDocumentTextDetectionResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetDocumentTextDetectionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetDocumentTextDetectionCommand(output, context);
    }
}
exports.GetDocumentTextDetectionCommand = GetDocumentTextDetectionCommand;
//# sourceMappingURL=GetDocumentTextDetectionCommand.js.map