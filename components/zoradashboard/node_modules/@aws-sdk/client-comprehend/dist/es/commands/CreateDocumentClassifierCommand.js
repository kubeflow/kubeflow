import { __extends } from "tslib";
import { CreateDocumentClassifierRequest, CreateDocumentClassifierResponse } from "../models/models_0";
import { deserializeAws_json1_1CreateDocumentClassifierCommand, serializeAws_json1_1CreateDocumentClassifierCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a new document classifier that you can use to categorize documents. To create a
 *       classifier, you provide a set of training documents that labeled with the categories that you
 *       want to use. After the classifier is trained you can use it to categorize a set of labeled
 *       documents into the categories. For more information, see <a>how-document-classification</a>.</p>
 */
var CreateDocumentClassifierCommand = /** @class */ (function (_super) {
    __extends(CreateDocumentClassifierCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateDocumentClassifierCommand(input) {
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
    CreateDocumentClassifierCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "CreateDocumentClassifierCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateDocumentClassifierRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateDocumentClassifierResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateDocumentClassifierCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateDocumentClassifierCommand(input, context);
    };
    CreateDocumentClassifierCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateDocumentClassifierCommand(output, context);
    };
    return CreateDocumentClassifierCommand;
}($Command));
export { CreateDocumentClassifierCommand };
//# sourceMappingURL=CreateDocumentClassifierCommand.js.map