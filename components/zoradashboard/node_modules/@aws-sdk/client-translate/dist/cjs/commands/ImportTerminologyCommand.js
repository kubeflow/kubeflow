"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportTerminologyCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates or updates a custom terminology, depending on whether or not one already exists
 *       for the given terminology name. Importing a terminology with the same name as an existing one
 *       will merge the terminologies based on the chosen merge strategy. Currently, the only supported
 *       merge strategy is OVERWRITE, and so the imported terminology will overwrite an existing
 *       terminology of the same name.</p>
 *          <p>If you import a terminology that overwrites an existing one, the new terminology take up
 *       to 10 minutes to fully propagate and be available for use in a translation due to cache
 *       policies with the DataPlane service that performs the translations.</p>
 */
class ImportTerminologyCommand extends smithy_client_1.Command {
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
        const clientName = "TranslateClient";
        const commandName = "ImportTerminologyCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ImportTerminologyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ImportTerminologyResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1ImportTerminologyCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1ImportTerminologyCommand(output, context);
    }
}
exports.ImportTerminologyCommand = ImportTerminologyCommand;
//# sourceMappingURL=ImportTerminologyCommand.js.map