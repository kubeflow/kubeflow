"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartSpeechSynthesisTaskCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Allows the creation of an asynchronous synthesis task, by starting a new
 *         <code>SpeechSynthesisTask</code>. This operation requires all the standard information
 *       needed for speech synthesis, plus the name of an Amazon S3 bucket for the service to store the
 *       output of the synthesis task and two optional parameters (OutputS3KeyPrefix and SnsTopicArn).
 *       Once the synthesis task is created, this operation will return a SpeechSynthesisTask object,
 *       which will include an identifier of this task as well as the current status.</p>
 */
class StartSpeechSynthesisTaskCommand extends smithy_client_1.Command {
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
        const commandName = "StartSpeechSynthesisTaskCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.StartSpeechSynthesisTaskInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.StartSpeechSynthesisTaskOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1StartSpeechSynthesisTaskCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1StartSpeechSynthesisTaskCommand(output, context);
    }
}
exports.StartSpeechSynthesisTaskCommand = StartSpeechSynthesisTaskCommand;
//# sourceMappingURL=StartSpeechSynthesisTaskCommand.js.map