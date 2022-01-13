import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { CompareFacesRequest, CompareFacesResponse } from "../models/models_0";
import {
  deserializeAws_json1_1CompareFacesCommand,
  serializeAws_json1_1CompareFacesCommand,
} from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export type CompareFacesCommandInput = CompareFacesRequest;
export type CompareFacesCommandOutput = CompareFacesResponse & __MetadataBearer;

/**
 * <p>Compares a face in the <i>source</i> input image with
 *       each of the 100 largest faces detected in the <i>target</i> input image.
 *     </p>
 *          <note>
 *             <p> If the source image contains multiple faces, the service detects the largest face
 *         and compares it with each face detected in the target image. </p>
 *          </note>
 *
 *
 *          <p>You pass the input and target images either as base64-encoded image bytes or as
 *       references to images in an Amazon S3 bucket. If you use the
 *       AWS
 *       CLI to call Amazon Rekognition operations, passing image bytes isn't
 *       supported. The image must be formatted as a PNG or JPEG file. </p>
 *          <p>In response, the operation returns an array of face matches ordered by similarity score
 *       in descending order. For each face match, the response provides a bounding box of the face,
 *       facial landmarks, pose details (pitch, role, and yaw), quality (brightness and sharpness), and
 *       confidence value (indicating the level of confidence that the bounding box contains a face).
 *       The response also provides a similarity score, which indicates how closely the faces match. </p>
 *
 *          <note>
 *             <p>By default, only faces with a similarity score of greater than or equal to 80% are
 *         returned in the response. You can change this value by specifying the
 *           <code>SimilarityThreshold</code> parameter.</p>
 *          </note>
 *
 *          <p>
 *             <code>CompareFaces</code> also returns an array of faces that don't match the source image.
 *       For each face, it returns a bounding box, confidence value, landmarks, pose details, and quality.
 *     The response also returns information about the face in the source image, including the bounding box
 *       of the face and confidence value.</p>
 *
 *          <p>The <code>QualityFilter</code> input parameter allows you to filter out detected faces
 *       that don’t meet a required quality bar. The quality bar is based on a
 *       variety of common use cases.  Use <code>QualityFilter</code> to set the quality bar
 *       by specifying <code>LOW</code>, <code>MEDIUM</code>, or <code>HIGH</code>.
 *       If you do not want to filter detected faces, specify <code>NONE</code>. The default value is <code>NONE</code>. </p>
 *
 *          <p>If the image doesn't contain Exif metadata, <code>CompareFaces</code> returns orientation information for the
 *         source and target images. Use these values to display the images with the correct image orientation.</p>
 *          <p>If no faces are detected in the source or target images, <code>CompareFaces</code> returns an
 *     <code>InvalidParameterException</code> error. </p>
 *
 *
 *          <note>
 *             <p> This is a stateless API operation. That is, data returned by this operation doesn't persist.</p>
 *          </note>
 *
 *
 *          <p>For an example, see Comparing Faces in Images in the Amazon Rekognition Developer Guide.</p>
 *          <p>This operation requires permissions to perform the <code>rekognition:CompareFaces</code>
 *       action.</p>
 */
export class CompareFacesCommand extends $Command<
  CompareFacesCommandInput,
  CompareFacesCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CompareFacesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: RekognitionClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<CompareFacesCommandInput, CompareFacesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "CompareFacesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CompareFacesRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CompareFacesResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CompareFacesCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CompareFacesCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CompareFacesCommandOutput> {
    return deserializeAws_json1_1CompareFacesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
