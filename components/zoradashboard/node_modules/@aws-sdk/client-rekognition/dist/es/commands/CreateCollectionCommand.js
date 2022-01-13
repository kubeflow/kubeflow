import { __extends } from "tslib";
import { CreateCollectionRequest, CreateCollectionResponse } from "../models/models_0";
import { deserializeAws_json1_1CreateCollectionCommand, serializeAws_json1_1CreateCollectionCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Creates a collection in an AWS Region. You can add faces to the collection using the
 *         <a>IndexFaces</a> operation. </p>
 *          <p>For example, you might create collections, one for each of your application users. A
 *       user can then index faces using the <code>IndexFaces</code> operation and persist results in a
 *       specific collection. Then, a user can search the collection for faces in the user-specific
 *       container. </p>
 *          <p>When you create a collection, it is associated with the latest version of the face model version.</p>
 *          <note>
 *             <p>Collection names are case-sensitive.</p>
 *          </note>
 *
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:CreateCollection</code> action.</p>
 */
var CreateCollectionCommand = /** @class */ (function (_super) {
    __extends(CreateCollectionCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function CreateCollectionCommand(input) {
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
    CreateCollectionCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "CreateCollectionCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: CreateCollectionRequest.filterSensitiveLog,
            outputFilterSensitiveLog: CreateCollectionResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    CreateCollectionCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1CreateCollectionCommand(input, context);
    };
    CreateCollectionCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1CreateCollectionCommand(output, context);
    };
    return CreateCollectionCommand;
}($Command));
export { CreateCollectionCommand };
//# sourceMappingURL=CreateCollectionCommand.js.map