import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { StartPiiEntitiesDetectionJobRequest, StartPiiEntitiesDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type StartPiiEntitiesDetectionJobCommandInput = StartPiiEntitiesDetectionJobRequest;
export declare type StartPiiEntitiesDetectionJobCommandOutput = StartPiiEntitiesDetectionJobResponse & __MetadataBearer;
/**
 * <p>Starts an asynchronous PII entity detection job for a collection of documents.</p>
 */
export declare class StartPiiEntitiesDetectionJobCommand extends $Command<StartPiiEntitiesDetectionJobCommandInput, StartPiiEntitiesDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: StartPiiEntitiesDetectionJobCommandInput;
    constructor(input: StartPiiEntitiesDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartPiiEntitiesDetectionJobCommandInput, StartPiiEntitiesDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
