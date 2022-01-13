import { __extends } from "tslib";
import { ListFacesRequest, ListFacesResponse } from "../models/models_0";
import { deserializeAws_json1_1ListFacesCommand, serializeAws_json1_1ListFacesCommand } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns metadata for faces in the specified collection.
 *       This metadata includes information such as the bounding box coordinates, the confidence
 *       (that the bounding box contains a face), and face ID. For an example, see Listing Faces in a Collection
 *       in the Amazon Rekognition Developer Guide.</p>
 *
 *
 *          <p>This operation requires permissions to perform the
 *       <code>rekognition:ListFaces</code> action.</p>
 */
var ListFacesCommand = /** @class */ (function (_super) {
    __extends(ListFacesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ListFacesCommand(input) {
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
    ListFacesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "ListFacesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ListFacesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ListFacesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ListFacesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1ListFacesCommand(input, context);
    };
    ListFacesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1ListFacesCommand(output, context);
    };
    return ListFacesCommand;
}($Command));
export { ListFacesCommand };
//# sourceMappingURL=ListFacesCommand.js.map