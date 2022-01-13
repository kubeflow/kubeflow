import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DetectModerationLabelsRequest, DetectModerationLabelsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DetectModerationLabelsCommandInput = DetectModerationLabelsRequest;
export declare type DetectModerationLabelsCommandOutput = DetectModerationLabelsResponse & __MetadataBearer;
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
export declare class DetectModerationLabelsCommand extends $Command<DetectModerationLabelsCommandInput, DetectModerationLabelsCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: DetectModerationLabelsCommandInput;
    constructor(input: DetectModerationLabelsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DetectModerationLabelsCommandInput, DetectModerationLabelsCommandOutput>;
    private serialize;
    private deserialize;
}
