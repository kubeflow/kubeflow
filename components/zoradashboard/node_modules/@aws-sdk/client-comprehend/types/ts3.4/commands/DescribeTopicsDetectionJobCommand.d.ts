import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeTopicsDetectionJobRequest, DescribeTopicsDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeTopicsDetectionJobCommandInput = DescribeTopicsDetectionJobRequest;
export declare type DescribeTopicsDetectionJobCommandOutput = DescribeTopicsDetectionJobResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with a topic detection job. Use this operation to get
 *       the status of a detection job.</p>
 */
export declare class DescribeTopicsDetectionJobCommand extends $Command<DescribeTopicsDetectionJobCommandInput, DescribeTopicsDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeTopicsDetectionJobCommandInput;
    constructor(input: DescribeTopicsDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeTopicsDetectionJobCommandInput, DescribeTopicsDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
