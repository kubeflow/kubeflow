"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSpeechSynthesisTaskCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Retrieves a specific SpeechSynthesisTask object based on its TaskID. This object contains
 *       information about the given speech synthesis task, including the status of the task, and a
 *       link to the S3 bucket containing the output of the task.</p>
 */
class GetSpeechSynthesisTaskCommand extends smithy_client_1.Command {
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
        const commandName = "GetSpeechSynthesisTaskCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetSpeechSynthesisTaskInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetSpeechSynthesisTaskOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1GetSpeechSynthesisTaskCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1GetSpeechSynthesisTaskCommand(output, context);
    }
}
exports.GetSpeechSynthesisTaskCommand = GetSpeechSynthesisTaskCommand;
//# sourceMappingURL=GetSpeechSynthesisTaskCommand.js.map