import { __extends } from "tslib";
import { SearchFacesRequest, SearchFacesResponse } from "../models/models_0";
import { deserializeAws_json1_1SearchFacesCommand, serializeAws_json1_1SearchFacesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>For a given input face ID, searches for matching faces in the collection the face
 *       belongs to. You get a face ID when you add a face to the collection using the <a>IndexFaces</a> operation. The operation compares the features of the input face with
 *       faces in the specified collection. </p>
 *          <note>
 *             <p>You can also search faces without indexing faces by using the
 *           <code>SearchFacesByImage</code> operation.</p>
 *          </note>
 *
 *          <p>
 *      The operation response returns
 *       an array of faces that match, ordered by similarity score with the highest
 *       similarity first. More specifically, it is an
 *       array of metadata for each face match that is found. Along with the metadata, the response also
 *       includes a <code>confidence</code> value for each face match, indicating the confidence
 *       that the specific face matches the input face.
 *     </p>
 *
 *          <p>For an example, see Searching for a Face Using Its Face ID in the Amazon Rekognition Developer Guide.</p>
 *
 *          <p>This operation requires permissions to perform the <code>rekognition:SearchFaces</code>
 *       action.</p>
 */
var SearchFacesCommand = /** @class */ (function (_super) {
    __extends(SearchFacesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function SearchFacesCommand(input) {
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
    SearchFacesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "SearchFacesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SearchFacesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: SearchFacesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SearchFacesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1SearchFacesCommand(input, context);
    };
    SearchFacesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1SearchFacesCommand(output, context);
    };
    return SearchFacesCommand;
}($Command));
export { SearchFacesCommand };
//# sourceMappingURL=SearchFacesCommand.js.map