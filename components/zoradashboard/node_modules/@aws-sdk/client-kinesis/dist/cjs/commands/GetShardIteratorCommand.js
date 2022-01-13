"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetShardIteratorCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets an Amazon Kinesis shard iterator. A shard iterator expires 5 minutes after it
 *             is returned to the requester.</p>
 *         <p>A shard iterator specifies the shard position from which to start reading data
 *             records sequentially. The position is specified using the sequence number of a data
 *             record in a shard. A sequence number is the identifier associated with every record
 *             ingested in the stream, and is assigned when a record is put into the stream. Each
 *             stream has one or more shards.</p>
 *         <p>You must specify the shard iterator type. For example, you can set the
 *                 <code>ShardIteratorType</code> parameter to read exactly from the position denoted
 *             by a specific sequence number by using the <code>AT_SEQUENCE_NUMBER</code> shard
 *             iterator type. Alternatively, the parameter can read right after the sequence number by
 *             using the <code>AFTER_SEQUENCE_NUMBER</code> shard iterator type, using sequence numbers
 *             returned by earlier calls to <a>PutRecord</a>, <a>PutRecords</a>,
 *                 <a>GetRecords</a>, or <a>DescribeStream</a>. In the request,
 *             you can specify the shard iterator type <code>AT_TIMESTAMP</code> to read records from
 *             an arbitrary point in time, <code>TRIM_HORIZON</code> to cause
 *                 <code>ShardIterator</code> to point to the last untrimmed record in the shard in the
 *             system (the oldest data record in the shard), or <code>LATEST</code> so that you always
 *             read the most recent data in the shard. </p>
 *         <p>When you read repeatedly from a stream, use a <a>GetShardIterator</a>
 *             request to get the first shard iterator for use in your first <a>GetRecords</a> request and for subsequent reads use the shard iterator returned by the <a>GetRecords</a> request in <code>NextShardIterator</code>. A new shard
 *             iterator is returned by every <a>GetRecords</a> request in
 *                 <code>NextShardIterator</code>, which you use in the <code>ShardIterator</code>
 *             parameter of the next <a>GetRecords</a> request. </p>
 *         <p>If a <a>GetShardIterator</a> request is made too often, you receive a
 *                 <code>ProvisionedThroughputExceededException</code>. For more information about
 *             throughput limits, see <a>GetRecords</a>, and <a href="https://docs.aws.amazon.com/kinesis/latest/dev/service-sizes-and-limits.html">Streams Limits</a> in the
 *                 <i>Amazon Kinesis Data Streams Developer Guide</i>.</p>
 *         <p>If the shard is closed, <a>GetShardIterator</a> returns a valid iterator
 *             for the last sequence number of the shard. A shard can be closed as a result of using
 *                 <a>SplitShard</a> or <a>MergeShards</a>.</p>
 *         <p>
 *             <a>GetShardIterator</a> has a limit of five transactions per second per
 *             account per open shard.</p>
 */
class GetShardIteratorCommand extends smithy_client_1.Command {
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
        const commandName = "GetShardIteratorCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetShardIteratorInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetShardIteratorOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetShardIteratorCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetShardIteratorCommand(output, context);
    }
}
exports.GetShardIteratorCommand = GetShardIteratorCommand;
//# sourceMappingURL=GetShardIteratorCommand.js.map