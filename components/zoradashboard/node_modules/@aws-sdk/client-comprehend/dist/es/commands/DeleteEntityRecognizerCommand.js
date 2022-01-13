import { __extends } from "tslib";
import { DeleteEntityRecognizerRequest, DeleteEntityRecognizerResponse } from "../models/models_0";
import { deserializeAws_json1_1DeleteEntityRecognizerCommand, serializeAws_json1_1DeleteEntityRecognizerCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes an entity recognizer.</p>
 *          <p>Only those recognizers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
 *       returned.</p>
 *          <p>This is an asynchronous action that puts the recognizer into a DELETING state, and it is
 *       then removed by a background job. Once removed, the recognizer disappears from your account
 *       and is no longer available for use. </p>
 */
var DeleteEntityRecognizerCommand = /** @class */ (function (_super) {
    __extends(DeleteEntityRecognizerCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteEntityRecognizerCommand(input) {
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
    DeleteEntityRecognizerCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DeleteEntityRecognizerCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteEntityRecognizerRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteEntityRecognizerResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteEntityRecognizerCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteEntityRecognizerCommand(input, context);
    };
    DeleteEntityRecognizerCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteEntityRecognizerCommand(output, context);
    };
    return DeleteEntityRecognizerCommand;
}($Command));
export { DeleteEntityRecognizerCommand };
//# sourceMappingURL=DeleteEntityRecognizerCommand.js.map