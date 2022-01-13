"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartTextTranslationJobCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Starts an asynchronous batch translation job. Batch translation jobs can be used to
 *       translate large volumes of text across multiple documents at once. For more information, see
 *         <a>async</a>.</p>
 *
 *          <p>Batch translation jobs can be described with the <a>DescribeTextTranslationJob</a> operation, listed with the <a>ListTextTranslationJobs</a> operation, and stopped with the <a>StopTextTranslationJob</a> operation.</p>
 *          <note>
 *             <p>Amazon Translate does not support batch translation of multiple source languages at once.</p>
 *          </note>
 */
class StartTextTranslationJobCommand extends smithy_client_1.Command {
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
        const commandName = "StartTextTranslationJobCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.StartTextTranslationJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.StartTextTranslationJobResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1StartTextTranslationJobCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1StartTextTranslationJobCommand(output, context);
    }
}
exports.StartTextTranslationJobCommand = StartTextTranslationJobCommand;
//# sourceMappingURL=StartTextTranslationJobCommand.js.map