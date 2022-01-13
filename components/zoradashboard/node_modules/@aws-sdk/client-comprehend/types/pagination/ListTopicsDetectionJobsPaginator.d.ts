import { ListTopicsDetectionJobsCommandInput, ListTopicsDetectionJobsCommandOutput } from "../commands/ListTopicsDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListTopicsDetectionJobs(config: ComprehendPaginationConfiguration, input: ListTopicsDetectionJobsCommandInput, ...additionalArguments: any): Paginator<ListTopicsDetectionJobsCommandOutput>;
