import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartLabelDetectionRequest, StartLabelDetectionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1StartLabelDetectionCommand,
  serializeAws_json1_1StartLabelDetectionCommand,
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

export type StartLabelDetectionCommandInput = StartLabelDetectionRequest;
export type StartLabelDetectionCommandOutput = StartLabelDetectionResponse & __MetadataBearer;

/**
 * <p>Starts asynchronous detection of labels in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect labels in a video. Labels are instances of real-world entities.
 *        This includes objects like flower, tree, and table; events like
 *        wedding, graduation, and birthday party; concepts like landscape, evening, and nature; and activities
 *        like a person getting out of a car or a person skiing.</p>
 *
 *          <p>The video must be stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *        and the filename of the video.
 *         <code>StartLabelDetection</code> returns a job identifier (<code>JobId</code>) which you use to get the
 *        results of the operation. When label detection is finished, Amazon Rekognition Video publishes a completion status
 *         to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.</p>
 *          <p>To get the results of the label detection operation, first check that the status value published to the Amazon SNS
 *         topic is <code>SUCCEEDED</code>. If so, call  <a>GetLabelDetection</a> and pass the job identifier
 *        (<code>JobId</code>) from the initial call to <code>StartLabelDetection</code>.</p>
 *         <p></p>
 */
export class StartLabelDetectionCommand extends $Command<
  StartLabelDetectionCommandInput,
  StartLabelDetectionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StartLabelDetectionCommandInput) {
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
  ): Handler<StartLabelDetectionCommandInput, StartLabelDetectionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "StartLabelDetectionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StartLabelDetectionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: StartLabelDetectionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StartLabelDetectionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StartLabelDetectionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<StartLabelDetectionCommandOutput> {
    return deserializeAws_json1_1StartLabelDetectionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
