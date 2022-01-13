"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListShardsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Lists the shards in a stream and provides information about each shard. This
 *             operation has a limit of 100 transactions per second per data stream.</p>
 *         <important>
 *             <p>This API is a new operation that is used by the Amazon Kinesis Client Library
 *                 (KCL). If you have a fine-grained IAM policy that only allows specific operations,
 *                 you must update your policy to allow calls to this API. For more information, see
 *                     <a href="https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html">Controlling Access to Amazon Kinesis Data Streams Resources Using
 *                 IAM</a>.</p>
 *         </important>
 */
class ListShardsCommand extends smithy_client_1.Command {
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
        const commandName = "ListShardsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListShardsInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListShardsOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1ListShardsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1ListShardsCommand(output, context);
    }
}
exports.ListShardsCommand = ListShardsCommand;
//# sourceMappingURL=ListShardsCommand.js.map