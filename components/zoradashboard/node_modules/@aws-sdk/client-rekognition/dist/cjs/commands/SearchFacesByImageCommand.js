"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFacesByImageCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>For a given input image, first detects the largest face in the image, and then searches
 *       the specified collection for matching faces. The operation compares the features of the input
 *       face with faces in the specified collection. </p>
 *          <note>
 *             <p>To search for all faces in an input image, you might first call the <a>IndexFaces</a> operation, and then use the face IDs returned in subsequent
 *         calls to the <a>SearchFaces</a> operation. </p>
 *             <p> You can also call the <code>DetectFaces</code> operation and use the bounding boxes
 *         in the response to make face crops, which then you can pass in to the
 *           <code>SearchFacesByImage</code> operation. </p>
 *          </note>
 *
 *          <p>You pass the input image either as base64-encoded image bytes or as a reference to an
 *       image in an Amazon S3 bucket. If you use the
 *       AWS
 *       CLI to call Amazon Rekognition operations, passing image bytes is not
 *       supported. The image must be either a PNG or JPEG formatted file. </p>
 *          <p>
 *       The response returns an array of faces that match, ordered by similarity score with the
 *       highest similarity first. More specifically, it is an
 *       array of metadata for each face match found. Along with the metadata, the response also
 *       includes a <code>similarity</code> indicating how similar the face is
 *       to the input face.
 *
 *       In the response, the operation also returns the bounding
 *       box (and a confidence level that the bounding box contains a face) of the face that Amazon Rekognition
 *       used for the input image.
 *     </p>
 *
 *          <p>For an example, Searching for a Face Using an Image in the Amazon Rekognition Developer Guide.</p>
 *
 *          <p>The <code>QualityFilter</code> input parameter allows you to filter out detected faces
 *       that don’t meet a required quality bar. The quality bar is based on a
 *       variety of common use cases.
 *       Use <code>QualityFilter</code> to set the quality bar for
 *       filtering by specifying <code>LOW</code>, <code>MEDIUM</code>, or <code>HIGH</code>.
 *       If you do not want to filter detected faces, specify <code>NONE</code>. The default
 *       value is <code>NONE</code>.</p>
 *          <note>
 *             <p>To use quality filtering, you need a collection associated with version 3 of the
 *       face model or higher. To get the version of the face model associated with a collection, call
 *       <a>DescribeCollection</a>. </p>
 *          </note>
 *
 *          <p>This operation requires permissions to perform the <code>rekognition:SearchFacesByImage</code>
 *       action.</p>
 */
class SearchFacesByImageCommand extends smithy_client_1.Command {
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
        const commandName = "SearchFacesByImageCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.SearchFacesByImageRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.SearchFacesByImageResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1SearchFacesByImageCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1SearchFacesByImageCommand(output, context);
    }
}
exports.SearchFacesByImageCommand = SearchFacesByImageCommand;
//# sourceMappingURL=SearchFacesByImageCommand.js.map