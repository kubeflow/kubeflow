import { __extends } from "tslib";
import { ListShardsInput, ListShardsOutput } from "../models/models_0";
import { deserializeAws_json1_1ListShardsCommand, serializeAws_json1_1ListShardsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists the shards in a stream and provides information about each shard. This
 *             operation has a limit of 100 transactions per second per data stream.</p>
 *         <important>
 *             <p>This API is a new operation that is used by the Amazon Kinesis Client Library
 *                 (KCL). If you have a fine-grained IAM policy that only allows specific operations,
 *                 you must update your policy to allow calls to this API. For more information, see
 *                     <a href="https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html">Controlling Access to Amazon Kinesis Data Streams Resources Using
 *                 IAM</a>.</p>
 *         </important>
 */
var ListShardsCommand = /** @class */ (function (_super) {
    __extends(ListShardsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListShardsCommand(input) {
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
    ListShardsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "ListShardsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListShardsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListShardsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListShardsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListShardsCommand(input, context);
    };
    ListShardsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListShardsCommand(output, context);
    };
    return ListShardsCommand;
}($Command));
export { ListShardsCommand };
//# sourceMappingURL=ListShardsCommand.js.map