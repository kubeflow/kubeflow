import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StopEntitiesDetectionJobRequest, StopEntitiesDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopEntitiesDetectionJobCommandInput = StopEntitiesDetectionJobRequest;
export declare type StopEntitiesDetectionJobCommandOutput = StopEntitiesDetectionJobResponse & __MetadataBearer;
/**
 * <p>Stops an entities detection job in progress.</p>
 *          <p>If the job state is <code>IN_PROGRESS</code> the job is marked for termination and put
 *       into the <code>STOP_REQUESTED</code> state. If the job completes before it can be stopped, it
 *       is put into the <code>COMPLETED</code> state; otherwise the job is stopped and put into the
 *         <code>STOPPED</code> state.</p>
 *          <p>If the job is in the <code>COMPLETED</code> or <code>FAILED</code> state when you call the
 *         <code>StopDominantLanguageDetectionJob</code> operation, the operation returns a 400
 *       Internal Request Exception. </p>
 *          <p>When a job is stopped, any documents already processed are written to the output
 *       location.</p>
 */
export declare class StopEntitiesDetectionJobCommand extends $Command<StopEntitiesDetectionJobCommandInput, StopEntitiesDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StopEntitiesDetectionJobCommandInput;
    constructor(input: StopEntitiesDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopEntitiesDetectionJobCommandInput, StopEntitiesDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
