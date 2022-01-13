import { __extends } from "tslib";
import { DescribeStreamInput, DescribeStreamOutput } from "../models/models_0";
import { deserializeAws_json1_1DescribeStreamCommand, serializeAws_json1_1DescribeStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Describes the specified Kinesis data stream.</p>
 *
 *         <p>The information returned includes the stream name, Amazon Resource Name (ARN),
 *             creation time, enhanced metric configuration, and shard map. The shard map is an array
 *             of shard objects. For each shard object, there is the hash key and sequence number
 *             ranges that the shard spans, and the IDs of any earlier shards that played in a role in
 *             creating the shard. Every record ingested in the stream is identified by a sequence
 *             number, which is assigned when the record is put into the stream.</p>
 *
 *         <p>You can limit the number of shards returned by each call. For more information, see
 *                 <a href="https://docs.aws.amazon.com/kinesis/latest/dev/kinesis-using-sdk-java-retrieve-shards.html">Retrieving
 *                 Shards from a Stream</a> in the <i>Amazon Kinesis Data Streams Developer
 *                 Guide</i>.</p>
 *         <p>There are no guarantees about the chronological order shards returned. To process
 *             shards in chronological order, use the ID of the parent shard to track the lineage to
 *             the oldest shard.</p>
 *         <p>This operation has a limit of 10 transactions per second per account.</p>
 */
var DescribeStreamCommand = /** @class */ (function (_super) {
    __extends(DescribeStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeStreamCommand(input) {
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
    DescribeStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "DescribeStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeStreamOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeStreamCommand(input, context);
    };
    DescribeStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeStreamCommand(output, context);
    };
    return DescribeStreamCommand;
}($Command));
export { DescribeStreamCommand };
//# sourceMappingURL=DescribeStreamCommand.js.map