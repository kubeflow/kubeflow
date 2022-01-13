import { __extends } from "tslib";
import { DeleteProjectRequest, DeleteProjectResponse } from "../models/models_0";
import { deserializeAws_json1_1DeleteProjectCommand, serializeAws_json1_1DeleteProjectCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes an Amazon Rekognition Custom Labels project.  To delete a project you must first delete all models associated
 *          with the project. To delete a model, see <a>DeleteProjectVersion</a>.</p>
 *          <p>This operation requires permissions to perform the
 *          <code>rekognition:DeleteProject</code> action. </p>
 */
var DeleteProjectCommand = /** @class */ (function (_super) {
    __extends(DeleteProjectCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteProjectCommand(input) {
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
    DeleteProjectCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DeleteProjectCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteProjectRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteProjectResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteProjectCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteProjectCommand(input, context);
    };
    DeleteProjectCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteProjectCommand(output, context);
    };
    return DeleteProjectCommand;
}($Command));
export { DeleteProjectCommand };
//# sourceMappingURL=DeleteProjectCommand.js.map