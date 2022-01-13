import { __extends } from "tslib";
import { PutRetentionPolicyRequest } from "../models/models_0";
import { deserializeAws_json1_1PutRetentionPolicyCommand, serializeAws_json1_1PutRetentionPolicyCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Sets the retention of the specified log group. A retention policy allows you to
 *       configure the number of days for which to retain log events in the specified log
 *       group.</p>
 */
var PutRetentionPolicyCommand = /** @class */ (function (_super) {
    __extends(PutRetentionPolicyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutRetentionPolicyCommand(input) {
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
    PutRetentionPolicyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "PutRetentionPolicyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutRetentionPolicyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutRetentionPolicyCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1PutRetentionPolicyCommand(input, context);
    };
    PutRetentionPolicyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1PutRetentionPolicyCommand(output, context);
    };
    return PutRetentionPolicyCommand;
}($Command));
export { PutRetentionPolicyCommand };
//# sourceMappingURL=PutRetentionPolicyCommand.js.map