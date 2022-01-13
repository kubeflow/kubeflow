"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescribeStreamSummaryCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Provides a summarized description of the specified Kinesis data stream without the
 *             shard list.</p>
 *         <p>The information returned includes the stream name, Amazon Resource Name (ARN),
 *             status, record retention period, approximate creation time, monitoring, encryption
 *             details, and open shard count. </p>
 *         <p>
 *             <a>DescribeStreamSummary</a> has a limit of 20 transactions per second
 *             per account.</p>
 */
class DescribeStreamSummaryCommand extends smithy_client_1.Command {
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
        const commandName = "DescribeStreamSummaryCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DescribeStreamSummaryInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DescribeStreamSummaryOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DescribeStreamSummaryCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DescribeStreamSummaryCommand(output, context);
    }
}
exports.DescribeStreamSummaryCommand = DescribeStreamSummaryCommand;
//# sourceMappingURL=DescribeStreamSummaryCommand.js.map