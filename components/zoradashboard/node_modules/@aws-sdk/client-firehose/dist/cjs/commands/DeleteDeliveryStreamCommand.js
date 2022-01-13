"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDeliveryStreamCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes a delivery stream and its data.</p>
 *          <p>To check the state of a delivery stream, use <a>DescribeDeliveryStream</a>. You can delete a delivery stream only if it is in one of the following states:
 *             <code>ACTIVE</code>, <code>DELETING</code>, <code>CREATING_FAILED</code>, or
 *             <code>DELETING_FAILED</code>. You can't delete a delivery stream that is in the
 *             <code>CREATING</code> state. While the deletion request is in process, the delivery
 *          stream is in the <code>DELETING</code> state.</p>
 *          <p>While the delivery stream is in the <code>DELETING</code> state, the service might
 *          continue to accept records, but it doesn't make any guarantees with respect to delivering
 *          the data. Therefore, as a best practice, first stop any applications that are sending
 *          records before you delete a delivery stream.</p>
 */
class DeleteDeliveryStreamCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteDeliveryStreamCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteDeliveryStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DeleteDeliveryStreamOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DeleteDeliveryStreamCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DeleteDeliveryStreamCommand(output, context);
    }
}
exports.DeleteDeliveryStreamCommand = DeleteDeliveryStreamCommand;
//# sourceMappingURL=DeleteDeliveryStreamCommand.js.map