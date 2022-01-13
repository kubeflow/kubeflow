import { __extends } from "tslib";
import { DeleteRetentionPolicyRequest } from "../models/models_0";
import { deserializeAws_json1_1DeleteRetentionPolicyCommand, serializeAws_json1_1DeleteRetentionPolicyCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified retention policy.</p>
 *          <p>Log events do not expire if they belong to log groups without a retention policy.</p>
 */
var DeleteRetentionPolicyCommand = /** @class */ (function (_super) {
    __extends(DeleteRetentionPolicyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteRetentionPolicyCommand(input) {
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
    DeleteRetentionPolicyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "DeleteRetentionPolicyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteRetentionPolicyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteRetentionPolicyCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteRetentionPolicyCommand(input, context);
    };
    DeleteRetentionPolicyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteRetentionPolicyCommand(output, context);
    };
    return DeleteRetentionPolicyCommand;
}($Command));
export { DeleteRetentionPolicyCommand };
//# sourceMappingURL=DeleteRetentionPolicyCommand.js.map