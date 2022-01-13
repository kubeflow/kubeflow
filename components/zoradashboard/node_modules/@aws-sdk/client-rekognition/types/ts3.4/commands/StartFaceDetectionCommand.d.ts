import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartFaceDetectionRequest, StartFaceDetectionResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartFaceDetectionCommandInput = StartFaceDetectionRequest;
export declare type StartFaceDetectionCommandOutput = StartFaceDetectionResponse & __MetadataBearer;
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
export declare class StartFaceDetectionCommand extends $Command<StartFaceDetectionCommandInput, StartFaceDetectionCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: StartFaceDetectionCommandInput;
    constructor(input: StartFaceDetectionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartFaceDetectionCommandInput, StartFaceDetectionCommandOutput>;
    private serialize;
    private deserialize;
}
