import { __extends } from "tslib";
import { DeleteCollectionRequest, DeleteCollectionResponse } from "../models/models_0";
import { deserializeAws_json1_1DeleteCollectionCommand, serializeAws_json1_1DeleteCollectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the specified collection. Note that this operation
 *       removes all faces in the collection. For an example, see <a>delete-collection-procedure</a>.</p>
 *
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:DeleteCollection</code> action.</p>
 */
var DeleteCollectionCommand = /** @class */ (function (_super) {
    __extends(DeleteCollectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteCollectionCommand(input) {
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
    DeleteCollectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DeleteCollectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteCollectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteCollectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteCollectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DeleteCollectionCommand(input, context);
    };
    DeleteCollectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DeleteCollectionCommand(output, context);
    };
    return DeleteCollectionCommand;
}($Command));
export { DeleteCollectionCommand };
//# sourceMappingURL=DeleteCollectionCommand.js.map