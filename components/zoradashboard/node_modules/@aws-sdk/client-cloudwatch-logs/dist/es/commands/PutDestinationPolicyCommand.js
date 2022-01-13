import { __extends } from "tslib";
import { PutDestinationPolicyRequest } from "../models/models_0";
import { deserializeAws_json1_1PutDestinationPolicyCommand, serializeAws_json1_1PutDestinationPolicyCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates or updates an access policy associated with an existing
 *       destination. An access policy is an <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/policies_overview.html">IAM policy document</a> that is used
 *       to authorize claims to register a subscription filter against a given destination.</p>
 */
var PutDestinationPolicyCommand = /** @class */ (function (_super) {
    __extends(PutDestinationPolicyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutDestinationPolicyCommand(input) {
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
    PutDestinationPolicyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "PutDestinationPolicyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutDestinationPolicyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutDestinationPolicyCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1PutDestinationPolicyCommand(input, context);
    };
    PutDestinationPolicyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1PutDestinationPolicyCommand(output, context);
    };
    return PutDestinationPolicyCommand;
}($Command));
export { PutDestinationPolicyCommand };
//# sourceMappingURL=PutDestinationPolicyCommand.js.map