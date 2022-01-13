import { __extends } from "tslib";
import { DeleteProjectVersionRequest, DeleteProjectVersionResponse } from "../models/models_0";
import { deserializeAws_json1_1DeleteProjectVersionCommand, serializeAws_json1_1DeleteProjectVersionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes an Amazon Rekognition Custom Labels model.  </p>
 *          <p>You can't delete a model if it is running or if it is training.
 *           To check the status of a model, use the <code>Status</code> field returned
 *          from <a>DescribeProjectVersions</a>.
 *          To stop a running model call <a>StopProjectVersion</a>. If the model
 *       is training, wait until it finishes.</p>
 *          <p>This operation requires permissions to perform the
 *          <code>rekognition:DeleteProjectVersion</code> action. </p>
 */
var DeleteProjectVersionCommand = /** @class */ (function (_super) {
    __extends(DeleteProjectVersionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteProjectVersionCommand(input) {
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
    DeleteProjectVersionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DeleteProjectVersionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteProjectVersionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteProjectVersionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteProjectVersionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteProjectVersionCommand(input, context);
    };
    DeleteProjectVersionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteProjectVersionCommand(output, context);
    };
    return DeleteProjectVersionCommand;
}($Command));
export { DeleteProjectVersionCommand };
//# sourceMappingURL=DeleteProjectVersionCommand.js.map