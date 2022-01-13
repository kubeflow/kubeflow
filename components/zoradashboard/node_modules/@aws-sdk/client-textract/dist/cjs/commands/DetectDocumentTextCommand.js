"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectDocumentTextCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class DetectDocumentTextCommand extends smithy_client_1.Command {
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
        const commandName = "DetectDocumentTextCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DetectDocumentTextRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DetectDocumentTextResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DetectDocumentTextCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DetectDocumentTextCommand(output, context);
    }
}
exports.DetectDocumentTextCommand = DetectDocumentTextCommand;
//# sourceMappingURL=DetectDocumentTextCommand.js.map