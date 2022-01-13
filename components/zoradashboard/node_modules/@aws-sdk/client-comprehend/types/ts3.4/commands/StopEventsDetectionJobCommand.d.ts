import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StopEventsDetectionJobRequest, StopEventsDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopEventsDetectionJobCommandInput = StopEventsDetectionJobRequest;
export declare type StopEventsDetectionJobCommandOutput = StopEventsDetectionJobResponse & __MetadataBearer;
/**
 * <p>Stops an events detection job in progress.</p>
 */
export declare class StopEventsDetectionJobCommand extends $Command<StopEventsDetectionJobCommandInput, StopEventsDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StopEventsDetectionJobCommandInput;
    constructor(input: StopEventsDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopEventsDetectionJobCommandInput, StopEventsDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
