import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartPersonTrackingRequest, StartPersonTrackingResponse } from "../models/models_0";
import {
  deserializeAws_json1_1StartPersonTrackingCommand,
  serializeAws_json1_1StartPersonTrackingCommand,
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

export type StartPersonTrackingCommandInput = StartPersonTrackingRequest;
export type StartPersonTrackingCommandOutput = StartPersonTrackingResponse & __MetadataBearer;

/**
 * <p>Starts the asynchronous tracking of a person's path in a stored video.</p>
 *          <p>Amazon Rekognition Video can track the path of people in a video stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *        and the filename of the video. <code>StartPersonTracking</code>
 *        returns a job identifier (<code>JobId</code>) which you use to get the results of the operation.
 *        When label detection is finished, Amazon Rekognition publishes a completion status
 *        to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>. </p>
 *          <p>To get the results of the person detection operation, first check that the status value published to the Amazon SNS
 *        topic is <code>SUCCEEDED</code>. If so, call  <a>GetPersonTracking</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartPersonTracking</code>.</p>
 */
export class StartPersonTrackingCommand extends $Command<
  StartPersonTrackingCommandInput,
  StartPersonTrackingCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StartPersonTrackingCommandInput) {
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
  ): Handler<StartPersonTrackingCommandInput, StartPersonTrackingCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "StartPersonTrackingCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StartPersonTrackingRequest.filterSensitiveLog,
      outputFilterSensitiveLog: StartPersonTrackingResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StartPersonTrackingCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1StartPersonTrackingCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<StartPersonTrackingCommandOutput> {
    return deserializeAws_json1_1StartPersonTrackingCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
