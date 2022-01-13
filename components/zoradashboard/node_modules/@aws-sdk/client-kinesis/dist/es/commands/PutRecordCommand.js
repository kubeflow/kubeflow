import { __extends } from "tslib";
import { PutRecordInput, PutRecordOutput } from "../models/models_0";
import { deserializeAws_json1_1PutRecordCommand, serializeAws_json1_1PutRecordCommand } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var PutRecordCommand = /** @class */ (function (_super) {
    __extends(PutRecordCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutRecordCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    PutRecordCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "PutRecordCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutRecordInput.filterSensitiveLog,
            outputFilterSensitiveLog: PutRecordOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutRecordCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1PutRecordCommand(input, context);
    };
    PutRecordCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1PutRecordCommand(output, context);
    };
    return PutRecordCommand;
}($Command));
export { PutRecordCommand };
//# sourceMappingURL=PutRecordCommand.js.map