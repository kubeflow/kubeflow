import { __extends } from "tslib";
import { DetectProtectiveEquipmentRequest, DetectProtectiveEquipmentResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectProtectiveEquipmentCommand, serializeAws_json1_1DetectProtectiveEquipmentCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var DetectProtectiveEquipmentCommand = /** @class */ (function (_super) {
    __extends(DetectProtectiveEquipmentCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectProtectiveEquipmentCommand(input) {
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
    DetectProtectiveEquipmentCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DetectProtectiveEquipmentCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectProtectiveEquipmentRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectProtectiveEquipmentResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectProtectiveEquipmentCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectProtectiveEquipmentCommand(input, context);
    };
    DetectProtectiveEquipmentCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectProtectiveEquipmentCommand(output, context);
    };
    return DetectProtectiveEquipmentCommand;
}($Command));
export { DetectProtectiveEquipmentCommand };
//# sourceMappingURL=DetectProtectiveEquipmentCommand.js.map