import { __extends } from "tslib";
import { SubscribeToShardInput, SubscribeToShardOutput } from "../models/models_0";
import { deserializeAws_json1_1SubscribeToShardCommand, serializeAws_json1_1SubscribeToShardCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>This operation establishes an HTTP/2 connection between the consumer you specify in
 *             the <code>ConsumerARN</code> parameter and the shard you specify in the
 *                 <code>ShardId</code> parameter. After the connection is successfully established,
 *             Kinesis Data Streams pushes records from the shard to the consumer over this connection.
 *             Before you call this operation, call <a>RegisterStreamConsumer</a> to
 *             register the consumer with Kinesis Data Streams.</p>
 *         <p>When the <code>SubscribeToShard</code> call succeeds, your consumer starts receiving
 *             events of type <a>SubscribeToShardEvent</a> over the HTTP/2 connection for up
 *             to 5 minutes, after which time you need to call <code>SubscribeToShard</code> again to
 *             renew the subscription if you want to continue to receive records.</p>
 *         <p>You can make one call to <code>SubscribeToShard</code> per second per registered
 *             consumer per shard. For example, if you have a 4000 shard stream and two registered
 *             stream consumers, you can make one <code>SubscribeToShard</code> request per second for
 *             each combination of shard and registered consumer, allowing you to subscribe both
 *             consumers to all 4000 shards in one second. </p>
 *         <p>If you call <code>SubscribeToShard</code> again with the same <code>ConsumerARN</code>
 *             and <code>ShardId</code> within 5 seconds of a successful call, you'll get a
 *                 <code>ResourceInUseException</code>. If you call <code>SubscribeToShard</code> 5
 *             seconds or more after a successful call, the first connection will expire and the second
 *             call will take over the subscription.</p>
 *         <p>For an example of how to use this operations, see <a href="/streams/latest/dev/building-enhanced-consumers-api.html">Enhanced Fan-Out
 *                 Using the Kinesis Data Streams API</a>.</p>
 */
var SubscribeToShardCommand = /** @class */ (function (_super) {
    __extends(SubscribeToShardCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SubscribeToShardCommand(input) {
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
    SubscribeToShardCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "SubscribeToShardCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SubscribeToShardInput.filterSensitiveLog,
            outputFilterSensitiveLog: SubscribeToShardOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SubscribeToShardCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1SubscribeToShardCommand(input, context);
    };
    SubscribeToShardCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1SubscribeToShardCommand(output, context);
    };
    return SubscribeToShardCommand;
}($Command));
export { SubscribeToShardCommand };
//# sourceMappingURL=SubscribeToShardCommand.js.map