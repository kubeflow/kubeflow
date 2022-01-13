"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutRecordCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Writes a single data record into an Amazon Kinesis data stream. Call
 *                 <code>PutRecord</code> to send data into the stream for real-time ingestion and
 *             subsequent processing, one record at a time. Each shard can support writes up to 1,000
 *             records per second, up to a maximum data write total of 1 MiB per second.</p>
 *         <p>You must specify the name of the stream that captures, stores, and transports the
 *             data; a partition key; and the data blob itself.</p>
 *         <p>The data blob can be any type of data; for example, a segment from a log file,
 *             geographic/location data, website clickstream data, and so on.</p>
 *         <p>The partition key is used by Kinesis Data Streams to distribute data across shards.
 *             Kinesis Data Streams segregates the data records that belong to a stream into multiple
 *             shards, using the partition key associated with each data record to determine the shard
 *             to which a given data record belongs.</p>
 *         <p>Partition keys are Unicode strings, with a maximum length limit of 256 characters
 *             for each key. An MD5 hash function is used to map partition keys to 128-bit integer
 *             values and to map associated data records to shards using the hash key ranges of the
 *             shards. You can override hashing the partition key to determine the shard by explicitly
 *             specifying a hash value using the <code>ExplicitHashKey</code> parameter. For more
 *             information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/developing-producers-with-sdk.html#kinesis-using-sdk-java-add-data-to-stream">Adding Data to a Stream</a> in the <i>Amazon Kinesis Data Streams
 *                 Developer Guide</i>.</p>
 *         <p>
 *             <code>PutRecord</code> returns the shard ID of where the data record was placed and the
 *             sequence number that was assigned to the data record.</p>
 *         <p>Sequence numbers increase over time and are specific to a shard within a stream,
 *             not across all shards within a stream. To guarantee strictly increasing ordering, write
 *             serially to a shard and use the <code>SequenceNumberForOrdering</code> parameter. For
 *             more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/developing-producers-with-sdk.html#kinesis-using-sdk-java-add-data-to-stream">Adding Data to a Stream</a> in the <i>Amazon Kinesis Data Streams
 *                 Developer Guide</i>.</p>
 *         <important>
 *             <p>After you write a record to a stream, you cannot modify that record or its order
 *                 within the stream.</p>
 *         </important>
 *         <p>If a <code>PutRecord</code> request cannot be processed because of insufficient
 *             provisioned throughput on the shard involved in the request, <code>PutRecord</code>
 *             throws <code>ProvisionedThroughputExceededException</code>. </p>
 *         <p>By default, data records are accessible for 24 hours from the time that they are
 *             added to a stream. You can use <a>IncreaseStreamRetentionPeriod</a> or <a>DecreaseStreamRetentionPeriod</a> to modify this retention period.</p>
 */
class PutRecordCommand extends smithy_client_1.Command {
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
        const commandName = "PutRecordCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.PutRecordInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.PutRecordOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1PutRecordCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1PutRecordCommand(output, context);
    }
}
exports.PutRecordCommand = PutRecordCommand;
//# sourceMappingURL=PutRecordCommand.js.map