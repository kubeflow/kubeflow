import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartFaceDetectionRequest, StartFaceDetectionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1StartFaceDetectionCommand,
  serializeAws_json1_1StartFaceDetectionCommand,
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

export type StartFaceDetectionCommandInput = StartFaceDetectionRequest;
export type StartFaceDetectionCommandOutput = StartFaceDetectionResponse & __MetadataBearer;

/**
 * <p>Starts asynchronous detection of faces in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect faces in a video stored in an Amazon S3 bucket.
 *        Use <a>Video</a> to specify the bucket name and the filename of the video.
 *        <code>StartFaceDetection</code> returns a job identifier (<code>JobId</code>) that you
 *        use to get the results of the operation.
 *        When face detection is finished, Amazon Rekognition Video publishes a completion status
 *        to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.
 *        To get the results of the face detection operation, first check that the status value published to the Amazon SNS
 *        topic is <code>SUCCEEDED</code>. If so, call  <a>GetFaceDetection</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartFaceDetection</code>.</p>
 *
 *          <p>For more information, see Detecting Faces in a Stored Video in the
 *      Amazon Rekognition Developer Guide.</p>
 */
export class StartFaceDetectionCommand extends $Command<
  StartFaceDetectionCommandInput,
  StartFaceDetectionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StartFaceDetectionCommandInput) {
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
  ): Handler<StartFaceDetectionCommandInput, StartFaceDetectionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "StartFaceDetectionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StartFaceDetectionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: StartFaceDetectionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StartFaceDetectionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StartFaceDetectionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<StartFaceDetectionCommandOutput> {
    return deserializeAws_json1_1StartFaceDetectionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
