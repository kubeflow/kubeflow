import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StartEventsDetectionJobRequest, StartEventsDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartEventsDetectionJobCommandInput = StartEventsDetectionJobRequest;
export declare type StartEventsDetectionJobCommandOutput = StartEventsDetectionJobResponse & __MetadataBearer;
/**
 * <p>Starts an asynchronous event detection job for a collection of documents.</p>
 */
export declare class StartEventsDetectionJobCommand extends $Command<StartEventsDetectionJobCommandInput, StartEventsDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StartEventsDetectionJobCommandInput;
    constructor(input: StartEventsDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartEventsDetectionJobCommandInput, StartEventsDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
