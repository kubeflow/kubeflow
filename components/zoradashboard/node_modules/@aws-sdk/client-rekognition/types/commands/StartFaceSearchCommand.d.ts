import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartFaceSearchRequest, StartFaceSearchResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartFaceSearchCommandInput = StartFaceSearchRequest;
export declare type StartFaceSearchCommandOutput = StartFaceSearchResponse & __MetadataBearer;
/**
 * <p>Starts the asynchronous search for faces in a collection that match the faces of persons detected in a stored video.</p>
 *          <p>The video must be stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *       and the filename of the video. <code>StartFaceSearch</code>
 *       returns a job identifier (<code>JobId</code>) which you use to get the search results once the search has completed.
 *       When searching is finished, Amazon Rekognition Video publishes a completion status
 *       to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.
 *       To get the search results, first check that the status value published to the Amazon SNS
 *       topic is <code>SUCCEEDED</code>. If so, call <a>GetFaceSearch</a> and pass the job identifier
 *       (<code>JobId</code>) from the initial call to <code>StartFaceSearch</code>. For more information, see
 *       <a>procedure-person-search-videos</a>.</p>
 */
export declare class StartFaceSearchCommand extends $Command<StartFaceSearchCommandInput, StartFaceSearchCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: StartFaceSearchCommandInput;
    constructor(input: StartFaceSearchCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartFaceSearchCommandInput, StartFaceSearchCommandOutput>;
    private serialize;
    private deserialize;
}
