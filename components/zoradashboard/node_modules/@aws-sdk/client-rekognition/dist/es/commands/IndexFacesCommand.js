import { __extends } from "tslib";
import { IndexFacesRequest, IndexFacesResponse } from "../models/models_0";
import { deserializeAws_json1_1IndexFacesCommand, serializeAws_json1_1IndexFacesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Detects faces in the input image and adds them to the specified collection. </p>
 *          <p>Amazon Rekognition doesn't save the actual faces that are detected. Instead, the underlying
 *       detection algorithm first detects the faces in the input image. For each face, the algorithm
 *       extracts facial features into a feature vector, and stores it in the backend database.
 *       Amazon Rekognition uses feature vectors when it performs face match and search operations using the
 *         <a>SearchFaces</a> and <a>SearchFacesByImage</a>
 *       operations.</p>
 *
 *          <p>For more information, see Adding Faces to a Collection in the Amazon Rekognition
 *       Developer Guide.</p>
 *          <p>To get the number of faces in a collection, call <a>DescribeCollection</a>. </p>
 *
 *          <p>If you're using version 1.0 of the face detection model, <code>IndexFaces</code>
 *       indexes the 15 largest faces in the input image. Later versions of the face detection model
 *       index the 100 largest faces in the input image. </p>
 *          <p>If you're using version 4 or later of the face model, image orientation information
 *      is not returned in the <code>OrientationCorrection</code> field. </p>
 *          <p>To determine which version of the model you're using, call <a>DescribeCollection</a>
 *       and supply the collection ID. You can also get the model version from the value of <code>FaceModelVersion</code> in the response
 *       from <code>IndexFaces</code>
 *          </p>
 *
 *          <p>For more information, see Model Versioning in the Amazon Rekognition Developer
 *       Guide.</p>
 *          <p>If you provide the optional <code>ExternalImageId</code> for the input image you
 *       provided, Amazon Rekognition associates this ID with all faces that it detects. When you call the <a>ListFaces</a> operation, the response returns the external ID. You can use this
 *       external image ID to create a client-side index to associate the faces with each image. You
 *       can then use the index to find all faces in an image.</p>
 *          <p>You can specify the maximum number of faces to index with the <code>MaxFaces</code> input
 *       parameter. This is useful when you want to index the largest faces in an image and don't want to index
 *       smaller faces, such as those belonging to people standing in the background.</p>
 *          <p>The <code>QualityFilter</code> input parameter allows you to filter out detected faces
 *       that don’t meet a required quality bar. The quality bar is based on a
 *       variety of common use cases. By default, <code>IndexFaces</code> chooses the quality bar that's
 *       used to filter faces.  You can also explicitly choose
 *       the quality bar. Use <code>QualityFilter</code>, to set the quality bar
 *       by specifying <code>LOW</code>, <code>MEDIUM</code>, or <code>HIGH</code>.
 *       If you do not want to filter detected faces, specify <code>NONE</code>. </p>
 *          <note>
 *             <p>To use quality filtering, you need a collection associated with version 3 of the
 *     face model or higher. To get the version of the face model associated with a collection, call
 *       <a>DescribeCollection</a>. </p>
 *          </note>
 *          <p>Information about faces detected in an image, but not indexed, is returned in an array of
 *       <a>UnindexedFace</a> objects, <code>UnindexedFaces</code>. Faces aren't
 *       indexed for reasons such as:</p>
 *          <ul>
 *             <li>
 *                <p>The number of faces detected exceeds the value of the <code>MaxFaces</code> request
 *           parameter.</p>
 *             </li>
 *             <li>
 *                <p>The face is too small compared to the image dimensions.</p>
 *             </li>
 *             <li>
 *                <p>The face is too blurry.</p>
 *             </li>
 *             <li>
 *                <p>The image is too dark.</p>
 *             </li>
 *             <li>
 *                <p>The face has an extreme pose.</p>
 *             </li>
 *             <li>
 *                <p>The face doesn’t have enough detail to be suitable for face search.</p>
 *             </li>
 *          </ul>
 *          <p>In response, the <code>IndexFaces</code> operation returns an array of metadata for
 *       all detected faces, <code>FaceRecords</code>. This includes: </p>
 *          <ul>
 *             <li>
 *                <p>The bounding box, <code>BoundingBox</code>, of the detected face. </p>
 *             </li>
 *             <li>
 *                <p>A confidence value, <code>Confidence</code>, which indicates the confidence that the
 *           bounding box contains a face.</p>
 *             </li>
 *             <li>
 *                <p>A face ID, <code>FaceId</code>, assigned by the service for each face that's detected
 *           and stored.</p>
 *             </li>
 *             <li>
 *                <p>An image ID, <code>ImageId</code>, assigned by the service for the input image.</p>
 *             </li>
 *          </ul>
 *          <p>If you request all facial attributes (by using the <code>detectionAttributes</code>
 *       parameter), Amazon Rekognition returns detailed facial attributes, such as facial landmarks (for
 *       example, location of eye and mouth) and other facial attributes. If you provide
 *       the same image, specify the same collection, and use the same external ID in the
 *         <code>IndexFaces</code> operation, Amazon Rekognition doesn't save duplicate face metadata.</p>
 *
 *
 *          <p></p>
 *
 *
 *          <p>The input image is passed either as base64-encoded image bytes, or as a reference to an
 *       image in an Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations,
 *       passing image bytes isn't supported. The image must be formatted as a PNG or JPEG file. </p>
 *          <p>This operation requires permissions to perform the <code>rekognition:IndexFaces</code>
 *       action.</p>
 */
var IndexFacesCommand = /** @class */ (function (_super) {
    __extends(IndexFacesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function IndexFacesCommand(input) {
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
    IndexFacesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "IndexFacesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: IndexFacesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: IndexFacesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    IndexFacesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1IndexFacesCommand(input, context);
    };
    IndexFacesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1IndexFacesCommand(output, context);
    };
    return IndexFacesCommand;
}($Command));
export { IndexFacesCommand };
//# sourceMappingURL=IndexFacesCommand.js.map