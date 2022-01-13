"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDocumentAnalysisCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the results for an Amazon Textract asynchronous operation that analyzes text in a document.</p>
 *          <p>You start asynchronous text analysis by calling <a>StartDocumentAnalysis</a>, which returns a job identifier
 *             (<code>JobId</code>). When the text analysis operation finishes, Amazon Textract publishes a
 *          completion status to the Amazon Simple Notification Service (Amazon SNS) topic that's registered in the initial call to
 *             <code>StartDocumentAnalysis</code>. To get the results of the text-detection operation,
 *          first check that the status value published to the Amazon SNS topic is <code>SUCCEEDED</code>.
 *          If so, call <code>GetDocumentAnalysis</code>, and pass the job identifier
 *             (<code>JobId</code>) from the initial call to <code>StartDocumentAnalysis</code>.</p>
 *          <p>
 *             <code>GetDocumentAnalysis</code> returns an array of <a>Block</a> objects. The following
 *          types of information are returned: </p>
 *          <ul>
 *             <li>
 *                <p>Form data (key-value pairs). The related information is returned in two <a>Block</a> objects, each of type <code>KEY_VALUE_SET</code>: a KEY
 *             <code>Block</code> object and a VALUE <code>Block</code> object. For example,
 *             <i>Name: Ana Silva Carolina</i> contains a key and value.
 *             <i>Name:</i> is the key. <i>Ana Silva Carolina</i> is
 *             the value.</p>
 *             </li>
 *             <li>
 *                <p>Table and table cell data. A TABLE <code>Block</code> object contains information about a detected table. A CELL
 *             <code>Block</code> object is returned for each cell in a table.</p>
 *             </li>
 *             <li>
 *                <p>Lines and words of text. A LINE <code>Block</code> object contains one or more WORD <code>Block</code> objects.
 *             All lines and words that are detected in the document are returned (including text that doesn't have a
 *             relationship with the value of the <code>StartDocumentAnalysis</code>
 *                   <code>FeatureTypes</code> input parameter). </p>
 *             </li>
 *          </ul>
 *
 *          <p>Selection elements such as check boxes and option buttons (radio buttons) can be detected in form data and in tables.
 *          A SELECTION_ELEMENT <code>Block</code> object contains information about a selection element,
 *          including the selection status.</p>
 *
 *
 *
 *          <p>Use the <code>MaxResults</code> parameter to limit the number of blocks that are
 *          returned. If there are more results than specified in <code>MaxResults</code>, the value of
 *             <code>NextToken</code> in the operation response contains a pagination token for getting
 *          the next set of results. To get the next page of results, call
 *             <code>GetDocumentAnalysis</code>, and populate the <code>NextToken</code> request
 *          parameter with the token value that's returned from the previous call to
 *             <code>GetDocumentAnalysis</code>.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-analyzing.html">Document Text Analysis</a>.</p>
 */
class GetDocumentAnalysisCommand extends smithy_client_1.Command {
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
        const commandName = "GetDocumentAnalysisCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetDocumentAnalysisRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetDocumentAnalysisResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetDocumentAnalysisCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetDocumentAnalysisCommand(output, context);
    }
}
exports.GetDocumentAnalysisCommand = GetDocumentAnalysisCommand;
//# sourceMappingURL=GetDocumentAnalysisCommand.js.map