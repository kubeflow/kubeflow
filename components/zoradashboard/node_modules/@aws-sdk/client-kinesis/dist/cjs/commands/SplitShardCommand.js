"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitShardCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Splits a shard into two new shards in the Kinesis data stream, to increase the
 *             stream's capacity to ingest and transport data. <code>SplitShard</code> is called when
 *             there is a need to increase the overall capacity of a stream because of an expected
 *             increase in the volume of data records being ingested. </p>
 *         <p>You can also use <code>SplitShard</code> when a shard appears to be approaching its
 *             maximum utilization; for example, the producers sending data into the specific shard are
 *             suddenly sending more than previously anticipated. You can also call
 *                 <code>SplitShard</code> to increase stream capacity, so that more Kinesis Data
 *             Streams applications can simultaneously read data from the stream for real-time
 *             processing. </p>
 *         <p>You must specify the shard to be split and the new hash key, which is the position
 *             in the shard where the shard gets split in two. In many cases, the new hash key might be
 *             the average of the beginning and ending hash key, but it can be any hash key value in
 *             the range being mapped into the shard. For more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/kinesis-using-sdk-java-resharding-split.html">Split a
 *                 Shard</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>.</p>
 *         <p>You can use <a>DescribeStream</a> to determine the shard ID and hash key
 *             values for the <code>ShardToSplit</code> and <code>NewStartingHashKey</code> parameters
 *             that are specified in the <code>SplitShard</code> request.</p>
 *         <p>
 *             <code>SplitShard</code> is an asynchronous operation. Upon receiving a
 *                 <code>SplitShard</code> request, Kinesis Data Streams immediately returns a response
 *             and sets the stream status to <code>UPDATING</code>. After the operation is completed,
 *             Kinesis Data Streams sets the stream status to <code>ACTIVE</code>. Read and write
 *             operations continue to work while the stream is in the <code>UPDATING</code> state. </p>
 *         <p>You can use <code>DescribeStream</code> to check the status of the stream, which is
 *             returned in <code>StreamStatus</code>. If the stream is in the <code>ACTIVE</code>
 *             state, you can call <code>SplitShard</code>. If a stream is in <code>CREATING</code> or
 *                 <code>UPDATING</code> or <code>DELETING</code> states, <code>DescribeStream</code>
 *             returns a <code>ResourceInUseException</code>.</p>
 *         <p>If the specified stream does not exist, <code>DescribeStream</code> returns a
 *                 <code>ResourceNotFoundException</code>. If you try to create more shards than are
 *             authorized for your account, you receive a <code>LimitExceededException</code>. </p>
 *         <p>For the default shard limit for an AWS account, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/service-sizes-and-limits.html">Kinesis Data Streams
 *                 Limits</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>. To increase this limit, <a href="https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html">contact AWS
 *             Support</a>.</p>
 *         <p>If you try to operate on too many streams simultaneously using <a>CreateStream</a>, <a>DeleteStream</a>, <a>MergeShards</a>, and/or <a>SplitShard</a>, you receive a
 *                 <code>LimitExceededException</code>. </p>
 *         <p>
 *             <code>SplitShard</code> has a limit of five transactions per second per
 *             account.</p>
 */
class SplitShardCommand extends smithy_client_1.Command {
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
        const commandName = "SplitShardCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SplitShardInput.filterSensitiveLog,
            outputFilterSensitiveLog: (output) => output,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1SplitShardCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1SplitShardCommand(output, context);
    }
}
exports.SplitShardCommand = SplitShardCommand;
//# sourceMappingURL=SplitShardCommand.js.map