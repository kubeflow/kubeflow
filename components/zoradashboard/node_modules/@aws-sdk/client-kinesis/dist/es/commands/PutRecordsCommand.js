import { __extends } from "tslib";
import { PutRecordsInput, PutRecordsOutput } from "../models/models_0";
import { deserializeAws_json1_1PutRecordsCommand, serializeAws_json1_1PutRecordsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Writes multiple data records into a Kinesis data stream in a single call (also
 *             referred to as a <code>PutRecords</code> request). Use this operation to send data into
 *             the stream for data ingestion and processing. </p>
 *         <p>Each <code>PutRecords</code> request can support up to 500 records. Each record in
 *             the request can be as large as 1 MiB, up to a limit of 5 MiB for the entire request,
 *             including partition keys. Each shard can support writes up to 1,000 records per second,
 *             up to a maximum data write total of 1 MiB per second.</p>
 *         <p>You must specify the name of the stream that captures, stores, and transports the
 *             data; and an array of request <code>Records</code>, with each record in the array
 *             requiring a partition key and data blob. The record size limit applies to the total size
 *             of the partition key and data blob.</p>
 *         <p>The data blob can be any type of data; for example, a segment from a log file,
 *             geographic/location data, website clickstream data, and so on.</p>
 *         <p>The partition key is used by Kinesis Data Streams as input to a hash function that
 *             maps the partition key and associated data to a specific shard. An MD5 hash function is
 *             used to map partition keys to 128-bit integer values and to map associated data records
 *             to shards. As a result of this hashing mechanism, all data records with the same
 *             partition key map to the same shard within the stream. For more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/developing-producers-with-sdk.html#kinesis-using-sdk-java-add-data-to-stream">Adding Data to a Stream</a> in the <i>Amazon Kinesis Data Streams
 *                 Developer Guide</i>.</p>
 *         <p>Each record in the <code>Records</code> array may include an optional parameter,
 *                 <code>ExplicitHashKey</code>, which overrides the partition key to shard mapping.
 *             This parameter allows a data producer to determine explicitly the shard where the record
 *             is stored. For more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/developing-producers-with-sdk.html#kinesis-using-sdk-java-putrecords">Adding Multiple Records with PutRecords</a> in the <i>Amazon Kinesis
 *                 Data Streams Developer Guide</i>.</p>
 *         <p>The <code>PutRecords</code> response includes an array of response
 *                 <code>Records</code>. Each record in the response array directly correlates with a
 *             record in the request array using natural ordering, from the top to the bottom of the
 *             request and response. The response <code>Records</code> array always includes the same
 *             number of records as the request array.</p>
 *         <p>The response <code>Records</code> array includes both successfully and
 *             unsuccessfully processed records. Kinesis Data Streams attempts to process all records
 *             in each <code>PutRecords</code> request. A single record failure does not stop the
 *             processing of subsequent records. As a result, PutRecords doesn't guarantee the ordering
 *             of records. If you need to read records in the same order they are written to the
 *             stream, use <a>PutRecord</a> instead of <code>PutRecords</code>, and write to
 *             the same shard.</p>
 *         <p>A successfully processed record includes <code>ShardId</code> and
 *                 <code>SequenceNumber</code> values. The <code>ShardId</code> parameter identifies
 *             the shard in the stream where the record is stored. The <code>SequenceNumber</code>
 *             parameter is an identifier assigned to the put record, unique to all records in the
 *             stream.</p>
 *         <p>An unsuccessfully processed record includes <code>ErrorCode</code> and
 *                 <code>ErrorMessage</code> values. <code>ErrorCode</code> reflects the type of error
 *             and can be one of the following values:
 *                 <code>ProvisionedThroughputExceededException</code> or <code>InternalFailure</code>.
 *                 <code>ErrorMessage</code> provides more detailed information about the
 *                 <code>ProvisionedThroughputExceededException</code> exception including the account
 *             ID, stream name, and shard ID of the record that was throttled. For more information
 *             about partially successful responses, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/kinesis-using-sdk-java-add-data-to-stream.html#kinesis-using-sdk-java-putrecords">Adding Multiple Records with PutRecords</a> in the <i>Amazon Kinesis
 *                 Data Streams Developer Guide</i>.</p>
 *         <important>
 *             <p>After you write a record to a stream, you cannot modify that record or its order
 *                 within the stream.</p>
 *         </important>
 *         <p>By default, data records are accessible for 24 hours from the time that they are
 *             added to a stream. You can use <a>IncreaseStreamRetentionPeriod</a> or <a>DecreaseStreamRetentionPeriod</a> to modify this retention period.</p>
 */
var PutRecordsCommand = /** @class */ (function (_super) {
    __extends(PutRecordsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutRecordsCommand(input) {
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
    PutRecordsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "PutRecordsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutRecordsInput.filterSensitiveLog,
            outputFilterSensitiveLog: PutRecordsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutRecordsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1PutRecordsCommand(input, context);
    };
    PutRecordsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1PutRecordsCommand(output, context);
    };
    return PutRecordsCommand;
}($Command));
export { PutRecordsCommand };
//# sourceMappingURL=PutRecordsCommand.js.map