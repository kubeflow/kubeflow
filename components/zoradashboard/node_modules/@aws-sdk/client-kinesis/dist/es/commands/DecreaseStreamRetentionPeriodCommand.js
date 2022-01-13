import { __extends } from "tslib";
import { DecreaseStreamRetentionPeriodInput } from "../models/models_0";
import { deserializeAws_json1_1DecreaseStreamRetentionPeriodCommand, serializeAws_json1_1DecreaseStreamRetentionPeriodCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Decreases the Kinesis data stream's retention period, which is the length of time
 *             data records are accessible after they are added to the stream. The minimum value of a
 *             stream's retention period is 24 hours.</p>
 *         <p>This operation may result in lost data. For example, if the stream's retention
 *             period is 48 hours and is decreased to 24 hours, any data already in the stream that is
 *             older than 24 hours is inaccessible.</p>
 */
var DecreaseStreamRetentionPeriodCommand = /** @class */ (function (_super) {
    __extends(DecreaseStreamRetentionPeriodCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DecreaseStreamRetentionPeriodCommand(input) {
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
    DecreaseStreamRetentionPeriodCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "DecreaseStreamRetentionPeriodCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DecreaseStreamRetentionPeriodInput.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DecreaseStreamRetentionPeriodCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DecreaseStreamRetentionPeriodCommand(input, context);
    };
    DecreaseStreamRetentionPeriodCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DecreaseStreamRetentionPeriodCommand(output, context);
    };
    return DecreaseStreamRetentionPeriodCommand;
}($Command));
export { DecreaseStreamRetentionPeriodCommand };
//# sourceMappingURL=DecreaseStreamRetentionPeriodCommand.js.map