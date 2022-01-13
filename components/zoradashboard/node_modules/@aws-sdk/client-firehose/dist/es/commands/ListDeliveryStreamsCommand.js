import { __extends } from "tslib";
import { ListDeliveryStreamsInput, ListDeliveryStreamsOutput } from "../models/models_0";
import { deserializeAws_json1_1ListDeliveryStreamsCommand, serializeAws_json1_1ListDeliveryStreamsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Lists your delivery streams in alphabetical order of their names.</p>
 *          <p>The number of delivery streams might be too large to return using a single call to
 *             <code>ListDeliveryStreams</code>. You can limit the number of delivery streams returned,
 *          using the <code>Limit</code> parameter. To determine whether there are more delivery
 *          streams to list, check the value of <code>HasMoreDeliveryStreams</code> in the output. If
 *          there are more delivery streams to list, you can request them by calling this operation
 *          again and setting the <code>ExclusiveStartDeliveryStreamName</code> parameter to the name
 *          of the last delivery stream returned in the last call.</p>
 */
var ListDeliveryStreamsCommand = /** @class */ (function (_super) {
    __extends(ListDeliveryStreamsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListDeliveryStreamsCommand(input) {
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
    ListDeliveryStreamsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "FirehoseClient";
        var commandName = "ListDeliveryStreamsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListDeliveryStreamsInput.filterSensitiveLog,
            outputFilterSensitiveLog: ListDeliveryStreamsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListDeliveryStreamsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListDeliveryStreamsCommand(input, context);
    };
    ListDeliveryStreamsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListDeliveryStreamsCommand(output, context);
    };
    return ListDeliveryStreamsCommand;
}($Command));
export { ListDeliveryStreamsCommand };
//# sourceMappingURL=ListDeliveryStreamsCommand.js.map