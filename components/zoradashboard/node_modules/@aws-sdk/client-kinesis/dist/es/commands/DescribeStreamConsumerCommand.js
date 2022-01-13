import { __extends } from "tslib";
import { DescribeStreamConsumerInput, DescribeStreamConsumerOutput } from "../models/models_0";
import { deserializeAws_json1_1DescribeStreamConsumerCommand, serializeAws_json1_1DescribeStreamConsumerCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>To get the description of a registered consumer, provide the ARN of the consumer.
 *             Alternatively, you can provide the ARN of the data stream and the name you gave the
 *             consumer when you registered it. You may also provide all three parameters, as long as
 *             they don't conflict with each other. If you don't know the name or ARN of the consumer
 *             that you want to describe, you can use the <a>ListStreamConsumers</a>
 *             operation to get a list of the descriptions of all the consumers that are currently
 *             registered with a given data stream.</p>
 *         <p>This operation has a limit of 20 transactions per second per stream.</p>
 */
var DescribeStreamConsumerCommand = /** @class */ (function (_super) {
    __extends(DescribeStreamConsumerCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DescribeStreamConsumerCommand(input) {
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
    DescribeStreamConsumerCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "DescribeStreamConsumerCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DescribeStreamConsumerInput.filterSensitiveLog,
            outputFilterSensitiveLog: DescribeStreamConsumerOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DescribeStreamConsumerCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DescribeStreamConsumerCommand(input, context);
    };
    DescribeStreamConsumerCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DescribeStreamConsumerCommand(output, context);
    };
    return DescribeStreamConsumerCommand;
}($Command));
export { DescribeStreamConsumerCommand };
//# sourceMappingURL=DescribeStreamConsumerCommand.js.map