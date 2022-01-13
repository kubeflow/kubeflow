import { __extends } from "tslib";
import { StartDocumentTextDetectionRequest, StartDocumentTextDetectionResponse } from "../models/models_0";
import { deserializeAws_json1_1StartDocumentTextDetectionCommand, serializeAws_json1_1StartDocumentTextDetectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Starts the asynchronous detection of text in a document. Amazon Textract can detect lines of
 *          text and the words that make up a line of text.</p>
 *          <p>
 *             <code>StartDocumentTextDetection</code> can analyze text in documents that are in JPEG, PNG, and PDF format. The
 *         documents are stored in an Amazon S3 bucket. Use <a>DocumentLocation</a> to specify the bucket name and file name
 *         of the document.
 *      </p>
 *          <p>
 *             <code>StartTextDetection</code> returns a job identifier
 *             (<code>JobId</code>) that you use to get the results of the operation. When text
 *          detection is finished, Amazon Textract publishes a completion status to the Amazon Simple Notification Service (Amazon SNS)
 *          topic that you specify in <code>NotificationChannel</code>. To get the results of the text
 *          detection operation, first check that the status value published to the Amazon SNS topic is
 *             <code>SUCCEEDED</code>. If so, call <a>GetDocumentTextDetection</a>, and
 *          pass the job identifier (<code>JobId</code>) from the initial call to
 *             <code>StartDocumentTextDetection</code>.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-detecting.html">Document Text Detection</a>.</p>
 */
var StartDocumentTextDetectionCommand = /** @class */ (function (_super) {
    __extends(StartDocumentTextDetectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function StartDocumentTextDetectionCommand(input) {
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
    StartDocumentTextDetectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TextractClient";
        var commandName = "StartDocumentTextDetectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: StartDocumentTextDetectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: StartDocumentTextDetectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    StartDocumentTextDetectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1StartDocumentTextDetectionCommand(input, context);
    };
    StartDocumentTextDetectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1StartDocumentTextDetectionCommand(output, context);
    };
    return StartDocumentTextDetectionCommand;
}($Command));
export { StartDocumentTextDetectionCommand };
//# sourceMappingURL=StartDocumentTextDetectionCommand.js.map