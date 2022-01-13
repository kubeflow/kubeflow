import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartCelebrityRecognitionRequest, StartCelebrityRecognitionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1StartCelebrityRecognitionCommand,
  serializeAws_json1_1StartCelebrityRecognitionCommand,
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

export type StartCelebrityRecognitionCommandInput = StartCelebrityRecognitionRequest;
export type StartCelebrityRecognitionCommandOutput = StartCelebrityRecognitionResponse & __MetadataBearer;

/**
 * <p>Starts asynchronous recognition of celebrities in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect celebrities in a video must be stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *       and the filename of the video.
 *       <code>StartCelebrityRecognition</code>
 *       returns a job identifier (<code>JobId</code>) which you use to get the results of the analysis.
 *       When celebrity recognition analysis is finished, Amazon Rekognition Video publishes a completion status
 *       to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.
 *       To get the results of the celebrity recognition analysis, first check that the status value published to the Amazon SNS
 *       topic is <code>SUCCEEDED</code>. If so, call  <a>GetCelebrityRecognition</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartCelebrityRecognition</code>. </p>
 *
 *          <p>For more information, see Recognizing Celebrities in the Amazon Rekognition Developer Guide.</p>
 */
export class StartCelebrityRecognitionCommand extends $Command<
  StartCelebrityRecognitionCommandInput,
  StartCelebrityRecognitionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StartCelebrityRecognitionCommandInput) {
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
  ): Handler<StartCelebrityRecognitionCommandInput, StartCelebrityRecognitionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "StartCelebrityRecognitionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StartCelebrityRecognitionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: StartCelebrityRecognitionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StartCelebrityRecognitionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StartCelebrityRecognitionCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<StartCelebrityRecognitionCommandOutput> {
    return deserializeAws_json1_1StartCelebrityRecognitionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
