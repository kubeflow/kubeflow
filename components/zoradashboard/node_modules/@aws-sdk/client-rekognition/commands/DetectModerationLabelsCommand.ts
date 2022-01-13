import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { DetectModerationLabelsRequest, DetectModerationLabelsResponse } from "../models/models_0";
import {
  deserializeAws_json1_1DetectModerationLabelsCommand,
  serializeAws_json1_1DetectModerationLabelsCommand,
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

export type DetectModerationLabelsCommandInput = DetectModerationLabelsRequest;
export type DetectModerationLabelsCommandOutput = DetectModerationLabelsResponse & __MetadataBearer;

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
export class DetectModerationLabelsCommand extends $Command<
  DetectModerationLabelsCommandInput,
  DetectModerationLabelsCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DetectModerationLabelsCommandInput) {
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
  ): Handler<DetectModerationLabelsCommandInput, DetectModerationLabelsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "DetectModerationLabelsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DetectModerationLabelsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DetectModerationLabelsResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DetectModerationLabelsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1DetectModerationLabelsCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<DetectModerationLabelsCommandOutput> {
    return deserializeAws_json1_1DetectModerationLabelsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
