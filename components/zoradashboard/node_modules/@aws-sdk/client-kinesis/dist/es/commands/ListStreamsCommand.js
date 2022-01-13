import { __extends } from "tslib";
import { ListStreamsInput, ListStreamsOutput } from "../models/models_0";
import { deserializeAws_json1_1ListStreamsCommand, serializeAws_json1_1ListStreamsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists your Kinesis data streams.</p>
 *         <p>The number of streams may be too large to return from a single call to
 *                 <code>ListStreams</code>. You can limit the number of returned streams using the
 *                 <code>Limit</code> parameter. If you do not specify a value for the
 *                 <code>Limit</code> parameter, Kinesis Data Streams uses the default limit, which is
 *             currently 10.</p>
 *         <p>You can detect if there are more streams available to list by using the
 *                 <code>HasMoreStreams</code> flag from the returned output. If there are more streams
 *             available, you can request more streams by using the name of the last stream returned by
 *             the <code>ListStreams</code> request in the <code>ExclusiveStartStreamName</code>
 *             parameter in a subsequent request to <code>ListStreams</code>. The group of stream names
 *             returned by the subsequent request is then added to the list. You can continue this
 *             process until all the stream names have been collected in the list. </p>
 *         <p>
 *             <a>ListStreams</a> has a limit of five transactions per second per
 *             account.</p>
 */
var ListStreamsCommand = /** @class */ (function (_super) {
    __extends(ListStreamsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListStreamsCommand(input) {
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
    ListStreamsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "ListStreamsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListStreamsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListStreamsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListStreamsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListStreamsCommand(input, context);
    };
    ListStreamsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListStreamsCommand(output, context);
    };
    return ListStreamsCommand;
}($Command));
export { ListStreamsCommand };
//# sourceMappingURL=ListStreamsCommand.js.map