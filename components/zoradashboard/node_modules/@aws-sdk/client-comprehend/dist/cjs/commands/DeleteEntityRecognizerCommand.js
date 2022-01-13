"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEntityRecognizerCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes an entity recognizer.</p>
 *          <p>Only those recognizers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
 *       returned.</p>
 *          <p>This is an asynchronous action that puts the recognizer into a DELETING state, and it is
 *       then removed by a background job. Once removed, the recognizer disappears from your account
 *       and is no longer available for use. </p>
 */
class DeleteEntityRecognizerCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteEntityRecognizerCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteEntityRecognizerRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteEntityRecognizerResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DeleteEntityRecognizerCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DeleteEntityRecognizerCommand(output, context);
    }
}
exports.DeleteEntityRecognizerCommand = DeleteEntityRecognizerCommand;
//# sourceMappingURL=DeleteEntityRecognizerCommand.js.map