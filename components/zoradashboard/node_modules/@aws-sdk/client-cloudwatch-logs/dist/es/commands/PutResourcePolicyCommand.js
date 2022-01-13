import { __extends } from "tslib";
import { PutResourcePolicyRequest, PutResourcePolicyResponse } from "../models/models_0";
import { deserializeAws_json1_1PutResourcePolicyCommand, serializeAws_json1_1PutResourcePolicyCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates or updates a resource policy allowing other AWS services to put log events to
 *       this account, such as Amazon Route 53. An account can have up to 10 resource policies per AWS
 *       Region.</p>
 */
var PutResourcePolicyCommand = /** @class */ (function (_super) {
    __extends(PutResourcePolicyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutResourcePolicyCommand(input) {
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
    PutResourcePolicyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudWatchLogsClient";
        var commandName = "PutResourcePolicyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutResourcePolicyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: PutResourcePolicyResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutResourcePolicyCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1PutResourcePolicyCommand(input, context);
    };
    PutResourcePolicyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1PutResourcePolicyCommand(output, context);
    };
    return PutResourcePolicyCommand;
}($Command));
export { PutResourcePolicyCommand };
//# sourceMappingURL=PutResourcePolicyCommand.js.map