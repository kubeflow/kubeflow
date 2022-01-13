"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescribeDeliveryStreamCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Describes the specified delivery stream and its status. For example, after your
 *          delivery stream is created, call <code>DescribeDeliveryStream</code> to see whether the
 *          delivery stream is <code>ACTIVE</code> and therefore ready for data to be sent to it. </p>
 *          <p>If the status of a delivery stream is <code>CREATING_FAILED</code>, this status
 *          doesn't change, and you can't invoke <a>CreateDeliveryStream</a> again on it.
 *          However, you can invoke the <a>DeleteDeliveryStream</a> operation to delete it.
 *          If the status is <code>DELETING_FAILED</code>, you can force deletion by invoking <a>DeleteDeliveryStream</a> again but with <a>DeleteDeliveryStreamInput$AllowForceDelete</a> set to true.</p>
 */
class DescribeDeliveryStreamCommand extends smithy_client_1.Command {
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
        const commandName = "DescribeDeliveryStreamCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeDeliveryStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeDeliveryStreamOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DescribeDeliveryStreamCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DescribeDeliveryStreamCommand(output, context);
    }
}
exports.DescribeDeliveryStreamCommand = DescribeDeliveryStreamCommand;
//# sourceMappingURL=DescribeDeliveryStreamCommand.js.map