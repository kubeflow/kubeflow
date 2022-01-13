"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStreamCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Deletes a Kinesis data stream and all its shards and data. You must shut down any
 *             applications that are operating on the stream before you delete the stream. If an
 *             application attempts to operate on a deleted stream, it receives the exception
 *                 <code>ResourceNotFoundException</code>.</p>
 *         <p>If the stream is in the <code>ACTIVE</code> state, you can delete it. After a
 *                 <code>DeleteStream</code> request, the specified stream is in the
 *                 <code>DELETING</code> state until Kinesis Data Streams completes the
 *             deletion.</p>
 *         <p>
 *             <b>Note:</b> Kinesis Data Streams might continue to accept
 *             data read and write operations, such as <a>PutRecord</a>, <a>PutRecords</a>, and <a>GetRecords</a>, on a stream in the
 *                 <code>DELETING</code> state until the stream deletion is complete.</p>
 *         <p>When you delete a stream, any shards in that stream are also deleted, and any tags
 *             are dissociated from the stream.</p>
 *         <p>You can use the <a>DescribeStream</a> operation to check the state of
 *             the stream, which is returned in <code>StreamStatus</code>.</p>
 *         <p>
 *             <a>DeleteStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
class DeleteStreamCommand extends smithy_client_1.Command {
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
        const commandName = "DeleteStreamCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DeleteStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DeleteStreamCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DeleteStreamCommand(output, context);
    }
}
exports.DeleteStreamCommand = DeleteStreamCommand;
//# sourceMappingURL=DeleteStreamCommand.js.map