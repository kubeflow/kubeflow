"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProjectCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes an Amazon Rekognition Custom Labels project.  To delete a project you must first delete all models associated
 *          with the project. To delete a model, see <a>DeleteProjectVersion</a>.</p>
 *          <p>This operation requires permissions to perform the
 *          <code>rekognition:DeleteProject</code> action. </p>
 */
class DeleteProjectCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteProjectCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteProjectRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteProjectResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DeleteProjectCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DeleteProjectCommand(output, context);
    }
}
exports.DeleteProjectCommand = DeleteProjectCommand;
//# sourceMappingURL=DeleteProjectCommand.js.map