"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLexiconCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes the specified pronunciation lexicon stored in an AWS Region. A lexicon which
 *       has been deleted is not available for speech synthesis, nor is it possible to retrieve it
 *       using either the <code>GetLexicon</code> or <code>ListLexicon</code> APIs.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
class DeleteLexiconCommand extends smithy_client_1.Command {
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
        const clientName = "PollyClient";
        const commandName = "DeleteLexiconCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteLexiconInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteLexiconOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1DeleteLexiconCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1DeleteLexiconCommand(output, context);
    }
}
exports.DeleteLexiconCommand = DeleteLexiconCommand;
//# sourceMappingURL=DeleteLexiconCommand.js.map