import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StopPiiEntitiesDetectionJobRequest, StopPiiEntitiesDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StopPiiEntitiesDetectionJobCommandInput = StopPiiEntitiesDetectionJobRequest;
export declare type StopPiiEntitiesDetectionJobCommandOutput = StopPiiEntitiesDetectionJobResponse & __MetadataBearer;
/**
 * <p>Stops a PII entities detection job in progress.</p>
 */
export declare class StopPiiEntitiesDetectionJobCommand extends $Command<StopPiiEntitiesDetectionJobCommandInput, StopPiiEntitiesDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StopPiiEntitiesDetectionJobCommandInput;
    constructor(input: StopPiiEntitiesDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StopPiiEntitiesDetectionJobCommandInput, StopPiiEntitiesDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
