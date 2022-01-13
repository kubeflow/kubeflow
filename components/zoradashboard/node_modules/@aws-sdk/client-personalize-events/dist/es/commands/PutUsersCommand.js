import { __extends } from "tslib";
import { PutUsersRequest } from "../models/models_0";
import { deserializeAws_restJson1PutUsersCommand, serializeAws_restJson1PutUsersCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Adds one or more users to a Users dataset. For more information see
 *       <a>importing-users</a>.</p>
 */
var PutUsersCommand = /** @class */ (function (_super) {
    __extends(PutUsersCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function PutUsersCommand(input) {
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
    PutUsersCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "PersonalizeEventsClient";
        var commandName = "PutUsersCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: PutUsersRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    PutUsersCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1PutUsersCommand(input, context);
    };
    PutUsersCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1PutUsersCommand(output, context);
    };
    return PutUsersCommand;
}($Command));
export { PutUsersCommand };
//# sourceMappingURL=PutUsersCommand.js.map