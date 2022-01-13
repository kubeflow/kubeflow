import { __extends } from "tslib";
import { DeleteTerminologyRequest } from "../models/models_0";
import { deserializeAws_json1_1DeleteTerminologyCommand, serializeAws_json1_1DeleteTerminologyCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>A synchronous action that deletes a custom terminology.</p>
 */
var DeleteTerminologyCommand = /** @class */ (function (_super) {
    __extends(DeleteTerminologyCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteTerminologyCommand(input) {
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
    DeleteTerminologyCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "TranslateClient";
        var commandName = "DeleteTerminologyCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteTerminologyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteTerminologyCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteTerminologyCommand(input, context);
    };
    DeleteTerminologyCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteTerminologyCommand(output, context);
    };
    return DeleteTerminologyCommand;
}($Command));
export { DeleteTerminologyCommand };
//# sourceMappingURL=DeleteTerminologyCommand.js.map