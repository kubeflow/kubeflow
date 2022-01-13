import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeEventsDetectionJobRequest, DescribeEventsDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeEventsDetectionJobCommandInput = DescribeEventsDetectionJobRequest;
export declare type DescribeEventsDetectionJobCommandOutput = DescribeEventsDetectionJobResponse & __MetadataBearer;
/**
 * <p>Gets the status and details of an events detection job.</p>
 */
export declare class DescribeEventsDetectionJobCommand extends $Command<DescribeEventsDetectionJobCommandInput, DescribeEventsDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeEventsDetectionJobCommandInput;
    constructor(input: DescribeEventsDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeEventsDetectionJobCommandInput, DescribeEventsDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
