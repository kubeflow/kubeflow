import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeKeyPhrasesDetectionJobRequest, DescribeKeyPhrasesDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeKeyPhrasesDetectionJobCommandInput = DescribeKeyPhrasesDetectionJobRequest;
export declare type DescribeKeyPhrasesDetectionJobCommandOutput = DescribeKeyPhrasesDetectionJobResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with a key phrases detection job. Use this operation to get
 *       the status of a detection job.</p>
 */
export declare class DescribeKeyPhrasesDetectionJobCommand extends $Command<DescribeKeyPhrasesDetectionJobCommandInput, DescribeKeyPhrasesDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeKeyPhrasesDetectionJobCommandInput;
    constructor(input: DescribeKeyPhrasesDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeKeyPhrasesDetectionJobCommandInput, DescribeKeyPhrasesDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
