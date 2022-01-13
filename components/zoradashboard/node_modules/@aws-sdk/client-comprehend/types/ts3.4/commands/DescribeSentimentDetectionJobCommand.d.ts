import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeSentimentDetectionJobRequest, DescribeSentimentDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeSentimentDetectionJobCommandInput = DescribeSentimentDetectionJobRequest;
export declare type DescribeSentimentDetectionJobCommandOutput = DescribeSentimentDetectionJobResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with a sentiment detection job. Use this operation to get
 *       the status of a detection job.</p>
 */
export declare class DescribeSentimentDetectionJobCommand extends $Command<DescribeSentimentDetectionJobCommandInput, DescribeSentimentDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeSentimentDetectionJobCommandInput;
    constructor(input: DescribeSentimentDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeSentimentDetectionJobCommandInput, DescribeSentimentDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
