import { __extends } from "tslib";
import { DetectTextRequest, DetectTextResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectTextCommand, serializeAws_json1_1DetectTextCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Detects text in the input image and converts it into machine-readable text.</p>
 *          <p>Pass the input image as base64-encoded image bytes or as a reference to an image in an
 *       Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations, you must pass it as a
 *       reference to an image in an Amazon S3 bucket. For the AWS CLI, passing image bytes is not
 *       supported. The image must be either a .png or .jpeg formatted file. </p>
 *          <p>The <code>DetectText</code> operation returns text in an array of <a>TextDetection</a> elements, <code>TextDetections</code>. Each
 *         <code>TextDetection</code> element provides information about a single word or line of text
 *       that was detected in the image. </p>
 *          <p>A word is one or more ISO basic latin script characters that are not separated by spaces.
 *         <code>DetectText</code> can detect up to 50 words in an image.</p>
 *          <p>A line is a string of equally spaced words. A line isn't necessarily a complete
 *       sentence. For example, a driver's license number is detected as a line. A line ends when there
 *       is no aligned text after it. Also, a line ends when there is a large gap between words,
 *       relative to the length of the words. This means, depending on the gap between words, Amazon Rekognition
 *       may detect multiple lines in text aligned in the same direction. Periods don't represent the
 *       end of a line. If a sentence spans multiple lines, the <code>DetectText</code> operation
 *       returns multiple lines.</p>
 *          <p>To determine whether a <code>TextDetection</code> element is a line of text or a word,
 *       use the <code>TextDetection</code> object <code>Type</code> field. </p>
 *          <p>To be detected, text must be within +/- 90 degrees orientation of the horizontal axis.</p>
 *
 *          <p>For more information, see DetectText in the Amazon Rekognition Developer Guide.</p>
 */
var DetectTextCommand = /** @class */ (function (_super) {
    __extends(DetectTextCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectTextCommand(input) {
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
    DetectTextCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DetectTextCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectTextRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectTextResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectTextCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectTextCommand(input, context);
    };
    DetectTextCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectTextCommand(output, context);
    };
    return DetectTextCommand;
}($Command));
export { DetectTextCommand };
//# sourceMappingURL=DetectTextCommand.js.map