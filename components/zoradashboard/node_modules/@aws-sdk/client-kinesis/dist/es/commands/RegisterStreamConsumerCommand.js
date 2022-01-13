import { __extends } from "tslib";
import { RegisterStreamConsumerInput, RegisterStreamConsumerOutput } from "../models/models_0";
import { deserializeAws_json1_1RegisterStreamConsumerCommand, serializeAws_json1_1RegisterStreamConsumerCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Registers a consumer with a Kinesis data stream. When you use this operation, the
 *             consumer you register can then call <a>SubscribeToShard</a> to receive data
 *             from the stream using enhanced fan-out, at a rate of up to 2 MiB per second for every
 *             shard you subscribe to. This rate is unaffected by the total number of consumers that
 *             read from the same stream.</p>
 *         <p>You can register up to 20 consumers per stream. A given consumer can only be
 *             registered with one stream at a time.</p>
 *         <p>For an example of how to use this operations, see <a href="/streams/latest/dev/building-enhanced-consumers-api.html">Enhanced Fan-Out
 *                 Using the Kinesis Data Streams API</a>.</p>
 *         <p>The use of this operation has a limit of five transactions per second per account.
 *             Also, only 5 consumers can be created simultaneously. In other words, you cannot have
 *             more than 5 consumers in a <code>CREATING</code> status at the same time. Registering a
 *             6th consumer while there are 5 in a <code>CREATING</code> status results in a
 *                 <code>LimitExceededException</code>.</p>
 */
var RegisterStreamConsumerCommand = /** @class */ (function (_super) {
    __extends(RegisterStreamConsumerCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function RegisterStreamConsumerCommand(input) {
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
    RegisterStreamConsumerCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "RegisterStreamConsumerCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RegisterStreamConsumerInput.filterSensitiveLog,
            outputFilterSensitiveLog: RegisterStreamConsumerOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RegisterStreamConsumerCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1RegisterStreamConsumerCommand(input, context);
    };
    RegisterStreamConsumerCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1RegisterStreamConsumerCommand(output, context);
    };
    return RegisterStreamConsumerCommand;
}($Command));
export { RegisterStreamConsumerCommand };
//# sourceMappingURL=RegisterStreamConsumerCommand.js.map