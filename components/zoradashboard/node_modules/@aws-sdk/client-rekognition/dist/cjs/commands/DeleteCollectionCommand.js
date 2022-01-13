"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCollectionCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes the specified collection. Note that this operation
 *       removes all faces in the collection. For an example, see <a>delete-collection-procedure</a>.</p>
 *
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:DeleteCollection</code> action.</p>
 */
class DeleteCollectionCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteCollectionCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteCollectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteCollectionResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DeleteCollectionCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DeleteCollectionCommand(output, context);
    }
}
exports.DeleteCollectionCommand = DeleteCollectionCommand;
//# sourceMappingURL=DeleteCollectionCommand.js.map