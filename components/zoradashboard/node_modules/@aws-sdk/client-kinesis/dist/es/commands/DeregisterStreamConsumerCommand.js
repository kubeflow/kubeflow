import { __extends } from "tslib";
import { DeregisterStreamConsumerInput } from "../models/models_0";
import { deserializeAws_json1_1DeregisterStreamConsumerCommand, serializeAws_json1_1DeregisterStreamConsumerCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>To deregister a consumer, provide its ARN. Alternatively, you can provide the ARN of
 *             the data stream and the name you gave the consumer when you registered it. You may also
 *             provide all three parameters, as long as they don't conflict with each other. If you
 *             don't know the name or ARN of the consumer that you want to deregister, you can use the
 *                 <a>ListStreamConsumers</a> operation to get a list of the descriptions of
 *             all the consumers that are currently registered with a given data stream. The
 *             description of a consumer contains its name and ARN.</p>
 *         <p>This operation has a limit of five transactions per second per stream.</p>
 */
var DeregisterStreamConsumerCommand = /** @class */ (function (_super) {
    __extends(DeregisterStreamConsumerCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeregisterStreamConsumerCommand(input) {
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
    DeregisterStreamConsumerCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "DeregisterStreamConsumerCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeregisterStreamConsumerInput.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeregisterStreamConsumerCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeregisterStreamConsumerCommand(input, context);
    };
    DeregisterStreamConsumerCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeregisterStreamConsumerCommand(output, context);
    };
    return DeregisterStreamConsumerCommand;
}($Command));
export { DeregisterStreamConsumerCommand };
//# sourceMappingURL=DeregisterStreamConsumerCommand.js.map