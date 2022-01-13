"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFaceSearchCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets the face search results for Amazon Rekognition Video face search started by
 *       <a>StartFaceSearch</a>. The search returns faces in a collection that match the faces
 *     of persons detected in a video. It also includes the time(s) that faces are matched in the video.</p>
 *          <p>Face search in a video is an asynchronous operation. You start face search by calling
 *       to <a>StartFaceSearch</a> which returns a job identifier (<code>JobId</code>).
 *       When the search operation finishes, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service
 *       topic registered in the initial call to <code>StartFaceSearch</code>.
 *       To get the search results, first check that the status value published to the Amazon SNS
 *       topic is <code>SUCCEEDED</code>. If so, call  <code>GetFaceSearch</code> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartFaceSearch</code>.</p>
 *
 *          <p>For more information, see Searching Faces in a Collection in the
 *       Amazon Rekognition Developer Guide.</p>
 *          <p>The search results are retured in an array, <code>Persons</code>, of
 *     <a>PersonMatch</a> objects. Each<code>PersonMatch</code> element contains
 *     details about the matching faces in the input collection, person information (facial attributes,
 *     bounding boxes, and person identifer)
 *     for the matched person, and the time the person was matched in the video.</p>
 *          <note>
 *
 *             <p>
 *                <code>GetFaceSearch</code> only returns the default
 *         facial attributes (<code>BoundingBox</code>, <code>Confidence</code>,
 *         <code>Landmarks</code>, <code>Pose</code>, and <code>Quality</code>). The other facial attributes listed
 *         in the <code>Face</code> object of the following response syntax are not returned. For more information,
 *         see FaceDetail in the Amazon Rekognition Developer Guide. </p>
 *          </note>
 *
 *          <p>By default, the <code>Persons</code> array is sorted by the time, in milliseconds from the
 *     start of the video, persons are matched.
 *     You can also sort by persons by specifying <code>INDEX</code> for the <code>SORTBY</code> input
 *     parameter.</p>
 */
class GetFaceSearchCommand extends smithy_client_1.Command {
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
        const commandName = "GetFaceSearchCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.GetFaceSearchRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.GetFaceSearchResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1GetFaceSearchCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1GetFaceSearchCommand(output, context);
    }
}
exports.GetFaceSearchCommand = GetFaceSearchCommand;
//# sourceMappingURL=GetFaceSearchCommand.js.map