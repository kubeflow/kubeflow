import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DetectCustomLabelsRequest, DetectCustomLabelsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DetectCustomLabelsCommandInput = DetectCustomLabelsRequest;
export declare type DetectCustomLabelsCommandOutput = DetectCustomLabelsResponse & __MetadataBearer;
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
export declare class DetectCustomLabelsCommand extends $Command<DetectCustomLabelsCommandInput, DetectCustomLabelsCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DetectCustomLabelsCommandInput;
    constructor(input: DetectCustomLabelsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DetectCustomLabelsCommandInput, DetectCustomLabelsCommandOutput>;
    private serialize;
    private deserialize;
}
