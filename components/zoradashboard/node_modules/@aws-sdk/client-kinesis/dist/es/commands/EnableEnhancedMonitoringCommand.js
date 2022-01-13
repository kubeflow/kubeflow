import { __extends } from "tslib";
import { EnableEnhancedMonitoringInput, EnhancedMonitoringOutput } from "../models/models_0";
import { deserializeAws_json1_1EnableEnhancedMonitoringCommand, serializeAws_json1_1EnableEnhancedMonitoringCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Enables enhanced Kinesis data stream monitoring for shard-level metrics.</p>
 */
var EnableEnhancedMonitoringCommand = /** @class */ (function (_super) {
    __extends(EnableEnhancedMonitoringCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function EnableEnhancedMonitoringCommand(input) {
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
    EnableEnhancedMonitoringCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "EnableEnhancedMonitoringCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: EnableEnhancedMonitoringInput.filterSensitiveLog,
            outputFilterSensitiveLog: EnhancedMonitoringOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    EnableEnhancedMonitoringCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1EnableEnhancedMonitoringCommand(input, context);
    };
    EnableEnhancedMonitoringCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1EnableEnhancedMonitoringCommand(output, context);
    };
    return EnableEnhancedMonitoringCommand;
}($Command));
export { EnableEnhancedMonitoringCommand };
//# sourceMappingURL=EnableEnhancedMonitoringCommand.js.map