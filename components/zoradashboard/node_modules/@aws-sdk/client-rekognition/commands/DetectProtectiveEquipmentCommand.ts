import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DetectProtectiveEquipmentRequest, DetectProtectiveEquipmentResponse } from "../models/models_0";
import {
  deserializeAws_json1_1DetectProtectiveEquipmentCommand,
  serializeAws_json1_1DetectProtectiveEquipmentCommand,
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

export type DetectProtectiveEquipmentCommandInput = DetectProtectiveEquipmentRequest;
export type DetectProtectiveEquipmentCommandOutput = DetectProtectiveEquipmentResponse & __MetadataBearer;

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
export class DetectProtectiveEquipmentCommand extends $Command<
  DetectProtectiveEquipmentCommandInput,
  DetectProtectiveEquipmentCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DetectProtectiveEquipmentCommandInput) {
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
  ): Handler<DetectProtectiveEquipmentCommandInput, DetectProtectiveEquipmentCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "DetectProtectiveEquipmentCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DetectProtectiveEquipmentRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DetectProtectiveEquipmentResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DetectProtectiveEquipmentCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1DetectProtectiveEquipmentCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<DetectProtectiveEquipmentCommandOutput> {
    return deserializeAws_json1_1DetectProtectiveEquipmentCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
