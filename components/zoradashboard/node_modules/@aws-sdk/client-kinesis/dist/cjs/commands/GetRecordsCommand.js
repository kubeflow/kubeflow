"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRecordsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets data records from a Kinesis data stream's shard.</p>
 *         <p>Specify a shard iterator using the <code>ShardIterator</code> parameter. The shard
 *             iterator specifies the position in the shard from which you want to start reading data
 *             records sequentially. If there are no records available in the portion of the shard that
 *             the iterator points to, <a>GetRecords</a> returns an empty list. It might
 *             take multiple calls to get to a portion of the shard that contains records.</p>
 *         <p>You can scale by provisioning multiple shards per stream while considering service
 *             limits (for more information, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/service-sizes-and-limits.html">Amazon Kinesis Data Streams
 *                 Limits</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>). Your application should have one thread per shard, each reading
 *             continuously from its stream. To read from a stream continually, call <a>GetRecords</a> in a loop. Use <a>GetShardIterator</a> to get the
 *             shard iterator to specify in the first <a>GetRecords</a> call. <a>GetRecords</a> returns a new shard iterator in
 *                 <code>NextShardIterator</code>. Specify the shard iterator returned in
 *                 <code>NextShardIterator</code> in subsequent calls to <a>GetRecords</a>.
 *             If the shard has been closed, the shard iterator can't return more data and <a>GetRecords</a> returns <code>null</code> in <code>NextShardIterator</code>.
 *             You can terminate the loop when the shard is closed, or when the shard iterator reaches
 *             the record with the sequence number or other attribute that marks it as the last record
 *             to process.</p>
 *         <p>Each data record can be up to 1 MiB in size, and each shard can read up to 2 MiB
 *             per second. You can ensure that your calls don't exceed the maximum supported size or
 *             throughput by using the <code>Limit</code> parameter to specify the maximum number of
 *             records that <a>GetRecords</a> can return. Consider your average record size
 *             when determining this limit. The maximum number of records that can be returned per call
 *             is 10,000.</p>
 *
 *         <p>The size of the data returned by <a>GetRecords</a> varies depending on
 *             the utilization of the shard. The maximum size of data that <a>GetRecords</a>
 *             can return is 10 MiB. If a call returns this amount of data, subsequent calls made
 *             within the next 5 seconds throw <code>ProvisionedThroughputExceededException</code>. If
 *             there is insufficient provisioned throughput on the stream, subsequent calls made within
 *             the next 1 second throw <code>ProvisionedThroughputExceededException</code>. <a>GetRecords</a> doesn't return any data when it throws an exception. For this
 *             reason, we recommend that you wait 1 second between calls to <a>GetRecords</a>. However, it's possible that the application will get exceptions for longer than 1
 *             second.</p>
 *         <p>To detect whether the application is falling behind in processing, you can use the
 *                 <code>MillisBehindLatest</code> response attribute. You can also monitor the stream
 *             using CloudWatch metrics and other mechanisms (see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/monitoring.html">Monitoring</a> in the <i>Amazon
 *                 Kinesis Data Streams Developer Guide</i>).</p>
 *         <p>Each Amazon Kinesis record includes a value,
 *                 <code>ApproximateArrivalTimestamp</code>, that is set when a stream successfully
 *             receives and stores a record. This is commonly referred to as a server-side time stamp,
 *             whereas a client-side time stamp is set when a data producer creates or sends the record
 *             to a stream (a data producer is any data source putting data records into a stream, for
 *             example with <a>PutRecords</a>). The time stamp has millisecond precision.
 *             There are no guarantees about the time stamp accuracy, or that the time stamp is always
 *             increasing. For example, records in a shard or across a stream might have time stamps
 *             that are out of order.</p>
 *         <p>This operation has a limit of five transactions per second per shard.</p>
 */
class GetRecordsCommand extends smithy_client_1.Command {
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
        const commandName = "GetRecordsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetRecordsInput.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetRecordsOutput.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetRecordsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetRecordsCommand(output, context);
    }
}
exports.GetRecordsCommand = GetRecordsCommand;
//# sourceMappingURL=GetRecordsCommand.js.map