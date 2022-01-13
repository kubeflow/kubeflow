import { __extends } from "tslib";
import { DeleteStreamInput } from "../models/models_0";
import { deserializeAws_json1_1DeleteStreamCommand, serializeAws_json1_1DeleteStreamCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes a Kinesis data stream and all its shards and data. You must shut down any
 *             applications that are operating on the stream before you delete the stream. If an
 *             application attempts to operate on a deleted stream, it receives the exception
 *                 <code>ResourceNotFoundException</code>.</p>
 *         <p>If the stream is in the <code>ACTIVE</code> state, you can delete it. After a
 *                 <code>DeleteStream</code> request, the specified stream is in the
 *                 <code>DELETING</code> state until Kinesis Data Streams completes the
 *             deletion.</p>
 *         <p>
 *             <b>Note:</b> Kinesis Data Streams might continue to accept
 *             data read and write operations, such as <a>PutRecord</a>, <a>PutRecords</a>, and <a>GetRecords</a>, on a stream in the
 *                 <code>DELETING</code> state until the stream deletion is complete.</p>
 *         <p>When you delete a stream, any shards in that stream are also deleted, and any tags
 *             are dissociated from the stream.</p>
 *         <p>You can use the <a>DescribeStream</a> operation to check the state of
 *             the stream, which is returned in <code>StreamStatus</code>.</p>
 *         <p>
 *             <a>DeleteStream</a> has a limit of five transactions per second per
 *             account.</p>
 */
var DeleteStreamCommand = /** @class */ (function (_super) {
    __extends(DeleteStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteStreamCommand(input) {
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
    DeleteStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "DeleteStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteStreamInput.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteStreamCommand(input, context);
    };
    DeleteStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteStreamCommand(output, context);
    };
    return DeleteStreamCommand;
}($Command));
export { DeleteStreamCommand };
//# sourceMappingURL=DeleteStreamCommand.js.map