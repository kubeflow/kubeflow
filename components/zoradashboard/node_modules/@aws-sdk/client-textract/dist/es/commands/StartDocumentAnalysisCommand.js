import { __extends } from "tslib";
import { StartDocumentAnalysisRequest, StartDocumentAnalysisResponse } from "../models/models_0";
import { deserializeAws_json1_1StartDocumentAnalysisCommand, serializeAws_json1_1StartDocumentAnalysisCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts the asynchronous analysis of an input document for relationships between detected
 *          items such as key-value pairs, tables, and selection elements.</p>
 *
 *          <p>
 *             <code>StartDocumentAnalysis</code> can analyze text in documents that are in JPEG, PNG, and PDF format. The
 *          documents are stored in an Amazon S3 bucket. Use <a>DocumentLocation</a> to specify the bucket name and file name
 *          of the document.
 *          </p>
 *          <p>
 *             <code>StartDocumentAnalysis</code> returns a job identifier
 *             (<code>JobId</code>) that you use to get the results of the operation. When text
 *          analysis is finished, Amazon Textract publishes a completion status to the Amazon Simple Notification Service (Amazon SNS)
 *          topic that you specify in <code>NotificationChannel</code>. To get the results of the text
 *          analysis operation, first check that the status value published to the Amazon SNS topic is
 *             <code>SUCCEEDED</code>. If so, call <a>GetDocumentAnalysis</a>, and pass
 *          the job identifier (<code>JobId</code>) from the initial call to
 *             <code>StartDocumentAnalysis</code>.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-analyzing.html">Document Text Analysis</a>.</p>
 */
var StartDocumentAnalysisCommand = /** @class */ (function (_super) {
    __extends(StartDocumentAnalysisCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartDocumentAnalysisCommand(input) {
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
    StartDocumentAnalysisCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TextractClient";
        var commandName = "StartDocumentAnalysisCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartDocumentAnalysisRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartDocumentAnalysisResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartDocumentAnalysisCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartDocumentAnalysisCommand(input, context);
    };
    StartDocumentAnalysisCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartDocumentAnalysisCommand(output, context);
    };
    return StartDocumentAnalysisCommand;
}($Command));
export { StartDocumentAnalysisCommand };
//# sourceMappingURL=StartDocumentAnalysisCommand.js.map