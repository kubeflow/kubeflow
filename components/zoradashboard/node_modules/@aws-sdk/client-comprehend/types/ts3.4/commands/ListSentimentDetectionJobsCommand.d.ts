import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListSentimentDetectionJobsRequest, ListSentimentDetectionJobsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListSentimentDetectionJobsCommandInput = ListSentimentDetectionJobsRequest;
export declare type ListSentimentDetectionJobsCommandOutput = ListSentimentDetectionJobsResponse & __MetadataBearer;
/**
 * <p>Gets a list of sentiment detection jobs that you have submitted.</p>
 */
export declare class ListSentimentDetectionJobsCommand extends $Command<ListSentimentDetectionJobsCommandInput, ListSentimentDetectionJobsCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListSentimentDetectionJobsCommandInput;
    constructor(input: ListSentimentDetectionJobsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListSentimentDetectionJobsCommandInput, ListSentimentDetectionJobsCommandOutput>;
    private serialize;
    private deserialize;
}
