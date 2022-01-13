import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { GetContentModerationRequest, GetContentModerationResponse } from "../models/models_0";
import {
  deserializeAws_json1_1GetContentModerationCommand,
  serializeAws_json1_1GetContentModerationCommand,
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

export type GetContentModerationCommandInput = GetContentModerationRequest;
export type GetContentModerationCommandOutput = GetContentModerationResponse & __MetadataBearer;

/**
 * <p>Gets the unsafe content analysis results for a Amazon Rekognition Video analysis started by
 *        <a>StartContentModeration</a>.</p>
 *
 *          <p>Unsafe content analysis of a video is an asynchronous operation. You start analysis by calling
 *        <a>StartContentModeration</a> which returns a job identifier (<code>JobId</code>).
 *        When analysis finishes, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service
 *        topic registered in the initial call to <code>StartContentModeration</code>.
 *        To get the results of the unsafe content analysis, first check that the status value published to the Amazon SNS
 *        topic is <code>SUCCEEDED</code>. If so, call  <code>GetContentModeration</code> and pass the job identifier
 *        (<code>JobId</code>) from the initial call to <code>StartContentModeration</code>. </p>
 *
 *          <p>For more information, see Working with Stored Videos in the
 *      Amazon Rekognition Devlopers Guide.</p>
 *          <p>
 *             <code>GetContentModeration</code> returns detected unsafe content labels,
 *       and the time they are detected, in an array, <code>ModerationLabels</code>, of
 *       <a>ContentModerationDetection</a> objects.
 *      </p>
 *          <p>By default, the moderated labels are returned sorted by time, in milliseconds from the start of the
 *        video. You can also sort them by moderated label by specifying <code>NAME</code> for the <code>SortBy</code>
 *        input parameter. </p>
 *          <p>Since video analysis can return a large number of results, use the <code>MaxResults</code> parameter to limit
 *       the number of labels returned in a single call to <code>GetContentModeration</code>. If there are more results than
 *        specified in <code>MaxResults</code>, the value of <code>NextToken</code> in the operation response contains a
 *        pagination token for getting the next set of results. To get the next page of results, call <code>GetContentModeration</code>
 *        and populate the <code>NextToken</code> request parameter with the value of <code>NextToken</code>
 *        returned from the previous call to <code>GetContentModeration</code>.</p>
 *
 *          <p>For more information, see Detecting Unsafe Content in the Amazon Rekognition Developer Guide.</p>
 */
export class GetContentModerationCommand extends $Command<
  GetContentModerationCommandInput,
  GetContentModerationCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetContentModerationCommandInput) {
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
  ): Handler<GetContentModerationCommandInput, GetContentModerationCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "GetContentModerationCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetContentModerationRequest.filterSensitiveLog,
      outputFilterSensitiveLog: GetContentModerationResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: GetContentModerationCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1GetContentModerationCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<GetContentModerationCommandOutput> {
    return deserializeAws_json1_1GetContentModerationCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
