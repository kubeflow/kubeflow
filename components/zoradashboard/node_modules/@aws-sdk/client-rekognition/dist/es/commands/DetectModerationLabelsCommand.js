import { __extends } from "tslib";
import { DetectModerationLabelsRequest, DetectModerationLabelsResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectModerationLabelsCommand, serializeAws_json1_1DetectModerationLabelsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Detects unsafe content in a specified JPEG or PNG format image.
 *      Use <code>DetectModerationLabels</code> to moderate images depending on your requirements.
 *      For example, you might want to filter images that contain nudity, but not images containing
 *      suggestive content.</p>
 *          <p>To filter images, use the labels returned by <code>DetectModerationLabels</code>
 *      to determine which types of content are appropriate.</p>
 *
 *          <p>For information about moderation labels,
 *       see Detecting Unsafe Content in the Amazon Rekognition Developer Guide.</p>
 *          <p>You pass the input image either as base64-encoded image bytes or as a reference to an
 *       image in an Amazon S3 bucket. If you use the
 *       AWS
 *       CLI to call Amazon Rekognition operations, passing image bytes is not
 *       supported. The image must be either a PNG or JPEG formatted file. </p>
 */
var DetectModerationLabelsCommand = /** @class */ (function (_super) {
    __extends(DetectModerationLabelsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectModerationLabelsCommand(input) {
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
    DetectModerationLabelsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DetectModerationLabelsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectModerationLabelsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectModerationLabelsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectModerationLabelsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectModerationLabelsCommand(input, context);
    };
    DetectModerationLabelsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectModerationLabelsCommand(output, context);
    };
    return DetectModerationLabelsCommand;
}($Command));
export { DetectModerationLabelsCommand };
//# sourceMappingURL=DetectModerationLabelsCommand.js.map