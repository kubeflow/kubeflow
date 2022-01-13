import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeEntitiesDetectionJobRequest, DescribeEntitiesDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeEntitiesDetectionJobCommandInput = DescribeEntitiesDetectionJobRequest;
export declare type DescribeEntitiesDetectionJobCommandOutput = DescribeEntitiesDetectionJobResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with an entities detection job. Use this operation to get
 *       the status of a detection job.</p>
 */
export declare class DescribeEntitiesDetectionJobCommand extends $Command<DescribeEntitiesDetectionJobCommandInput, DescribeEntitiesDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeEntitiesDetectionJobCommandInput;
    constructor(input: DescribeEntitiesDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeEntitiesDetectionJobCommandInput, DescribeEntitiesDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
