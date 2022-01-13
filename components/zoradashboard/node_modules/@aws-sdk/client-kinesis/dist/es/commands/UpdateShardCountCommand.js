import { __extends } from "tslib";
import { UpdateShardCountInput, UpdateShardCountOutput } from "../models/models_0";
import { deserializeAws_json1_1UpdateShardCountCommand, serializeAws_json1_1UpdateShardCountCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Updates the shard count of the specified stream to the specified number of
 *             shards.</p>
 *         <p>Updating the shard count is an asynchronous operation. Upon receiving the request,
 *             Kinesis Data Streams returns immediately and sets the status of the stream to
 *                 <code>UPDATING</code>. After the update is complete, Kinesis Data Streams sets the
 *             status of the stream back to <code>ACTIVE</code>. Depending on the size of the stream,
 *             the scaling action could take a few minutes to complete. You can continue to read and
 *             write data to your stream while its status is <code>UPDATING</code>.</p>
 *         <p>To update the shard count, Kinesis Data Streams performs splits or merges on
 *             individual shards. This can cause short-lived shards to be created, in addition to the
 *             final shards. These short-lived shards count towards your total shard limit for your
 *             account in the Region.</p>
 *         <p>When using this operation, we recommend that you specify a target shard count that
 *             is a multiple of 25% (25%, 50%, 75%, 100%). You can specify any target value within your
 *             shard limit. However, if you specify a target that isn't a multiple of 25%, the scaling
 *             action might take longer to complete. </p>
 *         <p>This operation has the following default limits. By default, you cannot do the
 *             following:</p>
 *         <ul>
 *             <li>
 *                 <p>Scale more than ten times per rolling 24-hour period per stream</p>
 *             </li>
 *             <li>
 *                 <p>Scale up to more than double your current shard count for a
 *                     stream</p>
 *             </li>
 *             <li>
 *                 <p>Scale down below half your current shard count for a stream</p>
 *             </li>
 *             <li>
 *                 <p>Scale up to more than 500 shards in a stream</p>
 *             </li>
 *             <li>
 *                 <p>Scale a stream with more than 500 shards down unless the result is less
 *                     than 500 shards</p>
 *             </li>
 *             <li>
 *                 <p>Scale up to more than the shard limit for your account</p>
 *             </li>
 *          </ul>
 *         <p>For the default limits for an AWS account, see <a href="https://docs.aws.amazon.com/kinesis/latest/dev/service-sizes-and-limits.html">Streams Limits</a> in the
 *                 <i>Amazon Kinesis Data Streams Developer Guide</i>. To request an
 *             increase in the call rate limit, the shard limit for this API, or your overall shard
 *             limit, use the <a href="https://console.aws.amazon.com/support/v1#/case/create?issueType=service-limit-increase&limitType=service-code-kinesis">limits form</a>.</p>
 */
var UpdateShardCountCommand = /** @class */ (function (_super) {
    __extends(UpdateShardCountCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateShardCountCommand(input) {
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
    UpdateShardCountCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "UpdateShardCountCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateShardCountInput.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateShardCountOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateShardCountCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1UpdateShardCountCommand(input, context);
    };
    UpdateShardCountCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1UpdateShardCountCommand(output, context);
    };
    return UpdateShardCountCommand;
}($Command));
export { UpdateShardCountCommand };
//# sourceMappingURL=UpdateShardCountCommand.js.map