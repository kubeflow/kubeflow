import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListEventsDetectionJobsRequest, ListEventsDetectionJobsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListEventsDetectionJobsCommandInput = ListEventsDetectionJobsRequest;
export declare type ListEventsDetectionJobsCommandOutput = ListEventsDetectionJobsResponse & __MetadataBearer;
/**
 * <p>Gets a list of the events detection jobs that you have submitted.</p>
 */
export declare class ListEventsDetectionJobsCommand extends $Command<ListEventsDetectionJobsCommandInput, ListEventsDetectionJobsCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListEventsDetectionJobsCommandInput;
    constructor(input: ListEventsDetectionJobsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListEventsDetectionJobsCommandInput, ListEventsDetectionJobsCommandOutput>;
    private serialize;
    private deserialize;
}
