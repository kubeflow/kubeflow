import { __extends } from "tslib";
import { DetectCustomLabelsRequest, DetectCustomLabelsResponse } from "../models/models_0";
import { deserializeAws_json1_1DetectCustomLabelsCommand, serializeAws_json1_1DetectCustomLabelsCommand, } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Detects custom labels in a supplied image by using an Amazon Rekognition Custom Labels model. </p>
 *          <p>You specify which version of a model version to use by using the <code>ProjectVersionArn</code> input
 *       parameter. </p>
 *          <p>You pass the input image as base64-encoded image bytes or as a reference to an image in
 *          an Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations, passing
 *          image bytes is not supported. The image must be either a PNG or JPEG formatted file. </p>
 *          <p> For each object that the model version detects on an image, the API returns a
 *          (<code>CustomLabel</code>) object in an array (<code>CustomLabels</code>).
 *          Each <code>CustomLabel</code> object provides the label name (<code>Name</code>), the level
 *          of confidence that the image contains the object (<code>Confidence</code>), and
 *          object location information, if it exists,  for the label on the image (<code>Geometry</code>). </p>
 *          <p>During training model calculates a threshold value that determines
 *          if a prediction for a label is true. By default, <code>DetectCustomLabels</code> doesn't
 *          return labels whose confidence value is below the model's calculated threshold value.  To filter
 *          labels that are returned, specify a value for <code>MinConfidence</code> that is higher than the
 *          model's calculated threshold. You can get the model's calculated threshold from the model's
 *          training results shown in the Amazon Rekognition Custom Labels console.
 *          To get all labels, regardless of confidence, specify a <code>MinConfidence</code>
 *          value of 0. </p>
 *          <p>You can also add the <code>MaxResults</code> parameter
 *            to limit the number of labels returned. </p>
 *
 *          <p>This is a stateless API operation. That is, the operation does not persist any
 *          data.</p>
 *          <p>This operation requires permissions to perform the
 *          <code>rekognition:DetectCustomLabels</code> action. </p>
 */
var DetectCustomLabelsCommand = /** @class */ (function (_super) {
    __extends(DetectCustomLabelsCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DetectCustomLabelsCommand(input) {
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
    DetectCustomLabelsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "RekognitionClient";
        var commandName = "DetectCustomLabelsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DetectCustomLabelsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: DetectCustomLabelsResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DetectCustomLabelsCommand.prototype.serialize = function (input, context) {
        return serializeAws_json1_1DetectCustomLabelsCommand(input, context);
    };
    DetectCustomLabelsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_json1_1DetectCustomLabelsCommand(output, context);
    };
    return DetectCustomLabelsCommand;
}($Command));
export { DetectCustomLabelsCommand };
//# sourceMappingURL=DetectCustomLabelsCommand.js.map