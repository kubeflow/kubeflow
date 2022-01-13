import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListDominantLanguageDetectionJobsRequest, ListDominantLanguageDetectionJobsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListDominantLanguageDetectionJobsCommandInput = ListDominantLanguageDetectionJobsRequest;
export declare type ListDominantLanguageDetectionJobsCommandOutput = ListDominantLanguageDetectionJobsResponse & __MetadataBearer;
/**
 * <p>Gets a list of the dominant language detection jobs that you have submitted.</p>
 */
export declare class ListDominantLanguageDetectionJobsCommand extends $Command<ListDominantLanguageDetectionJobsCommandInput, ListDominantLanguageDetectionJobsCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListDominantLanguageDetectionJobsCommandInput;
    constructor(input: ListDominantLanguageDetectionJobsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListDominantLanguageDetectionJobsCommandInput, ListDominantLanguageDetectionJobsCommandOutput>;
    private serialize;
    private deserialize;
}
