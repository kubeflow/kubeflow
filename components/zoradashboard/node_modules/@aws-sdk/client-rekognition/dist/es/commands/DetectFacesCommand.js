import { __extends } from "tslib";
import { DetectFacesRequest, DetectFacesResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectFacesCommand, serializeAws_json1_1DetectFacesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Detects faces within an image that is provided as input.</p>
 *
 *          <p>
 *             <code>DetectFaces</code> detects the 100 largest faces in the image. For each face
 *       detected, the operation returns face details. These details include a bounding box of the
 *       face, a confidence value (that the bounding box contains a face), and a fixed set of
 *       attributes such as facial landmarks (for example, coordinates of eye and mouth),
 *       presence of beard, sunglasses, and so on. </p>
 *          <p>The face-detection algorithm is most effective on frontal faces. For non-frontal or
 *       obscured faces, the algorithm might not detect the faces or might detect faces with lower
 *       confidence. </p>
 *          <p>You pass the input image either as base64-encoded image bytes or as a reference to an
 *       image in an Amazon S3 bucket. If you use the AWS CLI
 *        to call Amazon Rekognition operations, passing image bytes is not
 *       supported. The image must be either a PNG or JPEG formatted file. </p>
 *
 *          <note>
 *             <p>This is a stateless API operation. That is, the operation does not persist any
 *         data.</p>
 *          </note>
 *
 *          <p>This operation requires permissions to perform the
 *       <code>rekognition:DetectFaces</code> action. </p>
 */
var DetectFacesCommand = /** @class */ (function (_super) {
    __extends(DetectFacesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectFacesCommand(input) {
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
    DetectFacesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DetectFacesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectFacesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectFacesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectFacesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectFacesCommand(input, context);
    };
    DetectFacesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectFacesCommand(output, context);
    };
    return DetectFacesCommand;
}($Command));
export { DetectFacesCommand };
//# sourceMappingURL=DetectFacesCommand.js.map