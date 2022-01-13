import { __extends } from "tslib";
import { DeleteFacesRequest, DeleteFacesResponse } from "../models/models_0";
import { deserializeAws_json1_1DeleteFacesCommand, serializeAws_json1_1DeleteFacesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes faces from a collection. You specify a collection ID and an array of face IDs
 *       to remove from the collection.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:DeleteFaces</code>
 *       action.</p>
 */
var DeleteFacesCommand = /** @class */ (function (_super) {
    __extends(DeleteFacesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteFacesCommand(input) {
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
    DeleteFacesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DeleteFacesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteFacesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteFacesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteFacesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteFacesCommand(input, context);
    };
    DeleteFacesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteFacesCommand(output, context);
    };
    return DeleteFacesCommand;
}($Command));
export { DeleteFacesCommand };
//# sourceMappingURL=DeleteFacesCommand.js.map