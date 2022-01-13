import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListEntitiesDetectionJobsRequest, ListEntitiesDetectionJobsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListEntitiesDetectionJobsCommandInput = ListEntitiesDetectionJobsRequest;
export declare type ListEntitiesDetectionJobsCommandOutput = ListEntitiesDetectionJobsResponse & __MetadataBearer;
/**
 * <p>Gets a list of the entity detection jobs that you have submitted.</p>
 */
export declare class ListEntitiesDetectionJobsCommand extends $Command<ListEntitiesDetectionJobsCommandInput, ListEntitiesDetectionJobsCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListEntitiesDetectionJobsCommandInput;
    constructor(input: ListEntitiesDetectionJobsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListEntitiesDetectionJobsCommandInput, ListEntitiesDetectionJobsCommandOutput>;
    private serialize;
    private deserialize;
}
