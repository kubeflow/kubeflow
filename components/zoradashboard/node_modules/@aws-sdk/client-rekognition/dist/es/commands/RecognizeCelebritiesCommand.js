import { __extends } from "tslib";
import { RecognizeCelebritiesRequest, RecognizeCelebritiesResponse } from "../models/models_0";
import { deserializeAws_json1_1RecognizeCelebritiesCommand, serializeAws_json1_1RecognizeCelebritiesCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Returns an array of celebrities recognized in the input image.  For more information, see Recognizing Celebrities
 *     in the Amazon Rekognition Developer Guide. </p>
 *          <p>
 *             <code>RecognizeCelebrities</code> returns the 64 largest faces in the image. It lists
 *       recognized celebrities in the <code>CelebrityFaces</code> array and unrecognized faces in the
 *         <code>UnrecognizedFaces</code> array. <code>RecognizeCelebrities</code> doesn't return
 *       celebrities whose faces aren't among the largest 64 faces in the image.</p>
 *
 *          <p>For each celebrity recognized, <code>RecognizeCelebrities</code> returns a
 *         <code>Celebrity</code> object. The <code>Celebrity</code> object contains the celebrity
 *       name, ID, URL links to additional information, match confidence, and a
 *         <code>ComparedFace</code> object that you can use to locate the celebrity's face on the
 *       image.</p>
 *          <p>Amazon Rekognition doesn't retain information about which images a celebrity has been recognized
 *       in. Your application must store this information and use the <code>Celebrity</code> ID
 *       property as a unique identifier for the celebrity. If you don't store the celebrity name or
 *       additional information URLs returned by <code>RecognizeCelebrities</code>, you will need the
 *       ID to identify the celebrity in a call to the <a>GetCelebrityInfo</a>
 *       operation.</p>
 *          <p>You pass the input image either as base64-encoded image bytes or as a reference to an
 *       image in an Amazon S3 bucket. If you use the
 *       AWS
 *       CLI to call Amazon Rekognition operations, passing image bytes is not
 *       supported. The image must be either a PNG or JPEG formatted file. </p>
 *
 *
 *
 *
 *          <p>For an example, see Recognizing Celebrities in an Image in the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the
 *         <code>rekognition:RecognizeCelebrities</code> operation.</p>
 */
var RecognizeCelebritiesCommand = /** @class */ (function (_super) {
    __extends(RecognizeCelebritiesCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function RecognizeCelebritiesCommand(input) {
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
    RecognizeCelebritiesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "RecognizeCelebritiesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RecognizeCelebritiesRequest.filterSensitiveLog,
            outputFilterSensitiveLog: RecognizeCelebritiesResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RecognizeCelebritiesCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1RecognizeCelebritiesCommand(input, context);
    };
    RecognizeCelebritiesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1RecognizeCelebritiesCommand(output, context);
    };
    return RecognizeCelebritiesCommand;
}($Command));
export { RecognizeCelebritiesCommand };
//# sourceMappingURL=RecognizeCelebritiesCommand.js.map