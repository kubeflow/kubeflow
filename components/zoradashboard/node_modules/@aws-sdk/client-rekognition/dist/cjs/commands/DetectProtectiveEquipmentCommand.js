"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectProtectiveEquipmentCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Detects Personal Protective Equipment (PPE) worn by people detected in an image. Amazon Rekognition can detect the
 *          following types of PPE.</p>
 *          <ul>
 *             <li>
 *                <p>Face cover</p>
 *             </li>
 *             <li>
 *                <p>Hand cover</p>
 *             </li>
 *             <li>
 *                <p>Head cover</p>
 *             </li>
 *          </ul>
 *
 *          <p>You pass the input image as base64-encoded image bytes or as a reference to an image in an Amazon S3 bucket.
 *          The image must be either a PNG or JPG formatted file. </p>
 *
 *          <p>
 *             <code>DetectProtectiveEquipment</code> detects PPE worn by up to 15 persons detected in an image.</p>
 *          <p>For each person detected in the image the API returns an array of body parts (face, head, left-hand, right-hand).
 *          For each body part, an array of detected items of PPE is returned, including an indicator of whether or not the PPE
 *          covers the body part. The API returns the confidence it has in each detection
 *          (person, PPE, body part and body part coverage). It also returns a bounding box (<a>BoundingBox</a>) for each detected
 *          person and each detected item of PPE. </p>
 *          <p>You can optionally request a summary of detected PPE items with the <code>SummarizationAttributes</code> input parameter.
 *          The summary provides the following information. </p>
 *          <ul>
 *             <li>
 *                <p>The persons detected as wearing all of the types of PPE that you specify.</p>
 *             </li>
 *             <li>
 *                <p>The persons detected as not wearing all of the types PPE that you specify.</p>
 *             </li>
 *             <li>
 *                <p>The persons detected where PPE adornment could not be determined. </p>
 *             </li>
 *          </ul>
 *          <p>This is a stateless API operation. That is, the operation does not persist any data.</p>
 *
 *          <p>This operation requires permissions to perform the <code>rekognition:DetectProtectiveEquipment</code> action. </p>
 */
class DetectProtectiveEquipmentCommand extends smithy_client_1.Command {
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
        const commandName = "DetectProtectiveEquipmentCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DetectProtectiveEquipmentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DetectProtectiveEquipmentResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DetectProtectiveEquipmentCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DetectProtectiveEquipmentCommand(output, context);
    }
}
exports.DetectProtectiveEquipmentCommand = DetectProtectiveEquipmentCommand;
//# sourceMappingURL=DetectProtectiveEquipmentCommand.js.map