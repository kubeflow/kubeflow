"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareFacesCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Compares a face in the <i>source</i> input image with
 *       each of the 100 largest faces detected in the <i>target</i> input image.
 *     </p>
 *          <note>
 *             <p> If the source image contains multiple faces, the service detects the largest face
 *         and compares it with each face detected in the target image. </p>
 *          </note>
 *
 *
 *          <p>You pass the input and target images either as base64-encoded image bytes or as
 *       references to images in an Amazon S3 bucket. If you use the
 *       AWS
 *       CLI to call Amazon Rekognition operations, passing image bytes isn't
 *       supported. The image must be formatted as a PNG or JPEG file. </p>
 *          <p>In response, the operation returns an array of face matches ordered by similarity score
 *       in descending order. For each face match, the response provides a bounding box of the face,
 *       facial landmarks, pose details (pitch, role, and yaw), quality (brightness and sharpness), and
 *       confidence value (indicating the level of confidence that the bounding box contains a face).
 *       The response also provides a similarity score, which indicates how closely the faces match. </p>
 *
 *          <note>
 *             <p>By default, only faces with a similarity score of greater than or equal to 80% are
 *         returned in the response. You can change this value by specifying the
 *           <code>SimilarityThreshold</code> parameter.</p>
 *          </note>
 *
 *          <p>
 *             <code>CompareFaces</code> also returns an array of faces that don't match the source image.
 *       For each face, it returns a bounding box, confidence value, landmarks, pose details, and quality.
 *     The response also returns information about the face in the source image, including the bounding box
 *       of the face and confidence value.</p>
 *
 *          <p>The <code>QualityFilter</code> input parameter allows you to filter out detected faces
 *       that don’t meet a required quality bar. The quality bar is based on a
 *       variety of common use cases.  Use <code>QualityFilter</code> to set the quality bar
 *       by specifying <code>LOW</code>, <code>MEDIUM</code>, or <code>HIGH</code>.
 *       If you do not want to filter detected faces, specify <code>NONE</code>. The default value is <code>NONE</code>. </p>
 *
 *          <p>If the image doesn't contain Exif metadata, <code>CompareFaces</code> returns orientation information for the
 *         source and target images. Use these values to display the images with the correct image orientation.</p>
 *          <p>If no faces are detected in the source or target images, <code>CompareFaces</code> returns an
 *     <code>InvalidParameterException</code> error. </p>
 *
 *
 *          <note>
 *             <p> This is a stateless API operation. That is, data returned by this operation doesn't persist.</p>
 *          </note>
 *
 *
 *          <p>For an example, see Comparing Faces in Images in the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:CompareFaces</code>
 *       action.</p>
 */
class CompareFacesCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "RekognitionClient";
        const commandName = "CompareFacesCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CompareFacesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CompareFacesResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1CompareFacesCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1CompareFacesCommand(output, context);
    }
}
exports.CompareFacesCommand = CompareFacesCommand;
//# sourceMappingURL=CompareFacesCommand.js.map