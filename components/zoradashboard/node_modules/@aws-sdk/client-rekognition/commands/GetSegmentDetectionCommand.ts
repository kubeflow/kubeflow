import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { GetSegmentDetectionRequest, GetSegmentDetectionResponse } from "../models/models_0";
import {
  deserializeAws_json1_1GetSegmentDetectionCommand,
  serializeAws_json1_1GetSegmentDetectionCommand,
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

export type GetSegmentDetectionCommandInput = GetSegmentDetectionRequest;
export type GetSegmentDetectionCommandOutput = GetSegmentDetectionResponse & __MetadataBearer;

/**
 * <p>Gets the segment detection results of a Amazon Rekognition Video analysis started by <a>StartSegmentDetection</a>.</p>
 *          <p>Segment detection with Amazon Rekognition Video is an asynchronous operation. You start segment detection by
 *       calling <a>StartSegmentDetection</a> which returns a job identifier (<code>JobId</code>).
 *       When the segment detection operation finishes, Amazon Rekognition publishes a completion status to the Amazon Simple Notification Service
 *       topic registered in the initial call to <code>StartSegmentDetection</code>. To get the results
 *       of the segment detection operation, first check that the status value published to the Amazon SNS topic is <code>SUCCEEDED</code>.
 *       if so, call <code>GetSegmentDetection</code> and pass the job identifier (<code>JobId</code>) from the initial call
 *       of <code>StartSegmentDetection</code>.</p>
 *          <p>
 *             <code>GetSegmentDetection</code> returns detected segments in an array (<code>Segments</code>)
 *       of <a>SegmentDetection</a> objects. <code>Segments</code> is sorted by the segment types
 *       specified in the <code>SegmentTypes</code> input parameter of <code>StartSegmentDetection</code>.
 *     Each element of the array includes the detected segment, the precentage confidence in the acuracy
 *       of the detected segment, the type of the segment, and the frame in which the segment was detected.</p>
 *          <p>Use <code>SelectedSegmentTypes</code> to find out the type of segment detection requested in the
 *     call to <code>StartSegmentDetection</code>.</p>
 *          <p>Use the <code>MaxResults</code> parameter to limit the number of segment detections returned. If there are more results than
 *       specified in <code>MaxResults</code>, the value of <code>NextToken</code> in the operation response contains
 *       a pagination token for getting the next set of results. To get the next page of results, call <code>GetSegmentDetection</code>
 *       and populate the <code>NextToken</code> request parameter with the token value returned from the previous
 *       call to <code>GetSegmentDetection</code>.</p>
 *
 *          <p>For more information, see Detecting Video Segments in Stored Video in the Amazon Rekognition Developer Guide.</p>
 */
export class GetSegmentDetectionCommand extends $Command<
  GetSegmentDetectionCommandInput,
  GetSegmentDetectionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetSegmentDetectionCommandInput) {
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
  ): Handler<GetSegmentDetectionCommandInput, GetSegmentDetectionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RekognitionClient";
    const commandName = "GetSegmentDetectionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetSegmentDetectionRequest.filterSensitiveLog,
      outputFilterSensitiveLog: GetSegmentDetectionResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: GetSegmentDetectionCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1GetSegmentDetectionCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<GetSegmentDetectionCommandOutput> {
    return deserializeAws_json1_1GetSegmentDetectionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
