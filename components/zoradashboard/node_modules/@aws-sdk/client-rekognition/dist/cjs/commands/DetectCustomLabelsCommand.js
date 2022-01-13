"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectCustomLabelsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_json1_1_1 = require("../protocols/Aws_json1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
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
class DetectCustomLabelsCommand extends smithy_client_1.Command {
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
        const commandName = "DetectCustomLabelsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.DetectCustomLabelsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.DetectCustomLabelsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_json1_1_1.serializeAws_json1_1DetectCustomLabelsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_json1_1_1.deserializeAws_json1_1DetectCustomLabelsCommand(output, context);
    }
}
exports.DetectCustomLabelsCommand = DetectCustomLabelsCommand;
//# sourceMappingURL=DetectCustomLabelsCommand.js.map