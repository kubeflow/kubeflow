import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribePiiEntitiesDetectionJobRequest, DescribePiiEntitiesDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribePiiEntitiesDetectionJobCommandInput = DescribePiiEntitiesDetectionJobRequest;
export declare type DescribePiiEntitiesDetectionJobCommandOutput = DescribePiiEntitiesDetectionJobResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with a PII entities detection job. For example, you can use
 *       this operation to get the job status.</p>
 */
export declare class DescribePiiEntitiesDetectionJobCommand extends $Command<DescribePiiEntitiesDetectionJobCommandInput, DescribePiiEntitiesDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribePiiEntitiesDetectionJobCommandInput;
    constructor(input: DescribePiiEntitiesDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribePiiEntitiesDetectionJobCommandInput, DescribePiiEntitiesDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
