import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StopSentimentDetectionJobRequest, StopSentimentDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopSentimentDetectionJobCommandInput = StopSentimentDetectionJobRequest;
export declare type StopSentimentDetectionJobCommandOutput = StopSentimentDetectionJobResponse & __MetadataBearer;
/**
 * <p>Stops a sentiment detection job in progress.</p>
 *          <p>If the job state is <code>IN_PROGRESS</code> the job is marked for termination and put
 *       into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped, it
 *       is put into the <code>COMPLETED</code> state; otherwise the job is be stopped and put into the
 *         <code>STOPPED</code> state.</p>
 *          <p>If the job is in the <code>COMPLETED</code> or <code>FAILED</code> state when you call the
 *         <code>StopDominantLanguageDetectionJob</code> operation, the operation returns a 400
 *       Internal Request Exception. </p>
 *          <p>When a job is stopped, any documents already processed are written to the output
 *       location.</p>
 */
export declare class StopSentimentDetectionJobCommand extends $Command<StopSentimentDetectionJobCommandInput, StopSentimentDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StopSentimentDetectionJobCommandInput;
    constructor(input: StopSentimentDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopSentimentDetectionJobCommandInput, StopSentimentDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
