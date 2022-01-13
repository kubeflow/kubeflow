"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectModerationLabelsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class DetectModerationLabelsCommand extends smithy_client_1.Command {
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
        const commandName = "DetectModerationLabelsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DetectModerationLabelsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DetectModerationLabelsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DetectModerationLabelsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DetectModerationLabelsCommand(output, context);
    }
}
exports.DetectModerationLabelsCommand = DetectModerationLabelsCommand;
//# sourceMappingURL=DetectModerationLabelsCommand.js.map