import { __extends } from "tslib";
import { IncreaseStreamRetentionPeriodInput } from "../models/models_0";
import { deserializeAws_json1_1IncreaseStreamRetentionPeriodCommand, serializeAws_json1_1IncreaseStreamRetentionPeriodCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Increases the Kinesis data stream's retention period, which is the length of time
 *             data records are accessible after they are added to the stream. The maximum value of a
 *             stream's retention period is 168 hours (7 days).</p>
 *         <p>If you choose a longer stream retention period, this operation increases the time
 *             period during which records that have not yet expired are accessible. However, it does
 *             not make previous, expired data (older than the stream's previous retention period)
 *             accessible after the operation has been called. For example, if a stream's retention
 *             period is set to 24 hours and is increased to 168 hours, any data that is older than 24
 *             hours remains inaccessible to consumer applications.</p>
 */
var IncreaseStreamRetentionPeriodCommand = /** @class */ (function (_super) {
    __extends(IncreaseStreamRetentionPeriodCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function IncreaseStreamRetentionPeriodCommand(input) {
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
    IncreaseStreamRetentionPeriodCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "IncreaseStreamRetentionPeriodCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: IncreaseStreamRetentionPeriodInput.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    IncreaseStreamRetentionPeriodCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1IncreaseStreamRetentionPeriodCommand(input, context);
    };
    IncreaseStreamRetentionPeriodCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1IncreaseStreamRetentionPeriodCommand(output, context);
    };
    return IncreaseStreamRetentionPeriodCommand;
}($Command));
export { IncreaseStreamRetentionPeriodCommand };
//# sourceMappingURL=IncreaseStreamRetentionPeriodCommand.js.map