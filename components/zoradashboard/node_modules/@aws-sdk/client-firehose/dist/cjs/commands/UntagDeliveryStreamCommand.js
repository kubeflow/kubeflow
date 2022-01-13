"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UntagDeliveryStreamCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Removes tags from the specified delivery stream. Removed tags are deleted, and you
 *          can't recover them after this operation successfully completes.</p>
 *          <p>If you specify a tag that doesn't exist, the operation ignores it.</p>
 *          <p>This operation has a limit of five transactions per second per account. </p>
 */
class UntagDeliveryStreamCommand extends smithy_client_1.Command {
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
        const clientName = "FirehoseClient";
        const commandName = "UntagDeliveryStreamCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.UntagDeliveryStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.UntagDeliveryStreamOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1UntagDeliveryStreamCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1UntagDeliveryStreamCommand(output, context);
    }
}
exports.UntagDeliveryStreamCommand = UntagDeliveryStreamCommand;
//# sourceMappingURL=UntagDeliveryStreamCommand.js.map