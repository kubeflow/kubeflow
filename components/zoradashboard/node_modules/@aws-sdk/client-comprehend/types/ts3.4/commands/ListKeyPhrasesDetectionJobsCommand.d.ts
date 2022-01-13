import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListKeyPhrasesDetectionJobsRequest, ListKeyPhrasesDetectionJobsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListKeyPhrasesDetectionJobsCommandInput = ListKeyPhrasesDetectionJobsRequest;
export declare type ListKeyPhrasesDetectionJobsCommandOutput = ListKeyPhrasesDetectionJobsResponse & __MetadataBearer;
/**
 * <p>Get a list of key phrase detection jobs that you have submitted.</p>
 */
export declare class ListKeyPhrasesDetectionJobsCommand extends $Command<ListKeyPhrasesDetectionJobsCommandInput, ListKeyPhrasesDetectionJobsCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListKeyPhrasesDetectionJobsCommandInput;
    constructor(input: ListKeyPhrasesDetectionJobsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListKeyPhrasesDetectionJobsCommandInput, ListKeyPhrasesDetectionJobsCommandOutput>;
    private serialize;
    private deserialize;
}
