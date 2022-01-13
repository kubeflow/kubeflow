import { __extends } from "tslib";
import { AnalyzeDocumentRequest, AnalyzeDocumentResponse } from "../models/models_0";
import { deserializeAws_json1_1AnalyzeDocumentCommand, serializeAws_json1_1AnalyzeDocumentCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Analyzes an input document for relationships between detected items.  </p>
 *          <p>The types of information returned are as follows: </p>
 *          <ul>
 *             <li>
 *                <p>Form data (key-value pairs). The related information is returned in two <a>Block</a> objects, each of type <code>KEY_VALUE_SET</code>: a KEY
 *                   <code>Block</code> object and a VALUE <code>Block</code> object. For example,
 *                   <i>Name: Ana Silva Carolina</i> contains a key and value.
 *                   <i>Name:</i> is the key. <i>Ana Silva Carolina</i> is
 *                the value.</p>
 *             </li>
 *             <li>
 *                <p>Table and table cell data. A TABLE <code>Block</code> object contains information about a detected table. A CELL
 *                <code>Block</code> object is returned for each cell in a table.</p>
 *             </li>
 *             <li>
 *                <p>Lines and words of text. A LINE <code>Block</code> object contains one or more WORD <code>Block</code> objects.
 *         All lines and words that are detected in the document are returned (including text that doesn't have a
 *                relationship with the value of <code>FeatureTypes</code>). </p>
 *             </li>
 *          </ul>
 *
 *          <p>Selection elements such as check boxes and option buttons (radio buttons) can be detected in form data and in tables.
 *          A SELECTION_ELEMENT <code>Block</code> object contains information about a selection element,
 *          including the selection status.</p>
 *          <p>You can choose which type of analysis to perform by specifying the <code>FeatureTypes</code> list.
 *       </p>
 *          <p>The output is returned in a list of <code>Block</code> objects.</p>
 *          <p>
 *             <code>AnalyzeDocument</code> is a synchronous operation. To analyze documents
 *       asynchronously, use <a>StartDocumentAnalysis</a>.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/textract/latest/dg/how-it-works-analyzing.html">Document Text Analysis</a>.</p>
 */
var AnalyzeDocumentCommand = /** @class */ (function (_super) {
    __extends(AnalyzeDocumentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function AnalyzeDocumentCommand(input) {
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
    AnalyzeDocumentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TextractClient";
        var commandName = "AnalyzeDocumentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: AnalyzeDocumentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: AnalyzeDocumentResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    AnalyzeDocumentCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1AnalyzeDocumentCommand(input, context);
    };
    AnalyzeDocumentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1AnalyzeDocumentCommand(output, context);
    };
    return AnalyzeDocumentCommand;
}($Command));
export { AnalyzeDocumentCommand };
//# sourceMappingURL=AnalyzeDocumentCommand.js.map