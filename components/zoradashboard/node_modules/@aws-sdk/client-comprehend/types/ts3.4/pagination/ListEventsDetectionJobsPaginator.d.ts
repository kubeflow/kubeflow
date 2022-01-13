import { ListEventsDetectionJobsCommandInput, ListEventsDetectionJobsCommandOutput } from "../commands/ListEventsDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListEventsDetectionJobs(config: ComprehendPaginationConfiguration, input: ListEventsDetectionJobsCommandInput, ...additionalArguments: any): Paginator<ListEventsDetectionJobsCommandOutput>;
