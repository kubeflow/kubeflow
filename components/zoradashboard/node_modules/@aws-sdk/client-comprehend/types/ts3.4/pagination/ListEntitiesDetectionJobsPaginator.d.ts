import { ListEntitiesDetectionJobsCommandInput, ListEntitiesDetectionJobsCommandOutput } from "../commands/ListEntitiesDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListEntitiesDetectionJobs(config: ComprehendPaginationConfiguration, input: ListEntitiesDetectionJobsCommandInput, ...additionalArguments: any): Paginator<ListEntitiesDetectionJobsCommandOutput>;
