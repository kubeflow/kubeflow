"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescribeTextTranslationJobCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the properties associated with an asycnhronous batch translation job including name,
 *       ID, status, source and target languages, input/output S3 buckets, and so on.</p>
 */
class DescribeTextTranslationJobCommand extends smithy_client_1.Command {
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
        const commandName = "DescribeTextTranslationJobCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeTextTranslationJobRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeTextTranslationJobResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DescribeTextTranslationJobCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DescribeTextTranslationJobCommand(output, context);
    }
}
exports.DescribeTextTranslationJobCommand = DescribeTextTranslationJobCommand;
//# sourceMappingURL=DescribeTextTranslationJobCommand.js.map