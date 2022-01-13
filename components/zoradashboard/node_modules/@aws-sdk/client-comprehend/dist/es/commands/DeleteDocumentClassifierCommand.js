import { __extends } from "tslib";
import { DeleteDocumentClassifierRequest, DeleteDocumentClassifierResponse } from "../models/models_0";
import { deserializeAws_json1_1DeleteDocumentClassifierCommand, serializeAws_json1_1DeleteDocumentClassifierCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes a previously created document classifier</p>
 *          <p>Only those classifiers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 *       If an active inference job is using the model, a <code>ResourceInUseException</code> will be
 *       returned.</p>
 *          <p>This is an asynchronous action that puts the classifier into a DELETING state, and it is
 *       then removed by a background job. Once removed, the classifier disappears from your account
 *       and is no longer available for use. </p>
 */
var DeleteDocumentClassifierCommand = /** @class */ (function (_super) {
    __extends(DeleteDocumentClassifierCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteDocumentClassifierCommand(input) {
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
    DeleteDocumentClassifierCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ComprehendClient";
        var commandName = "DeleteDocumentClassifierCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteDocumentClassifierRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteDocumentClassifierResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteDocumentClassifierCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteDocumentClassifierCommand(input, context);
    };
    DeleteDocumentClassifierCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteDocumentClassifierCommand(output, context);
    };
    return DeleteDocumentClassifierCommand;
}($Command));
export { DeleteDocumentClassifierCommand };
//# sourceMappingURL=DeleteDocumentClassifierCommand.js.map