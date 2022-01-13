import { __extends } from "tslib";
import { DisableEnhancedMonitoringInput, EnhancedMonitoringOutput } from "../models/models_0";
import { deserializeAws_json1_1DisableEnhancedMonitoringCommand, serializeAws_json1_1DisableEnhancedMonitoringCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Disables enhanced monitoring.</p>
 */
var DisableEnhancedMonitoringCommand = /** @class */ (function (_super) {
    __extends(DisableEnhancedMonitoringCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DisableEnhancedMonitoringCommand(input) {
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
    DisableEnhancedMonitoringCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KinesisClient";
        var commandName = "DisableEnhancedMonitoringCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DisableEnhancedMonitoringInput.filterSensitiveLog,
            outputFilterSensitiveLog: EnhancedMonitoringOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DisableEnhancedMonitoringCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DisableEnhancedMonitoringCommand(input, context);
    };
    DisableEnhancedMonitoringCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DisableEnhancedMonitoringCommand(output, context);
    };
    return DisableEnhancedMonitoringCommand;
}($Command));
export { DisableEnhancedMonitoringCommand };
//# sourceMappingURL=DisableEnhancedMonitoringCommand.js.map