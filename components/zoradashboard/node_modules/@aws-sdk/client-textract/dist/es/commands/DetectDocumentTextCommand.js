import { __extends } from "tslib";
import { DetectDocumentTextRequest, DetectDocumentTextResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectDocumentTextCommand, serializeAws_json1_1DetectDocumentTextCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Detects text in the input document. Amazon Textract can detect lines of text and the
 *          words that make up a line of text. The input document must be an image in JPEG or PNG
 *          format. <code>DetectDocumentText</code> returns the detected text in an array of <a>Block</a> objects. </p>
 *          <p>Each document page has as an associated <code>Block</code> of type PAGE. Each PAGE <code>Block</code> object
 *          is the parent of LINE <code>Block</code> objects that represent the lines of detected text on a page. A LINE <code>Block</code> object is
 *          a parent for each word that makes up the line. Words are represented by <code>Block</code> objects of type WORD.</p>
 *
 *          <p>
 *             <code>DetectDocumentText</code> is a synchronous operation. To analyze documents
 *          asynchronously, use <a>StartDocumentTextDetection</a>.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-detecting.html">Document Text Detection</a>.</p>
 */
var DetectDocumentTextCommand = /** @class */ (function (_super) {
    __extends(DetectDocumentTextCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectDocumentTextCommand(input) {
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
    DetectDocumentTextCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TextractClient";
        var commandName = "DetectDocumentTextCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectDocumentTextRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectDocumentTextResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectDocumentTextCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectDocumentTextCommand(input, context);
    };
    DetectDocumentTextCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectDocumentTextCommand(output, context);
    };
    return DetectDocumentTextCommand;
}($Command));
export { DetectDocumentTextCommand };
//# sourceMappingURL=DetectDocumentTextCommand.js.map