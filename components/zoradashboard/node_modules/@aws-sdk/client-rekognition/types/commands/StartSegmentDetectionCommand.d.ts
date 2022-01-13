import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartSegmentDetectionRequest, StartSegmentDetectionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartSegmentDetectionCommandInput = StartSegmentDetectionRequest;
export declare type StartSegmentDetectionCommandOutput = StartSegmentDetectionResponse & __MetadataBearer;
/**
 * <p>Starts asynchronous detection of segment detection in a stored video.</p>
 *          <p>Amazon Rekognition Video can detect segments in a video stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name and
 *       the filename of the video. <code>StartSegmentDetection</code> returns a job identifier (<code>JobId</code>) which you use to get
 *       the results of the operation. When segment detection is finished, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service topic
 *       that you specify in <code>NotificationChannel</code>.</p>
 *          <p>You can use the <code>Filters</code> (<a>StartSegmentDetectionFilters</a>)
 *       input parameter to specify the minimum detection confidence returned in the response.
 *       Within <code>Filters</code>, use <code>ShotFilter</code> (<a>StartShotDetectionFilter</a>)
 *       to filter detected shots. Use  <code>TechnicalCueFilter</code> (<a>StartTechnicalCueDetectionFilter</a>)
 *       to filter technical cues. </p>
 *          <p>To get the results of the segment detection operation, first check that the status value published to the Amazon SNS
 *       topic is <code>SUCCEEDED</code>. if so, call <a>GetSegmentDetection</a> and pass the job identifier (<code>JobId</code>)
 *       from the initial call to <code>StartSegmentDetection</code>. </p>
 *
 *
 *          <p>For more information, see Detecting Video Segments in Stored Video in the Amazon Rekognition Developer Guide.</p>
 */
export declare class StartSegmentDetectionCommand extends $Command<StartSegmentDetectionCommandInput, StartSegmentDetectionCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: StartSegmentDetectionCommandInput;
    constructor(input: StartSegmentDetectionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartSegmentDetectionCommandInput, StartSegmentDetectionCommandOutput>;
    private serialize;
    private deserialize;
}
