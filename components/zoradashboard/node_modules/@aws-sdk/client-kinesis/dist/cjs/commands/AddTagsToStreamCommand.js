"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTagsToStreamCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Adds or updates tags for the specified Kinesis data stream. Each time you invoke
 *             this operation, you can specify up to 10 tags. If you want to add more than 10 tags to
 *             your stream, you can invoke this operation multiple times. In total, each stream can
 *             have up to 50 tags.</p>
 *         <p>If tags have already been assigned to the stream, <code>AddTagsToStream</code>
 *             overwrites any existing tags that correspond to the specified tag keys.</p>
 *         <p>
 *             <a>AddTagsToStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
class AddTagsToStreamCommand extends smithy_client_1.Command {
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
        const clientName = "KinesisClient";
        const commandName = "AddTagsToStreamCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.AddTagsToStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1AddTagsToStreamCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1AddTagsToStreamCommand(output, context);
    }
}
exports.AddTagsToStreamCommand = AddTagsToStreamCommand;
//# sourceMappingURL=AddTagsToStreamCommand.js.map