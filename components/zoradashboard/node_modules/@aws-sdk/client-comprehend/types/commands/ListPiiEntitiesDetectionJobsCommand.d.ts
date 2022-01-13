import { ComprehendClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ComprehendClient";
import { ListPiiEntitiesDetectionJobsRequest, ListPiiEntitiesDetectionJobsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListPiiEntitiesDetectionJobsCommandInput = ListPiiEntitiesDetectionJobsRequest;
export declare type ListPiiEntitiesDetectionJobsCommandOutput = ListPiiEntitiesDetectionJobsResponse & __MetadataBearer;
/**
 * <p>Gets a list of the PII entity detection jobs that you have submitted.</p>
 */
export declare class ListPiiEntitiesDetectionJobsCommand extends $Command<ListPiiEntitiesDetectionJobsCommandInput, ListPiiEntitiesDetectionJobsCommandOutput, ComprehendClientResolvedConfig> {
    readonly input: ListPiiEntitiesDetectionJobsCommandInput;
    constructor(input: ListPiiEntitiesDetectionJobsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: ComprehendClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListPiiEntitiesDetectionJobsCommandInput, ListPiiEntitiesDetectionJobsCommandOutput>;
    private serialize;
    private deserialize;
}
