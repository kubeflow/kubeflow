"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutLexiconCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Stores a pronunciation lexicon in an AWS Region. If a lexicon with the same name
 *       already exists in the region, it is overwritten by the new lexicon. Lexicon operations have
 *       eventual consistency, therefore, it might take some time before the lexicon is available to
 *       the SynthesizeSpeech operation.</p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html">Managing
 *         Lexicons</a>.</p>
 */
class PutLexiconCommand extends smithy_client_1.Command {
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
        const commandName = "PutLexiconCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutLexiconInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.PutLexiconOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1PutLexiconCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1PutLexiconCommand(output, context);
    }
}
exports.PutLexiconCommand = PutLexiconCommand;
//# sourceMappingURL=PutLexiconCommand.js.map