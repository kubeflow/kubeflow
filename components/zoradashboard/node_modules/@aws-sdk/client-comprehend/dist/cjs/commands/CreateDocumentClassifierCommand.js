"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentClassifierCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates a new document classifier that you can use to categorize documents. To create a
 *       classifier, you provide a set of training documents that labeled with the categories that you
 *       want to use. After the classifier is trained you can use it to categorize a set of labeled
 *       documents into the categories. For more information, see <a>how-document-classification</a>.</p>
 */
class CreateDocumentClassifierCommand extends smithy_client_1.Command {
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
        const clientName = "ComprehendClient";
        const commandName = "CreateDocumentClassifierCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateDocumentClassifierRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateDocumentClassifierResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1CreateDocumentClassifierCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1CreateDocumentClassifierCommand(output, context);
    }
}
exports.CreateDocumentClassifierCommand = CreateDocumentClassifierCommand;
//# sourceMappingURL=CreateDocumentClassifierCommand.js.map