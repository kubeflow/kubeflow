"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesizeSpeechCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Synthesizes UTF-8 input, plain text or SSML, to a stream of bytes. SSML input must be
 *       valid, well-formed SSML. Some alphabets might not be available with all the voices (for
 *       example, Cyrillic might not be read at all by English voices) unless phoneme mapping is used.
 *       For more information, see <a href="https://docs.aws.amazon.com/polly/latest/dg/how-text-to-speech-works.html">How it
 *         Works</a>.</p>
 */
class SynthesizeSpeechCommand extends smithy_client_1.Command {
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
        const commandName = "SynthesizeSpeechCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SynthesizeSpeechInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SynthesizeSpeechOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1SynthesizeSpeechCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1SynthesizeSpeechCommand(output, context);
    }
}
exports.SynthesizeSpeechCommand = SynthesizeSpeechCommand;
//# sourceMappingURL=SynthesizeSpeechCommand.js.map