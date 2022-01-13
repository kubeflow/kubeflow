"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTagsForDeliveryStreamCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Lists the tags for the specified delivery stream. This operation has a limit of five
 *          transactions per second per account. </p>
 */
class ListTagsForDeliveryStreamCommand extends smithy_client_1.Command {
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
        const commandName = "ListTagsForDeliveryStreamCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListTagsForDeliveryStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListTagsForDeliveryStreamOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1ListTagsForDeliveryStreamCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1ListTagsForDeliveryStreamCommand(output, context);
    }
}
exports.ListTagsForDeliveryStreamCommand = ListTagsForDeliveryStreamCommand;
//# sourceMappingURL=ListTagsForDeliveryStreamCommand.js.map