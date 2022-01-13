import { RekognitionClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RekognitionClient";
import { StartContentModerationRequest, StartContentModerationResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartContentModerationCommandInput = StartContentModerationRequest;
export declare type StartContentModerationCommandOutput = StartContentModerationResponse & __MetadataBearer;
/**
 * <p> Starts asynchronous detection of unsafe content in a stored video.</p>
 *          <p>Amazon Rekognition Video can moderate content in a video stored in an Amazon S3 bucket. Use <a>Video</a> to specify the bucket name
 *       and the filename of the video. <code>StartContentModeration</code>
 *         returns a job identifier (<code>JobId</code>) which you use to get the results of the analysis.
 *         When unsafe content analysis is finished, Amazon Rekognition Video publishes a completion status
 *         to the Amazon Simple Notification Service topic that you specify in <code>NotificationChannel</code>.</p>
 *         <p>To get the results of the unsafe content analysis, first check that the status value published to the Amazon SNS
 *         topic is <code>SUCCEEDED</code>. If so, call <a>GetContentModeration</a> and pass the job identifier
 *         (<code>JobId</code>) from the initial call to <code>StartContentModeration</code>. </p>
 *
 *          <p>For more information, see Detecting Unsafe Content in the Amazon Rekognition Developer Guide.</p>
 */
export declare class StartContentModerationCommand extends $Command<StartContentModerationCommandInput, StartContentModerationCommandOutput, RekognitionClientResolvedConfig> {
    readonly input: StartContentModerationCommandInput;
    constructor(input: StartContentModerationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: RekognitionClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartContentModerationCommandInput, StartContentModerationCommandOutput>;
    private serialize;
    private deserialize;
}
