"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutRecordCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Writes a single data record into an Amazon Kinesis Data Firehose delivery stream. To
 *          write multiple data records into a delivery stream, use <a>PutRecordBatch</a>.
 *          Applications using these operations are referred to as producers.</p>
 *          <p>By default, each delivery stream can take in up to 2,000 transactions per second,
 *          5,000 records per second, or 5 MB per second. If you use <a>PutRecord</a> and
 *             <a>PutRecordBatch</a>, the limits are an aggregate across these two
 *          operations for each delivery stream. For more information about limits and how to request
 *          an increase, see <a href="https://docs.aws.amazon.com/firehose/latest/dev/limits.html">Amazon
 *             Kinesis Data Firehose Limits</a>. </p>
 *          <p>You must specify the name of the delivery stream and the data record when using <a>PutRecord</a>. The data record consists of a data blob that can be up to 1,000
 *          KB in size, and any kind of data. For example, it can be a segment from a log file,
 *          geographic location data, website clickstream data, and so on.</p>
 *          <p>Kinesis Data Firehose buffers records before delivering them to the destination. To
 *          disambiguate the data blobs at the destination, a common solution is to use delimiters in
 *          the data, such as a newline (<code>\n</code>) or some other character unique within the
 *          data. This allows the consumer application to parse individual data items when reading the
 *          data from the destination.</p>
 *          <p>The <code>PutRecord</code> operation returns a <code>RecordId</code>, which is a
 *          unique string assigned to each record. Producer applications can use this ID for purposes
 *          such as auditability and investigation.</p>
 *          <p>If the <code>PutRecord</code> operation throws a
 *             <code>ServiceUnavailableException</code>, back off and retry. If the exception persists,
 *          it is possible that the throughput limits have been exceeded for the delivery stream. </p>
 *          <p>Data records sent to Kinesis Data Firehose are stored for 24 hours from the time they
 *          are added to a delivery stream as it tries to send the records to the destination. If the
 *          destination is unreachable for more than 24 hours, the data is no longer
 *          available.</p>
 *
 *          <important>
 *             <p>Don't concatenate two or more base64 strings to form the data fields of your records.
 *             Instead, concatenate the raw data, then perform base64 encoding.</p>
 *          </important>
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
        const clientName = "FirehoseClient";
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