import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { DescribeDominantLanguageDetectionJobRequest, DescribeDominantLanguageDetectionJobResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeDominantLanguageDetectionJobCommandInput = DescribeDominantLanguageDetectionJobRequest;
export declare type DescribeDominantLanguageDetectionJobCommandOutput = DescribeDominantLanguageDetectionJobResponse & __MetadataBearer;
/**
 * <p>Gets the properties associated with a dominant language detection job. Use this operation
 *       to get the status of a detection job.</p>
 */
export declare class DescribeDominantLanguageDetectionJobCommand extends $Command<DescribeDominantLanguageDetectionJobCommandInput, DescribeDominantLanguageDetectionJobCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: DescribeDominantLanguageDetectionJobCommandInput;
    constructor(input: DescribeDominantLanguageDetectionJobCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeDominantLanguageDetectionJobCommandInput, DescribeDominantLanguageDetectionJobCommandOutput>;
    private serialize;
    private deserialize;
}
